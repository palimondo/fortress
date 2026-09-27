#!/usr/bin/env python3
"""typecheck-groups.py <errors.tsv>... : the components' own type errors (errors.py's kind
`typecheck`) in the coarse groups of switch-over-distance.md section 2.5, by the first
matching rule below, one column per table.  Written for the flat re-measure; on the
2026-09-26 tables it gives that note's section 2.5 numbers (the check is in this probe's
note, section 1)."""
import collections, sys

GROUPS = [
    ("builtinPrimitive: static argument T not inferred",
     lambda m: "builtinPrimitive" in m and "Could not infer static argument" in m),
    ("another static argument not inferred", lambda m: "Could not infer static argument" in m),
    ("a call whose arguments fit no declaration", lambda m: m.startswith("Could not check call to")),
    ("a body whose type is not the declared return type", lambda m: "body has type" in m),
    ("no such method or getter", lambda m: m.startswith("No such method") or " has no getter called" in m
                                           or " has no method called" in m or " has no setter called" in m),
    ("a method invocation or application that fits no declaration",
     lambda m: m.startswith("Could not check method invocation") or m.startswith("Could not check function application")
               or m.startswith("Could not check application")),
    ("a generator's filter not typed Boolean", lambda m: m.startswith("Filter expressions in generator clauses")),
    ("a binding or an assignment", lambda m: m.startswith("Could not assign") or m.startswith("Right-hand side has type")
                                           or "bind" in m.split(" - ")[0]),
    ("other", lambda m: True),
]

def groups(path):
    c = collections.Counter()
    for l in open(path, encoding="utf-8"):
        if l.startswith("#"): continue
        f = l.rstrip("\n").split("\t")
        if f[0] != "typecheck": continue
        msg = f[6]
        for name, test in GROUPS:
            if test(msg): c[name] += 1; break
    return c

tabs = [(p, groups(p)) for p in sys.argv[1:]]
print("%-62s %s" % ("group", " ".join("%10s" % p.split("/")[-1].replace("errors-", "").replace(".tsv", "")[:10] for p, _ in tabs)))
for name, _ in GROUPS:
    print("%-62s %s" % (name, " ".join("%10d" % c[name] for _, c in tabs)))
print("%-62s %s" % ("total", " ".join("%10d" % sum(c.values()) for _, c in tabs)))
