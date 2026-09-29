#!/bin/bash
# homes.sh <variant>... : the private Fortress homes $X/home-<variant>, so that nothing probe Q
# measures reads or writes a tree another run uses (probe K's snapshot.sh, moved to this worktree).
#   bin Library ProjectFortress/{LibraryBuiltin,test_library,tests,demos}
#   explorations/{run-c4/src,apl/mg,apl/reference,run-c/goldens}   git archive of $BASE
#   ProjectFortress/{build,third_party,src}                           symlinks to the worktree's
#   default_repository/configuration                                   a copy; caches/ empty
# Variants: stock (as archived); sw (the switch: lib-switch.patch); eq0m, eq1, eq2, eq3 (the switch with
# lib-eq0m.patch to lib-eq3.patch on top; make-eq.py says what each is); r (the switch with device 1
# and lib-r.patch, device A; make-r.py); r1 (r with lib-r1.patch, ZZ32's comparisons on ZZ32; make-r1.py).
# Writes $O/homes.txt: the base commit, each variant's patches.
set -eu
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
cd "$W"
for v in "$@"; do
  H=$X/home-$v
  rm -rf "$H"; mkdir -p "$H/ProjectFortress" "$H/default_repository/caches"
  for d in build third_party src; do ln -s "$W/ProjectFortress/$d" "$H/ProjectFortress/$d"; done
  cp default_repository/configuration "$H/default_repository/configuration"
  printf '\0\0\0\0' > "$H/default_repository/caches/global.map"
  git archive $BASE bin Library ProjectFortress/LibraryBuiltin ProjectFortress/test_library ProjectFortress/tests \
      ProjectFortress/demos explorations/run-c4/src explorations/apl/mg explorations/apl/reference \
      explorations/run-c/goldens | tar -x -C "$H"
  patches=""
  case $v in
    stock) ;;
    sw) patches="lib-switch.patch" ;;
    eq0m|eq1|eq2|eq3) patches="lib-switch.patch lib-$v.patch" ;;
    r) patches="lib-switch.patch lib-eq1.patch lib-r.patch" ;;
    r1) patches="lib-switch.patch lib-eq1.patch lib-r.patch lib-r1.patch" ;;
    *) echo "unknown variant $v"; exit 2 ;;
  esac
  for p in $patches; do (cd "$H" && patch -s -p1 --forward < "$O/$p"); done
  echo "$(date -u +%FT%TZ) home-$v: $BASE + ${patches:-nothing}" >> "$O/homes.txt"
done
tail -n $# "$O/homes.txt"
