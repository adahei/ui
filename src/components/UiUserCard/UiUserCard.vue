<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { User } from 'lucide-vue-next'
import UiImage from '../UiImage/UiImage.vue'
import UiBadge from '../UiBadge/UiBadge.vue'
import type { Size } from '@/types'

export type UserCardLayout = 'vertical' | 'horizontal'
export type UserCardSize = Size
export type UserCardAspectRatio = 'portrait' | 'square' | 'landscape'

export interface UserCardBadge {
  label: string
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}

interface Props {
  /** User's name */
  name: string
  /** User's description/title/role */
  description?: string
  /** Cover image URL */
  src?: string
  /** Card layout */
  layout?: UserCardLayout
  /** Card size */
  size?: UserCardSize
  /** Aspect ratio of the cover image */
  aspectRatio?: UserCardAspectRatio
  /** Badges to display on the image */
  badges?: UserCardBadge[]
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'vertical',
  size: 'md',
  aspectRatio: 'landscape',
})

const imageError = ref(false)

watch(() => props.src, () => {
  imageError.value = false
})

const showImage = computed(() => props.src && !imageError.value)

const initials = computed(() => {
  if (!props.name) return ''
  const parts = props.name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[1][0]).toUpperCase()
})

const hasBadges = computed(() => props.badges && props.badges.length > 0)

function onImageError() {
  imageError.value = true
}
</script>

