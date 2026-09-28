#!/bin/bash
# lock-cost.sh [rounds]: the loader's lock alone, measured.  The base's InstantiatingClassloader.java (git show
# b797d8037:...) is compiled into a classpath shadow put ahead of the rung's build; each atomic program of the gate's
# four-thread stage, compiled once on the rung's tree, is then run at FORTRESS_THREADS=4 alternately with the rung's
# loader (lock) and with the shadow (base), <rounds> times each, and the elapsed wall-clock milliseconds printed with
# the medians.  The only difference between the two runs of a pair is the loader class.
source /home/user/fortress-genrt/explorations/compile-ladder/rung-generic-runtime/probes/common.sh
N=${1:-7}
S=$FH/tmp/shadow-base-loader; rm -rf $S; mkdir -p $S/src
git -C $FH show b797d8037:ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java > $S/src/InstantiatingClassloader.java
javac -nowarn -encoding UTF-8 -d $S -cp "$($FH/bin/fortress_classpath | tail -1)" $S/src/InstantiatingClassloader.java 2>&1 | grep -v '^Note'
machine
echo "# shadow: $(ls $S/com/sun/fortress/runtimeSystem/ | tr '\n' ' ')"
RCP=$($FH/bin/run_classpath | tail -1)
ATOMIC_OTHER="atomic0 atomic1 atomic2 atomic3 atomic4 atomic5 atomic6 nestedTransactions0 nestedTransactions1 nestedTransactions2"
ATOMIC_COMPILER="AtomicTopLevelObjectVar AtomicTopLevelVar MutableTopLevelVarInLoop FirstLoadThreadsRungG"
cd $FH/ProjectFortress
for p in $ATOMIC_COMPILER $ATOMIC_OTHER ; do
  case " $ATOMIC_COMPILER " in *" $p "*) d=compiler_tests ;; *) d=other_compiler_tests ;; esac
  timeout -k 5 300 ../bin/fortress compile "$d/$p.fss" > /dev/null 2>&1 || { echo "$p COMPILE-FAILED" ; continue ; }
  la=""; lb=""; va=""; vb=""
  for i in $(seq 1 $N); do
    for mode in lock base; do
      [ $mode = base ] && cp="$S:$RCP" || cp="$RCP"
      t0=$(date +%s%N)
      out=$(FORTRESS_THREADS=4 timeout -k 5 120 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$cp" com.sun.fortress.runtimeSystem.MainWrapper $p 2>&1); rc=$?
      ms=$(( ($(date +%s%N) - t0) / 1000000 ))
      case "$out" in *FAIL*) v=F ;; *PASS*) v=P ;; *) v=N ;; esac
      [ $mode = lock ] && { la="$la $ms"; va="$va$v"; } || { lb="$lb $ms"; vb="$vb$v"; }
    done
  done
  ma=$(echo $la | tr ' ' '\n' | sort -n | awk '{a[NR]=$1} END{print a[int((NR+1)/2)]}')
  mb=$(echo $lb | tr ' ' '\n' | sort -n | awk '{a[NR]=$1} END{print a[int((NR+1)/2)]}')
  echo "$p | lock: $va,$la ms, median $ma | base: $vb,$lb ms, median $mb | lock minus base $((ma - mb)) ms"
done
echo "# load at end $(cut -d' ' -f1-3 /proc/loadavg)"
