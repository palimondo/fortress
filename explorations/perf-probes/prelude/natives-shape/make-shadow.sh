#!/bin/bash
# make-shadow.sh OUT PATCH...  -- copy the tree's sources that the patches touch,
# apply the patches in order, compile them against ProjectFortress/build into OUT.
# Nothing in the tree changes; OUT is put first on the classpath by run-shadow.sh.
set -eu
cd "$(dirname "$0")/../../../.."
source explorations/experiment/env.sh
OUT=$1; shift
W=$(mktemp -d "$FORTRESS_HOME/tmp/shadow-src.XXXX")
for p in "$@"; do
  for f in $(grep '^+++ b/' "$p" | sed 's#^+++ b/##; s#\t.*##'); do
    [ -f "$W/$f" ] || [ ! -f "$f" ] || { mkdir -p "$W/$(dirname $f)"; cp "$f" "$W/$f"; }
  done
  (cd "$W" && patch -s -p1 < "$FORTRESS_HOME/$p")
done
rm -rf "$OUT"; mkdir -p "$OUT"
javac -nowarn -encoding UTF-8 -d "$OUT" -cp "$(bin/fortress_classpath)" $(find "$W" -name '*.java') 2>&1 | grep -v '^Note:' || true
find "$OUT" -name '*.class' | sed "s#^$OUT/##" | sort
rm -rf "$W"
