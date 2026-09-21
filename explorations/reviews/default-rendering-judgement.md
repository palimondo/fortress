# Judgement: what an object with no `asString` of its own should print

Question (ledger row 321, `explorations/fortress-gap-ledger.md:332`): an object or trait value that
declares no `asString` cannot be rendered on the compiled path; the interpreter prints its type name;
the specification is silent (`grep asString Specification/basic Specification/basic-lib` finds nothing).
Decide what such a value prints on both paths, and how. Nothing was built for this review; the compiled
path's behaviour under each alternative is derived from the code cited, not run. Line numbers are HEAD.

## 1. The ground

**Interpreter (measured, `explorations/reviews/default-rendering-probes/`).** `println(x)` and
`x.asDebugString` give: plain `object Box(n: ZZ32)` -> `Box` / `a Box: Box` (`PlainObjectRender.txt`);
`Box[\ZZ32\](1)` on a generic object -> `Box[\ZZ32\]` / `a Box[\ZZ32\]: Box[\ZZ32\]`
(`GenericObjectRender.txt`); `value object Pt(x: ZZ32)` -> `Pt` / `a Pt: Pt` (`ValueObjectRender.txt`).
Mechanism: `Object.asString` is the native `ObjectPrims$ToString` (`LibraryBuiltin/FortressBuiltin.fss:41-42`),
which returns `o.toString()` (`interpreter/glue/prim/ObjectPrims.java:31-35`), and `FObject.toString` is
`type().toString()` (`interpreter/evaluator/values/FObject.java:33-39`); a generic instance's type appends its
arguments in `[\ \]` with `,` as separator (`interpreter/evaluator/types/FTraitOrObject.java:184-191`,
`useful/Useful.java:233-234` and `:79-80`). `asDebugString` is article + `ilkName` + `: ` + `asString`
(`FortressBuiltin.fss:43-48`); `ilkName` is the same type name (`ObjectPrims.java:37-41`).

