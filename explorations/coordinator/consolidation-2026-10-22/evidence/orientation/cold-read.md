# Cold read of the orientation

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core) and `explorations/coordinator/consolidation-2026-10-22/evidence/orientation/orientation.md` (71 lines). I read nothing else and opened no source. Line numbers below are the orientation's.

## 1. What I would do differently, section by section

### Preamble (lines 3-7)

What I would do:
- Treat a rule tagged P-N as a curator decision and cite it as one. Build on an untagged rule, but never cite it as a decision.
- When the specification, a team test, an old note or my own expectation disagrees with the skill, look here first, then in FACTS and POSITIONS, before I call it a conflict and switch to exploring.
- Distrust team tests and old notes on two points in particular: the number types do not nest, and walk converts arguments.
- Read a cited ledger row as a known departure of the tree from the rule, not as a new gap.

Limits as I read them:
- The preamble does not say what to cite for an untagged rule. The core allows only a brief, a record entry or a primary source, and this part is none of those.
- The ledger sentence names departures of "walk or the checker" only, yet the body cites rows for the code generator (650, 701) and the run time (774).

### Dispatch and overloading (lines 9-19)

What I would do:
- Write overloads that differ in their static parameters. I would judge them on declared domains at every instance within the bounds, and check that the more specific return type fits at every instance, not at one.
- Judge exclusion between generic overloads over the whole parameter tuple, using the equalities that a shared generic type forces (`Box[\T\]` at two positions forces equal `T`). I would not judge it position by position.
- Never reorder declarations to steer walk's dispatch. Read "Cannot unify" as an argument outside a bound.
- Not take walk's load-time acceptance or refusal as the verdict. Before changing code to get past walk's check, find its row in `interpreter.md`, "What walk checks". For functional methods of a generic trait, expect walk's complaint at the call, not at load.
- Not declare a functional method twice with equivalent parameter types and `self` in a different position. Not put an abstract and a concrete method with the same parameter types in one trait. When an object inherits the abstract method from one trait and the body from another, redeclare the method in the object.

Limits:
- I could not apply the sentence on line 13 about refusing "a pair where the equalities fix one declaration's static parameter and leave one of the other's free" without an example.
- "Is refused" on line 19 does not say which path refuses.

### Traits and objects (lines 21-33)

What I would do:
- Never let a type extend two instantiations of one generic trait, even though walk runs it. Read `IncompatibleClassChangeError` at run time as a sign of this. Not copy the Working Draft's examples marked "Not allowed".
- In a `comprises` clause, leave out a generic trait when every type below it is below a listed type. Not expect walk to catch a bad clause outside the main component.
- Write `override` only on a redeclaration that is strictly wider than the inherited one. To replace an inherited declaration at the same parameter types, redeclare it without `override`. Never put a Java-style `override` in the library: under walk it stops every program.
- Cover an inherited abstract method with one body, or with narrower bodies whose union covers its parameter types, reading `comprises`. For a method with static parameters, use one body, because the checker refuses a split. Not trust walk to check a generic object.
- In a self-typed trait, use `self` as the implementing type without a cast. Never extend `T[\A\]` from a type that is not an `A`.
- Compare tuples only when every element type extends `StandardPartialOrder`, and under walk only when each position holds one run-time number type. Never order a `List[\RR64\]`.

Limits:
- Line 27 does not let me tell whether the compiled path can take `override` at all (see section 2).
- Line 33 does not say whether tuples longer than three have an order.

### Static parameters, `where` clauses and sizes (lines 35-48)

What I would do:
- Expect an unfixed type parameter to take its bound: under the checker, the meet of its bounds narrowed by the expected type; under walk, `OPEN` if it is F-bounded. Write the static argument in walk's three `Bottom` cases (two unrelated bounds, a bound only through another parameter, fixed only by a function expression's result).
- Under walk, write the static argument of a generic call that sits in an argument position (`mk[\ZZ32\]()`), because only the checker types it from the enclosing call.
- Use only three `where` forms: conditional extension (`T extends SomeTrait`, binding no variable), a condition on a function's or method's static parameters, and a type variable in `comprises`.
  - Not rely on conditional extension under walk or the compiled run time, which apply it at every instance.
  - Not rely on walk to enforce a method's condition on a dotted call.
  - Not put a `where` clause on a declaration that must compile.
