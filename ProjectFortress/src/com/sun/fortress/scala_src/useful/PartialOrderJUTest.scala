package com.sun.fortress.scala_src.useful

import _root_.junit.framework._
import _root_.junit.framework.Assert._

// The minimal elements and a linear extension of a partial order, each ordered pair read at most once.
class PartialOrderJUTest extends TestCase {

  // a precedes b where a divides b, over 2 to 65 in a shuffled order; reads counts each read.
  val xs = new scala.util.Random(7).shuffle((2 to 65).toList)
  val reads = scala.collection.mutable.Map[(Int, Int), Int]().withDefaultValue(0)
  def divides(a: Int, b: Int) = { reads((a, b)) += 1; a != b && b % a == 0 }

  def testMinimalAndLinear(): Unit = {
    val order = new PartialOrder[Int](xs, divides)
    val linear = order.linear
    val minimal = order.minimal
    assertEquals(xs.sorted, linear.sorted)
    // each element after every element that precedes it
    for (i <- linear.indices; j <- i + 1 until linear.size)
      assertFalse(linear(j) + " before " + linear(i), linear(i) % linear(j) == 0)
    // otherwise in the order of xs: each element is the first of xs, among those left, that nothing left precedes
    var left = xs
    for (e <- linear) {
      assertEquals(left.find(c => !left.exists(d => d != c && c % d == 0)).get, e)
      left = left.filterNot(_ == e)
    }
    assertEquals(xs.filter(c => !xs.exists(d => d != c && c % d == 0)), minimal)
    assertTrue(minimal.contains(2) && minimal.contains(61) && !minimal.contains(4))
    assertTrue(reads.values.forall(_ == 1))
    assertFalse(reads.contains((5, 5)))
  }

  def testCycle(): Unit = {
    val lt = Set(("a", "b"), ("b", "a"), ("a", "c"))
    val order = new PartialOrder[String](List("c", "a", "b", "d"), (x, y) => lt((x, y)))
    // where every element left has a predecessor, the first left is taken
    assertEquals(List("d", "c", "a", "b"), order.linear)
    assertEquals(List("d"), order.minimal)
  }

  def testOneObjectTwice(): Unit = {
    val s = new Object
    var n = 0
    val order = new PartialOrder[Object](List(s, s), (x, y) => { n += 1; true })
    assertEquals(List(s, s), order.minimal)
    assertEquals(List(s, s), order.linear)
    assertEquals(0, n)
  }

  def testEmpty(): Unit = {
    val order = new PartialOrder[Int](Nil, (x, y) => true)
    assertEquals(Nil, order.minimal)
    assertEquals(Nil, order.linear)
  }
}
