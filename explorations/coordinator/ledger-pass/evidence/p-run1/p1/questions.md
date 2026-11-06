# Questions for the prober, chunk p1

No row of this chunk is given to measure.

## XXX tests believed to pass now

None. The compiled `XXX` tests the chunk's rows name (`XXXZZNarrowRungP`, `XXXShiftDeclRungI`, `XXXIntegerPowerContractCompiled`, `XXXPowZZ32CompiledRungE`, `XXXPowNN32CompiledRungE`, `XXXPowNN64CompiledRungE`) assert behaviour that the code at de6d905f5 still lacks: the prelude text they exercise (`CompilerBuiltin.fsi:103-208`, `CompilerBuiltin.fss:744`, `:809`, `:878`) and the helpers it binds (`simpleIntArith.java:415-421`, `simpleUnsignedIntArith.java:229-235`, `simpleUnsignedLongArith.java:240-243`) are unchanged in the parts that matter.

## A note for the prober (not a measure)

Row 581 rests on a run of rung Q's checker (`SKEPTIC.md:100`) whose probe was never committed. The tree at the base still has no `minimum` or `maximum` on either `IntLiteral` (`FortressBuiltin.fsi:179`, `CompilerBuiltin.fsi:390-431`), so the claim was kept; a committed reproducer would need a compiled program checked over the one library, which only the switch-over gives.
