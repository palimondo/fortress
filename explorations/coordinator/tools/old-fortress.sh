#!/bin/bash
# old-fortress.sh <base-build> <private-caches> <fortress arguments>...
#
# Runs the old code, the base's: bin/fortress of the batch's one base build, with FORTRESS_HOME set to the
# base build and FORTRESS_CACHES to a private caches folder. If the folder does not exist yet, it is first
# made as a copy of the base build's default_repository/caches (36 MB, 0.04 s). The paths in those caches
# are the base build's own, so nothing is translated, and no worktree is made.
#
#   old-fortress.sh <base-build> <worktree>/tmp/old-caches compile P.fss    the compiled path: compile ...
#   old-fortress.sh <base-build> <worktree>/tmp/old-caches run P            ... then run
#   old-fortress.sh <base-build> <worktree>/tmp/old-caches P.fss            walk
#
# Every cache a run writes goes to the private folder: every cache directory and the logs are under
# fortress.caches (repository/ProjectProperties.java:283-299), which FORTRESS_CACHES sets, and
# bin/fortress_classpath and bin/run_classpath put FORTRESS_CACHES/bytecode_cache on the class path.
# Under the base build a run reads the build, the library sources and default_repository/configuration, and
# writes nothing that stays: the parser writes its error logs beside each file it parses from source and
# deletes them (compiler/Parser.java:349-367), so a compile of a program that exports Executable creates and
# deletes two empty, gitignored logs beside Library/Executable.fsi. Two runs at once may share those two
# names; that is harmless, because the base's library parses without errors, so both logs stay empty and
# a log removed by the other run reads as empty (Parser.java:373-377). Measured in
# explorations/coordinator/build-cache-exploration.md, section 6.
#
# Keep the private folder and your programs outside the base build (the program's own logs go beside it).
# Refuses (exit 2) a base build that is not built, and a private folder inside the base build.
set -euo pipefail
USAGE='usage: old-fortress.sh <base-build> <private-caches> <fortress arguments>...'
BASE=$(realpath "${1:?$USAGE}")
PRIV_ARG=${2:?$USAGE}
shift 2
[ -x "$BASE/bin/fortress" ] && [ -e "$BASE/ProjectFortress/build/com/sun/fortress/Shell.class" ] \
  && [ -e "$BASE/default_repository/caches/bytecode_cache/fortress.CompilerBuiltin.jar" ] \
  || { echo "old-fortress: $BASE is not a built tree" >&2 ; exit 2 ; }
PRIV=$(realpath -m "$PRIV_ARG")
case "$PRIV/" in "$BASE"/*) echo "old-fortress: $PRIV is inside the base build $BASE" >&2 ; exit 2 ;; esac
if [ ! -d "$PRIV" ]; then
    mkdir -p "$(dirname "$PRIV")"
    PART="$PRIV.part.$$"
    cp -a "$BASE/default_repository/caches" "$PART"
    mv -T "$PART" "$PRIV" 2>/dev/null || rm -rf "$PART"     # another run made it first: use that one
fi
FORTRESS_HOME="$BASE" FORTRESS_CACHES="$PRIV" exec "$BASE/bin/fortress" "$@"
