// RangeBody -- the body of a loop over a range of indices, lo inclusive to hi
// exclusive: what FlatArrays.forRange runs.  The baseline calls it once on the
// whole range; the fork/join variant calls it on each piece that it does not split.
interface RangeBody {
    void run(int lo, int hi);
}
