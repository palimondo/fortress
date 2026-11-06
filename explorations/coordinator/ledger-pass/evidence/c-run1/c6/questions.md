# Questions, chunk c6

No row of this chunk is given to the prober. No `XXX` test of this chunk is believed to pass now: `XXXTupleSeparatorRungS.fss` and `XXXFnRenderRungS.fss` ran under the holding gate a12ab5c60 as expected failures; the library lines they rest on (`Library/FortressLibrary.fss:4425-4433`, `:4488`, `:4549`) still write `","` and cast to `Object`. The compiled `XXXFortToStringRungS.test` and `XXXJuxtConcatRungS.test` rest on `stringOps.java:108-118` and `CompilerBuiltin.fss:406`, unchanged in substance.

Lower-priority runs a later probe may take (not dispositions): row 313's order difference under `bin/fortress compile ProjectFortress/tests/immutableTopLevel.fss` then `run`, last observed before the codegen work of October; row 338's `d: ZZ32 = -2147483648` under walk; row 140's `strToFloat "-1.5"` under walk. The code each depends on is unchanged, so their lines stand.
