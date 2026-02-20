<script setup lang="ts">
import { computed, ref, inject, useId, type ComputedRef } from 'vue'
import { Upload, X, File, Image } from 'lucide-vue-next'
import type { Size } from '@/types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  /** Selected files (v-model) */
  modelValue?: File[]
  /** Accepted file types (e.g., "image/*", ".pdf,.doc") */
  accept?: string
  /** Allow multiple file selection */
  multiple?: boolean
  /** Maximum file size in bytes */
  maxSize?: number
  /** Maximum number of files (when multiple) */
  maxFiles?: number
  /** Placeholder text */
  placeholder?: string
  /** Component size */
  size?: Size
  /** Disabled state */
  disabled?: boolean
  /** Error state */
  error?: boolean | string
  /** Show image previews */
  showPreview?: boolean
  /** Custom ID */
  id?: string
  /** Name attribute */
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  multiple: false,
  disabled: false,
  error: false,
  showPreview: true,
  placeholder: 'No file selected',
})

const emit = defineEmits<{
  'update:modelValue': [files: File[]]
  'error': [message: string]
}>()

// Inject from parent components
const injectedSize = inject<Size | undefined>('inputGroupSize', undefined)
const effectiveSize = computed(() => props.size ?? injectedSize ?? 'md')

const formFieldId = inject<ComputedRef<string> | undefined>('formFieldId', undefined)
const formFieldError = inject<ComputedRef<boolean> | undefined>('formFieldError', undefined)

const generatedId = useId()
const inputId = computed(() => props.id ?? formFieldId?.value ?? generatedId)

const hasError = computed(() => props.error !== false ? !!props.error : (formFieldError?.value ?? false))
const errorMessage = computed(() => typeof props.error === 'string' ? props.error : null)

const ariaDescribedBy = computed(() => {
  if (errorMessage.value) {
    return `${inputId.value}-error`
  }
  return undefined
})

// State
const isDragging = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

// Computed
const files = computed(() => props.modelValue || [])
const hasFiles = computed(() => files.value.length > 0)

const displayText = computed(() => {
  if (!hasFiles.value) return props.placeholder
  if (files.value.length === 1) return files.value[0].name
  return `${files.value.length} files selected`
})

const classes = computed(() => [
  'ui-file-input',
  `ui-file-input--${effectiveSize.value}`,
  {
    'ui-file-input--error': hasError.value,
    'ui-file-input--disabled': props.disabled,
    'ui-file-input--dragging': isDragging.value,
    'ui-file-input--has-files': hasFiles.value,
  },
])

// Helpers
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function isImageFile(file: File): boolean {
  return file.type.startsWith('image/')
}

function getFilePreview(file: File): string | undefined {
  if (isImageFile(file)) {
    return URL.createObjectURL(file)
  }
  return undefined
}

function validateFile(file: File): string | null {
  if (props.maxSize && file.size > props.maxSize) {
    return `File "${file.name}" exceeds maximum size of ${formatFileSize(props.maxSize)}`
  }
  return null
}

function validateFiles(newFiles: File[]): { valid: File[], errors: string[] } {
  const valid: File[] = []
  const errors: string[] = []

  for (const file of newFiles) {
    const error = validateFile(file)
    if (error) {
      errors.push(error)
    } else {
      valid.push(file)
    }
  }

  // Check max files limit
  if (props.maxFiles && props.multiple) {
    const totalFiles = files.value.length + valid.length
    if (totalFiles > props.maxFiles) {
      errors.push(`Maximum ${props.maxFiles} files allowed`)
      const allowedCount = Math.max(0, props.maxFiles - files.value.length)
      valid.splice(allowedCount)
    }
  }

  return { valid, errors }
}

function addFiles(newFiles: File[]) {
  if (props.disabled) return

  const { valid, errors } = validateFiles(newFiles)

  // Emit errors
  errors.forEach(error => emit('error', error))

  if (valid.length === 0) return

  if (props.multiple) {
    emit('update:modelValue', [...files.value, ...valid])
  } else {
    emit('update:modelValue', [valid[0]])
  }
}

function removeFile(index: number, e: Event) {
  e.stopPropagation()
  if (props.disabled) return
  const newFiles = [...files.value]
  newFiles.splice(index, 1)
  emit('update:modelValue', newFiles)
}

function clearFiles(e: Event) {
  e.stopPropagation()
  if (props.disabled) return
  emit('update:modelValue', [])
}

// Event handlers
function onDragEnter(e: DragEvent) {
  e.preventDefault()
  if (!props.disabled) {
    isDragging.value = true
  }
}

function onDragLeave(e: DragEvent) {
  e.preventDefault()
  isDragging.value = false
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  isDragging.value = false

  if (props.disabled || !e.dataTransfer?.files) return

  const droppedFiles = Array.from(e.dataTransfer.files)
  addFiles(droppedFiles)
}

function onClick() {
  if (!props.disabled) {
    inputRef.value?.click()
  }
}

function onInputChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (!target.files) return

  const selectedFiles = Array.from(target.files)
  addFiles(selectedFiles)

  // Reset input so same file can be selected again
  target.value = ''
}
</script>

