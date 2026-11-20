<!-- The orientation workflow's preservation check, update mode, for climb batch 34's landing: the one admitted entry, F-225 (row 1094), checked against orientation.md; two failures, both in the new sentences of "Traits and objects" at :43. -->

# Preservation check: climb batch 34's update

Inputs: `orientation.md` and `admission.md` in this folder, against the skill's current part, `.claude/skills/fortress-repo/references/revival-changes.md` (33,434 bytes, last changed at `52b7f33e6a`), on `main` at `b802d2e6fd`. `diff` of the two files: only line 43 differs (617 characters before, 941 after, 324 added).

## Failures

### 1. The getter workaround goes past the measured form

New text (`orientation.md:43`):

> Declare the method at `T`'s return type, or as a getter, which compiles with the narrower type.

Sources:

- F-394: "So a narrowing getter below a self-typed trait compiles."
- Row 1094: "A getter reads the plain type (`getterArrow`, `:224`) and compiles."
- The test that measures it, `compiler_tests/SelfTypedGetterNarrowedReturn.fss`, declares both sides as getters, with no parameters: `getter g(): Number` in `trait Tn[\I extends Tn[\I\]\]` and `getter g(): ZZ32 = 3` in `object On extends Tn[\On\]`.
- The code reads the plain receiver only when both declarations are getters: `val getters = isGetter(o._1) && isGetter(p._1)` (`OverloadingChecker.scala:725`). Only then does `arrow` use `getterArrow` (`:728`).

"The method" in the new sentence is the object's redeclaration, because `T`'s method is already at `T`'s return type. So the sentence reads naturally as "declare the object's redeclaration as a getter", with `T`'s dotted method left as it is. That mixed pair, a getter below a dotted method, is not measured. Reading the code, `toMethodArrows` drops a getter (`isDeclaredMethod`, `:210`). So if the mixed pair reaches this check, the getter's side yields no arrow, and no return type check runs. Nothing on record says whether the pair reaches it, or what the checker or the code generator then does with it. The sentence also does not say that a getter takes no parameters. The departure itself is stated "at the same parameter types", which can include parameters.

**Consequence for a worker.** A worker may make only the object's method a getter, or try a getter for a method that has parameters. It then meets an unmeasured result, and may record it as a new defect or spend a cycle on it. The measured workaround is to declare both `T`'s method and the object's as getters, and only for a method without parameters. A wording that keeps it inside the measure: "or declare it and `T`'s method as getters, which compile with the narrower type".

### 2. The measured scope's "abstract in `T`" is dropped (minor)

The admission's "Points for the writer" ask the writer to state the departure at its measured scope, which includes:

> measured with the trait's method abstract (`XXXSelfTypedMethodNarrowedReturn.fss`).

New text:

> The checker also reads that type, a departure, where an object redeclares a dotted method of `T` at the same parameter types (row 1094).

This wording covers a concrete method of `T`, one with a default body, as well. The test's trait method is abstract: `g(): Number` with no body. The writer left this out knowingly (`writer-1.log`, "Decision not taken").

The sentence says no more than its sources:

- F-225 has "where an object's dotted method redeclares the trait's method at the same parameter types".
- Row 1094 has "redeclares a self-typed trait's method".
- `changes.tex:4452-4455` has "redeclares a dotted method of such a trait".

None of the three restricts the departure to an abstract method. In the code I read, the pairs come from `providedAndOverridden`'s `overridden` (`OverloadingChecker.scala:410-422`) and go to `checkOverridingReturnType` with no test of abstractness. So the clause is probably true for a concrete method as well, but that case is not measured.

**Consequence for a worker.** It is small. A worker may take a narrowed redeclaration of a concrete `T` method as certainly refused, and write an `XXX` test of it with no measure behind it. Whether to add "abstract in `T`" (about 15 characters) is the judge's call.

## Checked, no failure

The admitted finding's rule is in the new text. The text adds a second exception to the plain reading of `self`: in the Return Type check of an object's dotted method redeclared at the same parameter types, the checker reads `T`'s receiver as the intersection. It calls this "a departure" and cites row 1094. By the orientation's opening (`:7`), that makes a test of the form as written an `XXX` compile test, as the tree's `XXXSelfTypedMethodNarrowedReturn.test` is.

Each condition and path difference that the admission names is kept:

- **Object, not trait.** The text says "an object redeclares".
- **Dotted, not functional.** It says "a dotted method".
- **Same parameter types.** Kept. The code's check is at `equal` (`:732-734`).
- **Strictly narrower return type.** It says "refuses a narrower return type". The check runs both ways, so this claims no more than the code does.
- **No `comprises` list of types.** `T`'s definition two paragraphs up leaves out a trait whose `comprises` clause lists types.
- **Row 879.** Left out.
- **Walk runs it.** The text says "which walk runs", from row 1094's "Walk runs the program".
- **The workaround at `T`'s return type.** Taken from row 1094's notes.

`T`'s definition also covers a trait that is self-typed only through another self-typed trait it extends. That form is not measured for this departure. F-225 ("below the trait", a trait that includes the `Containment` case) and Appendix I ("such a trait") state the departure for that wider set too, so the text says no more than its sources.

The rest of the paragraph is kept whole:

- the P-157 sentence on the exclusion test;
- the array-and-number pair;
- walk's reading;
- the two-case list of row 999.

"With this reading" became "With the reading of the exclusion test", which keeps the old antecedent. "Walk reads `self` in the same way" still follows that reading, and the new sentence on the departure says that walk runs the form, so walk is not taken to share the departure. The text leaves `:32` alone, as the admission asks. P-146 and P-157 stay the rule: P-157 is cited, the bold rule cites P-146, and the new case is called a departure.

`sources-mapping.md`'s citations check out on `main`:

- `OverloadingChecker.scala:214` (`selfType.unwrap` in `toMethodArrows`);
- `:733-734` (`returnTypeCheck` both ways);
- `:220-228` (`getterArrow`'s comment and head);
- `rung-widening-getter/REPORT.md:46` (`XXXSelfTypedMethodNarrowedReturn` 'Saw expected failure' on the old code and the new);
- `changes.tex:4452-4455` (Appendix I's departure sentence);
- `5a70c03deb` (F-225's change).

Outside this check, for the judge: the admission asked for "one sentence, or one clause added to the existing sentence, of about 300 characters". The change is three new sentences, and the first sentence is split, for 324 characters. This bears on form, not on preservation.

## Count

One admitted finding checked: F-225 (row 1094). That covers its six points for the writer, the four mistakes it prevents, and the rest of the paragraph it changes. Two failures were found, one of them minor. The whole-file diff shows no other change between the current part and `orientation.md`.
