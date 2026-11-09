/*******************************************************************************
    Copyright 2009,2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.scala_src.typechecker

import com.sun.fortress.compiler.index._
import com.sun.fortress.compiler.Types
import com.sun.fortress.nodes_util.NumeralNumbers
import com.sun.fortress.exceptions.CompilerError
import com.sun.fortress.exceptions.InterpreterBug.bug
import com.sun.fortress.nodes._
import com.sun.fortress.nodes_util.{ExprFactory => EF}
import com.sun.fortress.nodes_util.{NodeFactory => NF}
import com.sun.fortress.nodes_util.{NodeUtil => NU}
import com.sun.fortress.scala_src.nodes._
import com.sun.fortress.scala_src.overloading.OverloadingOracle
import com.sun.fortress.scala_src.typechecker.Formula._
import com.sun.fortress.scala_src.typechecker.staticenv.KindEnv
import com.sun.fortress.scala_src.types.TypeAnalyzer
import com.sun.fortress.scala_src.types.TypeAnalyzerUtil
import com.sun.fortress.scala_src.useful.ASTGenHelper._
import com.sun.fortress.scala_src.useful.Iterators._
import com.sun.fortress.scala_src.useful.ErrorLog
import com.sun.fortress.scala_src.useful.Lists._
import com.sun.fortress.scala_src.useful.Options._
import com.sun.fortress.scala_src.useful.PartialOrder
import com.sun.fortress.scala_src.useful.Sets._
import com.sun.fortress.scala_src.useful.SExprUtil._
import com.sun.fortress.scala_src.useful.SNodeUtil._
import com.sun.fortress.scala_src.useful.STypesUtil._

class CoercionOracle(traits: TraitTable,
                     current: CompilationUnitIndex)
                    (implicit analyzer: TypeAnalyzer) {
  
  /** A coercion index and its arrow type with lifted params instantiated. */
  type LiftedCoercion = (Coercion, ArrowType, ArrowType)

  /**
   * Create the Id for an invocation of a coercion to trait U. If the trait's
   * name is Oof which is an imported alias of Foo from API A, then the coercion
   * name will include "Foo" instead of "Oof". In any case, if the trait was
   * imported explicitly (e.g. not via ellipsis), this coercion name will be
   * qualified.
   */
  def makeCoercionId(u: TraitType): Id = {
    val realTraitName = getRealName(u.getName, toListFromImmutable(current.ast.getImports))
    NF.makeLiftedCoercionId(NU.getSpan(u), realTraitName.asInstanceOf[Id])
  }

  /**
   * Get the most specific type out of a set of types under the `moreSpecific`
   * relation.
   */
  def mostSpecific(cs: Set[Type]): Option[Type] = {
    if (cs.isEmpty) {
      bug("Attempt to find the most specific type in an empty set")
    }
    else {
      var result: Option[Type] = None
      for (c <- cs ; if result.isEmpty || moreSpecific(c, result.get)) {
        result = Some(c)
      }
      result
    }
  }

  /** The `moreSpecific` relation; no less specific and unequal. */
  def moreSpecific(t: Type, u: Type): Boolean =
    noLessSpecific(t, u) && !isTrue(analyzer.equivalent(t, u))

  /**
   * The `moreSpecific` relation on two declarations' arrows, compared on their
   * declared, quantified domains by subtyping, as the overloading oracle
   * compares declarations.
   */
  def moreSpecificDeclared(f: ArrowType, g: ArrowType): Boolean = {
    val oracle = new OverloadingOracle()(analyzer)
    oracle.lteq(f, g) && !oracle.lteq(g, f)
  }

  /** The `noLessSpecific` relation. */
  def noLessSpecific(t: Type, u: Type): Boolean =
    isTrue(analyzer.subtype(t, u)) ||
      (analyzer.definitelyExcludes(t, u) && coercesTo(t, u) && rejects(t, u))

  /** Determines if T rejects U. */
  def rejects(t: Type, u: Type): Boolean =
    getCoercionsTo(t).forall(ca => analyzer.definitelyExcludes(ca._2.getDomain, u))

  /** The set of all arrow types for coercions from types T to U. */
  def getCoercionsTo(uu: Type): Set[LiftedCoercion] = {
    val u =
      if (uu.isInstanceOf[TraitSelfType] &&
          uu.asInstanceOf[TraitSelfType].getNamed.isInstanceOf[TraitType])
        uu.asInstanceOf[TraitSelfType].getNamed.asInstanceOf[TraitType]
      else uu

    if (!u.isInstanceOf[TraitType]) return Set()

    // Get name and possible static args out of the type.
    val STraitType(_, name, sargs, _) = u

    // Get all the coercions from the type U.
    val coercions = toOption(traits.typeCons(name)) match {
      case Some(ti:TraitIndex) => toSet(ti.coercions)
      case None => Set()
    }

    // Get the instantiated coercion arrow.
    def instantiateArrow(c: Coercion): Option[LiftedCoercion] = {
      makeArrowFromFunctional(c).flatMap(arrow =>
        staticInstantiation(sargs,
                            arrow,
                            applyLifted = true,
                            applyUnlifted = false)
          .map(instArrow => (c, instArrow.asInstanceOf[ArrowType], arrow)))
    }

    // Get all the arrows that were found.
    coercions.flatMap(instantiateArrow)
  }

  /** Determines if T is substitutable for U. */
  def substitutableFor(t: Type, u: Type): Boolean =
    isTrue(analyzer.subtype(t, u)) || coercesTo(t, u)

  /**
   * The trait types without static parameters that define a coercion from T or
   * a supertype of T: the types T can be coerced to, found from T where
   * `getCoercionsTo` goes from the target.
   */
  def getCoercionTargetsFrom(t: Type): List[TraitType] =
    traits.coercingTraits.filter(_.staticParameters.isEmpty).flatMap { ti =>
      val arrows = toSet(ti.coercions).toList.flatMap(c => makeArrowFromFunctional(c))
      val sources = arrows.filter(a => !hasStaticParams(a)).map(_.getDomain)
      // A numeral's type reaches a coercion generic over its four numbers.
      def generic = Types.isNumeralType(t) &&
        arrows.exists(a => hasStaticParams(a) && Types.isNumeralType(a.getDomain) &&
                           inferStaticParams(a, t, None).isDefined)
      if (sources.exists(s => isTrue(analyzer.subtype(t, s))) || generic) toOption(ti.typeOfSelf).flatMap(getTraitType)
      else None
    }

  /**
   * Determine if T is substitutable for U. If T <: U, then return Some(None).
   * If T ~~> U and expr given, then return Some(Some(c)) where c is the
   * coercion of expr to type U. If T ~~> U and expr not given, then return
   * Some(None). Otherwise, return None.
   */
  def checkSubstitutable(t: Type,
                         u: Type,
                         expr: Option[Expr])
                         : Option[Option[CoercionInvocation]] = {
    if (isTrue(analyzer.subtype(t, u)))
      Some(None)
    else
      checkCoercion(t, u, expr)
  }

  /** Determines if T ~~> U. */
  def coercesTo(t: Type, u: Type): Boolean = checkCoercion(t, u, None).isSome

  /**
   * The prefix minus of the type U applied to an expression of type U, checked;
   * the type checker that owns this oracle sets it.
   */
  var negator: (Expr, Type) => Option[Expr] = (_, _) => None

  /**
   * Determines if e:T ~~> U and if so returns the FnRefs for that coercion.
   * A numeral outside the range of U, one of the library's bounded number
   * types, has none. A numeral has no sign: at a program's own type a
   * negative constant is the type's own prefix minus on the coercion of the
   * numeral as written, and a folded static expression reaches no coercion
   * from the numeral types (its default does, through defaultFits).
   */
  def buildCoercion(e: Expr, u: Type): Option[Expr] =
    if (NumeralConversion.outOfRange(e, u).isDefined) None
    else (e, u) match {
      // A tuple that holds a numeral converts element by element where it
      // stands: no numeral value exists to bind to a variable at run time.
      case (STupleExpr(SExprInfo(span, paren, _), es, None, Nil, inApp), STupleType(_, us, None, Nil))
          if es.size == us.size && es.exists(NumeralConversion.isNumeral) =>
        val nes = es.zip(us).map { case (x, t) =>
          if (getType(x).exists(xt => isTrue(analyzer.subtype(xt, t)))) Some(x) else buildCoercion(x, t) }
        if (nes.forall(_.isDefined)) Some(STupleExpr(SExprInfo(span, paren, Some(u)), nes.map(_.get), None, Nil, inApp))
        else None
      case _ => buildNonTuple(e, u)
    }

  private def buildNonTuple(e: Expr, u: Type): Option[Expr] =
    NumeralNumbers.of(e) match {
      case nn if nn != null && !NumeralConversion.libraryTarget(u) && nn.kind == NumeralNumbers.Kind.STATIC => None
      case nn if nn != null && !NumeralConversion.libraryTarget(u) && nn.kind == NumeralNumbers.Kind.NEGATED =>
        val pos = NumeralConversion.positive(e)
        checkCoercion(getType(pos).get, u, Some(pos)).flatMap(o => o).flatMap(c => negator(c, u))
      case _ => checkCoercion(getType(e).get, u, Some(e)).flatMap(o => o)
    }

  /**
   * The refusal of a numeral at a program's own type that declares a
   * coercion from its numeral type: one whose where clause the numeral's four
   * numbers do not meet, and a negative constant at a type without a prefix
   * minus.
   */
  def numeralRefusal(e: Expr, u: Type): Option[String] = (NumeralNumbers.of(e), u) match {
    case (nn, ut: TraitType) if nn != null && nn.kind != NumeralNumbers.Kind.STATIC && !NumeralConversion.libraryTarget(u) =>
      val pos = if (nn.kind == NumeralNumbers.Kind.NEGATED) NumeralConversion.positive(e) else e
      val t = getType(pos).get
      val inferred = getCoercionsTo(u).toList.flatMap(lc => inferStaticParams(lc._2, t, None).map(a => (lc._1, a._2)))
      if (inferred.nonEmpty && inferred.forall(p => !whereHolds(p._1, p._2)))
        Some("The numeral %s does not meet the where clause of the coercion to %s.".format(e.asInstanceOf[Expr] match {
          case i: IntLiteralExpr => i.getIntVal.toString
          case f: FloatLiteralExpr => f.getText
          case _ => e.toString }, ut.getName.getText))
      else if (nn.kind == NumeralNumbers.Kind.NEGATED && inferred.exists(p => whereHolds(p._1, p._2)) &&
               checkCoercion(t, u, Some(pos)).flatMap(o => o).flatMap(c => negator(c, u)).isEmpty)
        Some("The numeral %s at %s needs a prefix minus on %s, which it does not declare.".format(e match {
          case i: IntLiteralExpr => i.getIntVal.toString
          case f: FloatLiteralExpr => f.getText
          case _ => e.toString }, ut.getName.getText, ut.getName.getText))
      else None
    case _ => None
  }

  /**
   * Whether the coercion's where clause holds at its own static arguments:
   * each comparison of sizes, as v < 256, computed exactly; any other
   * constraint is left to the checks that read it.
   */
  def whereHolds(c: Coercion, sargs: List[StaticArg]): Boolean = {
    val header = c.ast.getHeader
    val own = toListFromImmutable(header.getStaticParams).filter(!_.isLifted)
    if (own.size != sargs.size) return true
    val values: Map[String, java.math.BigInteger] = own.zip(sargs).flatMap {
      case (sp, SIntArg(_, _, b: IntBase)) => Some(sp.getName.getText -> b.getIntVal.getIntVal)
      case _ => None
    }.toMap
    def eval(x: IntExpr): Option[java.math.BigInteger] = Formula.foldSize(x) match {
      case b: IntBase => Some(b.getIntVal.getIntVal)
      case r: IntRef => values.get(r.getName.getText)
      case SIntBinaryOp(_, _, l, rr, op) => (eval(l), eval(rr)) match {
        case (Some(a), Some(b)) => op.getText match {
          case "+" => Some(a.add(b))
          case "-" => Some(a.subtract(b))
          case "^" => Some(a.pow(b.intValue))
          case _ => Some(a.multiply(b))
        }
        case _ => None
      }
      case _ => None
    }
    toOption(header.getWhereClause).toList.flatMap(w => toListFromImmutable(w.getConstraints)).forall {
      case SIntConstraint(_, l, r, op) => (eval(l), eval(r)) match {
        case (Some(a), Some(b)) =>
          val k = a.compareTo(b)
          op.getText match {
            case "<" => k < 0
            case "<=" => k <= 0
            case ">" => k > 0
            case ">=" => k >= 0
            case "=" => k == 0
            case _ => true
          }
        case _ => true
      }
      case _ => true
    }
  }

  /** Determines if T ~~> U and possibly builds a coercion. */
  private def checkCoercion(t: Type,
                            u: Type,
                            expr: Option[Expr])
                            : Option[Option[CoercionInvocation]] = (t, u) match {
    case (t:UnionType, _) => checkCoercionUnion(t, u, expr)
    case (_, u:TraitType) => checkCoercionTrait(t, u, expr)
    case (_, u:TraitSelfType) => checkCoercion(t, u.getNamed, expr)
    case (t:TupleType, u:TupleType) => checkCoercionTuple(t, u, expr)
    // one argument for a domain with varargs, as subtyping reads it
    case (_, u@STupleType(_, _, Some(_), _)) =>
      checkCoercion(t, TypeAnalyzerUtil.disjunctFromTuple(u, 1), expr)
    case (t:ArrowType, u:ArrowType) => checkCoercionArrow(t, u, expr)
    case _ => None
  }


  /*
   * The union of {T_i} coerces to U if all of the following hold:
   * - any of the T_i can be coerced to U
   * - the remaining T_i are substitutable for U
   * - the T_i all exclude each other
   */
  private def checkCoercionUnion(t: UnionType,
                                 u: Type,
                                 maybeArg: Option[Expr])
                                 : Option[Option[CoercionInvocation]] = {
    val SUnionType(_, telts) = t

    // Check that all of the T_i exclude.
    if (!isTrue(analyzer.allExclude(telts))) return None

    // Get all the possible coercions from T_i to U.
    val tiCoercions = telts.map(checkSubstitutable(_, u, maybeArg))

    // Check that all of them were at least substitutable.
    if (tiCoercions.exists(_.isNone)) return None

    // If there's an arg, build the coercion. Otherwise just say yes: Some(None).
    val arg = maybeArg.getOrElse(return Some(None))
    val info = SExprInfo(NU.getSpan(arg), false, Some(u))
    Some(Some(SUnionCoercionInvocation(info, u, arg, telts, tiCoercions.map(_.get))))
  }


  private def checkCoercionTrait(t: Type,
                                 u: TraitType,
                                 maybeArg: Option[Expr])
                                 : Option[Option[TraitCoercionInvocation]] = {
    // Make the dummy argument.
    val dummyArg = makeDummyFor(t)

    // Get a list of all the (coercion, arrow, inferred args, original arrow)
    // tuples that worked. The inferred args returned are only the unlifted
    // ones, as the lifted args are given in U.
    val liftedSargs = toListFromImmutable(u.getArgs)
    val allLiftedCoercions = getCoercionsTo(u)
    val coercionsAndArgs = allLiftedCoercions flatMap { liftedCoercion =>
      inferStaticParams(liftedCoercion._2, t, None).filter(a => whereHolds(liftedCoercion._1, a._2)) map { arrowAndSargs =>
        (liftedCoercion._1,
         arrowAndSargs._1,
         liftedSargs ++ arrowAndSargs._2, // Prepend the lifted static args.
         liftedCoercion._3)
      }
    }
    if (coercionsAndArgs.isEmpty) return None
    else if (maybeArg.isNone) return Some(None)
    val arg = maybeArg.get
    val argSpan = NU.getSpan(arg)

    // Build app candidates and sort them to find the SMA, in a linear
    // extension of the partial order moreSpecificCandidate.
    val built = coercionsAndArgs.map { caa => {
      if (false) {
          AppCandidate(caa._2, caa._3, List(arg), None, None)
      } else {
          // Trying to fake an overloading to see if we can get the schema right
          // So far this breaks things, but why?
          val caa_ast = caa._1.ast
          AppCandidate(caa._2, caa._3, List(arg),
                  Some(NF.makeOverloading(caa_ast.getInfo,
                       caa_ast.getUnambiguousName,
                       caa_ast.getHeader.getName,
                       Some(caa._2),
                       Some(caa._4))), None)
          }
      }
    }.toList
    val candidates = new PartialOrder[AppCandidate](built, (c1, c2) =>
      moreSpecificCandidate(c1, c2)(this)).linear
    val AppCandidate(bestArrow, bestSargs, _, bestOverload, bestFnl) = candidates.head
    val coercionId = makeCoercionId(u)
    
    // Make an overloading for each lifted coercion to U.
    val overloadings = coercionsAndArgs map { caa =>
      
      // Compute the name here using the import information, but use the span
      // from the original coercion decl.
      val coercionNameSpan = NU.getSpan(caa._1.ast.getUnambiguousName)
      val overloadingId = setSpan(coercionId, coercionNameSpan).asInstanceOf[Id]
      
      // Use coercionId as originalName -- no idea what the real name should be
      SOverloading(SSpanInfo(coercionNameSpan),
                   coercionId,
                   coercionId,
                   Some(caa._2),
                   Some(caa._4))
    }

    // Make a dummy functional ref.
    val fnRef = EF.makeFnRefHelpScala(argSpan,
                             false,
                             coercionId,
                             toJavaList(Nil),
                             toJavaList(overloadings),
                             toJavaList(overloadings),
                             bestOverload.get.getType,
                             bestOverload.get.getSchema)

    // Rewrite the FnRef so that it filters out dynamically unapplicable arrows.
    val newFnRef = rewriteApplicand(fnRef, candidates, true).asInstanceOf[FnRef]

    // Make the coercion invocation!
    Some(Some(STraitCoercionInvocation(SExprInfo(argSpan, false, Some(u)), arg, u, newFnRef)))
  }

  private def checkCoercionTuple(t: TupleType,
                                 u: TupleType,
                                 maybeArg: Option[Expr])
                                 : Option[Option[TupleCoercionInvocation]] = {
    val (x@STupleType(_, xelts, xvar, _), y@STupleType(_, yelts, yvar, _)) = (t, u)

    // 1. X is not a subtype of Y.
    if (isTrue(analyzer.subtype(x, y))) return None

    // 2. If X has more elts, then create the coercions for them.
    if (xelts.length > yelts.length) return None
    var xCoercionElts = (xelts, yelts).zipped.map { (xelt, yelt) =>
      val maybeDummy = maybeArg.map(_ => makeDummyFor(xelt))
      checkSubstitutable(xelt, yelt, maybeDummy)
    }

    // 3. Check for same number of plain types if neither have varargs.
    if (xelts.length != yelts.length && yvar.isNone) return None

    // 4. Check varargs types, possibly appending X's vararg to the coercions.
    val xCoercionVararg =
      if (xvar.isDefined && yvar.isDefined) {
        val maybeDummy = maybeArg.map(_ => makeDummyFor(xvar.get))
        Some(checkSubstitutable(xvar.get, yvar.get, maybeDummy))
      } else
        None

    // 5. Check that remainder of X is substitutable for Y's varargs.
    val xCoercionsMoreElts =
      if (yvar.isDefined)
        xelts.drop(yelts.length).map { xelt =>
          val maybeDummy = maybeArg.map(_ => makeDummyFor(xelt))
          checkSubstitutable(xelt, yvar.get, maybeDummy)
        }
      else
        Nil

    // Combine all the possible coercions.
    val xMaybeCoercions = xCoercionElts ++ xCoercionsMoreElts
    if (xMaybeCoercions.exists(_.isNone)) return None
    val coercions = xMaybeCoercions.map(_.get)

    // Peel out the vararg coercion, checking for failure.
    val varargCoercion = xCoercionVararg match {
      case Some(None) => return None // vararg coercion failed
      case Some(Some(oc)) => Some(oc)
      case None => None
    }

    // Are we building a coercion?
    if (maybeArg.isNone) return Some(None)
    val arg = maybeArg.get
    val argSpan = NU.getSpan(arg)

    // Make the tuple coercion.
    Some(Some(STupleCoercionInvocation(SExprInfo(argSpan, false, Some(u)),
                                       arg,
                                       u,
                                       coercions,
                                       varargCoercion)))
  }

  private def checkCoercionArrow(t: ArrowType,
                                 u: ArrowType,
                                 maybeArg: Option[Expr])
                                 : Option[Option[ArrowCoercionInvocation]] = {

    val (SArrowType(_, a, b, teff, _, _), SArrowType(_, d, e, ueff, _, _)) = (t, u)
    // Get throws types.
    val c = toOption(teff.getThrowsClause).map(toList[Type]).getOrElse(List[Type]())
    val f = toOption(ueff.getThrowsClause).map(toList[Type]).getOrElse(List[Type]())

    // 1. A -> B throws C is not a subtype of D -> E throws F
    if (isTrue(analyzer.subtype(t, u))) return None

    // 2. D substitutable for A
    val dummyD = maybeArg.map(_ => makeDummyFor(d))
    val domainCoercion = checkSubstitutable(d, a, dummyD).getOrElse(return None)

    // 3. B substitutable for E
    val dummyB = maybeArg.map(_ => makeDummyFor(b))
    val rangeCoercion = checkSubstitutable(b, e, dummyB).getOrElse(return None)

    // 4. for all X in C, there is a Y in F such that X is substitutable for Y
    if (!c.forall(x => f.exists(y => substitutableFor(x, y)))) return None

    // Are we building a coercion?
    if (maybeArg.isNone) return Some(None)
    val arg = maybeArg.get
    val argSpan = NU.getSpan(arg)

    // Build the invocation node.
    Some(Some(SArrowCoercionInvocation(SExprInfo(argSpan, false, Some(u)),
                                       arg,
                                       u,
                                       domainCoercion,
                                       rangeCoercion)))
  }

}

