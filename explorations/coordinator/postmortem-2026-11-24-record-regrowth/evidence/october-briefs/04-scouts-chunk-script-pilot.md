<!-- The script text (a Bash command) that filled the scouts' template for the two pilot chunks F2b and P2, 17:45 UTC on 2026-10-13, copied from transcript line 3314 (script text saved; the briefs it produced are under scouts-filled/). -->
D=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/record-store; mkdir -p $D/chunks; cd $D; python3 - <<'EOF'
import os
t=open('brief-scout.md').read()
chunks={
 'F2b':("FACTS, the entries on lines 51 to 72 of `explorations/coordinator/FACTS.md` (section \"The checker and the one library\"). FILE is FACTS; the history file is `FACTS-history.md`.", 'chunks/scout-F2b.md'),
 'P2':("POSITIONS, the entries on lines 36 to 63 of `explorations/coordinator/POSITIONS.md` (section \"The one library and the compiled checker\"). FILE is POSITIONS; the history file is `POSITIONS-history.md`.", 'chunks/scout-P2.md'),
}
for k,(c,o) in chunks.items():
    open(f'chunks/brief-scout-{k}.md','w').write(t.replace('@CHUNK@',c).replace('@OUT@',os.path.abspath(o)))
EOF
ls chunks