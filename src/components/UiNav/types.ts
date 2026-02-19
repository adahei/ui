import type { InjectionKey, Ref } from 'vue'

export type NavOrientation = 'horizontal' | 'vertical'

export interface NavContext {
  orientation: Ref<NavOrientation>
}

export interface NavGroupContext {
  isExpanded: Ref<boolean>
  toggle: () => void
  groupId: string
}

export const navContextKey: InjectionKey<NavContext> = Symbol('nav')
export const navGroupContextKey: InjectionKey<NavGroupContext> = Symbol('navGroup')
