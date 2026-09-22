#!/usr/bin/env python3
"""Library copies for the zero probe.  usage: make-lib.py <dir>

L0    the tree's library, copied unchanged (the control)
P3a   `excludes Condition[\()\]` dropped, nothing else (the trace's L1a half)
P3b   P3a + the first ANDCOND's parameter arrows narrowed to `I->Boolean`
P3c   P3a + the second ANDCOND (.fss:4467) deleted
ZP    the four untyped local-function parameters written out (piece 1)
ZL    the batch-3 L rung's five plain api defects
ZLP   ZL + ZP, the excludes clause KEPT (isolates what piece 3's repair costs)
ZALL  ZL + ZP + the P3d repair
ZALL2 ZALL with Array3's plane(k) left untyped -- still crashes, so the crash is not plane's
ZALL3 ZALL + a declared return type () on the three local functions -- the one that reaches
      zero crashes
P3dx  P3d with a println in each branch of andCondCombine, to see which branch fires
"""
import os, re, shutil, sys, io

S = sys.argv[1]
FILES = ["Library/FortressLibrary.fss", "Library/FortressLibrary.fsi",
         "Library/RangeInternals.fsi", "Library/List.fsi"]
VARIANTS = ("L0", "P3a", "P3b", "P3c", "P3d", "ZP", "ZL", "ZLP", "ZALL", "ZALL2", "ZALL3", "P3dx")
for v in VARIANTS:
    os.makedirs(f"{S}/{v}", exist_ok=True)
    for p in FILES:
        shutil.copy(p, f"{S}/{v}/{os.path.basename(p)}")

def edit(path, subs):
    s = io.open(path, encoding="utf-8").read()
    for a, b, n in subs:
        assert s.count(a) == n, (path, a[:60], s.count(a), n)
        s = s.replace(a, b)
    io.open(path, "w", encoding="utf-8").write(s)

# ---- piece 3: the excludes clause (FortressLibrary.fsi:2526 / .fss:4444) ------
EC = ("trait RelationalPredicateCondition[\\E\\] extends { Condition[\\()\\] } excludes Condition[\\()\\]",
      "trait RelationalPredicateCondition[\\E\\] extends { Condition[\\()\\] }", 1)
# the first ANDCOND (.fss:1248, .fsi:801): its parameter arrows return Condition[\()\]
AC_OLD = "opr ANDCOND[\\I\\](p1:I->Condition[\\()\\], p2:I->Condition[\\()\\]): I->Condition[\\()\\]"
AC_NEW = "opr ANDCOND[\\I\\](p1:I->Boolean, p2:I->Boolean): I->Condition[\\()\\]"
# the second ANDCOND (.fss:4467), one line, .fss only
AC2 = ("""(* combining two relational predicates into a new relational predicate *)
opr ANDCOND[\\E\\](p : Generator[\\ E \\] -> RelationalPredicateCondition[\\ E \\] , q : Generator[\\ E \\] -> RelationalPredicateCondition[\\ E \\] ) : Generator[\\ E \\] -> Condition[\\ () \\] = (fn (x : Generator[\\ E \\]) : AndRelationalPredicateCondition[\\ E \\] => AndRelationalPredicateCondition[\\ E \\](p, q, x))
""", "", 1)

# ---- piece 1: the four untyped local-function parameters ----------------------
P1 = [("    body(i): L = r.lift((o.body)(i))",
       "    body(i:I): L = r.lift((o.body)(i))", 1),
      ("""  getter asString(): String = do
    r : String := "[" b0 "#" s0 "," b1 "#" s1 "]"
    row(i) =""",
       """  getter asString(): String = do
    r : String := "[" b0 "#" s0 "," b1 "#" s1 "]"
    row(i:ZZ32) =""", 1)]

def p1_array3(s):
    # Array3's asString (.fss:2678): two local functions, three untyped parameters
    for a, b in (("      row(i,k) =", "      row(i:ZZ32,k:ZZ32) ="),
                 ("      plane(k) =", "      plane(k:ZZ32) =")):
        assert s.count(a) == 1, (a, s.count(a))
        s = s.replace(a, b)
    return s

