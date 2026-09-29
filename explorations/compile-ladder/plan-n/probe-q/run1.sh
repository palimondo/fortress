#!/bin/bash
# run1.sh <variant> <path/to/Program.fss> [-Dprop=value ...] : one program under walk, in the private
# home $X/home-<variant>, from an empty private cache, from the program's own directory; the switch's
# Java shadow ahead of the build for every variant but stock.  Prints the machine line, the output
# and an rc= line.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
V=${1:?variant}; F=$(cd "$(dirname "${2:?program}")" && pwd)/$(basename "$2"); shift 2
H=$X/home-$V
RCP=$CP; [ "$V" = stock ] || RCP="$SHADOW:$CP"
C=$(mktemp -d "$X/c1.XXXXXX"); printf '\0\0\0\0' > "$C/global.map"; T=$C/tmp; mkdir -p "$T"
echo "# run1 $V $(basename "$F") $(date -u +%FT%TZ); $(machine_line)"
( cd "$(dirname "$F")" && FORTRESS_HOME=$H FORTRESS_CACHES="$C" timeout -k 10 ${TO:-600} \
    java -Xmx4g -Xss64m -Djava.io.tmpdir="$T" -XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1 \
         -Dfile.encoding=UTF-8 -Dfortress.autohome=$H "$@" -cp "$RCP" com.sun.fortress.Shell walk "$(basename "$F")" < /dev/null 2>&1 )
echo "rc=$?"
rm -rf "$C"
