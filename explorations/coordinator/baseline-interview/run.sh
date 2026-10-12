#!/usr/bin/env bash
# run.sh <model-alias> <out-dir>
#
# One headless Claude Code session, chosen by its alias (`fable`, `opus`, `sonnet`, `haiku`), answers the
# questions of questions.md after setting.md, one question per turn: the session answers a question before
# it sees the next one, in one session resumed turn by turn, so that no later question reaches back into an
# earlier answer. INTERVIEW_MODE=oneshot sends the setting and every question in one turn instead (the form
# of the first runs of 2026-10-12, kept for comparison).
#
# The session runs in a private mount and process namespace in which this repository, the real home
# (~/.claude: settings, hooks, skills, memory, transcripts), /tmp and /var/tmp are out of sight, with an
# empty environment, an empty home, no MCP server and no tool, so that nothing but the setting primes the
# answer. Its working directory is an empty git repository. README.md says what the answers are for.
#
#   <out-dir>  must lie outside /home/user and /root. It gets turns/NN.in (what the session read on turn NN),
#              turns/NN.jsonl (the turn's event stream), turns/NN.stderr, answer.md (the replies, one per
#              question, numbered) and meta.txt (the date, the Claude Code version, the alias, the effort,
#              the mode, the tokens summed over the turns, and the id of the model that answered, read from
#              the stream). Only answer.md goes into the repository, with the model's version name written
#              by hand: the id stays out of git.
#
# Knobs: INTERVIEW_EFFORT (default xhigh, as the coordinating session runs; empty for the model's default),
# INTERVIEW_MODE (turns, the default, or oneshot), INTERVIEW_TURNS (at most this many questions, for a smoke
# test) and INTERVIEW_TIMEOUT (seconds a turn may take, default 1800).
set -euo pipefail

model=${1:?usage: run.sh <model-alias> <out-dir>}
out_arg=${2:?usage: run.sh <model-alias> <out-dir>}
kit=$(cd "$(dirname "$0")" && pwd -P)
effort=${INTERVIEW_EFFORT-xhigh}
mode=${INTERVIEW_MODE:-turns}
max_q=${INTERVIEW_TURNS:-}
timeout_s=${INTERVIEW_TIMEOUT:-1800}

