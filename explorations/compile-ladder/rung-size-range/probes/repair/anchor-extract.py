import re, subprocess, sys, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../../..'))
edited = {
 'TypeWellFormedChecker.scala':'ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala',
 'EvalType.java':'ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java',
 'BaseEnv.java':'ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BaseEnv.java',
 'IntNat.java':'ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/IntNat.java',
 'Int.java':'ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java',
 'Long.java':'ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Long.java',
 'NN32.java':'ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java',
 'UnsignedLong.java':'ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/UnsignedLong.java',
 'RangeInternals.fss':'Library/RangeInternals.fss',
 'FortressLibrary.fss':'Library/FortressLibrary.fss',
}
tests = subprocess.run(['git','diff','--name-only','-M','382b9fe7f','HEAD','--','ProjectFortress/tests','ProjectFortress/compiler_tests'],capture_output=True,text=True).stdout.split()
for t in tests: edited[os.path.basename(t)] = t
tok = re.compile(r'((?:[A-Za-z0-9_.\-]+/)*[A-Za-z0-9_\-]+\.(?:fss|fsi|java|scala|test|txt|tex|md|py|sh))|:(\d+)(?:-(\d+))?')
def show(rev, path, a, b):
    r = subprocess.run(['git','show',f'{rev}:{path}'],capture_output=True,text=True)
    if r.returncode: return ['<absent>']
    L = r.stdout.split('\n')
    return [f'{i}: {L[i-1][:160]}' if i-1 < len(L) else f'{i}: <eof>' for i in range(a, b+1)]
for fn in sys.argv[1:]:
    text = open(fn).read()
    for ln, line in enumerate(text.split('\n'), 1):
        cur = None
        # resolve within the line; shorthand ':N' refers to the last file named earlier on this line
        for m in tok.finditer(line):
            if m.group(1):
                cur = m.group(1); continue
            if cur is None: continue
            f = None
            a, b = int(m.group(2)), int(m.group(3) or m.group(2))
            base = os.path.basename(cur)
            if base not in edited: continue
            # exclude captures and probe paths that share a basename
            if not (cur.endswith(edited[base]) or '/' not in cur or edited[base].endswith(cur)): continue
            p = edited[base]
            at382 = '382b9fe7f' in line[max(0,m.start()-200):m.end()+40]
            print(f'### {os.path.basename(fn)}:{ln} cites {cur}:{a}{"-"+str(b) if b!=a else ""}  [{p}]{"  (382b9fe7f near)" if at382 else ""}')
            print('  context: ' + line[max(0,m.start()-110):m.end()+40].replace('\n',' '))
            h = show('HEAD', p, a, min(b, a+5)); bs = show('382b9fe7f', p, a, min(b, a+5))
            for s in h: print('  HEAD ' + s)
            if h != bs:
                for s in bs: print('  BASE ' + s)
            else: print('  (BASE same)')
