#!/usr/bin/env python3
"""The coordinating session's model check, run as a Stop hook from `.claude/settings.json`.

It reads, from the transcript that the hook's input names, the model of the
main session's last reply. If it is neither Opus nor Fable, it blocks the stop
(exit 2) with an alarm that the session must relay; the next stop of the same
turn passes, so the alarm comes once a turn, every turn, until the model is
switched back. It was added at the curator's word of 2026-10-19, after the
session ran on Haiku from 2026-10-16 20:09 UTC to 2026-10-19 21:04 UTC unseen
(`explorations/coordinator/postmortem-2026-10-19-haiku/`).

The skill writer's headless session is checked too, since it must run on
Opus. Only the baseline interview, which asks other tiers on purpose, sets
`FORTRESS_HEADLESS=1`, and its sessions are not checked. Agents end with
SubagentStop, which this hook does not run on.

A transcript in which it finds no reply, or that it cannot read, raises an
alarm of its own, so a broken check is never silent; any other error of the
check ends in exit 0. Each check writes its time and the model it read to
`~/.claude/model-check.last`, the trace that the hook runs."""
import json, os, sys, time

TIERS = ("opus", "fable")
BLOCK = 1 << 16  # bytes read at a time, from the transcript's end


def lines_backwards(f):
    """The file's lines from its last to its first, read BLOCK bytes at a time.
    A line that spans blocks is joined once, from its pieces."""
    pos = f.seek(0, os.SEEK_END)
    later = []  # the pieces of the line being read, last piece first
    while pos > 0:
        step = min(BLOCK, pos)
        pos -= step
        f.seek(pos)
        parts = f.read(step).split(b"\n")
        later.append(parts[-1])
        if len(parts) > 1:
            yield b"".join(reversed(later))
            yield from reversed(parts[1:-1])
            later = [parts[0]]
    yield b"".join(reversed(later))


def last_model(path):
    """The model of the main session's last reply in the transcript, or None.
    It stops at that reply, which ends the transcript but for a few entries."""
    try:
        with open(path, "rb") as f:
            for line in lines_backwards(f):
                if b'"assistant"' not in line:  # skip, unparsed, every line that cannot be a reply
                    continue
                try:
                    d = json.loads(line)
                except ValueError:
                    continue
                if d.get("type") != "assistant" or d.get("isSidechain"):
                    continue
                model = (d.get("message") or {}).get("model") or ""
                if model and not model.startswith("<"):  # "<synthetic>" marks the harness's own entries
                    return model
    except (OSError, TypeError):
        pass
    return None


def main():
    try:
        hook = json.load(sys.stdin)
    except ValueError:
        hook = {}
    if hook.get("stop_hook_active") or os.environ.get("FORTRESS_HEADLESS"):
        return 0
    model = last_model(hook.get("transcript_path"))
    try:  # the trace that the check ran: the time and the model it read
        with open(os.path.expanduser("~/.claude/model-check.last"), "w") as f:
            f.write(f"{time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())} {model}\n")
    except OSError:
        pass
    if model is not None and any(t in model for t in TIERS):
        return 0
    if model is None:
        print("MODEL CHECK FAILED: the model check found no reply of the coordinating session in its transcript "
              f"({hook.get('transcript_path')}), so it cannot tell which model this turn ran on. Tell the curator "
              "so in the first line of your reply, and check the model with get_session.", file=sys.stderr)
        return 2
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
