# transcripts-blinded

Automated JSONL transcript snapshots of the blinded Fortress microGPT run
(branch `blinded-fable`), captured by a Stop hook calling
`scripts/backup.sh` from a worktree of this branch — the same arrangement
as the `transcripts` branch for the coordinating session, kept separate so
neither run's container ever holds the other's transcripts.
