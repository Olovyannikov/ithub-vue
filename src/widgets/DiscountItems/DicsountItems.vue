<script setup lang="ts">
import { useUnit } from 'effector-vue/composition';

import { ProductModel } from '@/entities/Product';

const [discountedItems] = useUnit([ProductModel.$discountedItems]);
</script>
<template>
    <ul>
        <li v-for="item of discountedItems" :key="item.id">
            {{ item.name }} | {{ item.images[0] }} | {{ item.rating }} | {{ item.is_available }} | {{ item.price }}
        </li>
    </ul>
</template>
