#!/bin/bash
# Disassemble the generated classes for bench1h and bench1r, to show what
# hoisting the literals and removing the `:=` did to the emitted loop body.
# Run from this directory (kernels/javap) with experiment/env.sh sourced.
set -u
C=/home/user/fortress/default_repository/caches/bytecode_cache
W=$(mktemp -d /tmp/kernels-javap-XXXX)
for b in bench1h bench1r; do
  rm -rf "$W/$b"; mkdir -p "$W/$b"; (cd "$W/$b" && unzip -qo "$C/$b.jar")
  echo "--- $b: classes in the jar" > "$b.classes.txt"
  (cd "$W/$b" && find . -name '*.class' | sort) >> "$b.classes.txt"
  (cd "$W/$b" && javap -p -c -classpath . $(find . -name '*.class' | sed 's|^\./||; s|\.class$||')) > "$b.javap.txt" 2>&1
done
rm -rf "$W"
