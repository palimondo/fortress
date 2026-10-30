<!-- The judge's ruling on climb batch 22c's rung A (rung-abstract-declared): the one contested fix, eee518f60, a component field matching an api's abstract getter, upheld; the rung stands. -->
# Judge: rung A, an api member written abstract is declared in the component (P-158; row 816)

Head judged: `8718703fd` (the skeptic's review). One contested fix, `eee518f60`. Read, not run: the fix's diff, `SKEPTIC.md` sections 3 to 5, `REPORT.md` sections 3 and 10, `record.md`, `decision-record.md`, the revised passage and Appendix I entry, and the passages and code both sides cite.

**Decision: stands.** `eee518f60` is upheld; nothing is reverted. The rung lands as `wip/rung-abstract-declared` holds it.

## 1. The ruling: `eee518f60`, upheld

The fix (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:832-838`, in `equalAbstractMember`, `:828-840`) lets an api getter written `abstract`, with no static parameters, no parameters and no `throws`, be matched by a component field of one name, the getter's name and its return type, that is neither `hidden` nor `private`. Its test is `ProjectFortress/compiler_tests/ExportAbstractGetterField` (an api, its component, and a client asserting `mk().x` is 4).

Why it stands:

1. **The specification makes the field a declaration of that getter at the api's header.** `Specification/basic/traits.tex:722-723`: "Traits may also include abstract field declarations that are implicit declarations of abstract getter methods." Then `:732-734`: the implicit getter "takes no arguments, has the same name as the field, and has a return type equal to the field type". The same text is in `Specification-1.0-frozen/basic/traits.tex:574-586`. So a component trait's `x: ZZ32` declares `getter x(): ZZ32` without a body: the api's header, with `abstract` aside. That is what P-158 asks (POSITIONS.md, **A member that an api writes `abstract` is declared in the component that exports the api.**: "at the api's header, with a body or without one"). It is also what the rung's revised clause asks (`Specification/basic/components/source-code.tex:385-388`: "a method declaration with the same header, apart from the modifier `abstract`, with a body or without one").
2. **The export rule counts implicit getters as declarations.** The same subsection says "A field declaration is satisfied by a (possibly implicit) getter and/or setter declaration" (`source-code.tex:407-410`). An api cannot write `abstract` on a trait's field at all: an api field admits only `hidden` and `settable` (`ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java:224-228`, `ProjectFortress/src/com/sun/fortress/nodes_util/Modifiers.java:159`). The skeptic's `SkAbsField`, on the old code, printed 'abstract cannot modify fields in an API.' So an api trait's field and an api's `abstract getter` are two spellings of one abstract member. The base already matches the first by a component field (`equalMember`, `ExportChecker.scala:843`ff., `equalLValue`). The fix matches the second the same way.
3. **Row 816's reason for refusing does not apply.** Row 816 refuses because a compiled call is an `invokeinterface` on the component's trait interface, which lacks the member (fortress-gap-ledger.md:314, row 816; `explorations/perf-probes/export-abstract-codegen/REPORT.md`, "In short"). The field's getter is in that interface. The skeptic ran `SkAbsGetterFieldRun` on the old code and on the fix: it printed 'mk().x =  4' and 'PASS' (SKEPTIC.md, section 2). Without the fix, the rung refuses a program that the base compiled and ran, and that the text accepts.
4. **The fix only widens acceptance, so it cannot add a site.** Its arm is reached only through `inComp.exists(r => equalMember(l, r) || (isAbstractMember(l) && equalAbstractMember(l, r)))` (`ExportChecker.scala:801-802`), so it removes refusals and adds none. The worker measured distance 0 and count 0 on `733d73574`, and they stay 0. The skeptic found no library site that the fix moves: in a grep of the 71 `abstract getter` lines of `Library/` and `LibraryBuiltin/`, no component trait meets one with a field. `ant testQuick` on the fix: 'Tests run: 1321, Failures: 0, Errors: 0' (compiler), '86' and '263', no failures (SKEPTIC.md, section 3, finding 1). The test was seen red on the worker's head first: 'due to different method x', 'Tests run: 3,  Failures: 2'.
5. **It stays inside the rung.** It touches only `equalAbstractMember`, the function the rung adds and the brief names ("equalListMembers and the new equalAbstractMember, only"), plus a test in `ProjectFortress/compiler_tests/` and a line in this folder's `record.md`. Rungs O and L edit other functions (the brief, "Overlaps by file").

## 2. Each side's claims

- **The worker, right:** the team's 2012 check compared members of one kind only. In `5a68404fd:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:790-803`, `equalMember` matches field with field and method with method, and is `false` otherwise. So that check refused the field.
- **The worker, wrong:**
  - "Read by it, a field is not a member 'of the same header'." The spec gives the field a header: the implicit getter's, `traits.tex:732-734`.
  - The 2012 check's one-kind comparison is no rule of the team's. The same comparison also refuses a component getter for an api field, which the text allows in so many words (`source-code.tex:407-410`). The rung records that refusal as an implementation gap (NEW-A-2, `record.md`, gated by `XXXExportFieldByGetter`).
  - The worker's own decision 1 already departs from the 2012 check, where the text asks it to (`count816` over `count816strict`, REPORT.md, section 10). The interpreter and the team's check are evidence, not the standard (POSITIONS.md, **The specification stays the standard.**).
- **The skeptic, right:**
  - The field declares the getter at the api's header (`traits.tex:722-723`).
  - The getter is in the trait's interface, so the compiled call runs.
  - The refusal came from the rung's count, not from the text.
  - The exclusions are the spec's own. `hidden` has no implicit getter (`traits.tex:741-742`). A `private` declaration "participates in satisfying" no exported declaration (`source-code.tex:319-320`).
- **The skeptic, not shown:** nothing claimed is wrong. The fix's arm matches a field declaration of one name only (`List(SLValue(...))`, `ExportChecker.scala:834`). So a component trait field declaration of several names, against several api getters written `abstract`, is still not matched, as it was not on the worker's head. Neither side measured that case, and the library has none (point 4). It is noted here and is not a finding.

## 3. For the curator

The field case was decided where nothing on record names it. The ways:

- **(a) Match the field.** Upheld. It costs one arm of `equalAbstractMember` and one test.
- **(b) Refuse it, as the team's 2012 check did.** The rung would then refuse a program that the base compiled and ran, and that the text accepts.
- **(c) Defer it with a row.** The same refusal lands meanwhile.

The revised clause says "a method declaration with the same header" (`source-code.tex:385-388`). It holds for the field through `traits.tex:722-723`, so no sentence is false. Where the subsection wants to count implicit getters, its own words are "(possibly implicit)" (`:408`). A later revision could add those two words to the clause. No repair round is asked for it.

## 4. Reverts

None.
