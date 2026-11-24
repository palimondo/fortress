# gate-functions.sh: the shell functions of the gate's summary.
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
#
# The gate's step 7, the interpreter's suite on the compiled path, is suite-compiled/run.sh beside this file
# (P-103). Until 2026-11-24 this file also held the ladder regression's comparison with its baseline,
# ladder_filter, ladder_compare and mg_phases, which P-103 removed (git log -- this file).
#
# Source it from the tree's root, with FORTRESS_HOME set to that root, in the same Bash call that uses
# the functions, since each call starts a new shell:
#
#     source explorations/coordinator/tools/gate-functions.sh
#
# It defines the functions and runs nothing. The batch script's gate role
# (explorations/coordinator/climb-batch-workflow.js, step 5) sources it, and so can any gate run
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
