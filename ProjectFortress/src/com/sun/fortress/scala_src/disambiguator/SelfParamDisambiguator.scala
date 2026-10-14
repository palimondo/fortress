/*******************************************************************************
    Copyright 2009,2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.scala_src.disambiguator

import _root_.java.util.List
import edu.rice.cs.plt.tuple.Option
import com.sun.fortress.compiler.GlobalEnvironment
import com.sun.fortress.compiler.NamingCzar
import com.sun.fortress.compiler.disambiguator.TopLevelEnv
import com.sun.fortress.compiler.disambiguator.TypeNameEnv
import com.sun.fortress.compiler.index.TraitIndex
import com.sun.fortress.exceptions.StaticError
import com.sun.fortress.nodes._
import com.sun.fortress.nodes_util.NodeComparator
import com.sun.fortress.nodes_util.{NodeFactory => NF}
import com.sun.fortress.nodes_util.{NodeUtil => NU}
import com.sun.fortress.scala_src.nodes._
import com.sun.fortress.scala_src.useful.Lists._
import com.sun.fortress.scala_src.useful.Options._
import com.sun.fortress.scala_src.useful.STypesUtil._

/**
 * Replaces implicitly-typed 'self' parameters of methods with explicitly-typed
 * ones. This is now a separate visitor because it needs to occur during
 * disambiguation but before the TypeDisambiguator pass.
 * At parse-time, methods that take the 'self' parameter may not have a
 * type for that parameter. However, at disambiguation time, we can give
 * it one.<br>
 * {@code trait Foo f(self) : () end}
 * becomes
 * {@code trait Foo f(self:Foo) : () end}
 * This method will only replace parameters "down" to the next
 * object or trait declaration. When the new trait or object is declared,
 * this method will be called again. This method is guaranteed to return
 * the type of node given.
 */
class SelfParamDisambiguator(env: TypeNameEnv, globalEnv: GlobalEnvironment) extends Walker {
  /* With no environment, a trait's self parameter is read from its own F-bound only. */
  def this() = this(null, null)

  /* The type of 'self' is the type of the trait or object being declared
   * by the innermost enclosing trait or object declaration or object expression.
   */
  override def walk(node: Any): Any = node match {
    case SObjectDecl(_, STraitTypeHeader(sparams,_,name,_,_,_,_,_,_), _) =>
      // Add a type to self parameters of methods
      val self_type = NF.makeSelfType(NF.makeTraitType(name.asInstanceOf[Id],
                                                       staticParamsToArgs(toJavaList(sparams))))
      replaceSelfParamsWithType(node, self_type).asInstanceOf[ObjectDecl] match {
        case SObjectDecl(info, header, _) =>
          super.walk(SObjectDecl(info, header, some(self_type)))
      }

    /* The type of 'self' is the type of the trait or object being declared
     * by the innermost enclosing trait or object declaration or object expression.
     * If the innermost enclosing such construct is a trait declaration
     * (for a trait called, say, 'T'), and that trait declaration has
     * a 'comprises' clause, and 'U_1', 'U_2', ..., 'U_n' are the traits mentioned
     * in the 'comprises' clause, then the type of 'self' is instead
     * '(T & (U_1 | U_2 | ... | U_n))', where '&' indicates type intersection and
     * '|' indicates type union.
     */
    case STraitDecl(_, STraitTypeHeader(sparams,_,name,_,_,_,extendsC,_,_),
                    _, _, comprisesC, _) =>
      // Add a type to self parameters of methods
      val type_name = NF.makeTraitType(name.asInstanceOf[Id],
                                       staticParamsToArgs(toJavaList(sparams)))
      val self_type = comprisesC match {
        case Some(comprises@_::_) => NF.makeSelfType(type_name, toJavaList(comprises))
        case _ => selfParam(name, sparams, extendsC) match {
          case Some(x) => NF.makeSelfType(type_name, toJavaList(scala.List[NamedType](x)))
          case None => NF.makeSelfType(type_name)
        }
      }
      replaceSelfParamsWithType(node, self_type).asInstanceOf[TraitDecl] match {
        case STraitDecl(info, header, _, excludes, comprises, ellipses) =>
          super.walk(STraitDecl(info, header, some(self_type),
                                excludes, comprises, ellipses))
      }

    case oe@SObjectExpr(_, STraitTypeHeader(sparams,_,name,_,_,_,_,_,_), _) =>
      // Add a type to self parameters of methods
      val self_type = getObjectExprType(oe)
      replaceSelfParamsWithType(oe, self_type) match {
        case SObjectExpr(info, header, _) =>
          super.walk(SObjectExpr(info, header, some(self_type)))
      }

    case _ => super.walk(node)
  }

