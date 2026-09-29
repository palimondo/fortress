#!/bin/bash
# build.sh : the switch's Java shadow.  Compiles the edited copies of the ten interpreter sources
# the switch changes (java-switch.patch applied to the sources of $BASE, or, with --from-copies, the
# copies in $X/edit/java as they stand) with javac against the worktree's classpath into $SHADOW,
# which run-pass.sh puts ahead of the build in the switch's modes (probe K's technique).
# Writes build.txt: the base commit, the patch's size, javac's output.
set -eu
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
cd "$W"
FILES="interpreter/evaluator/Evaluator.java interpreter/evaluator/values/FIntLiteral.java interpreter/glue/prim/IntLiteral.java
       interpreter/evaluator/values/Simple_fcn.java interpreter/evaluator/values/MethodClosure.java
       interpreter/evaluator/EvaluatorBase.java interpreter/evaluator/values/OverloadedFunction.java
       interpreter/evaluator/BaseEnv.java interpreter/glue/prim/FlatString.java interpreter/glue/prim/ReflectCollection.java"
S=$X/edit/java/com/sun/fortress
if [ "${1:-}" != "--from-copies" ]; then
  rm -rf "$X/edit/java"
  for f in $FILES; do mkdir -p "$(dirname "$S/$f")"; git show $BASE:ProjectFortress/src/com/sun/fortress/$f > "$S/$f"; done
  (cd "$X/edit/java" && patch -p1 --forward < "$O/java-switch.patch")
fi
rm -rf "$SHADOW"; mkdir -p "$SHADOW"
{ echo "# build.sh $(date -u +%FT%TZ); base $BASE; $(machine_line)"
  echo "patch: $(grep -c '^+' "$O/java-switch.patch" 2>/dev/null || echo 0) lines starting with +, $(grep -c '^-' "$O/java-switch.patch" 2>/dev/null || echo 0) with -, over $(grep -c '^+++ ' "$O/java-switch.patch" 2>/dev/null || echo 0) files"
  javac -nowarn -encoding UTF-8 -cp "$CP" -d "$SHADOW" \
        $(find "$X/edit/java" -name '*.java' | sort) 2>&1 | grep -v 'bootstrap classpath\|^warning\|^1 warning\|source value 8\|target value 8\|-Xlint:options\|^Note:' || true
  echo "classes: $(find "$SHADOW" -name '*.class' | wc -l)"; } > "$O/build.txt"
cat "$O/build.txt"
