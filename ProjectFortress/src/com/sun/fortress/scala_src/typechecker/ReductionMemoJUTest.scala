package com.sun.fortress.scala_src.typechecker

import _root_.junit.framework._
import _root_.junit.framework.Assert._
import com.sun.fortress.nodes._
import com.sun.fortress.nodes_util.NodeFactory._
import com.sun.fortress.scala_src.nodes._
import com.sun.fortress.scala_src.typechecker.Formula._
import com.sun.fortress.scala_src.types.TypeAnalyzer
import com.sun.fortress.scala_src.useful.TypeParser

/* A reduction asked again in one analyzer is answered with its first answer, and never with another analyzer's. */
class ReductionMemoJUTest extends TestCase {

  def typeAnalyzer(str: String) = TypeParser.parse(TypeParser.typeAnalyzer, str).get
  def typ(str: String) = TypeParser.parse(TypeParser.typ, str).get
  def nTyp(str: String) = TypeParser.parse(TypeParser.namedType, str).get

  /** An analyzer that counts the meets it is asked. */
  class CountingAnalyzer(ta: TypeAnalyzer) extends TypeAnalyzer(ta.traits, ta.env) {
    var meets = 0
    override def meet(x: Iterable[Type]): Type = { meets += 1; super.meet(x) }
  }

  /** i between lower and upper. */
  def between(i: _InferenceVarType, lower: Type, upper: Type): CFormula =
    And(Map(i -> TPrimitive(Set(lower), Set(), Set(upper), Set(), Set(), Set())), Map())

  /** The type parameter T bounded by the given type. */
  def tBoundedBy(bound: String): StaticParam = {
    val t = nTyp("T")
    SStaticParam(t.getInfo, 0, t.getName, List(nTyp(bound).asInstanceOf[BaseType]), Nil, None, false, SKindType(), false)
  }

  def testReductionAskedAgainIsTheFirstAnswer() = {
    val ta = new CountingAnalyzer(typeAnalyzer("{trait Aa, trait Bb extends {Aa}}"))
    val c = between(make_InferenceVarType(typeSpan), typ("Bb"), typ("Aa"))
    val first = reduce(c)(ta)
    assertTrue("the reduction leaves a constraint: " + first, first.isInstanceOf[And])
    val meetsOnce = ta.meets
    assertTrue("the first reduction meets the upper bounds", meetsOnce > 0)
    val second = reduce(c)(ta)
    assertTrue("the second reduction is the first's answer", second eq first)
    assertEquals("the second reduction asks no meet", meetsOnce, ta.meets)
  }

  def testReductionOverTypeVariableIsEachAnalyzersOwn() = {
    val base = typeAnalyzer("{trait Aa, trait Cc, trait Dd}")
    val i = make_InferenceVarType(typeSpan)
    // T at or below i, and i below Cc: satisfiable where T extends Cc, a contradiction where T extends Dd
    val c = between(i, typ("T"), typ("Cc"))
    for (order <- List(List("Cc", "Dd"), List("Dd", "Cc"))) {
      val analyzers = order.map(b => (b, base.extend(List(tBoundedBy(b)), None)))
      for ((b, ta) <- analyzers ++ analyzers) {
        val r = reduce(c)(ta)
        if (b == "Cc") assertTrue("T extends Cc: " + r, r.isInstanceOf[And])
        else assertEquals("T extends Dd", False, r)
      }
    }
  }

  def testReductionOverTypeVariableReadsTheContextEachTime() = {
    val ta = typeAnalyzer("{trait Aa, trait Cc}").extend(List(tBoundedBy("Cc")), None)
    val c = between(make_InferenceVarType(typeSpan), typ("T"), typ("Cc"))
    val reads0 = ta.traits.contextReads
    reduce(c)(ta)
    val reads1 = ta.traits.contextReads
    assertTrue("the reduction reads T's bound", reads1 > reads0)
    reduce(c)(ta)
    assertTrue("the reduction asked again counts as a read of the context", ta.traits.contextReads > reads1)
  }
}
