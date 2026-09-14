# Provenance

Dropped in by Pavol on 2026-09-14 as `apl-hsu-handover.zip`, from a separate Claude session that redesigned the microGPT data layout after Aaron Hsu's "Designing Your Data" (Functional Conf 2025). Everything here is that session's own work except the weights, document list and export script, which are byte-identical to `../dzaima/w/`, `../dzaima/docs.txt` and `../dzaima/export_weights.py` and are not duplicated.

Not committed: the two slide transcriptions of Hsu's talk (`slides/*.md`, `*.yaml`), which are a transcription of copyrighted material. They sit in the gitignored `research/decks/` for this session, like the Oracle decks; the talk is at https://youtu.be/ozlxUmdYsHA.

`microgpt_flat.py` downloads Karpathy's `names.txt` at run time and contains no code of his.

Status per the handover: `microgpt_flat.apl` (dzaima) is verified against the Python oracle to 15 digits over 5 steps; `microgpt_concise.dyalog` is unverified, derived line by line from it.
