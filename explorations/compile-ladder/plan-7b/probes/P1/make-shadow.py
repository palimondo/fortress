#!/usr/bin/env python3
"""make-shadow.py <src-root> <out-root>: probe P1's checker shadow (climb batch 7's record,
explorations/coordinator/CLIMB-BATCH-7.md section 6, P1).  Copies of two tracked Scala files with
text edits that must each match exactly once:

  OverloadingOracle.scala   two new methods, nothing else changed:
    satisfiesReturnTypeRulePaper  the Return Type Rule as the Types paper's theorem states it
        (Papers/Types/overloading-check.tick:166-172): arrow(d1) <: forall[D1, D2] (S1 cap S2) -> T2,
        every static parameter of both declarations kept quantified.  It is the team's own earlier
        implementation, commented out in the tracked file (OverloadingOracle.scala:120-145), restored
        under a new name; the stock rule (:81-117) substitutes the one solution subEDsolution returns.
    satisfiesReturnTypeRuleForced  the judgement's construction of the same rule
        (reviews/overloading-judgement.md section 3.5): the less specific declaration's static
        parameters are kept quantified in the special arrow except where the domain relation forces
        an equality, that is, where the solver's constraint implies the parameter equal to the
        solution subEDsolution returns (Formula.implies); rung N's unsolved sizes stay quantified
        as the stock rule keeps them (:92-106).
    positionalRule  the rule answer 9 adds (POSITIONS 2026-09-26; reviews/overloading-judgement.md
        section 3.4): when a declaration with static parameters of its own is more specific than
        another with static parameters of its own, the two declare the same number and kinds of
        them, position by position, and the more specific one's return type is a subtype of the
        other's under that identification.  Returns "agree", "shape" or "return"; with
        -Dprobe.positional.domain set (second build, 2026-09-28 09:45 UTC) also "domain", when the
        more specific one's domain is not a subtype of the other's under the identification.
  OverloadingChecker.scala  returnTypeCheck computes the three return-type verdicts and the positional
    verdict for every pair it is called on (the pairs the checker accepts, in both orders) and
    prints one line per pair where the three return-type verdicts do not all agree (@@P1 RTR) and one per pair
    the positional rule applies to (@@P1 POS).  Which verdicts become errors is set per run:
      -Dprobe.rtr=stock|paper|forced   (default stock: today's error set)
      -Dprobe.positional=true   (default false: the rule logs and reports nothing)
    With neither switch the shadow reports exactly the stock checker's errors.
"""
import os
import shutil
import sys

SRC, OUT = sys.argv[1], sys.argv[2]
P = "com/sun/fortress/scala_src"


def edit(rel, pairs):
    s = open(os.path.join(SRC, rel), encoding="utf-8").read()
    for old, new in pairs:
        n = s.count(old)
        assert n == 1, (rel, old[:80], n)
        s = s.replace(old, new)
    d = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(d), exist_ok=True)
    open(d, "w", encoding="utf-8").write(s)
    print("shadowed", rel)


