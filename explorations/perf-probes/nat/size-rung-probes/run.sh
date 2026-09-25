#!/bin/bash
# The two probes before the run-time size rung's brief (../size-rung-probes.md), every command
# in order.  Run from anywhere:
#
#   ./explorations/perf-probes/nat/size-rung-probes/run.sh <work-dir> [step ...]
#
# <work-dir> is a scratch directory OUTSIDE the repository.  Steps: stack, rung, check, p1, p1c,
# p1j, p2, walk.  With no step named, every step runs (about 14 minutes on this container, 9 of
# them the stack and 3 the step p1; longer than the Bash tool's ten-minute ceiling, so run it in
# the background or step by step).  Nothing tracked is modified; default_repository/ is never
# written (every compiled run has its own -Dfortress.caches under <work-dir>, every walk its
# own cache too).  Captures land beside this script as rN-*.txt (not .out, which .gitignore
# keeps out).
#
# The stack is ../size-cost/run.sh's, built by calling that script's own stack step, which calls
# ../size-probes/run.sh's build and worlds steps and then stamps B's holder classes <n>$RTTIc for
# 0 to 16 with ../java/StampSizeRTTI.java.  This directory's three patches then go on top of that
# stack's Java sources, into <work-dir>/stack/java-src.rung, compiled to rung-classes; each is
# flag-gated and off by default, so with every new flag off the stack is size-cost's:
#   size-emit.patch     InstantiatingClassloader makes a size literal's holder class <n>$RTTIc
#                       itself, on first request (-Dprobe.nat.sizeEmit=true): variant (a)
#   size-factory.patch  RTTIsize.of(text) makes or fetches the one descriptor of a number;
#                       MethodInstantiater.rttiReference, CodeGen's extends-clause push
#                       (../size-probes/extends-b.patch) and the dispatcher's literal leaf
#                       (../size-probes/dispatch-b.patch) call it instead of reading
#                       <n>$RTTIc.ONLY (-Dprobe.nat.sizeFactory=true): variant (b)
#   size-hash.patch     RTTIsize.hashCode is its text's (-Dprobe.nat.sizeHash=true)
# Design B throughout is ../size-cost/run.sh's B: world cVB and its flags.  Three ways of making a
# number's descriptor are compared, each program compiled and run in its own fresh copy of cVB:
#   H  holder classes stamped ahead of the run by the tool, in front of the class path
#      (size-cost's B exactly, on rung-classes with every new flag off)
#   E  variant (a), the loader's emitter; nothing stamped on the class path
#   F  variant (b), the factory; nothing stamped on the class path
set -u
cd "$(dirname "$0")/../../../.."                     # $FORTRESS_HOME
source explorations/experiment/env.sh
D=explorations/perf-probes/nat
S=$D/size-probes
C=$D/size-cost
R=$D/size-rung-probes
W=${1:?usage: run.sh <work-dir> [step ...]}; shift
case "$(cd "$(dirname "$W")" 2>/dev/null && pwd)/" in
  "$PWD"/*) echo "ABORT: the work dir must be outside the repository" >&2; exit 1;;
esac
mkdir -p "$W"
W=$(cd "$W" && pwd)
STEPS=${*:-"stack rung check p1 p1c p1j p2 walk"}
want () { case " $STEPS " in *" $1 "*) return 0;; esac; return 1; }
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
K=$W/stack
NAT=$K/shadow-classes                                # the Scala shadow
STAMP=$K/stamp-classes                               # the tool's <n>$RTTIc, 0 to 16
RUNG=$K/rung-classes                                 # the Java shadow with this directory's patches
ENC="-Dstdout.encoding=UTF-8 -Dstderr.encoding=UTF-8"
machine () { # the machine a timing ran on (explorations/protocol.md section 6)
  echo "# machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //');" \
       "$(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg);" \
       "$(java -version 2>&1 | head -1); FORTRESS_THREADS=${FORTRESS_THREADS:-unset}; $(date -u)"
}

# ------------------------------------------------------------------ stack
if want stack; then
  df -h / | tail -1
  $C/run.sh "$W" stack
fi

# ------------------------------------------------------------------ rung
if want rung; then
  rm -rf $K/java-src.rung $RUNG
  cp -r $K/java-src $K/java-src.rung
  for p in size-emit size-factory size-hash; do
    patch -s -p1 -d $K/java-src.rung/com/sun/fortress --forward < $R/$p.patch
  done
  if [ -n "$(git status --porcelain ProjectFortress/src)" ]; then
    echo "ABORT: a patch touched tracked sources; revert them before going on" >&2
    exit 1
  fi
  mkdir -p $RUNG
  javac -nowarn -encoding UTF-8 -cp "$NAT:$CP" -d $RUNG \
        $(find $K/java-src.rung -name '*.java' | sort) 2>&1 | grep -E 'error' | head -20
  javac -nowarn -cp "$RUNG:$CP" -d $K/tool-classes $R/SizeCheck.java
  # each patch's code lines: added and removed lines that are not blank and not comment
  { for p in size-emit size-factory size-hash; do
      awk -v p=$p '
        /^\+\+\+|^---/ {next}
        /^[+-]/ { t=substr($0,2); sub(/^[ \t]+/,"",t);
                  if (t=="" || t ~ /^\/\*/ || t ~ /^\*/ || t ~ /^\/\//) next;
                  if (substr($0,1,1)=="+") a++; else r++ }
        END { printf "%s: %d code lines added, %d removed\n", p, a, r }' $R/$p.patch
      grep '^+++ ' $R/$p.patch | sed 's/^+++ b\//    /; s/\t.*//'
    done; } > $R/r0-patch-lines.txt
  echo "rung done"