/**
 * A numeral's conversions as the checker reads them: its default type, where
 * nothing fixes a type, ZZ32, or ZZ64 or ZZ when its value does not fit, and
 * RR64 with a radix point; a coercion of a numeral into its default type,
 * which ranks as no coercion wherever it is built; and a numeral outside the
 * range of the library's bounded number type that its place fixes, which has
 * no conversion there.
 */
object NumeralConversion {

  /** Whether the place's type is one the library declares: a numeral converts there by its value. */
  def libraryTarget(u: Type): Boolean = u match {
    case t: TraitType => toOption(t.getName.getApiName).exists(a => libraryApis(a.getText))
    case t: TraitSelfType => libraryTarget(t.getNamed)
    case _ => true
  }

  /** The numeral as written under a negative constant's minus, typed by its own numeral type. */
  def positive(e: Expr): Expr = e match {
    case i@SIntLiteralExpr(SExprInfo(span, paren, _), text, v) =>
      val p = SIntLiteralExpr(SExprInfo(span, paren, None), text.substring(1), v.negate)
      SIntLiteralExpr(SExprInfo(span, paren, Some(Types.numeralType(span, NumeralNumbers.of(p)))), text.substring(1), v.negate)
    case f@SFloatLiteralExpr(SExprInfo(span, paren, _), text, i, n, b, p) =>
      val q = SFloatLiteralExpr(SExprInfo(span, paren, None), text.substring(1), i, n, b, p)
      SFloatLiteralExpr(SExprInfo(span, paren, Some(Types.numeralType(span, NumeralNumbers.of(q)))), text.substring(1), i, n, b, p)
    case _ => e
  }

