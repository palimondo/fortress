#!/bin/bash
# One-shot environment setup for the blinded run. Idempotent: safe to re-run.
# Every stage prints "[HH:MM:SS] STAGE <name>: START|OK|FAIL (Ns)" to stdout;
# stage detail (apt, ant, latex output) streams to experiment/setup.log.
# Exit status is non-zero if any stage failed. Stages: packages build warm
# render transcripts. Run all:  bash experiment/setup.sh
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOG="$ROOT/experiment/setup.log"
STAGE_TIMEOUT="${STAGE_TIMEOUT:-900}"
TB_BRANCH="${TRANSCRIPTS_BRANCH:-transcripts-blinded}"
TB_DIR="${TRANSCRIPTS_DIR:-/home/user/fortress-transcripts-blinded}"
SETTINGS="${CLAUDE_SETTINGS:-$HOME/.claude/settings.json}"
PKGS="openjdk-25-jdk-headless ant texlive-latex-base texlive-latex-recommended texlive-latex-extra texlive-fonts-recommended texlive-science texlive-lang-greek texlive-pictures texlive-plain-generic dvisvgm"
: > "$LOG"
log(){ printf '[%s] %s\n' "$(date -u +%H:%M:%S)" "$*" | tee -a "$LOG"; }
FAILED=0; SUMMARY=()
stage(){ local name=$1; shift; log "STAGE $name: START"; local s=$(date +%s)
  if timeout "$STAGE_TIMEOUT" bash -c "$*" >>"$LOG" 2>&1; then
    log "STAGE $name: OK ($(( $(date +%s)-s ))s)"; SUMMARY+=("PASS  $name")
  else
    log "STAGE $name: FAIL ($(( $(date +%s)-s ))s) — details: tail -40 $LOG"; SUMMARY+=("FAIL  $name"); FAILED=1
  fi; }

# --- packages: install only what is missing
missing=""; for p in $PKGS; do dpkg -s "$p" >/dev/null 2>&1 || missing="$missing $p"; done
if [ -z "$missing" ]; then log "STAGE packages: OK (all present)"; SUMMARY+=("PASS  packages")
else log "packages missing:$missing"
  stage packages "apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq $missing"
fi

# --- build: ant compileAll only if outputs are absent
source "$ROOT/experiment/env.sh"
if [ -d "$ROOT/ProjectFortress/build" ] && [ -x "$ROOT/bin/fortress" ]; then log "STAGE build: OK (present)"; SUMMARY+=("PASS  build")
else stage build "cd '$ROOT' && ant compileAll"; fi

# --- warm: first interpreter run generates library caches (minutes, once)
mkdir -p "$ROOT/experiment/warm"
printf 'component warm\nexport Executable\nrun() = println "warm ok"\nend\n' > "$ROOT/experiment/warm/warm.fss"
stage warm "cd '$ROOT' && FORTRESS_THREADS=1 ./bin/fortress experiment/warm/warm.fss | grep -q 'warm ok'"

# --- render: Fortify pipeline end-to-end on a one-line excerpt
cat > "$ROOT/experiment/warm/rt.tic" <<'TIC'
\documentclass{article}
\usepackage{fortify}
\usepackage[active,tightpage]{preview}
\setlength\PreviewBorder{6pt}
\begin{document}
\begin{preview}
`f(x: RR64): RR64 = x^2`
\end{preview}
\end{document}
TIC
stage render "cd '$ROOT/experiment/warm' && '$ROOT/bin/fortick' rt.tic && TEXINPUTS='.:$ROOT/Fortify:' latex -interaction=nonstopmode rt.tex && dvisvgm --no-fonts --exact-bbox -o rt.svg rt.dvi && /opt/pw-browsers/chromium --headless --no-sandbox --disable-gpu --screenshot=rt.png rt.svg && test -s rt.svg && test -s rt.png && rm -f rt.tex rt.dvi rt.aux rt.log"

# --- transcripts: worktree of the transcripts branch + Stop hook + one real snapshot
stage transcripts "
  cd '$ROOT' && git fetch -q origin '$TB_BRANCH' &&
  { [ -d '$TB_DIR' ] || git worktree add '$TB_DIR' '$TB_BRANCH'; } &&
  test -x '$TB_DIR/scripts/backup.sh' &&
  python3 - <<PY
import json, os
p = '$SETTINGS'; os.makedirs(os.path.dirname(p), exist_ok=True)
d = json.load(open(p)) if os.path.exists(p) else {}
h = {'type': 'command', 'command': '$TB_DIR/scripts/backup.sh'}
stop = d.setdefault('hooks', {}).setdefault('Stop', [])
if not any(x.get('command') == h['command'] for g in stop for x in g.get('hooks', [])):
    stop.append({'hooks': [h]})
json.dump(d, open(p, 'w'), indent=2); print('hook registered in', p)
PY
  [ -n '${SETUP_DRY_PUSH:-}' ] || { '$TB_DIR/scripts/backup.sh'; git -C '$TB_DIR' log --oneline -1 | grep -q 'Transcript snapshot' && git -C '$TB_DIR' status -sb | head -1 | grep -qv ahead; }
"

log "---- setup summary ----"; for s in "${SUMMARY[@]}"; do log "$s"; done
[ "$FAILED" = 0 ] && log "SETUP RESULT: PASS" || log "SETUP RESULT: FAIL"
exit $FAILED
