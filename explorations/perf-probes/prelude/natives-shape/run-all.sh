#!/bin/bash
# Every command of the natives shape probe, in order, from a worktree with
# ProjectFortress/build in place.  Private caches under tmp/, shadows under tmp/;
# nothing in the tree changes.  At most two JVMs at a time.
set -u
cd "$(dirname "$0")/../../../.."
D=explorations/perf-probes/prelude/natives-shape
G="$D/patches/gap1-namingczar-table.patch $D/patches/gap2-driver-cast.patch $D/patches/gap3-desugarer-qualified-ref.patch $D/patches/gap4-reflective-closure.patch $D/patches/gap4b-foreign-closure-params.patch"
walk() {  # walk LABEL SHADOW CACHE PROGRAM OUT
  { echo "\$ run-shadow.sh $2 $D/$4.fss   ($1)"; $D/run-shadow.sh $2 $3 $D/$4.fss; echo "### rc=$?"; } >> $5 2>&1; }

# 1. the unchanged tree, walk; 2. the compiled control (prelude chain into a private cache)
$D/step1-baseline.sh
$D/step2-control.sh
# 3. the gaps patched one at a time (shadows are cumulative)
set -- $G
$D/make-shadow.sh tmp/shadow-g1 $1;               for p in NativesShape NativesShapeOne; do rm -f $D/04-$p-g1.out; mkdir -p tmp/caches-g1; walk "gap 1 patched" tmp/shadow-g1 tmp/caches-g1 $p $D/04-$p-g1.out; done
$D/make-shadow.sh tmp/shadow-g12 $1 $2;           rm -f $D/05-NativesShape-g12.out; mkdir -p tmp/caches-g12; walk "gaps 1 and 2 patched" tmp/shadow-g12 tmp/caches-g12 NativesShape $D/05-NativesShape-g12.out
$D/make-shadow.sh tmp/shadow-g123 $1 $2 $3;       rm -f $D/06-NativesShape-g123.out; mkdir -p tmp/caches-g123; walk "gaps 1, 2 and 3 patched" tmp/shadow-g123 tmp/caches-g123 NativesShape $D/06-NativesShape-g123.out
$D/make-shadow.sh tmp/shadow-g1234 $1 $2 $3 $4;   for p in NativesShape NativesShapeOne; do rm -f $D/07-$p-g1234.out; mkdir -p tmp/caches-g1234; walk "gaps 1 to 4 patched" tmp/shadow-g1234 tmp/caches-g1234 $p $D/07-$p-g1234.out; done
$D/make-shadow.sh tmp/shadow-g1234b $G;           for p in NativesShape NativesShapeOne; do rm -f $D/08-$p-g1234b.out; mkdir -p tmp/caches-g1234b; walk "gaps 1 to 4 patched, closure parameters initialized" tmp/shadow-g1234b tmp/caches-g1234b $p $D/08-$p-g1234b.out; done
# 4. the interpreter suite (what `ant testSystem` runs), two shards, with and without the shadow
$D/step3-system.sh shadow tmp/shadow-g1234b
$D/step3-system.sh control
# 5. the compiled path with the shadow first on the classpath (10), the methods probe (11),
#    option 1's walk half (12), a raising helper (13) and gap 5's translation, its suite
#    -- the commands are in the head lines of 10-13-*.out; the suites:
$D/make-shadow.sh tmp/shadow-opt1 $D/patches/gap4-reflective-closure.patch $D/patches/opt1-builtinprimitive-static.patch
$D/step3-system.sh opt1 tmp/shadow-opt1
$D/make-shadow.sh tmp/shadow-g12345 $G $D/patches/gap5-helper-raise.patch
$D/step3-system.sh g12345 tmp/shadow-g12345
# 6. the count (python only)
python3 $D/count/extract.py $D/count
( cd $D/count && python3 match.py && python3 classify.py )
