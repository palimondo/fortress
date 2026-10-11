#!/usr/bin/env python3
"""tokens.py <run-out-dir>: the tokens a baseline-trial run wrote and read, from the sessions' own transcripts.

Reads every transcript under <run-out-dir>/<phase>/root/.claude/projects/ (the session's own file and its
subagents' and workflows' files below it), as tools/spend.py reads them: each API call is counted once, by its
message id, within its file. Written is input plus cache creation, read is cache read, and output is output.
Prints one line for each transcript and a total for each phase and for the run, and writes the same to
<run-out-dir>/tokens.txt.
"""
import json
import os
import sys


def count(path):
    seen = {}
    with open(path, errors='replace') as f:
        for line in f:
            if '"usage"' not in line:
                continue
            try:
                r = json.loads(line)
            except ValueError:
                continue
            m = r.get('message') if isinstance(r.get('message'), dict) else None
            if not m or not isinstance(m.get('usage'), dict):
                continue
            seen[m.get('id') or id(m)] = m['usage']
    w = sum(u.get('input_tokens', 0) + u.get('cache_creation_input_tokens', 0) for u in seen.values())
    rd = sum(u.get('cache_read_input_tokens', 0) for u in seen.values())
    out = sum(u.get('output_tokens', 0) for u in seen.values())
    return len(seen), w, rd, out


def main():
    run = sys.argv[1]
    lines, grand = [], [0, 0, 0, 0]
    for phase in sorted(os.listdir(run)):
        projects = os.path.join(run, phase, 'root', '.claude', 'projects')
        if not os.path.isdir(projects):
            continue
        total = [0, 0, 0, 0]
        for root, _, files in sorted(os.walk(projects)):
            for name in sorted(files):
                if not name.endswith('.jsonl'):
                    continue
                path = os.path.join(root, name)
                calls, w, rd, out = count(path)
                if not calls:
                    continue
                rel = os.path.relpath(path, projects)
                lines.append(f'{phase:9} {rel[-78:]:78} calls={calls:5} written={w:>11,} read={rd:>13,} output={out:>9,}')
                for i, v in enumerate((calls, w, rd, out)):
                    total[i] += v
        lines.append(f'{phase:9} {"TOTAL":78} calls={total[0]:5} written={total[1]:>11,} read={total[2]:>13,} output={total[3]:>9,}')
        for i in range(4):
            grand[i] += total[i]
    lines.append(f'{"run":9} {"TOTAL":78} calls={grand[0]:5} written={grand[1]:>11,} read={grand[2]:>13,} output={grand[3]:>9,}')
    text = '\n'.join(lines) + '\n'
    sys.stdout.write(text)
    with open(os.path.join(run, 'tokens.txt'), 'w') as f:
        f.write(text)


if __name__ == '__main__':
    main()
