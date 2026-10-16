package com.sun.fortress.scala_src.typechecker

import _root_.junit.framework._
import _root_.junit.framework.Assert._
import com.sun.fortress.compiler.index.TraitIndex
import com.sun.fortress.compiler.index.TypeConsIndex
import com.sun.fortress.nodes._
import com.sun.fortress.nodes_util.NodeFactory._
import com.sun.fortress.scala_src.types.TypeAnalyzer
import com.sun.fortress.scala_src.useful.TypeParser

/* A trait table finds a type by its name once: asked again, it answers with what it found. */
class TraitTableMemoJUTest extends TestCase {

  def typ(str: String) = TypeParser.parse(TypeParser.typ, str).get

  def traitIndices(str: String): List[TraitIndex] =
    TypeParser.parse(TypeParser.repsep(TypeParser.traitIndex | TypeParser.objectIndex, ","), str).get

  /** A table that counts the walks over every type it holds. */
  class CountingTable(traits: List[TraitIndex])
      extends TraitTable(TypeParser.makeComponentIndex("OverloadingTest", traits), TypeParser.GLOBAL_ENV) {
    var walks = 0
    override def iterator: Iterator[TypeConsIndex] = { walks += 1; super.iterator }
  }

  def testTypeConsAskedAgainIsTheFirstAnswer() = {
    val table = new CountingTable(traitIndices("trait Aa, trait Mm[T]"))
    val name = makeId(typeSpan, "Mm")
    val first = table.typeCons(name)
    assertTrue("Mm is in the table", first.isSome)
    assertTrue("the second lookup of Mm is the first's answer", table.typeCons(name) eq first)
    assertTrue("a lookup at another place is the same answer", table.typeCons(makeId(typeSpan, "Mm")) eq first)
  }

  def testDeclaredTypeIsFoundOnce() = {
    val table = new CountingTable(traitIndices("trait Aa, trait Bb, trait Mm[T]"))
    val ta = TypeAnalyzer.make(table)
    assertFalse("Mm[Aa] is not a subtype of Mm[Bb]", ta.lteq(typ("Mm[Aa]"), typ("Mm[Bb]")))
    val once = table.walks
    assertTrue("comparing two instances of Mm finds Mm's declaration", once > 0)
    assertFalse("Mm[Bb] is not a subtype of Mm[Aa]", ta.lteq(typ("Mm[Bb]"), typ("Mm[Aa]")))
    assertEquals("comparing two other instances of Mm does not search the table again", once, table.walks)
    assertTrue("Mm[Aa] is a subtype of Mm[Aa]", ta.lteq(typ("Mm[Aa]"), typ("Mm[Aa]")))
  }
}
