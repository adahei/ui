<script setup lang="ts">
import { UiUserCard, UiButton, UiButtonGroup, UiBadge, UiStack } from '@/components'

import imgSquare from '@/img/portrait_square.jpg'
import imgLandscape from '@/img/portrait_landscape.jpg'
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiUserCard</h1>
    <p class="page__description">
      A composite component for displaying user profiles with cover image, name, description, and actions.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <UiStack direction="row" wrap="wrap" gap="4" align="start">
        <UiUserCard
          name="Jane Doe"
          description="Product Designer"
          :src="imgLandscape"
          style="width: 280px;"
        />

        <UiUserCard
          name="John Smith"
          description="Software Engineer"
          style="width: 280px;"
        />
      </UiStack>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Aspect Ratios</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Control the cover image aspect ratio with <code>portrait</code>, <code>square</code>, or <code>landscape</code>.
      </p>
      <UiStack direction="row" wrap="wrap" gap="4" align="start">
        <UiUserCard
          name="Portrait"
          description="3:4 ratio"
          :src="imgLandscape"
          aspect-ratio="portrait"
          style="width: 200px;"
        />

        <UiUserCard
          name="Square"
          description="1:1 ratio"
          :src="imgSquare"
          aspect-ratio="square"
          style="width: 200px;"
        />

        <UiUserCard
          name="Landscape"
          description="16:9 ratio (default)"
          :src="imgLandscape"
          aspect-ratio="landscape"
          style="width: 200px;"
        />
      </UiStack>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Available in <code>sm</code>, <code>md</code>, and <code>lg</code> sizes.
      </p>
      <UiStack direction="row" wrap="wrap" gap="4" align="start">
        <UiUserCard
          name="Small Card"
          description="Compact size"
          :src="imgSquare"
          size="sm"
          style="width: 200px;"
        >
          <template #actions>
            <UiButton size="sm">Follow</UiButton>
          </template>
        </UiUserCard>

        <UiUserCard
          name="Medium Card"
          description="Default size"
          :src="imgSquare"
          size="md"
          style="width: 280px;"
        >
          <template #actions>
            <UiButton size="sm">Follow</UiButton>
          </template>
        </UiUserCard>

        <UiUserCard
          name="Large Card"
          description="Larger for prominent display"
          :src="imgSquare"
          size="lg"
          style="width: 360px;"
        >
          <template #actions>
            <UiButton>Follow</UiButton>
          </template>
        </UiUserCard>
      </UiStack>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Badges</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Pass an array of badges to display on the cover image.
      </p>
      <UiStack direction="row" wrap="wrap" gap="4" align="start">
        <UiUserCard
          name="Emma Wilson"
          description="Lead Developer"
          :src="imgLandscape"
          :badges="[{ label: 'Pro', variant: 'primary' }]"
          style="width: 280px;"
        >
          <template #actions>
            <UiButton size="sm">Connect</UiButton>
          </template>
        </UiUserCard>

        <UiUserCard
          name="David Chen"
          description="UI/UX Designer"
          :src="imgSquare"
          :badges="[
            { label: 'Verified', variant: 'success' },
            { label: 'Top Rated', variant: 'warning' }
          ]"
          style="width: 280px;"
        >
          <template #actions>
            <UiButton size="sm">Hire</UiButton>
          </template>
        </UiUserCard>

        <UiUserCard
          name="Sarah Miller"
          description="Project Manager"
          :src="imgLandscape"
          :badges="[
            { label: 'Admin', variant: 'error' },
            { label: 'Premium', variant: 'primary' },
            { label: 'Featured', variant: 'secondary' }
          ]"
          style="width: 280px;"
        >
          <template #actions>
            <UiButton size="sm">View Profile</UiButton>
          </template>
        </UiUserCard>
      </UiStack>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Full Width Actions</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Action buttons automatically expand to fill the available width.
      </p>
      <UiStack direction="row" wrap="wrap" gap="4" align="start">
        <UiUserCard
          name="Bob Williams"
          description="Marketing Manager"
          :src="imgLandscape"
          style="width: 280px;"
        >
          <template #actions>
            <UiButton size="sm">Follow</UiButton>
          </template>
        </UiUserCard>

        <UiUserCard
          name="Carol Davis"
          description="UX Researcher"
          :src="imgSquare"
          style="width: 280px;"
        >
          <template #actions>
            <UiButtonGroup size="sm">
              <UiButton variant="outline">Message</UiButton>
              <UiButton>Connect</UiButton>
            </UiButtonGroup>
          </template>
        </UiUserCard>

        <UiUserCard
          name="Frank Lee"
          description="Software Architect"
          :src="imgLandscape"
          :badges="[{ label: 'Available', variant: 'success' }]"
          style="width: 280px;"
        >
          <template #actions>
            <UiButtonGroup size="sm">
              <UiButton variant="outline">Message</UiButton>
              <UiButton variant="outline">Save</UiButton>
              <UiButton>Hire</UiButton>
            </UiButtonGroup>
          </template>
        </UiUserCard>
      </UiStack>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Meta Info</h2>
      <UiStack direction="row" wrap="wrap" gap="4" align="start">
        <UiUserCard
          name="David Lee"
          description="Full Stack Developer"
          :src="imgLandscape"
          :badges="[{ label: 'Online', variant: 'success' }]"
          style="width: 280px;"
        >
          <template #meta>
            <UiBadge variant="success">Available for work</UiBadge>
          </template>
          <template #actions>
            <UiButton size="sm">Hire</UiButton>
          </template>
        </UiUserCard>

        <UiUserCard
          name="Emma Wilson"
          description="Data Scientist"
          :src="imgSquare"
          style="width: 280px;"
        >
          <template #meta>
            San Francisco, CA
          </template>
        </UiUserCard>
      </UiStack>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Footer</h2>
      <UiStack direction="row" wrap="wrap" gap="4" align="start">
        <UiUserCard
          name="Frank Miller"
          description="Product Manager"
          :src="imgLandscape"
          :badges="[{ label: 'Featured', variant: 'primary' }]"
          style="width: 280px;"
        >
          <template #actions>
            <UiButton size="sm">Follow</UiButton>
          </template>
          <template #footer>
            <div class="stats">
              <div class="stat">
                <span class="stat__value">128</span>
                <span class="stat__label">Posts</span>
              </div>
              <div class="stat">
                <span class="stat__value">2.4k</span>
                <span class="stat__label">Followers</span>
              </div>
              <div class="stat">
                <span class="stat__value">847</span>
                <span class="stat__label">Following</span>
              </div>
            </div>
          </template>
        </UiUserCard>
      </UiStack>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Horizontal Layout</h2>
      <UiStack direction="column" gap="4">
        <UiUserCard
          name="Grace Chen"
          description="Senior Software Engineer at TechCorp"
          :src="imgSquare"
          :badges="[{ label: 'Hiring', variant: 'success' }]"
          layout="horizontal"
          size="sm"
          style="max-width: 400px;"
        >
          <template #actions>
            <UiButton size="sm">View Profile</UiButton>
          </template>
        </UiUserCard>

        <UiUserCard
          name="Henry Brown"
          description="VP of Engineering"
          :src="imgLandscape"
          :badges="[{ label: 'Admin', variant: 'primary' }]"
          layout="horizontal"
          style="max-width: 500px;"
        >
          <template #actions>
            <UiButtonGroup size="sm">
              <UiButton variant="outline">Message</UiButton>
              <UiButton>Follow</UiButton>
            </UiButtonGroup>
          </template>
        </UiUserCard>

        <UiUserCard
          name="Ivy Martinez"
          description="Lead Designer with 10+ years experience in product design"
          :src="imgSquare"
          :badges="[
            { label: 'Pro', variant: 'primary' },
            { label: 'Verified', variant: 'success' }
          ]"
          layout="horizontal"
          size="lg"
          style="max-width: 600px;"
        >
          <template #actions>
            <UiButtonGroup>
              <UiButton variant="outline">Message</UiButton>
              <UiButton>Connect</UiButton>
            </UiButtonGroup>
          </template>
          <template #footer>
            <span>128 Posts</span>
            <span>2.4k Followers</span>
          </template>
        </UiUserCard>
      </UiStack>
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
            <td><code>name</code></td>
            <td><code>string</code></td>
            <td><em>required</em></td>
            <td>User's name</td>
          </tr>
          <tr>
            <td><code>description</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>User's description/title/role</td>
          </tr>
          <tr>
            <td><code>src</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Cover image URL</td>
          </tr>
          <tr>
            <td><code>layout</code></td>
            <td><code>'vertical' | 'horizontal'</code></td>
            <td><code>'vertical'</code></td>
            <td>Card layout</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Card size</td>
          </tr>
          <tr>
            <td><code>aspectRatio</code></td>
            <td><code>'portrait' | 'square' | 'landscape'</code></td>
            <td><code>'landscape'</code></td>
            <td>Cover image aspect ratio</td>
          </tr>
          <tr>
            <td><code>badges</code></td>
            <td><code>UserCardBadge[]</code></td>
            <td><code>-</code></td>
            <td>Badges to display on cover image</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Badge Type</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>label</code></td>
            <td><code>string</code></td>
            <td><em>required</em></td>
            <td>Badge text content</td>
          </tr>
          <tr>
            <td><code>variant</code></td>
            <td><code>'primary' | 'secondary' | 'success' | 'warning' | 'error'</code></td>
            <td><code>'primary'</code></td>
            <td>Badge variant</td>
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
            <td><code>meta</code></td>
            <td>Additional info below description (badges, location)</td>
          </tr>
          <tr>
            <td><code>actions</code></td>
            <td>Action buttons (expand to full width)</td>
          </tr>
          <tr>
            <td><code>footer</code></td>
            <td>Footer content (stats, links)</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-6);
  width: 100%;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-1);
}

.stat__value {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.stat__label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}
</style>
