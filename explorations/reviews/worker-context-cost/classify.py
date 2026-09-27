"""Classify one tool call of a batch agent as gathering, inspecting, doing or other.

gather   learning from the territory: source, library, specification, tests,
         the project's records, git history of any of them.
inspect  reading the work itself: the agent's own outputs and logs, its own
         diff and commits, the rung directory it works in (for a skeptic or a
         repair worker, the rung under review, whose REPORT and probes are
         its brief).
do       edits, writes, builds, test runs, probe runs, commits, the report.
other    waits, environment setup, bookkeeping (git status), tool search.

Rule for a Bash command: heredoc bodies are cut out (a heredoc feeding a
file is a write), quoted text is masked, the command is split into simple
commands, and each simple command's verb is read. Any doing verb, or a
redirect into a file, makes the call "do". Otherwise, if any verb reads,
the call is "gather" when one of the paths it names lies in the territory
(or it names none: a bare grep -r or find is a search of the tree), and
"inspect" when every path it names is the agent's own work. Git log, show
and blame are history reading ("gather") unless they name the agent's own
branch range (base..HEAD) or HEAD alone, which is "inspect"; git diff is
"inspect"; git status and branch are "other".
"""
import os
import re
import shlex

SETUP = {'cd', 'source', '.', 'export', 'unset', 'set', 'pushd', 'popd', 'true', ':', 'false',
         'local', 'declare', 'shopt', 'trap', 'umask', 'alias', 'return', 'exit', 'break', 'continue',
         'echo', 'printf', 'read', 'shift', 'eval', 'let', 'hash', 'ulimit'}
KEYWORDS = {'for', 'in', 'do', 'done', 'while', 'until', 'if', 'then', 'else', 'elif', 'fi', 'case',
            'esac', 'function', '!', '{', '}', '(', ')', '[[', ']]', 'select', 'time', 'coproc'}
PREFIX = {'timeout', 'nohup', 'env', 'nice', 'stdbuf', 'command', 'exec', 'xargs', 'sudo', 'setsid', 'unbuffer'}
READ = {'grep', 'egrep', 'fgrep', 'rg', 'find', 'ls', 'cat', 'head', 'tail', 'sed', 'awk', 'gawk', 'wc',
        'less', 'more', 'tree', 'file', 'stat', 'cut', 'sort', 'uniq', 'tr', 'nl', 'od', 'xxd', 'strings',
        'column', 'jq', 'diff', 'cmp', 'comm', 'readlink', 'realpath', 'basename', 'dirname', 'du', 'df',
        'md5sum', 'sha1sum', 'sha256sum', 'cksum', 'javap', 'jar', 'unzip', 'zipinfo', 'zcat', 'test', '[',
        'pwd', 'which', 'type', 'date', 'fold', 'rev', 'paste', 'join', 'expand', 'fmt', 'tac', 'printenv',
        'id', 'whoami', 'hostname', 'uname', 'nproc', 'free', 'seq', 'expr', 'bc', 'python3-read', 'look',
        'iconv', 'base64', 'numfmt', 'getent', 'locale', 'ldd', 'java-version', 'git-read', 'ag', 'ack'}
WAIT = {'sleep', 'wait', 'kill', 'pkill', 'ps', 'pgrep', 'jobs', 'wait_for', 'killall', 'disown', 'fg', 'bg', 'top', 'uptime'}
BUILD = {'ant', 'javac', 'scalac', 'make', 'mvn', 'gradle', 'sbt', 'latexmk', 'pdflatex', 'xelatex', 'lualatex', 'bibtex', 'makeindex'}
RUN = {'fortress', 'java', 'junit', 'bash', 'sh', 'zsh', 'run_bg', 'python3-run', 'python-run', 'node', 'perl-run',
       'script', 'fss', 'runFortress', 'fortressrun'}
EDIT = {'tee', 'patch', 'cp', 'mv', 'rm', 'mkdir', 'touch', 'chmod', 'ln', 'rmdir', 'install', 'truncate',
        'dd', 'tar', 'gzip', 'gunzip', 'zip', 'sed-i', 'perl-i', 'python3-write', 'mktemp', 'split', 'rsync', 'shred'}
