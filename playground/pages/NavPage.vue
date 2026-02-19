<script setup lang="ts">
import { ref } from 'vue'
import {
  UiNav,
  UiNavGroup,
  UiNavItem,
  UiDropdown,
  UiDropdownTrigger,
  UiDropdownMenu,
  UiDropdownItem,
  UiDropdownSeparator,
  UiCard,
} from '@/components'
import { Home, Settings, User, FileText, HelpCircle, Mail, Bell, Shield, Palette, Package, Users, BarChart, CreditCard, LogOut } from 'lucide-vue-next'

const activeItem = ref('home')
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiNav</h1>
    <p class="page__description">
      A navigation component supporting vertical and horizontal layouts with grouped, collapsible sections.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Vertical Navigation</h2>
      <UiCard variant="filled" padding="lg" style="max-width: 280px;">
        <UiNav aria-label="Main navigation">
          <UiNavItem :active="activeItem === 'home'" :icon-left="Home" @click="activeItem = 'home'">
            Home
          </UiNavItem>
          <UiNavItem :active="activeItem === 'profile'" :icon-left="User" @click="activeItem = 'profile'">
            Profile
          </UiNavItem>
          <UiNavItem :active="activeItem === 'settings'" :icon-left="Settings" @click="activeItem = 'settings'">
            Settings
          </UiNavItem>
        </UiNav>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Groups</h2>
      <UiCard variant="filled" padding="lg" style="max-width: 280px;">
        <UiNav aria-label="Settings navigation">
          <UiNavGroup label="Account">
            <UiNavItem :icon-left="User">Profile</UiNavItem>
            <UiNavItem :icon-left="Shield">Security</UiNavItem>
            <UiNavItem :icon-left="Bell">Notifications</UiNavItem>
          </UiNavGroup>
          <UiNavGroup label="Preferences">
            <UiNavItem :icon-left="Palette">Appearance</UiNavItem>
            <UiNavItem :icon-left="Settings">General</UiNavItem>
          </UiNavGroup>
          <UiNavGroup label="Support">
            <UiNavItem :icon-left="HelpCircle">Help Center</UiNavItem>
            <UiNavItem :icon-left="Mail">Contact Us</UiNavItem>
          </UiNavGroup>
        </UiNav>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Collapsible Groups</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Groups are collapsible by default. Click the header to expand/collapse.
      </p>
      <UiCard variant="filled" padding="lg" style="max-width: 280px;">
        <UiNav aria-label="Documentation navigation">
          <UiNavGroup label="Getting Started" :default-expanded="true">
            <UiNavItem>Introduction</UiNavItem>
            <UiNavItem active>Installation</UiNavItem>
            <UiNavItem>Quick Start</UiNavItem>
          </UiNavGroup>
          <UiNavGroup label="Components" :default-expanded="false">
            <UiNavItem>Button</UiNavItem>
            <UiNavItem>Input</UiNavItem>
            <UiNavItem>Select</UiNavItem>
            <UiNavItem>Card</UiNavItem>
          </UiNavGroup>
          <UiNavGroup label="Advanced" :default-expanded="false">
            <UiNavItem>Theming</UiNavItem>
            <UiNavItem>Accessibility</UiNavItem>
            <UiNavItem>TypeScript</UiNavItem>
          </UiNavGroup>
        </UiNav>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Non-Collapsible Groups</h2>
      <UiCard variant="filled" padding="lg" style="max-width: 280px;">
        <UiNav aria-label="Fixed navigation">
          <UiNavGroup label="Main Menu" :collapsible="false">
            <UiNavItem :icon-left="Home">Dashboard</UiNavItem>
            <UiNavItem :icon-left="FileText">Documents</UiNavItem>
            <UiNavItem :icon-left="Settings">Settings</UiNavItem>
          </UiNavGroup>
        </UiNav>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Horizontal Navigation</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Horizontal navigation displays items in a row. Groups are flattened (no collapsible behavior).
      </p>
      <UiCard variant="filled" padding="lg" class="example-column">
        <UiNav orientation="horizontal" aria-label="Horizontal navigation">
          <UiNavItem active>Home</UiNavItem>
          <UiNavItem>Products</UiNavItem>
          <UiNavItem>Services</UiNavItem>
          <UiNavItem>About</UiNavItem>
          <UiNavItem>Contact</UiNavItem>
        </UiNav>

        <UiNav orientation="horizontal" aria-label="Navigation with icons">
          <UiNavItem :icon-left="Home" active>Home</UiNavItem>
          <UiNavItem :icon-left="User">Profile</UiNavItem>
          <UiNavItem :icon-left="Settings">Settings</UiNavItem>
          <UiNavItem :icon-left="HelpCircle">Help</UiNavItem>
        </UiNav>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Horizontal with Groups</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Groups in horizontal mode display items inline without headers or collapse functionality.
      </p>
      <UiCard variant="filled" padding="lg" class="example-column">
        <UiNav orientation="horizontal" aria-label="Grouped horizontal navigation">
          <UiNavGroup>
            <UiNavItem active>Dashboard</UiNavItem>
            <UiNavItem>Analytics</UiNavItem>
          </UiNavGroup>
          <UiNavGroup>
            <UiNavItem>Settings</UiNavItem>
            <UiNavItem>Help</UiNavItem>
          </UiNavGroup>
        </UiNav>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Horizontal with Dropdowns</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Combine UiNav with UiDropdown for expandable menus in horizontal navigation.
      </p>
      <UiCard variant="filled" padding="lg" class="example-column">
        <nav class="horizontal-nav-example" aria-label="Main navigation with dropdowns">
          <UiNav orientation="horizontal">
            <UiNavItem :icon-left="Home" active>Home</UiNavItem>

            <UiDropdown>
              <UiDropdownTrigger class="nav-dropdown-trigger">
                <Package style="width: 1rem; height: 1rem;" />
                Products
              </UiDropdownTrigger>
              <UiDropdownMenu>
                <UiDropdownItem>All Products</UiDropdownItem>
                <UiDropdownItem>Categories</UiDropdownItem>
                <UiDropdownItem>New Arrivals</UiDropdownItem>
                <UiDropdownSeparator />
                <UiDropdownItem>Sale Items</UiDropdownItem>
              </UiDropdownMenu>
            </UiDropdown>

            <UiDropdown>
              <UiDropdownTrigger class="nav-dropdown-trigger">
                <Users style="width: 1rem; height: 1rem;" />
                Team
              </UiDropdownTrigger>
              <UiDropdownMenu>
                <UiDropdownItem :icon-left="Users">Members</UiDropdownItem>
                <UiDropdownItem :icon-left="BarChart">Reports</UiDropdownItem>
                <UiDropdownItem :icon-left="Settings">Settings</UiDropdownItem>
              </UiDropdownMenu>
            </UiDropdown>

            <UiNavItem :icon-left="HelpCircle">Support</UiNavItem>
          </UiNav>

          <UiDropdown placement="bottom-end">
            <UiDropdownTrigger class="nav-dropdown-trigger">
              <User style="width: 1rem; height: 1rem;" />
              Account
            </UiDropdownTrigger>
            <UiDropdownMenu>
              <UiDropdownItem :icon-left="User">Profile</UiDropdownItem>
              <UiDropdownItem :icon-left="CreditCard">Billing</UiDropdownItem>
              <UiDropdownItem :icon-left="Settings">Settings</UiDropdownItem>
              <UiDropdownSeparator />
              <UiDropdownItem :icon-left="LogOut" destructive>Sign out</UiDropdownItem>
            </UiDropdownMenu>
          </UiDropdown>
        </nav>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Links</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Use <code>href</code> for regular links or <code>to</code> for vue-router links.
      </p>
      <UiCard variant="filled" padding="lg" style="max-width: 280px;">
        <UiNav aria-label="Link navigation">
          <UiNavItem href="#home" :icon-left="Home">Home (anchor)</UiNavItem>
          <UiNavItem to="/button" :icon-left="Settings">Button Page (router)</UiNavItem>
          <UiNavItem href="https://vuejs.org" target="_blank" rel="noopener">
            Vue.js (external)
          </UiNavItem>
        </UiNav>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Disabled Items</h2>
      <UiCard variant="filled" padding="lg" style="max-width: 280px;">
        <UiNav aria-label="Navigation with disabled items">
          <UiNavItem :icon-left="Home">Home</UiNavItem>
          <UiNavItem :icon-left="User" active>Profile</UiNavItem>
          <UiNavItem :icon-left="Shield" disabled>Admin (disabled)</UiNavItem>
          <UiNavItem :icon-left="Settings">Settings</UiNavItem>
        </UiNav>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Props</h2>

      <h3 style="font-size: var(--text-base); margin: var(--spacing-4) 0 var(--spacing-2);">UiNav</h3>
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
            <td><code>orientation</code></td>
            <td><code>'horizontal' | 'vertical'</code></td>
            <td><code>'vertical'</code></td>
            <td>Layout direction</td>
          </tr>
          <tr>
            <td><code>ariaLabel</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Accessible label for the navigation</td>
          </tr>
        </tbody>
      </table>

      <h3 style="font-size: var(--text-base); margin: var(--spacing-4) 0 var(--spacing-2);">UiNavGroup</h3>
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
            <td><code>label</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Group header text</td>
          </tr>
          <tr>
            <td><code>defaultExpanded</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Initial expanded state</td>
          </tr>
          <tr>
            <td><code>collapsible</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Allow collapsing (vertical only)</td>
          </tr>
        </tbody>
      </table>

      <h3 style="font-size: var(--text-base); margin: var(--spacing-4) 0 var(--spacing-2);">UiNavItem</h3>
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
          <tr>
            <td><code>active</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Current/active state</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Disabled state</td>
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
    </section>
  </div>
</template>

<style scoped>
.horizontal-nav-example {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-2) var(--spacing-4);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
}

.nav-dropdown-trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-3);
  border: none;
  border-radius: var(--radius-md);
  background-color: transparent;
  color: var(--text-secondary);
  font-size: var(--text-sm);
  font-family: var(--font-sans);
  cursor: pointer;
  transition: color var(--transition-fast), background-color var(--transition-fast);
}

.nav-dropdown-trigger:hover {
  color: var(--text-primary);
  background-color: var(--bg-tertiary);
}

.nav-dropdown-trigger:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}
</style>
