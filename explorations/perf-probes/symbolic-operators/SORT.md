<!-- Probe of 2026-10-17: the 205 errors that the compiled checker's full overloading check adds to the distance when it reads symbolic operators, sorted by family into known library fixes and design choices. The probe worker returned this text when the harness refused it a report file; the coordinating session wrote it here from that text on 2026-10-17. Its worktree /home/user/fortress-probe-opsort (branch wip/probe-symbolic-sort, at main d212b2c1f) holds the patches and site lists under gitignored tmp/. Earlier probe: ./REPORT.md in this folder. -->

# Sorting the symbolic-operator errors

The earlier probe in this folder measured 200 new errors when the compiled checker's overloading loops admit every symbolic operator. This probe re-measured them on `main` and sorted each family.

## 1. Reproduction on main

- New errors: 205. All come from the overloading check. One error is gone: the `BIG LEXICO` error that depends on identity hashes (ledger row 737).
- The distance on main is 253, which is 49 minus 1 plus 205.
- The +5 over the earlier 200 is Integral's `^` return type. Batch 16's rung K (`c23b85fdc`) made the checker read a component's bodiless functional methods, so Integral's `opr ^(self, b:AnyIntegral):RR64` now meets MultiplicativeRing's `^`, five times.
- The export check adds 2 more (List and RangeInternals), so 214 with the export check admitting symbolic names.

| Family | Earlier probe | Now |
|---|---|---|
| subscripts `_[_]` and `_[_]:=` | 107 + 18 | 107 + 18 |
| `^` | 16 | 16 + 5 |
| String's four (`\|\|`, `\|\|\|`, `//`, `///`) | 10 × 4 | 10 × 4 |
| arrays' and vectors' `+` and `-` | 6 + 3 | 6 + 3 |
| `=` | 4 | 4 |
| `\|_\|` | 2 + 1 | 2 + 1 |
| FlatString's `\|\|` pair | 2 | 2 |
| EmptyString's `\|\|` | 1 | 1 |
| total | 200 | 205 |

## 2. The families, sorted

Known library fix (54 errors):
- **String's four, 40.** Juxtaposition's device, the three top-level operators per family, with String's api stating Concatenable's and EmptyString's own `\|\|`. A patch of +46/−28 in three files. Walk keeps every value. One walk test, `XXXFunctionalMethodMeetOperator`, is refused at load differently.
- **FlatString's pair, 2.** Drop `opr \|\|(a:FlatString, self)` from `FlatString.fsi`, which the component lacks. One line.
- **EmptyString's `\|\|`, 1.** Add the meet `opr \|\|(self, _:EmptyString): String = self`. This needs one more line in String's api once String's four are fixed.
- **`=`, 4.** Integral declares the meet `opr =(self, b:I):Boolean`, and ZZ's api declares `opr =(self, b:ZZ)`. Patch +3 in two files. Walk unchanged.
- **`\|_\|`, 3.** Maybe declares the meet `opr \|self\|: ZZ32`. SubString's api states its `opr \|self\|`. Float's `\|self\|` returns `RR64`, not `Number`. Patch +4/−1 in four files. Walk unchanged.
- **Maybe's subscript, 1.** Maybe declares the meet `opr [i:ZZ32]: T throws NotFound`. Patch +2.
- **Vector and Matrix's top-level `+` and `-`, 3.** Delete the six top-level declarations in the api that the component never defines; the traits' own functional methods remain. Patch 18 lines deleted. Walk unchanged.

Design choice (151 errors):
- **Subscripts over an unbounded index type, 124.** The team's own text calls the pair "not really a valid overloading" (`Specification/appendices/future.tex:186-207`). The options:
  - S1: bound the index type, the team's own wish. Needs a new language rule for tuple indices. Clears 124.
  - S2: the checker checks a generic trait's subscripts at each type that fixes the index. Clears 124. A departure from the text.
  - S3: the checker fixes the receiver's index and uses instantiation exclusion. Clears 40 only.
  - S4: separate slicing from indexing by another bracket pair or a method. Changes every program that slices, microGPT among them.
  - S5: a `where` clause excluding `Range` from the index type. That is the team's "type variables in excludes clauses", which the `where` decision does not build.
  - Walk already runs every subscript right, choosing by the run-time type.
- **`^`, 21.** Under the integer exponent text that P1 probed, plus four lines, all 21 clear with nothing new. The 16 integer ones depend on the open question of what a negative power gives.
- **Arrays' scalar `+` and `-`, 6.** AdditiveGroup's `+` and `-` sit beside the generic scalar extension. The options:
  - A1: the checker uses self-type parameters in overload checks, which widens the rule that keeps signatures plain.
  - A2: Vector and Matrix stop extending AdditiveGroup. Costs `SUM` over vectors.
  - A3: drop or rename the scalar operators. Changes walk's answers, for example in `ArrayScalarExtension`.

Unclear (2 errors): the export check, once it reads symbolic names, lists 165 FortressLibrary entries as missing instead of 17. Its entries include word operators and declarations that the api and the component spell alike. The team's own comments at `ExportChecker.scala:289-310` call this matching a "Heisenbug". This looks like a fault of the check, not of the library. Not traced.

## 3. Totals

- Known fix: 54 errors, +57/−48 in six files. Together they clear exactly the sum of their singles (212 to 158, measured on the calibrated instrument). Walk moves one test, `XXXFunctionalMethodMeetOperator`, from pass to refused at load.
- Design choice: 151 errors.
- With the four `^` lines as well, 137.

## 4. Points

- The known-fix patches are latent: they are errors only when the checker reads symbolic operators. Until that is decided (the curator's open item on when the check reads them), they change nothing on the path.
- The three String sites that are among today's 49 (the conversion `("" || a)`, FlatString's api, from the earlier probe) are a different question and do not depend on this.
- Measurement: the sort used a body-skipping instrument calibrated to the distance run (212 on main, against 253 minus the 39 and 2 body errors). Body errors were not re-measured under any patch.

## 5. Open for the curator

1. Subscripts: S1 to S5 above. The team's own wish is S1.
2. `^`: which exponent text. Under the integer text the 21 clear with four lines.
3. Scalar `+` and `-`: A1, A2 or A3.
4. When the checker reads symbolic operators at all, which decides whether the 54 known fixes are needed on the path.
