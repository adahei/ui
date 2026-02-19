<script setup lang="ts">
import { UiCard } from '@/components'
</script>

<template>
  <div class="page">
    <h1 class="page__title">@adahei/ui</h1>
    <p class="page__description">
      A Vue component library with WCAG-compliant, themeable components.
    </p>

    <UiCard>
      <template #header>
        <h2 style="margin: 0; font-size: var(--text-lg);">Getting Started</h2>
      </template>

      <div style="display: flex; flex-direction: column; gap: var(--spacing-4);">
        <div>
          <h3 style="font-size: var(--text-base); margin-bottom: var(--spacing-2);">Installation</h3>
          <code style="display: block; background: var(--bg-tertiary); padding: var(--spacing-3); border-radius: var(--radius-md); font-family: var(--font-mono);">
            npm install @adahei/ui
          </code>
        </div>

        <div>
          <h3 style="font-size: var(--text-base); margin-bottom: var(--spacing-2);">Import styles</h3>
          <code style="display: block; background: var(--bg-tertiary); padding: var(--spacing-3); border-radius: var(--radius-md); font-family: var(--font-mono);">
            import '@adahei/ui/styles'
          </code>
        </div>

        <div>
          <h3 style="font-size: var(--text-base); margin-bottom: var(--spacing-2);">Use components</h3>
          <code style="display: block; background: var(--bg-tertiary); padding: var(--spacing-3); border-radius: var(--radius-md); font-family: var(--font-mono);">
            import { UiButton } from '@adahei/ui'
          </code>
        </div>
      </div>
    </UiCard>
  </div>
</template>
