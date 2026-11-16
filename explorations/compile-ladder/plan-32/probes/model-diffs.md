<!-- A probe after climb batch 32, of 2026-11-16: the four diffs to microGPT's flat program that the batch's review (explorations/reviews/batch-32-review.md, section 3) counts as closed on both paths, each applied alone and all together on the landed tree c0c35b4f9e, under walk's quick check and under the compiled checker against the one library; run in a worktree seeded from the base build /home/user/fortress-base34, removed after; nothing committed. The four diffs as one patch: model-diffs.patch beside this note. -->

# The four model diffs of climb batch 32, measured on the landed tree

**The question.** For each of the four diffs that the review counts as closed on both paths, does the model, with the diff applied, still pass its quick check under walk, and what does the compiled checker say of it against the interpreter's library?

**The answer.** All four pass under walk, alone and together: `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`, with the same values as the landed tree. The checker's distinct error sites do not change in any state: `FlatArrays` 31, `FlatData` 3, `MicroGptFlat` 8, `MicroGptFlatQuick` 0. No site came and none went. No diff failed, so there is no defect to file.

The checker's unchanged count says less than it seems for two of the diffs, because the checker reports nothing in `step` after line 57 (section 3). Section 4 checks the forms in a small program instead.

## 1. How

- Base build: `/home/user/fortress-base34`, detached at `c0c35b4f9e`, built by `ant compileAll` (49 s), the library order and one walk run of `ProjectFortress/tests/BooleanOps.fss`. Its five jars are in `default_repository/caches/bytecode_cache/`, and `git status --porcelain` prints nothing. Nothing else ran in it.
- Scratch worktree: `/home/user/fortress-mdiff`, seeded from it by `seed-worktree.sh`, detached at `c0c35b4f9e`, removed at the end.
- Walk: `explorations/coordinator/tools/mg-run.sh tmp/mg-<state> <state>`, one thread. It runs both quick checks; the verdicts below are the flat program's. The APL program reads `FlatArrays2`, not `FlatArrays`, so no diff touches a file of its own; its check ran beside the flat one in every state and passed (7 of 7).
- Checker: `explorations/compile-ladder/plan-31/probes/model-closure/run.sh check <out> explorations/run-c4/src <tree>/Library/FortressLibrary.fss FlatArrays.fss FlatData.fss MicroGptFlat.fss MicroGptFlatQuick.fss`. For the landed tree, one more run with `Library/System.fss`, `Library/FileSupport.fss` and `Library/File.fss` after the library, as `model-closure-check.md` ran it.
- A site is one error at one line and column of a file, counted once however many stages report it.
- Machine: 4 CPUs, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`; load at the checker's start 2.8 to 3.0, since each state's walk check ran beside it. Each state was measured once.
- `work/` beside this note holds the scripts (`apply.py`, `state.sh`, `sites.py`), each state's walk output and checker lines, and the two small programs of section 4.

## 2. The states

| state | what changed | walk, flat quick check | sites: `FlatArrays`, `FlatData`, `MicroGptFlat`, `MicroGptFlatQuick` |
|---|---|---|---|
| landed tree | nothing | 7 PASS of 7, rc=0, 54 s | 31, 3, 8, 0 |
| diff 1 | lines 21 to 24 leave the model; `^T` in `FlatArrays.fsi` and `.fss` | 7 PASS of 7, rc=0, 58 s | 31, 3, 8, 0 |
| diff 2 | line 70: `(onehot(ids, vocabSize))^T dX`, `(onehot(pos, blockSize))^T dX` | 7 PASS of 7, rc=0, 54 s | 31, 3, 8, 0 |
| diff 3 | line 43: `SUM[j <- 0#i] matCount(j)` | 7 PASS of 7, rc=0, 57 s | 31, 3, 8, 0 |
| diff 4 | lines 28, 43, 52: `∑` for `SUM` (line 43 keeps `[\ZZ32\]` in this state) | 7 PASS of 7, rc=0, 56 s | 31, 3, 8, 0 |
| all four | line 43 reads `∑[j <- 0#i] matCount(j)` | 7 PASS of 7, rc=0, 56 s | 31, 3, 8, 0 |

The seven checks print the same differences in every state: loss of step 1 `3.365966947584851`, difference 0.0; gradient `1.1102230246251565E-16`; 464 zero entries; parameters after Adam `2.7755575615628914E-16`; loss of step 2, difference `4.440892098500626E-16`.

In each state the sites are the same errors at the same places. With diff 1, the model's sites move up five lines with the text (27 to 22, and so on), and nothing else moves. So with diff 4, `∑` applied to an array (`∑ e` at line 28, `∑ vm` at line 52) runs under walk, and the checker reports nothing at those two lines.

`MicroGptFlat`'s 8 sites on the landed tree: `DOT` on unsized arrays (27:72, 31:26, 34:86); `view` (45:92); `gather` twice (57:9, 57:28); a scalar beside an unsized array, `beta1 m` and `(1 - beta1) g` (77:10, 77:21). `FlatArrays`' 31: lines 25 to 32 (23 sites, the index bound), 42:9, 131:23, 145:22, 151:22, 157:33, 163:33, 169:52, 184:20.

**As diff 1 was written.** The review gives the headers and the declarations but not their place. In `FlatArrays.fsi`, the two `opr (…)^T` headers stand under the two `transpose` headers, and the comment above loses its sentence on row 133. In `FlatArrays.fss`, the two declarations of the model's lines 23 and 24 stand under the two `transpose` definitions, unchanged, and the comment loses its sentences on rows 133, 144 and 158. `transpose` stays in the api in every state. The review says that it can leave the api once diffs 1 and 2 are in; that was not measured.

## 3. What the checker's count does and does not show

- **Line 43 has no site on the landed tree, with or without the static argument.** The review's item 5 cites rung C's report for "43 errors to 42" when the argument is removed. On `c0c35b4f9e` the count is 42 both ways. So for the checker, diff 3 changes nothing.
- **In `step`, the checker reports nothing after line 57.** Its two sites there are the `gather` calls of line 57. Lines 58 to 70 apply `^T` to unsized arrays, which the checker refuses in a small program (section 4), yet it reports none of them. So the count does not reach the lines that diffs 1 and 2 concern (`wq^T` at line 58 and on, and line 70). F-58 gives the cause as row 474, "the checker stops a block at its first failing statement"; row 474 is now FIXED with another claim, and the behaviour is still there.

## 4. The forms in a small program, under the checker against the one library

`work/Ptf-after.fss` imports the helper api with diff 1 applied. `work/Ptf-before.fss` imports the landed api and declares `^T` itself, as the model does today. Each form is the whole body of a top-level function, so each is checked. Run with `run.sh check <out> <dir> <tree>/Library/FortressLibrary.fss FlatArrays.fss Ptf.fss`.

| form | before (the program's own `^T`) | after (`^T` from the api) |
|---|---|---|
| `m^T`, `m: Matrix[\RR64,2,3\]`, result `Matrix[\RR64,3,2\]` | no error | no error |
| `transpose(onehot(ks, 5)) d` | refused at `transpose` | refused at `transpose` |
| `(onehot(ks, 5))^T d` | refused at `^T` | refused at `^T` |
| `x w^T`, both `Array[\RR64,(ZZ32,ZZ32)\]` | refused at `^T` | refused at `^T` |
| `∑ z` and `SUM z`, `z: Array[\RR64,ZZ32\]`, result `RR64` | no error | no error |
| `∑ z`, `z: Array[\ZZ32,ZZ32\]`, result `ZZ32` | no error | no error |
| `∑[j <- 0#i] (j + 1)`, result `ZZ32` | no error | no error |

Both give `@@TC COMPONENT Ptf errors=9`, three sites. The refusals have one cause, the model's unsized arrays (P-87), and one message:

    Could not check call to operator ^T
    - [\nat a, nat b, nat c\]Array3[\RR64,0,a,0,b,0,c\]->Array3[\RR64,0,a,0,c,0,b\] is not applicable to an argument of type Array[\RR64,(ZZ32, ZZ32)\].
    - [\nat r, nat c\]Matrix[\RR64,r,c\]->Matrix[\RR64,c,r\] is not applicable to an argument of type Array[\RR64,(ZZ32, ZZ32)\].

So for the checker:

- Diff 1: the api's `^T` is found and applies to a sized matrix, as the program's own does.
- Diff 2: line 70 is refused in either spelling for the same reason. The diff adds no site and removes none; the site is hidden today behind line 57.
- Diff 4: `∑` on an array of `RR64` or `ZZ32` is accepted, as `SUM` is.

These are the checker's answers only. No code was generated: the model does not compile before the switch-over (F-97).

## 5. The counts for F-58, on the landed tree `c0c35b4f9e`

By the distance stage's driver (`model-closure/run.sh check`), against the one library, measured once on 2026-11-16:

- `FortressLibrary` and its apis: `errors=0` (103 s).
- `Library/System.fss`: 0. `Library/FileSupport.fss`: 24 errors at 17 line-and-column positions (`errors=72` over three stages). `Library/File.fss`: 1.
- C4: **42 distinct sites: `FlatArrays` 31, `FlatData` 3, `MicroGptFlat` 8; `MicroGptFlatQuick` 0.**
- Against F-58's text for `832f7d0d91`: the total and each file's count are equal, and `FlatArrays`' and `FlatData`'s sites are the same. `MicroGptFlat`'s 8 are other sites than before. Gone: `matShape`'s `if` of pairs (41) and line 82's `1.0 s` (rows 474 and 989, closed). New: line 77 twice, `beta1 m` at 77:10 and `(1 - beta1) g` at 77:21, a scalar beside an unsized array, which the typed tuple names of lines 17 to 19 uncovered. The other six are as before: `DOT` at 27, 31 and 34, `view` at 45, `gather` twice at 57.
- Line 43 is no site, with or without `[\ZZ32\]`.

A sentence ready for F-58, in place of "the counts above are those before climb batch 32": "On `c0c35b4f9e`, after climb batch 32, the same command gives the same 42: `FlatArrays` 31 and `FlatData` 3 at the same sites, `MicroGptFlat` 8, of which `matShape`'s `if` of pairs and line 82 are gone and line 77's `beta1 m` and `(1 - beta1) g` are new; `MicroGptFlatQuick` has none."

F-58's words "The checker stops a block at its first failing statement (row 474)" need another source: row 474 is FIXED with another claim (section 3).

## 6. Failures and defects

None. Every state passed under walk, and no site came. No ledger row is proposed.

## 7. Not done, and left behind

- The two tables of lines 37 to 41 and the sized vector functions of lines 27 to 34: outside the brief.
- `transpose` leaving `FlatArrays.fsi`: not measured.
- The full pair of checks (40 each) was not run; the brief asks for the quick check.
- The APL program keeps its own `^T` declarations (`MicroGptApl.fss:35-36`) over `FlatArrays2`; the same two diffs would apply there and were not tried.
- `/home/user/fortress-base34` stays, built and clean, at `c0c35b4f9e`. `/home/user/fortress-mdiff` is removed. Nothing was written in `/home/user/fortress`.
