<!-- The scout brief for chunk F1, the scouts' template with @CHUNK@ and @OUT@ filled by the script of that line, 18:00 UTC on 2026-10-13, copied from transcript line 3418. -->
You are a Sonnet scout in the Fortress revival repository (`/home/user/fortress`, branch `main`). This is retrieval only: you judge nothing, rewrite nothing, edit no tracked file, run no Fortress program and read no session transcripts. Load the `fortress-repo` skill and read its part `references/records.md`.

## Your chunk

FACTS, the entries on lines 6 to 29 (section "Execution model"), 96 to 114 ("The harness and the gate") and 203 (the `env.sh` entry in "The container") of `explorations/coordinator/FACTS.md`. FILE is FACTS; the history file is `FACTS-history.md`.

An entry is one line starting with `- `. Its number is its line number in the file at commit `715641924` (`git show 715641924:explorations/coordinator/FILE.md`), whether or not the line already carries `F-n` or `P-n` in the working tree. Read the entries from that commit, so that a commit landing while you work does not move them.

## What you gather

An Opus writer will rewrite each entry of your chunk short, in plain words, and needs to know what each entry rests on and where its detail lives, without reading every report itself. For each entry of the chunk, write at most 1,500 characters:

1. Its number and the opening words of its bold title (or of its text, if it has no title).
2. For each report, note, test or ledger row the entry cites: whether it exists (a path with `test -f`, a report section with `explorations/coordinator/tools/facts-extract.sh --check 'doc:PATH#HEADING'` where the entry names a heading, a ledger row with `python3 explorations/coordinator/tools/ledger.py show N` and its status word), and the heading of the section that holds the entry's detail, in quotes, as it stands in the file.
3. The commit that first wrote the entry's title and the last commit that changed its line: `git log --format='%h %ad %s' --date=short -S'<a distinctive phrase of the title>' -- explorations/coordinator/FILE.md`, first and last lines.
4. The earlier texts under the same title in the history file at `715641924` (`grep -n` for the title's opening words), with their dated headings and sizes; only the line numbers and sizes, not the texts.
5. The other entries of FACTS and POSITIONS that cite this one by its title (`grep -n` for the title's opening words in both files at `715641924`), by line number.
6. For a POSITIONS entry only: the curator's own dated words on it, from the history file's dated sections at `715641924`, each at most 300 characters, with its date and time.

Bound every read: `sed -n`, `grep -n` with a pattern, `git show` piped to `grep` or `sed -n`. Do not print whole reports.

Write the file `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/record-store/chunks/scout-F1.md`, one section per entry in the chunk's order, headed by its number. Your final message is one line: the path and the number of entries.
