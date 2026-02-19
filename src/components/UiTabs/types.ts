import type { InjectionKey, Ref } from 'vue'

export interface TabsContext {
  activeTab: Ref<string>
  setActiveTab: (value: string) => void
  registerTab: (value: string) => void
  unregisterTab: (value: string) => void
  tabs: Ref<string[]>
  tabsId: string
}

export const tabsContextKey: InjectionKey<TabsContext> = Symbol('tabs')
