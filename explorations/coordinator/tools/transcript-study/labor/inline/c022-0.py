import re
from brief import first_msgs
m=first_msgs('wf_603242ca-111','a226d80289a5176a7')
print(m[0][:400]); t=m[1]
print(repr(t[:700]))
for mm in re.finditer(r'^\s*(#{1,4} .*)$',t,re.M):
    print(mm.start(),mm.group(1)[:100])
