#!/bin/bash
# Every command this probe ran, in order.  Run from $FORTRESS_HOME.
# Outputs land next to this script as NN-*.out.
set -x
source explorations/experiment/env.sh
P=explorations/perf-probes/grammar-compile

# 2. the two grammars on the WALK INTERPRETER first (cwd must be $P: `.` is
#    first on fortress.source.path, and the interpreter wants filename == name)
(cd $P && $FORTRESS_HOME/bin/fortress a02c_twice.fss)            # -> 02-interpreter-twice.out
(cd $P && $FORTRESS_HOME/bin/fortress a03c_usefn.fss)            # -> 02b-interpreter-usefn.out

# 3. the compiler's world, from a wiped cache, in library order
rm -rf default_repository/caches/*_cache default_repository/caches/logs   # -> 03-cache-wipe.out
(cd ProjectFortress
 ../bin/fortress compile LibraryBuiltin/AnyType.fss
 ../bin/fortress compile LibraryBuiltin/CompilerBuiltin.fss
 ../bin/fortress compile ../Library/CompilerLibrary.fss
 ../bin/fortress compile ../Library/CompilerAlgebra.fss
 ../bin/fortress compile ../Library/CompilerSystem.fss)          # -> 04-library-chain.out
ls -la default_repository/caches/bytecode_cache/                 # -> 05-bytecode-cache-after-chain.out

# the grammar api's stub component, then the same file stopped before GRAMMAR,
# then the using program with the api only on the source path
(cd $P && $FORTRESS_HOME/bin/fortress compile     TwiceC.fss)    # -> 06-compile-stub.out  (+ 06b census)
(cd $P && $FORTRESS_HOME/bin/fortress disambiguate TwiceC.fss)   # -> 07-disambiguate-stub.out
(cd $P && $FORTRESS_HOME/bin/fortress compile     a02c_twice.fss) # -> 08-compile-using.out

# controls: same arithmetic without a grammar; the import alone; one link down
(cd $P && $FORTRESS_HOME/bin/fortress compile c01_plain.fss && $FORTRESS_HOME/bin/fortress run c01_plain
          $FORTRESS_HOME/bin/fortress compile c02_importsyntax.fss
          $FORTRESS_HOME/bin/fortress compile c03_importast.fss)  # -> 09-controls.out

# 4. how deep the wall is: two PROBE-ONLY shims in $P/shim, which `.`-first on
#    the source path lets shadow Library/FortressLibrary and Library/List
rm -rf default_repository/caches/analyzed_cache default_repository/caches/*parsed_cache \
       default_repository/caches/syntax_cache default_repository/caches/presyntax_cache
(cd $P/shim && $FORTRESS_HOME/bin/fortress compile TwiceC.fss)    # FortressLibrary only -> 10-shim-stub.out
# (List.fsi/.fss added)
(cd $P/shim && $FORTRESS_HOME/bin/fortress compile TwiceC.fss)    # both shims        -> 11-shim2-stub.out
(cd $P/shim && $FORTRESS_HOME/bin/fortress compile a02c_twice.fss
               $FORTRESS_HOME/bin/fortress run     a02c_twice)    # -> 12-shim2-using.out

# what the type checker does with an expansion: four templates, four use sites
(cd $P/shim && for n in 1 2 3 4; do $FORTRESS_HOME/bin/fortress compile m0$n.fss
                                    $FORTRESS_HOME/bin/fortress run     m0$n; done)   # -> 13-shim2-matrix.out
(cd $P/shim && for n in 05 06 07; do $FORTRESS_HOME/bin/fortress compile m$n.fss
                                     $FORTRESS_HOME/bin/fortress run     m$n; done)   # -> 14-shim2-position.out

# 5. the two mechanisms of ledger rows 270 and 285, templates parenthesized
(cd $P/shim && $FORTRESS_HOME/bin/fortress compile TwiceP.fss
               $FORTRESS_HOME/bin/fortress compile a02p_twice.fss
               $FORTRESS_HOME/bin/fortress run     a02p_twice
               $FORTRESS_HOME/bin/fortress compile UseFnP.fss
               $FORTRESS_HOME/bin/fortress compile a03p_usefn.fss)                    # -> 15-shim2-step4.out
(cd $P/shim && for r in dblp lamp app; do $FORTRESS_HOME/bin/fortress compile G_$r.fss
                                          $FORTRESS_HOME/bin/fortress compile u_$r.fss
                                          $FORTRESS_HOME/bin/fortress run     u_$r; done)  # -> 16-shim2-rules-split.out
(cd $P/shim && $FORTRESS_HOME/bin/fortress compile VocabC.fss
               for r in dblq lamq appq; do $FORTRESS_HOME/bin/fortress compile G_$r.fss
                                           $FORTRESS_HOME/bin/fortress compile u_$r.fss
                                           $FORTRESS_HOME/bin/fortress run     u_$r; done) # -> 17-shim2-vocab-in-api.out

# re-verification of the one positive, from wiped analysis caches
rm -rf default_repository/caches/analyzed_cache default_repository/caches/*parsed_cache \
       default_repository/caches/syntax_cache default_repository/caches/presyntax_cache \
       default_repository/caches/bytecode_cache/TwiceP.jar default_repository/caches/bytecode_cache/a02p_twice.jar
(cd $P/shim && $FORTRESS_HOME/bin/fortress compile TwiceP.fss
               $FORTRESS_HOME/bin/fortress compile a02p_twice.fss
               $FORTRESS_HOME/bin/fortress run     a02p_twice)                        # -> 18-verify-positive.out
