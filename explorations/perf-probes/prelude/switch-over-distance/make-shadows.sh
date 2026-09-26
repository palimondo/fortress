#!/bin/bash
# Generate and compile the probe's shadow classes: desugar-codegen's five
# (../desugar-codegen/shadow-patch.py, unchanged: per-declaration checking under
# -Dprobe.tolerant, overload dispatch generation skipped under -Dprobe.skipOverloads,
# code generation caught per declaration), with this probe's edits to StaticChecker on top
# (add-patch.py: every stage run and every error printed under -Dprobe.all), and two
# shadows of its own (add-patch.py: DESUGAR per declaration when it fails on the whole
# component, under -Dprobe.tolerant; BottomType comparable, under -Dprobe.bottomCompare).
# usage: make-shadows.sh <shadow-src-dir> <shadow-classes-dir>
set -eu
HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE/../../../.."                     # $FORTRESS_HOME
SHADOW_SRC=$1
SHADOW_OUT=$2
rm -rf "$SHADOW_SRC" "$SHADOW_OUT"
mkdir -p "$SHADOW_SRC" "$SHADOW_OUT"
python3 "$HERE/../desugar-codegen/shadow-patch.py" ProjectFortress/src/com/sun/fortress "$SHADOW_SRC"
python3 "$HERE/add-patch.py" "$SHADOW_SRC"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
javac -nowarn -encoding UTF-8 -cp "$CP" -d "$SHADOW_OUT" \
      "$SHADOW_SRC/com/sun/fortress/compiler/StaticChecker.java" \
      "$SHADOW_SRC/com/sun/fortress/compiler/phases/TypeCheckPhase.java" \
      "$SHADOW_SRC/com/sun/fortress/compiler/phases/DesugarPhase.java" \
      "$SHADOW_SRC/com/sun/fortress/compiler/phases/CodeGenerationPhase.java" \
      "$SHADOW_SRC/com/sun/fortress/compiler/codegen/CodeGen.java" \
      "$SHADOW_SRC/com/sun/fortress/compiler/Desugarer.java" \
      "$SHADOW_SRC/com/sun/fortress/nodes_util/NodeComparator.java"
echo "shadow classes in $SHADOW_OUT"
