#!/usr/bin/env python3
"""apply-h.py <dir> <integral-way>: applies rung H's edit to <dir>/FortressLibrary.fsi and .fss.

Every substitution must match exactly once.  <integral-way> is the shape given to the AnyIntegral
clause: 'self' (Integral[\\I\\] comprises I), 'sketch' (Integral[\\I\\] without AnyIntegral in its extends
clause), 'open' (AnyIntegral without its comprises clause) or 'none' (the clause left as it is).
Run with <dir> = Library to edit the tree; with a copy's directory to make a variant."""
import io
import sys

D, WAY = sys.argv[1], sys.argv[2]

FSI = [
 ("""trait TotalComparison
        extends { Comparison, StandardTotalOrder[\\TotalComparison\\] }
        comprises { LessThan, EqualTo, GreaterThan }
    opr =(self, other:Comparison): Boolean
    opr CMP(self, other:Unordered): Comparison
    opr >=(self, other:Unordered): Boolean
    opr >=(self, other:Comparison): Boolean
""",
  """trait TotalComparison
        extends { Comparison }
        comprises { LessThan, EqualTo, GreaterThan }
    opr =(self, other:Comparison): Boolean
    opr CMP(self, other:Unordered): Comparison
    opr >=(self, other:Unordered): Boolean
    opr >=(self, other:Comparison): Boolean
    opr >=(self, other:TotalComparison): Boolean
    opr <=(self, other:TotalComparison): Boolean
    opr MIN(self, other:TotalComparison): TotalComparison
    opr MAX(self, other:TotalComparison): TotalComparison
    opr MINMAX(self, other:TotalComparison): (TotalComparison,TotalComparison)
"""),
 ("value trait AnyMaybe extends { Equality[\\AnyMaybe\\], AnyUniqueItem } excludes Number\n",
  "value trait AnyMaybe extends { AnyUniqueItem } excludes Number\n"),
 ("trait RelationalPredicateCondition[\\E\\] extends { Condition[\\()\\] } excludes Condition[\\()\\]\n",
  "trait RelationalPredicateCondition[\\E\\] extends { Condition[\\()\\] }\n"),
]

FSS = [
 ("""trait TotalComparison
        extends { Comparison, StandardTotalOrder[\\TotalComparison\\] }
        comprises { LessThan, EqualTo, GreaterThan }
""",
  """trait TotalComparison
        extends { Comparison }
        comprises { LessThan, EqualTo, GreaterThan }
"""),
 ("""    opr CMP(self, other:Unordered): Comparison = Unordered
    opr <(self, other:Unordered): Boolean = false
    opr >=(self, other:Unordered): Boolean = false
    opr >=(self, other:Comparison): Boolean = NOT (other < self)
""",
  """    opr CMP(self, other:Unordered): Comparison = Unordered
    opr <(self, other:Unordered): Boolean = false
    opr >=(self, other:Unordered): Boolean = false
    opr >=(self, other:Comparison): Boolean = NOT (other < self)
    opr >=(self, other:TotalComparison): Boolean = NOT (self < other)
    opr <=(self, other:TotalComparison): Boolean = NOT (other < self)
    opr MIN(self, other:TotalComparison): TotalComparison = if other < self then other else self end
    opr MAX(self, other:TotalComparison): TotalComparison = if other < self then self else other end
    opr MINMAX(self, other:TotalComparison): (TotalComparison,TotalComparison) =
        if other < self then (other, self) else (self, other) end
"""),
 ("""value trait AnyMaybe extends { Equality[\\AnyMaybe\\], AnyUniqueItem } excludes Number
        (** \\vspace{-4ex} NOT YET: %comprises Maybe[\\T\\] where [\\T\\]% *)
end
""",
  """value trait AnyMaybe extends { AnyUniqueItem } excludes Number
        (** \\vspace{-4ex} NOT YET: %comprises Maybe[\\T\\] where [\\T\\]% *)
    opr =(self, other:AnyMaybe): Boolean = self SEQV other
end
"""),
 ("  SimpleFilterGenerator2[\\E\\](self.g, self.p ANDCOND p')\n",
  "  SimpleFilterGenerator2[\\E\\](self.g, andCondCombine[\\E\\](self.p, p'))\n"),
 ("self.g.__generate2filtered[\\R, L1, L2\\](q,r,self.p ANDCOND p',f)\n",
  "self.g.__generate2filtered[\\R, L1, L2\\](q,r,andCondCombine[\\E\\](self.p, p'),f)\n"),
 ("trait RelationalPredicateCondition[\\E\\] extends { Condition[\\()\\] } excludes Condition[\\()\\]\n",
  "trait RelationalPredicateCondition[\\E\\] extends { Condition[\\()\\] }\n"),
 ("""opr ANDCOND[\\E\\](p : Generator[\\ E \\] -> RelationalPredicateCondition[\\ E \\] , q : Generator[\\ E \\] -> RelationalPredicateCondition[\\ E \\] ) : Generator[\\ E \\] -> Condition[\\ () \\] = (fn (x : Generator[\\ E \\]) : AndRelationalPredicateCondition[\\ E \\] => AndRelationalPredicateCondition[\\ E \\](p, q, x))
""",
  """andRelCond[\\E\\](p : Generator[\\ E \\] -> RelationalPredicateCondition[\\ E \\] , q : Generator[\\ E \\] -> RelationalPredicateCondition[\\ E \\] ) : Generator[\\ E \\] -> Condition[\\ () \\] = (fn (x : Generator[\\ E \\]) : AndRelationalPredicateCondition[\\ E \\] => AndRelationalPredicateCondition[\\ E \\](p, q, x))

andCondCombine[\\E\\](p : Generator[\\E\\] -> Condition[\\()\\], q : Generator[\\E\\] -> Condition[\\()\\]) : Generator[\\E\\] -> Condition[\\()\\] =
  typecase p of
    rp:(Generator[\\E\\] -> RelationalPredicateCondition[\\E\\]) =>
      typecase q of
        rq:(Generator[\\E\\] -> RelationalPredicateCondition[\\E\\]) => andRelCond[\\E\\](rp, rq)
        else => (p ANDCOND q) typed (Generator[\\E\\] -> Condition[\\()\\])
      end
    else => (p ANDCOND q) typed (Generator[\\E\\] -> Condition[\\()\\])
  end
"""),
]

INTEGRAL_HDR = "trait Integral[\\I extends Integral[\\I\\]\\] extends { StandardTotalOrder[\\I\\], MultiplicativeRing[\\I\\], AnyIntegral }\n"
ANYINTEGRAL_HDR = "trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 } end\n"
WAYS = {
 'self':   [(INTEGRAL_HDR, INTEGRAL_HDR[:-1] + " comprises I\n")],
 'sketch': [(INTEGRAL_HDR, INTEGRAL_HDR.replace(", AnyIntegral }", " }"))],
 'open':   [(ANYINTEGRAL_HDR, "trait AnyIntegral extends { Number } end\n")],
 'none':   [],
}


def edit(path, subs):
    s = io.open(path, encoding='utf-8', newline='').read()
    for a, b in subs:
        n = s.count(a)
        if n != 1:
            sys.exit('%s: %d matches for %r' % (path, n, a[:80]))
        s = s.replace(a, b)
    io.open(path, 'w', encoding='utf-8', newline='').write(s)


edit(D + '/FortressLibrary.fsi', FSI + WAYS[WAY])
edit(D + '/FortressLibrary.fss', FSS + WAYS[WAY])
print('applied rung H (%s) to %s' % (WAY, D))
