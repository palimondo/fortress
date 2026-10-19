#!/bin/bash
# The coordinating session's model check, run as a Stop hook from .claude/settings.json.
#
# It reads, from the transcript that the hook's input names, the model of the
# main session's last reply. If it is neither Opus nor Fable, it blocks the stop
# (exit 2) with an alarm that the session must relay; the next stop of the same
# turn passes, so the alarm comes once a turn, every turn, until the model is
# switched back. Added at the curator's word of 2026-10-19, after the session
# ran on Haiku from 2026-10-16 20:09 UTC to 2026-10-19 21:04 UTC unseen
# (explorations/coordinator/postmortem-2026-10-19-haiku/).
#
# The transcript is JSONL. tac reads it from its end and the pipe stops at the
# last reply, the last line with "type":"assistant"; the first "model" key on
# that line is the reply's own, before its content. Both held for every reply
# of the coordinating session's and the skill writer's transcripts on
# 2026-10-19 (8,553 and 228 replies). "<synthetic>" marks the harness's own
# entries, which are skipped.
#
# The skill writer's headless session is checked too, since it must run on
# Opus. Only the baseline interview, which asks other tiers on purpose, sets
# FORTRESS_HEADLESS=1, and its sessions are not checked. Agents end with
# SubagentStop, which this hook does not run on. A transcript in which no reply
# is found raises an alarm of its own, so a broken check is never silent. Each
# check writes its time and the model it read to ~/.claude/model-check.last.

IFS=$'\t' read -r active path < <(jq -r '[(.stop_hook_active // false), (.transcript_path // "")] | @tsv' 2>/dev/null)
[[ $active == true || -n ${FORTRESS_HEADLESS:-} ]] && exit 0
model=
[[ -r $path ]] && model=$(tac -- "$path" | grep -F '"type":"assistant"' | grep -v -F '"model":"<synthetic>"' \
  | grep -m1 -o '"model":"[^"]*"' | head -1 | cut -d'"' -f4)
printf '%s %s\n' "$(date -u +%FT%TZ)" "${model:-none}" > ~/.claude/model-check.last 2>/dev/null

case $model in
  *opus*|*fable*) exit 0 ;;
  "") echo "MODEL CHECK FAILED: the model check found no reply of the coordinating session in its transcript ($path), so it cannot tell which model this turn ran on. Tell the curator so in the first line of your reply, and check the model with get_session." >&2 ;;
  *) echo "MODEL ALARM: this turn of the coordinating session ran on $model, not Opus or Fable. Before anything else: make this alarm, with the model's name, the first line of your reply to the curator; send him the same line as a push notification (PushNotification); and make no other tool call, launch, edit or commit until he switches the model back or tells you to go on." >&2 ;;
esac
exit 2
