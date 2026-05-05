# Entities

Each entity follows a three-layer pattern:

## `useEntityApi` — API layer
Raw API calls only. Returns the response payload or `false` on failure. No state, no side effects.

## `useEntityStore` — State layer
Pinia store (composition API). Owns state and actions that operate **only on that entity's own state**. Does not call other stores. See `_game/README.md` for the exception.

## `useEntity` — Consumer composable
The public interface for features and widgets. Orchestrates `useEntityApi` and `useEntityStore` together. This is what cross-entity consumers and UI components should call.

## File layout

```
entities/
  <entity>/
    api/
      use<Entity>Api.ts
    models/
      types.ts              ← re-exports from shared/models/generated/
      use<Entity>Store.ts
      use<Entity>.ts
    index.ts                ← barrel: exports types + use<Entity> only
```

## Barrel rule
`index.ts` exports types and `use<Entity>`. Stores and API composables are internal — consumers should not import them directly.