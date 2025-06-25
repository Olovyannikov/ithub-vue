<script setup lang="ts">
import { MainContainer } from '@/shared/ui';
</script>
<template>
    <footer class="footer">
        <MainContainer class="container">
            <div class="top">
                <Image class="logo" src="/logo-white.svg" width="65" />
                <p>
                    We are a residential interior design firm located in Portland. Our boutique-studio offers more than
                </p>
            </div>
        </MainContainer>
    </footer>
</template>
<style scoped>
.footer {
    padding: 48px 32px;
    background-color: #181313;
}

.container {
    display: flex;
    justify-content: center;
    text-align: center;
}

.top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
    font-size: 13px;
    line-height: 24px;
    color: #cfcfcf;
}

.logo {
    margin-bottom: 16px;
}
</style>
