# world.sh: compile the compiled path's prelude into a private cache under $VECPROBE_WORK.
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
rm -rf $C; mkdir -p $C; printf '\0\0\0\0' > $C/global.map
(cd ProjectFortress && fsh compile LibraryBuiltin/AnyType.fss) 2>&1 | tail -3
(cd ProjectFortress && fsh compile LibraryBuiltin/CompilerBuiltin.fss) 2>&1 | tail -3
fsh compile Library/CompilerLibrary.fss 2>&1 | tail -3
fsh compile Library/CompilerAlgebra.fss 2>&1 | tail -3
fsh compile Library/CompilerSystem.fss 2>&1 | tail -3
ls $C/bytecode_cache
