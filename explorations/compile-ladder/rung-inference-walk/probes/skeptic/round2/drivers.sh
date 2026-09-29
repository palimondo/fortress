#!/bin/bash
# The second skeptic's drivers, as run from the scratchpad (paths since rewritten from probes/skeptic2/ to probes/skeptic/round2/):
# heap: probes/skeptic/sk-heap.sh edit|base 0/4, 2/4 and 0/1 (the whole suite in one JVM); walk and compiled: probes/skeptic/sk-run.sh round2/progs walk-base|walk-edit|compiled;
# the harness: ../../harness-one.sh over the rung's six walk tests with draft/XXXCoercionOwnStaticRungK.fss, then over standin/ alone; the draft compiled with bin/fortress compile and run.

# ---- heap2.sh
cd /home/user/fortress-walkinfer
source explorations/experiment/env.sh >/dev/null 2>&1
unset JAVA_TOOL_OPTIONS
export TMPDIR=/home/user/fortress-walkinfer/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=/home/user/fortress-walkinfer/tmp"
D=explorations/compile-ladder/rung-inference-walk/probes/skeptic/round2
for spec in "edit 0/4" "base 0/4" "edit 2/4" "base 2/4"; do
  set -- $spec
  tag=$(echo "$2" | tr '/' 'of')
  df -h /home/user | tail -1 | sed 's/^/# df: /' > $D/heap-$1-shard$tag.txt
  bash explorations/compile-ladder/rung-inference-walk/probes/skeptic/sk-heap.sh $1 $2 >> $D/heap-$1-shard$tag.txt 2>&1
  cp tmp/sk/gc-$1.txt $D/gc-$1-shard$tag.txt
done
echo ALLDONE

# ---- heap3.sh
cd /home/user/fortress-walkinfer
source explorations/experiment/env.sh >/dev/null 2>&1
unset JAVA_TOOL_OPTIONS
export TMPDIR=/home/user/fortress-walkinfer/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=/home/user/fortress-walkinfer/tmp"
D=explorations/compile-ladder/rung-inference-walk/probes/skeptic/round2
for m in edit base; do
  df -h /home/user | tail -1 | sed 's/^/# df: /' > $D/heap-$m-all.txt
  bash explorations/compile-ladder/rung-inference-walk/probes/skeptic/sk-heap.sh $m 0/1 >> $D/heap-$m-all.txt 2>&1
  cp tmp/sk/gc-$m.txt $D/gc-$m-all.txt
done
echo ALLDONE

# ---- diff2.sh
cd /home/user/fortress-walkinfer
source explorations/experiment/env.sh >/dev/null 2>&1
unset JAVA_TOOL_OPTIONS
export TMPDIR=/home/user/fortress-walkinfer/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=/home/user/fortress-walkinfer/tmp"
export FORTRESS_THREADS=1
D=explorations/compile-ladder/rung-inference-walk/probes/skeptic/round2
S=explorations/compile-ladder/rung-inference-walk/probes/skeptic/sk-run.sh
rm -rf tmp/sk/run-walk-base tmp/sk/run-walk-edit
for m in walk-base walk-edit compiled; do
  df -h /home/user | tail -1 | sed 's/^/# df: /' > $D/$m.txt
  bash $S $D/progs $m >> $D/$m.txt 2>&1
done
rm -rf tmp/sk/run-walk-base tmp/sk/run-walk-edit
echo ALLDONE

# ---- harn2.sh
cd /home/user/fortress-walkinfer
source explorations/experiment/env.sh >/dev/null 2>&1
unset JAVA_TOOL_OPTIONS
export TMPDIR=/home/user/fortress-walkinfer/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=/home/user/fortress-walkinfer/tmp"
D=explorations/compile-ladder/rung-inference-walk/probes/skeptic/round2
H=explorations/compile-ladder/rung-inference-walk/harness-one.sh
T=ProjectFortress/tests
{ echo "# the rung's six walk tests and the skeptic's draft XXXCoercionOwnStaticRungK through the testSystem harness"; grep -m1 'model name' /proc/cpuinfo; grep -m1 'cpu MHz' /proc/cpuinfo;
  bash $H /home/user/fortress-walkinfer/tmp/sk2-h $T/InferCoercionRungK.fss $T/CoercionGenericFnRungC.fss $T/CoercionGenericTraitRungC.fss $T/XXXNatValueNN32RungK.fss $T/XXXInferExpectedTypeRungK.fss $T/XXXInferVarargsRungK.fss $D/draft/XXXCoercionOwnStaticRungK.fss; } > $D/harness-own.txt 2>&1
{ echo "# the red check: the stand-in whose one change writes the conversion by hand (diff below) must make the harness report the XXX file's missing failure"; diff $D/draft/XXXCoercionOwnStaticRungK.fss $D/standin/XXXCoercionOwnStaticRungK.fss;
  bash $H /home/user/fortress-walkinfer/tmp/sk2-hs $D/standin/XXXCoercionOwnStaticRungK.fss; } > $D/harness-standin.txt 2>&1
{ echo "# the draft on the compiled path (stock compiler; the rung edits nothing of it): fortress compile, then fortress run"; grep -m1 'model name' /proc/cpuinfo; echo "load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=1";
  cd $D/draft && FORTRESS_THREADS=1 /home/user/fortress-walkinfer/bin/fortress compile XXXCoercionOwnStaticRungK.fss 2>&1 | grep -v '^\s*at '; echo "compile rc=${PIPESTATUS[0]}";
  FORTRESS_THREADS=1 /home/user/fortress-walkinfer/bin/fortress run XXXCoercionOwnStaticRungK 2>&1 | grep -v '^\s*at '; echo "run rc=${PIPESTATUS[0]}"; } > /home/user/fortress-walkinfer/$D/draft-compiled.txt 2>&1
echo ALLDONE
