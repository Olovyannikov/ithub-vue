<script setup>
import { ref } from 'vue';
import { useUnit, useVModel } from 'effector-vue/composition';

import { ProductFiltersModel } from '@/features/ProductFilters';

const visible = ref(false);

const sort = useVModel(ProductFiltersModel.$sortBy);
const options = ref([
    {
        code: 'rating',
        name: 'By Rating',
    },
    {
        code: 'data',
        name: 'By Date',
    },
    {
        code: 'price',
        name: 'By Price',
    },
]);

const [totalProducts] = useUnit([ProductFiltersModel.$totalFilteredProducts]);
</script>
<template>
    <div class="grid grid-cols-2 gap-4 mb-8 items-center">
        <p class="hidden lg:block">
            Selected Products: <b class="text-lg">{{ totalProducts }}</b>
        </p>
        <Button
            outlined
            severity="contrast"
            label="Filters"
            icon="pi pi-sliders-h"
            icon-pos="right"
            size="large"
            class="lg:hidden justify-between"
            @click="visible = true"
        />
        <Select
            v-model="sort"
            size="large"
            :options="options"
            option-label="name"
            placeholder="Sort By"
            class="w-full lg:w-[256px] lg:place-self-end"
        />
    </div>
    <Drawer v-model:visible="visible" header="Drawer" position="full">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
        </p>
    </Drawer>
</template>
