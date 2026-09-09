# Swift versus Fortress: One Mandelbrot, Two Philosophies

*An explainer built from a real port: [palimondo/MandelbrotSwifty](https://github.com/palimondo/MandelbrotSwifty) translated to canonical Fortress and executed on the revived 2012 reference interpreter.*

## The program

Both versions render an ASCII Mandelbrot: a 16-character gradient `" .,:;|!([$O0*%#@"` doubles as the iteration cap, each pixel escapes or survives `z ← z² + c`, and the count indexes the gradient. Identical algorithm, identical output. Everything interesting is in what each language made easy, hard, or free.

## Defining a complex number

Swift (2016-era, from the original repo):

```swift
struct ComplexNumber { let Re: Double; let Im: Double }
typealias ℂ = ComplexNumber

func + (x: ℂ, y: ℂ) -> ℂ { return ℂ(Re: x.Re + y.Re, Im: x.Im + y.Im) }
func * (x: ℂ, y: ℂ) -> ℂ { ... }
extension ℂ { func isPotentiallyInSet() -> Bool { ... } }
```

Fortress:

```fortress
object C(re: RR64, im: RR64) extends MultiplicativeRing[\C\]
  getter one(): C = C(1.0, 0.0)
  opr +(self, other: C): C = C(re + other.re, im + other.im)
  opr -(self): C = C(-re, -im)
  opr TIMES(self, other: C): C =
    C((re other.re) - (im other.im), (im other.re) + (re other.im))
  opr ^(self, other: AnyIntegral): C =
    if other <= 0 then self.one else self (self^(other - 1)) end
end
```

Surface similarities are real: both allow Unicode identifiers (Swift's `typealias ℂ` vs Fortress naming the type `ℂ` directly), both are value-oriented (Swift `struct` with `let`; Fortress constructor parameters are immutable fields), and both let you define operators. The philosophical split is in the one clause the Swift version has no counterpart for: `extends MultiplicativeRing[\C\]`.

## The mathematical machinery: what the ring buys you

`MultiplicativeRing` is a library trait, not compiler magic. Its full text:

```fortress
trait AdditiveGroup[\T extends AdditiveGroup[\T\]\]
    getter zero(): T = self - self
    opr +(self, other: T): T
    opr -(self, other: T): T = self + (-other)
    opr -(self) : T = self.zero - self
end

trait MultiplicativeRing[\T extends MultiplicativeRing[\T\]\]
        extends { AdditiveGroup[\T\], AnyMultiplicativeRing }
    getter one(): T
    opr TIMES(self, other:T): T
    opr juxtaposition(self, other:T): T = self TIMES other
    opr ^(self, other:AnyIntegral): T
end
```

The generic bound `T extends MultiplicativeRing[\T\]` is F-bounded polymorphism — the same idea as Swift protocols' `Self` requirements, written out longhand. The payoff is the defaults. `C` above defines only what the mathematics requires — identity, addition, negation, multiplication, exponentiation — and inherits the rest:

- **Juxtaposition** (`z z` means z·z) comes from the trait default `juxtaposition = self TIMES other`.
- **Binary minus** is never written; `w - w` runs the default `self + (-other)` through the hand-written unary minus.
- **`zero`** is a three-default chain: the trait computes it as `self - self`, which calls the default binary minus, which calls the user's unary minus. Verified on the 2012 interpreter: `w.zero` prints `0.0 + 0.0i`.

Swift can do default implementations too — protocol extensions derive `!=` from `==`, `AdditiveArithmetic` exists since Swift 5 — so the difference is not capability but *organizing principle*. Swift's numeric protocols are pragmatic API bundles designed around what the standard library needs. Fortress's are abstract algebra transcribed: the spec-era slide decks show `Associative⟦T,⊙⟧` and `Commutative⟦T,⊙⟧` carrying `property ∀(a,b,c) ...` law declarations intended for automated checking. (Honest footnote: the `property` machinery never shipped in the implementation — the vision outran the toolchain, a recurring Fortress theme.)

## Multiplication without an asterisk

Fortress has no `*` operator. Zero definitions in the entire library — the 2005 design deck says why: "Asterisks are for accountants." Mathematics writes multiplication three ways, so Fortress supports three independent, separately overloadable operators: juxtaposition (`a b`), `·` (DOT), and `×` (TIMES). Juxtaposition is a genuine named operator, `opr juxtaposition`, participating in overload dispatch like anything else — the library overloads it for scalar×vector and matrix×matrix at top level. That is how `3 sin pi x - log x + 5 z^2` parses as mathematics: someone overloaded whitespace.

Two guardrails make this survivable where FORTRAN's whitespace-blindness (`DO20I=1.125`) was a famous trap:

1. **Whitespace expresses intent.** `a+b·c+d` and `a + b·c + d` are fine; `a+b · c+d` is rejected — spacing that contradicts precedence is a compile error. (This bit us live: `C(1.0,1.0)^4` is rejected because an argument list may not tightly abut `^`; parenthesizing the base fixes it.)
2. **Nontransitive precedence.** `+` binds tighter than `>`, and `>` tighter than `∨`, but `a + b ∨ c + d` is an error — no precedence is defined between `+` and `∨` at all. With hundreds of operator symbols, only the universally memorized precedences exist; everything else takes parentheses.

Swift sits at the opposite pole: operators are token sequences with declared global precedence groups, whitespace is (mostly) insignificant, and juxtaposition means nothing. Both are defensible; only one lets you type a polynomial the way you'd write it on a whiteboard.

## Parallelism for free: monoids and BIG operators

The deepest difference. The complete Fortress renderer:

```fortress
art(): String =
  BIG //[r <- 0#32]
    (BIG ||[k <- 0#64] toAscii(mandelbrot(C(-2.0 + k dx, -2.0 + r dy))))
```

Two nested comprehensions: `BIG ||` concatenates a row of characters, `BIG //` joins rows with newlines. No loop, no mutation, no index arithmetic beyond the coordinate formula — and no requested parallelism, because none needs requesting. Fortress evaluates comprehensions as *reductions over a monoid*: string concatenation is associative, so the runtime is free to split the range, render chunks on different threads via work-stealing, and combine. The slide-deck slogan: reduction operators and comprehensions "are exactly like" each other — `∑` desugars to a generator call with a `SumReduction` object whose entire definition is `empty()` and `join(a,b) = a + b`. Declare the algebraic structure; the evaluation strategy follows.

The typing that makes this safe is the same trait machinery as above: `∑` is defined (in the library, not the compiler) roughly as

```fortress
opr SUM[\E, T extends Monoid[\T,+\]\](g: Generator[\E\], body: E -> T): T
```

so a type earns the right to be summed in parallel by extending `Monoid` — algebra as an API contract.

The Swift equivalent of the sequential version is easy (`map`/`joined`). The *parallel* version is not: you reach for `DispatchQueue.concurrentPerform` or a `TaskGroup`, manage chunking, and prove to yourself the merge is associative — the language neither knows nor checks. Steele's own comparison slide makes the point against Scala with a comment: the recursive tree walk is marked `⊛ Potentially parallel recursion` in Fortress and `// Sequential` in Scala. Swift stands with Scala here.

One more free lunch in that snippet: `k dx` multiplies an integer by a float with no cast, because the Fortress numeric tower makes subtyping follow set inclusion — ℤ32 <: ℤ64 <: ℤ <: ℚ <: ℝ64. A 32-bit integer *is* a real number, so mixed arithmetic is ordinary dispatch, not coercion.

## What Swift took from Fortress

The influence ran the other way too, and Steele said so. The JuliaCon 2016 deck's closing example of Fortress ideas surviving "by hopping from one language to another" is Swift's optional binding — `if x ← z then f(x) else y end` with `z: Maybe⟦T⟧` — cited by Steele as Fortress syntax living on in `if let`. Good ideas outlive their languages; the language that develops an idea may not be the one that ships it to millions.
