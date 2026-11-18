#!/bin/bash
# lib14.sh <tree>: the one library's fourteen components compiled to jars under FORTRESS_LIBRARY=one, one by one,
# in the rehearsal's order (plan-31/probes/switch-rehearsal.md, section 4), into <tree>/default_repository/caches-one;
# each line: the component, its exit status, its seconds; then the jars. A component's jar is deleted first, since a
# compile of an unchanged source whose jar exists writes nothing. Run from anywhere, after the setup lines.
T=$(cd "$1" && pwd); cd "$T/ProjectFortress" || exit 2
export FORTRESS_HOME=$T FORTRESS_LIBRARY=one
for c in LibraryBuiltin/AnyType LibraryBuiltin/FortressBuiltin ../Library/FortressLibrary ../Library/RangeInternals \
         LibraryBuiltin/NativeArray ../Library/FlatString ../Library/String ../Library/List ../Library/Stream \
         LibraryBuiltin/NatReflect ../Library/TypeProxy ../Library/Writer ../Library/CovariantCollection ../Library/OneShotFlag; do
  n=$(basename $c)
  rm -f "$T/default_repository/caches-one/bytecode_cache/$n.jar" "$T/default_repository/caches-one/bytecode_cache/fortress.$n.jar"
  s=$(date +%s)
  ../bin/fortress compile $c.fss > "$T/tmp/lib14-$n.txt" 2>&1
  rc=$?
  echo "$n rc=$rc seconds=$(( $(date +%s) - s ))"
done
ls -la "$T"/default_repository/caches-one/bytecode_cache/ | grep '\.jar' | awk '{print $5, $9}'