- Write equal sizes in the same form. Never overload at `T[\n+1\]` beside `T[\0\]`. Avoid size powers above 4096 and negative exponents. Not use `NatReflect.reflect` on the compiled path before the switch-over.

Limits:
- Line 41 gives the form of conditional extension in words only. I could not write one without opening a source.

### Numbers (lines 50-58)

What I would do:
- Read "the tower" in the record as the number and order traits, never as a nesting.
- Under walk, write the static argument wherever a numeral would otherwise fix a generic, since `Box[\Int\]` is not `Box[\ZZ32\]`. Write the element type of `array1` and `array2` so that I get a `Vector` or `Matrix`.
- Expect a conversion at a call, a typed binding and an assignment. Expect a generic call on mixed arguments to run at the narrowest common coercion target. Expect walk to take the join, not promote, for tuple and varargs elements. Read "Ambiguous coercion" as two declarations that apply only by coercion with neither more specific.
- Expect an integer power to answer its base's type. Never write an integer base other than 1 or -1 with a negative exponent: I would write `2.0^(-1)`. Remember that the compiled `ZZ32` power gives 0 there until the switch-over.

Limits:
- I cannot tell whether line 54's "IntLiteral's arithmetic answers a ZZ32 (row 578)" is the rule or a defect.

### Reductions and comprehensions (lines 60-64)

What I would do:
- On the compiled path, always write the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, as `SUM[\ZZ32\][j <- 0#n] f(j)`.
- Under walk, write it whenever the reduction's value is not a local variable with a declared type or a function's declared return. This covers a method's return, a field and an argument. Otherwise an empty `SUM` gives integer 0, and a non-number type argument gives `CastError` on an empty `SUM`.
- In a reduction that I declare, type `simpleJoin` at `R`, never at `Any` and never untyped. Not copy the team's tests that do otherwise.

Limits:
- I cannot tell whether `BIG MAX` over `RR64` answers `RR64` or `Maybe[\RR64\]` (see section 2).
- The section says nothing about comprehensions, despite its title.

### Implementation limits (lines 66-70)

What I would do:
- Never take a walk run as proof that a program is well typed.
- Never use a `Maybe` as an `if` condition in code that must compile.
- Write every parameter type.
- Leave out a function's return type only where an api declaration at the same parameter types gives it.

Limits:
- Line 70 does not say whether "every parameter" includes the parameters of a function expression.
- Line 70 does not say which path enforces the return-type sentence.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

### Across the file

- **When to read the file conflicts with the core (line 3). Confidence: high.** The file says "Read the part whole, after `SKILL.md`, before work". Its title is the one that the core gives `references/revival-changes.md`. The core tells a worker to load that part only "when a team source, an old note or your training disagrees with this skill", and says it holds "each change with its contradiction and reason", which this file mostly drops. The core also points to `revival-changes.md`, "Static parameters", but the heading here is "Static parameters, `where` clauses and sizes". Until the core names this file as the orientation, a worker gets two instructions.
- **Rule or tree? (line 5 against line 7 and the body). Confidence: medium-high.** Line 5 says "Each rule states the tree as it stands", yet line 7 says that a ledger row names each departure "from a rule". So a rule is a target, and the tree may depart from it.
  - The bold headlines mix both readings. "Overloads may differ in their static parameters" states a rule. "The compiled checker applies the exclusion rule, and walk does not" and "A reduction's static argument depends on the path" state tree behaviour.
  - A worker cannot tell whether a sentence that cites a row, such as an empty `SUM` giving integer 0 (row 716) or `IntLiteral` answering `ZZ32` (row 578), is a fact to build on and test for, or a defect that a fix will remove. Suggested fix: say once that a sentence citing a row states a known departure that may change, so never assert it in a test as correct and never depend on it.

