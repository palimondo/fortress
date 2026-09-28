#!/bin/bash
# jar-compare.sh <dir-A> <dir-B>: every entry of each jar of the compiler library, A against B, byte for byte.
A=$1; B=$2
for j in $(ls $A); do
  python3 - "$A/$j" "$B/$j" <<'PY'
import zipfile, sys
a, b = zipfile.ZipFile(sys.argv[1]), zipfile.ZipFile(sys.argv[2])
na, nb = set(a.namelist()), set(b.namelist())
name = sys.argv[1].rsplit('/', 1)[1]
diff = sorted(n for n in na & nb if a.read(n) != b.read(n))
print("%s: %d entries before, %d after; only before %d, only after %d; differing %d" % (name, len(na), len(nb), len(na - nb), len(nb - na), len(diff)))
for n in sorted(na - nb): print("  only before: " + n)
for n in sorted(nb - na): print("  only after: " + n)
for n in diff: print("  differs: " + n)
PY
done
