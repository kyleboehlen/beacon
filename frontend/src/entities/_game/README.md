# Game Entity - Orchestrator Store

## Overview

The `_game` entity is the **orchestrator** for the entire game. The `_` prefix indicates its special role and keeps it at the top of the entities folder.

## Rules

### ✅ `_game` Store CAN:
- Use multiple other stores.
- Coordinate actions across multiple domains
- Call actions on other entity stores

### ❌ Other Stores CANNOT:
- Use multiple stores
- Coordinate between different stores
- Call actions on other entity stores

### Key Rule:
**If an action affects multiple stores, it MUST go through the game store.**

---

**Bottom line:** `_game` is the only store allowed to orchestrate multiple domains. All other stores focus on their own domain only.