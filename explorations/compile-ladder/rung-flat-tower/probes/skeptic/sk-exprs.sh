#!/bin/bash
# sk-exprs.sh <list-file> <out-label> <threads...>: the skeptic's walk differentials for rung F. One program per
# expression of <list-file> (component SkE<n>, helpers vec3 and M7 beside run), each run under walk on the flat
# library (the worktree's) and on the base library (e5414f5bf, git-show copies in the program's directory, which
# shadow the tree's: Shell.sourcePath), at each thread count given. Private caches; one JVM per run.
set -u
cd "$(dirname "$0")/../../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)"
unset JAVA_TOOL_OPTIONS
L=$1; shift; LABEL=$1; shift
W=tmp/sk; mkdir -p $W/flat $W/base $W/jtmp
for d in flat base; do [ -f $W/cache-e-$d/global.map ] || { mkdir -p $W/cache-e-$d; printf '\0\0\0\0' > $W/cache-e-$d/global.map; }; done
[ -f $W/base/FortressLibrary.fss ] || for f in $(git diff --name-only e5414f5bf -- Library ProjectFortress/LibraryBuiltin); do git show e5414f5bf:$f > $W/base/$(basename $f); done
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
bash explorations/compile-ladder/rung-flat-tower/machine.sh "$LABEL"
n=0
while IFS= read -r expr; do
  [ -z "$expr" ] && continue
  n=$((n+1)); c="SkE$n"
  for d in flat base; do
    cat > $W/$d/$c.fss <<FSS
component $c
export Executable
vec3(): Vector[\\RR64,3\\] = do v = vector[\\RR64,3\\](); v[0] := 1.0; v[1] := 2.0; v[2] := 3.0; v end
object M7(v: ZZ32) extends AdditiveGroup[\\M7\\]
    getter asString(): String = "M7(" v ")"
    opr +(self, o: M7): M7 = M7((v + o.v) MOD 7)
    opr -(self): M7 = M7((7 - v) MOD 7)
end
run() = do
    r = $expr
    println(r.asString " : " r.ilkName)
end
end
FSS
  done
  for t in "$@"; do
    for d in flat base; do
      out=$(FORTRESS_THREADS=$t FORTRESS_CACHES=$W/cache-e-$d timeout -k 10 300 java -Xmx4g -Xss64m -Djava.io.tmpdir=$W/jtmp -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell walk $W/$d/$c.fss 2>&1 < /dev/null)
      rc=$?
      if [ $rc -eq 0 ]; then echo "E$n $d t$t | $expr | ran: $(printf '%s\n' "$out" | grep -v '^$' | head -1)"
      else echo "E$n $d t$t | $expr | refused rc=$rc: $(printf '%s\n' "$out" | grep -v '^\s*at \|^Turn on\|^java.lang.Throwable\|^Context:\|^$' | head -3 | tr '\n' ' ' | sed 's#/home/user/fortress-flat/##g' | cut -c1-260)"; fi
    done
  done
done < "$L"
echo "done $(date -u +%FT%TZ)"
