#!/bin/bash
# run.sh <tree> <out>: the helper-calls probe's commands, run from a built, seeded tree with a private caches
# folder <out>/caches (copied from <tree>/default_repository/caches). Writes into <out> only:
#   javap-*.txt     the bytecode of the program, of the native wrappers and of the prelude's ZZ32 + chain
#   inline.txt      one run of every loop under -XX:+PrintCompilation -XX:+PrintInlining
#   alloc.tsv       bytes that the program's thread allocates, one JFR run per loop, escape analysis on and off,
#                   and loopLib2 under C2 inlining depth limits (MaxInlineLevel) of 9 and 8
#   inline-lvl8.txt loopLib2's inlining decisions at MaxInlineLevel=8
# The nanoseconds that the program prints are not read: the probe takes no timing.
set -euo pipefail
TREE=$(realpath "${1:?usage: run.sh <tree> <out>}"); OUT=$(realpath -m "${2:?out dir}")
HERE=$TREE/explorations/perf-probes/helper-calls
mkdir -p "$OUT"
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
export FORTRESS_HOME=$TREE FORTRESS_THREADS=1 TMPDIR=$TREE/tmp FORTRESS_CACHES=$OUT/caches
BASE_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$TREE/tmp"
unset JAVA_TOOL_OPTIONS
[ -d "$OUT/caches" ] || cp -a "$TREE/default_repository/caches" "$OUT/caches"
cd "$HERE"

# 1. compile (about 7 s)
JAVA_FLAGS="$BASE_FLAGS" "$TREE/bin/fortress" compile HelperCalls.fss

# 2. the bytecode
J=$OUT/jar; rm -rf "$J"; mkdir -p "$J/prog" "$J/cb"
(cd "$J/prog" && unzip -q -o "$OUT/caches/bytecode_cache/HelperCalls.jar")
(cd "$J/cb" && unzip -q -o "$OUT/caches/bytecode_cache/fortress.CompilerBuiltin.jar" 2>/dev/null || true)
javap -c -p -cp "$J/prog" HelperCalls 'HelperCalls$Shape$DefaultTraitMethods' > "$OUT/javap-HelperCalls.txt"
W=$OUT/caches/nativewrapper_cache
for c in simpleIntArith simpleDoubleArith equality; do
  javap -c -p -cp "$W" native.com.sun.fortress.nativeHelpers.$c > "$OUT/javap-native-$c.txt"
done
javap -c -p -cp "$J/cb" fortress.CompilerBuiltin 'fortress.CompilerBuiltin$ZZ32$DefaultTraitMethods' \
      'fortress.CompilerBuiltin$RR64$DefaultTraitMethods' > "$OUT/javap-CompilerBuiltin.txt"

# 3. the inlining decisions, every loop in one JVM (about 30 s)
JAVA_FLAGS="$BASE_FLAGS -XX:+UnlockDiagnosticVMOptions -XX:+PrintCompilation -XX:+PrintInlining" \
  "$TREE/bin/fortress" run HelperCalls > "$OUT/inline.txt" 2>&1

# 4. allocation per loop, with escape analysis on and off (about 4 minutes)
allocated () {  # the most bytes that one thread of the recording allocated
  jfr print --json --events jdk.ThreadAllocationStatistics "$1" |
    python3 -I -c 'import json,sys; print(max(e["values"]["allocated"] for e in json.load(sys.stdin)["recording"]["events"]))'
}
printf 'loop\tea\tbytes\n' > "$OUT/alloc.tsv"
for ea in on off; do
  [ $ea = on ] && EA=-XX:+DoEscapeAnalysis || EA=-XX:-DoEscapeAnalysis
  for l in none loopLib loopImp loopPre loopLib2 dloopLib dloopImp dloopPre dloopLib2 sameLoop; do
    JAVA_FLAGS="$BASE_FLAGS $EA -Dhelper.loop=$l -XX:StartFlightRecording=filename=$OUT/a-$l-$ea.jfr,settings=profile" \
      "$TREE/bin/fortress" run HelperCalls > "$OUT/a-$l-$ea.txt" 2>&1
    printf '%s\t%s\t%s\n' $l $ea "$(allocated "$OUT/a-$l-$ea.jfr")" >> "$OUT/alloc.tsv"
    rm -f "$OUT/a-$l-$ea.jfr"
  done
done

# 5. loopLib2 with less inlining depth: where the removal of its temporary boxes stops (about 1 minute)
for lvl in 9 8; do
  JAVA_FLAGS="$BASE_FLAGS -XX:MaxInlineLevel=$lvl -Dhelper.loop=loopLib2 -XX:StartFlightRecording=filename=$OUT/l-$lvl.jfr,settings=profile" \
    "$TREE/bin/fortress" run HelperCalls > "$OUT/l-$lvl.txt" 2>&1
  printf '%s\t%s\t%s\n' loopLib2 "on,MaxInlineLevel=$lvl" "$(allocated "$OUT/l-$lvl.jfr")" >> "$OUT/alloc.tsv"
  rm -f "$OUT/l-$lvl.jfr"
done
JAVA_FLAGS="$BASE_FLAGS -XX:MaxInlineLevel=8 -Dhelper.loop=loopLib2 -XX:+UnlockDiagnosticVMOptions -XX:+PrintCompilation -XX:+PrintInlining" \
  "$TREE/bin/fortress" run HelperCalls > "$OUT/inline-lvl8.txt" 2>&1
echo done
