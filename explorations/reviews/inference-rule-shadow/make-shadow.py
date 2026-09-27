#!/usr/bin/env python3
"""make-shadow.py <src-root> <out-dir> <variant> : the checker shadows of the inference-rule probe.

Copies ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/{Operators,Functionals}.scala
into <out-dir> (same package path) and edits the copies by text; every edit asserts that it matched
exactly once, so a tracked edit that moves an anchor stops the build instead of going stale.

Variants:
  rule        the edit of record (rule.patch is its diff), no trace:
              Operators.scala: the expected type kept at a call written f(x), measure-D's four
                one-token edits (:85, :90, :197, :345; numerics-plan-coordinator/measure-D.md);
              Functionals.scala: inference with coercion,
                - checkApplication tries its candidates in up to four phases and keeps the first in
                  which one is applicable: by subtyping with the expected type (today's inference,
                  now with the context at f(x) too); with coercion and the expected type; and, when
                  there is an expected type, by subtyping without it and with coercion without it,
                  so that a binding's coercion of the result still applies. A call applicable in
                  the first phase is checked as today; the diagnostics of a refused call are the
                  first phase's.
                - checkApplicableWithCoercion (new): the static arguments are inferred from the
                  argument positions whose parameter type mentions a static parameter other than as
                  the whole type, and from the expected type; a type parameter that is the whole type
                  of a parameter and appears in no other parameter type takes, among "fixed by the
                  rest", the types of its own arguments and its declared bound (a trait type other
                  than Object), the narrowest to which each of its arguments is substitutable; every
                  argument is then admitted by substitutability (subtype or coercion) against the
                  instantiated parameter type, and the coercions are built.
                - the promotion case: when today's inference succeeds but binds such a parameter to
                  a union, the same procedure is tried with the union's members as the only choices,
                  and its result replaces the union if one member is the narrowest (answer 8's
                  "narrowest type both sides coerce into"); otherwise the union stays.
  instr       the tree plus a trace, off unless -Dprobe.showInfer=true: at a call f(x), a method
              invocation and an operator application, the expected type given, the static arguments
              inferred and the arrow's range (measure-D's trace, with the operator site added).
  rule-instr  rule plus the trace, which then also prints the phase that succeeded.
Nothing else changes; with -Dprobe.showInfer unset, instr behaves as the tree and rule-instr as rule.
"""
import io, os, sys
src_root, out, variant = sys.argv[1], sys.argv[2], sys.argv[3]
assert variant in ("rule", "instr", "rule-instr"), variant
RULE = variant in ("rule", "rule-instr")
TRACE = variant in ("instr", "rule-instr")
base = "com/sun/fortress/scala_src/typechecker/impls/"

def edit(s, old, new, what):
    n = s.count(old)
    assert n == 1, (what, n)
    return s.replace(old, new)

