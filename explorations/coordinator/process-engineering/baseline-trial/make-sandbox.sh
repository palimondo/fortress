#!/usr/bin/env bash
# make-sandbox.sh <dir> [<commit>]
#
# Makes the sandbox of the baseline trial (README.md beside this script): a copy of this repository's
# files with no git history, no remote, no build outputs and no ignored files, from which the coordinator's
# own organizing files are removed. The copy gets a fresh `git init` and one commit.
#
#   <dir>     where the sandbox goes; it must not exist yet, or be empty, and must be outside this
#             repository.
#   <commit>  copy the tree of this commit (git archive). Without it, the current working tree is copied:
#             the tracked files as they are on disk, and the untracked files that .gitignore does not
#             ignore. The trial uses the commit that messages.md names, so that a rerun for a new model
#             copies the same tree.
#
# The removals are the lists REMOVE_PATHS and REMOVE_SECTIONS below; README.md gives the reason for each,
# and for each borderline file kept. A listed path that the tree does not hold is reported and skipped.
# The provenance (source commit, mode, the removals made) is written to <dir>.source, beside the sandbox,
# not inside it.
set -euo pipefail

dir=${1:?usage: make-sandbox.sh <dir> [<commit>]}
commit=${2:-}
repo=$(cd "$(dirname "$0")/../../../.." && pwd)
git -C "$repo" rev-parse --show-toplevel >/dev/null

# Whole files and folders, relative to the repository's root.
REMOVE_PATHS=(
  # The coordinator's boot, records and their histories.
  explorations/protocol.md
  explorations/coordinator/README.md
  explorations/coordinator/FACTS.md
  explorations/coordinator/FACTS-history.md
  explorations/coordinator/POSITIONS.md
  explorations/coordinator/POSITIONS-history.md
  explorations/coordinator/INDEX.md
  explorations/coordinator/PLAN.md
  explorations/coordinator/review-queue.md
  explorations/coordinator/postmortem-2026-09-19/held-list.md
  explorations/coordinator/check-index.sh
  explorations/coordinator/tools/check-verbatim.py
  explorations/microgpt-run-c-handover-history.md
  # The coordinator's skill, the hooks, and the skills' provenance in FACTS and POSITIONS.
  .claude/skills/coordinator
  .claude/settings.json
  .claude/skills/fortress-repo/references/sources.md
  .claude/skills/cloud-container/references/sources.md
  # Notes whose subject is the coordinator's own record keeping, boot, context and compactions.
  explorations/coordinator/record-keeping-proposal.md
  explorations/coordinator/postmortem-2026-09-27-record-keeping.md
  explorations/coordinator/protocol-guides-review.md
  explorations/coordinator/explorations-inventory.md
  explorations/coordinator/postmortem-2026-09-29/consolidation-review.md
  explorations/coordinator/process-engineering/coordinator-shape.md
  explorations/coordinator/process-engineering/record-origins-evidence.md
  explorations/coordinator/process-engineering/record-growth
  explorations/reviews/coordinator-context-2026-09-27.md
  explorations/reviews/skills-review-fable.md
  explorations/reviews/skills-agenda-audit.md
  # Notes whose subject is how the coordinator talks to the curator, asks him and holds his points.
  explorations/coordinator/answer-form-archaeology.md
  explorations/coordinator/fable-use-archaeology.md
  explorations/coordinator/postmortem-2026-09-19/restate-and-hold.md
  explorations/coordinator/postmortem-2026-09-19/wall-of-text-spiral.md
  explorations/coordinator/postmortem-2026-09-19/decision-lists.md
  # The indices of the coordinating session's own transcript, with the tools that built them.
  explorations/coordinator/postmortem-2026-09-19/README.md
  explorations/coordinator/postmortem-2026-09-19/_get.py
  explorations/coordinator/postmortem-2026-09-19/parse.py
  explorations/coordinator/postmortem-2026-09-19/_prior
  explorations/coordinator/postmortem-2026-09-19/turns.tsv
  explorations/coordinator/postmortem-2026-09-19/tool-calls.tsv
  explorations/coordinator/postmortem-2026-09-19/context.tsv
  explorations/coordinator/postmortem-2026-09-19/agents.md
  explorations/coordinator/postmortem-2026-09-19/boots.md
  explorations/coordinator/postmortem-2026-09-19/compactions.md
  explorations/coordinator/postmortem-2026-09-19/open-at-compaction-2026-09-23.md
  # This kit: the messages, the quiz and its key.
  explorations/coordinator/process-engineering/baseline-trial
)

# Sections of files that are kept: FILE|HEADING removes that heading's section, up to the next heading
# of the same or a higher level; FILE|-ITEM removes the list item that starts with ITEM, with its
# continuation lines.
REMOVE_SECTIONS=(
  "CLAUDE.md|-- The coordinating session follows the boot order of"
  "explorations/microgpt-run-c-handover.md|## Where the work stands"
  "explorations/microgpt-run-c-handover.md|## Read first"
  "explorations/microgpt-run-b-handover.md|## Where the arc stands"
  "explorations/microgpt-run-b-handover.md|### What to do after compaction"
  ".claude/skills/fortress-repo/SKILL.md|## The record"
  ".claude/skills/fortress-repo/references/records.md|## POSITIONS and FACTS"
  ".claude/skills/fortress-repo/references/records.md|## Reading the record"
  ".claude/skills/fortress-repo/references/records.md|## Writing to the record"
)

