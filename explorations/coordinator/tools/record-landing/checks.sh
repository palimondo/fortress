#!/usr/bin/env bash
# checks.sh RUN ROUND: the record-landing workflow's mechanical checks, after a write round (ROUND 1 or 2)
# or before the commits (ROUND final, which final.sh runs).
#
# RUN is the run's folder, with run.env (prepare.sh). In the worktree, the script resets FACTS.md,
# POSITIONS.md, their histories, the gap ledger and its history to AT, the commit that the worktree was made
# at; checks the POSITIONS lines that cut-only.txt names with words-subset.py, against the reset files; then
# applies the entries writer's file with record.py apply (record.apply, or for final the judge's final.apply)
# and its row lines with ledger-clarity/apply.py (rows.rewrite, or final.rewrite); then its new rows with
# ledger.py add (rows.add; for final, final.add if the judge wrote one, else rows.add). In rows.add each
# row line, `| ? | ...`, goes in the section that the nearest `## TITLE` line above it names, a title of
# `ledger.py sections`; a row with no such line above it is not added, and the summary says so (the
# coordinator files it). The routing writer's
# edits of PLAN, PLAN-history, the review queue, INDEX and other notes stay as they are. Then it runs every
# check on the worktree: record.py check --base AT; ledger.py check; ledger.py landing-check BASE;
# check-index.sh; plan-moves.py; queue-check.py; and the length of each changed entry, lengths.py.
# record.py writes each history block "by climb batch N landing workflow (Opus)", the tier of the agents that
# wrote the text. It writes RUN/mech-ROUND.md: one line per check, pass or fail, with the PLAN lines that
# plan-moves.py lists to look at and the entries over 600 that grew (lengths.py), then each check's command
# and output.
# Exit 0 when every check passes (the length table only informs), 1 otherwise. The record files stay as
# applied, so the worktree's git diff shows the round's whole change.
set -uo pipefail
here=$(cd "$(dirname "$(readlink -f "$0")")" && pwd)
RUN=${1:?usage: checks.sh RUN ROUND}; ROUND=${2:?round: 1, 2 or final}
# shellcheck disable=SC1091
. "$RUN/run.env"
tools="$WT/explorations/coordinator/tools"
rec=(python3 "$tools/record.py")
led=(python3 "$tools/ledger.py")
if [ "$ROUND" = final ]; then apply="$RUN/final.apply"; rows="$RUN/final.rewrite"; else apply="$RUN/record.apply"; rows="$RUN/rows.rewrite"; fi
adds="$RUN/rows.add"; [ "$ROUND" = final ] && [ -e "$RUN/final.add" ] && adds="$RUN/final.add"
out="$RUN/mech-$ROUND.md"
record_files=(explorations/coordinator/FACTS.md explorations/coordinator/POSITIONS.md
  explorations/coordinator/FACTS-history.md explorations/coordinator/POSITIONS-history.md
  explorations/fortress-gap-ledger.md explorations/fortress-gap-ledger-history.md)
mkdir -p "$WT/tmp"
body=$(mktemp -p "$WT/tmp" mech.XXXXXX); trap 'rm -f "$body"' EXIT
summary=()
bad=0
last=''
step() {   # step NAME MUST(1|0) CMD...: run CMD in the worktree, keep its output for the report (and in $last)
  local name=$1 must=$2; shift 2
  local o code
  o=$(cd "$WT" && "$@" 2>&1); code=$?; last=$o
  if [ "$code" = 0 ]; then summary+=("- $name: pass"); elif [ "$must" = 1 ]; then summary+=("- $name: FAIL (exit $code)"); bad=1; else summary+=("- $name: exit $code (information)"); fi
  { printf '## %s\n\n`%s`, exit %s.\n\n```\n' "$name" "$*" "$code"
    printf '%s\n' "$o" | head -c 12000
    [ "$(printf '%s' "$o" | wc -c)" -gt 12000 ] && printf '\n... (cut at 12000 characters)'
    printf '\n```\n\n'; } >> "$body"
}

git -C "$WT" checkout "$AT" -- "${record_files[@]}"
summary+=("- reset: the six record files at $AT")

if [ -s "$RUN/cut-only.txt" ]; then
  cut=$(mktemp -p "$WT/tmp" cut-only.XXXXXX)
  found=$(python3 - "$apply" "$RUN/cut-only.txt" "$cut" <<'PY'
import re, sys
want = set(re.findall(r'[FP]-\d+', open(sys.argv[2]).read()))
lines = [l for l in open(sys.argv[1]) if re.match(r'- ([FP]-\d+) ', l) and re.match(r'- ([FP]-\d+) ', l).group(1) in want]
open(sys.argv[3], 'w').write(''.join(lines))
print('%d of the %d entries that cut-only.txt names have a line in the apply file' % (len(lines), len(want)))
PY
)
  summary+=("- cut-only.txt: $found")
  step "words-subset.py, the cut-only lines ($(grep -oE '[FP]-[0-9]+' "$RUN/cut-only.txt" | paste -sd ' '))" 1 python3 "$here/../record-clarity/words-subset.py" "$cut" --root "$WT"
  rm -f "$cut"
