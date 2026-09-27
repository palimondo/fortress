#!/usr/bin/env bash
# Print the part of the record (FACTS.md, INDEX.md, the maps) a task needs; --help for the usage.
exec python3 "$(dirname "$(readlink -f "$0")")/facts-extract.py" "$@"
