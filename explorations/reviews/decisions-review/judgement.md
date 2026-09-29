<!-- The top-tier judgement Pavol asked for on 2026-09-29 (POSITIONS, 2026-09-29, 12:17 UTC): have his decisions since 2026-09-16 kept faith with what Fortress's designers and implementers intended and with his own principles, and has he committed a cardinal error of commission or of omission. Written the same day, reading only, from the evidence map `evidence.md` (`8b35d782b`) and from the primary sources it cites, each deciding claim checked at its line: `Specification-1.0-frozen/` (the Working Draft of February 2011), `Specification/` (the same draft as the revival revises it), `Specification-1.0-frozen/fortress.1.0.pdf` (the 2008 release, read through pdftotext), `Documentation/Specification/Prose/Language/types.tick` (the 2012 Types chapter), `Papers/Types/`, `Papers/Welterweight/`, the team's library and prelude, and the team's commits. Nothing was run, no Fortress program measured. Tree at `dd55a31ad`. For Pavol, who has not read the specification, the type papers or the library, and for the coordinator. -->

# Pavol's decisions since 2026-09-16, judged against the designers' intent

## In short

- On every large call he has gone the way the designers' own implementers went: one library, the exclusion rule kept and the number tower flattened, sizes in the types with unboxed storage, the 2009 overload sentence dropped, `comprises` read at the level of values, conversions never changing which declaration runs. Each of these is what the type group built or wrote last, not what the early draft wished.
- Where the designers left no word, his calls are pragmatic, consistent with each other, and mostly in the library's own patterns. Two are not: row 330 (`floor` on a float returning an unbounded integer), decided on a premise route A then removed and against the library's consistent declaration; and the written `extends Object` bound of batch 7, which turned a compile-time refusal into a JVM crash the switch-over will meet (row 447).
- No cardinal error of commission. Row 330 has cost nothing yet and reverses for the price of one entry. Row 447 costs one code-generator rung and must land before the switch-over.
- The errors of omission are in the plan, not in the decisions: the switch-over (phase 4) is the largest and least designed piece; phase 5's collision between "no model line changes" and "sizes in the model's own types" is measured (decision D's diff: 21 lines out, 29 in) but not yet faced by him; the unboxed store's mechanism (decision A) has no design and the "fast" half of the goal rests on it.
- The standard itself has two voices on the tower, and his decisions follow the later one. The record's own brief for route A did not cite the sentence that most supports it (`Specification-1.0-frozen/basic/types-vals-vars.tex:501-502`).
- He has not gone astray. Section 6 lists eleven things to decide or confirm, the first four before batch 7b.

## 1. Primer: what the designers were aiming for

Terms are defined where they first appear. "The team" is the Sun/Oracle Fortress group, 2003-2012. "Walk" is the interpreter; "the checker" is the static type checker, which runs only on the compiled path. "The one library" is the interpreter's library (`Library/FortressLibrary.fss` and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`), which his decision of 2026-09-21 makes the library the compiler checks. "The prelude" is the compiler's own smaller library (`CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra`), to be deleted at "the switch-over", the day the compiled path reads the one library.

### The three texts, and which is the designers' latest word

- The 2008 release is `Specification-1.0-frozen/fortress.1.0.pdf`, 262 pages, the team's own artefact (`403afbe0b`, 2008-03-31).
- The Working Draft is the LaTeX under `Specification/`. The team's last edit to its text is 2010-12-09 (`44e03b176`). Steele cloned it whole into `Specification-1.0-frozen/` on 2012-01-04, so the frozen directory is byte for byte the draft of 2011-02-02, not the 1.0 text; only the PDF beside it is 1.0 (`coordinator/spec-lineage.md` §§ 1-2, checked). "July 2012" on the revival's PDF is the date of a parentless import commit, chosen by the revival (`414b790e3`), not of any edit.
- The restart is `Documentation/Specification/`, begun 2012-02-20 by Luchangco, abandoned 2012-05-31 with most chapters empty. Its Types chapter (`Prose/Language/types.tick`, 1,056 lines) is fresh 2012 prose and the team's last word on types, exclusion and `comprises`. It has no chapter on static parameters, numbers, coercion beyond a relation, or the library.
- The papers: the OOPSLA 2011 type-system paper (`Papers/Types/`), Naden's 2012 journal text on the return-type rule (`Papers/Types/journal/justificationOfRTR.tex`, last touched 2012-08-31, the project's last day), the Welterweight calculus (2012), the four patents filed 2012-08-31, and Steele's 2016 retrospective (`research/extracts/SteeleJuliaCon2016-extract.md`).
- So "the designers' latest word" is not one text. On types and the exclusion rule it is the 2012 Types chapter and Naden. On the library, static parameters, coercion, overloading resolution and the number chapters it is the Working Draft, whose text on those topics is 2008-2010. On what they actually made run, it is the code: the interpreter's library (2007-2012, never type-checked) and the compiler's prelude and checker (2009-2012).

### Numbers and the tower

- A **tower** is a chain of number types where each is a subtype of the next: an integer is a rational is a real. In the interpreter's library the team built exactly that in 2008: `ZZ32 <: ZZ64 <: ZZ <: AnyIntegral <: QQ <: RR64 <: Number`, and kept it to the end (`reviews/multiple-instantiation-exclusion.md` § 7, commits `cfe16b43b`, `fca589bbb`). The library chapters of the Working Draft say the same in prose: ℤ "is a subtype of ℚ" (`Specification-1.0-frozen/basic-lib/basic-integers.tex:28-29`) and the listing has `trait ℤ extends { ℚ, ℤ*, ... }` (`:195-196`); ℚ "is a subtype of ℝ" (`basic-lib/numbers.tex:36-37`).
- The types chapter of the same draft says the opposite: "Moreover, there are several simple standard numeric types. These types are mutually exclusive; no value has more than one of them." (`basic/types-vals-vars.tex:500-502`, the list that follows names ℤ, ℕ, ℚ, ℝ, ℂ and every fixed width). That sentence is not in the text of the 2008 release (searched) and is in the draft by February 2011; the cut history does not date it more closely. The 2012 Types chapter keeps it word for word (`types.tick:977-980`). So the draft contradicts itself, and the later text sides with exclusion.
- The compiler side went flat from the start. Chase, 2009-08-31: "ZZ32 is NOT a subtype of ZZ64, RR32 is NOT a subtype of RR64; this would be a good time to get coercion working" (`6896886fb`). Maessen, 2009-11-17: "expect more coercions to come on line as we gradually migrate to a flat numeric hierarchy" (`128f313b5`). Steele added the prelude's `Comparison` traits with their `extends` clauses commented out on 2011-07-15 (`b3c2e1342`) and had `ZZ32` and `ZZ64` as siblings under `Number` by 2011-07-22 (`da5291587`). Steele's 2016 slide draws `Number → {Integral → ZZ32, ZZ64, ZZ; Float → RR32, RR64}` (`SteeleJuliaCon2016-extract.md:159-161`).
- Rounding: the draft's rational chapter declares `floor`, `⌊⌋`, `ceiling`, `⌈⌉`, `round`, `truncate` all returning ℤ, and says `round` sends an exact half to the even integer (`basic-lib/numbers.tex:457-472`). It has no chapter for the floating-point types. The 2008 release, in its library listing, declares for floats what C and IEEE do: `floor(a: Number): RR64`, `⌊a⌋: ZZ64`, `ceiling(a: Number): RR64`, `⌈a⌉: ZZ64`, `truncate(a: Number): ZZ64` (the 1.0 PDF, pdftotext lines 8295-8299). The interpreter's api declares the same on `RR64`: `floor(self): RR64`, `|\self/| : ZZ64`, `ceiling(self): RR64`, `|/self\| : ZZ64`, `truncate(self): ZZ64` (`Library/FortressLibrary.fsi:368-372`); its component body is inconsistent with the api (`|\self/| : ZZ`, `truncate(self): RR64`, `round(self): ZZ`, `Library/FortressLibrary.fss:470-475`). The team's prelude declared none of them for `RR64` and left `floor(self): RR64` and `ceiling(self): RR64` in a comment (`git show 5a68404fd:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi`, lines 438-439).
- Overflow: "For integer results, overflow throws an `IntegerOverflow`" (`basic/operators/opr-overview.tex:154-155`, `:195-196`), kept by Steele in the 2012 restart; wrapping has its own operators ∔ ∸ ⨰ and saturation ⊞ ⊟ ⊡ (`:172-176`, `:205-209`). The interpreter wrapped silently; Maessen's 2007 comment calls the range checks not yet done.
- Where they left it open: how to have both the exclusion rule (below) and ℤ inside ℚ. Naden, 2012: the numeric hierarchy is written with the self-type idiom, it has "crossed instantiations of the kind that we determined must be outlawed", the self-type bound fixes one failure and not the other, "Victor and John have started working on this sort of theory with their trolls", and "more work needs to be done in order to understand how to best support the numerical hierarchy in the Fortress type system" (`justificationOfRTR.tex:568-632`). Nobody solved it.

