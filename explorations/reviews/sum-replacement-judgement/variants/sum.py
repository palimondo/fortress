# Variant "sum": today's nested tower with the SUM/PROD replacement (sumlib.py), the bound
# T extends Number, since on today's tower ZZ32 is an AdditiveGroup[\Number\], not its own.
# For the interpreter probe.
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
import sumlib
sumlib.apply(sys.argv[1], "Number", "Number")
