<script setup lang="ts">
import { ref } from 'vue';

import { isLargeScreen } from '@/shared/lib';
import { MainContainer } from '@/shared/ui';

import { NAVIGATION_ITEMS } from '../../const';

const items = ref(NAVIGATION_ITEMS);
</script>
<template>
    <header class="m-auto bg-white mb-4">
        <MainContainer>
            <Menubar class="menubar justify-between border-0 p-0 py-6 pb-2" :model="items">
                <template #start>
                    <Image v-if="!isLargeScreen" draggable="false" src="/logo.svg" width="65" alt="Cyber Logo" />
                    <Image
                        v-if="isLargeScreen"
                        draggable="false"
                        class="mr-75"
                        src="/logo-desktop.svg"
                        width="95"
                        alt="Cyber Logo"
                    />
                    <IconField v-if="isLargeScreen">
                        <InputIcon class="pi pi-search" />
                        <InputText
                            size="large"
                            class="min-w-[372px] placeholder-shown:border-transparent focus-visible:border-green-600 placeholder-shown:italic placeholder-gray-400 text-md"
                            variant="filled"
                            placeholder="Search"
                        />
                    </IconField>
                </template>
                <template #item="{ item, props }">
                    <a v-ripple class="gap-1 flex items-center" v-bind="props.action">
                        <span class="gap-2 align-center flex">
                            <span :class="item.icon" />
                            <span v-if="!isLargeScreen" class="label">{{ item.label }}</span></span
                        >
                    </a>
                </template>
            </Menubar>
        </MainContainer>
    </header>
</template>
<style scoped>
.menubar {
    --p-icon-size: 20px;
    --p-menubar-mobile-button-size: 40px;
}
</style>
