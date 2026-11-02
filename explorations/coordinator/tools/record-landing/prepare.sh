#!/usr/bin/env bash
# prepare.sh N BASE LANDING AT WORKTREE BRANCH: the record-landing workflow's first step, which its sorter runs.
#
# Makes the worktree WORKTREE on a new branch BRANCH at AT (a commit, or main for its head now), unless a
# resumed run made it already; writes run.env, the run's names, into the run's folder,
# WORKTREE/explorations/compile-ladder/climb-batch-N/record-landing/; then writes the evidence there with
# evidence.py (its header lists the six files). BASE is the batch's base and LANDING its landing commit.
# The main tree is never written. Prints the run's names and each evidence file with its size.
set -euo pipefail
here=$(cd "$(dirname "$(readlink -f "$0")")" && pwd)
main=$(cd "$here/../../../.." && pwd)
N=${1:?usage: prepare.sh N BASE LANDING AT WORKTREE BRANCH}; BASE=${2:?base}; LANDING=${3:?landing}
AT=${4:?at}; WT=${5:?worktree}; BRANCH=${6:?branch}
if [ -e "$WT" ]; then
  cur=$(git -C "$WT" rev-parse --abbrev-ref HEAD 2>/dev/null || echo none)
  [ "$cur" = "$BRANCH" ] || { echo "prepare.sh: $WT exists and is not on $BRANCH (it is on $cur)" >&2; exit 1; }
  echo "worktree $WT on $BRANCH: kept"
else
  git -C "$main" rev-parse --verify --quiet "refs/heads/$BRANCH" >/dev/null &&
    { echo "prepare.sh: the branch $BRANCH exists without its worktree $WT; remove it or name another" >&2; exit 1; }
  at=$(git -C "$main" rev-parse --short=9 "$AT^{commit}")
  git -C "$main" worktree add -q -b "$BRANCH" "$WT" "$at"
  echo "worktree $WT on $BRANCH at $at: made"
fi
RUN="$WT/explorations/compile-ladder/climb-batch-$N/record-landing"
mkdir -p "$RUN"
if [ ! -f "$RUN/run.env" ]; then
  at=$(git -C "$WT" rev-parse --short=9 HEAD)
  base=$(git -C "$WT" rev-parse --short=9 "$BASE^{commit}")
  landing=$(git -C "$WT" rev-parse --short=9 "$LANDING^{commit}")
  git -C "$WT" merge-base --is-ancestor "$landing" "$at" ||
    { echo "prepare.sh: the landing $landing is not in the history of $at" >&2; exit 1; }
  cat > "$RUN/run.env" <<ENV
# The record-landing run's names, written by prepare.sh; drive.sh, checks.sh and final.sh read them.
N=$N
BASE=$base
LANDING=$landing
AT=$at
WT=$WT
BRANCH=$BRANCH
RUN=$RUN
STREAM_ENTRIES=landing-$N-entries
STREAM_ROUTING=landing-$N-routing
ENV
fi
# shellcheck disable=SC1091
. "$RUN/run.env"
sed -n 's/^\([A-Z_]*\)=\(.*\)$/  \1 \2/p' "$RUN/run.env"
python3 "$here/evidence.py" --root "$WT" --batch "$N" --base "$BASE" --landing "$LANDING" --at "$AT" --out "$RUN"
