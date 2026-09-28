#!/bin/bash
# The gather of climb batch 6.5: the home-2 pair it wrote for row 497 (a local in a do ... also arm takes the task's
# slot 0), ProjectFortress/compiler_tests/TaskArmLocalSlotLink.test and XXXTaskArmLocalSlot.test, through the harness
# in the main tree. [G] puts rung G's three edited Java files, compiled by javac into $GCLS, ahead of the main tree's
# build (the base's classes); [fix] puts the same three with mv.reserveSlot0() added after visitCode in
# generateTaskCompute, compiled into $FCLS, the deliberate local fix that must turn the XXX test red. The test's own
# cache entries are removed before each pair; the library cache is the main tree's.
# usage: GCLS=<class dir> FCLS=<class dir> bash explorations/compile-ladder/climb-batch-6.5/merged-tests/junit-g.sh
source "$(dirname "$0")/../../../experiment/env.sh"
cd "$FORTRESS_HOME/ProjectFortress"
CP=$(../bin/fortress_classpath | tail -1)
echo "# nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(date -u +%FT%TZ)"
one () { # one <label> <prefix> <test>
  echo "########## [$1] fortress junit $3"
  java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$2$CP" com.sun.fortress.Shell junit "$3" 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | cut -c1-240
  echo "exit=${PIPESTATUS[0]}"
}
pair () { # pair <label> <prefix>
  find ../default_repository/caches -name "*TaskArmLocalSlot*" -exec rm -rf {} + 2>/dev/null
  one "$1" "$2" compiler_tests/TaskArmLocalSlotLink.test
  one "$1" "$2" compiler_tests/XXXTaskArmLocalSlot.test
}
pair G "$GCLS:"
pair base ""
pair fix "$FCLS:"
find ../default_repository/caches -name "*TaskArmLocalSlot*" -exec rm -rf {} + 2>/dev/null