### Generics and their specialisation

- A **static parameter** is a parameter of a declaration filled at compile time or at run time: a type (`List[\T\]`), a number (`Vector[\T, nat n\]`), a boolean, an operator, a dimension. An **instantiation** fills it (`List[\ZZ\]`). Fortress **reifies** generics: a value carries its instantiation at run time, so dispatch can tell `List[\Boolean\]` from `List[\String\]` (Steele 2016, slide 41). Java erases them; this is where Fortress departed from Java.
- **Specialisation** is a generic declaration beside a special version for one instantiation: `tail[\X\](x: List[\X\])` beside `tail(x: List[\ZZ\])`, chosen at run time by the value. Naden's 2011 workshop paper says the library's authors "found it useful ... to define both monomorphic and polymorphic versions of functions" (`reviews/mie-probes/literature.md` § 1). The team's tests and the checker's dispatcher are built for it.
- To make that sound they adopted **multiple instantiation exclusion**: no type may be a subtype of two different instantiations of one generic ("a rule that forbids multiple instantiation inheritance, in which a type (other than Bottom) is a subtype of distinct applications of a type constructor", `Papers/Types/exclusion.tick:141-152`; in the checker since 2010-05-28 and as `checkP` since 2010-07-26). The 2012 Types chapter renames it "instantiation exclusion" and adds a `covariant` modifier (`types.tick:322-339`, `:353-372`). Naden: "Fortress implements blanket multiple instantiation exclusion for the semantic benefits and the simplicity of the restriction" (`justificationOfRTR.tex:496-497`). The tower breaks it because each level says "I am `Equality` at my own type", so one `ZZ32` is `Equality` at five instantiations.
- **Run-time instantiation**: when dispatch picks a generic declaration the static call did not select, its parameters must be inferred at run time; the 2011 paper says so and leaves how "beyond the scope of this paper" (`Papers/Types/rules.tick:118-129`). Welterweight aims for "the most specific instantiation of an applicable entrypoint" (`Papers/Welterweight/dispatch.tick:67`). Steele's 2016 slide 44, "Where We Got Stuck": generic methods with symmetric dispatch need the parametric meet rule and the return-type rule, which need "nontrivial run-time constraint solving" ("a euphemism for exponential cost"); "So we had a grand vision, but could not quite pull it off." Naden's last memo (`Papers/RuntimeInstantiation/`) restricts the instance by the static return type; implemented on neither path.
- **`where` clauses**, a second way to bind a type variable ("Trait declarations are allowed to extend other instantiations of themselves", `basic/trait-parameters.tex:339-352`, and `object Empty extends List[\T\] where {T extends Object}`, `:384-397`): "Widening and where clauses are not yet supported" (`basic/conversions-coercions.tex:15`); code generation refuses any declaration with one (FACTS:158).

### Overloading and dispatch

- Fortress has **symmetric multimethods**: an overloaded call is resolved on all its arguments, once statically (the most specific declaration applicable to the static types) and again at run time (the most specific applicable to the run-time types, `basic/overloading.tex:262-276`). The **return-type rule** ties the two: a more specific declaration's result must fit the less specific one's, so the run-time choice never returns something the static choice did not promise.
- On static parameters the 2008 release had a first model that "may be replaced when the static type checker and the type inference engine are implemented" (the 1.0 PDF, lines 5234-5241). The 2009 draft replaced it with a ban: "it is an error for their static parameters to differ ... Hence, static parameters do not enter into the determination of which declarations are applicable" (`basic/overloading.tex:100-107`), and in the same draft listed "Relaxing restrictions on static parameters of overloaded functionals" as future work with Jan Maessen's `array1` pair (`appendices/future.tex:236-266`). The 2011 paper allows differing static parameters under three rules (No Duplicates, Meet, Return Type), the checker enforces them, walk never enforced the ban, and the 2012 restart drops the sentence.

### Coercion

- A **coercion** is a conversion a trait declares from another type (`trait ZZ64 ... coerce(z: ZZ32)`), inserted by the compiler where no declaration applies without it. It is not chained (`conversions-coercions.tex:127-130`). "For a given functional call, we first determine whether there exists a declaration that is applicable without coercion. If so, the most specific declaration is selected; if not, then coercions are explicitly added" (`:454-462`). It is resolved on static types: "Notice that coercion is resolved statically", with an example where `c: C = D` and `f(c)` calls `f(A)` by coercion "despite the fact that the declaration f(B) is applicable to the dynamic call f(D)" (`:598-635`). The draft's own example of widths declares `ZZ64 coerce(z: ZZ32)` and `ZZ128` from both (`:549-565`); no sentence makes `ZZ32` a subtype of `ZZ64`. "Fortress supports the automatic conversion of integer values to floating-point values" (`:64-66`), a general sentence.
- Numerals: "numerals have their own types ... This approach allows library designers to decide how numerals should interact with other types of objects by defining coercion operations" (`basic/expressions/literals.tex:132-148`); the types named (`NaturalNumeral[\n,10,v\]`) carry the value and were never implemented; a note says "We need to describe the Numeral type hierarchy" (`:83-95`). The prelude has one `IntLiteral`, a sibling each number type coerces from (`CompilerBuiltin.fsi:390-429`; Maessen 2009: "ZZ32 now coerces IntLiteral as described in the spec"). The interpreter's is `object IntLiteral extends { ZZ32 }` with its arithmetic commented out: "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals." (`FortressBuiltin.fss:497-498`).
- The prelude's coercions are every exact integer pair and none from an integer into a float (`reviews/flattening-questions-ways.md` § 5, checked at `CompilerBuiltin.fsi:103-108`, `:147-149`, `:433-435`).

