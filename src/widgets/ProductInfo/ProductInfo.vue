<script lang="ts" setup>
import { normalNumberFormat } from '@/shared/lib';

const { id } = defineProps<{
    id: string;
}>();

import { useStoreMap, useUnit } from 'effector-vue/composition';

import { type Product, ProductModel } from '@/entities/Product';

import { AddProductToCartAction } from '@/features/AddProductToCartAction';
import ProductLike from '@/features/ProductLikeAction/ui/ProductLike.vue';

const currentProduct = useStoreMap({
    store: ProductModel.$availableProducts,
    keys: () => id,
    fn: (products, productId) => products.find(({ id }) => String(id) === productId),
});

const [likes] = useUnit([ProductModel.$likedProducts]);
</script>
<template>
    <div class="mb-6">
        <h2 class="m-0 text-4xl mb-6">{{ currentProduct?.name }}</h2>
        <p style="font-family: ui-sans-serif, system-ui, sans-serif" class="mb-4 text-3xl">
            {{ normalNumberFormat(currentProduct?.discount_price ?? currentProduct?.price ?? 0) }}
            <del v-if="currentProduct?.discount_price" class="ml-4 text-2xl text-[#a0a0a0]">
                {{ normalNumberFormat(currentProduct?.price ?? 0) }}
            </del>
        </p>
        <ul class="grid grid-cols-2 gap-4 mb-6">
            <li
                v-for="(char, idx) in currentProduct?.characteristics.slice(0, 6)"
                :key="char.value + idx"
                class="bg-[#f4f4f4] p-4 rounded-border"
            >
                <h4>{{ char.characteristic }}</h4>
                <p>
                    {{ char.value }} <span v-if="char.unit_type !== 'значение'">{{ char.unit_type }}</span>
                </p>
            </li>
        </ul>
        <div class="grid gap-4 lg:grid-cols-2">
            <ProductLike :product-id="Number(id)" :text="`${likes.includes(id) ? 'Remove from' : 'Add to'} Wishlist`" />
            <AddProductToCartAction :product="currentProduct as Product" />
        </div>
    </div>
</template>
