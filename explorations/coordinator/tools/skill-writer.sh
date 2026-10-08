#!/usr/bin/env bash
# Starts or resumes the skill writer: a headless Claude session that edits the
# project skills. A headless session writes its prompt cache with the one-hour
# life, where an Agent-tool subagent gets five minutes, so a writer resumed
# within the hour reads its context from the cache.
#
# Usage:
#   skill-writer.sh new <task-file>     a fresh writer: the standing brief
#                                       (../skill-writer-brief.md), then the task
#   skill-writer.sh resume <task-file>  the task, sent to the current writer
#
# The session id and each task's JSON output are kept under the repository's
# tmp/skill-writer/, which is ignored. The script prints the writer's report,
# its session id and the tokens the task wrote to the cache.
set -euo pipefail
repo=$(cd "$(dirname "$0")/../../.." && pwd)
state="$repo/tmp/skill-writer"
mkdir -p "$state"
mode=${1:?new or resume}
task=$(cd "$(dirname "${2:?task file}")" && pwd)/$(basename "$2")
tools=(Read Edit Write Glob Grep
       "Bash(git add:*)" "Bash(git commit:*)" "Bash(git diff:*)" "Bash(git log:*)"
       "Bash(git status:*)" "Bash(git show:*)" "Bash(git grep:*)" "Bash(wc:*)"
       "Bash(explorations/coordinator/tools/facts-extract.sh:*)")
out="$state/$(date -u +%Y%m%dT%H%M%SZ)-$mode.json"
cd "$repo"
case $mode in
  new)
    id=$(python3 -c 'import uuid; print(uuid.uuid4())')
    echo "$id" > "$state/session"
    { cat explorations/coordinator/skill-writer-brief.md
      printf '\n# Your first task\n\n'
      cat "$task"; } |
      claude -p --model opus --session-id "$id" --permission-mode acceptEdits \
        --allowedTools "${tools[@]}" --output-format json > "$out" ;;
  resume)
    id=$(cat "$state/session")
    claude -p --model opus --resume "$id" --permission-mode acceptEdits \
      --allowedTools "${tools[@]}" --output-format json < "$task" > "$out" ;;
  *) echo "usage: $0 new|resume <task-file>" >&2; exit 2 ;;
esac
python3 - "$out" <<'EOF'
import json, sys
d = json.load(open(sys.argv[1]))
u = d.get('usage') or {}
print(d.get('result', ''))
print('---')
print('session', d.get('session_id'), 'turns', d.get('num_turns'),
      'cache writes', u.get('cache_creation_input_tokens', 0) + u.get('input_tokens', 0),
      'reads', u.get('cache_read_input_tokens', 0), 'output', u.get('output_tokens', 0),
      'labels', u.get('cache_creation'))
EOF
