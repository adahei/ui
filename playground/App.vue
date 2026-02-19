<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { UiButton, UiNav, UiNavGroup, UiNavItem } from '@/components'
import { Sun, Moon } from 'lucide-vue-next'

const route = useRoute()
const isDark = ref(false)

// Initialize from system preference
if (typeof window !== 'undefined') {
  isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
}

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute(
      'data-theme',
      isDark.value ? 'dark' : 'light'
    )
  }
})

function toggleTheme() {
  isDark.value = !isDark.value
}
</script>

<template>
  <div class="playground">
    <aside class="playground__sidebar">
      <div class="playground__logo">@adahei/ui</div>
      <UiNav aria-label="Component navigation" class="playground__nav">
        <UiNavItem to="/" :active="route.path === '/'">Home</UiNavItem>

        <UiNavGroup label="General">
          <UiNavItem to="/avatar" :active="route.path === '/avatar'">Avatar</UiNavItem>
          <UiNavItem to="/badge" :active="route.path === '/badge'">Badge</UiNavItem>
          <UiNavItem to="/button" :active="route.path === '/button'">Button</UiNavItem>
          <UiNavItem to="/button-group" :active="route.path === '/button-group'">Button Group</UiNavItem>
          <UiNavItem to="/image" :active="route.path === '/image'">Image</UiNavItem>
        </UiNavGroup>

        <UiNavGroup label="Layout">
          <UiNavItem to="/card" :active="route.path === '/card'">Card</UiNavItem>
          <UiNavItem to="/stack" :active="route.path === '/stack'">Stack</UiNavItem>
        </UiNavGroup>

        <UiNavGroup label="Navigation">
          <UiNavItem to="/accordion" :active="route.path === '/accordion'">Accordion</UiNavItem>
          <UiNavItem to="/nav" :active="route.path === '/nav'">Nav</UiNavItem>
          <UiNavItem to="/tabs" :active="route.path === '/tabs'">Tabs</UiNavItem>
        </UiNavGroup>

        <UiNavGroup label="Overlays">
          <UiNavItem to="/dropdown" :active="route.path === '/dropdown'">Dropdown</UiNavItem>
          <UiNavItem to="/lightbox" :active="route.path === '/lightbox'">Lightbox</UiNavItem>
          <UiNavItem to="/modal" :active="route.path === '/modal'">Modal</UiNavItem>
        </UiNavGroup>

        <UiNavGroup label="Data Display">
          <UiNavItem to="/alert" :active="route.path === '/alert'">Alert</UiNavItem>
          <UiNavItem to="/chat" :active="route.path === '/chat'">Chat</UiNavItem>
          <UiNavItem to="/message" :active="route.path === '/message'">Message</UiNavItem>
          <UiNavItem to="/user-card" :active="route.path === '/user-card'">User Card</UiNavItem>
        </UiNavGroup>

        <UiNavGroup label="Form">
          <UiNavItem to="/checkbox" :active="route.path === '/checkbox'">Checkbox</UiNavItem>
          <UiNavItem to="/fieldset" :active="route.path === '/fieldset'">Fieldset</UiNavItem>
          <UiNavItem to="/file-input" :active="route.path === '/file-input'">File Input</UiNavItem>
          <UiNavItem to="/input" :active="route.path === '/input'">Input</UiNavItem>
          <UiNavItem to="/input-group" :active="route.path === '/input-group'">Input Group</UiNavItem>
          <UiNavItem to="/label" :active="route.path === '/label'">Label</UiNavItem>
          <UiNavItem to="/radio" :active="route.path === '/radio'">Radio</UiNavItem>
          <UiNavItem to="/select" :active="route.path === '/select'">Select</UiNavItem>
          <UiNavItem to="/slider" :active="route.path === '/slider'">Slider</UiNavItem>
          <UiNavItem to="/textarea" :active="route.path === '/textarea'">Textarea</UiNavItem>
        </UiNavGroup>

        <UiNavGroup label="Examples">
          <UiNavItem to="/form-example" :active="route.path === '/form-example'">Form</UiNavItem>
        </UiNavGroup>
      </UiNav>
      <div class="playground__theme-toggle">
        <UiButton
          variant="ghost"
          size="sm"
          :icon-left="isDark ? Sun : Moon"
          @click="toggleTheme"
        >
          {{ isDark ? 'Light mode' : 'Dark mode' }}
        </UiButton>
      </div>
    </aside>
    <main class="playground__main">
      <div class="playground__content">
        <RouterView />
      </div>
    </main>
  </div>
</template>
