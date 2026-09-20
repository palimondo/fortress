#!/bin/bash
# Generate and compile the probe's shadow classes.  See shadow-patch.py.
# usage: make-shadows.sh <shadow-src-dir> <shadow-classes-dir>
set -eu
HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE/../../../.."                     # $FORTRESS_HOME
SHADOW_SRC=$1
SHADOW_OUT=$2
mkdir -p "$SHADOW_SRC" "$SHADOW_OUT"
python3 "$HERE/shadow-patch.py" ProjectFortress/src/com/sun/fortress "$SHADOW_SRC"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
javac -nowarn -encoding UTF-8 -cp "$CP" -d "$SHADOW_OUT" \
      "$SHADOW_SRC/com/sun/fortress/compiler/StaticChecker.java" \
      "$SHADOW_SRC/com/sun/fortress/compiler/phases/TypeCheckPhase.java" \
      "$SHADOW_SRC/com/sun/fortress/compiler/phases/DesugarPhase.java" \
      "$SHADOW_SRC/com/sun/fortress/compiler/phases/CodeGenerationPhase.java" \
      "$SHADOW_SRC/com/sun/fortress/compiler/codegen/CodeGen.java"
echo "shadow classes in $SHADOW_OUT"
