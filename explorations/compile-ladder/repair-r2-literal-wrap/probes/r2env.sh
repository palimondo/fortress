# Same as experiment/env.sh but without the shared `rm -rf /tmp/fortress*rats`,
# which would delete the parallel rung's Rats! temp directories mid-run.
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
export FORTRESS_HOME=/home/user/fortress-r2
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=1
export TMPDIR=/home/user/fortress-r2/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=/home/user/fortress-r2/tmp"
