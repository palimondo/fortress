<!-- What decides a call when the overloading rules leave it with two or more most specific declarations, by the nine steps, written 2026-11-24 by the coordinating session for the curator's ask of 07:0x UTC ("File order cannot decide! There must be a language rule that decides definitively or its static error!"), from two Opus workers' reports of that morning (the landed code run in both orders; the texts and the peers): where the order of declarations still decides on the code of 61b50cd34a, the nine steps, the two forks for him with options and a recommendation, and the coordinator's own fixes. To move to explorations/reviews/ with its INDEX line after climb batch 36's record-landing ends. -->

# What decides a tied call: the nine steps

## 1. The question, and what the cases share

Since climb batch 36's rung K (`da5f707779`), the compiled checker sorts a call's candidate declarations by their places (file path, then line and column) before it picks the most specific (fork K4). The declared signatures decide where the rules order the candidates. Where they leave two or more most specific declarations, the first by place still decides in five places. The curator's words: at 23:30 UTC on 2026-11-23, "there must be like a rule in Fortress that decides which implementation should be picked, and it must be stable. It cannot differ between runs, or it must be a static failure if it's impossible to decide"; at 07:0x UTC on 2026-11-24, "File order cannot decide! There must be a language rule that decides definitively or its static error!"

The five places, on the code of `61b50cd34a` (worker report, section 1):

- **A. A tie among a unit's own declarations at a type with no value** (row 1136). `Functionals.scala:1197-1214`, the branch `top.forall(ofThisUnit)`. The order decides the call's type, so whether the program compiles. No value reaches the call.
- **B. A tie that a `comprises` clause covers (P-60), and the compiled dispatch's reach.** The same lines, the branch `tieType(...).isDefined`: the call's type is the intersection either way, but the code names the first by place (`STypesUtil.scala:1222-1262`, `CodeGen.java:1758-1803`). The compiled call then dispatches only among the named declaration's component's declarations and the call's statically applicable candidates. So across components the order decides which body runs, and a more specific declaration in another component never runs, also with no tie (defect D1 below). A value does reach these calls.
- **C. A tie among coercions.** `CoercionOracle.scala:363-383` takes the first of a list built from a hash set of `Coercion`s, which override no `hashCode`: the JVM's identity hashes decide which coercion method the code names. The body that runs is the same.
- **D. Two on-demand imports of one signature.** The first by place is kept with no error; the code generator then crashes.
- **E. Which error is reported.** `Functionals.scala:1019-1024` keeps the first by place, not the decided declaration, so in a program refused anyway the order picks which error the checker prints.

## 2. The nine steps

### (1) What the mathematics says

- For a set that the three rules accept (No Duplicates, Return Type, Meet), every value that reaches a call has exactly one most specific applicable declaration: the OOPSLA 2011 paper's Unambiguity Lemma and Overloading Safety Theorem (`Papers/Types/safety.tick:55-77`), and POPL 2019's Theorem 4.1 for an argument type other than `Bottom` (`Papers/Variance/rules.tex:509-521`).
- A static tie can arise only where the call's static types admit several dynamic outcomes (P-60's coverage) or admit no value at all. A type parameter bounded by two traits that exclude each other holds no value: their meet is `BottomType` (`Specification/basic/types-vals-vars.tex:161-166`). That is case A.
- OOPSLA 2011 adds to every overload set an implicit `f(⊥):⊥`, more specific than any declaration a program can write (`Papers/Types/rules.tick:205-224`), so its meet always exists; at a static type of `⊥` that declaration would decide, and type the call `⊥`.

### (2) What each path does today, measured

On `61b50cd34a`, each program in both orders, compiled and under walk (worker report, section 2; programs in `tmp/tie-probe/`, not committed):

