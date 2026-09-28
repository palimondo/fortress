#!/bin/bash
# build.sh : the shadow.  Copies the four tracked interpreter sources the shadow edits into
# $X/shadow-src, applies shadow.patch to the copies (never to the tree), adds ProbeK.java, and
# compiles the five with javac against the private home's classpath into $SHADOW, which run-pass.sh
# puts ahead of the build (the technique of perf-probes/nat/run-all.sh and plan-7b/probes/P1).
# Writes build.txt: the base commit, the patch's size, javac's output.
set -eu
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
cd "$FORTRESS_HOME"
FILES="interpreter/evaluator/EvaluatorBase.java interpreter/evaluator/values/OverloadedFunction.java
       interpreter/evaluator/values/Coercions.java interpreter/evaluator/values/Fcn.java"
S=$X/shadow-src/com/sun/fortress
if [ "${1:-}" != "--from-copies" ]; then
  rm -rf "$X/shadow-src"
  for f in $FILES; do mkdir -p "$(dirname "$S/$f")"; git show $BASE:ProjectFortress/src/com/sun/fortress/$f > "$S/$f"; done
  (cd "$X/shadow-src" && patch -p1 --forward < "$O/shadow.patch")
  test -z "$(git status --porcelain ProjectFortress/src)" || { echo "ABORT: tracked sources changed"; exit 1; }
fi
rm -rf "$SHADOW"; mkdir -p "$SHADOW"
{ echo "# build.sh $(date -u +%FT%TZ); base $BASE; $(machine_line)"
  echo "patch: $(grep -c '^+' "$O/shadow.patch") lines starting with +, $(grep -c '^-' "$O/shadow.patch") with -, over $(grep -c '^+++ ' "$O/shadow.patch") files"
  javac -nowarn -encoding UTF-8 -cp "$CP" -d "$SHADOW" \
        $(find "$X/shadow-src" -name '*.java' | sort) 2>&1 | grep -v 'bootstrap classpath\|^warning\|^1 warning\|source value 8\|target value 8\|-Xlint:options\|^Note:' || true
  echo "classes: $(find "$SHADOW" -name '*.class' | wc -l)"; } > "$O/build.txt"
cat "$O/build.txt"
