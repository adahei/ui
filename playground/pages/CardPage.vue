<script setup lang="ts">
import { UiCard, UiButton, UiAvatar } from '@/components'
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiCard</h1>
    <p class="page__description">
      A flexible container component with variants, customizable radius, shadow, and padding options.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Variants</h2>
      <div class="card-grid">
        <UiCard variant="default">
          <template #header>
            <strong>Default</strong>
          </template>
          <p>Border + subtle shadow. The standard card style.</p>
        </UiCard>

        <UiCard variant="elevated">
          <template #header>
            <strong>Elevated</strong>
          </template>
          <p>No border, stronger shadow. Stands out more.</p>
        </UiCard>

        <UiCard variant="outline">
          <template #header>
            <strong>Outline</strong>
          </template>
          <p>Border only, transparent background.</p>
        </UiCard>

        <UiCard variant="filled">
          <template #header>
            <strong>Filled</strong>
          </template>
          <p>Solid background, no border. Subtle grouping.</p>
        </UiCard>

        <UiCard variant="ghost">
          <template #header>
            <strong>Ghost</strong>
          </template>
          <p>Invisible container. Just for layout grouping.</p>
        </UiCard>
      </div>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Border Radius</h2>
      <div class="card-grid">
        <UiCard radius="none" class="demo-card">
          <code>radius="none"</code>
        </UiCard>
        <UiCard radius="sm" class="demo-card">
          <code>radius="sm"</code>
        </UiCard>
        <UiCard radius="md" class="demo-card">
          <code>radius="md"</code>
        </UiCard>
        <UiCard radius="lg" class="demo-card">
          <code>radius="lg"</code>
        </UiCard>
        <UiCard radius="xl" class="demo-card">
          <code>radius="xl"</code>
        </UiCard>
      </div>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Shadows</h2>
      <div class="card-grid">
        <UiCard shadow="none" class="demo-card">
          <code>shadow="none"</code>
        </UiCard>
        <UiCard shadow="sm" class="demo-card">
          <code>shadow="sm"</code>
        </UiCard>
        <UiCard shadow="md" class="demo-card">
          <code>shadow="md"</code>
        </UiCard>
        <UiCard shadow="lg" class="demo-card">
          <code>shadow="lg"</code>
        </UiCard>
        <UiCard shadow="xl" class="demo-card">
          <code>shadow="xl"</code>
        </UiCard>
      </div>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Padding</h2>
      <div class="example-box example-box--column">
        <UiCard padding="none">
          <div class="padding-demo">padding="none"</div>
        </UiCard>
        <UiCard padding="sm">
          <code>padding="sm"</code>
        </UiCard>
        <UiCard padding="md">
          <code>padding="md" (default)</code>
        </UiCard>
        <UiCard padding="lg">
          <code>padding="lg"</code>
        </UiCard>
        <UiCard padding="xl">
          <code>padding="xl"</code>
        </UiCard>
      </div>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Header and Footer</h2>
      <div class="example-box">
        <UiCard style="max-width: 24rem;">
          <template #header>
            <h3 class="card-title">Card Title</h3>
          </template>
          <p>This card has a header and footer. Content sections are visually separated by borders.</p>
          <template #footer>
            <div class="card-actions">
              <UiButton variant="ghost" size="sm">Cancel</UiButton>
              <UiButton size="sm">Save</UiButton>
            </div>
          </template>
        </UiCard>
      </div>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Combining Options</h2>
      <div class="card-grid">
        <UiCard variant="elevated" radius="xl" shadow="xl" padding="lg">
          <template #header>
            <strong>Premium Card</strong>
          </template>
          <p>Elevated variant with extra large radius, shadow, and padding.</p>
        </UiCard>

        <UiCard variant="outline" radius="none" padding="sm">
          <template #header>
            <strong>Minimal Card</strong>
          </template>
          <p>Outline variant with no radius and small padding.</p>
        </UiCard>

        <UiCard variant="filled" radius="md" padding="lg">
          <template #header>
            <strong>Filled Card</strong>
          </template>
          <p>Filled variant with medium radius and large padding.</p>
        </UiCard>
      </div>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Real World Examples</h2>
      <div class="card-grid">
        <!-- User profile card -->
        <UiCard variant="elevated" padding="lg">
          <div class="profile-card">
            <UiAvatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              size="md"
            />
            <div class="profile-info">
              <h4 class="profile-name">John Doe</h4>
              <p class="profile-role">Software Engineer</p>
            </div>
            <UiButton variant="outline" size="sm" block>View Profile</UiButton>
          </div>
        </UiCard>

        <!-- Stats card -->
        <UiCard variant="filled" padding="lg">
          <div class="stats-card">
            <span class="stats-value">1,234</span>
            <span class="stats-label">Total Users</span>
          </div>
        </UiCard>

        <!-- Ghost container example -->
        <UiCard variant="ghost" padding="none">
          <div class="ghost-demo">
            <p class="ghost-label">Ghost variant as invisible wrapper</p>
            <div class="ghost-inner">
              <UiCard padding="sm">Nested card 1</UiCard>
              <UiCard padding="sm">Nested card 2</UiCard>
            </div>
          </div>
        </UiCard>
      </div>
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
            <td><code>'default' | 'elevated' | 'outline' | 'filled' | 'ghost'</code></td>
            <td><code>'default'</code></td>
            <td>Visual style variant</td>
          </tr>
          <tr>
            <td><code>radius</code></td>
            <td><code>'none' | 'sm' | 'md' | 'lg' | 'xl'</code></td>
            <td><code>'lg'</code></td>
            <td>Border radius size</td>
          </tr>
          <tr>
            <td><code>shadow</code></td>
            <td><code>'none' | 'sm' | 'md' | 'lg' | 'xl'</code></td>
            <td>Based on variant</td>
            <td>Box shadow size (auto: elevated=lg, default=sm, others=none)</td>
          </tr>
          <tr>
            <td><code>padding</code></td>
            <td><code>'none' | 'sm' | 'md' | 'lg' | 'xl'</code></td>
            <td><code>'md'</code></td>
            <td>Padding for all sections</td>
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
            <td>Main content of the card</td>
          </tr>
          <tr>
            <td><code>header</code></td>
            <td>Optional header section with bottom border</td>
          </tr>
          <tr>
            <td><code>footer</code></td>
            <td>Optional footer section with top border</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: var(--spacing-4);
}

.demo-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 5rem;
}

.padding-demo {
  padding: var(--spacing-4);
  background-color: var(--bg-tertiary);
}

.card-title {
  margin: 0;
  font-size: var(--text-lg);
}

.card-actions {
  display: flex;
  gap: var(--spacing-2);
  justify-content: flex-end;
}

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  text-align: center;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.profile-name {
  margin: 0;
  font-size: var(--text-lg);
  font-weight: 600;
}

.profile-role {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.stats-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-1);
}

.stats-value {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--text-primary);
}

.stats-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.ghost-demo {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.ghost-label {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.ghost-inner {
  display: flex;
  gap: var(--spacing-2);
}
</style>
