---
apply: always
---

# Testing Conventions

## Shared Component Requirements

Shared UI components (`frontend/src/shared/ui/`) are reusable building blocks used across features. Every shared component **must** have both:

1. **A vitest file** (`ComponentName.spec.ts`) — co-located, testing behavior, events, accessibility
2. **A story file** (`ComponentName.stories.ts`) — co-located, with variants exercising props and slots

This is enforced by the `vitest` and `storybook` commands, which both check for coverage on shared components and offer to write missing files.

Feature-level components (`features/`, `widgets/`) do **not** require stories or vitests unless they contain significant reusable logic or behavior worth testing in isolation.

---

## Frontend -- Vitest + Vue Test Utils

### File Naming
- Co-located with component: `ComponentName.spec.ts`
- Co-located with utility: `utilityName.spec.ts`
- Config: `vitest.config.ts` with jsdom environment, setup in `vitest.setup.ts`

### Test Structure
```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Component from './Component.vue'

describe('Component', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(Component, {
      props: { /* ... */ },
      slots: { /* ... */ },
    })
  })

  describe('Category', () => {
    it('does behavior X', () => {
      // Arrange, Act, Assert
    })
  })
})
```

### What to Test
- **DO test:** Behavior, events, computed state changes, user interactions, accessibility attributes
- **DO NOT test:** Static text content, heading text, declarative markup structure
- **DO NOT test:** Feature-level components that are primarily declarative (wizard steps like BasicStep, BeaconStep)

### Patterns
- Mount with `mount(Component, { props, slots })`
- Test emissions: `wrapper.emitted('eventName')`
- Test DOM: `wrapper.find('[data-testid="..."]')`, `wrapper.attributes()`, `wrapper.classes()`
- Find components: `wrapper.findAllComponents({ name: 'ComponentName' })`
- Async: `await wrapper.trigger('click')`, `await nextTick()`

### Pinia Store Testing
- Use `createPinia()` and `setActivePinia()` in `beforeEach`
- Test actions, getters, state changes
- Mock API calls with `vi.mock()`

---

## Frontend -- Storybook

### File Naming
- Co-located: `ComponentName.stories.ts`

### Story Structure
```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Component from './Component.vue'

const meta: Meta<typeof Component> = {
  title: 'Category/Component',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => ({
    components: { Component },
    setup() { /* ... */ },
    template: `<!-- template -->`,
  }),
}
```

### Categories
- Shared components: `title: 'Shared/ComponentName'`
- Feature components: `title: 'Features/ComponentName'`

---

## Backend -- xUnit

### File Location
- `backend.Tests/` project
- `backend.Tests.csproj` references xUnit

### Pattern
```csharp
public class FeatureTests
{
    [Fact]
    public void TestName()
    {
        // Arrange, Act, Assert
        Assert.Equal(expected, actual);
    }
}
```

### HTTP Integration Tests
- `backend/Http/*.http` files with JetBrains HTTP Client format
- Test assertions use `client.test()` and `client.assert()`
- Environment variables via `http-client.env.json`
