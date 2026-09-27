#!/bin/bash
# snapshot.sh : freeze what the runs read from the tree into $X/snap, so that a batch rebuilding
# ProjectFortress/build or landing library edits while this probe runs cannot move a count.
#   build/            a copy of ProjectFortress/build (the classes `ant compileAll` made)
#   Library/ LibraryBuiltin/ test_library/ compiler_tests/   git archive of HEAD
#   run-c4/ apl-mg/   microGPT's two programs (explorations/run-c4/src, explorations/apl/mg)
# Writes $O/snapshot.txt: the HEAD, the build's age and the last commit to the sources.
set -eu
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
rm -rf "$S"; mkdir -p "$S"
cd "$FORTRESS_HOME"
test -z "$(git status --porcelain ProjectFortress/src Library ProjectFortress/LibraryBuiltin ProjectFortress/compiler_tests)" || { echo "tree not clean"; exit 1; }
cp -a ProjectFortress/build "$S/build"
git archive HEAD Library ProjectFortress/LibraryBuiltin ProjectFortress/test_library ProjectFortress/compiler_tests \
    explorations/run-c4/src explorations/apl/mg | tar -x -C "$S"
mv "$S/ProjectFortress/LibraryBuiltin" "$S/ProjectFortress/test_library" "$S/ProjectFortress/compiler_tests" "$S/"
mv "$S/explorations/run-c4/src" "$S/run-c4"; mv "$S/explorations/apl/mg" "$S/apl-mg"; rm -rf "$S/ProjectFortress" "$S/explorations"
{ echo "# snapshot.sh $(date -u +%FT%TZ)"
  echo "HEAD $(git rev-parse --short HEAD)"
  echo "last commit to ProjectFortress/src Library ProjectFortress/LibraryBuiltin: $(git log -1 --format='%h %cI' -- ProjectFortress/src Library ProjectFortress/LibraryBuiltin)"
  echo "ProjectFortress/build/scalac-compileAll.args: $(date -u -r ProjectFortress/build/scalac-compileAll.args +%FT%TZ)"
  echo "newest .class in the build: $(find ProjectFortress/build -name '*.class' -newer ProjectFortress/build/scalac-compileAll.args | wc -l) newer than that file"
  echo "sources newer than the build's args file: $(find ProjectFortress/src -newer ProjectFortress/build/scalac-compileAll.args -name '*.java' -o -newer ProjectFortress/build/scalac-compileAll.args -name '*.scala' | wc -l)"
  echo "snapshot: $(du -sh "$S" | cut -f1)"; } > "$O/snapshot.txt"
cat "$O/snapshot.txt"