ORACLE_ADD = r'''
  // Probe P1 (climb batch 7b): the Return Type Rule as the paper's theorem states it,
  // arrow(d1) <: forall[D1, D2] (S1 cap S2) -> T2 (Papers/Types/overloading-check.tick:166-172).
  // The team's own earlier implementation, commented out above, restored under a new name.
  def satisfiesReturnTypeRulePaper(x: ArrowType, y: ArrowType): Boolean =
    (alphaRenameTypeSchema(x, ta.extend(toList(x.getInfo.getStaticParams), None).env),
     alphaRenameTypeSchema(y, ta.extend(toList(y.getInfo.getStaticParams), None).env)) match {
      case (fa@SArrowType(STypeInfo(s1, p1, sp1, w1), d1, r1, e1, i1, m1),
            ga@SArrowType(STypeInfo(s2, p2, sp2, w2), d2, r2, e2, i2, m2)) =>
        val fd = sa.makeDomainWithSelfFromArrow(fa)
        val gd = sa.makeDomainWithSelfFromArrow(ga)
        if (sa.subEDsolution(fd, gd).isEmpty) true
        else {
          val spCombined = sp1 ++ sp2
          val nta = ta.extend(spCombined, None)
          val ntsa = new TypeSchemaAnalyzer()(nta)
          val ra = ntsa.normalizeUA(SArrowType(STypeInfo(s1, p1, spCombined, None), nta.meet(d1,d2), r2, nta.mergeEffect(e1,e2), i1 && i2, None))
          sa.subtypeUA(fa, ra)
        }
    }

  // Probe P1 (climb batch 7b): the judgement's construction (reviews/overloading-judgement.md
  // section 3.5): a static parameter of the less specific declaration is replaced by the solution
  // subEDsolution returns only where the domain relation forces it; otherwise it stays quantified.
  def satisfiesReturnTypeRuleForced(x: ArrowType, y: ArrowType): Boolean =
    (alphaRenameTypeSchema(x, ta.extend(toList(x.getInfo.getStaticParams), None).env),
     alphaRenameTypeSchema(y, ta.extend(toList(y.getInfo.getStaticParams), None).env)) match {
      case (fa@SArrowType(STypeInfo(s1, p1, sp1, w1), d1, r1, e1, i1, m1),
            ga@SArrowType(STypeInfo(s2, p2, sp2, w2), d2, r2, e2, i2, m2)) =>
        val fd = sa.makeDomainWithSelfFromArrow(fa)
        val gd = sa.makeDomainWithSelfFromArrow(ga)
        sa.subEDsolution(fd, gd) match {
          case None => true
          case Some((newgd, newargs)) =>
            val forced = forcedArgs(fd, gd, newargs)
            val pairs = sp2.zip(newargs).zip(forced)
            val fixedP = pairs.collect { case ((p, a), true) => p }
            val fixedA = pairs.collect { case ((p, a), true) => a }
            val kept = pairs.collect { case ((p, a), false) => p }
            val str = new StaticTypeReplacer(fixedP, fixedA)
            val nsp = sp1 ++ kept
            val nta = ta.extend(nsp, None)
            val ntsa = new TypeSchemaAnalyzer()(nta)
            val ra = ntsa.normalizeUA(SArrowType(STypeInfo(s1, p1, nsp, None), nta.meet(d1, str.replaceIn(d2)), str.replaceIn(r2), nta.mergeEffect(e1,e2), i1 && i2, None))
            sa.subtypeUA(fa, ra)
        }
    }

  // Which of gd's static parameters the relation fd <: gd forces to its solution in newargs:
  // the constraint subEDsolution solves (inferStaticParamsHelper's steps 1-5, STypesUtil.scala:965-1004)
  // implies the parameter's inference variable equal to that solution.
  def forcedArgs(fd: Type, gd: Type, newargs: List[StaticArg]): List[Boolean] = {
    val ta1 = if (getStaticParams(fd).isEmpty) ta else ta.extend(getStaticParams(fd), getWhere(fd))
    val fd1 = if (getStaticParams(fd).isEmpty) fd else clearStaticParams(fd)
    val nta = ta1.extend(getStaticParams(gd), getWhere(gd))
    val sparams = getStaticParams(gd)
    val sargs = sparams.map(makeInferenceArg)
    val infTyp = staticInstantiation(sargs, gd, true, true)(ta1).getOrElse(return sparams.map(_ => true))
    val c0 = nta.subtype(fd1, infTyp)
    val ubs: List[CFormula] = sparams.zip(sargs).flatMap { case (p, a) => (a, staticParamBoundType(p)) match {
      case (STypeArg(_, _, iv: _InferenceVarType), Some(b)) =>
        staticInstantiation(sargs, insertStaticParams(b, sparams), true, true)(ta1).map(bb => upperBound(iv, bb))
      case _ => None } }
    val c = and(c0, and(ubs)(ta1))(ta1)
    sargs.zip(newargs).map {
      case (STypeArg(_, _, iv: _InferenceVarType), STypeArg(_, _, sol)) =>
        implies(c, and(upperBound(iv, sol), lowerBound(iv, sol))(ta1))(ta1)
      case (_, SIntArg(_, _, v: _InferenceVarInt)) => false
      case _ => true
    }
  }

  // Probe P1 (climb batch 7b): the positional rule of answer 9.  x is more specific than y
  // (the caller checks); fOwn and gOwn are the declarations' own static parameters, which are
  // the last ones of each arrow's list (STypesUtil.getStaticParameters puts lifted ones first).
  def positionalRule(x: ArrowType, y: ArrowType, fOwn: Int, gOwn: Int, fKinds: List[String], gKinds: List[String]): String = {
    if (fOwn != gOwn || fKinds != gKinds) return "shape"
    (alphaRenameTypeSchema(x, ta.extend(toList(x.getInfo.getStaticParams), None).env),
     alphaRenameTypeSchema(y, ta.extend(toList(y.getInfo.getStaticParams), None).env)) match {
      case (fa@SArrowType(STypeInfo(s1, p1, sp1, w1), d1, r1, e1, i1, m1),
            ga@SArrowType(STypeInfo(s2, p2, sp2, w2), d2, r2, e2, i2, m2)) =>
        val fown = sp1.takeRight(fOwn)
        val gown = sp2.takeRight(gOwn)
        val glifted = sp2.dropRight(gOwn)
        val nta = ta.extend(sp1 ++ glifted, None)
        val str = new StaticTypeReplacer(gown, fown.map(p => staticParamToArg(p)))
        val r2id = str.replaceIn(r2)
        // Probe P1, second build: the more-specific relation must also hold under the identification
        // (Java's subsignature condition for overriding generic methods), which the team's
        // ProjectFortress/tests/XXXGenericOverload2.fss asks of walk ("Should not compile").
        val d2id = str.replaceIn(d2)
        if (System.getProperty("probe.positional.domain") != null && !isTrue(nta.subtype(d1, d2id))(nta)) "domain"
        else if (isTrue(nta.subtype(r1, r2id))(nta)) "agree" else "return"
    }
  }
'''

