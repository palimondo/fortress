#!/usr/bin/env python3
# run-study.py NOTE WORKDIR BATCH [BATCH...] [--root DIR]
#
# Runs the recovered scripts of one earlier study (NOTE: labor, checking-roles, testing-practices) over the
# climb batches named, in a working folder of their own. The scripts are copied unchanged but for the
# substitutions below, which this file prints as it applies them: the folder of the transcripts, the run
# ids of the batches (the scripts hold them as constants), the batch's base commit, the roles and rung
# letters of the batches, and the role "coldread" that batch 11 added. Nothing else is edited, so the
# scripts compute what they computed in the studies. checking-roles needs labor's output and so runs the
# labor chain first. Output files are written to WORKDIR/out/.
#
#   --root DIR   the folder that holds the runs' folders (.../subagents/workflows). The default is the first of
#                the backup copy and the live folder of session fe616d40 that holds every run asked for.
import glob, json, os, re, shutil, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
LIVE = '/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows'
BAK = '/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows'
RUN = {8: 'wf_603242ca-111', 9: 'wf_f747fd3e-9e4', 10: 'wf_d5ec6194-bcc', 11: 'wf_88561d30-63b', 12: 'wf_7814a5bc-549', 13: 'wf_33c4de68-284'}
BASE = {8: '493b4076f', 9: 'fa14a190c', 10: '9c9e823d5', 11: '83b1cae78', 12: '7fa767d48', 13: 'a1a75716a'}

def sub(path, pairs, log):
    s = open(path).read()
    for a, b in pairs:
        if a not in s:
            continue
        s = s.replace(a, b)
        log.append('%s: %s -> %s' % (os.path.basename(path), a[:70], b[:90]))
    open(path, 'w').write(s)

def rung_letters(root, batches):
    out = ''
    for b in batches:
        for l in open(os.path.join(root, RUN[b], 'journal.jsonl')):
            d = json.loads(l)
            if d['type'] == 'started':
                p = (d.get('label') or '').split(':')
                if len(p) > 1 and re.fullmatch(r'[A-Z]', p[1]) and p[1] not in out:
                    out += p[1]
    return out

def run(workdir, scripts, log):
    for s in scripts:
        name = s[0] if isinstance(s, (list, tuple)) else s
        args = list(s[1:]) if isinstance(s, (list, tuple)) else []
        out = os.path.join(workdir, 'out', name.replace('.py', '') + ('-' + '-'.join(a.replace(':', '') for a in args) if args else '') + '.txt')
        with open(out, 'w') as o:
            r = subprocess.run(['python3', name] + args, cwd=workdir, stdout=o, stderr=subprocess.STDOUT, timeout=900)
        if r.returncode:
            log.append('FAILED %s %s (exit %d), see %s' % (name, ' '.join(args), r.returncode, out))

