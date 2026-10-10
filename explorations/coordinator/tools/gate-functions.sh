# gate-functions.sh: the shell functions of the gate's summary and of its ladder comparison.
#
#   gate_summary <log-dir> <out-file> [machine-label]
#                         writes summary.txt: one row per suite from the plain-formatter files under
#                         $FORTRESS_HOME/ProjectFortress/TEST-RESULTS/, then the BUILD and Total time
#                         lines of <log-dir>/{compileAll,testFast,testSystem,testSpecData}.txt, then
#                         "# machine " lines from machine.sh with the label (default "gate")
#   gate_compare <last-landed-summary> <this-summary>
#                         prints the red lines (RED, EMPTY, COUNT DOWN, SUITE GONE), exit 1 if any;
#                         the system-<i> rows are one suite split by sorted index, compared by their sum
#   last_landed_summary   prints the path of the newest landed summary.txt
#   ladder_filter <file>  masks the "Operation took" time of a ladder run's output
#   ladder_compare <baseline-dir> <now-dir>
#                         one DOWN, UP, NEW, MISSING or STDOUT line per ladder file that moved
#   mg_phases <microgpt-phase.md>
#                         one "component<TAB>phase" line per row of the microGPT phase table
#
# Source it from the tree's root, with FORTRESS_HOME set to that root, in the same Bash call that uses
# the functions, since each call starts a new shell:
#
#     source explorations/coordinator/tools/gate-functions.sh
#
# It defines the functions and runs nothing. The batch script's gate role
# (explorations/coordinator/climb-batch-workflow.js, steps 5 and 7) sources it, and so can any gate run
# by hand (the fortress-repo skill's gate.md). Until 2026-10-10 the functions were strings of the batch
# script, and the skill extracted them with node and awk (explorations/reviews/skills-agenda-audit.md,
# finding GA2).

gate_summary () {
    local L="$1" O="$2" R="$FORTRESS_HOME/ProjectFortress/TEST-RESULTS" f
    {
      printf '#suite\ttests\tfailures\terrors\tskipped\n'
      for f in "$R"/fast-*/TEST-*.txt "$R"/system-*/TEST-*.txt "$R"/TEST-*SpecDataJUTest.txt ; do
        [ -f "$f" ] || continue
        awk -v track="$(case "$(basename "$(dirname "$f")")" in TEST-RESULTS) echo specdata ;; *) basename "$(dirname "$f")" ;; esac)" -F'[ ,:]+' '
          /^Testsuite:/ { n = split($2, p, "."); s = p[n] }
          /^Tests run:/ { print track "/" s "\t" $3 "\t" $5 "\t" $7 "\t" $9 ; exit }' "$f"
      done | sort
      for f in compileAll testFast testSystem testSpecData ; do
        [ -f "$L/$f.txt" ] && grep -h '^BUILD \|^Total time:' "$L/$f.txt" | sed "s|^|# $f: |"
      done
      bash explorations/compile-ladder/rung-flat-tower/machine.sh "${3:-gate}" | sed 's|^|# machine |'
    } > "$O"
}

gate_compare () {
    awk -F'\t' '
      function key(s) { sub("^system-[0-9]+/", "system/", s) ; return s }
      FNR == NR { if ($0 !~ /^#/ && NF == 5) base[key($1)] += $2 ; next }
      $0 !~ /^#/ && NF == 5 {
          k = key($1) ; seen[k] = 1 ; cur[k] += $2
          if ($3 + 0 > 0 || $4 + 0 > 0)              { print "RED\t" $1 "\t" $3 " failures, " $4 " errors" ; bad++ }
          if ($2 + 0 == 0)                           { print "EMPTY\t" $1 ; bad++ }
      }
      END { for (k in cur) if ((k in base) && cur[k] < base[k]) { print "COUNT DOWN\t" k "\t" base[k] " -> " cur[k] ; bad++ }
            for (s in base) if (!(s in seen)) { print "SUITE GONE\t" s "\t" base[s] " -> absent" ; bad++ }
            if (bad) exit 1 }' "$1" "$2"
}

last_landed_summary () {
    git -C "$FORTRESS_HOME" log --name-only --pretty=format: -- \
        'explorations/compile-ladder/gate-baseline/summary.txt' \
        'explorations/compile-ladder/climb-batch-*/gate/summary.txt' | grep -m1 'summary.txt$'
}

ladder_filter () { sed -E 's/Operation took [0-9.]+ms/Operation took <time>ms/' "$1" ; }

ladder_compare () {
    local B="$1" N="$2" key
    awk -F'\t' '
      function rank(p,   r) { r["parse"]=1; r["disambiguate"]=2; r["typecheck"]=3; r["codegen"]=4;
                              r["link"]=5; r["run"]=6; r["pass"]=7; return r[p] + 0 }
      FNR == NR { if (FNR > 1) b[$1 "/" $2] = $4 ; next }
      FNR > 1 {
          k = $1 "/" $2
          if (!(k in b))                  { print "NEW\t" k "\t" $4 ; next }
          if (rank($4) < rank(b[k]))      { print "DOWN\t" k "\t" b[k] " -> " $4 }
          else if (rank($4) > rank(b[k])) { print "UP\t" k "\t" b[k] " -> " $4 }
      }' "$B/ladder.tsv" "$N/ladder.tsv"
    tail -n +2 "$B/pass-list.txt" | cut -f1 | while IFS= read -r key ; do
        [ -n "$key" ] || continue
        if [ ! -f "$N/raw/$key.run" ] ; then printf 'MISSING\t%s\n' "$key" ; continue ; fi
        if ! diff -q <(ladder_filter "$B/raw/$key.run") <(ladder_filter "$N/raw/$key.run") >/dev/null ; then
            printf 'STDOUT\t%s\n' "$key"
            diff <(ladder_filter "$B/raw/$key.run") <(ladder_filter "$N/raw/$key.run") | sed 's/^/    /' | head -8
        fi
    done
}

mg_phases () { awk -F'|' '/^\| *[0-9]+ *\| *`/ { gsub(/[` ]/, "", $3); gsub(/ /, "", $4); print $3 "\t" $4 }' "$1" ; }
