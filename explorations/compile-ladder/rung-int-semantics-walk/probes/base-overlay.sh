#!/bin/bash
# Runs a program under walk with the base tree's (abdfbb2db) five glue/prim natives files
# compiled into a scratch directory and put ahead of ProjectFortress/build on the class
# path, so that a test written after the edit can be shown red against the unedited
# natives without rebuilding the tree. The library sources are the tree's own, which
# this rung leaves unchanged. Usage, from FORTRESS_HOME with the environment of
# experiment/env.sh: base-overlay.sh <scratch-dir> <dir-of-program> <Program.fss>
set -u
S=${1:?scratch dir} ; D=${2:?program dir} ; P=${3:?program}
FH=${FORTRESS_HOME:?}
rm -rf "$S" ; mkdir -p "$S/src" "$S/classes"
for f in Int Long NN32 UnsignedLong BigNum ; do
    git -C "$FH" show abdfbb2db:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/$f.java > "$S/src/$f.java"
done
CP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1)
javac -nowarn -encoding UTF-8 -source 1.8 -target 1.8 -cp "$CP" -d "$S/classes" "$S"/src/*.java > "$S/javac.txt" 2>&1 || { cat "$S/javac.txt" ; exit 1 ; }
cd "$D" && exec java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$S/classes:$CP" com.sun.fortress.Shell "$P"
