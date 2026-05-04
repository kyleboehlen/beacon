---
name: TypeGen - run from Rider, not Claude
description: How TypeGen is run in this project
type: feedback
---

Do not run the typegen Docker container via Bash. The user runs it themselves from a Rider run configuration.

**Why:** The user has a Rider run config set up for `docker-compose -f beacon-infra/docker-compose-develop.yml run --rm typegen` and prefers to trigger it manually.

**How to apply:** When TypeGen needs to be run (after backend model changes), tell the user to run the typegen config in Rider rather than running it yourself.