  /* With no 'comprises' clause, a type parameter X_k of a trait C[\X_1, ..., X_n\]
   * is the trait's self parameter, and 'self' is typed '(C[\X_1, ..., X_n\] & X_k)',
   * as under 'comprises X_k', when the extends clause of X_k lists
   *  - C[\X_1, ..., X_n\], the trait at its own parameters, or
   *  - a trait type D[\A_1, ..., A_m\] that the extends clause of C lists too,
   *    where D has a self parameter at position j and A_j is X_k.
   * The second needs D's declaration, read through the environment.
   */
  def selfParam(name: IdOrOpOrAnonymousName,
                sparams: scala.List[StaticParam],
                extendsC: scala.List[TraitTypeWhere]): scala.Option[VarType] =
    selfIndex(name, sparams, extendsC, Set()).map { k =>
      NF.makeVarType(NU.getSpan(sparams(k)), sparams(k).getName.asInstanceOf[Id]) }

  private def selfIndex(name: IdOrOpOrAnonymousName,
                        sparams: scala.List[StaticParam],
                        extendsC: scala.List[TraitTypeWhere],
                        seen: Set[String]): scala.Option[Int] = {
    def same(a: StaticArg, p: StaticParam) = (a, p.getName) match {
      case (STypeArg(_, _, SVarType(_, i, _)), j: Id) => i.getText == j.getText
      case (SIntArg(_, _, SIntRef(_, _, i, _)), j: Id) => i.getText == j.getText
      case (SBoolArg(_, _, SBoolRef(_, _, i, _)), j: Id) => i.getText == j.getText
      case _ => false
    }
    def own(t: BaseType) = (t, name) match {
      case (STraitType(_, i, args, _), j: Id) =>
        (NU.nameString(i) == NU.nameString(j) || (i.getText == j.getText && i.getApiName.isNone)) &&
          args.length == sparams.length && (args zip sparams).forall { case (a, p) => same(a, p) }
      case _ => false
    }
    val typeParams = sparams.zipWithIndex.collect {
      case (SStaticParam(_, _, i: Id, ext, _, _, _, _: KindType, _), k) => (i, ext, k) }
    typeParams.collectFirst { case (_, ext, k) if ext.exists(own) => k } orElse {
      if (env == null) None
      else typeParams.collectFirst {
        case (i, ext, k) if ext.exists(b => throughBound(b, i, extendsC, seen)) => k }
    }
  }

  /* Whether the bound b of the type parameter x is a trait type D[\A_1, ..., A_m\] that
   * the extends clause lists too, with D's self parameter at a position j where A_j is x. */
  private def throughBound(b: BaseType, x: Id,
                           extendsC: scala.List[TraitTypeWhere],
                           seen: Set[String]): Boolean = b match {
    case STraitType(_, d, dargs, _) =>
      extendsC.exists(e => sameType(e.getBaseType, b)) &&
      (resolveTrait(d) match {
        case Some((key, q, ti)) if !seen.contains(key) =>
          selfIndexOf(ti, q, seen + key) match {
            case Some(j) if j < dargs.length => dargs(j) match {
              case STypeArg(_, _, SVarType(_, y, _)) => y.getText == x.getText && y.getApiName.isNone
              case _ => false
            }
            case _ => false
          }
        case _ => false
      })
    case _ => false
  }

  /* The self parameter's position of a trait found through the environment: read from its
   * self type when the trait has been disambiguated already, else from its header. */
  private def selfIndexOf(ti: TraitIndex, q: Id, seen: Set[String]): scala.Option[Int] = ti.ast match {
    case td: TraitDecl => SelfParamDisambiguator.selfParamPosition(td) match {
      case some@Some(_) => some
      case None => td match {
        case STraitDecl(_, STraitTypeHeader(sps, _, n, _, _, _, ext, _, _), None, _, compr, _) =>
          compr match {
            case Some(_::_) => None
            case _ => homeOf(q, ti).selfIndex(n, sps, ext, seen)
          }
        case _ => None
      }
    }
    case _ => None
  }

