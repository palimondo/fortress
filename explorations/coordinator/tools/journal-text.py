#!/usr/bin/env python3
# journal-text.py [--journal PATH] --out FILE FIELD LABEL... [--first-round LABEL...]
#
# Writes one text field of an agent's structured result, as the batch run's journal holds it, to FILE,
# byte for byte, without the text passing through the context of the agent that runs the command. The
# gather of a climb batch writes a rung's REPORT.md, record.md and SKEPTIC.md this way where the rung's
# branch does not carry them (coordinator/climb-batch-workflow.md, "The rungs' texts from the run's
# journal"): the harness refuses a subagent's write of REPORT.md, and until 2026-09-29 the script pasted
# every rung's texts whole into the gather's brief, 195K tokens of it in batch N
# (explorations/reviews/batch-N-review.md, question 2).
#
# The journal is the Workflow harness's journal.jsonl: a "started" line per agent with its label and key,
# and a "result" line with the same key and the agent's structured result (an agent that came back with
# nothing has no result line). A LABEL matches the label itself and its retries, LABEL:attemptN. FIELD is
# taken from the LAST result, in journal order, of any agent whose label matches one of the LABELs: for a
# rung's worker "rung:I resume:I repair:I" is the result the script kept. With --first-round, the field
# of the last result matching those labels follows under a line "## First round" (a second skeptic's
# SKEPTIC.md). Without --journal the journal is found: the most recently modified journal.jsonl under
# $CLAUDE_CONFIG_DIR/projects or ~/.claude/projects whose last started agent is labelled gather (or
# gather:attemptN), which is the running gather's, since nothing else in a batch runs beside it. The path
# used is printed on stderr. Exit 0 when FILE was written; 1, writing nothing, when no journal is found,
# no result matches or the field is empty; 2 on a usage error.
import glob, json, os, re, sys


def usage(msg):
    sys.stderr.write('journal-text.py: ' + msg + '\nusage: journal-text.py [--journal PATH] --out FILE FIELD LABEL... [--first-round LABEL...]\n')
    sys.exit(2)


def parse(argv):
    journal, out, first, rest = None, None, None, []
    i = 0
    while i < len(argv):
        a = argv[i]
        if a == '--journal':
            i += 1; journal = argv[i] if i < len(argv) else usage('--journal needs a path')
        elif a == '--out':
            i += 1; out = argv[i] if i < len(argv) else usage('--out needs a path')
        elif a == '--first-round':
            first = []
        elif first is not None:
            first.append(a)
        else:
            rest.append(a)
        i += 1
    if not out or len(rest) < 2:
        usage('--out, FIELD and at least one LABEL are required')
    if first is not None and not first:
        usage('--first-round needs at least one LABEL')
    return journal, out, rest[0], rest[1:], first


def entries(path):
    out = []
    with open(path, encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                out.append(json.loads(line))
            except ValueError:
                pass   # a line cut off by a write in progress
    return out


def find_journal():
    bases = [os.environ.get('CLAUDE_CONFIG_DIR'), os.path.expanduser('~/.claude')]
    found = []
    for b in [x for x in bases if x]:
        found += glob.glob(os.path.join(b, 'projects', '**', 'journal.jsonl'), recursive=True)
    for p in sorted(set(found), key=os.path.getmtime, reverse=True):
        started = [e for e in entries(p) if e.get('type') == 'started']
        if started and re.fullmatch(r'gather(:attempt\d+)?', str(started[-1].get('label', ''))):
            return p
    return None


def last_field(es, labels, field):
    pat = re.compile('(' + '|'.join(re.escape(l) for l in labels) + r')(:attempt\d+)?')
    keys = {e.get('key') for e in es if e.get('type') == 'started' and pat.fullmatch(str(e.get('label', '')))}
    text = None
    for e in es:
        if e.get('type') == 'result' and e.get('key') in keys and isinstance(e.get('result'), dict):
            text = e['result'].get(field)
    return text if isinstance(text, str) and text.strip() else None


def main():
    journal, out, field, labels, first = parse(sys.argv[1:])
    journal = journal or find_journal()
    if not journal or not os.path.isfile(journal):
        sys.stderr.write('journal-text.py: no journal found; nothing written\n')
        return 1
    sys.stderr.write('journal-text.py: journal ' + journal + '\n')
    es = entries(journal)
    text = last_field(es, labels, field)
    if text is None:
        sys.stderr.write('journal-text.py: no result of ' + ' '.join(labels) + ' carries ' + field + '; nothing written\n')
        return 1
    if first is not None:
        earlier = last_field(es, first, field)
        if earlier is not None:
            text = text + ('' if text.endswith('\n') else '\n') + '\n## First round\n\n' + earlier
    with open(out, 'wb') as f:
        f.write(text.encode('utf-8'))
    sys.stderr.write('journal-text.py: wrote ' + out + ', ' + str(len(text.encode('utf-8'))) + ' bytes, ' + field + ' of ' + ' '.join(labels) + (' with the first round' if first is not None else '') + '\n')
    return 0


if __name__ == '__main__':
    sys.exit(main())
