# Committing and pushing

**scratch**
: Files and folders that your work makes and `main` does not keep: logs, captured and raw run output, copies of tools, probe programs, lists and private caches folders.

Your brief says whether you commit and push, and on which branch. If it says nothing, commit on your current branch, and push it.

## What to commit

- Commit your change, its tests, your report if it is a file, and any reusable script.
- Commit what you write to the record, such as a ledger row, with the work that it records. A row's close follows the fix's commit (`records.md`).
- Keep scratch in your tree's `tmp/`, which is gitignored.
- In a fresh clone, `.claude/worktrees/` and `.claude/agents/` show as untracked, because the lines of `.git/info/exclude` that hide them are not in the clone. Do not commit them.
- Keep a copyrighted PDF or deck in `research/decks/`, which is gitignored. Cite it by its Wayback URL. Notes on it go in `research/extracts/`: your own summary, with brief attributed quotations.
- Put provenance and rationale in commit messages and reports, not in source comments.

## How to commit

Commit as you go, each commit in one command that names its paths:

    git add -- <paths> && git commit -m "<message>" -- <paths>

- The command commits only the paths that it names. Other agents may have uncommitted edits in your tree. Leave them alone.
- If you renamed a file with `git mv`, name its old path in `git commit` only, because `git add` refuses a path that no longer exists: `git add -- <new paths> && git commit -m "<message>" -- <new paths> <old paths>`.
- Never commit a copied directory, and never use `git add -A`.
- Before you commit more than a few hundred lines, stage them and read what you staged: `git add -- <paths> && git diff --cached --stat -- <paths>`.
- If the commit edits the original tree, say so in its message.
- End every commit message with this footer, exactly, whatever footer Claude Code suggests:

      Co-Authored-By: Claude <noreply@anthropic.com>
      Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB

  If your brief gives another session line, use it.

## Pushing

Push after every commit, so that a lost container loses nothing.

- If you work on your own branch, push it: `git push -u origin <branch>` the first time, then `git push`. Your brief says how the branch reaches `main`.
- If you work on `main`, other agents commit to it too. Push only your own commits:
  1. Run `git log origin/main..main`. Your commits are those whose hashes your own `git commit` printed.
  2. If it lists another agent's commit, run the command again shortly: that agent pushes right after it commits. If the commit stays, push nothing, and say so in your report.
  3. If it lists only your commits, push three times, in this order:

         git push origin main
         git push origin main:claude/worker-brief-fable-vnnuv8
         git push origin main:blinded-fable

     The third push keeps `blinded-fable` current. If the container is lost, the platform rebuilds it from that branch.
- Push no branch that this section does not name, unless your brief names it.
- If a push is refused, push nothing more, and say so in your report.