- **A.** `trait A excludes B`; `f[\T extends A\](x: T): ZZ32 = 1` and `f[\T extends B\](x: T): String = "b"`; `g[\X extends { A, B }\](x: X): ZZ32 = do r = f(x); r end`. With A's `f` first it compiles and runs; with B's first: 'Function body has type String, but declared return type is ZZ32.' From an importer through an api, both orders: 'Ambiguous call to function f'. Walk loads and runs both orders.
- **B.** The coverage family of `compiler_tests/CoverageReturn*` split across two apis, `m: M = Vo`, `choose(m)`: with the apis' file names in one order the compiled program runs the body at `S` and prints `FAIL`; with the names swapped it runs `choose(v: V)` and prints `PASS BothResult`. Within one component both orders print `PASS`, naming different methods. Without any tie, `s: S = Vo; choose(s)` against the two apis runs the body at `S` compiled and `choose(v: V)` under walk.
- **C.** `object K` with coercions from `S`, `T` and `V`: both orders and both paths print 'coercion from V'; the method named is `coerce_K:(T)` in the JVM's default hash mode and `coerce_K:(S)` under `-XX:hashCode=2`.
- **D.** Two on-demand imports that each declare `pick(x: ZZ32): String` pass the checker, and the code generator stops: 'Likely bug in static analysis, apparently malformed overload set not rejected'. Imported by name, the pair is refused: 'There are multiple declarations of pick with the same parameter type: ZZ32'.
- **E.** A pair that breaks the Return Type Rule reports 'Right-hand side has type ZZ32, but declared type is Box[\ZZ32\].' in one order and the Return Type Rule's error in the other.
- In the one library and the compiled suite, the planner's instrumented count found 66 ties over the fourteen components and 1,598 in the compiled tests; the declared reading or P-60 decides all but a handful, each in a program the checker refuses (`compile-ladder/plan-36/probes/fixes-36.md`, lines 44-54).

### (3) What the specification says, under every spelling

- No edition lets the order of declarations decide; a search for "order in which", "textual" and "declared first" over both overloading chapters, the proof appendix and the 2012 restart finds nothing (texts report, (a)).
- At run time, among the declarations that no other applicable declaration is more specific than, "we choose an arbitrary declaration" (`Specification/basic/overloading.tex:309-311`); the same text stands in the Working Draft and in the 2012 restart (`Documentation/Specification/Prose/Language/overloading.tick:282-283`).
- Statically: "it should be a static error if there does not exist a statically most applicable declaration for that expression" (`Specification/advanced/overloading.tex:67-69`). The one exception is the revival's coverage case, typed by the intersection (`:79-92`, Appendix I `revival-meet`).
- The specification makes a unit's own and its imported declarations one overload set (`Specification/basic/components/source-code.tex:257-266`).
- The 2012 restart: the call's static type is that of the "statically most specific applicable visible" declaration, and its rules ensure "existence and uniqueness ... never ambiguous" (`overloading.tick:22-33`, `:42-47`).

### (4) What the library does

- The one library holds no tie that place decides: the planner's count found every tie over its fourteen components decided by the declared signatures or by P-60 (`fixes-36.md`, line 46 on). Its calls on `self` in `QQ comprises { Ratio }` take `Ratio`'s declarations by rule (F-408).

### (5) Where the designers departed from Java

- Java refuses an ambiguous call; Fortress refuses an ambiguous set of declarations, "even if no call ... appears in the program" (`Papers/Dispatch/body.tick:255-284`).
- The static stage of a Fortress call "is designed to have the same behavior as a single-stage, fully dynamic dispatch ... purely as a performance optimization" (`body.tick:216-250`). So a compiled call must run what dispatch over the whole overload set would run: case B's narrower reach departs from this.
- Fortress has no asymmetric tie-break by the order of parents, which MultiJava and Scala use (`body.tick:286-297`); the FAQ: "We want to disallow ambiguous calls" (`Specification/appendices/FAQ.tex:59-79`).

### (6) What the peers do

- Refuse a tied call statically: Java (JLS 15.12.2.5), C# (§12.6.4.1), Scala (§6.26.3), Kotlin (overload resolution), Swift ('ambiguous use of'). None lets declaration order decide a call.
- Julia refuses at run time with a `MethodError` ("The order in which the methods are defined does not matter"), and its ambiguity detector by default ignores an overlap only at `Union{}`, a type that holds no value (`Test.detect_ambiguities`, `ambiguous_bottom=false`): the nearest peer to case A.
- Order decides in CLOS (the class precedence list, from the order of superclasses) and in Dylan (per argument; remaining ties are errors).

### (7) What the commits say

