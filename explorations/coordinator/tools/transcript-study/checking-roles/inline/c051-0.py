import json,re
res=json.load(open('results10.json'))
print(res['rung:N']['precedentSearch'])
print('-----')
t=res['rung:N']['reportText']
i=t.find('## 4.'); print(t[i:i+3600])
