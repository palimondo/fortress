#!/bin/bash
# two-path2.sh <prog.fss>...: the second skeptic's differentials. Each program runs under walk on the flat library (the worktree's)
# and on the base library (e5414f5bf's 15 edited library files as git-show copies beside the program, which shadow the tree's:
# Shell.sourcePath), each at FORTRESS_THREADS=1 and 4 with a fresh private cache per run, three walk JVMs at a time; then on the
# compiled path (fortress compile, then fortress run at 1 and at 4) against the compiler prelude cache built in the first
# judgement (tmp/sk/ccache; the compiler prelude files are untouched by the rung), one program at a time.
set -u
cd /home/user/fortress-flat
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME=/home/user/fortress-flat
unset JAVA_TOOL_OPTIONS
W=/home/user/fortress-flat/tmp/sk2/${TP:-tp}; rm -rf $W; mkdir -p $W/flat $W/base $W/comp $W/out $W/jtmp
for f in $(git diff --name-only e5414f5bf -- Library ProjectFortress/LibraryBuiltin); do git show e5414f5bf:$f > $W/base/$(basename $f); done
export CP=$(./bin/fortress_classpath 2>/dev/null | tail -1) W
bash explorations/compile-ladder/rung-flat-tower/machine.sh "skeptic 2 two-path2"
git log -1 --format='tree at %h'
one () {  # one <lib> <threads> <name>
  C=$W/cache-$1-$2-$3; mkdir -p $C; printf '\0\0\0\0' > $C/global.map
  ( FORTRESS_THREADS=$2 FORTRESS_CACHES=$C timeout -k 10 600 java -Xmx3g -Xss64m -Djava.io.tmpdir=$W/jtmp -Dfile.encoding=UTF-8 -cp "$CP" \
      com.sun.fortress.Shell walk $W/$1/$3.fss < /dev/null 2>&1 | grep -v '^\s*at \|^Picked up\|^Turn on\|^java.lang.Throwable' | sed "s#$W/##g; s#/home/user/fortress-flat/##g" | head -14
    echo "rc=${PIPESTATUS[0]}" ) > $W/out/$3-$1-$2.txt
}
export -f one
for p in "$@"; do n=$(basename $p .fss); cp $p $W/flat/; cp $p $W/base/; cp $p $W/comp/; done
for p in "$@"; do n=$(basename $p .fss); for l in flat base; do for t in 1 4; do echo "$l $t $n"; done; done; done | xargs -P 3 -L 1 bash -c 'one "$0" "$1" "$2"'
C=/home/user/fortress-flat/tmp/sk/ccache
for p in "$@"; do
  n=$(basename $p .fss)
  ( cd $W/comp
    echo "## compile"; FORTRESS_CACHES=$C JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$W/jtmp" timeout 600 /home/user/fortress-flat/bin/fortress compile $n.fss < /dev/null 2>&1 | grep -v '^\s*at \|^Picked up' | sed "s#$W/##g; s#/home/user/fortress-flat/##g" | head -14; echo "compile rc=${PIPESTATUS[0]}"
    for t in 1 4; do
      echo "## run FORTRESS_THREADS=$t"; FORTRESS_THREADS=$t FORTRESS_CACHES=$C JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$W/jtmp" timeout 600 /home/user/fortress-flat/bin/fortress run $n < /dev/null 2>&1 | grep -v '^\s*at \|^Picked up' | sed "s#$W/##g; s#/home/user/fortress-flat/##g" | head -14; echo "run rc=${PIPESTATUS[0]}"
    done ) > $W/out/$n-comp.txt
done
for p in "$@"; do
  n=$(basename $p .fss)
  echo; echo "######## $n ($p)"
  for l in flat base; do for t in 1 4; do echo "=== $n walk $l library FORTRESS_THREADS=$t"; cat $W/out/$n-$l-$t.txt; done; done
  echo "=== $n compiled path"; cat $W/out/$n-comp.txt
done
echo "done $(date -u +%FT%TZ)"