- The team's checker at `a874948ac` sorted the candidates and took `candidates.head`, under a comment "// ensure that head is actually more specific." with no code beneath; no ambiguity error existed, and the candidates came from hash sets (texts report, (c)).
- The team worked against order dependence: `be4361de44` (Chase, 2009), "Made order of overloaded functions be repeatable"; `04ae38ded5` (Maessen, 2007), programs that "would fail in scheduler-dependent ways"; `17f975862a` (2009), "non-deterministic rejection of program".
- Steele, JuliaCon 2016, slide 17: "Order should not matter: declarations in a file, imports, declared parents, overload resolution, argument evaluation" (`research/extracts/SteeleJuliaCon2016-extract.md:118-121`).

### (8) The derivation from the curator's principles

- His words of 23:30 and 07:0x (section 1): a rule decides, or a static error.
- P-45: walk chooses "not by the order in which they are written", and walk and the checker must accept the same pairs.
- P-60: a call between closed traits may have several most specific declarations; "the declaration that runs is unique only at run time"; the call is typed by the intersection.
- P-26: the team's later word wins; here POPL 2019 and Welterweight, which make a static tie have no typing (POPL 2019's rule [MSAV] needs a singleton, `Papers/Variance/resolve.tex:41-45`; Welterweight's [T-Function], `Papers/Welterweight/fig-expressiontypes.tick:56-64`).

### (9) The decisions

**Fork 1, case A: a tie at a type that holds no value.**

- 1a. A static error, 'Ambiguous call', in the unit as through an api: fork K3 as planned. Text: `advanced/overloading.tex:67-69`; POPL 2019 and Welterweight; the static peers. Cost: the branch `top.forall(ofThisUnit)` goes; pinned team messages that report the overloading check's refusal first need the call's error beside them (K.worker.1).
- 1b. Type the call by the intersection of the tied return types, as P-60's tie: sound, since no value reaches it. Text: OOPSLA 2011's implicit `f(⊥):⊥`; Julia's `ambiguous_bottom=false`. Cost: the same branch reads `tieType`.
- 1c. Refuse a static parameter whose bounds exclude each other, as an empty type, so `g` above is refused at its header. No team text states it; inference never instantiates at `BottomType` (`basic/inference.tex:105-106`).
- Recommendation: **1a**. It is the planned fork, the specification's sentence and the team's later word, and needs no new rule.

**Fork 2, case B: what a compiled call dispatches over.**

- 2a. A compiled call dispatches over every visible declaration of the name whose domain its argument types can reach, whichever component declares it, so neither the head nor the order matters. Text: one overload set (`source-code.tex:257-266`); the static stage only an optimisation of dynamic dispatch (`Papers/Dispatch/body.tick:216-250`); walk does this today. Cost: a code-generator rung on `OverloadSet` and `CodeGen` (a dispatch method at the call over the set's members from several components); not measured.
- 2b. A static error where a declaration more specific than the one named lies in another component. Cost: a checker rung; refuses programs that walk and the specification run.
- 2c. Keep naming one declaration, picked by a stated rule in place of place. It ends the order's say over the head, but `choose(s)` still runs the body at `S` (D1 stays).
- Recommendation: **2a**. It is the designers' stated semantics and walk's behaviour.

**The coordinator's own, with no decision of his in them:**

- Case C: a tie among coercions is decided by a rule, the cover, or refused as 'Ambiguous coercion'; never by hash.
- Case D: two imports of one signature are refused by the No Duplicates Rule, as by name.
- Case E: the error reported follows the decided declaration, not the first by place.

## 3. Defects to file in the gap ledger after the record-landing ends

- **D1.** A compiled call runs only declarations of the named declaration's component and the call's statically applicable candidates; a more specific declaration of another component never runs (`s: S = Vo; choose(s)` against two apis).
- **D2.** A coverage tie split across components runs a body chosen by the order of file paths or lines (D1 with the order).
- **D3.** The checker's choice among tied coercions follows the JVM's identity hashes; only the method named changes.
- **D4.** Two on-demand imports of one signature pass the checker and stop the code generator (siblings: rows 813, 814).
- **D5.** Walk refuses at load a unit whose cover is imported, and runs one of two duplicate imports.
