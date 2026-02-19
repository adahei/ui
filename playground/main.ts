import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import '@/styles/main.scss'
import './playground.scss'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./pages/HomePage.vue'),
    },
    {
      path: '/accordion',
      name: 'accordion',
      component: () => import('./pages/AccordionPage.vue'),
    },
    {
      path: '/alert',
      name: 'alert',
      component: () => import('./pages/AlertPage.vue'),
    },
    {
      path: '/avatar',
      name: 'avatar',
      component: () => import('./pages/AvatarPage.vue'),
    },
    {
      path: '/badge',
      name: 'badge',
      component: () => import('./pages/BadgePage.vue'),
    },
    {
      path: '/button',
      name: 'button',
      component: () => import('./pages/ButtonPage.vue'),
    },
    {
      path: '/button-group',
      name: 'button-group',
      component: () => import('./pages/ButtonGroupPage.vue'),
    },
    {
      path: '/dropdown',
      name: 'dropdown',
      component: () => import('./pages/DropdownPage.vue'),
    },
    {
      path: '/image',
      name: 'image',
      component: () => import('./pages/ImagePage.vue'),
    },
    {
      path: '/checkbox',
      name: 'checkbox',
      component: () => import('./pages/CheckboxPage.vue'),
    },
    {
      path: '/fieldset',
      name: 'fieldset',
      component: () => import('./pages/FieldsetPage.vue'),
    },
    {
      path: '/file-input',
      name: 'file-input',
      component: () => import('./pages/FileInputPage.vue'),
    },
    {
      path: '/form-example',
      name: 'form-example',
      component: () => import('./pages/FormExamplePage.vue'),
    },
    {
      path: '/input',
      name: 'input',
      component: () => import('./pages/InputPage.vue'),
    },
    {
      path: '/input-group',
      name: 'input-group',
      component: () => import('./pages/InputGroupPage.vue'),
    },
    {
      path: '/label',
      name: 'label',
      component: () => import('./pages/LabelPage.vue'),
    },
    {
      path: '/lightbox',
      name: 'lightbox',
      component: () => import('./pages/LightboxPage.vue'),
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('./pages/MessagePage.vue'),
    },
    {
      path: '/modal',
      name: 'modal',
      component: () => import('./pages/ModalPage.vue'),
    },
    {
      path: '/nav',
      name: 'nav',
      component: () => import('./pages/NavPage.vue'),
    },
    {
      path: '/radio',
      name: 'radio',
      component: () => import('./pages/RadioPage.vue'),
    },
    {
      path: '/select',
      name: 'select',
      component: () => import('./pages/SelectPage.vue'),
    },
    {
      path: '/slider',
      name: 'slider',
      component: () => import('./pages/SliderPage.vue'),
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: () => import('./pages/TabsPage.vue'),
    },
    {
      path: '/textarea',
      name: 'textarea',
      component: () => import('./pages/TextareaPage.vue'),
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('./pages/CardPage.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('./pages/ChatPage.vue'),
    },
    {
      path: '/stack',
      name: 'stack',
      component: () => import('./pages/StackPage.vue'),
    },
        {
      path: '/user-card',
      name: 'user-card',
      component: () => import('./pages/UserCardPage.vue'),
    },
  ],
})

const app = createApp(App)
app.use(router)
app.mount('#app')
