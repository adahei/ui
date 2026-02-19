<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'
import type { Size } from '@/types'

interface Props {
  open?: boolean
  size?: Size
  title?: string
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  size: 'md',
  closeOnBackdrop: true,
  closeOnEscape: true,
  showCloseButton: true,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  close: []
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)

function openModal() {
  dialogRef.value?.showModal()
}

function closeModal() {
  dialogRef.value?.close()
}

function handleClose() {
  emit('update:open', false)
  emit('close')
}

function handleBackdropClick(event: MouseEvent) {
  if (!props.closeOnBackdrop) return

  // Check if click was on the backdrop (dialog element itself, not its contents)
  const rect = dialogRef.value?.getBoundingClientRect()
  if (!rect) return

  const clickedInDialog =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom

  if (!clickedInDialog) {
    closeModal()
  }
}

function handleCancel(event: Event) {
  if (!props.closeOnEscape) {
    event.preventDefault()
  }
}

// Sync open prop with dialog state
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      openModal()
    } else {
      closeModal()
    }
  }
)

// Open on mount if needed
onMounted(() => {
  if (props.open) {
    openModal()
  }
})

// Cleanup
onUnmounted(() => {
  closeModal()
})
</script>

<template>
  <dialog
    ref="dialogRef"
    :class="['ui-modal', `ui-modal--${size}`]"
    @close="handleClose"
    @cancel="handleCancel"
    @click="handleBackdropClick"
  >
    <div class="ui-modal__container" @click.stop>
      <header v-if="title || $slots.header || showCloseButton" class="ui-modal__header">
        <slot name="header">
          <h2 v-if="title" class="ui-modal__title">{{ title }}</h2>
        </slot>
        <button
          v-if="showCloseButton"
          type="button"
          class="ui-modal__close"
          aria-label="Close modal"
          @click="closeModal"
        >
          <X aria-hidden="true" />
        </button>
      </header>

      <div class="ui-modal__body">
        <slot />
      </div>

      <footer v-if="$slots.footer" class="ui-modal__footer">
        <slot name="footer" />
      </footer>
    </div>
  </dialog>
</template>

<style lang="scss" scoped>
.ui-modal {
  // Reset default dialog styles
  border: none;
  padding: 0;
  max-width: none;
  max-height: none;
  overflow: visible;
  background: transparent;

  // Positioning
  position: fixed;
  inset: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  // Hidden by default
  opacity: 0;
  visibility: hidden;

  // Open state
  &[open] {
    opacity: 1;
    visibility: visible;
  }

  // Backdrop styling
  &::backdrop {
    background-color: rgb(0 0 0 / 0.5);
    opacity: 0;
    transition:
      opacity var(--transition-normal),
      backdrop-filter var(--transition-normal);
  }

  &[open]::backdrop {
    opacity: 1;
  }

  // Entry/exit animations using modern CSS
  transition:
    opacity var(--transition-normal),
    visibility var(--transition-normal),
    overlay var(--transition-normal) allow-discrete,
    display var(--transition-normal) allow-discrete;

  // Starting style for entry animation
  @starting-style {
    &[open] {
      opacity: 0;
    }

    &[open]::backdrop {
      opacity: 0;
    }
  }

  // Container
  &__container {
    background-color: var(--modal-bg, var(--bg-primary));
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 4rem);
    max-height: calc(100dvh - 4rem);
    transform: scale(0.95) translateY(-1rem);
    transition: transform var(--transition-normal);
  }

  &[open] &__container {
    transform: scale(1) translateY(0);
  }

  @starting-style {
    &[open] &__container {
      transform: scale(0.95) translateY(-1rem);
    }
  }

  // Header
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-4);
    padding: var(--spacing-4) var(--spacing-5);
    border-bottom: 1px solid var(--modal-border, var(--border-primary));
    flex-shrink: 0;
  }

  &__title {
    margin: 0;
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--modal-title, var(--text-primary));
    line-height: 1.4;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    margin: calc(var(--spacing-1) * -1);
    margin-left: auto;
    padding: 0;
    border: none;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-tertiary);
    cursor: pointer;
    transition: background-color var(--transition-fast), color var(--transition-fast);

    &:hover {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  // Body
  &__body {
    padding: var(--spacing-5);
    overflow-y: auto;
    flex: 1;
    color: var(--text-primary);
  }

  // Footer
  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-3);
    padding: var(--spacing-4) var(--spacing-5);
    border-top: 1px solid var(--modal-border, var(--border-primary));
    flex-shrink: 0;
  }

  // Sizes
  &--sm &__container {
    width: min(24rem, calc(100vw - 2rem));
  }

  &--md &__container {
    width: min(32rem, calc(100vw - 2rem));
  }

  &--lg &__container {
    width: min(48rem, calc(100vw - 2rem));
  }
}
</style>
