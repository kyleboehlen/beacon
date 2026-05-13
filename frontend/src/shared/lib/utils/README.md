# Registering Dynamic Tailwind Classes

Tailwind's build scanner only includes CSS for **complete class name strings** it finds in your source files. Class names assembled at runtime via string concatenation (e.g., `` `bg-${color}-500` ``) are never seen by the scanner and will be absent from the compiled bundle.

Two patterns solve this.

---

## 1. `tailwind.config.js` safelist

Add explicit class strings (or regex patterns) to the `safelist` array in `tailwind.config.js`. These are always included in the bundle regardless of whether they appear in source.

```js
// frontend/tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    'bg-red-500',
    'bg-green-500',
    // Pattern variant — includes every color at every shade for bg-*
    { pattern: /^bg-(red|green|blue)-(400|500|600)$/ },
  ],
}
```

**When to use:** For a small, known, stable set of runtime-determined classes — player colors, status codes, externally-provided theme values. Also the right choice when the classes come from outside `src/` (e.g., a CMS, API response, or generated config).

**Downside:** The safelist lives far from the component that uses the classes. It's easy to forget to remove entries when features change, causing bundle bloat.

---

## 2. `registerTailwindClasses()` helper

Write all complete class strings as **static values** in a `.ts` file under `src/`. Wrap the object with `registerTailwindClasses()` so the intent is explicit.

```ts
// frontend/src/shared/lib/utils/registerTailwindClasses.ts
export function registerTailwindClasses<T extends Record<string, string>>(classes: T): T {
  return classes  // identity — only exists so these strings are co-located and scannable
}
```

Usage in a palette or class map:

```ts
import { registerTailwindClasses } from '@/shared/lib/utils/registerTailwindClasses'

export const myPalette = registerTailwindClasses({
  primary:   'bg-cyan-500 border-cyan-500/80',
  secondary: 'bg-rose-500 border-rose-500/80',
})
```

At build time Tailwind scans the `.ts` file, finds the complete strings `bg-cyan-500`, `border-cyan-500/80`, etc., and includes them. At runtime the function returns the object unchanged.

**When to use:** For component-level palettes and class maps where the possible values are finite and known at write time. The classes stay co-located with the component that uses them, making unused entries easy to spot and delete.

**Constraint:** Every value must be a complete, static class string — no template literals, no concatenation. `'bg-cyan-500'` works; `` `bg-${color}-500` `` does not.

---

## Quick comparison

| | `safelist` | `registerTailwindClasses` |
|---|---|---|
| Location | `tailwind.config.js` | Co-located `.ts` file |
| Supports regex patterns | Yes | No — strings only |
| Works for external/generated values | Yes | No |
| Easy to prune when unused | No | Yes |
| Best for | Player colors, status badges, CMS themes | Component palettes, icon maps, color variants |