#!/bin/bash
# build-stock.sh: compiles the four glue classes as they are at the base 5c368175f (Int, Long, NN32, UnsignedLong)
# into tmp/sk/stock-classes, which run-sk.sh walk-stock, run-tests-stock.sh and run-nc.sh stock put ahead of
# ProjectFortress/build.
set -u
cd "$(dirname "$0")/../../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)"
unset JAVA_TOOL_OPTIONS
S=tmp/sk/stocksrc/com/sun/fortress/interpreter/glue/prim
mkdir -p "$S" tmp/sk/stock-classes
for f in Int Long NN32 UnsignedLong; do git show 5c368175f:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/$f.java > "$S/$f.java"; done
javac -nowarn -encoding UTF-8 -d tmp/sk/stock-classes -cp "$(./bin/fortress_classpath | tail -1)" "$S"/*.java
