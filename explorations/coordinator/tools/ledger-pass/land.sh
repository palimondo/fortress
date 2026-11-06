#!/usr/bin/env bash
# land.sh [--dry-run] [--no-push] [--others-ok] RUN_DIR [KEEP_DIR]
#
# Lands one ledger-pass run on main, in the main tree, between batches: the judges' final.rewrite,
# final.dups and final.closes of every chunk folder in RUN_DIR, applied through ledger.py by apply.py.
#   1. The lock: flock on tmp/ledger-pass-land.lock, so two landings never interleave (ledger.py's own
#      lock covers one write, not an apply and its commit).
#   2. The main tree: on main, no merge or pick under way, the ledger and its history unchanged, and no
#      other tracked file changed (a gather under way leaves the tree so); --others-ok passes the last
#      when the changed files are another agent's and no gather runs.
#   3. The guard, read-only: apply.py --plan --guard holds each change whose row no longer reads as the
#      run read it (the sha in the run's rows.tsv against the row's line now), since `ledger.py rewrite`
#      checks nothing about the line it replaces; a change already made is skipped.
#   4. The apply on copies of the ledger and its history in tmp/ledger-pass-land/RUN/, with --keep-going,
#      which holds what ledger.py refuses; then ledger.py check and check --base HEAD on the copies.
#   5. The same apply on the main tree, the held rows skipped; then ledger.py check, check --base HEAD and
#      landing-check HEAD. On any failure the ledger and its history are restored with git checkout.
#   6. The rows applied whose cited files changed between the run's base and HEAD, for the next run.
#   7. The run's judged files copied into KEEP_DIR (default
#      explorations/coordinator/ledger-pass/evidence/RUN/), one folder per chunk, with landing.md.
#   8. One commit by named paths: the ledger, its history and the kept files, with the committing part's
#      footer (fortress-repo references/committing.md).
#   9. The pushes, as the record-landing workflow's Push stage pushes: origin/main..main must list only
#      this commit (another agent's commit: a minute's wait, then nothing is pushed); then main, then
#      main:claude/worker-brief-fable-vnnuv8, then main:blinded-fable, a network failure retried 2, 4, 8
#      and 16 s apart, a refusal ending the pushes. --no-push stops after the commit.
# --dry-run runs steps 2 and 3, which read only, prints the commands of the others, and changes nothing.
# The last line starts LANDED, NOTHING or STOPPED.
set -uo pipefail
MAIN=${LEDGER_PASS_MAIN:-/home/user/fortress}      # another tree only for a test of this script
BRANCH=${LEDGER_PASS_BRANCH:-main}
T=$MAIN/explorations/coordinator/tools/ledger-pass
LT=$MAIN/explorations/coordinator/tools/ledger.py
LEDGER=explorations/fortress-gap-ledger.md
HISTORY=explorations/fortress-gap-ledger-history.md
DRY=0 PUSH=1 OTHERS=0 APPLIED=0 MADE_KEEP=0
while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run) DRY=1 ;; --no-push) PUSH=0 ;; --others-ok) OTHERS=1 ;;
    -*) echo "land.sh: unknown option $1"; exit 2 ;;
    *) break ;;
  esac
  shift
