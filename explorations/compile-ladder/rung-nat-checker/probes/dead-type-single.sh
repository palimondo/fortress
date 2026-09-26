#!/bin/bash
# DeadTypeSingle: the type-parameter twin of probes/DeadSize.fss (a single function whose static parameter reaches
# nothing, called with a variable, not a numeral): fortress typecheck, compile and run on the landed build, then walk
source /home/user/fortress-nat/explorations/compile-ladder/rung-nat-checker/probes/repair-common.sh
cd $FH/explorations/compile-ladder/rung-nat-checker/probes
machine
p=DeadTypeSingle
clean $p
echo "########## fortress typecheck $p.fss (landed build)"
timeout 300 $FH/bin/fortress typecheck $p.fss 2>&1 | filt | head -30; echo "exit=${PIPESTATUS[0]}"
clean $p
echo "########## fortress compile $p.fss (landed build)"
timeout 300 $FH/bin/fortress compile $p.fss 2>&1 | filt | head -30; echo "exit=${PIPESTATUS[0]}"
echo "########## fortress run $p (landed build)"
timeout 300 $FH/bin/fortress run $p 2>&1 | filt | head -30; echo "exit=${PIPESTATUS[0]}"
clean $p
echo "########## walk: fortress $p.fss"
timeout 300 $FH/bin/fortress $p.fss 2>&1 | filt | head -30; echo "exit=${PIPESTATUS[0]}"
clean $p
