#!/usr/bin/env python3
"""Write the parts of explorations/experiment/run-c-goldens/goldens.json that the Fortress
check component reads as plain text, one value per line, Python repr (shortest
round-trip) so every double reloads exactly.

Usage: python3 extract_goldens.py <repo root>   (writes into this directory)
"""
import json, os, sys
root = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', '..', '..')
g = json.load(open(os.path.join(root, 'explorations', 'experiment', 'run-c-goldens', 'goldens.json')))
here = os.path.dirname(os.path.abspath(__file__))

def lines(name, vals):
    with open(os.path.join(here, name), 'w') as f:
        for v in vals: f.write(repr(v) + '\n')

lines('P0.txt', g['initial_parameters']['P0'])
lines('grad_step0.txt', g['batch1_step0']['gradient'])
lines('P_after_adam.txt', g['batch1_step0']['parameters_after_adam'])
lines('losses_batch1_5steps.txt', g['batch1_five_steps']['losses'])
b4 = g['batch4_first_batch']
lines('batch4.txt', [b4['loss']] + b4['single_document_losses'] + b4['document_lengths'])
for key, name in (('batch1_doc0', 'fd_doc0.txt'), ('batch4_first_batch', 'fd_batch4.txt')):
    with open(os.path.join(here, name), 'w') as f:
        for row in g['finite_differences'][key]:
            f.write(f"{row['index']} {row['backprop']!r} {row['finite_difference']!r}\n")
with open(os.path.join(here, 'corpus_first16.txt'), 'w') as f:
    for doc, n, row in zip(g['corpus']['first_16_documents'], g['corpus']['first_16_lengths'], g['corpus']['first_16_token_rows']):
        f.write(doc + ' ' + str(n) + ' ' + ' '.join(map(str, row)) + '\n')
print('wrote', here)
