#!/bin/bash
# Make (once) the private library copy $SCRATCH/lib-<variant>: Library/ and
# ProjectFortress/LibraryBuiltin/ copied, then edited in place by variants/<variant>.py.
#   explorations/reviews/max-min-identities-judgement/make-lib.sh <variant> [force]
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/../../experiment/env.sh"
V=${1:?variant}
S=${SCRATCH:?set SCRATCH to a private directory}
W="$S/lib-$V"
if [ -d "$W" ] && [ "${2:-}" != force ]; then exit 0; fi
rm -rf "$W"; mkdir -p "$W"
cp -r "$FORTRESS_HOME/Library" "$W/Library"
cp -r "$FORTRESS_HOME/ProjectFortress/LibraryBuiltin" "$W/LibraryBuiltin"
python3 "$D/variants/$V.py" "$W" || { rm -rf "$W"; exit 1; }
echo "lib-$V made at $W"
