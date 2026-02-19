<script setup lang="ts">
import { ref } from 'vue'
import {
  UiRadio,
  UiFormField,
  UiInputGroup,
  UiInput,
  UiSelect,
  UiButton,
  UiCard,
  type SelectOption,
} from '@/components'

const plan = ref<string | null>(null)
const color = ref<string>('blue')
const priority = ref<string | null>(null)
const size = ref<string>('md')

// InputGroup examples
const searchType = ref<string>('all')
const amount = ref('')
const currency = ref<string>('usd')
const paymentMethod = ref<string>('card')

const currencies: SelectOption[] = [
  { value: 'usd', label: 'USD' },
  { value: 'eur', label: 'EUR' },
  { value: 'gbp', label: 'GBP' },
]
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiRadio</h1>
    <p class="page__description">
      A styled radio button component for single-choice selections within a group.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Select a plan">
          <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
            <UiRadio v-model="plan" value="free" name="plan" label="Free" />
            <UiRadio v-model="plan" value="pro" name="plan" label="Pro" />
            <UiRadio v-model="plan" value="enterprise" name="plan" label="Enterprise" />
          </div>
        </UiFormField>
        <p style="font-size: var(--text-sm); color: var(--text-secondary);">
          Selected: {{ plan ?? 'none' }}
        </p>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Small">
          <div style="display: flex; gap: var(--spacing-4);">
            <UiRadio v-model="size" value="sm" name="size-demo" size="sm" label="Small" />
            <UiRadio v-model="size" value="md" name="size-demo" size="sm" label="Medium" />
            <UiRadio v-model="size" value="lg" name="size-demo" size="sm" label="Large" />
          </div>
        </UiFormField>
        <UiFormField label="Medium (default)">
          <div style="display: flex; gap: var(--spacing-4);">
            <UiRadio v-model="size" value="sm" name="size-demo-md" size="md" label="Small" />
            <UiRadio v-model="size" value="md" name="size-demo-md" size="md" label="Medium" />
            <UiRadio v-model="size" value="lg" name="size-demo-md" size="md" label="Large" />
          </div>
        </UiFormField>
        <UiFormField label="Large">
          <div style="display: flex; gap: var(--spacing-4);">
            <UiRadio v-model="size" value="sm" name="size-demo-lg" size="lg" label="Small" />
            <UiRadio v-model="size" value="md" name="size-demo-lg" size="lg" label="Medium" />
            <UiRadio v-model="size" value="lg" name="size-demo-lg" size="lg" label="Large" />
          </div>
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Horizontal Layout</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Choose a color">
          <div style="display: flex; gap: var(--spacing-4);">
            <UiRadio v-model="color" value="red" name="color" label="Red" />
            <UiRadio v-model="color" value="green" name="color" label="Green" />
            <UiRadio v-model="color" value="blue" name="color" label="Blue" />
          </div>
        </UiFormField>
        <p style="font-size: var(--text-sm); color: var(--text-secondary);">
          Selected: {{ color }}
        </p>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">States</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiRadio :model-value="'checked'" value="checked" name="states-checked" label="Checked" />
        <UiRadio :model-value="null" value="unchecked" name="states-unchecked" label="Unchecked" />
        <UiRadio disabled :model-value="null" value="disabled" name="states-disabled1" label="Disabled unchecked" />
        <UiRadio disabled :model-value="'disabled'" value="disabled" name="states-disabled2" label="Disabled checked" />
        <UiRadio error :model-value="null" value="error" name="states-error" label="With error" />
        <UiRadio error="Selection required" :model-value="null" value="error-msg" name="states-error-msg" label="With error message" />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With FormField Error</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Priority" error="Please select a priority level">
          <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
            <UiRadio v-model="priority" value="low" name="priority" label="Low" />
            <UiRadio v-model="priority" value="medium" name="priority" label="Medium" />
            <UiRadio v-model="priority" value="high" name="priority" label="High" />
          </div>
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">In InputGroup</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 500px;">
        <UiFormField label="Quick selection">
          <UiInputGroup>
            <UiRadio v-model="plan" value="free" name="plan-group" label="Free" />
            <UiRadio v-model="plan" value="pro" name="plan-group" label="Pro" />
            <UiRadio v-model="plan" value="enterprise" name="plan-group" label="Enterprise" />
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Search scope">
          <UiInputGroup>
            <UiRadio v-model="searchType" value="all" name="search-type" label="All" />
            <UiRadio v-model="searchType" value="title" name="search-type" label="Title" />
            <UiRadio v-model="searchType" value="content" name="search-type" label="Content" />
            <UiInput placeholder="Search..." style="flex: 1;" />
            <UiButton>Search</UiButton>
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Amount with currency">
          <UiInputGroup>
            <UiInput v-model="amount" placeholder="0.00" type="number" style="flex: 1;" />
            <UiSelect v-model="currency" :options="currencies" style="max-width: 90px;" />
            <UiRadio v-model="paymentMethod" value="card" name="payment" label="Card" />
            <UiRadio v-model="paymentMethod" value="bank" name="payment" label="Bank" />
          </UiInputGroup>
        </UiFormField>
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
            <td><code>string | number | null</code></td>
            <td><code>null</code></td>
            <td>v-model binding (selected value in group)</td>
          </tr>
          <tr>
            <td><code>value</code></td>
            <td><code>string | number</code></td>
            <td><em>required</em></td>
            <td>Value of this radio option</td>
          </tr>
          <tr>
            <td><code>label</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Label text displayed next to radio</td>
          </tr>
          <tr>
            <td><code>name</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Name attribute (groups radios together)</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Radio button size</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Disables the radio button</td>
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
            <td>Radio ID (auto-generated if not provided)</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
