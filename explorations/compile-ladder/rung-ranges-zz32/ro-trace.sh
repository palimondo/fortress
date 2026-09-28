#!/bin/bash
# ro-trace.sh <scratch-dir> <out-file> [<library-copy-dir>]: why ProjectFortress/tests/rangeOperators.fss fails under walk on the one
# library with ranges over ZZ32 and without Range excluding String, and passes on the base.
# It copies the tracked interpreter source OverloadedFunction.java into <scratch-dir>, switches on the class's own
# exclusion dump (DUMP_EXCLUSION, OverloadedFunction.java:52-80) for the pairs that involve the test's
# opr #(x:String, y:String) (rangeOperators.fss:20) and prints each such pair's verdict fields, compiles that
# copy against the build, puts it ahead of ProjectFortress/build on the classpath (nothing in the tree changes), and
# runs the test under walk twice: on the base's library (a git-show copy of the base's Library/ in front through
# -Dfortress.source.path, as measurement C's walk.sh did), on the tree's library, and, if given, on a third library
# copy (every .fsi/.fss of Library/ and LibraryBuiltin/, in front the same way). <out-file> gets, for each run,
# the exclusion dump of the test's line-20 pairs against the library's generic # and the run's exit code.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
BASE=26c5d3dd7e436ff3b200d32346f92b8f1af1a33e
S=$(mkdir -p "$1" && cd "$1" && pwd); OUT=$2; EXTRA=${3:+$(cd "$3" && pwd)}
rm -rf "$S/src" "$S/classes" "$S/baselib"; mkdir -p "$S/src" "$S/classes" "$S/baselib"
cp ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java "$S/src/"
python3 - "$S/src/OverloadedFunction.java" <<'EOF'
import io, sys
p = sys.argv[1]
s = io.open(p, encoding="utf-8").read()
def rep(a, b):
    global s
    assert s.count(a) == 1, a
    s = s.replace(a, b)
rep("static final boolean DUMP_EXCLUSION = false;\n    static int excl_skip = 100000;",
    "static boolean DUMP_EXCLUSION = false;\n    static int excl_skip = 0;")
s = s.replace("System.out.print(o);", "System.err.print(o);").replace("            System.out.println();\n        } else {\n            excl_skip--;",
                                                                      "            System.err.println();\n        } else {\n            excl_skip--;")
a = "                exclDumpln(\"Checking exclusion of \", pl1, \" and \", pl2, \":\");"
rep(a, "                DUMP_EXCLUSION = String.valueOf(o1.getFn()).contains(\"rangeOperators.fss:20:\") || String.valueOf(o2.getFn()).contains(\"rangeOperators.fss:20:\");\n" + a)
a = "                distinct |= unequal && (allObjInstance1 || allObjInstance2);\n"
rep(a, a + "                exclDumpln(\"@@EX distinct=\", distinct, \" sawSymbolic2=\", sawSymbolic2, \" unrelated=\", unrelated);\n                DUMP_EXCLUSION = false;\n")
io.open(p, "w", encoding="utf-8").write(s)
EOF
CP0=$(./bin/fortress_classpath 2>/dev/null | tail -1)
javac -nowarn -encoding UTF-8 -cp "$CP0" -d "$S/classes" "$S/src/OverloadedFunction.java" || exit 1
for f in $(git ls-tree --name-only $BASE Library/ ProjectFortress/LibraryBuiltin/ | grep "\.fs[si]$"); do git show $BASE:$f > "$S/baselib/$(basename $f)"; done
{
for lib in base tree ${EXTRA:+extra}; do
  bash explorations/compile-ladder/rung-ranges-zz32/machine.sh "ro-trace: rangeOperators.fss under walk, library $lib, instrumented OverloadedFunction ahead of the build"
  C="$S/caches-$lib"; rm -rf "$C"; mkdir -p "$C/tmp"
  SP=""; [ $lib = base ] && SP="-Dfortress.source.path=;.;$S/baselib;$FORTRESS_HOME/ProjectFortress/test_library"
  [ $lib = extra ] && SP="-Dfortress.source.path=;.;$EXTRA;$FORTRESS_HOME/ProjectFortress/test_library"
  ( cd ProjectFortress/tests && timeout -k 10 900 java -Xmx4g -Xss64m -Dfortress.caches="$C" -Djava.io.tmpdir="$C/tmp" $SP \
      -cp "$S/classes:$CP0" com.sun.fortress.Shell rangeOperators.fss < /dev/null > "$S/run-$lib.txt" 2>&1 ; echo "rc=$?" >> "$S/run-$lib.txt" )
  echo "--- the test's opr #(x:String, y:String) (rangeOperators.fss:20) against the library's generic #[\\I\\](r: PartialRange[\\I\\], size: I)"
  grep -A12 'Checking exclusion of \[String, String\] and \[PartialRange' "$S/run-$lib.txt" | grep -v '^--$' | sed "s#$S/##g; s#$FORTRESS_HOME/##g" | sed '/@@EX/q'
  echo "--- the run's error, if any, and its exit code"
  grep -A3 'ProgramError' "$S/run-$lib.txt" | sed "s#$S/##g; s#$FORTRESS_HOME/##g" | head -6
  grep '^rc=' "$S/run-$lib.txt"
  rm -rf "$C"
done
} > "$OUT" 2>&1
cat "$OUT"
