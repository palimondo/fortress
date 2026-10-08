# Source this in every shell that runs Fortress:  source explorations/experiment/env.sh
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
export FORTRESS_HOME="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=1
# bin/fortress defaults to -Xmx256m (gap ledger row 67); the checks at 4 threads override FORTRESS_THREADS on the command line
export JAVA_FLAGS="-Xmx4g -Xss64m"
# every grammar-importing run leaves a 5.8 MB Rats! temp directory behind (RatsUtil.getTempDir); 723 of them filled the disk allowance on 2026-09-15.
# Remove only those that no run can still be using: nothing in it written for an hour, and no java process now
# running started before its last write (a run makes its directory after it starts, and reads it until it ends).
(
  oldest=$(ps -C java -o etimes= 2>/dev/null | sort -n | tail -1 | tr -d ' ')
  now=$(date +%s)
  find /tmp -maxdepth 1 -type d -name 'fortress*rats' -mmin +60 -printf '%T@ %p\n' 2>/dev/null |
  while read -r t d ; do
    [ -n "$oldest" ] && [ "${t%.*}" -ge $(( now - oldest )) ] && continue
    [ -n "$(find "$d" -newermt '60 minutes ago' -print -quit 2>/dev/null)" ] && continue
    rm -rf "$d"
  done
)
