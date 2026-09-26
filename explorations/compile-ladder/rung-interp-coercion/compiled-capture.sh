#!/bin/bash
# compiled-capture.sh <out.txt> <threads> <file.fss>...: compiles each file on the compiled path into
# default_repository/caches (the five libraries compiled there first, in library order) and runs its
# component with the given FORTRESS_THREADS, appending headers, output and exit codes to <out.txt>.
# Run from FORTRESS_HOME with the environment of explorations/experiment/env.sh.
set -u
OUT=${1:?out} ; TH=${2:?threads} ; shift 2
for f in "$@" ; do
  c=$(basename "$f" .fss)
  echo "=== \$ bin/fortress compile $f   ($(git rev-parse --short HEAD), $(date -u +%Y-%m-%dT%H:%M:%SZ)) ===" >> "$OUT"
  timeout -k 10 600 bin/fortress compile "$f" < /dev/null >> "$OUT" 2>&1
  echo "=== exit $? ===" >> "$OUT"
  echo "=== \$ FORTRESS_THREADS=$TH bin/fortress run $c ===" >> "$OUT"
  ( cd "$(dirname "$f")" && FORTRESS_THREADS=$TH timeout -k 10 600 "$FORTRESS_HOME/bin/fortress" run "$c" < /dev/null ) >> "$OUT" 2>&1
  echo "=== exit $? ===" >> "$OUT"
  echo >> "$OUT"
done
