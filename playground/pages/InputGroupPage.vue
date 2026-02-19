<script setup lang="ts">
import { ref } from 'vue'
import { UiInput, UiInputGroup, UiInputGroupText, UiButton, UiFormField, UiCard } from '@/components'
import { AtSign, Copy, Send, Eye, EyeOff, Mail } from 'lucide-vue-next'

const username = ref('')
const price = ref<number | null>(null)
const website = ref('')
const email = ref('')
const copyText = ref('https://example.com/share/abc123')
const message = ref('')
const password = ref('')
const showPassword = ref(false)

function handleCopy() {
  navigator.clipboard.writeText(copyText.value)
}

function handleSend() {
  alert(`Sending: ${message.value}`)
  message.value = ''
}

function togglePassword() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiInputGroup</h1>
    <p class="page__description">
      Combine inputs with text addons and buttons for cohesive form controls.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Text Addons</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Username">
          <UiInputGroup>
            <UiInputGroupText>@</UiInputGroupText>
            <UiInput v-model="username" placeholder="Username" />
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Price">
          <UiInputGroup>
            <UiInputGroupText>$</UiInputGroupText>
            <UiInput v-model="price" type="number" placeholder="0.00" />
            <UiInputGroupText>.00</UiInputGroupText>
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Website">
          <UiInputGroup>
            <UiInputGroupText>https://</UiInputGroupText>
            <UiInput v-model="website" placeholder="example.com" />
          </UiInputGroup>
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Icons</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Email">
          <UiInputGroup>
            <UiInputGroupText><AtSign /></UiInputGroupText>
            <UiInput v-model="email" type="email" placeholder="you@example.com" />
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Newsletter">
          <UiInputGroup>
            <UiInputGroupText><Mail /></UiInputGroupText>
            <UiInput placeholder="Enter email address" />
            <UiButton variant="primary">Subscribe</UiButton>
          </UiInputGroup>
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Buttons</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Password">
          <UiInputGroup>
            <UiInput
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter password"
            />
            <UiButton
              variant="ghost"
              :icon-left="showPassword ? EyeOff : Eye"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              @click="togglePassword"
            />
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Share link">
          <UiInputGroup>
            <UiInput v-model="copyText" readonly />
            <UiButton variant="outline" :icon-left="Copy" aria-label="Copy to clipboard" @click="handleCopy" />
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Message">
          <UiInputGroup>
            <UiInput v-model="message" placeholder="Type a message..." />
            <UiButton :icon-left="Send" @click="handleSend">Send</UiButton>
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Search">
          <UiInputGroup>
            <UiButton variant="secondary">Search</UiButton>
            <UiInput placeholder="Enter search term..." />
            <UiButton variant="outline">Options</UiButton>
          </UiInputGroup>
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Small" size="sm">
          <UiInputGroup size="sm">
            <UiInputGroupText>$</UiInputGroupText>
            <UiInput placeholder="0.00" />
            <UiButton>Go</UiButton>
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Medium">
          <UiInputGroup size="md">
            <UiInputGroupText>$</UiInputGroupText>
            <UiInput placeholder="0.00" />
            <UiButton>Go</UiButton>
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Large" size="lg">
          <UiInputGroup size="lg">
            <UiInputGroupText>$</UiInputGroupText>
            <UiInput placeholder="0.00" />
            <UiButton>Go</UiButton>
          </UiInputGroup>
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Error</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 400px;">
        <UiFormField label="Username" error="Username is already taken">
          <UiInputGroup>
            <UiInputGroupText>@</UiInputGroupText>
            <UiInput v-model="username" placeholder="Username" />
          </UiInputGroup>
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Props</h2>
      <h3 style="font-size: var(--text-base); margin-bottom: var(--spacing-2);">UiInputGroup</h3>
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
            <td>Size of the input group (inherited by children)</td>
          </tr>
        </tbody>
      </table>

      <h3 style="font-size: var(--text-base); margin: var(--spacing-4) 0 var(--spacing-2);">UiInputGroupText</h3>
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
            <td><code>inherited</code></td>
            <td>Size override (inherits from UiInputGroup)</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
