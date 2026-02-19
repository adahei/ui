<script setup lang="ts">
import { UiStack, UiCard, UiButton, UiBadge, UiInput } from '@/components'
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiStack</h1>
    <p class="page__description">
      A flexible layout component for handling rows, columns, and stacking with configurable spacing, alignment, and wrapping.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Column (Default)</h2>
      <UiCard variant="filled" padding="lg">
        <UiStack gap="2">
          <UiInput placeholder="First name" />
          <UiInput placeholder="Last name" />
          <UiInput placeholder="Email" />
          <UiButton>Submit</UiButton>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Row Direction</h2>
      <UiCard variant="filled" padding="lg">
        <UiStack direction="row" gap="2">
          <UiButton variant="outline">Cancel</UiButton>
          <UiButton>Save</UiButton>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Gap Sizes</h2>
      <UiCard variant="filled" padding="lg">
        <UiStack gap="6">
          <div>
            <p class="label">gap="1"</p>
            <UiStack direction="row" gap="1">
              <UiBadge>A</UiBadge>
              <UiBadge>B</UiBadge>
              <UiBadge>C</UiBadge>
            </UiStack>
          </div>
          <div>
            <p class="label">gap="2"</p>
            <UiStack direction="row" gap="2">
              <UiBadge>A</UiBadge>
              <UiBadge>B</UiBadge>
              <UiBadge>C</UiBadge>
            </UiStack>
          </div>
          <div>
            <p class="label">gap="4"</p>
            <UiStack direction="row" gap="4">
              <UiBadge>A</UiBadge>
              <UiBadge>B</UiBadge>
              <UiBadge>C</UiBadge>
            </UiStack>
          </div>
          <div>
            <p class="label">gap="8"</p>
            <UiStack direction="row" gap="8">
              <UiBadge>A</UiBadge>
              <UiBadge>B</UiBadge>
              <UiBadge>C</UiBadge>
            </UiStack>
          </div>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Alignment</h2>
      <UiCard variant="filled" padding="lg">
        <UiStack gap="4">
          <div>
            <p class="label">align="start"</p>
            <UiStack direction="row" gap="2" align="start" class="align-demo">
              <div class="box box--tall">A</div>
              <div class="box">B</div>
              <div class="box box--short">C</div>
            </UiStack>
          </div>
          <div>
            <p class="label">align="center"</p>
            <UiStack direction="row" gap="2" align="center" class="align-demo">
              <div class="box box--tall">A</div>
              <div class="box">B</div>
              <div class="box box--short">C</div>
            </UiStack>
          </div>
          <div>
            <p class="label">align="end"</p>
            <UiStack direction="row" gap="2" align="end" class="align-demo">
              <div class="box box--tall">A</div>
              <div class="box">B</div>
              <div class="box box--short">C</div>
            </UiStack>
          </div>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Justify Content</h2>
      <UiCard variant="filled" padding="lg">
        <UiStack gap="4">
          <div>
            <p class="label">justify="start"</p>
            <UiStack direction="row" gap="2" justify="start" class="justify-demo">
              <div class="box">A</div>
              <div class="box">B</div>
              <div class="box">C</div>
            </UiStack>
          </div>
          <div>
            <p class="label">justify="center"</p>
            <UiStack direction="row" gap="2" justify="center" class="justify-demo">
              <div class="box">A</div>
              <div class="box">B</div>
              <div class="box">C</div>
            </UiStack>
          </div>
          <div>
            <p class="label">justify="end"</p>
            <UiStack direction="row" gap="2" justify="end" class="justify-demo">
              <div class="box">A</div>
              <div class="box">B</div>
              <div class="box">C</div>
            </UiStack>
          </div>
          <div>
            <p class="label">justify="between"</p>
            <UiStack direction="row" gap="2" justify="between" class="justify-demo">
              <div class="box">A</div>
              <div class="box">B</div>
              <div class="box">C</div>
            </UiStack>
          </div>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Wrapping</h2>
      <UiCard variant="filled" padding="lg">
        <UiStack direction="row" gap="2" wrap="wrap" style="max-width: 300px;">
          <UiBadge>Item 1</UiBadge>
          <UiBadge>Item 2</UiBadge>
          <UiBadge>Item 3</UiBadge>
          <UiBadge>Item 4</UiBadge>
          <UiBadge>Item 5</UiBadge>
          <UiBadge>Item 6</UiBadge>
          <UiBadge>Item 7</UiBadge>
          <UiBadge>Item 8</UiBadge>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Nested Stacks</h2>
      <UiCard variant="filled" padding="lg">
        <UiStack gap="4">
          <UiStack direction="row" gap="2" justify="between">
            <span>Header Left</span>
            <UiStack direction="row" gap="2">
              <UiButton size="sm" variant="ghost">Help</UiButton>
              <UiButton size="sm">Action</UiButton>
            </UiStack>
          </UiStack>
          <UiStack gap="2">
            <UiInput placeholder="Content area..." />
            <UiInput placeholder="More content..." />
          </UiStack>
          <UiStack direction="row" gap="2" justify="end">
            <UiButton variant="outline">Cancel</UiButton>
            <UiButton>Submit</UiButton>
          </UiStack>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Polymorphic "as" Prop</h2>
      <UiCard variant="filled" padding="lg">
        <UiStack as="nav" direction="row" gap="4" class="nav-demo">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </UiStack>
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
            <td><code>direction</code></td>
            <td><code>'row' | 'column' | 'row-reverse' | 'column-reverse'</code></td>
            <td><code>'column'</code></td>
            <td>Flex direction</td>
          </tr>
          <tr>
            <td><code>gap</code></td>
            <td><code>'0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16'</code></td>
            <td><code>'4'</code></td>
            <td>Gap between items (maps to --spacing-*)</td>
          </tr>
          <tr>
            <td><code>align</code></td>
            <td><code>'start' | 'center' | 'end' | 'stretch' | 'baseline'</code></td>
            <td><code>'stretch'</code></td>
            <td>Align items (cross axis)</td>
          </tr>
          <tr>
            <td><code>justify</code></td>
            <td><code>'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'</code></td>
            <td><code>'start'</code></td>
            <td>Justify content (main axis)</td>
          </tr>
          <tr>
            <td><code>wrap</code></td>
            <td><code>'nowrap' | 'wrap' | 'wrap-reverse'</code></td>
            <td><code>'nowrap'</code></td>
            <td>Flex wrap</td>
          </tr>
          <tr>
            <td><code>inline</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Use inline-flex instead of flex</td>
          </tr>
          <tr>
            <td><code>as</code></td>
            <td><code>string</code></td>
            <td><code>'div'</code></td>
            <td>HTML element to render as</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  margin-bottom: var(--spacing-1);
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  color: var(--text-primary);
}

.box--tall {
  height: 80px;
}

.box--short {
  height: 32px;
}

.align-demo {
  min-height: 100px;
  padding: var(--spacing-2);
  background-color: var(--bg-primary);
  border: 1px dashed var(--border-primary);
  border-radius: var(--radius-md);
}

.justify-demo {
  padding: var(--spacing-2);
  background-color: var(--bg-primary);
  border: 1px dashed var(--border-primary);
  border-radius: var(--radius-md);
}

.nav-demo a {
  color: var(--text-primary);
  text-decoration: none;
}

.nav-demo a:hover {
  color: var(--color-primary);
}
</style>