fi

# every run: the rung classes in front, then the Scala shadow and the tree
fcompile () { # fcompile <cache> <flags> <file>
  java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow $2 -Dfortress.caches=$1 \
       -cp "$RUNG:$NAT:$CP" com.sun.fortress.Shell compile "$3"
}
frun () { # frun <cache> <flags> <name> [extra-classpath]: ../size-probes/run.sh's frun
  java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 $2 \
       -cp "${4:-}$RUNG:$NAT:$1/bytecode_cache:$1/bytecode_cache/*:$1/nativewrapper_cache:$CP" \
       com.sun.fortress.runtimeSystem.MainWrapper "$3"
}
B="-Dprobe.nat.likeOpr=false -Dprobe.nat.valuePos=true -Dprobe.nat.extendsB=true -Dprobe.nat.dispatchB=true -Dprobe.nat.keepSizeParams=true"
flags_of () { case $1 in H) echo "$B";; E) echo "$B -Dprobe.nat.sizeEmit=true";; F) echo "$B -Dprobe.nat.sizeFactory=true";; esac; }
xcp_of ()   { case $1 in H) echo "$STAMP:";; *) echo "";; esac; }
cache_of () { echo $W/rung/$1-$(basename $2 .fss); }   # cache_of <variant> <file>
fresh () { local c=$(cache_of $1 $2); rm -rf $c; mkdir -p $W/rung; cp -a $W/cVB $c; }

# ------------------------------------------------------------------ check
# the descriptor itself, outside any Fortress program: SizeCheck under H, E and F, hash off and on
if want check; then
  { for h in "" "-Dprobe.nat.sizeHash=true"; do
      echo "########## H: the tool's stamped holder classes on the class path ${h:-(hash as the stack has it)}"
      java $h -cp "$STAMP:$K/tool-classes:$RUNG:$NAT:$CP" SizeCheck holder 2>&1 | head -8
      echo "########## E: the loader's emitter, nothing stamped ${h:-(hash as the stack has it)}"
      java -Dprobe.nat.sizeEmit=true $h -cp "$K/tool-classes:$RUNG:$NAT:$CP" SizeCheck holder 2>&1 | head -8
      echo "########## F: the factory ${h:-(hash as the stack has it)}"
      java $h -cp "$K/tool-classes:$RUNG:$NAT:$CP" SizeCheck factory 2>&1 | head -8
      echo
    done
    echo "########## control: holder classes asked for with neither the tool's classes nor the emitter"
    java -cp "$K/tool-classes:$RUNG:$NAT:$CP" SizeCheck holder 2>&1 | grep -v '^	at ' | head -3
  } > $R/r1-descriptor.txt 2>&1
fi

