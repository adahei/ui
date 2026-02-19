# @adahei/ui

Vue 3 component library with TypeScript, designed for WCAG compliance with dark/light mode support.

## Installation

```bash
npm install @adahei/ui
```

## Usage

```vue
<script setup>
import { UiButton, UiCard, UiInput } from '@adahei/ui'
</script>

<template>
  <UiCard>
    <UiInput placeholder="Enter your name" />
    <UiButton variant="primary">Submit</UiButton>
  </UiCard>
</template>
```

## Components

### General

| Component | Description |
|-----------|-------------|
| `UiAvatar` | Circular or rounded avatar with image, initials, or icon fallback. Supports various sizes (xs, sm, md, lg, xl) and shapes (circle, rounded, square). |
| `UiBadge` | Small status indicator or label. Variants: primary, secondary, success, warning, error. Can be used standalone or as notification dots. |
| `UiButton` | Interactive button with multiple variants (primary, secondary, outline, ghost), sizes (sm, md, lg), loading state, and icon support (iconLeft, iconRight). |
| `UiButtonGroup` | Groups multiple buttons together with shared styling. Supports horizontal and vertical orientation. |
| `UiImage` | Enhanced image component with lazy loading, fallback support, and configurable fit (cover, contain, fill) and border radius. |

### Layout

| Component | Description |
|-----------|-------------|
| `UiCard` | Flexible container with header, body, and footer sections. Variants: default, elevated, outline, filled, ghost. Configurable padding, radius, and shadow. |
| `UiStack` | Flexbox layout component for rows and columns. Props: direction, gap, align, justify, wrap. Polymorphic (renders as any HTML element via `as` prop). |

### Navigation

| Component | Description |
|-----------|-------------|
| `UiAccordion` | Expandable/collapsible content sections. Supports single or multiple open items. Use with `UiAccordionItem` children. |
| `UiNav` | Vertical or horizontal navigation menu. Use with `UiNavGroup` and `UiNavItem` for structured navigation. |
| `UiTabs` | Tab-based content organization. Compound component: `UiTabs`, `UiTabList`, `UiTabTrigger`, `UiTabPanel`. |

### Overlays

| Component | Description |
|-----------|-------------|
| `UiDropdown` | Dropdown menu with customizable placement. Compound component: `UiDropdown`, `UiDropdownTrigger`, `UiDropdownMenu`, `UiDropdownItem`, `UiDropdownSeparator`. |
| `UiLightbox` | Fullscreen media viewer for images and videos. Supports galleries with thumbnail navigation, keyboard controls, and swipe gestures. |
| `UiModal` | Dialog overlay with backdrop, close button, and keyboard support (Escape to close). Uses native `<dialog>` element. Sizes: sm, md, lg. |

### Data Display

| Component | Description |
|-----------|-------------|
| `UiAlert` | Contextual feedback messages. Variants: info, success, warning, error, neutral. Optional dismissible close button and icon. |
| `UiChatContainer` | Scrollable container for chat messages with auto-scroll to bottom on new messages. Supports streaming content with `followOutput` prop. Includes optional action bar slot. |
| `UiChatArea` | Chat input component with textarea, send button, and action button slots. Integrates with `UiChatContainer` for complete chat interfaces. |
| `UiMessage` | Chat message bubble with avatar, author, timestamp, and action slots. Variants: sent (right-aligned) and received (left-aligned). |
| `UiUserCard` | User profile card with cover image, name, description, and badges. Layouts: vertical and horizontal. |

### Form

| Component | Description |
|-----------|-------------|
| `UiCheckbox` | Checkbox input with label support. Can be used standalone or in groups. |
| `UiFieldset` | Groups related form controls with a legend. Variants: default, bordered. |
| `UiFileInput` | File upload input with drag-and-drop support, file type filtering, and preview. Single or multiple file selection. |
| `UiFormField` | Wrapper for form inputs that provides label, error message, and hint text. Handles accessibility attributes automatically. |
| `UiInput` | Text input field with variants, sizes, and icon support. Integrates with `UiFormField` and `UiInputGroup`. |
| `UiInputGroup` | Combines input with addons (text, buttons, dropdowns) on left/right sides. Use with `UiInputGroupText` for static text. |
| `UiLabel` | Accessible form label with required indicator support. |
| `UiRadio` | Radio button input for single selection from multiple options. |
| `UiSelect` | Dropdown select input with option groups, placeholder, and disabled state support. |
| `UiSlider` | Range slider input with customizable min, max, step, and visual markers. |
| `UiTextarea` | Multi-line text input with configurable rows and resize behavior. |

## Shared Types

```typescript
type Size = 'sm' | 'md' | 'lg'
type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Status = 'info' | 'success' | 'warning' | 'error'
```

## Theming

Set `data-theme="dark"` on the root element for dark mode, or rely on `prefers-color-scheme` media query.

```html
<html data-theme="dark">
```

## Development

```bash
npm install          # Install dependencies
npm run dev          # Run playground dev server
npm run build:lib    # Build library for npm publishing
npm run type-check   # Run TypeScript type checking
```

## License

MIT
