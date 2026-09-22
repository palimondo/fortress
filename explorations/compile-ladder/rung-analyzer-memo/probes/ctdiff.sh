#!/bin/bash
# usage: ctdiff.sh <outdir> <names-file> ; compiles each named compiler_tests unit (names from ct-names.py), one capture per unit
out=$1; names=$2; mkdir -p $out
cd /home/user/fortress-memo/ProjectFortress/compiler_tests
for t in $(cat $names); do
  o=$out/$(echo $t | tr / _).txt
  [ -f $t.fss ] || { echo "NOFILE $t" > $o ; continue ; }
  timeout 300 ../../bin/fortress compile $t.fss > $o 2>&1
  echo "rc=$?" >> $o
done
