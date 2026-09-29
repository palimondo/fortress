#!/bin/bash
# make-patch.sh : writes java-switch.patch and lib-switch.patch, the edited copies in $X/edit against
# the sources of $BASE (build.sh applies the first inside $X/edit/java, homes.sh the second inside a
# home, both with patch -p1).  The device patches lib-eq1.patch to lib-eq3.patch are written by
# make-eq.sh against the switched library.
set -eu
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
cd "$W"
{ for f in $(cd "$X/edit/java" && find . -name '*.java' | sed 's|^\./||' | sort); do
    diff -u --label "a/$f" --label "b/$f" \
         <(git show $BASE:ProjectFortress/src/$f) "$X/edit/java/$f" || true
  done; } > "$O/java-switch.patch"
{ for f in ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi ProjectFortress/LibraryBuiltin/FortressBuiltin.fss \
           Library/FortressLibrary.fsi Library/FortressLibrary.fss $(cat "$X/edit/extra-files" 2>/dev/null); do
    diff -u --label "a/$f" --label "b/$f" <(git show $BASE:$f) "$X/edit/$f" || true
  done; } > "$O/lib-switch.patch"
echo "java-switch.patch: $(wc -l < "$O/java-switch.patch") lines; lib-switch.patch: $(wc -l < "$O/lib-switch.patch") lines"
