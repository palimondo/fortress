#!/bin/bash
# seed-worktree.sh <base-worktree> <new-worktree> <branch> [<start-point>]
#
# Makes a worktree that is ready to compile and run Fortress without building anything, by copying the
# build and the caches of a baseline worktree that has been built once, and translating the parts of the
# caches that are keyed by the source tree's absolute path (explorations/coordinator/build-cache-exploration.md).
#
#   <base-worktree>  a clean worktree of this repository at some commit B, on which `ant compileAll`, the
#                    restore of default_repository/caches/global.map and the library-order recompile
#                    (explorations/repo-internals.md, "Compile order matters") have run, and nothing since.
#   <new-worktree>   where the new worktree goes; made by `git worktree add`, reused if it already exists.
#   <branch>         the branch it checks out: an existing local branch, else origin's, else a new branch
#                    cut from <start-point>, which defaults to B; `-` makes a detached worktree at
#                    <start-point> instead. Old-against-new runs need no copy of the base: tools/old-fortress.sh
#                    runs the base build itself with a private caches folder.
#
# What it does, in order: adds the worktree; copies ProjectFortress/build, ProjectFortress/.dependencies
# and default_repository/caches from the base; renames every file of the AST caches (analyzed_cache,
# interpreter_cache, interpreter_parsed_cache) to the hash of its source's new path (NamingCzar.deCaseName,
# compiler/NamingCzar.java:244-245; GraphNode.java:33 hashes the canonical path) and rewrites the base path
# inside it; rewrites the base path in the bytecode-cache jars' SourceFile attributes (debug information
# only: jars copied unchanged also run, but their stack traces would name the base's files); and makes the
# new worktree the base's replica in its file dates too. The copies keep the base's dates (cp -a), every
# tracked file whose content is the base's takes the base file's date, and every tracked file that differs
# from B, committed or not, is stamped later than everything copied. Dates decide three things. The
# repository uses a cached entry only when it is not older than its source (repository/GraphRepository.java:244,
# :283; a changed api also makes everything that imports it stale, :600-620). Ant regenerates the AST
# nodes, the parsers and Operators.java when an input is newer than the generated file (build.xml:371-384,
# :450-467, :1335-1400); the checkout's own dates make it regenerate them, and javac then recompiles 1,077
# files. And javac recompiles a source newer than its class (build-cache-exploration.md, section 6). So the
# next `fortress compile` of a differing library source rebuilds it, and a worktree whose ProjectFortress/src
# differs from B is seeded with a warning: the copied build is B's, so the worker runs ant compileAll, which
# recompiles the differing sources (and deletes the caches, build.xml:715 and :356), and the library-order
# recompile before its first compiled run. The base's own dates must be a build's: a base built in place by
# ant, or seeded by this script.
#
# A worktree that already has ProjectFortress/build is left alone (a relaunch keeps the worker's own build);
# SEED_FORCE=1 replaces its build and caches with the base's.
#
# Prints one line per step with its time, and the seeded worktree's path last. Exits non-zero, having
# removed nothing, if the base is not built or not clean. Never touches the base or the main tree.
# Run it from anywhere; it needs bash, git, python3, realpath and bc.
set -euo pipefail

BASE_ARG=${1:?usage: seed-worktree.sh <base-worktree> <new-worktree> <branch> [<start-point>]}
NEW_ARG=${2:?new worktree path}
BRANCH=${3:?branch}
BASE=$(realpath "$BASE_ARG")
step () { local now; now=$(date +%s.%N); printf '%-34s %5.1f s\n' "$1" "$(echo "$now - $T" | bc)"; T=$now; }
T=$(date +%s.%N); T_START=$T

# The base must be built and clean, or its caches do not describe its commit.
for f in ProjectFortress/build/com/sun/fortress/Shell.class \
         default_repository/caches/bytecode_cache/fortress.CompilerBuiltin.jar \
         default_repository/caches/bytecode_cache/fortress.CompilerLibrary.jar \
         default_repository/caches/bytecode_cache/CompilerSystem.jar ; do
    [ -e "$BASE/$f" ] || { echo "seed-worktree: $BASE is not built: $f is missing" >&2 ; exit 2 ; }
done
if [ -n "$(git -C "$BASE" status --porcelain -- ProjectFortress Library default_repository)" ]; then
    echo "seed-worktree: $BASE has changes under ProjectFortress, Library or default_repository:" >&2
    git -C "$BASE" status --short -- ProjectFortress Library default_repository | head -5 >&2
    exit 2
fi
B=$(git -C "$BASE" rev-parse HEAD)
START=${4:-$B}

# The worktree: the same command the batch workflow's shared prefix uses, with the base commit as default.
if [ "$BRANCH" = - ]; then
    [ -d "$NEW_ARG" ] || git -C "$BASE" worktree add -q --detach "$NEW_ARG" "$START"
