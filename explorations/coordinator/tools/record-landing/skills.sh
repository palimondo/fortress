#!/usr/bin/env bash
# skills.sh N ROUND [--dry-run]: one round of the record-landing workflow's skill update, after the landing and
# the orientation update; its Sonnet driver runs it in the background and waits for it.
#
# Round 1 writes the skill writer's task, task-1.md, from skill-task.md and the landing's data, and starts a fresh
# skill writer on it (../skill-writer.sh new). The data, all from the main tree after the landing:
#   - the skill sentences that the landing made false: the landed diff.md's section "For the skill writer", if it
#     has one, and the bullets of its "For the coordinator" that name the skill; the same bullets of owed.md, the
#     sort's fuller list; and each "For the skill writer" section of the two writers' reports;
#   - diff.md's "POSITIONS", the changed words of the curator's decisions;
#   - the orientation update's folder: judgement.md, if its judge ran, and admission.md.
# If no line names the skill and the orientation's judge did not run, it starts no writer and prints NOTHING.
# Round 2 writes task-2.md from skill-fixes.md and the cold read's report, cold-read.md, and resumes the same
# writer (../skill-writer.sh resume). Each round saves the writer's report as writer-ROUND.md and its errors as
# writer-ROUND.log (ignored), then prints BASE (main's head before round 1, kept in base.txt), a COMMIT line for
# each commit since BASE that touches .claude/skills/, and a PART line for each skill file they changed, its
# sources.md left out, since a line of provenance needs no cold read.
# The folder is explorations/compile-ladder/climb-batch-N/skills/ in the main tree. The writer's session is kept
# under tmp/record-landing-N/skill-writer/ (SKILL_WRITER_STATE), so that the run leaves the coordinator's own
# writer session as it was. A round whose writer-ROUND.md holds a report is not run again. --dry-run prints the
# task and starts nothing.
set -uo pipefail
here=$(cd "$(dirname "$(readlink -f "$0")")" && pwd)
repo=$(cd "$here/../../../.." && pwd)
N=${1:?usage: skills.sh N ROUND [--dry-run]}; ROUND=${2:?round: 1 or 2}; DRY=${3:-}
CB="$repo/explorations/compile-ladder/climb-batch-$N"
SK="$CB/skills"; RL="$CB/record-landing"; OUT="$CB/orientation"
export SKILL_WRITER_STATE="$repo/tmp/record-landing-$N/skill-writer"
[ -f "$RL/diff.md" ] || { echo "skills.sh: no landed diff.md: $RL/diff.md" >&2; exit 1; }
case "$ROUND" in 1|2) ;; *) echo "skills.sh: the round is 1 or 2" >&2; exit 2 ;; esac
[ "$DRY" = --dry-run ] || mkdir -p "$SK" "$SKILL_WRITER_STATE"
if [ -f "$SK/base.txt" ]; then BASE=$(cat "$SK/base.txt")
else BASE=$(git -C "$repo" rev-parse --short=9 main); [ "$DRY" = --dry-run ] || echo "$BASE" > "$SK/base.txt"; fi

