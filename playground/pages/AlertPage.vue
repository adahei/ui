<script setup lang="ts">
import { ref } from 'vue'
import { UiAlert, UiButton, UiCard } from '@/components'

const showDismissible = ref(true)

function resetDismissible() {
  showDismissible.value = true
}
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiAlert</h1>
    <p class="page__description">
      Inline banners for displaying important messages with different status levels.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Variants</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <UiAlert variant="info" title="Information">
          This is an informational message with helpful details.
        </UiAlert>

        <UiAlert variant="success" title="Success">
          Your changes have been saved successfully.
        </UiAlert>

        <UiAlert variant="warning" title="Warning">
          Please review your input before continuing.
        </UiAlert>

        <UiAlert variant="error" title="Error">
          Something went wrong. Please try again later.
        </UiAlert>

        <UiAlert variant="neutral" title="Note">
          This is a neutral message for general information.
        </UiAlert>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Without Title</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <UiAlert variant="info">
          A simple informational message without a title.
        </UiAlert>

        <UiAlert variant="success">
          Operation completed successfully.
        </UiAlert>

        <UiAlert variant="warning">
          Your session will expire in 5 minutes.
        </UiAlert>

        <UiAlert variant="error">
          Failed to load data. Check your connection.
        </UiAlert>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Title Only</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <UiAlert variant="info" title="New features available" />
        <UiAlert variant="success" title="Payment received" />
        <UiAlert variant="warning" title="Scheduled maintenance tonight" />
        <UiAlert variant="error" title="Connection lost" />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Dismissible</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <UiAlert
          v-if="showDismissible"
          variant="info"
          title="Dismissible Alert"
          dismissible
          @dismiss="showDismissible = false"
        >
          Click the X button to dismiss this alert.
        </UiAlert>

        <UiButton v-else variant="outline" size="sm" @click="resetDismissible">
          Show Alert Again
        </UiButton>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Without Icon</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <UiAlert variant="info" title="No Icon" hide-icon>
          This alert has no icon displayed.
        </UiAlert>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Actions</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <UiAlert variant="warning" title="Unsaved Changes">
          You have unsaved changes that will be lost.
          <template #actions>
            <UiButton size="sm" variant="outline">Discard</UiButton>
            <UiButton size="sm">Save Changes</UiButton>
          </template>
        </UiAlert>

        <UiAlert variant="error" title="Authentication Required">
          Your session has expired. Please log in again.
          <template #actions>
            <UiButton size="sm">Log In</UiButton>
          </template>
        </UiAlert>

        <UiAlert variant="info" title="Update Available">
          A new version is available with bug fixes and improvements.
          <template #actions>
            <UiButton size="sm" variant="ghost">Later</UiButton>
            <UiButton size="sm">Update Now</UiButton>
          </template>
        </UiAlert>
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
            <td><code>'info' | 'success' | 'warning' | 'error' | 'neutral'</code></td>
            <td><code>'info'</code></td>
            <td>Alert status/variant</td>
          </tr>
          <tr>
            <td><code>title</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Alert title</td>
          </tr>
          <tr>
            <td><code>dismissible</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Show close button</td>
          </tr>
          <tr>
            <td><code>hideIcon</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Hide the status icon</td>
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
            <td>Alert message content</td>
          </tr>
          <tr>
            <td><code>actions</code></td>
            <td>Action buttons</td>
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
            <td><code>dismiss</code></td>
            <td><code>-</code></td>
            <td>Emitted when close button is clicked</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
