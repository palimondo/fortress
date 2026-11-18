#!/bin/bash
# runprog.sh <tree> <Program>...: each program of plan-34/probes/programs compiled under FORTRESS_LIBRARY=one in
# <tree>/tmp/progs, then run twice, with the JVM's verifier on and with it off (the rehearsal's flags); prints each
# step's exit status and the run's last lines. Run after the setup lines.
T=$(cd "$1" && pwd); shift
HERE=$(cd "$(dirname "$0")" && pwd)
export FORTRESS_HOME=$T FORTRESS_LIBRARY=one
mkdir -p "$T/tmp/progs"; cd "$T/tmp/progs"
for p in "$@"; do
  cp "$HERE/programs/$p.fss" .
  rm -f "$T"/default_repository/caches-one/bytecode_cache/$p.jar
  "$T/bin/fortress" compile $p.fss > $p.compile.txt 2>&1; echo "$p compile rc=$?"; tail -3 $p.compile.txt | cut -c1-400
  "$T/bin/fortress" run $p > $p.on.txt 2>&1; echo "$p run, verifier on, rc=$?"; head -12 $p.on.txt | cut -c1-400
  JAVA_FLAGS="$JAVA_FLAGS -XX:+UnlockDiagnosticVMOptions -XX:-BytecodeVerificationRemote" "$T/bin/fortress" run $p > $p.off.txt 2>&1
  echo "$p run, verifier off, rc=$?"; head -12 $p.off.txt | cut -c1-400
done