GIT_READ = {'log', 'show', 'blame', 'grep', 'ls-files', 'ls-tree', 'cat-file', 'shortlog', 'rev-list',
            'describe', 'reflog', 'whatchanged', 'annotate', 'name-rev', 'for-each-ref', 'show-ref', 'count-objects', 'tag-list'}
GIT_INSPECT = {'diff', 'range-diff', 'difftool'}
GIT_OTHER = {'status', 'branch', 'rev-parse', 'merge-base', 'remote', 'config', 'worktree-list', 'stash-list',
             'fetch', 'check-ignore', 'version', 'help', 'var', 'symbolic-ref', 'fsck', 'gc', 'notes'}
GIT_DO = {'add', 'commit', 'push', 'checkout', 'reset', 'restore', 'stash', 'apply', 'merge', 'rebase',
          'cherry-pick', 'rm', 'mv', 'worktree', 'tag', 'switch', 'revert', 'am', 'clean', 'update-index', 'pull', 'init', 'clone'}

HEREDOC = re.compile(r"<<-?\s*(['\"]?)([A-Za-z_][A-Za-z0-9_]*)\1")


def strip_heredocs(cmd):
    """-> (command without heredoc bodies, [(delimiter, body)])"""
    lines = cmd.split('\n')
    out, bodies, i = [], [], 0
    while i < len(lines):
        ln = lines[i]
        out.append(ln)
        delims = [m.group(2) for m in HEREDOC.finditer(ln)]
        i += 1
        for d in delims:
            body = []
            while i < len(lines) and lines[i].strip() != d:
                body.append(lines[i]); i += 1
            i += 1
            bodies.append((d, '\n'.join(body)))
    return '\n'.join(out), bodies


def mask_quotes(s):
    """Replace each quoted string by a token Q<n>Q, keeping separators outside quotes.
    -> (masked, [quoted strings])"""
    out, quoted, i, n = [], [], 0, len(s)
    while i < n:
        c = s[i]
        if c == '\\' and i + 1 < n:
            out.append('xx'); i += 2; continue
        if c in ('"', "'"):
            j = i + 1; buf = []
            while j < n and s[j] != c:
                if c == '"' and s[j] == '\\' and j + 1 < n:
                    buf.append(s[j + 1]); j += 2; continue
                buf.append(s[j]); j += 1
            out.append('Q%dQ' % len(quoted)); quoted.append(''.join(buf))
            i = j + 1; continue
        if c == '#' and (i == 0 or s[i - 1] in ' \t\n;&|('):
            while i < n and s[i] != '\n':
                i += 1
            continue
        out.append(c); i += 1
    return ''.join(out), quoted


def unmask_paths(seg, quoted):
    """Put back the quoted strings of a segment that are a single path; drop the others."""
    def rep(m):
        q = quoted[int(m.group(1))]
        if re.fullmatch(r'\S+', q or '') and ('/' in q or re.search(r'\.(fss|fsi|java|scala|tex|md|test|txt|out|log)$', q)):
            return q
        return 'Q'
    return re.sub(r'Q(\d+)Q', rep, seg)


SPLIT = re.compile(r'(\|\||&&|;;|[;|&\n(){}`]|\$\()')


def simple_commands(masked):
    """-> [(separator before it, simple command)]; a command after a single | is a filter."""
    parts = SPLIT.split(masked)
    out, sep = [], ''
    for i, p in enumerate(parts):
        if i % 2 == 1:
            sep = p
        elif p.strip():
            out.append((sep, p.strip()))
    return out


ASSIGN = re.compile(r"(?<![\w$])([A-Za-z_][A-Za-z0-9_]*)=(\"[^\"\n]*\"|'[^'\n]*'|[^\s;&|]+)")


def substitute_vars(cmd):
    """Expand simple shell variables assigned in the same command (R=explorations/...; cat $R/x)."""
    vals = {}
    for m in ASSIGN.finditer(cmd):
        v = m.group(2).strip('"\'')
        if '$(' not in v and '`' not in v:
            vals[m.group(1)] = v
    for _ in range(2):
        for k, v in vals.items():
            cmd = re.sub(r'\$\{' + k + r'\}|\$' + k + r'(?![A-Za-z0-9_])', lambda _m, v=v: v, cmd)
    return cmd


