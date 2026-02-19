import type { InjectionKey, Ref } from 'vue'

export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

export interface DropdownContext {
  isOpen: Ref<boolean>
  toggle: () => void
  close: () => void
  triggerId: string
  menuId: string
}

export const dropdownContextKey: InjectionKey<DropdownContext> = Symbol('dropdown')
