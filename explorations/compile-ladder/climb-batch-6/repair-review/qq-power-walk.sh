#!/bin/bash
# qq-power-walk.sh <work-dir>: QQPowerExponent.fss under walk at FORTRESS_THREADS=1, each run from an empty private cache
# (the device of explorations/compile-ladder/rung-flat-tower/perturb-probe.sh:9-17): the whole program, then each of its
# five powers alone (a copy keeping line 5, q, and the one println), then the integer power with a ZZ exponent alone,
# then QQPowerUnsigned.fss: what the component's sign test (Library/FortressLibrary.fss:608) sees of an unsigned exponent.
set -u
cd "$(dirname "$0")/../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
P=explorations/compile-ladder/climb-batch-6/repair-review/QQPowerExponent.fss
W=$(mkdir -p "$1" && cd "$1" && pwd)
bash explorations/compile-ladder/rung-flat-tower/machine.sh "QQPowerExponent under walk, the landed library of $(git rev-parse --short HEAD)"
run () {   # run <label> <program-file>
    rm -rf "$W/caches" "$W/tmp"; mkdir -p "$W/caches" "$W/tmp"; printf '\0\0\0\0' > "$W/caches/global.map"
    echo "=== $1"
    local S=$(date +%s)
    FORTRESS_CACHES="$W/caches" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$W/tmp" timeout 900 ./bin/fortress "$2" < /dev/null > "$W/out.txt" 2>&1
    local rc=$?
    grep -v '^	at \|^	\.\.\. ' "$W/out.txt" | grep -v '^Context:$\|^toplevel:$\|^Turn on "-debug interpreter"\|^java.lang.Throwable$\|^$'
    echo "rc=$rc secs=$(( $(date +%s) - S ))"
}
mkdir -p "$W/whole"; cp "$P" "$W/whole/"
run "the whole program" "$W/whole/QQPowerExponent.fss"
for n in 7 8 9 10 11; do
    mkdir -p "$W/line$n"
    awk -v n=$n 'NR<=6 || NR==n || NR>=12' "$P" > "$W/line$n/QQPowerExponent.fss"
    run "line $n alone: $(sed -n ${n}p "$P" | sed 's/^ *//')" "$W/line$n/QQPowerExponent.fss"
done
mkdir -p "$W/int"
cat > "$W/int/IntPowerZZExponent.fss" <<'EOF'
component IntPowerZZExponent
export Executable
run() = println("(big(2))^(big(3)) = " (big(2))^(big(3)))
end
EOF
run "the integer power with a ZZ exponent: (big(2))^(big(3))" "$W/int/IntPowerZZExponent.fss"
mkdir -p "$W/unsigned"; cp explorations/compile-ladder/climb-batch-6/repair-review/QQPowerUnsigned.fss "$W/unsigned/"
run "QQPowerUnsigned.fss: the negation of an unsigned exponent, and an NN32 exponent" "$W/unsigned/QQPowerUnsigned.fss"
