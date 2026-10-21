"""Make the full-check shadow of the compiled overloading checker from the tracked source.

usage: checker-shadow.py <tree> <out-dir> [export] [catch] [emptybounds] [tupleindex]

Writes <out-dir>/OverloadingChecker.scala, a copy of the tree's
ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala in
which the checker's three loops (the top-level sets, the trait and object sets, and the
overridden-return check) read every symbolic operator: each `if isDeclaredName(f)` there
becomes `if isCheckedName(f)`, which admits every SOp and otherwise is isDeclaredName.
isDeclaredName itself, which the export check reads (ExportChecker.scala:275), is left
as it is, unless the third argument is `export`, which makes isDeclaredName admit every
SOp too (the export check's own skip, measured apart). With `catch`, each of the five
calls that check one name (the top-level set, the fancy rule, a trait's dotted and
functional methods, an overridden declaration's return type) is wrapped so that a
CompilerBug on that name prints `@@PROBE CRASH<tab>unit<tab>name<tab>message` and the check
goes on with the next name, so that one crash does not hide the rest of its unit.

Two further words write shadows of other checker files beside it, for the designs:
  emptybounds  TypeSchemaAnalyzer.scala: emptyED, which decides that the meet of two generic
               domains is empty, also reads the type parameters' bounds, as reduceED's own
               premise does (row 786: "its emptyED reads no bounds")
  tupleindex   TypeAnalyzer.scala: a tuple type whose elements are each a subtype of the
               library's trait Index is a subtype of Index, the "magic" of the team's text
               on the subscripts (Specification/appendices/future.tex:186-207)

Each edit must match exactly once; one that does not stops the script, so the shadow
cannot go stale silently. Compile the result with scalac ahead of ProjectFortress/build
(see run-shadow.sh beside this script).
"""
import io, os, sys

tree, out = sys.argv[1], sys.argv[2]
export = "export" in sys.argv[3:]
catch = "catch" in sys.argv[3:]
emptybounds = "emptybounds" in sys.argv[3:]
tupleindex = "tupleindex" in sys.argv[3:]
rel = "ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala"
t = io.open(os.path.join(tree, rel), encoding="utf-8").read()

edits = [
    ("for ( f <- toSet(functions) ; if isDeclaredName(f) ) {",
     "for ( f <- toSet(functions) ; if isCheckedName(f) ) {"),
    ("for (f <- toSet(methodsR.firstSet) ; if isDeclaredName(f) ) {",
     "for (f <- toSet(methodsR.firstSet) ; if isCheckedName(f) ) {"),
    ("for ((f, o, p, equal) <- overridden ; if isDeclaredName(f))",
     "for ((f, o, p, equal) <- overridden ; if isCheckedName(f))"),
    ("""    def isDeclaredName(f: IdOrOpOrAnonymousName) = f match {
        case SId(_,_,str) => IdentifierUtil.validId(str)
        case SOp(_,_,str,_,_) => NU.validOp(str)
        case _ => false
    }
""",
     """    def isDeclaredName(f: IdOrOpOrAnonymousName) = f match {
        case SId(_,_,str) => IdentifierUtil.validId(str)
        case SOp(_,_,str,_,_) => %s
        case _ => false
    }

    // PROBE: the full check reads every symbolic operator in the three loops
    def isCheckedName(f: IdOrOpOrAnonymousName) = f match {
        case SOp(_,_,_,_,_) => true
        case _ => isDeclaredName(f)
    }
""" % ("true" if export else "NU.validOp(str)")),
]
def guarded(call, unit):
    return ('try { %s } catch { case __e: com.sun.fortress.exceptions.CompilerBug => '
            'System.out.println("@@PROBE CRASH\\t" + %s + "\\t" + f + "\\t" + __e.getMessage.replace("\\n", " ")) }'
            % (call, unit))
