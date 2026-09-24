#!/usr/bin/env bash
# Checks explorations/coordinator/INDEX.md against the tree: which standalone
# notes are missing a line, which lines name a file that is gone, which lines
# fall outside the set the index is meant to cover, and which paths named in a
# line's prose no longer resolve. Read-only. Exit 1 if the first two are
# non-empty.
#
# The note set is every *.md under explorations/ except run/experiment trees
# (which document themselves in their own README) and evidence directories.
# Edit the two lists below when the shape of the tree changes.

set -uo pipefail

root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)
index="$root/explorations/coordinator/INDEX.md"
[ -f "$index" ] || { echo "no INDEX.md at $index" >&2; exit 2; }

# Run/experiment trees: a directory holding one run's sources and evidence.
run_roots='apl|astra|blinded-fable|compile-ladder|run-b|run-b2|run-c|run-c3|run-c4|fortify|ci|experiment'
# Generic evidence directory names, at any depth.
evidence_dirs='probes|checks|goldens|figures|evidence|measurements|raw|src|tools|gate|cold-cache|reference|archive|build|article|worker|notes|recovered-reports|_prior|__pycache__|existing-tests|failed|png|regen|tic-regen|tour|pairs|combos'

notes=$(cd "$root" && find explorations -name '*.md' \
  | grep -vE "(^|/)[A-Za-z0-9_.-]+-(probes|pairs)/" \
  | grep -vE "(^|/)($evidence_dirs)/" \
  | grep -vE "^explorations/($run_roots)/" \
  | grep -v '^explorations/coordinator/INDEX.md$' \
  | sort)

# Entry keys: the backticked path at the start of an index bullet.
keys=$(grep -oP '^- `\K[^`]+' "$index" | sort -u)
# Entry keys that are notes (drop the .js/.sh entries from the comparison set).
key_notes=$(printf '%s\n' "$keys" | grep '\.md$' | sort -u)

missing=$(comm -23 <(printf '%s\n' "$notes") <(printf '%s\n' "$key_notes"))
stale=$(printf '%s\n' "$keys" | while read -r p; do
  [ -n "$p" ] && [ ! -e "$root/$p" ] && echo "$p"
done)
outside=$(comm -13 <(printf '%s\n' "$notes") <(printf '%s\n' "$key_notes"))

tracked=$(mktemp); trap 'rm -f "$tracked"' EXIT
(cd "$root" && git ls-files) > "$tracked" 2>/dev/null || : > "$tracked"

# Paths named inside a line's prose (not the entry key) that resolve nowhere.
dangling=$(grep -oP '`\K[^`]{1,120}?\.(md|js|sh|py|fss|fsi|html|tic|svg|csv|tsv|txt|yml)(?=`)' "$index" \
  | grep '/' | grep -v '[[:space:]]' | sort -u | while read -r p; do
    if [ -e "$root/$p" ] || [ -e "$root/explorations/$p" ] \
       || [ -e "$root/explorations/coordinator/$p" ]; then continue; fi
    # last resort: the reference may be relative to a directory deeper in the tree
    grep -q "/$p\$" "$tracked" || echo "$p"
  done)

n() { [ -z "$1" ] && echo 0 || printf '%s\n' "$1" | wc -l | tr -d ' '; }

echo "INDEX.md check — $(cd "$root" && git rev-parse --short HEAD 2>/dev/null || echo 'no git')"
echo "notes in scope: $(n "$notes")   index entries: $(n "$keys")"
echo
echo "== notes missing from INDEX.md ($(n "$missing")) =="
[ -n "$missing" ] && printf '%s\n' "$missing"
echo
echo "== index lines naming a file that does not exist ($(n "$stale")) =="
[ -n "$stale" ] && printf '%s\n' "$stale"
echo
echo "== index lines outside the note set, informational ($(n "$outside")) =="
[ -n "$outside" ] && printf '%s\n' "$outside"
echo
echo "== paths named in a line's prose that resolve nowhere ($(n "$dangling")) =="
[ -n "$dangling" ] && printf '%s\n' "$dangling"

[ -n "$missing" ] || [ -n "$stale" ] && exit 1
exit 0
