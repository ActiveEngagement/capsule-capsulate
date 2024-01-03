<script setup lang="ts">
import { TextareaField } from '@vue-interface/textarea-field';
import { ref, watchEffect } from 'vue';
import { capsulate } from '../src/index';

import input from './input.html?raw';
import template from './template.html?raw';

const document = ref<string>(input);
const wrapper = ref<string>(template);
const converted = ref<string>();

watchEffect(async () => {
    converted.value = await capsulate(document.value, {
        template: {
            src: wrapper.value,
            data: {
                test: 123
            }
        },
        previewText: {
            html: ($) => {
                return $('#preview-text');
            }
        }
    });
});
</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <TextareaField
            v-model="wrapper"
            label="Template" />
        <TextareaField
            v-model="document"
            label="Document" />
        <TextareaField
            v-if="converted"
            v-model="converted"
            label="Converted" />
    </div>
</template>