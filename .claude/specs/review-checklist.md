# Review & Testing Checklist

## 1. TypeGen (Docker)
- [ ] Run TypeGen from Docker to regenerate TS interfaces
- [ ] Verify `frontend/src/shared/models/generated/game.ts` has `rulesConfigId: string | null` (not `rules: RulesConfig | null`)
- [ ] Verify new generated files exist: `create-rules-config-response.ts`, `get-rules-config-response.ts`, `update-rules-config-response.ts`, `delete-rules-config-response.ts`, `save-rules-config-request.ts`

## 2. Backend Build & API
- [ ] `dotnet build` passes (already confirmed)
- [ ] Start backend, hit `GET /api/Rules/HydrateRulesConfig` -- existing endpoint still works
- [ ] Run the `rules.http` requests in order (Create -> Get -> Update -> Delete) and verify each passes
- [ ] Confirm Create returns a MongoDB ObjectId in `rulesConfig.id`
- [ ] Confirm Delete actually removes the document (Get after Delete should return `success: false`)

## 3. Frontend Build
- [ ] `npm run build` (or Docker equivalent) -- no TS errors

## 4. Frontend Unit Tests (Docker)
- [ ] `npm run test:unit` -- all tests pass
- [ ] If any fail, note which ones -- the FullDashboardWidget tests may need the fetch mock adjusted since `createRules()` now delegates through a different code path

## 5. Code Review -- Backend
- [ ] `backend/Features/Game/Models/Game.cs` -- `RulesConfigId` replaces `Rules`, `using Features.Rules.Models` removed
- [ ] `backend/Features/Rules/Services/RulesService.cs` -- CRUD methods follow GameService patterns
- [ ] `backend/Controllers/Rules/RulesController.cs` -- new endpoints have `// TODO: Add authentication and authorization guards`
- [ ] DTOs in `backend/Controllers/Rules/Requests/` and `Responses/` -- all have `[ExportTsInterface]`

## 6. Code Review -- Frontend Stores
- [ ] `frontend/src/shared/api/useBeaconApi.ts` -- method type includes `'PUT' | 'DELETE'`
- [ ] `frontend/src/entities/rules/api/useRulesApi.ts` -- all 5 API methods present
- [ ] `frontend/src/entities/rules/models/useRulesConfigStore.ts` -- state, getters, actions look correct
- [ ] `frontend/src/entities/_game/models/useGameStore.ts` -- delegates to `useRulesConfigStore`, has `linkRulesConfig`, `clearGame` clears rules store
- [ ] `frontend/src/entities/rules/index.ts` -- exports `useRulesConfigStore`
- [ ] `frontend/src/entities/_game/models/types.ts` -- no longer re-exports `RulesConfig`

## 7. Code Review -- UI Changes
- [ ] `RulesWizard.vue` -- uses `useRulesConfigStore`, loading state uses `SystemStatus`, no more `console.log`
- [ ] `GameSettingsPanel.vue` -- `handleWizardCompleted` saves config then links to game
- [ ] `SystemStatus.vue` -- dots cycle (`length >= 3 ? '' : dots + '.'`)
- [ ] `StepWizard.vue` -- completed step labels have `group-hover:underline`, non-completed steps have `cursor-default`
- [ ] `BooleanRule.vue` -- reference number uses `RuleReferenceLink`
- [ ] `SummaryStep.vue` -- both enabled and disabled reference numbers use `RuleReferenceLink`
- [ ] `SplashTitles.vue` -- info toggle, panel with description + PDF link + coming soon text, keypress blocked when info open

## 8. Manual Integration Testing
- [ ] Title page loads, "Press any key" prompt visible
- [ ] Info icon appears below prompt, clicking it opens the info panel
- [ ] Keypresses are blocked while info panel is open
- [ ] Escape closes the info panel
- [ ] "View the Master Rulebook" link opens the PDF in a new tab
- [ ] Click/keypress navigates to dashboard
- [ ] Start Scenario -> Settings panel opens
- [ ] Rules wizard shows SystemStatus loading animation (dots cycle: `.` `..` `...` then back to empty)
- [ ] Wizard steps render correctly with rule toggles
- [ ] Rule reference numbers are clickable links (cyan, monospace, underline) that open the PDF
- [ ] Toggle rules on/off, verify config updates
- [ ] Complete wizard -> network tab shows POST to `/api/Rules/CreateRulesConfig`
- [ ] Response contains a MongoDB ID
- [ ] Game store gets `rulesConfigId` linked
- [ ] All tabs enable after rules completion
- [ ] Click on completed step labels in the stepper -- navigates back
- [ ] Completed step labels show underline on hover
- [ ] Non-completed steps show default cursor and don't respond to clicks

## 9. Storybook
- [ ] `npm run storybook` -- all stories render
- [ ] `Shared/RuleReferenceLink` -- Default, WithLabel, WithLongNumber, MultipleInContext all render
- [ ] `Shared/SystemStatus` -- LongLoading story shows dots cycling (not growing forever)
- [ ] `Shared/StepWizard` -- advance through steps, click back on completed step labels

## 10. Accessibility Spot Check
- [ ] RuleReferenceLink: Tab to it, Enter/Space opens PDF, has aria-label
- [ ] SplashTitles info button: has `aria-expanded`, `aria-controls`, panel has `role="region"`
- [ ] StepWizard: completed steps have `tabindex="0"`, keyboard Enter/Space navigates

## 11. Outstanding: Icons for Wizard Steps (WS4G)
Pick Iconify icons for each wizard step. Browse at https://icon-sets.iconify.design/ (project uses the `mdi:` set).

Once chosen, they go in the step definitions in `frontend/src/features/rules-wizard/ui/RulesWizard.vue`:

```js
const steps = [
  { id: 'templates', label: 'Templates', icon: '???' },
  { id: 'factions', label: 'Factions', icon: '???' },
  { id: 'basic', label: 'Basic', icon: '???' },
  { id: 'optional', label: 'Optional', icon: '???' },
  { id: 'beacon', label: 'Beacon', icon: '???' },
  { id: 'summary', label: 'Summary', icon: '???' },
]
```

Then I'll add the `icon` property to the `Step` interface in `StepWizard.vue` and render them.