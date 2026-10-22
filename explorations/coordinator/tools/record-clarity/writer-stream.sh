#!/usr/bin/env bash
# writer-stream.sh STREAM TASK...: one task for a stream's headless Opus writer, resumed while its context
# is small and its prompt cache warm, started fresh otherwise.
#
# A stream is one writer that takes its chunks in turn, so that a chunk's fix round resumes the session that
# wrote it and holds its evidence in the cache: the clarity pilot's fix round wrote 61K tokens where a fresh
# writer reads everything again. A headless session keeps its cache for an hour; a Workflow agent's lives five
# minutes. The writer's standing brief is the skill writer's (../../skill-writer-brief.md), with the clarity
# writer's brief (writer.md, or the orientation's); TASK is the rest of the command line, sent as the task.
#
# A fresh session starts when the stream has none, when its context passes LIMIT tokens written (default
# 400K), or when its last task ended more than 50 minutes ago. Tasks of one stream run one at a time (flock).
# The state is under the repository's tmp/record-writer/STREAM/ (ignored): session, written, last, and each
# task's JSON. Prints the writer's report, then one line: session, new or resumed, tokens written.
set -euo pipefail
repo=$(cd "$(dirname "$0")/../../../.." && pwd)
stream=${1:?stream}; shift
task="$*"; [ -n "$task" ] || { echo "usage: $0 STREAM TASK..." >&2; exit 2; }
state="$repo/tmp/record-writer/$stream"; mkdir -p "$state"
LIMIT=${LIMIT:-400000}
tools=(Read Edit Write Glob Grep
       "Bash(python3 -I explorations/coordinator/tools/record-clarity/entries.py:*)"
       "Bash(explorations/coordinator/tools/facts-extract.sh:*)"
       "Bash(python3 explorations/coordinator/curator-profile/show.py:*)"
       "Bash(git show:*)" "Bash(git log:*)" "Bash(git grep:*)" "Bash(git diff:*)" "Bash(wc:*)" "Bash(ls:*)")
cd "$repo"
exec 9>"$state/lock"; flock 9
now=$(date +%s)
fresh=1
if [ -f "$state/session" ] && [ -f "$state/last" ] && [ -f "$state/written" ]; then
  if [ $(( now - $(cat "$state/last") )) -lt 3000 ] && [ "$(cat "$state/written")" -lt "$LIMIT" ]; then fresh=0; fi
fi
out="$state/$(date -u +%Y%m%dT%H%M%SZ).json"
if [ $fresh = 1 ]; then
  id=$(python3 -c 'import uuid; print(uuid.uuid4())'); echo "$id" > "$state/session"; echo 0 > "$state/written"
  { cat explorations/coordinator/skill-writer-brief.md
    printf '\n# This session\n\nYou are a stream writer: the coordinating session sends you tasks one after another, each a chunk of record entries or a part of a skill to write or fix. Your standing order above holds for every task, except its parts on skill files, on committing and on sources.md, which your task brief replaces. Commit nothing.\n\n# Your first task\n\n%s\n' "$task"; } |
    claude -p --model opus --session-id "$id" --permission-mode acceptEdits \
      --allowedTools "${tools[@]}" --output-format json > "$out"
else
  id=$(cat "$state/session")
  printf '# Your next task\n\n%s\n' "$task" |
    claude -p --model opus --resume "$id" --permission-mode acceptEdits \
      --allowedTools "${tools[@]}" --output-format json > "$out"
fi
date +%s > "$state/last"
python3 - "$out" "$state/written" "$fresh" <<'PY'
import json, sys
d = json.load(open(sys.argv[1]))
u = d.get('usage') or {}
w = u.get('cache_creation_input_tokens', 0) + u.get('input_tokens', 0)
total = int(open(sys.argv[2]).read() or 0) + w
open(sys.argv[2], 'w').write(str(total))
print(d.get('result', ''))
print('---')
print('session', d.get('session_id'), 'new' if sys.argv[3] == '1' else 'resumed', 'written', w, 'context', total)
PY
