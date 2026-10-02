/*******************************************************************************
    Copyright 2009,2011, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.scala_src.typechecker.impls

import com.sun.fortress.compiler.Types
import com.sun.fortress.compiler.WellKnownNames
import com.sun.fortress.compiler.index._
import com.sun.fortress.exceptions._
import com.sun.fortress.exceptions.InterpreterBug.bug
import com.sun.fortress.exceptions.StaticError.errorMsg
import com.sun.fortress.nodes._
import com.sun.fortress.nodes_util.{ExprFactory => EF}
import com.sun.fortress.nodes_util.{NodeFactory => NF}
import com.sun.fortress.nodes_util.{NodeUtil => NU}
import com.sun.fortress.nodes_util.Span
import com.sun.fortress.scala_src.nodes._
import com.sun.fortress.scala_src.useful.Lists._
import com.sun.fortress.scala_src.useful.Options._
import com.sun.fortress.scala_src.useful.SExprUtil._
import com.sun.fortress.scala_src.useful.SNodeUtil._
import com.sun.fortress.scala_src.useful.STypesUtil._
import com.sun.fortress.scala_src.typechecker._
import com.sun.fortress.exceptions.StaticError
import com.sun.fortress.useful.{HasAt, NI}
import com.sun.fortress.repository.ProjectProperties
import com.sun.fortress.compiler.codegen.FnNameInfo
/**
 * Provides the implementation of cases relating to functionals and functional
 * application.
 *
 * This trait must be mixed in with an `STypeChecker with Common` instance
 * in order to provide the full type checker implementation.
 *
 * (The self-type annotation at the beginning declares that this trait must be
 * mixed into STypeChecker along with the Common helpers. This is what
 * allows this trait to implement abstract members of STypeChecker and to
 * access its protected members.)
 */
trait Functionals { self: STypeChecker with Common =>

  // ---------------------------------------------------------------------------
  // HELPER METHODS ------------------------------------------------------------

  /**
   * Signal a static error for an application for which there were no applicable
   * functions.
   */
  protected def noApplicableFunctions(application: Expr,
                                      fn: Expr,
                                      fnType: Type,
                                      argType: Type) = {
    val kind = fn match {
      case _:FnRef => "function"
      case _:OpRef => "operator"
      case _ => ""
    }
    val argTypeStr = normalize(argType) match {
      case tt:TupleType => tt.getElements.toString
      case ty => if (fn.isInstanceOf[OpRef]) "[" + ty + "]" else ty
    }
    val message = fn match {
      case fn:FunctionalRef =>
        val name = fn.getOriginalName
        val sargs = fn.getStaticArgs
        if (sargs.isEmpty)
          "Call to %s %s has invalid arguments, %s".format(kind, name, argTypeStr)
        else
          "Call to %s %s with static arguments %s has invalid arguments, %s".format(kind, name, sargs, argTypeStr)
      case _ =>
        "Expression of type %s is not applicable to argument type %s.".format(normalize(fnType), argTypeStr)
      }
      signal(application, message)
    }

  /** Given a single argument expr, break it into a list of args. */
  def getArgList(arg: Expr): List[Expr] = arg match {
    case STupleExpr(_, exprs, _, _, _) => exprs
    case _:VoidLiteralExpr => Nil
    case _ => List(arg)
  }


  /**
   * Given a list of arguments, partition it into a list of eithers, where Left is checked and Right
   * is unchecked.
   */
  def partitionArgs(args: List[Expr]): Option[List[Either[Expr, FnExpr]]] = {
    val partitioned = args.map(checkExprIfCheckable)
    if (partitioned.exists(_.fold(getType(_).isNone, x => false)))
      None
    else
      Some(partitioned)
  }

  /**
   * Get the full argument type from the partitioned list of args, filling in with the bottom
   * arrow.
   */
  def getArgType(args: List[Either[Expr, FnExpr]]): Type = getArgType(args, NF.typeSpan)

  /** Same as other but provides a location for the span on the new type. */
  def getArgType(args: List[Either[Expr, FnExpr]], span: Span): Type = {
    val argTypes = args.map {
      case Left(e) => getType(e).get
      case Right(_) => Types.BOTTOM_ARROW
    }
    NF.makeMaybeTupleType(span, toJavaList(argTypes))
  }

  /**
   * Given an arrow type, an expected type context, and a list of partitioned args (where Left is
   * checked and Right is an unchecked arg (usually an anonymous function)), determine if the arrow is applicable to these args.
   * This method will infer static arguments on the arrow and parameter types on any FnExpr args.
   * The result is an AppCandidate, which contains the inferred arrow type, the list of static
   * args that were inferred, and the checked arguments.
   */
  def checkApplicable(preCandidate: PreAppCandidate,
                      context: Option[Type],
                      args: List[Either[Expr, FnExpr]],
                      mOpName: Option[Op],
                      coerce: Boolean = false,
                      promote: Option[List[StaticArg]] = None)
                     (implicit errorFactory: ApplicationErrorFactory)
                      : Either[AppCandidate, OverloadingError] = {
    val arrow = preCandidate.arrow

    // Make sure all uncheckable args correspond to arrow type params.
    zipWithDomain(args, arrow.getDomain).foreach {
      case (Right(_), pt) if !possiblyArrows(pt, getStaticParams(arrow)) =>
        return Right(errorFactory.makeNotApplicableError(arrow, args))
      case _ =>
    }

    // Infer lifted static params.
    val argType = getArgType(args)
    /* If we are checking an operator we need to get the name of the overloading in order
     * to check if it is a parametric operator
     */
    val mOpNames = mOpName match {
      case Some(opName) => 
        // If we are checking an operator the overloading in preCandidate should be some
        val PreAppCandidate(_, Some(ovName), _) = preCandidate // DRC breakpoint
        Some((opName, ovName.getOriginalName.asInstanceOf[Op]))
      case None => None
    }
    // The op parameter corresponding to a parametric operator must be lifted
    val (liftedArrow, liftedSargs) =
      inferLiftedStaticParams(arrow, argType, mOpNames).getOrElse{
        return Right(errorFactory.makeNotApplicableError(arrow, args))
      }

    // Are there static params? i.e., do we need more inference?
    val candidateOrError =
      if (hasStaticParams(liftedArrow))
        if (coerce || promote.isDefined)
          checkApplicableWithCoercion(liftedArrow, preCandidate, context, args, promote)
        else
          checkApplicableWithInference(liftedArrow, preCandidate, context, args)
      else
        checkApplicableWithoutInference(liftedArrow, preCandidate, args)

    // If applicable, then inject the lifted static args into the result.
    candidateOrError.left.map { c =>
      AppCandidate(c.arrow, liftedSargs ++ c.sargs, c.args, c.overloading, c.fnl)
    }
  }

