#!/bin/bash
# machine.sh <label>: prints the machine line protocol.md section 6 asks of a timing
echo "--- $1 $(date -u +%FT%TZ)"
echo "nproc $(nproc)"
grep -m1 'model name' /proc/cpuinfo
grep -m1 'cpu MHz' /proc/cpuinfo
echo "loadavg $(cat /proc/loadavg)"
java -version 2>&1 | head -1
echo "FORTRESS_THREADS=${FORTRESS_THREADS:-unset}"
