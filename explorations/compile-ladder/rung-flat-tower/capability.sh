#!/bin/bash
# capability.sh <library-dir-or-"tree"> <work-dir> <label> [leaf]: each operation of Vector, Matrix and the
# scalar-extension block run under walk on each number leaf, one program per (leaf, operation), four JVMs at a
# time with a private cache each, FORTRESS_THREADS=1.  Prints "<leaf> <op>: ran, <result>" or "refused (rc)"
# with the error's first line.  With "tree" the programs run against the worktree's library; with a directory
# holding a git-show copy of the base library they are written into it and run from it, so that the copy
# shadows the tree's library (Shell.sourcePath, as bare-sum.sh).  The elements are built with conversions both
# libraries have (widen, unsigned, big, the integer quotient for QQ, and a float literal added to an integer).
# With [leaf], only that leaf's programs are written and run.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
LIB=$1; W=$(mkdir -p "$2" && cd "$2" && pwd); L=$3; ONLY=${4:-}
if [ "$LIB" = tree ]; then P="$W/progs"; else P=$(cd "$LIB" && pwd); fi
mkdir -p "$P" "$W/res"
bash explorations/compile-ladder/rung-flat-tower/machine.sh "$L"
# leaf | element of index i (i: ZZ32) | scalar
LEAVES='ZZ32|i + 1|2
ZZ64|widen(i + 1)|widen(2)
NN32|unsigned(i + 1)|unsigned(2)
NN64|widen(unsigned(i + 1))|widen(unsigned(2))
ZZ|big(i + 1)|big(2)
QQ|big(i + 1) / big(2)|big(3) / big(2)
RR64|0.5 + (i + 1)|2.5'
# name | kind (s scalar, v vector, m matrix) | expression over v, w (Vector[\T,3\]), u (Vector[\T,2\]), m, n (Matrix[\T,2,2\]), s (T)
OPS='vplus|v|v + w
vminus|v|v - w
vneg|v|-v
vscale|v|v.scale(s)
vpmul|v|v.pmul(w)
vdot|s|v.dot(w)
vDOTv|s|v DOT w
svjuxt|v|s v
squaredNorm|s|squaredNorm(v)
norm|s|||v||
mplus|m|m + n
mminus|m|m - n
mneg|m|-m
mscale|m|m.scale(s)
mjuxt|m|m n
rmul|v|m.rmul(u)
lmul|v|m.lmul(u)
mt|m|m.t()
matrixv|m|matrix[\T,2,2\](s)
arrplus|v|v + s
scalminus|v|s - v
arrmin|v|v MIN s
scalmax|v|s MAX v'
n=0; : > "$W/jobs.txt"
while IFS='|' read -r T E S; do
  [ -n "$ONLY" ] && [ "$T" != "$ONLY" ] && { n=$((n + $(printf "%s\n" "$OPS" | wc -l))); continue; }
  while IFS='|' read -r O K X; do
    n=$((n+1)); c="Cap${n}"
    X=${X//\[\\T/[\\$T}
    case $K in
      s) show='println(r.asString " : " r.ilkName)' ;;
      v) show='println(r.asString " elem " (r[0]).ilkName)' ;;
      m) show='println(r.asString " elem " (r[0,0]).ilkName)' ;;
    esac
    printf '%s\n' "component $c" "export Executable" "run() = do" \
      "    v: Vector[\\$T,3\\] = vector[\\$T,3\\](fn (i:ZZ32):$T => $E)" \
      "    w: Vector[\\$T,3\\] = vector[\\$T,3\\](fn (i:ZZ32):$T => $E)" \
      "    u: Vector[\\$T,2\\] = vector[\\$T,2\\](fn (i:ZZ32):$T => $E)" \
      "    m: Matrix[\\$T,2,2\\] = matrix[\\$T,2,2\\]()" \
      "    n: Matrix[\\$T,2,2\\] = matrix[\\$T,2,2\\]()" \
      "    for a <- seq(0#2), b <- seq(0#2) do k: ZZ32 = a + b; m[a,b] := (fn (i:ZZ32):$T => $E)(k); n[a,b] := (fn (i:ZZ32):$T => $E)(k + 1) end" \
      "    s: $T = $S" \
      "    r = $X" \
      "    $show" "end" "end" > "$P/$c.fss"
    echo "$c|$T|$O" >> "$W/jobs.txt"
  done <<< "$OPS"
done <<< "$LEAVES"
for k in 0 1 2 3; do
  ( mkdir -p "$W/caches-$k" "$W/tmp-$k"; [ -f "$W/caches-$k/global.map" ] || printf '\0\0\0\0' > "$W/caches-$k/global.map"
    awk -v k=$k 'NR % 4 == k' "$W/jobs.txt" | while IFS='|' read -r c T O; do
      out=$(FORTRESS_CACHES="$W/caches-$k" JAVA_FLAGS="-Xmx2g -Xss64m -Djava.io.tmpdir=$W/tmp-$k" timeout 300 ./bin/fortress "$P/$c.fss" 2>&1 < /dev/null)
      rc=$?
      if [ $rc -eq 0 ]; then echo "$T $O: ran, $(printf '%s\n' "$out" | grep -m1 -v '^$')"
      else echo "$T $O: refused (rc=$rc), $(printf '%s\n' "$out" | grep -v '^WARNING\|^$\|^\s*at ' | grep -m1 . | sed "s#$P/##g" | cut -c1-200)"; fi > "$W/res/$c.txt"
    done ) &
done
wait
while IFS='|' read -r c T O; do cat "$W/res/$c.txt"; done < "$W/jobs.txt"
