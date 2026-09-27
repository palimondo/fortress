#!/bin/bash
# bare-sum.sh <library-dir-or-"tree"> <work-dir> <label>: a bare big operator over a list whose element type
# walk takes from its elements' run-time class (ledger row 20), under walk, one program per spelling.
# With "tree" the programs run against the worktree's library; with a directory holding a copy of the base
# library (Library/*.fs? and FortressBuiltin.fs?, made by git show) they run from that directory, whose files
# then shadow the tree's (Shell.sourcePath, ProjectFortress/src/com/sun/fortress/Shell.java:1175-1188).
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
LIB=$1; W=$(mkdir -p "$2" && cd "$2" && pwd); L=$3
if [ "$LIB" = tree ]; then P="$W/progs"; else P=$(cd "$LIB" && pwd); fi
mkdir -p "$P" "$W/caches" "$W/tmp"; [ -f "$W/caches/global.map" ] || printf '\0\0\0\0' > "$W/caches/global.map"
bash explorations/compile-ladder/rung-flat-tower/machine.sh "$L"
n=0
while IFS= read -r expr; do
  n=$((n+1)); c="BareSumP$n"
  printf 'component %s\nimport List.{...}\nexport Executable\nrun() = do\n    r = %s\n    println(r.asString " : " r.ilkName)\nend\nend\n' "$c" "$expr" > "$P/$c.fss"
  out=$(FORTRESS_CACHES="$W/caches" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$W/tmp" timeout 300 ./bin/fortress "$P/$c.fss" 2>&1 < /dev/null)
  rc=$?
  if [ $rc -eq 0 ]; then echo "$expr: ran, $(printf '%s\n' "$out" | grep -m1 -v '^$')"
  else echo "$expr: refused (rc=$rc), $(printf '%s\n' "$out" | grep -m1 -A1 'ProgramError\|Error:' | tr '\n' ' ' | cut -c1-230)"; fi
done <<'LIST'
SUM <|1, 2, 3|>
BIG MAX <|1, 2, 3|>
PROD <|1, 2, 3|>
SUM <|[\ZZ32\] 1, 2, 3|>
BIG MAX <|[\ZZ32\] 1, 2, 3|>
SUM <|1.5, 2.5|>
SUM <|[\RR64\] 1.5, 2.5|>
SUM <| n^2 | n <- 1#3 |>
SUM <|[\ZZ32\] n^2 | n <- 1#3 |>
LIST
