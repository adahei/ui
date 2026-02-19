<script setup lang="ts">
import { ref } from 'vue'
import { UiInput, UiFormField, UiCard } from '@/components'
import { Search, Mail } from 'lucide-vue-next'

const text = ref('')
const email = ref('')
const search = ref('')
const errorInput = ref('')
const age = ref<number | null>(null)
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiInput</h1>
    <p class="page__description">
      A text input component with support for icons, validation states, and multiple sizes.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">With UiFormField</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 320px;">
        <UiFormField label="Username">
          <UiInput v-model="text" placeholder="Enter username..." />
        </UiFormField>
        <UiFormField label="Email" required>
          <UiInput v-model="email" type="email" placeholder="you@example.com" />
        </UiFormField>
        <UiFormField label="Age" hint="Must be between 0 and 120">
          <UiInput v-model="age" type="number" min="0" max="120" placeholder="Enter age" />
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 320px;">
        <UiFormField label="Small" size="sm">
          <UiInput size="sm" placeholder="Small input" />
        </UiFormField>
        <UiFormField label="Medium">
          <UiInput size="md" placeholder="Medium input" />
        </UiFormField>
        <UiFormField label="Large" size="lg">
          <UiInput size="lg" placeholder="Large input" />
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Icons</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 320px;">
        <UiFormField label="Search">
          <UiInput v-model="search" :icon-left="Search" placeholder="Search..." />
        </UiFormField>
        <UiFormField label="Email">
          <UiInput v-model="email" :icon-left="Mail" type="email" placeholder="you@example.com" />
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">States</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 320px;">
        <UiFormField label="Disabled">
          <UiInput disabled placeholder="Cannot edit" />
        </UiFormField>
        <UiFormField label="Read only">
          <UiInput readonly value="Read only value" />
        </UiFormField>
        <UiFormField label="With error" error="This field is required">
          <UiInput v-model="errorInput" placeholder="Enter value" />
        </UiFormField>
        <UiFormField label="With hint" hint="This is a helpful hint">
          <UiInput placeholder="Enter value" />
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">UiInput Props</h2>
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
            <td><code>string | number | null</code></td>
            <td><code>''</code></td>
            <td>v-model binding</td>
          </tr>
          <tr>
            <td><code>type</code></td>
            <td><code>'text' | 'password' | 'email' | ...</code></td>
            <td><code>'text'</code></td>
            <td>Input type</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Input size</td>
          </tr>
          <tr>
            <td><code>placeholder</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Placeholder text</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Disables the input</td>
          </tr>
          <tr>
            <td><code>readonly</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Makes input read-only</td>
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
            <td>Input ID (auto-generated if not provided)</td>
          </tr>
          <tr>
            <td><code>iconLeft</code></td>
            <td><code>Component</code></td>
            <td><code>-</code></td>
            <td>Icon on the left</td>
          </tr>
          <tr>
            <td><code>iconRight</code></td>
            <td><code>Component</code></td>
            <td><code>-</code></td>
            <td>Icon on the right</td>
          </tr>
          <tr>
            <td><code>block</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Full width, grows in flex containers</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">UiFormField Props</h2>
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
            <td><code>label</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Field label text</td>
          </tr>
          <tr>
            <td><code>required</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Shows required indicator</td>
          </tr>
          <tr>
            <td><code>error</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Error message</td>
          </tr>
          <tr>
            <td><code>hint</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Help text below input</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Size of label and hint text</td>
          </tr>
          <tr>
            <td><code>id</code></td>
            <td><code>string</code></td>
            <td><code>auto</code></td>
            <td>ID for label association (auto-generated)</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