<template>
  <div :class="classes">
    <div
      class="ui-file-input__field"
      role="button"
      :tabindex="disabled ? -1 : 0"
      :aria-disabled="disabled"
      :aria-describedby="ariaDescribedBy"
      @click="onClick"
      @keydown.enter.space.prevent="onClick"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @dragover="onDragOver"
      @drop="onDrop"
    >
      <input
        ref="inputRef"
        v-bind="$attrs"
        type="file"
        :id="inputId"
        :name="name"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        class="ui-file-input__input"
        @change="onInputChange"
      />

      <span class="ui-file-input__text" :class="{ 'ui-file-input__text--placeholder': !hasFiles }">
        {{ displayText }}
      </span>

      <button
        v-if="hasFiles"
        type="button"
        class="ui-file-input__clear"
        :disabled="disabled"
        aria-label="Clear files"
        @click="clearFiles"
      >
        <X />
      </button>

      <span class="ui-file-input__button">
        <Upload />
        <span class="ui-file-input__button-text">Browse</span>
      </span>
    </div>

    <!-- File list (when multiple or showing preview) -->
    <ul v-if="hasFiles && (multiple || showPreview)" class="ui-file-input__files">
      <li v-for="(file, index) in files" :key="index" class="ui-file-input__file">
        <div v-if="showPreview && isImageFile(file)" class="ui-file-input__file-preview">
          <img
            :src="getFilePreview(file)"
            :alt="file.name"
            class="ui-file-input__file-image"
          />
        </div>
        <component :is="isImageFile(file) ? Image : File" v-else class="ui-file-input__file-icon" />
        <span class="ui-file-input__file-name">{{ file.name }}</span>
        <span class="ui-file-input__file-size">{{ formatFileSize(file.size) }}</span>
        <button
          v-if="multiple"
          type="button"
          class="ui-file-input__file-remove"
          :disabled="disabled"
          aria-label="Remove file"
          @click="removeFile(index, $event)"
        >
          <X />
        </button>
      </li>
    </ul>

    <p v-if="errorMessage" :id="`${inputId}-error`" class="ui-file-input__error" aria-live="polite">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.ui-file-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  width: 100%;

  &__field {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    border: 1px solid var(--input-border);
    border-radius: var(--radius-md);
    background-color: var(--input-bg);
    cursor: pointer;
    transition:
      border-color var(--transition-fast),
      box-shadow var(--transition-fast);

    &:hover:not([aria-disabled='true']) {
      border-color: var(--input-border-hover);
    }

    &:focus-visible {
      outline: none;
      border-color: var(--input-border-focus);
      box-shadow: var(--focus-ring);
    }
  }

  &__input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  &__text {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-primary);
    font-size: var(--text-sm);

    &--placeholder {
      color: var(--input-placeholder);
    }
  }

  &__clear {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--text-tertiary);
    cursor: pointer;
    transition: color var(--transition-fast);

    &:hover:not(:disabled) {
      color: var(--text-primary);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  &__button {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
    padding: var(--spacing-1) var(--spacing-3);
    margin: 2px;
    border-radius: var(--radius-sm);
    background-color: var(--bg-secondary);
    color: var(--text-secondary);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    transition: background-color var(--transition-fast);
  }

  &__field:hover:not([aria-disabled='true']) &__button {
    background-color: var(--bg-tertiary);
  }

  &__files {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
  }

  &__file {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-1) var(--spacing-2);
    background-color: var(--bg-secondary);
    border-radius: var(--radius-sm);
    font-size: var(--text-sm);
  }

  &__file-preview {
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: var(--radius-xs);
    overflow: hidden;
  }

  &__file-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__file-icon {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    color: var(--text-tertiary);
  }

  &__file-name {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-primary);
  }

  &__file-size {
    flex-shrink: 0;
    color: var(--text-tertiary);
    font-size: var(--text-xs);
  }

  &__file-remove {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    padding: 0;
    border: none;
    border-radius: var(--radius-xs);
    background-color: transparent;
    color: var(--text-tertiary);
    cursor: pointer;
    transition: background-color var(--transition-fast), color var(--transition-fast);

    &:hover:not(:disabled) {
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  }

  &__error {
    color: var(--input-error-text);
    font-size: var(--text-sm);
    margin: 0;
  }

  // Sizes
  &--sm {
    .ui-file-input__field {
      height: 2rem;
      padding-left: var(--spacing-3);
    }

    .ui-file-input__text {
      font-size: var(--text-sm);
    }

    .ui-file-input__button {
      padding: var(--spacing-1) var(--spacing-2);
      font-size: var(--text-xs);

      svg {
        width: 0.875rem;
        height: 0.875rem;
      }
    }

    .ui-file-input__button-text {
      display: none;
    }
  }

  &--md {
    .ui-file-input__field {
      height: 2.5rem;
      padding-left: var(--spacing-3);
    }

    .ui-file-input__button svg {
      width: 1rem;
      height: 1rem;
    }
  }

  &--lg {
    .ui-file-input__field {
      height: 2.75rem;
      padding-left: var(--spacing-4);
    }

    .ui-file-input__text {
      font-size: var(--text-base);
    }

    .ui-file-input__button {
      padding: var(--spacing-2) var(--spacing-3);
      font-size: var(--text-sm);

      svg {
        width: 1.125rem;
        height: 1.125rem;
      }
    }
  }

  // States
  &--dragging {
    .ui-file-input__field {
      border-color: var(--input-border-focus);
      background-color: var(--bg-secondary);
    }
  }

  &--error {
    .ui-file-input__field {
      border-color: var(--input-border-error);

      &:focus-visible {
        box-shadow: 0 0 0 2px var(--input-bg), 0 0 0 4px var(--input-border-error);
      }
    }
  }

  &--disabled {
    .ui-file-input__field {
      cursor: not-allowed;
      opacity: 0.5;
      background-color: var(--input-bg-disabled);
    }

    .ui-file-input__file {
      opacity: 0.5;
    }
  }

}
</style>
