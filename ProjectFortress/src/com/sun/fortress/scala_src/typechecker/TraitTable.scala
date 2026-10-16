/*******************************************************************************
    Copyright 2009,2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.scala_src.typechecker

import _root_.java.util.Map
import _root_.java.util.concurrent.ConcurrentHashMap
//import _root_.java.util._
import edu.rice.cs.plt.tuple.{Option => JOption}

import com.sun.fortress.nodes._
import com.sun.fortress.nodes_util.NodeFactory
import com.sun.fortress.compiler.GlobalEnvironment
import com.sun.fortress.compiler.index.ApiIndex
import com.sun.fortress.compiler.index.CompilationUnitIndex
import com.sun.fortress.compiler.index.ComponentIndex
import com.sun.fortress.compiler.index.TraitIndex
import com.sun.fortress.compiler.index.TypeConsIndex
import com.sun.fortress.repository.ProjectProperties
import com.sun.fortress.scala_src.useful.Iterators._

import scala.collection.mutable.HashSet
import scala.collection.mutable.Set

class TraitTable(current: CompilationUnitIndex, globalEnv: GlobalEnvironment) extends Iterable[TypeConsIndex] {
  // Memos for typeCons and declaredTypeCons, sound while both depend on nothing but this table and
  // the name (its api and its text; a span takes no part in a lookup): the indices' maps of types
  // do not change once built.
  private final val cacheTypeCons = ProjectProperties.getBoolean("fortress.analyzer.typecons.cache", true)
  private val typeConsMemo = new ConcurrentHashMap[(Option[APIName], String), JOption[TypeConsIndex]]()
  private val declaredMemo = new ConcurrentHashMap[String, Option[TypeConsIndex]]()

  def typeCons(name: Id): JOption[TypeConsIndex] =
    if (!cacheTypeCons) lookUpTypeCons(name)
    else {
      val key = (if (name.getApiName.isSome) Some(name.getApiName.unwrap) else None, name.getText)
      typeConsMemo.get(key) match {
        case null =>
          val result = lookUpTypeCons(name)
          val raced = typeConsMemo.putIfAbsent(key, result)
          if (raced == null) result else raced
        case v => v
      }
    }

  /** The first type of this table, in its walk, that declares a trait or object of the given name. */
  def declaredTypeCons(text: String): Option[TypeConsIndex] =
    if (!cacheTypeCons) findDeclared(text)
    else declaredMemo.get(text) match {
      case null =>
        val result = findDeclared(text)
        val raced = declaredMemo.putIfAbsent(text, result)
        if (raced == null) result else raced
      case v => v
    }

  private def findDeclared(text: String): Option[TypeConsIndex] =
    find(idx => text.equals(idx.ast().asInstanceOf[TraitObjectDecl].getHeader().getName().asInstanceOf[Id].getText()))

  private def lookUpTypeCons(name: Id): JOption[TypeConsIndex] = {
    val simpleName: Id = NodeFactory.makeId(NodeFactory.makeSpan(name), name.getText)
    val ast = current.ast

    if ( name.getApiName.isNone ||
         ( ast.isInstanceOf[Api] && ast.getName.equals(name.getApiName.unwrap) ) ||
         ( ast.isInstanceOf[Component] &&
           ast.asInstanceOf[Component].getExports.contains(name.getApiName.unwrap) ) ) {
      val result = JOption.wrap(current.typeConses.get(simpleName))
      if (result.isSome) return result
      else {
	// A terrible search hack to try to get around the apiName bug.  GLS 5/25/12
//	println("Need a search for: " + simpleName)
	for (name: APIName <- globalEnv.apiNames) {
	  val candidate = JOption.wrap(globalEnv.api(name).typeConses().get(simpleName))
	  if (candidate.isSome && name.toString == "CompilerBuiltin") return candidate
	}
	for (name: APIName <- globalEnv.apiNames) {
	  val candidate = JOption.wrap(globalEnv.api(name).typeConses().get(simpleName))
	  if (candidate.isSome && name.toString == "CompilerLibrary") return candidate
	}
	for (name: APIName <- globalEnv.apiNames) {
	  val candidate = JOption.wrap(globalEnv.api(name).typeConses().get(simpleName))
	  if (candidate.isSome && name.toString == "CompilerAlgebra") return candidate
	}
	for (name: APIName <- globalEnv.apiNames) {
	  val candidate = JOption.wrap(globalEnv.api(name).typeConses().get(simpleName))
	  if (candidate.isSome && name.toString == "GeneratorLibrary") return candidate
	}
// 	for (name: APIName <- globalEnv.apiNames) {
// 	  val candidate = JOption.wrap(globalEnv.api(name).typeConses().get(simpleName))
// 	  if (candidate.isSome) return candidate
// 	}
	return JOption.wrap(null)
      }
    }
    else {
      val api = globalEnv.api(name.getApiName.unwrap)
      if (api == null) JOption.none[TypeConsIndex]
      else JOption.wrap(api.typeConses().get(simpleName))
    }
  }

  def compilationUnit(name: APIName): CompilationUnitIndex = {
    if (current.ast.getName.equals(name)) current
    else globalEnv.api(name)
  }

  // Memos for TypeAnalyzer.parents and excludesClause, sound while both depend on nothing but this table and the type.
  private final val cacheClauses = ProjectProperties.getBoolean("fortress.analyzer.clauses.cache", true)
  private val parentsMemo = new ConcurrentHashMap[TraitType, scala.collection.immutable.Set[BaseType]]()
  private val excludesClauseMemo = new ConcurrentHashMap[TraitType, scala.collection.immutable.Set[TraitType]]()

  def memoParents(t: TraitType)(compute: => scala.collection.immutable.Set[BaseType]) = memo(parentsMemo, t, compute)
  def memoExcludesClause(t: TraitType)(compute: => scala.collection.immutable.Set[TraitType]) = memo(excludesClauseMemo, t, compute)

  private def memo[V <: AnyRef](m: ConcurrentHashMap[TraitType, V], t: TraitType, compute: => V): V =
    if (!cacheClauses) compute
    else m.get(t) match {
      case null =>
        val result = compute
        val raced = m.putIfAbsent(t, result)
        if (raced == null) result else raced
      case v => v
    }

  // A memo for TypeAnalyzer's subtype and exclusion questions whose answer was computed
  // without reading the analyzer's kind environment or its cycle history: such an answer
  // depends on this table and the question alone, so every analyzer over the table shares it.
  // contextReads counts the reads of either; the checker runs on one thread.
  private final val cacheGround = ProjectProperties.getBoolean("fortress.analyzer.ground.cache", true)
  private val groundMemo = new ConcurrentHashMap[(Boolean, Type, Type, Boolean), CFormula]()
  var contextReads = 0L
  def readContext(): Unit = contextReads += 1

  def groundAnswer(sub: Boolean, x: Type, y: Type, negate: Boolean): CFormula =
    if (cacheGround) groundMemo.get((sub, x, y, negate)) else null

  def ground(sub: Boolean, x: Type, y: Type, negate: Boolean, readsBefore: Long, answer: CFormula): Unit =
    if (cacheGround && contextReads == readsBefore && (answer == True || answer == False))
      groundMemo.putIfAbsent((sub, x, y, negate), answer)

  // A memo for TypeAnalyzer.dExc's answers whose computation read no context, by the question with
  // its inference variables renamed apart: such an answer depends on this table and the question's
  // shape alone, so every analyzer over the table shares it.
  private val sharedExclusions = new ConcurrentHashMap[(Type, Type), java.lang.Boolean]()
  def sharedExclusion(question: (Type, Type)): java.lang.Boolean = sharedExclusions.get(question)
  def shareExclusion(question: (Type, Type), answer: Boolean): Unit =
    sharedExclusions.putIfAbsent(question, answer)

  /** The traits that declare a coercion, for the lookup from a coercion's source to its targets. */
  lazy val coercingTraits: List[TraitIndex] =
    iterator.toList.collect { case ti: TraitIndex if !ti.coercions.isEmpty => ti }

  override def iterator = {
    var result: Set[TypeConsIndex] = new HashSet()
    for (t <- current.typeConses.values) {
      result += t
    }
    for (api <- globalEnv.apis.values) {
      for (t <- api.typeConses.values) {
        result += t
      }
    }
    result.iterator
  }
}
