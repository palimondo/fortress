"""Run ../process-review-6b-7-7R/measure.py, unchanged, on batch N's agents (this directory's
agents.py), writing calls.csv and agents.csv here.  python3 measure.py"""
import importlib.util, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import agents as mine                               # noqa: E402
sys.modules['agents'] = mine                        # the earlier note's measure.py imports "agents"
PR = os.path.join(HERE, '..', 'process-review-6b-7-7R', 'measure.py')
spec = importlib.util.spec_from_file_location('pr_measure', PR)
PM = importlib.util.module_from_spec(spec); spec.loader.exec_module(PM)
PM.HERE = HERE                                      # its outputs go here, not into the earlier note's directory
if __name__ == '__main__':
    PM.main()
    import csv                                      # agents.csv without the tier column, which names a model version
    rows = list(csv.DictReader(open(os.path.join(HERE, 'agents.csv'))))
    keys = [k for k in rows[0] if k != 'tier']
    with open(os.path.join(HERE, 'agents.csv'), 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=keys, extrasaction='ignore'); w.writeheader(); w.writerows(rows)
