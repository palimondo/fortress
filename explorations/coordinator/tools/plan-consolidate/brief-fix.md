<!-- The fix round of PLAN's consolidation of 2026-11-03: one task for each writer stream, resumed after the checker, on its own chunks' findings. The coordinator puts the stream's two chunk letters for X and Y (README.md, step 7). -->

# The fix round, chunks X and Y

The checker has read your two chunks. Its report is `/home/user/fortress-plan/tmp/plan-consolidate/check.md`. Read only its sections "Chunk X" and "Chunk Y".

For each finding under "must fix", correct the entry in your file, `/home/user/fortress-plan/tmp/plan-consolidate/chunk-X.lines` or `chunk-Y.lines`, with Edit. Check the finding's ground against the home first, as the common brief says. If the finding is wrong, keep your line and say why in your report. For each finding under "may fix", make the change if it makes the line plainer or shorter and keeps what its home says; otherwise leave it. Keep the file's form: `@N`, then the new line, or an empty line for a dropped line. Change no other file, and commit nothing.

End with a short report: for each finding, its line, and fixed or kept, with the reason for each one kept.
