import { createEvent, createStore, restore, sample } from 'effector';
import { persist } from 'effector-storage/local';

import { atom } from '@/shared/factories';
import { shuffled } from '@/shared/lib';
import { appStarted } from '@/shared/services';

import { getAllProductsQuery } from '../api';
import { findCategories } from '../lib/findByParams';
import { mapCategoriesLabels } from '../lib/mapCategories';
import type { Product } from '../types';

export const ProductModel = atom(() => {
    const $categories = restore(
        getAllProductsQuery.finished.success.map(({ result }) => mapCategoriesLabels(findCategories(result))),
        []
    );

    // 4 случайных товара со скидкой
    const $discountedItems = restore(
        getAllProductsQuery.finished.success.map(({ result }) =>
            shuffled(result.filter((el) => Boolean(el.discount_price)).filter((el) => el.is_available)).slice(0, 4)
        ),
        []
    );

    const productLikeSettled = createEvent<{ id: string }>();
    const $likedProducts = createStore<string[]>([]).on(productLikeSettled, (products, newProduct) => {
        if (products.find((id) => id === newProduct.id)) {
            return products.filter((id) => id !== newProduct.id);
        }
        return [...products, newProduct.id];
    });

    const cartProductSettled = createEvent<Product>();
    const cartProductRemoved = createEvent<Product>();
    const $productCart = createStore<{
        [K: string]: {
            count: number;
            product: Product;
        };
    }>({})
        .on(cartProductSettled, (products, newProduct) => {
            if (products[newProduct.id].count) {
                return {
                    ...products,
                    [newProduct.id]: {
                        product: newProduct,
                        count: (products[newProduct.id].count += 1),
                    },
                };
            }

            return {
                ...products,
                [newProduct.id]: {
                    product: newProduct,
                    count: 1,
                },
            };
        })
        .on(cartProductRemoved, (products, newProduct) => {
            if (products[newProduct.id]) {
                return {
                    ...products,
                    [newProduct.id]: {
                        product: newProduct,
                        count: (products[newProduct.id].count -= 1),
                    },
                };
            }

            return {
                ...products,
            };
        });

    const $productCartCount = $productCart.map((cart) => Object.values(cart).reduce((acc, val) => acc + val.count, 0));

    const $availableProducts = restore(
        getAllProductsQuery.finished.success.map(({ result }) => result.filter((el) => el.is_available)),
        []
    );

    const $newArrivalProducts = $availableProducts.map((products) =>
        products.sort((a, b) => (new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1)).slice(0, 8)
    );

    const $bestSellerProducts = $availableProducts.map((products) =>
        products.sort((a, b) => (a.count_review > b.count_review ? -1 : 1)).slice(0, 8)
    );

    const $featuredProducts = $availableProducts.map((products) =>
        products.sort((a, b) => (a.rating < b.rating ? 1 : -1)).slice(0, 8)
    );

    persist({
        pickup: appStarted,
        store: $likedProducts,
        key: 'liked-products',
    });

    persist({
        pickup: appStarted,
        store: $productCart,
        key: 'cart-products',
    });

    sample({
        clock: appStarted,
        target: getAllProductsQuery.start,
    });

    return {
        $categories,
        $discountedItems,
        productLikeSettled,
        $likedProducts,
        $newArrivalProducts,
        $bestSellerProducts,
        $featuredProducts,
        $productCart,
        cartProductSettled,
        cartProductRemoved,
        $productCartCount,
        $availableProducts,
    };
});
