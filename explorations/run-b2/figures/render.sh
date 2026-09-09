#!/bin/bash
# Render NAME.tic (a LaTeX preview document with backtick-delimited Fortress) to NAME.svg and NAME.png.
set -e
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64; export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=/home/user/fortress; unset JAVA_TOOL_OPTIONS
cd "$(dirname "$1")"; n="$(basename "${1%.tic}")"
"$FORTRESS_HOME/bin/fortick" -q "$n.tic" >/dev/null 2>&1
TEXINPUTS=".:$FORTRESS_HOME/Fortify:" latex -interaction=nonstopmode "$n.tex" >/dev/null || { grep -n '^!' "$n.log" | head; exit 1; }
dvisvgm --no-fonts --exact-bbox -o "$n.svg" "$n.dvi" >/dev/null 2>&1
/opt/pw-browsers/chromium --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=1400,1400 --screenshot="$n.png" "$n.svg" >/dev/null 2>&1
echo "rendered $n"
