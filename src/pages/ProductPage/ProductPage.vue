<template>
    <RootLayout> HelloW! {{ $route.params.id }} </RootLayout>
</template>
<script setup lang="ts">
import { RootLayout } from '@/widgets/RootLayout';
</script>
