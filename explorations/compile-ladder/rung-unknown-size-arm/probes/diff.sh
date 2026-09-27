#!/bin/bash
# walk against the compiled run on the rung's shapes: each program compiled (the checker's messages), run when it compiled, and walked
# usage: bash probes/diff.sh <label>   (from the worktree, with tmp/sh.sh's variables set)
cd "$FORTRESS_HOME/ProjectFortress"
D=../explorations/compile-ladder/rung-unknown-size-arm/probes/diff
echo "# probes/diff.sh $1; $(sed -n 1p ../explorations/compile-ladder/rung-unknown-size-arm/probes/machine.txt | sed 's/^machine: //;s/load at rung start [^;]*;/load now '"$(cut -d' ' -f1-3 /proc/loadavg)"';/')"
progs="compiler_tests/XXXNatUnknownSizeArm.fss compiler_tests/XXXNatUnknownSizeVal.fss compiler_tests/NatKnownSizeArm.fss"
for f in $D/*.fss; do progs="$progs $f"; done
for p in $progs; do
  c=$(basename $p .fss)
  find ../default_repository/caches -name "*$c*" -exec rm -rf {} + 2>/dev/null
  echo "########## fortress compile $c.fss"
  timeout 300 ../bin/fortress compile $p 2>&1 | sed "s#$FORTRESS_HOME/##g;s#\.\./explorations/#explorations/#g" | grep -v '^\s*at '
  rc=${PIPESTATUS[0]}; echo "exit=$rc"
  if [ "$rc" = 0 ]; then
    echo "########## fortress run $c"
    timeout 120 ../bin/fortress run $c 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | head -12
    echo "exit=${PIPESTATUS[0]}"
  fi
  echo "########## walk $c.fss"
  timeout 300 ../bin/fortress walk $p 2>&1 | sed "s#$FORTRESS_HOME/##g;s#\.\./explorations/#explorations/#g" | grep -v '^\s*at ' | head -14
  echo "exit=${PIPESTATUS[0]}"
done
