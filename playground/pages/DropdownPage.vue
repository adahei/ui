<script setup lang="ts">
import { ref } from 'vue'
import {
  UiDropdown,
  UiDropdownTrigger,
  UiDropdownMenu,
  UiDropdownItem,
  UiDropdownSeparator,
  UiFormField,
  UiInputGroup,
  UiInput,
  UiButton,
  UiCard,
} from '@/components'
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  Edit,
  Copy,
  Trash,
  Share,
  Download,
  MoreHorizontal,
  Filter,
  ChevronDown,
} from 'lucide-vue-next'

const selectedAction = ref<string | null>(null)

function handleAction(action: string) {
  selectedAction.value = action
}
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiDropdown</h1>
    <p class="page__description">
      A dropdown menu component for displaying a list of actions or options.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiDropdown>
          <UiDropdownTrigger>Options</UiDropdownTrigger>
          <UiDropdownMenu>
            <UiDropdownItem @click="handleAction('edit')">Edit</UiDropdownItem>
            <UiDropdownItem @click="handleAction('duplicate')">Duplicate</UiDropdownItem>
            <UiDropdownItem @click="handleAction('archive')">Archive</UiDropdownItem>
            <UiDropdownSeparator />
            <UiDropdownItem destructive @click="handleAction('delete')">Delete</UiDropdownItem>
          </UiDropdownMenu>
        </UiDropdown>
        <p v-if="selectedAction" style="font-size: var(--text-sm); color: var(--text-secondary);">
          Last action: {{ selectedAction }}
        </p>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Icons</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiDropdown>
          <UiDropdownTrigger>
            <User style="width: 1rem; height: 1rem;" />
            Account
          </UiDropdownTrigger>
          <UiDropdownMenu>
            <UiDropdownItem :icon-left="User">Profile</UiDropdownItem>
            <UiDropdownItem :icon-left="Settings">Settings</UiDropdownItem>
            <UiDropdownItem :icon-left="HelpCircle">Help</UiDropdownItem>
            <UiDropdownSeparator />
            <UiDropdownItem :icon-left="LogOut" destructive>Sign out</UiDropdownItem>
          </UiDropdownMenu>
        </UiDropdown>

        <UiDropdown>
          <UiDropdownTrigger>Actions</UiDropdownTrigger>
          <UiDropdownMenu>
            <UiDropdownItem :icon-left="Edit">Edit</UiDropdownItem>
            <UiDropdownItem :icon-left="Copy">Copy</UiDropdownItem>
            <UiDropdownItem :icon-left="Share">Share</UiDropdownItem>
            <UiDropdownItem :icon-left="Download">Download</UiDropdownItem>
            <UiDropdownSeparator />
            <UiDropdownItem :icon-left="Trash" destructive>Delete</UiDropdownItem>
          </UiDropdownMenu>
        </UiDropdown>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiDropdown size="sm">
          <UiDropdownTrigger>Small</UiDropdownTrigger>
          <UiDropdownMenu>
            <UiDropdownItem>Option 1</UiDropdownItem>
            <UiDropdownItem>Option 2</UiDropdownItem>
          </UiDropdownMenu>
        </UiDropdown>

        <UiDropdown size="md">
          <UiDropdownTrigger>Medium</UiDropdownTrigger>
          <UiDropdownMenu>
            <UiDropdownItem>Option 1</UiDropdownItem>
            <UiDropdownItem>Option 2</UiDropdownItem>
          </UiDropdownMenu>
        </UiDropdown>

        <UiDropdown size="lg">
          <UiDropdownTrigger>Large</UiDropdownTrigger>
          <UiDropdownMenu>
            <UiDropdownItem>Option 1</UiDropdownItem>
            <UiDropdownItem>Option 2</UiDropdownItem>
          </UiDropdownMenu>
        </UiDropdown>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Placement</h2>
      <UiCard variant="filled" padding="lg" class="example-row" style="justify-content: space-between;">
        <UiDropdown placement="bottom-start">
          <UiDropdownTrigger>Bottom Start</UiDropdownTrigger>
          <UiDropdownMenu>
            <UiDropdownItem>Option 1</UiDropdownItem>
            <UiDropdownItem>Option 2</UiDropdownItem>
          </UiDropdownMenu>
        </UiDropdown>

        <UiDropdown placement="bottom-end">
          <UiDropdownTrigger>Bottom End</UiDropdownTrigger>
          <UiDropdownMenu>
            <UiDropdownItem>Option 1</UiDropdownItem>
            <UiDropdownItem>Option 2</UiDropdownItem>
          </UiDropdownMenu>
        </UiDropdown>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Disabled Items</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiDropdown>
          <UiDropdownTrigger>Options</UiDropdownTrigger>
          <UiDropdownMenu>
            <UiDropdownItem>Available option</UiDropdownItem>
            <UiDropdownItem disabled>Disabled option</UiDropdownItem>
            <UiDropdownItem>Another option</UiDropdownItem>
          </UiDropdownMenu>
        </UiDropdown>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">In InputGroup</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 500px;">
        <UiFormField label="Search with filter">
          <UiInputGroup>
            <UiDropdown>
              <UiDropdownTrigger>
                <Filter style="width: 1rem; height: 1rem;" />
                Filter
              </UiDropdownTrigger>
              <UiDropdownMenu>
                <UiDropdownItem>All</UiDropdownItem>
                <UiDropdownItem>Active</UiDropdownItem>
                <UiDropdownItem>Archived</UiDropdownItem>
              </UiDropdownMenu>
            </UiDropdown>
            <UiInput placeholder="Search..." style="flex: 1;" />
            <UiButton>Search</UiButton>
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Actions dropdown">
          <UiInputGroup>
            <UiInput placeholder="Enter value..." style="flex: 1;" />
            <UiDropdown>
              <UiDropdownTrigger :show-chevron="false">
                <MoreHorizontal style="width: 1rem; height: 1rem;" />
              </UiDropdownTrigger>
              <UiDropdownMenu>
                <UiDropdownItem :icon-left="Copy">Copy</UiDropdownItem>
                <UiDropdownItem :icon-left="Download">Export</UiDropdownItem>
                <UiDropdownSeparator />
                <UiDropdownItem :icon-left="Trash" destructive>Clear</UiDropdownItem>
              </UiDropdownMenu>
            </UiDropdown>
          </UiInputGroup>
        </UiFormField>

        <UiFormField label="Split button">
          <UiInputGroup>
            <UiButton style="flex: 1;">Save</UiButton>
            <UiDropdown>
              <UiDropdownTrigger :show-chevron="false" style="padding: 0 var(--spacing-2);">
                <ChevronDown style="width: 1rem; height: 1rem;" />
              </UiDropdownTrigger>
              <UiDropdownMenu>
                <UiDropdownItem>Save as draft</UiDropdownItem>
                <UiDropdownItem>Save and publish</UiDropdownItem>
                <UiDropdownItem>Save and close</UiDropdownItem>
              </UiDropdownMenu>
            </UiDropdown>
          </UiInputGroup>
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Links</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiDropdown>
          <UiDropdownTrigger>Navigation</UiDropdownTrigger>
          <UiDropdownMenu>
            <UiDropdownItem to="/button">Button Page</UiDropdownItem>
            <UiDropdownItem to="/input">Input Page</UiDropdownItem>
            <UiDropdownItem href="https://vuejs.org" target="_blank" rel="noopener">
              Vue.js (external)
            </UiDropdownItem>
          </UiDropdownMenu>
        </UiDropdown>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Props</h2>

      <h3 style="font-size: var(--text-base); margin: var(--spacing-4) 0 var(--spacing-2);">UiDropdown</h3>
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
            <td><code>placement</code></td>
            <td><code>'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'</code></td>
            <td><code>'bottom-start'</code></td>
            <td>Menu position relative to trigger</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Trigger and menu size</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Disable the dropdown</td>
          </tr>
        </tbody>
      </table>

      <h3 style="font-size: var(--text-base); margin: var(--spacing-4) 0 var(--spacing-2);">UiDropdownTrigger</h3>
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
            <td><code>showChevron</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Show dropdown chevron icon</td>
          </tr>
        </tbody>
      </table>

      <h3 style="font-size: var(--text-base); margin: var(--spacing-4) 0 var(--spacing-2);">UiDropdownItem</h3>
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
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Disable this item</td>
          </tr>
          <tr>
            <td><code>destructive</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Destructive/danger styling</td>
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
          <tr>
            <td><code>href</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>URL for anchor link</td>
          </tr>
          <tr>
            <td><code>to</code></td>
            <td><code>string | object</code></td>
            <td><code>-</code></td>
            <td>Route for vue-router</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
