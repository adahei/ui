<script setup lang="ts">
import { computed } from 'vue'
import UiAvatar from '../UiAvatar/UiAvatar.vue'
import UiCard from '../UiCard/UiCard.vue'
import type { AvatarSize } from '../UiAvatar/UiAvatar.vue'

export type MessageVariant = 'received' | 'sent'

interface Props {
  /** Message alignment - received (left) or sent (right) */
  variant?: MessageVariant
  /** Avatar image URL */
  avatarSrc?: string
  /** Author name (used for avatar initials if no src) */
  author?: string
  /** Timestamp to display */
  timestamp?: string
  /** Avatar size */
  avatarSize?: AvatarSize
  /** Hide the avatar */
  hideAvatar?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'received',
  avatarSize: 'md',
  hideAvatar: false,
})

const classes = computed(() => [
  'ui-message',
  `ui-message--${props.variant}`,
  {
    'ui-message--no-avatar': props.hideAvatar,
  },
])
</script>

<template>
  <div :class="classes">
    <div v-if="!hideAvatar" class="ui-message__avatar">
      <slot name="avatar">
        <UiAvatar
          :src="avatarSrc"
          :name="author"
          :size="avatarSize"
          shape="rounded"
        />
      </slot>
    </div>

    <UiCard class="ui-message__card" variant="filled" padding="md">
      <div class="ui-message__header">
        <span v-if="author" class="ui-message__author">{{ author }}</span>
        <span v-if="timestamp" class="ui-message__timestamp">{{ timestamp }}</span>
        <div v-if="$slots.actions" class="ui-message__actions">
          <slot name="actions" />
        </div>
      </div>

      <div class="ui-message__body">
        <slot />
      </div>

      <div v-if="$slots.footer" class="ui-message__footer">
        <slot name="footer" />
      </div>
    </UiCard>
  </div>
</template>

<style lang="scss" scoped>
.ui-message {
  display: flex;
  gap: var(--spacing-1);
  width: 80%;

  &--received {
    align-self: flex-start;
    flex-direction: row;
  }

  &--sent {
    align-self: flex-end;
    flex-direction: row-reverse;

    .ui-message__header {
      flex-direction: row-reverse;
    }

    .ui-message__footer {
      justify-content: flex-end;
    }
  }

  &__avatar {
    flex-shrink: 0;
    align-self: flex-start;
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    min-width: 0;
    flex: 1;

    :deep(.ui-card__body) {
      padding-top: var(--spacing-1);
    }
  }

  &__header {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: 0 var(--spacing-1);
  }

  &__author {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--text-primary);
  }

  &__timestamp {
    font-size: var(--text-xs);
    color: var(--text-tertiary);
  }

  &__actions {
    margin-left: auto;
    opacity: 0;
    transition: opacity var(--transition-fast);

    .ui-message:hover &,
    .ui-message:focus-within & {
      opacity: 1;
    }
  }

  &--sent &__actions {
    margin-left: 0;
    margin-right: auto;
  }

  &__body {
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    word-wrap: break-word;

    // Support for markdown-like content
    :deep(p) {
      margin: 0;

      & + p {
        margin-top: var(--spacing-2);
      }
    }

    :deep(a) {
      color: inherit;
      text-decoration: underline;
    }

    :deep(code) {
      background-color: rgba(0, 0, 0, 0.1);
      padding: 0.125rem 0.25rem;
      border-radius: var(--radius-sm);
      font-size: 0.875em;
    }

    :deep(pre) {
      background-color: rgba(0, 0, 0, 0.1);
      padding: var(--spacing-2);
      border-radius: var(--radius-sm);
      overflow-x: auto;
      margin: var(--spacing-2) 0;

      code {
        background: none;
        padding: 0;
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: 0 var(--spacing-1);
    font-size: var(--text-xs);
    color: var(--text-tertiary);
  }
}
</style>
