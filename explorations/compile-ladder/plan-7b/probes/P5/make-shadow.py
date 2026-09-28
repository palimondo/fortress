#!/usr/bin/env python3
"""make-shadow.py <src-root> <out-root>: probe P5's shadow (climb batch 7's record, section 6, P5).
A copy of compiler/desugarer/PreDisambiguationDesugaringVisitor.java whose forStaticParam
(:134-148) leaves a static parameter's extends clause as written when -Dprobe.p5=true: the compile
path's `extends Object` pre-desugaring switched off for static parameters, the reading of batch 7's
question 1 at (a), an unbounded type parameter bounded by Any (POSITIONS 2026-09-27, the numerics
plans).  The pre-desugaring's other rewrite, `extends Object` on a trait or object with no extends
clause, is left on.  Without the switch the copy behaves as the tracked file."""
import os
import sys

SRC, OUT = sys.argv[1], sys.argv[2]
REL = "com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java"
s = open(os.path.join(SRC, REL), encoding="utf-8").read()
old = """    public Node forStaticParam(StaticParam that) {
	if (!Shell.getExtendsObjectPreDesugaring()) {"""
new = """    public Node forStaticParam(StaticParam that) {
	if (!Shell.getExtendsObjectPreDesugaring() || Boolean.getBoolean("probe.p5")) {   // probe P5"""
assert s.count(old) == 1, s.count(old)
s = s.replace(old, new)
d = os.path.join(OUT, REL)
os.makedirs(os.path.dirname(d), exist_ok=True)
open(d, "w", encoding="utf-8").write(s)
print("shadowed", REL)
