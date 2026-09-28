#!/bin/bash
# machine.sh [title]: the machine line every capture carries (protocol.md, principle 2)
echo "--- ${1:-} $(date -u +%FT%TZ); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/^[^:]*: *//'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/^[^:]*: *//') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=${FORTRESS_THREADS:-unset}; HEAD $(git rev-parse --short HEAD); git status --short Library ProjectFortress/src: [$(git status --short Library ProjectFortress/src | tr '\n' ' ')]"
