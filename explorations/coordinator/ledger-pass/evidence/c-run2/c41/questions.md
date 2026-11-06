# Questions for the prober, chunk c41

## Row 852 (CONTESTED): are duplicate parameter names, or duplicate static parameter names, refused?

Question: does a declaration with two parameters of one name, or two static parameters of one name, load, on walk and on the compiled path? The row's reading (`ExprDisambiguator.scala:837-841` collects names into a span-distinguished `Set[Id]`; `checkForShadowingVars`, `:766-783`, loops `i` below `size - 2`, so two names are never compared) says neither the set nor the loop refuses them; another phase may.

Programs (two files, each whole):

`DupParam.fss`
```
component DupParam
export Executable
f(x: ZZ32, x: ZZ32): ZZ32 = x
run(): () = println(f(1, 2))
end
```

`DupStaticParam.fss`
```
component DupStaticParam
export Executable
g[\T, T\](x: T): T = x
run(): () = println(g[\ZZ32, ZZ32\](3))
end
```

Commands, from the main tree, each in a scratch folder with a private caches folder as fortress-repo's build-and-caches part says:
- walk: `bin/fortress DupParam.fss`; `bin/fortress DupStaticParam.fss`
- compiled: `bin/fortress compile DupParam.fss && bin/fortress run DupParam`; the same for `DupStaticParam`

Record each command's rc and its first error line.

Outcomes:
- Every run refused with a static error naming the duplicate: the row's defect does not exist on either path. Close cannot name a fixing commit (the check is elsewhere); the row becomes `RETIRED` (a reading falsified), its notes naming the phase and message that refuse it. CONTESTED needs the curator's word or a POSITIONS entry to close; route it to the curator with the run.
- Any run loads (prints `1`, `2` or `3`, or runs to rc 0): the defect reproduces on that path. Rewrite as `NEGATIVE-VERIFIED` (the spec's "Reach and Scope of Declarations" makes it a static error), claim "a declaration with two parameters (or two static parameters) of one name loads on PATH(S): ...", reproducer: an `XXX` test of the program that loads; notes keep the mechanism lines above and the paper's `distinct` premises.
- Mixed (refused on one path, loaded on the other): as above, for the loading path only, naming which phase refuses on the other.

## XXX tests believed to pass now

None in this chunk.