# ------------------------------------------------------------------ p1
# the four probe programs of the size probes, the four of the size cost, and the control
# pExtLit, each compiled and run under H, E and F in its own fresh copy of cVB
PROGS="$S/pNatDisp.fss $S/pNatDispTrait.fss $S/pNatDispSize.fss $S/pNatDispLit.fss
       $C/SizedSum.fss $C/SizedDisp.fss $C/SizedDispLit.fss $C/SizedMany.fss $R/pExtLit.fss"
if want p1; then
  { machine
    for f in $PROGS; do
      n=$(basename $f .fss)
      for v in H E F; do
        fresh $v $f; c=$(cache_of $v $f)
        echo "########## [$v] fortress compile $f"
        fcompile $c "$(flags_of $v) $ENC" $f 2>&1 | head -12; echo "exit=${PIPESTATUS[0]}"
        echo "---------- [$v] fortress run $n"
        frun $c "$(flags_of $v) $ENC" $n "$(xcp_of $v)" 2>&1 | grep -v '^	at java.base' | head -14 | tee $c.run
        echo
      done
    done; } > $R/r2-programs.txt 2>&1
  # the answers compared (the milliseconds the timing loops print left out), and the
  # compiled jars compared class file by class file
  { for f in $PROGS; do
      n=$(basename $f .fss)
      for v in H E F; do sed -E 's/ ms [0-9.]+//' $(cache_of $v $f).run > $W/rung/$v-$n.ans; done
      same="differ"
      cmp -s $W/rung/H-$n.ans $W/rung/E-$n.ans && cmp -s $W/rung/H-$n.ans $W/rung/F-$n.ans && same="same"
      echo "########## $n: answers under H, E, F $same; H's answer:"
      tr '\n' '|' < $W/rung/H-$n.ans | sed 's/|$/\n/'
      [ $same = differ ] && for v in E F; do echo "  [$v] $(tr '\n' '|' < $W/rung/$v-$n.ans)"; done
      for v in H E F; do x=$W/rung/$v-$n.jar.d; rm -rf $x; mkdir -p $x
        (cd $x && unzip -q -o $(cache_of $v $f)/bytecode_cache/$n.jar 2>/dev/null); done
      for v in E F; do
        d=$(diff -rq $W/rung/H-$n.jar.d $W/rung/$v-$n.jar.d | sed "s#$W/rung/H-$n.jar.d/##; s# and .*##; s#^Files ##")
        echo "  compiled $n.jar, H against $v: $( [ -z "$d" ] && echo identical || echo "differs in $(echo "$d" | wc -l) class files: $(echo $d)")"
      done
    done; } > $R/r2-summary.txt 2>&1
fi

# ------------------------------------------------------------------ p1c
# classes loaded, SizedMany under H, E and F: ../size-cost/run.sh's count (-Xlog:class+load=debug),
# each variant against H
if want p1c; then
  n=SizedMany; f=$C/SizedMany.fss
  for v in H E F; do
    frun $(cache_of $v $f) "$(flags_of $v) -Xlog:class+load=debug:stdout:level,tags" $n "$(xcp_of $v)" \
      > $W/rung/$v-$n.classlog 2>&1
  done
  python3 - $n $W/rung/H-$n.classlog $W/rung/E-$n.classlog $W/rung/F-$n.classlog > $R/r3-classes.txt 2>&1 <<'PYEOF'
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
logs = {'H': load(sys.argv[2]), 'E': load(sys.argv[3]), 'F': load(sys.argv[4])}
for d, rows in logs.items():
    ftr = [r for r in rows if 'InstantiatingClassloader' in r['loader']]
    desc = [r for r in rows if re.search(r'\$RTTI[ci]$', r['name'])]
    print(f"[{d}] {n}: all classes {len(rows)}, {sum(r['bytes'] for r in rows)} bytes; "
          f"by the Fortress loader {len(ftr)}, {sum(r['bytes'] for r in ftr)} bytes; "
          f"descriptor classes ($RTTIc/$RTTIi, either loader) {len(desc)}, {sum(r['bytes'] for r in desc)} bytes")
tot = {d: {} for d in logs}
for d, rows in logs.items():
    for r in rows: tot[d][r['name']] = tot[d].get(r['name'], 0) + r['bytes']
