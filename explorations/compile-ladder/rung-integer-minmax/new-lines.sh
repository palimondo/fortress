#!/bin/bash
# new-lines.sh <file>...: prints every line of the given checker outputs that names a position on one of the
# lines rung M inserted (git diff -U0 bce66f1fa over the four library files), then the count; 0 means no error
# of the run is reported at one of the fifteen declarations.
set -u
cd "$(dirname "$0")/../../.."
PAT=$(git diff -U0 bce66f1fa -- Library/FortressLibrary.fsi Library/FortressLibrary.fss \
        ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi ProjectFortress/LibraryBuiltin/FortressBuiltin.fss |
      awk '/^\+\+\+ b\// { f = substr($2, 3); sub(".*/", "", f) }
           /^@@/ { split($3, a, ","); s = substr(a[1], 2); n = (a[2] == "" ? 1 : a[2]);
                   for (i = s; i < s + n; i++) printf "%s%s:%d[:.]", (c++ ? "|" : ""), f, i }')
grep -nE "($PAT)" "$@"
echo "positions on the inserted lines: $(cat "$@" | grep -cE "($PAT)")"
