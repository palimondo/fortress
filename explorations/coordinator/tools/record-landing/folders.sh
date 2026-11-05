#!/usr/bin/env bash
# folders.sh N [--dry-run]: the record-landing workflow's last commit, which its Push stage runs in the main tree on
# main: climb batch N's skills/ folder (the skill writer's tasks and reports, the cold read; its logs are ignored)
# and its orientation/ folder, which the orientation update wrote, committed by named paths with the footer of the
# fortress-repo skill's committing part. Prints "COMMITTED hash subject", or "NOTHING" when both folders are clean.
# --dry-run prints what it would commit and commits nothing.
set -uo pipefail
here=$(cd "$(dirname "$(readlink -f "$0")")" && pwd)
repo=$(cd "$here/../../../.." && pwd)
N=${1:?usage: folders.sh N [--dry-run]}; DRY=${2:-}
cd "$repo" || exit 1
[ "$(git symbolic-ref --short HEAD)" = main ] || { echo "folders.sh: the main tree is not on main" >&2; exit 1; }
paths=()
for d in skills orientation; do
  p="explorations/compile-ladder/climb-batch-$N/$d/"
  [ -d "$p" ] && [ -n "$(git status --porcelain -- "$p")" ] && paths+=("$p")
done
[ ${#paths[@]} -gt 0 ] || { echo NOTHING; exit 0; }
footer=$(sed -n 's/^ *\(Co-Authored-By: .*\)$/\1/p; s/^ *\(Claude-Session: .*\)$/\1/p' .claude/skills/fortress-repo/references/committing.md | head -2)
[ "$(printf '%s\n' "$footer" | wc -l)" = 2 ] || { echo "folders.sh: no footer found in the committing part" >&2; exit 1; }
subject="Climb batch $N's skill update after its landing: the writer's tasks and reports, the cold read, and the orientation update's folder"
if [ "$DRY" = --dry-run ]; then
  echo "== would commit: ${paths[*]}"; git status --porcelain -- "${paths[@]}"; printf '== with the message:\n%s\n\n%s\n' "$subject" "$footer"; exit 0
fi
mkdir -p tmp
printf '%s\n\nBy the climb batch %s landing workflow.\n\n%s\n' "$subject" "$N" "$footer" > "tmp/folders-msg-$N.txt"
for i in 1 2 3 4 5; do
  if git add -- "${paths[@]}" && git commit -q -F "tmp/folders-msg-$N.txt" -- "${paths[@]}"; then
    echo "COMMITTED $(git log -1 --format='%h %s')"; exit 0
  fi
  [ -e .git/index.lock ] || break
  sleep 5
done
echo "folders.sh: the commit failed" >&2; exit 1
