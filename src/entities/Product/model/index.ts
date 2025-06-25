import { restore, sample } from 'effector';

import { atom } from '@/shared/factories';
import { shuffled } from '@/shared/lib';
import { appStarted } from '@/shared/services';

import { getAllProductsQuery } from '../api';
import { findCategories } from '../lib/findByParams';
import { mapCategoriesLabels } from '../lib/mapCategories';

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

    sample({
        clock: appStarted,
        target: getAllProductsQuery.start,
    });

    return {
        $categories,
        $discountedItems,
    };
});
