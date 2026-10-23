"""Make the checker shadows of the self-type exclusion probe from the tracked sources.

usage: shadow.py <tree> <out-dir> [selfexc] [bounds] [global] [keepvar]

Always: the full symbolic-operator check with crashes caught per name, as the earlier
probe made it (perf-probes/symbolic-operators-2/checker-shadow.py <tree> <out> catch),
written to <out-dir>/OverloadingChecker.scala.

selfexc  shadow (i). In the overloading check's exclusion test only
         (OverloadingChecker.validOverloadingInner's `oa.excludes(fa, ga)`), a functional
         method of a self-typed trait whose self type was read from the F-bound (P-146;
         FunctionalMethod._selfFromBound) has its self parameter typed C[\\X\\] & X, the
         TraitSelfType that the disambiguator wrote and that FunctionalMethod.parameters()
         makes plain. Specificity, the Meet Rule's meet, the coverage rule and the Return
         Type Rule keep the plain arrow. Edits OverloadingChecker.scala only.
bounds   shadow (ii). The exclusion test (OverloadingOracle.excludes) gains one more way to
         be valid: the meet of the two domains, reduced as reduceED reduces it but with its
         constraint also reading each static parameter as its bounds wherever it stands at
         the top of the body (the body itself, a tuple's element, a member of an
         intersection or union, a self type's parts), is empty. Its constraint is False, or
         each of its disjuncts' forced equalities leaves a body that is Bottom under the
         merged bounds. Adds
         TypeSchemaAnalyzer.meetEmptyWithBounds and edits OverloadingOracle.excludes.
global   with bounds: the bounds are also read in reduceED's own constraint, so that every
         existential reduction (specificity, the Meet Rule, the Return Type Rule) carries
         them. A variant beside the brief's shadows; not one of them.
keepvar  with bounds: withBounds keeps each parameter beside its bounds (X & B, not B), the
         first form of shadow (ii). It reproduces the solver's recursion without end
         (Formula.tImplies and primImp) on an F-bounded parameter; the report's defect.

With -Dprobe.excdebug=true on the checker's JVM, the shadowed exclusion test prints each
pair it decides by the new reading. Each edit must match exactly once, so the shadow cannot
go stale silently.
"""
import io, os, subprocess, sys

tree, out = sys.argv[1], sys.argv[2]
words = sys.argv[3:]
selfexc, bounds, glob = "selfexc" in words, "bounds" in words, "global" in words
keepvar = "keepvar" in words
here = os.path.dirname(os.path.abspath(__file__))
full = os.path.join(tree, "explorations/perf-probes/symbolic-operators-2/checker-shadow.py")
subprocess.check_call([sys.executable, full, tree, out, "catch"])

SRC = os.path.join(tree, "ProjectFortress/src/com/sun/fortress/scala_src")


def edit(text, edits, name):
    for old, new in edits:
        n = text.count(old)
        assert n == 1, "%s: edit matches %d times: %s" % (name, n, old[:70])
        text = text.replace(old, new, 1)
    return text


if selfexc:
    p = os.path.join(out, "OverloadingChecker.scala")
    t = io.open(p, encoding="utf-8").read()
    t = edit(t, [
        # the top-level set (toFunctionArrows)
        ("""         .toList.map(f => (NF.makeArrowType(f.getSpan,
\t\t\t\t     paramsToType(f.parameters, f.getSpan),
\t\t\t\t     f.getReturnType.unwrap,
\t\t\t\t     getStaticParameters(f, true)),
""",
         """         .toList.map(f => (selfTyped(NF.makeArrowType(f.getSpan,
\t\t\t\t     paramsToType(f.parameters, f.getSpan),
\t\t\t\t     f.getReturnType.unwrap,
\t\t\t\t     getStaticParameters(f, true)), f,
\t\t\t\t     (ps: JavaList[Param]) => NF.makeArrowType(f.getSpan, paramsToType(ps, f.getSpan),
\t\t\t\t       f.getReturnType.unwrap, getStaticParameters(f, true))),
"""),
        # a trait's or object's functional methods (toFunctionalMethodArrows)
        ("""              ((NF.makeArrowType(f.getSpan,
                                replacer.replaceIn(apart(paramsToType(f.parameters, f.getSpan))),
                                replacer.replaceIn(apart(f.getReturnType.unwrap)),
\t\t\t\tsparams),
""",
         """              ((selfTyped(NF.makeArrowType(f.getSpan,
                                replacer.replaceIn(apart(paramsToType(f.parameters, f.getSpan))),
                                replacer.replaceIn(apart(f.getReturnType.unwrap)),
\t\t\t\tsparams), f,
                  (ps: JavaList[Param]) => NF.makeArrowType(f.getSpan,
                                replacer.replaceIn(apart(paramsToType(ps, f.getSpan))),
                                replacer.replaceIn(apart(f.getReturnType.unwrap)),
                                sparams)),
"""),
        # the exclusion test
        ("      else if (oa.excludes(fa, ga)) { true }\n",
         "      else if (oa.excludes(forExclusion(fa), forExclusion(ga))) { true }\n"),
        # the helpers, before the memo of validOverloading
        ("""    private var staticParamsInScope: List[StaticParam] = Nil
""",
         """    private var staticParamsInScope: List[StaticParam] = Nil

    // PROBE (selfexc): the exclusion test reads a self-typed trait's self as C[\\X\\] & X.
    // For a functional method whose self type was read from the F-bound (P-146), the
    // declaration's own parameters (FunctionalMethod.ast) keep the TraitSelfType that
    // parameters() makes plain; an arrow made from them, by the same steps as the plain
    // arrow, is kept beside it for the exclusion test, keyed by the plain arrow's identity.
    private val exclusionArrows = new java.util.IdentityHashMap[ArrowType, ArrowType]()
    private def selfTyped(a: ArrowType, f: JavaFunctional, mk: JavaList[Param] => ArrowType): ArrowType = {
      f match {
        case fm: JavaFunctionalMethod =>
          val own = NU.getParams(fm.ast)
          if (!own.equals(fm.parameters)) exclusionArrows.put(a, mk(own))
        case _ =>
      }
      a
    }
    private def forExclusion(a: ArrowType): ArrowType = {
      val e = exclusionArrows.get(a)
      if (e == null) a else e
    }
"""),
    ], "OverloadingChecker.scala (selfexc)")
    io.open(p, "w", encoding="utf-8").write(t)
    print("shadow (i) written: %s" % p)

