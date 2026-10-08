#!/bin/bash
# Reproduces REPORT.md beside this script: what the transaction checks cost
# on the compiled path.  Each probe program is compiled once, then run in
# fresh JVMs as a pair: "base", the tree as it is, and "shadow", the same
# command with a directory in front of the class path that holds BaseTask
# compiled from inATransaction-false.patch (inATransaction() returns false
# without looking).  No tracked file is changed.
#
# Usage:  run.sh [runs] [control-runs]
#   runs          timed runs per variant and program, after one warm-up pair (default 15)
#   control-runs  runs per variant of TxArray under each JIT control flag (default 3; 0 skips)
#
# Run it in a tree whose implementation is built (ant compileAll) and whose
# caches hold the compiled library (the library order).  It writes only under
# <tree>/tmp/tx-probe/, and the programs' jars into the tree's bytecode cache.
# With the defaults it takes about seven minutes; start it in the background,
# on an otherwise idle machine.

set -u
HERE=$(cd "$(dirname "$0")" && pwd)
TREE=$(cd "$HERE/../../.." && pwd)
RUNS=${1:-15}
CTRL_RUNS=${2:-3}
W=$TREE/tmp/tx-probe
PROGS="TxScalar TxArray TxCell"
CONTROLS="-XX:InlineSmallCode=6000 -XX:-DoEscapeAnalysis"

export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=$TREE FORTRESS_THREADS=1 TMPDIR=$TREE/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$TREE/tmp"
unset JAVA_TOOL_OPTIONS
mkdir -p "$W/progs" "$W/shadow-src" "$W/shadow-classes" "$W/javap"

machine () {
    echo "machine: date $(date -u +%Y-%m-%dT%H:%M:%SZ)," \
         "nproc $(nproc)," \
         "cpu '$(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //')'" \
         "(family $(grep -m1 'cpu family' /proc/cpuinfo | sed 's/.*: //')," \
         "model $(grep -m1 '^model[[:space:]]*:' /proc/cpuinfo | sed 's/.*: //'))," \
         "MHz $(grep 'cpu MHz' /proc/cpuinfo | sed 's/.*: //' | tr '\n' ' ')," \
         "load '$(cut -d' ' -f1-3 /proc/loadavg)'," \
         "jdk '$(java -version 2>&1 | sed -n 2p)'," \
         "FORTRESS_THREADS=$FORTRESS_THREADS," \
         "JAVA_FLAGS='$JAVA_FLAGS'"
}

echo "== tree $TREE at $(git -C "$TREE" rev-parse --short HEAD)"
machine

echo "== shadow: BaseTask with inATransaction-false.patch"
SRC=$TREE/ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java
cp "$SRC" "$W/shadow-src/BaseTask.java"
patch -s "$W/shadow-src/BaseTask.java" < "$HERE/inATransaction-false.patch" || exit 1
javac -nowarn -g -encoding UTF-8 -cp "$TREE/ProjectFortress/build" \
      -d "$W/shadow-classes" "$W/shadow-src/BaseTask.java" 2>&1 | grep -v '^Note:'
find "$W/shadow-classes" -name '*.class' | sed "s|^$W/||"

echo "== compile"
for p in $PROGS; do
    cp "$HERE/$p.fss" "$W/progs/"
    (cd "$W/progs" && "$TREE/bin/fortress" compile "$p.fss"; echo "compile $p rc=$?")
done

CP_BASE=$("$TREE/bin/run_classpath")
run1 () {   # run1 <base|shadow> <program> [extra java flags...]
    local cp=$CP_BASE v=$1 p=$2 ; shift 2
    [ "$v" = shadow ] && cp="$W/shadow-classes:$CP_BASE"
    (cd "$W/progs" && java $JAVA_FLAGS -Dfile.encoding=UTF-8 "$@" -cp "$cp" \
        com.sun.fortress.runtimeSystem.MainWrapper "$p")
}

# The Fortress class loader defines BaseTask itself from the bytes that
# getResourceAsStream finds first on the class path, so the JVM's class-load
# log says __JVM_DefineClass__ for both variants.  The JIT's log names the
# method's bytecode size instead: 59 bytes as the tree has it, 2 shadowed.
echo "== which inATransaction each variant runs (JIT log)"
for v in base shadow; do
    echo "$v: $(run1 $v TxCell -XX:+PrintCompilation 2>&1 \
               | grep -m1 'BaseTask::inATransaction' | sed 's/.*BaseTask::/BaseTask::/')"
