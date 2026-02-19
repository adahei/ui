<script setup lang="ts">
import { UiAvatar, UiCard } from '@/components'

import imgSquare from '@/img/portrait_square.jpg'
import imgPortrait from '@/img/portrait_portrait.jpg'
import imgLandscape from '@/img/portrait_landscape.jpg'

function handleAvatarClick() {
  window.alert('Avatar clicked!')
}
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiAvatar</h1>
    <p class="page__description">
      A circular or rounded image component for displaying user photos, with fallback support for initials or a default icon.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">With Image</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Handles any image aspect ratio (portrait, landscape, square) using object-fit: cover.
      </p>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiAvatar
          :src="imgSquare"
          alt="Square image"
        />
        <UiAvatar
          :src="imgPortrait"
          alt="Portrait image"
        />
        <UiAvatar
          :src="imgLandscape"
          alt="Landscape image"
        />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Initials</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        When no image is provided, initials are generated from the name prop.
      </p>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiAvatar name="John Doe" />
        <UiAvatar name="Jane Smith" />
        <UiAvatar name="Bob" />
        <UiAvatar name="Alice Marie Johnson" />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Fallback Icon</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        When neither image nor name is provided, a default user icon is shown.
      </p>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiAvatar size="sm" />
        <UiAvatar size="md" />
        <UiAvatar size="lg" />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <div class="size-item">
          <UiAvatar name="John Doe" size="sm" />
          <span class="size-label">sm (2rem)</span>
        </div>
        <div class="size-item">
          <UiAvatar name="John Doe" size="md" />
          <span class="size-label">md (4rem)</span>
        </div>
        <div class="size-item">
          <UiAvatar name="John Doe" size="lg" />
          <span class="size-label">lg (12rem)</span>
        </div>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">All Sizes with Images</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiAvatar
          :src="imgSquare"
          alt="Square image"
          size="sm"
        />
        <UiAvatar
          :src="imgPortrait"
          alt="Portrait image"
          size="md"
        />
        <UiAvatar
          :src="imgLandscape"
          alt="Landscape image"
          size="lg"
        />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Shapes</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <div class="shape-item">
          <UiAvatar name="Circle" size="lg" shape="circle" />
          <span class="size-label">circle</span>
        </div>
        <div class="shape-item">
          <UiAvatar name="Rounded" size="lg" shape="rounded" />
          <span class="size-label">rounded</span>
        </div>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Clickable</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Use the <code>clickable</code> prop to make the avatar interactive. Useful for opening a larger image or profile.
      </p>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiAvatar
          :src="imgSquare"
          alt="Click me"
          size="lg"
          clickable
          @click="handleAvatarClick"
        />
        <UiAvatar
          name="Jane Doe"
          size="lg"
          clickable
          @click="handleAvatarClick"
        />
        <UiAvatar
          size="lg"
          clickable
          @click="handleAvatarClick"
        />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Image Error Handling</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        When an image fails to load, it falls back to initials or the default icon.
      </p>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiAvatar
          src="https://invalid-url.example.com/image.jpg"
          name="Fallback User"
        />
        <UiAvatar
          src="https://invalid-url.example.com/image.jpg"
        />
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
            <td><code>src</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Image URL</td>
          </tr>
          <tr>
            <td><code>alt</code></td>
            <td><code>string</code></td>
            <td><code>''</code></td>
            <td>Alt text for image</td>
          </tr>
          <tr>
            <td><code>name</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Name for generating initials</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Avatar size (sm=2rem, md=4rem, lg=12rem)</td>
          </tr>
          <tr>
            <td><code>shape</code></td>
            <td><code>'circle' | 'rounded'</code></td>
            <td><code>'circle'</code></td>
            <td>Avatar shape</td>
          </tr>
          <tr>
            <td><code>clickable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Makes avatar interactive (emits click event)</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.size-item,
.shape-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
}

.size-label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}
</style>
