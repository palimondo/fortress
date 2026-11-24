<!-- The script text (a Bash command) that filled the writers' template for the two pilot chunks, 18:01 UTC on 2026-10-13, copied from transcript line 3483 (script text saved; the briefs it produced are under writers-filled/). -->
D=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/record-store; cd $D; python3 - <<'EOF'
import os
t=open('brief-writer.md').read()
D=os.getcwd()
w={
 'F2b':("FACTS F-51 to F-72, in the section \"The checker and the one library\" of `explorations/coordinator/FACTS.md`. It holds F-53 (the distance to the switch-over, a count that changes at every landing), F-55 and F-58, which the record test's scenarios ask about.",
        "F-66 leaves in part at a later step: its clause on the review after a batch tying every new or risen row of the count to a named rung edit moves to the coordinator skill's batch part. Rewrite the rest of F-66, and keep that clause at the line's end, marked \"(moves to the coordinator skill)\"."),
 'P2':("POSITIONS P-37 to P-62, the section \"The one library and the compiled checker\" of `explorations/coordinator/POSITIONS.md`. It holds P-48 and P-60, which the record test's scenarios ask about, and their FACTS pairs (F-76, F-78, F-141, F-175), whose texts you do not change: point to them by number.",
        "P-61 (\"The separate analysis session's scope.\") leaves whole at a later step: leave its line exactly as it is. A POSITIONS entry states what he decided and why; his words are condensed into the position and kept verbatim only where the exact words are the decision."),
}
for k,(c,l) in w.items():
    b=t.replace('@CHUNK@',c).replace('@LEAVING@',l).replace('@SCOUT@',f'{D}/chunks/scout-{k}.md').replace('@KEY@',k).replace('@APPLY@',f'{D}/chunks/apply-{k}.txt')
    open(f'chunks/brief-writer-{k}.md','w').write(b)
print('ok')
EOF