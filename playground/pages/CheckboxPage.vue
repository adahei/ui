<script setup lang="ts">
import { ref } from 'vue'
import {
  UiCheckbox,
  UiFormField,
  UiInputGroup,
  UiInputGroupText,
  UiInput,
  UiSelect,
  UiButton,
  UiCard,
  type SelectOption,
} from '@/components'
import { Search, Filter } from 'lucide-vue-next'

const agreed = ref(false)
const notifications = ref(true)
const marketing = ref(false)

// Indeterminate state demo
const parentChecked = ref(false)
const parentIndeterminate = ref(true)
const childA = ref(true)
const childB = ref(false)

const features = ref<string[]>([])
const allFeatures = ['feature1', 'feature2', 'feature3']

// InputGroup examples
const optionA = ref(true)
const optionB = ref(false)
const optionC = ref(false)
const searchQuery = ref('')
const caseSensitive = ref(false)
const wholeWord = ref(false)
const rememberMe = ref(true)
const filterCategory = ref<string | null>(null)
const showInactive = ref(false)

const categories: SelectOption[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
]
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiCheckbox</h1>
    <p class="page__description">
      A styled checkbox component with support for labels, indeterminate state, and form integration.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiCheckbox v-model="agreed" label="I agree to the terms and conditions" />
        <p style="font-size: var(--text-sm); color: var(--text-secondary);">
          Value: {{ agreed }}
        </p>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiCheckbox size="sm" label="Small checkbox" />
        <UiCheckbox size="md" label="Medium checkbox (default)" />
        <UiCheckbox size="lg" label="Large checkbox" />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">States</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiCheckbox v-model="notifications" label="Checked" />
        <UiCheckbox :model-value="false" label="Unchecked" />
        <UiCheckbox disabled label="Disabled unchecked" />
        <UiCheckbox disabled :model-value="true" label="Disabled checked" />
        <UiCheckbox error label="With error" />
        <UiCheckbox error="This field is required" label="With error message" />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Indeterminate State</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Use <code>v-model:indeterminate</code> to control the mixed state. Clicking clears it automatically.
      </p>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiCheckbox
          v-model="parentChecked"
          v-model:indeterminate="parentIndeterminate"
          label="Select all"
        />
        <div style="margin-left: var(--spacing-6); display: flex; flex-direction: column; gap: var(--spacing-2);">
          <UiCheckbox v-model="childA" label="Option A" />
          <UiCheckbox v-model="childB" label="Option B" />
        </div>
        <p style="font-size: var(--text-sm); color: var(--text-secondary);">
          Parent: checked={{ parentChecked }}, indeterminate={{ parentIndeterminate }}
        </p>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With FormField</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Marketing Preferences">
          <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
            <UiCheckbox v-model="notifications" label="Email notifications" />
            <UiCheckbox v-model="marketing" label="Marketing emails" />
          </div>
        </UiFormField>

        <UiFormField label="Required Agreement" error="You must accept the terms">
          <UiCheckbox v-model="agreed" label="I accept the privacy policy" />
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">In InputGroup</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 500px;">
        <UiFormField label="Multiple checkboxes">
          <UiInputGroup>
            <UiCheckbox v-model="optionA" label="Option A" />
            <UiCheckbox v-model="optionB" label="Option B" />
            <UiCheckbox v-model="optionC" label="Option C" />
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Search with options">
          <UiInputGroup>
            <UiInput v-model="searchQuery" placeholder="Search..." />
            <UiCheckbox v-model="caseSensitive" label="Aa" aria-label="Case sensitive" />
            <UiCheckbox v-model="wholeWord" label="W" aria-label="Whole word" />
            <UiButton :icon-left="Search" aria-label="Search" />
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Filter with checkbox">
          <UiInputGroup>
            <UiInputGroupText><Filter /></UiInputGroupText>
            <UiSelect v-model="filterCategory" :options="categories" placeholder="Category..." />
            <UiCheckbox v-model="showInactive" label="Show inactive" />
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Login remember me">
          <UiInputGroup>
            <UiInput placeholder="Username" />
            <UiCheckbox v-model="rememberMe" label="Remember" />
            <UiButton>Login</UiButton>
          </UiInputGroup>
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Checkbox Group (Multiple Selection)</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Select features">
          <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
            <UiCheckbox
              v-for="feature in allFeatures"
              :key="feature"
              :model-value="features.includes(feature)"
              :label="`Feature ${feature.slice(-1).toUpperCase()}`"
              @update:model-value="(checked: boolean) => {
                if (checked) {
                  features.push(feature)
                } else {
                  features = features.filter(f => f !== feature)
                }
              }"
            />
          </div>
        </UiFormField>
        <p style="font-size: var(--text-sm); color: var(--text-secondary);">
          Selected: {{ features.length ? features.join(', ') : 'none' }}
        </p>
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
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>v-model binding (checked state)</td>
          </tr>
          <tr>
            <td><code>label</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Label text displayed next to checkbox</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Checkbox size</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Disables the checkbox</td>
          </tr>
          <tr>
            <td><code>indeterminate</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Shows indeterminate state (dash instead of check)</td>
          </tr>
          <tr>
            <td><code>error</code></td>
            <td><code>boolean | string</code></td>
            <td><code>false</code></td>
            <td>Error state or message</td>
          </tr>
          <tr>
            <td><code>value</code></td>
            <td><code>string | number</code></td>
            <td><code>-</code></td>
            <td>Value when used in checkbox groups</td>
          </tr>
          <tr>
            <td><code>id</code></td>
            <td><code>string</code></td>
            <td><code>auto</code></td>
            <td>Checkbox ID (auto-generated if not provided)</td>
          </tr>
          <tr>
            <td><code>name</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Form field name</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
