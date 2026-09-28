#!/bin/bash
# compare.sh <before-label> <after-label> <list-file>: link and run verdicts, run outputs and class files, per test.
FH=/home/user/fortress-genrt; A=$FH/tmp/measure/$1; B=$FH/tmp/measure/$2
echo "# before: $(head -1 $A/machine.txt | cut -c1-200)"; sed -n 2p $A/machine.txt
echo "# after:  $(head -1 $B/machine.txt | cut -c1-200)"; sed -n 2p $B/machine.txt
while read -r t; do
  [ -n "$t" ] || continue
  n=${t#*/}
  la=$(tail -1 $A/$n.link); lb=$(tail -1 $B/$n.link)
  line="$t | link $la -> $lb"
  for th in 1 4; do
    ra=$( [ -f $A/$n.run$th ] && tail -1 $A/$n.run$th || echo none ); rb=$( [ -f $B/$n.run$th ] && tail -1 $B/$n.run$th || echo none )
    if [ -f $A/$n.run$th ] && [ -f $B/$n.run$th ] && cmp -s $A/$n.run$th $B/$n.run$th; then o=same; else o=DIFF; fi
    [ "$ra" = none ] && [ "$rb" = none ] && o=none
    line="$line | threads=$th run $ra -> $rb, output $o"
  done
  if [ -d $A/$n.classes ] && [ -d $B/$n.classes ]; then
    d=$(diff -rq $A/$n.classes $B/$n.classes | wc -l); c=$(ls $A/$n.classes | wc -l)
    [ "$d" -eq 0 ] && line="$line | classes identical ($c files)" || line="$line | classes DIFFERENT: $d of $c files"
  else line="$line | classes: no jar"; fi
  echo "$line"
done < $3
