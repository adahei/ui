<script setup lang="ts">
import { ref } from 'vue'
import { UiSlider, UiCard, UiStack, UiFormField, UiInputGroup, UiInputGroupText } from '@/components'

const basicValue = ref(50)
const smallValue = ref(25)
const mediumValue = ref(50)
const largeValue = ref(75)
const formFieldValue = ref(60)
const disabledValue = ref(30)
const errorValue = ref(10)
const inputGroupValue = ref(50)
const customRangeValue = ref(0)
const steppedValue = ref(50)
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiSlider</h1>
    <p class="page__description">
      A range slider input for selecting numeric values within a defined range.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <UiCard variant="filled" padding="lg" style="max-width: 400px;">
        <UiStack gap="4">
          <UiSlider v-model="basicValue" />
          <p style="font-size: var(--text-sm); color: var(--text-secondary);">
            Value: {{ basicValue }}
          </p>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Value Display</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Use the <code>show-value</code> prop to display the current value next to the slider.
      </p>
      <UiCard variant="filled" padding="lg" style="max-width: 400px;">
        <UiFormField label="Volume">
          <UiSlider v-model="basicValue" show-value />
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg" style="max-width: 400px;">
        <UiStack gap="4">
          <UiFormField label="Small">
            <UiSlider v-model="smallValue" size="sm" show-value />
          </UiFormField>
          <UiFormField label="Medium">
            <UiSlider v-model="mediumValue" size="md" show-value />
          </UiFormField>
          <UiFormField label="Large">
            <UiSlider v-model="largeValue" size="lg" show-value />
          </UiFormField>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With FormField</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Use with <code>UiFormField</code> for labels, hints, and error messages.
      </p>
      <UiCard variant="filled" padding="lg" style="max-width: 400px;">
        <UiFormField label="Brightness" hint="Adjust screen brightness">
          <UiSlider v-model="formFieldValue" show-value />
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Custom Range</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Use <code>min</code>, <code>max</code>, and <code>step</code> to customize the range.
      </p>
      <UiCard variant="filled" padding="lg" style="max-width: 400px;">
        <UiStack gap="4">
          <UiFormField label="Temperature">
            <UiSlider
              v-model="customRangeValue"
              :min="-50"
              :max="50"
              show-value
            />
          </UiFormField>
          <UiFormField label="Step by 10">
            <UiSlider
              v-model="steppedValue"
              :min="0"
              :max="100"
              :step="10"
              show-value
            />
          </UiFormField>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With InputGroup</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Combine with <code>UiInputGroup</code> for min/max labels.
      </p>
      <UiCard variant="filled" padding="lg" style="max-width: 400px;">
        <UiFormField label="Progress">
          <UiInputGroup>
            <UiInputGroupText>0</UiInputGroupText>
            <UiSlider v-model="inputGroupValue" />
            <UiInputGroupText>100</UiInputGroupText>
          </UiInputGroup>
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Disabled</h2>
      <UiCard variant="filled" padding="lg" style="max-width: 400px;">
        <UiFormField label="Disabled slider">
          <UiSlider v-model="disabledValue" show-value disabled />
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Error State</h2>
      <UiCard variant="filled" padding="lg" style="max-width: 400px;">
        <UiStack gap="4">
          <UiFormField label="With error" error="Value must be at least 25">
            <UiSlider v-model="errorValue" show-value />
          </UiFormField>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Props</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>modelValue</code></td>
            <td><code>number</code></td>
            <td><code>0</code></td>
            <td>Current value (v-model)</td>
          </tr>
          <tr>
            <td><code>min</code></td>
            <td><code>number</code></td>
            <td><code>0</code></td>
            <td>Minimum value</td>
          </tr>
          <tr>
            <td><code>max</code></td>
            <td><code>number</code></td>
            <td><code>100</code></td>
            <td>Maximum value</td>
          </tr>
          <tr>
            <td><code>step</code></td>
            <td><code>number</code></td>
            <td><code>1</code></td>
            <td>Step increment</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Slider size</td>
          </tr>
          <tr>
            <td><code>showValue</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Show current value inline</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Disable the slider</td>
          </tr>
          <tr>
            <td><code>error</code></td>
            <td><code>boolean | string</code></td>
            <td><code>false</code></td>
            <td>Error state or message</td>
          </tr>
          <tr>
            <td><code>id</code></td>
            <td><code>string</code></td>
            <td><code>auto</code></td>
            <td>Custom ID for the input</td>
          </tr>
          <tr>
            <td><code>name</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Name attribute for form submission</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
