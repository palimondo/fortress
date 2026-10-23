#!/bin/bash
# Prints the model of the coordinating session's last reply, read from its
# transcript: the boot's step 0, in place of the get_session tool, whose answer
# costs about 6K tokens (most of it the session's list of pages). It reads the
# transcript as the Stop hook .claude/hooks/model-check.sh does, and finds it by
# CLAUDE_CODE_SESSION_ID. Run from a tool call of the current turn, the last
# reply is that call's own message, so it prints the model serving this turn.
# Prints nothing, and exits 1, when it finds no transcript or no reply; then
# check with get_session.
path=~/.claude/projects/-home-user-fortress/${CLAUDE_CODE_SESSION_ID:-none}.jsonl
[[ -r $path ]] || exit 1
model=$(tac -- "$path" | grep -F '"type":"assistant"' | grep -v -F '"model":"<synthetic>"' \
  | grep -m1 -o '"model":"[^"]*"' | head -1 | cut -d'"' -f4)
[[ -n $model ]] || exit 1
echo "$model"
