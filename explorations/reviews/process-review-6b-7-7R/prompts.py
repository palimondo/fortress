"""For each agent: the size of its prompt (first user message) and whether it carries
the markers of the process changes of 2026-09-27: the facts-extract.sh step, the
mission-briefing wording, the skeptic's checks 11 and 12, principle 5's wording."""
import json, re, sys
from agents import agents
MARK = {
  'facts-extract': r'facts-extract\.sh',
  'mission': r'mission briefing',
  'not trained': r'not trained on Fortress|were never trained|was not trained',
  'check11-ledger-siblings': r'sibling',
  'library-way': r"library's own way|the library's way",
  'decisions-on-record': r'decisions on record',
  'common': r'--common',
}
def first_prompt(path):
    """All user text before the first assistant turn (6b's harness sent the task as a second record)."""
    out = []
    for line in open(path):
        r = json.loads(line)
        if r.get('type') == 'assistant': break
        if r.get('type') == 'user':
            c = r['message']['content']
            out.append(c if isinstance(c, str) else '\n'.join(x.get('text', '') for x in c if isinstance(x, dict)))
    return '\n'.join(out)
if __name__ == "__main__":
    print('%-4s %-18s %8s  %s' % ('bat', 'label', 'prompt', ' '.join(MARK)))
    for a in agents():
        p = first_prompt(a['path'])
        marks = ' '.join('%d' % len(re.findall(v, p)) for v in MARK.values())
        print('%-4s %-18s %8d  %s' % (a['batch'], a['label'], len(p), marks))
