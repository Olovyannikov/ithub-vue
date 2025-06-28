<script setup lang="ts">
import { useUnit } from 'effector-vue/composition';

defineProps<{
    id: string;
}>();

import { MainContainer } from '@/shared/ui';

import { getAllProductsQuery } from '@/entities/Product';

import { ProductGallery } from '@/widgets/ProductGallery';
import { ProductInfo } from '@/widgets/ProductInfo';
import { RootLayout } from '@/widgets/RootLayout';

const { pending } = useUnit(getAllProductsQuery);
</script>
<template>
    <RootLayout>
        <ProgressSpinner v-if="pending" class="m-auto flex mt-[20%]" />
        <MainContainer v-if="!pending" class="py-10">
            <div class="lg:flex lg:gap-[48px]">
                <ProductGallery />
                <ProductInfo :id="id" />
            </div>
        </MainContainer>
    </RootLayout>
</template>
