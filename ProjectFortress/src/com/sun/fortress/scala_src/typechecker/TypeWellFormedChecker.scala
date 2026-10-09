/*******************************************************************************
    Copyright 2009,2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.scala_src.typechecker

import _root_.java.util.ArrayList
import com.sun.fortress.compiler.GlobalEnvironment
import com.sun.fortress.compiler.index.CompilationUnitIndex
import com.sun.fortress.compiler.index.TraitIndex
import com.sun.fortress.compiler.typechecker.StaticTypeReplacer
import com.sun.fortress.exceptions.StaticError
import com.sun.fortress.exceptions.TypeError
import com.sun.fortress.nodes._
import com.sun.fortress.scala_src.nodes._
import com.sun.fortress.scala_src.typechecker.Formula._
import com.sun.fortress.scala_src.types.TypeAnalyzer
import com.sun.fortress.scala_src.useful.Lists._
import com.sun.fortress.scala_src.useful.Options._

class TypeWellFormedChecker(compilation_unit: CompilationUnitIndex,
    globalEnv: GlobalEnvironment,
    typeAnalyzer: TypeAnalyzer) extends Walker {
  val errors = new ArrayList[StaticError]()
  var analyzer = typeAnalyzer

  def check() = {
    walk(compilation_unit.ast)
    errors
  }

  private def error(s:String, n:Node) = errors.add(TypeError.make(s,n))

  private val nn32Max = java.math.BigInteger.valueOf(4294967295L)
  private val zz32Min = java.math.BigInteger.valueOf(Int.MinValue.toLong)
  private val zz32Max = java.math.BigInteger.valueOf(Int.MaxValue.toLong)

  // A size, a literal or one computed from literals, outside the values of every kind its
  // parameters have: a nat parameter is an NN32 value and an int parameter a ZZ32 value.
  // No kinds known means either.  An operation on numerals that folding leaves uncomputed,
  // a power beyond Naming.sizeOp's exponent, is at least 2^4097, outside every kind.
  private def sizeOutOfRange(sarg: StaticArg, kinds: List[StaticParamKind]): Option[String] = {
    val nat = kinds.exists(_.isInstanceOf[KindNat])
    val int = kinds.exists(_.isInstanceOf[KindInt])
    def outOfRange(shown: String) =
      if (nat && !int)
        Some("The static argument " + shown + " is out of range for a nat parameter, whose values are those of NN32, 0 to 4294967295.")
      else if (int && !nat)
        Some("The static argument " + shown + " is out of range for an int parameter, whose values are those of ZZ32, -2147483648 to 2147483647.")
      else
        Some("The static argument " + shown + " is out of range for a nat parameter, whose values are those of NN32, and for an int parameter, whose values are those of ZZ32.")
    def uncomputed(e: IntExpr): Option[IntExpr] = e match {
      case b@SIntBinaryOp(_, _, _: IntBase, _: IntBase, _) => Some(b)
      case SIntBinaryOp(_, _, l, r, _) => uncomputed(l).orElse(uncomputed(r))
      case _ => None
    }
    sarg match {
      case SIntArg(_, _, e) if foldSize(e).isInstanceOf[IntBase] =>
        val v = foldSize(e).asInstanceOf[IntBase].getIntVal.getIntVal
        val fitsNat = v.signum >= 0 && v.compareTo(nn32Max) <= 0
        val fitsInt = v.compareTo(zz32Min) >= 0 && v.compareTo(zz32Max) <= 0
        if ((nat && fitsNat) || (int && fitsInt) || (!nat && !int && (fitsNat || fitsInt))) None
        else outOfRange(v.toString)
      case SIntArg(_, _, e) => uncomputed(foldSize(e)).flatMap(b => outOfRange(b.toString))
      case _ => None
    }
  }

  // The kinds of the static parameters at each position, from the declared schemas of a
  // checked reference; before type checking a reference has none, and its sizes wait.
  private def kindsAt(schemas: List[Type], n: Int): Option[List[List[StaticParamKind]]] = {
    val lists = schemas.map(t => toListFromImmutable(t.getInfo.getStaticParams)).filter(_.size == n)
    if (lists.isEmpty) None else Some(List.tabulate(n)(i => lists.map(_(i).getKind)))
  }

  private def walkStaticArgs(sargs: List[StaticArg], kinds: Option[List[List[StaticParamKind]]]) =
    sargs.zipWithIndex.foreach {
      case (a: IntArg, i) =>
        kinds.foreach(ks => sizeOutOfRange(a, ks(i)).foreach(m =>
          error("Ill-formed static argument: " + a + "\n    " + m, a)))
      case (a, _) => walk(a)
    }

  private def getTypes(typ:Id) = {
    val types = typ match {
      case SId(info,Some(name),text) =>
      globalEnv.api(name).typeConses.get(SId(info,None,text))
      case _ => compilation_unit.typeConses.get(typ)
    }
    if (types == null) error("Unknown type: " + typ, typ)
    types
  }

  override def walk(node:Any):Any = {
    node match {
      // Static parameters and where-clause variables may be introduced.
      // To Do: Check for the where-clause variables.
      case STypeAlias(_, _, sparams, typeDef) =>
        val oldAnalyzer = analyzer
        analyzer = analyzer.extend(sparams, None)
        walk(typeDef)
        analyzer = oldAnalyzer
      case STraitDecl(_,
                      STraitTypeHeader(sparams, _, _, where,
                                       throwsC, contract, extendsC,
                                       params, decls),
                      self, excludes, comprises, _) =>
        val oldAnalyzer = analyzer
        analyzer = analyzer.extend(sparams, where)
        walk(sparams); walk(where); walk(throwsC); walk(contract); walk(extendsC)
        walk(params); walk(decls); walk(self); walk(excludes); walk(comprises)
        analyzer = oldAnalyzer
      case SObjectDecl(_,
                       STraitTypeHeader(sparams, _, _, where,
                                        throwsC, contract, extendsC,
                                        params, decls),
                       self) =>
        val oldAnalyzer = analyzer
        analyzer = analyzer.extend(sparams, where)
        walk(sparams); walk(where); walk(throwsC); walk(contract); walk(extendsC)
        walk(params); walk(decls); walk(self)
        analyzer = oldAnalyzer
      case SFnDecl(_,
              SFnHeader(sparams, _, _, where,
                  throwsC, contract, params, returnType),
                  _, body, _) =>
        val oldAnalyzer = analyzer
        analyzer = analyzer.extend(sparams, where)
        walk(sparams); walk(where); walk(throwsC); walk(contract); walk(params)
        walk(returnType); walk(body)
        analyzer = oldAnalyzer

    // Check the well-formedness of types.
      case _:AnyType => // OK
      case _:BottomType => // OK
      case t@SVarType(_, name, _) =>
      if ( ! analyzer.env.contains(name) )
        error("Unbound type: " + name, t)
      case t@STraitSelfType(_, named, tys) => walk(named); tys.foreach(walk)
      case t@SObjectExprType(_, tys) => tys.foreach(walk)
      case t@STraitType(_, name, sargs, _) =>
      getTypes(name) match {
        case si:TraitIndex => // Trait name should be defined.
        // Static arguments should satisfy the corresponding bounds.
        val sparams = si.staticParameters
        if ( sargs.size == sparams.size ) {
          sargs.zip(toListFromImmutable(sparams)).foreach { case (a, p) =>
            sizeOutOfRange(a, List(p.getKind)).foreach(m => error("Ill-formed type: " + t + "\n    " + m, t)) }
          val replacer = new StaticTypeReplacer(sparams, toJavaList(sargs))
          def wfStaticArgs(pair:(StaticArg,StaticParam)) =
            for ( bound <- toListFromImmutable(pair._2.getExtendsClause);
            if pair._1.isInstanceOf[TypeArg] ) {
              val new_bound = replacer.replaceIn(bound)
              if ( ! isTrue(analyzer.subtype(pair._1.asInstanceOf[TypeArg].getTypeArg,
                  new_bound))(analyzer))
                error("Ill-formed type: " + t +
                    "\n    The static argument " + pair._1 +
                    " does not satisfy the corresponding bound " + new_bound + ".", t)
            }
          sargs.zip(toListFromImmutable(sparams)).foreach(wfStaticArgs)
        } else error("Ill-formed type: " + t +
            "\n    The numbers of the static parameters and " +
            "the static arguments do not match.", t)
        case _ => error("Unbound type: " + name, t)
      }
      // Keyword parameters are not yet supported...
      case STupleType(_, elements, varargs, keywords) =>
      elements.foreach(walk)
      varargs match {
        case Some(ty) => walk(ty)
        case _ =>
      }
      // Effects are not yet supported...
      case SArrowType(_, domain, range, effect, io, _) => walk(domain); walk(range)
      case SIntersectionType(_, elements) => elements.foreach(walk)
      case SUnionType(_, elements) => elements.foreach(walk)
      case _:LabelType => // OK
      case _:DimBase => // OK
      case a:IntArg =>
        sizeOutOfRange(a, Nil).foreach(m => error("Ill-formed static argument: " + a + "\n    " + m, a))
      case SFunctionalRef(_, args, _, _, _, _, newOverloadings, _, schema) if !args.isEmpty =>
        val schemas = newOverloadings.flatMap(o => toOption(o.getSchema).toList) ++ schema.toList
        walkStaticArgs(args, kindsAt(schemas, args.size))
      case SFunctionalRef(_, args, _, _, _, _, _, _, _) =>
        // Only the static arguments are written at the reference site.  The two
        // overloading lists and the overloading type are assembled by overload
        // resolution out of the declared types of every functional of this name in
        // the environment, and a generic declaration contributes its own static
        // parameters free: they are not in this compilation unit's kind environment,
        // so checking them here either reports them unbound or fails the kind-env
        // lookup outright.  Each declaration is checked where it is declared.
        walk(args)
      case SMethodInvocation(_, getObj, getMethod, getStaticArgs, getArg, getOverloadingType, getOverloadingSchema) =>
        walk(getObj)
        walk(getMethod)
        walkStaticArgs(getStaticArgs, kindsAt(getOverloadingSchema.toList, getStaticArgs.size))
        walk(getArg)
        walk(getOverloadingType)
      case SOverloading(_, _, _, t, _) => walk(t)
        
      // Nodes with subnodes we want to ignore.
      case SCaseExpr(getInfo, getParam, getCompare, getEqualsOp, getInOp, getClauses, getElseClause) =>
      SCaseExpr(walk(getInfo).asInstanceOf[ExprInfo],
          walk(getParam).asInstanceOf[Option[Expr]],
          getCompare,
          getEqualsOp,
          getInOp,
          walk(getClauses).asInstanceOf[List[CaseClause]],
          walk(getElseClause).asInstanceOf[Option[Block]])

          /* Not yet implemented...
      case SFixedPointType(_, name, body) =>
      case STaggedDimType(_, elemType, dimExpr, unitExpr) =>
      case STaggedUnitType(_, elemType, unitExpr) =>
      case SDimRef(_, name) =>
      case SDimExponent(_, base, power) =>
      case SDimUnaryOp(_, dimVal, op) =>
      case SDimBinaryOp(_, left, right, op) =>
      */
      case _ => super.walk(node)
    }
    node
  }
}