def write(rel, s):
    p = os.path.join(out, base + rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    io.open(p, "w", encoding="utf-8").write(s)
    print("wrote", p)

f = io.open(os.path.join(src_root, base + "Functionals.scala"), encoding="utf-8").read()
o = io.open(os.path.join(src_root, base + "Operators.scala"), encoding="utf-8").read()

# ---------------------------------------------------------------- Operators.scala: the expected type
if RULE:
    o = edit(o, "      case 1 => checkExpr(S_RewriteFnApp(info, front, rest.head))\n",
                "      case 1 => checkExpr(S_RewriteFnApp(info, front, rest.head), expected)\n", ":90")
    o = edit(o, "      checkExpr(SMathPrimary(info, multi, infix, front, rest.map(toMathItem)))\n",
                "      checkExpr(SMathPrimary(info, multi, infix, front, rest.map(toMathItem)), expected)\n", ":85")
    o = edit(o, "    case SMathPrimary(info, multi, infix, front, Nil) => checkExpr(front)\n",
                "    case SMathPrimary(info, multi, infix, front, Nil) => checkExpr(front, expected)\n", ":197")
    o = edit(o, "            checkExpr(SMathPrimary(info, multi, infix, fn, remained))\n",
                "            checkExpr(SMathPrimary(info, multi, infix, fn, remained), expected)\n", ":345")

# ---------------------------------------------------------------- Functionals.scala: the rule
if RULE:
    # checkApplicable passes the phase's coercion switch to the inference
    f = edit(f,
 "                      args: List[Either[Expr, FnExpr]],\n"
 "                      mOpName: Option[Op])\n"
 "                     (implicit errorFactory: ApplicationErrorFactory)\n"
 "                      : Either[AppCandidate, OverloadingError] = {\n"
 "    val arrow = preCandidate.arrow\n",
 "                      args: List[Either[Expr, FnExpr]],\n"
 "                      mOpName: Option[Op],\n"
 "                      coerce: Boolean = false)\n"
 "                     (implicit errorFactory: ApplicationErrorFactory)\n"
 "                      : Either[AppCandidate, OverloadingError] = {\n"
 "    val arrow = preCandidate.arrow\n", "checkApplicable signature")
    f = edit(f,
 "        checkApplicableWithInference(liftedArrow, preCandidate, context, args)\n",
 "        checkApplicableWithInference(liftedArrow, preCandidate, context, args, coerce)\n", "call WithInference")
    # checkApplicableWithInference: the coercion phase, and the promotion case after a success
    f = edit(f,
 "          context: Option[Type],\n"
 "          args: List[Either[Expr, FnExpr]])\n"
 "          (implicit errorFactory: ApplicationErrorFactory)\n"
 "           : Either[AppCandidate, OverloadingError] = {\n"
 "\n"
 "    val originalArrow = preCandidate.arrow\n"
 "\n"
 "    // Try to check the unchecked args",
 "          context: Option[Type],\n"
 "          args: List[Either[Expr, FnExpr]],\n"
 "          coerce: Boolean = false)\n"
 "          (implicit errorFactory: ApplicationErrorFactory)\n"
 "           : Either[AppCandidate, OverloadingError] = {\n"
 "\n"
 "    val originalArrow = preCandidate.arrow\n"
 "    if (coerce) return checkApplicableWithCoercion(arrow, preCandidate, context, args, None)\n"
 "\n"
 "    // Try to check the unchecked args", "WithInference signature")
    f = edit(f,
 "        // We've reached a fixed point and all args are checked!\n"
 "        Left(AppCandidate(resultArrow,\n"
 "                          sargs,\n"
 "                          newArgs.map(_.left.get),\n"
 "                          preCandidate.overloading,\n"
 "                          preCandidate.fnl))\n",
 "        // We've reached a fixed point and all args are checked!\n"
 "        // The promotion case: a union bound to a type parameter gives way to\n"
 "        // the narrowest of its members that every argument converts into.\n"
 "        if (sargs.exists { case STypeArg(_, false, _: UnionType) => true; case _ => false })\n"
 "          checkApplicableWithCoercion(arrow, preCandidate, context, newArgs, Some(sargs)) match {\n"
 "            case promoted@Left(_) => return promoted\n"
 "            case _ =>\n"
 "          }\n"
 "        Left(AppCandidate(resultArrow,\n"
 "                          sargs,\n"
 "                          newArgs.map(_.left.get),\n"
 "                          preCandidate.overloading,\n"
 "                          preCandidate.fnl))\n", "promotion")
    # the new method, placed before checkApplicableWithoutInference
    f = edit(f,
 "  /**\n"
 "   * Check that the arrow type is applicable to these args without any static\n"
 "   * argument inference. The resulting args may have coercions.\n"
 "   */\n",
 "  /**\n"
 "   * Check that the arrow type is applicable to these args with static argument\n"
 "   * inference and coercion. The static args are inferred from the args whose\n"
 "   * parameter types mention a static parameter other than as the whole type, and\n"
 "   * from the context. A type parameter that is the whole type of a parameter and\n"
 "   * appears in no other parameter type takes, among the types of its args and its\n"
 "   * declared bound, the narrowest that each of its args is substitutable for.\n"
 "   * Every arg is then admitted by substitutability against the instantiated\n"
 "   * parameter type; the resulting args may have coercions. With `promote`, a\n"
 "   * solution by subtyping, only the members of the unions it binds are tried.\n"
 "   */\n"
 "  def checkApplicableWithCoercion(\n"
 "          arrow: ArrowType,\n"
 "          preCandidate: PreAppCandidate,\n"
 "          context: Option[Type],\n"
 "          args: List[Either[Expr, FnExpr]],\n"
 "          promote: Option[List[StaticArg]])\n"
 "          (implicit errorFactory: ApplicationErrorFactory)\n"
 "           : Either[AppCandidate, OverloadingError] = {\n"
 "    def notApplicable = Right(errorFactory.makeNotApplicableError(preCandidate.arrow, args))\n"
 "    if (args.exists(_.isRight)) return notApplicable\n"
 "    val checked = args.map(_.left.get)\n"
 "    val params = getStaticParams(arrow).filter(!_.isLifted)\n"
 "    // The order in which inferStaticParams returns the static args.\n"
 "    val order = params.filter(_.getDominatesClause.isEmpty) ++ params.filterNot(_.getDominatesClause.isEmpty)\n"
 "    val names: Set[Any] = params.map(_.getName).toSet\n"
 "    val typeNames: Set[Any] = params.filter(_.getKind.isInstanceOf[KindType]).map(_.getName).toSet\n"
 "    def mentioned(t: Type): Set[Any] = {\n"
 "      var found = Set[Any]()\n"
 "      object finder extends Walker {\n"
 "        override def walk(node: Any): Any = node match {\n"
 "          case n: VarType if names(n.getName) => found += n.getName; node\n"
 "          case n: IntRef if names(n.getName) => found += n.getName; node\n"
 "          case _ => super.walk(node)\n"
 "        }\n"
 "      }\n"
 "      finder(t); found\n"
 "    }\n"
 "    def bare(d: Type): Option[Any] = d match {\n"
 "      case v: VarType if typeNames(v.getName) => Some(v.getName)\n"
 "      case _ => None\n"
 "    }\n"
 "    val positions = zipWithDomain(checked.map(e => normalize(getType(e).get)), arrow.getDomain)\n"
 "    val fixedElsewhere = positions.filter(p => bare(p._2).isEmpty).flatMap(p => mentioned(p._2)).toSet\n"
 "    val chosen = positions.flatMap(p => bare(p._2)).distinct.filterNot(fixedElsewhere)\n"
 "    def valueOf(sargs: List[StaticArg], n: Any): Option[Type] =\n"
 "      order.zip(sargs).collectFirst { case (sp, STypeArg(_, _, t)) if sp.getName == n => t }\n"
 "    val choices: List[List[Option[Type]]] = chosen.map { n =>\n"
 "      promote match {\n"
 "        case Some(sargs) => valueOf(sargs, n) match {\n"
 "          case Some(SUnionType(_, elts)) => elts.map(normalize).distinct.map(Some(_))\n"
 "          case v => List(v)\n"
 "        }\n"
 "        case None =>\n"
 "          val own = positions.filter(p => bare(p._2) == Some(n)).map(_._1).\n"
 "                      filterNot(t => t.isInstanceOf[BottomType] || hasInferenceVars(t))\n"
 "          val bound = params.find(_.getName == n).toList.flatMap(sp => toListFromImmutable(sp.getExtendsClause)).\n"
 "                      filter(b => b.isInstanceOf[TraitType] && mentioned(b).isEmpty && b.asInstanceOf[TraitType].getName.getText != \"Object\")\n"
 "          None :: (own ++ bound).distinct.map(Some(_))\n"
 "      }\n"
 "    }\n"
 "    if (promote.isDefined && choices.forall(_.size < 2)) return notApplicable\n"
 "    val combos = choices.foldRight(List(List[Option[Type]]())) { (cs, acc) => for (c <- cs; m <- acc) yield c :: m }\n"
 "    if (combos.size > 64) return notApplicable\n"
 "    def attempt(combo: List[Option[Type]]): Option[AppCandidate] = {\n"
 "      val pick = Map(chosen.zip(combo): _*)\n"
 "      // Only the positions that fix a static parameter by subtyping, and the\n"
 "      // chosen types, constrain the inference.\n"
 "      val tys = positions.map { case (a, d) => bare(d) match {\n"
 "        case Some(n) => pick.getOrElse(n, None)\n"
 "        case None => if (mentioned(d).isEmpty) None else Some(a)\n"
 "      }}\n"
 "      def constraint(inf: ArrowType, ops: Map[Op, Op]): CFormula =\n"
 "        Formula.and(context.map(c => analyzer.subtype(inf.getRange, c)).toList ++\n"
 "                    zipWithDomain(tys, inf.getDomain).collect { case (Some(t), d) => analyzer.subtype(t, d) })\n"
 "      val (resultArrow, sargs) =\n"
 "        inferStaticParamsHelper(arrow, constraint, false, true).getOrElse(return None)\n"
 "      if (hasInferenceVars(resultArrow) || hasSizeInferenceVars(sargs)) return None\n"
 "      val newArgs = zipWithDomain(checked, resultArrow.getDomain).map { case (e, p) =>\n"
 "        if (isSubtype(getType(e).get, p)) e else coercions.buildCoercion(e, p).getOrElse(return None)\n"
 "      }\n"
 "      if (!isSubtype(getArgType(newArgs.map(e => Left(e): Either[Expr, FnExpr])), resultArrow.getDomain)) return None\n"
 "      Some(AppCandidate(resultArrow, sargs, newArgs, preCandidate.overloading, preCandidate.fnl))\n"
 "    }\n"
 "    val found = combos.flatMap(attempt(_))\n"
 "    def narrower(a: AppCandidate, b: AppCandidate) = chosen.forall { n =>\n"
 "      (valueOf(a.sargs, n), valueOf(b.sargs, n)) match {\n"
 "        case (Some(s), Some(t)) => coercions.substitutableFor(s, t)\n"
 "        case _ => false\n"
 "      }\n"
 "    }\n"
 "    found.find(a => found.forall(narrower(a, _))) match {\n"
 "      case Some(c) => Left(c)\n"
 "      case None => notApplicable\n"
 "    }\n"
 "  }\n"
 "\n"
 "  /**\n"
 "   * Check that the arrow type is applicable to these args without any static\n"
 "   * argument inference. The resulting args may have coercions.\n"
 "   */\n", "new method")
    # checkApplication: the four phases
    f = edit(f,
 "    // Filter the overloadings that are applicable.\n"
 "    val es = preCandidates.map(pc => checkApplicable(pc, context, args, mOpName))\n",
 "    // Filter the overloadings that are applicable: by subtyping with the\n"
 "    // context; failing that, with coercion; failing that, both again without\n"
 "    // the context, so that a coercion of the result still applies. Errors are\n"
 "    // the first attempt's.\n"
 "    def applicable(ctx: Option[Type], coerce: Boolean) =\n"
 "      preCandidates.map(pc => checkApplicable(pc, ctx, args, mOpName, coerce))\n"
 "    val first = applicable(context, false)\n"
 "    val es = if (first.exists(_.isLeft)) first else\n"
 "      ((context, true) :: (if (context.isDefined) List((None, false), (None, true)) else Nil)).\n"
 "        iterator.map(p => applicable(p._1, p._2)).find(_.exists(_.isLeft)).getOrElse(first)\n", "phases")

# ---------------------------------------------------------------- the trace (instr, rule-instr)
if TRACE:
    TR = 'java.lang.Boolean.getBoolean("probe.showInfer")'
    def sh(t): return 'normalize(%s).toString' % t
    SARGS = ('c.sargs.map { case STypeArg(_, l, t) => (if (l) "lifted " else "") + normalize(t).toString; '
             'case o => o.toString }.mkString("[", ", ", "]")')
    ARGS = ('c.args.map(a => a.getClass.getSimpleName + ":" + getType(a).map(t => normalize(t).toString).getOrElse("?")).mkString("(", ", ", ")")')
    PH = ' + " phase=" + FunctionalsProbe.phase' if RULE else ''
    # the phase is kept in an object of its own: a var in the trait would need STypeChecker, which
    # mixes the trait in and is not recompiled here, to carry the field
    f = f.rstrip("\n") + "\n\nobject FunctionalsProbe { var phase: String = \"\" }\n"
    if RULE:
        f = edit(f,
 "        iterator.map(p => applicable(p._1, p._2)).find(_.exists(_.isLeft)).getOrElse(first)\n",
 "        iterator.map(p => { FunctionalsProbe.phase = (if (p._1.isDefined) \"ctx\" else \"noctx\") + (if (p._2) \"+coerce\" else \"\"); applicable(p._1, p._2) }).find(_.exists(_.isLeft)).getOrElse(first)\n"
 "    if (first.exists(_.isLeft)) FunctionalsProbe.phase = \"ctx\"\n", "phase trace")
    for site, anchor, tail in (
        ("MI", "      val candidates =\n        checkApplication(preCandidates, arg, expected).getOrElse(return expr)\n\n", "      // We only care about the most specific one. We know"),
        ("FN", "      val candidates =\n        checkApplication(preCandidates, arg, expected).getOrElse(return expr)\n\n", "      // We know the arg pattern match succeeds"),
    ):
        f = edit(f, anchor + tail,
 "      if (%s) System.out.println(\"@@PROBE-R %s \" + span + \" expected=\" + expected.map(t => %s).getOrElse(\"NONE\"))\n"
 "      val candidates =\n        checkApplication(preCandidates, arg, expected).getOrElse{ if (%s) System.out.println(\"@@PROBE-R %s-FAIL \" + span); return expr }\n"
 "      if (%s) { val c = candidates.head; System.out.println(\"@@PROBE-R %s-OK \" + span + \" sargs=\" + %s + \" range=\" + normalize(c.arrow.getRange) + \" args=\" + %s%s) }\n\n"
 % (TR, site, sh("t"), TR, site, TR, site, SARGS, ARGS, PH) + tail, site)
    f = edit(f,
 "      val candidates = checkApplication(preCandidates, args, expected, Some(opName)).\n"
 "                         getOrElse(return expr)\n",
 "      if (%s) System.out.println(\"@@PROBE-R OP \" + span + \" \" + opName + \" expected=\" + expected.map(t => %s).getOrElse(\"NONE\"))\n"
 "      val candidates = checkApplication(preCandidates, args, expected, Some(opName)).\n"
 "                         getOrElse{ if (%s) System.out.println(\"@@PROBE-R OP-FAIL \" + span); return expr }\n"
 "      if (%s) { val c = candidates.head; System.out.println(\"@@PROBE-R OP-OK \" + span + \" sargs=\" + %s + \" range=\" + normalize(c.arrow.getRange) + \" args=\" + %s%s) }\n"
 % (TR, sh("t"), TR, TR, SARGS, ARGS, PH), "OP")

write("Functionals.scala", f)
write("Operators.scala", o)
