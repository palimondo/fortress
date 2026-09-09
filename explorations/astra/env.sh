# Source this file from the repository root. Toolchains live outside the repo.
export JAVA_HOME="${FORTRESS_EXPERIMENT_JDK:-/tmp/fortress-toolchains/jdk-25.0.4.1+1}"
export ANT_HOME="$(cd .. && pwd)/toolchains/apache-ant-1.10.18"
export PATH="$JAVA_HOME/bin:$ANT_HOME/bin:$PATH"
export FORTRESS_HOME="$PWD"
export ANT_OPTS='-Xmx512m -Xss32m'
unset JAVA_TOOL_OPTIONS
