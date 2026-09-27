#!/bin/bash
# build.sh : the three checker shadows (make-shadow.py), each a class directory $X/classes-<variant>
# to put AHEAD of the snapshot's build on the classpath (perf-probes/nat/run-all.sh's technique),
# compiled with the build's own scalac entry point (build.xml drives scala.tools.nsc.Main) against
# the frozen classpath. No ant; nothing tracked is touched. Writes rule.patch, the edit of record, as
# a git diff of the tree's two files against the `rule` variant's copies (git apply rule.patch from
# the repository root re-applies it), and build.txt.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
cd "$FORTRESS_HOME"
{ echo "# build.sh $(date -u +%FT%TZ); tree $(git rev-parse --short HEAD); $(machine_line)"
for v in rule instr rule-instr; do
  rm -rf "$X/shadow-src-$v" "$X/classes-$v"; mkdir -p "$X/classes-$v"
  python3 "$O/make-shadow.py" ProjectFortress/src "$X/shadow-src-$v" "$v" | sed "s#$X#<X>#" || exit 1
  B=$(date +%s)
  java -Xmx2g -cp "$CP" scala.tools.nsc.Main -nowarn -d "$X/classes-$v" -classpath "$CP" -encoding UTF-8 \
       $(find "$X/shadow-src-$v" -name '*.scala' | sort) 2>&1 || { echo "scalac failed for $v"; exit 1; }
  echo "built $v in $(( $(date +%s) - B )) s: $(find "$X/classes-$v" -name '*.class' | wc -l) class files"
  find "$X/classes-$v" -name '*.class' | sed "s#$X/classes-$v/##" | sort
done
} > "$O/build.txt" 2>&1
cat "$O/build.txt"
P=com/sun/fortress/scala_src/typechecker/impls
for f in Operators Functionals; do
  git diff --no-index -- "ProjectFortress/src/$P/$f.scala" "$X/shadow-src-rule/$P/$f.scala" \
    | sed -e "s#^diff --git a/ProjectFortress/src/$P/$f.scala b/.*#diff --git a/ProjectFortress/src/$P/$f.scala b/ProjectFortress/src/$P/$f.scala#" \
          -e "s#^+++ b/.*#+++ b/ProjectFortress/src/$P/$f.scala#"
done > "$O/rule.patch"
git apply --check rule.patch 2>/dev/null; (cd "$FORTRESS_HOME" && git apply --check "$O/rule.patch" && echo "rule.patch applies to the tree: yes") >> "$O/build.txt"
echo "rule.patch: $(grep -c '^+[^+]' "$O/rule.patch") lines added, $(grep -c '^-[^-]' "$O/rule.patch") removed" >> "$O/build.txt"
git status --porcelain ProjectFortress/src | head -3
tail -2 "$O/build.txt"