### Sizes

- A **`nat` parameter** is a static parameter that is a number: `Vector[\T, nat n\]`. "These parameters are instantiated at runtime with numeric values. A nat parameter may be used ... to appear in any context that a variable of type ℕ32 can appear" (`basic/trait-parameters.tex:78-90`). The library's arrays and matrices carry their sizes this way and their products require the inner sizes to agree (`Library/FortressLibrary.fsi:1680-1684`). The team's checker never checked them ("Todo: Handle int, nat, bool args"), the code generator reserved a slot for them (`CodeGen.java:5317-5328`), and the library's `NatReflect.fss:38-40` says of making a size from a run-time number "Really this just proves that it can be done without extending the language. Having proven that, we ought to build it in".
- Unboxing (storing a float as a machine double, not as an object) was intended and never built: `compiler/optimization/Unbox.java:12-19` and the loader's empty "expando" stub (`InstantiatingClassloader.java:168-172`).

### `comprises` and exclusion

- **`excludes`** declares that two traits share no value; an object type excludes every type not above it (`basic/types-vals-vars.tex:212-224`). Exclusion is what lets the checker prove two overloads never both apply.
- **`comprises`** closes a trait: `trait Number comprises { RR64, QQ, AnyIntegral }` lists the types below it. The draft reads the list at the level of types: the listed traits "are exactly the traits that immediately extend T" (`basic/traits.tex:231-234`, a draft note). The 2012 texts read it at the level of values: an instantiation "is covered by the union of the types in this set" (`types.tick:384-389`); "no value can belong to the trait unless it also belongs to one of the comprised types" (`Papers/Welterweight/grammar.tick:21-22`). The draft's future-work list says "We agreed to revise the Meet rule to address this with the coverage check" (`appendices/future.tex:285`).
- The **self-type idiom**: `trait Ring[\X\] comprises X`, so `Ring[\ℚ\]` "is really just ℚ itself" (Naden, `:576-582`); the patents of 2012-08-31 make it a named exception to the exclusion rule ("Self-types meet"), never built.

### The libraries

- The specification knows one library, "chiefly `FortressLibrary` and `FortressBuiltin`" (`Specification-1.0-frozen/library/structure.tex:15-18`). The compiler prelude was cut on 2008-12-19 as a "Hopefully temporary hack as we work on importing java objects cleanly" (`WellKnownNames.java:110-111`) and grown for three and a half years; the team called what went into it "bogus" (2009).
- The library's own flavour: algebra traits (`AdditiveGroup[\T\]`, `MultiplicativeRing[\T\]`, `StandardTotalOrder[\T\]`), each self-typed, carried by every number type; reductions licensed by associativity and identity; open marker traits (`AnyMaybe`, `AnyList`) with a "not yet" comment where a `where`-clause `comprises` was wanted (`FortressLibrary.fsi:434`). The specified algebraic-constraints library (monoids, groups, rings, fields, `HasIdentity`) exists only commented out (`Library/incomplete/`). Steele's 2016 slide 12 promised "Rational, complex, and quaternion"; only rational shipped.

### Where the designers left the question open, in one list

- Both the exclusion rule and the nested tower (Naden's "more work needs to be done").
- Run-time instantiation of a dispatched generic (the 2011 paper's "beyond the scope"; Naden's unfinished memo).
- Inference of static arguments at a call (`basic/inference.tex` is a 27-line stub).
- A numeral's type hierarchy ("We need to describe").
- The float types' rounding methods (no chapter; three inconsistent spellings in their own library).
- Whether `comprises` is read on types or on values (two readings, the later one on values).
- `where` clauses and widening (never supported).
- Sizes in the checker and at run time (a "Todo", a reserved slot, "we ought to build it in").
- Which integer width a range has (no sentence; the prelude says `ZZ32`).

## 2. The decisions, one by one

Three verdicts are used. **Faithful**: the designers' latest word says this. **A call**: the designers left no word; consistent or not with his principles. **A departure**: against the designers' latest word; justified or not. For anything judged wrong: what it has cost, and what reversing it costs now.

### F1. The goal and its measuring stick (2026-09-16)

- Verdict: a call, and the right frame. Two corrections to its wording. "The July 2012 draft" names the right tree and the wrong date: the team's text is of 2010-12, and it is now revised in place, so "judged by `Specification/`" reads partly the revival's own words (25 revision sections, `Specification/appendices/changes.tex`). Answer 1 (2026-09-26) got the citation right, "the Working Draft of February 2011"; the goal's sentence in CLAUDE.md and POSITIONS:24 has not caught up.
- Citation: `coordinator/spec-lineage.md` §§ 2, 4; FACTS:143.
- Cost: none in the work; a reader is misled about when the text was written. Fix: one sentence.

### F2. The library's own practice is the standard (2026-09-19)

- Verdict: a call, consistent with principle 1 ("custodians, not authors"). It is also the ground on which two of his decisions should have been made and were not (D6's row 330, D23's decision 2). Where it pulls against route A (the practice was the nesting), his yes of 2026-09-24 settled that the practice is the library's patterns, not every one of its shapes.

### F3. The later, implementation-informed word outweighs the early text (2026-09-23, 2026-09-26)

- Verdict: a call, and the right one for this language, whose draft says one thing in its types chapter and another in its library chapters. Its limit, which the exclusion brief named: it ranks texts by date and by whether they ran, and the two implemented halves (the interpreter's nested library, the compiler's flat prelude and rule) are both the group's. Where it leaves a judgement he made one (D4).
- Citation: `reviews/exclusion-design-brief.md:127-131`.

### D1. One library, the interpreter's (2026-09-20, 09-21)

- Verdict: faithful. The specification names one library; the split's own comment calls it a temporary hack; nothing on record argues for two as a destination.
- Citation: `library/structure.tex:15-18`; `WellKnownNames.java:110-111`; `coordinator/library-route-judgement.md` § 1.
- Cost: the price is the route itself. Every checker error on the interpreter's library became path work: 1.7K errors on 2026-09-27, 627 now (FACTS:56). The part not yet designed is the destination's last step, the switch-over (section 3, O1).

### D2. Sizes in the types and unboxed `double[]`, together (2026-09-19); row 40 closed with no decision (2026-09-25)

- Verdict: faithful to the design, which put sizes in types and intended unboxing, and never built either on the compiled path. Closing row 40 as "no decision taken" was right: the worker's three defaults were refuted by probe.
- Citation: `basic/trait-parameters.tex:82`; `Unbox.java:12-19`; `NatReflect.fss:38-40`; `reviews/array-design-review.md:13-37`.
- What it will cost him: the array review's first finding stands. The model's arrays are unsized in its own types, so on the compiled path "the model's text is the notation" and "sizes are central" collide on every operator application. Decision D's diff measures the collision: 21 model lines out, 29 in, no operator changed, 24 own errors to 12 (`reviews/decision-d-diff.md` § 1), and it is stale since `tabulate`. This is his decision to take with the diff in front of him, not a repair (section 6, item 6).

### D3. The scalar-extension block, `AnyAdditiveGroup`, `AnyIntegral comprises { ZZ }` (2026-09-21)

- Verdict: a call, approved as landed; the closure was held until measured, which was right. The block is the revival's invention argued from `Number` membership rather than from the algebra the library gives arithmetic (Astra's point; `reviews/batch-6-conformance.md:90`). It blocked the library's own open-marker way when `AnyIntegral` came back (D24). Not wrong; a reminder that phase 5's array bodies need capability bounds, not `Number`.
- Citation: `reviews/library-scalar-extension-review.md`; `reviews/anyintegral-comprises-judgement.md` § 2, way 1.