else
    git -C "$BASE" fetch -q origin "$BRANCH" 2>/dev/null || true
fi
if [ ! -d "$NEW_ARG" ]; then
    git -C "$BASE" worktree add -q "$NEW_ARG" "$BRANCH" 2>/dev/null \
      || git -C "$BASE" worktree add -q -b "$BRANCH" "$NEW_ARG" "$START"
fi
NEW=$(realpath "$NEW_ARG")
[ "$NEW" != "$BASE" ] || { echo "seed-worktree: the new worktree is the base" >&2 ; exit 2 ; }
if [ -d "$NEW/ProjectFortress/build" ] && [ -z "${SEED_FORCE:-}" ]; then
    echo "seed-worktree: $NEW already has a build; left as it is (SEED_FORCE=1 replaces it)"
    echo "$NEW" ; exit 0
fi
mkdir -p "$NEW/tmp"
step "worktree $(git -C "$NEW" rev-parse --short HEAD)"

# The build: plain copies; nothing in it holds the base's path but scalac-compileAll.args, which
# ant compileAll writes afresh. A symlink would send every cache lookup to the base
# (explorations/coordinator/batched-climb-review.md, finding 2), so copy.
rm -rf "$NEW/ProjectFortress/build" "$NEW/ProjectFortress/.dependencies"
cp -a "$BASE/ProjectFortress/build" "$NEW/ProjectFortress/build"
[ -d "$BASE/ProjectFortress/.dependencies" ] && cp -a "$BASE/ProjectFortress/.dependencies" "$NEW/ProjectFortress/.dependencies"
rm -f "$NEW/ProjectFortress/build/scalac-compileAll.args"
step "copy ProjectFortress/build"

