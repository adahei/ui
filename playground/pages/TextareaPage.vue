<script setup lang="ts">
import { ref } from 'vue'
import { UiTextarea, UiFormField, UiCard } from '@/components'

const message = ref<string | null>(null)
const bio = ref<string | null>('This is a bio that can be edited.')
const feedback = ref<string | null>(null)
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiTextarea</h1>
    <p class="page__description">
      A styled textarea component for multi-line text input.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Message">
          <UiTextarea
            v-model="message"
            placeholder="Enter your message..."
          />
        </UiFormField>
        <p style="font-size: var(--text-sm); color: var(--text-secondary);">
          Value: {{ message ?? 'null' }}
        </p>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Small" size="sm">
          <UiTextarea size="sm" placeholder="Small textarea..." :rows="2" />
        </UiFormField>
        <UiFormField label="Medium">
          <UiTextarea size="md" placeholder="Medium textarea..." :rows="2" />
        </UiFormField>
        <UiFormField label="Large" size="lg">
          <UiTextarea size="lg" placeholder="Large textarea..." :rows="2" />
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Rows</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="2 Rows">
          <UiTextarea :rows="2" placeholder="2 rows..." />
        </UiFormField>
        <UiFormField label="5 Rows">
          <UiTextarea :rows="5" placeholder="5 rows..." />
        </UiFormField>
        <UiFormField label="10 Rows">
          <UiTextarea :rows="10" placeholder="10 rows..." />
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Resize Options</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Vertical (default)">
          <UiTextarea resize="vertical" placeholder="Can resize vertically..." :rows="2" />
        </UiFormField>
        <UiFormField label="Horizontal">
          <UiTextarea resize="horizontal" placeholder="Can resize horizontally..." :rows="2" />
        </UiFormField>
        <UiFormField label="Both">
          <UiTextarea resize="both" placeholder="Can resize in both directions..." :rows="2" />
        </UiFormField>
        <UiFormField label="None">
          <UiTextarea resize="none" placeholder="Cannot be resized..." :rows="2" />
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">States</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Disabled">
          <UiTextarea disabled placeholder="Cannot edit this..." />
        </UiFormField>
        <UiFormField label="Read-only">
          <UiTextarea v-model="bio" readonly />
        </UiFormField>
        <UiFormField label="With error" error="Please provide more details">
          <UiTextarea v-model="feedback" placeholder="Enter feedback..." />
        </UiFormField>
        <UiFormField label="With hint" hint="Minimum 100 characters">
          <UiTextarea placeholder="Write a detailed description..." />
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
            <td><code>string | null</code></td>
            <td><code>''</code></td>
            <td>v-model binding</td>
          </tr>
          <tr>
            <td><code>placeholder</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Placeholder text</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Textarea size (affects padding and font)</td>
          </tr>
          <tr>
            <td><code>rows</code></td>
            <td><code>number</code></td>
            <td><code>3</code></td>
            <td>Initial number of visible rows</td>
          </tr>
          <tr>
            <td><code>resize</code></td>
            <td><code>'none' | 'vertical' | 'horizontal' | 'both'</code></td>
            <td><code>'vertical'</code></td>
            <td>How the textarea can be resized</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Disables the textarea</td>
          </tr>
          <tr>
            <td><code>readonly</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Makes textarea read-only</td>
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
            <td>Textarea ID (auto-generated if not provided)</td>
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
