# c13 questions for the prober

## Row 850 (CONTESTED): does the compiled checker refuse an extends clause of two covariant instantiations that the POPL 2019 rules admit?

Narrow question: under `trait C[\covariant S\]`, does `fortress compile` refuse `object D extends { C[\Dog\], C[\Animal\] }` with an exclusion error, and does it accept `f(x: C[\Dog\])` beside `f(x: C[\Cat\])` as excluding although `object DC extends C[\DogCat\]` is below both? The row is a reading of `TypeAnalyzer.scala:541-555` with no run.

Program, whole, compiled path (save as `tmp/probe850/P850.fss`):

```
component P850
  export Executable

  trait Animal end
  trait Dog extends Animal end
  trait Cat extends Animal end
  trait DogCat extends { Dog, Cat } end

  trait C[\covariant S\] end
  object D extends { C[\Dog\], C[\Animal\] } end

  run() = println("REACHED")
end
```

Second program (save as `tmp/probe850/P850f.fss`):

```
component P850f
  export Executable

  trait Animal end
  trait Dog extends Animal end
  trait Cat extends Animal end
  trait DogCat extends { Dog, Cat } end

  trait C[\covariant S\] end
  object DC extends C[\DogCat\] end

  f(x: C[\Dog\]): ZZ32 = 1
  f(x: C[\Cat\]): ZZ32 = 2

  run() = println(f(DC))
end
```

Commands, from the main tree: `cd tmp/probe850 && ../../bin/fortress compile P850.fss; ../../bin/fortress run P850` and the same for `P850f`.

Outcomes:
- `P850` refused with "exclude each other" and `P850f` compiles (no ambiguity error): the row's claim holds on both halves; status stays `CONTESTED` until the curator decides whether the checker follows the paper (P-62 makes variance future work); the line gains `reproducer` = a new `XXX` test and the notes the two outputs.
- `P850` refused and `P850f` refused as ambiguous: the first half holds; the overloading half is false: rewrite the claim to the extends half only.
- `P850` compiles and prints REACHED: the claim is false; the row becomes `RETIRED` (a reading falsified), with the output in its notes.
- Any other failure (parse refusal of `covariant`, crash): rewrite the claim to state that failure.

## XXX tests believed to pass now

None. No evidence in this chunk shows an `XXX` test of these rows passing; row 366's fix (F-39) is measured but not landed.
