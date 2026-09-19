# Can the compiler's checker infer a generic object's static argument from the expected type?

**No.** Not from a binding's declared type, not from a function parameter's
type, not from a field's declared type. In every position probed, a reference
to a generic object written without its static arguments is a **static error**
on the compiled path and an `InterpreterBug` under `walk`; writing the static
argument out makes the identical program compile, run and print on both paths.

Measured on `main` at `ff7d7a319`, JDK 25, private cache, `fortress compile` +
`fortress run` against `bin/fortress` walk. Probes and captures are in
`probes/` and `captures/` beside this file. Every declaration is the program's
own — no prelude file was touched.

## What was run

| # | form | walk | compiled |
|---|---|---|---|
| 1 | `object Box[\T\] end`; `b: Box[\ZZ32\] = Box` (`BoxBare`) | `InterpreterBug: ** bug! Couldn't figure out Box[\T\](uninstantiated) <: Box[\ZZ32\]`, rc=1 | **static error**, `Ill-formed type: Box` / `The numbers of the static parameters and the static arguments do not match`, rc=255 |
| 1a | the same as `value object` (`BoxValueBare`) | identical | identical |
| 1b | contrast: `b2 = Box[\ZZ32\]` (`BoxExplicit`) | `BoxExplicit=1`, rc=0 | `BoxExplicit=1`, rc=0 |
| 2 | `trait Opt[\T\] comprises { Full[\T\], Empty[\T\] }`, `f(o: Opt[\ZZ32\]): ZZ32`, call `f(Empty)` (`OptCallBare`) | `InterpreterBug: ** bug! Couldn't figure out Empty[\T\](uninstantiated) <: Opt[\ZZ32\]`, rc=1 | **static error**, `T is not in the kind env [][][]`, rc=255 |
| 2a | contrast: `f(Empty[\ZZ32\])` (`OptCallExpl`) | `OptCallExpl=7`, rc=0 | `OptCallExpl=7`, rc=0 |
| 2b | field with a default: `v: Opt[\String\] = Empty` in an object body (`OptField2`) | the same `InterpreterBug`, at the field | the same `T is not in the kind env [][][]` |
| 2c | contrast: `v: Opt[\String\] = Empty[\String\]` (`OptFieldExpl`) | `OptFieldExpl=1`, rc=0 | `OptFieldExpl=1`, rc=0 |
| 2d | inference from the constructor argument: `f(Full(3))` (`OptFull3`) | `Unification error: … got arg Full[\Int\] of type Full[\Int\]`, rc=1 | `Could not check call to function f` / `Opt[\ZZ32\]->ZZ32 is not applicable to an argument of type Full[\IntLiteral\]`, rc=255 |
| 3 | `g[\T\](x: T): T = x`; `g(3)` (`GenFun`) | `GenFun=3`, rc=0 | `GenFun=3`, rc=0 |
| 5 | a **parametric** empty case taken out of `comprises` and reached by `coerce(_: EmptyG[\T\]) = Empty[\T\]`, called as `f(EmptyG)` (`OptCoerceGen`) | `InterpreterBug: ** bug! Couldn't figure out EmptyG[\T\](uninstantiated) <: Opt[\ZZ32\]`, rc=1 | **static error**, `Ill-formed type: EmptyG` / `The numbers of the static parameters and the static arguments do not match`, rc=255 |
| 4 | the specification's shape: a non-parametric `value object EmptyOne end` with `coerce(_: EmptyOne) = Empty[\T\]` on `Opt`, called as `f(EmptyOne)` (`OptCoerce`) | `Unification error: … got arg EmptyOne of type EmptyOne`, rc=1 | `OptCoerce=7`, **rc=0** |

Two notes on the messages. The compiled path reports both refusals at the
**declaration**, not at the use — `BoxBare.fss:5:8-9` is `object Box[\T\]` and
`OptCallBare.fss:6:38` is the `T` in `value object Full[\T\](x: T) extends
Opt[\T\]` — so the span does not point at the bare reference that caused them.
And `T is not in the kind env [][][]` is an internal `bug(…)` leaking to the
user as a diagnostic; see below.

## Where it is decided

In the **checker**, not in disambiguation. Three sites:

- `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:624-641`
  — the `SVarRef` case of `checkExpr`. With static arguments present
  (`:626-634`) it builds the instantiated trait type. Without them, `:639-640`
  is the whole treatment:

  ```scala
  // TODO: handle missing static args below (either generic higher-order function
  // or generic singleton being used without explicit type instantiation).
  else SVarRef(SExprInfo(span,paren,Some(normalize(ty))), checkedId, sargs, depth)
  ```

  The reference keeps the **uninstantiated** generic type, and the expected
  type is never consulted — this path has no expected-type parameter at all.
  The original team's `TODO` names precisely the case Job B asks about. This is
  the line that decides it.
