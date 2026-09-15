#!/bin/bash
# Runs one probe from this directory: ./run.sh Name [cold]
# Output goes to Name.out on exit 0, otherwise to the next free Name.out.N.
# "cold" wipes the probe's own cache entries first (gap ledger row 98: the
# Meet-Rule rejection fires only on a cold parsed cache).
source /home/user/fortress/experiment/env.sh
export FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/run-c4/src:$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:$FORTRESS_HOME/ProjectFortress/test_library"
cd "$(dirname "$0")"
name=$1
if [ "$2" = cold ]; then rm -f "$FORTRESS_HOME"/default_repository/caches/*_cache/"$name"-*; fi
tmp=$name.out.tmp
start=$(date +%s)
"$FORTRESS_HOME/bin/fortress" "$name.fss" > "$tmp" 2>&1
code=$?
echo "exit $code  ($(( $(date +%s) - start )) s)" >> "$tmp"
if [ $code -eq 0 ]; then mv "$tmp" "$name.out"; echo "$name: OK -> $name.out"
else n=0; while [ -e "$name.out.$n" ]; do n=$((n+1)); done; mv "$tmp" "$name.out.$n"; echo "$name: FAIL -> $name.out.$n"; fi
