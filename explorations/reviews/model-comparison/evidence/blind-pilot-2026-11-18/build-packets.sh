#!/bin/bash
# Build the blind judges' packets: one folder per landed change, holding its task (blinded), the decisions it builds,
# a primer on Fortress and its tests, the diff of code and tests, and each changed file whole before and after.
set -euo pipefail
R=/home/user/fortress
S=$(cd "$(dirname "$0")" && pwd)
cd $R
mk() { # $1 packet name, $2 commit, $3 task-file, $4 task-start, $5 task-end
  P=$S/packets/$1; rm -rf $P; mkdir -p $P/before $P/after
  git show --format= --find-renames $2 -- ProjectFortress/ > $P/change.diff
  git show --format= --name-status --find-renames $2 -- ProjectFortress/ | while IFS=$'\t' read -r st a b; do
    case $st in
      R*) old=$a; new=$b;; D) old=$a; new=;; A) old=; new=$a;; *) old=$a; new=$a;;
    esac
    if [ -n "$old" ]; then mkdir -p "$P/before/$(dirname "$old")"; git show "$2^:$old" > "$P/before/$old"; fi
    if [ -n "$new" ]; then mkdir -p "$P/after/$(dirname "$new")"; git show "$2:$new" > "$P/after/$new"; fi
  done
  cp $S/context.md $S/decisions.md $P/; cp $S/task-$1.md $P/task.md
}
mk p1 6df780a7d0
mk p2 1f6c166b0d
