#!/usr/bin/env bash
# run-trial.sh <model-alias> <sandbox-dir> <out-dir>
#
# Runs the baseline trial (README.md beside this script) on one model, chosen by its alias, such as `opus`
# or `fable`, so that no model's identifier is written here. Two headless sessions, each with its own fresh
# session id:
#
#   takeover  in the sandbox: setting.md, then each message of messages.md, one per turn;
#   boot      in a fresh clone of what the takeover session committed, as after a lost container:
#             setting.md, then the boot message and the ten questions of quiz.md, one per turn.
#
#   <sandbox-dir>  made by make-sandbox.sh; the takeover session works in it and leaves it as it ended.
#   <out-dir>      the run's output: for each phase, each turn's input (`turns/NN.in`), its event stream
#                  (`NN.jsonl`), its reply text (`NN.reply.md`), a line in `turns.tsv`, the session id
#                  (`session-id`), and the session's private home with its transcripts
#                  (`root/.claude/projects/`, subagents' included); then `tokens.txt` (tokens.py) and
#                  `run.txt`. It must lie outside the repository, the sandbox, /home/user, /root and /var/tmp.
#
# Each turn runs in a private mount and process namespace in which /home/user/fortress is the sandbox (so
# the paths the files cite work), and the real repository, the transcript backup's worktree, the real home
# (~/.claude with the hooks and the transcripts, ~/.claude.json, git and cloud credentials), /tmp, /var/tmp
# and /mnt/user-data are out of sight; the rest of the file system is read-only, and the session sees only
# its own processes. The environment is emptied (`env -i`): no CLAUDE_CODE_SESSION_ID, no tokens, no proxy
# settings. No settings file holds a hook, so neither the transcript backup nor the git-check hook runs.
# README.md, "Isolation", says what each measure prevents.
#
# Environment knobs: TRIAL_EFFORT (default xhigh, as the coordinating session runs; empty for the model's
# default), TRIAL_PHASES (default takeover,boot), TRIAL_TURNS (at most this many turns a phase, for a smoke
# test), TRIAL_TURN_TIMEOUT (seconds, default 14400), TRIAL_MIN_AVAIL_GB (default 3: the run stops before a
# turn when less is free), TRIAL_SETTING, TRIAL_MESSAGES and TRIAL_QUIZ (other input files).
#
# A rerun with the same arguments resumes: turns that finished are skipped. A turn that fails or times out
# stops the run; look at its stderr and stream before rerunning, since a rerun sends that turn again.
set -euo pipefail

model=${1:?usage: run-trial.sh <model-alias> <sandbox-dir> <out-dir>}
sb_arg=${2:?usage: run-trial.sh <model-alias> <sandbox-dir> <out-dir>}
out_arg=${3:?usage: run-trial.sh <model-alias> <sandbox-dir> <out-dir>}
kit=$(cd "$(dirname "$0")" && pwd -P)
repo=$(cd "$kit/../../../.." && pwd -P)
setting=${TRIAL_SETTING:-$kit/setting.md}
messages=${TRIAL_MESSAGES:-$kit/messages.md}
quiz=${TRIAL_QUIZ:-$kit/quiz.md}
phases=${TRIAL_PHASES:-takeover,boot}
effort=${TRIAL_EFFORT-xhigh}
max_turns=${TRIAL_TURNS:-}
turn_timeout=${TRIAL_TURN_TIMEOUT:-14400}
min_avail_gb=${TRIAL_MIN_AVAIL_GB:-3}
# The rehearsal (setting.md's last line): no agent launches, so no Agent, Task, Workflow or messages to agents.
tools=(Bash Read Edit Write MultiEdit NotebookEdit Glob Grep TodoWrite Skill WebFetch WebSearch
       Monitor BashOutput KillShell)
denied=(Agent Task Workflow SendMessage TaskStop TaskOutput)

