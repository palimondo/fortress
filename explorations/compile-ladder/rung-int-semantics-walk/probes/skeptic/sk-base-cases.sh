#!/bin/bash
# Runs, one program each, the ZZ32-receiver cases of SkWalkOnly.fss whose count is not a ZZ64,
# on the landed tree and against the base tree's natives (../base-overlay.sh).
# Usage, from FORTRESS_HOME with the environment of experiment/env.sh: sk-base-cases.sh <scratch-dir>
set -u
S=${1:?scratch dir}
FH=${FORTRESS_HOME:?}
mkdir -p "$S"
n=0
while IFS='|' read -r what expr ; do
    [ -z "$what" ] && continue
    n=$((n+1))
    c=SkBase$n
    cat > "$S/$c.fss" <<FSS
component $c
export Executable
kind(v: Any): String =
  typecase v of
    ZZ32 => "ZZ32"
    ZZ64 => "ZZ64"
    else => "other"
  end
run() = do
    three: ZZ32 = 3
    v = ($expr)
    println("$what = " (v.asString) " : " kind(v))
end
end
FSS
    for side in landed base ; do
        echo "### $side: $what    [$expr]"
        if [ $side = landed ] ; then
            ( cd "$S" && "$FH/bin/fortress" "$c.fss" 2>&1 | grep -v '^	at \|^java.lang.Throwable$' )
        else
            bash "$FH/explorations/compile-ladder/rung-int-semantics-walk/probes/base-overlay.sh" "$S/overlay" "$S" "$c.fss" 2>&1 | grep -v '^	at \|^java.lang.Throwable$'
        fi
    done
done <<'CASES'
ZZ32 3 LSHIFT a ZZ count of 33|three LSHIFT big(widen(33))
ZZ32 3 LSHIFT an NN32 count of 33|three LSHIFT unsigned(33)
ZZ32 3 LSHIFT an NN64 count of 33|three LSHIFT unsigned(widen(33))
ZZ32 3 LSHIFT a ZZ64 count of 33|three LSHIFT widen(33)
CASES
