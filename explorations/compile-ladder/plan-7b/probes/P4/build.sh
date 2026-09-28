#!/bin/bash
# build.sh : probe P4's logging shadow (make-shadow.py), compiled with javac against the frozen
# classpath into $X/p4/classes, a directory to put AHEAD of the snapshot's build.  No ant; nothing
# tracked is touched.  Writes shadow.patch (the edit of record: the tracked file against the shadow
# copy, and the new P4Probe.java) and build.txt.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/../env.sh"
P4=$O/P4; W=$X/p4
cd "$FORTRESS_HOME"
rm -rf "$W/shadow-src" "$W/classes"; mkdir -p "$W/classes"
R=com/sun/fortress/interpreter/evaluator/values
{ echo "# build.sh $(date -u +%FT%TZ); tree $(git rev-parse --short HEAD), sources of the private home's $(sed -n 2p "$O/snapshot.txt" | cut -d' ' -f2); $(machine_line)"
  python3 "$P4/make-shadow.py" ProjectFortress/src "$W/shadow-src" || exit 1
  javac -nowarn -encoding UTF-8 -cp "$CP" -d "$W/classes" "$W/shadow-src/$R/OverloadedFunction.java" "$W/shadow-src/$R/P4Probe.java" 2>&1 || { echo "javac failed"; exit 1; }
  echo "built: $(find "$W/classes" -name '*.class' | wc -l) class files"
} > "$P4/build.txt" 2>&1
cat "$P4/build.txt"
git diff --no-index -- "ProjectFortress/src/$R/OverloadedFunction.java" "$W/shadow-src/$R/OverloadedFunction.java" \
  | sed -e "s#^+++ b/.*#+++ b/ProjectFortress/src/$R/OverloadedFunction.java#" \
        -e "s#^diff --git .*#diff --git a/ProjectFortress/src/$R/OverloadedFunction.java b/ProjectFortress/src/$R/OverloadedFunction.java#" > "$P4/shadow.patch"
echo "shadow.patch: $(grep -c '^+[^+]' "$P4/shadow.patch") lines added, $(grep -c '^-[^-]' "$P4/shadow.patch") removed; P4Probe.java $(wc -l < "$P4/P4Probe.java") lines" | tee -a "$P4/build.txt"
