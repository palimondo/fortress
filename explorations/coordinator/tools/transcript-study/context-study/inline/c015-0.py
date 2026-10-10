import json,re
f='agent-ac7f17fcef729d710.jsonl'
first=json.loads(open(f).readline())
c=first['message']['content']
print(len(c))
for m in re.finditer(r'^(#+ .*)$',c,re.M):
    print(m.start(), m.group(1)[:120])
