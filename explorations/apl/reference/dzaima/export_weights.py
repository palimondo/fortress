"""Export microgpt's seed-42 initial weights and shuffled document order as APL-readable text.
High minus (¯) for negatives, E for exponents, one matrix per file. Run once; microgpt.apl loads w/*.txt and docs.txt."""
import os, random, urllib.request
if not os.path.exists('input.txt'):
    urllib.request.urlretrieve('https://raw.githubusercontent.com/karpathy/makemore/988aa59/names.txt', 'input.txt')
random.seed(42)
docs = [l.strip() for l in open('input.txt') if l.strip()]
random.shuffle(docs)
vocab_size = len(sorted(set(''.join(docs)))) + 1
n_embd, block_size = 16, 16
matrix = lambda nout, nin, std=0.08: [[random.gauss(0, std) for _ in range(nin)] for _ in range(nout)]
sd = {'wte': matrix(vocab_size, n_embd), 'wpe': matrix(block_size, n_embd), 'lm_head': matrix(vocab_size, n_embd)}
for name in ('attn_wq', 'attn_wk', 'attn_wv', 'attn_wo'): sd[name] = matrix(n_embd, n_embd)
sd['mlp_fc1'] = matrix(4 * n_embd, n_embd); sd['mlp_fc2'] = matrix(n_embd, 4 * n_embd)
os.makedirs('w', exist_ok=True)
apl = lambda x: repr(x).replace('-', '¯').replace('e', 'E')
for name, m in sd.items():
    open(f'w/{name}.txt', 'w').write('\n'.join(' '.join(apl(v) for v in row) for row in m) + '\n')
open('docs.txt', 'w').write('\n'.join(docs[:2000]) + '\n')
print('exported', list(sd))
