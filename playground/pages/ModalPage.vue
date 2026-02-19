<script setup lang="ts">
import { ref } from 'vue'
import { UiModal, UiButton, UiInput, UiFormField, UiCard } from '@/components'

const basicModal = ref(false)
const smallModal = ref(false)
const mediumModal = ref(false)
const largeModal = ref(false)
const noCloseModal = ref(false)
const formModal = ref(false)
const confirmModal = ref(false)
const scrollModal = ref(false)

function handleConfirm() {
  alert('Confirmed!')
  confirmModal.value = false
}
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiModal</h1>
    <p class="page__description">
      A modal dialog component built on the native <code>&lt;dialog&gt;</code> element for optimal accessibility and modern features.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <UiCard variant="filled" padding="lg">
        <UiButton @click="basicModal = true">Open Modal</UiButton>

        <UiModal v-model:open="basicModal" title="Basic Modal">
          <p>This is a basic modal with a title and close button.</p>
          <p>Click the backdrop, press Escape, or click the X to close.</p>
        </UiModal>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiButton variant="outline" @click="smallModal = true">Small (24rem)</UiButton>
        <UiButton variant="outline" @click="mediumModal = true">Medium (32rem)</UiButton>
        <UiButton variant="outline" @click="largeModal = true">Large (48rem)</UiButton>

        <UiModal v-model:open="smallModal" size="sm" title="Small Modal">
          <p>This is a small modal, good for simple confirmations or short messages.</p>
        </UiModal>

        <UiModal v-model:open="mediumModal" size="md" title="Medium Modal">
          <p>This is the default medium-sized modal, suitable for most content.</p>
          <p>It provides a good balance between readability and screen real estate.</p>
        </UiModal>

        <UiModal v-model:open="largeModal" size="lg" title="Large Modal">
          <p>This is a large modal, ideal for complex forms, data tables, or detailed content.</p>
          <p>Use this size when you need more horizontal space for your content.</p>
          <p>The modal will still be responsive and adapt to smaller screens.</p>
        </UiModal>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Footer Actions</h2>
      <UiCard variant="filled" padding="lg">
        <UiButton @click="confirmModal = true">Open Confirmation</UiButton>

        <UiModal v-model:open="confirmModal" size="sm" title="Confirm Action">
          <p>Are you sure you want to proceed with this action? This cannot be undone.</p>

          <template #footer>
            <UiButton variant="outline" @click="confirmModal = false">Cancel</UiButton>
            <UiButton @click="handleConfirm">Confirm</UiButton>
          </template>
        </UiModal>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Form in Modal</h2>
      <UiCard variant="filled" padding="lg">
        <UiButton @click="formModal = true">Open Form Modal</UiButton>

        <UiModal v-model:open="formModal" title="Edit Profile">
          <form class="modal-form" @submit.prevent="formModal = false">
            <UiFormField label="Full Name">
              <UiInput placeholder="Enter your name" />
            </UiFormField>
            <UiFormField label="Email">
              <UiInput type="email" placeholder="Enter your email" />
            </UiFormField>
            <UiFormField label="Bio">
              <UiInput placeholder="Tell us about yourself" />
            </UiFormField>
          </form>

          <template #footer>
            <UiButton variant="outline" @click="formModal = false">Cancel</UiButton>
            <UiButton @click="formModal = false">Save Changes</UiButton>
          </template>
        </UiModal>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Scrollable Content</h2>
      <UiCard variant="filled" padding="lg">
        <UiButton @click="scrollModal = true">Open Long Content</UiButton>

        <UiModal v-model:open="scrollModal" title="Terms and Conditions">
          <div class="long-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
            <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
            <p>Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
            <p>Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</p>
            <p>Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.</p>
          </div>

          <template #footer>
            <UiButton @click="scrollModal = false">I Accept</UiButton>
          </template>
        </UiModal>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Disable Close Options</h2>
      <UiCard variant="filled" padding="lg">
        <UiButton @click="noCloseModal = true">Open Persistent Modal</UiButton>

        <UiModal
          v-model:open="noCloseModal"
          title="Important Notice"
          :close-on-backdrop="false"
          :close-on-escape="false"
          :show-close-button="false"
        >
          <p>This modal cannot be dismissed by clicking the backdrop, pressing Escape, or using a close button.</p>
          <p>You must use the button below to close it.</p>

          <template #footer>
            <UiButton @click="noCloseModal = false">I Understand</UiButton>
          </template>
        </UiModal>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Features</h2>
      <ul class="features-list">
        <li>Built on native <code>&lt;dialog&gt;</code> element</li>
        <li>Automatic focus trapping (native browser behavior)</li>
        <li>Escape key closes modal (configurable)</li>
        <li>Click outside to close (configurable)</li>
        <li>Smooth open/close animations using <code>@starting-style</code></li>
        <li>Dark overlay using <code>::backdrop</code> pseudo-element</li>
        <li>Renders in top-layer (no z-index issues)</li>
        <li>Scrollable body for long content</li>
        <li>Responsive sizing</li>
      </ul>
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
            <td><code>open</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Controls modal visibility (v-model:open)</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Modal width (24rem / 32rem / 48rem)</td>
          </tr>
          <tr>
            <td><code>title</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Modal title in header</td>
          </tr>
          <tr>
            <td><code>closeOnBackdrop</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Close when clicking backdrop</td>
          </tr>
          <tr>
            <td><code>closeOnEscape</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Close when pressing Escape</td>
          </tr>
          <tr>
            <td><code>showCloseButton</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Show X button in header</td>
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
            <td>Modal body content</td>
          </tr>
          <tr>
            <td><code>header</code></td>
            <td>Custom header content (replaces title)</td>
          </tr>
          <tr>
            <td><code>footer</code></td>
            <td>Footer content (typically action buttons)</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Events</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Payload</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>update:open</code></td>
            <td><code>boolean</code></td>
            <td>Emitted when open state changes</td>
          </tr>
          <tr>
            <td><code>close</code></td>
            <td>-</td>
            <td>Emitted when modal closes</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.modal-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.long-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.long-content p {
  margin: 0;
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
