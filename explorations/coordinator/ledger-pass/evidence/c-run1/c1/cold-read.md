# Cold read: c-run1/c1/clean.txt

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and lookups in `references/records.md`, `tests-writing.md`, `compiler.md`, `interpreter.md` and `library.md` only. Four rows, no duplicate text in the file.

## Row 188

- **Defect:** None; the row records a capability. `RR64` has `truncate` as a functional method (`truncate(self):ZZ64`), so `truncate(7.0)` works under walk and gives the `ZZ64` 7. The old claim that `truncate` had no implementation came from a probe that wrote `v.truncate()`. A functional method is called `f(x)`, not `x.f()` (SKILL.md, "Functional methods"), so the dotted call fails with 'Cannot find definition for method truncate given receiver 7.0'.
- **Where:** Walk. The declaration is in `Library/FortressLibrary.fsi:382`. The test that asserts it is `ProjectFortress/tests/NativeHelperFamilyFloatWalk.fss:240`. The row does not say whether the compiled path also has `truncate`, or whether nobody looked.
- **Reproduce:** No reproducer cell. A worker runs `truncate(7.0)` under walk (`bin/fortress P.fss`) and sees 7, and writes `v.truncate()` to see the old error. The probe's source is at `git show 1ee3b0bc5^:explorations/apl/v1-probes/p01_numfmt.fss`.
- **Status:** RETIRED, which closes the row (records.md). Nothing to fix. The lesson for a worker is to call `truncate(v)`.
- **Could not resolve:**
  - "siblings: 283": I read it as "related row", but the skill does not define the word. (wording/convention)
  - "full text: history, row 188": I read it as the earlier text in `explorations/fortress-gap-ledger-history.md` (records.md). Clear once looked up.
  - "apl rung 1" in Found by: "rung" is never defined in the skill (it shows up only in test names). It does not matter for the work. (concept I lack)
  - RETIRED vs FIXED: the skill says the row template defines each status word, but the template is in the ledger, which I may not read. From the notes I take RETIRED to mean "the claim was wrong, withdrawn". (concept not in the skill)

## Row 283

- **Defect:** None; the row records a capability. `ZZ64` has the functional method `narrow(self):ZZ32`, so `narrow(x)` turns a `ZZ64` into a `ZZ32` under walk. Taking the floor of an `RR64` gives a `ZZ64` (`:379`), so `narrow` of the floor of 7.5 gives the `ZZ32` 7. That chain is the `RR64 → ZZ32` conversion the old claim said was missing. The old claim came from a probe that wrote `f.narrow()`, which fails as a dotted call: 'Cannot find definition for method narrow given receiver 3: ZZ64'.
- **Where:** Walk, in `Library/FortressLibrary.fsi:645` (`narrow`) and `:379` (the floor). The test is `ProjectFortress/tests/NativeHelperFamilyIntegersWalk.fss:71`. The row does not say anything about the compiled path.
- **Reproduce:** No reproducer cell. A worker runs `narrow(⌊7.5⌋)` under walk, assuming "floor bracket" means `⌊ ⌋`, and sees the `ZZ32` 7. The probe is at `git show 7c3218956^:explorations/apl-probes/d21_narrow.fss`.
- **Status:** RETIRED (closed). Leave it.
- **Could not resolve:**
  - "the floor bracket": I read it as the floor operator `⌊x⌋`, a bracketing operator of `RR64` that returns `ZZ64`. The skill never names it, and the row does not give its spelling. (concept I lack / wording)
  - In the Claim, "`narrow(f)`" names `f` without saying what it is. Only the Notes show that `f` is the floor of a float, not the float itself. Someone could read the Claim as `narrow` applied straight to an `RR64`. (unclear wording)
  - "siblings: 188": same convention question as row 188.

## Row 866

