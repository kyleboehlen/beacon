// Identity function whose only job is to be the home for dynamic Tailwind class strings.
// Because this file lives under src/ and is scanned at build time, any complete class
// string written as a value here will be included in the compiled CSS bundle.
// Usage: wrap your palette / class map with this call so the intent is explicit.
export function registerTailwindClasses<T extends Record<string, string>>(classes: T): T {
  return classes
}