edit(P + "/overloading/OverloadingOracle.scala", [
    ("import com.sun.fortress.scala_src.typechecker.TraitTable\n",
     "import com.sun.fortress.scala_src.typechecker.TraitTable\nimport com.sun.fortress.scala_src.typechecker.CFormula\n"),
    ("\n  // Checks when domain of f excludes domain of g\n",
     ORACLE_ADD + "\n  // Checks when domain of f excludes domain of g\n"),
])

CHECKER_OLD = '''      val (fa, fsp, _) = first
      val (ga, gsp, _) = second
//          println("Satisfies return type rule?\\n   " + typeAndSpanToString(fa) + "\\n   " + typeAndSpanToString(ga))
      if (!oa.satisfiesReturnTypeRule(fa, ga)) {'''
CHECKER_NEW = '''      val (fa, fsp, ffn) = first
      val (ga, gsp, gfn) = second
      // Probe P1 (climb batch 7b): both return-type verdicts, and the positional rule.
      val stockRtr = oa.satisfiesReturnTypeRule(fa, ga)
      val paperRtr = try { oa.satisfiesReturnTypeRulePaper(fa, ga) } catch {
        case e: Throwable =>
          println("@@P1 RTR-CRASH " + e + " name=" + name + "\\n   " + typeAndSpanToString(fa) + "\\n   " + typeAndSpanToString(ga))
          stockRtr }
      val forcedRtr = try { oa.satisfiesReturnTypeRuleForced(fa, ga) } catch {
        case e: Throwable =>
          println("@@P1 RTR-FORCED-CRASH " + e + " name=" + name + "\\n   " + typeAndSpanToString(fa) + "\\n   " + typeAndSpanToString(ga))
          stockRtr }
      if (stockRtr != paperRtr || stockRtr != forcedRtr)
        println("@@P1 RTR stock=" + stockRtr + " paper=" + paperRtr + " forced=" + forcedRtr + " name=" + name + "\\n   " + typeAndSpanToString(fa) + "\\n   " + typeAndSpanToString(ga))
      val fOwn = ffn.map(f => toListFromImmutable(f.staticParameters)).getOrElse(List())
      val gOwn = gfn.map(f => toListFromImmutable(f.staticParameters)).getOrElse(List())
      if (!fOwn.isEmpty && !gOwn.isEmpty && oa.lteq(fa, ga)) {
        val kinds = (l: List[StaticParam]) => l.map(p => p.getKind.getClass.getSimpleName)
        val pos = try { oa.positionalRule(fa, ga, fOwn.size, gOwn.size, kinds(fOwn), kinds(gOwn)) } catch {
          case e: Throwable => "crash " + e }
        println("@@P1 POS " + pos + " name=" + name + " own=" + fOwn.size + "/" + gOwn.size + " eq=" + oa.lteq(ga, fa) + "\\n   " + typeAndSpanToString(fa) + "\\n   " + typeAndSpanToString(ga))
        if (java.lang.Boolean.getBoolean("probe.positional") && pos != "agree")
          error(mergeSpan(fa, ga),
                "Positional rule (" + pos + ") for " + name + ": the static parameters of " + typeAndSpanToString(fa) +
                "\\n    do not agree position by position with those of " + typeAndSpanToString(ga))
      }
      val rtrOk = System.getProperty("probe.rtr", "stock") match {
        case "paper" => paperRtr
        case "forced" => forcedRtr
        case _ => stockRtr }
      if (!rtrOk) {'''

edit(P + "/typechecker/OverloadingChecker.scala", [(CHECKER_OLD, CHECKER_NEW)])