  /**
   * Check that the arrow type is applicable to these args with static argument
   * inference and no coercion.
   */
  def checkApplicableWithInference(
          arrow: ArrowType,
          preCandidate: PreAppCandidate,
          context: Option[Type],
          args: List[Either[Expr, FnExpr]])
          (implicit errorFactory: ApplicationErrorFactory)
           : Either[AppCandidate, OverloadingError] = {

    val originalArrow = preCandidate.arrow

    // Try to check the unchecked args, constructing a new list of
    // (checked, unchecked) arg pairs.
    def updateArgs(argsAndParam: (Either[Expr, FnExpr], Type))
                     : (Either[Expr, FnExpr], Option[BodyError]) = argsAndParam match {

      // This arg is checkable if there are no more inference vars
      // in the param type (which must be an arrow).
      case (Right(unchecked), paramType:ArrowType) =>
        if (hasInferenceVars(paramType.getDomain))
          (Right(unchecked), None)
        else {

          // Try to check the arg given this new expected type.
          inferFnExprParams(unchecked, paramType, false) match {
            // Move this arg out of unchecked and into checked.
            case Left(checked) => (Left(checked), None)
            // This arg might be checkable later, so keep going.
            case Right(bodyError) => (Right(unchecked), Some(bodyError))
          }

        }

      // If the parameter type is not an arrow, skip it.
      case (Right(unchecked), _) => (Right(unchecked), None)

      // Skip args that are already checked.
      case (Left(checked), _) => (Left(checked), None)
    }

    // Update all args until we have checked as much as possible.
    def recurOnArgs(args: List[Either[Expr, FnExpr]])
                    : Either[AppCandidate, OverloadingError] = {

      // Build the single type for all the args, inserting the least arrow
      // type for any that aren't checkable.
      val argType = getArgType(args)

      // Do type inference to get the inferred static args.
      val (resultArrow, sargs) =
        inferStaticParams(arrow, argType, context).getOrElse {
          return Right(errorFactory.makeNotApplicableError(originalArrow, args))
        }

      // Match up checked/unchecked args and param types and try to check the unchecked args,
      // constructing a new list of (checked, unchecked) arg pairs.
      val newArgsAndErrors = zipWithDomain(args, resultArrow.getDomain).
                               map(updateArgs)
      val (newArgs, maybeErrors) = (newArgsAndErrors).unzip

      // If progress was made, keep going. Otherwise return.
      if (newArgs.count(_.isRight) < args.count(_.isRight))
        recurOnArgs(newArgs)
      else {

        // If not all args were checked, gather the errors.
        if (newArgs.count(_.isRight) != 0) {
          return Right(makeOverloadingError(originalArrow,
                                            resultArrow.getDomain,
                                            newArgsAndErrors))
        }

        // If there are inference variables left, inform the user that there
        // wasn't enough context.  A size left unknown is an error only where it
        // reaches a type or a static argument of this call.
        if (hasInferenceVars(resultArrow) || hasSizeInferenceVars(sargs)) {
          val unfixedSize =
            if (hasSizeInferenceVars(sargs) && !hasInferenceVars(resultArrow.getDomain))
              Some(AppCandidate(resultArrow,
                                sargs,
                                newArgs.map(_.left.get),
                                preCandidate.overloading,
                                preCandidate.fnl))
            else None
          return Right(errorFactory.makeNoContextError(originalArrow, sargs, unfixedSize))
        }

        // We've reached a fixed point and all args are checked!
        Left(AppCandidate(resultArrow,
                          sargs,
                          newArgs.map(_.left.get),
                          preCandidate.overloading,
                          preCandidate.fnl))
      }
    }

    // Do the recursion to check the args.
    recurOnArgs(args)
  }

  /**
   * Check that the arrow type is applicable to these args with static argument
   * inference and coercion. The static args are inferred from the args whose
   * parameter types mention a static parameter other than as the whole type,
   * and from the context. A type parameter that is the whole type of a
   * parameter and appears in no other parameter type takes the narrowest type,
   * under the coercion chapter's no-less-specific relation, among its args'
   * types, the types they coerce to, its declared bound and the intersection
   * of its upper bounds (its declared bound, Any if none, and what the context
   * requires), that each of its args is substitutable for; where numerals
   * alone fix it and no one type is narrowest, the numerals are read as ZZ32
   * (ZZ64 or ZZ by magnitude). Every
   * arg is then admitted against the instantiated parameter type by subtyping
   * or by a coercion. With `promote`, the static args inference by subtyping
   * found: only a type parameter they bind to a union is chosen again.
   */
  def checkApplicableWithCoercion(
          arrow: ArrowType,
          preCandidate: PreAppCandidate,
          context: Option[Type],
          args: List[Either[Expr, FnExpr]],
          promote: Option[List[StaticArg]])
          (implicit errorFactory: ApplicationErrorFactory)
           : Either[AppCandidate, OverloadingError] = {
    def notApplicable = Right(errorFactory.makeNotApplicableError(preCandidate.arrow, args))
    if (args.exists(_.isRight)) return notApplicable
    val checked = args.map(_.left.get)
    val params = getStaticParams(arrow).filter(!_.isLifted)
    // The order in which inferStaticParams returns the static args.
    val order = params.filter(_.getDominatesClause.isEmpty) ++ params.filterNot(_.getDominatesClause.isEmpty)
    val names: Set[IdOrOp] = params.map(_.getName).toSet
    val typeNames: Set[IdOrOp] = params.filter(_.getKind.isInstanceOf[KindType]).map(_.getName).toSet
    def mentioned(t: Type): Set[IdOrOp] = {
      var found = Set[IdOrOp]()
      object finder extends Walker {
        override def walk(node: Any): Any = node match {
          case n: VarType if names(n.getName) => found += n.getName; node
          case n: IntRef if names(n.getName) => found += n.getName; node
          case _ => super.walk(node)
        }
      }
      finder(t); found
    }
    def bare(d: Type): Option[IdOrOp] = d match {
      case v: VarType if typeNames(v.getName) => Some(v.getName)
      case _ => None
    }
    val positions = zipWithDomain(checked.map(e => normalize(getType(e).get)), arrow.getDomain)
    val numerals = zipWithDomain(checked, arrow.getDomain).map(p => isNumeral(p._1))
    val fixedElsewhere = positions.filter(p => bare(p._2).isEmpty).flatMap(p => mentioned(p._2)).toSet
    val chosen = positions.flatMap(p => bare(p._2)).distinct.filterNot(fixedElsewhere)
    def valueOf(sargs: List[StaticArg], n: IdOrOp): Option[Type] =
      order.zip(sargs).collectFirst { case (sp, STypeArg(_, _, t)) if sp.getName == n => t }
    def own(n: IdOrOp): List[(Type, Expr)] =
      positions.zip(checked).collect { case ((t, d), e) if bare(d) == Some(n) &&
        !t.isInstanceOf[BottomType] && !hasInferenceVars(t) => (t, e) }
    // The types a chosen parameter may take: its args' types, the types they
    // coerce to, and its declared bound. None leaves it to its upper bounds.
    def named(n: IdOrOp): List[Type] = {
      val ts = own(n).map(_._1)
      val bound = params.find(_.getName == n).toList.
                    flatMap(sp => toListFromImmutable(sp.getExtendsClause)).
                    filter(b => b.isInstanceOf[TraitType] && mentioned(b).isEmpty &&
                                !Set("Object", "Any")(b.asInstanceOf[TraitType].getName.getText))
      (ts ++ ts.flatMap(coercions.getCoercionTargetsFrom(_)) ++ bound).distinct
    }
    val choices: List[List[Option[Type]]] = chosen.map { n =>
      promote match {
        case Some(sargs) => valueOf(sargs, n) match {
          case Some(_: UnionType) => None :: named(n).map(Some(_))
          case v => List(v)
        }
        case None => None :: named(n).map(Some(_))
      }
    }
    if (promote.isDefined && !chosen.exists(n => valueOf(promote.get, n).exists(_.isInstanceOf[UnionType])))
      return notApplicable
    val combos = choices.foldRight(List(List[Option[Type]]())) { (cs, acc) => for (c <- cs; m <- acc) yield c :: m }
    if (combos.size > 64) return notApplicable
    def attempt(combo: List[Option[Type]]): Option[AppCandidate] = {
      val pick = Map(chosen.zip(combo): _*)
      // Only the positions that fix a static parameter by subtyping, the
      // chosen types and the context constrain the inference.
      val tys = positions.map { case (a, d) => bare(d) match {
        case Some(n) => pick.getOrElse(n, None)
        case None => if (mentioned(d).isEmpty) None else Some(a)
      }}
      def constraint(inf: ArrowType, ops: Map[Op, Op]): CFormula =
        Formula.and(context.map(c => analyzer.subtype(inf.getRange, c)).toList ++
                    zipWithDomain(tys, inf.getDomain).collect { case (Some(t), d) => analyzer.subtype(t, d) })
      val (resultArrow, sargs) =
        inferStaticParamsHelper(arrow, constraint, false, true, true).getOrElse(return None)
      if (hasInferenceVars(resultArrow) || hasSizeInferenceVars(sargs)) return None
      val newArgs = zipWithDomain(checked, resultArrow.getDomain).map { case (e, p) =>
        if (isSubtype(getType(e).get, p)) e else coercions.buildCoercion(e, p).getOrElse(return None)
      }
      if (!isSubtype(getArgType(newArgs.map(e => Left(e): Either[Expr, FnExpr])), resultArrow.getDomain)) return None
      Some(AppCandidate(resultArrow, sargs, newArgs, preCandidate.overloading, preCandidate.fnl))
    }
    val found = combos.flatMap(attempt(_))
    def noWider(a: AppCandidate, b: AppCandidate) = chosen.forall { n =>
      (valueOf(a.sargs, n), valueOf(b.sargs, n)) match {
        case (Some(s), Some(t)) => coercions.noLessSpecific(s, t)
        case _ => false
      }
    }
    def narrowest(cs: List[AppCandidate]) = cs.find(a => cs.forall(noWider(a, _)))
    narrowest(found).orElse {
      // A parameter that numerals alone fix, with no one type narrowest: the
      // numerals are read as ZZ32, or as ZZ64 or ZZ by magnitude.
      val byNumerals = chosen.filter(n => own(n).nonEmpty && own(n).forall(p => isNumeral(p._2)))
      if (byNumerals.isEmpty) None
      else {
        val readings = byNumerals.map(n => numeralReading(own(n).map(_._2)))
        if (readings.exists(_.isEmpty)) None
        else narrowest(found.filter(c => byNumerals.zip(readings.map(_.get)).forall { case (n, r) =>
                 valueOf(c.sargs, n).exists(coercions.substitutableFor(r, _)) }))
      }
    } match {
      case Some(c) => Left(c)
      case None => notApplicable
    }
  }