# ---- the batch-3 L rung's five api defects -----------------------------------
def rangeinternals(path):
    s = io.open(path, encoding="utf-8").read()
    n = 0
    for v in ("I", "J", "K"):
        a = f"{v} extends AnyIntegral"
        b = f"{v} extends Integral[\\{v}\\]"
        n += s.count(a); s = s.replace(a, b)
    edit2 = [("object RightScalarRange[\\I\\](r: I, str: I)",
              "object RightScalarRange[\\I extends Integral[\\I\\]\\](r: I, str: I)", 1),
             ("emptyScalarRange[\\I\\](): FullScalarRange[\\I\\]",
              "emptyScalarRange[\\I extends Integral[\\I\\]\\](): FullScalarRange[\\I\\]", 1)]
    for a, b, c in edit2:
        assert s.count(a) == c, (a, s.count(a))
        s = s.replace(a, b)
    io.open(path, "w", encoding="utf-8").write(s)
    return n

L_FSI = [  # family D: the duplicated abstract declarations in trait String
    ("""    abstract splitWithOffsets(): Generator[\\(ZZ32, String)\\]
    abstract split(): Generator[\\String\\]
""", "", 1),
    # family F: Condition.map's covariant return type
    ("    map[\\G\\](f: E->G): Generator[\\G\\]\n    ivmap[\\G\\](f: (ZZ32,E)->G): Generator[\\G\\]",
     "    map[\\G\\](f: E->G): SequentialGenerator[\\G\\]\n    ivmap[\\G\\](f: (ZZ32,E)->G): Generator[\\G\\]", 1),
    # the free comprises fix
    ("trait QQ extends { RR64, StandardPartialOrder[\\QQ\\] } comprises { ... }",
     "trait QQ extends { RR64, StandardPartialOrder[\\QQ\\] } comprises { AnyIntegral }", 1)]
L_LIST = [("  zip[\\F\\](other: List[\\F\\]): Generator[\\(E,F)\\]\n", "", 1)]


# ---- piece 3, the repair that keeps both behaviours (P3d) ---------------------
# The second ANDCOND stops being an overload of the first: it becomes a plain
# function, and the two call sites whose domain is a Generator pick between them
# by typecase, the way Library/Generator2.fss:88-93 already recognises a
# relational predicate.  Nothing needs to exclude anything, so the excludes
# clause at FortressLibrary.fsi:2526 / .fss:4444 can go.  .fss only: the second
# ANDCOND is not in the api.
P3D = [
 ("""(* combining two relational predicates into a new relational predicate *)
opr ANDCOND[\\E\\](p : Generator[\\ E \\] -> RelationalPredicateCondition[\\ E \\] , q : Generator[\\ E \\] -> RelationalPredicateCondition[\\ E \\] ) : Generator[\\ E \\] -> Condition[\\ () \\] = (fn (x : Generator[\\ E \\]) : AndRelationalPredicateCondition[\\ E \\] => AndRelationalPredicateCondition[\\ E \\](p, q, x))""",
  """(* combining two relational predicates into a new relational predicate.  Not an
   overload of ANDCOND any more: two generic overloads are legal in the interpreter
   only when one pair of parameters excludes, and for these two arrows that means
   RelationalPredicateCondition excluding Condition[\\()\\], which it extends. *)
andRelCond[\\E\\](p : Generator[\\ E \\] -> RelationalPredicateCondition[\\ E \\] , q : Generator[\\ E \\] -> RelationalPredicateCondition[\\ E \\] ) : Generator[\\ E \\] -> Condition[\\ () \\] = (fn (x : Generator[\\ E \\]) : AndRelationalPredicateCondition[\\ E \\] => AndRelationalPredicateCondition[\\ E \\](p, q, x))

(* Combining two filter conditions over a generator: the relational combination when
   both are relational predicates, the plain conjunction otherwise -- by typecase what
   the ANDCOND overloading used to do by dispatch. *)
andCondCombine[\\E\\](p : Generator[\\E\\] -> Condition[\\()\\], q : Generator[\\E\\] -> Condition[\\()\\]) : Generator[\\E\\] -> Condition[\\()\\] =
  typecase p of
    (Generator[\\E\\] -> RelationalPredicateCondition[\\E\\]) =>
      typecase q of
        (Generator[\\E\\] -> RelationalPredicateCondition[\\E\\]) => andRelCond[\\E\\](p, q)
        else => p ANDCOND q
      end
    else => p ANDCOND q
  end""", 1),
 ("""  filter(p': Generator[\\ E \\] -> Condition[\\()\\]): SimpleFilterGenerator2[\\E\\] =
  SimpleFilterGenerator2[\\E\\](self.g, self.p ANDCOND p')""",
  """  filter(p': Generator[\\ E \\] -> Condition[\\()\\]): SimpleFilterGenerator2[\\E\\] =
  SimpleFilterGenerator2[\\E\\](self.g, andCondCombine[\\E\\](self.p, p'))""", 1),
 ("f : E -> R) : R = self.g.__generate2filtered[\\R, L1, L2\\](q,r,self.p ANDCOND p',f)",
  "f : E -> R) : R = self.g.__generate2filtered[\\R, L1, L2\\](q,r,andCondCombine[\\E\\](self.p, p'),f)", 1)]

