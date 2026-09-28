#!/bin/bash
# build-opt2.sh : this note's opt2 variant of the compiled checker, a measurement device and not a
# proposed edit. It copies the inference-rule shadow's `rule` sources (its Functionals.scala and
# Operators.scala, made by make-shadow.py over the snapshot of 59a84a385) into this note's scratch
# directory, applies make-opt2.py (two edits in checkApplication: a generic candidate that the first
# attempt refuses and the coercion attempt admits joins the first attempt; a generic candidate's
# coercions do not count in the ranking, which then compares the candidates' instantiated domains),
# compiles the two files with the build's scalac entry point against the snapshot's frozen classpath
# into $P/classes-opt2, and writes opt2.patch (the diff against the rule's copy) and build-opt2.txt.
set -u
source /home/user/fortress/explorations/reviews/inference-rule-shadow/env.sh
O=/home/user/fortress/explorations/reviews/option-2-soundness
P=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/o2s
R=com/sun/fortress/scala_src/typechecker/impls
rm -rf "$P/shadow-src-opt2" "$P/classes-opt2"; mkdir -p "$P/shadow-src-opt2/$R" "$P/classes-opt2"
cp "$X/shadow-src-rule/$R/Functionals.scala" "$X/shadow-src-rule/$R/Operators.scala" "$P/shadow-src-opt2/$R/"
{ echo "# build-opt2.sh $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD); $(machine_line)"
  python3 "$O/make-opt2.py" "$P/shadow-src-opt2/$R/Functionals.scala" || exit 1
  B=$(date +%s)
  java -Xmx2g -cp "$CP" scala.tools.nsc.Main -nowarn -d "$P/classes-opt2" -classpath "$CP" -encoding UTF-8 \
       "$P/shadow-src-opt2/$R/Functionals.scala" "$P/shadow-src-opt2/$R/Operators.scala" 2>&1 || { echo "scalac failed"; exit 1; }
  echo "built opt2 in $(( $(date +%s) - B )) s: $(find "$P/classes-opt2" -name '*.class' | wc -l) class files"
} > "$O/build-opt2.txt" 2>&1
( cd "$P" && git diff --no-index -- "$X/shadow-src-rule/$R/Functionals.scala" "$P/shadow-src-opt2/$R/Functionals.scala" ) \
  | sed -e "s#$X/shadow-src-rule/#/rule/#g" -e "s#$P/shadow-src-opt2/#/opt2/#g" > "$O/opt2.patch"
cat "$O/build-opt2.txt"
