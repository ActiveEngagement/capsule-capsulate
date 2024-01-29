<script setup lang="ts">
import { TextareaField } from '@vue-interface/textarea-field';
import { ref } from 'vue';
import { useReplaceQueryStrings } from '../src/helpers';

// @ts-ignore
import input from './input.html?raw';

const converted = ref<string>();

const { sourceCodes, replace } = useReplaceQueryStrings(input);

console.log(sourceCodes);

// watchEffect(async () => {
//     converted.value = await capsulate(document.value, {
//         dom: {
//             replaceQueryStrings: [{
//                 key: 'utm_source',
//                 from: 'xxxxx',
//                 to: 'test'
//             }]
//         }
//     });
// });

async function onSubmit() {
    const doc = await replace();

    console.log(doc.match(/utm_source=xxxxx/g), doc.match(/utm_source=test/g));
}
</script>

<template>
    <form
        class="flex flex-col gap-4 p-4"
        @submit.prevent="onSubmit">
        <div
            v-for="([key, codes], i) in sourceCodes"
            :key="key"
            class="grid grid-cols-2 items-start">
            <h3 class="text-lg">
                {{ key }}
            </h3>
            <div class="flex flex-col gap-2">
                <div
                    v-for="(code) in codes"
                    :key="`${i}-${code.key}`"
                    class="flex gap-2">
                    <input
                        v-model="code.to"
                        tabindex="1"
                        class="flex-1 border border-1 p-2">
                    <div class="w-12 ml-4 text-center">
                        {{ code.count }}
                    </div>
                </div>
            </div>
        </div>

        <button>submit</button>

        <TextareaField
            v-if="converted"
            v-model="converted"
            label="Converted"
            :autogrow="false" />
    </form>
</template>