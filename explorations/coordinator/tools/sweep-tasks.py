#!/usr/bin/env python3
"""Sweep the session's shared task list at a batch's landing.

The batch agents write their own to-dos into the coordinating session's
task list, and nothing removes them; the harness then shows every agent the
whole list, other agents' tasks included
(process-engineering/task-list-archaeology.md). The coordinator runs this
as the first step of a landing ("The landing", the coordinator skill's
references/batch.md):

    explorations/coordinator/tools/sweep-tasks.py            # counts only
    explorations/coordinator/tools/sweep-tasks.py --delete   # removes them

--delete removes every task file once no workflow runs; with --running (a
workflow still runs, such as a probe), it removes only completed tasks.
.highwatermark is raised to the highest id removed, as the harness's own
deletion does, so that new ids do not repeat old ones.
"""
import argparse, collections, glob, json, os, sys

SESSION = 'fe616d40-a9c6-56d7-9da1-7168a172765d'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dir', default=os.path.expanduser('~/.claude/tasks/' + SESSION))
    ap.add_argument('--delete', action='store_true')
    ap.add_argument('--running', action='store_true', help='a workflow still runs: remove completed tasks only')
    a = ap.parse_args()
    files = sorted(glob.glob(os.path.join(a.dir, '*.json')), key=lambda f: int(os.path.basename(f)[:-5]))
    status = collections.Counter()
    gone, top = 0, 0
    for f in files:
        with open(f) as h:
            t = json.load(h)
        status[t.get('status')] += 1
        if a.delete and (not a.running or t.get('status') == 'completed'):
            os.remove(f)
            gone += 1
            top = max(top, int(t['id']))
    if gone:
        mark = os.path.join(a.dir, '.highwatermark')
        old = int(open(mark).read().strip() or 0) if os.path.exists(mark) else 0
        if top > old:
            with open(mark, 'w') as h:
                h.write(str(top))
    print('tasks: %d (%s); removed: %d' % (len(files), ', '.join('%s %d' % kv for kv in sorted(status.items())), gone))


if __name__ == '__main__':
    sys.exit(main())
