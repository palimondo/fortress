import subprocess,re
files=["Specification/basic-lib/numbers.tex","Specification/basic-lib/basic-integers.tex","Specification/basic/expressions/literals.tex","Specification/basic/conversions-coercions.tex","Specification/basic/expressions/reductions.tex","Specification/advanced-lib/numbers-advanced.tex","Specification/appendices/internal-document.tex"]
ch=open("Specification/appendices/changes.tex").read()
def norm(s):
    s=re.sub(r'\\pushtabs|\\poptabs|\\=|\\\+|\\-|\{\\tt~+\}','',s)
    s=s.replace('\\\\','')
    s=re.sub(r'\s+',' ',s).strip()
    return s
chn=norm(ch)
for f in files:
    d=subprocess.run(["git","diff","-U0","e5414f5bf","--",f],capture_output=True,text=True).stdout
    for line in d.splitlines():
        if line.startswith('-') and not line.startswith('---'):
            t=line[1:]
            if t.strip()=='' or t.lstrip().startswith('%'): continue
            n=norm(t)
            if not n: continue
            if n not in chn:
                print("NOTQUOTED",f,":",t[:140])
