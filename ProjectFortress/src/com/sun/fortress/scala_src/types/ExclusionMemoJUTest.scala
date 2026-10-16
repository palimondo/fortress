package com.sun.fortress.scala_src.types

import _root_.junit.framework._
import _root_.junit.framework.Assert._
import com.sun.fortress.nodes._
import com.sun.fortress.nodes_util.NodeFactory._
import com.sun.fortress.scala_src.nodes._
import com.sun.fortress.scala_src.typechecker.CFormula
import com.sun.fortress.scala_src.typechecker.Formula._
import com.sun.fortress.scala_src.typechecker.TraitTable
import com.sun.fortress.scala_src.typechecker.staticenv.KindEnv
import com.sun.fortress.scala_src.useful.TypeParser

/* An exclusion asked again with other inference variables is answered without computing it again, and never across a context. */
class ExclusionMemoJUTest extends TestCase {

  def typeAnalyzer(str: String) = TypeParser.parse(TypeParser.typeAnalyzer, str).get
  def typ(str: String) = TypeParser.parse(TypeParser.typ, str).get
  def nTyp(str: String) = TypeParser.parse(TypeParser.namedType, str).get

  class CountingAnalyzer(traits: TraitTable, env: KindEnv) extends TypeAnalyzer(traits, env) {
    var computed = 0
    override protected def exc(x: Type, y: Type)(implicit history: Set[hType]): CFormula = { computed += 1; super.exc(x, y) }
  }

  val noHistory = Set[(Boolean, Boolean, Type, Type)]()

  def tBoundedBy(bound: String): StaticParam = {
    val t = nTyp("T")
    SStaticParam(t.getInfo, 0, t.getName, List(nTyp(bound).asInstanceOf[BaseType]), Nil, None, false, SKindType(), false)
  }

  def testExclusionAskedAgainWithOtherVariablesIsNotComputedAgain() = {
    val base = typeAnalyzer("{trait Aa, trait Bb excludes {Aa}}")
    val ta = new CountingAnalyzer(base.traits, base.env)
    val first = ta.dExc(typ("Aa"), make_InferenceVarType(typeSpan))(noHistory)
    assertFalse("Aa and an inference variable need not exclude", first)
    val once = ta.computed
    assertTrue("the first question is computed", once > 0)
    val second = ta.dExc(typ("Aa"), make_InferenceVarType(typeSpan))(noHistory)
    assertEquals("the second question has the first's answer", first, second)
    assertEquals("the second question, with another inference variable, is not computed again", once, ta.computed)
  }

  def testContextFreeExclusionIsSharedByTheAnalyzersOfOneTable() = {
    val base = typeAnalyzer("{trait Aa, trait Bb excludes {Aa}}")
    val one = new CountingAnalyzer(base.traits, KindEnv.makeFresh)
    val other = new CountingAnalyzer(base.traits, KindEnv.makeFresh)
    assertFalse(one.dExc(typ("Aa"), make_InferenceVarType(typeSpan))(noHistory))
    assertFalse(other.dExc(typ("Aa"), make_InferenceVarType(typeSpan))(noHistory))
    assertEquals("another analyzer over the table answers a question that read no context without computing it", 0, other.computed)
  }

  def testExclusionOverTypeVariableIsEachAnalyzersOwn() = {
    val base = typeAnalyzer("{trait Aa, trait Bb excludes {Aa}, trait Cc}")
    for (order <- List(List("Aa", "Cc"), List("Cc", "Aa"))) {
      val analyzers = order.map(b => (b, base.extend(List(tBoundedBy(b)), None)))
      for ((b, ta) <- analyzers ++ analyzers) {
        val r = ta.dExc(typ("T"), typ("Bb"))(noHistory)
        if (b == "Aa") assertTrue("T extends Aa excludes Bb", r)
        else assertFalse("T extends Cc does not exclude Bb", r)
      }
    }
  }

  def testExclusionOverTypeVariableReadsTheContextEachTime() = {
    val ta = typeAnalyzer("{trait Aa, trait Bb excludes {Aa}}").extend(List(tBoundedBy("Aa")), None)
    val reads0 = ta.traits.contextReads
    assertTrue(ta.dExc(typ("T"), typ("Bb"))(noHistory))
    val reads1 = ta.traits.contextReads
    assertTrue("the exclusion reads T's bound", reads1 > reads0)
    assertTrue(ta.dExc(typ("T"), typ("Bb"))(noHistory))
    assertTrue("the exclusion asked again counts as a read of the context", ta.traits.contextReads > reads1)
  }
}
