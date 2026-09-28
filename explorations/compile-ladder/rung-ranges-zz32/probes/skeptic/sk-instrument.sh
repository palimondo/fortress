#!/bin/bash
# sk-instrument.sh <out-dir>: a copy of the tree's Functionals.scala with one line added after the case rule's choice,
# printing "@@CASEOP <span> match=<bool> cond=<bool> op=<IN|=> matchType=... condType=... rewritten=<bool>",
# compiled alone (scalac 2.13.18) against ProjectFortress/build into <out-dir>/classes. Nothing in the tree is touched.
set -eu
cd "$(dirname "$0")/../../../../.."
W=$1; rm -rf "$W"; mkdir -p "$W/src" "$W/classes"
cp ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala "$W/src/"
python3 - "$W/src/Functionals.scala" <<'PY'
import sys
p = sys.argv[1]; s = open(p).read()
old = "                  SCaseClause(info, matchE, block, newOp)\n              }"
assert s.count(old) == 1
new = ('                  System.out.println("@@CASEOP " + span + " match=" + isG_match + " cond=" + isG_cond + " op=" + '
       '(if (isG_match && !isG_cond) "IN" else "=") + " matchType=" + getType(matchE).get + " condType=" + getType(p).get + '
       '" rewritten=" + newOp.get.getInfo.getExprType.isSome)\n' + old)
open(p, "w").write(s.replace(old, new))
PY
T=ProjectFortress/third_party/scala
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
java -Xmx2g -cp $T/scala-compiler-2.13.18.jar:$T/scala-library-2.13.18.jar:$T/scala-reflect-2.13.18.jar scala.tools.nsc.Main \
  -d "$W/classes" -classpath "ProjectFortress/build:$CP" -encoding UTF-8 "$W/src/Functionals.scala"
