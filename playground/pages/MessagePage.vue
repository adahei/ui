<script setup lang="ts">
import { UiMessage, UiButton, UiButtonGroup } from '@/components'
import { Reply, ThumbsUp, Heart, Pencil, Trash2 } from 'lucide-vue-next'

import imgSquare from '@/img/portrait_square.jpg'
import imgPortrait from '@/img/portrait_portrait.jpg'
import imgLandscape from '@/img/portrait_landscape.jpg'
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiMessage</h1>
    <p class="page__description">
      A chat/message component combining avatar, content, and actions. Great for chat interfaces, comment sections, and activity feeds.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <div class="message-container">
        <UiMessage
          author="Alice Johnson"
          :avatar-src="imgPortrait"
          timestamp="10:32 AM"
        >
          Hey! How's the project coming along?
        </UiMessage>

        <UiMessage
          variant="sent"
          author="You"
          timestamp="10:33 AM"
        >
          Going great! Just finished the new component.
        </UiMessage>

        <UiMessage
          author="Alice Johnson"
          :avatar-src="imgPortrait"
          timestamp="10:34 AM"
        >
          Awesome! Can't wait to see it in action.
        </UiMessage>
      </div>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Actions (Hover to reveal)</h2>
      <div class="message-container">
        <UiMessage
          author="Bob Smith"
          :avatar-src="imgSquare"
          timestamp="Yesterday"
        >
          <template #actions>
            <UiButtonGroup size="sm">
              <UiButton variant="ghost" :icon-left="ThumbsUp" aria-label="React" />
              <UiButton variant="ghost" :icon-left="Reply" aria-label="Reply" />
            </UiButtonGroup>
          </template>
          Has anyone reviewed the pull request yet? I'd like to get it merged before the weekend.
        </UiMessage>

        <UiMessage
          author="Carol Davis"
          :avatar-src="imgLandscape"
          timestamp="Yesterday"
        >
          <template #actions>
            <UiButtonGroup size="sm">
              <UiButton variant="ghost" :icon-left="ThumbsUp" aria-label="Like" />
              <UiButton variant="ghost" :icon-left="Reply" aria-label="Reply" />
              <UiButton variant="ghost" :icon-left="Pencil" aria-label="Edit" />
            </UiButtonGroup>
          </template>
          I'll take a look at it this afternoon!
        </UiMessage>
      </div>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sent Messages with Actions</h2>
      <div class="message-container">
        <UiMessage
          variant="sent"
          author="You"
          timestamp="2:15 PM"
        >
          <template #actions>
            <UiButtonGroup size="sm">
              <UiButton variant="ghost" :icon-left="Pencil" aria-label="Edit" />
              <UiButton variant="ghost" :icon-left="Trash2" aria-label="Delete" />
            </UiButtonGroup>
          </template>
          Here's the updated design file. Let me know what you think!
        </UiMessage>
      </div>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Footer (Reactions, Read receipts)</h2>
      <div class="message-container">
        <UiMessage
          author="David Lee"
          :avatar-src="imgSquare"
          timestamp="3:00 PM"
        >
          The new feature looks amazing! Great work everyone.
          <template #footer>
            <UiButton variant="ghost" size="sm" :icon-left="ThumbsUp">3</UiButton>
            <UiButton variant="ghost" size="sm" :icon-left="Heart">2</UiButton>
          </template>
        </UiMessage>

        <UiMessage
          variant="sent"
          author="You"
          timestamp="3:02 PM"
        >
          Thanks! It was a team effort.
          <template #footer>
            <span>Seen by 4</span>
          </template>
        </UiMessage>
      </div>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Long Content</h2>
      <div class="message-container">
        <UiMessage
          author="Emma Wilson"
          :avatar-src="imgPortrait"
          timestamp="4:30 PM"
        >
          <p>Here's a summary of what we discussed in the meeting:</p>
          <p>1. We'll be launching the beta next week</p>
          <p>2. Marketing team needs the final assets by Friday</p>
          <p>3. QA found a few issues that need to be addressed</p>
          <p>Let me know if I missed anything!</p>
        </UiMessage>
      </div>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Without Avatar</h2>
      <div class="message-container">
        <UiMessage
          author="System"
          timestamp="5:00 PM"
          hide-avatar
        >
          Alice Johnson joined the conversation.
        </UiMessage>

        <UiMessage
          hide-avatar
          timestamp="5:01 PM"
        >
          Meeting scheduled for tomorrow at 2 PM.
        </UiMessage>
      </div>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Avatar Sizes</h2>
      <div class="message-container">
        <UiMessage
          author="Small Avatar"
          avatar-size="sm"
          timestamp="Now"
        >
          Using a small avatar (sm).
        </UiMessage>

        <UiMessage
          author="Large Avatar"
          avatar-size="lg"
          timestamp="Now"
        >
          Using a large avatar (lg).
        </UiMessage>

        <UiMessage
          author="Medium"
          avatar-size="md"
          timestamp="Now"
        >
          Using a medium avatar (md).
        </UiMessage>
      </div>
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
            <td><code>variant</code></td>
            <td><code>'received' | 'sent'</code></td>
            <td><code>'received'</code></td>
            <td>Message alignment and styling</td>
          </tr>
          <tr>
            <td><code>author</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Author name (also used for avatar initials)</td>
          </tr>
          <tr>
            <td><code>avatarSrc</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Avatar image URL</td>
          </tr>
          <tr>
            <td><code>avatarSize</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'sm'</code></td>
            <td>Size of the avatar</td>
          </tr>
          <tr>
            <td><code>timestamp</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Timestamp to display</td>
          </tr>
          <tr>
            <td><code>hideAvatar</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Hide the avatar</td>
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
            <td>Message content</td>
          </tr>
          <tr>
            <td><code>avatar</code></td>
            <td>Custom avatar content</td>
          </tr>
          <tr>
            <td><code>actions</code></td>
            <td>Action buttons/menu (shown on hover)</td>
          </tr>
          <tr>
            <td><code>footer</code></td>
            <td>Footer content (reactions, read receipts)</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.message-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}
</style>
