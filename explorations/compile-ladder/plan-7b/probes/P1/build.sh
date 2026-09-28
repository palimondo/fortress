#!/bin/bash
# build.sh : probe P1's Scala shadow (make-shadow.py), compiled with the build's own scalac entry
# point (build.xml drives scala.tools.nsc.Main) against the frozen classpath into $X/p1/classes, a
# directory to put AHEAD of the snapshot's build.  No ant; nothing tracked is touched.  Writes
# shadow.patch (the edit of record, a git diff of the two tracked files against the shadow copies)
# and build.txt.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/../env.sh"
P1=$O/P1; W=$X/p1
cd "$FORTRESS_HOME"
rm -rf "$W/shadow-src" "$W/classes"; mkdir -p "$W/classes"
{ echo "# build.sh $(date -u +%FT%TZ); tree $(git rev-parse --short HEAD); $(machine_line)"
  python3 "$P1/make-shadow.py" ProjectFortress/src "$W/shadow-src" || exit 1
  B=$(date +%s)
  java -Xmx2g -cp "$CP" scala.tools.nsc.Main -nowarn -d "$W/classes" -classpath "$CP" -encoding UTF-8 \
       $(find "$W/shadow-src" -name '*.scala' | sort) 2>&1 || { echo "scalac failed"; exit 1; }
  echo "built in $(( $(date +%s) - B )) s: $(find "$W/classes" -name '*.class' | wc -l) class files"
} > "$P1/build.txt" 2>&1
cat "$P1/build.txt"
for f in overloading/OverloadingOracle typechecker/OverloadingChecker; do
  git diff --no-index -- "ProjectFortress/src/com/sun/fortress/scala_src/$f.scala" "$W/shadow-src/com/sun/fortress/scala_src/$f.scala" \
    | sed -e "s#^+++ b/.*#+++ b/ProjectFortress/src/com/sun/fortress/scala_src/$f.scala#" \
          -e "s#^diff --git .*#diff --git a/ProjectFortress/src/com/sun/fortress/scala_src/$f.scala b/ProjectFortress/src/com/sun/fortress/scala_src/$f.scala#"
done > "$P1/shadow.patch"
echo "shadow.patch: $(grep -c '^+[^+]' "$P1/shadow.patch") lines added, $(grep -c '^-[^-]' "$P1/shadow.patch") removed" | tee -a "$P1/build.txt"
