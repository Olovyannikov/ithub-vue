import { createRouter, createWebHistory } from 'vue-router';

import { IndexPage } from '@/pages/IndexPage';
import { ProductPage } from '@/pages/ProductPage';
import { ProductsPage } from '@/pages/ProductsPage';

const routes = [
    {
        path: '/',
        component: IndexPage,
    },
    {
        path: '/products',
        component: ProductsPage,
    },
    {
        path: '/product/:id',
        component: ProductPage,
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
