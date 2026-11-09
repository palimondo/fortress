<!-- The planner's probes for climb batch 29b, the repair batch that builds the static numerals: what the batch record (`coordinator/CLIMB-BATCH-29b.md`) needed that the static numerals probe's report (`compile-ladder/plan-30/probes/draft-numerals.md`) does not give. Taken on 2026-11-09 between 20:0x and 20:2x UTC by the Opus planning worker, in a worktree of its own, `/home/user/fortress-p29b`, seeded from the base build `/home/user/fortress-base30` at `dd00743d9e` and removed after. No build, suite or stage was run: those of the patch's code are the probe's (its section 8). -->

# Climb batch 29b: the planner's probes

The base: `main` at `bbebc267e1`, whose code is `dd00743d9e`: `git diff --stat dd00743d9e main -- . ':!explorations'` printed nothing. The base build `/home/user/fortress-base30` is at `dd00743d9e`, and `git -C /home/user/fortress-base30 status --porcelain` printed nothing.

## Probe 1. The probe's patch applies to the base

    explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base30 /home/user/fortress-p29b - dd00743d9e
    seeded from /home/user/fortress-base30 (dd00743d9e) in 4 s
    git apply --check explorations/compile-ladder/plan-30/probes/draft-numerals.patch
    .../draft-numerals.patch:432: trailing whitespace.
    trait ZZ extends { Number, Equality[\ZZ\] } excludes { RR64, ZZ64, ZZ32, NN32, NN64 }
    warning: 1 line adds whitespace errors.
    git apply .../draft-numerals.patch ; git status --short | wc -l
    90

The one warning is a line of `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi` whose trailing space the base already has (the patch's line 430). `git apply --numstat` lists the 90 paths: 6 library and prelude files, 52 compiled and library test files, 18 Java and Scala files, 14 walk test files.

## Probe 2. What still names the prelude's two types after the patch

In the patched worktree, `grep -rln 'IntLiteral\b\|FloatLiteral\b'` over `ProjectFortress/src`, leaving out `IntLiteralExpr` and `FloatLiteralExpr`, and `grep -rn` for the classes' names:

- the compiled path: `compiler/runtimeValues/FIntLiteral.java` and `FFloatLiteral.java`; `nativeHelpers/simpleIntLiteralArith.java`; `compiler/asmbytecodeoptimizer/RemoveLiteralCoercions.java`, whose rules match the descriptors `(Lfortress/CompilerBuiltin$IntLiteral;)` and `(Lfortress/CompilerBuiltin$FloatLiteral;)` (`:46`, `:67`, `:93`); `compiler/NamingCzar.java:190-191`, `:212`, `:345-346`; `runtimeSystem/Naming.java:156`, `INT_LITERAL_CLASS`; a comment at `compiler/codegen/CodeGen.java:6466` in the patch;
- walk: `interpreter/evaluator/values/FIntLiteral.java` and `FFloatLiteral.java`, `interpreter/glue/prim/IntLiteral.java` and `FloatLiteral.java`, `glue/prim/BigNum.java`, `evaluator/types/TypeRange.java`, and `evaluator/BaseEnv.java:630`, where `putNat` binds a size's value as an `FIntLiteral` (live code);
- the parsers' generated sources and `nodes_util/NodeUtil.java`, which name the node classes.

## Probe 3. The ladder's programs and the numeral types

The gate's ladder regression compiles and runs the 85 files of the baseline's pass list (`compile-ladder/climb-batch-29/gate/ladder/ladder.tsv`, phase `pass`). All 85 exist in the patched tree; `grep -ln 'IntLiteral\|FloatLiteral\|coerce'` and `grep -ln 'asZZ32\|asFloat\|digitValue'` over them printed nothing. So no ladder file writes a numeral type, a coercion or a getter that the change removes.

## Probe 4. An empty `comprises` clause

`ProjectFortress/src/com/sun/fortress/parser/NoNewlineHeader.rats:104-108`: a `comprises` clause with no type logs "Comprises clauses should not be empty." So a `comprises` clause can close `Numeral` and the two traits `AnyNaturalNumeral` and `AnyRadixPointNumeral` of the patch, but not the generic leaves `NaturalNumeral[\n, r, v\]` and `RadixPointNumeral[\n, m, r, v\]`, which a program's type could still extend.

## Probe 5. The gate and the library track's count

`gate_compare` (`explorations/coordinator/tools/gate-functions.sh:46-58`) prints `COUNT DOWN` for any suite whose count fell against the last landed summary, and exits 1; no declaration answers it. Climb batch 29's landed summary has `fast-library/LibraryJUTest 86`; the probe's library track ran "Tests run: 82" (its section 8), since the patch deletes `library_tests/IntLiteralRung6` and `IntLiteralArithRung7`. The compiled track goes from the landed 1506 to the probe's 1515, and walk's suite from the landed 813 (203, 203, 201, 206) to the probe's 819: no fall there.

## Probe 6. The rows that the batch rewrites, against `ledger.py`'s limits

`ledger.py show N`, the row's length and its notes' (limits 1,200 and 700): 957, 994 and 510; 960, 803 and 350; 962, 1105 and 666; 963, 886 and 417; 966, 1026 and 563; 513, 1172 and 689. Rows 962 and 513 take no note: each is rewritten as a whole new line.

## Probe 7. The disk

`df -P /home/user` at 20:2x UTC, the probe's worktree removed: 20,138,508 KB available, about 19.2 G. The script's floor for two rungs is 1.5 G a rung plus 4 G, 7 G.
