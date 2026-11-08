package com.sun.fortress.scala_src.useful

/**
 * A strict partial order `lt` over the elements of `xs`, read at most once a
 * pair. An element is compared with each other element, never with itself;
 * where `xs` holds one object twice, the two do not precede each other.
 *
 * `minimal` holds the elements that no other element precedes, in the order
 * of `xs`. `linear` holds every element in a linear extension of the order:
 * each element after every element that precedes it, and otherwise in the
 * order of `xs`. Where the elements left all have a predecessor among them,
 * as on a cycle, it takes the first of them in the order of `xs`, and goes on.
 *
 * A sort by `lt`, such as `sortWith`, reads two elements that neither
 * precedes as equal, which is not transitive on a partial order, and Java's
 * TimSort refuses such an order where it merges 32 elements or more.
 */
class PartialOrder[T](xs: List[T], lt: (T, T) => Boolean) {
  private val elems: Array[Any] = xs.toArray[Any]
  private val n = elems.length
  // At i * n + j: 0 where lt(elems(i), elems(j)) is not read yet, 1 where it
  // is false, 2 where it is true.
  private val memo = new Array[Byte](n * n)

  /** Whether the element at i precedes the element at j. */
  def precedes(i: Int, j: Int): Boolean =
    if (i == j || (elems(i).asInstanceOf[AnyRef] eq elems(j).asInstanceOf[AnyRef])) false
    else {
      val k = i * n + j
      val m = memo(k)
      if (m != 0) m == 2
      else {
        val r = lt(elems(i).asInstanceOf[T], elems(j).asInstanceOf[T])
        memo(k) = if (r) 2 else 1
        r
      }
    }

  private def hasPredecessor(j: Int): Boolean = {
    var i = 0
    while (i < n) {
      if (precedes(i, j)) return true
      i += 1
    }
    false
  }

  /** The elements that no other element precedes, in the order of xs. */
  lazy val minimal: List[T] =
    (0 until n).filterNot(hasPredecessor).map(elems(_).asInstanceOf[T]).toList

  /** A linear extension of the order, otherwise in the order of xs. */
  lazy val linear: List[T] = {
    val left = Array.fill(n)(true)
    // blocker(j): an element that precedes j, found among those left when j
    // was last read, or -1. The elements before it were read and do not
    // precede j, or had been taken.
    val blocker = Array.fill(n)(-1)
    def blocked(j: Int): Boolean = {
      if (blocker(j) >= 0 && left(blocker(j))) return true
      var i = blocker(j) + 1
      while (i < n) {
        if (left(i) && precedes(i, j)) { blocker(j) = i; return true }
        i += 1
      }
      blocker(j) = n
      false
    }
    val out = List.newBuilder[T]
    var taken = 0
    while (taken < n) {
      var pick = -1
      var j = 0
      while (pick < 0 && j < n) {
        if (left(j) && !blocked(j)) pick = j
        j += 1
      }
      if (pick < 0) pick = left.indexWhere(identity)
      left(pick) = false
      taken += 1
      out += elems(pick).asInstanceOf[T]
    }
    out.result()
  }
}
