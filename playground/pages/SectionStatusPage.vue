<script setup lang="ts">
import { ref } from 'vue'
import { UiSectionStatus, UiButton, UiBadge, UiStack, UiCard } from '@/components'
import { RefreshCw, Lock, Unlock, Trash2, Edit, Check } from 'lucide-vue-next'

const isLoading = ref(false)

function simulateLoading() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiSectionStatus</h1>
    <p class="page__description">
      A compact status row component for displaying a labeled item with status badges and action buttons.
      Useful for showing the state of multiple sections/items that can be individually acted upon.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <UiStack gap="2">
        <UiSectionStatus label="Appearance" />
        <UiSectionStatus label="Photography Style" />
        <UiSectionStatus label="Fashion Details" />
      </UiStack>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Badges</h2>
      <UiStack gap="2">
        <UiSectionStatus label="Appearance">
          <template #badges>
            <UiBadge variant="success" size="sm">Generated</UiBadge>
          </template>
        </UiSectionStatus>

        <UiSectionStatus label="Photography Style">
          <template #badges>
            <UiBadge variant="warning" size="sm">Pending</UiBadge>
          </template>
        </UiSectionStatus>

        <UiSectionStatus label="Fashion Details">
          <template #badges>
            <UiBadge variant="primary" size="sm">New</UiBadge>
            <UiBadge variant="secondary" size="sm">Draft</UiBadge>
          </template>
        </UiSectionStatus>
      </UiStack>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Actions</h2>
      <UiStack gap="2">
        <UiSectionStatus label="Appearance">
          <template #badges>
            <UiBadge variant="success" size="sm">Generated</UiBadge>
          </template>
          <template #actions>
            <UiButton size="sm" variant="ghost" :icon-left="RefreshCw" />
          </template>
        </UiSectionStatus>

        <UiSectionStatus label="Photography Style">
          <template #badges>
            <UiBadge variant="success" size="sm">Generated</UiBadge>
            <UiBadge variant="secondary" size="sm">Locked</UiBadge>
          </template>
          <template #actions>
            <UiButton size="sm" variant="ghost" :icon-left="Unlock" />
            <UiButton size="sm" variant="ghost" :icon-left="RefreshCw" />
          </template>
        </UiSectionStatus>

        <UiSectionStatus label="Fashion Details">
          <template #actions>
            <UiButton size="sm" variant="outline" :icon-left="Edit">Edit</UiButton>
            <UiButton size="sm" variant="ghost" :icon-left="Trash2" />
          </template>
        </UiSectionStatus>
      </UiStack>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Status States</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Visual status states: <code>default</code>, <code>changed</code>, <code>error</code>, <code>success</code>.
      </p>
      <UiStack gap="2">
        <UiSectionStatus label="Default State" status="default">
          <template #badges>
            <UiBadge variant="secondary" size="sm">Default</UiBadge>
          </template>
          <template #actions>
            <UiButton size="sm" variant="ghost" :icon-left="RefreshCw" />
          </template>
        </UiSectionStatus>

        <UiSectionStatus label="Changed State" status="changed">
          <template #badges>
            <UiBadge variant="warning" size="sm">Unsaved</UiBadge>
          </template>
          <template #actions>
            <UiButton size="sm" variant="ghost" :icon-left="Check" />
            <UiButton size="sm" variant="ghost" :icon-left="RefreshCw" />
          </template>
        </UiSectionStatus>

        <UiSectionStatus label="Error State" status="error">
          <template #badges>
            <UiBadge variant="error" size="sm">Failed</UiBadge>
          </template>
          <template #actions>
            <UiButton size="sm" variant="ghost" :icon-left="RefreshCw" />
          </template>
        </UiSectionStatus>

        <UiSectionStatus label="Success State" status="success">
          <template #badges>
            <UiBadge variant="success" size="sm">Complete</UiBadge>
          </template>
          <template #actions>
            <UiButton size="sm" variant="ghost" :icon-left="Lock" />
          </template>
        </UiSectionStatus>
      </UiStack>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Loading State</h2>
      <UiStack gap="2">
        <UiSectionStatus label="Processing..." :loading="isLoading">
          <template #badges>
            <UiBadge variant="primary" size="sm">Generating</UiBadge>
          </template>
          <template #actions>
            <UiButton size="sm" variant="ghost" :icon-left="RefreshCw" :loading="isLoading" />
          </template>
        </UiSectionStatus>

        <UiButton @click="simulateLoading" :disabled="isLoading">
          {{ isLoading ? 'Loading...' : 'Simulate Loading' }}
        </UiButton>
      </UiStack>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Disabled State</h2>
      <UiSectionStatus label="Locked Section" disabled>
        <template #badges>
          <UiBadge variant="secondary" size="sm">Locked</UiBadge>
        </template>
        <template #actions>
          <UiButton size="sm" variant="ghost" :icon-left="Lock" disabled />
        </template>
      </UiSectionStatus>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Responsive Behavior (Container Queries)</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        The component adapts layout based on container width. Resize the container to see the narrow layout.
      </p>
      <UiStack gap="4">
        <UiCard variant="outline" padding="md" style="max-width: 500px;">
          <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--spacing-2);">Wide container (500px)</p>
          <UiSectionStatus label="Appearance Section">
            <template #badges>
              <UiBadge variant="success" size="sm">Generated</UiBadge>
              <UiBadge variant="secondary" size="sm">Locked</UiBadge>
            </template>
            <template #actions>
              <UiButton size="sm" variant="ghost" :icon-left="Unlock" />
              <UiButton size="sm" variant="ghost" :icon-left="RefreshCw" />
            </template>
          </UiSectionStatus>
        </UiCard>

        <UiCard variant="outline" padding="md" style="max-width: 300px;">
          <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--spacing-2);">Narrow container (300px)</p>
          <UiSectionStatus label="Appearance Section">
            <template #badges>
              <UiBadge variant="success" size="sm">Generated</UiBadge>
              <UiBadge variant="secondary" size="sm">Locked</UiBadge>
            </template>
            <template #actions>
              <UiButton size="sm" variant="ghost" :icon-left="Unlock" />
              <UiButton size="sm" variant="ghost" :icon-left="RefreshCw" />
            </template>
          </UiSectionStatus>
        </UiCard>
      </UiStack>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Real-World Example</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Content generation sections with individual regeneration and lock controls.
      </p>
      <UiCard variant="filled" padding="md">
        <UiStack gap="2">
          <UiSectionStatus label="Character Appearance" status="success">
            <template #badges>
              <UiBadge variant="success" size="sm">Generated</UiBadge>
            </template>
            <template #actions>
              <UiButton size="sm" variant="ghost" :icon-left="Lock" title="Lock section" />
              <UiButton size="sm" variant="ghost" :icon-left="RefreshCw" title="Regenerate" />
            </template>
          </UiSectionStatus>

          <UiSectionStatus label="Photography Style" status="changed">
            <template #badges>
              <UiBadge variant="warning" size="sm">Modified</UiBadge>
            </template>
            <template #actions>
              <UiButton size="sm" variant="ghost" :icon-left="Check" title="Save changes" />
              <UiButton size="sm" variant="ghost" :icon-left="RefreshCw" title="Regenerate" />
            </template>
          </UiSectionStatus>

          <UiSectionStatus label="Fashion Details" status="error">
            <template #badges>
              <UiBadge variant="error" size="sm">Error</UiBadge>
            </template>
            <template #actions>
              <UiButton size="sm" variant="ghost" :icon-left="RefreshCw" title="Retry" />
            </template>
          </UiSectionStatus>

          <UiSectionStatus label="Background Setting">
            <template #badges>
              <UiBadge variant="secondary" size="sm">Pending</UiBadge>
            </template>
            <template #actions>
              <UiButton size="sm" variant="outline" :icon-left="RefreshCw">Generate</UiButton>
            </template>
          </UiSectionStatus>
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
            <td><code>label</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>The section/item label text</td>
          </tr>
          <tr>
            <td><code>status</code></td>
            <td><code>'default' | 'changed' | 'error' | 'success'</code></td>
            <td><code>'default'</code></td>
            <td>Visual status state affecting border/background color</td>
          </tr>
          <tr>
            <td><code>loading</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Whether the item is in a loading state (reduces opacity)</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Visual disabled state</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Slots</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Slot</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>default</code></td>
            <td>Custom label content (overrides label prop)</td>
          </tr>
          <tr>
            <td><code>badges</code></td>
            <td>Badge indicators using UiBadge components</td>
          </tr>
          <tr>
            <td><code>actions</code></td>
            <td>Action buttons to display on the right side</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
