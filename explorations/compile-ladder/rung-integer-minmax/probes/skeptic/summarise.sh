#!/bin/bash
# summarise.sh: one line per program of list.txt: walk on the base sandbox, walk on the edit, and the compiled run
# (the compiler prelude), each as its printed answer or the first line of its error.
D="$(cd "$(dirname "$0")" && pwd)"
ans () { [ -f "$1" ] || { echo "-" ; return ; }
  a=$(grep -m1 -E ' = .* : ' "$1" | sed 's/  */ /g; s/^ //')
  [ -n "$a" ] && { echo "$a" ; return ; }
  e=$(grep -m1 -A1 -E 'ProgramError|^java.lang.Error|Could not check|Unmatched' "$1" | grep -vE 'ProgramError' | head -1 | sed 's/^ *//' | cut -c1-70)
  [ -z "$e" ] && e=$(grep -m1 -E 'Error|error' "$1" | cut -c1-70)
  echo "REFUSED: $e" ; }
printf '# name\tcall\tsetup (walk)\twalk base (bce66f1fa)\twalk edit\tcompiled (prelude)\n'
while IFS=$'\t' read -r N CALL SETUP C; do
  printf '%s\t%s\t%s\t%s\t%s\t%s\n' "$N" "$CALL" "$SETUP" "$(ans "$D/walk-base/$N.txt")" "$(ans "$D/walk-edit/$N.txt")" "$( [ "$C" = - ] && echo 'not run' || ans "$D/compiled-out/$C.txt")"
done < "$D/list.txt"
