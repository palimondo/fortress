#!/usr/bin/env bash
# Print a rung's briefing, or any slice of the record (FACTS.md, INDEX.md, POSITIONS.md, the ledger, the maps, a note by heading); --help for the usage.
exec python3 "$(dirname "$(readlink -f "$0")")/facts-extract.py" "$@"
