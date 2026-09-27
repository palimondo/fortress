#!/bin/bash
# competing.sh: grep of the four component names the repair round adds across ProjectFortress/ and Library/
# (.fss, .fsi, .test, .java, .scala; ProjectFortress/build and the caches excluded), as probes/competing-declarations.txt did.
cd "$(dirname "$0")/../../../../.."
echo "# The repair round's competing declarations, run at $(git rev-parse --short HEAD) with the new files uncommitted. Names added: the components XXXRangeBoundsRungO, XXXSeqRangeTopRungO, XXXRangeSizeZZ64RungO and XXXSeqMidpointRungO (the two scratch controls, SeqRangeControl and SeqMidpointControl, live under explorations/ and are grepped too). No function, trait or Java name is added."
for n in XXXRangeBoundsRungO XXXSeqRangeTopRungO XXXRangeSizeZZ64RungO XXXSeqMidpointRungO SeqMidpointRungO SeqRangeControl SeqMidpointControl; do
  echo; echo "## grep -rn '$n' ProjectFortress Library explorations/compile-ladder/rung-overflow-natives/probes/repair (--include *.fss *.fsi *.test *.java *.scala; build excluded)"
  grep -rn "$n" ProjectFortress Library explorations/compile-ladder/rung-overflow-natives/probes/repair --include='*.fss' --include='*.fsi' --include='*.test' --include='*.java' --include='*.scala' --exclude-dir=build 2>/dev/null
  echo "(end)"
done
