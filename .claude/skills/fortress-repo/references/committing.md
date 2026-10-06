# Committing and pushing

Your brief says whether you commit and push, and on which branch. If it says nothing, commit your own files as you go, on the branch that you work on, and push that branch (below).

## What to commit

- Commit the Fortress change, its tests, its report, a script that is reusable, and the lines for the ledger, FACTS and the plan if your brief lets you edit those files (`area-records.md`).
- Do not commit captured outputs, logs, raw run output, copies of tools, probe programs, lists or any other scratch. Keep scratch under your tree's `tmp/`, which is gitignored. Do not rename a file to get it past `.gitignore`. A private caches folder outside `tmp/` is not gitignored.
- Do not commit a copyrighted PDF or deck. `research/decks/` is gitignored. Cite such a source by its Wayback URL. `research/extracts/` holds our own summaries, with brief attributed quotations.
- Use the curator's email for attribution only.
- Claim no credit anywhere in a committed file. Put provenance and rationale in commit messages and reports, not in source comments.

## How to commit

- Commit only the paths that you wrote, as you go, in one command. Never commit a directory copy, and never use `git add -A`:

      git add -- <paths> && git commit -m "<message>" -- <paths>

- Other agents may have uncommitted edits in the same tree. The command above commits none of them. Leave them alone.
- Before you commit a staged change of more than a few hundred lines, read `git diff --cached --stat`.
- If the commit edits the original tree (anything outside `explorations/`, `research/`, `CLAUDE.md` and `.claude/`), say so in its message.
- End every commit message with this footer, exactly. It names no model, whatever footer the harness suggests. Its session line names the session that the work runs in. `explorations/protocol.md` gives that line, and changes it if the work moves to another session.

      Co-Authored-By: Claude <noreply@anthropic.com>
      Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB

## Pushing

Push after every commit, so that a lost container loses nothing.

- If you work on your own branch, push it: `git push -u origin <branch>` the first time, then `git push`.
- If you work on `main`, other agents commit to it too. Push only your own commits:
  1. Run `git log origin/main..main`. Your commits are those whose hashes your own `git commit` printed.
  2. If it lists another agent's commit, do not push. That agent pushes right after it commits, so look again shortly. If the commit stays, push nothing, and say so in your report.
  3. If it lists only your commits, push twice, in this order:

         git push origin main
         git push origin main:claude/worker-brief-fable-vnnuv8

     The second push keeps current the branch that the container is re-provisioned from (the `cloud-container` skill, a lost container).
- Push no other branch unless your brief names it. The transcript backup pushes its own orphan branches, `transcripts` and `transcripts-blinded` (the `cloud-container` skill). Do not push them yourself.
