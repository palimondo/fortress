#!/bin/bash
# Runs each file of shift-subset.txt under walk with the library as committed (after) and with
# the four declarations of the base commit 47437c65f put back (before), caches emptied before
# each phase, and writes the two captures. Usage from FORTRESS_HOME with env.sh sourced:
#   stdout-diff.sh <out-dir>
set -u
O=${1:?out dir}; D=explorations/compile-ladder/rung-shift-count/probes
phase () {
    rm -rf default_repository/caches/*
    for t in $(cat $D/shift-subset.txt) ; do
        echo "=== $t"
        ( cd ProjectFortress/tests && ../../bin/fortress $t.fss 2>&1 ) ; echo "exit=$?"
    done
}
phase > "$O/walk-after.txt"
git show 47437c65f:Library/FortressLibrary.fss > Library/FortressLibrary.fss
git show 47437c65f:Library/FortressLibrary.fsi > Library/FortressLibrary.fsi
phase > "$O/walk-before.txt"
git checkout -- Library/FortressLibrary.fss Library/FortressLibrary.fsi
rm -rf default_repository/caches/*
git diff --stat -- Library/