def verb_of(seg):
    """-> (verb, args) of one simple command, skipping assignments and prefixes."""
    words = seg.split()
    k = 0
    while k < len(words):
        w = words[k]
        if re.match(r'^[A-Za-z_][A-Za-z0-9_]*=', w) or w in KEYWORDS:
            k += 1; continue
        if w in PREFIX:
            k += 1
            # skip the prefix's options and, for timeout, its duration
            while k < len(words) and (words[k].startswith('-') or re.match(r'^\d+[smh]?$', words[k])):
                k += 1
            continue
        break
    if k >= len(words):
        return None, []
    return words[k], words[k + 1:]


def classify_verb(verb, args, seg, bodies_text):
    """-> one of 'read', 'build', 'run', 'edit', 'git-read', 'git-inspect', 'git-other', 'git-do', 'wait', 'setup', 'unknown'"""
    base = os.path.basename(verb)
    if base in SETUP:
        return 'setup'
    if base == 'git':
        sub = None
        a = list(args)
        while a:
            x = a.pop(0)
            if x in ('-C', '-c', '--git-dir', '--work-tree'):
                a and a.pop(0); continue
            if x.startswith('-'):
                continue
            sub = x; break
        if sub == 'worktree' and a and a[0] == 'list':
            return 'git-other'
        if sub == 'stash' and a and a[0] in ('list', 'show'):
            return 'git-other'
        if sub == 'branch' and any(x in ('-D', '-d', '-m', '-M', '-f') for x in a):
            return 'git-do'
        if sub == 'tag' and (not a or any(x in ('-l', '--list', '--contains', '-n', '--points-at', '--merged') for x in a)):
            return 'git-other'
        if sub in GIT_READ: return 'git-read'
        if sub in GIT_INSPECT: return 'git-inspect'
        if sub in GIT_OTHER: return 'git-other'
        if sub in GIT_DO: return 'git-do'
        return 'git-other'
    if base == 'sed' and any(x.startswith('-i') or x == '--in-place' or re.match(r'^-[a-zA-Z]*i', x) for x in args):
        return 'edit'
    if base == 'perl':
        return 'edit' if any(re.match(r'^-[a-zA-Z]*i', x) for x in args) else 'run'
    if base in ('python3', 'python'):
        if bodies_text is not None and ('-' in args or '-c' in args or not args):
            t = bodies_text
            if re.search(r"open\([^)]*['\"][wa]b?\+?['\"]|\.write\(|write_text|write_bytes|os\.remove|shutil\.|os\.rename|os\.makedirs|mkdir\(", t):
                return 'edit'
            if re.search(r'subprocess|os\.system|Popen', t):
                return 'run'
            return 'read'
        return 'run'
    if base in READ: return 'read'
    if base in WAIT: return 'wait'
    if base in BUILD: return 'build'
    if base in EDIT: return 'edit'
    if base in RUN or base.endswith('.sh') or base.endswith('fortress') or base.startswith('run') or base.startswith('./'):
        return 'run'
    if base in ('java', 'jshell'):
        return 'run'
    return 'unknown'


PATH_TOKEN = re.compile(r"[A-Za-z0-9_./~$*{}\-+@:\[\]]*[A-Za-z0-9_*]")
WORKTREE = re.compile(r'/home/user/fortress[A-Za-z0-9_.\-]*/')


def norm_path(p):
    p = WORKTREE.sub('', p)
    p = p.replace('$FORTRESS_HOME/', '').replace('${FORTRESS_HOME}/', '')
    return p


def is_scratch(p):
    """A path in the agent's scratch space: tmp/, /tmp, the scratchpad, a log."""
    low = norm_path(p).lower()
    return bool(re.search(r'(^|/)(tmp|scratchpad)/|^/tmp|\$tmpdir|/claude-0/|^tmp$|projectfortress/build(/|$)|default_repository', low)
                or re.search(r'\.(log|out|err)$', low))


