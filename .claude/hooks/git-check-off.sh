#!/bin/bash
# Turns off the platform's git-check Stop hook, at the curator's word of 2026-10-19.
#
# The platform's launcher writes ~/.claude/stop-hook-git-check.sh again at every
# start of the session's process, and the script then asks for a commit and a
# push at the end of every turn. This gives it the empty body that
# cloud-container's references/hooks.md gives by hand (it reads its input and
# exits 0), and keeps the launcher's script beside it as
# stop-hook-git-check.sh.orig. .claude/settings.json runs it at every
# SessionStart and at every Stop, so it holds after each restart; a Stop run
# beside the git check itself can miss that one turn. FORTRESS_GITCHECK names
# another file, for tests.

cat >/dev/null
f=${FORTRESS_GITCHECK:-$HOME/.claude/stop-hook-git-check.sh}
empty=$'#!/bin/bash\ncat >/dev/null\nexit 0'
if [[ -f $f && $(<"$f") != "$empty" ]]; then
  cp -- "$f" "$f.orig" && printf '%s\n' "$empty" > "$f"
fi
exit 0
