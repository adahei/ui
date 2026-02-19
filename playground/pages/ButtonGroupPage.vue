<script setup lang="ts">
import { ref } from 'vue'
import { UiButtonGroup, UiButton, UiCard } from '@/components'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, Copy, Scissors, Clipboard, Edit, Trash2, Share } from 'lucide-vue-next'

const alignment = ref('left')
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiButtonGroup</h1>
    <p class="page__description">
      Groups buttons horizontally or vertically with connected styling. Also supports dropdowns.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiButtonGroup>
          <UiButton variant="outline">Left</UiButton>
          <UiButton variant="outline">Center</UiButton>
          <UiButton variant="outline">Right</UiButton>
        </UiButtonGroup>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Variants</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <div class="example-row">
          <UiButtonGroup>
            <UiButton variant="primary">One</UiButton>
            <UiButton variant="primary">Two</UiButton>
            <UiButton variant="primary">Three</UiButton>
          </UiButtonGroup>
        </div>
        <div class="example-row">
          <UiButtonGroup>
            <UiButton variant="secondary">One</UiButton>
            <UiButton variant="secondary">Two</UiButton>
            <UiButton variant="secondary">Three</UiButton>
          </UiButtonGroup>
        </div>
        <div class="example-row">
          <UiButtonGroup>
            <UiButton variant="outline">One</UiButton>
            <UiButton variant="outline">Two</UiButton>
            <UiButton variant="outline">Three</UiButton>
          </UiButtonGroup>
        </div>
        <div class="example-row">
          <UiButtonGroup>
            <UiButton variant="ghost">One</UiButton>
            <UiButton variant="ghost">Two</UiButton>
            <UiButton variant="ghost">Three</UiButton>
          </UiButtonGroup>
        </div>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Icon Buttons (Toolbar)</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <UiButtonGroup>
          <UiButton variant="outline" :icon-left="Bold" aria-label="Bold" />
          <UiButton variant="outline" :icon-left="Italic" aria-label="Italic" />
          <UiButton variant="outline" :icon-left="Underline" aria-label="Underline" />
        </UiButtonGroup>

        <UiButtonGroup>
          <UiButton
            v-for="align in ['left', 'center', 'right', 'justify']"
            :key="align"
            variant="outline"
            :active="alignment === align"
            :icon-left="{ left: AlignLeft, center: AlignCenter, right: AlignRight, justify: AlignJustify }[align]"
            :aria-label="`Align ${align}`"
            @click="alignment = align"
          />
        </UiButtonGroup>

        <UiButtonGroup>
          <UiButton variant="outline" :icon-left="Copy" aria-label="Copy" />
          <UiButton variant="outline" :icon-left="Scissors" aria-label="Cut" />
          <UiButton variant="outline" :icon-left="Clipboard" aria-label="Paste" />
        </UiButtonGroup>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <div class="example-row" style="align-items: flex-end;">
          <div class="size-item">
            <UiButtonGroup size="sm">
              <UiButton variant="outline">A</UiButton>
              <UiButton variant="outline">B</UiButton>
              <UiButton variant="outline">C</UiButton>
            </UiButtonGroup>
            <span class="size-label">sm</span>
          </div>
          <div class="size-item">
            <UiButtonGroup size="md">
              <UiButton variant="outline">A</UiButton>
              <UiButton variant="outline">B</UiButton>
              <UiButton variant="outline">C</UiButton>
            </UiButtonGroup>
            <span class="size-label">md</span>
          </div>
          <div class="size-item">
            <UiButtonGroup size="lg">
              <UiButton variant="outline">A</UiButton>
              <UiButton variant="outline">B</UiButton>
              <UiButton variant="outline">C</UiButton>
            </UiButtonGroup>
            <span class="size-label">lg</span>
          </div>
        </div>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Vertical Orientation</h2>
      <UiCard variant="filled" padding="lg" class="example-row" style="align-items: flex-start;">
        <UiButtonGroup orientation="vertical">
          <UiButton variant="outline">Profile</UiButton>
          <UiButton variant="outline">Settings</UiButton>
          <UiButton variant="outline">Messages</UiButton>
          <UiButton variant="outline">Logout</UiButton>
        </UiButtonGroup>

        <UiButtonGroup orientation="vertical">
          <UiButton variant="outline" :icon-left="Edit">Edit</UiButton>
          <UiButton variant="outline" :icon-left="Share">Share</UiButton>
          <UiButton variant="outline" :icon-left="Trash2">Delete</UiButton>
        </UiButtonGroup>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Mixed States</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiButtonGroup>
          <UiButton variant="outline">Normal</UiButton>
          <UiButton variant="outline" active>Active</UiButton>
          <UiButton variant="outline" disabled>Disabled</UiButton>
        </UiButtonGroup>
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
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Size applied to all child buttons</td>
          </tr>
          <tr>
            <td><code>orientation</code></td>
            <td><code>'horizontal' | 'vertical'</code></td>
            <td><code>'horizontal'</code></td>
            <td>Direction of button arrangement</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Usage Notes</h2>
      <ul class="features-list">
        <li>Child buttons automatically receive the group's size via provide/inject</li>
        <li>Border radius is automatically adjusted for connected appearance</li>
        <li>Use <code>variant="outline"</code> buttons for the best visual effect</li>
        <li>The <code>role="group"</code> attribute is applied for accessibility</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.size-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
}

.size-label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.features-list {
  margin: 0;
  padding-left: var(--spacing-5);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  color: var(--text-secondary);
}

.features-list code {
  background-color: var(--bg-secondary);
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
}
</style>
