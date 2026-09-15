# Source this in every shell that runs Fortress:  source experiment/env.sh
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
export FORTRESS_HOME="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=1
# bin/fortress defaults to -Xmx256m (gap ledger row 67); the checks at 4 threads override FORTRESS_THREADS on the command line
export JAVA_FLAGS="-Xmx4g -Xss64m"
# every grammar-importing run leaves a 5.8 MB Rats! temp directory behind (RatsUtil.getTempDir); 723 of them filled the disk allowance on 2026-09-15
rm -rf /tmp/fortress*rats 2>/dev/null
