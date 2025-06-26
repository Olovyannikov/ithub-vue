<script setup lang="ts">
const { productId } = defineProps<{
    productId: number;
}>();
import { useStoreMap, useUnit } from 'effector-vue/composition';

import { ProductModel } from '@/entities/Product/index.js';

const [onProductLikeClick] = useUnit([ProductModel.productLikeSettled]);

const isLiked = useStoreMap({
    store: ProductModel.$likedProducts,
    keys: () => productId,
    fn: (products, productId) => products.includes(`${productId}`),
});
</script>
<template>
    <Button
        text
        size="large"
        type="button"
        :icon="`pi ${isLiked ? 'pi-heart-fill' : 'pi-heart '}`"
        aria-label="Set Like for a product"
        class="flex ml-auto justify-end mt-[-0.5rem] p-2 mr-[-0.5rem] w-fit"
        :class="isLiked ? 'text-red-500' : 'text-gray-400'"
        @click="
            onProductLikeClick({
                id: `${productId}`,
            })
        "
    />
</template>
