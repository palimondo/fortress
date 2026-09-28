#!/usr/bin/env python3
"""make-opt2.py <Functionals.scala>: edits the inference-rule shadow's `rule` copy of Functionals.scala
in place into this note's opt2 variant (build-opt2.sh). Each edit asserts it matched once."""
import sys
p = sys.argv[1]
s = open(p).read()
def once(old, new):
    global s
    assert s.count(old) == 1, old
    s = s.replace(old, new)
once("""    val first = applicable(context, false)
    val es = if (first.exists(_.isLeft)) first else""",
"""    val first = applicable(context, false)
    // opt2 (explorations/reviews/option-2-soundness.md, a measurement variant): a generic candidate
    // that the first attempt refuses and the coercion attempt admits joins the first attempt.
    val firstO2 = if (!first.exists(_.isLeft)) first else
      first.zip(preCandidates).map {
        case (Right(e), pc) if !getStaticParams(pc.arrow).filter(!_.isLifted).isEmpty =>
          checkApplicable(pc, context, args, mOpName, true) match { case l@Left(_) => l; case _ => Right(e) }
        case (x, _) => x
      }
    val es = if (first.exists(_.isLeft)) firstO2 else""")
once("""    val sorted = Some(candidates.sortWith(moreSpecificCandidate))""",
"""    // opt2: a generic candidate's coercions do not count; the ranking then compares the
    // candidates' instantiated domains, as moreSpecificCandidate does after its first test.
    def o2Coerced(c: AppCandidate) = c.sargs.isEmpty && c.args.exists(_.isInstanceOf[CoercionInvocation])
    def o2More(c1: AppCandidate, c2: AppCandidate): Boolean =
      (o2Coerced(c1), o2Coerced(c2)) match {
        case (true, false) => false
        case (false, true) => true
        case _ => coercions.moreSpecific(c1.arrow.getDomain, c2.arrow.getDomain)
      }
    val sorted = Some(candidates.sortWith(o2More))""")
open(p, 'w').write(s)
print("wrote", p.split('/scratchpad/')[-1])
