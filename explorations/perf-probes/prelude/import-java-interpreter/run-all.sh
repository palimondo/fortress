#!/bin/bash
# Every command of the probe, in order.  From the repository root:
#     bash explorations/perf-probes/prelude/import-java-interpreter/run-all.sh
# Private caches only: FORTRESS_CACHES points outside default_repository/, and
# bin/fortress_classpath + bin/run_classpath honour it, as does ProjectProperties
# ("fortress.caches" <- FORTRESS_CACHES, ProjectProperties.java:261-283).  No `ant`.
set -u
cd "$(dirname "$0")/../../../.."
source explorations/experiment/env.sh
D=explorations/perf-probes/prelude/import-java-interpreter
: "${FORTRESS_CACHES:=/tmp/import-java-probe-caches}"
export FORTRESS_CACHES
rm -rf "$FORTRESS_CACHES"; mkdir -p "$FORTRESS_CACHES"

{ echo "\$ git rev-parse HEAD"; git rev-parse HEAD
  echo "\$ git status --porcelain"; git status --porcelain
  echo "\$ java -version"; java -version 2>&1
  echo "FORTRESS_HOME=$FORTRESS_HOME"
  echo "FORTRESS_CACHES=$FORTRESS_CACHES"
  echo "FORTRESS_THREADS=${FORTRESS_THREADS:-}"
  echo "JAVA_FLAGS=${JAVA_FLAGS:-}"
} > $D/00-setup.out 2>&1

# --- step 1: the interpreter (walk) path ---------------------------------
i=0
for p in ijPrintln ijDouble ijEquiv ijEquivTop; do
  i=$((i+1)); n=0$i
  { echo "\$ ./bin/fortress $D/$p.fss"; ./bin/fortress $D/$p.fss; echo "### rc=$?"; } > $D/$n-$p-walk.out 2>&1
done
# two `import java` lines from one package, the shape CompilerBuiltin.fss uses 17 times
{ echo "\$ ./bin/fortress $D/ijTwo.fss"; ./bin/fortress $D/ijTwo.fss; echo "### rc=$?"; } > $D/10-ijTwo-walk.out 2>&1

# --- what the interpreter's ClosureMaker emitted for the one program that
#     got past name resolution --------------------------------------------
{ echo "\$ javap -p -c \$FORTRESS_CACHES/bytecode_cache/native/com/sun/fortress/nativeHelpers/equality\$\$closure.class"
  javap -p -c "$FORTRESS_CACHES/bytecode_cache/native/com/sun/fortress/nativeHelpers/equality\$\$closure.class"
  echo "### rc=$?"
} > $D/05-closure-disasm.out 2>&1

# --- step 2: the control, the same programs through the compile path ------
# the compiler prelude has to be in this (fresh, private) cache first
{ for f in LibraryBuiltin/AnyType.fss LibraryBuiltin/CompilerBuiltin.fss \
           ../Library/CompilerLibrary.fss ../Library/CompilerAlgebra.fss \
           ../Library/CompilerSystem.fss; do
    echo "\$ (cd ProjectFortress && fortress compile $f)"
    ( cd ProjectFortress && "$FORTRESS_HOME"/bin/fortress compile "$f" ); echo "### rc=$?"
  done
} > $D/06-library-chain.out 2>&1

{ for p in ijPrintln ijDouble ijEquiv ijEquivTop ijTwo; do
    echo "\$ ./bin/fortress compile $D/$p.fss"; ./bin/fortress compile $D/$p.fss; echo "### compile rc=$?"
    echo "\$ ./bin/fortress run $p";            ./bin/fortress run $p;            echo "### run rc=$?"
    echo
  done
} > $D/07-compile-control.out 2>&1

# --- the compiler's wrapper for the same two helpers, for the contrast ----
{ echo "\$ javap -p -c \$FORTRESS_CACHES/nativewrapper_cache/native/com/sun/fortress/nativeHelpers/equality.class"
  javap -p -c "$FORTRESS_CACHES/nativewrapper_cache/native/com/sun/fortress/nativeHelpers/equality.class"
  echo
  echo "\$ javap -p -c \$FORTRESS_CACHES/nativewrapper_cache/native/com/sun/fortress/nativeHelpers/simpleDoubleArith.class | sed -n '1,30p'"
  javap -p -c "$FORTRESS_CACHES/nativewrapper_cache/native/com/sun/fortress/nativeHelpers/simpleDoubleArith.class" | sed -n '1,30p'
} > $D/08-wrapper-disasm.out 2>&1

# --- the one configuration switch that could plausibly close the first gap:
#     `walk -compiler-lib` runs the interpreter phases over the COMPILER's
#     prelude names (Shell.java:1107-1110, after subMain's useInterpreterLibraries
#     at :479-482), which is what NamingCzar.fortLib reads (NamingCzar.java:294).
{ for p in ijDouble ijEquiv; do
    echo "\$ ./bin/fortress -compiler-lib $D/$p.fss"
    ./bin/fortress -compiler-lib $D/$p.fss; echo "### rc=$?"; echo
  done
} > $D/09-compiler-lib-walk.out 2>&1