done
[ $# -ge 1 ] || { sed -n '2,3p' "$0"; exit 2; }
RUN=$(cd "$1" 2>/dev/null && pwd) || { echo "STOPPED: no folder $1"; exit 1; }
NAME=$(basename "$RUN")
KEEP=${2:-explorations/coordinator/ledger-pass/evidence/$NAME}
W=$MAIN/tmp/ledger-pass-land/$NAME
cd "$MAIN" || exit 1

stop() {
  echo "STOPPED: $*"
  if [ $APPLIED = 1 ]; then git checkout -- "$LEDGER" "$HISTORY" && echo "the ledger and its history restored to HEAD"; fi
  if [ $MADE_KEEP = 1 ]; then rm -rf -- "$KEEP" && echo "the copied folder $KEEP removed"; fi
  exit 1
}
run() {   # a step that writes: printed, and run unless --dry-run
  if [ $DRY = 1 ]; then echo "would run: $*"; return 0; fi
  echo "+ $*"; "$@"
}

[ -f "$RUN/run/base.txt" ] || stop "$RUN holds no run/base.txt: it is no run folder of evidence.py"
BASE=$(cat "$RUN/run/base.txt")
CHUNKS=()
for d in "$RUN"/*/; do
  d=${d%/}; [ "$(basename "$d")" = run ] && continue
  for f in final.rewrite final.dups final.closes; do [ -f "$d/$f" ] && { CHUNKS+=("$d"); break; }; done
done
[ ${#CHUNKS[@]} -gt 0 ] || { echo "NOTHING: no chunk folder in $RUN holds a judge's final files"; exit 0; }
echo "== run $NAME: ${#CHUNKS[@]} judged chunk(s), read at base ${BASE:0:9}"

# 1. The lock.
if [ $DRY = 1 ]; then echo "would take the lock: flock -w 200 on $MAIN/tmp/ledger-pass-land.lock"
else mkdir -p tmp && exec 9>>tmp/ledger-pass-land.lock && flock -w 200 9 || stop "another landing holds tmp/ledger-pass-land.lock"; fi

# 2. The main tree.
[ "$(git symbolic-ref --short HEAD 2>/dev/null || echo detached)" = "$BRANCH" ] || stop "the main tree is not on $BRANCH"
for f in MERGE_HEAD CHERRY_PICK_HEAD REBASE_HEAD; do [ -e ".git/$f" ] && stop "a git operation is under way (.git/$f)"; done
[ -z "$(git status --porcelain -- "$LEDGER" "$HISTORY")" ] || stop "the ledger or its history has uncommitted changes: a gather or another apply is under way"
OTHER=$(git status --porcelain --untracked-files=no | grep -v -e " $LEDGER\$" -e " $HISTORY\$" || true)
if [ -n "$OTHER" ]; then
  echo "tracked files changed in the main tree:"; echo "$OTHER" | head -10 | sed 's/^/  /'
  [ $OTHERS = 1 ] || stop "a gather under way leaves the main tree so; land between batches, and pass --others-ok only when these are another agent's edits and no gather runs"
fi
HEAD0=$(git rev-parse --short=9 HEAD)
echo "== main at $HEAD0"

# 3. The guard and the plan, read-only.
python3 "$T/apply.py" "${CHUNKS[@]}" --final --guard --plan || stop "apply.py --plan failed"

if [ $DRY = 1 ]; then
  echo "would run: rm -rf $W && mkdir -p $W && cp $LEDGER $W/ledger.md && cp $HISTORY $W/history.md"
  echo "would run: python3 $T/apply.py ${CHUNKS[*]} --final --guard --keep-going --held $W/held.tsv --ledger $W/ledger.md --history $W/history.md"
  echo "would run: python3 $LT check --summary --ledger $W/ledger.md --history $W/history.md"
  echo "would run: python3 $LT check --base $HEAD0 --summary --ledger $W/ledger.md --history $W/history.md"
  echo "would run: python3 $T/apply.py ${CHUNKS[*]} --final --guard --skip $W/held.tsv"
  echo "would run: python3 $LT check --summary; python3 $LT check --base $HEAD0 --summary; python3 $LT landing-check $HEAD0"
  echo "would run: the rows applied whose cited files changed in ${BASE:0:9}..$HEAD0, into $KEEP/stale-again.txt"
  echo "would run: mkdir -p $KEEP/<chunk> and copy each chunk's judged files there, with $KEEP/landing.md"
  echo "would run: git add -- $LEDGER $HISTORY <the kept files> && git commit -F <message> -- $LEDGER $HISTORY <the kept files>"
  [ $PUSH = 1 ] && echo "would run: git log origin/main..main (only this commit), then git push origin main; git push origin main:claude/worker-brief-fable-vnnuv8; git push origin main:blinded-fable"
  echo "NOTHING: a dry run; nothing was changed"
  exit 0
fi

# 4. On copies.
rm -rf "$W" && mkdir -p "$W" && cp "$LEDGER" "$W/ledger.md" && cp "$HISTORY" "$W/history.md" || stop "could not copy the ledger to $W"
python3 "$T/apply.py" "${CHUNKS[@]}" --final --guard --keep-going --held "$W/held.tsv" --ledger "$W/ledger.md" --history "$W/history.md" \
  | tee "$W/apply-copies.txt" || stop "the apply on copies failed"
python3 "$LT" check --summary --ledger "$W/ledger.md" --history "$W/history.md" || stop "ledger.py check fails on the copies"
python3 "$LT" check --base "$HEAD0" --summary --ledger "$W/ledger.md" --history "$W/history.md" || stop "ledger.py check --base fails on the copies"

# 5. On the main tree.
APPLIED=1
python3 "$T/apply.py" "${CHUNKS[@]}" --final --guard --skip "$W/held.tsv" --held "$W/held-main.tsv" | tee "$W/apply-main.txt"
[ "${PIPESTATUS[0]}" = 0 ] || stop "the apply on the main tree was refused"
[ -s "$W/held-main.tsv" ] && stop "the guard held a row on the main tree that it passed on the copies: the ledger moved during the landing"
python3 "$LT" check --summary || stop "ledger.py check fails"
python3 "$LT" check --base "$HEAD0" --summary || stop "ledger.py check --base $HEAD0 fails"
python3 "$LT" landing-check "$HEAD0" || stop "ledger.py landing-check $HEAD0 fails"
if [ -z "$(git status --porcelain -- "$LEDGER")" ]; then
  echo "NOTHING: every change was already made or held"; cat "$W/held.tsv" 2>/dev/null; exit 0
fi

# 6. Rows that may be stale again: applied, and citing a file that changed since the run read the tree.
python3 - "$T" "$W" "$BASE" "$HEAD0" "${CHUNKS[@]}" > "$W/stale-again.txt" <<'PY'
import os, re, sys
sys.path.insert(0, sys.argv[1])
import common as C
w, base, head, chunks = sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5:]
changed = set(p for p in C.git('diff', '--name-only', base, head).split('\n') if p)
tree = C.Tree(head)
applied = [int(m.group(1)) for m in re.finditer(r'^applied \w+ (\d+)', open(os.path.join(w, 'apply-main.txt')).read(), re.M)]
led = C.ledger_now()
for n in applied:
    r = led.find(n)[0]
    files = {tree.resolve(p)[0] for p, _, _, _ in C.citations(C.row_text(r))} & changed
    if files:
        print('%d\t%s' % (n, ', '.join(sorted(files))))
PY

# 7. The kept files.
[ -e "$KEEP" ] && stop "$KEEP exists already: this run landed before, or name another folder"
MADE_KEEP=1
FILES=()
for d in "${CHUNKS[@]}"; do
  c=$(basename "$d"); mkdir -p "$KEEP/$c"
  for f in assessment.md rows.rewrite dups.txt closes.txt questions.md silent.txt runs.md cold-read.md mech.md check.md \
           pairs.txt judgement.md final.rewrite final.dups final.closes final.silent final.pairs queue.md mech-final.md rows.tsv; do
    [ -f "$d/$f" ] && cp "$d/$f" "$KEEP/$c/$f" && FILES+=("$KEEP/$c/$f")
  done
done
APPL=$(grep -c '^applied ' "$W/apply-main.txt"); ALR=$(grep -c '^already ' "$W/apply-main.txt")
HELD=$( [ -s "$W/held.tsv" ] && wc -l < "$W/held.tsv" || echo 0 ); STALE=$(wc -l < "$W/stale-again.txt")
{
  echo "# Landing of the ledger pass's run $NAME"
  echo
  echo "Applied on main at $HEAD0 by land.sh from the run's folder, read at base ${BASE:0:9}: $APPL change(s) applied, $ALR already made, $HELD held."
  echo
  echo "## Applied"; echo; grep '^applied ' "$W/apply-main.txt" | sed 's/^/- /'; echo
  echo "## Held (for the next run's list, with why)"; echo; { [ -s "$W/held.tsv" ] && sed 's/^/- /' "$W/held.tsv"; } || echo "- none"; echo
  echo "## Applied rows whose cited files changed since the run read them (to read again in a later run)"; echo
  { [ -s "$W/stale-again.txt" ] && sed 's/^/- /' "$W/stale-again.txt"; } || echo "- none"
} > "$KEEP/landing.md"
FILES+=("$KEEP/landing.md")

# 8. The commit.
MSG=$W/message.txt
{
  echo "Gap ledger: the ledger pass's run $NAME applied as judged, $APPL change(s), $HELD held"
  echo
  echo "Applied by explorations/coordinator/tools/ledger-pass/land.sh, under its guard and lock, from the run's"
  echo "judged chunks (Opus writers, cold readers, checkers and judges), read at ${BASE:0:9}: $(cd "$RUN" && ls -d */ | grep -v '^run/' | tr -d / | paste -sd, - | sed 's/,/, /g')."
  echo "The run's files are in $KEEP/, its landing in $KEEP/landing.md; $STALE applied row(s) cite a file changed since."
  echo
  grep -E '^ *(Co-Authored-By|Claude-Session): ' .claude/skills/fortress-repo/references/committing.md | sed 's/^ *//' | head -2
} > "$MSG"
ok=0
for i in 1 2 3 4; do
  if git add -- "$LEDGER" "$HISTORY" "${FILES[@]}" && git commit -q -F "$MSG" -- "$LEDGER" "$HISTORY" "${FILES[@]}"; then ok=1; break; fi
  echo "git refused; trying again in 10 s"; sleep 10