### Dispatch and overloading

- **"The type group's later texts" (line 5). Confidence: medium.** "Type group" is not in the core, and it is not clear which texts are meant (the papers?). "Most rules" does not say which rules do not follow them.
- **"Appendix I keeps the specification's original text" (line 5). Confidence: medium.** It reads two ways. Either the revival rewrote the specification's main text to match these rules and moved the team's text into Appendix I, or Appendix I is a team appendix. The core names Appendix I without saying what it is.
- **"Both paths apply the overloading rules of `SKILL.md`" (line 11). Confidence: medium-high.** The core says "Walk checks part of this at load", and line 17 says walk refuses valid pairs and loads invalid ones. As written, a worker could expect walk to enforce the full rules.
- **"Overloads may differ in their static parameters" (line 11). Confidence: medium.** It reads several ways: a generic overload beside a non-generic one, different numbers of static parameters, or different bounds. One example would settle it.
- **"Fit" (lines 11 and 19). Confidence: low.** It is not defined. I read it as "is a subtype of, where the domains overlap".
- **"The Working Draft's ban on such pairs is gone" (line 11). Confidence: high.** The nearest antecedent of "such pairs" is "a pair that fits at one instance only", which the same line declares invalid, so the sentence seems to contradict itself. The intended antecedent is probably "overloads that differ in their static parameters". "Working Draft" (also on line 23) is not in the core, which says only "the specification".
- **"A value of both domains has one instance of each generic type at each position" (line 13). Confidence: medium.** It is hard to parse. It relies on the core's exclusion rule (no type extends two instantiations) without saying so.
- **"Both paths refuse a pair where the equalities fix one declaration's static parameter and leave one of the other's free" (line 13). Confidence: medium.** I could not build an example with confidence, so it needs one.
- **"The specification's verdict" (line 17). Confidence: medium-low.** By line 5 and P-26, the verdict is this part's rules, not the specification's early text, so "specification's" points the worker at the wrong authority.
- **"Find the row in `interpreter.md`" (line 17). Confidence: low.** Rows live in the gap ledger, so this reads as if `interpreter.md` holds them. It is fine if that section lists them, but the wording should say so.
- **`f(self, y: S)` beside `f(x: S, self)` (line 19). Confidence: medium.** The two have equivalent parameter types only if both are declared in trait `S`, and the example does not say so. Inside some other trait `T`, the types are `(T, S)` and `(S, T)`, which are not equivalent, so a reader can draw the wrong rule from it.

### Traits and objects