### D4. Route A: keep the rule, flatten the tower, teach walk coercion (2026-09-24)

- Verdict: faithful to the designers' latest implemented word, and justified. This is the decision the evidence author asked to be looked at hardest, so the reasoning in full:
  - For the rule: it is the group's implemented and published position (2010 checker, 2011 paper, 2012 Types chapter, Naden's "blanket" sentence, POPL 2019).
  - For the flat tower: the compiler side chose it in 2009 (Chase, Maessen) and built it in 2011 (Steele); the draft's own types chapter says the numeric types are "mutually exclusive; no value has more than one of them", and the 2012 Types chapter repeats it; Steele's 2016 slide draws it flat; every high-performance peer he named (Julia, Swift, Rust, X10) is flat with explicit or coerced widening.
  - Against: the library chapters' prose and the interpreter's library, both 2008, never checked; Naden's aim to keep both, which he left unsolved; the patents' forest rule, never built, whose soundness rule the revival would have had to write itself (route C, built as a shadow: 188 lines in 5 files, a return-type rule of ours, the interpreter overflowing on `comprises T`, FACTS:48).
  - On "the mutually exclusive sentence": the route-A notes cite ℤ ⊂ ℚ ⊂ ℝ as what the specification states and do not cite this sentence (`reviews/exclusion-design-brief.md:39`; the flattening note cites both, `reviews/flattening-questions-ways.md:181`, `:454`). Had the brief cited it, his case would have been stronger, not weaker: the specification's types chapter, the later of its two voices, already said what route A does. The revised number chapters now agree with it (`Specification/basic-lib/numbers.tex`, the `revival-rationals` callout).
  - On Naden's unsolved aim: route A does not solve it; it gives it up, keeping the rule and letting ℤ reach ℚ and ℝ64 by coercion. That is what Naden's own self-type-bound rewrite points to ("a flat tower's idiom", the brief § 4), and what his principle of 2026-09-29 accepts: an unfinished corner accepted to get to one program.
