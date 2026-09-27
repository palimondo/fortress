#!/bin/bash
# lib.sh <name> <variant> : a library copy $W/libs/<name> (every .fsi/.fss of Library/ and
# ProjectFortress/LibraryBuiltin/, as distance-triage/run.sh's step `lib`), respelled by variants_c.py
set -eu
OUT=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan/probes-C
W=$OUT/work; R=/home/user/fortress
n=$1; v=$2; dd=$W/libs/$n
rm -rf "$dd"; mkdir -p "$dd"
cp $R/Library/*.fsi $R/Library/*.fss $R/ProjectFortress/LibraryBuiltin/*.fsi $R/ProjectFortress/LibraryBuiltin/*.fss "$dd/"
python3 $OUT/variants_c.py "$dd" "$v"
