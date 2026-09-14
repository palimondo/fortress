import re, json, os, sys
src = open('/home/user/fortress/explorations/run-c3/tour.md').read()
head, body = src.split('\n---\n', 1)
# intro
lines = head.strip().split('\n')
title = lines[0].lstrip('# ').strip()
paras = [p.strip() for p in '\n'.join(lines[1:]).strip().split('\n\n') if p.strip()]
secs = []
for blk in re.split(r'\n## ', body):
    blk = blk.strip()
    if not blk: continue
    if blk.startswith('## '): blk = blk[3:]
    m = re.match(r'(\d+)\.\s+(.*)', blk.split('\n')[0])
    num, name = m.group(1), m.group(2)
    formula = re.search(r'^Formula:\s*(.*?)\s*$', blk, re.M).group(1)
    dyalog = re.search(r'^Dyalog:\s*`(.*)`\s*$', blk, re.M).group(1)
    fort = re.search(r'^Fortress:\n```\n(.*?)\n```', blk, re.M|re.S).group(1).split('\n')
    note = re.search(r'^Note:\s*(.*?)$', blk, re.M|re.S).group(1).strip()
    secs.append(dict(num=int(num), name=name, formula=formula, dyalog=dyalog, fortress=fort, note=note))
json.dump(dict(title=title, paras=paras, secs=secs), open('/home/user/fortress/explorations/run-c3/probes/tour/tour.json','w'), indent=1)
print(len(secs))
for s in secs: print(s['num'], s['name'], len(s['fortress']))