- Citation: `types-vals-vars.tex:500-502`; `types.tick:977-980`; `6896886fb`; `128f313b5`; `b3c2e1342`; `da5291587`; `justificationOfRTR.tex:496-497`, `:630-632`.
- What it has cost: `Number` lost its catch-alls, so `Number`'s `=` is not transitive (row 434); 89 team test lines respelled; 21 of the team's 24 demos with an unwritten clause-form sum fail and are not gated (`reviews/batch-6-conformance.md:75`); an integer scalar meeting a float array was refused under walk until batch N; and the interpreter chooses coercions on run-time values (D4's second half, judged under tension 5 below). Reversal to C: FACTS:48's price plus everything built on the flat tower since batch 6.

### D5. Design B for a size at run time, with the factory (2026-09-24, 09-26)

- Verdict: a call in a gap the team left ("Non-type args will be somewhat problematic at first", `OverloadSet.java:1213`), filling the slot the team's code generator reserved, with the team's own factory pattern. Consistent.
- Citation: `CodeGen.java:5317-5328`; `InstantiatingClassloader.java:2744-2752`; FACTS:114.

### D6. Rows 329 and 330: rounding (2026-09-21)

- Row 329, half to even on floats: faithful to the rational rule, Steele's own ℚ body and IEEE's default; the history found no reason for the float `round`'s half-up. Right.
- Row 330, `floor`, `ceiling`, `round`, `truncate` and the brackets returning unbounded ℤ on the float types: **a departure, not justified as it stands.**
  - The designers' word on floats is consistent across the 2008 release (`floor(a: Number): RR64`, `⌊a⌋: ZZ64`, `ceiling: RR64`, `⌈⌉: ZZ64`, `truncate: ZZ64`) and the interpreter's api (`FortressLibrary.fsi:368-372`, the same five). Only the component body and the prelude's comment are inconsistent, and they are inconsistent among ZZ, ZZ64 and RR64 for the brackets and `truncate`, never for the named `floor` and `ceiling`, which return the float in every text the team wrote. The rational chapter's "all ℤ" rule is stated of ℚ. The 2008 listing was not on the table when he decided; the ledger row and the coordinator's ask cite the api and the prelude only.
  - His stated reason, "ℤ sits under ℚ under ℝ64 in the tower, so an integer result goes back into float arithmetic by promotion", no longer holds: under route A and answer 8, ℤ reaches ℝ64 only by an explicit `asFloat` (row 330's last note; FACTS:116). So `floor(x) + y` with `y: RR64` would not type-check; a program writes `asFloat(floor(x))`. The other half of his reason, that ℤ cannot overflow, still holds and is a real point against `ZZ64` for the brackets (a float beyond 2^63 saturates silently today, both paths, row 330).
  - His own principles point the other way: F2 (the library's consistent declaration is `floor(self): RR64`) and his JVM-and-peers rule of 2026-09-22 (Java's `Math.floor`, Julia's `floor(x)`, Rust's and Swift's `floor` all keep the float; Python is the exception).
  - Cost so far: nothing built; one POSITIONS entry, one ledger note, one line of `coordinator/CLIMB-BATCH-3.md`. Reversing now: one entry. Section 6, item 1.

### D7. Rows 333, 334 and 346 (2026-09-22)

- Row 333 (`|0|`, `-0`, `0 DIV -1`) and row 334 (`GCD`/`LCM` nonnegative, overflow throws): faithful (`basic-integers.tex:628-631`, `:524-528`; `opr-overview.tex:154-155`).
- Row 346 (`narrow` truncates): a call following Steele's own 2008 boundary test (`tests/UnsignedTest.fss:210-211`) against the general overflow sentence. Consistent with F2 and with what every JVM language does with a narrowing cast. Fine.

### D8. Row 335, shifts, and the JVM principle (2026-09-22)

- Verdict: a call in a gap (no chapter names `LSHIFT`/`RSHIFT`); the saturation at the width is pinned by the team's tests since 2007, the second reading of the day (bit operators smart-shift, the specification's `shift` exact on ℤ) is the one every peer takes. His principle, JVM defaults corrected "through the lens of high performance and mathematical precision", is Steele's own stance (slide 13, "bad experience with Java's BigInteger"). Consistent.

### D9. Row 379 and answer 5: walk raises `IntegerOverflow`, the unsigned types too (2026-09-24, 09-26)

- Verdict: faithful (`opr-overview.tex:154-155`, kept by Steele in 2012; the interpreter's wrap was Maessen's "not yet"). Right.

### D10. Rows 380, 381, 383: shift counts of any width, `shift` at the switch-over (2026-09-24)

- Verdict: faithful to the library's own contract (`Integral[\I\]`'s `LSHIFT(self, b: AnyIntegral)`, `FortressLibrary.fsi:431-432`) and to his one-library rule. Fine.

### D11. The wrapping operators ∔ ∸ ⨰ (2026-09-26)

- Verdict: faithful (`opr-overview.tex:172-176`, `:205-209`; the 2007 draft api; Steele's 2011 prelude, spellings reversed). The one open end: the saturating family ⊞ ⊟ ⊡, specified beside them, "waits for a step of its own" with no plan line (section 3, O7).

### D12. How the specification shows a change: S1, S2, the calculi, answers 1 and 3 (2026-09-24, 09-26)

- Verdict: a call, in the team's own layered form; the requirement behind it ("no open discrepancy between the spec and our implementation ... preserve the original ... preserve the option to go the route C") is the right one. Three record slips: Appendix I's introduction says every change follows route A, which answers 9 and 10 do not (item 23, a default is filed); the inference chapter's entry claims to state "the rule that the checker builds, and no more" while four gated rows depart from it (`reviews/batch-N-review.md:8`); and the coercion chapter's "resolved statically" passage has no callout where walk contradicts its own example (tension 5).

### D13. Answer 2: every static argument but operators counts in exclusion (2026-09-26)

- Verdict: faithful (`types.tick:355-360`: "not type equivalent" for any non-covariant parameter; the team's "Todo: Handle int, nat, bool args"). Booleans wait on row 406. Right.

### D14. Answer 6: the sign-refined number types become run-time checks (2026-09-26)

- Verdict: a departure, justified. The design (`RationalQuantity` with boolean flags, `advanced-lib/numbers-advanced.tex:15-27`, one operator ending "needs more work here") was never in any library, contradicts the exclusion rule and the "mutually exclusive" sentence, and the 2012 Types chapter comments type aliases out. The original is kept word for word as superseded and the road back (covariant phantom parameters) is named. This is exactly his principle of 2026-09-29 applied.

### D15. Answer 7: generic `SUM` and `PROD` with the identity from the static argument; the three `Number`-typed big operators dropped (2026-09-26)

- Verdict: a call in the library's own device (the witness `typecase` of `array1`), since the specification's `HasIdentity` needs `where` clauses. The cost he accepted knowingly: a clause-form sum whose element type nothing fixes must write its static argument, as the team's own tests do; two model lines changed as approved diffs. The cost he was told of and that has no plan line: the team's demos (D4's cost list). The drop of `BIG MAXN` and siblings after a fresh judgement: right (a maximum's identity does not carry across widths, measured, FACTS:64).

### D16. Answer 8: mixed widths by coercion, with promotion (2026-09-26)

- Verdict: coercion is the designers' mechanism (faithful); narrowing the draft's general "integer values to floating-point values" to the exact pairs is a departure by his precision principle, between the draft (all) and the prelude (none), justified and recorded (`Specification/basic/conversions-coercions.tex:74-90`); promotion (the narrowest type both sides coerce into) fills a gap the specification never wrote, with Julia's rule. One inconsistency inside it: `NN32` into `RR64` is exact and stays explicit, only because the decision named `ZZ32` and the numerals (the callout says so). Tidy it (section 6, item 9).

### D17. Answer 9: the overload sentence goes (2026-09-26)

- Verdict: faithful. The 2008 text expected replacement, the 2009 sentence was never enforced by either path, the 2011 paper allows the shapes, the restart drops it. The positional rule is the revival's own addition (Java's overriding rule), small and stated as such. Right.
- Citation: the 1.0 PDF lines 5234-5241; `overloading.tex:100-107`; `future.tex:236-266`; `Papers/Types/rules.tick:158-180`.

### D18. Answer 10: `fill` takes a value, `tabulate` a function (2026-09-26)

- Verdict: a departure from a name in the specification's arrays figure, justified: under the bound `Any` the pair is an invalid overloading the checker is right to refuse, the team's own derived names put the new name on the function form, and `tabulate` is a peer's word. Cost: 32 demo lines and `mg.fss:20` (row 464). Fine.

### D19. Answer 11: the checker count as the measure (2026-09-26)

- Process, not language. Right, with row 488's run-order dependence still unexplained.

### D20. Answer 12 and the `nat` plan's decision one: unknown sizes (2026-09-21, 09-26)

- Verdict: a call in a gap (the inference chapter was a stub). Consistent: an unknown size is an error where it reaches a type, a name or a value; the arm the rules would pick with an unfixable size refuses the call. Its premise for types, that a dead type parameter compiles harmlessly, was false (row 447, under D23).

### D21. A numeral's own type: the one library takes `IntLiteral` (2026-09-27)

- Verdict: faithful to the specification's direction ("numerals have their own types", coercions defined by the library) in the implementers' shape (one sibling type, not the value-carrying types the draft named and never described). Right, on two conditions the record carries only in part: rung Q's brief must quote the team's warning whole, including its consequence ("all our arithmetic to occur on IntLiterals"), and measure it; and `exactValue` must answer a numeral before `Number`'s `=` meets one (the conversion judgement's requirement). Under the prelude, literal arithmetic is folded at compile time (`IntegerLiteralFoldingVisitor.java`); walk folds nothing, so the measurement is the interpreter's.

### D22. A size's range: a `nat` is an ℕ32 value (2026-09-27)

- Verdict: faithful (`trait-parameters.tex:83-86`). Right.

### D23. The numerics plans, decisions 1 to 5 (2026-09-27)

- Decision 1, ranges over `ZZ32` alone: a call in a gap (the draft names no width, has two `ZZ64` examples), following the prelude (`CompilerLibrary.fsi:173-174`) and the JVM's array length. Consistent with his 2026-09-22 principle. Cost: a range over another integer type is a static error; the draft's ℤ factorial as a product over a range became a recurrence in the specification's text (`reviews/batch-7R-conformance.md:100`), a loss of one showcase of the notation, in the specification and not in the model.
- Decision 2, `extends Object` written on the result-only parameters, and Q1 the bound `Any`: **a call with an error in it.**
  - The written bound is the specification's own idiom (its examples write it; the library never does). It clears 340 errors by making the solver bind the parameter to `Bottom`, the type with no values, "harmless for natives whose bodies the switch-over replaces". `fail`'s body stays. Since rung B every value-position `fail("...")` in the library (`FortressLibrary.fss:1430`, `:1460`, `:1506`, `:2521` among them) compiles to a call whose result is carried as `java/lang/Object` and fails JVM verification at load ("Bad return type"); before it, under the bound `Any`, the checker refused those calls "without context", a compile-time error (row 447 and its later notes). A checker count was lowered by turning a refusal into a crash. The switch-over meets it. The 2012 Types chapter's word is that `Bottom` is uninhabited and inexpressible (`types.tick:184-195`), so an instance at `Bottom` is nothing the designers meant to run; the honest treatment of a call typed `Bottom` is the one the specification already gives a `throw` expression, which has that type. Section 6, item 2.
  - Q1, the implicit bound `Any` where the draft says `Object` (`trait-parameters.tex:49-50`): a departure, justified by the library's practice (it declares its element types unbounded and instantiates them at tuple types, which `Object` excludes) and by the 2012 Types chapter, where `Any` is the top and `Object` excludes arrows. But it is a specification sentence taken as a default inside another decision and listed (POSITIONS:121, :129); the overloading judgement had called it "a decision of his". Batch 7b's rung S will write it. He should say yes to it in so many words (section 6, item 3).
- Decision 3, the inference rule with the numeral switch as batch N: a call filling the gap the draft left empty, in the direction Welterweight names ("the most specific instantiation"). Right. Six gated gaps opened; one, row 508, is judged under D25.
- Decisions 4 and 5: process. Fine.

### D24. `AnyIntegral`'s `comprises` clause read as the 2012 texts read it (2026-09-28)

- Verdict: faithful to the later word (`types.tick:384-389`; Welterweight's grammar). The hole every reading shares, a program's own `Integral` subtype in another component not caught (row 487), is now the assumption the batch-7b coverage proof rests on; batch 8 owns it. The 7C review's note stands: the text is stricter than the Types chapter in two cases while the appendix presents it as that chapter's reading.

### D25. The conversion rule and each integer type's own `MIN`/`MAX` (2026-09-28)

- Decision 1: faithful to the coercion chapter's order ("first determine whether there exists a declaration that is applicable without coercion", `:454-462`); the tie rule and promotion fill gaps. His own idea (way 4, C#'s rule) was weighed and not taken, for reasons the designers' text supports. Right, and rightly asked for a soundness check first.
- Its landed form departs from it: the checker tries a call by subtyping under the expected type first, so a declaration reached only by coercion whose result fits can win over a generic that fits the arguments as they are (row 508, `XXXInferContextKeepsFit`; item 34). That is a defect against his decision and against the specification's Σ, on the compiled path, gated as an expected failure. Its fix is named. Section 6, item 4.
- Decision 2: faithful to the library's own practice (`QQ`, `RR64`, the prelude and the draft's ℤ declare their own). Right.

