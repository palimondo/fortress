#!/usr/bin/env python3
"""shadow-walk407.py <shadow-src-root>: a copy of the tracked BuildEnvironments.java under
<shadow-src-root>/com/sun/fortress/interpreter/evaluator/, in which walk's finishTrait drops a type
variable (a SymbolicType, what a static parameter is inside the generic's own symbolic instance) from a
trait's comprises clause, and records no comprises clause when nothing else is listed. It is the smallest
edit that stops row 407's overflow: with `trait Integral[\\I\\] ... comprises I`, the symbolic instance
Integral[\\I\\] comprised its own parameter I, whose bound is Integral[\\I\\] again, and FType.excludesOtherInner
(:291) and SymbolicType.excludesOtherInner (:74) called each other without end. A concrete instance,
Integral[\\ZZ32\\], still records comprises { ZZ32 }, the self-type idiom's reading (Integral[\\ZZ32\\] is ZZ32).
Run from $FORTRESS_HOME; every edit must match exactly once; the tracked file is only read."""
import io
import os
import sys

SRC = 'ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java'
out = os.path.join(sys.argv[1], 'com/sun/fortress/interpreter/evaluator/BuildEnvironments.java')
s = io.open(SRC, encoding='utf-8').read()
a = """            List<FType> c = et.getFTypeListFromList(comprs.unwrap());
            ftt.setComprises(Useful.<FType>set(c));"""
b = """            List<FType> c = et.getFTypeListFromList(comprs.unwrap());
            // SHADOW (reviews/anyintegral-comprises-ways, row 407): a type variable in a comprises
            // clause says nothing in the generic's symbolic instance; leave it out.
            List<FType> c2 = new java.util.ArrayList<FType>();
            for (FType f : c)
                if (!(f instanceof com.sun.fortress.interpreter.evaluator.types.SymbolicType)) c2.add(f);
            if (!c2.isEmpty() || c.isEmpty())
                ftt.setComprises(Useful.<FType>set(c2));"""
if s.count(a) != 1:
    sys.exit('no single match')
s = s.replace(a, b)
os.makedirs(os.path.dirname(out), exist_ok=True)
io.open(out, 'w', encoding='utf-8').write(s)
print('wrote', out)
