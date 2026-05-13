# Game Entity - Orchestrator Store

## Overview

The `_game` entity is the **orchestrator** for the entire game. The `_` prefix indicates its special role and keeps it at the top of the entities folder.

## Rules

### ✅ `_game` Store CAN:
- Use multiple other stores.
- Coordinate actions across multiple domains
- Call actions on other entity stores
- Expose orchestration facades (for example `gameStore.econ.*`) so UI calls route through `_game`

### ❌ Other Stores CANNOT:
- Use multiple stores
- Coordinate between different stores
- Call actions on other entity stores

### Key Rule:
**If an action affects multiple stores, it MUST go through the game store.**

### Transactions and Derivation
- UI should write transactions through orchestrator actions (round commits, staged upgrades, rule locking).
- Derived state should be computed from transaction history and staged transactions, not manually mutated snapshots.
- `_game` coordinates transaction flows, while domain-specific derived state (for example econ tech state) stays in the owning entity store.

---

**Bottom line:** `_game` is the only store allowed to orchestrate multiple domains. All other stores focus on their own domain only.
