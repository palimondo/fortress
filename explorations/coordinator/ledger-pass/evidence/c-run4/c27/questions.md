# c27 questions for the prober

## Row 432: does a bare big operator over a list display of numerals still fail under walk?

Why: row 432 was written 2026-10-08. Since then 20474c144 (F-228) instantiates an unwritten reduction by the join of its elements' run-time types, and leaves an F-bounded parameter open where that join does not fit, "with each `+` at its operands' types". `SUM`'s `T` is F-bounded, so `SUM <|1, 2, 3|>` may now run. FACTS F-131 (FACTS.md:187) still says it fails. No gated test runs the bare form: the walk tests all write `[\ZZ32\]`.

Path: walk. Five programs, one expression each, so that one refusal does not hide the next. From the main tree:

    mkdir -p tmp/probe432 && cd tmp/probe432
    i=0; for e in 'SUM <|1, 2, 3|>' 'PROD <|1, 2, 3|>' 'SUM <|1.5, 2.5|>' 'SUM <| n^2 | n <- 1#3 |>' 'BIG MAX <|1, 2, 3|>'; do
      i=$((i+1)); printf 'component B%s\nexport Executable\nrun(): () = println(%s)\nend\n' $i "$e" > B$i.fss; done
    cd ../.. ; for i in 1 2 3 4 5; do echo "== B$i"; bin/fortress walk tmp/probe432/B$i.fss 2>&1 | tail -3; done

Outcomes:
- each prints its value (6, 6, 4.0, 14, 3): row 432 is fixed in the tree by 20474c144, but no test asserts it; close it only once a test lands (e.g. a walk test asserting the five values), or close with test `none` and the probe as the note; FACTS F-131's sentence on row 432 is then wrong.
- each still reads "Failed to find any matching overload, args = (ArrayList[\Int\])" (or `FloatLiteral`): the row keeps its claim; rewrite its notes to drop "Rung K's rule ..." and pin the refusal to F-228's fallback, with the probe's output as the `none` reproducer's evidence.
- a mix: rewrite the claim to the forms that still fail.

## Row 817: what does the compiled checker's driver report on `trips.fss` at the base?

Why: the 18 errors were measured at 3cd33d0b0, a commit not in the base's history (its landed form is 5e60e356a), and checker commits have landed since (1bc0a9083 bounds an unbounded parameter by `Any`; 64fa505c4; 396e4ed8d). The row's list of errors is a count that only a run can refresh.

Path: compiled checker, through the distance stage's driver. Command: `explorations/compile-ladder/rung-team-demos/REPORT.md`, "The checker's driver over one demo" (lines 284-293), steps 1 to 3, with `S` a fresh folder under `tmp/probe817/`; target `ProjectFortress/demos/trips.fss`.

Outcomes:
- acyclic 0, typecheck 0 and no exception: row 817 is fixed; close with test `none` (no gated test runs the demos on the compiled path) and the driver's output as the note, naming the commit range.
- the same 18 errors: rewrite the line without "past row 710" and with the base hash as the pin; drop siblings 710 and 621 (both FIXED), keep 731.
- another set: rewrite the claim and the notes to the errors as they are at the base.

## XXX tests believed to pass now

None.