# The caches: everything but logs/, whose subdirectories spell the base's path.
C="$NEW/default_repository/caches"
rm -rf "$C" ; mkdir -p "$C"
for d in "$BASE"/default_repository/caches/* ; do
    [ "$(basename "$d")" = logs ] && continue
    cp -a "$d" "$C/"
done
step "copy default_repository/caches"

# Translate: the AST caches' names and texts, and the jars' class constants.
python3 - "$BASE" "$NEW" "$C" <<'PY'
import os, sys, re, struct, zipfile, shutil
base, new, caches = sys.argv[1], sys.argv[2], sys.argv[3]
def jhash(s):                      # java.lang.String.hashCode() & 0x7fffffff, as NamingCzar.deCaseName uses it
    u = s.encode('utf-16-be'); h = 0
    for j in range(0, len(u), 2):           # over UTF-16 code units, as Java counts them
        h = (31 * h + (u[j] << 8 | u[j+1])) & 0xffffffff
    return h & 0x7fffffff
# old hash -> new hash, for every Fortress source under the base (GraphNode.java:33 hashes the canonical path)
remap = {}
for root, dirs, files in os.walk(base):
    dirs[:] = [d for d in dirs if d not in ('.git', 'tmp', 'build', 'default_repository')]
    for f in files:
        if f.endswith(('.fss', '.fsi')):
            p = os.path.join(root, f)
            remap['%x' % jhash(p)] = '%x' % jhash(new + p[len(base):])
# the path is in every span (@"<path>":l:c) and in generated names (*underscore_<path>:l:c)
old_q, new_q = (base + '/').encode(), (new + '/').encode()
renamed = rewritten = kept = 0
# analyzed_cache, interpreter_cache and interpreter_parsed_cache name and fill their files the same way
for root, dirs, files in os.walk(caches):
    dirs[:] = [d for d in dirs if d not in ('bytecode_cache', 'nativewrapper_cache')]
    for f in files:
        if not f.endswith(('.tfi', '.tfs')): continue
        m = re.match(r'^(.*)-([0-9a-f]+)(\.tf[is])$', f)
        p = os.path.join(root, f)
        data = open(p, 'rb').read()
        if old_q in data:
            open(p, 'wb').write(data.replace(old_q, new_q)); rewritten += 1
        if m and m.group(2) in remap:
            os.rename(p, os.path.join(root, m.group(1) + '-' + remap[m.group(2)] + m.group(3))); renamed += 1
        else:
            kept += 1
# Jars: every CONSTANT_Utf8 holding the base path, the SourceFile attribute among them, gets the new path.
# Constants are reached by index, never by byte offset, so changing a constant's length is safe.
old_p, new_p = (base + '/').encode(), (new + '/').encode()
def fix_class(b):
    n = struct.unpack('>H', b[8:10])[0]
    out = [b[:10]]; i = 10; k = 1; changed = 0
    while k < n:
        tag = b[i]
        if tag == 1:
            ln = struct.unpack('>H', b[i+1:i+3])[0]; s = b[i+3:i+3+ln]
            if old_p in s:
                s = s.replace(old_p, new_p); changed += 1
            out.append(bytes([1]) + struct.pack('>H', len(s)) + s); i += 3 + ln; k += 1
            continue
        size = {3: 4, 4: 4, 5: 8, 6: 8, 7: 2, 8: 2, 16: 2, 19: 2, 20: 2, 9: 4, 10: 4, 11: 4, 12: 4,
                15: 3, 17: 4, 18: 4}[tag]
        out.append(b[i:i+1+size]); i += 1 + size; k += 2 if tag in (5, 6) else 1
    out.append(b[i:])
    return b''.join(out), changed
consts = 0
bc = os.path.join(caches, 'bytecode_cache')
for f in sorted(os.listdir(bc)) if os.path.isdir(bc) else []:
    if not f.endswith('.jar'): continue
    p = os.path.join(bc, f); tmp = p + '.seed'
    with zipfile.ZipFile(p) as zin, zipfile.ZipFile(tmp, 'w') as zout:
        for info in zin.infolist():
            data = zin.read(info)
            if info.filename.endswith('.class') and old_p in data:
                data, c = fix_class(data); consts += c
            zout.writestr(info, data)
    shutil.copystat(p, tmp); os.replace(tmp, p)
print('ast caches: %d renamed, %d kept, %d rewritten; jars: %d constants rewritten' % (renamed, kept, rewritten, consts))
PY
step "translate paths"

# Dates: the base's for every tracked file whose content is the base's, as the copies above kept the base's
# for the build and the caches (and the translation's rewrites are newer still), so every date comparison
# comes out as it does in the base. Every tracked file that differs from B, committed or not, and every file
# the base itself has changed, is stamped two seconds after all of it: Java's lastModified counts
# milliseconds, and a cached entry not older than its source counts as current.
git -C "$NEW" checkout -q -- default_repository/caches/global.map
python3 - "$BASE" "$NEW" "$B" <<'PY'
import os, sys, subprocess, time
base, new, b = sys.argv[1], sys.argv[2], sys.argv[3]
def names(cwd, *args):
    out = subprocess.run(['git', '-C', cwd] + list(args), capture_output=True, check=True).stdout
    return [p for p in out.decode('utf-8', 'surrogateescape').split('\0') if p]
later = set(names(new, 'diff', '--name-only', '-z', '--no-renames', b))   # the new worktree against B
later |= set(names(base, 'diff', '--name-only', '-z', '--no-renames', 'HEAD'))   # the base's own changes
stamp = time.time() + 2
same = stamped = 0
for p in names(new, 'ls-files', '-z'):
    np = os.path.join(new, p)
    if not os.path.lexists(np): continue
    bp = os.path.join(base, p)
    if p in later or not os.path.lexists(bp):
        os.utime(np, (stamp, stamp), follow_symlinks=False); stamped += 1
    else:
        st = os.lstat(bp)
        os.utime(np, ns=(st.st_atime_ns, st.st_mtime_ns), follow_symlinks=False); same += 1
print('tracked files: %d dated as the base\'s, %d stamped later' % (same, stamped))
PY
git -C "$NEW" update-index -q --refresh || true     # record the new dates, so the first git status is quick
CHANGED_LIB=$(git -C "$NEW" diff --name-only --diff-filter=d "$B" -- Library ProjectFortress/LibraryBuiltin | grep '\.fs[si]$' || true)
if [ -n "$CHANGED_LIB" ]; then
    echo "library sources newer than the base's cache (recompile them, and the library order after them):"
    echo "$CHANGED_LIB" | sed 's/^/    /'
fi
CHANGED_SRC=$(git -C "$NEW" diff --name-only "$B" -- ProjectFortress/src ProjectFortress/astgen build.xml | head -5)
if [ -n "$CHANGED_SRC" ]; then
    echo "WARNING: the branch changes the compiler's sources since the base; the copied build is the base's."
    echo "         Run ant compileAll (it recompiles the changed sources, stamped newer than the build),"
    echo "         restore global.map and run the library-order recompile before any run:"
    echo "$CHANGED_SRC" | sed 's/^/    /'
fi
step "date tracked files"
[ -z "$(git -C "$NEW" status --porcelain -- default_repository)" ] \
  || { echo "seed-worktree: default_repository differs from the index in $NEW:" ; git -C "$NEW" status --short -- default_repository | head -5 ; }
printf 'seeded from %s (%s) in %.0f s\n%s\n' "$BASE" "$(git -C "$BASE" rev-parse --short HEAD)" \
  "$(echo "$(date +%s.%N) - $T_START" | bc)" "$NEW"
