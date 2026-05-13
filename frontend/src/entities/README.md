# Entities

Each entity follows a two-layer pattern:

## `useEntityApi` — API layer
Raw API calls only. Returns the response payload or `false` on failure. No state, no side effects.

## `useEntityStore` — State layer
Pinia store (composition API). Owns state and actions that operate **only on that entity's own state**. Does not call other stores. See `_game/README.md` for the exception.

Entity stores should prefer transaction-driven updates and derived state:
- write domain events/transactions via actions
- derive computed state from those transactions
- avoid mutating redundant state snapshots when a computed derivation is possible

Stores are the public entity interface for features, widgets, pages, and other consumers. Do not add a separate
`useEntity` wrapper unless it adds real behavior beyond forwarding store/API calls.

## File layout

```
entities/
  <entity>/
    api/
      use<Entity>Api.ts
    models/
      types.ts              ← re-exports from shared/models/generated/
      use<Entity>Store.ts
    index.ts                ← barrel: exports types + use<Entity>Store
```

## Barrel rule
`index.ts` exports types and `use<Entity>Store`. Consumers outside the entity must import generated types and stores
from the entity barrel, not from internal entity paths or `shared/models/generated/`.

Entity-internal files may import their own API composables and generated DTOs directly when that keeps the API layer
clear. Generated domain types that consumers need must still be re-exported from `models/types.ts`.
