<script setup lang="ts">
import { ref } from 'vue'
import { UiAccordion, UiAccordionItem, UiCard, UiBadge, UiStack, UiButton } from '@/components'
import { Lock, Unlock, MoreVertical } from 'lucide-vue-next'

const openItems = ref<(string | number)[]>(['item-1'])
const multipleOpen = ref<(string | number)[]>(['faq-1', 'faq-3'])
const nonCollapsible = ref<(string | number)[]>(['always-1'])
const actionsOpen = ref<(string | number)[]>(['actions-1'])
const lockedItems = ref<Set<string | number>>(new Set())

function toggleLock(value: string | number) {
  if (lockedItems.value.has(value)) {
    lockedItems.value.delete(value)
  } else {
    lockedItems.value.add(value)
  }
  // Force reactivity
  lockedItems.value = new Set(lockedItems.value)
}

function isLocked(value: string | number) {
  return lockedItems.value.has(value)
}
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiAccordion</h1>
    <p class="page__description">
      A vertically stacked set of interactive headings that reveal or hide associated content.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 600px;">
        <UiAccordion v-model="openItems">
          <UiAccordionItem value="item-1" title="What is Vue.js?">
            Vue.js is a progressive JavaScript framework for building user interfaces.
            It is designed to be incrementally adoptable and focuses on the view layer.
          </UiAccordionItem>
          <UiAccordionItem value="item-2" title="Why use a component library?">
            Component libraries provide pre-built, tested, and accessible UI components
            that help developers build applications faster while maintaining consistency.
          </UiAccordionItem>
          <UiAccordionItem value="item-3" title="How do I get started?">
            Install the package via npm, import the components you need, and start
            building your application with our well-documented API.
          </UiAccordionItem>
        </UiAccordion>
        <p style="font-size: var(--text-sm); color: var(--text-secondary);">
          Open: {{ openItems.length ? openItems.join(', ') : 'none' }}
        </p>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Multiple Open</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Use the <code>multiple</code> prop to allow multiple items to be open simultaneously.
      </p>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 600px;">
        <UiAccordion v-model="multipleOpen" multiple>
          <UiAccordionItem value="faq-1" title="Can I customize the theme?">
            Yes! All components use CSS custom properties (variables) that you can
            override to match your brand colors and design system.
          </UiAccordionItem>
          <UiAccordionItem value="faq-2" title="Is it accessible?">
            Absolutely. All components follow WAI-ARIA guidelines and support keyboard
            navigation, screen readers, and other assistive technologies.
          </UiAccordionItem>
          <UiAccordionItem value="faq-3" title="What about TypeScript?">
            Full TypeScript support is included with proper type definitions for all
            components, props, and events.
          </UiAccordionItem>
        </UiAccordion>
        <p style="font-size: var(--text-sm); color: var(--text-secondary);">
          Open: {{ multipleOpen.length ? multipleOpen.join(', ') : 'none' }}
        </p>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Non-Collapsible</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Set <code>:collapsible="false"</code> to ensure at least one item is always open.
      </p>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 600px;">
        <UiAccordion v-model="nonCollapsible" :collapsible="false">
          <UiAccordionItem value="always-1" title="First Section">
            This accordion always has at least one item open. Try clicking the
            open item - it won't close because there's no other item open.
          </UiAccordionItem>
          <UiAccordionItem value="always-2" title="Second Section">
            Now you can close the first section because this one is open.
          </UiAccordionItem>
          <UiAccordionItem value="always-3" title="Third Section">
            The last item clicked will remain open if it's the only one.
          </UiAccordionItem>
        </UiAccordion>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Disabled Items</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 600px;">
        <UiAccordion v-model="openItems">
          <UiAccordionItem value="enabled-1" title="Enabled Item">
            This item can be expanded and collapsed normally.
          </UiAccordionItem>
          <UiAccordionItem value="disabled-1" title="Disabled Item" disabled>
            This content is not accessible because the item is disabled.
          </UiAccordionItem>
          <UiAccordionItem value="enabled-2" title="Another Enabled Item">
            This item works normally as well.
          </UiAccordionItem>
        </UiAccordion>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Custom Title Slot</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 600px;">
        <UiAccordion v-model="openItems">
          <UiAccordionItem value="custom-1">
            <template #title>
              <UiStack direction="row" gap="2" align="center">
                <span>Active Status</span>
                <UiBadge variant="success" size="sm">Active</UiBadge>
              </UiStack>
            </template>
            Content with a custom title that includes a status badge.
          </UiAccordionItem>
          <UiAccordionItem value="custom-2">
            <template #title>
              <UiStack direction="row" gap="2" align="center">
                <span>Pending Review</span>
                <UiBadge variant="warning" size="sm">Pending</UiBadge>
              </UiStack>
            </template>
            Another item with a different status badge in the title.
          </UiAccordionItem>
        </UiAccordion>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Actions</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Use the <code>actions</code> slot to add buttons to the right of the chevron.
      </p>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 600px;">
        <UiAccordion v-model="actionsOpen" multiple>
          <UiAccordionItem
            value="actions-1"
            title="Lockable Section"
            :disabled="isLocked('actions-1')"
          >
            <template #actions>
              <UiButton
                size="sm"
                variant="ghost"
                :icon-left="isLocked('actions-1') ? Lock : Unlock"
                :aria-label="isLocked('actions-1') ? 'Unlock' : 'Lock'"
                @click="toggleLock('actions-1')"
              />
            </template>
            This section can be locked. When locked, it cannot be toggled.
          </UiAccordionItem>
          <UiAccordionItem value="actions-2" title="With Menu">
            <template #actions>
              <UiButton
                size="sm"
                variant="ghost"
                :icon-left="MoreVertical"
                aria-label="More options"
              />
            </template>
            This section has a menu button for additional actions.
          </UiAccordionItem>
        </UiAccordion>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Rich Content</h2>
      <UiCard variant="filled" padding="lg" class="example-column" style="max-width: 600px;">
        <UiAccordion v-model="openItems">
          <UiAccordionItem value="rich-1" title="Installation">
            <UiStack gap="3">
              <p>Install the package using npm or yarn:</p>
              <pre style="background: var(--bg-secondary); padding: var(--spacing-3); border-radius: var(--radius-md); overflow-x: auto;"><code>npm install @adahei/ui</code></pre>
              <p>Then import the styles in your main entry file:</p>
              <pre style="background: var(--bg-secondary); padding: var(--spacing-3); border-radius: var(--radius-md); overflow-x: auto;"><code>import '@adahei/ui/styles'</code></pre>
            </UiStack>
          </UiAccordionItem>
          <UiAccordionItem value="rich-2" title="Configuration">
            <UiStack gap="3">
              <p>Configure the theme by overriding CSS variables:</p>
              <pre style="background: var(--bg-secondary); padding: var(--spacing-3); border-radius: var(--radius-md); overflow-x: auto;"><code>:root {
  --color-primary: #your-color;
  --radius-md: 8px;
}</code></pre>
            </UiStack>
          </UiAccordionItem>
        </UiAccordion>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Props</h2>

      <h3 style="font-size: var(--text-base); margin: var(--spacing-4) 0 var(--spacing-2);">UiAccordion</h3>
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
            <td><code>(string | number)[]</code></td>
            <td><code>[]</code></td>
            <td>Array of open item values (v-model)</td>
          </tr>
          <tr>
            <td><code>multiple</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Allow multiple items open at once</td>
          </tr>
          <tr>
            <td><code>collapsible</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Allow all items to be closed</td>
          </tr>
        </tbody>
      </table>

      <h3 style="font-size: var(--text-base); margin: var(--spacing-4) 0 var(--spacing-2);">UiAccordionItem</h3>
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
            <td><code>string | number</code></td>
            <td><em>required</em></td>
            <td>Unique identifier for this item</td>
          </tr>
          <tr>
            <td><code>title</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Header text (or use title slot)</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Disable this item</td>
          </tr>
        </tbody>
      </table>

      <h3 style="font-size: var(--text-base); margin: var(--spacing-4) 0 var(--spacing-2);">UiAccordionItem Slots</h3>
      <table class="props-table">
        <thead>
          <tr>
            <th>Slot</th>
            <th>Props</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>default</code></td>
            <td>-</td>
            <td>Accordion item content</td>
          </tr>
          <tr>
            <td><code>title</code></td>
            <td>-</td>
            <td>Custom title content</td>
          </tr>
          <tr>
            <td><code>actions</code></td>
            <td><code>{ isOpen: boolean }</code></td>
            <td>Actions to the right of the chevron (click events don't toggle)</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
