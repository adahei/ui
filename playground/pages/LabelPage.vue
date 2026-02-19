<script setup lang="ts">
import { UiLabel, UiInput, UiCard } from '@/components'
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiLabel</h1>
    <p class="page__description">
      A simple label component for form fields with optional required indicator.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 320px;">
        <div>
          <UiLabel html-for="name">Name</UiLabel>
          <UiInput id="name" placeholder="Enter your name" />
        </div>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Required</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 320px;">
        <div>
          <UiLabel html-for="email" required>Email address</UiLabel>
          <UiInput id="email" type="email" placeholder="you@example.com" />
        </div>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 320px;">
        <UiLabel size="sm">Small label</UiLabel>
        <UiLabel size="md">Medium label</UiLabel>
        <UiLabel size="lg">Large label</UiLabel>
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
            <td><code>htmlFor</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>ID of the associated form element</td>
          </tr>
          <tr>
            <td><code>required</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Shows required indicator (*)</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Label size</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
