# Committing and pushing

Your brief says whether you commit and push, and on which branch. If it says nothing, commit your own files as you go, on the branch that you work on, and push that branch (below).

Scratch includes logs, captured and raw run output, copies of tools, probe programs and lists. Your tree's `tmp/` is gitignored. A private caches folder outside `tmp/` is not.

## What to commit

- Commit the Fortress change and its tests, your report if it is a file, and a reusable script.
- Commit your lines for the ledger, FACTS or the plan with your work (`records.md`, "Writing to the record").
- Keep scratch in your tree's `tmp/`.
- Do not commit a copyrighted PDF or deck. `research/decks/` is gitignored. Cite such a source by its Wayback URL. `research/extracts/` holds our own summaries, with brief attributed quotations.
- Put provenance and rationale in commit messages and reports, not in source comments.

## How to commit

- Commit as you go, each commit in one command. Never commit a directory copy, and never use `git add -A`:

      git add -- <paths> && git commit -m "<message>" -- <paths>

- Other agents may have uncommitted edits in the same tree. The command above commits none of them. Leave them alone.
- Before you commit a staged change of more than a few hundred lines, read `git diff --cached --stat`.
- If the commit edits the original tree, say so in its message.
- End every commit message with this footer, exactly, whatever footer the harness suggests. If the work moves to another session, `explorations/protocol.md` gives the new session line.

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
- Push no other branch unless your brief names it.