  /** Whether the expression is a numeral, as written or as the fold made it. */
  def isNumeral(e: Expr): Boolean = e match {
    case _: IntLiteralExpr | _: FloatLiteralExpr => true
    case _ => false
  }

  /** The name of the default type of an integer numeral of this value. */
  def integerDefaultName(v: java.math.BigInteger): String = {
    val l = v.bitLength
    if (l < 32) "ZZ32" else if (l < 64) "ZZ64" else "ZZ"
  }

  /** The name of a numeral's default type. */
  def defaultName(e: Expr): Option[String] = e match {
    case i: IntLiteralExpr => Some(integerDefaultName(i.getIntVal))
    case _: FloatLiteralExpr => Some("RR64")
    case _ => None
  }

  /** Whether the expression is a coercion of a numeral into its own default type. */
  def isDefault(e: Expr): Boolean = e match {
    case c: TraitCoercionInvocation =>
      defaultName(c.getArg).exists(_ == c.getToType.getName.getText) && libraryType(c.getToType)
    case _ => false
  }

  /** Whether the coercion is one the call needs: not a numeral's conversion into its default. */
  def counts(e: Expr): Boolean = e.isInstanceOf[CoercionInvocation] && !isDefault(e)

  private val libraryApis = Set("CompilerBuiltin", "CompilerLibrary", "FortressBuiltin", "FortressLibrary")

