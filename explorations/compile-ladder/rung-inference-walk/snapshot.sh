#!/bin/bash
# snapshot.sh <home-dir> <rev|tree> : a private Fortress home for the comparison's passes, so that a
# rebuild or an edit of the worktree cannot move a pass that is running (probe K's snapshot.sh,
# explorations/compile-ladder/plan-n/probe-k/, the recipe of plan-7b/probes/):
#   ProjectFortress/build              a copy of the worktree's build as it is now
#   bin/ Library/ ProjectFortress/{LibraryBuiltin,test_library,tests,demos}/
#   explorations/{run-c4/src,apl/mg,apl/reference,run-c/goldens}/   git archive of <rev>, or with
#                                      <rev> = tree, the worktree's files as they are (tracked and new)
#   ProjectFortress/{third_party,src}  symlinks to the worktree's (read only; Rats! reads src)
# Writes <home-dir>/snapshot.txt. Source explorations/experiment/env.sh first.
set -eu
FH=${FORTRESS_HOME:?}
H=${1:?home dir}; R=${2:?rev or tree}
cd "$FH"
PATHS="bin Library ProjectFortress/LibraryBuiltin ProjectFortress/test_library ProjectFortress/tests ProjectFortress/demos explorations/run-c4/src explorations/apl/mg explorations/apl/reference explorations/run-c/goldens"
rm -rf "$H"; mkdir -p "$H/ProjectFortress" "$H/default_repository/caches"
cp -a ProjectFortress/build "$H/ProjectFortress/build"
ln -s "$FH/ProjectFortress/third_party" "$H/ProjectFortress/third_party"
ln -s "$FH/ProjectFortress/src" "$H/ProjectFortress/src"
cp default_repository/configuration "$H/default_repository/configuration"
printf '\0\0\0\0' > "$H/default_repository/caches/global.map"
if [ "$R" = tree ]; then
  tar -c $PATHS | tar -x -C "$H"
else
  git archive "$R" $PATHS | tar -x -C "$H"
fi
{ echo "# snapshot.sh $(date -u +%FT%TZ) of $R; worktree HEAD $(git rev-parse --short HEAD)"
  echo "build: scalac-compileAll.args $(date -u -r ProjectFortress/build/scalac-compileAll.args +%FT%TZ); EvaluatorBase.class $(date -u -r ProjectFortress/build/com/sun/fortress/interpreter/evaluator/EvaluatorBase.class +%FT%TZ)"
  echo "uncommitted source edits: $(git status --porcelain ProjectFortress/src Library ProjectFortress/LibraryBuiltin | wc -l)"
  echo "home: $(du -shL "$H/ProjectFortress/build" | cut -f1) build, $(du -sh --exclude=build "$H" | cut -f1) the rest; $(ls "$H/ProjectFortress/tests"/*.fss | wc -l) test files"; } > "$H/snapshot.txt"
cat "$H/snapshot.txt"
