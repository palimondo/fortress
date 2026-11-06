# Questions, chunk c36

No row of this chunk needs a measurement.

XXX tests believed to pass now: none. `XXXTraitBoundGenericMethod` (row 762) and `XXXGenericMethodTraitWhereWalk` (row 870) are gated walk tests and the newest gate, a12ab5c60, holds for the base, so they still fail as they assert. `compiler_tests/XXX3q` and `XXX10p` (row 354) assert the refusal's message, which the code at `TypeHierarchyChecker.scala:338-341` still emits.
