#!/usr/bin/env python3
"""Copies six interpreter sources into <dir>/src and adds NestProbe's observation hooks.
usage: make-shadow.py <dir>      (run from $FORTRESS_HOME; tracked files are only read)
Every edit asserts the exact number of matches, so a drifted source fails loudly."""
import io, os, shutil, sys
D = sys.argv[1]
R = "ProjectFortress/src/com/sun/fortress/interpreter/evaluator/"
IMPORT = "import com.sun.fortress.interpreter.evaluator.types.NestProbe;\n"
EDITS = {
  "types/FType.java": [
    ("        if (val.type() == null) return false;\n        return val.type().subtypeOf(this);\n",
     "        if (val.type() == null) return false;\n        boolean r = val.type().subtypeOf(this);\n"
     "        if (r) NestProbe.passed(this, val, null, null);\n        return r;\n", 1)],
  "values/OverloadedFunction.java": [
    ("        SingleFcn best = bestMatchInternal(args, someOverloads);\n",
     "        SingleFcn best;\n        NestProbe.suppress();\n"
     "        try { best = bestMatchInternal(args, someOverloads); } finally { NestProbe.unsuppress(); }\n", 1)],
  "values/Fcn.java": [
    ("            return this.applyToArgs(args);\n        }\n        catch (UnificationError ue) {",
     "            NestProbe.push(site);\n            try { return this.applyToArgs(args); } finally { NestProbe.pop(); }\n"
     "        }\n        catch (UnificationError ue) {", 1)],
  "Evaluator.java": [
    ("            return DottedMethodApplication.invokeMethod(receiver, mname, mname, args);\n",
     "            NestProbe.push(site);\n"
     "            try { return DottedMethodApplication.invokeMethod(receiver, mname, mname, args); } finally { NestProbe.pop(); }\n", 1),
    ("                FValue res = ((Selectable) gv).select(fname);\n",
     "                FValue res;\n                NestProbe.push(x);\n"
     "                try { res = ((Selectable) gv).select(fname); } finally { NestProbe.pop(); }\n", 1),
    ("            if (resTy.subtypeOf(matchTy)) {\n",
     "            if (resTy.subtypeOf(matchTy)) {\n                NestProbe.passed(matchTy, val, \"typecase\", c);\n", 1)],
  "values/MethodClosure.java": [
    ("    public FValue applyMethod(FObject selfValue, List<FValue> args) {\n",
     "    public FValue applyMethod(FObject selfValue, List<FValue> args) {\n"
     "        NestProbe.method(definer, selfValue, this::asMethodName);\n", 1)],
  "BuildEnvironments.java": [
    ("                    if (!ft.typeMatch(value)) {\n", "                    if (!NestProbe.typeMatchAt(ft, value, x)) {\n", 2),
    ("                if (!ft.typeMatch(value)) {\n", "                if (!NestProbe.typeMatchAt(ft, value, where)) {\n", 1)],
  "BaseEnv.java": [
    ("                if (!ft.typeMatch(value)) {\n", "                if (!NestProbe.typeMatchAt(ft, value, loc)) {\n", 1)],
  "LHSEvaluator.java": [
    ("                    if (value.type().subtypeOf(outerType)) evaluator.e.putVariable(s, value, outerType);\n",
     "                    if (value.type().subtypeOf(outerType)) { NestProbe.passed(outerType, value, \"localdecl\", x); "
     "evaluator.e.putVariable(s, value, outerType); }\n", 1)],
}
for rel, subs in EDITS.items():
    src = R + rel
    dst = os.path.join(D, "src", "com/sun/fortress/interpreter/evaluator", rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    s = io.open(src, encoding="utf-8").read()
    for a, b, n in subs:
        assert s.count(a) == n, (rel, a[:70], s.count(a))
        s = s.replace(a, b)
    if not rel.startswith("types/"):
        i = s.index("\nimport ")
        s = s[:i + 1] + IMPORT + s[i + 1:]
    io.open(dst, "w", encoding="utf-8").write(s)
here = os.path.dirname(os.path.abspath(__file__))
dst = os.path.join(D, "src", "com/sun/fortress/interpreter/evaluator/types/NestProbe.java")
shutil.copy(os.path.join(here, "NestProbe.java"), dst)
print("shadow sources in", os.path.join(D, "src"))
