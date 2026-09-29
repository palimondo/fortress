#!/bin/bash
# runtests.sh one <libcache> <outdir> <Name>...    each compiler_tests/<Name>.test through the gate's harness
#                                                  (tmp/drv/SuiteI, FileTests.suiteFromListOfFiles) in its own
#                                                  JVM, its cache a private copy of <libcache> (the five
#                                                  prelude components already compiled)
# runtests.sh suite <seed> <outfile> <Name>...     all of them in one JVM, shuffled by <seed> as the harness
#                                                  shuffles a suite, from a cold private cache, as a testFast
#                                                  track starts
# Run from the worktree root with tmp/h.sh sourced. Captures carry the machine line.
set -u
W=/home/user/fortress-infer; T=$W/ProjectFortress/compiler_tests
CP="$W/tmp/drv:$($W/bin/fortress_classpath 2>/dev/null | tail -1)"
machine_line () { echo "nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"; }
MODE=$1; shift
case $MODE in
one)
  LIB=$1; OUT=$2; shift 2; mkdir -p "$OUT"
  for N in "$@"; do
    C=$W/tmp/rt-cache-$N; rm -rf "$C"; cp -a "$LIB" "$C"; mkdir -p "$C/tmp"
    { echo "# runtests.sh one $N $(date -u +%FT%TZ); tree $(git -C $W rev-parse --short HEAD) with its working changes; $(machine_line)"
      B=$(date +%s)
      FORTRESS_CACHES="$C" timeout -k 10 900 java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 -Djava.io.tmpdir="$C/tmp" -Dfortress.caches="$C" \
        -Dfortress.junit.reset=false -cp "$CP" SuiteI plain 0 "$T/$N.test" 2>&1 | grep -v '^\s*at \|^	at ' | sed "s#$W/##g"
      echo "exit=${PIPESTATUS[0]} $(( $(date +%s) - B )) s"; } > "$OUT/$N.txt" 2>&1
    rm -rf "$C"
    echo "$N: $(grep -c 'Failed\|FAILED\|failure' "$OUT/$N.txt") failure-lines; $(grep 'SuiteI result' "$OUT/$N.txt")"
  done ;;
suite)
  SEED=$1; OUT=$2; shift 2; mkdir -p "$(dirname "$OUT")"
  C=$W/tmp/rt-cache-suite; rm -rf "$C"; mkdir -p "$C/tmp"
  ARGS=(); for N in "$@"; do ARGS+=("$T/$N.test"); done
  { echo "# runtests.sh suite seed $SEED $(date -u +%FT%TZ); tree $(git -C $W rev-parse --short HEAD) with its working changes; cold cache; $(machine_line)"
    B=$(date +%s)
    FORTRESS_CACHES="$C" timeout -k 10 3000 java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 -Djava.io.tmpdir="$C/tmp" -Dfortress.caches="$C" \
      -Dfortress.junit.reset=false -cp "$CP" SuiteI shuffle "$SEED" "${ARGS[@]}" 2>&1 | grep -v '^\s*at \|^	at ' | sed "s#$W/##g"
    echo "exit=${PIPESTATUS[0]} $(( $(date +%s) - B )) s"; } > "$OUT" 2>&1
  rm -rf "$C"
  grep 'SuiteI result' "$OUT" ;;
esac
