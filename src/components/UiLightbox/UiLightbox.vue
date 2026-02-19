<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'

export interface LightboxItem {
  /** Source URL for the image or video */
  src: string
  /** Type of media */
  type: 'image' | 'video'
  /** Alt text for images */
  alt?: string
  /** Thumbnail URL (defaults to src for images) */
  thumbnail?: string
  /** Poster image for videos */
  poster?: string
}

interface Props {
  /** Whether the lightbox is open (v-model) */
  modelValue: boolean
  /** Array of media items to display */
  items: LightboxItem[]
  /** Starting index */
  startIndex?: number
  /** Show thumbnail navigation */
  showThumbnails?: boolean
  /** Close on backdrop click */
  closeOnBackdrop?: boolean
  /** Close on escape key */
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  startIndex: 0,
  showThumbnails: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [index: number]
}>()

const currentIndex = ref(props.startIndex)
const isTransitioning = ref(false)

// Reset index when opening
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    currentIndex.value = props.startIndex
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Update when startIndex changes externally
watch(() => props.startIndex, (newIndex) => {
  if (props.modelValue) {
    currentIndex.value = newIndex
  }
})

const currentItem = computed(() => props.items[currentIndex.value])

const hasPrev = computed(() => props.items.length > 1)
const hasNext = computed(() => props.items.length > 1)

function close() {
  emit('update:modelValue', false)
}

function prev() {
  if (isTransitioning.value || props.items.length <= 1) return
  isTransitioning.value = true
  currentIndex.value = currentIndex.value === 0
    ? props.items.length - 1
    : currentIndex.value - 1
  emit('change', currentIndex.value)
  setTimeout(() => isTransitioning.value = false, 300)
}

function next() {
  if (isTransitioning.value || props.items.length <= 1) return
  isTransitioning.value = true
  currentIndex.value = currentIndex.value === props.items.length - 1
    ? 0
    : currentIndex.value + 1
  emit('change', currentIndex.value)
  setTimeout(() => isTransitioning.value = false, 300)
}

function goTo(index: number) {
  if (isTransitioning.value || index === currentIndex.value) return
  isTransitioning.value = true
  currentIndex.value = index
  emit('change', currentIndex.value)
  setTimeout(() => isTransitioning.value = false, 300)
}

function onBackdropClick() {
  if (props.closeOnBackdrop) {
    close()
  }
}

function onKeydown(e: KeyboardEvent) {
  if (!props.modelValue) return

  switch (e.key) {
    case 'Escape':
      if (props.closeOnEscape) {
        close()
      }
      break
    case 'ArrowLeft':
      prev()
      break
    case 'ArrowRight':
      next()
      break
  }
}

