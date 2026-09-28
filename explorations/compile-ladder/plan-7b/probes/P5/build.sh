#!/bin/bash
# build.sh : probe P5's shadow (make-shadow.py) compiled with javac against the frozen classpath into
# $X/p5/classes, to put ahead of the snapshot's build.  Writes shadow.patch and build.txt.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/../env.sh"
P5=$O/P5; W=$X/p5; R=com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java
cd "$FORTRESS_HOME"
rm -rf "$W/shadow-src" "$W/classes"; mkdir -p "$W/classes"
{ echo "# build.sh $(date -u +%FT%TZ); tree $(git rev-parse --short HEAD); $(machine_line)"
  python3 "$P5/make-shadow.py" ProjectFortress/src "$W/shadow-src" || exit 1
  javac -nowarn -encoding UTF-8 -cp "$CP" -d "$W/classes" "$W/shadow-src/$R" 2>&1 || { echo "javac failed"; exit 1; }
  echo "built: $(find "$W/classes" -name '*.class' | wc -l) class files"; } > "$P5/build.txt" 2>&1
cat "$P5/build.txt"
git diff --no-index -- "ProjectFortress/src/$R" "$W/shadow-src/$R" | sed -e "s#^+++ b/.*#+++ b/ProjectFortress/src/$R#" \
   -e "s#^diff --git .*#diff --git a/ProjectFortress/src/$R b/ProjectFortress/src/$R#" > "$P5/shadow.patch"