if catch:
    for call, unit in [
        ("checkFunctionOverloading(kindAndName, f, set, globalOracle)", "kindAndName"),
        ("checkFancyRule(f, dFunctions, fMethods, globalOracle)", "kindAndName"),
        ("checkMethodOverloading(traitKindAndName, f, toMethodArrows(dottedMethods), oracle)", "traitKindAndName"),
        ("checkMethodOverloading(traitKindAndName, f, toFunctionalMethodArrows(functionalMethods, oracle), oracle)", "traitKindAndName"),
        ("checkOverridingReturnType(f, o, p, equal, oracle)", "traitKindAndName"),
    ]:
        edits.append((call, guarded(call, unit)))
for old, new in edits:
    n = t.count(old)
    assert n == 1, "%s: edit matches %d times: %s" % (rel, n, old[:70])
    t = t.replace(old, new, 1)
os.makedirs(out, exist_ok=True)
io.open(os.path.join(out, "OverloadingChecker.scala"), "w", encoding="utf-8").write(t)
print("shadow written: %s (export check %s; crashes %s)" % (os.path.join(out, "OverloadingChecker.scala"),
      "admits SOp" if export else "unchanged", "caught per name" if catch else "end the stage"))


def shadow(rel, edits, name):
    s = io.open(os.path.join(tree, rel), encoding="utf-8").read()
    for old, new in edits:
        n = s.count(old)
        assert n == 1, "%s: edit matches %d times: %s" % (rel, n, old[:70])
        s = s.replace(old, new, 1)
    io.open(os.path.join(out, name), "w", encoding="utf-8").write(s)
    print("shadow written: %s" % os.path.join(out, name))


if emptybounds:
    shadow("ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala", [(
"""  def emptyED(ed: Type): Boolean =
    !getStaticParams(ed).isEmpty &&
    isFalse(negate(ta.equivalent(replaceTypeParametersWithInferenceVariables(ed), BOTTOM)))
""",
"""  def emptyED(ed: Type): Boolean =
    !getStaticParams(ed).isEmpty && {
      // PROBE (emptybounds): reduceED's premise with its bounds, as reduceED builds them
      val spd = getStaticParams(ed)
      val e = insertStaticParams(ta.extend(spd, None).normalize(clearStaticParams(ed)), spd)
      val sp = getStaticParams(e)
      val ia = sp.map(s => NF.make_InferenceVarType(NU.getSpan(s)))
      val temp = (ia, sp).zipped.flatMap{
        case (i, SStaticParam(info, _, n, _, _, _, _, _, _)) =>
          Some((i, NF.makeVarType(info.getSpan, n.asInstanceOf[Id])))
        case _ => None
      }
      val vi: Type => Type = liftSubstitution(Map[VarType, Type](temp.map(x =>(x._2, x._1)).toSeq:_*))
      val ie = vi(clearStaticParams(e))
      val ubConjuncts = (ia, sp).zipped.flatMap{
        case (i, SStaticParam(_, _,  _, _, p, _, _, _:KindType, _)) =>
          Some(upperBound(i, ta.meet(p.map(vi))))
        case _ => None
      }
      isFalse(negate(ta.equivalent(replaceTypeParametersWithInferenceVariables(ed), BOTTOM))) ||
      isFalse(and(negate(ta.equivalent(ie, BOTTOM)), and(ubConjuncts)))
    }
""")], "TypeSchemaAnalyzer.scala")

if tupleindex:
    shadow("ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala", [(
"""    case (s@STupleType(_, e1, _, _), t) =>
      pOr(e1.map(pEqv(_, BOTTOM)))
""",
"""    // PROBE (tupleindex): a tuple of indices is an index
    case (s@STupleType(_, e1, None, _), t@STraitType(_, tn, targs, _))
        if tn.getText == "Index" && targs.isEmpty =>
      pOr(pOr(e1.map(pEqv(_, BOTTOM))), pAnd(e1.map(pSub(_, t))))
    case (s@STupleType(_, e1, _, _), t) =>
      pOr(e1.map(pEqv(_, BOTTOM)))
""")], "TypeAnalyzer.scala")
