#!/usr/bin/env python3
r"""designs.py <tree> <design>...: the library halves of the designs this probe tried for the
two open families of the full overloading check, as exact-text edits, each with the number
of matches it must find (the script stops before writing anything if one differs). Shadow
edits: applied to a worktree's library, measured, and reset with git checkout. On main at
d97001d19.

The subscripts over an unbounded index type (row 783):
  subS1    the team's wish (Specification/appendices/future.tex:186-207): "the type variable
           I extends a type, say, Index which either excludes Range[I] or is a supertype of
           Range[I]". A trait Index; ZZ32 extends it; Range excludes it; every unbounded index
           parameter that reaches Indexed or a full range is bounded by it. A tuple of
           indices is no Index in the language today (the team's "magic"); the checker half,
           checker-shadow.py's tupleindex, reads one as an Index. BoundedRange's narrowing of
           atMost to a FullRange[\I\] goes (api and component), so Range's own atMost(n:I):
           Range[\I\] is inherited: BoundedRange cannot take the bound, since Range's truncL
           and truncR return one and Range must stay unbounded for TrivialOpenRange, a range
           of Any.

A vector plus a number beside a vector plus a vector (the arrays' scalar + and -):
  vecA2    Vector and Matrix stop extending AdditiveGroup, and the arrays (HasRank) exclude
           AnyAdditiveGroup, as Array3 already does (FortressLibrary.fsi:1802-1807)
  vecA3    the four scalar + and - leave the library (api and component); MIN and MAX stay
"""
import sys

T = sys.argv[1]
designs = sys.argv[2:]
FL, FLI = T + '/Library/FortressLibrary.fss', T + '/Library/FortressLibrary.fsi'
known = {'subS1', 'vecA2', 'vecA3'}
bad = [d for d in designs if d not in known]
if bad:
    sys.exit('unknown designs: ' + ' '.join(bad))
edits = []


def e(f, old, new, count=1):
    edits.append((f, old, new, count))


if 'subS1' in designs:
    for f in (FLI, FL):
        e(f, "trait Indexed[\\E, I\\] extends Generator[\\E\\]\n",
             "(** An index type: what a subscript takes, apart from the ranges, which exclude it. **)\n"
             "trait Index end\n\n"
             "trait Indexed[\\E, I extends Index\\] extends Generator[\\E\\]\n")
        e(f, "trait ZZ32 extends { AnyIntegral, Integral[\\ZZ32\\] }\n",
             "trait ZZ32 extends { AnyIntegral, Integral[\\ZZ32\\], Index }\n")
        for old, new in [
            ("trait DelegatedIndexed[\\E,I\\] extends", "trait DelegatedIndexed[\\E,I extends Index\\] extends"),
            ("trait MutableIndexed[\\E, I\\]\n", "trait MutableIndexed[\\E, I extends Index\\]\n"),
            ("trait ReadableArray[\\E,I\\]\n", "trait ReadableArray[\\E,I extends Index\\]\n"),
            ("trait ImmutableArray[\\E,I\\] extends", "trait ImmutableArray[\\E,I extends Index\\] extends"),
            ("trait Array[\\E,I\\] extends", "trait Array[\\E,I extends Index\\] extends"),
            ("trait StandardImmutableArrayType[\\T extends StandardImmutableArrayType[\\T,E,I\\],E,I\\]",
             "trait StandardImmutableArrayType[\\T extends StandardImmutableArrayType[\\T,E,I\\],E,I extends Index\\]"),
            ("trait StandardMutableArrayType[\\T extends StandardMutableArrayType[\\T,E,I\\],E,I\\]",
             "trait StandardMutableArrayType[\\T extends StandardMutableArrayType[\\T,E,I\\],E,I extends Index\\]"),
            ("trait FullRange[\\I\\] extends", "trait FullRange[\\I extends Index\\] extends"),
            ("trait CompactFullRange[\\I\\] extends", "trait CompactFullRange[\\I extends Index\\] extends"),
            ("trait StridedFullRange[\\I\\] extends", "trait StridedFullRange[\\I extends Index\\] extends"),
            ("opr :[\\I\\](r: FullRange[\\I\\], stride:I)", "opr :[\\I extends Index\\](r: FullRange[\\I\\], stride:I)"),
            ("object SimpleMappedSeqIndexed[\\E,F,I\\](", "object SimpleMappedSeqIndexed[\\E,F,I extends Index\\]("),
        ]:
            e(f, old, new)
        # the scalar extension over Array[\T,I\]: eight declarations
        e(f, "\\] }, I\\](x: Array[\\T,I\\], y: T)", "\\] }, I extends Index\\](x: Array[\\T,I\\], y: T)", 4)
        e(f, "\\] }, I\\](y: T, x: Array[\\T,I\\])", "\\] }, I extends Index\\](y: T, x: Array[\\T,I\\])", 4)
    e(FLI, "trait Range[\\I\\] extends { StandardPartialOrder[\\Range[\\I\\]\\], Contains[\\I\\] }\n        excludes { Number, String }\n",
           "trait Range[\\I\\] extends { StandardPartialOrder[\\Range[\\I\\]\\], Contains[\\I\\] }\n        excludes { Number, String, Index }\n")
    e(FL, "trait Range[\\I\\] extends { StandardPartialOrder[\\Range[\\I\\]\\], Contains[\\I\\] }\n        excludes { Number, String }",
          "trait Range[\\I\\] extends { StandardPartialOrder[\\Range[\\I\\]\\], Contains[\\I\\] }\n        excludes { Number, String, Index }")
    e(FLI, "    atMost(n: I): FullRange[\\I\\]\n", "")
    e(FL, "    atMost(n:I): FullRange[\\I\\]\n", "")
    for old, new in [
        ("object SimpleMappedIndexed[\\E,F,I\\](", "object SimpleMappedIndexed[\\E,F,I extends Index\\]("),
        ("object SimpleIndexValuePairs[\\E,I\\](", "object SimpleIndexValuePairs[\\E,I extends Index\\]("),
        ("trait ReversedIndexed[\\E,I\\] extends", "trait ReversedIndexed[\\E,I extends Index\\] extends"),
        ("object SimpleReversedIndexed[\\E,I\\](", "object SimpleReversedIndexed[\\E,I extends Index\\]("),
    ]:
        e(FL, old, new)

