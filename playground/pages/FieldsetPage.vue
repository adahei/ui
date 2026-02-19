<script setup lang="ts">
import { ref } from 'vue'
import { UiFieldset, UiCheckbox, UiRadio, UiInput, UiCard } from '@/components'

const notifications = ref({
  email: true,
  sms: false,
  push: true,
})

const selectedPlan = ref('pro')
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiFieldset</h1>
    <p class="page__description">
      A semantic grouping component for related form controls using native fieldset and legend elements.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <UiFieldset legend="Notification Preferences">
          <UiCheckbox v-model="notifications.email" label="Email notifications" />
          <UiCheckbox v-model="notifications.sms" label="SMS notifications" />
          <UiCheckbox v-model="notifications.push" label="Push notifications" />
        </UiFieldset>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Radio Buttons</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <UiFieldset legend="Select a Plan">
          <UiRadio v-model="selectedPlan" name="plan" value="free" label="Free - $0/month" />
          <UiRadio v-model="selectedPlan" name="plan" value="pro" label="Pro - $9/month" />
          <UiRadio v-model="selectedPlan" name="plan" value="enterprise" label="Enterprise - $29/month" />
        </UiFieldset>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Plain Variant</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <UiFieldset legend="Account Settings" variant="plain">
          <UiCheckbox label="Enable two-factor authentication" />
          <UiCheckbox label="Show online status" />
          <UiCheckbox label="Allow profile discovery" />
        </UiFieldset>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Disabled State</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <UiFieldset legend="Premium Features" disabled>
          <UiCheckbox label="Advanced analytics" />
          <UiCheckbox label="Priority support" />
          <UiCheckbox label="Custom branding" />
        </UiFieldset>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Inputs</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <UiFieldset legend="Shipping Address">
          <UiInput placeholder="Street address" />
          <UiInput placeholder="City" />
          <UiInput placeholder="Postal code" />
        </UiFieldset>
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
            <td><code>legend</code></td>
            <td><code>string</code></td>
            <td><em>required</em></td>
            <td>Legend text for the fieldset</td>
          </tr>
          <tr>
            <td><code>variant</code></td>
            <td><code>'default' | 'plain'</code></td>
            <td><code>'default'</code></td>
            <td>Visual variant</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Disable all fields in the group</td>
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
            <td>Form controls to group</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
