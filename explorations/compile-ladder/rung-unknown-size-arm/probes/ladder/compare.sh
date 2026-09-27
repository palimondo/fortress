#!/bin/bash
# the ladder subset before against after, file by file: compile exit, run exit, run stdout, compile output; stdout masked with the gate's ladder_filter (coordinator/climb-batch-workflow.js:1117, "Operation took <time>ms"); compile output with the worktree path and the line numbers of Scala and Java stack frames masked, since the edit moves the lines of Functionals.scala
# usage: bash compare.sh <before-out-dir> <after-out-dir>   (the LADDER_OUT directories of the two passes of run-subset.sh)
B="$1"; A="$2"
ladder_filter () { sed -E 's/Operation took [0-9.]+ms/Operation took <time>ms/' "$1" 2>/dev/null ; }
awk -F'\t' 'NR==FNR { cb[$1"/"$2]=$4; rb[$1"/"$2]=$5; next } { k=$1"/"$2; printf "%s\t%s\t%s\t%s\t%s\n", k, cb[k], $4, rb[k], $5 }' "$B/results.tsv" "$A/results.tsv" |
while IFS=$'\t' read -r k cb ca rb ra; do
  so="(no run)"
  if [ -f "$B/raw/$k.run" ] || [ -f "$A/raw/$k.run" ]; then
    if cmp -s <(ladder_filter "$B/raw/$k.run") <(ladder_filter "$A/raw/$k.run"); then so="same"; else so="DIFFERENT"; fi
  fi
  cmask () { sed -E "s#$FORTRESS_HOME/##g; s/\(([A-Za-z0-9_\$]+\.(scala|java)):[0-9]+\)/(\1:<line>)/g" "$1" ; }
  if cmp -s <(sed "s#$FORTRESS_HOME/##g" "$B/raw/$k.compile") <(sed "s#$FORTRESS_HOME/##g" "$A/raw/$k.compile"); then co="same"
  elif cmp -s <(cmask "$B/raw/$k.compile") <(cmask "$A/raw/$k.compile"); then co="same but for stack-frame line numbers"
  else co="DIFFERENT"; fi
  printf '%s\tcompile %s -> %s\trun %s -> %s\tstdout %s\tcompile-output %s\n' "$k" "$cb" "$ca" "${rb:--}" "${ra:--}" "$so" "$co"
done
echo "# totals: before $(awk -F'\t' '$4==0&&$5==0' "$B/results.tsv" | wc -l) of $(wc -l < "$B/results.tsv") compile and run with exit 0, after $(awk -F'\t' '$4==0&&$5==0' "$A/results.tsv" | wc -l) of $(wc -l < "$A/results.tsv")"