done

echo "== checks per method in the compiled code (javap -c; static count)"
CACHE=${FORTRESS_CACHES:-$TREE/default_repository/caches}
for p in $PROGS; do
    mkdir -p "$W/javap/$p"
    (cd "$W/javap/$p" && jar xf "$CACHE/bytecode_cache/$p.jar")
    find "$W/javap/$p" -name '*.class' | sort | while read -r c; do
        javap -c -p "$c" > "$c.javap.txt" 2>&1
        awk -v cls="${c#$W/javap/}" '
            /^  [^ ].*\(.*\)/ { m = $0; sub(/^ +/, "", m) }
            /inATransaction/  { n[m]++ }
            END { for (k in n) printf "%s  %d checks  in %s\n", cls, n[k], k }' "$c.javap.txt"
    done
done

# Where C2 inlines TxArray's method body sumN♙ (its 319 bytes of bytecode),
# one untimed run per variant, as the tree runs and with the control flag.
echo "== JIT inlining decisions for sumN♙ in TxArray (counts over one run)"
for f in plain -XX:InlineSmallCode=6000; do
    for v in base shadow; do
        flag=; [ "$f" = plain ] || flag=$f
        echo "$v $f: $(run1 $v TxArray -XX:+UnlockDiagnosticVMOptions -XX:+PrintInlining $flag 2>&1 \
                       | grep '@ .*Vec::sumN.u2659 ([0-9]* bytes)' | sed 's/.*bytes) *//' \
                       | sort | uniq -c | sed 's/^ *//' | paste -sd';')"
    done
done

echo "== warm-up pair (not counted)"
for p in $PROGS; do
    for v in base shadow; do run1 $v $p | sed "s/^/warmup $v /"; done
done

echo "== timed runs: $RUNS per variant, base and shadow interleaved"
: > "$W/timings.txt"
for p in $PROGS; do
    echo "load before $p: $(cut -d' ' -f1-3 /proc/loadavg)"
    for i in $(seq 1 "$RUNS"); do
        for v in base shadow; do
            run1 $v $p | sed "s/^/run $i $v /" | tee -a "$W/timings.txt"
        done
    done
done

if [ "$CTRL_RUNS" -gt 0 ]; then
    echo "== JIT controls on TxArray: $CTRL_RUNS runs per variant and flag"
    for f in $CONTROLS; do
        echo "load before $f: $(cut -d' ' -f1-3 /proc/loadavg)"
        for i in $(seq 1 "$CTRL_RUNS"); do
            for v in base shadow; do
                run1 $v TxArray "$f" | sed "s/^/run $i $v:$f /" | tee -a "$W/timings.txt"
            done
        done
    done
fi
machine

echo "== summary: ns per iteration (TxScalar, TxCell) or per element (TxArray);"
echo "   median and (min-max) over the runs; pairs = base - shadow, run by run"
python3 -I - "$W/timings.txt" <<'PY'
import sys, statistics as st
per = {"TxScalar": 20e6, "TxCell": 20e6, "TxArray": 80e6}   # iterations or elements per round
rows = {}
for line in open(sys.argv[1]):
    f = line.split()
    # run <i> <variant>[:<flag>] <Prog> round <r> result <x> loop_ns <ns>
    if len(f) == 10 and f[0] == "run":
        v, _, flag = f[2].partition(":")
        key = (flag, f[3], int(f[5]))
        rows.setdefault(key, {}).setdefault(v, []).append((int(f[1]), f[7], float(f[9]) / per[f[3]]))
for key in sorted(rows):
    flag, prog, r = key
    d = rows[key]
    b = sorted(d.get("base", [])); s = sorted(d.get("shadow", []))
    tb = [x[2] for x in b]; ts = [x[2] for x in s]
    pairs = [x[2] - y[2] for x, y in zip(b, s) if x[0] == y[0]]
    res = sorted(set(x[1] for x in b + s))
    mb, ms = st.median(tb), st.median(ts)
    print(f"{flag or 'plain'} {prog} round {r}: n={len(tb)}/{len(ts)}"
          f"  base {mb:.2f} ({min(tb):.2f}-{max(tb):.2f})"
          f"  shadow {ms:.2f} ({min(ts):.2f}-{max(ts):.2f})"
          f"  diff {mb-ms:.2f}  pairs {st.median(pairs):.2f} ({min(pairs):.2f}-{max(pairs):.2f})"
          f"  share {(mb-ms)/mb*100:.1f}%  results {res}")
PY
