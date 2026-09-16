#!/bin/bash
# Every command this probe ran, in order. Run from $FORTRESS_HOME.
# Outputs land next to this script as NN-*.out.
set -x
source experiment/env.sh
P=explorations/perf-probes/prelude
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)

# 0. fresh cache
rm -rf default_repository/caches/*_cache default_repository/caches/logs

# 1. build the compiler's world, in library order (explorations/repo-internals.md)
(cd ProjectFortress
 ../bin/fortress compile LibraryBuiltin/AnyType.fss
 ../bin/fortress compile LibraryBuiltin/CompilerBuiltin.fss
 ../bin/fortress compile ../Library/CompilerLibrary.fss
 ../bin/fortress compile ../Library/CompilerAlgebra.fss
 ../bin/fortress compile ../Library/CompilerSystem.fss)          # -> 01-library-chain.out

# 2. the interpreter prelude, as it is, in the compiler's world
./bin/fortress compile     Library/FortressLibrary.fss           # -> 02-fortresslibrary-asis.out
./bin/fortress disambiguate Library/FortressLibrary.fss          # -> 03-disambiguate-only.out

# 3. the same, with FortressLibrary AS the prelude (Pavol's proposal)
javac -cp "$CP" -d $P $P/WorldFlip.java
rm -rf default_repository/caches/analyzed_cache default_repository/caches/*parsed_cache \
       default_repository/caches/syntax_cache default_repository/caches/presyntax_cache
java $JAVA_FLAGS -cp "$CP:$P" WorldFlip Library/FortressLibrary.fss                  # -> 04
java $JAVA_FLAGS -cp "$CP:$P" WorldFlip -stop disambiguate Library/FortressLibrary.fss # -> 05

# 4. instrumented StaticChecker: name each compilation unit, survive the
#    OverloadingChecker crash, and (with -Dprobe.dropApiErrors) run on past the apis
javac -nowarn -cp "$CP" -d $P/shadow-classes $P/shadow-src/com/sun/fortress/compiler/StaticChecker.java
java $JAVA_FLAGS -cp "$P/shadow-classes:$CP:$P" WorldFlip Library/FortressLibrary.fss # -> 06
java $JAVA_FLAGS -Dprobe.dropApiErrors=1 -cp "$P/shadow-classes:$CP:$P" \
     WorldFlip Library/FortressLibrary.fss                                            # -> 12

# 5. builtinPrimitive on the compiled path
./bin/fortress compile $P/pPrim.fss; ./bin/fortress compile $P/pPrim2.fss
./bin/fortress run pPrim2; ./bin/fortress $P/pPrim.fss                                # -> 07

# 6. plain-Fortress library code: C4's FlatArrays
./bin/fortress compile explorations/run-c4/src/FlatArrays.fss                          # -> 08
java $JAVA_FLAGS -cp "$P/shadow-classes:$CP:$P" WorldFlip explorations/run-c4/src/FlatArrays.fss # -> 09
java $JAVA_FLAGS -Dprobe.dropApiErrors=1 -cp "$P/shadow-classes:$CP:$P" \
     WorldFlip explorations/run-c4/src/FlatArrays.fss                                  # -> 10

# 7. nat static parameters, minimal, in the compiler's own world
for t in pNat1 pNat2 pNat3; do ./bin/fortress compile $P/$t.fss; ./bin/fortress run $t; done  # -> 11
for t in pNat1 pNat2 pNat3; do ./bin/fortress $P/$t.fss; done                          # -> 13
