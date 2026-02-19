<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  UiChatContainer,
  UiChatArea,
  UiMessage,
  UiCard,
  UiButton,
  UiStack,
} from '@/components'
import { ThumbsUp, ThumbsDown, Copy, RotateCcw, Trash2, Download, Share2, Paperclip, Smile, Mic } from 'lucide-vue-next'

interface Message {
  id: number
  author: string
  content: string
  timestamp: string
  variant: 'sent' | 'received'
  avatarSrc?: string
}

const messages = ref<Message[]>([
  {
    id: 1,
    author: 'Luna',
    content: 'Hello! I\'m Luna, your AI companion. How can I help you today?',
    timestamp: '10:30 AM',
    variant: 'received',
    avatarSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
  {
    id: 2,
    author: 'You',
    content: 'Hi Luna! I\'d like to learn more about you. What\'s your background?',
    timestamp: '10:31 AM',
    variant: 'sent',
  },
  {
    id: 3,
    author: 'Luna',
    content: 'I\'m a creative writing assistant with a passion for storytelling. I love helping people develop characters, plots, and immersive narratives. I have a warm and encouraging personality, and I believe every story deserves to be told.',
    timestamp: '10:31 AM',
    variant: 'received',
    avatarSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
  {
    id: 4,
    author: 'You',
    content: 'That sounds great! Can you help me create a character for a fantasy story?',
    timestamp: '10:32 AM',
    variant: 'sent',
  },
  {
    id: 5,
    author: 'Luna',
    content: 'I\'d love to help! Let\'s start with the basics:\n\n• What genre or setting are you thinking? (High fantasy, urban fantasy, etc.)\n• Do you have any initial ideas for their role in the story?\n• What kind of personality traits are you drawn to?',
    timestamp: '10:32 AM',
    variant: 'received',
    avatarSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
])

const messageKey = computed(() => messages.value.length)
const inputMessage = ref('')

let messageId = 6

function handleSend(message: string) {
  messages.value.push({
    id: messageId++,
    author: 'You',
    content: message,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    variant: 'sent',
  })

  // Simulate AI response after a short delay
  setTimeout(() => {
    simulateStreaming()
  }, 500)
}

function addManyMessages() {
  for (let i = 0; i < 10; i++) {
    messages.value.push({
      id: messageId++,
      author: i % 2 === 0 ? 'Luna' : 'You',
      content: `This is message #${messageId - 1}. Adding multiple messages to demonstrate scrolling behavior.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      variant: i % 2 === 0 ? 'received' : 'sent',
      avatarSrc: i % 2 === 0 ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' : undefined,
    })
  }
}

function clearMessages() {
  messages.value = []
  messageId = 1
}

// Streaming simulation
const isStreaming = ref(false)

function simulateStreaming() {
  if (isStreaming.value) return
  isStreaming.value = true

  const newId = messageId++
  messages.value.push({
    id: newId,
    author: 'Luna',
    content: '',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    variant: 'received',
    avatarSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  })

  const fullText = "This is a streaming response that simulates how AI generates text word by word. As each word appears, the chat container should automatically scroll to keep the latest content visible. This creates a smooth reading experience for users watching the AI compose its response in real-time."
  const words = fullText.split(' ')
  let wordIndex = 0

  const interval = setInterval(() => {
    const msgIndex = messages.value.findIndex(m => m.id === newId)
    if (msgIndex === -1) {
      clearInterval(interval)
      isStreaming.value = false
      return
    }

    if (wordIndex < words.length) {
      // Update the message in the array to trigger reactivity
      messages.value[msgIndex] = {
        ...messages.value[msgIndex],
        content: messages.value[msgIndex].content + (wordIndex > 0 ? ' ' : '') + words[wordIndex],
      }
      wordIndex++
    } else {
      clearInterval(interval)
      isStreaming.value = false
    }
  }, 100)
}
</script>

<template>
  <div class="page">
    <h1 class="page__title">Chat Components</h1>
    <p class="page__description">
      Components for building chat interfaces: UiChatContainer for messages with auto-scroll, and UiChatArea for text input.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Interactive Demo</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Try scrolling up to see the "scroll to bottom" button. The action bar at the bottom provides quick actions.
      </p>
      <UiCard variant="outline" padding="none" style="height: 500px; max-width: 600px; display: flex; flex-direction: column;">
        <UiChatContainer :message-key="messageKey" gap="4" padding="4">
          <UiMessage
            v-for="msg in messages"
            :key="msg.id"
            :variant="msg.variant"
            :author="msg.author"
            :timestamp="msg.timestamp"
            :avatar-src="msg.avatarSrc"
          >
            {{ msg.content }}
            <template v-if="msg.variant === 'received'" #actions>
              <UiButton variant="ghost" size="sm" :icon-left="ThumbsUp" />
              <UiButton variant="ghost" size="sm" :icon-left="ThumbsDown" />
              <UiButton variant="ghost" size="sm" :icon-left="Copy" />
              <UiButton variant="ghost" size="sm" :icon-left="RotateCcw" />
            </template>
          </UiMessage>

          <template #actions>
            <UiButton variant="ghost" size="sm" :icon-left="RotateCcw">Regenerate</UiButton>
            <UiButton variant="ghost" size="sm" :icon-left="Copy">Copy All</UiButton>
            <UiButton variant="ghost" size="sm" :icon-left="Download">Export</UiButton>
            <UiButton variant="ghost" size="sm" :icon-left="Share2">Share</UiButton>
            <div style="flex: 1;" />
            <UiButton variant="ghost" size="sm" :icon-left="Trash2" @click="clearMessages">Clear</UiButton>
          </template>
        </UiChatContainer>

        <UiChatArea
          v-model="inputMessage"
          :loading="isStreaming"
          placeholder="Type your message..."
          @send="handleSend"
        >
          <template #actions>
            <UiButton variant="ghost" size="sm" :icon-left="Paperclip" />
            <UiButton variant="ghost" size="sm" :icon-left="Smile" />
            <UiButton variant="ghost" size="sm" :icon-left="Mic" />
          </template>
        </UiChatArea>
      </UiCard>

      <UiStack direction="row" gap="2" style="margin-top: var(--spacing-4);">
        <UiButton variant="outline" size="sm" @click="addManyMessages">Add 10 Messages</UiButton>
        <UiButton variant="outline" size="sm" :disabled="isStreaming" @click="simulateStreaming">
          {{ isStreaming ? 'Streaming...' : 'Simulate Streaming' }}
        </UiButton>
        <UiButton variant="outline" size="sm" @click="clearMessages">Clear All</UiButton>
      </UiStack>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Without Actions Bar</h2>
      <UiCard variant="outline" padding="none" style="height: 300px; max-width: 500px;">
        <UiChatContainer gap="3" padding="4">
          <UiMessage variant="received" author="System" timestamp="Now">
            This chat container has no actions bar at the bottom.
          </UiMessage>
          <UiMessage variant="sent" author="You" timestamp="Now">
            It's useful for read-only message displays.
          </UiMessage>
          <UiMessage variant="received" author="System" timestamp="Now">
            You can still scroll through the messages!
          </UiMessage>
        </UiChatContainer>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Props</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>messageKey</code></td>
            <td><code>string | number</code></td>
            <td><code>-</code></td>
            <td>Changes when new messages are added to trigger auto-scroll</td>
          </tr>
          <tr>
            <td><code>gap</code></td>
            <td><code>'1' | '2' | '3' | '4' | '5' | '6'</code></td>
            <td><code>'3'</code></td>
            <td>Gap between messages</td>
          </tr>
          <tr>
            <td><code>padding</code></td>
            <td><code>'0' | '2' | '3' | '4' | '5' | '6'</code></td>
            <td><code>'4'</code></td>
            <td>Padding inside the container</td>
          </tr>
          <tr>
            <td><code>showScrollButton</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Show scroll-to-bottom button when scrolled up</td>
          </tr>
          <tr>
            <td><code>scrollThreshold</code></td>
            <td><code>number</code></td>
            <td><code>100</code></td>
            <td>Distance from bottom (px) to consider "at bottom"</td>
          </tr>
          <tr>
            <td><code>followOutput</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Auto-scroll when content grows (for streaming AI responses)</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Slots</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Slot</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>default</code></td>
            <td>Chat messages (UiMessage components)</td>
          </tr>
          <tr>
            <td><code>actions</code></td>
            <td>Optional action bar at the bottom (input, buttons)</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">UiChatArea Props</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>modelValue</code></td>
            <td><code>string</code></td>
            <td><code>''</code></td>
            <td>Text content (v-model)</td>
          </tr>
          <tr>
            <td><code>placeholder</code></td>
            <td><code>string</code></td>
            <td><code>'Type a message...'</code></td>
            <td>Placeholder text</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Disable input and send button</td>
          </tr>
          <tr>
            <td><code>loading</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Show loading state on send button</td>
          </tr>
          <tr>
            <td><code>rows</code></td>
            <td><code>number</code></td>
            <td><code>2</code></td>
            <td>Number of textarea rows</td>
          </tr>
          <tr>
            <td><code>sendText</code></td>
            <td><code>string</code></td>
            <td><code>''</code></td>
            <td>Send button text (empty for icon only)</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">UiChatArea Slots</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Slot</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>actions</code></td>
            <td>Action buttons above the textarea (attachments, emoji, etc.)</td>
          </tr>
          <tr>
            <td><code>footer</code></td>
            <td>Footer content below the input (character count, hints)</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">UiChatArea Events</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Payload</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>send</code></td>
            <td><code>string</code></td>
            <td>Emitted when send button clicked or Enter pressed</td>
          </tr>
          <tr>
            <td><code>update:modelValue</code></td>
            <td><code>string</code></td>
            <td>Emitted when text changes</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Exposed Methods</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Method</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>scrollToBottom(behavior?)</code></td>
            <td>Programmatically scroll to bottom. Behavior: 'smooth' | 'instant'</td>
          </tr>
          <tr>
            <td><code>isAtBottom</code></td>
            <td>Ref indicating if scroll is at bottom</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
