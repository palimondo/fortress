# Source this in every shell that runs Fortress:  source experiment/env.sh
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
export FORTRESS_HOME="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=1
