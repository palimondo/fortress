#!/bin/bash
# make-patch.sh : writes shadow.patch, the edited copies in $X/shadow-src against HEAD's sources
# (build.sh applies it with patch -p1 inside $X/shadow-src; ProbeK.java is a new file).
set -eu
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
cd "$FORTRESS_HOME"
S=$X/shadow-src/com/sun/fortress
{ for f in interpreter/evaluator/EvaluatorBase.java interpreter/evaluator/values/OverloadedFunction.java \
           interpreter/evaluator/values/Coercions.java interpreter/evaluator/values/Fcn.java; do
    diff -u --label "a/com/sun/fortress/$f" --label "b/com/sun/fortress/$f" \
         <(git show HEAD:ProjectFortress/src/com/sun/fortress/$f) "$S/$f" || true
  done
  diff -u --label /dev/null --label b/com/sun/fortress/interpreter/evaluator/ProbeK.java \
       /dev/null "$S/interpreter/evaluator/ProbeK.java" || true; } > "$O/shadow.patch"
echo "shadow.patch: $(wc -l < "$O/shadow.patch") lines"
