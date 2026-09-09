# Explorations

Revival-era experiments and learning material — **not** part of the original
Fortress project. Everything under this directory was written in 2026 by Pavol
(@palimondo) and Claude while studying the 2012 reference implementation;
nothing here is Sun/Oracle code. Original Fortress sources live everywhere
else in the tree and stay untouched.

All programs run on the reference **interpreter** (the bytecode compiler path
also works, with caveats — see the root CLAUDE.md and
`test-baseline-jdk8.md`). From this directory:

    ../bin/fortress <file>.fss

The interpreter requires the filename (sans `.fss`) to equal the component
name, so run files in place or preserve their names when copying.

| file | what it demonstrates |
|---|---|
| `claude_demo.fss` | recursion, `REM`, juxtaposition, `SUM` comprehension, parametric object |
| `mandelbrot_swifty.fss` | port of [palimondo/MandelbrotSwifty](https://github.com/palimondo/MandelbrotSwifty): imperative + tail-recursive variants (outputs verified identical), julia closures, Douady's rabbit; "executable but Swift-accented" register |
| `mandelbrot_canonical.fss` | the same art in canonical Fortress: `BIG //` / `BIG \|\|` implicitly-parallel comprehensions, juxtaposed complex multiplication, mixed `k dx` arithmetic; output diffed identical vs the port |
| `complex_ring.fss` | `object C extends MultiplicativeRing[\C\]` — F-bounded trait extension works on the 2012 interpreter; inherited juxtaposition, inherited binary minus, three-default `zero` chain; `(1+i)^4 = -4` |
| `swift-vs-fortress-explainer.md` | pedagogical comparison of Swift and Fortress written alongside the ports |

Interpreter gotchas learned the hard way:

- `label` is a reserved word.
- An argument list may not tightly abut `^`: `C(1,1)^4` is rejected — write
  `(C(1,1))^4`.
- UTF-8 source with Unicode identifiers (`ℂ`) works; `seq()` exists but
  canonical style avoids it.
- Component/API names must match their enclosing file names.
