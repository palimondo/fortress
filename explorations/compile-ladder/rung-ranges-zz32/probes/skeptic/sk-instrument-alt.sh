#!/bin/bash
# sk-instrument-alt.sh <out-dir>: sk-instrument.sh's instrumented copy of Functionals.scala, with the one-library branch
# of the case rule replaced by the team's own parameterized form with Contains in place of Generator:
#   isSubtype(t, FortressLibrary.Contains[\<inference variable>\])
# (the shape of Misc.scala:103-106's generator-clause check). A measurement of an alternative, not a proposed edit.
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
s = s.replace(old, new)
old2 = """                    else t match {
                      case tt: TraitType => (self.analyzer.ancestors(tt) + tt).exists(Types.isContainsType(_))
                      case _ => false
                    }"""
assert s.count(old2) == 1
new2 = """                    else isSubtype(t, NF.makeTraitType(NF.makeId(span, WellKnownNames.fortressLibrary(), WellKnownNames.containsTypeName),
                                                       NF.makeTypeArg(NF.make_InferenceVarType(span))))"""
open(p, "w").write(s.replace(old2, new2))
PY
T=ProjectFortress/third_party/scala
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
java -Xmx2g -cp $T/scala-compiler-2.13.18.jar:$T/scala-library-2.13.18.jar:$T/scala-reflect-2.13.18.jar scala.tools.nsc.Main \
  -d "$W/classes" -classpath "ProjectFortress/build:$CP" -encoding UTF-8 "$W/src/Functionals.scala"
