#!/bin/bash
# Skeptic: independent reproduction on the batch base 49ee5e91, then restore.
# Does NOT source explorations/experiment/env.sh (its rm -rf /tmp/fortress*rats would hit the
# parallel R2 agent); sets the same variables by hand instead.
set -u
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
export FORTRESS_HOME=/home/user/fortress-r1
unset JAVA_TOOL_OPTIONS
export TMPDIR=/home/user/fortress-r1/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=/home/user/fortress-r1/tmp"
cd "$FORTRESS_HOME" || exit 1
P="$FORTRESS_HOME/explorations/compile-ladder/repair-r1-atomic-static/probes/skeptic"
OUT="$P/skeptic-basetree.txt"
LOG=/home/user/fortress-r1/tmp/skeptic-basetree
FILES="ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java \
ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java \
ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/MutableFValue.java \
ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java"

PROGS="MutableTopLevelVarInLoop AtomicTopLevelVar SK18Trait SK21TraitNoAtomic SK20LocalTrait SK12ArmAtomic SK13LocalArmAtomic SK7TaskNest SK15String SK16LocalString SK2Closure SK5InitFwd SK3Throw SK19ThrowLocal SK1Tuple SK17ZZ64 SK4Nested SK9While SK8Swap"

rebuild_cache () {
  rm -rf "$FORTRESS_HOME/default_repository/caches"
  mkdir -p "$FORTRESS_HOME/default_repository/caches"
  cd "$FORTRESS_HOME/ProjectFortress" || exit 1
  for lib in LibraryBuiltin/AnyType.fss LibraryBuiltin/CompilerBuiltin.fss \
             ../Library/CompilerLibrary.fss ../Library/CompilerAlgebra.fss \
             ../Library/CompilerSystem.fss ; do
    s=$(date +%s)
    ../bin/fortress compile "$lib" > "$LOG-cache.log" 2>&1
    echo "  cache $lib exit=$? $(( $(date +%s) - s ))s" >> "$OUT"
  done
  cd "$FORTRESS_HOME" || exit 1
}

run_set () {
  local tag="$1"
  cd "$FORTRESS_HOME/ProjectFortress" || exit 1
  # copy the probe sources in (compiler_tests ones are already in the tree)
  cp "$P"/SK*.fss skprobes/ 2>/dev/null
  for n in $PROGS ; do
    case "$n" in
      MutableTopLevelVarInLoop|AtomicTopLevelVar) src="compiler_tests/$n.fss" ;;
      *) src="skprobes/$n.fss" ;;
    esac
    c=$(timeout 900 ../bin/fortress compile "$src" 2>&1); rc=$?
    echo "$tag compile $n exit=$rc :: $(echo "$c" | tr '\n' '|' | cut -c1-250)" >> "$OUT"
    [ $rc -eq 0 ] || continue
    for cfg in 1 4 ; do
      o=$(FORTRESS_THREADS=$cfg timeout 300 ../bin/fortress run "$n" 2>&1 | head -3); rc2=$?
      echo "$tag run     $n THREADS=$cfg :: $(echo "$o" | tr '\n' '|' | cut -c1-250)" >> "$OUT"
    done
  done
  cd "$FORTRESS_HOME" || exit 1
}

: > "$OUT"
echo "skeptic independent base-tree reproduction  start=$(date -Is) nproc=$(nproc)" >> "$OUT"
mkdir -p /home/user/fortress-r1/tmp/skeptic-save
for f in $FILES ; do cp "$f" /home/user/fortress-r1/tmp/skeptic-save/$(basename $f) ; done

echo "--- reverting the four edited sources to 49ee5e91 ---" >> "$OUT"
git checkout 49ee5e91 -- $FILES || { echo "CHECKOUT FAILED" >> "$OUT"; exit 1; }
echo "git diff 49ee5e91 -- ProjectFortress/src : [$(git diff 49ee5e91 --stat -- ProjectFortress/src | tail -1)]" >> "$OUT"

s=$(date +%s)
ant compileAll > "$LOG-build-base.log" 2>&1
echo "ant compileAll (base) exit=$? $(( $(date +%s) - s ))s  tail: $(grep -c 'BUILD SUCCESSFUL' "$LOG-build-base.log")" >> "$OUT"
grep -E "^BUILD" "$LOG-build-base.log" >> "$OUT"
rebuild_cache
run_set "BASE"

echo "--- restoring the landed sources ---" >> "$OUT"
git checkout HEAD -- $FILES || { echo "RESTORE FAILED" >> "$OUT"; exit 1; }
echo "git diff HEAD -- ProjectFortress/src : [$(git diff HEAD --stat -- ProjectFortress/src | tail -1)]" >> "$OUT"
s=$(date +%s)
ant compileAll > "$LOG-build-landed.log" 2>&1
echo "ant compileAll (landed) exit=$? $(( $(date +%s) - s ))s" >> "$OUT"
grep -E "^BUILD" "$LOG-build-landed.log" >> "$OUT"
rebuild_cache
run_set "LANDED"
echo "SKEPTIC_BASETREE_DONE end=$(date -Is)" >> "$OUT"