if 'vecA2' in designs:
    for f in (FLI, FL):
        e(f, "        extends { AnyVector, Array1[\\T,0,s0\\], AdditiveGroup[\\Vector[\\T,s0\\]\\] }\n",
             "        extends { AnyVector, Array1[\\T,0,s0\\] }\n")
        e(f, "        extends { AnyMatrix, Array2[\\T, 0, s0, 0, s1\\], AdditiveGroup[\\Matrix[\\T,s0,s1\\]\\] }\n",
             "        extends { AnyMatrix, Array2[\\T, 0, s0, 0, s1\\] }\n")
        e(f, "trait HasRank extends Equality[\\HasRank\\] excludes { Number, AnyMaybe }",
             "trait HasRank extends Equality[\\HasRank\\] excludes { Number, AnyMaybe, AnyAdditiveGroup }")

if 'vecA3' in designs:
    for f in (FLI, FL):
        for op, order in (('+', 'x: Array[\\T,I\\], y: T'), ('+', 'y: T, x: Array[\\T,I\\]'),
                          ('-', 'x: Array[\\T,I\\], y: T'), ('-', 'y: T, x: Array[\\T,I\\]')):
            head = "opr %s[\\T extends { Number, AdditiveGroup[\\T\\] }, I\\](%s): Array[\\T,I\\]" % (op, order)
            s = open(f, encoding='utf-8').read()
            i = s.find(head)
            if i < 0 or s.count(head) != 1:
                sys.exit('vecA3: %s found %d times in %s' % (head, s.count(head), f))
            j = s.index('\n', i) + 1
            e(f, s[i:j], "")

texts = {}
for (f, old, new, count) in edits:
    s = texts.get(f)
    if s is None:
        s = open(f, encoding='utf-8').read()
    n = s.count(old)
    if n != count:
        sys.exit('edit matches %d times, not %d, in %s:\n%s' % (n, count, f, old[:300]))
    texts[f] = s.replace(old, new)
for f, s in texts.items():
    open(f, 'w', encoding='utf-8').write(s)
print('%s: %d edits in %d files' % (' '.join(designs), len(edits), len(texts)))
