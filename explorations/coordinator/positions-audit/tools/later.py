#!/usr/bin/env python3
"""later.py: his messages after an entry's creation that may bear on it, though no commit of the
entry followed them (his later word may have gone into a skill or another record instead).

    python3 -I later.py 148                   (or P-148)
    python3 -I later.py 148 --top 25          how many to print (default 15)
    python3 -I later.py 148 --at 36f7db77c --until 2026-10-21T20:54
                                              the entry's text at a commit, and no message after a time

The candidates are his messages in the coordinating sessions (tlib.COORDINATING) from the entry's
creation on (for an entry struck from POSITIONS.md, its last text is read, and the list runs on
past the removal) (the first commit of its trail that made its text), less those that leads.py already
printed near the entry's own commits. Each is scored by the entry's distinctive terms:
  - its title's words, beyond common words (a stop list, and words in more than a tenth of his
    messages), lightly stemmed (possessive and plural off, cut to 7 letters); each weighs its
    rarity in his messages, log(messages / messages holding it);
  - its names in backticks, weight 3 each.
A term in his own words (lines that do not start with ">") counts whole; a term only in the
exchange around his message (the coordinator's message he answered, by the reply chain, its
reply to him, and the lines he quoted) counts half. A message also gains 8 when it falls in the
30 minutes before a commit that changed a file the entry names in backticks (`compiler.md`), other
than the entry's own commits, in lines that hold a title term (3 when the lines hold none): that
is where his word may have gone. Naming the entry's number (P-148, or as dictated, P148) adds 8 in
his words, 2 in the exchange. A message is a candidate when its weight is at least 5 (MIN) and it
holds a term in his own words or falls before such a commit. Printed: rank, weight, time, whether it
is after the entry's last change, the terms (in parentheses when only in the exchange), the commit
it precedes, and its first 300 characters; then how many candidates there were in all.
"""
import math
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import plib  # noqa: E402
import tlib  # noqa: E402

STOP = set('''a an the and or of to in on at by for with from as is are was be it its that this these those
he his him we our not no but so if then than into onto over under about after before right come comes came
also only each every both other another more most much many must should would could will have has had been
being were does done make makes made take takes like just very even still here once again your their there
them they what which when where while one two three first second last next same such some any all can may
might shall you yes now well good need needs needed want wants know think stays stay kept keep goes go'''.split())
MIN = 5.0          # the least weight of a candidate
FILE_EXT = re.compile(r'\.(md|fss|fsi|java|scala|py|sh|js|rats|ast|tex|txt|xml)$')


def stem(w):
    w = w.lower().replace('’', "'")
    w = re.sub(r"'s$", '', w)
    if w in STOP or len(w) < 3:
        return None
    for suf in ('ness', 'ments', 'ment', 'ings', 'ing', 'es', 's', 'ed'):
        if w.endswith(suf) and len(w) - len(suf) >= 4:
            w = w[:-len(suf)]
            break
    return w[:7]


def stems(text):
    return {s for s in (stem(x) for x in re.findall(r"[A-Za-z][A-Za-z'’-]{2,}", re.sub(r'`[^`]*`', ' ', text))) if s}


def own_and_quoted(text):
    ls = text.split('\n')
    return '\n'.join(l for l in ls if not l.lstrip().startswith('>')), '\n'.join(l for l in ls if l.lstrip().startswith('>'))


def home_commits(ticks, since, until, skip):
    """Commits from since to until that changed a tracked file the entry names in backticks."""
    names = [t for t in ticks if FILE_EXT.search(t)]
    if not names:
        return [], []
    files = plib.git('ls-files').split('\n')
    paths = sorted({f for f in files for n in names if f == n or f.endswith('/' + n)})
    if not paths:
        return [], []
    log = plib.git('log', '--format=%H%x09%aI%x09%s', '--since=' + since, *(['--until=' + until] if until else []),
                   '--', *paths)
    out = []
    for l in log.split('\n'):
        if not l.strip():
            continue
        h, a, s = l.split('\t', 2)
        if h in skip:
            continue
        diff = plib.git('show', '--format=', '--unified=0', h, '--', *paths)
        changed = '\n'.join(l[1:] for l in diff.split('\n') if l[:1] in '+-' and l[:3] not in ('+++', '---'))
        out.append((h, plib.utc(a), s, changed))
    return out, paths


