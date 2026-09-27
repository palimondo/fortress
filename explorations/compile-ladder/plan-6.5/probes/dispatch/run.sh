#!/bin/bash
# run.sh: the three dispatch programs compiled and run in the compiler's world, stock and with the
# rebased call-site change as a classpath shadow at -Dprobe.scope=callsite (the switch the patch keeps).
# Needs the library cache of ../../libcache.sh at $FORTRESS_HOME/tmp/libcache. Run from $FORTRESS_HOME.
set -u
D=explorations/compile-ladder/plan-6.5/probes/dispatch
source explorations/compile-ladder/plan-6.5/env-noclean.sh
git apply "$D/callsite-rebased.patch"
rm -rf tmp/shadow-disp; mkdir -p tmp/shadow-disp
javac -nowarn -encoding UTF-8 -d tmp/shadow-disp -cp "$(bin/fortress_classpath | tail -1)" \
  ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java
git apply -R "$D/callsite-rebased.patch"
for n in ScopeAlpha2 ScopeZZ32Sub ScopeArmsLegal; do
  bash explorations/compile-ladder/plan-6.5/comp.sh $D $n > /dev/null; mv $D/$n.comp.txt $D/$n.stock.txt
  EXTRA_FLAGS="-Dprobe.scope=callsite" bash explorations/compile-ladder/plan-6.5/comp.sh $D $n "$PWD/tmp/shadow-disp" > /dev/null
  mv $D/$n.comp.txt $D/$n.callsite.txt
done
