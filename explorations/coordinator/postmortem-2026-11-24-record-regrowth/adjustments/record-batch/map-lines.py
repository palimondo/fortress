#!/usr/bin/env python3
"""map-lines.py MAPDIR SCOUT F-n ...: add the sorting map's lines for a chunk's entries to its scout.md.

The batch workflow (record-batch.js) runs it after each chunk's scout, so that the clarity workflow's
assessor and writer, which read scout.md, have the map's disposition of each entry beside the scout's
evidence. MAPDIR holds map.json and the claims files that it names (the map stage's sorting/ folder). For
each entry the script adds, as data: the map's line (its disposition), the subjects of its claims with
their owners, the parts that go to other entries, the claims to move out, the defects and their rows,
the checks, the groups of overlap that hold it, the parts that other entries send to it, and its block
of the claims file, word for word. It marks each other entry as in this chunk or not. It writes nothing
else; a second call replaces the section that the first added. With no map.json in MAPDIR it adds nothing and says so; exit 0 either way, 2 on a wrong call.
"""
import json, os, re, sys

if len(sys.argv) < 4:
    print(__doc__.split('\n')[0]); sys.exit(2)
mapdir, scout, entries = sys.argv[1], sys.argv[2], sys.argv[3:]
path = os.path.join(mapdir, 'map.json')
if not os.path.exists(path):
    print('map-lines: no map.json in ' + mapdir + '; nothing added'); sys.exit(0)
m = json.load(open(path))
E, S = m['entries'], {s['key']: s for s in m['subjects']}
chunk = set(entries)
where = lambda e: e + (' (in this chunk)' if e in chunk else ' (not in this chunk' + (', chunk ' + E[e]['chunk'] if e in E else '') + ')')
label = lambda k: '"' + S[k]['label'] + '"' + (', owner ' + S[k]['owner'] if S.get(k, {}).get('owner') else ', no owner: a new entry') if k in S else k

def block(e):
    f = os.path.join(mapdir, E[e]['claims_file'])
    if not os.path.exists(f):
        return '(claims file ' + E[e]['claims_file'] + ' not found)'
    lines, out, level = open(f).read().split('\n'), [], None
    for l in lines:
        h = re.match(r'(#{2,4}) ', l)
        if level is None:
            if h and re.match(r'#{2,4} ' + re.escape(e) + r'\b', l):
                level = len(h.group(1)); out.append(l)
        elif h and len(h.group(1)) <= level:
            break
        else:
            out.append(l)
    return '\n'.join(out).strip() or '(no block for ' + e + ' in ' + E[e]['claims_file'] + ')'

nums = lambda xs: ('claim ' if len(xs) == 1 else 'claims ') + ', '.join(map(str, xs))
incoming = {}
for src, x in E.items():
    for p in x['parts']:
        if p['to'] in chunk and src not in chunk:
            incoming.setdefault(p['to'], []).append(nums(p['claims']) + ' of ' + where(src) + ', subject ' + label(p['subject']))
    if x.get('merged_into') in chunk and src not in chunk:
        incoming.setdefault(x['merged_into'], []).append('the whole of ' + where(src) + ', merged into it')

out = ['', '## The sorting map\'s lines for these entries', '',
       'Data from the sorting map, ' + path + ' (MAP.md beside it, sections 3 to 5), and the claims files beside it. '
       'For each entry: the map\'s line, which gives its disposition; the subjects of its claims, each with the entry that owns it; '
       'where each part goes; its claims as the claims file numbers them. Each other entry is marked as in this chunk or not.', '']
for e in entries:
    x = E.get(e)
    out.append('### ' + e)
    if not x:
        out += ['The map holds no line for ' + e + '.', '']; continue
    out.append('- The map\'s line: ' + x['line'].lstrip('- '))
    out.append('- Shape: ' + x['shape'] + '. Disposition: ' + x['disposition'] + '.' + (' Merged into ' + where(x['merged_into']) + (': ' + x['why'] if x.get('why') else '') + '.' if x.get('merged_into') else ''))
    keys = []
    for c in x['claims']:
        if c[2] not in keys: keys.append(c[2])
    out.append('- Subjects of its claims: ' + '; '.join(k + ' ' + label(k) + ' (claims ' + ', '.join(str(c[0]) for c in x['claims'] if c[2] == k) + ')' for k in keys) + '.')
    for p in x['parts']:
        out.append('- A part goes to another entry: ' + nums(p['claims']) + ', subject ' + label(p['subject']) + ', to ' + where(p['to']) + '.')
    if x['move_out']:
        out.append('- Claims to move out of the entry, by kind: ' + '; '.join(k + ' ' + ', '.join(map(str, v)) for k, v in x['move_out'].items()) + '.')
    for d in x['defects']:
        out.append('- Defect: claim ' + str(d['n']) + ', ledger row' + ('s ' if len(d['rows']) > 1 else ' ') + ', '.join(map(str, d['rows'])) + '.')
    if x['checks']:
        out.append('- Today\'s checks: ' + '; '.join(sorted(set(x['checks']))) + '.')
    for g in m['groups']:
        if e in g['entries']:
            out.append('- Group of overlap ' + g['id'] + ', "' + g['name'] + '": ' + g['shared'] + '; with ' + ', '.join(where(o) for o in g['entries'] if o != e) + '.')
    for i in incoming.get(e, []):
        out.append('- Sent here by the map: ' + i + '.')
    out += ['- Its claims, from ' + x['claims_file'] + ', word for word:', '', '~~~', block(e), '~~~', '']
HEAD = '\n## The sorting map\'s lines for these entries\n'
old = open(scout).read() if os.path.exists(scout) else ''
if HEAD in old:   # a second call replaces the section that a first call added, so a resumed run adds it once
    old = old[:old.index(HEAD)]
with open(scout, 'w') as f:
    f.write(old.rstrip('\n') + '\n' + '\n'.join(out) + '\n')
print('map-lines: ' + str(len(entries)) + ' entries added to ' + scout + ', ' + str(sum(1 for e in entries if e in E)) + ' with a line in the map')
