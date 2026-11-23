# Cold read: climb batch 35 record landing

File read: `explorations/compile-ladder/climb-batch-35/record-landing/clean.txt`, 34 entries: 17 FACTS and POSITIONS entries (F-88, F-351, F-397, F-398, F-399, F-400, F-401, P-174, P-40, P-173, F-342, F-345, F-323, F-324, F-396, F-281, F-366) and 17 gap-ledger rows (1100, 815, 935, 594, 119, 406, 470, 526, 724, 764, 835, 889, 983, 995, 1088, 1103, and a new row numbered `?`). I read each ledger row as a fact, with the fact headings.

Context used: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and these lookups in the skill's references: `compiler.md` (count stage, distance stage, payload classes, code-generator walls, conditional extension, type assumption), `records.md` (ledger statuses and row cells), `specification.md` (Working Draft, revision form, the warning grep), `tests-writing.md` (`XXX` tests), `tests-running.md` (onelibrary track, `ONE_JVM`), `worktrees.md` (`old-fortress.sh`). I did not read the ledger's row template, so I could not look up what the statuses mean.

---

## 1. F-88 (fact)

- **Established:** The compiled checker works out which methods a trait or object has ("provides") the way the specification's traits chapter does. A type has its own declarations plus those of its immediate supertypes, minus any inherited declaration that one of its own declarations overrides or declares again at the same parameter types. The checker also checks an overriding declaration's return type against the return type of the declaration it overrides.
- **Conditions:** This is about the compiled checker; the entry says nothing about walk. The code generator compiles `override` from the same table (F-400).
- **Consequence:** Suppose a trait declares again, as abstract, a method it inherits with a body. That abstract declaration hides the inherited body, so any object below the trait must define the method itself, or the checker refuses it.
- **Evidence:** The gated tests `compiler_tests/Override*`. Detail in `compile-ladder/rung-checker-overloading/REPORT.md`, section 1.
- **Could not resolve:**
  - "its immediate supertypes'": does a type get only what is written in its direct supertypes, or everything those supertypes themselves provide, passed down from further up? The second must be meant, but "immediate" says the first. Unclear wording.
  - "overrides or repeats in its parameter types": I read "repeats" as "declares again at equal parameter types" and "overrides" as "declares at more specific parameter types" (or with the `override` modifier). The entry does not say which kind of overriding is meant. Unclear wording.
  - "checks an overriding declaration's return type against the one it overrides": the entry does not say what the check requires (a subtype? the skill's Return Type Rule?). Unclear wording, minor.

## 2. F-351 (fact)

- **Established:** These are the rules for a compiled `atomic` block's transaction.
  - What the read log records:
    - a read of the transaction's own write: nothing;
    - a read of an enclosing (ancestor) transaction's write: the read, together with that write;
    - a read of the committed value: the read, with that value;
    - a read of an empty array element: a mark.
  - Validation covers the transaction and all its ancestors. It runs:
    - at a read, once the global lock has moved since the snapshot;
    - at a commit that did not get the lock at its snapshot.
  - An abort names the transaction whose read failed. A program's `abort()` names none.
  - The block's handler, `BaseTask.leaveTransaction`, catches every exception and ends the block's transaction. Then:
    - an abort that names this transaction, or names none, starts the block again (at the outermost block, any abort does);
    - an exit (`LabelExit`) commits the transaction and throws the exit on; if that commit fails, the handler treats it as an abort (F-401);
    - any other exception is thrown on, after a nested transaction has handed its reads to its parent.
  - A nested commit hands its reads and writes to its parent, even when it wrote nothing.
  - The JVM exception-table entry of a block or a `try` comes after its body's code, so the innermost handler is found first.
- **Conditions:** Compiled path only (`runtimeSystem/`, `CodeGen.forAtomicBlock`, `forTry`). Still open: a nested block sees a plain write by another thread that runs its outer block (row 984).
- **Consequence:** A worker can nest `atomic` blocks on the compiled path and rely on the abort, retry and exit rules above, except in row 984's case. `abort()` restarts the innermost block.
- **Evidence:** `Transaction.java:228-367`, `BaseTask.java:295-322`, `CodeGen.java:2148-2180` and `:2490-2494`. Eight compiled tests and `ArrayStoreJUTest`.
- **Could not resolve:**
  - "once the global lock has moved" and "a commit that did not get the lock at its snapshot": I read the global lock as a version counter, and "moved" as its version changing. The entry never says what the lock is. Unclear wording (implementation jargon).
  - "a read of an empty array element with a mark": the entry does not say what "empty" means (never written? a null slot?) or what the mark is. Unclear wording.
  - Row 984, "a plain write by another thread that runs its outer block". Two readings:
    - (a) another task running inside the same outer block writes without a transaction, and the nested block sees that write;
    - (b) a thread outside writes plainly while this thread runs the outer block.
    Unclear wording.
  - "after a nested transaction has handed its reads to its parent": does this apply only to "throws everything else on", or to every case? Minor.
  - **Conflict with the skill:** `SKILL.md` line 126 tells every worker: "An `exit` out of an `atomic` block loses the block's writes, on both paths (ledger row 1039). Set a flag in the block, and exit after the block." This entry, and F-401, say an exit commits. A worker who has only the skill and this file meets two contradicting rules and cannot tell which holds. The entry is not badly worded; either the skill is stale or the entry is wrong.

## 3. F-397 (fact)

- **Established:** The syntax-tree node of a numeral with a radix point keeps the digits as written. Only apostrophes and U+202F are removed, as for integer numerals. The digit count `n` of the numeral's type is counted from that text, so leading zeros count: `00.5` has `n` = 3, `m` = 1, `r` = 10, `v` = 5. Walk and the checker both count from that one node, through `NumeralNumbers.of`. The value, `m` and `v` are read as before. A message that quotes the numeral shows it as written. For folded constants:
  - a folded `MIN`, `MAX` or `|x|` whose result is one of its written radix-point operands keeps that operand's text, so a checker message shows that operand's zeros in the numeral type;
  - a folded `+` takes the digits of its result value.
- **Conditions:** Radix-point numerals, on both paths. The rule for folded constants was a worker's choice, not the curator's. It shows only in messages, because no coercion reads a folded constant's numbers (P-174).
- **Consequence:** Expect `n` to count leading zeros. A folded constant's numeral type in a message depends on the operator. No coercion's result depends on it.
- **Evidence:** `ExprFactory.java:1637-1638` and `NumeralNumbers.java:71-100`. Tests `tests/RadixPointLeadingZerosWalk.fss` and `compiler_tests/RadixPointLeadingZerosCompiled.test`.
- **Could not resolve:**
  - "A worker chose this at a default": I read "at a default" as "where no decision of the curator applied", but it could also mean "at a point where something takes a default". Unclear wording. The phrase comes back in F-398.
  - "A worker chose this": does "this" cover the whole entry, or only the folded-constant rule? I read it as the folded-constant rule. Unclear wording.
  - "a folded `+` takes its value's digits": the entry does not say how a folded value's digits are counted. Is `n` 3 for `0.50 + 0.25`? What about a fold whose value is a quotient? Unclear wording, low stakes, since only messages show it.

## 4. F-398 (fact)

- **Established:** Two changes to walk.
  - (a) A subscript that is a "math item" now applies with all its indices, as on the compiled path (F-387): `x[5]^2` is `(x[5])^2`, `m[3,7]^2` is `(m[3,7])^2`, `g[3][7]` is `(g[3])[7]`, and `x[5]k` is `(x[5]) k`. The helper `evalAndInvokeMethod` now evaluates every index.
  - (b) A tuple binding at the top level, or as a field of an object or object expression, runs its right side once:
    - a tuple expression with one element per name binds each name to its own element;
    - any other right side is bound to a temporary, declared at the names' types, and each name reads its part of it, as on the compiled path (F-369);
    - a numeral converts to its name's declared type.

    If the right side does not convert, walk's message names the temporary ('... to *tuple_<span> ...'), not the name. A worker left the message so.
- **Conditions:** Walk only. The entry covers top-level and field bindings and does not mention local ones. Open: an array literal inside a right side that is not a tuple expression, bound at an array type, is not built, and the program stops at load (row 1105).
- **Consequence:** A program for both paths may write these subscripts without parentheses, and may bind a call's tuple to names directly, as `(a, b) = f()`.
- **Evidence:** `Evaluator.java:1069-1071` and `DesugarerVisitor.java:854-897`. Four walk tests.
- **Could not resolve:**
  - "a subscript that is a math item": "math item" is a grammar term that I could not find in the skill. I worked out its meaning from the examples. Language concept I lack.
  - Row 1105's form: "An array literal inside a right side that is not a tuple expression, bound at an array type". Two readings: the name that receives the literal is declared at an array type, or the literal sits somewhere inside a right side such as a call's argument. "Is not built" is unclear too. Unclear wording.
  - Local (block-level) tuple bindings: the entry does not say whether they already ran their right side once or are outside the fix. Limit not stated.
  - "at a default": as in F-397.

## 5. F-399 (fact)

- **Established:** On the compiled path, a trait's or object's functional method has a dispatch method. It is an instance method of the receiver's class, with `self` in local 0 and the other arguments after it in their order. `OverloadSet.argumentLocal` (overridden in `ForTraitOrObject`) gives an argument that comes before `self` in the parameter list the local numbered its position plus one. Both the type tests and the casts use it. So the dispatch method reads every argument correctly, wherever `self` stands.
- **Conditions:** A call goes through the dispatch method only where the declaration that top-level dispatch chooses has a more specific declaration below it. A declaration with none below it is called directly, at its exact signature. Two forms never reach the dispatch method:
  - a generic functional method overloaded beside a plain one: the code generator stops first (row 724);
  - a generic functional method with `self` not first: it fails at another site (row 594).
- **Consequence:** An object or trait may overload an inherited, non-generic functional method with `self` in any position.
- **Evidence:** `OverloadSet.java:2357-2363`, `:2495-2508`, `:1538` and `:1876`. Four compiled tests.
- **Could not resolve:**
  - "gives an argument before self's place the local after its place": "its place" can be the argument's place or `self`'s place. Only the argument's place fits "self in local 0", so I read it that way. Unclear wording.
  - "where the declaration that the top-level dispatch of the name chooses has a more specific one below it in the type, as an inherited one does": the entry does not say whether "below it in the type" means declared in a subtype, or more specific within the same type's overloads. "As an inherited one does" could mean that an inherited declaration always has one below it, or that it reaches the dispatch method the same way. I could not settle when a call does and does not reach the dispatch method. Unclear wording.

## 6. F-400 (fact)

- **Established:** The code generator compiles the `override` modifier from the checker's table of the inherited declarations that an override hides (`overriddenNotProvided`).
  - The trait's or object's class holds the overriding method. At each hidden declaration's JVM signature, it also holds a bridge method that runs the override.
  - Nothing runs a hidden declaration's body.
  - A dispatch method is still written over the override and the declarations of its name that it does not override.

  The checker refuses an `override` that overrides nothing, that is, one that is in no overriding pair of `providedAndOverridden` (equal parameter types count), as the traits chapter and walk do. The message is quoted in the entry.
- **Conditions:**
  - Two forms are still code-generator walls (row 1106): an override of, or by, a method with static parameters of its own; and an override in a generic type whose parameter types name a static parameter.
  - The checker refuses an override that overrides a declaration inherited under a conditional extension "only by the clause's bound". Walk runs it (row 1107).
  - The checker checks no override in an object expression (row 1108).
  - Under walk, an object's override hides every inherited declaration of its name, not only those it overrides (row 1109).
- **Consequence:** On the compiled path, a program may write `override` wherever no static parameter is involved.
- **Evidence:** `STypesUtil.scala:1798-1812`, `CodeGen.java:1224-1237` and `:1476-1484`, `OverloadingChecker.scala:424` and `:763-789`. Tests `OverrideModifierCodeGeneration`, `OverrideBridgesCompiled` and `XXXOverrideNothingCompiled`. In a compiled test folder an `XXX` test's commands must each fail (`tests-writing.md`), so this one gates the refusal.
- **Could not resolve:**
  - "overrides a declaration inherited under a conditional extension only by the clause's bound": `compiler.md` defines a conditional extension, but not "only by the clause's bound". Perhaps the override matches the inherited declaration only once the `where` clause's bound replaces the static parameter. Unclear wording.
  - "checks none in an object expression": two readings. The checker may not refuse an `override` that overrides nothing in an object expression, or it may check no overriding there at all, return types included.
  - The conclusion ("wherever no static parameter is involved") looks wider than the limits it follows. Row 1107's refusal is not named in it, unless a conditional extension counts as "a static parameter involved". Unclear scope.

## 7. F-401 (fact)

- **Established:** On both paths, an `exit` out of an `atomic` block commits the block's transaction and keeps its writes, as at a normal end.
  - Compiled: `BaseTask.leaveTransaction` commits on a `LabelExit`.
  - Walk: `FortressTaskRunner.doItOnce` commits on a `LabelException`.

  A failed commit runs the block again. An exception other than an exit still discards the writes. A nested block's commit hands its writes to the outer block, whose commit on the same exit stores them.
- **Conditions:**
  - Neither path can tell an exit to an enclosing label from a late exit to a label block that has already completed. So a late exit also commits the atomic blocks it passes (row 1041).
  - Under walk, an exit or an exception out of a `tryatomic` block that no `atomic` block encloses is wrapped in a `RuntimeException`, and reaches neither its label nor a `catch` (rows 1110 and 1111).
- **Consequence:** A program may exit out of an atomic block (`Specification/basic/expressions/atomic.tex:59-63`).
- **Evidence:** `BaseTask.java:303-309` and `FortressTaskRunner.java:133-141`. Tests `tests/ExitOutOfAtomicWalk.fss` and `compiler_tests/ExitOutOfAtomicCompiled`.
- **Could not resolve:**
  - `tryatomic`: a construct that the skill does not describe. I guess it is an atomic block that throws, rather than retrying, when it cannot commit. Rows 1110 and 1111 depend on it. Language concept I lack.
  - **Conflict with the skill:** `SKILL.md` line 126 says the opposite: an exit loses the block's writes on both paths (row 1039), and gives the flag workaround. The entry does not mention row 1039, so a reader cannot tell whether that row is closed or which statement holds. The entry is not badly worded, but with the skill beside it, it does not stand alone.

## 8. P-174 (position)

- **Decided:** A numeral has a type only at compile time. The types are the Working Draft's (`Specification-1.0-frozen/`, per `specification.md`), both below `Numeral`:
  - `NaturalNumeral[\n, r, v\]` for an integer numeral;
  - `RadixPointNumeral[\n, m, r, v\]` for a numeral with a radix point.

  The four numbers are static parameters: `n` the digit count, `m` the digits after the radix point, `r` the radix, and `v` all the digits read as one integer in radix `r`. So `3.125` is `[\4, 3, 10, 3125\]`. The four are naturals of any size; P-40's `NN32` bound does not apply to them.

  Coercions:
  - Every number type, the library's and a program's own, takes a numeral through a coercion that is generic over the four numbers.
  - A coercion's body is a computation at compile time, with no method invocation.
  - In it, each of the four numbers, used as a value, converts like a numeral into the type its place fixes, and is refused statically where it does not fit (`Byte` with `where { v < 256 }`). It is a `ZZ` where nothing fixes a type.
  - The body calls the type's constructor on values computed from the four. The compiler instantiates the coercion for each numeral and folds it (P-176).

  No numeral value exists at run time. A numeral type has no getters, no `asFloat`, no `asString` and no `=` with a number type. It may be written only as a coercion's or an operator's parameter type.

  A numeral has no sign: `-3` is the type's own prefix `-` applied to the coercion's result for `3`, and a type without `-` refuses it. Any other expression of numerals alone folds first (P-173). It reaches a type only through that type's coercion from the folded value's type (such as `QQ` for `1/2`), because coercions do not chain.

  The binary chapter's numeral coercion and its `opr ||` are left out. The design replaces `IntLiteral` (P-76) and `FloatLiteral` (P-172).
- **Applies:** Every numeral, on both paths, and every number type, including a program's own.
- **Requires:**
  - Write a type's coercion from a numeral type generic over `n`, `m`, `r` and `v`, and compute with the numbers as values, never through getters.
  - Write a numeral type only as a coercion's or an operator's parameter type.
  - Give numeral types no members.
  - Do not rely on coercions chaining.
- **Unfinished:**
  - Row 981: walk runs a numeral type written in a `comprises` clause.
  - With no row yet: the numeral coercions of the one library and of many tests call getters on the four numbers, as `v.asZZ32`.
  - With no row yet: the checker and the literals chapter read each of the four as a `ZZ` wherever it stands, instead of converting it by its place (F-342, F-345).
- **Could not resolve:**
  - "a computation at compile time, with no method invocation": the examples call a constructor (`Byte(v)`, `Interval(...)`) and functions (`roundDown`, `roundUp`). I read "method invocation" as dotted calls only. The entry does not say which calls a coercion's body may make, or what a function such as `roundDown` must be (one that can be evaluated at compile time? any top-level function?). Unclear wording.
  - "at a program's type `-3` is ...": "a program's type" can mean a type that the program declares (P-173 says "a program's own type"), or whatever type the place fixes, library types included. So the types that the sign rule covers are unclear. Unclear wording.
  - "the binary chapter's numeral coercion and `opr ||`": the entry gives only the citation, not what these are, so a reader cannot tell what is left out. Unclear, but not needed to act.

## 9. P-40 (position)

- **Decided:** Sizes, the `nat` and `int` static parameters such as an array's length, are checked.
  - The compiled checker refuses a size beyond `NN32` or `ZZ32`. This is the implementation's bound on both paths (F-140), chosen for arrays, vectors and matrices to match the JVM's `int` indices.
  - A numeral type's four parameters have no such bound. Read as values, they convert where they stand, and are a `ZZ` where nothing fixes a type (P-174).
  - Where the array design (P-85) creates a JVM array, it checks the length at run time and refuses one over 2^31-1.

  Unknown sizes:
  - A size that inference leaves unknown is an error only once it reaches a type, a name or a value. So a declaration may declare a size that none of its types uses, and pass.
  - A call that cannot fix a size of the declaration it would choose is refused, also inside an overload set. It is not passed over in favour of another declaration.

  In the rule that no type extends two different instantiations of one generic trait, two instantiations differ when any static argument other than an operator differs: `Vec[\3\]` and `Vec[\4\]` are two. Boolean arguments count too, once the checker has boolean parameters.

  A size used as a number, as in `0#n`, converts to `ZZ32` where one is needed. The 17 vector and matrix operators of the `FortressLibrary` api declare only the sizes that their types use, which finishes the team's 2008 fix of the component.
- **Applies:** Compiled checking of size parameters, and the creation of JVM arrays.
- **Requires:**
  - Expect a call that cannot fix a size to be refused, not skipped.
  - Treat `Vec[\3\]` and `Vec[\4\]` as different instantiations.
  - Check array lengths against 2^31-1 when arrays are created.
- **Unfinished:**
  - The JVM length check waits for the array design. Under walk, such an array stops at its store's factory with walk's own error, which no `catch` sees (row 527).
  - The checker still passes over a declaration whose unfixed size occurs in its own parameter type (row 400).
  - The checker compares no boolean arguments (row 406).
- **Could not resolve:**
  - "an error only when it reaches a type, a name or a value": the entry does not say what it means for a size to "reach a name". Unclear wording.
  - "converts to `ZZ32` where one is needed, as a numeral does". Two readings:
    - (a) a size used as a number is always a `ZZ32`. F-342 says "is a `ZZ32`", and P-173 says "a `ZZ32` where it is a size".
    - (b) it converts like a numeral into whatever type its place fixes, `ZZ32` being one case.

    "As a numeral does" points to (b); the other entries point to (a). Unclear wording.
  - "once the checker has boolean parameters": row 764 shows that the checker already meets `bool` parameters (it crashes on one), so it is unclear what milestone this names. Unclear wording.

## 10. P-173 (position)

- **Decided:** A numeral converts where it stands.
  - **Where its place fixes a type,** it converts into that type at compile time, from its exact value. A place fixes a type when its declared type has a coercion from the numeral type, as the eight number types have and a program's own type may. The conversion is exact or rounds once (P-76, P-172), and a numeral outside the type's range is refused statically.
  - **Where nothing fixes a type,** it takes the machine default: a `ZZ32`, or a `ZZ64` or `ZZ` when its value does not fit, and an `RR64` with a radix point. `Any`, `Object`, `Number`, an unbounded type parameter and no declared type all take the default. So `x = 3` is a `ZZ32`, `x SEQV z` is true for `z: ZZ32 = 3`, and `bigN = 3000000000` is a `ZZ64`.
  - The default applies to numerals, and to literals after the fold, never to an expression of a numeral type.
  - A `nat` parameter used as a value is a `ZZ32` where it is a size (P-40). Where it is one of a numeral type's four numbers, it converts where it stands, a `ZZ` where nothing fixes a type (P-174).
  - A type parameter that several numerals fix takes the narrowest default that holds every value, and an `RR64` if any of them has a radix point. A float numeral whose conversions into `QQ` and `RR64` tie reads `RR64`.
  - Walk converts at the same places, from the exact value.
  - An expression of numerals alone folds exactly, before the checker, into a signed constant. The constant defaults as an integer numeral does, as a `QQ` for a quotient, or as an `RR64` with a radix point. So `7/2` is a `QQ`, `1/2 = 0.5` is true, and `-2147483648` is a `ZZ32`.
  - The parameter types of the declaration that a call runs are places that fix a type. A numeral argument goes to the most specific declaration that takes it, by its own conversion if need be, with its default as the last resort: `gg(5, w)` runs `(ZZ32, T)`, and `u = 0` is true for `u: NN32` (P-46, P-49).

  Why: this completes the Working Draft's design. It bends P-26 in two places, and the curator takes the bend by his right to finish the specification. He declined exact defaults (`ZZ`, `QQ`) because of microGPT's untyped hyperparameters and indices. The Draft's contradicted text, to be listed in Appendix I, is quoted in the entry.
- **Applies:** Every numeral, on both paths.
- **Requires:**
  - Convert at places that fix a type, and refuse out-of-range numerals statically.
  - Use the stated defaults elsewhere.
  - Fold expressions of numerals alone before the checker.
  - List the Draft's contradicted text in Appendix I.
- **Unfinished:** Under walk, a numeral beside a value typed `Any` departs (row 1016). On both paths, a numeral at a bare type parameter's declaration departs (row 1017). Row 946 may be a departure (see below).
- **Could not resolve:**
  - "walk converts from the exact value at the same places, place by place, before it runs the checker (P-12)": the skill says that walk switches the checker off (`SKILL.md`, phase 5). Either walk runs some checking for this, or "before" means "in place of the checker". Unclear wording, and an apparent conflict with the skill.
  - "a float numeral whose conversions into `QQ` and `RR64` tie reads `RR64`": the entry does not say when the two conversions tie (two candidate declarations? a type parameter that the numeral fixes?). Unclear wording.
  - "(row 946)" after "`bigN = 3000000000` is a `ZZ64` at its binding": is row 946 a place where the tree departs, or only the source of the example? Unclear wording.
  - "It bends P-26 in two places": P-26 is not in this file. I can only guess what is bent from the context ("the compiler's prelude, the team's later word, keeps the numeral's own type"). The entry does not stand without P-26.
  - "the 2012 restart gives `NN` and `QQ`, `literals.tick:25`": the entry does not say what the 2012 restart is. Unclear reference, not needed to act.
  - "What it keeps and changes in form: the judgement's section 3, but for the numeral types' form, which P-174 holds.": I read it as saying that P-173 takes section 3 of `reviews/literal-design-judgement-2026-11-08.md`, except the form of the numeral types, which P-174 sets. The subject "What it keeps and changes in form" is cryptic: does it mean "what it keeps, and what it changes only in form"? Unclear wording.

## 11. F-342 (fact)

- **Established:** The compiled checker gives a numeral its default where no place's type has a coercion from the numeral's type: an untyped binding, `Any`, `Object`, `Number`, an unbounded type parameter, a receiver, a join, or a result with no declared return type. The default is a `ZZ32`, `ZZ64` or `ZZ` by its value, or an `RR64` with a radix point.
  - A type parameter that numerals alone fix takes the narrowest default that holds them all. The conversion into the default ranks as no coercion.
  - A numeral outside a bounded number type's range, or one that rounds to an infinity, is a static error. This holds also for a tuple's element at a tuple type, and for a result position of an `if`, a `case`, a `do` or a `try`.
  - A program's type with no coercion from the numeral's type refuses the numeral.
  - `NaturalNumeral` and `RadixPointNumeral` may be written only as a parameter's type, never as a type that an object or a trait extends.
  - A `nat` or `int` parameter read as a value is a `ZZ32`, but a `ZZ` where it is one of a numeral coercion's four numbers (`KindEnv.getType`).
- **Conditions:** The compiled checker. This builds P-173's checker, P-174's rule on where a numeral type may be written, and P-40's size value. It does not build P-174's conversion of the four numbers where they stand: they read as `ZZ` everywhere, with no row yet. A `typecase`'s selector keeps its own numeral type (row 963).
- **Consequence:** On the compiled path, an untyped numeral is a `ZZ32`, `ZZ64`, `ZZ` or `RR64`. An out-of-range numeral is refused at compile time. In a coercion's body, the four numbers are `ZZ` values.
- **Evidence:** `KindEnv.scala`, `getType`. Nine compiled tests, the `XXX` ones being refusals.
- **Could not resolve:**
  - The title says that the checker refuses a numeral type "written other than as a parameter's type", but the body names only the `extends` case. The entry does not say whether a numeral type written as a variable's type, a return type or a static argument is refused. Unclear wording, and the limit is not stated.
  - "the conversion into the default ranks as no coercion": I read it as saying that, in choosing among declarations, converting a numeral into its default counts as an exact fit, not as a coercion. The entry does not name the ranking it means. Minor.
  - "P-40's size value": P-40's wording ("converts to `ZZ32` where one is needed, as a numeral does") and this entry's ("is a `ZZ32`") read differently. See P-40.

## 12. F-345 (fact)

- **Established:** The specification now states the static numerals (P-174, P-176) and P-171's string literals, in the revision form (an Appendix I entry and `\revision` boxes, per `specification.md`).
  - The literals chapter (`literals.tex:98-285`) gives:
    - each numeral a compile-time numeral type, `NaturalNumeral[\n, r, v\]` or `RadixPointNumeral[\n, m, r, v\]`, below a `Numeral` without static parameters, with the four numbers as static arguments, naturals of any size;
    - every number type a coercion generic over the four numbers;
    - the conversion where a place fixes a type, and the default elsewhere;
    - the minus applied to the coercion's result, and any other static expression reaching a type through its coercion from the default's type;
    - a `where` clause over the four numbers that refuses statically, and the numeral types written only as parameter types.
  - The constant chapter gives the fold (`constant.tex:80-126`).
  - The numbers chapter gives the coercions, with no `=` pairs and no `asFloat` on a numeral type (`numbers.tex:47-71`).
  - The binary chapter's numeral declarations could be written in the new design now, and are left out.
  - Appendix I's entries `revival-numerals` and `revival-string-literals` name each departure of the two implementations, with its row.
- **Conditions:** The chapter departs from P-174 at one point: it reads each of the four numbers as a `ZZ` and folds them, where P-174 converts each where it stands (no row yet).
- **Consequence:** A worker may cite the revised chapters for the numeral design, minding that one departure.
- **Evidence:** The specification's build (`ant genSource`, `ant tex`) with 0 warnings by the grep that `specification.md` gives.
- **Could not resolve:**
  - "read as `ZZ` and folded, one value per place": "one value per place" may mean that each coercion is folded once for each place where a numeral stands, or that each of the four numbers takes one value at each place. Unclear wording.
  - "a program's type receiving a numeral as written": I read it as a program's own type receiving the numeral's own type, with its four numbers taken from the written text. It could also mean receiving the numeral without conversion. Unclear wording.
  - "P-171's string literals": P-171 is not in this file, so what the chapter states about string literals cannot be told from the entry. Cross-reference.
  - "any other static expression": does this mean only an expression of numerals alone (P-173), or also expressions over static parameters? Minor.

## 13. F-323 (fact)

- **Established:** The library's float natives that took `Number` or `AnyIntegral` are now declared at `RR64`, or convert in Fortress.
  - `random`, `RR64`'s `atan2`, `printThreadInfo` and `RR64`'s `^` take an `RR64`, which coercion reaches from a `ZZ32`, an `RR32` or a numeral. Any other number type must write `asFloat(x)`.
  - `RR64`'s power over `AnyIntegral` converts its exponent with each type's own `asFloat`, around a public bare `^` at `ZZ32` that binds `simpleDoubleArith.doublePowInt` (P-162).
  - `RR64`'s and `RR32`'s mixed powers, `RR64`'s floor and ceiling brackets, and `FlatString`'s `=` and `flatConcat` at a `Char` bind new helpers, which compute as their glue classes did. `flatConcat` past U+FFFF keeps only the low 16 bits (row 872).
  - `printThreadInfo` at `RR64` is written in Fortress, through `asString`, so a numeral argument prints as a float: `3.0`.
- **Conditions:** P-165 names the getter `x.asRR64`, which no type declares (no row yet).
- **Consequence:** Pass these functions an `RR64`, or a type that coerces to `RR64`. For another number type, write `asFloat(x)`.
- **Evidence:** Tests `tests/NativeHelperFloatMixedWalk`, `tests/NativeHelperRationalArgumentWalk` and `compiler_tests/NativeHelperFamilyFloatMixedCompiled`. F-299 and F-32 give the counts of bindings.
- **Could not resolve:**
  - "group 3's six": the entry does not say what "group 3" is (a plan's batch of natives?) or which six functions it holds. I guess the six are the ones in the sentence about new helpers. Unclear reference.
  - "converts its exponent by each type's own `asFloat` around a public bare `^` at `ZZ32`": `asFloat` gives a float exponent, yet the `^` it surrounds is "at `ZZ32`" and binds `doublePowInt`. I cannot work out how the exponent reaches a `ZZ32` `^`. "Bare" is unclear too: an unqualified top-level operator? one with no Fortress body? Unclear wording.
  - "The floats' natives" of which library: the one library, the interpreter's library, or both? Probably the interpreter's (one) library. Minor.

## 14. F-324 (fact)

- **Established:** In the one library, `Number` declares nothing: its `comprises` clause, `asFloat`, `=` and `exactValue` are struck.
  - The nine number types each declare `asFloat` in their apis.
  - Each type declares `=` at each number type that it coerces from or into: 42 declarations, a pair for each of the 21 coercions. So two numbers of different types compare by value where a coercion joins them. Otherwise they compare by the fallback `a SEQV b`, or by a written `asFloat(x) = y`.
  - The vector norm is declared at each of eight types.
  - The reflective generator chooses among the five types that `Number` used to list.
  - A program's own number type compares by its own `=`, or by the fallback.
- **Conditions:** This builds P-160's second step and P-165, except P-165's name: the types declare `asFloat`, not the getter `asRR64` (no row yet).
- **Consequence:** Two numbers of types that no coercion joins compare as `SEQV`, which is presumably false for different types. Write `asFloat(x) = y` to compare them by value.
- **Evidence:** `FortressLibrary.fss:381-382` and `.fsi:289-290`. Six walk tests, and the team's `ReflectiveQuickCheckTest`.
- **Could not resolve:**
  - The file's counts disagree: "the nine types declare `asFloat`", the norm "at each of the eight types", "the one library's seven number types" (F-396), and "the eight number types" (P-173; the skill also lists eight). The entry does not say which nine types declare `asFloat`, or why the one library has seven number types. Inconsistency.
  - "the reflective generator chooses among the five former listed types": the entry does not say what the reflective generator is (perhaps the value generator behind `ReflectiveQuickCheckTest`) or which five types were listed. Unclear reference.
  - "P-160's second step": P-160 is not in this file. Cross-reference.

## 15. F-396 (fact)

- **Established:** With `FORTRESS_LIBRARY=one`, the onelibrary track compiles the one library's fourteen components first, in one `.test`. A program compiled against them runs with the JVM's verifier on, as `Hello` does.
  - The run time's classes that name a library's types come in two sets under one set of names:
    - `ProjectFortress/build`, for the prelude;
    - `ProjectFortress/build-one`, built from `ProjectFortress/src-one` by `ant compileAll`, for the one library. The class path puts it first when the one library is selected.
  - The one library's seven number types, `Boolean`, `Char` and `FlatString` are objects whose classes extend payload classes. All are value objects except `FlatString`, a reference object.
  - A helper raises an exception by its simple name, and each set's `LibraryNames` maps that name to its library's class.
- **Conditions:** Against the one library, the compiled path still departs from walk:
  - a varargs call (row 1091);
  - a reduction over a range (row 1099);
  - `println` of a number or a boolean (row 1098);
  - `=` of two strings or two booleans, and `<` of two strings (row 994);
  - `u.asString` in a generic body at `U extends ZZ32` (row 1101);
  - the report of an uncaught exception (row 1102);
  - a caught exception that a helper raises, which is not the object itself (row 1103).

  The checker's choice at a tie follows the JVM's identity-hash order (row 935), except that a tie which `self`'s type makes, in a trait whose `comprises` clause lists types, keeps the trait's own declaration (row 1100).
- **Consequence:** Programs can be compiled and run against the one library, if they avoid the constructs listed above.
- **Evidence:** `OneLibraryJUTest.java:44`, `NamingCzar.java:637-655`, `FlatString.fss:32`. Tests `OneLibraryComponents.test`, `OneLibraryRunHello.test` and `OneLibraryCatchHelperRaises.test`.
- **Could not resolve:**
  - "the one library's seven number types": this count disagrees with the eight in the skill and in P-173 (see F-324). Inconsistency.
  - "`println` of a number or a boolean, which the export check's rule decides as much as the code generator (row 1098)": the entry does not explain how the export check's rule has a part in how `println` behaves. Unclear wording.

## 16. F-281 (fact)

- **Established:** The compiled checker checks the overloading of every operator, symbolic ones included. Its three loops (over the top-level set, over a trait's provided methods, and over their overriding return types) read `isCheckedName`, which admits every operator. The export check also reads every operator, each under its declared name only (F-287). With operators checked, the distance stage and the count stage both total 0, with no crash.
  - An on-demand import adds an api's declarations once, and leaves out a name that its `except` clause lists.
  - Outside its trait, a self type whose `comprises` clause lists types at a `where`-clause variable is read as the trait type (`TypeAnalyzer.selfComprised`). So `AnyList`'s `||` is checked.
- **Conditions:** Open gaps:
  - the check still reads an on-demand api's declaration of a name that the component imports by name from another api (row 813);
  - an `except` that lists an operator leaves the operator imported, on both paths (row 814).

  Row 812 is fixed (F-384).
- **Consequence:** The distance stage is the full check of F-245. Its totals should be '#total 0' and '#crash none', so any new error or crash there is a regression.
- **Evidence:** `OverloadingChecker.scala:828-831`. Five compiled tests, and the stages' outputs.
- **Could not resolve:**
  - "on-demand import": the skill does not define it. I read it as an import of all of an api's names, like Java's `import p.*`. Language concept I lack, though guessable.
  - "Outside its trait, a self type whose `comprises` clause lists types at a `where`-clause variable": I could not work out the construct. Does the trait's `comprises` clause list a `where`-clause type variable, or is `self`'s type bound to such a variable? Unclear wording.
  - "each under its declared name only (F-287)": the entry does not say what other name an operator could be read under. Unclear wording.
  - "the full check of F-245": a cross-reference. What "full" covers can only partly be guessed.

## 17. F-366 (fact)

- **Established:** On both paths, a numeral argument at a call runs the declaration that its default type fits, with one exception. It moves to another declaration that its own coercion reaches, if that declaration's declared parameter types lie strictly below the first one's by subtyping. This builds P-46's rule for a numeral at a call. P-46 does not word the order: a worker chose subtyping, and the curator let the choice stand without wording a decision of his own.
  - Examples:
    - `u = 0` and `0 = u` are true, and `u =/= 0` is false, for a zero `u` of `NN32`, `NN64` or `RR32`;
    - `h = 0.5` is true for `h: QQ = 1/2`;
    - `k(5)` runs `k(x: NN32)` beside `k(x: Any)`;
    - a `case` clause `0` matches a zero `NN32`;
    - a program's own number type with a numeral coercion compares with a numeral by its own `=`.
  - `Equality[\T\]` declares `=/=` as the negation of the type's `=`.
  - The order is subtyping, not the coercion chapter's relation: `f(1.5)` beside `f(x: RR32)` and `f(x: RR64)` runs the `RR64` declaration, and `x^2` for an `RR64` keeps its integer power.
  - A coercion of a value that is not a numeral is not ranked this way.
  - Where a call reaches two declarations only by coercion and they are not ordered, the declaration whose parameter the numeral's default fits as it is runs. So `1.0 s`, for `s: ZZ32`, checks against the one library at `RR64`'s juxtaposition.
  - The checker compares only where the declaration that fits has a numeral at a parameter that is not of the numeral's default type, so `i + 1` costs nothing more.
- **Conditions:**
  - On the compiled path until the switch-over: the checker refuses `u =/= 0` at `RR32` and `RR64` (row 1059), and `u = 0` at `RR32` overflows the stack (row 528).
  - Under walk, a numeral beside a value typed `Any` is converted by the value's run-time type (row 1016).
  - On both paths, a numeral at a bare type parameter's declaration does not go to a more specific declaration (row 1017).
- **Consequence:** A model line may compare a number of any type with a numeral, and write a float numeral beside an integer value, on both paths, minding the prelude's rows until the switch-over.
- **Evidence:** `Functionals.scala:980-1021`, `:1066` and `:1143`, and `OverloadedFunction.java:2422-2525`. Six tests.
- **Could not resolve:**
  - The rule's standing: "the curator has read that choice as landed and let it stand, without wording a decision of his own". The entry does not say whether a worker must treat the subtyping order as a decision to carry out, or as an open question that exploring may reopen. Unclear wording.
  - "`1.0 s` for `s: ZZ32` checks against the one library at `RR64`'s juxtaposition": the entry does not say which two declarations are "reached only by coercion" here, or how a `ZZ32` declaration could take `1.0`. The example is too short to follow. Unclear wording.
  - "the report says which choices walk keeps in its dispatch cache": a pointer only. The entry does not say whether walk's cache can ever give another answer. Minor.

## 18. Ledger row 1100 (NEGATIVE-VERIFIED, implementation gap (checker))

- **Established:** On the compiled path, take a trait whose `comprises` clause lists one object, and a functional method that both declare. A call of it on `self` in the trait takes the object's arrow (signature) when the overloadings come in that order, and the trait's default methods then fail verification: 'VerifyError: Bad type on operand stack'. The one library's `QQ` did so.
  - Cause: `self` is the trait met with the listed type, so the checker ties the two declarations. The tie kept the first declaration in identity-hash order, and the call's descriptor followed it, with no cast.
  - Since the gate repair, a tie that `self`'s type makes keeps the trait's own declaration (`Functionals.scala:1103-1134`).
- **Conditions:** The outcome depends on the JVM's hash order. In climb batch 35's gate, the call chose `denominator` at `(Ratio)` in ant's onelibrary JVM, and at `(QQ)` in one-JVM runs of the same build.
- **Consequence:** The test `ComprisesSelfAbstractFunctionalMethodCall.test` guards the fix only under `-XX:hashCode=0`. In the default hash mode it also passed on the unfixed code.
- **Evidence:** The test above, the specification's "Overloading Resolution", and `TopLevelEnv.java:465-466`. The siblings are rows 935, 815 and 996.
- **Could not resolve:**
  - The status against the notes: the row is open (NEGATIVE-VERIFIED) and its claim reads as current, but its notes say the gate repair makes the tie keep the trait's declaration. Can the `VerifyError` still happen? `records.md` says that a row states its gap as it stands now, and I cannot tell which state this row describes. Unclear wording.
  - Its reading of the specification against row `?`'s: this row's notes say that `self` is the trait met with the listed type, "so the checker ties the two declarations", which reads as if the tie were right. Row `?` says the specification makes the listed type's declaration more specific, so there is no tie. A reader cannot tell whether this row endorses the tie. Unclear wording.
  - "`denominator` at `(Ratio)` in ant's onelibrary JVM, `(QQ)` in one-JVM runs of the same build": I read it as the chosen declaration differing between two ways of running the JVM. "One-JVM runs" probably means `ONE_JVM=1` (`tests-running.md`). Partly unclear.

## 19. Ledger row 815 (NEGATIVE-VERIFIED, implementation gap (codegen))

- **Established:** On the compiled path, take a functional method of a trait that comprises an object, such as `num(self)` in `trait Q comprises { R }` and in `object R extends Q`. Called on a value whose static type is the object, it dies at run time with `NoSuchMethodError`. The missing method is the pair's overload method, `\=num{...}(Q)`, which the component's class does not hold; the link step succeeds.
  - It fails the same way when the trait's `num(self)` is not abstract.
  - It runs with no `comprises` clause, with a dotted `num()`, and through a value typed `Q`.
  - Walk runs it.
- **Conditions:** Compiled path, code generator.
- **Consequence:** Workaround: call through a value typed as the trait.
- **Evidence:** `XXXFunctionalMethodComprisedObject.test`, and `rung-export-align/REPORT.md` section 8.
- **Could not resolve:**
  - "Since `b7b5b0c02b` so does a call on `self` in the trait: '\=width{...}(SelfGetterValueProbe$Solid)'". This sentence follows "Workaround: call through a value typed as the trait", so "so does" can mean that a call on `self` also works as a workaround. But the quoted text looks like a missing method's name, which reads as "a call on `self` now dies the same way". Row `?` ("names the overload method that row 815 finds missing") fits the second reading. But `b7b5b0c02b` is the commit that makes the tie keep the trait's declaration, which would avoid the missing method rather than reach it. Unclear wording.

## 20. Ledger row 935 (NEGATIVE-VERIFIED, implementation gap (checker))

- **Established:** The compiled checker orders a call's candidate declarations, and a tie among the most specific follows that order. The order is not a property of the program:
  - one file at one path gets two orders from two builds of one commit at two tree paths;
  - one build gives two orders, by a direct compile and through the harness.

  The order is the hash order of the overloadings (`ExprDisambiguator.scala:870-874`). A tie keeps the first minimal candidate (row 929), except that a tie which `self`'s type makes, in a trait that comprises types, keeps the trait's own declaration (row 1100).
- **Conditions:** The specification is silent, and no test holds it.
- **Consequence:** A program whose meaning depends on a tie among the most specific declarations can compile differently from build to build. Do not rely on one.
- **Evidence:** Shuffle runs at `157323e51` of `PartialOrderCandidatesCompiled.fss` and `TieAmongMostSpecificCompiled.fss`.
- **Could not resolve:**
  - "shuffles 100 to 115 of `PartialOrderCandidatesCompiled.fss`": the row does not say what a shuffle is (perhaps a copy of the program with its declarations reordered by a numbered seed). Unclear wording.
  - "three stop the base build, six of 100 to 125 the worktree's build, none both": the two ranges differ (100 to 115, and 100 to 125), so it is unclear over which shuffles "none both" was measured. Unclear wording.

## 21. Ledger row 594 (NEGATIVE-VERIFIED, implementation gap (codegen))

- **Established:** On the compiled path, a generic functional method whose `self` parameter is not first compiles and links, then dies at run time with `NoSuchMethodError`. The example is `tag[\R extends Any\](x: R, self): R` in `trait Shape`. The same method with `self` first runs, and walk runs both. The fault is not at the dispatch method: since row 573's fix the reproducer dies with the same message. It is not located yet; the first place to look is `CodeGen.functionalMethodWrapper`, which names the method by its `self` index.
- **Conditions:** Compiled path, generic functional methods only.
- **Consequence:** On the compiled path, put `self` first in a generic functional method.
- **Evidence:** `XXXGenericFunctionalMethodSelfSecond.test`, and the probe `SkFnMethPlain` in `rung-walk-instance/SKEPTIC.md` section 4.
- **Could not resolve:** Nothing. Clear.

## 22. Ledger row 119 (NEGATIVE-VERIFIED, implementation gap (walk))

- **Established:** A bare `ensures { e }`, with the `provided` subclause left out as the grammar allows, crashes walk's desugarer: '** bug! Non-top-level reference to imported FortressLibrary.true'. `DesugarerVisitor.translateEnsures` puts a qualified `FortressLibrary.true` in place of the missing guard, and the interpreter refuses that reference outside the top level.
- **Conditions:** Walk. The row does not say whether the compiled path shows it too.
- **Consequence:** Write `ensures { e provided true }`.
- **Evidence:** `DesugarerVisitor.java:1576` and `:1594-1598`. The probe `run-b2/probes/g1b_ensures_bare.fss`. There is no test.
- **Could not resolve:** The row names walk only. The skill asks a row to say which paths show its defect, so the compiled path's behaviour is a limit not stated. Minor; otherwise clear.

## 23. Ledger row 406 (NEGATIVE-VERIFIED, implementation gap (checker))

- **Established:** The compiled checker's rule against extending two instantiations of one generic trait does not compare boolean arguments. `object F extends { Flag[\true\], Flag[\false\] }`, for `trait Flag[\bool b\]`, passes the checker, and the compile then dies in code generation: "Only emitting RTTI for types right now". Walk runs it.
  - Cause: `checkP`'s `cP` treats a pair of arguments that are neither types nor two literal sizes as no exclusion (the source has the comment "Todo: Handle bool args"). Code generation's `BoolArg` branch then falls through to a throw.
  - Proposed fix: a `bool` case in `cP`, so that the checker refuses the clause as it refuses two literal sizes (F-48). Also a decision on what code generation emits for one boolean instantiation in an `extends` clause.
- **Conditions:** Compiled path.
- **Consequence:** Do not extend a trait with a `bool` parameter on the compiled path. The second half of the fix waits for a decision.
- **Evidence:** `XXXBoolExtendsTwice.test`, `TypeAnalyzer.scala:544-552`, `CodeGen.java:6795-6817`.
- **Could not resolve:** "for one boolean instantiation in an `extends` clause, a decision on what code generation emits": this implies, but does not state, that a single `Flag[\true\]` in an `extends` clause also stops code generation today. Minor.

## 24. Ledger row 470 (NEGATIVE-VERIFIED, implementation gap (checker))

- **Established:** The compiled checker does not check a static argument written at a top-level function call against its parameter's bound. It accepts `n[\String\]("d")` for `n[\T extends Number\]`, and a tuple argument where the bound is `Object`. Walk accepts both too.
  - A dotted call does check it (F-70).
  - A top-level call goes through `staticInstantiation`, which matches only kinds, so a `where` constraint is not checked either (F-250).
  - The bound is checked where the argument is inferred, and in a type.
- **Conditions:** Only static arguments written at a top-level call.
- **Consequence:** Such calls compile and run, as `id[\(ZZ32,ZZ32)\]` and `id[\ZZ32->ZZ32\]` do for `T extends Object`. A worker cannot rely on the checker to enforce such a bound.
- **Evidence:** `STypesUtil.scala:729-741` and `:782-801`, `Functionals.scala:1774`, and `perf-probes/bound-any-compiled/REPORT.md`. There is no test.
- **Could not resolve:** "No gated test can hold it (F-70)": the reason is in F-70, not in the row. I guess it is the harness rule in `tests-writing.md`: an `XXX` compile test whose program compiles reports 'Saw wrong failure'. Cross-reference, minor.

## 25. Ledger row 526 (NEGATIVE-VERIFIED, implementation gap (codegen))

- **Established:** On the compiled path, a `try` expression used as an operand or call argument after another value, as in `"a" || (try f() catch e InvalidRange => "c" end)`, compiles and then fails verification at load: 'Inconsistent stackmap frames'.
  - Cause, by reading: `CodeGen.forTry` emits the handler inline. The JVM clears the operand stack at a handler, so the value pushed before the `try` is gone on the `catch` path.
  - It fails even for a `try` that throws nothing. As the first operand, the `try` runs. Walk prints `ac`.
- **Conditions:** Compiled path; a `try` after the first operand or argument.
- **Consequence:** Bind the `try`'s value to a local first.
- **Evidence:** `XXXTryOperandRungE.test` with the link test `TryOperandRungELink.test`, and `CodeGen.java:2478`.
- **Could not resolve:** Nothing. Clear.

## 26. Ledger row 724 (NEGATIVE-VERIFIED, implementation gap (codegen))

- **Established:** The code generator stops on an object that overloads a functional method with static parameters of its own beside a plain one of the same name: `ClassCastException: FunctionalMethod cannot be cast to Method` in `OverloadSet.getFunctionToCall`. The checker accepts the pair. `ForTraitOrObject.getFunctionToCall` casts any member with static parameters to `Method`, as if it came from a dotted method's overload set. The same happens in a trait that an object extends. Walk stops at load (row 723).
- **Conditions:** Compiled path, at code generation.
- **Consequence:** Do not overload a generic functional method beside a plain one of the same name. Neither path runs it.
- **Evidence:** `XXXGenericFunctionalMethodBesidePlain.test`, `OverloadSet.java:2574-2578`, and `CodeGen.java:4989` and `:5331`.
- **Could not resolve:** Nothing. Clear.

## 27. Ledger row 764 (NEGATIVE-VERIFIED, implementation gap (checker))

- **Established:** The compiled checker crashes when a method's own `bool` static parameter is written at the call: `O.unflag[\true\](Flag[\true\](7))`, for `unflag[\bool b\](f: Flag[\b\])` in `object O`, gives 'ClassCastException: TraitType cannot be cast to BoolExpr'. `FnNameInfo.normalizedSchema` replaces each static parameter with `boundsFor`, which is a type argument even for a `bool` parameter. So the `b` in `Flag[\b\]` becomes a `TraitType`. A generic function's written `[\true\]` passes the checker (row 763).
- **Conditions:** Compiled checker; a method (not a top-level function) with its own `bool` static parameter written at the call.
- **Consequence:** Do not write a method's `bool` static argument at the call on the compiled path. A top-level generic function is fine.
- **Evidence:** `XXXBoolStaticArgMethodWritten.test`, `FnNameInfo.java:168-206`, `StaticTypeReplacer.java:121-131`, and F-36.
- **Could not resolve:** The row does not say what walk does with the program. Minor. Otherwise clear.

## 28. Ledger row 835 (NEGATIVE-VERIFIED, implementation gap (checker))

- **Established:** The compiled export check never lets a component's functional method satisfy an api's top-level function or operator. An api's `opr <->(a: T, b: T): ZZ32`, met by `object T opr <->(self, o: T): ZZ32 = 5 end`, is refused with 'does not define all declarations', though the specification ("is satisfied by a set of top-level function and functional method declarations") accepts it.
  - Cause: `uncoveredDeclarations` and `coverOverloading` keep only `SDeclaredFunction`s.
  - Before `bb3925156` the check skipped operators, so the operator case compiled and ran. A named function was refused then as now.
  - Walk runs both.
- **Conditions:** Compiled export check.
- **Consequence:** Workaround: declare it at the top level in the component.
- **Evidence:** `XXXExportOperatorFunctionalMethod.test`, `ExportChecker.scala:613-620` and `:251`, `OverloadingChecker.scala:910-914`, and `source-code.tex:356-361`.
- **Could not resolve:** Nothing. Clear.

## 29. Ledger row 889 (NEGATIVE-VERIFIED, implementation gap (codegen))

- **Established:** The code generator crashes with a `NullPointerException` on a trait or object whose `extends` clause gives a generic trait a tuple static argument that holds `Any`, as in `object PairHolder extends Holder[\(Any, ZZ32)\]`. The checker accepts it.
  - Cause: `generateTypeReference`'s tuple branch passes an element that is neither a trait type nor a type variable back into itself with a null name, and `NamingCzar.repairedApiName` dereferences that null.
  - The arrow-type branch makes the same call, but that case was not measured.
- **Conditions:** Compiled path, at code generation.
- **Consequence:** Workaround: use a named trait in place of `Any` in the tuple.
- **Evidence:** `XXXExtendsGenericAtTupleOfAny.test`, `CodeGen.java:6024` and `:6760`, `NamingCzar.java:1720`.
- **Could not resolve:** Nothing. Clear.

## 30. Ledger row 983 (NEGATIVE-BOUNDED, implementation gap (codegen))

- **Established:** On the compiled path, a task captures every variable in scope whose name is a static parameter in the type of a function that the task's expression calls. Every numeral's coercion is `coerce[\nat n, nat r, nat v\]`, so variables named `n`, `r` or `v` are captured wherever a numeral appears. The extra value is passed to the task and never read.
  - Cause: `FreeVariables.forId` collects the names of static parameters and `IntRef`s in a `FnRef`'s arrow type, and `CodeGen.getFreeVars` keeps each one that names a variable in scope.
  - A worse case is repaired: where the name was the variable that a binding declares (`r: ZZ32 = add(up(k), up(k + 1))`), the task read the slot before it was set ('VerifyError: Bad local variable type'). `forLocalVarDecl` now handles it (`LocalBindingForkedNumeralCompiled`).
- **Conditions:** Compiled tasks (forked code) that call generic functions, numeral coercions included.
- **Consequence:** What remains costs one constructor argument per such variable. It does not change results.
- **Evidence:** `FreeVariables.java:98`, `CodeGen.java:5563`, and an instrumented copy's output. There is no test of the remaining cost.
- **Could not resolve:**
  - The status `NEGATIVE-BOUNDED`: `records.md` says the ledger's row template defines each status, and I was not to read it. From this row I guess that it means "verified, with its harm bounded (here, a cost only)". Record term I lack.

## 31. Ledger row 995 (NEGATIVE-BOUNDED, implementation gap (codegen))

- **Established:** On the compiled path, some types are carried by a hand-written class. Except for an object over a payload class, such a type has two names at run time: its `RTTIc` holds the trait's interface, and method descriptors hold the carrier class. So a static argument inferred from a value's run-time type makes a second instance.
  - An object over a payload class has one name, because its RTTI is named by the payload class. These are the prelude's seven number types, and the one library's seven number types, `Boolean`, `Char` and `FlatString`.
  - Types that keep two names: the prelude's `Boolean`, `Character` and `JavaString`, both libraries' readers and writers, and the one library's stores.
  - No program shows the defect.
- **Conditions:** Compiled path; generic code whose static argument is inferred from a run-time type.
- **Consequence:** None observed yet. A worker who meets a duplicate instantiation of one of these types should suspect this row.
- **Evidence:** `CodeGen.java:6388-6394`, `NamingCzar.java:637-655`, tests `ComprisesMeetGenericTrait` and `GenericBesidePlainZZ32`, and `plan-31/probes/switch-rehearsal.md` W12.
- **Could not resolve:**
  - "`RTTIc`": I could not find it in the skill. I read it as the class that carries a type's run-time type information. Term I lack.
  - "makes another instance": I read it as another instantiation, that is, a second specialised class or a second type object for the same type. It could also mean a second value. Unclear wording.
  - `NEGATIVE-BOUNDED`: as row 983.

## 32. Ledger row 1088 (NEGATIVE-VERIFIED, implementation gap (codegen))

- **Established:** The code generator stops at a call made at an assumption of a generic trait, of a method whose parameter has the trait's type parameter. An example is `stamp(Q asif Tagged[\String\], s asif String)` for `stamp(self, x: T)` in `Tagged[\T\]`: 'Can't find the body that Tagged[\String\] gives stamp at ...'.
  - A dotted call fails the same way. A method whose parameters do not name `T` compiles.
  - `emitBodyGivenBy` finds the body, but its signature differs from the call's; this was not traced further.
  - At a local trait the base stopped the same way. At an imported api's generic trait the base ran the object's override; since rung R's `hasBodyInItsTrait` it stops there too, also at the prelude's `Equality[\T\]`.
  - Walk prints `Tagged stamp`.
- **Conditions:** Compiled path; type assumptions (`compiler.md` describes them) at a generic trait.
- **Consequence:** Do not call such a method at an assumption of a generic trait on the compiled path. `compiler.md` lists the same wall.
- **Evidence:** `XXXAsIfGenericTraitParamCompiled.test`, and `CodeGen.java:7291-7316`.
- **Could not resolve:** Nothing. Clear, with `compiler.md`'s section on type assumptions.

## 33. Ledger row 1103 (NEGATIVE-VERIFIED, implementation gap (runtime))

- **Established:** On the compiled path, when a helper raises an exception object that has no value parameters, the exception is a second instance of the object. So a caught `IntegerOverflow`, or the one library's `FileNotFoundException`, is not `SEQV` the object. Walk gives the object itself.
  - Cause: `Utility.makeFortressException(name)` builds the exception with its constructor without parameters. The rung's fallback for an object without a constructor over `String` does the same. The code generator keeps an object's one instance in the static field `ONLY`.
  - The prelude shows it too: `catch e IntegerOverflow => e SEQV IntegerOverflow` answers false on the base and on the head. Walk answers true.
- **Conditions:** Compiled path only; exceptions raised by helpers.
- **Consequence:** Do not test a caught exception's identity with `SEQV` on the compiled path. Match it by type in the `catch` clause.
- **Evidence:** `XXXOneLibraryRunHelperRaiseSingleton.test`, `Utility.java:49-51` and `:66-69`, and `CodeGen.java:5182-5188`.
- **Could not resolve:** Nothing. Clear. (The test cell lacks backticks around its path; this is formatting only.)

## 34. Ledger row `?` (new; NEGATIVE-VERIFIED, implementation gap (checker))

- **Established:** On the compiled path, take a trait whose `comprises` clause lists types, where the trait's declaration and a listed type's declaration tie for a call on `self`. The call takes the trait's declaration, and its return type. The specification takes the listed type's declaration, which is more specific and may have a narrower return type.
  - In such a trait, `self` has the trait's type met with the listed types (`var-ref.tex:63-69`). So a listed type's declaration, such as `Ratio`'s `denominator(self)`, applies at `self` and is the more specific (`overloading.tex:355-358`).
  - The checker reads the trait's own `self` parameter as the same meet, and ties the two. Since `b7b5b0c02b` the tie keeps the trait's declaration (`Functionals.scala:1103-1134`). So the call's static type is the trait's return type, which is wider where the listed type's is narrower.
  - A call at the listed type's arrow would name the overload method that row 815 finds missing.
- **Conditions:** Compiled checker.
- **Consequence:** In such a trait, a call on `self` has the trait's return type. A worker who needs the narrower type cannot get it from the call. Choosing the listed type's declaration would run into row 815.
- **Evidence:** Reading of the specification and the code. `climb-batch-35/REPAIR-gate.md`, "Deviations from the ruling", 3. There is no test.
- **Could not resolve:**
  - "Neither library has such a pair": the row's own example is `Ratio`'s `denominator(self)`, and row 1100 places `denominator` at `(Ratio)` in the one library. So "such a pair" must mean something narrower, perhaps a pair whose return types differ. A reader cannot tell whether any library code meets the departure. Unclear wording.
  - Row 1100's notes say "so the checker ties the two declarations" as if the tie followed from the specification, while this row says the specification gives no tie (see row 1100). Unclear wording.
  - The status `NEGATIVE-VERIFIED` with no test and only a source report: what verified it (a probe? reading?) is not said. Minor.

---

## Points across entries

These come from reading the entries side by side, or beside the skill. No single entry shows them.

1. **Exit out of an atomic block.** F-351 and F-401 say an exit commits the block's writes on both paths. `SKILL.md` line 126 says it loses them, cites row 1039, and gives a workaround. A worker with only the skill and this file meets a direct contradiction.
2. **Walk and the checker.** P-173 says walk converts numerals "before it runs the checker". `SKILL.md`, phase 5, says walk switches the checker off.
3. **The number of number types.** "the nine types" (F-324), "the eight types" (F-324's norm, P-173, the skill), and "the one library's seven number types" (F-396, row 995).
4. **A size used as a value.** P-40 says it "converts to `ZZ32` where one is needed, as a numeral does". F-342 and P-173 say it "is a `ZZ32`".
5. **Self-type ties in a comprising trait.** Rows 1100, 815, 935, `?` and F-396 all describe the tie and the commit `b7b5b0c02b`, but they do not agree:
   - row 1100 calls the tie the reading of the specification, while row `?` calls it a departure from the specification;
   - row 815's "so does a call on `self`" reads two ways.
6. **Cross-references the file does not carry.** Entries lean on these to be understood: P-26 (what P-173 bends), P-160 (F-324), P-171 (F-345), F-245 and F-287 (F-281), F-70 (row 470), and "group 3" (F-323). The rest of the numbered references (F-387, F-369, F-400, P-46, P-76, P-172, P-176 and others) are glossed enough where they stand.