for d in ('E', 'F'):
    ch = Counter(r['name'] for r in logs['H']); cd = Counter(r['name'] for r in logs[d])
    onlyH = sorted((ch - cd).elements()); onlyD = sorted((cd - ch).elements())
    by = {x: {r['name']: r['bytes'] for r in logs[x]} for x in ('H', d)}
    print(f"  H against {d}: under H only {len(onlyH)} loads, {sum(by['H'][x] for x in onlyH)} bytes; "
          f"under {d} only {len(onlyD)} loads, {sum(by[d][x] for x in onlyD)} bytes")
    for x in onlyH: print(f"    H {by['H'][x]:6d}  {x}")
    for x in onlyD: print(f"    {d} {by[d][x]:6d}  {x}")
    same = [x for x in tot['H'] if x in tot[d] and tot['H'][x] != tot[d][x]]
    print(f"    loaded under both, with a different length: {len(same)} classes, {d} minus H "
          f"{sum(tot[d][x] - tot['H'][x] for x in same)} bytes; the largest five:")
    for x in sorted(same, key=lambda x: -abs(tot[d][x] - tot['H'][x]))[:5]:
        print(f"    {tot[d][x] - tot['H'][x]:+6d}  {x}")
    kinds = Counter(('function class' if 'Arrow' in x else 'object class', tot[d][x] - tot['H'][x]) for x in same)
    print("    by kind and difference: " + "; ".join(f"{k} {v:+d} bytes: {c}" for (k, v), c in sorted(kinds.items())))
PYEOF
fi

# javap_expanded <variant> <file> <class-regex> <method-regex> <label>: ../size-cost/run.sh's, per
# variant: the loader writes every class it stamps into expanded.jar, and one method of each
# class matching the regex is disassembled from there
javap_expanded () { local v=$1 f=$2 n=$(basename $2 .fss); local x=$W/rung/$1-$n-expanded
  rm -rf $x; mkdir -p $x
  frun $(cache_of $v $f) "$(flags_of $v) -Dfortress.bytecodes.expanded.directory=$x" $n "$(xcp_of $v)" > /dev/null 2>&1
  (cd $x && unzip -q -o expanded.jar 2>/dev/null)
  echo "########## [$v] $5: javap -c of $4 in the stamped classes matching $3"
  find $x -type f -name '*.class' | grep -E "$3" | sort | while IFS= read -r c; do
    echo "---------- $(basename "$c")"
    cp "$c" $x/t.class
    javap -J-Dstdout.encoding=UTF-8 -c -p $x/t.class | awk -v re="$4" '$0 ~ re {on=1} on {print} on && /^$/ {on=0}'
  done
  echo
}
# javap_jar <variant> <file> <class-glob> <method-regex> <label>: one method of a class in the
# component's own jar (a template or a descriptor class, as compiled)
javap_jar () { local v=$1 f=$2 n=$(basename $2 .fss); local x=$W/rung/$1-$n.jar.d
  echo "########## [$v] $5: javap -c of $4 in $3 of $n.jar"
  find $x -maxdepth 1 -type f -name "$3" | sort | while IFS= read -r c; do
    echo "---------- $(basename "$c")"
    cp "$c" $W/rung/t.class
    javap -J-Dstdout.encoding=UTF-8 -c -p $W/rung/t.class | awk -v re="$4" '$0 ~ re {on=1} on {print} on && /^$/ {on=0}'
  done
  echo
}
# javap_main <variant> <file> <method-regex> <label> [lines]: a method of the component's main class
javap_main () { local v=$1 f=$2 n=$(basename $2 .fss)
  echo "########## [$v] $4: javap -c of $n.$3"
  javap -J-Dstdout.encoding=UTF-8 -c -p -cp "$(cache_of $v $f)/bytecode_cache/$n.jar" "$n" 2>&1 \
    | awk -v re="$3" '$0 ~ re {on=1} on {print} on && /athrow|^$/ {exit}' | head -${5:-80}
  echo
}