if [ -e "$dir" ] && [ -n "$(ls -A "$dir" 2>/dev/null)" ]; then
  echo "make-sandbox: $dir exists and is not empty" >&2; exit 2
fi
mkdir -p "$dir"
dir=$(cd "$dir" && pwd -P)
case "$dir/" in "$(cd "$repo" && pwd -P)/"*)
  echo "make-sandbox: $dir is inside the repository" >&2; rmdir "$dir" 2>/dev/null || true; exit 2 ;;
esac

# The copy's size against the room left on the disk (the cloud-container skill: read Avail, not Size).
if [ -n "$commit" ]; then
  commit=$(git -C "$repo" rev-parse --verify "$commit^{commit}")
  need=$(git -C "$repo" ls-tree -r -l "$commit" | awk '{s+=$4} END {print s}')
else
  need=$(cd "$repo" && git ls-files -z --cached --others --exclude-standard |
         python3 -c 'import os,sys; print(sum(os.path.getsize(p) for p in sys.stdin.read().split("\0") if p and os.path.isfile(p)))')
fi
avail=$(df -B1 --output=avail "$dir" | tail -1)
echo "make-sandbox: the copy is $((need/1048576)) MiB before removals and its git objects; $((avail/1048576)) MiB available"
if [ $((need * 3)) -gt "$avail" ]; then
  echo "make-sandbox: less than three times the copy's size is available; not copying" >&2; exit 3
fi

if [ -n "$commit" ]; then
  git -C "$repo" archive --format=tar "$commit" | tar -x -C "$dir"
  mode="commit $commit"
  stamp=$(git -C "$repo" log -1 --format=%cI "$commit")
else
  (cd "$repo" && git ls-files -z --cached --others --exclude-standard |
     python3 -c 'import os,sys; sys.stdout.write("".join(p+"\0" for p in sys.stdin.read().split("\0") if p and os.path.lexists(p)))' |
     tar --null -T - -c) | tar -x -C "$dir"
  head=$(git -C "$repo" rev-parse HEAD)
  dirty=$(git -C "$repo" status --porcelain | wc -l)
  mode="working tree at $head, $dirty paths differing from it"
  stamp=$(date -u +%Y-%m-%dT%H:%M:%SZ)
fi

removed=(); absent=()
for p in "${REMOVE_PATHS[@]}"; do
  if [ -e "$dir/$p" ]; then rm -rf -- "${dir:?}/$p"; removed+=("$p"); else absent+=("$p"); fi
done

sections=$(python3 - "$dir" "${REMOVE_SECTIONS[@]}" <<'EOF'
import re, sys
root, specs = sys.argv[1], sys.argv[2:]
out = []
for spec in specs:
    path, key = spec.split('|', 1)
    try:
        lines = open(f'{root}/{path}', encoding='utf-8').read().split('\n')
    except FileNotFoundError:
        out.append(f'absent: {spec}'); continue
    if key.startswith('-'):
        item = key[1:]
        starts = [i for i, l in enumerate(lines) if l.startswith(item)]
        if len(starts) != 1:
            out.append(f'not found once: {spec}'); continue
        s = starts[0]; e = s + 1
        while e < len(lines) and lines[e].startswith('  ') and not lines[e].lstrip().startswith('- '):
            e += 1
    else:
        level = len(key) - len(key.lstrip('#'))
        starts = [i for i, l in enumerate(lines) if l.rstrip() == key]
        if len(starts) != 1:
            out.append(f'not found once: {spec}'); continue
        s = starts[0]; e = s + 1
        while e < len(lines):
            m = re.match(r'^(#+) ', lines[e])
            if m and len(m.group(1)) <= level:
                break
            e += 1
    del lines[s:e]
    open(f'{root}/{path}', 'w', encoding='utf-8').write('\n'.join(lines))
    out.append(f'removed {e - s} lines: {spec}')
print('\n'.join(out))
EOF
)

git -C "$dir" init -q -b main
git -C "$dir" add -A
GIT_AUTHOR_NAME=Claude GIT_AUTHOR_EMAIL=noreply@anthropic.com GIT_AUTHOR_DATE="$stamp" \
GIT_COMMITTER_NAME=Claude GIT_COMMITTER_EMAIL=noreply@anthropic.com GIT_COMMITTER_DATE="$stamp" \
  git -C "$dir" -c commit.gpgsign=false commit -q -m "The Fortress revival's tree"
if [ -n "$(git -C "$dir" remote)" ]; then echo "make-sandbox: the sandbox has a remote" >&2; exit 4; fi

{ echo "source: $repo, $mode"
  echo "made: $(date -u +%Y-%m-%dT%H:%M:%SZ); sandbox commit $(git -C "$dir" rev-parse HEAD) dated $stamp"
  echo "removed paths:"; if [ ${#removed[@]} -gt 0 ]; then printf '  %s\n' "${removed[@]}"; fi
  echo "listed paths not in this tree:"; if [ ${#absent[@]} -gt 0 ]; then printf '  %s\n' "${absent[@]}"; fi
  echo "sections:"; printf '%s\n' "$sections" | sed 's/^/  /'
} > "$dir.source"
cat "$dir.source"
echo "make-sandbox: $(du -sh "$dir" | cut -f1) on disk, $(du -sh "$dir/.git" | cut -f1) of it in .git; $(df -h --output=avail "$dir" | tail -1 | tr -d ' ') available"
