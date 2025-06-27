<script setup lang="ts">
import { ref } from 'vue';
import { useUnit } from 'effector-vue/composition';

import { MainContainer } from '@/shared/ui';

import { type Product, ProductList, ProductPreview } from '@/entities/Product';

import { AddProductToCartAction } from '@/features/AddProductToCartAction';
import { ProductFiltersModel } from '@/features/ProductFilters';
import { ProductLikeAction } from '@/features/ProductLikeAction';

import { ProductsGridFilterBar } from '@/widgets/ProductsGrid/ui';

const [products] = useUnit([ProductFiltersModel.$paginatedProducts]);

const page = ref(0);
</script>

<template>
    <MainContainer class="container">
        <ProductsGridFilterBar />
        <ProductList class="list">
            <ProductPreview v-for="product in products[page]" :key="product.id" :product="product as Product">
                <template #like-btn>
                    <ProductLikeAction :product-id="product.id" />
                </template>
                <template #cart-btn>
                    <AddProductToCartAction :product="product as Product" />
                </template>
            </ProductPreview>
        </ProductList>

        <Paginator v-model:first="page" :rows="1" :total-records="products.length" />
    </MainContainer>
</template>
<style scoped>
.container {
    margin-top: 40px;
    margin-bottom: 72px;
}

.list {
    @media (width >= 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
