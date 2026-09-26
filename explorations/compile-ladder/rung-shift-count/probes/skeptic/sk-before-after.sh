#!/bin/bash
# sk-before-after.sh <Name>: runs <Name>.fss under walk twice, first against the base library
# (tmp/basehome, set as FORTRESS_HOME and FORTRESS_AUTOHOME: every file a symlink into this worktree except Library/FortressLibrary.fss and
# .fsi, which are git show 47437c65f copies, with its own empty default_repository), then against
# this branch; writes <Name>.walk-before.txt and <Name>.walk-after.txt.
WT=/home/user/fortress-shiftk
N=$1
B=$WT/tmp/basehome
if [ ! -d $B ] ; then
  mkdir -p $B/Library $B/default_repository/caches
  ln -s $WT/bin $B/bin ; ln -s $WT/ProjectFortress $B/ProjectFortress
  for f in $WT/Library/* ; do n=$(basename $f)
    case $n in FortressLibrary.fss|FortressLibrary.fsi) git -C $WT show 47437c65f:Library/$n > $B/Library/$n ;; *) ln -s $f $B/Library/$n ;; esac
  done
  cp $WT/default_repository/configuration $B/default_repository/ ; cp $WT/default_repository/caches/global.map $B/default_repository/caches/
fi
cd "$(dirname "$0")"
L="$(uptime)"
{ echo "### walk, before: FORTRESS_HOME=tmp/basehome (Library/FortressLibrary.fss/.fsi at 47437c65f), bin/fortress $N.fss; load at start:${L#*load average:}"
  FORTRESS_HOME=$WT/tmp/basehome FORTRESS_AUTOHOME=$WT/tmp/basehome $WT/tmp/basehome/bin/fortress $PWD/$N.fss 2>&1 | grep -v '^\s*at \|^java.lang.Throwable'
  echo "exit=${PIPESTATUS[0]}"; } > $N.walk-before.txt
L="$(uptime)"
{ echo "### walk, after: FORTRESS_HOME=$WT (branch wip/rung-shift-count), bin/fortress $N.fss; load at start:${L#*load average:}"
  FORTRESS_HOME=$WT FORTRESS_AUTOHOME=$WT $WT/bin/fortress $PWD/$N.fss 2>&1 | grep -v '^\s*at \|^java.lang.Throwable'
  echo "exit=${PIPESTATUS[0]}"; } > $N.walk-after.txt
