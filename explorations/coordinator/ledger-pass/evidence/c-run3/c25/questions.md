# c25: questions for the prober

## Row 77: does the compiled checker still refuse a method call on a closed trait whose method is declared only in the listed types?

The checker's handling of self types, where clauses and `comprises` clauses changed after the row was written (1c32ccffd, 64fa505c4, 396e4ed8d, 24db899fa), and the row's probe was never re-run.

Program `p20.fss` (the row's probe, from `git show c69cb2064^:explorations/compiler-probes/p20.fss`), compiled path:

```
component p20
export Executable
trait Tree comprises { Leaf, Node } end
object Leaf(v: RR64) extends Tree
  tsum(): RR64 = v
end
object Node(a: Tree, b: Tree) extends Tree
  tsum(): RR64 = a.tsum() + b.tsum()
end
run() = do
  t: Tree = Node(Leaf(1.0), Leaf(2.0))
  println("p20 " t.tsum())
end
end
```

Command, from the main tree, with the program in a scratch folder D: `cd ProjectFortress && ../bin/fortress compile D/p20.fss && ../bin/fortress run p20`. Also under walk: `bin/fortress D/p20.fss`.

- Compile fails with `No such method Tree.tsum.`: the row holds; rewrite only to add `Probe explorations/compiler-probes/p20.fss, in the parent of c69cb2064` in place of "no longer in the tree".
- Compiles and prints `p20 3.0`: close, by the commit that a bisect over the commits above names; the program becomes a compiler test (a change of the tree for a later batch), until then `none` with this run as the reason.
- Another refusal: rewrite the claim with the new message.
- Walk's answer goes into the notes either way (the row names only the compiled path).

## Row 78: does the compiled checker still refuse `tsum(t)` with `t: Tree` and overloads only for `Leaf` and `Node`?

Program `p10.fss` (from `git show c69cb2064^:explorations/compiler-probes/p10.fss`), compiled path:

```
component p10
export Executable
trait Tree comprises { Leaf, Node } end
object Leaf(v: RR64) extends Tree end
object Node(a: Tree, b: Tree) extends Tree end
tsum(t: Leaf): RR64 = t.v
tsum(t: Node): RR64 = tsum(t.a) + tsum(t.b)
run() = do
  t: Tree = Node(Leaf(1.0), Leaf(2.0))
  println("p10 " tsum(t))
end
end
```

Command: `cd ProjectFortress && ../bin/fortress compile D/p10.fss && ../bin/fortress run p10`; also `bin/fortress D/p10.fss`.

- `Leaf->RR64 is not applicable to an argument of type Tree.`: holds; rewrite the probe sentence to `in the parent of c69cb2064`.
- Prints `p10 3.0`: close as for row 77.
- Another message: rewrite the claim with it.

## Row 83 (CONTESTED): does a `nat`-generic function declared in an API's own signature mis-unify on its second instantiation?

The row says the one untested case is a `nat` static parameter in the API's own signatures. Three files in a scratch folder D, under walk:

`NatApi.fsi`:
```
api NatApi
vsum[\nat n\](a: Array1[\RR64, 0, n\]): RR64
end
```

`NatApi.fss`:
```
component NatApi
export NatApi
vsum[\nat n\](a: Array1[\RR64, 0, n\]): RR64 = SUM[i <- 0#n] a[i]
end
```

`UseNatApi.fss`:
```
component UseNatApi
import NatApi.{...}
export Executable
run() = do
  a = array1[\RR64, 3\](1.0)
  b = array1[\RR64, 5\](2.0)
  println("first " vsum(a))
  println("second " vsum(b))
  println("first again " vsum(a))
end
end
```

Command: `cd D && /home/user/fortress/bin/fortress UseNatApi.fss`. Then the compiled path: `cd /home/user/fortress/ProjectFortress && ../bin/fortress compile D/UseNatApi.fss && ../bin/fortress run UseNatApi`.

- Prints `first 3.0`, `second 10.0`, `first again 3.0` on walk: the last untested case does not reproduce; the row becomes `RETIRED` (a source's claim not reproduced in any form tried), class `—`, reproducer the probe's path once committed, notes naming the three cases tried (rows 132, 151 and this one). That status change is the curator's, as for any `CONTESTED` row: put it to the curator with this run.
- A wrong sum or a dispatch failure on the second or third call: the row becomes `NEGATIVE-VERIFIED`, implementation gap (walk), with this program as its probe, its output in the notes.
- A load or parse error of the api unrelated to `nat`: fix the program, not the row.
- The compiled run's result goes in the notes either way. Until one of these, the row keeps its line, except that its path `explorations/run-c/probes/api/` should read "in the parent of `4ebf80aec`".

## XXX tests believed to pass now

None: no row of this chunk names an `XXX` test.
