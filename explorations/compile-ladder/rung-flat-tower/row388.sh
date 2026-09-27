#!/bin/bash
# row388.sh <library-dir-or-"tree"> <work-dir> <label>: row 388's consequence under walk, one program per
# spelling so that a refused spelling does not hide the next.  With "tree" the programs run against the
# worktree's library; with a directory holding a copy of Library/*.fs? and FortressBuiltin.fs? (made from
# a commit by git show) they run from that directory, whose files then shadow the tree's (Shell.sourcePath,
# ProjectFortress/src/com/sun/fortress/Shell.java:1175-1188).  Private caches; machine line first.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
LIB=$1; W=$(mkdir -p "$2" && cd "$2" && pwd); L=$3
if [ "$LIB" = tree ]; then P="$W/progs"; else P=$(cd "$LIB" && pwd); fi
mkdir -p "$P" "$W/caches" "$W/tmp"; [ -f "$W/caches/global.map" ] || printf '\0\0\0\0' > "$W/caches/global.map"
bash explorations/compile-ladder/rung-flat-tower/machine.sh "$L"
n=0
while IFS='|' read -r name expr; do
  n=$((n+1)); c="Row388P$n"
  cat > "$P/$c.fss" <<FSS
component $c
export Executable
run() = do
    m = matrix[\\RR64,2,2\\]()
    m[0,0] := 1.5
    m[0,1] := 2.0
    m[1,0] := 0.5
    m[1,1] := 4.0
    i: ZZ32 = 3
    a: Array[\\RR64,ZZ32\\] = array[\\RR64\\](2)
    a[0] := 1.5
    a[1] := 0.25
    r = $expr
    println("$name = " r.asString " : " r.ilkName)
end
end
FSS
  out=$(FORTRESS_CACHES="$W/caches" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$W/tmp" timeout 300 ./bin/fortress "$P/$c.fss" 2>&1 < /dev/null)
  rc=$?
  first=$(printf '%s\n' "$out" | grep -v '^	at ' | grep -m1 -v '^$')
  if [ $rc -eq 0 ]; then echo "$name: ran, $first"; else echo "$name: refused (rc=$rc), $(printf '%s\n' "$out" | grep -m1 -A1 'ProgramError\|Error:' | tr '\n' ' ' | cut -c1-260)"; fi
done <<'LIST'
m.scale(i)[0,0]|(m.scale(i))[0,0]
(m i)[0,0]|(m i)[0,0]
(i m)[0,0]|(i m)[0,0]
(m DOT i)[0,0]|(m DOT i)[0,0]
(a + i)[1]|(a + i)[1]
(i + a)[1]|(i + a)[1]
(a - i)[1]|(a - i)[1]
(i - a)[1]|(i - a)[1]
(a MIN i)[0]|(a MIN i)[0]
(i MAX a)[0]|(i MAX a)[0]
(a + 1.0)[1]|(a + 1.0)[1]
(m 2.0)[0,0]|(m 2.0)[0,0]
LIST
