#!/usr/bin/env python3
"""walk-shadow.py <tree>: walk's half of the subscripts' bound (designs.py subS1), as three
exact-text edits of the tree's own FTypeTuple.java, for a scratch worktree only (revert it
with git checkout and rebuild): a tuple whose elements are each a subtype of the library's
trait Index is a subtype of Index (subtypeOf), its meet with Index is itself (meet), and it
does not exclude Index (excludesOther), as checker-shadow.py's tupleindex makes it a subtype
for the compiled checker. Walk bounds a call's static parameter by the meet of its interval
and its declared bound, so without the meet and the exclusion it refuses every tuple index
at a call of a generic function whose index parameter is bounded by Index: under subS1
alone microGPT's 0.0 MAX m (MicroGptFlat.fss:60) finds no matching overload.
"""
import sys

T = sys.argv[1]
f = T + '/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeTuple.java'
s = open(f, encoding='utf-8').read()
old = """                return subtypeOf(thisl, thatl, 0, min);
            }

        }
        return false;
    }
"""
new = """                return subtypeOf(thisl, thatl, 0, min);
            }

        }
        // PROBE (tupleindex, walk): a tuple of indices is an index
        if (other instanceof FTypeTrait
            && ("Index".equals(other.getName()) || other.getName().endsWith(".Index"))) {
            for (FType t : this.l) if (!t.subtypeOf(other)) return false;
            return true;
        }
        return false;
    }
"""
edits = [(old, new), (
"""        } else if (other instanceof FTypeTuple) {
            FTypeTuple ftt_other = (FTypeTuple) other;
            Set<List<FType>> slf = meet(l, ftt_other.l);
            if (slf.size() == 0) return Collections.<FType>emptySet();
            for (List<FType> lt : slf) {
                result.add(FTypeTuple.make(lt));
            }
        }
        return result;
    }
""",
"""        } else if (other instanceof FTypeTuple) {
            FTypeTuple ftt_other = (FTypeTuple) other;
            Set<List<FType>> slf = meet(l, ftt_other.l);
            if (slf.size() == 0) return Collections.<FType>emptySet();
            for (List<FType> lt : slf) {
                result.add(FTypeTuple.make(lt));
            }
        } else if (subtypeOf(other)) {
            result.add(this); // PROBE (tupleindex, walk): a tuple of indices meets Index at itself
        }
        return result;
    }
"""), (
"""        if (!(other instanceof FTypeTuple)) {
            exclDumpln(" Excludes.  Non-tuple.");
            return true;
        }
""",
"""        if (!(other instanceof FTypeTuple)) {
            if (subtypeOf(other)) return false; // PROBE (tupleindex, walk): a tuple of indices is an index
            exclDumpln(" Excludes.  Non-tuple.");
            return true;
        }
""")]
for a, b in edits:
    n = s.count(a)
    if n != 1:
        sys.exit('walk-shadow: an edit matches %d times in %s: %s' % (n, f, a[:60]))
    s = s.replace(a, b, 1)
open(f, 'w', encoding='utf-8').write(s)
print('walk-shadow: FTypeTuple.subtypeOf, meet and excludesOther edited in ' + f)
