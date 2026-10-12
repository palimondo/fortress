#!/usr/bin/env bash
# run.sh <model-alias> <out-dir>
#
# One headless Claude Code session, chosen by its alias (`fable`, `opus`, `sonnet`, `haiku`), answers
# questions.md after setting.md in one turn. The session runs in a private mount and process namespace in
# which this repository, the real home (~/.claude: settings, hooks, skills, memory, transcripts), /tmp and
# /var/tmp are out of sight, with an empty environment, an empty home, no MCP server and no tool, so that
# nothing but the setting primes the answer. README.md says what the answers are for.
#
#   <out-dir>  must lie outside /home/user and /root. It gets prompt.md (what the session read),
#              stream.jsonl (the session's event stream), stderr, answer.md (the reply's text) and
#              meta.txt (the date, the Claude Code version, the alias, the effort, the tokens, and the id
#              of the model that answered, read from the stream). Only answer.md goes into the repository,
#              with the model's version name written by hand: the id stays out of git.
#
# Knobs: INTERVIEW_EFFORT (default xhigh, as the coordinating session runs; empty for the model's default)
# and INTERVIEW_TIMEOUT (seconds, default 3600).
set -euo pipefail

model=${1:?usage: run.sh <model-alias> <out-dir>}
out_arg=${2:?usage: run.sh <model-alias> <out-dir>}
kit=$(cd "$(dirname "$0")" && pwd -P)
effort=${INTERVIEW_EFFORT-xhigh}
timeout_s=${INTERVIEW_TIMEOUT:-3600}

die() { echo "run.sh: $*" >&2; exit 2; }
[ "$(id -u)" = 0 ] || die "needs root, for the private namespaces"
command -v claude >/dev/null || die "claude is not on PATH"
command -v unshare >/dev/null || die "unshare is not on PATH"
mkdir -p "$out_arg"
out=$(cd "$out_arg" && pwd -P)
case "$out/" in /home/user/*|/root/*) die "put <out-dir> outside /home/user and /root" ;; esac

P="$out/private"
rm -rf "$P"
mkdir -p "$P/root/.claude" "$P/home/work" "$P/tmp" "$P/vartmp"
{ cat "$kit/setting.md"; echo; cat "$kit/questions.md"; } > "$out/prompt.md"
id=$(python3 -c 'import uuid; print(uuid.uuid4())')

# The namespace's set-up, run by bash as its first process; then claude replaces it.
NS_SETUP='set -e
mount --rbind "$IV_P/root" /root
mount --rbind "$IV_P/home" /home/user
mount --rbind "$IV_P/tmp" /tmp
mount --rbind "$IV_P/vartmp" /var/tmp
if [ -d /mnt/user-data ]; then mount -t tmpfs -o ro tmpfs /mnt/user-data; fi
mount -o remount,bind,ro /
cd /home/user/work
exec env -u IV_P "$@"'

start=$(date -u +%FT%TZ)
set +e
timeout --kill-after=60 "$timeout_s" \
  env -i HOME=/root USER=root LOGNAME=root SHELL=/bin/bash PATH="$PATH" LANG=C.UTF-8 TERM=dumb TZ=UTC \
    CLAUDE_CONFIG_DIR=/root/.claude IV_P="$P" \
  unshare --mount --pid --fork --kill-child --mount-proc --propagation private -- \
    bash -c "$NS_SETUP" interview \
    claude -p --model "$model" ${effort:+--effort "$effort"} --session-id "$id" \
      --permission-mode default --permission-prompts none --tools "" --strict-mcp-config \
      --output-format stream-json --verbose \
    < "$out/prompt.md" > "$out/stream.jsonl" 2> "$out/stderr"
rc=$?
set -e

python3 - "$out" "$model" "$effort" "$start" "$rc" "$(claude --version 2>/dev/null | head -1)" <<'EOF'
import json, sys
out, alias, effort, start, rc, version = sys.argv[1:7]
texts, model, usage, tools = [], None, {}, 0
for line in open(f'{out}/stream.jsonl', errors='replace'):
    try:
        e = json.loads(line)
    except ValueError:
        continue
    if e.get('type') == 'system' and e.get('subtype') == 'init':
        model = e.get('model')
    if e.get('type') == 'assistant':
        for b in (e.get('message') or {}).get('content') or []:
            if isinstance(b, dict) and b.get('type') == 'text' and b.get('text', '').strip():
                texts.append(b['text'])
            if isinstance(b, dict) and b.get('type') == 'tool_use':
                tools += 1
    if e.get('type') == 'result':
        usage = e.get('usage') or {}
        model = model or list((e.get('modelUsage') or {}).keys() or [None])[0]
with open(f'{out}/answer.md', 'w', encoding='utf-8') as f:
    f.write('\n\n'.join(texts) + '\n')
with open(f'{out}/meta.txt', 'w', encoding='utf-8') as f:
    f.write(f'started: {start}\nclaude-code: {version}\nalias: {alias}\neffort: {effort}\n'
            f'model-id: {model}\nrc: {rc}\ntool-calls: {tools}\n'
            f'tokens: in={usage.get("input_tokens")} cache-write={usage.get("cache_creation_input_tokens")} '
            f'cache-read={usage.get("cache_read_input_tokens")} out={usage.get("output_tokens")}\n'
            f'answer-chars: {sum(len(t) for t in texts)}\n')
print(open(f'{out}/meta.txt').read())
EOF
exit "$rc"
