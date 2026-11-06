#!/usr/bin/env bash
# final.sh RUN: the record-landing workflow's last step, which its judge runs after it writes final.apply,
# final.rewrite (if a row changes), diff.md, commit-1.txt and commit-2.txt in the run's folder RUN.
#
# Runs checks.sh RUN final: the six record files reset to AT, final.apply and final.rewrite applied, the new
# rows of final.add (or, without it, rows.add) added with ledger.py add, and every check again. If a check fails, it commits nothing and exits 1: the judge holds the change that fails
# and runs this again. If all pass, it makes two commits on the run's branch in the worktree, each by named
# paths, each message from its file, then the line "By the climb batch N landing workflow (Opus).", which
# names the tier of the agents that wrote the text, then the footer of the fortress-repo skill's committing part:
#   1. FACTS.md, POSITIONS.md, their histories, the gap ledger and its history, where they changed;
#   2. every other changed file under explorations/ (PLAN, PLAN-history, the review queue, INDEX, other
#      notes) and the run's folder, its *.log files left out (git ignores them; the rounds' .done markers
#      are in the worktree's tmp/record-landing/, which git ignores too).
# The judge writes nothing after this script commits, so the worktree stays clean; it prints any file left.
# A changed file outside explorations/, the boot note or the held list (the coordinator's), or a new file
# outside the run's folder, stops it before any commit. Once the branch holds commits past AT, it prints
# them and does nothing more, so a resumed run commits nothing twice. It pushes nothing.
set -uo pipefail
here=$(cd "$(dirname "$(readlink -f "$0")")" && pwd)
RUN=${1:?usage: final.sh RUN}
# shellcheck disable=SC1091
. "$RUN/run.env"
made=$(git -C "$WT" log --format='%h %s' "$AT..HEAD")
if [ -n "$made" ]; then
  echo "final.sh: the branch $BRANCH holds its commits already:"; echo "$made"; exit 0
fi
for f in diff.md commit-1.txt commit-2.txt; do
  [ -s "$RUN/$f" ] || { echo "final.sh: write $RUN/$f first" >&2; exit 1; }
done
"$here/checks.sh" "$RUN" final || { echo "final.sh: a check fails ($RUN/mech-final.md); hold the change that fails it, and run final.sh again"; exit 1; }
rel_run=${RUN#"$WT"/}
record_files=" explorations/coordinator/FACTS.md explorations/coordinator/POSITIONS.md explorations/coordinator/FACTS-history.md explorations/coordinator/POSITIONS-history.md explorations/fortress-gap-ledger.md explorations/fortress-gap-ledger-history.md "
c1=(); c2=(); stop=()
while IFS= read -r line; do
  [ -n "$line" ] || continue
  st=${line:0:2}; p=${line:3}
  case "$p" in
    "$rel_run"/*.log|"$rel_run"/*.done) continue ;;
    "$rel_run"/*) c2+=("$p") ;;
    explorations/coordinator/BOOT.md|explorations/coordinator/HELD.md) stop+=("$p: the coordinator's file") ;;
    explorations/*)
      if [[ "$record_files" == *" $p "* ]]; then c1+=("$p")
      elif [ "$st" = '??' ]; then stop+=("$p: a new file outside the run's folder")
      else c2+=("$p"); fi ;;
    *) stop+=("$p: outside explorations/") ;;
  esac
done < <(git -C "$WT" status --porcelain=v1 -uall --no-renames)
if [ ${#stop[@]} -gt 0 ]; then
  echo "final.sh: nothing committed; undo these changes, or hold them in diff.md, and run final.sh again:"; printf '  %s\n' "${stop[@]}"; exit 1
fi
footer=$(sed -n 's/^ *\(Co-Authored-By: .*\)$/\1/p; s/^ *\(Claude-Session: .*\)$/\1/p' "$WT/.claude/skills/fortress-repo/references/committing.md" | head -2)
[ "$(printf '%s\n' "$footer" | wc -l)" = 2 ] || { echo "final.sh: no footer found in the committing part" >&2; exit 1; }
commit() {   # commit MSGFILE PATHS...
  local msg=$1; shift
  { cat "$msg"; printf '\nBy the climb batch %s landing workflow (Opus).\n\n%s\n' "$N" "$footer"; } > "$WT/tmp/final-msg.txt"
  git -C "$WT" add -- "$@" && git -C "$WT" commit -q -F "$WT/tmp/final-msg.txt" -- "$@"
}
mkdir -p "$WT/tmp"
if [ ${#c1[@]} -gt 0 ]; then
  commit "$RUN/commit-1.txt" "${c1[@]}" || { echo "final.sh: the first commit failed" >&2; exit 1; }
else
  echo "final.sh: no record file changed; no first commit"
fi
commit "$RUN/commit-2.txt" "${c2[@]}" || { echo "final.sh: the second commit failed" >&2; exit 1; }
echo "final.sh: the commits on $BRANCH:"
git -C "$WT" log --format='%h %s' "$AT..HEAD"
git -C "$WT" show --stat --format='== %h %s' "$AT..HEAD" | grep -v '^$'
left=$(git -C "$WT" status --porcelain=v1 -uall | grep -vE '\.(log|done)$' || true)
[ -z "$left" ] || { echo "final.sh: the worktree is not clean; left uncommitted:"; echo "$left"; }
