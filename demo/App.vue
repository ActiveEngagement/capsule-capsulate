<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { capsulate } from '../src/index';

// @ts-ignore
import input from './input.html?raw';
// @ts-ignore
import template from './template.html?raw';

const document = ref<string>(input);
const wrapper = ref<string>(template);
const converted = ref<string>();

watchEffect(async () => {
    converted.value = await capsulate(document.value, {
        previewText: {
            html: 'Are you taking this popular blood tinner?'
        },
        template: {
            src: wrapper.value
        }
    });

    console.log(converted.value)
});

function onClickCopy() {
    if(converted.value) {
        navigator.clipboard.writeText(converted.value);
    }
}
</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <!-- <TextareaField
            v-model="wrapper"
            label="Template"
            :autogrow="false" />
        <TextareaField
            v-model="document"
            label="Document"
            :autogrow="false" /> -->
        <!-- <TextareaField
            v-if="converted"
            v-model="converted"
            label="Converted"
            :autogrow="false" /> -->
        <button @click="onClickCopy">
            Copy HTML
        </button>

        <iframe
            :srcdoc="converted"
            style="height:1000px" />
    </div>
</template>