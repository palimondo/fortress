#!/bin/bash
# sk-base-checker.sh <out-dir>: the base commit's Functionals.scala (git show 26c5d3dd7), compiled alone (scalac
# 2.13.18) against ProjectFortress/build into <out-dir>/classes, so that sk-case-op.sh can run the base's case rule
# ahead of the tree's build. Nothing in the tree is touched.
set -eu
cd "$(dirname "$0")/../../../../.."
W=$1; rm -rf "$W"; mkdir -p "$W/src" "$W/classes"
git show 26c5d3dd7e436ff3b200d32346f92b8f1af1a33e:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala > "$W/src/Functionals.scala"
T=ProjectFortress/third_party/scala
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
java -Xmx2g -cp $T/scala-compiler-2.13.18.jar:$T/scala-library-2.13.18.jar:$T/scala-reflect-2.13.18.jar scala.tools.nsc.Main \
  -d "$W/classes" -classpath "ProjectFortress/build:$CP" -encoding UTF-8 "$W/src/Functionals.scala"