def main():
    a = sys.argv[1:]
    root = None
    if '--root' in a:
        i = a.index('--root'); root = a[i + 1]; del a[i:i + 2]
    note, workdir, batches = a[0], os.path.abspath(a[1]), [int(x) for x in a[2:]]
    if root is None:
        root = next((r for r in (BAK, LIVE) if all(os.path.isfile(os.path.join(r, RUN[b], 'journal.jsonl')) for b in batches)), None)
        if root is None:
            sys.exit('no folder holds every run asked for; give --root')
    os.makedirs(os.path.join(workdir, 'out'), exist_ok=True)
    log = []
    runs_dict = '{' + ','.join("'%s':%d" % (RUN[b], b) for b in batches) + '}'
    bases = '{' + ','.join("%d:'%s'" % (b, BASE[b]) for b in batches) + '}'
    tags_dict = '{' + ','.join("'b%d':'%s'" % (b, RUN[b]) for b in batches) + '}'
    letters = rung_letters(root, batches)
    tup = '(' + ','.join(str(b) for b in batches) + (',' if len(batches) == 1 else '') + ')'
    if note in ('labor', 'checking-roles'):
        for f in glob.glob(os.path.join(HERE, 'labor', '*.py')):
            shutil.copy(f, workdir)
        shutil.copy(os.path.join(HERE, 'labor', 'inline', 'c023-0.py'), os.path.join(workdir, 'briefs_inline.py'))
        shutil.copy(os.path.join(HERE, 'by-batch.py'), workdir)
        for f in glob.glob(os.path.join(workdir, '*.py')):
            sub(f, [(LIVE, root)], log)
        sub(os.path.join(workdir, 'parse.py'), [("RUNS={'wf_603242ca-111':8,'wf_f747fd3e-9e4':9}", 'RUNS=' + runs_dict)], log)
        sub(os.path.join(workdir, 'j.py'), [("['wf_603242ca-111','wf_f747fd3e-9e4']", '[' + ','.join("'%s'" % RUN[b] for b in batches) + ']')], log)
        sub(os.path.join(workdir, 'explore.py'), [("BASE={8:'493b4076f',9:'fa14a190c'}", 'BASE=' + bases),
            ("'judge:review','repair:review','commit']", "'judge:review','repair:review','commit','coldread']")], log)
        sub(os.path.join(workdir, 'acct.py'), [("'review':'review','commit':'commit'}[base]", "'review':'review','commit':'commit','coldread':'coldread'}[base]")], log)
        old_only = all(b <= 10 for b in batches)     # gen_matrix.py tabulates the roles of the old workflow, each of which must occur
        sub(os.path.join(workdir, 'shared.py'), [("list('IQOMRKWS')", "list('%s')" % letters), ('for batch in (8,9):', 'for batch in %s:' % tup)], log)
        sub(os.path.join(workdir, 'briefs_inline.py'), [('for batch in (8,9):', 'for batch in %s:' % tup)], log)
        run(workdir, ['parse.py', 'briefs_inline.py', 'cls2.py', 'acct.py', 'tab1.py', 'topfiles.py', 'explore.py', 'shared.py', 'reread.py', 'tab2.py',
                      'inbrief.py', 'inbrief2.py', 'inbrief3.py'] + (['gen_matrix.py'] if old_only else []) + ['gen_agents.py', ['by-batch.py'] + [str(b) for b in batches]], log)
    if note == 'checking-roles':
        for f in glob.glob(os.path.join(HERE, 'checking-roles', '*.py')):
            if os.path.basename(f) != 'parse.py':
                shutil.copy(f, workdir)
        for f in glob.glob(os.path.join(workdir, '*.py')):
            sub(f, [(LIVE, root)], log)
        for b in batches:
            # matrix10.py, kinds10.py, shared10.py and briefs10.py hold batch 10 as a constant; one copy for each batch
            roles = "['rung','skeptic','judge','repair','skeptic2','gather','review','gate','coldread','commit']"
            for src, dst, pairs in (
                ('matrix10.py', 'matrix%d.py' % b, [("if which=='10':", "if which=='%d':" % b),
                    ("g=collections.OrderedDict((r,sel(10,r)) for r in ['rung','skeptic','judge','repair','skeptic2','gather','review','gate','commit'])",
                     "g=collections.OrderedDict((r,sel(%d,r)) for r in %s if sel(%d,r))" % (b, roles, b))]),
                ('kinds10.py', 'kinds%d.py' % b, [('from matrix10 import', 'from matrix%d import' % b),
                    ("for r in ['rung','skeptic','judge','skeptic2','repair']:\n        show(r,sel(10,r))", "for r in ['rung','skeptic','judge','skeptic2','repair']:\n        if sel(%d,r): show(r,sel(%d,r))" % (b, b)),
                    ("ch=sel(10,'skeptic')+sel(10,'judge')+sel(10,'skeptic2')", "ch=sel(%d,'skeptic')+sel(%d,'judge')+sel(%d,'skeptic2')" % (b, b, b))]),
                ('shared10.py', 'shared%d.py' % b, [("list('NCGW')", "list('%s')" % letters), ('for batch in (10,):', 'for batch in (%d,):' % b),
                    ("o['batch']==10", "o['batch']==%d" % b), ("open('shared10.pkl','wb')", "open('shared%d.pkl','wb')" % b)]),
            ):
                shutil.copy(os.path.join(HERE, 'checking-roles', src), os.path.join(workdir, dst))   # from the recovered file, each time
                sub(os.path.join(workdir, dst), [(LIVE, root)] + pairs, log)
            run(workdir, [['matrix%d.py' % b, str(b)], 'kinds%d.py' % b, 'shared%d.py' % b], log)
    if note == 'testing-practices':
        for f in glob.glob(os.path.join(HERE, 'testing-practices', '*.py')):
            shutil.copy(f, workdir)
        tags = ','.join("'b%d'" % b for b in batches)
        for f in glob.glob(os.path.join(workdir, '*.py')):
            sub(f, [(LIVE, root), ("['b8','b9','b10']", '[' + tags + ']')], log)
        sub(os.path.join(workdir, 'parse.py'), [("RUNS={'b8':'wf_603242ca-111','b9':'wf_f747fd3e-9e4','b10':'wf_d5ec6194-bcc'}", 'RUNS=' + tags_dict)], log)
        run(workdir, ['parse.py', 'cat1.py', 'cat2.py', 'cat3.py', 'cat4.py', 'cost.py', 'learn.py', 'wrappers.py', 'fails.py', 'errs.py'], log)
    with open(os.path.join(workdir, 'out', 'substitutions.txt'), 'w') as f:
        f.write('\n'.join(log) + '\n')
    print('\n'.join(log))

if __name__ == '__main__':
    main()
