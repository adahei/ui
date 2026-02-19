<script setup lang="ts">
import { ref } from 'vue'
import {
  UiSelect,
  UiFormField,
  UiInputGroup,
  UiInputGroupText,
  UiInput,
  UiButton,
  UiCard,
  type SelectOption,
  type SelectOptionOrGroup,
} from '@/components'
import { Globe, Search } from 'lucide-vue-next'

const country = ref<string | null>(null)
const priority = ref<string | null>(null)
const category = ref<string | null>(null)
const quantity = ref<number | null>(1)
const searchQuery = ref('')
const searchType = ref('all')
const vehicle = ref<string | null>(null)
const timezone = ref<string | null>(null)

const countries: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
]

const vehicles: SelectOptionOrGroup[] = [
  {
    label: 'Cars',
    options: [
      { value: 'sedan', label: 'Sedan' },
      { value: 'suv', label: 'SUV' },
      { value: 'sports', label: 'Sports Car' },
    ],
  },
  {
    label: 'Motorcycles',
    options: [
      { value: 'cruiser', label: 'Cruiser' },
      { value: 'sport', label: 'Sport Bike' },
      { value: 'touring', label: 'Touring' },
    ],
  },
  {
    label: 'Trucks',
    disabled: true,
    options: [
      { value: 'pickup', label: 'Pickup' },
      { value: 'semi', label: 'Semi' },
    ],
  },
]

const timezones: SelectOptionOrGroup[] = [
  { value: 'utc', label: 'UTC' },
  {
    label: 'Americas',
    options: [
      { value: 'est', label: 'Eastern Time (ET)' },
      { value: 'cst', label: 'Central Time (CT)' },
      { value: 'pst', label: 'Pacific Time (PT)' },
    ],
  },
  {
    label: 'Europe',
    options: [
      { value: 'gmt', label: 'Greenwich Mean Time (GMT)' },
      { value: 'cet', label: 'Central European Time (CET)' },
    ],
  },
]

const priorities: SelectOption[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical', disabled: true },
]

const categories: SelectOption[] = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
  { value: 'home', label: 'Home & Garden' },
]

const quantities: SelectOption[] = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
]

const searchTypes: SelectOption[] = [
  { value: 'all', label: 'All' },
  { value: 'products', label: 'Products' },
  { value: 'categories', label: 'Categories' },
  { value: 'brands', label: 'Brands' },
]
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiSelect</h1>
    <p class="page__description">
      A styled select component that works with native HTML select behavior.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 320px;">
        <UiFormField label="Country">
          <UiSelect
            v-model="country"
            :options="countries"
            placeholder="Select a country..."
          />
        </UiFormField>
        <p style="font-size: var(--text-sm); color: var(--text-secondary);">
          Selected: {{ country ?? 'none' }}
        </p>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Option Groups</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 320px;">
        <UiFormField label="Vehicle Type">
          <UiSelect
            v-model="vehicle"
            :options="vehicles"
            placeholder="Select a vehicle..."
          />
        </UiFormField>

        <UiFormField label="Timezone" hint="Supports mixed options and groups">
          <UiSelect
            v-model="timezone"
            :options="timezones"
            placeholder="Select timezone..."
          />
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 320px;">
        <UiFormField label="Small" size="sm">
          <UiSelect size="sm" :options="priorities" placeholder="Select priority..." />
        </UiFormField>
        <UiFormField label="Medium">
          <UiSelect size="md" :options="priorities" placeholder="Select priority..." />
        </UiFormField>
        <UiFormField label="Large" size="lg">
          <UiSelect size="lg" :options="priorities" placeholder="Select priority..." />
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">States</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 320px;">
        <UiFormField label="Disabled">
          <UiSelect :options="countries" placeholder="Cannot select" disabled />
        </UiFormField>
        <UiFormField label="With error" error="Please select a valid option">
          <UiSelect v-model="priority" :options="priorities" placeholder="Select priority..." />
        </UiFormField>
        <UiFormField label="With hint" hint="Choose the most appropriate option">
          <UiSelect :options="categories" placeholder="Select category..." />
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Slot Options</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 320px;">
        <UiFormField label="Category">
          <UiSelect v-model="category" placeholder="Select category...">
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="home">Home & Garden</option>
          </UiSelect>
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">In Input Group</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 500px;">
        <UiFormField label="Country">
          <UiInputGroup>
            <UiInputGroupText><Globe /></UiInputGroupText>
            <UiSelect v-model="country" :options="countries" placeholder="Select country..." />
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Quantity">
          <UiInputGroup>
            <UiInputGroupText>Qty</UiInputGroupText>
            <UiSelect v-model="quantity" :options="quantities" />
            <UiButton>Add to Cart</UiButton>
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Search">
          <UiInputGroup>
            <UiSelect v-model="searchType" :options="searchTypes" style="max-width: 140px;" />
            <UiInput v-model="searchQuery" placeholder="Search..." />
            <UiButton :icon-left="Search" aria-label="Search" />
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Input with Select">
          <UiInputGroup>
            <UiInput placeholder="Enter amount..." type="number" />
            <UiSelect :options="[
              { value: 'usd', label: 'USD' },
              { value: 'eur', label: 'EUR' },
              { value: 'gbp', label: 'GBP' },
            ]" style="max-width: 100px;" />
          </UiInputGroup>
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Input Group Sizes</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Small" size="sm">
          <UiInputGroup size="sm">
            <UiInputGroupText>$</UiInputGroupText>
            <UiInput placeholder="Amount" />
            <UiSelect :options="[
              { value: 'usd', label: 'USD' },
              { value: 'eur', label: 'EUR' },
            ]" style="max-width: 90px;" />
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Medium">
          <UiInputGroup size="md">
            <UiInputGroupText>$</UiInputGroupText>
            <UiInput placeholder="Amount" />
            <UiSelect :options="[
              { value: 'usd', label: 'USD' },
              { value: 'eur', label: 'EUR' },
            ]" style="max-width: 90px;" />
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Large" size="lg">
          <UiInputGroup size="lg">
            <UiInputGroupText>$</UiInputGroupText>
            <UiInput placeholder="Amount" />
            <UiSelect :options="[
              { value: 'usd', label: 'USD' },
              { value: 'eur', label: 'EUR' },
            ]" style="max-width: 90px;" />
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
            <td>v-model binding</td>
          </tr>
          <tr>
            <td><code>options</code></td>
            <td><code>SelectOptionOrGroup[]</code></td>
            <td><code>[]</code></td>
            <td>Array of options or option groups</td>
          </tr>
          <tr>
            <td><code>placeholder</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Placeholder text (disabled option)</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Select size</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Disables the select</td>
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
            <td>Select ID (auto-generated if not provided)</td>
          </tr>
          <tr>
            <td><code>name</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Form field name</td>
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
  </div>
</template>
