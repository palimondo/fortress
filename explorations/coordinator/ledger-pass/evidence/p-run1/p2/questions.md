# Questions for the prober, chunk p2

No row of this chunk is given the disposition measure.

## XXX tests believed to pass now

None. The gate `a12ab5c60` holds for the base, and it ran `XXXDivRemDivModWalk` (row 881) and `XXXChooseZZOutOfRangeWalk` (row 887) as expected failures; no commit since touches the files they depend on (`git grep 'opr DIVREM'` finds only `Library/incomplete/`; `simpleArbitraryPrecisionArith.java:164-177` unchanged since d85bac271). `XXXBoxDotSpellingsRungW` (row 348): `CompilerBuiltin.fss:587-599` and the matching runs still bind the inverted spellings at de6d905f5, so it still fails as it asserts.

## Not a question, for a later probe if wanted

- Row 327: what the compiled path now gives `verifyChoose(3037000500+j, 2)` at `ZZ32` (a wrap to `-1257966796`, or a range failure since the literal handling of F-118). The row's claim does not depend on it; the line states the wrapped value as the one measured.
- Row 700: a walk run of `LinearCongruential[\ZZ64\]` with a modulus that is not a power of two and a multiplier large enough to wrap, against the exact state, would turn "by reading" into a run.
