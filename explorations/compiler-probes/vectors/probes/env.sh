# Sourced by probe.sh and world.sh. Probe sources and captures live beside this file;
# every cache is written under $VECPROBE_WORK (default /tmp/vecprobe), outside the repository.
D=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$(git -C "$D" rev-parse --show-toplevel)"
source explorations/experiment/env.sh
P=${VECPROBE_WORK:-/tmp/vecprobe}
C=$P/cache
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
fsh () { java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Dfortress.caches=$C -cp "$CP" com.sun.fortress.Shell "$@"; }
frun () { java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 -cp "$C/bytecode_cache:$C/bytecode_cache/*:$C/nativewrapper_cache:$CP" com.sun.fortress.runtimeSystem.MainWrapper "$@"; }
