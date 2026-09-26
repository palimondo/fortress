# Variant "flat": the keep note's FLAT copy (explorations/reviews/mie-probes/keep/
# make-flat-lib.py, flat-tower-sketch.fsi's 14 headers: the number types siblings under a
# Number without algebra, widening by coerce, the reductions without DistributesOver) laid
# over the copy's FortressLibrary.{fsi,fss} and FortressBuiltin.{fsi,fss}.  The control
# for the checker probes: today's SUM on the flat tower.
import os, shutil, subprocess, sys
ROOT = sys.argv[1]
FH = os.environ["FORTRESS_HOME"]
libs = os.path.join(ROOT, "flatlibs")
subprocess.check_call([sys.executable, os.path.join(FH, "explorations/reviews/mie-probes/keep/make-flat-lib.py"), libs],
                      cwd=FH, stdout=subprocess.DEVNULL)
for name, dst in (("FortressLibrary.fsi", "Library"), ("FortressLibrary.fss", "Library"),
                  ("FortressBuiltin.fsi", "LibraryBuiltin"), ("FortressBuiltin.fss", "LibraryBuiltin")):
    shutil.copy(os.path.join(libs, "FLAT", name), os.path.join(ROOT, dst, name))
