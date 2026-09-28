#!/usr/bin/env python3
"""make-shadow.py <src-root> <out-root>: probe P4's logging shadow of walk's dispatch.  A copy of
interpreter/evaluator/values/OverloadedFunction.java with two calls added, each edit matching exactly
once, and P4Probe.java beside it (the relation, the choice, the verdicts and the log).  With
-Dprobe.p4 unset the copy behaves as the tracked file; with it set, bestMatchInternal also gathers the
declarations it finds applicable and hands them, with its own choice, to P4Probe.dispatch, and the
load-time check hands each pair's verdict to P4Probe.load, before it reports a failure.  Neither call
changes what the method returns or reports."""
import os
import shutil
import sys

SRC, OUT = sys.argv[1], sys.argv[2]
REL = "com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java"
s = open(os.path.join(SRC, REL), encoding="utf-8").read()
EDITS = [
    ("""    private SingleFcn bestMatchInternal(List<FValue> args, List<Overload> someOverloads) {
        SingleFcn best_sfn = null;
""", """    private SingleFcn bestMatchInternal(List<FValue> args, List<Overload> someOverloads) {
        SingleFcn best_sfn = null;
        Overload p4Best = null;                                             // probe P4
        List<Overload> p4Applicable = P4Probe.ON ? new ArrayList<Overload>() : null;
        List<SingleFcn> p4Insts = P4Probe.ON ? new ArrayList<SingleFcn>() : null;
"""),
    ("""            if (oargs != null && argsMatchTypes(oargs, sfn.getDomain()) &&
                (best_sfn == null || FTypeTuple.moreSpecificThan(sfn.getDomain(), best_sfn.getDomain()))) {
                best_sfn = sfn;
            }

        }
        return best_sfn;
""", """            if (p4Applicable != null && oargs != null && argsMatchTypes(oargs, sfn.getDomain())) { p4Applicable.add(o); p4Insts.add(sfn); }
            if (oargs != null && argsMatchTypes(oargs, sfn.getDomain()) &&
                (best_sfn == null || FTypeTuple.moreSpecificThan(sfn.getDomain(), best_sfn.getDomain()))) {
                best_sfn = sfn;
                p4Best = o;
            }

        }
        if (p4Applicable != null && best_sfn != null) {
            try { P4Probe.dispatch(getFnName(), args, p4Applicable, p4Insts, p4Best); }
            catch (Throwable t) { P4Probe.log("SHADOW-FAULT dispatch " + this + ": " + t); }
        }
        return best_sfn;
"""),
    ("""            describeOverloadingFailure(o1, o2, within, pl1, pl2);

            return;
""", """            if (P4Probe.ON) {                                               // probe P4
                boolean p4meet = false;
                try { p4meet = (o1.getFn() instanceof GenericFunctionOrMethod || o2.getFn() instanceof GenericFunctionOrMethod)
                               && meetExistsIn(o1, o2, new_overloads); } catch (Throwable t) { }
                try { P4Probe.load(o1, o2, overloadOk(), distinct, p4meet, new ArrayList<Overload>(new_overloads)); }
                catch (Throwable t) { P4Probe.log("SHADOW-FAULT load " + o1 + " / " + o2 + ": " + t); }
            }
            describeOverloadingFailure(o1, o2, within, pl1, pl2);

            return;
"""),
]
for old, new in EDITS:
    n = s.count(old)
    assert n == 1, (old[:70], n)
    s = s.replace(old, new)
d = os.path.join(OUT, REL)
os.makedirs(os.path.dirname(d), exist_ok=True)
open(d, "w", encoding="utf-8").write(s)
shutil.copy(os.path.join(os.path.dirname(os.path.abspath(__file__)), "P4Probe.java"), os.path.join(os.path.dirname(d), "P4Probe.java"))
print("shadowed", REL, "and added P4Probe.java")
