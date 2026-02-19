import { ref, watch, type Ref } from 'vue'

export interface UseDisclosureOptions {
  /** Initial open state */
  defaultOpen?: boolean
  /** Callback when opened */
  onOpen?: () => void
  /** Callback when closed */
  onClose?: () => void
}

export interface UseDisclosureReturn {
  /** Whether the disclosure is open */
  isOpen: Ref<boolean>
  /** Open the disclosure */
  open: () => void
  /** Close the disclosure */
  close: () => void
  /** Toggle the disclosure */
  toggle: () => void
}

/**
 * Composable for managing open/close state of collapsible elements
 */
export function useDisclosure(options: UseDisclosureOptions = {}): UseDisclosureReturn {
  const { defaultOpen = false, onOpen, onClose } = options

  const isOpen = ref(defaultOpen)

  function open() {
    if (!isOpen.value) {
      isOpen.value = true
    }
  }

  function close() {
    if (isOpen.value) {
      isOpen.value = false
    }
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  // Watch for changes and call callbacks
  if (onOpen || onClose) {
    watch(isOpen, (value) => {
      if (value) {
        onOpen?.()
      } else {
        onClose?.()
      }
    })
  }

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}
