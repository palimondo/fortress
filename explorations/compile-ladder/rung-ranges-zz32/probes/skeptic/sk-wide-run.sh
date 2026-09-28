#!/bin/bash
# sk-wide-run.sh: every probe under probes/skeptic/wide/ through sk-walk2.sh (base library and tree library), one thread.
D=$(cd "$(dirname "$0")" && pwd)
for f in "$D"/wide/*.fss; do bash "$D/sk-walk2.sh" "$f" 1 > "${f%.fss}.txt" 2>&1; done
