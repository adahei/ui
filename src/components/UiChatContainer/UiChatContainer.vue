<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick, useSlots } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

interface Props {
  /** Key that changes when new messages are added (triggers auto-scroll) */
  messageKey?: string | number
  /** Gap between messages */
  gap?: '1' | '2' | '3' | '4' | '5' | '6'
  /** Padding inside the container */
  padding?: '0' | '2' | '3' | '4' | '5' | '6'
  /** Show scroll-to-bottom button when scrolled up */
  showScrollButton?: boolean
  /** Threshold in pixels from bottom to consider "at bottom" */
  scrollThreshold?: number
  /** Auto-scroll when content height changes (useful for streaming AI responses) */
  followOutput?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  gap: '3',
  padding: '4',
  showScrollButton: true,
  scrollThreshold: 100,
  followOutput: true,
})

const slots = useSlots()
const containerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const isAtBottom = ref(true)
const showButton = ref(false)

function scrollToBottom(behavior: ScrollBehavior = 'smooth') {
  if (!containerRef.value) return

  nextTick(() => {
    if (containerRef.value) {
      containerRef.value.scrollTo({
        top: containerRef.value.scrollHeight,
        behavior,
      })
    }
  })
}

function checkScrollPosition() {
  if (!containerRef.value) return

  const { scrollTop, scrollHeight, clientHeight } = containerRef.value
  const distanceFromBottom = scrollHeight - scrollTop - clientHeight

  isAtBottom.value = distanceFromBottom <= props.scrollThreshold
  showButton.value = !isAtBottom.value && props.showScrollButton
}

function onScroll() {
  checkScrollPosition()
}

// Auto-scroll when messageKey changes (new messages)
watch(() => props.messageKey, () => {
  // Always scroll to bottom on new messages
  scrollToBottom()
}, { flush: 'post' })

// ResizeObserver for following output during streaming
let resizeObserver: ResizeObserver | null = null

function setupResizeObserver() {
  if (!contentRef.value || !props.followOutput) return

  resizeObserver = new ResizeObserver(() => {
    // Only auto-scroll if user is at/near bottom
    if (isAtBottom.value) {
      scrollToBottom('instant')
    }
  })

  // Observe the content wrapper for size changes (e.g., streaming text)
  resizeObserver.observe(contentRef.value)
}

function cleanupResizeObserver() {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
}

// Initial scroll to bottom
onMounted(() => {
  scrollToBottom('instant')
  setupResizeObserver()
})

onUnmounted(() => {
  cleanupResizeObserver()
})

// Expose methods for parent components
defineExpose({
  scrollToBottom,
  isAtBottom,
})
</script>

<template>
  <div class="ui-chat-container">
    <div
      ref="containerRef"
      class="ui-chat-container__messages"
      :class="[
        `ui-chat-container__messages--gap-${gap}`,
        `ui-chat-container__messages--padding-${padding}`,
      ]"
      @scroll="onScroll"
    >
      <div ref="contentRef" class="ui-chat-container__content">
        <slot />
      </div>
    </div>

    <Transition name="fade">
      <button
        v-if="showButton"
        type="button"
        class="ui-chat-container__scroll-button"
        aria-label="Scroll to bottom"
        @click="scrollToBottom()"
      >
        <ChevronDown />
      </button>
    </Transition>

    <div v-if="slots.actions" class="ui-chat-container__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0; // Required for overflow to work when nested in flex
  position: relative;

  &__messages {
    flex: 1;
    min-height: 0; // Required for overflow to work in flex container
    overflow-y: auto;
    overflow-x: hidden;

    // Custom scrollbar
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--border-primary);
      border-radius: 4px;

      &:hover {
        background-color: var(--border-secondary);
      }
    }

    // Padding variants
    &--padding-0 { padding: 0; }
    &--padding-2 { padding: var(--spacing-2); }
    &--padding-3 { padding: var(--spacing-3); }
    &--padding-4 { padding: var(--spacing-4); }
    &--padding-5 { padding: var(--spacing-5); }
    &--padding-6 { padding: var(--spacing-6); }

    // Gap variants (applied to content)
    &--gap-1 > .ui-chat-container__content { gap: var(--spacing-1); }
    &--gap-2 > .ui-chat-container__content { gap: var(--spacing-2); }
    &--gap-3 > .ui-chat-container__content { gap: var(--spacing-3); }
    &--gap-4 > .ui-chat-container__content { gap: var(--spacing-4); }
    &--gap-5 > .ui-chat-container__content { gap: var(--spacing-5); }
    &--gap-6 > .ui-chat-container__content { gap: var(--spacing-6); }
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__scroll-button {
    position: absolute;
    bottom: var(--spacing-4);
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-full);
    background-color: var(--bg-primary);
    color: var(--text-secondary);
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition:
      background-color var(--transition-fast),
      color var(--transition-fast),
      transform var(--transition-fast);

    &:hover {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
    }

    &:active {
      transform: translateX(-50%) scale(0.95);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  // Adjust button position when actions are present
  &:has(&__actions) &__scroll-button {
    bottom: calc(var(--spacing-4) + 3.5rem);
  }

  &__actions {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-3) var(--spacing-4);
    border-top: 1px solid var(--border-primary);
    background-color: var(--bg-secondary);
  }
}

// Fade transition for scroll button
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