function getThumbnail(item: LightboxItem): string {
  if (item.thumbnail) return item.thumbnail
  if (item.type === 'video' && item.poster) return item.poster
  if (item.type === 'image') return item.src
  return ''
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div v-if="modelValue" class="ui-lightbox" role="dialog" aria-modal="true">
        <div class="ui-lightbox__backdrop" @click="onBackdropClick" />

        <button
          class="ui-lightbox__close"
          type="button"
          aria-label="Close lightbox"
          @click="close"
        >
          <X />
        </button>

        <button
          v-if="hasPrev"
          class="ui-lightbox__nav ui-lightbox__nav--prev"
          type="button"
          aria-label="Previous"
          @click="prev"
        >
          <ChevronLeft />
        </button>

        <div class="ui-lightbox__content">
          <Transition name="lightbox-slide" mode="out-in">
            <div :key="currentIndex" class="ui-lightbox__media">
              <img
                v-if="currentItem?.type === 'image'"
                :src="currentItem.src"
                :alt="currentItem.alt || ''"
                class="ui-lightbox__image"
              />
              <video
                v-else-if="currentItem?.type === 'video'"
                :src="currentItem.src"
                :poster="currentItem.poster"
                controls
                class="ui-lightbox__video"
              />
            </div>
          </Transition>
        </div>

        <button
          v-if="hasNext"
          class="ui-lightbox__nav ui-lightbox__nav--next"
          type="button"
          aria-label="Next"
          @click="next"
        >
          <ChevronRight />
        </button>

        <div v-if="showThumbnails && items.length > 1" class="ui-lightbox__thumbnails">
          <button
            v-for="(item, index) in items"
            :key="index"
            type="button"
            class="ui-lightbox__thumbnail"
            :class="{ 'ui-lightbox__thumbnail--active': index === currentIndex }"
            :aria-label="`Go to item ${index + 1}`"
            :aria-current="index === currentIndex ? 'true' : undefined"
            @click="goTo(index)"
          >
            <img
              v-if="getThumbnail(item)"
              :src="getThumbnail(item)"
              :alt="item.alt || `Thumbnail ${index + 1}`"
              class="ui-lightbox__thumbnail-image"
            />
            <div v-else class="ui-lightbox__thumbnail-placeholder">
              {{ index + 1 }}
            </div>
          </button>
        </div>

        <div class="ui-lightbox__counter">
          {{ currentIndex + 1 }} / {{ items.length }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.ui-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  &__backdrop {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.9);
  }

  &__close {
    position: absolute;
    top: var(--spacing-4);
    right: var(--spacing-4);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    padding: 0;
    border: none;
    border-radius: var(--radius-full);
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    cursor: pointer;
    transition: background-color var(--transition-fast);

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &:focus-visible {
      outline: 2px solid white;
      outline-offset: 2px;
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    padding: 0;
    border: none;
    border-radius: var(--radius-full);
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    cursor: pointer;
    transition: background-color var(--transition-fast);

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &:focus-visible {
      outline: 2px solid white;
      outline-offset: 2px;
    }

    svg {
      width: 2rem;
      height: 2rem;
    }

    &--prev {
      left: var(--spacing-4);
    }

    &--next {
      right: var(--spacing-4);
    }
  }

  &__content {
    position: relative;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: var(--spacing-16) var(--spacing-20);
    pointer-events: none;
  }

  &__media,
  &__image,
  &__video {
    max-width: 100%;
    max-height: 100%;
  }

  &__media {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
  }

  &__image,
  &__video {
    border-radius: var(--radius-md);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  &__image {
    object-fit: contain;
  }

  &__thumbnails {
    position: absolute;
    bottom: var(--spacing-4);
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    gap: var(--spacing-2);
    padding: var(--spacing-2);
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: var(--radius-lg);
    backdrop-filter: blur(8px);
    max-width: calc(100% - var(--spacing-8));
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
    }
  }

  &__thumbnail {
    flex-shrink: 0;
    width: 4rem;
    height: 3rem;
    padding: 0;
    border: 2px solid transparent;
    border-radius: var(--radius-sm);
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    overflow: hidden;
    transition: border-color var(--transition-fast), opacity var(--transition-fast);
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }

    &--active {
      border-color: white;
      opacity: 1;
    }

    &:focus-visible {
      outline: 2px solid white;
      outline-offset: 2px;
    }
  }

  &__thumbnail-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__thumbnail-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
  }

  &__counter {
    position: absolute;
    bottom: var(--spacing-4);
    left: var(--spacing-4);
    z-index: 10;
    padding: var(--spacing-1) var(--spacing-3);
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: var(--radius-md);
    color: white;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    backdrop-filter: blur(8px);
  }
}

// Adjust layout when thumbnails are shown
.ui-lightbox:has(.ui-lightbox__thumbnails) {
  .ui-lightbox__content {
    padding-bottom: calc(var(--spacing-16) + 4rem);
  }
}

// Lightbox enter/leave transitions
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;

  .ui-lightbox__content {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;

  .ui-lightbox__content {
    transform: scale(0.95);
    opacity: 0;
  }
}

// Slide transitions for media
.lightbox-slide-enter-active,
.lightbox-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.lightbox-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.lightbox-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

// Responsive adjustments
@media (max-width: 768px) {
  .ui-lightbox {
    &__close {
      top: var(--spacing-2);
      right: var(--spacing-2);
      width: 2.5rem;
      height: 2.5rem;

      svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    }

    &__nav {
      width: 2.5rem;
      height: 2.5rem;

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      &--prev {
        left: var(--spacing-2);
      }

      &--next {
        right: var(--spacing-2);
      }
    }

    &__content {
      padding: var(--spacing-12) var(--spacing-12);
    }

    &__thumbnails {
      bottom: var(--spacing-2);
      gap: var(--spacing-1);
      padding: var(--spacing-1);
    }

    &__thumbnail {
      width: 3rem;
      height: 2.25rem;
    }

    &__counter {
      bottom: var(--spacing-2);
      left: var(--spacing-2);
      font-size: var(--text-xs);
    }
  }

  .ui-lightbox:has(.ui-lightbox__thumbnails) {
    .ui-lightbox__content {
      padding-bottom: calc(var(--spacing-12) + 3rem);
    }
  }
}
</style>
