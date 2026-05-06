# Backend Project Structure

```
Project/
├── Controllers/
│   └── {feature}/
│       ├── Requests/
│       └── Responses/
├── Features/
│   └── {feature}/
│       ├── Models/
│       ├── Services/
│       ├── Events/
│       └── Repositories/
├── Logging/
│   │── LoggingCodes.cs
│   │── LoggingCodes.md
│   └── LoggingService.cs
├── Email/
│   │── EmailService.cs
│   └── Templates
├── SignalR/
│   ├── Hubs/
│   ├── Clients/
│   └── Groups/
└── Reporting/
    ├── Models/
    ├── Services/
    └── Generators/
```

## Game as Orchestrator

`Features/Game/` is the central domain aggregate — the backend equivalent of the `_game` orchestrator store in the frontend. `Features/Game/Models/Game.cs` is permitted to import and embed models from other features (e.g., `RulesConfig` from `Features.Rules.Models`). This is an intentional exception to the cross-feature model dependency rule: Game owns a snapshot of its rules configuration at session start, which is the correct domain model for a board game where rules are fixed once play begins.

Other features must not import from each other directly.
