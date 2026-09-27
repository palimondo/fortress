#!/usr/bin/env python3
"""bound-any-shadow.py <src-root> <out-dir> : one shadow source for distance-triage.md.

Copies ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java
into <out-dir> (same package path) with one probe switch: under -Dprobe.boundAny=true, the
compile path's pre-desugaring of a static parameter with an empty extends clause writes the
bound Any instead of Object, and only for a type parameter (a size keeps its empty clause).
Everything else is the tracked file.  Each edit asserts its match count."""
import io, os, sys
src_root, out = sys.argv[1], sys.argv[2]
rel = "com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java"
s = io.open(os.path.join(src_root, rel), encoding="utf-8").read()
def sub(s, a, b):
    assert s.count(a) == 1, (a[:70], s.count(a))
    return s.replace(a, b)
# the static-parameter rewrite names Object in its own body only
body_start = s.index("private List<BaseType> rewriteStaticParamExtendsClause")
body_end = s.index("@Override", body_start)
body = s[body_start:body_end]
body2 = sub(body, "WellKnownNames.objectTypeName);",
            "(Boolean.getBoolean(\"probe.boundAny\") ? WellKnownNames.anyTypeName\n"
            "                                                        : WellKnownNames.objectTypeName)); // PROBE distance-triage")
s = s[:body_start] + body2 + s[body_end:]
s = sub(s, "\t\textendsClause_result = rewriteStaticParamExtendsClause(that, extendsClause_result);",
        "\t\tif (!Boolean.getBoolean(\"probe.boundAny\") || kind_result instanceof KindType) // PROBE distance-triage\n"
        "\t\textendsClause_result = rewriteStaticParamExtendsClause(that, extendsClause_result);")
p = os.path.join(out, rel)
os.makedirs(os.path.dirname(p), exist_ok=True)
io.open(p, "w", encoding="utf-8").write(s)
print("wrote", p)
