#!/usr/bin/env python3
"""numeral-shadow.py <src-root> <out-dir> : one checker shadow for distance-triage.md.

Copies ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala into <out-dir>
(same package path) with one probe switch.  Under -Dprobe.numeralTyvar=true the subtype
question "is the numeral's type IntLiteral below the type variable X?" answers yes when X's
declared bound names Integral or AnyIntegral; everything else is the tracked file.

It is an instrument, not a proposed rule: it asks how many of the library's errors go when
a numeral is accepted wherever generic integer code expects a value of its own type
parameter (`ex > 0`, `lo + 1`, `n : I := 1` with `I extends Integral[\\I\\]`), which is what the
library's own device (`self.zero`, `FortressLibrary.fss:674`) or a rule of the checker's would
give.  It says yes by subtyping, where a real rule would convert, so the count it gives is
the class's reach and not the cost of a rule.  The edit asserts its match count."""
import io, os, sys
src_root, out = sys.argv[1], sys.argv[2]
rel = "com/sun/fortress/scala_src/types/TypeAnalyzer.scala"
s = io.open(os.path.join(src_root, rel), encoding="utf-8").read()
anchor = "    case (s, t@SVarType(_, id, _)) =>\n      val hEntry = (negate, true, s, t)\n"
assert s.count(anchor) == 1, s.count(anchor)
probe = '''    case (STraitType(_, sn, _, _), SVarType(_, id, _))            // PROBE distance-triage
        if !negate && java.lang.Boolean.getBoolean("probe.numeralTyvar")
           && sn.getText == "IntLiteral"
           && toListFromImmutable(staticParam(id).getExtendsClause).exists {
                case STraitType(_, bn, _, _) => bn.getText == "Integral" || bn.getText == "AnyIntegral"
                case _ => false } =>
      pTrue()
'''
s = s.replace(anchor, probe + anchor)
p = os.path.join(out, rel)
os.makedirs(os.path.dirname(p), exist_ok=True)
io.open(p, "w", encoding="utf-8").write(s)
print("wrote", p)
