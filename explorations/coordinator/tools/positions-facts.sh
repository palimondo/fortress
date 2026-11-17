#!/usr/bin/env bash
# Print the FACTS.md entries that POSITIONS.md cites, each whole, in the order of their numbers, in the parts of facts-extract.sh: the coordinator's first read at a boot, before POSITIONS.md whole, so that the decisions are read with the facts that they rest on (the coordinator skill, "The boot").
#
#   positions-facts.sh            part 1, with the size of the whole output and the numbers not found
#   positions-facts.sh --part N   part N
#   positions-facts.sh --list     only the cited numbers, one a line
#
# The numbers are every F-<n> that POSITIONS.md holds today, so the set follows the record with no list to keep.
set -euo pipefail
root="$(cd "$(dirname "$0")/../../.." && pwd)"
positions="$root/explorations/coordinator/POSITIONS.md"
mapfile -t nums < <(grep -oE '(^|[^[:alnum:]_])F-[0-9]+' "$positions" | grep -oE 'F-[0-9]+' | sort -u -t- -k2,2n)
if [[ "${1:-}" == "--list" ]]; then
  printf '%s\n' "${nums[@]}"
  exit 0
fi
cd "$root"
exec explorations/coordinator/tools/facts-extract.sh "$@" "${nums[@]}"
