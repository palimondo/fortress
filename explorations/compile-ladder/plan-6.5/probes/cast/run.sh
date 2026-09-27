#!/bin/bash
# run.sh: the two typecase-binding programs compiled and run in the compiler's world (comp.sh), and the
# compiler library's cast template disassembled from the library cache. Run from $FORTRESS_HOME, after
# ../../libcache.sh has built $FORTRESS_HOME/tmp/libcache.
set -u
D=explorations/compile-ladder/plan-6.5/probes/cast
for n in CastBind CaseBindPlain; do bash explorations/compile-ladder/plan-6.5/comp.sh $D $n > /dev/null; done
# cast-template-javap.txt: unzip the class fortress/CompilerLibrary(GEAR)$cast... from
# tmp/libcache/bytecode_cache/fortress.CompilerLibrary.jar, copy it to a plain file name, then
# javap -J-Dfile.encoding=UTF-8 -J-Dstdout.encoding=UTF-8 -c -p on it.
