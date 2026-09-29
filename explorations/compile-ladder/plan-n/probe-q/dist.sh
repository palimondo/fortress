#!/bin/bash
# dist.sh <variant> : the gate's distance stage (explorations/coordinator/tools/distance/run.sh, run
# unchanged but for two edits of a copy) over the library of the private home $X/home-<variant>:
#   D, the stage's own scripts, from the worktree (the home holds no explorations/coordinator);
#   -Dfortress.autohome=<home> on the checker's JVM, so that the apis the twelve components import
#   are the home's (the classpath probe resolves the build's symlink to the worktree's stock library).
# -> captures/distance-<variant>.txt (the table), captures/distance-<variant>-sites.tsv (errors.py's
#    one row per error), compared with the last landed gate's table and sites by compare.sh.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
V=${1:?variant}; FH=$X/home-$V; S=$X/dist-$V
sed -e "s|^D=\"\$FH/explorations/coordinator/tools/distance\"|D=\"$W/explorations/coordinator/tools/distance\"|" \
    -e "s|timeout -k 30 5400 java -Xmx4g|timeout -k 30 5400 java -Dfortress.autohome=$FH -Xmx4g|" \
    "$W/explorations/coordinator/tools/distance/run.sh" > "$X/dist-run.sh"
grep -c "fortress.autohome=$FH" "$X/dist-run.sh" | grep -q 1 || { echo "autohome edit did not match"; exit 1; }
grep -c "^D=\"$W/" "$X/dist-run.sh" | grep -q 1 || { echo "D edit did not match"; exit 1; }
( cd "$FH" && FORTRESS_HOME=$FH bash "$X/dist-run.sh" "$O/captures/distance-$V.txt" "$S" any )
cp "$S/errors.tsv" "$O/captures/distance-$V-sites.tsv" 2>/dev/null
bash "$W/explorations/coordinator/tools/distance/compare.sh" \
     "$W/explorations/compile-ladder/climb-batch-N/gate/distance.txt" "$O/captures/distance-$V.txt" \
     > "$O/captures/distance-$V-compare.txt"
cat "$O/captures/distance-$V-compare.txt"
