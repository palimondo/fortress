#!/bin/bash
# run-diff.sh <thread count> <probe>...: each probe under walk, then compiled (compile + run); one capture per probe and thread count
cd "$(dirname "$0")"
T=$1; shift
export FORTRESS_THREADS=$T
for p in "$@"; do
  out=$p.t$T.txt
  {
    echo "# machine: nproc=$(nproc); cpu=$(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); MHz=$(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); loadavg=$(cut -d' ' -f1-3 /proc/loadavg); jdk=$(java -version 2>&1 | head -1); FORTRESS_THREADS=$T; HEAD=$(git rev-parse --short HEAD); library at e5414f5bf (base, nested tower)"
    echo "## walk: bin/fortress $p.fss"
    timeout 120 ../../../../../bin/fortress $p.fss 2>&1 | sed 's/^/  /'
    echo "  [exit ${PIPESTATUS[0]}]"
    echo "## compiled: bin/fortress compile $p.fss"
    timeout 300 ../../../../../bin/fortress compile $p.fss 2>&1 | sed 's/^/  /'
    rc=${PIPESTATUS[0]}
    echo "  [exit $rc]"
    if [ $rc = 0 ]; then
      echo "## compiled: bin/fortress run $p"
      timeout 120 ../../../../../bin/fortress run $p 2>&1 | sed 's/^/  /'
      echo "  [exit ${PIPESTATUS[0]}]"
    fi
  } > $out 2>&1
done
