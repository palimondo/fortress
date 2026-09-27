#!/usr/bin/env python3
"""compare-small.py : for every small program, setting and library, the program's own error sites
under the stock checker (instr) and under the rule (rule-instr): how many each reports, which sites
the rule clears, and which it reports that the stock checker does not (a new refusal) or reports
with another message. Reads small/<Name>.<variant>.<setting>.<lib>.txt; prints to stdout."""
import glob, os, re, collections
here = os.path.join(os.path.dirname(os.path.abspath(__file__)), "small")
def errs(p):
    out = collections.OrderedDict()
    lines = open(p, encoding="utf-8", errors="replace").read().split("\n")
    for i, l in enumerate(lines):
        m = re.match(r"^\d+:(\S+?\.fss):(\d+):(\S+?):?$", l)
        if m:
            msg = []
            for x in lines[i + 1:i + 4]:
                if re.match(r"^\d+:", x) or x.startswith("--") or x.startswith("#"): break
                x = re.sub(r"^\d+-", "", x).strip()
                if x.startswith("File ") or x.startswith("###"): break
                msg.append(x)
            out[(int(m.group(2)), m.group(3))] = " ".join(msg)[:200]
    return out
tot = collections.Counter()
for p in sorted(glob.glob(os.path.join(here, "*.instr.*.*.txt"))):
    b = os.path.basename(p); name, _, setting, lib, _ = b.split(".")
    q = os.path.join(here, "%s.rule-instr.%s.%s.txt" % (name, setting, lib))
    if not os.path.exists(q): continue
    a, r = errs(p), errs(q)
    gone = [k for k in a if k not in r]
    new = [k for k in r if k not in a]
    changed = [k for k in a if k in r and a[k] != r[k]]
    tot["stock"] += len(a); tot["rule"] += len(r); tot["gone"] += len(gone); tot["new"] += len(new); tot["changed"] += len(changed)
    print("%s %s %s: stock %d errors, rule %d; cleared %d, new %d, message changed %d" % (name, setting, lib, len(a), len(r), len(gone), len(new), len(changed)))
    for k in gone: print("    cleared  %d:%s  %s" % (k[0], k[1], a[k][:150]))
    for k in new: print("    NEW      %d:%s  %s" % (k[0], k[1], r[k][:150]))
    for k in changed: print("    changed  %d:%s  stock: %s\n                        rule:  %s" % (k[0], k[1], a[k][:120], r[k][:120]))
print("\n# all: stock %(stock)d error sites, rule %(rule)d; cleared %(gone)d, new %(new)d, message changed %(changed)d" % tot)
