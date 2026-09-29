#!/bin/bash
# progs.sh : the probe programs of progs/ under the variants each measures, one JVM at a time, each
# from an empty private cache (run1.sh), into captures/progs.txt.  R is the respelled switch's
# properties (devices B, C and F, java-switch.patch's toggles); the classes are $X/classes-r, whose
# code with the toggles off is the first pass's $X/classes.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
cd "$O"
export SHADOW=$X/classes-r
R="-Dprobe.q.asif=convert -Dprobe.q.tuple=convert -Dprobe.q.varargs=rule"
out=captures/progs.txt
: > $out
run () { echo "######## $1 $2 ${3:-}" >> $out; ./run1.sh "$1" "progs/$2.fss" ${3:-} 2>&1 | grep -v '^	at \|^java.lang.Throwable$\|^Turn on "-debug' \
           | sed -e "s|$X|<X>|g" -e "s|$W|<W>|g" | cut -c1-400 >> $out; }
run stock NumMicro;  run eq1 NumMicro
run stock SiteProbe; run eq1 SiteProbe; run r SiteProbe "$R"
run stock O2Pos;     run eq1 O2Pos
for v in stock eq0m eq1 eq2 eq3; do run $v EqProbe; done
run stock RProbe;    run eq1 RProbe;    run r RProbe "$R"
run stock ListProbe; run eq1 ListProbe; run r ListProbe "-Dprobe.q.asif=convert -Dprobe.q.tuple=convert"; run r ListProbe "$R"
echo "######## eq1 XXXNatValueNN32RungK (the switch as built)" >> $out
./run1.sh eq1 $X/home-eq1/ProjectFortress/tests/XXXNatValueNN32RungK.fss 2>&1 | grep -v '^	at ' | sed -e "s|$X|<X>|g" | head -8 >> $out
echo "######## eq1 XXXNatValueNN32RungK -Dprobe.q.nat=literal (a size used as a value made a numeral, BaseEnv.putNat)" >> $out
./run1.sh eq1 $X/home-eq1/ProjectFortress/tests/XXXNatValueNN32RungK.fss -Dprobe.q.nat=literal 2>&1 | grep -v '^	at ' | sed -e "s|$X|<X>|g" | head -8 >> $out
echo "######## done $(date -u +%FT%TZ)" >> $out