def candidates(talk, num, text, created, last, until=None, exclude=(), skip_commits=()):
    title = plib.title_of(text) or ''
    msgs = [m for m in talk.msgs if m['sid'][:8] in tlib.COORDINATING]
    n = len(msgs)
    df = {}
    for m in msgs:
        for s in stems(m['text']):
            df[s] = df.get(s, 0) + 1
    tterms = {s: math.log(n / df.get(s, 1)) for s in stems(title) if df.get(s, 0) < n / 10}
    ticks = sorted(set(re.findall(r'`([^`\n]+)`', text)))
    commits, paths = home_commits(ticks, created, until, set(skip_commits))
    from datetime import datetime, timedelta
    cwin = []
    for h, a, s, changed in commits:
        shared = sorted(set(tterms) & stems(changed))
        cwin.append((datetime.fromisoformat(a[:19]) - timedelta(minutes=30), datetime.fromisoformat(a[:19]), h, a, s,
                     shared))
    numre = re.compile(r'(?<![\w-])P\s?E?-?\s?%d(?!\d)' % int(num[2:]), re.I)
    out = []
    for m in msgs:
        if m['ts'][:19] < created[:19] or (until and m['ts'][:19] > until[:19]) or m['ts'] in exclude:
            continue
        own, quoted = own_and_quoted(m['text'])
        hs = stems(own)
        a = talk.answered(m)
        ex = quoted + '\n' + '\n'.join(x.text for x in (a['turn']['texts'] if a['turn'] else [])) + '\n' + \
            '\n'.join(x.text for x in talk.reply(m))
        es = stems(ex)
        score, got = 0.0, []
        for s, w in sorted(tterms.items(), key=lambda x: -x[1]):
            if s in hs:
                score += w
                got.append(s)
            elif s in es:
                score += w / 2
                got.append('(%s)' % s)
        for t in ticks:
            if t in own:
                score += 3
                got.append('`%s`' % t)
            elif t in ex:
                score += 1.5
                got.append('(`%s`)' % t)
        named = 0
        if numre.search(own):
            score += 8
            named = 2
            got.insert(0, num)
        elif numre.search(ex):
            score += 2
            named = 1
            got.insert(0, '(%s)' % num)
        d = datetime.fromisoformat(m['ts'][:19])
        before = [c for c in cwin if c[0] <= d <= c[1]]
        if before:
            score += 8 if any(c[5] for c in before) else 3
        own_hit = any(not g.startswith('(') for g in got)
        if not got or score < MIN or not (own_hit or before):
            continue
        out.append({'score': score, 'm': m, 'terms': got, 'before': before, 'after_last': m['ts'][:19] > last[:19]})
    out.sort(key=lambda x: (-x['score'], x['m']['ts']))
    return {'title_terms': tterms, 'ticks': ticks, 'commits': commits, 'paths': paths, 'cands': out}


def entry_at(num, rev):
    t = plib.git('show', '%s:%s' % (rev, plib.PFILE))
    for e in plib.parse(t)[0]:
        if e['num'] == num:
            return e['raw']
    raise KeyError('%s at %s' % (num, rev))


def print_later(talk, w, num, out=sys.stdout, top=15, at=None, until=None, exclude=()):
    num = num if str(num).startswith('P-') else 'P-%s' % num
    p = lambda *a: print(*a, file=out)
    events = list(reversed(plib.trail(w, num)))
    made = [ev for ev in events if ev['kind'] in plib.TEXT_KINDS]
    st = None
    if at:
        cut = plib.git('show', '-s', '--format=%aI', at).strip()
        made = [ev for ev in made if w.info(ev['h'])['adate'][:19] <= plib.utc(cut)[:19]]
        try:
            text = entry_at(num, at)
        except KeyError:
            e, st = plib.find_entry(w, num)
            text = e['raw']
    else:
        e, st = plib.find_entry(w, num)
        text = e['raw']
    created = w.info(made[0]['h'])['adate']
    last = w.info(made[-1]['h'])['adate']
    r = candidates(talk, num, text, created, last, until, exclude, [ev['h'] for ev in events])
    c = r['cands']
    if st:
        p('%s is STRUCK (removed by %s); its terms are read from its text as it last stood, at %s' % (
            num, (st['removal'] or '?')[:9], st['last'][:9]))
    p('His later messages that may bear on %s: %d candidate(s) from its creation %s (last change %s%s)%s'
      % (num, len(c), created, last, ', text at %s' % at[:9] if at else '', ', to %s' % until if until else ''))
    p('   title terms (stem and weight): %s; names in backticks: %s' % (
        ', '.join('%s %.1f' % kv for kv in sorted(r['title_terms'].items(), key=lambda x: -x[1])) or 'none',
        ', '.join('`%s`' % t for t in r['ticks']) or 'none'))
    if r['paths']:
        p('   commits since its creation that changed %s, not its own: %d' % (', '.join(r['paths']), len(r['commits'])))
    if exclude:
        p('   left out: the %d message(s) printed above near its own commits' % len(exclude))
    for k, x in enumerate(c[:top], 1):
        m = x['m']
        p()
        p('%d. [weight %.1f] %s%s  source=%s (%d characters)  terms: %s' % (
            k, x['score'], m['ts'], ' after its last change' if x['after_last'] else '', m['source'], len(m['text']),
            ' '.join(x['terms'])))
        for b in x['before'][:2]:
            p('   in the 30 minutes before %s %s "%s", which changed a file it names%s' % (
                b[2][:9], b[3], b[4][:90], ', lines with %s' % ', '.join(b[5]) if b[5] else ''))
        s = re.sub(r'\s+', ' ', m['text']).strip()
        p('   ' + (s if len(s) <= 300 else s[:300] + ' [...]'))
    if len(c) > top:
        p()
        p('(%d more candidates, weaker; later.py %s --top N prints more)' % (len(c) - top, num[2:]))
    return r


def main(argv):
    if not argv or argv[0] in ('-h', '--help'):
        print(__doc__)
        return 0
    top, at, until = 15, None, None
    for flag in ('--top', '--at', '--until'):
        if flag in argv:
            k = argv.index(flag)
            v = argv[k + 1]
            argv = argv[:k] + argv[k + 2:]
            if flag == '--top':
                top = int(v)
            elif flag == '--at':
                at = v
            else:
                until = tlib.parse_time(v)
    w = plib.World()
    talk = tlib.Talk()
    print_later(talk, w, argv[0], top=top, at=at, until=until)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