# ------------------------------------------------------------------ p1j
# where each variant makes a literal's descriptor: the three sites, and a symbol in a template
if want p1j; then
  { echo "==================== site 1, MethodInstantiater.rttiReference: a stamped class's static initialiser"
    for v in H E F; do javap_expanded $v $C/SizedMany.fss 'Box⟦8⟧\.class$' 'static \{\};' "SizedMany"; done
    echo "==================== the holder class itself: the tool's (H) and the loader's (E)"
    echo "########## [H] javap -c of the tool's 8\$RTTIc"
    javap -c -p -cp $STAMP '8$RTTIc' 2>&1 | head -20; echo
    javap_expanded E $C/SizedMany.fss '/8\$RTTIc\.class$' 'static \{\};' "SizedMany, the emitted holder class"
    echo "==================== a size that is a symbol in a template: the template as compiled"
    for v in H F; do javap_jar $v $C/SizedMany.fss 'SizedMany$Box⟦⟧.class' 'static \{\};' "SizedMany's template"; done
    echo "==================== site 2, CodeGen's extends-clause push: Rnk1's descriptor, as compiled"
    for v in H F; do
      echo "########## [$v] pExtLit: javap -c of pExtLit\$Rnk1\$RTTIc, its methods and the descriptors they fetch"
      cp $W/rung/$v-pExtLit.jar.d/'pExtLit$Rnk1$RTTIc.class' $W/rung/t.class
      javap -J-Dstdout.encoding=UTF-8 -c -p $W/rung/t.class | grep -E '^  [a-z].*\(|getstatic|invokestatic|putstatic|getfield| ldc ' | head -30
      echo
    done
    echo "==================== site 3, the dispatcher's literal leaf: h[\\T\\](v: Vec[\\T,3\\]) in pNatDispLit"
    for v in H F; do javap_main $v $S/pNatDispLit.fss 'String h\(fortress.AnyType.Any\)' "pNatDispLit" 60; done
  } > $R/r4-javap.txt 2>&1
fi

# ------------------------------------------------------------------ p2
# DOT's shared size under B as built (H): the checker's word, the calls it resolved, the
# dispatcher's bytecode, and the run
if want p2; then
  f=$R/pDot.fss; n=pDot
  { machine
    for v in H; do
      fresh $v $f; c=$(cache_of $v $f)
      echo "########## [$v] fortress compile $f"
      fcompile $c "$(flags_of $v) $ENC" $f 2>&1 | head -20; echo "exit=${PIPESTATUS[0]}"
      echo "---------- [$v] fortress run $n"
      frun $c "$(flags_of $v) $ENC" $n "$(xcp_of $v)" 2>&1 | grep -v '^	at java.base' | head -20
      echo
    done; } > $R/r5-dot.txt 2>&1
  x=$W/rung/H-$n.jar.d; rm -rf $x; mkdir -p $x; (cd $x && unzip -q -o $(cache_of H $f)/bytecode_cache/$n.jar 2>/dev/null)
  { echo "########## [H] the calls in pDot.run, where the checker picked each arm (invocations only)"
    javap -J-Dstdout.encoding=UTF-8 -c -p -cp "$(cache_of H $f)/bytecode_cache/$n.jar" $n 2>&1 \
      | awk '/ run\(/ {on=1} on && /invoke|getstatic|ldc +#[0-9]+ +\/\/ String/ {print} on && /^$/ {exit}' \
      | grep -v 'FFloatLiteral.make\|coerce_RR64\|FJavaString.make\|ldc2_w' | head -40
    echo
    javap_main H $f 'FVoid dot\(fortress.AnyType.Any, fortress.AnyType.Any\);' "the overload set's dispatcher" 140
  } > $R/r5b-dot-javap.txt 2>&1
fi

# ------------------------------------------------------------------ walk
# the interpreter's answers for the two new programs, each in its own fresh cache
if want walk; then
  { for f in $R/pDot.fss $R/pExtLit.fss; do
      n=$(basename $f .fss); c=$W/walk-$n; rm -rf $c; mkdir -p $c; printf '\0\0\0\0' > $c/global.map
      echo "########## walk $f"
      JAVA_FLAGS="-Xmx4g -Xss64m -Dfortress.caches=$c" timeout 600 ./bin/fortress $f 2>&1 | head -12
      echo
    done; } > $R/r6-walk.txt 2>&1
fi