- `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:116-118`
  — the arity branch that then rejects the type: zero static arguments against
  one static parameter is `The numbers of the static parameters and the static
  arguments do not match`. That is probe 1's message; nothing tries to infer
  before it.
- `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:766`
  — `def staticParam(x: Id) = env.staticParam(x).getOrElse(bug(x, x + " is not
  in the kind env " + env))`. When the uninstantiated `Empty[\T\]` is carried
  into a subtype test, `T` is not in scope and the analyzer raises an internal
  bug. That is probe 2's message.

**The mechanism the brief asks after does exist, and it is for arrows only.**
`inferStaticParams(fnType: ArrowType, argType: Type, context: Option[Type])`
(`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:912-930`)
builds a constraint from the argument *and* from the `context` — the expected
type — and solves it. Its two callers are function application
(`typechecker/impls/Functionals.scala:224`) and coercion
(`typechecker/CoercionOracle.scala:199`). A bare `VarRef` to a generic object
is not an application, so it never reaches any of this. Probe 3 is that
mechanism working; probe 2d shows its limit even where it does run — the
constructor call `Full(3)` was given `IntLiteral` from its argument and the
expected `Opt[\ZZ32\]` did not steer it to `ZZ32`.

There is also no specification pressure to close the `TODO`:
`Specification/basic/inference.tex` is a stub whose whole body is
`\note{This chapter will include the Fortress static type inference
mechanism.}` (`:15`). Static-argument inference was never specified.

## The answer for `Nothing`

The specification writes the empty case **non-parametric** — `trait
Maybe[\T\] comprises { Nothing, Just[\T\] }` and `object Nothing extends
Maybe[\T\] … where {T extends Object}`
(`Specification/basic-lib/convenience.tex:46`, `:49`) — and then uses it bare
where a `Maybe[\String\]` is expected: `getter message(): Maybe[\String\] =
Nothing` (`Specification/basic/exceptions.tex:122`, `:124`).

So a parametric `Nothing[\T\]` **could serve the corpus's spelling only**.
`Nothing[\ZZ32\]` would work (probes 1b, 2a, 2c); the specification's bare
`= Nothing` would not (probes 1, 2, 2b) — it would be a static error on the
compiled path with the message reported at the wrong span, and an
`InterpreterBug` under `walk`. Adding a `coerce` to `Maybe` does not rescue
it, and that was measured rather than argued: probe 5 (`OptCoerceGen`) keeps
the empty case parametric, takes it **out** of the `comprises` hierarchy and
reaches the trait by `coerce(_: EmptyG[\T\]) = Empty[\T\]` instead, and the
bare `f(EmptyG)` is the same static error, `Ill-formed type: EmptyG` / `The
numbers of the static parameters and the static arguments do not match`
(`walk`: `** bug! Couldn't figure out EmptyG[\T\](uninstantiated) <:
Opt[\ZZ32\]`). The bare reference fails in the checker at
`Misc.scala:639-640` before a coercion could be looked for at all.

What does work on the compiled path is exactly what the prelude now does
(`Library/CompilerLibrary.fsi:217-234`, `.fss:522-580`): a non-parametric
`Nothing` plus `coerce(_: Nothing) = NothingObject[\T\]`
(`Library/CompilerLibrary.fss:528`). Probe 4 reproduces that shape in user
code and it compiles and runs — because coercion *is* an arrow and does reach
`inferStaticParams` with the expected type as `context`. Probe 4 also
reproduces, in user code, why one scope cannot hold both spellings: the same
program is a unification error under `walk`, which has no coercion.

Closing the `TODO` at `Misc.scala:639-640` — giving a bare generic-object
reference the expected type's static arguments — is what would let one
parametric `Nothing[\T\]` serve both. It is a checker change in the compiled
path only; `walk`'s half of it is a second, separate change in the
interpreter's own subtype code (`Couldn't figure out …(uninstantiated) <: …`).

## Incidental, outside the brief

`typecase` over a user-declared generic object crashes code generation on the
compiled path: `Error trying to close method scope` from
`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2802`,
reproduced by `OptFullExpl.fss`, `OptEmptyExpl3.fss` and `OptFull2.fss` (all
three type-check and then die in `CodeGen`; `walk` runs the first two and
fails the third for an unrelated `String`/`FlatString` unification). The gap ledger
has no row naming that message. Recorded here, not pursued.
