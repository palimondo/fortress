# c38 questions

No row of this chunk is given to measure.

XXX tests believed to pass now: none. The rows' expected failures (`XXXTaskArmLocalSlot`, `XXXTryOperandRungE`, `XXXTryInArmRungG`) stand by reading: `CodeGen.generateTaskCompute` (`CodeGen.java:5014-5038`) still neither reserves slot 0 nor drops `this` from the stack before the body, and `forTry` (`:2022`) still emits its handler inline.
