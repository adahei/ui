<script setup lang="ts">
import { UiImage, UiCard } from '@/components'

import imgSquare from '@/img/portrait_square.jpg'
import imgPortrait from '@/img/portrait_portrait.jpg'
import imgLandscape from '@/img/portrait_landscape.jpg'

function handleImageClick() {
  window.alert('Image clicked!')
}
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiImage</h1>
    <p class="page__description">
      A flexible image component with loading states, aspect ratios, and fallback support.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiImage
          :src="imgSquare"
          alt="Square image"
          style="width: 200px; height: 200px;"
        />
        <UiImage
          :src="imgPortrait"
          alt="Portrait image"
          style="width: 200px; height: 200px;"
        />
        <UiImage
          :src="imgLandscape"
          alt="Landscape image"
          style="width: 200px; height: 200px;"
        />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Aspect Ratios</h2>
      <UiCard variant="filled" padding="lg" class="example-row" style="align-items: flex-start;">
        <div class="aspect-item">
          <UiImage
            :src="imgLandscape"
            alt="16:9"
            aspect-ratio="16/9"
            style="width: 200px;"
          />
          <span class="aspect-label">16:9</span>
        </div>
        <div class="aspect-item">
          <UiImage
            :src="imgLandscape"
            alt="4:3"
            aspect-ratio="4/3"
            style="width: 200px;"
          />
          <span class="aspect-label">4:3</span>
        </div>
        <div class="aspect-item">
          <UiImage
            :src="imgLandscape"
            alt="1:1"
            aspect-ratio="1/1"
            style="width: 200px;"
          />
          <span class="aspect-label">1:1</span>
        </div>
        <div class="aspect-item">
          <UiImage
            :src="imgPortrait"
            alt="3:4"
            aspect-ratio="3/4"
            style="width: 150px;"
          />
          <span class="aspect-label">3:4</span>
        </div>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Object Fit</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <div class="fit-item">
          <UiImage
            :src="imgLandscape"
            alt="Cover"
            fit="cover"
            style="width: 150px; height: 150px;"
          />
          <span class="fit-label">cover</span>
        </div>
        <div class="fit-item">
          <UiImage
            :src="imgLandscape"
            alt="Contain"
            fit="contain"
            style="width: 150px; height: 150px;"
          />
          <span class="fit-label">contain</span>
        </div>
        <div class="fit-item">
          <UiImage
            :src="imgLandscape"
            alt="Fill"
            fit="fill"
            style="width: 150px; height: 150px;"
          />
          <span class="fit-label">fill</span>
        </div>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Border Radius</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <div class="radius-item">
          <UiImage
            :src="imgSquare"
            alt="None"
            radius="none"
            style="width: 100px; height: 100px;"
          />
          <span class="radius-label">none</span>
        </div>
        <div class="radius-item">
          <UiImage
            :src="imgSquare"
            alt="Small"
            radius="sm"
            style="width: 100px; height: 100px;"
          />
          <span class="radius-label">sm</span>
        </div>
        <div class="radius-item">
          <UiImage
            :src="imgSquare"
            alt="Medium"
            radius="md"
            style="width: 100px; height: 100px;"
          />
          <span class="radius-label">md</span>
        </div>
        <div class="radius-item">
          <UiImage
            :src="imgSquare"
            alt="Large"
            radius="lg"
            style="width: 100px; height: 100px;"
          />
          <span class="radius-label">lg</span>
        </div>
        <div class="radius-item">
          <UiImage
            :src="imgSquare"
            alt="Full"
            radius="full"
            style="width: 100px; height: 100px;"
          />
          <span class="radius-label">full</span>
        </div>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Clickable</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiImage
          :src="imgSquare"
          alt="Click me"
          radius="md"
          clickable
          style="width: 150px; height: 150px;"
          @click="handleImageClick"
        />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Error Fallback</h2>
      <UiCard variant="filled" padding="lg" class="example-row">
        <UiImage
          src="https://invalid-url.example.com/image.jpg"
          alt="Broken image"
          radius="md"
          style="width: 150px; height: 150px;"
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
            <td><code>-</code></td>
            <td>Image URL</td>
          </tr>
          <tr>
            <td><code>alt</code></td>
            <td><code>string</code></td>
            <td><code>''</code></td>
            <td>Alt text</td>
          </tr>
          <tr>
            <td><code>aspectRatio</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Aspect ratio (e.g., "16/9", "1/1")</td>
          </tr>
          <tr>
            <td><code>fit</code></td>
            <td><code>'cover' | 'contain' | 'fill' | 'none'</code></td>
            <td><code>'cover'</code></td>
            <td>Object fit mode</td>
          </tr>
          <tr>
            <td><code>radius</code></td>
            <td><code>'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'</code></td>
            <td><code>'none'</code></td>
            <td>Border radius</td>
          </tr>
          <tr>
            <td><code>clickable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Make image clickable</td>
          </tr>
          <tr>
            <td><code>fallback</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Show fallback on error</td>
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
            <td><code>click</code></td>
            <td><code>MouseEvent</code></td>
            <td>Emitted when clicked (if clickable)</td>
          </tr>
          <tr>
            <td><code>load</code></td>
            <td><code>-</code></td>
            <td>Emitted when image loads</td>
          </tr>
          <tr>
            <td><code>error</code></td>
            <td><code>-</code></td>
            <td>Emitted when image fails to load</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.aspect-item,
.fit-item,
.radius-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
}

.aspect-label,
.fit-label,
.radius-label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}
</style>
