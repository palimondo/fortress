#!/bin/bash
# sktime.sh : the skeptic's timing of the compiled checker, the base's build snapshot then the rung's build, back to
# back, each TestsD (ctests.sh's method, one JVM, one private cache) over the same five files. -> probes/skeptic/sktime.txt
set -u
W=/home/user/fortress-infer; R=$W/explorations/compile-ladder/rung-inference-checker
source $W/tmp/h.sh >/dev/null
TP=$($W/bin/fortress_classpath 2>/dev/null | tail -1 | tr ':' '\n' | grep '/third_party/' | paste -sd:)
FILES="../LibraryBuiltin/CompilerBuiltin.fss ../../Library/CompilerLibrary.fss IntSemanticsRungB.fss TreapAndTest.fss Compiled10.c.fss"
cd "$W/ProjectFortress/compiler_tests"
for round in 1 2; do
for L in base after; do
  if [ $L = base ]; then B=$W/tmp/build-base; else B=$W/ProjectFortress/build; fi
  C=$W/tmp/sktime-cache-$L; rm -rf "$C"; mkdir -p "$C/tmp"
  echo "## round $round $L $(date -u +%FT%TZ); build $B; $(machine)"
  S=$(date +%s)
  FORTRESS_AUTOHOME=$W timeout -k 30 1800 java -Xmx4g -Xss64m -Dfortress.caches="$C" -Djava.io.tmpdir="$C/tmp" \
    "-Dfortress.source.path=;.;$W/ProjectFortress/LibraryBuiltin;$W/Library;$W/ProjectFortress/test_library" \
    -cp "$B:$W/tmp/drv:$TP" TestsD $FILES 2>&1 | sed "s#$W/##g" | grep '###'
  echo "ELAPSED $L $(( $(date +%s) - S )) s"
  rm -rf "$C"
done
done