  /** Whether the trait type is one the library declares, not a program's of the same name. */
  private def libraryType(t: TraitType): Boolean =
    toOption(t.getName.getApiName).forall(a => libraryApis(a.getText))

  private def big(n: Long) = java.math.BigInteger.valueOf(n)
  private val integerRanges: Map[String, (java.math.BigInteger, java.math.BigInteger)] = Map(
    "ZZ32" -> (big(Int.MinValue), big(Int.MaxValue)),
    "ZZ64" -> (big(Long.MinValue), big(Long.MaxValue)),
    "NN32" -> (java.math.BigInteger.ZERO, big(4294967295L)),
    "NN64" -> (java.math.BigInteger.ZERO, java.math.BigInteger.ONE.shiftLeft(64).subtract(java.math.BigInteger.ONE)))

  /**
   * The refusal of a numeral at a place of a bounded number type that cannot
   * hold it: an integer numeral outside ZZ32, ZZ64, NN32 or NN64, and a
   * numeral whose one rounding into RR64 or RR32 is an infinity.
   */
  def outOfRange(e: Expr, u: Type): Option[String] = outOfRangeAt(e, u).map(_._2)

  /**
   * The numeral that outOfRange refuses, the expression itself, an element of
   * a tuple at a tuple type, or a numeral in a result position of a join,
   * which converts where it stands (Functionals.joinInto); and the refusal.
   */
  def outOfRangeAt(e: Expr, u: Type): Option[(Expr, String)] = (e, u) match {
    case (STupleExpr(_, es, None, Nil, _), STupleType(_, us, None, Nil)) if es.size == us.size =>
      es.zip(us).flatMap { case (x, t) => outOfRangeAt(x, t) }.headOption
    case (SBlock(_, _, _, _, es), _) if es.nonEmpty => outOfRangeAt(es.last, u)
    case (SDo(_, List(front)), _) => outOfRangeAt(front, u)
    case (SIf(_, clauses, Some(els)), _) => (clauses.map(_.getBody) :+ els).flatMap(outOfRangeAt(_, u)).headOption
    case (SCaseExpr(_, _, _, _, _, clauses, els), _) =>
      (clauses.map(_.getBody) ++ els.toList).flatMap(outOfRangeAt(_, u)).headOption
    case (STry(_, body, catchC, _, None), _) =>
      val clauses = catchC.toList.flatMap { case SCatch(_, _, cs) => cs.map { case SCatchClause(_, _, b) => b } }
      (body :: clauses).flatMap(outOfRangeAt(_, u)).headOption
    case _ => numeralOutOfRange(e, u).map((e, _))
  }