def path_class(p, own_dirs):
    """Classify one path-like token; None if it is not a path we recognise."""
    q = norm_path(p)
    low = q.lower()
    if not q or q in ('.', '..', '/'):
        return None
    if re.search(r'(^|/)(tmp|scratchpad)/|^/tmp|\$tmpdir|\$\{?tmp|/claude-0/', low) or re.search(r'\.(log|out|err|class|jar)$', low) \
       or 'default_repository' in low or low.startswith('/proc') or low.startswith('/dev'):
        return 'own'
    if 'compile-ladder/' in q:
        m = re.search(r'compile-ladder/([^/\s]+)', q)
        if m and m.group(1) in own_dirs:
            return 'own'
    if re.search(r'coordinator/(facts|index)\.md|(^|/)facts\.md$|(^|/)index\.md$|coordinator/map/', low):
        return 'kb'
    if re.search(r'climb-batch-[0-9.]+\.md|repair-batch\.md|coordinator/next-climb', low):
        return 'brief'
    if low.startswith('specification') or '/specification' in low or low.startswith('documentation') \
       or low.endswith('.tex') or low.endswith('.tick'):
        return 'spec'
    if low.startswith('explorations') or low.startswith('research') or low.endswith('.md') or 'gap-ledger' in low \
       or 'repo-internals' in low or low.startswith('experiment/'):
        return 'records'
    if re.search(r'(^|/)(tests|library_tests|compiler_tests|not_passing_yet|demos|static_tests|samples)/', q) or low.endswith('.test'):
        return 'tests'
    if re.search(r'(^|/)(library|librarybuiltin)/', low) or re.search(r'(compiler|fortress)(builtin|library)\.fs[si]', low) \
       or low.endswith('.fsi') or low.endswith('.fss'):
        return 'library' if not re.search(r'(^|/)(tests|library_tests|compiler_tests)/', q) else 'tests'
    if re.search(r'(^|/)(src|scala_src|astgen|third_party|nativehelpers|projectfortress)(/|$)', low) or low.endswith('.java') \
       or low.endswith('.scala') or low.endswith('build.xml') or low.endswith('.ast') or low.startswith('bin/') or low.endswith('.sh') \
       or 'com/sun/fortress' in low:
        return 'source'
    return None


def paths_in(text, own_dirs, cwd=''):
    found = []
    for tok in PATH_TOKEN.findall(text):
        if cwd and '/' not in tok.lstrip('./') and not re.search(r'\.(fss|fsi|java|scala|tex|md|test|xml|out|log|tick|ast|txt|sh)$', tok):
            continue
        if '/' not in tok and not re.search(r'\.(fss|fsi|java|scala|tex|md|test|xml|out|log|tick|ast|txt|sh|tsv)$', tok):
            continue
        if tok.startswith('-') or tok.startswith('http') or '://' in tok:
            continue
        tok = relocate(tok, cwd) if cwd else tok
        c = path_class(tok, own_dirs)
        if c:
            found.append((c, norm_path(tok)))
    return found


def git_range_is_own(args_text):
    return bool(re.search(r'\.\.\.?HEAD|\bHEAD\b(?![~^]?\d*:)|\.\.wip/|wip/rung|\b[0-9a-f]{7,40}\.\.\.?(HEAD)?\b', args_text)) \
        and not re.search(r'\b[0-9a-f]{7,40}:\S', args_text)


