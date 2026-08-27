# Task Tracker

A tiny Express API used as a sandbox for practicing sprint-style git workflows:
release branches, task branches, merges, rollbacks, and hotfixes.

## Setup

```bash
npm install
npm test        # run the baseline test suite
npm start        # runs on http://localhost:3000
```

## Endpoints

| Method | Path                    | Description          |
|--------|-------------------------|-----------------------|
| GET    | /health                 | Health check          |
| GET    | /tasks                  | List all tasks        |
| POST   | /tasks                  | Create a task `{title}` |
| GET    | /tasks/:id              | Get one task           |
| PATCH  | /tasks/:id/complete     | Mark a task complete   |
| DELETE | /tasks/:id              | Delete a task          |

## Suggested sprint tasks to practice with

Each of these is small enough to be its own task branch:

1. Add a `dueDate` field to tasks
2. Add tags/labels to tasks (`POST /tasks` accepts `tags: []`)
3. Add `GET /tasks?completed=true` filtering
4. Add a `PATCH /tasks/:id` for editing a task's title
5. Add basic input validation middleware
6. Add a `GET /tasks/:id/history` (stub is fine — practice branching even for small stuff)

## Git workflow to practice

```
main                    — always production-ready
  └── release/1.1       — this sprint's integration branch
        ├── task/due-dates
        ├── task/tags
        └── task/filtering
```

1. Cut the release branch from main:
   `git checkout main && git checkout -b release/1.1`
2. Branch each task off the release branch:
   `git checkout release/1.1 && git checkout -b task/due-dates`
3. Merge each finished, tested task back into the release branch:
   `git checkout release/1.1 && git merge --no-ff task/due-dates`
4. Run `npm test` on the release branch — this is your "QA gate."
5. Merge the release branch into main and tag it:
   `git checkout main && git merge --no-ff release/1.1 && git tag -a v1.1.0 -m "Sprint 1.1"`
6. Practice a rollback:
   `git revert -m 1 <merge-commit-hash>` (safe, keeps history)
   or `git reset --hard v1.0.0` (rewrites history — only on branches nobody else has)
7. Practice a hotfix: branch `hotfix/x` off main, fix, merge to main, tag `v1.1.1`,
   then merge the hotfix into your next release branch too.

## Repo state

This repo already has:
- An initial commit on `main` with the working app
- A `v1.0.0` tag on that commit (your first rollback anchor)
- A `release/1.1` branch ready for you to start branching tasks from
