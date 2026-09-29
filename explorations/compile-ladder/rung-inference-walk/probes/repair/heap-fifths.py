#!/usr/bin/env python3
# heap-fifths.py <label> <gc log>: the heap after each G1 "Pause Young" (the figure after '->'), averaged over five
# consecutive fifths of the run and rounded, and the last ten; the form of probes/skeptic/heap-summary.txt.
import re, sys
label, path = sys.argv[1], sys.argv[2]
after = [int(m.group(1)) for line in open(path) if 'Pause Young' in line
         for m in [re.search(r'->(\d+)M', line)] if m]
n = len(after)
fifths = []
for k in range(5):
    part = after[k * n // 5:(k + 1) * n // 5]
    fifths.append(round(sum(part) / len(part)))
print("%-8s young GCs %d; MB after GC by fifths: %s ; last 10: %s " % (
    label, n, " ".join(map(str, fifths)), " ".join(map(str, after[-10:]))))
