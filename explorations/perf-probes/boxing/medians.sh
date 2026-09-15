#!/bin/bash
# Derive medians (loop-only seconds) from the kept run outputs.
# Usage: ./medians.sh > medians.tsv
awk '
/^=== / { label=$0; sub(/^=== [a-z ()]*run [0-9]+: */,"",label); next }
/^loop_ns/ { v=$2+0; n[label]++; t[label"|"n[label]]=v/1e9 }
END {
  for (l in n) {
    m=n[l]; for (i=1;i<=m;i++) a[i]=t[l"|"i];
    for (i=1;i<m;i++) for (j=i+1;j<=m;j++) if (a[j]<a[i]) { x=a[i]; a[i]=a[j]; a[j]=x }
    med = (m%2) ? a[(m+1)/2] : (a[m/2]+a[m/2+1])/2;
    printf "%-40s n=%d  runs:", l, m; for (i=1;i<=m;i++) printf " %.4f", a[i];
    printf "   median %.4f s\n", med
  }
}' interp-runs.out timings.out timings-ablation.out | sort