### D26. Item 25: a size used as a value converts as a numeral does (2026-09-28)

- Verdict: faithful to the team's checker (`KindEnv.scala:67-68` types it `INT_LITERAL`) and consistent with D22. Right.

### D27. Item 26: the `comprises` passages restated at the level of values (2026-09-29)

- Verdict: faithful to a stated plan of the team's (`future.tex:285`). The price, static uniqueness given up for run-time uniqueness in the proof appendix, is the kind of type-theoretic change he said he is unequipped for; he did the right thing, a second proof read (Astra's addendum) built into the briefs. Its open assumption is row 487.

### D28. Item 30: a generic declaration beside a plain one at run time (2026-09-29)

- Verdict: faithful (`Papers/Types/rules.tick:118-129`; Welterweight; both paths were built for it; the team's test `Compiled12.invariantInference`). Right. Naden's restriction by the static return type is rightly future work.

### D29. The smaller ones

- Row 331 (`Nothing[\T\]` kept, the bare `Nothing` gated on `where`): faithful to the team's code. Row 321 (an object with no `asString` prints its type name): a call, fine, with a stack overflow waiting at the switch-over (PLAN:89). Row 39 (`Diag` overrides `mul`): the library's own way, found by him. Row 404 (the 2012 `covariant` keyword as future work): right. The notation rule of 2026-09-19: right, and the one rule that phase 5 will test hardest.

## 3. Errors of commission and of omission, ranked

"On the path" means on microGPT's compiled path, the goal's measuring stick; "can wait" means off it.

### Commission

1. **The written `extends Object` bound of batch 7 (D23, decision 2), row 447.** A checker refusal turned into a JVM verification crash at every value-position `fail` in the library. On the path: the switch-over compiles those bodies. Cost so far: one hidden hole, listed. Cost to fix: one code-generator rung (a `Bottom`-typed call treated as a `throw`), before phase 4. Not cardinal; it is known, rowed and reversible.
2. **Row 330 (D6).** A departure from the designers' consistent word on floats, decided on a premise route A removed, against F2 and his peers rule, with the 2008 listing not on the table. Can wait, since nothing is built and no microGPT line has `floor` on a hot path; but it should be reversed now, while it costs one entry.
3. **Row 508 (D25's landed form), item 34.** The checker's attempt order contradicts his decision 1 and the coercion chapter. On the path: it is the checker microGPT will run under. Gated; fix named; belongs to phase 3.
4. **Q1, the implicit bound `Any` (D23).** Right in substance, wrong in form: a specification sentence changed by a default inside another decision. On the path only through the text; batch 7b's rung S writes it. Needs his explicit yes.
5. **Answer 8's `NN32`.** Exact into `RR64` and left explicit against the decision's own criterion. Can wait; one library line.
6. **Record slips**, none touching a running program: the route-A brief's missing citation of "mutually exclusive"; POSITIONS:47 still giving row 330's fallen reason; Appendix I's introduction (item 23); the inference entry's over-claim; the goal's "July 2012".

### Omission

1. **Phase 4, the switch-over, is the largest piece and is not designed.** Its code-generation half is sized: on the flat tree code generation emits 326 of the library's declarations and refuses 225, of which only 4 are on declarations the checker passed, and the dispatch generator refuses 12 of 198 overload sets, down from 131 of 283 on the nested tower (`perf-probes/prelude/switch-over-distance-flat.md:12-13`); so the checker's zero carries most of that half with it. Its other half is not sized: two native mechanisms (walk's 108 and 231 bindings against the compiler's helpers; `import java` unfinished under walk, FACTS:157), the four well-known types, the 38 sources that name the prelude, and "at least two batches" as the only size on record. On the path. Not an error of decision; the natives' shape probe the library-route judgement asked for (its step 2(c), a two-declaration component bound with `import java`, run by the interpreter) has not been run, and no brief exists.
2. **Phase 5's collision.** "No model line changes" has been kept in every batch. Decision D will not keep it: 21 lines out, 29 in, by the record's own measurement, stale since `tabulate`. Beside it: arithmetic in a size (item 15, the library's own rank-2 and rank-3 storage; no batch), a size known only at run time opened by the checker (`reflect`, the "two bridges"; `NatReflect`'s "we ought to build it in"), and the element width (`RR32` or `RR64`) he asked about and was not answered. On the path. All are his decisions, and none has a line before "after the switch-over".
3. **Decision A, the mechanism under `double[]`.** The array review found that the library's own device (a `typecase` in a generic factory) cannot return a monomorphic store through the checker, and that the team's direction is a loader template per instantiation (`Unbox.java`, the expando stub). No design, no probe since. On the path, and it is the "fast" half of the goal.
4. **The algebraic layer.** His own aim of 2026-09-15 ("extend the algebraic layer, Ring, Field and what ML's matrices and tensors need") has no plan line; route A left `Number` without algebra, and `Vector` and `Matrix` keep `T extends Number` with "no evidence for their arithmetic" (`FortressLibrary.fsi:1547`, `:1665`; `reviews/batch-6-conformance.md:90`). On the path at phase 5: the array design must choose the bounds. The library's own traits exist for it (`AdditiveGroup`, `MultiplicativeRing`); the specified fields and groups do not.
5. **Walk's coercion choice against his rule of 2026-09-24.** The interpreter contradicts the coercion chapter's own printed example (3 against 4) and the passage carries no callout; item 16 ("route A's price is wider") is parked with a default and no answer. Can wait in substance, since the compiled path follows the text and microGPT's static types are concrete; the callout is one paragraph in batch 7b's rung S.
6. **The team's demos.** 21 of 24 with an unwritten clause-form sum fail since the flat tower; no gate stage runs demos (`build.xml` has none). Can wait for microGPT; against his own "one tree with everything running" (2026-09-17).
7. **Off the path, note only**: the saturating operators (specified beside the wrapping ones, no line); code generation refusing any `where` clause (no ledger row); the checker on interpreter programs (his 2026-09-15 wish; it arrives with the switch-over); `where` clauses, covariance, contracts, properties, units, `widens`, `HasIdentity`, `bool` parameters, complex numbers, tensors, distribution. Each is an intention of the designers no plan carries; none is needed to compile microGPT; the ledger's worklist holds most of them.
8. **Row 487.** Closed families are not closed across components; the batch-7b proof names it as its open assumption. Batch 8's, and it should stay there.

## 4. The tensions

Fourteen are on the evidence map's list (b). Grouped by what they need.

Need a decision from him, in this order:

- Tension 2, row 330's reason. Now, before batch 7b, since it is one entry (section 6, item 1).
- Tension 7, answer 12's premise against row 447. Before phase 4 (item 2).
- Tension 4, the implicit bound. Before batch 7b's rung S writes the sentence (item 3).
- Tension 6, decision 1 against row 508. Phase 3, batch 8 at the latest (item 4).
- Tension 11, the algebraic layer against route A's `Number`. With phase 5's array design (item 6).
- Tension 12, the `IntLiteral` warning. Not a decision; a line in rung Q's brief (item 8 carries it).

Fine as they stand, with one line each:

- Tension 1 (one library and F2 against route A's shapes): settled by his yes of 2026-09-24; F2 is about patterns, not about keeping every 2008 shape.
- Tension 3 (answer 8 against the draft's general sentence): recorded in the text; tidy `NN32`.
- Tension 5 (no open discrepancy against walk's run-time choice): fine in substance; one callout and item 16's one-line answer close it (item 7).
- Tension 8 (a size as ℕ32 against a size used as a value as ℤ32): consistent, as he was told; the JVM's indices are `int`.
- Tension 9 (the notation rule against the reversible stops): no model line has landed that way; decision D will be a diff, as his rule requires.
- Tension 10 (answer 6's "resurrect" against no phase for covariance): future work is the right home; the ledger holds it.
- Tension 13 (ranges over `ZZ32` against the factorial's notation): a specification example, not a model line; leave it, or restore the product over a converted range when someone touches the chapter.
- Tension 14 (test first against the landing rules): the tests are still owed and tracked; a process choice he made with the costs in front of him.

## 5. His question, answered

- Has he gone astray? No. On the calls that shape the language, he has gone where the type group's own implementers went and where their last texts point: the exclusion rule kept, the tower flat with coercion between widths, sizes in the types, the 2009 overload ban dropped, `comprises` read on values, conversions never changing which declaration runs. Each of these finishes something the team started and left open, and each is recorded with its original and its road back.
- Where? Two places, both small. Row 330 departs from the team's consistent declaration for floats on a reason he no longer has, and it is not built. The written bound of batch 7 hid a real hole behind a lower checker count, and the switch-over will find it. One specification sentence (the implicit bound) was changed by a default rather than by him.
- How far? Not far, and not in the direction of a redesign. The errors are in the record and in one landed rung, not in the language. The risk that remains is of omission: the three least designed pieces, the switch-over, the sized model and the unboxed store, are the ones the goal depends on, and every batch since 2026-09-26 has been spent before them.

## 6. For Pavol

In the order needed. Each is one question, its context, numbered options with what each touches and costs, and a recommendation last.

### 1. Does `floor` on a float return a float or an unbounded integer? (row 330; reverse or restate, before it is built)

- The team's word on floats, in the 2008 release and the interpreter's api, is consistent: `floor` and `ceiling` return the float, the brackets and `truncate` an integer (`ZZ64`). Only the component body and the prelude's comment are inconsistent, and only for the brackets, `truncate` and `round`.
- Your reason of 2026-09-21 rested on ℤ sitting under ℝ64; under route A it does not, so an integer result rejoins float arithmetic only through a written `asFloat`.
- Nothing is built. Options:
  1. The named functions keep the float, as every text of the team's and every peer has it; the brackets, `round` and `truncate` return ℤ, as the rational chapter's rule and your no-overflow reasoning have it, tidying the team's three spellings to one. Touches: the `RR64` api and body (five lines), the ledger row, POSITIONS:47, and later a specification sentence for the float types. Costs one library rung after the switch-over, as planned.
  2. Keep the decision as it stands, all ℤ, with the reason restated on coercion: every float program that floors and continues in float arithmetic writes `asFloat`. Touches the same lines plus every such caller. Costs the same rung and a notation tax on users.
  3. The 2008 listing whole: `floor` float, brackets and `truncate` `ZZ64`, `round` `ZZ64`. Touches the same lines. Costs the silent saturation past 2^63 that both paths have today.
- Recommendation: 1.

### 2. What does the compiled path do with a call whose result type is `Bottom`? (row 447, item 18; before phase 4)

- Batch 7 wrote `extends Object` on `fail`, `builtinPrimitive` and the nullary comprehension, as decided; the solver then binds a result-only parameter to `Bottom`, the type with no values. For the natives that is harmless. For `fail` it is not: every value-position `fail("...")` in the library now compiles and fails JVM verification at load, where the checker refused it before.
- The 2012 Types chapter says `Bottom` is uninhabited and cannot be written; the specification already gives a `throw` expression that type.
- Options:
  1. The code generator treats a call typed `Bottom` as it treats a `throw`: the call is made and the code after it is unreachable, so no value is returned where a `ZZ32` is expected. Touches `CodeGen`; one rung with row 447's two probes as its tests; the written bounds stay.
  2. Refuse a value-position call whose result-only parameter nothing fixes, as answer 12 does for sizes. Touches the checker and every library `fail` site, each of which then writes its static argument. Costs a library sweep and brings back the errors rung B cleared at `fail`.
  3. Take the prelude's `fail(s: String): Zilch`, a declared bottom type. Outside the specification; walk cannot evaluate it.
- Recommendation: 1, as a prerequisite of phase 4, not a phase-5 item.

### 3. Is the implicit bound of an unbounded type parameter `Any`, as the library and walk take it, or `Object`, as the draft says? (Q1; before batch 7b's rung S)

- The draft says `Object` (`trait-parameters.tex:49-50`). The library declares its element types unbounded and instantiates them at tuples, which `Object` excludes; walk and the gate's count read `Any`; the compile path's desugarer writes `Object` (row 412). The 2012 Types chapter has `Any` as the top. Batch 7 took `Any` as a default inside decision 2 and listed it; the overloading judgement had called it your decision.
- Options:
  1. `Any`, stated in the text with a callout, the compile path's `Object` setting named as the divergence until the switch-over collapses it. Touches one sentence and the naked-`Any` overloading rule, which rung S must then state as the checker reads it. Costs nothing new.
  2. `Object`, the draft's word. Touches the library: 163 refusals, mostly tuple index types, and the arrays' element types. Costs a library sweep against the library's own practice.
- Recommendation: 1, said in so many words.

### 4. In which order does the checker try a call's candidates? (row 508, item 34; phase 3)

- Rung I tries subtyping under the expected type first, so a declaration reached only by coercion whose result fits can win over a generic that fits the arguments as they are. That contradicts your decision 1 of 2026-09-28 and the coercion chapter's Σ. It is gated as an expected failure.
- Options:
  1. Try subtyping without the context first and keep it when its winner's result converts to the expected type, then coercion with the context. Touches `Functionals.scala`'s attempt order; one checker rung with `XXXInferContextKeepsFit` promoted. Costs one rung in batch 8.
  2. Leave it gated, with a workaround (write the static argument).
- Recommendation: 1.

### 5. Is the switch-over sized and its natives' shape probed now, in parallel with phase 3? (phase 4)

- Phase 4 is "not yet designed as briefs" and is the largest piece. Its code-generation half is measured on the flat tree (225 refusals, all but 4 on declarations the checker refuses; 12 overload sets of 198 refused by the dispatch generator), so it shrinks with the checker's zero. Its natives half is not: 339 native bindings under two mechanisms, `import java` unfinished under walk, the four well-known types and the 38 sources that name the prelude.
- Options:
  1. One worker session now: the natives' shape probe (a two-declaration component bound with `import java`, run by the interpreter) that the library-route judgement asked for and nobody ran, and a count of the 339 bindings against the compiler's helpers by name. Touches nothing on `main` but a report. Costs about 0.4M tokens.
  2. Wait for the checker's zero, as the plan has it. Costs the risk that phase 3's last batches are spent before the switch-over's real price is known.
- Recommendation: 1.

### 6. Do the array questions start now, in parallel, or after the switch-over? (decision D, decision A, item 15, the element width, the algebra bounds; phase 5)

- Everything the goal's "fast" rests on is here and none of it is designed: the model's sized types (decision D's diff, 21 lines out and 29 in, stale), a size opened from a run-time number, arithmetic in sizes, `double[]` under the sized traits (the team's loader-template direction against the library's factory, which the checker refuses), `RR32` or `RR64`, and the bounds that give `Vector` and `Matrix` their arithmetic (the library's own `AdditiveGroup` and `MultiplicativeRing`, not `Number`).
- Options:
  1. Run the array design's clean list now (protocol § 6, the library's way first, the nine steps), read-only, with decision D's diff re-based and re-measured on today's tree, so that the decisions reach you while phase 3 runs. Touches nothing on `main` but reviews. Costs two or three worker sessions, about 1M tokens.
  2. After the switch-over, as the plan has it. Costs a serial wait at the point the goal depends on most.
- Recommendation: 1; the diff of the model lines comes to you as your rule requires, and you decide D, A and the width one per message.

### 7. Is the interpreter's run-time choice of coercions accepted as the interpreter's limit? (item 16; tension 5; batch 7b's rung S)

- Walk has no static types, so it cannot resolve a coercion on a static type; it chooses on the value, and contradicts the coercion chapter's own printed example (3 against 4, `XXXCoercionStaticRungC`) and the narrow case rung C found (`XXXCoercionStaticNarrowRungC`). The compiled path follows the text. MicroGPT's static types are concrete, so the paths agree on it. The inference chapter carries a callout for the generic half; the coercion chapter's "resolved statically" passage carries none.
- Options:
  1. Accept it: one callout at `conversions-coercions.tex:598-635` in the S1 form, item 16 closed with the two tests as its record. Touches one paragraph in batch 7b's rung S. Costs nothing.
  2. Make walk match: needs static types under walk, which is the checker on interpreter programs, after the switch-over.
- Recommendation: 1 now; 2 is the later road and is already your wish of 2026-09-15.

### 8. Does rung Q's brief carry the team's warning whole, and measure it? (batch N's second run)

- The one library's `IntLiteral` carries "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals." Coercion is implemented; rung Q gives `IntLiteral` its own arithmetic, as the prelude has; the prelude folds literal arithmetic at compile time and walk folds nothing.
- Options:
  1. The brief quotes the consequence, and the rung measures where arithmetic lands under walk on the two microGPT programs and the interpreter tests before it lands. Costs one measurement inside the rung.
  2. As briefed.
- Recommendation: 1.

### 9. Does `NN32` coerce into `RR64`? (answer 8's tidy; batch 7b's rung L or later)

- Exact, and left explicit only because the decision named `ZZ32` and the numerals; the callout says so.
- Options: 1. Yes, one api line and one body line, the callout reworded. 2. No, as it stands.
- Recommendation: 1.

### 10. Are the team's demos put back into the tree's running state? (tension with "one tree with everything running")

- 21 of 24 demos with an unwritten clause-form sum fail since the flat tower; no gate stage runs demos.
- Options: 1. A small rung respells the 21 with their static arguments, as the team's own tests write them, and a report-only demo stage joins the gate. Costs one rung. 2. Leave them until walk accepts an unwritten static argument (answer 7's later work).
- Recommendation: 1, when a batch has a free slot; not before batch 7b.

### 11. Is the goal's wording corrected? (F1)

- "The July 2012 draft" is the revival's label; the team's text is of December 2010, and it is revised in place with the 2012 Types chapter beside it.
- Options: 1. One sentence in CLAUDE.md and POSITIONS:24: "the Working Draft of 2010-12, as the revival revises it, with the 2012 Types chapter cited beside it". 2. Leave it.
- Recommendation: 1.