**Compiled path.** `trait Object`'s default is `getter asString(): String = jAsString(self)`
(`LibraryBuiltin/CompilerBuiltin.fss:350`), bound to `stringOps.asString` (`:282`), which is `return a.toString()`
under the team's own `// this can't be right! DRC` with `return "<" + a.getClass() + ">"` commented out
(`nativeHelpers/stringOps.java:38-41`). Every object class descends, through its supertraits'
`$DefaultTraitMethods` springboards (`compiler/codegen/CodeGen.java:4122-4126`, `NamingCzar.java:129`), from
`trait Any`'s springboard, which extends `FValue` (`CodeGen.java:5049-5051`), and `FValue.toString` is
`this.asString().toString()` (`compiler/runtimeValues/FValue.java:25-27`). Codegen emits no `toString` of its
own (the only quoted `"toString"` in `CodeGen.java` is `StringBuilder.toString` at `:2108`), so the cycle closes.
Three entries: `println(x: Object)` is `x.asString` (`CompilerBuiltin.fss:455`); a Fortress `throw` builds the
Java message with `v.asString()` (`runtimeValues/FException.java:22-23`); transaction debug arguments (row 321).
The compiled `asDebugString` is just `self.asString` (`CompilerBuiltin.fss:352`); the interpreter's article form
sits commented out beneath it (`:353-375`) because the compiled path has no `ilkName`.

**Value objects and identity.** A value object "may be freely copied"; same type, environment and fields
means indistinguishable (`Specification/basic/objects.tex:33-38`, `:350-352`). Codegen does not distinguish
them (no `isValue` in `compiler/`), and `===` on the compiled path is Java `a == b` with the comment
"Eventually need to deal with tuples, value types" (`nativeHelpers/equality.java:15-17`). So a JVM identity hash
is not a property of a value object, and on this path it is not even a stable one yet.

**Can the Fortress name be recovered from a compiled instance?** Yes, from the class name alone. A generic
object's template class is `<api>$Box⟦⟧` (jar: `fortress/CompilerLibrary$Just⟦⟧.class`); the class loader
stamps an instance under the name `stem⟦arg,...⟧` built from each argument's `RTTI.className()`, mangled, then
loaded (`runtimeSystem/RTHelpers.java:31-50`, `InstantiatingClassloader.java:216-219` and `:245-276`).
`RTTI.className()` is already the inverse: canonical class name, `Naming.demangleFortressIdentifier`, dots to
slashes (`runtimeValues/RTTI.java:53-58`; mangling table `runtimeSystem/Naming.java:329-341`, `\|` for `/`,
`\%` for `$`). So `Box[\ZZ32\](1)`'s class demangles to `GenericObjectRender$Box⟦fortress/CompilerBuiltin$ZZ32⟧`;
keeping the segment after the last `/` or `$` in each name and writing `⟦ ⟧` as `[\ \]` gives `Box[\ZZ32\]`,
with the same `,` separator (`Naming.java:1194`). No RTTI lookup is needed; `getClass().getName()` suffices.
Two edges: a tuple or arrow argument names itself `ConcreteTuple⟦..⟧` / `AbstractArrow⟦..⟧`
(`TupleRTTI.java`, `ArrowRTTI.java` `className()`), where the interpreter would write `(A,B)` / `A->B`; each
needs one extra rule in the helper. Not measured here.

## 2. Alternatives

Prints are for (plain `Box(1)`, `Box[\ZZ32\](1)`, `value Pt(1)`). "Java caller" is what `"" + v` or a logger
shows. "Diff" is the walk-vs-compiled check.

| | What it prints (compiled) | Java caller | Cost | Diff |
|---|---|---|---|---|
| **A** team's line, `stringOps.java:39` | `<class PlainObjectRender$Box>`, `<class GenericObjectRender$Box⟦fortress\|CompilerBuiltin\%ZZ32⟧>`, `<class ValueObjectRender$Pt>` | same string | 1 line | differs from walk; deterministic |
| **B** default `asString` = new native "Fortress type name from the class" | `Box`, `Box[\ZZ32\]`, `Pt` (walk's spelling, section 1) | same string | ~20 lines Java in `stringOps.java` (demangle + strip + brackets); 1 import line at `CompilerBuiltin.fss:282`; `:350` becomes `jTypeName(self)`; library cache rebuilt | same as walk; deterministic; tuple/arrow arguments need the two extra rules |
| **C** `FValue.toString` without `asString` (`FValue.java:25-27`) | `asString` still goes `jAsString` -> `toString`, so it prints the raw class name: `PlainObjectRender$Box`, the mangled generic name, `ValueObjectRender$Pt` | class name for *every* Fortress value, `ZZ32` included, since generated classes override `asString`, not `toString` (`FValue.java:22`) | 1-3 lines | differs from walk; deterministic; breaks numbers for Java callers |
| **D1** marker + identity hash, e.g. `Box@1b6d3586`, on both paths | type name + hash | same | as B, plus 1 line in `FObject.java:33-35` | never equal across paths or runs; non-deterministic; meaningless for value objects (above) |
| **D2** marker without hash, e.g. `⟨Box[\ZZ32\]⟩`, on both paths | `⟨Box⟩`, `⟨Box[\ZZ32\]⟩`, `⟨Pt⟩` | same | as B, plus 1 line in `FObject.java:33-35`, plus re-baselining every interpreter `.test` whose expected output carries a bare type name (count not measured) | same on both paths; deterministic |
| **E** fields, case-class style: `Box(1)` | `Box(1)`, `Box(1)`, `Pt(1)`; singletons `Nothing` | same | 30+ lines per path; field order must agree across paths; a cyclic `var` field recurses without bound, the present defect in new clothes | same if both agree; changes the walk oracle |

## 3. Interop: should a Java caller's `toString()` equal `asString`?

Yes. On the JVM `toString()` is *the* human rendering: string concatenation, `String.valueOf`, loggers, debuggers
and test runners all use it, and nothing else of Fortress's is visible to them. Scala and Kotlin follow the same
rule: `case class` / `data class` put their rendering in `toString`, and only classes with no rendering of their
own fall back to `Class@hash`. `FValue.toString` already states the rule (`FValue.java:25-27`); the defect is
only that the default `asString` bounced back into it. So keep `toString = asString` and make `asString`
self-sufficient (B), rather than give `toString` a life of its own (C), which would make a Java caller see
`fortress.CompilerBuiltin$ZZ32` where Fortress prints `1`. Java `equals`/`hashCode` stay identity on this path
(`equality.java:15-17`); that is a separate gap and not touched here.

## 4. Other languages, weighed for Fortress

Swift prints the bare type name for a class with no description; Java/Scala/Kotlin print class plus identity
hash for plain classes and `Name(fields)` for case/data classes; Python prints `<module.Box object at 0x..>`.
The hash is off the table in Fortress: value objects may be copied (section 1), and the differential check
needs deterministic text. The fields form is what Fortress reserves for `asExprString` (the expression that
rebuilds the value, `CompilerBuiltin.fss:351`), and its cycle hazard is real for reference objects. What tips
it: the objects most often printed without an `asString` in this codebase are singletons (`Nothing`, `None`,
row 321), and for a singleton the bare name is the *right* rendering, as `None` is in Scala; a marker would turn
`println(None)` into `<None>`. A debug marker already has a home in Fortress: `asDebugString`, whose interpreter
form is `a Box: Box`, and which the compiled path can be given for free once a type-name native exists.

## 5. Recommendation

Adopt the interpreter's convention on both paths: the bare Fortress type name, static arguments in `[\ \]`,
nothing else (B). Implement it as one new native in `nativeHelpers/stringOps.java` that derives the name from
`getClass().getName()` by the steps in section 1, imported at `CompilerBuiltin.fss:282` and used as the
`Object.asString` default at `:350`; leave `FValue.toString` alone, so a Java or Scala caller sees exactly what
`println` shows. Same native, two lines more: give the compiled `Object` a `getter ilkName()` and restore the
interpreter's five-line article `asDebugString` (`FortressBuiltin.fss:43-48`) in place of `:352`, so the debug
rendering agrees too. Reasons in plain words: it is the only alternative under which the three cases print the
same text on both paths without touching the interpreter or its 382 green tests; it makes singletons print
their names; it fixes all three entry points (print, throw, transactions) because all go through `asString`;
it costs about twenty lines in one file plus two one-line library edits; and it leaves the interop rule
`toString = asString` intact. If a marker is still wanted, put it in `asDebugString` on both paths rather than
in `asString`; if it must be in `asString`, D2 is the only sound form, and its price is re-baselining the
interpreter tests, which should be counted before choosing it.

**Default (accept without reading the argument):** *bare type name, walk's spelling, both paths* --
`Box`, `Box[\ZZ32\]`, `Pt`; no marker, no identity hash; a new `stringOps` native behind `Object.asString` at
`CompilerBuiltin.fss:350`; `FValue.toString` unchanged; tuple/arrow argument spelling checked by one probe when
the helper is written.
