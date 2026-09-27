#!/bin/bash
# build.sh : the three checker shadows of measure-D, each a class directory to put AHEAD of
# ProjectFortress/build on the classpath (the technique of perf-probes/nat/run-all.sh).
# Nothing tracked is touched: sources are copied and edited under this directory, compiled
# with the build's own scalac entry point (build.xml drives scala.tools.nsc.Main) against
# bin/fortress_classpath. No ant.
set -u
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/env-D.sh"
cd "$FORTRESS_HOME"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
echo "# build.sh $(date -u +%FT%TZ); tree $(git rev-parse --short HEAD); $(java -version 2>&1 | head -1)"
for v in instr fix90 fix fixmp; do
  rm -rf "$D/shadow-src-$v" "$D/classes-$v"; mkdir -p "$D/classes-$v"
  python3 "$D/make-shadow.py" ProjectFortress/src "$D/shadow-src-$v" "$v" || exit 1
  S=$(date +%s)
  java -Xmx2g -cp "$CP" scala.tools.nsc.Main -nowarn -d "$D/classes-$v" -classpath "$CP" -encoding UTF-8 \
       $(find "$D/shadow-src-$v" -name '*.scala' | sort) || { echo "scalac failed for $v"; exit 1; }
  echo "built $v in $(( $(date +%s) - S )) s: $(find "$D/classes-$v" -name '*.class' | wc -l) class files"
  find "$D/classes-$v" -name '*.class' | sed "s#$D/classes-$v/##" | sort
done
# the diff of each variant's copies against the tree, kept as the patch of record
for v in instr fix90 fix fixmp; do
  for f in Operators Functionals; do
    diff -u ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/$f.scala \
            "$D/shadow-src-$v/com/sun/fortress/scala_src/typechecker/impls/$f.scala"
  done > "$D/shadow-$v.patch"
done
git status --porcelain ProjectFortress/src | head -3
