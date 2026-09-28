#!/bin/bash
# snapshot.sh : the private home $H, from HEAD, so that nothing the probes measure can be moved by
# another run in the main tree (batch 7R ran beside these probes).
#   ProjectFortress/build              a copy of the main tree's build (`ant compileAll`'s classes)
#   bin/ default_repository/configuration Library/ ProjectFortress/{LibraryBuiltin,test_library,
#   tests,demos,compiler_tests}/ explorations/{run-c4/src,apl/mg,apl/reference,run-c/goldens}/      git archive of HEAD
#   ProjectFortress/{third_party,src}  symlinks to the main tree's (read only; Rats! reads src)
# Writes $O/snapshot.txt: the HEAD, the build's age and whether any source is newer than it.
set -eu
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
cd "$FORTRESS_HOME"
test -z "$(git status --porcelain ProjectFortress/src Library ProjectFortress/LibraryBuiltin ProjectFortress/tests ProjectFortress/demos ProjectFortress/compiler_tests)" || { echo "tree not clean"; exit 1; }
rm -rf "$H"; mkdir -p "$H/ProjectFortress" "$H/default_repository/caches"
cp -a ProjectFortress/build "$H/ProjectFortress/build"
ln -s "$FORTRESS_HOME/ProjectFortress/third_party" "$H/ProjectFortress/third_party"
ln -s "$FORTRESS_HOME/ProjectFortress/src" "$H/ProjectFortress/src"
cp default_repository/configuration "$H/default_repository/configuration"
printf '\0\0\0\0' > "$H/default_repository/caches/global.map"
git archive HEAD bin Library ProjectFortress/LibraryBuiltin ProjectFortress/test_library ProjectFortress/tests \
    ProjectFortress/demos ProjectFortress/compiler_tests explorations/run-c4/src explorations/apl/mg explorations/apl/reference explorations/run-c/goldens | tar -x -C "$H"
{ echo "# snapshot.sh $(date -u +%FT%TZ)"
  echo "HEAD $(git rev-parse --short HEAD)"
  echo "last commit to ProjectFortress/src Library ProjectFortress/LibraryBuiltin: $(git log -1 --format='%h %cI' -- ProjectFortress/src Library ProjectFortress/LibraryBuiltin)"
  echo "ProjectFortress/build/scalac-compileAll.args: $(date -u -r ProjectFortress/build/scalac-compileAll.args +%FT%TZ)"
  echo "sources newer than the build's args file: $(find ProjectFortress/src -newer ProjectFortress/build/scalac-compileAll.args \( -name '*.java' -o -name '*.scala' \) | wc -l)"
  echo "home: $(du -shL "$H/ProjectFortress/build" | cut -f1) build, $(du -sh --exclude=build "$H" | cut -f1) the rest"; } > "$O/snapshot.txt"
cat "$O/snapshot.txt"
