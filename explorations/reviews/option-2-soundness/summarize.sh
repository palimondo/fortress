#!/bin/bash
# summarize.sh : one block per program, each variant's result lines (compile errors, printed values,
# exit codes) from captures/, into summary.txt. Compiled variants: stock, rule, opt2; walk: walk-stock,
# walk-apply.
cd "$(dirname "$0")"
for f in O2*.fss; do
  N=${f%.fss}
  echo "== $N"
  for v in stock rule opt2 walk-stock walk-apply; do
    C=captures/$N.$v.txt
    [ -f "$C" ] || continue
    echo "  -- $v"
    grep -v '^#\|^## \|^Caused by\|^\s*\.\.\.\|^java.lang.ClassNotFound\|^Could not load\|^Turn on\|^java.lang.Throwable\|^Context:\|^$\|^PROBE-K' "$C" | sed 's/^/     /'
  done
done
