#!/usr/bin/env python3
# huge-methods.py [BUILD_DIR] : lists every method in the built classes whose bytecode is longer than
# HotSpot's huge-method limit (8,000 bytes). HotSpot never compiles such a method to machine code while its
# flag DontCompileHugeMethods is true, the default, so the method always runs in the JVM's interpreter
# (explorations/perf-probes/checker-speed-2/REPORT.md has the case that was found in the type checker and
# split). BUILD_DIR defaults to ProjectFortress/build, so run it from the repository's root after a build.
# It reads the class files only; it runs nothing.
# The methods known to be over the limit are in huge-methods.known beside this script, one "class method"
# per line. The script exits 1 if a method over the limit is not in that file, and 0 otherwise.
# huge-methods.py --write-known [BUILD_DIR] rewrites that file from the build.
import struct, sys, os

def scan(path):
    d=open(path,'rb').read()
    if d[:4]!=b'\xca\xfe\xba\xbe': return []
    p=8; n=struct.unpack('>H',d[p:p+2])[0]; p+=2
    cp=[None]*n; i=1
    while i<n:
        t=d[p]
        if t==1:
            l=struct.unpack('>H',d[p+1:p+3])[0]; cp[i]=d[p+3:p+3+l].decode('utf8','replace'); p+=3+l
        elif t in(3,4,9,10,11,12,17,18): p+=5
        elif t in(5,6): p+=9; i+=1
        elif t in(7,8,16,19,20): p+=3
        elif t==15: p+=4
        else: raise Exception('tag %d'%t)
        i+=1
    p+=6
    ni=struct.unpack('>H',d[p:p+2])[0]; p+=2+2*ni
    def attrs(p,cb=None):
        na=struct.unpack('>H',d[p:p+2])[0]; p+=2
        for _ in range(na):
            name,l=struct.unpack('>HI',d[p:p+6]); p+=6
            if cb: cb(cp[name],p)
            p+=l
        return p
    nf=struct.unpack('>H',d[p:p+2])[0]; p+=2
    for _ in range(nf): p=attrs(p+6)
    nm=struct.unpack('>H',d[p:p+2])[0]; p+=2
    out=[]
    for _ in range(nm):
        name=cp[struct.unpack('>H',d[p+2:p+4])[0]]
        def cb(an,q,name=name):
            if an=='Code': out.append((struct.unpack('>I',d[q+4:q+8])[0],name))
        p=attrs(p+6,cb)
    return out

LIMIT = 8000
args = [a for a in sys.argv[1:] if a != '--write-known']
root = args[0] if args else 'ProjectFortress/build'
known_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'huge-methods.known')
res = []
for dp, _, fs in os.walk(root):
    for f in fs:
        if f.endswith('.class'):
            path = os.path.join(dp, f)
            for length, method in scan(path):
                if length > LIMIT:
                    res.append((length, os.path.relpath(path, root)[:-len('.class')], method))
res.sort(reverse=True)
if '--write-known' in sys.argv:
    with open(known_path, 'w') as out:
        for _, c, m in sorted(res, key=lambda r: (r[1], r[2])):
            out.write('%s %s\n' % (c, m))
known = set(l.strip() for l in open(known_path)) if os.path.exists(known_path) else set()
new = 0
print('%d methods over %d bytes of bytecode in %s' % (len(res), LIMIT, root))
for length, c, m in res:
    mark = '' if '%s %s' % (c, m) in known else '   NEW'
    new += bool(mark)
    print('%6d %s %s%s' % (length, c, m, mark))
if new:
    print('%d not in huge-methods.known: split each, or add it to the file with a reason in the commit' % new)
sys.exit(1 if new else 0)
