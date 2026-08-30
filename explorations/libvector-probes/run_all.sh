#!/bin/bash
# Re-run every probe and capture the full transcript.
D=/tmp/claude-0/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6/scratchpad/libvector-experiment
cd "$D" || exit 1
{
  echo "Fortress library Vector/Matrix over a user element type -- full probe transcript"
  echo "generated: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "FORTRESS_HOME=/home/user/fortress/.claude/worktrees/agent-a03b77f222b9f971f"
  echo "JDK: $(/usr/lib/jvm/java-25-openjdk-amd64/bin/java -version 2>&1 | head -1)"
  echo "FORTRESS_THREADS=1"
  echo
  for f in p0*.fss p1*.fss p2*.fss p3*.fss; do
    bash "$D/run.sh" "$f"
    echo
  done
  echo "===== fortress typecheck (uses CompilerLibrary -- Shell.java:453-457) ====="
  bash "$D/typecheck.sh" p10_value_extends_number.fss p17_seal_typecheck.fss p04_rr64_vec_ops.fss
  echo
  echo "===== fortress typecheck-old (uses the interpreter library -- Shell.java:465-471) ====="
  bash "$D/typecheck_old.sh" p17_seal_typecheck.fss
} > "$D/transcript.txt" 2>&1
echo "wrote $D/transcript.txt ($(wc -l < "$D/transcript.txt") lines)"
