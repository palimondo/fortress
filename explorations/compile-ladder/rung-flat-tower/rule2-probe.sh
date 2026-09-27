#!/bin/bash
# rule2-probe.sh <site-list> <flat|base> <out-label>: the repair round's probe of rule 2's S sites (REPORT.md section 2).
# One program per site (walk's dispatch failures are Java ProgramErrors, which a Fortress try/catch does not catch,
# so each site gets its own JVM in place of its own try/catch). Each program binds the site's result, prints it with
# its run-time class, then uses it as its declared type and prints that. <site-list> lines are
#   site | imports (or -) | site expression | use expression over r [| top-level declarations]
# "flat" runs on the worktree's library; "base" on e5414f5bf's copies of the library files this rung edits, as
# git-show copies beside the program, which shadow the tree's (Shell.sourcePath). Private caches, FORTRESS_THREADS=1.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)"
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=1
L=$1; D=$2; LABEL=$3
W=tmp/r2/rule2/$D; mkdir -p $W/jtmp $W/cache; [ -f $W/cache/global.map ] || printf '\0\0\0\0' > $W/cache/global.map
if [ "$D" = base ] && [ ! -f $W/FortressLibrary.fss ]; then
  for f in $(git diff --name-only e5414f5bf HEAD -- Library ProjectFortress/LibraryBuiltin); do git show e5414f5bf:$f > $W/$(basename $f); done
fi
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
bash explorations/compile-ladder/rung-flat-tower/machine.sh "$LABEL"
n=0
while IFS='|' read -r site imp sexpr uexpr decls; do
  site=$(echo $site); [ -z "$site" ] && continue; case "$site" in \#*) continue;; esac
  n=$((n+1)); c="Rr2S$n"
  imp=$(echo $imp); [ "$imp" = "-" ] && imp=""
  { echo "component $c"; [ -n "$imp" ] && echo "$imp" | tr ';' '\n'; echo "export Executable"; [ -n "$(echo ${decls:-})" ] && echo "$decls" | tr ';' '\n'
    echo "run() = do"; echo "    r = $sexpr"; echo '    println("site: " r " : " r.ilkName)'
    echo "    u = $uexpr"; echo '    println("use: " u " : " u.ilkName)'; echo "  end"; echo "end"; } > $W/$c.fss
  out=$(FORTRESS_CACHES=$W/cache timeout -k 10 300 java -Xmx4g -Xss64m -Djava.io.tmpdir=$W/jtmp -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell walk $W/$c.fss 2>&1 < /dev/null)
  rc=$?
  lines=$(printf '%s\n' "$out" | grep '^site: \|^use: ' | tr '\n' ' ')
  err=""
  [ $rc -ne 0 ] && err=$(printf '%s\n' "$out" | grep -v '^\s*at \|^Turn on\|^java.lang.Throwable\|^Context:\|^$\|^site: \|^use: \|^\s*[-+a-zA-Z_|^]*(.*fn meth\|^\s*}' | head -2 | tr '\n' ' ' | sed "s#$(pwd)/##g" | cut -c1-230)
  echo "$site | $D | rc=$rc | $sexpr | $uexpr | $lines$err"
done < "$L"
echo "done $(date -u +%FT%TZ)"
