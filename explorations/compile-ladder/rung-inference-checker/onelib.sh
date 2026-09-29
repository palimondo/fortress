#!/bin/bash
# onelib.sh <label> <build-cp> <L0|A0> <file.fss> : the compiled checker over one small program against the
#   one library (the interpreter's prelude), measurement D's driver ProbeD (probes-D/ProbeD.java with the
#   fill worker's shadow StaticChecker, so that -Dprobe.dropApiErrors keeps the library api's own errors
#   out) under the setting any, the gate's distance stage's. L0 is this tree's library; A0 its copy with
#   the numeral switch's library half (compile-ladder/plan-6.5/probes/numeral/numeral-lib-A0.patch,
#   applied with offsets to tmp/libA0). -> probes/onelib/<Name>.<label>.<lib>.txt: the machine line, the
#   program's own error lines with 3 lines of context, the tallies.
set -u
W=/home/user/fortress-infer; R=$W/explorations/compile-ladder/rung-inference-checker
L=$1; B=$2; LIB=$3; F=$4; N=$(basename "$F" .fss); mkdir -p "$R/probes/onelib"
TP=$($W/bin/fortress_classpath 2>/dev/null | tail -1 | tr ':' '\n' | grep '/third_party/' | paste -sd:)
case $LIB in L0) LP="$W/ProjectFortress/LibraryBuiltin;$W/Library";; A0) LP="$W/tmp/libA0/ProjectFortress/LibraryBuiltin;$W/tmp/libA0/Library";; esac
WD=$W/tmp/onelib-$N-$L-$LIB; rm -rf "$WD"; mkdir -p "$WD/cache"; cp "$F" "$WD/"
M="nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
cd "$WD"; S=$(date +%s)
FORTRESS_AUTOHOME=$W timeout -k 10 900 java -Xmx4g -Xss64m -Dfortress.caches="$WD/cache" -Djava.io.tmpdir="$WD/cache" \
  "-Dfortress.source.path=;.;$LP;$W/ProjectFortress/test_library" \
  -Dprobe.dropApiErrors=1 -cp "$W/tmp/drvD:$B:$TP" ProbeD -setting any "$N.fss" > full.txt 2>&1
RC=$?
{ echo "# onelib.sh $L $LIB $N $(date -u +%FT%TZ); tree $(git -C $W rev-parse --short HEAD) with its working changes; build $B; $M; rc=$RC; $(( $(date +%s) - S )) s"
  echo "# the program's own error lines (with 3 lines of context each):"
  grep -n -A3 "^\($WD/\)\?$N.fss:" full.txt | sed "s|$WD/||g; s|$W/||g" | cut -c1-400
  echo "# tallies:"; grep -E "has [0-9]+ errors?\.|### rc=|Exception|^Error" full.txt | grep -v "^@@" | sed "s|$WD/||g" | head -8
} > "$R/probes/onelib/$N.$L.$LIB.txt"
rm -rf "$WD"
echo "$N $L $LIB rc=$RC $(grep -c "^[0-9]*:$N.fss:" "$R/probes/onelib/$N.$L.$LIB.txt") error lines"
