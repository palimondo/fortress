#!/bin/bash
# atomic-runs.sh: the gate's four-thread stage (explorations/coordinator/climb-batch-workflow.js, atomic_runs),
# run as the gate runs it, with each run's elapsed milliseconds added to its line.
source /home/user/fortress-genrt/explorations/compile-ladder/rung-generic-runtime/probes/common.sh
ATOMIC_OTHER="atomic0 atomic1 atomic2 atomic3 atomic4 atomic5 atomic6 nestedTransactions0 nestedTransactions1 nestedTransactions2"
ATOMIC_COMPILER="AtomicTopLevelObjectVar AtomicTopLevelVar MutableTopLevelVarInLoop FirstLoadThreadsRungG"
machine
cd "$FH/ProjectFortress" || exit 1
for p in $ATOMIC_COMPILER $ATOMIC_OTHER ; do
    case " $ATOMIC_COMPILER " in *" $p "*) d=compiler_tests ;; *) d=other_compiler_tests ;; esac
    [ -f "$d/$p.fss" ] || { echo "# atomic $p ABSENT" ; continue ; }
    if ! timeout -k 5 300 ../bin/fortress compile "$d/$p.fss" >/dev/null 2>&1 ; then
        echo "# atomic $p COMPILE-FAILED" ; continue
    fi
    for i in 1 2 3 ; do
        t0=$(date +%s%N)
        out=$(FORTRESS_THREADS=4 timeout -k 5 120 ../bin/fortress run "$p" 2>&1) ; rc=$?
        t1=$(date +%s%N); ms=$(( (t1 - t0) / 1000000 ))
        if [ "$rc" -eq 124 ] ; then
            t0=$(date +%s%N)
            out=$(FORTRESS_THREADS=4 timeout -k 5 120 ../bin/fortress run "$p" 2>&1) ; rc=$?
            t1=$(date +%s%N); ms=$(( (t1 - t0) / 1000000 ))
            [ "$rc" -eq 124 ] && { echo "# atomic $p run$i threads=4 TIMEOUT-TWICE" ; continue ; }
        fi
        case "$out" in
          *FAIL*) v=FAIL ;;
          *PASS*) v=PASS ;;
          *)      v="NO-PASS rc=$rc" ;;
        esac
        echo "# atomic $p run$i threads=4 $v ${ms}ms"
    done
done
echo "# load at end $(cut -d' ' -f1-3 /proc/loadavg)"
