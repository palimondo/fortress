/*******************************************************************************
    Copyright 2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.scala_src.overloading
import _root_.java.util.ArrayList
import _root_.java.util.{List => JavaList}
import _root_.java.util.{Set => JavaSet}
import edu.rice.cs.plt.collect.Relation
import edu.rice.cs.plt.tuple.{Option => JavaOption}
import edu.rice.cs.plt.tuple.{Pair => JavaPair}
import edu.rice.cs.plt.collect.Relation
import edu.rice.cs.plt.collect.IndexedRelation
import com.sun.fortress.compiler.GlobalEnvironment
import com.sun.fortress.compiler.index._
import com.sun.fortress.exceptions.InterpreterBug.bug
import com.sun.fortress.exceptions.StaticError
import com.sun.fortress.exceptions.TypeError
import com.sun.fortress.nodes._
import com.sun.fortress.nodes_util.MultiSpan
import com.sun.fortress.nodes_util.NodeFactory
import com.sun.fortress.nodes_util.NodeUtil
import com.sun.fortress.nodes_util.Span
import com.sun.fortress.parser_util.IdentifierUtil
import com.sun.fortress.scala_src.nodes._
import com.sun.fortress.scala_src.typechecker.TraitTable
import com.sun.fortress.scala_src.types.TypeAnalyzer
import com.sun.fortress.scala_src.useful._
import com.sun.fortress.scala_src.useful.Lists._
import com.sun.fortress.scala_src.useful.Options._
import com.sun.fortress.scala_src.useful.STypesUtil._
import com.sun.fortress.scala_src.useful.Sets._
import com.sun.fortress.scala_src.useful.Maps._


/* Checks the set of overloadings in a compilation unit. Must be run after typechecking
 * since return types must be inferred.
 * Verifies:
 * 1) Meet Rule, Exclusion Rule, Subtype Rule
 * 2)
 */

class OverloadingChecker(current: CompilationUnitIndex,
                         global: GlobalEnvironment,
                         errors: List[StaticError] = List())
                         (analyzer: TypeAnalyzer = TypeAnalyzer.make(new TraitTable(current, global))) {
  
  type FnOrVar = Either[Function, DeclaredVariable]
  
  def extend(params: List[StaticParam], where: Option[WhereClause]) = 
    new OverloadingChecker(current, global, errors)(analyzer.extend(params, where))
    
  def check(): JavaList[StaticError] = {
    toJavaList(checkOverloadedFunctions ++ 
               checkOverloadedMethods ++ 
               checkAbstractMethods ++ 
               checkGetterSetters)
  }
  
  private def checkOverloadedFunctions(): List[StaticError] = {
    val compFnRel = current.functions
    // Create a map from function names to sets of function indices
    val compFns = toSet(compFnRel.firstSet).flatMap(isDeclaredName).map{
      f => (f, toSet(compFnRel.matchFirst(f)).map(Left(_).asInstanceOf[FnOrVar]))
    }
    val imports = toListFromImmutable(current.ast.getImports)
    val expImports = imports.flatMap{
      case SImportNames(_, _, api, aliases) =>
        aliases.flatMap{
          case SAliasedSimpleName(_,name: IdOrOp, Some(alias: IdOrOp)) =>
            Some((alias, getFunctions(api, name)))
          case SAliasedSimpleName(_, name: IdOrOp, None) => Some(name)
            Some((name, getFunctions(api, name)))
          case _ => None
        }
      case _ => List()
    }
    val expFns = (compFns ++ expImports).groupBy(_._1.getText).mapElements{x => 
      val (ids, fns) = x.unzip
      (ids, fns.flatMap(x => x))
    }
    val importStar = imports.flatMap{isImportStar}
    val allFns = expFns.map{
      case (name, (ids, fns)) =>
        val implicitFns = importStar.flatMap{
          case SImportStar(_, _, api, excepts) if !excepts.exists(_.asInstanceOf[IdOrOp].getText == name) =>
            ids.flatMap(getFunctions(api, _))
          case _ =>
            Set[FnOrVar]()
        }
        (ids, fns ++ implicitFns)
    }
    allFns.flatMap(checkFunctionOverloading).toList
  }
  
  private def checkFunctionOverloading(idsAndFns: (Set[IdOrOp], Set[FnOrVar])): List[StaticError] = {
    val (ids, fns) = idsAndFns
    null
  }
  
  private def checkOverloadedMethods(): List[StaticError] = null
  
  private def checkMethodOverloading(idsAndMethods: (Set[IdOrOp], Set[Method])): List[StaticError] = {
    val (ids, methods) = idsAndMethods
    null
  }
  
  private def checkAbstractMethods(): List[StaticError] = null

  private def checkGetterSetters(): List[StaticError] = null
  
  private def sameText(x: IdOrOp, y: IdOrOp) = x == y
  
  private def isDeclaredName(f: IdOrOpOrAnonymousName): Option[IdOrOp] = f match {
    case i@SId(_,_,str) if IdentifierUtil.validId(str) => Some(i)
    case o@SOp(_,_,str,_,_) if NodeUtil.validOp(str) => Some(o) 
    case _ => None
  }
  
  private def isImportStar(i: Import): Option[ImportStar] = i match {
    case s: ImportStar => Some(s)
    case _ => None
  }
  
  private def isArrow(v: Variable): Set[FnOrVar] = v match {
    case d@SDeclaredVariable(lvalue) =>
      toOption(lvalue.getIdType) match {
        case Some(a: ArrowType) => Set(Right(d))
        case _ => Set()
      }
    case _ => Set()
  }
  
  private def getFunctions(api: APIName, id: IdOrOp): Set[FnOrVar] = 
    getFunctions(global.lookup(api), id, false)
  
  private def getFunctions(cUnit: CompilationUnitIndex, id: IdOrOp, onlyConcrete: Boolean): Set[FnOrVar] = {
    val fns = toSet(cUnit.functions.matchFirst(id)).filter(!onlyConcrete || _.body.isSome).map(Left(_))
    val vars = cUnit.variables
    val mArrowVar = if (vars.containsKey(id)) isArrow(vars.get(id)) else Set()
    fns ++ mArrowVar
  }
  


}
