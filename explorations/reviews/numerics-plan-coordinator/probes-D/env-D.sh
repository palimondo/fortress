# explorations/experiment/env.sh's settings, without its `rm -rf /tmp/fortress*rats`:
# other workers' runs on this machine use those directories (distance-triage/run.sh says the same).
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
export FORTRESS_HOME=/home/user/fortress
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=1
export JAVA_FLAGS="-Xmx4g -Xss64m"
