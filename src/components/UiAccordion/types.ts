import type { InjectionKey, Ref } from 'vue'

export interface AccordionContext {
  openItems: Ref<(string | number)[]>
  toggle: (value: string | number) => void
  multiple: boolean
}

export const accordionContextKey: InjectionKey<AccordionContext> = Symbol('accordion')
