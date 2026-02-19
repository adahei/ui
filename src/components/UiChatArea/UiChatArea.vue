<script setup lang="ts">
import { ref, useSlots } from 'vue'
import { Send } from 'lucide-vue-next'
import UiTextarea from '../UiTextarea/UiTextarea.vue'
import UiButton from '../UiButton/UiButton.vue'

interface Props {
  /** Text content (v-model) */
  modelValue?: string
  /** Placeholder text */
  placeholder?: string
  /** Disable the input and send button */
  disabled?: boolean
  /** Show loading state on send button */
  loading?: boolean
  /** Number of rows */
  rows?: number
  /** Send button text (empty for icon only) */
  sendText?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Type a message...',
  disabled: false,
  loading: false,
  rows: 2,
  sendText: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'send': [message: string]
}>()

const slots = useSlots()
const textareaRef = ref<HTMLElement | null>(null)

function handleInput(value: string | null) {
  emit('update:modelValue', value ?? '')
}

function handleSend() {
  if (props.disabled || props.loading || !props.modelValue.trim()) return
  emit('send', props.modelValue)
  emit('update:modelValue', '')
  focus()
}

function handleKeydown(e: KeyboardEvent) {
  // Send on Enter (without Shift)
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

function focus() {
  const textarea = textareaRef.value?.querySelector('textarea')
  textarea?.focus()
}

defineExpose({
  focus,
})
</script>

<template>
  <div class="ui-chat-area" :class="{ 'ui-chat-area--disabled': disabled }">
    <div v-if="slots.actions" class="ui-chat-area__actions">
      <slot name="actions" />
    </div>

    <div ref="textareaRef" class="ui-chat-area__input">
      <UiTextarea
        :model-value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
        resize="none"
        class="ui-chat-area__textarea"
        @update:model-value="handleInput"
        @keydown="handleKeydown"
      />
      <UiButton
        class="ui-chat-area__send"
        :disabled="disabled || !modelValue.trim()"
        :loading="loading"
        :icon-left="sendText ? undefined : Send"
        @click="handleSend"
      >
        {{ sendText }}
      </UiButton>
    </div>

    <div v-if="slots.footer" class="ui-chat-area__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-chat-area {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
  border-top: 1px solid var(--border-primary);
  background-color: var(--bg-primary);

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
    flex-wrap: wrap;
  }

  &__input {
    display: flex;
    align-items: flex-end;
    gap: var(--spacing-2);
  }

  &__textarea {
    flex: 1;
    min-width: 0;
    width: 100%;
  }

  &__send {
    flex-shrink: 0;
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    font-size: var(--text-xs);
    color: var(--text-tertiary);
  }

  &--disabled {
    opacity: 0.6;
  }
}
</style>
