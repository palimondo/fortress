s=open('summarize.py').read()
s=s.replace("'C':{130:['RUN']},'W':{},'N':{}}","'C':{130:['RUN'],1:['SETUP']},'W':{2:['SETUP'],6:['SETUP']},'N':{3:['SETUP']}}")
open('summarize.py','w').write(s)
s=open('final.py').read()
# make HIST check come after OVR
s=s.replace("""    if c['tool']=='Bash' and HIST.search""","""    if c['n'] in Z.OVR[w]: return Z.OVR[w][c['n']]
    if c['tool']=='Bash' and HIST.search""")
open('final.py','w').write(s)