- **"Exclusion" means two things (lines 13 and 23). Confidence: low.** On line 13 it is the `excludes` relation between overload domains; on line 23 it is "the exclusion rule" on generic instantiations. The core names both, but two adjacent sections use one word for different rules.
- **"Marked 'Not allowed'" (line 23). Confidence: low.** It does not say who marked them, the team or the revival, which matters when a worker searches the specification for them.
- **"Scala's `sealed` lists each direct subtype" (line 25). Confidence: high that it is inaccurate.** Scala's `sealed` lists nothing: it confines direct subtypes to one file. Java's `sealed ... permits` is the form that lists them. A worker who knows Scala stumbles here.
- **"Several declarations can cover the meet of two overloads together" (line 25). Confidence: medium.** It is about overload validity, so it belongs in Dispatch beside the core's "a third covers their meet". In the `comprises` paragraph it reads as if it were about `comprises`.
- **"Main component" (line 25). Confidence: medium.** The core does not define it. I read it as the program's own component, not the library's.
- **"Only where the inherited parameter types are strictly narrower" (line 27). Confidence: medium.** It inverts Java and Scala, and "narrower" does not say than what (than the overriding declaration's).
- **"Exceptions: the checker accepts it (row 653), and the code generator refuses the modifier (row 650)" (line 27). Confidence: medium-high.**
  - "Exceptions" to what? These are departures, not exceptions to the rule.
  - "Refuses the modifier" reads two ways: every `override`, or only a Java-style one. If it is every `override`, no compiled program can use the rule that line 27 teaches. A worker cannot tell whether to write `override` in code that must compile.
- **"Needs a split" (line 29). Confidence: medium.** It is not defined. I read it as a cover made of several narrower bodies.
- **"With no `comprises` clause or only `...`" (line 31). Confidence: medium-high.** The core does not give the `comprises { ... }` form.
- **`T[\X\] & X` (line 31). Confidence: medium.** It does not say whether `&` is Fortress syntax that a worker can write, or the part's notation for a meet.
- **`floor(self): I = self` (line 31). Confidence: medium.** No context says where `I` comes from, presumably `Integral[\I\]`.
- **"A trait that extends a self-typed trait at X" (line 31). Confidence: low.** I read "at X" as "with `X` as its static argument".
- **"This holds for ... pairs and triples" (line 33). Confidence: medium.** It reads two ways: only pairs and triples are ordered, or the condition applies to them. It says nothing of longer tuples.
- **Section placement (line 33). Confidence: low.** Tuple and list order is not about traits and objects.

### Static parameters, `where` clauses and sizes

- **"Do not expect Scala's `Nothing`" (line 37). Confidence: medium-high.** It follows the `Bottom` cases, so it reads as "`Bottom` is not Scala's `Nothing`". The intended sense is probably "an unfixed parameter takes its bound, not `Nothing` as Scala infers". It should move to the rule's first sentence.
- **"F-bounded" (line 37). Confidence: low.** The core describes the idea ("whose bound names the parameter itself") but not the word.
- **"Types a call written as an argument from the enclosing call" (line 39). Confidence: low.** "From the enclosing call" parses badly at first. The next sentence repairs it.
- **"Only the `where` forms that the team wrote are built" (line 41). Confidence: medium.** "Wrote" reads two ways: wrote in code, or wrote in the specification. It also does not say which written forms are not built.
- **"Binds no variable" (line 41). Confidence: medium.** The binding form of a `where` clause is not shown, and the conditional-extension form has no example of its syntax.
- **"Is not known to differ from a numeral" (line 48). Confidence: low.** It is clear with the example that follows.
- **"`NatReflect`", "`NatParam`", "passed where `N[\n\]` is expected" (line 48). Confidence: medium.** None is in the core. `N` could be a specific trait or a placeholder. "It runs compiled only after the switch-over": "it" is probably `reflect`.

### Numbers

- **"Route A", "Route C", "the forest rule", "the team's 2012 patent applications" (line 52). Confidence: high (terms not given).** "Route A" and "Route C" also imply a route B that the line never mentions. The patents are not among the team's sources that the core lists (specification, papers, library, implementations), so a worker cannot tell whether they count as evidence.
- **"Walk gives it the class `Int`, `Long` or `BigNum` by its value, as `ZZ32`, `ZZ64` or `ZZ`" (line 54). Confidence: medium-high.** "As" reads two ways: "which is", or "standing for". If `Int` is `ZZ32`, then `Box[\Int\]` being unlike `Box[\ZZ32\]` makes no sense. The intended reading is presumably that `Int` is a leaf below `ZZ32`, which should be said.
- **"`IntLiteral`'s arithmetic answers a `ZZ32` (row 578)" (line 54). Confidence: medium.** It does not say on which path. The row reads as a departure, but the sentence reads as a rule.
- **"A tie that only a numeral makes" (line 56). Confidence: medium.** I read it as an ambiguity that arises only because a numeral coerces to every number type. That needs saying.
- **`(2/3)^(-1)` (line 58). Confidence: medium.** It implies that `/` on two integers gives a rational. The orientation never states that, and a Java reader assumes integer division.

### Reductions and comprehensions

- **"Clause form", "every clause form" and "a nested clause form" (line 62). Confidence: medium-high.** These are not in the core. I cannot tell what the other clause forms are, or whether "nested" means several generators or a reduction inside a reduction.
- **`0#n` (line 62). Confidence: low.** The core does not give the range syntax, though `library.md` covers ranges.
- **"Outside the bound, each `+` runs at its operands' types" (line 62). Confidence: medium.** It does not say whose bound or what is outside it. I read it as "when the join is outside the reduction's bound".
- **"A reduction without an identity lifts to `Maybe[\R\]`" (line 64). Confidence: medium-high.** It reads two ways: the result of `BIG MAX` has type `Maybe[\R\]` and the caller must unwrap it, or the lifting is internal. This decides how a worker writes every `BIG MAX`.
- **"`BIG //`" (line 64). Confidence: medium.** It is not in the core, and a worker cannot tell which operator it is.

### Implementation limits

- **"Until it runs the checker after the switch-over (P-12)" (line 68). Confidence: low-medium.** The core's switch-over moves the compiled path onto the interpreter's library and does not mention walk's checker. This line reads two ways: walk turns the checker on as part of the switch-over, or at some later point. Line 54 ties the same event to P-12 and P-76 without the switch-over.
- **"It takes a `Maybe` as an `if` condition" (line 68). Confidence: low-medium.** It reads as a permission. It never says not to rely on it, and it does not say whether this is a departure with a row.
- **"Write every parameter type" (line 70). Confidence: medium-low.** It does not say whether function expressions are included. "Only where one api declaration ... gives it" leaves both the path and "one" (exactly one?) open.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

I read Astra's two questions, as the brief gives them, as: does the passage change an action, and does it prevent a misunderstanding?

**History:**
- **"Route C, the alternative not taken, would keep a nested tower under the forest rule of the team's 2012 patent applications" (line 52).** This is decision history. It changes no action. Keep the next two sentences on "the tower", which do prevent a misunderstanding. Confidence: high.
- **"The Working Draft's ban on such pairs is gone" (line 11).** Repair history. Line 5 already covers disagreements with the specification. If it stays, fix its antecedent (section 2). Confidence: medium.
- **"As the team's walk did" (line 13).** History. It is marginal: it helps only to explain old team tests, which line 7 already warns about in general. Confidence: low.

**Detail that changes no action:**
- **The nine-row list "(rows 539, 416, 786, 412, 759, 779, 780, 788, 787)" (line 17).** It is unsorted and gives no content. The action ("find the row in `interpreter.md`") does not need it. Confidence: medium.
- **"Walk is unchanged" (line 31).** Walk has no static types (core and line 68), so no action depends on this. Confidence: medium.
- **"The checker computes any power of 0, 1 or -1, and other powers up to the exponent 4096" (line 48).** This is a limit that almost no work meets. It could shrink to "the checker refuses size powers above 4096 or below 0". Confidence: low.
- **"This holds until walk runs the checker (P-12, P-76)" (line 54).** It describes a future state and changes no action now. Confidence: low.

**Repeats the core** (no new action once the core has been read):
- Line 37's first half repeats the core's "A type parameter that a call does not fix takes its bound" and "stays open". Only the checker's meet and the row numbers are new.
- Line 62's walk instantiation at "a local variable's, or a top-level or local function's return type" repeats the core. Only "a method's return type, a field and a parameter do not direct it" is new.
- Line 68's "Walk runs programs that the checker refuses" and "A walk run does not prove a program well typed" repeat the core's "A program that runs under walk can be ill-typed".

Confidence that these three repeat the core: high. Whether to keep them for emphasis is the curator's call.

**Borderline, keep:**
- **"Without the rule, such programs die with `IncompatibleClassChangeError`" (line 23).** It is a reason, not an action, but it lets a worker recognise the failure when it appears. It passes the second question.
