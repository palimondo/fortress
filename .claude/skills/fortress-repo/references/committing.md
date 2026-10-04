# Committing and pushing

The curator decides what is committed. Commit only when your task says to.

## What may be committed

- Committed: the Fortress change, its tests, its report, the lines for the ledger, FACTS and the plan, and a script that is reusable.
- Never: captured outputs, logs, raw run output, copies of tools, probe programs, lists, or any other scratch. Scratch lives under your tree's `tmp/`, which is gitignored; a private cache directory outside `tmp/` is not.
- Never: a model identifier (a model is named by its tier: Fable, Opus, Sonnet); a copyrighted PDF or deck (`research/decks/` is gitignored; cite such a source by its Wayback URL; `research/extracts/` holds our own summaries with brief attributed quotations); `HANDOVER.md` or ZIP contents without the curator's go. The curator's email is for attribution only.
- No self-credit anywhere committed. Provenance and rationale go in commit messages and reports, not in source comments.

## How

- Commit only the paths you wrote, as you go, in one command, never a directory copy and never `git add -A`:

      git add -- <paths> && git commit -m "<message>" -- <paths>

- Read a staged change of more than a few hundred lines with `git diff --cached --stat` before committing it.
- An edit under the original tree (anything outside `explorations/`, `research/`, `CLAUDE.md` and `.claude/`): the test comes before the fix (`tests-writing.md`), and the commit message flags the edit as one of the original tree.
- The footer, exactly as the protocol gives it. It names no model, whatever another footer the harness suggests:

      Co-Authored-By: Claude <noreply@anthropic.com>
      Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB

## Pushing

- A worker on its own branch pushes that branch as it works (`git push -u origin <branch>` the first time), so that a lost container loses nothing. It never touches the main tree, `/home/user/fortress`.
- To `main`: only after `git log origin/main..main` shows nothing but your own commits, and then both, in this order:

      git push origin main
      git push origin main:claude/worker-brief-fable-vnnuv8

  The second keeps current the branch the container is re-provisioned from (the `remote-container` skill, a lost container). No other branch is pushed without permission (the transcript branches excepted).