- **Defect:** On the compiled path the checker accepts `object MyNum extends ZZ32`, because the compiler prelude's `trait ZZ32` has no `comprises` clause. The run then dies when `MyNum`'s class loads: the code generator makes the class implement `FZZ32`, which is a Java class, not an interface. The error is 'IncompatibleClassChangeError: class ...$MyNum can not implement ...FZZ32, because it is not an interface'. The one library says `ZZ32 comprises { Int }`, and the specification makes `ZZ32` the 32-bit integers, so such an extender should be refused.
- **Where:** The compiled path: the checker (it accepts the extender), the prelude (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:210`) and the run time (`compiler/runtimeValues/FZZ32.java:14`). Walk loads the program (row 551), and `MyNum + 1` there ends 'getInt not implemented for FOrdinaryObject'.
- **Reproduce:** Run the pair `compiler_tests/ObjectExtendsZZ32CompiledLink.test` (the link, which passes) and `compiler_tests/XXXObjectExtendsZZ32Compiled.test` (the run), in that order, in one `junit.sh` call (tests-writing.md, run-time pair).
- **Status:** NEGATIVE-VERIFIED, open. "Fix: refuse the extender" tells a worker to build a fix that makes the compiled path refuse `object ... extends ZZ32`. It does not say where that fix goes. compiler.md forbids adding a declaration to the prelude, so a `comprises` there is ruled out. That leaves the checker, but the row does not say so.
- **Could not resolve:**
  - "Fix: refuse the extender" against row 698's "Ends at the switch-over; the prelude takes no new declaration". Both rows have the same cause (no `comprises` on the prelude's `ZZ32`). One asks for a fix and the other says to wait for the switch-over. After the switch-over the checker reads the one library's `comprises { Int }`, so it would refuse `MyNum` anyway. I cannot tell whether a worker should build a checker fix now or wait. (unclear wording / possible conflict)
  - "the run prints the line before `MyNum`'s first use, or none if `MyNum` declares a functional method": "the line" is not said. I guess it is the `REACHED` line of a run-time XXX test, and that with a functional method the class loads at start, before anything prints. (unclear wording)
  - "The one library's `ZZ32 comprises { Int }`": the sentence has no verb ("declares"). It reads fine anyway. (wording)
  - The walk failure 'getInt not implemented for FOrdinaryObject': I cannot tell whether that is a separate defect (row 551's) or part of this row. (unclear scope)
  - "climb batch 24 rung W's skeptic" in Found by: "climb", "rung" and "skeptic" are not defined in the skill. It does not matter for the work. (concept I lack)
  - Siblings 551, 698. Row 698 lists only 866 back, so the links are not symmetric. (convention)

## Row 698

- **Defect:** The compiled checker refuses `add(a: ZZ32, b: ZZ32)` beside `add(a: List, b: List)`, where `List` is a user trait: 'Invalid overloading of add ... (List, List)->List ... and (ZZ32, ZZ32)->ZZ32'. The prelude's `ZZ32` has no `comprises`, so the checker cannot prove that no value is both a `ZZ32` and a `List`. Without that proof the pair needs a meet declaration, and the Meet Rule fails. Walk uses the one library, where `ZZ32 comprises { Int }` and `Int` is a value object that does not extend `List`. So under walk the domains exclude each other and the pair runs.
- **Where:** The compiled checker against the prelude (`CompilerBuiltin.fsi:210`). The one library declares `Library/FortressLibrary.fsi:536-538` and `LibraryBuiltin/FortressBuiltin.fsi:125`. Walk's passing test is `ProjectFortress/tests/OverloadZZ32BesideUserTraitWalk.fss`.
- **Reproduce:** `compiler_tests/XXXOverloadZZ32BesideUserTrait.test` through the harness. I take it to be a compile test that expects the refusal message. The program is from the examples in `explorations/reviews/popl2019-examples.md`.
- **Status:** NEGATIVE-VERIFIED, but "Ends at the switch-over; the prelude takes no new declaration" tells a worker not to fix it. The defect goes away when the compiled path moves to the one library, and the XXX test then turns red and gets promoted. Leave it.
- **Could not resolve:**
  - "the talk's slide 2 set": I cannot tell which talk (presumably a POPL 2019 talk) or what "set" means (the examples on slide 2?). I would have to open the cited review. (unclear wording)
  - The Specification cell cites "Incompatibility Rule", while the Claim and the message speak of the Meet Rule. I cannot tell whether that is the same rule under two names or a wrong citation. The skill names the Meet Rule but not an "Incompatibility Rule". (concept I lack / possible mismatch)
  - "Found by: POPL 2019 examples sorting": unclear what "sorting" refers to. It does not matter for the work. (wording)
  - Possible conflict with row 866, as described there.