die() { echo "run.sh: $*" >&2; exit 2; }
[ "$(id -u)" = 0 ] || die "needs root, for the private namespaces"
command -v claude >/dev/null || die "claude is not on PATH"
command -v unshare >/dev/null || die "unshare is not on PATH"
case $mode in turns|oneshot) ;; *) die "INTERVIEW_MODE must be turns or oneshot" ;; esac
mkdir -p "$out_arg"
out=$(cd "$out_arg" && pwd -P)
case "$out/" in /home/user/*|/root/*) die "put <out-dir> outside /home/user and /root" ;; esac

P="$out/private"
rm -rf "$P" "$out/turns"
mkdir -p "$P/root/.claude" "$P/home/work" "$P/tmp" "$P/vartmp" "$out/turns"
git init -q "$P/home/work"   # an empty repository, so that the session's working directory is as the setting says
id=$(python3 -c 'import uuid; print(uuid.uuid4())')

# The turns' inputs: in turns mode the setting with question 1, then each further question alone; in oneshot
# mode the setting with the whole of questions.md. A question is a line of questions.md that starts with its
# number; the group headings are left out, so that they do not prime the answer.
python3 - "$kit" "$out/turns" "$mode" "${max_q:-0}" <<'EOF'
import re, sys
kit, d, mode, max_q = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
setting = open(f'{kit}/setting.md', encoding='utf-8').read().rstrip('\n')
text = open(f'{kit}/questions.md', encoding='utf-8').read()
if mode == 'oneshot':
    open(f'{d}/01.in', 'w', encoding='utf-8').write(setting + '\n\n' + text)
    sys.exit()
qs = [l.strip() for l in text.split('\n') if re.match(r'^\d+\. ', l.strip())]
if max_q: qs = qs[:max_q]
for i, q in enumerate(qs, 1):
    body = (setting + '\n\n' + q) if i == 1 else q
    open(f'{d}/{i:02d}.in', 'w', encoding='utf-8').write(body + '\n')
EOF

# The namespace's set-up, run by bash as its first process; then claude replaces it.
NS_SETUP='set -e
mount --rbind "$IV_P/root" /root
mount --rbind "$IV_P/home" /home/user
mount --rbind "$IV_P/vartmp" /var/tmp
if [ -d /mnt/user-data ]; then mount -t tmpfs -o ro tmpfs /mnt/user-data; fi
mount --rbind "$IV_P/tmp" /tmp
mount -o remount,bind,ro /
cd /home/user/work
exec env -u IV_P "$@"'

start=$(date -u +%FT%TZ)
rc=0
for input in "$out"/turns/*.in; do
  t=$(basename "$input" .in)
  how=--session-id
  if [ "$t" != 01 ]; then how=--resume; fi
  set +e
  timeout --kill-after=60 "$timeout_s" \
    env -i HOME=/root USER=root LOGNAME=root SHELL=/bin/bash PATH="$PATH" LANG=C.UTF-8 TERM=dumb TZ=UTC \
      CLAUDE_CONFIG_DIR=/root/.claude IV_P="$P" \
    unshare --mount --pid --fork --kill-child --mount-proc --propagation private -- \
      bash -c "$NS_SETUP" interview \
      claude -p --model "$model" ${effort:+--effort "$effort"} "$how" "$id" \
        --permission-mode default --permission-prompts none --tools "" --strict-mcp-config \
        --output-format stream-json --verbose \
      < "$input" > "$out/turns/$t.jsonl" 2> "$out/turns/$t.stderr"
  rc=$?
  set -e
  if [ "$rc" != 0 ]; then echo "run.sh: turn $t failed with $rc; see $out/turns/$t.stderr" >&2; break; fi
done

python3 - "$out" "$model" "$effort" "$mode" "$start" "$rc" "$(claude --version 2>/dev/null | head -1)" <<'EOF'
import glob, json, os, sys
out, alias, effort, mode, start, rc, version = sys.argv[1:8]
answers, model, tools, usage = [], None, 0, {}
keys = ('input_tokens', 'cache_creation_input_tokens', 'cache_read_input_tokens', 'output_tokens')
for path in sorted(glob.glob(f'{out}/turns/*.jsonl')):
    texts = []
    for line in open(path, errors='replace'):
        try:
            e = json.loads(line)
        except ValueError:
            continue
        if e.get('type') == 'system' and e.get('subtype') == 'init':
            model = model or e.get('model')
        if e.get('type') == 'assistant':
            for b in (e.get('message') or {}).get('content') or []:
                if isinstance(b, dict) and b.get('type') == 'text' and b.get('text', '').strip():
                    texts.append(b['text'])
                if isinstance(b, dict) and b.get('type') == 'tool_use':
                    tools += 1
        if e.get('type') == 'result':
            u = e.get('usage') or {}
            for k in keys:
                usage[k] = usage.get(k, 0) + (u.get(k) or 0)
            model = model or list((e.get('modelUsage') or {}).keys() or [None])[0]
    answers.append('\n\n'.join(texts))
with open(f'{out}/answer.md', 'w', encoding='utf-8') as f:
    if mode == 'oneshot':
        f.write(answers[0] + '\n')
    else:
        for i, a in enumerate(answers, 1):
            f.write(f'**{i}.** {a}\n\n')
with open(f'{out}/meta.txt', 'w', encoding='utf-8') as f:
    f.write(f'started: {start}\nclaude-code: {version}\nalias: {alias}\neffort: {effort}\nmode: {mode}\n'
            f'turns: {len(answers)}\nmodel-id: {model}\nrc: {rc}\ntool-calls: {tools}\n'
            f'tokens: in={usage.get("input_tokens")} cache-write={usage.get("cache_creation_input_tokens")} '
            f'cache-read={usage.get("cache_read_input_tokens")} out={usage.get("output_tokens")}\n'
            f'answer-chars: {sum(len(a) for a in answers)}\n')
print(open(f'{out}/meta.txt').read())
EOF
exit "$rc"
