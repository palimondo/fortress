#!/bin/bash
# xxx-qq-power.sh <scratch-dir>: ProjectFortress/tests/XXXQQPowerExponent.fss under walk and under the testSystem harness,
# stock and with deliberate local fixes that are not in the tree. The devices are the team's own:
#   - a class overlay compiled with javac and put first on the classpath
#     (explorations/reviews/sum-replacement-judgement/walk-shadow.sh, rung-interp-coercion/harness-one.sh);
#   - a shadow library directory put first on fortress.source.path
#     (walk-shadow.sh; explorations/repo-internals.md, "Name resolution: fortress.source.path").
# Fixes: API = the api's two exponents ZZ64 -> AnyIntegral (Library/FortressLibrary.fsi:273, :417), row 445's own fix;
#        BODY = QQ's ^ tests the sign with "other < 0 AND -other > 0" (Library/FortressLibrary.fss:608);
#        CLASS = FBigNum.getLong answers a value that fits in 64 bits (FBigNum.java:48-50).
# Every run starts from an empty private cache at FORTRESS_THREADS=1. Stack frames are dropped from the capture.
set -u
cd "$(dirname "$0")/../../../.."
source explorations/experiment/env.sh >/dev/null
FH=$FORTRESS_HOME
T=ProjectFortress/tests/XXXQQPowerExponent.fss
W=$(mkdir -p "$1" && cd "$1" && pwd)
CP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1)
bash explorations/compile-ladder/rung-flat-tower/machine.sh "XXXQQPowerExponent, stock and with deliberate local fixes, tree $(git rev-parse --short HEAD)"
# the overlay class
mkdir -p "$W/classes" "$W/src"
python3 - "$FH" "$W/src/FBigNum.java" <<'EOF'
import sys
src = open(sys.argv[1] + "/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FBigNum.java").read()
old = '        throw new ProgramError(errorMsg("Value ", value, " might not fit in ZZ64."));'
assert src.count(old) == 1
open(sys.argv[2], "w").write(src.replace(old, '        if (value.bitLength() < 64) return value.longValue();\n' + old))
EOF
javac -nowarn -cp "$CP" -d "$W/classes" "$W/src/FBigNum.java" || exit 1
# the shadow libraries
mkdir -p "$W/lib-api" "$W/lib-body"
sed -e '273s/opr ^(self, other:ZZ64): T/opr ^(self, other:AnyIntegral): T/' \
    -e '417s/opr ^(self, other:ZZ64):QQ/opr ^(self, other:AnyIntegral):QQ/' Library/FortressLibrary.fsi > "$W/lib-api/FortressLibrary.fsi"
cp Library/FortressLibrary.fss "$W/lib-api/"
cp "$W/lib-api/FortressLibrary.fsi" "$W/lib-body/"
sed -e '608s/if -other > 0 then/if other < 0 AND -other > 0 then/' Library/FortressLibrary.fss > "$W/lib-body/FortressLibrary.fss"
echo "--- the fixes, as diffs against the tree"
diff "$FH/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FBigNum.java" "$W/src/FBigNum.java"
diff Library/FortressLibrary.fsi "$W/lib-api/FortressLibrary.fsi"
diff Library/FortressLibrary.fss "$W/lib-body/FortressLibrary.fss"
SP () { echo "-Dfortress.source.path=;.;$1;$FH/ProjectFortress/LibraryBuiltin;$FH/Library;$FH/ProjectFortress/test_library" ; }
filter () { grep -v '^	at \|^	\.\.\. \|^Context:$\|^toplevel:$\|^Turn on "-debug interpreter"\|^java.lang.Throwable$\|^$' ; }
walk () {   # walk <label> <extra classpath or -> <shadow lib dir or ->
    local d="$W/walk-$4"; rm -rf "$d"; mkdir -p "$d/caches" "$d/tmp"; printf '\0\0\0\0' > "$d/caches/global.map"; cp "$T" "$d/"
    local cp="$CP"; [ "$2" != - ] && cp="$2:$CP"
    local sp=""; [ "$3" != - ] && sp="$(SP "$3")"
    echo "=== walk, $1"
    local S=$(date +%s)
    ( cd "$d" && timeout 900 java -Xmx4g -Xss64m -Djava.io.tmpdir="$d/tmp" -Dfile.encoding=UTF-8 -Dfortress.caches="$d/caches" ${sp:+"$sp"} \
        -cp "$cp" com.sun.fortress.Shell "$d/XXXQQPowerExponent.fss" < /dev/null > "$d/out.txt" 2>&1 ); local rc=$?
    filter < "$d/out.txt"; echo "rc=$rc secs=$(( $(date +%s) - S ))"
}
harness () {   # harness <label> <extra classpath or -> <shadow lib dir or -> <tag>: the testSystem harness over a directory holding only the test
    local d="$W/h-$4"; rm -rf "$d"; mkdir -p "$d/tests" "$d/caches" "$d/tmp"; cp "$T" "$d/tests/"
    local cp="$CP"; [ "$2" != - ] && cp="$2:$CP"
    local sp=""; [ "$3" != - ] && sp="$(SP "$3")"
    echo "=== the testSystem harness (SystemJUTest), $1"
    ( cd "$FH/ProjectFortress" && FORTRESS_CACHES="$d/caches" timeout 900 java -Xmx768m -Xss32m -Djava.io.tmpdir="$d/tmp" -Dfortress.caches="$d/caches" \
        -Dtests="$d/tests" ${sp:+"$sp"} -cp "$cp" com.sun.fortress.tests.unit_tests.SystemJUTest < /dev/null > "$d/out.txt" 2>&1 ); local rc=$?
    grep -v '^	at \|^$' "$d/out.txt" | grep -v 'Caused by\|^	\.\.\. ' ; echo "exit=$rc"
}
walk "stock" - - stock
walk "API: the api's exponents AnyIntegral" - "$W/lib-api" api
walk "CLASS: FBigNum.getLong overlaid" "$W/classes" - class
walk "CLASS and BODY (with API)" "$W/classes" "$W/lib-body" fixed
harness "stock: the expected failure is seen" - - stock
harness "CLASS and BODY (with API): the expected failure no longer fails" "$W/classes" "$W/lib-body" fixed
harness "CLASS alone: the expected failure is still seen (the harness prints no more; walk's run with the same overlay, above, fails at the unsigned assertion)" "$W/classes" - class
