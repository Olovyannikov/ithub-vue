<script setup lang="ts">
import { useUnit, useVModel } from 'effector-vue/composition';

import { ProductModel } from '@/entities/Product';

const [characteristics, allProcessors, allProducts] = useUnit([
    ProductModel.$allCharacteristicsNames,
    ProductModel.$allProcessorTypes,
    ProductModel.$availableProducts,
]);

const selectedProcessors = useVModel(ProductModel.$selectedProcessors);
</script>

<template>
    <Accordion :value="['Процессор']" multiple>
        <AccordionPanel v-for="tab in characteristics" :key="tab" :value="tab">
            <AccordionHeader>{{ tab }}</AccordionHeader>
            <AccordionContent v-if="tab === 'Процессор'">
                <div v-for="processor in allProcessors" :key="processor" class="flex items-center gap-2 mb-4">
                    <Checkbox v-model="selectedProcessors" :input-id="processor" :value="processor" class="m-0" />
                    <label :for="processor"
                        >{{ processor }}
                        <span class="text-gray-400">{{
                            allProducts.filter(
                                (product) => product.characteristics.filter((el) => el.value === processor).length
                            ).length
                        }}</span>
                    </label>
                </div>
            </AccordionContent>
        </AccordionPanel>
    </Accordion>
</template>