  /** Whether the expression is a numeral, or a size used as a value, which the checker types as one. */
  def isNumeral(e: Expr): Boolean = getType(e) match {
    case Some(t) => Formula.isTrue(analyzer.equivalent(t, Types.INT_LITERAL))
    case None => false
  }

  /**
   * The type numerals are read as when nothing narrower fixes them: ZZ32, or
   * ZZ64 or ZZ when a numeral's value does not fit; the supertype or coercion
   * target of the numeral type with that name.
   */
  def numeralReading(es: List[Expr]): Option[Type] = {
    val big = es.collect { case l: IntLiteralExpr => l.getIntVal }
    val name =
      if (big.forall(v => v.bitLength < 32)) "ZZ32"
      else if (big.forall(v => v.bitLength < 64)) "ZZ64"
      else "ZZ"
    (analyzer.ancestors(Types.INT_LITERAL).toList.collect { case t: TraitType => t } ++
     coercions.getCoercionTargetsFrom(Types.INT_LITERAL)).find(_.getName.getText == name)
  }

  /**
   * Check that the arrow type is applicable to these args without any static
   * argument inference. The resulting args may have coercions.
   */
  def checkApplicableWithoutInference(
          arrow: ArrowType,
          preCandidate: PreAppCandidate,
          args: List[Either[Expr, FnExpr]])
          (implicit errorFactory: ApplicationErrorFactory)
           : Either[AppCandidate, OverloadingError] = {
    
    val originalArrow = preCandidate.arrow

    // Gather up either-args and option-errors.
    val newArgsAndErrors = zipWithDomain(args, arrow.getDomain).map {

      // If `checked` is a subtype of the param type, use it. Otherwise, try to
      // build a coercion to the param type and use that. If it does not coerce
      // to the param type, this is a NotApplicableError.
      case (Left(checked), paramType) =>
        if (isSubtype(getType(checked).get, paramType))
          (Left(checked), None)
        else coercions.buildCoercion(checked, paramType) match {
          case Some(coercion) => (Left(coercion), None)
          case None =>
            return Right(errorFactory.makeNotApplicableError(originalArrow, args))
        }

      // For each unchecked FnExpr arg, try to infer its parameter type and
      // check it. We don't need to add coercions because arrow types don't have them.
      case (Right(unchecked), paramType:ArrowType) =>
        inferFnExprParams(unchecked, paramType, true).
          fold(checked => (Left(checked), None),
               err => (Right(unchecked), Some(err)))

      // Unchecked FnExpr arg with a non-arrow parameter type -- error.
      case (Right(unchecked), _) =>
        return Right(errorFactory.makeNotApplicableError(originalArrow, args))
    }

    // Make sure that all the args were checked. If any remain unchecked, gather
    // up all the inference errors into an overloading error.
    val (newArgs, maybeErrors) = arrow.getDomain match {
          case _:AnyType => (args, None)
          case _ => (newArgsAndErrors).unzip
        }
    if (newArgs.count(_.isRight) != 0) {
      Right(makeOverloadingError(originalArrow,
                                 arrow.getDomain,
                                 newArgsAndErrors))
    } else {

      // We need to make sure there are the right number of args for the domain.
      // Now that coercions are in place, we can simply check if the new arg
      // type is a subtype of the domain type.
      val argType = getArgType(newArgs)
      if (isSubtype(argType,arrow.getDomain) && (newArgs.size == args.size))
        Left(AppCandidate(arrow,
                          Nil,
                          newArgs.map(_.left.get),
                          preCandidate.overloading,
                          preCandidate.fnl))
      else
        Right(errorFactory.makeNotApplicableError(originalArrow, args))
    }
  }

