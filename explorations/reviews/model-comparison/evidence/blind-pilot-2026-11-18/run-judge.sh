#!/bin/bash
# run-judge.sh LABEL MODEL EFFORT PACKET: one read-only headless judge on one packet; output JSON in out/LABEL.json
set -uo pipefail
S=$(cd "$(dirname "$0")" && pwd)
L=$1; M=$2; E=$3; P=$4
ID=$(python3 -c 'import uuid;print(uuid.uuid4())')
echo "$L $M $E $P $ID $(date -u +%FT%TZ)" >> $S/out/sessions.txt
cd $S/packets/$P
claude -p --session-id "$ID" --model "$M" --effort "$E" --tools Read,Grep,Glob --strict-mcp-config --disable-slash-commands \
  --output-format json "$(cat $S/judge-brief.md)" > $S/out/$L.json 2> $S/out/$L.err
echo "$L exit=$? $(date -u +%FT%TZ)" >> $S/out/sessions.txt
