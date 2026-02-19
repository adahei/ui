<script setup lang="ts">
import { ref } from 'vue'
import {
  UiTabs,
  UiTabList,
  UiTabTrigger,
  UiTabPanel,
  UiCard,
} from '@/components'
import { User, Settings, Bell, CreditCard, Shield } from 'lucide-vue-next'

const controlledTab = ref('account')
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiTabs</h1>
    <p class="page__description">
      A tabbed interface component for organizing content into selectable panels.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Tabs</h2>
      <UiCard variant="filled" padding="lg">
        <UiTabs default-value="tab1">
          <UiTabList aria-label="Account settings">
            <UiTabTrigger value="tab1">Account</UiTabTrigger>
            <UiTabTrigger value="tab2">Password</UiTabTrigger>
            <UiTabTrigger value="tab3">Notifications</UiTabTrigger>
          </UiTabList>
          <UiTabPanel value="tab1">
            <p>Manage your account settings and preferences.</p>
          </UiTabPanel>
          <UiTabPanel value="tab2">
            <p>Change your password and security settings.</p>
          </UiTabPanel>
          <UiTabPanel value="tab3">
            <p>Configure how you receive notifications.</p>
          </UiTabPanel>
        </UiTabs>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Icons</h2>
      <UiCard variant="filled" padding="lg">
        <UiTabs default-value="profile">
          <UiTabList aria-label="Settings tabs">
            <UiTabTrigger value="profile" :icon-left="User">Profile</UiTabTrigger>
            <UiTabTrigger value="settings" :icon-left="Settings">Settings</UiTabTrigger>
            <UiTabTrigger value="notifications" :icon-left="Bell">Notifications</UiTabTrigger>
          </UiTabList>
          <UiTabPanel value="profile">
            <p>View and edit your profile information.</p>
          </UiTabPanel>
          <UiTabPanel value="settings">
            <p>Adjust your application settings.</p>
          </UiTabPanel>
          <UiTabPanel value="notifications">
            <p>Manage notification preferences.</p>
          </UiTabPanel>
        </UiTabs>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg" class="example-column">
        <div>
          <p class="size-label">Small</p>
          <UiTabs default-value="s1">
            <UiTabList size="sm" aria-label="Small tabs">
              <UiTabTrigger value="s1">First</UiTabTrigger>
              <UiTabTrigger value="s2">Second</UiTabTrigger>
              <UiTabTrigger value="s3">Third</UiTabTrigger>
            </UiTabList>
            <UiTabPanel value="s1">Small tab content.</UiTabPanel>
            <UiTabPanel value="s2">Second tab content.</UiTabPanel>
            <UiTabPanel value="s3">Third tab content.</UiTabPanel>
          </UiTabs>
        </div>

        <div>
          <p class="size-label">Medium (default)</p>
          <UiTabs default-value="m1">
            <UiTabList size="md" aria-label="Medium tabs">
              <UiTabTrigger value="m1">First</UiTabTrigger>
              <UiTabTrigger value="m2">Second</UiTabTrigger>
              <UiTabTrigger value="m3">Third</UiTabTrigger>
            </UiTabList>
            <UiTabPanel value="m1">Medium tab content.</UiTabPanel>
            <UiTabPanel value="m2">Second tab content.</UiTabPanel>
            <UiTabPanel value="m3">Third tab content.</UiTabPanel>
          </UiTabs>
        </div>

        <div>
          <p class="size-label">Large</p>
          <UiTabs default-value="l1">
            <UiTabList size="lg" aria-label="Large tabs">
              <UiTabTrigger value="l1">First</UiTabTrigger>
              <UiTabTrigger value="l2">Second</UiTabTrigger>
              <UiTabTrigger value="l3">Third</UiTabTrigger>
            </UiTabList>
            <UiTabPanel value="l1">Large tab content.</UiTabPanel>
            <UiTabPanel value="l2">Second tab content.</UiTabPanel>
            <UiTabPanel value="l3">Third tab content.</UiTabPanel>
          </UiTabs>
        </div>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Disabled Tabs</h2>
      <UiCard variant="filled" padding="lg">
        <UiTabs default-value="enabled1">
          <UiTabList aria-label="Tabs with disabled option">
            <UiTabTrigger value="enabled1">Available</UiTabTrigger>
            <UiTabTrigger value="disabled1" disabled>Unavailable</UiTabTrigger>
            <UiTabTrigger value="enabled2">Also Available</UiTabTrigger>
          </UiTabList>
          <UiTabPanel value="enabled1">
            <p>This tab is available.</p>
          </UiTabPanel>
          <UiTabPanel value="disabled1">
            <p>This content is not accessible.</p>
          </UiTabPanel>
          <UiTabPanel value="enabled2">
            <p>This tab is also available.</p>
          </UiTabPanel>
        </UiTabs>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Controlled</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Use <code>v-model</code> to control the active tab programmatically.
      </p>
      <UiCard variant="filled" padding="lg" class="example-column">
        <div class="control-buttons">
          <button @click="controlledTab = 'account'" :class="{ active: controlledTab === 'account' }">Account</button>
          <button @click="controlledTab = 'billing'" :class="{ active: controlledTab === 'billing' }">Billing</button>
          <button @click="controlledTab = 'security'" :class="{ active: controlledTab === 'security' }">Security</button>
        </div>

        <UiTabs v-model="controlledTab">
          <UiTabList aria-label="Controlled tabs">
            <UiTabTrigger value="account" :icon-left="User">Account</UiTabTrigger>
            <UiTabTrigger value="billing" :icon-left="CreditCard">Billing</UiTabTrigger>
            <UiTabTrigger value="security" :icon-left="Shield">Security</UiTabTrigger>
          </UiTabList>
          <UiTabPanel value="account">
            <p>Account settings and profile information.</p>
          </UiTabPanel>
          <UiTabPanel value="billing">
            <p>Billing information and payment methods.</p>
          </UiTabPanel>
          <UiTabPanel value="security">
            <p>Security settings and two-factor authentication.</p>
          </UiTabPanel>
        </UiTabs>

        <p style="font-size: var(--text-sm); color: var(--text-tertiary);">
          Current tab: <code>{{ controlledTab }}</code>
        </p>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Props</h2>

      <h3 style="font-size: var(--text-base); margin: var(--spacing-4) 0 var(--spacing-2);">UiTabs</h3>
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
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Controlled active tab value</td>
          </tr>
          <tr>
            <td><code>defaultValue</code></td>
            <td><code>string</code></td>
            <td><code>''</code></td>
            <td>Initial active tab (uncontrolled)</td>
          </tr>
        </tbody>
      </table>

      <h3 style="font-size: var(--text-base); margin: var(--spacing-4) 0 var(--spacing-2);">UiTabList</h3>
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
            <td>Size of tab triggers</td>
          </tr>
        </tbody>
      </table>

      <h3 style="font-size: var(--text-base); margin: var(--spacing-4) 0 var(--spacing-2);">UiTabTrigger</h3>
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
            <td><code>value</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Unique identifier for the tab (required)</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Disable the tab</td>
          </tr>
          <tr>
            <td><code>iconLeft</code></td>
            <td><code>Component</code></td>
            <td><code>-</code></td>
            <td>Icon before text</td>
          </tr>
          <tr>
            <td><code>iconRight</code></td>
            <td><code>Component</code></td>
            <td><code>-</code></td>
            <td>Icon after text</td>
          </tr>
        </tbody>
      </table>

      <h3 style="font-size: var(--text-base); margin: var(--spacing-4) 0 var(--spacing-2);">UiTabPanel</h3>
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
            <td><code>value</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Matches the corresponding trigger value (required)</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Keyboard Navigation</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ArrowRight</code></td>
            <td>Move to next tab</td>
          </tr>
          <tr>
            <td><code>ArrowLeft</code></td>
            <td>Move to previous tab</td>
          </tr>
          <tr>
            <td><code>Home</code></td>
            <td>Move to first tab</td>
          </tr>
          <tr>
            <td><code>End</code></td>
            <td>Move to last tab</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.size-label {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  margin-bottom: var(--spacing-2);
}

.control-buttons {
  display: flex;
  gap: var(--spacing-2);
}

.control-buttons button {
  padding: var(--spacing-1-5) var(--spacing-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.control-buttons button:hover {
  border-color: var(--border-secondary);
  color: var(--text-primary);
}

.control-buttons button.active {
  border-color: var(--border-focus);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}
</style>