done
[ $ok = 1 ] || { git reset -q -- "${FILES[@]}" 2>/dev/null; stop "git commit failed four times"; }
APPLIED=0 MADE_KEEP=0
COMMIT=$(git log -1 --format='%h %s')
echo "== committed: $COMMIT"

# 9. The pushes.
PUSHED=""
if [ $PUSH = 1 ]; then
  ONLY=$(git log --format=%h origin/main..main)
  MINE=$(git log -1 --format=%h)
  if [ "$ONLY" != "$MINE" ]; then echo "origin/main..main lists another commit: waiting a minute"; sleep 60; ONLY=$(git log --format=%h origin/main..main); fi
  if [ "$ONLY" != "$MINE" ]; then
    echo "LANDED run $NAME: $COMMIT; not pushed: origin/main..main lists another agent's commit: $(echo $ONLY | tr '\n' ' ')"; exit 0
  fi
  for ref in main main:claude/worker-brief-fable-vnnuv8 main:blinded-fable; do
    done_=0
    for wait in 0 2 4 8 16; do
      sleep $wait
      out=$(git push origin "$ref" 2>&1); rc=$?
      if [ $rc = 0 ]; then done_=1; break; fi
      echo "$out" | grep -q -e 'rejected' -e '^ *!' && { echo "$out"; echo "LANDED run $NAME: $COMMIT; the push of $ref was refused; pushed: ${PUSHED:-nothing}"; exit 0; }
    done
    [ $done_ = 1 ] || { echo "$out"; echo "LANDED run $NAME: $COMMIT; the push of $ref failed five times; pushed: ${PUSHED:-nothing}"; exit 0; }
    PUSHED="$PUSHED $ref"
  done
fi
echo "LANDED run $NAME: $COMMIT; $APPL applied, $HELD held, $STALE cite a changed file; pushed:${PUSHED:- nothing (--no-push)}"
