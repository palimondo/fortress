#!/usr/bin/env python3
"""Reading only. For the one library's api files, list every functional name that has
both (a) an arm with a parameter (self counted as its trait) of an abstract number type or
Any (Number, AnyIntegral, Any, Object) and (b) an arm whose parameters are all leaf number
types (ZZ32, ZZ64, NN32, NN64, ZZ, QQ, RR64, IntLiteral). These are the names where a rule
that ranks a converted, more specific arm above an arm applicable as written would move a
mixed-type or numeral call. Crude: one declaration per line, traits tracked by indentation.
Run from the repository root; Library/*.fsi includes the compiler library's api, so its arms appear too."""
import re, sys, glob, collections
LEAF = {"ZZ32","ZZ64","NN32","NN64","ZZ","QQ","RR64","IntLiteral"}
ABSTRACT = {"Number","AnyIntegral","Any","Object"}
files = sorted(glob.glob("Library/*.fsi")) + ["ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi"]
decl = re.compile(r'^(\s*)(?:abstract\s+|getter\s+)?(?:opr\s+)?([^\s(\[]+?)\s*(?:\[\\.*?\\\])?\s*\((.*?)\)\s*:')
trait = re.compile(r'^(trait|object)\s+([A-Za-z0-9_]+)')
arms = collections.defaultdict(list)
for f in files:
    cur = None
    for n, line in enumerate(open(f, encoding="utf-8"), 1):
        t = trait.match(line)
        if t: cur = t.group(2); continue
        if line.startswith("end"): cur = None; continue
        m = decl.match(line)
        if not m: continue
        indent, name, params = m.groups()
        if name in ("coerce",) or name.startswith("(*"): continue
        types = []
        for p in [p.strip() for p in params.split(",") if p.strip()]:
            if p == "self": types.append(cur if indent and cur else "?")
            elif ":" in p: types.append(p.split(":",1)[1].strip())
            else: types.append("?")
        # Only top-level functions and functional methods (a self parameter) overload with
        # each other across traits; dotted methods are left out.
        if indent and "self" not in [p.strip() for p in params.split(",")]: continue
        owner = "top" if not indent else cur
        arms[name].append((f"{f}:{n}", owner, tuple(types)))
for name in sorted(arms):
    a = arms[name]
    abstract = [x for x in a if any(t in ABSTRACT for t in x[2])]
    leaf = [x for x in a if x[2] and all(t in LEAF for t in x[2])]
    if abstract and leaf:
        print(f"== {name}: {len(abstract)} catch-all arm(s), {len(leaf)} per-type arm(s)")
        for x in abstract: print(f"   catch-all {x[0]} ({', '.join(x[2])})")
        print(f"   per-type: " + "; ".join(f"({', '.join(x[2])})" for x in leaf))
