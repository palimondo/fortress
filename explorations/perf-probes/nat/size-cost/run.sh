#!/bin/bash
# The run-time cost of design A against design B (../size-cost.md), every command in order.
#
#   ./explorations/perf-probes/nat/size-cost/run.sh <work-dir> [step ...]
#
# <work-dir> is a scratch directory OUTSIDE the repository.  Steps: stack, compile, a, b, bj, c, cj.
# With no step named, every step runs (about 14 minutes on this container, 9 of them the
# stack; longer than the Bash tool's ten-minute ceiling, so run it in the background).
# Nothing tracked is modified; default_repository/ is never written.  Captures land beside
# this script as kN-*.
#
# The stack is ../size-probes/run.sh's (itself ../runtime/run-all.sh's stack plus the four
# flag-gated patches of ../size-probes/), built by calling that script's own build and worlds
# steps into <work-dir>.  B's per-literal descriptor classes are then stamped for 0 to 16.
#
# Each design runs with every piece it needs, measured in ../size-probes.md:
#   A: design-a.patch, value-position.patch, fourth-gap-a.patch, keep-size-params.patch
#      (world cV)
#   B: RTTIsize + stamped <n>$RTTIc, value-position.patch, extends-b.patch,
#      dispatch-b.patch, keep-size-params.patch (world cVB, stamped classes in front)
# Every program is compiled into its own fresh copy of the world's cache.
#
# Timings are wall clock on a shared container.  Only pairs taken in one run of this
# script are compared; A and B runs are interleaved (A B A B A B) so that a drift in the
# machine's speed falls on both.
set -u
cd "$(dirname "$0")/../../../.."                     # $FORTRESS_HOME
source explorations/experiment/env.sh
D=explorations/perf-probes/nat
S=$D/size-probes
C=$D/size-cost
P=explorations/perf-probes/prelude
J=$D/java
W=${1:?usage: run.sh <work-dir> [step ...]}; shift
case "$(cd "$(dirname "$W")" 2>/dev/null && pwd)/" in
  "$PWD"/*) echo "ABORT: the work dir must be outside the repository" >&2; exit 1;;
esac
mkdir -p "$W"
W=$(cd "$W" && pwd)
STEPS=${*:-"stack compile a b bj c cj"}
want () { case " $STEPS " in *" $1 "*) return 0;; esac; return 1; }
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
K=$W/stack
NAT=$K/shadow-classes
JAV=$K/java-classes
STAMP=$K/stamp-classes

A="-Dprobe.nat.likeOpr=true -Dprobe.nat.valuePos=true -Dprobe.nat.stemFix=true -Dprobe.nat.keepSizeParams=true"
B="-Dprobe.nat.likeOpr=false -Dprobe.nat.valuePos=true -Dprobe.nat.extendsB=true -Dprobe.nat.dispatchB=true -Dprobe.nat.keepSizeParams=true"
ENC="-Dstdout.encoding=UTF-8 -Dstderr.encoding=UTF-8"

# ------------------------------------------------------------------ stack
if want stack; then
  df -h / | tail -1
  $S/run.sh "$W" build worlds
  java -cp "$K/tool-classes:$JAV:$CP" StampSizeRTTI $STAMP $(seq 0 16) > /dev/null
  echo "stack done"
fi

# ../size-probes/run.sh's fcompile and frun, unchanged.
fcompile () { # fcompile <cache> <flags> <file>
  java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow $2 -Dfortress.caches=$1 \
       -cp "$JAV:$NAT:$CP" com.sun.fortress.Shell compile "$3"
}
frun () { # frun <cache> <flags> <name> [extra-classpath]
  java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 $2 \
       -cp "${4:-}$JAV:$NAT:$1/bytecode_cache:$1/bytecode_cache/*:$1/nativewrapper_cache:$CP" \
       com.sun.fortress.runtimeSystem.MainWrapper "$3"
}
# the design's world, flags and extra class path, by letter
world_of () { case $1 in A) echo $W/cV;; B) echo $W/cVB;; esac; }
flags_of () { case $1 in A) echo "$A";; B) echo "$B";; esac; }
xcp_of ()   { case $1 in A) echo "";;    B) echo "$STAMP:";; esac; }
cache_of () { echo $W/cost/$1-$(basename $2 .fss); }   # cache_of <design> <file>
PROGS="$P/pNat1.fss $D/java/pNatGenMeth.fss $C/SizedMany.fss $C/SizedSum.fss $C/SizedDisp.fss $C/SizedDispLit.fss $C/VecCtorControl.fss"

# ------------------------------------------------------------------ compile
# every program, under each design, into its own fresh copy of that design's world
if want compile; then
  { for f in $PROGS; do
      for d in A B; do
        c=$(cache_of $d $f); rm -rf $c; mkdir -p $W/cost; cp -a $(world_of $d) $c
        echo "########## [$d] fortress compile $f"
        fcompile $c "$(flags_of $d) $ENC" $f 2>&1 | head -12; echo "exit=${PIPESTATUS[0]}"
        echo "---------- [$d] fortress run $(basename $f .fss)"
        frun $c "$(flags_of $d) $ENC" $(basename $f .fss) "$(xcp_of $d)" 2>&1 | grep -v '^	at java.base' | head -8
        echo
      done
    done; } > $C/k1-compile.out 2>&1
fi

# classes <file>: one run under each design with -Xlog:class+load=debug, summarised.
# Every class the JVM loads is counted; "bytes" is the class file's length the JVM reports
# for a class it parsed (classes from the JDK's shared archive report none).  The totals
# line of each design is followed by the classes loaded under one design and not the other
# (the JVM's own hidden classes, whose names carry an address, are compared without it), and
# by the classes loaded under both whose class files differ in length.
classes () { local f=$1 n=$(basename $1 .fss) d
  for d in A B; do
    frun $(cache_of $d $f) "$(flags_of $d) -Xlog:class+load=debug:stdout:level,tags" $n "$(xcp_of $d)" \
      > $W/cost/$d-$n.classlog 2>&1
  done
  python3 - $n $W/cost/A-$n.classlog $W/cost/B-$n.classlog <<'PYEOF'
import re, sys
from collections import Counter
def load(path):
    rows, cur = [], None
    for line in open(path, encoding='utf-8', errors='replace'):
        m = re.match(r'\[info *\]\[class,load\] (\S+) source: (.*)', line)
        if m:
            cur = {'name': re.sub(r'/0x[0-9a-f]+$', '', m.group(1)), 'bytes': 0, 'loader': ''}
            rows.append(cur); continue
        m = re.match(r'\[debug\]\[class,load\] .*loader: \[(.*?)\](?: bytes: (\d+))?', line)
        if m and cur is not None:
            cur['loader'] = m.group(1); cur['bytes'] = int(m.group(2) or 0); cur = None
    return rows
n = sys.argv[1]
logs = {'A': load(sys.argv[2]), 'B': load(sys.argv[3])}
for d, rows in logs.items():
    ftr = [r for r in rows if 'InstantiatingClassloader' in r['loader']]
    desc = [r for r in rows if re.search(r'\$RTTI[ci]$', r['name'])]
    print(f"[{d}] {n}: all classes {len(rows)}, {sum(r['bytes'] for r in rows)} bytes; "
          f"by the Fortress loader {len(ftr)}, {sum(r['bytes'] for r in ftr)} bytes; "
          f"descriptor classes ($RTTIc/$RTTIi, either loader) {len(desc)}, {sum(r['bytes'] for r in desc)} bytes")
ca = Counter(r['name'] for r in logs['A']); cb = Counter(r['name'] for r in logs['B'])
by = {d: {r['name']: r['bytes'] for r in rows} for d, rows in logs.items()}
onlyA = sorted((ca - cb).elements()); onlyB = sorted((cb - ca).elements())
print(f"    loaded under A only: {len(onlyA)} classes, {sum(by['A'][x] for x in onlyA)} bytes; "
      f"under B only: {len(onlyB)} classes, {sum(by['B'][x] for x in onlyB)} bytes")
for x in onlyA: print(f"    A {by['A'][x]:6d}  {x}")
for x in onlyB: print(f"    B {by['B'][x]:6d}  {x}")
# classes loaded under both designs whose class files differ in length (summed over loads)
tot = {d: {} for d in logs}
for d, rows in logs.items():
    for r in rows: tot[d][r['name']] = tot[d].get(r['name'], 0) + r['bytes']
same = [x for x in tot['A'] if x in tot['B'] and tot['A'][x] != tot['B'][x]]
print(f"    loaded under both, with a different length: {len(same)} classes, B minus A {sum(tot['B'][x] - tot['A'][x] for x in same)} bytes; the largest three:")
for x in sorted(same, key=lambda x: -abs(tot['B'][x] - tot['A'][x]))[:3]:
    print(f"    {tot['B'][x] - tot['A'][x]:+6d}  {x}")
PYEOF
}
# timed <design> <file>: three wall-clock runs, ms, and the program's own output
timed () { local d=$1 f=$2 n=$(basename $2 .fss) s
  s=$(date +%s%N)
  out=$(frun $(cache_of $d $f) "$(flags_of $d)" $n "$(xcp_of $d)" 2>&1 | tr '\n' ' ')
  echo "  [$d] $n  $(( ($(date +%s%N) - s) / 1000000 )) ms wall   output: $out"
}

# ------------------------------------------------- a. classes loaded, and start-up
if want a; then
  { echo "########## classes loaded: one run each under -Xlog:class+load=debug"
    for f in $P/pNat1.fss $D/java/pNatGenMeth.fss $C/SizedMany.fss $C/SizedSum.fss; do
      classes $f
    done
    echo
    echo "########## start-up: three timed runs each, A and B interleaved"
    for f in $P/pNat1.fss $C/SizedMany.fss; do
      for i in 1 2 3; do timed A $f; timed B $f; done
    done
  } > $C/k2-classes.txt 2>&1
fi

# javap_expanded <design> <file> <class-regex> <method-regex> <label>: the loader's own
# output.  -Dfortress.bytecodes.expanded.directory makes InstantiatingClassloader write every
# class it stamps into expanded.jar (InstantiatingClassloader.java:83-100, 319-321); the
# stamped class's method is disassembled from there.
javap_expanded () { local d=$1 f=$2 n=$(basename $2 .fss); local x=$W/cost/$1-$n-expanded
  rm -rf $x; mkdir -p $x
  frun $(cache_of $d $f) "$(flags_of $d) -Dfortress.bytecodes.expanded.directory=$x" $n "$(xcp_of $d)" > /dev/null 2>&1
  (cd $x && unzip -q -o expanded.jar 2>/dev/null)
  echo "########## [$d] $5: javap -c of $4 in the stamped class matching $3"
  find $x -type f -name '*.class' | grep -E "$3" | while IFS= read -r c; do
    echo "---------- $(basename "$c")"
    cp "$c" $x/t.class
    javap -J-Dstdout.encoding=UTF-8 -c -p $x/t.class | awk -v re="$4" '$0 ~ re {on=1} on {print} on && /^$/ {on=0}'
  done
  echo
}
# javap_main <design> <file> <method-regex> <label>: a method of the component's main class
javap_main () { local d=$1 f=$2 n=$(basename $2 .fss)
  echo "########## [$d] $4: javap -c of $n.$3"
  javap -J-Dstdout.encoding=UTF-8 -c -p -cp "$(cache_of $d $f)/bytecode_cache/$n.jar" "$n" 2>&1 \
    | awk -v re="$3" '$0 ~ re {on=1} on {print} on && /athrow|^$/ {exit}'
  echo
}

# ------------------------------------------------------------ b. the hot loop
if want b; then
  { echo "########## SizedSum: ten million calls of sumS (bound: the size) and of sumN (bound: |data|); A and B interleaved"
    for i in 1 2 3; do timed A $C/SizedSum.fss; timed B $C/SizedSum.fss; done
  } > $C/k3-hotloop.out 2>&1
fi
# the stamped method's bytecode (its own step, so that it can be redone without re-timing)
if want bj; then
  { for d in A B; do
      javap_expanded $d $C/SizedSum.fss 'Vec⟦8⟧\.class$' 'sumS♙\(\)' "design $d" > $W/cost/$d-sumS.javap
    done
    cat $W/cost/A-sumS.javap
    echo "########## [B] the same method under design B, compared with A's line for line (the header lines aside)"
    diff <(tail -n +2 $W/cost/A-sumS.javap) <(tail -n +2 $W/cost/B-sumS.javap); echo "diff exit=$?"
    echo
    for d in A B; do   # the stamped class's static initialiser: where its descriptor is fetched, once
      javap_expanded $d $C/SizedSum.fss 'Vec⟦8⟧\.class$' 'static \{\};' "design $d"
    done
    for d in A B; do
      echo "########## [$d] the template, as compiled: the size's read in sumS"
      x=$W/cost/$d-tmpl; rm -rf $x; mkdir -p $x
      (cd $x && unzip -q -o $(cache_of $d $C/SizedSum.fss)/bytecode_cache/SizedSum.jar 2>/dev/null)
      find $x -maxdepth 1 -type f -name '*Vec*.class' ! -name '*RTTI*' | while IFS= read -r c; do
        cp "$c" $x/t.class; echo "---------- $(basename "$c")"
        javap -J-Dstdout.encoding=UTF-8 -c -p $x/t.class | grep -E 'sumS|CONST|Nat' | head -6
      done
      echo
    done
  } > $C/k3b-javap.txt 2>&1
fi

# ------------------------------------------------------------ c. dispatch by size
if want c; then
  { echo "########## SizedDisp: an arm generic in a size; per run, two rounds of four loops of ten million calls (SizedDisp.fss says which)"
    echo "# B is the design that answers it; A is run to show which arm it takes (its time is the catch-all's)"
    for i in 1 2 3; do timed B $C/SizedDisp.fss; done
    timed A $C/SizedDisp.fss
    echo
    echo "########## SizedDispLit: arms with literal sizes, both designs answer; A and B interleaved"
    for i in 1 2 3; do timed A $C/SizedDispLit.fss; timed B $C/SizedDispLit.fss; done
  } > $C/k4-dispatch.out 2>&1
fi
# the dispatchers' bytecode, and the call a static loop makes (its own step, redone without re-timing)
if want cj; then
  { javap_main B $C/SizedDisp.fss 'ZZ32 f\(fortress.AnyType.Any\)' "design B, the size-generic arm"
    javap_main A $C/SizedDispLit.fss 'ZZ32 g\(fortress.AnyType.Any\)' "design A, literal arms"
    javap_main B $C/SizedDispLit.fss 'ZZ32 g\(fortress.AnyType.Any\)' "design B, literal arms"
    for d in A B; do
      echo "########## [$d] the calls in SizedDisp.timeStatic, where the checker picked the arm"
      javap -J-Dstdout.encoding=UTF-8 -c -p -cp "$(cache_of $d $C/SizedDisp.fss)/bytecode_cache/SizedDisp.jar" SizedDisp 2>&1 \
        | awk '/ timeStatic\(/ {on=1} on && /f⟦|apply/ {print} on && /^$/ {exit}'
      echo
    done
  } > $C/k4b-javap.txt 2>&1
fi
