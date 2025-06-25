<script setup lang="ts">
import { MainBanners } from '@/widgets/Banners';
import { CategoriesView } from '@/widgets/CategoriesView';
import { MainBanner } from '@/widgets/MainBanner';
import { RootLayout } from '@/widgets/RootLayout';
import { SaleBanner } from '@/widgets/SaleBanner';
</script>

<template>
    <RootLayout>
        <MainBanner />
        <MainBanners />
        <CategoriesView />
        <SaleBanner />
    </RootLayout>
</template>