def classify(call, own_dirs):
    """-> dict(cat, sub, targets[], kb: bool, verbs[])"""
    name, inp = call['name'], call['input']
    if name in ('Read', 'NotebookRead'):
        p = inp.get('file_path', '')
        c = path_class(p, own_dirs) or 'source'
        cat = 'inspect' if c == 'own' else 'gather'
        return dict(cat=cat, sub='read', targets=[(c, norm_path(p))], kb=(c == 'kb'), verbs=['Read'])
    if name in ('Grep', 'Glob'):
        p = inp.get('path', '') or ''
        t = paths_in(p, own_dirs) if p else []
        cat = 'inspect' if t and all(c == 'own' for c, _ in t) else 'gather'
        return dict(cat=cat, sub='search', targets=t, kb=any(c == 'kb' for c, _ in t), verbs=[name])
    if name in ('Edit', 'Write', 'NotebookEdit', 'MultiEdit'):
        p = norm_path(inp.get('file_path', ''))
        return dict(cat='do', sub='edit', targets=[('write', p)], kb=False, verbs=[name],
                    wtargets=[(path_class(p, own_dirs) or 'unknown', p)], probe=False)
    if name == 'StructuredOutput':
        return dict(cat='do', sub='report', targets=[], kb=False, verbs=[name])
    if name != 'Bash':
        return dict(cat='other', sub=name, targets=[], kb=False, verbs=[name])

    cmd = substitute_vars(inp.get('command', ''))
    stripped, bodies = strip_heredocs(cmd)
    masked, quoted = mask_quotes(stripped)
    body_text = '\n'.join(b for _, b in bodies)
    kinds, verbs = [], []
    writes = False
    read_targets, all_targets, wpaths = [], [], []
    cwd = ''
    for sep, seg in simple_commands(masked):
        v, args = verb_of(seg)
        if v is None:
            continue
        pseg = unmask_paths(seg, quoted)
        base = os.path.basename(v)
        if base == 'cd':
            a = [x for x in unmask_paths(' '.join(args), quoted).split() if not x.startswith('-')]
            if a:
                cwd = relocate(a[0], cwd)
            continue
        k = classify_verb(v, args, seg, body_text if bodies or '-c' in args else None)
        if k == 'setup' and base in ('echo', 'printf') and re.search(r'(?<![0-9&<>])>>?\s*(?!&|/dev/null)\S', seg):
            k = 'edit'
        if k == 'git-read' and git_range_is_own(pseg):
            k = 'git-inspect'
        if k == 'read' and sep == '|' and not re.search(r'(?<![<>])\s(/|\.{0,2}/|[A-Za-z0-9_$][A-Za-z0-9_.$-]*/)\S', pseg):
            k = 'filter'   # head, grep, sed after a pipe read the command before them, not the tree
        kinds.append(k); verbs.append(base)
        if re.search(r'(?<![0-9&<>])>>?\s*(?!&|/dev/null)[^\s&|;]', seg) and k != 'setup':
            writes = True
        # what the segment writes: redirect targets, and the file operands of sed -i, tee, cp and mv
        for t in re.findall(r'(?<![0-9&<>])>>?\s*([^\s&|;<>]+)', pseg):
            if t != '/dev/null' and not t.startswith('&'):
                wpaths.append(relocate(t, cwd))
        if k == 'edit' and base in ('sed', 'perl', 'tee', 'cp', 'mv', 'touch', 'patch') and args:
            ops = [x for x in unmask_paths(' '.join(args), quoted).split() if not x.startswith('-') and x != 'Q']
            if ops and not (base in ('cp', 'mv') and any(is_scratch(relocate(x, cwd)) for x in ops[:-1])):
                wpaths.append(relocate(ops[-1], cwd))   # copying build output or a scratch file is setup, not an edit
        seg_targets = paths_in(pseg, own_dirs, cwd) if k not in ('setup',) else []
        if k in ('read', 'git-read') and not seg_targets and cwd and path_class(cwd + '/', own_dirs):
            seg_targets = [(path_class(cwd + '/', own_dirs), cwd)]   # a bare ls or grep in the directory it cd'd to
        all_targets += seg_targets
        if k in ('read', 'git-read'):
            read_targets += seg_targets
    if bodies and re.search(r'\bcat\s*>|\btee\b|>\s*\S+\s*<<|<<[^\n]*>\s*\S', stripped):
        writes = True
    if bodies and 'edit' in kinds:
        for m in re.finditer(r"open\(\s*['\"]([^'\"]+)['\"][^)]*['\"][wa]", body_text):
            wpaths.append(relocate(m.group(1), cwd))
        for m in re.finditer(r"^\s*p\s*=\s*['\"]([^'\"]+)['\"]", body_text, re.M):
            wpaths.append(relocate(m.group(1), cwd))
    wtargets = [(path_class(w, own_dirs) or 'unknown', w) for w in wpaths]
    # a probe runs a Fortress program or a test; compiling a library component is a build
    runs = stripped + '\n' + '\n'.join(quoted)
    probe = bool(re.search(r'fortress\s+(?:(?:compile|run|link|junit|walk)\s+)?(?![^\s]*(?:LibraryBuiltin|Library/))[^\s;&|]+\.(?:fss|test)\b'
                           r'|fortress\s+run\s+[A-Za-z]|\bant\s+(?:-\S+\s+)*test|\bjunit\b', runs))
    if bodies and 'read' in kinds:
        read_targets += paths_in(body_text, own_dirs, cwd)
    targets = all_targets
    kb = any(c == 'kb' for c, _ in read_targets)
    doing = [k for k in kinds if k in ('build', 'run', 'edit', 'git-do')]
    if doing or writes:
        sub = 'build' if 'build' in doing else ('run' if 'run' in doing else ('commit' if 'git-do' in doing else 'edit'))
        return dict(cat='do', sub=sub, targets=targets, kb=False, verbs=verbs, wtargets=wtargets, probe=probe)
    reads = [k for k in kinds if k in ('read', 'git-read')]
    if reads:
        terr = [c for c, _ in read_targets if c != 'own']
        if terr or not read_targets:
            sub = 'history' if 'git-read' in kinds else 'read'
            return dict(cat='gather', sub=sub, targets=read_targets, kb=kb, verbs=verbs)
        return dict(cat='inspect', sub='own-output', targets=read_targets, kb=False, verbs=verbs)
    if 'git-inspect' in kinds:
        return dict(cat='inspect', sub='own-diff', targets=targets, kb=False, verbs=verbs)
    if 'wait' in kinds:
        return dict(cat='other', sub='wait', targets=targets, kb=False, verbs=verbs)
    if 'git-other' in kinds:
        return dict(cat='other', sub='bookkeeping', targets=targets, kb=False, verbs=verbs)
    if 'unknown' in kinds:
        return dict(cat='other', sub='unknown', targets=targets, kb=False, verbs=verbs)
    return dict(cat='other', sub='setup', targets=targets, kb=False, verbs=verbs)


