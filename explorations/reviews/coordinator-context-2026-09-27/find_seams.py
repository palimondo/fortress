#!/usr/bin/env python3
"""Scan a line range and report every place the timestamp goes backward
relative to the running maximum seen so far -- a 'seam' where an earlier
chunk of history has been re-spliced into the file at a later position.
Also reports where the timestamp catches back up past the prior max
(re-joining forward progress)."""
import json
import sys

PATH = "/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl"

def main():
    lo = int(sys.argv[1])
    hi = int(sys.argv[2])
    running_max = None
    running_max_line = None
    in_backward = False
    with open(PATH, encoding="utf-8", errors="replace") as f:
        for lineno, line in enumerate(f, 1):
            if lineno < lo:
                continue
            if lineno > hi:
                break
            line = line.strip()
            if not line:
                continue
            rec = json.loads(line)
            ts = rec.get("timestamp")
            if not ts:
                continue
            if running_max is None:
                running_max = ts
                running_max_line = lineno
                continue
            if ts < running_max:
                if not in_backward:
                    print(f"SEAM (backward) at line {lineno}: ts={ts} drops below running max {running_max} (set at line {running_max_line})")
                    in_backward = True
            else:
                if in_backward:
                    print(f"  rejoin (forward again) at line {lineno}: ts={ts} (>= prior max {running_max})")
                    in_backward = False
                running_max = ts
                running_max_line = lineno

if __name__ == "__main__":
    main()
