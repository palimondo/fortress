# env-noclean.sh: explorations/experiment/env.sh without its rm of /tmp/fortress*rats, which the
# parallel runs of batch 6b and the distance measurement may be using. Source it from $FORTRESS_HOME.
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
export FORTRESS_HOME="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=${FORTRESS_THREADS:-1}
export JAVA_FLAGS="-Xmx4g -Xss64m -Dfile.encoding=UTF-8"
