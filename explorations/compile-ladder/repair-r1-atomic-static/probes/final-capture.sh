#!/bin/bash
# The rung's recorded failure / recorded pass: the two gated tests in their
# final form, plus the probes that bound the repair. $1 = label
set -u
LABEL="$1"
cd /home/user/fortress-r1 || exit 1
source experiment/env.sh >/dev/null 2>&1
export TMPDIR=/home/user/fortress-r1/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=/home/user/fortress-r1/tmp"
P="$FORTRESS_HOME/explorations/compile-ladder/repair-r1-atomic-static/probes"
OUT="$P/$LABEL.txt"
WORK="$FORTRESS_HOME/ProjectFortress/r1probes"
mkdir -p "$WORK"; cp "$P"/P*.fss "$P"/P*.fsi "$WORK"/ 2>/dev/null
: > "$OUT"
{
echo "label=$LABEL   date=$(date -Is)   nproc=$(nproc)   JDK=$(java -version 2>&1 | head -1)"
echo "source tree against the batch base 49ee5e91:"
git diff 49ee5e91 --stat -- ProjectFortress/src | tail -2
echo "ant compileAll: $(grep -c 'BUILD SUCCESSFUL' "$FORTRESS_HOME/tmp/build-$LABEL.log" 2>/dev/null) BUILD SUCCESSFUL in tmp/build-$LABEL.log"
echo "bytecode cache wiped and rebuilt in library order below."
} >> "$OUT"
rm -rf "$FORTRESS_HOME/default_repository/caches"
cd "$FORTRESS_HOME/ProjectFortress" || exit 1
for f in LibraryBuiltin/AnyType.fss LibraryBuiltin/CompilerBuiltin.fss \
         ../Library/CompilerLibrary.fss ../Library/CompilerAlgebra.fss \
         ../Library/CompilerSystem.fss ; do
    t0=$(date +%s); ../bin/fortress compile "$f" >> "$OUT" 2>&1; rc=$?; t1=$(date +%s)
    echo "library $f exit=$rc elapsed=$((t1-t0))s" >> "$OUT"
    [ $rc -eq 0 ] || { echo "LIBRARY BUILD FAILED" >> "$OUT"; exit 1; }
done
echo "" >> "$OUT"
echo "=== the two gated tests (compiler_tests), each at three thread settings ===" >> "$OUT"
for t in MutableTopLevelVarInLoop AtomicTopLevelVar MutableTopLevelVar ; do
    c=$(../bin/fortress compile "compiler_tests/$t.fss" 2>&1); crc=$?
    echo "compile $t exit=$crc ${c:+:: $(echo "$c" | tr '\n' '|' | cut -c1-200)}" >> "$OUT"
done
for cfg in default 1 4 ; do
    for t in MutableTopLevelVarInLoop AtomicTopLevelVar MutableTopLevelVar ; do
        for i in 1 2 3 ; do
            if [ "$cfg" = default ] ; then unset FORTRESS_THREADS; o=$(../bin/fortress run "$t" 2>&1)
            else o=$(FORTRESS_THREADS="$cfg" ../bin/fortress run "$t" 2>&1) ; fi
            echo "THREADS=$cfg run=$i $t :: $(echo "$o" | tr '\n' '|' | cut -c1-200)" >> "$OUT"
        done
    done
done
echo "" >> "$OUT"
echo "=== probes: the cell's payload type (arrow values) and the object field ===" >> "$OUT"
for n in P12Arrow P15LocalArrow P16LocalArrowTask ; do
    c=$(../bin/fortress compile "r1probes/$n.fss" 2>&1); crc=$?
    echo "--- $n compile exit=$crc" >> "$OUT"
    [ $crc -eq 0 ] || continue
    echo "$n run :: $(../bin/fortress run "$n" 2>&1 | tr '\n' '|' | cut -c1-260)" >> "$OUT"
done
../bin/fortress compile r1probes/P10Field.fss > /dev/null 2>&1
for cfg in 1 4 ; do
    echo "P10Field THREADS=$cfg :: $(FORTRESS_THREADS=$cfg ../bin/fortress run P10Field 2>&1 | tr '\n' '|' | cut -c1-160)" >> "$OUT"
done
echo "FINAL_CAPTURE_DONE_$LABEL" >> "$OUT"
