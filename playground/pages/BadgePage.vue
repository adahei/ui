<script setup lang="ts">
import { UiBadge, UiButton, UiCard } from '@/components'
import { Bell, Mail } from 'lucide-vue-next'
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiBadge</h1>
    <p class="page__description">
      A small status indicator that can display as a colored dot or contain text/numbers.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Variants</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiBadge variant="primary">5</UiBadge>
        <UiBadge variant="secondary">12</UiBadge>
        <UiBadge variant="success">3</UiBadge>
        <UiBadge variant="warning">!</UiBadge>
        <UiBadge variant="error">99+</UiBadge>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Dot Mode</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        When no content is provided or <code>dot</code> prop is set, the badge renders as a small circle.
      </p>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiBadge variant="primary" dot />
        <UiBadge variant="secondary" dot />
        <UiBadge variant="success" dot />
        <UiBadge variant="warning" dot />
        <UiBadge variant="error" dot />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <div class="size-row">
          <span class="size-label">Small</span>
          <div class="badge-group">
            <UiBadge size="sm">5</UiBadge>
            <UiBadge size="sm" variant="success">OK</UiBadge>
            <UiBadge size="sm" dot />
          </div>
        </div>
        <div class="size-row">
          <span class="size-label">Medium</span>
          <div class="badge-group">
            <UiBadge size="md">5</UiBadge>
            <UiBadge size="md" variant="success">OK</UiBadge>
            <UiBadge size="md" dot />
          </div>
        </div>
        <div class="size-row">
          <span class="size-label">Large</span>
          <div class="badge-group">
            <UiBadge size="lg">5</UiBadge>
            <UiBadge size="lg" variant="success">OK</UiBadge>
            <UiBadge size="lg" dot />
          </div>
        </div>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Icons/Buttons</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Position badges relative to other elements using CSS.
      </p>
      <UiCard variant="filled" padding="lg" class="example-row">
        <span class="icon-badge-wrapper">
          <Bell class="example-icon" />
          <UiBadge variant="error" size="sm" class="icon-badge">3</UiBadge>
        </span>

        <span class="icon-badge-wrapper">
          <Mail class="example-icon" />
          <UiBadge variant="primary" size="sm" dot class="icon-badge" />
        </span>

        <span class="button-badge-wrapper">
          <UiButton variant="secondary">
            Notifications
          </UiButton>
          <UiBadge variant="error" size="sm" class="button-badge">12</UiBadge>
        </span>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Text Content</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiBadge>1</UiBadge>
        <UiBadge>42</UiBadge>
        <UiBadge>99+</UiBadge>
        <UiBadge variant="success">New</UiBadge>
        <UiBadge variant="warning">Beta</UiBadge>
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
            <td><code>'primary' | 'secondary' | 'success' | 'warning' | 'error'</code></td>
            <td><code>'primary'</code></td>
            <td>Color variant</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Badge size</td>
          </tr>
          <tr>
            <td><code>dot</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Force dot mode (no content)</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.size-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.size-label {
  width: 5rem;
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.badge-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.icon-badge-wrapper {
  position: relative;
  display: inline-flex;
}

.example-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--text-secondary);
}

.icon-badge {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
}

.button-badge-wrapper {
  position: relative;
  display: inline-flex;
}

.button-badge {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
}
</style>
