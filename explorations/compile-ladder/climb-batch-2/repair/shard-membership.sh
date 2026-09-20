#!/bin/bash
# testSystem shard membership by FileTests.java:790-806 and :811-840: dir.list() of ProjectFortress/tests, sorted, index j kept by shard j % 4, a test per kept .fss or .sh
cd "$(git rev-parse --show-toplevel)" || exit 1
for rev in "$@" ; do
    echo "== $rev"
    git ls-tree --name-only "$rev" ProjectFortress/tests/ | sed 's|.*/||' | LC_ALL=C sort |
    awk -v N=4 '{
        j = NR - 1 ; s = j % N ; kept[s]++
        if ($0 ~ /Syntax\.fss$/ || $0 ~ /DynamicSemantics\.fss$/ || $0 ~ /Satisfiability\.fss$/ || $0 ~ /GenomeUtil/) { skip[s]++ ; next }
        if ($0 ~ /^\./) { hidden[s]++ ; next }
        if ($0 ~ /\.fss$/ || $0 ~ /\.sh$/) { tests[s]++ } else { other[s]++ ; names[s] = names[s] " " $0 }
      }
      END { printf "entries %d\n", NR
            for (s = 0 ; s < N ; s++) printf "shard %d: %d files kept, %d tests, %d filtered, %d hidden, %d other(%s)\n", s, kept[s], tests[s], skip[s], hidden[s], other[s], names[s]
            printf "sum %d\n", tests[0] + tests[1] + tests[2] + tests[3] }'
done
echo "== on-disk top-level entries of ProjectFortress/tests against the tracked ones at HEAD"
diff <(ls -A ProjectFortress/tests | LC_ALL=C sort) <(git ls-tree --name-only HEAD ProjectFortress/tests/ | sed 's|.*/||' | LC_ALL=C sort) && echo IDENTICAL
echo "== the entries added between a0fcf0a96 and HEAD"
diff <(git ls-tree --name-only a0fcf0a96 ProjectFortress/tests/ | LC_ALL=C sort) <(git ls-tree --name-only HEAD ProjectFortress/tests/ | LC_ALL=C sort)
