# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vue 3 component library (`@adahei/ui`) with TypeScript, Vite, and SCSS. Designed for WCAG compliance with dark/light mode support.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Run playground dev server
npm run build:lib    # Build library for npm publishing
npm run type-check   # Run TypeScript type checking
```

## Architecture

### Directory Structure
- `src/components/` - Exportable components (UiButton, UiInput, etc.)
- `src/styles/` - CSS variable system (_root.scss, _typography.scss)
- `src/types/` - Shared TypeScript interfaces (Size, Variant, Status)
- `src/icons/` - Re-exported Lucide icons
- `playground/` - Development showcase app (excluded from npm package)

### CSS Variable System

Three-layer architecture:
1. **Foundation variables** (`_root.scss`) - Raw design tokens (colors, spacing, radius). Never change for dark mode.
2. **Semantic variables** (`_root.scss`) - Map foundation → meaning (--bg-primary, --text-primary). Override in dark mode.
3. **Component tokens** - Per-component variables using semantic vars.

Dark mode: Set `data-theme="dark"` on `:root` or rely on `prefers-color-scheme`.

### Component Conventions
- Prefix: All components use `Ui` prefix (UiButton, UiCard)
- Props: Use `Size` ('sm' | 'md' | 'lg'), `Variant` ('primary' | 'secondary' | 'outline' | 'ghost')
- Slots: Prefer slots over text props for content
- Icons: Pass Lucide component via `iconLeft`/`iconRight` props
- Accessibility: WCAG 4.5:1 contrast, visible focus rings, proper aria attributes

### Adding New Components

1. Create folder: `src/components/UiComponentName/`
2. Add `UiComponentName.vue` with `<script setup lang="ts">`, scoped SCSS
3. Add `index.ts` barrel export
4. Export from `src/components/index.ts` and `src/index.ts`
5. Add playground page in `playground/pages/`

### Build Output

Library build (`npm run build:lib`) outputs:
- `dist/ui.js` - ES module
- `dist/ui.umd.cjs` - UMD bundle
- `dist/ui.css` - Compiled styles
- `dist/index.d.ts` - TypeScript declarations
