#!/bin/bash
# prehome.sh <worktree> <base-sha>: build <worktree>/tmp/skeptic/prehome, a shadow FORTRESS_HOME whose
# Library/ is a real copy with the three edited apis taken from <base-sha>, and whose default_repository/
# is its own; every other top-level entry is a symlink into the worktree. Pre-edit runs then set
# FORTRESS_HOME=FORTRESS_AUTOHOME=<prehome>: FORTRESS_AUTOHOME must be set, because without it
# ProjectProperties.fortressAutoHome (ProjectProperties.java:24-60) takes the canonical path of the
# classpath's ProjectFortress and silently resolves the library to the worktree's post-edit copy.
set -eu
W=$1; BASE=$2; P=$W/tmp/skeptic/prehome
rm -rf "$P"; mkdir -p "$P/Library" "$P/default_repository/caches"
cd "$W"
for e in $(ls -A | grep -v '^Library$\|^tmp$\|^\.git$\|^default_repository$'); do ln -s "$W/$e" "$P/$e"; done
cp Library/* "$P/Library/" 2>/dev/null || true
cp default_repository/configuration "$P/default_repository/"
for f in Library/FortressLibrary.fsi Library/RangeInternals.fsi Library/List.fsi; do git show "$BASE:$f" > "$P/$f"; done
