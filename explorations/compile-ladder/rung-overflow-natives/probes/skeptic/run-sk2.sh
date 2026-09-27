#!/bin/bash
# run-sk2.sh: the second judgement's differentials, through run-sk.sh at one thread (the rung writes no mutable
# state). Runs that share a cache directory (one per way) are not run at the same time.
set -u
cd "$(dirname "$0")"
./run-sk.sh walk-stock Sk2RangeW & ./run-sk.sh walk-edit Sk2RangeW & ./run-sk.sh compiled Sk2RangeC & wait
./run-sk.sh walk-stock Sk2RangeC & ./run-sk.sh walk-edit Sk2RangeC & wait