  /**
   * Try to infer the parameter type on the given unchecked FnExpr. This will
   * check the expression, then return either the checked expression (possibly
   * applying a coercion) or a BodyError on failure.
   */
  def inferFnExprParams(unchecked: FnExpr,
                        paramType: ArrowType,
                        doCoercion: Boolean)
                       (implicit errorFactory: ApplicationErrorFactory)
                        : Either[Expr, BodyError] = {

    // Try to check the arg given this new expected type.
    val domain = paramType.getDomain
    val expectedArrow = NF.makeArrowType(NU.getSpan(paramType),
                                         domain,
                                         Types.ANY)
    val tryChecker = STypeCheckerFactory.makeTryChecker(this)
    val result : Option[Expr] =
      if (doCoercion)
        // Coercion is applied since we are passing in a type.
        tryChecker.tryCheckExpr(unchecked, expectedArrow)
      else
        // Coercion is NOT applied since we are passing in an option type.
        tryChecker.tryCheckExpr(unchecked, Some(expectedArrow))

    result match {
      case Some(checked) => Left(checked)
      case None =>
        Right(errorFactory.makeBodyError(unchecked,
                                         domain,
                                         tryChecker.getError.get))
    }
  }

  /**
   * Make an overloading error that collects up errors from uncheckable
   * arguments, or makes a NotApplicableError.
   */
  def makeOverloadingError(originalArrow: ArrowType,
                           infDomain: Type,
                           newArgsAndErrors: List[(Either[Expr, FnExpr], Option[BodyError])])
                          (implicit errorFactory: ApplicationErrorFactory)
                           : OverloadingError = {
    // For each unchecked arg, get its body error if it had one. If it did
    // not but the parameter type was an arrow, it is a parameter
    // inference error. Otherwise it is a not applicable error.
    val argsErrorsParams = zipWithDomain(newArgsAndErrors, infDomain)
    val fnErrors = argsErrorsParams flatMap {
      case ((Right(_), Some(bodyError)), _) => Some(bodyError)

      // If the parameter type is an inference variable or an arrow, then a
      // parameter could have been inferred but wasn't.
      case ((Right(unchecked), None), _:_InferenceVarType) =>
        Some(errorFactory.makeParameterError(unchecked))
      case ((Right(unchecked), None), _:ArrowType) =>
        Some(errorFactory.makeParameterError(unchecked))

      // If the parameter type was not one of those, then there is no FnExpr
      // parameter that could have made this applicable.
      case ((Right(_), None), _) =>
        return errorFactory.makeNotApplicableError(originalArrow, newArgsAndErrors.map(_._1))

      case ((Left(_), _), _) => None
    }
    errorFactory.makeFnInferenceError(originalArrow, fnErrors)
  }

  /**
   * Type check the application of the given arrow candidates to the given arg.
   * This returns the statically applicable candidates (with their corresponding
   * inferred static args and updated arguments) with the most specific one at
   * the head. The resulting AppCandidates will contain the single arg as a
   * singleton list.
   */
  def checkApplication(preCandidates: List[PreAppCandidate],
                       arg: Expr,
                       context: Option[Type],
                       fallBackWithoutContext: Boolean)
                      (implicit errorFactory: ApplicationErrorFactory)
                       : Option[List[AppCandidate]] =
    typedApplicationOfArg(preCandidates, arg, context, fallBackWithoutContext).map(_._1)

  /** checkApplication with the call's type beside the candidates. */
  def typedApplicationOfArg(preCandidates: List[PreAppCandidate],
                            arg: Expr,
                            context: Option[Type],
                            fallBackWithoutContext: Boolean)
                           (implicit errorFactory: ApplicationErrorFactory)
                            : Option[(List[AppCandidate], Type)] = {

    // Check the application using the args extrapolated from arg.
    val args = getArgList(arg)
    typedApplication(preCandidates, args, context, None, fallBackWithoutContext) map { case (candidates, callType) =>

      // Combine the separated args back into a single arg in the resulting app
      // candidate.
      (candidates.map(_.mergeArgs(NU.getSpan(arg))), callType)
    }

  }

  /**
   * Type check the application of the given arrow candidates to the given args.
   * This returns the statically applicable candidates (with their corresponding
   * inferred static args and updated arguments) with the most specific one at
   * the head.
   *
   * The candidates are tried by subtyping without the context; failing that,
   * by subtyping with the context; failing that, with coercion and the
   * context; failing that, with coercion without it. So a candidate that fits
   * the call as it is is not passed over for one reached by coercion whose
   * result fits the context. An attempt by
   * subtyping counts only the candidates that fit without a coercion the call
   * needs, so that when none does, the attempt with coercion ranks every
   * candidate applicable with coercion, generic or not, a generic one on its
   * declared domain. An attempt is kept when the most specific candidate's
   * result converts to the context, so that a coercion of the result still
   * applies. A call no attempt accepts takes the first attempt with the
   * context that holds a candidate, and with `fallBackWithoutContext` the first
   * without it, so that the refusal is reported where and as it is without it. A
   * candidate inferred by subtyping whose static args bind a type parameter to
   * a union is instantiated by the promotion instead, and is ranked on its
   * declared domain with the promotion's coercions uncounted. A call with no
   * most specific candidate is an error when coercions are in the tie, unless
   * the tie is a numeral's, which the numeral read as ZZ32 settles.
   */
  def checkApplication(preCandidates: List[PreAppCandidate],
                       iargs: List[Expr],
                       context: Option[Type],
                       mOpName: Option[Op] = None,
                       fallBackWithoutContext: Boolean = false)
                      (implicit errorFactory: ApplicationErrorFactory)
                       : Option[List[AppCandidate]] =
    typedApplication(preCandidates, iargs, context, mOpName, fallBackWithoutContext).map(_._1)

