#!/bin/bash
# skdiff.sh <Name>... : the skeptic's differential. Each probes/skeptic/<Name>.fss compiled and run on the
# rung's build (library cache tmp/caches-after), compiled on the base's build snapshot tmp/build-base
# (library cache tmp/caches-base) and run, and run by walk; the three outputs in <Name>.diff.txt.
set -u
W=/home/user/fortress-infer; R=$W/explorations/compile-ladder/rung-inference-checker; S=$R/probes/skeptic
source $W/tmp/h.sh >/dev/null
for N in "$@"; do
  T=$W/tmp/sk-$N; rm -rf "$T"; mkdir -p "$T"
  $R/comp.sh $W/tmp/caches-after "$T" after "$S/$N.fss" >/dev/null
  BUILD=$W/tmp/build-base $R/comp.sh $W/tmp/caches-base "$T" base "$S/$N.fss" >/dev/null
  C=$W/tmp/walk-cache-$N; rm -rf "$C"; mkdir -p "$C/tmp" "$C/src"; cp "$S/$N.fss" "$C/src/"
  { echo "# walk $N $(date -u +%FT%TZ); $(machine)"
    ( cd "$C/src" && FORTRESS_CACHES="$C" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$C/tmp -Dfortress.caches=$C" timeout -k 10 600 $W/bin/fortress "$N.fss" 2>&1 | grep -v '^\s*at ' | head -30; echo "walk rc=${PIPESTATUS[0]}" )
  } > "$T/$N.walk.txt" 2>&1
  rm -rf "$C"
  { echo "#### $N: the rung's build (compiled)"; cat "$T/$N.after.txt"
    echo "#### $N: the base's build (compiled)"; cat "$T/$N.base.txt"
    echo "#### $N: walk"; cat "$T/$N.walk.txt"; } > "$S/$N.diff.txt"
  rm -rf "$T"
  echo "== $N"; grep -v '^#' "$S/$N.diff.txt" | grep -v '^\s*$' | head -40
done
