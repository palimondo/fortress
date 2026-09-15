#!/bin/bash
# How the dumps in this directory were produced (JDK 25, source experiment/env.sh first).
C=/home/user/fortress/default_repository/caches
D=$(mktemp -d); cd $D
jar xf $C/bytecode_cache/bench1.jar
javap -p -c 'bench1.class'                    # -> bench1.javap.txt
javap -p -c './bench1$/=fn@5/!7-28.class'     # -> bench1.loopbody.javap.txt   (the for-loop body closure)
jar xf $C/bytecode_cache/bench2.jar
javap -p -c 'bench2.class'                    # -> bench2.javap.txt
javap -p -c 'bench2$V.class'                  # -> bench2.V.javap.txt
javap -p -c 'bench2$\=fn@9\!7-27.class'       # -> bench2.loopbody.javap.txt
jar xf $C/bytecode_cache/fortress.CompilerBuiltin.jar
javap -p -c 'fortress/CompilerBuiltin.class'                              # -> CompilerBuiltin.juxtaposition_RR64.javap.txt (excerpt)
javap -p -c 'fortress/CompilerBuiltin$RR64$DefaultTraitMethods.class'     # -> CompilerBuiltin.RR64.DefaultTraitMethods.javap.txt
javap -p -c $C/nativewrapper_cache/native/com/sun/fortress/nativeHelpers/simpleDoubleArith.class
                                                                          # -> simpleDoubleArith.wrapper.javap.txt
