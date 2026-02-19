<script setup lang="ts">
import { ref } from 'vue'
import { UiButton, UiCard, UiStack } from '@/components'
import { Plus, ArrowRight, Download, Settings, Trash2, Edit, X } from 'lucide-vue-next'

const isLoading = ref(false)

function simulateLoad() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiButton</h1>
    <p class="page__description">
      A flexible button component with multiple variants, sizes, and states.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Variants</h2>
      <UiCard variant="filled" padding="lg">
        <UiStack direction="row" gap="4" align="center" wrap="wrap">
          <UiButton variant="primary">Primary</UiButton>
          <UiButton variant="secondary">Secondary</UiButton>
          <UiButton variant="outline">Outline</UiButton>
          <UiButton variant="ghost">Ghost</UiButton>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg">
        <UiStack direction="row" gap="4" align="center" wrap="wrap">
          <UiButton size="sm">Small</UiButton>
          <UiButton size="md">Medium</UiButton>
          <UiButton size="lg">Large</UiButton>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Icons</h2>
      <UiCard variant="filled" padding="lg">
        <UiStack direction="row" gap="4" align="center" wrap="wrap">
          <UiButton :icon-left="Plus">Add item</UiButton>
          <UiButton :icon-right="ArrowRight">Continue</UiButton>
          <UiButton :icon-left="Download" variant="outline">Download</UiButton>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Icon Only</h2>
      <p style="color: var(--text-secondary); font-size: var(--text-sm); margin-bottom: var(--spacing-4);">
        Provide <code>aria-label</code> for accessibility.
      </p>
      <UiCard variant="filled" padding="lg">
        <UiStack direction="row" gap="4" align="center" wrap="wrap">
          <UiButton :icon-left="Settings" size="sm" variant="ghost" aria-label="Settings" />
          <UiButton :icon-left="Edit" size="md" variant="outline" aria-label="Edit" />
          <UiButton :icon-left="Trash2" size="md" variant="ghost" aria-label="Delete" />
          <UiButton :icon-left="X" size="lg" variant="outline" aria-label="Close" />
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Block (Full Width)</h2>
      <UiCard variant="filled" padding="lg" style="max-width: 320px;">
        <UiStack gap="4">
          <UiButton block>Full Width Button</UiButton>
          <UiButton block variant="outline">Full Width Outline</UiButton>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">States</h2>
      <UiCard variant="filled" padding="lg">
        <UiStack direction="row" gap="4" align="center" wrap="wrap">
          <UiButton disabled>Disabled</UiButton>
          <UiButton :loading="isLoading" @click="simulateLoad">
            {{ isLoading ? 'Loading...' : 'Click to load' }}
          </UiButton>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Active / Selected</h2>
      <p style="color: var(--text-secondary); font-size: var(--text-sm); margin-bottom: var(--spacing-4);">
        Use the <code>active</code> prop for toggle buttons, tab triggers, or selected states.
      </p>
      <UiCard variant="filled" padding="lg">
        <UiStack direction="row" gap="4" align="center" wrap="wrap">
          <UiButton variant="primary" active>Primary Active</UiButton>
          <UiButton variant="secondary" active>Secondary Active</UiButton>
          <UiButton variant="outline" active>Outline Active</UiButton>
          <UiButton variant="ghost" active>Ghost Active</UiButton>
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
            <td><code>variant</code></td>
            <td><code>'primary' | 'secondary' | 'outline' | 'ghost'</code></td>
            <td><code>'primary'</code></td>
            <td>Visual style variant</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Button size</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Disables the button</td>
          </tr>
          <tr>
            <td><code>loading</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Shows loading spinner</td>
          </tr>
          <tr>
            <td><code>active</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Active/selected state (for toggles, tabs)</td>
          </tr>
          <tr>
            <td><code>block</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Full width button</td>
          </tr>
          <tr>
            <td><code>iconLeft</code></td>
            <td><code>Component</code></td>
            <td><code>-</code></td>
            <td>Icon component on the left</td>
          </tr>
          <tr>
            <td><code>iconRight</code></td>
            <td><code>Component</code></td>
            <td><code>-</code></td>
            <td>Icon component on the right</td>
          </tr>
          <tr>
            <td><code>type</code></td>
            <td><code>'button' | 'submit' | 'reset'</code></td>
            <td><code>'button'</code></td>
            <td>HTML button type</td>
          </tr>
          <tr>
            <td><code>ariaLabel</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Accessible label (required for icon-only)</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
