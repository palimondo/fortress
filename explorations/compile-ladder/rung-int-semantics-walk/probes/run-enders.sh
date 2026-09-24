#!/bin/bash
# Runs, one program each, the cases of IntSemProbe.fss that end a walk run on the base
# tree (a raw Java exception or a ProgramError, which no Fortress catch sees), and the
# spec's shift, which the base tree does not declare. Usage, from FORTRESS_HOME with the
# environment of experiment/env.sh: run-enders.sh <scratch-dir> > <capture>.txt
set -u
S=${1:?scratch dir}
mkdir -p "$S"
FH=${FORTRESS_HOME:?}
n=0
while IFS='|' read -r label want expr ; do
    [ -z "$label" ] && continue
    n=$((n+1))
    c=RunEnder$n
    cat > "$S/$c.fss" <<FSS
component $c
export Executable
run() = do
    three: ZZ32 = 3
    minusThree: ZZ32 = -3
    zero: ZZ32 = 0
    minI: ZZ32 = -2147483647 - 1
    maxL: ZZ64 = 9223372036854775807
    minL: ZZ64 = -9223372036854775807 - 1
    twoTo32: ZZ64 = 4294967296
    twoTo31: ZZ64 = 2147483648
    threeL: ZZ64 = widen(three)
    zeroL: ZZ64 = widen(zero)
    bigThree: ZZ = big(threeL)
    bigMinusThree: ZZ = big(widen(minusThree))
    twoTo63: NN64 = unsigned(maxL) + unsigned(widen(1))
    got: String = try
        v = ($expr)
        "" v
      catch e
        IntegerOverflow => "THROWS IntegerOverflow"
      end
    println("$label = " got "   (want $want)" (if got = "$want" then "" else "   DIFF" end))
end
end
FSS
    echo "### $label    [$expr]"
    ( cd "$S" && "$FH/bin/fortress" "$c.fss" 2>&1 | grep -v '^	at \|^java.lang.Throwable$' )
done <<'CASES'
ZZ32 0 LCM 0|0|zero LCM zero
ZZ64 0 LCM 0|0|zeroL LCM zeroL
ZZ64 narrow 2^32|0|narrow(twoTo32)
ZZ64 narrow MAX|-1|narrow(maxL)
ZZ64 narrow MIN|0|narrow(minL)
ZZ64 narrow 2^31|-2147483648|narrow(twoTo31)
ZZ64 3 LSHIFT a ZZ count of 3|24|threeL LSHIFT bigThree
ZZ32 -3 RSHIFT a ZZ count of 40|-1|minusThree RSHIFT big(widen(40))
ZZ 3 LSHIFT 2147483647|THROWS IntegerOverflow|bigThree LSHIFT 2147483647
shift(3, 33) on a ZZ32|25769803776|shift(three, 33)
shift(3, -1)|1|shift(three, -1)
shift(-3, -1)|-2|shift(minusThree, -1)
shift(3, 64) on a ZZ64|55340232221128654848|shift(threeL, 64)
shift(2^63, 1) on an NN64|18446744073709551616|shift(twoTo63, 1)
shift(-3, ZZ64 MIN)|-1|shift(bigMinusThree, minL)
shift(3, 4294967296) on a ZZ|THROWS IntegerOverflow|shift(bigThree, 4294967296)
CASES