# The landing's data for round 1, as Markdown; empty when nothing names the skill and the judge did not run.
data() {
  python3 - "$N" "$RL" "$OUT" <<'EOF'
import os, re, sys
n, rl, out = sys.argv[1:4]
def read(p):
    return open(p).read() if os.path.exists(p) else ''
def section(text, title):
    m = re.search(r'^## ' + title + r'[^\n]*\n(.*?)(?=^## |\Z)', text, re.M | re.S)
    return m.group(1).strip() if m else ''
def bullets(text):
    return [b.rstrip() for b in re.split(r'\n(?=- )', '\n' + text) if b.startswith('- ')]
skill = re.compile(r'skill|fortress-repo|\.claude/', re.I)
diff, owed = read(rl + '/diff.md'), read(rl + '/owed.md')
parts = []
own = section(diff, 'For the skill writer')
if own: parts.append(('diff.md, "For the skill writer"', own))
for name, text in (('diff.md', diff), ('owed.md', owed)):
    hits = [b for b in bullets(section(text, 'For the coordinator')) if skill.search(b)]
    if hits: parts.append((name + ', "For the coordinator", its bullets that name the skill', '\n'.join(hits)))
for rep in ('entries-report.md', 'routing-report.md'):
    s = section(read(rl + '/' + rep), 'For the skill writer')
    if s: parts.append((rep + ', "For the skill writer"', s))
judged = os.path.exists(out + '/judgement.md')
if not parts and not judged:
    sys.exit(0)
print('## This landing\'s data\n')
print('Climb batch %s. The landed record-landing run: `%s/`. The orientation update: `%s/`.\n' % (n, rl, out))
print('### The skill sentences that the landing made false\n')
if parts:
    for name, text in parts:
        print('From `%s`:\n\n%s\n' % (name, text))
else:
    print('None is listed.\n')
pos = section(diff, 'POSITIONS')
print('### The changed decisions of the curator, from `diff.md`, "POSITIONS"\n')
print((pos or 'None.') + '\n')
print('### The orientation update\n')
if judged:
    print('Its judge ran: `%s/judgement.md` gives each section\'s verdict, and `%s/orientation.md` the judged text; `%s/sources-mapping.md` gives the provenance of what changed.\n' % (out, out, out))
elif os.path.exists(out + '/orientation.md'):
    print('Its writer ran, but its judge wrote no judgement.md, so nothing is judged: install nothing into `references/revival-changes.md`, and say so in your report.\n')
elif os.path.exists(out + '/admission.md'):
    print('Its admission admitted no entry, so its judge did not run, and the orientation has nothing to install. `%s/admission.md` names, for each entry not admitted, the part where it belongs.\n' % out)
else:
    print('It did not run. Install nothing into `references/revival-changes.md`.\n')
EOF
}

task=$SK/task-$ROUND.md
if [ ! -s "$task" ]; then
  if [ "$ROUND" = 1 ]; then
    d=$(data) || { echo "skills.sh: the data script failed" >&2; exit 1; }
    if [ -z "$d" ]; then [ "$DRY" = --dry-run ] || rm -f "$SK/base.txt"; rmdir "$SK" 2>/dev/null; echo "NOTHING: no line of diff.md, owed.md or the writers' reports names the skill, and the orientation's judge did not run"; echo "BASE $BASE"; exit 0; fi
    body=$(cat "$here/skill-task.md"; printf '\n%s\n' "$d")
  else
    [ -s "$SK/cold-read.md" ] || { echo "skills.sh: no cold read to fix from: $SK/cold-read.md" >&2; exit 1; }
    body=$(cat "$here/skill-fixes.md"; printf '\n## This round'"'"'s data\n\nThe cold read: `%s`. Your first task: `%s`. The commits before the cold read: `git log --format="%%h %%s" %s..main -- .claude/skills/`.\n' "$SK/cold-read.md" "$SK/task-1.md" "$BASE")
  fi
  if [ "$DRY" = --dry-run ]; then printf '== the task, task-%s.md:\n%s\n' "$ROUND" "$body"
  else printf '%s\n' "$body" > "$task"; fi
fi
mode=new; [ "$ROUND" = 2 ] && mode=resume
if [ "$DRY" = --dry-run ]; then
  echo "== would run: SKILL_WRITER_STATE=$SKILL_WRITER_STATE $repo/explorations/coordinator/tools/skill-writer.sh $mode $task > $SK/writer-$ROUND.md 2> $SK/writer-$ROUND.log"
  echo "BASE $BASE"; exit 0
fi
if grep -q '^session ' "$SK/writer-$ROUND.md" 2>/dev/null; then
  echo "== the writer's round $ROUND: finished before"
else
  "$repo/explorations/coordinator/tools/skill-writer.sh" "$mode" "$task" > "$SK/writer-$ROUND.md" 2> "$SK/writer-$ROUND.log"
  echo "== the writer's round $ROUND: exit $?"
fi
tail -n 40 "$SK/writer-$ROUND.md"
echo "BASE $BASE"
git -C "$repo" log --format='COMMIT %h %s' "$BASE..main" -- .claude/skills/
git -C "$repo" diff --name-only "$BASE" main -- .claude/skills/ | grep -v '/references/sources\.md$' | sed 's/^/PART /'
exit 0