die() { echo "run-trial: $*" >&2; exit 2; }
[ "$(id -u)" = 0 ] || die "needs root, for the private namespaces"
command -v claude >/dev/null || die "claude is not on PATH"
command -v unshare >/dev/null || die "unshare is not on PATH"
sb=$(cd "$sb_arg" 2>/dev/null && pwd -P) || die "no sandbox at $sb_arg"
[ "$(git -C "$sb" rev-parse --show-toplevel 2>/dev/null)" = "$sb" ] || die "$sb is not the top of a git repository"
[ -z "$(git -C "$sb" remote)" ] || die "$sb has a remote"
case "$sb/" in "$repo/"*|/home/user/fortress/) die "$sb is the real repository or inside it" ;; esac
[ ! -e "$sb/explorations/coordinator/FACTS.md" ] || die "$sb still holds FACTS.md: make it with make-sandbox.sh"
mkdir -p "$out_arg"
out=$(cd "$out_arg" && pwd -P)
case "$out/" in
  "$repo/"*|"$sb/"*|/home/user/*|/root/*|/var/tmp/*)
    die "put <out-dir> outside the repository, the sandbox, /home/user, /root and /var/tmp" ;;
esac

check_disk() {
  local avail
  avail=$(df -B1G --output=avail "$out" | tail -1 | tr -d ' ')
  if [ "$avail" -lt "$min_avail_gb" ]; then
    echo "run-trial: ${avail}G left on the disk, under ${min_avail_gb}G; stopping before the next turn (rerun to resume)" >&2
    exit 5
  fi
}

# split <file> <dir> <first>: each `~~~~ message` block of <file> becomes <dir>/<NN>.in, numbered from <first>.
split() {
  python3 - "$@" <<'EOF'
import sys
src, d, first = sys.argv[1], sys.argv[2], int(sys.argv[3])
blocks, cur = [], None
for line in open(src, encoding='utf-8').read().split('\n'):
    if cur is None and line == '~~~~ message':
        cur = []
    elif cur is not None and line == '~~~~':
        blocks.append('\n'.join(cur)); cur = None
    elif cur is not None:
        cur.append(line)
for i, b in enumerate(blocks):
    with open(f'{d}/{first + i:02d}.in', 'w', encoding='utf-8') as f:
        f.write(b + '\n')
EOF
}

# The namespace's set-up, run by bash as the namespace's first process; then claude replaces it.
NS_SETUP='set -e
mount --bind "$TRIAL_SB" "$TRIAL_P/home/fortress"
mount --rbind "$TRIAL_P/root" /root
mount --rbind "$TRIAL_P/vartmp" /var/tmp
mount --rbind "$TRIAL_P/home" /home/user
if [ -d /mnt/user-data ]; then mount -t tmpfs -o ro tmpfs /mnt/user-data; fi
mount --rbind "$TRIAL_P/tmp" /tmp
while IFS= read -r d; do
  if [ -n "$d" ] && [ -d "$d" ]; then mount -t tmpfs -o ro tmpfs "$d"; fi
done <<< "$TRIAL_HIDE"
mount -o remount,bind,ro /
cd /home/user/fortress
exec env -u TRIAL_P -u TRIAL_SB -u TRIAL_HIDE "$@"'

# turn <phase-dir> <sandbox> <NN> <--session-id|--resume> <id>: one turn, its stream to turns/NN.jsonl.
turn() {
  local P=$1 sbx=$2 t=$3 how=$4 id=$5
  timeout --kill-after=60 "$turn_timeout" \
    env -i HOME=/root USER=root LOGNAME=root SHELL=/bin/bash PATH="$PATH" LANG=C.UTF-8 TERM=dumb TZ=UTC \
      CLAUDE_CONFIG_DIR=/root/.claude TRIAL_P="$P" TRIAL_SB="$sbx" TRIAL_HIDE="$out"$'\n'"$sb" \
    unshare --mount --pid --fork --kill-child --mount-proc --propagation private -- \
      bash -c "$NS_SETUP" trial \
      claude -p --model "$model" ${effort:+--effort "$effort"} "$how" "$id" \
        --permission-mode acceptEdits --permission-prompts none --allowedTools "${tools[@]}" --disallowedTools "${denied[@]}" \
        --strict-mcp-config --output-format stream-json --verbose --include-hook-events \
      < "$P/turns/$t.in" > "$P/turns/$t.jsonl" 2> "$P/turns/$t.stderr"
}

# summarize <phase-dir> <NN> <seconds> <rc> <id>: the reply text and one line of turns.tsv; fails on a
# wrong session id or an error result.
summarize() {
  python3 - "$@" <<'EOF'
import json, sys
P, t, secs, rc, want = sys.argv[1:6]
texts, res, model, hooks, sid = [], None, None, 0, set()
for line in open(f'{P}/turns/{t}.jsonl', errors='replace'):
    try:
        e = json.loads(line)
    except ValueError:
        continue
    if 'session_id' in e:
        sid.add(e['session_id'])
    if 'hook' in str(e.get('subtype', '')) or 'hook' in str(e.get('type', '')):
        hooks += 1
    if e.get('type') == 'system' and e.get('subtype') == 'init':
        model = e.get('model')
    if e.get('type') == 'assistant' and not e.get('parent_tool_use_id'):
        for b in (e.get('message') or {}).get('content') or []:
            if isinstance(b, dict) and b.get('type') == 'text' and b.get('text', '').strip():
                texts.append(b['text'])
    if e.get('type') == 'result':
        res = e
with open(f'{P}/turns/{t}.reply.md', 'w', encoding='utf-8') as f:
    f.write('\n\n'.join(texts) + '\n')
u = (res or {}).get('usage') or {}
row = [t, secs, rc, (res or {}).get('is_error'), (res or {}).get('num_turns'), ','.join(sorted(sid)),
       u.get('input_tokens', 0) + u.get('cache_creation_input_tokens', 0), u.get('cache_read_input_tokens', 0),
       u.get('output_tokens', 0), hooks]
with open(f'{P}/turns.tsv', 'a') as f:
    f.write('\t'.join(map(str, row)) + '\n')
if model:
    with open(f'{P}/model.txt', 'w') as f:
        f.write(model + '\n')
bad = []
if sid != {want}:
    bad.append(f'session ids {sorted(sid)}, expected {want}')
if res is None or res.get('is_error') or rc != '0':
    bad.append(f'exit {rc}, result {"missing" if res is None else res.get("subtype")}')
if bad:
    sys.exit('run-trial: turn ' + t + ': ' + '; '.join(bad))
EOF
}

# phase <name> <sandbox>: every input under <out>/<name>/inputs, one per turn.
phase() {
  local name=$1 sbx=$2 P=$out/$1
  mkdir -p "$P/home/fortress" "$P/root/.claude" "$P/tmp" "$P/vartmp" "$P/turns"
  [ -f "$P/root/.gitconfig" ] || printf '[user]\n\tname = Claude\n\temail = noreply@anthropic.com\n' > "$P/root/.gitconfig"
  [ -f "$P/session-id" ] || python3 -c 'import uuid; print(uuid.uuid4())' > "$P/session-id"
  [ -f "$P/turns.tsv" ] || printf 'turn\tseconds\texit\tis_error\tapi_turns\tsession\twritten\tread\toutput\thook_events\n' > "$P/turns.tsv"
  local id n=0 input t how start rc
  id=$(cat "$P/session-id")
  echo "run-trial: $name in $sbx, session $id"
  for input in "$P"/inputs/*.in; do
    t=$(basename "$input" .in)
    n=$((n + 1))
    if [ -n "$max_turns" ] && [ "$n" -gt "$max_turns" ]; then break; fi
    if [ -f "$P/turns/$t.done" ]; then continue; fi
    check_disk
    cp "$input" "$P/turns/$t.in"
    how=--session-id
    if [ -s "$P/root/.claude/projects/-home-user-fortress/$id.jsonl" ]; then how=--resume; fi
    start=$(date +%s)
    rc=0
    turn "$P" "$sbx" "$t" "$how" "$id" || rc=$?
    summarize "$P" "$t" "$(( $(date +%s) - start ))" "$rc" "$id"
    touch "$P/turns/$t.done"
    echo "run-trial: $name turn $t done in $(( $(date +%s) - start )) s"
  done
}

# The fresh session's sandbox: every branch the takeover sandbox committed, nothing else.
boot_sandbox() {
  local dst=$out/boot/sandbox branch
  if [ -d "$dst/.git" ]; then return; fi
  mkdir -p "$dst"
  git -C "$dst" init -q -b boot-unborn
  git -C "$dst" fetch -q --no-tags "$sb" '+refs/heads/*:refs/heads/*' '+refs/tags/*:refs/tags/*'
  if branch=$(git -C "$sb" symbolic-ref -q --short HEAD); then
    git -C "$dst" symbolic-ref HEAD "refs/heads/$branch"
    git -C "$dst" checkout -q -f
  else
    git -C "$dst" fetch -q "$sb" HEAD
    git -C "$dst" checkout -q --detach FETCH_HEAD
  fi
  [ -z "$(git -C "$dst" remote)" ] || die "the boot sandbox has a remote"
}

{ echo "run $(date -u +%Y-%m-%dT%H:%M:%SZ): model alias $model, effort ${effort:-default}, phases $phases${max_turns:+, $max_turns turns a phase}"
  echo "  claude $(claude --version 2>/dev/null | head -1); kit at $(git -C "$repo" rev-parse --short HEAD)"
  echo "  sandbox $sb at $(git -C "$sb" rev-parse --short HEAD)"; } >> "$out/run.txt"

case ",$phases," in *,takeover,*)
  mkdir -p "$out/takeover/inputs"
  cp "$setting" "$out/takeover/inputs/00.in"
  split "$messages" "$out/takeover/inputs" 1
  phase takeover "$sb"
  echo "  takeover ended with the sandbox at $(git -C "$sb" rev-parse --short HEAD), $(git -C "$sb" status --porcelain | wc -l) paths uncommitted" >> "$out/run.txt"
  python3 "$kit/tokens.py" "$out" > /dev/null ;;
esac

case ",$phases," in *,boot,*)
  if [ -z "$max_turns" ] && [ -d "$out/takeover/inputs" ] &&
     [ "$(ls "$out/takeover/turns/"*.done 2>/dev/null | wc -l)" -lt "$(ls "$out/takeover/inputs/"*.in | wc -l)" ]; then
    die "the takeover phase has not finished; rerun to finish it before the boot"
  fi
  boot_sandbox
  mkdir -p "$out/boot/inputs"
  cp "$setting" "$out/boot/inputs/00.in"
  split "$quiz" "$out/boot/inputs" 1
  phase boot "$out/boot/sandbox"
  python3 "$kit/tokens.py" "$out" > /dev/null ;;
esac

echo "  ended $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> "$out/run.txt"
cat "$out/tokens.txt" 2>/dev/null | grep TOTAL || true