  private def numeralOutOfRange(e: Expr, u: Type): Option[String] = (e, u) match {
    case (i: IntLiteralExpr, t: TraitType) if libraryType(t) =>
      val name = t.getName.getText
      val v = i.getIntVal
      integerRanges.get(name) match {
        case Some((lo, hi)) if v.compareTo(lo) < 0 || v.compareTo(hi) > 0 =>
          Some("The numeral %s is out of range for %s, whose values are %s to %s.".format(v, name, lo, hi))
        case Some(_) => None
        case None => roundsToInfinity(new java.math.BigDecimal(v), name).map(_ =>
          "The numeral %s rounds to infinity in %s.".format(v, name))
      }
    case (f: FloatLiteralExpr, t: TraitType) if libraryType(t) =>
      // The fraction is below one, so it does not carry the integer part past
      // the largest finite value's rounding boundary, an integer.
      roundsToInfinity(new java.math.BigDecimal(f.getIntPart), t.getName.getText).map(name =>
        "The numeral %s rounds to infinity in %s.".format(f.getText, name))
    case _ => None
  }

  private def roundsToInfinity(v: java.math.BigDecimal, name: String): Option[String] = name match {
    case "RR64" if v.doubleValue.isInfinite => Some(name)
    case "RR32" if v.floatValue.isInfinite => Some(name)
    case _ => None
  }
}