if bounds:
    rel = os.path.join(SRC, "types/TypeSchemaAnalyzer.scala")
    t = io.open(rel, encoding="utf-8").read()
    helper = '''
  // PROBE (bounds): the existential reduction reads the bounds of the static parameters.
  private val probeDebug = java.lang.Boolean.getBoolean("probe.excdebug")

  /* t with each type parameter of sp that stands at the top of t (t itself, an element of
   * a tuple, a member of an intersection or union, the parts of a self type, read as the
   * intersection that removeSelf makes of it) replaced by the meet of its declared bounds.
   * Each instance of a parameter is below its bounds, so at every instance the result
   * holds t: where t is not Bottom, neither is the result. A parameter inside a static
   * argument is left as it is. The parameter itself is not kept beside its bounds: an
   * inference variable met with an F-bound that names it sends the constraint solver's
   * implication test (Formula.tImplies and primImp) into a recursion without end. */
  def withBounds(t: Type, sp: List[StaticParam]): Type = {
    val bs: Map[String, List[Type]] = sp.flatMap {
      case SStaticParam(_, _, n: Id, exts, _, _, _, _: KindType, _) =>
        Some((n.getText, exts.filter(b => !b.isInstanceOf[AnyType]).map(_.asInstanceOf[Type])))
      case _ => None
    }.toMap
    def top(x: Type): Type = x match {
      case v@SVarType(_, n, _) => bs.get(n.getText) match {
        case Some(b) if !b.isEmpty => NF.makeMaybeIntersectionType(toJavaList(b))
        case _ => v
      }
      case STupleType(i, es, vt, ks) => STupleType(i, es.map(top), vt, ks)
      case SIntersectionType(i, es) => SIntersectionType(i, es.map(top))
      case SUnionType(i, es) => SUnionType(i, es.map(top))
      case STraitSelfType(_, named, comprised) if !comprised.isEmpty =>
        NF.makeIntersectionType(toJavaList(List(top(named), top(NF.makeMaybeUnionType(toJavaList(comprised.map(_.asInstanceOf[Type])))))))
      case STraitSelfType(_, named, _) => top(named)
      case _ => x
    }
    top(t)
  }

  /* Whether the existential ed has no instance but Bottom, read with its static parameters'
   * bounds. The constraint is reduceED's, the body off Bottom and the bounds, conjoined
   * with the body's off Bottom where each parameter at its top is read as its bounds
   * (withBounds), each parameter read as an inference variable; the second conjunct is
   * implied by the first, and adds the equalities that only the bounds show. The
   * existential is empty where that constraint is False, or where each disjunct of it
   * forces equalities (the unifier's, which that disjunct implies) under which the body,
   * its parameters merged with their bounds (boundsSubstitution), is below Bottom. A
   * disjunct whose equalities do not unify, or whose images break a bound, is not read as
   * empty. */
  def emptyWithBounds(ed: Type): Boolean = {
    val spd = getStaticParams(ed)
    if (spd.isEmpty) return false
    val e = insertStaticParams(ta.extend(spd, None).normalize(clearStaticParams(ed)), spd)
    val sp = getStaticParams(e)
    val ia = sp.map(s => NF.make_InferenceVarType(NU.getSpan(s)))
    val temp = (ia, sp).zipped.flatMap{
      case (i, SStaticParam(info, _, n, _, _, _, _, _, _)) =>
        Some((i, NF.makeVarType(info.getSpan, n.asInstanceOf[Id])))
      case _ => None
    }
    val iv: Type => Type = liftSubstitution(Map[_InferenceVarType, Type](temp.toSeq:_*))
    val vi: Type => Type = liftSubstitution(Map[VarType, Type](temp.map(x =>(x._2, x._1)).toSeq:_*))
    val body = clearStaticParams(e)
    val ieB = vi(withBounds(body, sp))
    val ubConjuncts = (ia, sp).zipped.flatMap{
      case (i, SStaticParam(_, _,  _, _, p, _, _, _:KindType, _)) =>
        Some(upperBound(i, ta.meet(p.map(vi))))
      case _ => None
    }
    val c = and(List(negate(ta.equivalent(vi(body), BOTTOM)), negate(ta.equivalent(ieB, BOTTOM)), and(ubConjuncts)))
    val result = if (isFalse(c)) true else {
      val ds: List[CFormula] = Formula.reduce(c) match {
        case Or(cs) => cs.toList
        case x => List(x)
      }
      ds.forall(d => unify(d) match {
        case None => false
        case Some((_, ts, _, _)) =>
          val sub = iv compose ts compose vi
          boundsSubstitution(sub, sp) match {
            case None => false
            case Some(nsp) =>
              val nta = ta.extend(nsp, None)
              isTrue(nta.subtype(sub(body), BOTTOM))(nta)
          }
      })
    }
    if (probeDebug)
      System.out.println("@@PROBE BOUNDS\\t" + result + "\\t" + typeToString(ed) + "[" + sp + "]\\tc=" + c)
    result
  }

  /* The meet of two existential domains, renamed apart and not reduced, is empty by
   * emptyWithBounds. */
  def meetEmptyWithBounds(x: Type, y: Type): Boolean = {
    val ax = alphaRenameTypeSchema(x, ta.env)
    val ay = alphaRenameTypeSchema(y, ta.env)
    val xp = getStaticParams(ax)
    val yp = getStaticParams(ay)
    if (xp.isEmpty && yp.isEmpty) return false
    emptyWithBounds(insertStaticParams(makeIntersectionType(Set(clearStaticParams(ax), clearStaticParams(ay))), xp ++ yp))
  }
'''
    edits = [("""  def emptyED(ed: Type): Boolean =
    !getStaticParams(ed).isEmpty &&
    isFalse(negate(ta.equivalent(replaceTypeParametersWithInferenceVariables(ed), BOTTOM)))
""",
              """  def emptyED(ed: Type): Boolean =
    !getStaticParams(ed).isEmpty &&
    isFalse(negate(ta.equivalent(replaceTypeParametersWithInferenceVariables(ed), BOTTOM)))
""" + helper)]
    if glob:
        edits.append(("""    val ieNotBottom = negate(ta.equivalent(ie, BOTTOM))
    val c = and(ieNotBottom, ub)
""",
                      """    // PROBE (global): the constraint reads the bounds of the static parameters
    val ieNotBottom = and(negate(ta.equivalent(ie, BOTTOM)), negate(ta.equivalent(vi(withBounds(clearStaticParams(e), sp)), BOTTOM)))
    val c = and(ieNotBottom, ub)
"""))
    if keepvar:
        edits.append(("""        case Some(b) if !b.isEmpty => NF.makeMaybeIntersectionType(toJavaList(b))""",
                      """        case Some(b) if !b.isEmpty => NF.makeIntersectionType(toJavaList(v :: b))   // PROBE (keepvar)"""))
    t = edit(t, edits, "TypeSchemaAnalyzer.scala (bounds)")
    io.open(os.path.join(out, "TypeSchemaAnalyzer.scala"), "w", encoding="utf-8").write(t)
    print("shadow (ii) written: %s%s" % (os.path.join(out, "TypeSchemaAnalyzer.scala"),
                                        " (global: reduceED reads the bounds too)" if glob else ""))
    rel = os.path.join(SRC, "overloading/OverloadingOracle.scala")
    t = io.open(rel, encoding="utf-8").read()
    t = edit(t, [("""    val md = sa.meetED(fd, gd)
    sa.subtypeED(md, BOTTOM) || sa.emptyED(md)
""",
                  """    val md = sa.meetED(fd, gd)
    // PROBE (bounds): or the meet, read with the static parameters' bounds, is empty
    sa.subtypeED(md, BOTTOM) || sa.emptyED(md) || sa.meetEmptyWithBounds(fd, gd)
""")], "OverloadingOracle.scala (bounds)")
    io.open(os.path.join(out, "OverloadingOracle.scala"), "w", encoding="utf-8").write(t)
    print("shadow (ii) written: %s" % os.path.join(out, "OverloadingOracle.scala"))
