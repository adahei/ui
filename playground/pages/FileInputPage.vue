<script setup lang="ts">
import { ref } from 'vue'
import {
  UiFileInput,
  UiCard,
  UiStack,
  UiFormField,
  UiInputGroup,
  UiInputGroupText,
} from '@/components'
import { Upload, Image } from 'lucide-vue-next'

const basicFiles = ref<File[]>([])
const imageFiles = ref<File[]>([])
const multipleFiles = ref<File[]>([])
const limitedFiles = ref<File[]>([])
const formFieldFiles = ref<File[]>([])
const inputGroupFiles = ref<File[]>([])
const disabledFiles = ref<File[]>([])
const errorFiles = ref<File[]>([])

function handleError(message: string) {
  alert(message)
}
</script>

<template>
  <div class="page">
    <h1 class="page__title">UiFileInput</h1>
    <p class="page__description">
      A file upload component with drag-and-drop support, file previews, and validation.
    </p>

    <section class="page__section">
      <h2 class="page__section-title">Basic Usage</h2>
      <UiCard variant="filled" padding="lg" style="max-width: 500px;">
        <UiStack gap="3">
          <UiFileInput v-model="basicFiles" @error="handleError" />
          <p v-if="basicFiles.length" style="font-size: var(--text-sm); color: var(--text-secondary);">
            Selected: {{ basicFiles.map(f => f.name).join(', ') }}
          </p>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Image Only</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Use <code>accept</code> to filter file types. Image files show a preview.
      </p>
      <UiCard variant="filled" padding="lg" style="max-width: 500px;">
        <UiFileInput
          v-model="imageFiles"
          accept="image/*"
          placeholder="Drop an image here or click to browse"
          @error="handleError"
        />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Multiple Files</h2>
      <UiCard variant="filled" padding="lg" style="max-width: 500px;">
        <UiFileInput
          v-model="multipleFiles"
          multiple
          placeholder="Drop files here or click to browse (multiple allowed)"
          @error="handleError"
        />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With Limits</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Use <code>max-size</code> and <code>max-files</code> to set limits.
      </p>
      <UiCard variant="filled" padding="lg" style="max-width: 500px;">
        <UiFileInput
          v-model="limitedFiles"
          multiple
          :max-size="1024 * 1024"
          :max-files="3"
          placeholder="Max 3 files, 1MB each"
          @error="handleError"
        />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Sizes</h2>
      <UiCard variant="filled" padding="lg" style="max-width: 500px;">
        <UiStack gap="4">
          <UiFileInput size="sm" placeholder="Small" />
          <UiFileInput size="md" placeholder="Medium (default)" />
          <UiFileInput size="lg" placeholder="Large" />
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With FormField</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Integrates with <code>UiFormField</code> for labels, hints, and error messages.
      </p>
      <UiCard variant="filled" padding="lg" style="max-width: 500px;">
        <UiFormField label="Profile Picture" hint="Upload a photo (JPG, PNG, max 5MB)">
          <UiFileInput
            v-model="formFieldFiles"
            accept="image/jpeg,image/png"
            :max-size="5 * 1024 * 1024"
            @error="handleError"
          />
        </UiFormField>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">With InputGroup</h2>
      <p class="page__description" style="margin-bottom: var(--spacing-3);">
        Works inside <code>UiInputGroup</code> and inherits size.
      </p>
      <UiCard variant="filled" padding="lg" style="max-width: 500px;">
        <UiStack gap="4">
          <UiInputGroup size="sm">
            <UiInputGroupText><Image :size="14" /></UiInputGroupText>
            <UiFileInput
              v-model="inputGroupFiles"
              accept="image/*"
              placeholder="Small via InputGroup"
            />
          </UiInputGroup>

          <UiInputGroup size="lg">
            <UiInputGroupText><Upload :size="20" /></UiInputGroupText>
            <UiFileInput placeholder="Large via InputGroup" />
          </UiInputGroup>
        </UiStack>
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Disabled</h2>
      <UiCard variant="filled" padding="lg" style="max-width: 500px;">
        <UiFileInput
          v-model="disabledFiles"
          disabled
          placeholder="File upload is disabled"
        />
      </UiCard>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Error State</h2>
      <UiCard variant="filled" padding="lg" style="max-width: 500px;">
        <UiStack gap="4">
          <UiFileInput
            v-model="errorFiles"
            error
            placeholder="With error state"
          />
          <UiFileInput
            error="Please upload a valid document"
            placeholder="With error message"
          />
        </UiStack>
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
            <td><code>modelValue</code></td>
            <td><code>File[]</code></td>
            <td><code>[]</code></td>
            <td>Selected files (v-model)</td>
          </tr>
          <tr>
            <td><code>accept</code></td>
            <td><code>string</code></td>
            <td><code>-</code></td>
            <td>Accepted file types (e.g., "image/*", ".pdf")</td>
          </tr>
          <tr>
            <td><code>multiple</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Allow multiple file selection</td>
          </tr>
          <tr>
            <td><code>maxSize</code></td>
            <td><code>number</code></td>
            <td><code>-</code></td>
            <td>Maximum file size in bytes</td>
          </tr>
          <tr>
            <td><code>maxFiles</code></td>
            <td><code>number</code></td>
            <td><code>-</code></td>
            <td>Maximum number of files (when multiple)</td>
          </tr>
          <tr>
            <td><code>placeholder</code></td>
            <td><code>string</code></td>
            <td><code>'Drop files here...'</code></td>
            <td>Placeholder text</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'sm' | 'md' | 'lg'</code></td>
            <td><code>'md'</code></td>
            <td>Component size</td>
          </tr>
          <tr>
            <td><code>showPreview</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Show image previews</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Disable the input</td>
          </tr>
          <tr>
            <td><code>error</code></td>
            <td><code>boolean | string</code></td>
            <td><code>false</code></td>
            <td>Error state or message</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="page__section">
      <h2 class="page__section-title">Events</h2>
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
            <td><code>update:modelValue</code></td>
            <td><code>File[]</code></td>
            <td>Emitted when files change</td>
          </tr>
          <tr>
            <td><code>error</code></td>
            <td><code>string</code></td>
            <td>Emitted when validation fails (size, count)</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
