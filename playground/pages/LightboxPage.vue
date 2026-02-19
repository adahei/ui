<script setup lang="ts">
import { ref } from 'vue'
import { UiLightbox, UiButton, UiCard, UiStack } from '@/components'
import type { LightboxItem } from '@/components'

// Sample images (using placeholder services)
const imageItems: LightboxItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    type: 'image',
    alt: 'Mountain landscape',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150',
  },
  {
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
    type: 'image',
    alt: 'Nature scene',
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150',
  },
  {
    src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200',
    type: 'image',
    alt: 'Forest path',
    thumbnail: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=150',
  },
  {
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200',
    type: 'image',
    alt: 'Waterfall',
    thumbnail: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=150',
  },
  {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200',
    type: 'image',
    alt: 'Lake view',
    thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150',
  },
]

const mixedItems: LightboxItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200',
    type: 'image',
    alt: 'Scenic view',
    thumbnail: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=150',
  },
  {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    type: 'video',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=150',
  },
  {
    src: 'https://images.unsplash.com/photo-1682687221038-404670f01d03?w=1200',
    type: 'image',
    alt: 'Another view',
    thumbnail: 'https://images.unsplash.com/photo-1682687221038-404670f01d03?w=150',
  },
]

const singleItem: LightboxItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200',
    type: 'image',
    alt: 'Fog in mountains',
  },
]

// State for different lightbox instances
const basicOpen = ref(false)
const noThumbsOpen = ref(false)
const mixedOpen = ref(false)
const singleOpen = ref(false)
const galleryOpen = ref(false)
const galleryStartIndex = ref(0)

function openGalleryAt(index: number) {
  galleryStartIndex.value = index
  galleryOpen.value = true
}
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiLightbox</h1>
    <p class="page__description">
      A lightbox component for viewing images and videos in a modal overlay with navigation.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Click to open the lightbox with image gallery. Use arrow keys or buttons to navigate.
      </p>
      <UiCard variant="filled" padding="lg">
        <UiButton @click="basicOpen = true">Open Lightbox</UiButton>
        <UiLightbox v-model="basicOpen" :items="imageItems" />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Without Thumbnails</h2>
      <UiCard variant="filled" padding="lg">
        <UiButton @click="noThumbsOpen = true">Open Without Thumbnails</UiButton>
        <UiLightbox v-model="noThumbsOpen" :items="imageItems" :show-thumbnails="false" />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Mixed Media (Images & Video)</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Supports both images and videos in the same gallery.
      </p>
      <UiCard variant="filled" padding="lg">
        <UiButton @click="mixedOpen = true">Open Mixed Gallery</UiButton>
        <UiLightbox v-model="mixedOpen" :items="mixedItems" />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Single Image</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Navigation buttons are hidden when there's only one item.
      </p>
      <UiCard variant="filled" padding="lg">
        <UiButton @click="singleOpen = true">View Single Image</UiButton>
        <UiLightbox v-model="singleOpen" :items="singleItem" />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Image Gallery</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Click on any image to open the lightbox at that position.
      </p>
      <UiCard variant="filled" padding="lg">
        <div class="gallery">
          <button
            v-for="(item, index) in imageItems"
            :key="index"
            class="gallery__item"
            @click="openGalleryAt(index)"
          >
            <img :src="item.thumbnail" :alt="item.alt" class="gallery__image" />
          </button>
        </div>
        <UiLightbox
          v-model="galleryOpen"
          :items="imageItems"
          :start-index="galleryStartIndex"
        />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Keyboard Navigation</h2>
      <UiCard variant="filled" padding="lg">
        <UiStack gap="2">
          <p><code>←</code> / <code>→</code> - Navigate between items</p>
          <p><code>Esc</code> - Close the lightbox</p>
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
            <td><code>modelValue</code></td>
            <td><code>boolean</code></td>
            <td><em>required</em></td>
            <td>Whether the lightbox is open (v-model)</td>
          </tr>
          <tr>
            <td><code>items</code></td>
            <td><code>LightboxItem[]</code></td>
            <td><em>required</em></td>
            <td>Array of media items to display</td>
          </tr>
          <tr>
            <td><code>startIndex</code></td>
            <td><code>number</code></td>
            <td><code>0</code></td>
            <td>Initial index to display</td>
          </tr>
          <tr>
            <td><code>showThumbnails</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Show thumbnail navigation</td>
          </tr>
          <tr>
            <td><code>closeOnBackdrop</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Close when clicking the backdrop</td>
          </tr>
          <tr>
            <td><code>closeOnEscape</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Close when pressing Escape</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">LightboxItem Type</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>src</code></td>
            <td><code>string</code></td>
            <td>Source URL for the image or video</td>
          </tr>
          <tr>
            <td><code>type</code></td>
            <td><code>'image' | 'video'</code></td>
            <td>Type of media</td>
          </tr>
          <tr>
            <td><code>alt</code></td>
            <td><code>string</code></td>
            <td>Alt text for images</td>
          </tr>
          <tr>
            <td><code>thumbnail</code></td>
            <td><code>string</code></td>
            <td>Thumbnail URL (defaults to src for images)</td>
          </tr>
          <tr>
            <td><code>poster</code></td>
            <td><code>string</code></td>
            <td>Poster image for videos</td>
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
            <td><code>update:modelValue</code></td>
            <td><code>boolean</code></td>
            <td>Emitted when open state changes</td>
          </tr>
          <tr>
            <td><code>change</code></td>
            <td><code>number</code></td>
            <td>Emitted when current index changes</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--spacing-3);
}

.gallery__item {
  aspect-ratio: 4 / 3;
  padding: 0;
  border: none;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);

  &:hover {
    transform: scale(1.02);
    box-shadow: var(--shadow-lg);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

.gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
