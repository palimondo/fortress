#!/bin/bash
# usage: strhist.sh <file> <fixed-string>
# For every commit (all refs, full history) touching <file>, in author-date order,
# print the commits where the count of <fixed-string> in the file changes.
cd "$(git -C "$(dirname "${BASH_SOURCE[0]}")" rev-parse --show-toplevel)"
f="$1"; s="$2"
prev=-1
git log --all --full-history --format='%H %at' -- "$f" | sort -k2 -n | while read H at; do
  c=$(git show "$H:$f" 2>/dev/null | grep -cF -- "$s")
  if [ "$c" != "$prev" ]; then
    echo "$(git log -1 --format='%h %ad %an [%p] %s' --date=short $H | cut -c1-140)  => count $c"
    prev=$c
  fi
done
