#!/bin/bash
# First recorded error of each subset file, before and after the edit, side by side.
S=/home/user/fortress-rr64/explorations/compile-ladder/rung-rr64-functions
first_err () { grep -m1 -E '^ +[A-Z]|^ +[a-z].*(not defined|Could not|Cannot|error)' "$1" 2>/dev/null | sed 's/^ *//' ; }
printf '%-18s %-8s %-8s %s\n' FILE BEFORE AFTER 'first error after'
while IFS=$'\t' read -r corpus f; do
    [ -n "$corpus" ] || continue
    b=$(awk -v F="$f" -F'\t' '$2==F{print $4}' "$S/ladder-before/results.tsv")
    a=$(awk -v F="$f" -F'\t' '$2==F{print $4}' "$S/ladder-after/results.tsv")
    ea=$(first_err "$S/ladder-after/raw/$corpus/$f.compile")
    [ -z "$ea" ] && ea=$(head -3 "$S/ladder-after/raw/$corpus/$f.compile" 2>/dev/null | tr '\n' ' ')
    printf '%-18s %-8s %-8s %s\n' "$f" "crc=$b" "crc=$a" "$ea"
done < "$S/subset.txt"
echo
echo "=== full before/after error counts ==="
while IFS=$'\t' read -r corpus f; do
    [ -n "$corpus" ] || continue
    nb=$(grep -c 'not defined' "$S/ladder-before/raw/$corpus/$f.compile" 2>/dev/null)
    na=$(grep -c 'not defined' "$S/ladder-after/raw/$corpus/$f.compile" 2>/dev/null)
    tb=$(grep -oE 'has [0-9]+ error' "$S/ladder-before/raw/$corpus/$f.compile" 2>/dev/null | head -1)
    ta=$(grep -oE 'has [0-9]+ error' "$S/ladder-after/raw/$corpus/$f.compile" 2>/dev/null | head -1)
    printf '%-18s before: %-16s (%s undefined)  after: %-16s (%s undefined)\n' "$f" "${tb:--}" "$nb" "${ta:--}" "$na"
done < "$S/subset.txt"
