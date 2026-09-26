# Variant: only the diamond declarations (the library's copy/map pattern), nothing else.
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from edits import *
save(meet(load()))