  /**
   * checkApplication with the call's type beside the candidates: the most
   * specific candidate's return type, or, for a tie among declarations without
   * static parameters that fit the call without coercion, in a family with no
   * declaration with static parameters, the intersection of the tied
   * candidates' return types. Such a tie arises where the argument's static
   * type sits between closed traits whose overlap other declarations cover;
   * the declaration that runs is below every tied one, and its return type
   * below each of theirs by the Return Type Rule.
   */
  def typedApplication(preCandidates: List[PreAppCandidate],
                       iargs: List[Expr],
                       context: Option[Type],
                       mOpName: Option[Op],
                       fallBackWithoutContext: Boolean)
                      (implicit errorFactory: ApplicationErrorFactory)
                       : Option[(List[AppCandidate], Type)] = {

    // Check all the checkable args and make sure they all have types.
    val args = partitionArgs(iargs).getOrElse(return None)

    // A candidate, with its declaration's arrow when it is compared on its
    // declared domain, and whether the promotion instantiated it.
    type Ranked = (AppCandidate, Option[ArrowType], Boolean)
    type Attempt = List[(Either[AppCandidate, OverloadingError], Option[ArrowType], Boolean)]
    def moreSpecific(a: Ranked, b: Ranked) = moreSpecificCandidate(a._1, b._1, a._2, b._2, a._3, b._3)
    def isUnion(sarg: StaticArg) = sarg match {
      case STypeArg(_, false, _: UnionType) => true
      case _ => false
    }
    def generic(pc: PreAppCandidate) = getStaticParams(pc.arrow).exists(!_.isLifted)

    // Filter the overloadings that are applicable, by subtyping or with
    // coercion. A candidate without static parameters is checked alike in
    // every attempt, so it is checked once.
    val plain = scala.collection.mutable.Map[Int, (Either[AppCandidate, OverloadingError], Option[ArrowType], Boolean)]()
    def applicable(ctx: Option[Type], coerce: Boolean): Attempt = preCandidates.zipWithIndex.map { case (pc, i) =>
      if (getStaticParams(pc.arrow).isEmpty)
        plain.getOrElseUpdate(i, (checkApplicable(pc, ctx, args, mOpName, coerce), None, false))
      else checkApplicable(pc, ctx, args, mOpName, coerce) match {
        case Left(c) if !coerce && c.sargs.exists(isUnion) =>
          checkApplicable(pc, ctx, args, mOpName, false, Some(c.sargs.filter(!_.isLifted))) match {
            case Left(promoted) => (Left(promoted), Some(pc.arrow), true)
            case _ => (Left(c), None, false)
          }
        case Left(c) if coerce && generic(pc) => (Left(c), Some(pc.arrow), false)
        case e => (e, None, false)
      }
    }
    def candidatesOf(es: Attempt): List[Ranked] = es.collect { case (Left(c), d, p) => (c, d, p) }
    // A coercion the call needs, not one the promotion introduced.
    def counted(c: Ranked) = !c._3 && c._1.args.exists(_.isInstanceOf[CoercionInvocation])
    // An attempt by subtyping holds the candidates that fit the call without a
    // coercion it needs; an attempt with coercion holds all it finds.
    def holds(es: Attempt, coerce: Boolean) =
      if (coerce) candidatesOf(es).nonEmpty else candidatesOf(es).exists(!counted(_))
    def paramTypes(c: Ranked) = zipWithDomain(c._1.args, c._1.arrow.getDomain).map(_._2)
    def sameTypes(a: List[Type], b: List[Type]) =
      a.size == b.size && a.zip(b).forall(p => Formula.isTrue(analyzer.equivalent(p._1, p._2)))
    // The candidates no other candidate is more specific than.
    def minimal(cs: List[Ranked]) = cs.filter(c => !cs.exists(d => !(d eq c) && moreSpecific(d, c)))
    val groundFamily = preCandidates.forall(pc => getStaticParams(pc.arrow).isEmpty)
    // The type of a tie among declarations without static parameters that fit
    // the call as it is, in a family without static parameters.
    def tieType(top: List[Ranked]): Option[Type] =
      if (groundFamily && top.size > 1 && !top.exists(counted) &&
          top.forall(c => c._2.isEmpty && !c._3 && c._1.sargs.isEmpty) &&
          !top.forall(c => sameTypes(paramTypes(c), paramTypes(top.head))))
        Some(analyzer.meet(top.map(_._1.arrow.getRange)))
      else None
    def callType(cs: List[Ranked]): Type =
      (if (groundFamily) tieType(minimal(cs)) else None).getOrElse(cs.sortWith(moreSpecific).head._1.arrow.getRange)
    def kept(es: Attempt, coerce: Boolean) = holds(es, coerce) && context.forall(c =>
      coercions.substitutableFor(callType(candidatesOf(es)), c))
    // Each attempt: whether it is given the context, whether it coerces, and
    // the attempt itself.
    val attempts: List[(Boolean, Boolean, () => Attempt)] =
      if (context.isDefined)
        List((false, false, () => applicable(None, false)), (true, false, () => applicable(context, false)),
             (true, true, () => applicable(context, true)), (false, true, () => applicable(None, true)))
      else List((true, false, () => applicable(None, false)), (true, true, () => applicable(None, true)))
    val tried = attempts.to(LazyList).map { case (withContext, coerce, a) => (withContext, coerce, a()) }
    val es = tried.find { case (_, coerce, a) => kept(a, coerce) }.map(_._3).getOrElse {
      // No attempt is kept: of the attempts with the context, or for a call
      // written f(x) of those without it, the first that holds a candidate,
      // whatever its result, and otherwise the first.
      val from = tried.filter(_._1 != (fallBackWithoutContext && context.isDefined))
      from.find { case (_, coerce, a) => holds(a, coerce) }.getOrElse(from.head)._3
    }
    val candidates = candidatesOf(es)
    val overloadingErrors = es.collect { case (Right(e), _, _) => e }

    // If there were no candidates, report errors.
    if (candidates.isEmpty) {
      errors.signal(errorFactory.makeApplicationError(overloadingErrors))
      return None
    }

    // Sort the arrows and instantiations to find the statically most
    // applicable. Then update each candidate's Overloading node.
    val sorted = candidates.sortWith(moreSpecific)

    // An overloading more specific than every candidate, whose size the call
    // does not fix, makes the call an error.
    val unfixed = overloadingErrors.filter {
      case NoContextError(_, _, Some(u)) => candidates.forall(c => moreSpecificCandidate(u, c._1, None, c._2, false, c._3))
      case _ => false
    }
    if (!unfixed.isEmpty) {
      errors.signal(errorFactory.makeApplicationError(unfixed))
      return None
    }

    // Ensure that the head is the most specific: the one candidate no other
    // is more specific than.
    val top = minimal(candidates)

    // A tie whose tied candidates differ only where the argument is a numeral:
    // each numeral is read as ZZ32 (ZZ64 or ZZ by magnitude), and the call
    // resolves as an argument of that type would, over every candidate: of
    // those the readings fit, the ones they fit without coercion first. At a
    // position whose declared type is a bare type parameter, a reading fits a
    // candidate compared on its declared arrow by that parameter's bound.
    def numeralTie(): Option[Ranked] = {
      val exprs = args.map(_.left.toOption)
      val n = exprs.size
      if (top.exists(c => paramTypes(c).size != n)) return None
      val tiedTypes = top.map(paramTypes)
      val differ = (0 until n).filter(i =>
        tiedTypes.exists(t => !Formula.isTrue(analyzer.equivalent(t(i), tiedTypes.head(i))))).toList
      if (differ.isEmpty || !differ.forall(i => exprs(i).exists(isNumeral))) return None
      val readings = (0 until n).toList.flatMap(i => exprs(i).filter(isNumeral).map(e => (i, numeralReading(List(e)))))
      if (readings.exists(_._2.isEmpty)) return None
      // The types a reading must fit at position i of a candidate.
      def targets(c: Ranked, i: Int, r: Type): List[Type] = {
        val bare = c._2.flatMap { d =>
          val sps = getStaticParams(d).filter(sp => !sp.isLifted && sp.getKind.isInstanceOf[KindType])
          zipWithDomain(args, d.getDomain).lift(i).map(_._2) match {
            case Some(v: VarType) => sps.find(_.getName == v.getName).map { sp =>
              object subst extends Walker {
                override def walk(node: Any): Any = node match {
                  case w: VarType if w.getName == v.getName => r
                  case _ => super.walk(node)
                }
              }
              toListFromImmutable(sp.getExtendsClause).map(b => subst(b).asInstanceOf[Type])
            }
            case _ => None
          }
        }
        bare.getOrElse(List(paramTypes(c)(i)))
      }
      def fitsBy(c: Ranked, rel: (Type, Type) => Boolean) = readings.forall { case (i, r) =>
        targets(c, i, r.get).forall(t => rel(r.get, t)) }
      val fits = candidates.filter(fitsBy(_, coercions.substitutableFor))
      val unconverted = fits.filter(fitsBy(_, (r, t) => isSubtype(r, t)))
      val among = if (unconverted.nonEmpty) unconverted else fits
      among.filter(c => !among.exists(d => !(d eq c) && moreSpecific(d, c))) match {
        case List(c) => Some(c)
        case _ => None
      }
    }

    val head: Option[Ranked] =
      if (top.size == 1) top.headOption
      // A tie among candidates that fit the call as it is, or among candidates
      // with one parameter type, keeps the sort's head.
      else if (top.isEmpty || !top.exists(counted) ||
               top.forall(c => sameTypes(paramTypes(c), paramTypes(top.head)))) sorted.headOption
      else numeralTie().orElse {
        signalAmbiguity(top.map(c => c._2.getOrElse(c._1.arrow)), args)
        return None
      }
    Some((head.toList.map(_._1) ++ sorted.filterNot(c => head.exists(_ eq c)).map(_._1),
          tieType(top).getOrElse(head.getOrElse(sorted.head)._1.arrow.getRange)))
  }