for v in VARIANTS:
    fss, fsi = f"{S}/{v}/FortressLibrary.fss", f"{S}/{v}/FortressLibrary.fsi"
    if v in ("P3a", "P3b", "P3c", "P3d", "ZALL", "ZALL2", "ZALL3", "P3dx"):
        edit(fss, [EC]); edit(fsi, [EC])
    if v in ("P3b",):
        edit(fss, [(AC_OLD, AC_NEW, 1)]); edit(fsi, [(AC_OLD, AC_NEW, 1)])
    if v in ("P3c",):
        edit(fss, [AC2])
    if v in ("P3d", "ZALL", "ZALL2", "ZALL3", "P3dx"):
        edit(fss, P3D)
    if v in ("ZP", "ZLP", "ZALL", "ZALL2", "ZALL3"):
        edit(fss, P1)
        s = p1_array3(io.open(fss, encoding="utf-8").read())
        io.open(fss, "w", encoding="utf-8").write(s)
    if v in ("ZL", "ZLP", "ZALL", "ZALL2", "ZALL3"):
        edit(fsi, L_FSI)
        edit(f"{S}/{v}/List.fsi", L_LIST)
        k = rangeinternals(f"{S}/{v}/RangeInternals.fsi")
        print(f"{v}: {k} AnyIntegral bounds replaced in RangeInternals.fsi")
    if v == "P3dx":
        edit(fss, [
          ("""        (Generator[\\E\\] -> RelationalPredicateCondition[\\E\\]) => andRelCond[\\E\\](p, q)
        else => p ANDCOND q
      end
    else => p ANDCOND q""",
           """        (Generator[\\E\\] -> RelationalPredicateCondition[\\E\\]) => do println("@@ANDCOMBINE relational"); andRelCond[\\E\\](p, q) end
        else => do println("@@ANDCOMBINE plain (q not relational)"); p ANDCOND q end
      end
    else => do println("@@ANDCOMBINE plain (p not relational)"); p ANDCOND q end""", 1)])
    if v == "ZALL2":
        edit(fss, [("      plane(k:ZZ32) =", "      plane(k) =", 1)])
    if v == "ZALL3":
        edit(fss, [("    row(i:ZZ32) =", "    row(i:ZZ32): () =", 1),
                   ("      row(i:ZZ32,k:ZZ32) =", "      row(i:ZZ32,k:ZZ32): () =", 1),
                   ("      plane(k:ZZ32) =", "      plane(k:ZZ32): () =", 1)])
print("variants in", S)
