#!/bin/bash
# run-one.sh P : compile P.fss against the compiler's prelude, run it with the JVM's verifier on, then run it under walk.
P=$1
W=/home/user/fortress-probe1118
cd $W/ProjectFortress
echo "== compile $P"
../bin/fortress compile ../tmp/p/$P.fss ; echo "compile exit=$?"
echo "== run $P (verifier on)"
JAVA_FLAGS="$JAVA_FLAGS -XX:+UnlockDiagnosticVMOptions -XX:+BytecodeVerificationRemote" ../bin/fortress run $P ; echo "run exit=$?"
echo "== walk $P"
../bin/fortress ../tmp/p/$P.fss ; echo "walk exit=$?"
