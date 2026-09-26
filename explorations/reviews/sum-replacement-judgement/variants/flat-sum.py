# Variant "flat-sum": the flat tower (flat.py) with the SUM/PROD replacement (sumlib.py),
# the bounds the library's own generic reductions use, an algebra trait of T
# (BIG MAX's StandardMax[\T\]): T extends AdditiveGroup[\T\] for SUM, MultiplicativeRing[\T\]
# for PROD, which every number leaf carries on the flat tower.  For the checker probes.
import os, runpy, sys
sys.path.insert(0, os.path.dirname(__file__))
runpy.run_path(os.path.join(os.path.dirname(__file__), "flat.py"))
import sumlib
sumlib.apply(sys.argv[1], "AdditiveGroup[\\T\\]", "MultiplicativeRing[\\T\\]")