<template>
  <div class="ui-user-card" :class="[`ui-user-card--${layout}`, `ui-user-card--${size}`, `ui-user-card--aspect-${aspectRatio}`]">
    <div class="ui-user-card__cover-wrapper">
      <UiImage
        v-if="showImage"
        :src="src"
        :alt="name"
        fit="cover"
        class="ui-user-card__cover"
        @error="onImageError"
      />
      <div v-else class="ui-user-card__cover ui-user-card__placeholder">
        <span v-if="initials" class="ui-user-card__initials">{{ initials }}</span>
        <User v-else class="ui-user-card__icon" />
      </div>

      <div v-if="hasBadges" class="ui-user-card__badges">
        <UiBadge
          v-for="(badge, index) in badges"
          :key="index"
          :variant="badge.variant || 'primary'"
          size="sm"
        >
          {{ badge.label }}
        </UiBadge>
      </div>
    </div>

    <div class="ui-user-card__body">
      <div class="ui-user-card__content">
        <div class="ui-user-card__info">
          <div class="ui-user-card__name">{{ name }}</div>
          <div v-if="description" class="ui-user-card__description">{{ description }}</div>
          <div v-if="$slots.meta" class="ui-user-card__meta">
            <slot name="meta" />
          </div>
        </div>
      </div>

      <div v-if="$slots.actions" class="ui-user-card__actions">
        <slot name="actions" />
      </div>

      <div v-if="$slots.footer" class="ui-user-card__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-user-card {
  overflow: hidden;
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  background-color: var(--bg-primary);

  &__cover-wrapper {
    position: relative;
    flex-shrink: 0;
  }

  &__cover {
    width: 100%;
    height: 100%;
  }

  &__badges {
    position: absolute;
    top: var(--spacing-2);
    right: var(--spacing-2);
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-1);
    justify-content: flex-end;
    max-width: calc(100% - var(--spacing-4));
  }

  &__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-tertiary);
    color: var(--text-secondary);
  }

  &__initials {
    font-weight: var(--font-semibold);
    line-height: 1;
    user-select: none;
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    flex: 1;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
  }

  &__name {
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    line-height: var(--leading-tight);
  }

  &__description {
    color: var(--text-secondary);
  }

  &__meta {
    color: var(--text-tertiary);
    margin-top: var(--spacing-1);
  }

  &__actions {
    display: flex;
    width: 100%;

    :deep(> *) {
      flex: 1;
    }

    :deep(.ui-button) {
      flex: 1;
    }

    :deep(.ui-button-group) {
      width: 100%;

      .ui-button {
        flex: 1;
      }
    }
  }

  &__footer {
    display: flex;
    gap: var(--spacing-3);
    border-top: 1px solid var(--border-primary);
    background-color: var(--bg-secondary);
    color: var(--text-secondary);
  }

  // ===== SIZES =====
  &--sm {
    border-radius: var(--radius-md);

    .ui-user-card__initials {
      font-size: var(--text-2xl);
    }

    .ui-user-card__icon {
      width: 2rem;
      height: 2rem;
    }

    .ui-user-card__content {
      padding: var(--spacing-2) var(--spacing-3);
    }

    .ui-user-card__name {
      font-size: var(--text-base);
    }

    .ui-user-card__description {
      font-size: var(--text-xs);
    }

    .ui-user-card__meta {
      font-size: var(--text-xs);
    }

    .ui-user-card__actions {
      padding: 0 var(--spacing-3) var(--spacing-3);
    }

    .ui-user-card__footer {
      padding: var(--spacing-2) var(--spacing-3);
      font-size: var(--text-xs);
    }
  }

  &--md {
    .ui-user-card__initials {
      font-size: var(--text-4xl);
    }

    .ui-user-card__icon {
      width: 3rem;
      height: 3rem;
    }

    .ui-user-card__content {
      padding: var(--spacing-4);
    }

    .ui-user-card__name {
      font-size: var(--text-lg);
    }

    .ui-user-card__description {
      font-size: var(--text-sm);
    }

    .ui-user-card__meta {
      font-size: var(--text-sm);
    }

    .ui-user-card__actions {
      padding: 0 var(--spacing-4) var(--spacing-4);
    }

    .ui-user-card__footer {
      padding: var(--spacing-3) var(--spacing-4);
      font-size: var(--text-sm);
    }
  }

  &--lg {
    border-radius: var(--radius-xl);

    .ui-user-card__initials {
      font-size: var(--text-5xl);
    }

    .ui-user-card__icon {
      width: 4rem;
      height: 4rem;
    }

    .ui-user-card__content {
      padding: var(--spacing-5);
    }

    .ui-user-card__name {
      font-size: var(--text-xl);
    }

    .ui-user-card__description {
      font-size: var(--text-base);
    }

    .ui-user-card__meta {
      font-size: var(--text-base);
    }

    .ui-user-card__actions {
      padding: 0 var(--spacing-5) var(--spacing-5);
    }

    .ui-user-card__footer {
      padding: var(--spacing-4) var(--spacing-5);
      font-size: var(--text-base);
    }
  }

  // ===== ASPECT RATIOS =====
  &--aspect-portrait {
    .ui-user-card__cover {
      aspect-ratio: 3 / 4;
    }
  }

  &--aspect-square {
    .ui-user-card__cover {
      aspect-ratio: 1 / 1;
    }
  }

  &--aspect-landscape {
    .ui-user-card__cover {
      aspect-ratio: 16 / 9;
    }
  }

  // ===== VERTICAL LAYOUT =====
  &--vertical {
    display: flex;
    flex-direction: column;

    .ui-user-card__cover-wrapper {
      width: 100%;
    }
  }

  // ===== HORIZONTAL LAYOUT =====
  &--horizontal {
    display: flex;
    flex-direction: row;

    .ui-user-card__cover {
      height: 100%;

      :deep(img) {
        height: 100%;
      }
    }

    .ui-user-card__content {
      justify-content: center;
    }

    &.ui-user-card--sm {
      .ui-user-card__cover-wrapper {
        width: 6rem;
      }
    }

    &.ui-user-card--md {
      .ui-user-card__cover-wrapper {
        width: 10rem;
      }
    }

    &.ui-user-card--lg {
      .ui-user-card__cover-wrapper {
        width: 14rem;
      }
    }
  }
}
</style>