  /** Signal that no candidate of a call with coercion is more specific than every other. */
  private def signalAmbiguity(tied: List[ArrowType], args: List[Either[Expr, FnExpr]])
                             (implicit errorFactory: ApplicationErrorFactory): scala.Unit = {
    val app = errorFactory.app
    if (app == null) {
      errors.signal(errorFactory.makeApplicationError(Nil))
      return
    }
    val kind = app match {
      case S_RewriteFnApp(_, f: FunctionalRef, _) => "call to function %s".format(f.getOriginalName)
      case _: _RewriteFnApp => "function application"
      case o: OpExpr => "call to operator %s".format(o.getOp.getOriginalName)
      case m: MethodInvocation => "method invocation %s.%s".format(errorFactory.recvrType.getOrElse(""), m.getMethod)
      case o: SubscriptExpr => "call to subscript operator %s.%s".format(errorFactory.recvrType.getOrElse(""), o.getOp.unwrap)
      case _ => "call"
    }
    signal(app, "Ambiguous coercion in %s: of the declarations applicable to an argument of type %s only by coercion, none is more specific than every other: %s.".
                format(kind, normalize(getArgType(args)), tied.map(_.toString).mkString("; ")))
  }

  /**
   * Given a receiver type and a method name, return the list of all the arrow types for each
   * method overloading. Ignores any arrows that were for getters or setters.
   */
  def getCandidatesForMethod(recvrType: Type,
                             name: IdOrOp,
                             sargs: List[StaticArg],
                             loc: HasAt): Option[List[PreAppCandidate]] = {
    def noGetterSetter(m: Method): Option[Method] = m match {
      case g:FieldGetterMethod => None
      case s:FieldSetterMethod => None
      case m => Some(m)
    }
    val methods = findMethodsInTraitHierarchy(name, recvrType).toList.flatMap(noGetterSetter)
    var arrowsAndSchemataAndMethods = methods.flatMap{ m =>
      (makeArrowFromFunctional(m), makeArrowFromFunctional(m.originalMethod)) match {
        case (Some(s), Some(t)) => Some((s,t,m))
        case _ => None
      }
    }
    // Make sure all of the functions had return types declared or inferred
    // TODO: This could be handled more gracefully
    if (arrowsAndSchemataAndMethods.size != methods.size) {
      signal(loc, "The return type for %s could not be inferred".format(name))
      return None
    }

    // Instantiate the arrows if you were given static args
    if (!sargs.isEmpty) {
      arrowsAndSchemataAndMethods = arrowsAndSchemataAndMethods.
        flatMap(a => staticInstantiationForApp(sargs, a._1).
            map(x => (x.asInstanceOf[ArrowType],a._2, a._3)))
    }

    // Methods have no Overloading nodes.
    Some(arrowsAndSchemataAndMethods.map(a => PreAppCandidate(a._1, 
        Some(SOverloading(a._1.getInfo, name, name, Some(a._1), Some(a._2))), Some(a._3))))
  }

  /**
   * Given an applicand, return the list of all arrow type candidates for each
   * overloading.
   */
  def getCandidatesForFunction(fn: Expr, loc: HasAt): Option[List[PreAppCandidate]] = {
    TypeError.b1(fn);
    val fnType = getType(fn).getOrElse(return None)
    if (!isArrows(fnType)) {
      signal(loc, "Applicand has a type that is not an arrow: %s".format(normalize(fnType)))
      return None
    }
    Some(fn match {
      case f:FunctionalRef =>
        toListFromImmutable(f.getNewOverloadings).map { ov =>
          // The fn has already been type checked, so each overloading has an
          // arrow type.
          val arrow = ov.getType.get.asInstanceOf[ArrowType]
          PreAppCandidate(arrow, Some(ov), None) //DRC break here, None is wrong
        }
      case _ =>
        conjuncts(fnType).toList.map { t =>
          val arrow = t.asInstanceOf[ArrowType]
          PreAppCandidate(arrow, None, None) //DRC break here, None is wrong
        }
    })
  }

  // ---------------------------------------------------------------------------
  // CHECK IMPLEMENTATION ------------------------------------------------------

  def checkFunctionals(node: Node): Node = node match {

    case SOverloading(info, unambigName, origName, _, _) => {
      val checkedName = check(unambigName).asInstanceOf[IdOrOp]

      // Should have one arrow type for this unambiguous name.
      getTypeFromName(checkedName) match {
        case Some(arrow: ArrowType) =>
          SOverloading(info, checkedName, origName, Some(arrow), Some(arrow))
        case Some(typ) =>
          bug("type env binds unambiguous name %s to non-arrow type %s".format(unambigName, typ))
        case None => node
      }
    }

    case _ => throw new Error(errorMsg("not yet implemented: ", node.getClass))
  }

  // ---------------------------------------------------------------------------
  // CHECKEXPR IMPLEMENTATION --------------------------------------------------