ROOTS = ('ProjectFortress', 'Library', 'Specification', 'Specification-1.0-frozen', 'explorations', 'research',
         'Documentation', 'bin', 'tmp', 'experiment', 'default_repository', 'third_party', 'Emacs', 'SpecData')
PF_ROOTS = ('src', 'tests', 'library_tests', 'compiler_tests', 'LibraryBuiltin', 'astgen', 'scala_src', 'not_passing_yet',
            'other_compiler_tests', 'not_working_library_tests', 'build', 'demos', 'static_tests', 'third_party', 'build.xml')


def relocate(p, cwd):
    """The repository-relative form of path p given in directory cwd."""
    p = norm_path(p)
    if p.startswith('/') or p.startswith('$') or p.startswith('~'):
        return p
    first = p.split('/')[0]
    if first in ROOTS:
        return p
    if first in PF_ROOTS and not cwd.startswith('ProjectFortress'):
        return 'ProjectFortress/' + p
    if first == '..':
        parts = cwd.split('/') if cwd else []
        q = p
        while q.startswith('../'):
            q = q[3:]; parts = parts[:-1]
        return '/'.join(parts + [q]) if parts else q
    if first == '.':
        p = p[2:] if p.startswith('./') else ''
    return (cwd + '/' + p).strip('/') if cwd else p


def own_dirs_of(calls):
    """The compile-ladder directory this agent works in: the slug its structured report
    names (its own rung, or the rung it reviews or repairs), and any compile-ladder
    directory it writes into."""
    own = set()
    pat = r'compile-ladder/([A-Za-z0-9_.\-]+)'
    for c in calls:
        inp = c['input']
        if c['name'] == 'StructuredOutput' and isinstance(inp.get('slug'), str):
            own.add(inp['slug'])
        elif c['name'] in ('Write', 'Edit'):
            own.update(re.findall(pat, inp.get('file_path', '')))
        elif c['name'] == 'Bash':
            cmd = substitute_vars(inp.get('command', ''))
            for m in re.finditer(r'(?:>>?|\btee(?:\s+-a)?|\bmkdir(?:\s+-p)?|\bgit\s+add(?:\s+-A)?)\s+(\S+)', cmd):
                own.update(re.findall(pat, m.group(1)))
            for m in re.finditer(r'\bcd\s+(\S+)', cmd):
                if re.search(r'cat\s*>|>\s*\S+\.(fss|md|txt)', cmd):
                    own.update(re.findall(pat, m.group(1)))
    return {d for d in own if d not in ('after', 'before', 'raw') and not d.startswith('climb-batch')}