  /* The pass whose environment resolves the names of a trait's header: for a trait of
   * another api that the global environment holds not yet disambiguated, as when apis are
   * disambiguated together, that api's environment, as when that api is disambiguated. */
  private def homeOf(q: Id, ti: TraitIndex): SelfParamDisambiguator =
    if (globalEnv == null || q.getApiName.isNone) this
    else {
      val api = q.getApiName.unwrap
      if (globalEnv.definesApi(api) && (globalEnv.api(api).typeConses.get(NF.makeLocalId(q)) eq ti))
        new SelfParamDisambiguator(new TopLevelEnv(globalEnv, globalEnv.api(api),
                                                   new java.util.ArrayList[StaticError]()), globalEnv)
      else this
    }

  private def sameType(a: Type, b: Type): Boolean =
    try { NodeComparator.compare(a, b) == 0 } catch { case _: Exception => false }

  /* The trait that a type name names, resolved as TypeDisambiguator resolves it. */
  private def resolveTrait(d: Id): scala.Option[(String, Id, TraitIndex)] =
    try {
      val qname: scala.Option[Id] =
        if (d.getApiName.isSome)
          toOption(env.apiName(d.getApiName.unwrap)).map(api => NF.makeId(api, d))
            .filter(env.hasQualifiedTypeCons(_))
        else if (env.hasTypeParam(d).isSome) None
        else {
          var names = env.explicitTypeConsNames(d)
          if (names.isEmpty) names = env.onDemandTypeConsNames(d)
          if (names.size == 1) Some(names.iterator.next) else None
        }
      qname.flatMap(q => env.typeConsIndex(q) match {
        case ti: TraitIndex => Some((NU.nameString(q), q, ti))
        case _ => None
      })
    } catch { case _: Exception => None }

  /**
   * Replaces Parameters whose name is 'self' with a parameter with
   * the explicit type given.
   *
   * @param thatNode
   * @param self_type
   */
  def replaceSelfParamsWithType(that_node: Any, self_type: SelfType): Node = {
    object replacer extends Walker {
      var traitNestingDepth = 0

      override def walk(node: Any): Any = node match {
        case SParam(info, name, mods, idType, defaultExpr, varargs) => varargs match {
          case Some(_) => super.walk(node)
          case None =>
            // my type is broken I need to qualify the type name
            val new_type: Option[TypeOrPattern] =
              if (name.equals(NamingCzar.SELF_NAME)) some(self_type)
              else idType
            SParam(info, name, mods, new_type, defaultExpr, None)
        }

        case od:ObjectDecl =>
          traitNestingDepth += 1
          if (traitNestingDepth > 1) od else super.walk(od)

        case td:TraitDecl =>
          traitNestingDepth += 1
          if (traitNestingDepth > 1) td else super.walk(td)

        case oe:ObjectExpr =>
          traitNestingDepth += 1
          if (traitNestingDepth > 1) oe else super.walk(oe)

        case _ => super.walk(node)
      }
    }
    replacer(that_node).asInstanceOf[Node]
  }
}

object SelfParamDisambiguator {
  /* The position among its static parameters of a trait's self parameter, read from the
   * self type that the disambiguator gave the trait: a trait with no comprises clause whose
   * self type lists one of its own type parameters (the self type read from the F-bound).
   * None for every other trait and for an object. */
  def selfParamPosition(d: TraitObjectDecl): scala.Option[Int] = d match {
    case STraitDecl(_, STraitTypeHeader(sparams, _, _, _, _, _, _, _, _),
                    Some(STraitSelfType(_, _, scala.List(SVarType(_, x, _)))), _, comprisesC, _)
        if comprisesC.forall(_.isEmpty) =>
      val k = sparams.indexWhere(p => p.getName match {
        case i: Id => i.getText == x.getText && x.getApiName.isNone
        case _ => false
      })
      if (k >= 0) Some(k) else None
    case _ => None
  }
}