  def checkExprFunctionals(expr: Expr,
                           expected: Option[Type]): Expr = expr match {

    case SSubscriptExpr(SExprInfo(span, paren, _), obj, subs, Some(op), sargs) => {
      val checkedObj = checkExpr(obj)
      val recvrType = getType(checkedObj).getOrElse(return expr)
      val preCandidates = getCandidatesForMethod(recvrType, op, sargs, expr).getOrElse(return expr)
      if (preCandidates.isEmpty) {
        signal(new NoSuchMethod(expr, recvrType))
        return expr
      }
      implicit val errorFactory =
        new ApplicationErrorFactory(expr,
                                    Some(recvrType),
                                    preCandidates.length > 1)

      // Type check the application to get the checked candidates.
      val (candidates, callType) =
        typedApplication(preCandidates, subs, expected, None, false).getOrElse(return expr)

      // We only care about the most specific one.
      val AppCandidate(bestArrow, bestSargs, bestSubs, _, _), _ = candidates.head
      val newSargs = if (sargs.isEmpty) bestSargs.filter(!_.isLifted) else sargs

      // Rewrite the new expression with its type and checked args.
      SSubscriptExpr(SExprInfo(span, paren, Some(callType)),
                     checkedObj,
                     bestSubs,
                     Some(op),
                     newSargs)
    }

    case SMethodInvocation(SExprInfo(span, paren, _), obj, method, sargs, arg, _, _) =>{
      val checkedObj = checkExpr(obj)
      val recvrType = getType(checkedObj).getOrElse(return expr)
      val preCandidates = getCandidatesForMethod(recvrType, method, sargs, expr).getOrElse(return expr)
      if (preCandidates.isEmpty) {
        signal(new NoSuchMethod(expr, recvrType))
        return expr
      }
      implicit val errorFactory =
        new ApplicationErrorFactory(expr,
                                    Some(recvrType),
                                    preCandidates.length > 1)

      // Type check the application.
      val (candidates, callType) =
        typedApplicationOfArg(preCandidates, arg, expected, false).getOrElse(return expr)

      // We only care about the most specific one. We know the args pattern
      // match succeeds because all app candidates generated for method
      // invocations include only a single arg.
      val AppCandidate(bestArrow, bestSargs, List(bestArg), Some(bestOver), bestFnl) = candidates.head
      val newSargs = if (sargs.isEmpty) bestSargs.filter(!_.isLifted) else sargs

      if (bestFnl.isNone) {
         signal(expr, errorMsg("Method Invocation best Fnl is none"))
      }
      val modifiedSchema = Some(new FnNameInfo(bestFnl.get.asInstanceOf[DeclaredMethod].originalMethod, null).normalizedSchema(bestOver.getSchema.get));

      // Rewrite the new expression with its type and checked args.
      SMethodInvocation(SExprInfo(span, paren, Some(callType)),
                        checkedObj,
                        method,
                        newSargs,
                        bestArg,
                        Some(bestArrow),
                        modifiedSchema)
    }

    case fn@SFunctionalRef(_, sargs, _, name, _, _, overloadings, _, _) => {
      // Error if this is a getter
      val thisEnv = getRealName(name, toListFromImmutable(current.ast.getImports)) match {
        case id@SIdOrOpOrAnonymousName(_, Some(api)) => getEnvFromApi(api)
        case _ => env
      }
      thisEnv.getMods(name) match {
        case Some(mods) =>
          if (mods.isGetter) {
            signal(expr,
                   errorMsg("Getter " + name + " must be called with the field reference syntax."))
            return expr
          }
        case _ =>
      }

      // Note that ExprDisambiguator inserts the explicit static args from a
      // FunctionalRef into each of its Overloadings.

      // Check all the overloadings and filter out any that have the wrong
      // number or kind of static parameters.
      var hadNoType = false
      def rewriteOverloading(o: Overloading): Option[Overloading] = {
        o match {
        case ov@SOverloading(_, _, _, Some(ty), _) if sargs.isEmpty => Some(ov)

        case SOverloading(info, name, origName, Some(ty), schema) =>
          staticInstantiation(sargs, ty).map { t =>
            SOverloading(info, name, origName, Some(t.asInstanceOf[ArrowType]), schema)
          }

        case _ => hadNoType = true; None
      }}
      def checkOverloading(o: Overloading): Option[Overloading] = Some(check(o).asInstanceOf[Overloading])
      //def checkOverloading(o: Overloading): Overloading = check(o).asInstanceOf[Overloading]

      val justcheckedOverloadings = overloadings.flatMap(checkOverloading)
      val checkedOverloadings = justcheckedOverloadings.flatMap(rewriteOverloading)

      // If there are no overloadings, we cannot continue type checking. If any
      // of the overloadings failed to get a type
      if (checkedOverloadings.isEmpty) {
        if (!hadNoType) {
          signal(expr, errorMsg("Wrong number or kind of static arguments for function: ",
                                name))
        }
        return expr
      }

      // Make the intersection type of all the overloadings.
      val overloadingTypes = checkedOverloadings.map(_.getType.unwrap)
      val intersectionType = NF.makeMaybeIntersectionType(toJavaList(overloadingTypes))
      // val intersectionType = analyzer.meet(overloadingTypes)
      
      addType(addOverloadings(fn, checkedOverloadings, false), intersectionType)
    }

    case app @ S_RewriteFnApp(SExprInfo(span, paren, _), fn, arg) => {
      val checkedFn = checkExpr(fn)
      val preCandidates = getCandidatesForFunction(checkedFn, expr).getOrElse(return expr)
      implicit val errorFactory =
        new ApplicationErrorFactory(expr,
                                    None,
                                    preCandidates.length > 1)

      // Type check the application.
      val (candidates, callType) =
        typedApplicationOfArg(preCandidates, arg, expected, true).getOrElse(return expr)

      // We know the arg pattern match succeeds because all app candidates
      // generated for functions include a single arg.
      // is method not None?
      val AppCandidate(bestArrow, bestSargs, List(bestArg),
                       opt_overloading, fnl) = candidates.head
      // Believe that fnl will be useless here, must do lookup instead below

      // Rewrite the applicand to include the arrow and unlifted static args
      // and update the application.
      val newFn = rewriteApplicand(checkedFn, candidates, false)
      val info = SExprInfo(span, paren, Some(callType))

      newFn match {
        // Detect FnApp that is really method application with implicit self,
        // and rewrite it to a MethodInvocation.  We do this *after* typechecking
        // to work around a certain amount of bogosity in the treatment of self
        // in object expressions [self refers to the intersection of supertypes,
        // and therefore doesn't include any locally-defined methods unless they
        // implement or override superclass methods].
        // TODO: is method overloading going to cause this pattern match to fail?
      case SFnRef(exprInfo@
              SExprInfo(span, paren,
                      Some(SArrowType(typeInfo, dom, rng, effect, io,
                              Some(mi@SMethodInfo(selfType, selfPos))))),
                              staticArgs, _, origName: Id,
                              names, iOverloadings, newOverloadings, overloadingType, overloadingSchema) if selfPos == -1 =>
        val selfRef = checkExpr(EF.makeVarRef(span, "self"))
        if (opt_overloading.isSome()) {
            val ov = opt_overloading.get.getUnambiguousName()
            val xxx = env.lookup(ov).get.fnIndices
            if (ProjectProperties.DEBUG_METHOD_TAGGING) 
               System.err.println(xxx);
            if (xxx.size != 1) {
                signal(expr, "Lookup for " + ov + " for method invocation failed");
            }
        } else {
            if (ProjectProperties.DEBUG_METHOD_TAGGING) 
                System.err.println("No overloading seen for " + expr)
            signal(expr, "No overloading for for method invocation ");
        }

        val declaredMethod = env.lookup(opt_overloading.get.getUnambiguousName()).get.fnIndices.head
        // Not happy about passing null for defaultApi, but don't think it is necessary for schema normalization
        val modifiedSchema = Some(new FnNameInfo(declaredMethod, null).normalizedSchema(overloadingSchema.get));
        
        val res : MethodInvocation =
          SMethodInvocation(info, selfRef, origName, staticArgs, bestArg,
                  overloadingType, modifiedSchema)
                  // System.err.println(span+": app of "+checkedFn+
                  //                    "\n  selfType="+selfType+
                  //                    "\n  self: "+getType(selfRef)+
                  //                    "\n  REWRITTEN TO: "+res.toStringReadable())
                  res
      case _ =>
          S_RewriteFnApp(info, newFn, bestArg)
      }
    }

    case app @ SOpExpr(SExprInfo(span, paren, _), op, args) => {
      val checkedOp = checkExpr(op).asInstanceOf[FunctionalRef]
      val preCandidates = getCandidatesForFunction(checkedOp, expr).getOrElse(return expr)
      val opName = checkedOp.getOriginalName.asInstanceOf[Op]
      implicit val errorFactory = new ApplicationErrorFactory(expr, None, preCandidates.length > 1)

      // Type check the application.
      val (candidates, callType) = typedApplication(preCandidates, args, expected, Some(opName), false).
                         getOrElse(return expr)
      val AppCandidate(bestArrow, bestSargs, bestArgs, _, _) = candidates.head

      // Rewrite the applicand to include the arrow and static args
      // and update the application.
      val newOp = rewriteApplicand(checkedOp, candidates, false).asInstanceOf[FunctionalRef]
      SOpExpr(SExprInfo(span, paren, Some(callType)), newOp, bestArgs)
    }

    case SFnExpr(SExprInfo(span, paren, _),
                 SFnHeader(a, b, c, d, e, f, tempParams, declaredRetType), body) => {
      // If expecting an arrow type, use its domain to infer param types.
      val (params, expectedRetType) = expected match {
        case Some(arrow:ArrowType) =>
          (addParamTypes(arrow.getDomain, tempParams).getOrElse(tempParams), Some(arrow.getRange))
        case _ => (tempParams, None)
      }

      val bodyType = declaredRetType.orElse(expectedRetType)

      // Make sure all params have a type.
      val domain = makeDomainType(params).getOrElse {
        signal(expr, "Could not determine all parameter types of function expression.")
        return expr
      }

      val checkedBody = bodyType match {
        // If there is a declared return type, use it.
        case Some(typ) =>
          this.extend(params).checkExpr(body,
                                         typ,
                                         errorString("Function body",
                                                     "declared return"))
        case None =>
          this.extend(params).checkExpr(body)
      }

      val range = declaredRetType.getOrElse(getType(checkedBody).getOrElse(return expr))
      val arrow = NF.makeArrowType(span, domain, range)
      val newHeader = SFnHeader(a, b, c, d, e, f, params, Some(range))
      SFnExpr(SExprInfo(span, paren, Some(arrow)), newHeader, checkedBody)
    }

    case SCaseExpr(SExprInfo(span, paren, _), param, compare, equalsOp, inOp,
                   clauses, elseClause) => {
      var newClauses =
          clauses.map(c => c match {
                      case SCaseClause(info, matchE, body, op) =>
                        SCaseClause(info, checkExpr(matchE),
                                    checkExpr(body).asInstanceOf[Block],
                                    op.map(checkExpr).asInstanceOf[Option[FunctionalRef]])})
      var checkedExprs =
          newClauses.flatMap(c => c match {
                             case SCaseClause(_,m,b,Some(o)) => List(m,b,o)
                             case SCaseClause(_,m,b,None) => List(m,b)})
      def handleExpr(e: Expr) = {
        val newE = checkExpr(e)
        checkedExprs ::= newE
        newE
      }
      val newParam = param.map(handleExpr)
      val newCompare = compare.map(handleExpr).asInstanceOf[Option[FunctionalRef]]
      val newEquals = handleExpr(equalsOp).asInstanceOf[FunctionalRef]
      val newIn = handleExpr(inOp).asInstanceOf[FunctionalRef]
      val newElse = elseClause.map(handleExpr).asInstanceOf[Option[Block]]
      // Check that subexpressions all typechecked properly
      if (!haveTypes(checkedExprs)) return expr
      var body_types: List[Type] = newClauses.map(c => getType(c.getBody).get)
      newParam match {
        // Handle regular (non-extremum) case expressions
        case Some(p) =>
          // During inference, we'll try to apply the given compare op
          // (if there is one) and otherwise try equals and in.
          def checkCaseClause(c: CaseClause): CaseClause = c match {
            case SCaseClause(info@SASTNodeInfo(span), matchE, block, _) =>
              val args = List(p, c.getMatchClause)
              def checkOp(op: FunctionalRef): FunctionalRef = {
                val preCandidates = getCandidatesForFunction(op, expr).getOrElse(return op)

                // Type check the application without reporting an error.
                implicit val errorFactory = DummyApplicationErrorFactory
                val checker = STypeCheckerFactory.makeDummyChecker(this)
                val candidates =
                  checker.checkApplication(preCandidates, args, Some(Types.BOOLEAN))
                         .getOrElse(return op)

                // Rewrite the applicand to include the arrow and static args
                // and update the application.
                rewriteApplicand(op, candidates, false).asInstanceOf[FunctionalRef]
              }
              newCompare match {
                // If compare is some, we use that operator
                case Some(op) => SCaseClause(info, matchE, block, Some(checkOp(op)))
                case None =>
                  // Check both = and IN operators
                  // we first want to do <: generator test.
                  // If both are sat, we use =, if only IN is sat, we use IN
                  def isContainsSubtype(t: Type): Boolean =
                    if (WellKnownNames.areCompilerLibraries())
                      isSubtype(t, Types.makeGeneratorZZ32Type(span))
                                // Types.makeGeneratorType(NF.make_InferenceVarType(span)))
                    else t match {
                      case tt: TraitType => (self.analyzer.ancestors(tt) + tt).exists(Types.isContainsType(_))
                      case _ => false
                    }
                  val isG_match = isContainsSubtype(getType(matchE).get)
                  val isG_cond = isContainsSubtype(getType(p).get)
                  val newOp = if (isG_match && !isG_cond) Some(checkOp(newIn))
                              else Some(checkOp(newEquals))
                  SCaseClause(info, matchE, block, newOp)
              }
          }
          newClauses = newClauses.map(checkCaseClause)
          newElse.foreach(body_types ::= getType(_).get)
        // Extremum expressions: case most < of ... end
        case None =>
          val match_types =
              newClauses.map(c => getType(c.getMatchClause).get)
          val unionTy = self.analyzer.join(match_types)
          val opName = newCompare.get.getOriginalName.asInstanceOf[Op]
          isSubtype(unionTy,
                    Types.makeTotalOperatorOrder(unionTy, opName), expr,
                    "In an extremum expression, the union of all candidate " +
                    "types must be a subtype of TotalOperatorOrder[\\union," +
                    "<,<=,>=,>," + opName + "\\] but it is not.  " +
                    "The union is " + unionTy + ".")
      }
      val newTy = self.analyzer.join(body_types)
      SCaseExpr(SExprInfo(span, paren, Some(newTy)), newParam, newCompare, newEquals,
                newIn, newClauses, newElse)
    }

    case _ => throw new Error(errorMsg("Not yet implemented: ", expr.getClass))
  }

}