else
  summary+=("- words-subset.py: no cut-only.txt, nothing to check")
fi
if [ -s "$apply" ]; then
  allp=$(mktemp -p "$WT/tmp" positions.XXXXXX); grep -E '^- P-[0-9]+ ' "$apply" > "$allp" || true
  [ -s "$allp" ] && step "words-subset.py, every POSITIONS line of $(basename "$apply")" 0 python3 "$here/../record-clarity/words-subset.py" "$allp" --root "$WT"
  rm -f "$allp"
  step "record.py apply $(basename "$apply")" 1 "${rec[@]}" apply "$apply" --by "climb batch $N landing workflow (Opus)"
else
  summary+=("- record.py apply: no $(basename "$apply"), no entry changed")
fi
if [ -s "$rows" ]; then
  d=$(mktemp -d -p "$WT/tmp" rows.XXXXXX); cp "$rows" "$d/final.rewrite"
  step "ledger-clarity/apply.py $(basename "$rows")" 1 python3 "$here/../ledger-clarity/apply.py" "$d" --root "$WT"
  rm -rf "$d"
else
  summary+=("- ledger-clarity/apply.py: no $(basename "$rows"), no row changed")
fi
if [ -s "$adds" ]; then
  d=$(mktemp -d -p "$WT/tmp" adds.XXXXXX)
  # one file per row line, row-K.txt, and d/list: K, a tab, its section ('' when no ## line is above it)
  python3 - "$adds" "$d" <<'PY'
import os, sys
sec, k, out = '', 0, []
for ln in open(sys.argv[1], encoding='utf-8'):
    t = ln.strip()
    if t.startswith('## '):
        sec = t[3:].strip()
    elif t.startswith('|'):
        k += 1
        open(os.path.join(sys.argv[2], 'row-%d.txt' % k), 'w', encoding='utf-8').write(t + '\n')
        out.append('%d\t%s' % (k, sec))
open(os.path.join(sys.argv[2], 'list'), 'w', encoding='utf-8').write(''.join(x + '\n' for x in out))
PY
  nosec=()
  while IFS=$'\t' read -r k sec; do
    if [ -z "$sec" ]; then nosec+=("$k"); continue; fi
    step "ledger.py add, row line $k of $(basename "$adds"), in \"$sec\"" 1 "${led[@]}" add "$d/row-$k.txt" --section "$sec"
    summary+=("  - $(printf '%s\n' "$last" | head -1)")
  done < "$d/list"
  [ ${#nosec[@]} -gt 0 ] && summary+=("- ledger.py add: not added, no \`## TITLE\` line above them in $(basename "$adds"): row line(s) ${nosec[*]}; file each with ledger.py add FILE --section TITLE")
  [ -s "$d/list" ] || summary+=("- ledger.py add: $(basename "$adds") holds no row line")
  rm -rf "$d"
else
  summary+=("- ledger.py add: no $(basename "$adds"), no row added")
fi
step "record.py check --base $AT" 1 "${rec[@]}" check --base "$AT"
step "ledger.py check" 1 "${led[@]}" check --summary
step "ledger.py landing-check $BASE" 1 "${led[@]}" landing-check "$BASE"
step "check-index.sh" 1 bash explorations/coordinator/check-index.sh
step "plan-moves.py" 1 python3 "$here/plan-moves.py" --root "$WT" --base "$AT"
look=$(printf '%s\n' "$last" | grep -c '^LOOK ' || true)
[ "${look:-0}" -gt 0 ] && summary+=("  - plan-moves.py lists $look PLAN lines to look at (its LOOK lines below)")
step "queue-check.py" 1 python3 "$here/queue-check.py" --root "$WT" --base "$AT"
step "lengths.py" 0 python3 "$here/lengths.py" --root "$WT" --base "$AT"
grew=$(printf '%s\n' "$last" | sed -n 's/^lengths: [0-9]* already over 600 grew: //p')
[ -n "$grew" ] && summary+=("  - lengths.py: already over 600, and grew: $grew")
step "git diff --stat $AT" 0 git diff --stat "$AT" -- explorations/

{ printf '<!-- The record-landing workflow'"'"'s mechanical checks, round %s, in the worktree %s at %s: one line per check, then each command with its output, written by checks.sh. -->\n\n# The mechanical checks, round %s\n\n' "$ROUND" "$WT" "$AT" "$ROUND"
  printf '%s\n' "${summary[@]}"
  printf '\n%s\n\n' "$([ $bad = 0 ] && echo 'Every check passes.' || echo 'A check fails: see its section below.')"
  cat "$body"; } > "$out"
printf '%s\n' "${summary[@]}"
echo "checks.sh: $out written; $([ $bad = 0 ] && echo 'every check passes' || echo 'a check fails')"
exit $bad
