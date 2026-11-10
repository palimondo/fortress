#!/bin/bash
# The reminder to re-read the curator's own words, run as a PostToolUse hook
# from .claude/settings.json after a Bash, Edit or Write call of the main
# session.
#
# It fires when the call names the held list, the boot note or the decisions
# file (or record.py, which writes the decisions) and one of the three files
# has changed since the hook last looked, at most once a turn: the Stop hook
# beside it in settings.json removes the flag that this hook sets. It gives
# the coordinating session the text below as added context, so that the
# session re-reads the curator's messages and corrects the line before it
# stands. A subagent's call and a headless session with FORTRESS_HEADLESS set
# are skipped.
#
# Added at the curator's approval of 2026-11-10, 07:0x UTC, as the measure of
# the post-mortem of climb batch 29's numeral design
# (explorations/coordinator/postmortem-2026-11-09-numerals/): on 2026-11-08 the
# coordinator wrote its own proposal into the held list as his decision, and
# nothing compared the line with his messages. The replay of that evening
# (intent-replay.md there, the third round) showed that this text, given to
# the session that wrote the line, makes it correct the line and ask nothing.
# The first sentence was added for the hook; the rest is the tested text, and
# the wording is the curator's to change.

input=$(cat)
[[ -n ${FORTRESS_HEADLESS:-} ]] && exit 0
state=~/.claude/curator-words-reminder
root=/home/user/fortress/explorations/coordinator

[[ -n $(jq -r '.agent_id // .agent_type // empty' <<<"$input" 2>/dev/null) ]] && exit 0
what=$(jq -r '[.tool_input.file_path // "", .tool_input.command // ""] | join(" ")' <<<"$input" 2>/dev/null)
new=$(cd "$root" 2>/dev/null && md5sum HELD.md BOOT.md POSITIONS.md 2>/dev/null)
old=$(cat "$state.sums" 2>/dev/null)
printf '%s\n' "$new" > "$state.sums" 2>/dev/null
[[ -z $old || $new == "$old" ]] && exit 0
[[ $what =~ HELD\.md|BOOT\.md|POSITIONS\.md|record\.py ]] || exit 0
[[ -e $state.fired ]] && exit 0
: > "$state.fired"

jq -n --arg t "You wrote to the held list, the boot note or the decisions. If the write records something the curator said or decided: before it stands, go back and read his own messages on the subject, in order, and make the line say what he decided. What he stated himself, argued for or repeated is his position, and a principle that he stated more than once binds everything under it. A short assent of his after a long message of yours accepts the gist he had been arguing for, never each clause of your message. A thing that you proposed and he did not take up in his own words is yours, not his: mark it so. If a clause of your line contradicts something he stated, the clause is wrong: correct it by his words. Do not ask him again what he has already said." \
  '{hookSpecificOutput: {hookEventName: "PostToolUse", additionalContext: $t}}'
