#!/bin/bash
# Switches the workflow scripts and the headless writers between the two tier settings:
#   regular  the tiers of the coordinator skill's references/delegating.md (Opus workers, Sonnet scouts,
#            Fable for a judge's second ruling), and the headless writers on Opus;
#   fable    every agent on Fable, at medium effort where it ran on Opus and at low effort where it ran
#            on Sonnet, and the headless writers on Fable at medium effort.
# It edits the one switch line of each file (FABLE_WEEK in the three workflow scripts, WRITER_MODEL and
# WRITER_EFFORT in tiers.sh), checks the batch script, and commits nothing.
#
#   tier-mode.sh status     print the setting of each file
#   tier-mode.sh fable      set every file to the Fable setting
#   tier-mode.sh regular    set every file to the regular setting
#
# Do not switch while a workflow runs: a resume needs the script as launched (the coordinator skill's
# references/delegating.md, "Interrupts and process stops"). After a switch: commit the four files by name.
# The tier of an Agent-tool worker is not set here: the coordinator names it in each launch.
set -euo pipefail
here=$(cd "$(dirname "$0")" && pwd)
scripts=("$here/../climb-batch-workflow.js" "$here/record-landing/record-landing.js" "$here/orientation/orientation.js")
tiers="$here/tiers.sh"

status() {
  for f in "${scripts[@]}"; do
    n=$(grep -c '^const FABLE_WEEK = \(true\|false\)$' "$f" || true)
    [ "$n" = 1 ] || { echo "tier-mode: $f has $n switch lines, expected 1" >&2; exit 1; }
    v=$(sed -n 's/^const FABLE_WEEK = \(true\|false\)$/\1/p' "$f")
    printf '%-8s %s\n' "$([ "$v" = true ] && echo fable || echo regular)" "${f#"$here"/}"
  done
  # shellcheck disable=SC1090
  ( . "$tiers"; printf '%-8s %s (WRITER_MODEL=%s WRITER_EFFORT=%s)\n' \
      "$([ "$WRITER_MODEL" = fable ] && echo fable || echo regular)" "tiers.sh" "$WRITER_MODEL" "${WRITER_EFFORT:-}" )
}

set_mode() {
  local flag=$1 model=$2 effort=$3
  status >/dev/null
  for f in "${scripts[@]}"; do
    sed -i "s/^const FABLE_WEEK = \(true\|false\)$/const FABLE_WEEK = $flag/" "$f"
  done
  sed -i "s/^WRITER_MODEL=.*$/WRITER_MODEL=$model/; s/^WRITER_EFFORT=.*$/WRITER_EFFORT=$effort/" "$tiers"
  status
  if [ -f "$here/workflow-scenarios.js" ]; then
    echo "--- the batch script's scenario check:"
    node "$here/workflow-scenarios.js" 2>&1 | tail -3
  fi
  echo "--- commit by name: ${scripts[*]#"$here"/} tiers.sh"
}

case "${1:-status}" in
  status)  status ;;
  fable)   set_mode true fable medium ;;
  regular) set_mode false opus "" ;;
  *) echo "usage: tier-mode.sh status|fable|regular" >&2; exit 2 ;;
esac
