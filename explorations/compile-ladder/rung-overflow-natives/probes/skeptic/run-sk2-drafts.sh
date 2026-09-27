#!/bin/bash
# run-sk2-drafts.sh: the drafts of the second judgement's required corrections 2 and 3, walk on the stock
# classes and on the edit, through run-sk.sh, one thread. Runs sharing a cache directory are not concurrent.
set -u
cd "$(dirname "$0")"
./run-sk.sh walk-stock Sk2EmptyHashDraft & ./run-sk.sh walk-edit Sk2EmptyHashDraft & wait
./run-sk.sh walk-stock Sk2SizeNN32Draft & ./run-sk.sh walk-edit Sk2SizeNN32Draft & wait
