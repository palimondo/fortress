#!/bin/bash
# The Java models for array-design-review.md: KDotStore and KMatStore (this
# directory) beside KDotPrim/KDotBoxed/KMatPrim/KMatBoxed from
# explorations/perf-probes/kernels/java, same harness (one untimed pass, MULT
# timed passes, loop_ns their mean), three runs each, medians by the kernels'
# own awk.  Classes go to the scratchpad; only java-timings.out is kept.
set -u
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../../../explorations/experiment/env.sh"
K="$FORTRESS_HOME/explorations/perf-probes/kernels/java"
OUT="${1:-/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad}/adr-java"
rm -rf "$OUT"; mkdir -p "$OUT"
javac -d "$OUT" "$K/Box.java" "$K/KDotPrim.java" "$K/KDotBoxed.java" "$K/KMatPrim.java" "$K/KMatBoxed.java" "$HERE/java/KDotStore.java" "$HERE/java/KMatStore.java" || exit 1
T="$HERE/java-timings.out"
{ echo "# jdk: $(java -version 2>&1 | head -1)"; echo "# $(date -u +%FT%TZ) mult=20, 3 runs each, loop_ns = mean of the 20 timed passes"; } > "$T"
for r in 1 2 3; do
  for c in KDotPrim KDotBoxed KDotStore KMatPrim KMatBoxed KMatStore; do
    echo "=== java $c run $r:" >> "$T"
    java -Xmx4g -Xss64m -cp "$OUT" $c 20 >> "$T" 2>&1
  done
done
awk '
/^=== / { label=$0; sub(/^=== /,"",label); sub(/ run [0-9]+:/," ",label); next }
/^loop_ns/ { v=$2+0; n[label]++; t[label"|"n[label]]=v/1e9 }
END { for (l in n) { m=n[l]; for (i=1;i<=m;i++) a[i]=t[l"|"i];
  for (i=1;i<m;i++) for (j=i+1;j<=m;j++) if (a[j]<a[i]) { x=a[i]; a[i]=a[j]; a[j]=x }
  med = (m%2) ? a[(m+1)/2] : (a[m/2]+a[m/2+1])/2;
  printf "%-22s n=%d  runs:", l, m; for (i=1;i<=m;i++) printf " %.6f", a[i]; printf "   median %.6f s\n", med } }' "$T" | sort > "$HERE/java-medians.tsv"
cat "$HERE/java-medians.tsv"
