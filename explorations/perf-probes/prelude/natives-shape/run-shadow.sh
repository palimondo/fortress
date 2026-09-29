#!/bin/bash
# run-shadow.sh SHADOWDIR CACHEDIR ARGS...  -- bin/fortress with SHADOWDIR first on the classpath.
set -u
cd "$(dirname "$0")/../../../.."
source explorations/experiment/env.sh
SH=$1; shift; export FORTRESS_CACHES=$1; shift
exec java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$SH:$(bin/fortress_classpath)" com.sun.fortress.Shell "$@"
