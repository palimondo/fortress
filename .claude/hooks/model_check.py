#!/usr/bin/env python3
"""The coordinating session's model check, run as a Stop hook from `.claude/settings.json`.

It reads, from the transcript that the hook's input names, the model of the
main session's last reply. If it is neither Opus nor Fable, it blocks the stop
(exit 2) with an alarm that the session must relay; the next stop of the same
turn passes, so the alarm comes once a turn, every turn, until the model is
switched back. It was added at the curator's word of 2026-10-19, after the
session ran on Haiku from 2026-10-16 20:09 UTC to 2026-10-19 21:04 UTC unseen
(`explorations/coordinator/postmortem-2026-10-19-haiku/`).

A session that the repository's own scripts start headless sets
`FORTRESS_HEADLESS=1` and is not checked. Agents end with SubagentStop, which
this hook does not run on. Any error of the check's own ends in exit 0, so it
never holds up a session."""
import json, os, sys

TIERS = ("opus", "fable")
TAIL = 4_000_000  # bytes of the transcript read from its end


def last_model(path):
    """The model of the main session's last reply in the transcript, or None."""
    try:
        with open(path, "rb") as f:
            f.seek(max(0, os.path.getsize(path) - TAIL))
            lines = f.read().decode("utf-8", "replace").splitlines()
    except (OSError, TypeError, ValueError):
        return None
    for line in reversed(lines):
        try:
            d = json.loads(line)
        except ValueError:
            continue
        if d.get("type") != "assistant" or d.get("isSidechain"):
            continue
        model = (d.get("message") or {}).get("model") or ""
        if model and not model.startswith("<"):  # "<synthetic>" marks the harness's own entries
            return model
    return None


def main():
    try:
        hook = json.load(sys.stdin)
    except ValueError:
        hook = {}
    if hook.get("stop_hook_active") or os.environ.get("FORTRESS_HEADLESS"):
        return 0
    model = last_model(hook.get("transcript_path"))
    if model is None or any(t in model for t in TIERS):
        return 0
    print(f"MODEL ALARM: this turn of the coordinating session ran on {model}, not Opus or Fable. "
          "Before anything else: make this alarm, with the model's name, the first line of your reply "
          "to the curator; send him the same line as a push notification (PushNotification); and make "
          "no other tool call, launch, edit or commit until he switches the model back or tells you to go on.",
          file=sys.stderr)
    return 2


if __name__ == "__main__":
    try:
        sys.exit(main())
    except SystemExit:
        raise
    except Exception:
        sys.exit(0)
