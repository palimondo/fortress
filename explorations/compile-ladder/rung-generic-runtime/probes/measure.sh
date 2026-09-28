#!/bin/bash
# measure.sh <label> <list-file>: for each corpus/Name in the list, the program's own cache entries deleted, then
# fortress link, the jar's class files extracted, and fortress run at FORTRESS_THREADS=1 and =4, into
# tmp/measure/<label>/.  compare.sh reads two labels.
source /home/user/fortress-genrt/explorations/compile-ladder/rung-generic-runtime/probes/common.sh
L=$1; LIST=$2; O=$FH/tmp/measure/$L; rm -rf $O; mkdir -p $O
machine > $O/machine.txt
while read -r t; do
  [ -n "$t" ] || continue
  d=${t%%/*}; n=${t#*/}
  clean $n
  (cd $FH/ProjectFortress && timeout -k 5 300 ../bin/fortress link $d/$n.fss > $O/$n.link 2>&1; echo "exit=$?" >> $O/$n.link)
  j=$FH/default_repository/caches/bytecode_cache/$n.jar
  if [ -f "$j" ]; then
    mkdir -p $O/$n.classes; (cd $O/$n.classes && python3 -c "
import zipfile,sys
z=zipfile.ZipFile(sys.argv[1])
for i in z.namelist():
    open(i.replace('/','_'),'wb').write(z.read(i))" "$j")
    for th in 1 4; do
      (cd $FH/ProjectFortress && FORTRESS_THREADS=$th timeout -k 5 120 ../bin/fortress run $n 2>&1 | filt | sed -e 's/@[0-9a-f]\{4,\}/@HASH/g' > $O/$n.run$th; echo "exit=${PIPESTATUS[0]}" >> $O/$n.run$th)
    done
  fi
  echo "$t done: $(tail -1 $O/$n.link) $( [ -f $O/$n.run1 ] && tail -1 $O/$n.run1 )"
  clean $n
done < $LIST
