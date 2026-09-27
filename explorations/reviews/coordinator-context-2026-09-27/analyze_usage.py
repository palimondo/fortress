#!/usr/bin/env python3
"""Analyze the assistant usage sequence in segment.jsonl: context size over
time (input+cache_read+cache_creation), start, peak, and the largest
consecutive jumps."""
import json

def main():
    rows = []
    with open("segment.jsonl") as f:
        for line in f:
            r = json.loads(line)
            if r["type"] == "assistant" and "usage" in r:
                u = r["usage"]
                total = u["input"] + u["cache_read"] + u["cache_creation"]
                rows.append((r["line"], r["ts"], total, u))

    print(f"Total assistant usage records: {len(rows)}")
    print(f"First: line={rows[0][0]} ts={rows[0][1]} total={rows[0][2]} usage={rows[0][3]}")
    peak = max(rows, key=lambda x: x[2])
    print(f"Peak: line={peak[0]} ts={peak[1]} total={peak[2]} usage={peak[3]}")
    last = rows[-1]
    print(f"Last: line={last[0]} ts={last[1]} total={last[2]} usage={last[3]}")

    jumps = []
    for i in range(1, len(rows)):
        prev = rows[i-1]
        cur = rows[i]
        diff = cur[2] - prev[2]
        jumps.append((diff, prev, cur))
    jumps.sort(key=lambda x: -x[0])
    print("\nTop 15 jumps (context total increase between consecutive assistant calls):")
    for diff, prev, cur in jumps[:15]:
        print(f"  +{diff}\tfrom line={prev[0]} ts={prev[1]} total={prev[2]}\tto line={cur[0]} ts={cur[1]} total={cur[2]}")

    print("\nTop 5 DROPS (in case interesting):")
    for diff, prev, cur in jumps[-5:]:
        print(f"  {diff}\tfrom line={prev[0]} ts={prev[1]} total={prev[2]}\tto line={cur[0]} ts={cur[1]} total={cur[2]}")

    # Print full sequence compactly for reference
    print("\nFull sequence (line, ts, total):")
    for line, ts, total, u in rows:
        print(f"  {line}\t{ts}\t{total}")

if __name__ == "__main__":
    main()
