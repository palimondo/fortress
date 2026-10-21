<!-- How climb batch 16's Q1 (an object that inherits an abstract functional method from one trait and its body from another) reached the curator, why it went toward Scala's way and back, what the probe found, what the detour cost, and what changes; written 2026-10-15 by the coordinating session at the curator's word ("Let's make sure we have a proper report recorded from this exercise."). -->

# Q1 of climb batch 16: the detour toward Scala's way

## In short

- **The question.** May the compiled checker refuse `object O extends { A, B }`, where `A` declares `pick(self)` abstract and `B` gives it a body, and `O` declares none of its own (rows 572 and 727)?
- **The answer.** Refuse it (P-149), the curator's word of 06:23 UTC: the specification's text and the type group's later calculus refuse it, and the revival does not bend Fortress toward another language for a convenience.
- **The detour.** The ask put to the curator led him toward Scala's way, which accepts `O`. He pre-recorded it, then learnt that the specification refuses `O`, and took the refusal.
- **Its cost.** About 1.7M tokens written: the probe 0.56M, and this session 1.17M, nearly all of it two rewrites of its 550K context into the cache after the VM restart and after a gap of nearly two hours.
- **The causes.** The ask did not say first what the designers' text says and which way it points. It named a peer language's behaviour as if it were an option of equal standing. It used the record's shorthand. And the fact that would decide the question, whether the library uses the shape, was not measured before the ask.

## The question

A functional method has `self` among its parameters and is called like a function, `pick(x)`. A trait may leave one abstract, with no body:

```
trait A  pick(self): String  end           (* abstract *)
trait B  pick(self): String = "b"  end     (* a body *)
object O extends { A, B } end              (* no pick of its own *)
```

Today the compiled path accepts `O` and runs `B`'s body, because its overloading check skips a component's own abstract functional methods (`OverloadingChecker.scala:139-141`). Walk refuses `O` at load (F-142). Separately, an abstract and a concrete declaration of one method in one trait pass the checker and crash the code generator (row 727).

## How it went, in UTC

- **01:08 to 01:37.** Batch 16's planner drafted Q1 with the default "refuse" (rung K builds it), and listed the sources: the specification, the type group's rules, the team's dotted-method check and Java refuse; the team's abstract-method check and Scala accept. Its brief told it to run no new probe, so the record left the library's use of the shape to rung K's own run.
- **01:38 to 02:11.** The Fable review agreed that Q1 is the curator's.
- **02:13.** The coordinator put Q1 to the curator. The ask used the record's words ("batch 8's judge", "item 62", "read them", "leave them unread"), gave the sources as a split without saying that the specification's text refuses `O`, and gave as the refusal's cost that it "gives up Scala's way of letting a sibling trait supply the body".
- **04:18.** The curator found the ask unreadable past its primer, leaned to Scala's way if it had a clean resolution, and asked why the library's use of the shape had not been measured, "the most important factor for the decision".
- **04:19.** The coordinator launched the probe (`perf-probes/abstract-sibling-body/`).
- **06:10 to 06:13.** While it ran, the curator pre-recorded Scala's way, unless hard evidence against it surfaced (P-149, first form).
- **06:14.** The curator, who had listened to the ask in a car, asked whether the specification declared this way. The coordinator told him that it refuses `O`, and held P-149.
- **06:17.** The probe reported. The curator asked why the work had gone toward Scala's way at all, if the specification and the implementations agreed. They did not agree: the compiled path accepts `O`, walk refuses it, and one of the team's own checks (`AbstractMethodChecker.scala:94-107`) counts an inherited body as the implementation. Scala had entered only as the coordinator's comparison.
- **06:23.** The curator took the refusal.

## What the probe found

From `explorations/perf-probes/abstract-sibling-body/REPORT.md`:

- **Neither library uses the shape.** No type in the one library or the compiler's library inherits an abstract functional method and a sibling's body without providing their meet. With the checker's filter lifted, the count and distance stages are unchanged.
- **Scala's way is buildable for equal types.** It takes one exemption in the checker and two edits in walk, and nothing in the code generator. It needs two passages of the specification rewritten. A narrower return type or an api boundary reaches code-generator defects (rows 732 to 735).
- **The designers' word refuses `O`.** The specification's text refuses it. The type group's Welterweight calculus (2012) refuses it too, the work behind P-147. POPL 2019 has no abstract methods. Java refuses `O`; Scala accepts it.
- **The record had stale claims.** Walk refuses `O` at load and no longer stops at a call. The compiler's library declares abstract functional methods in its api (`CompilerBuiltin.fsi:37-40`). Welterweight admits an abstract and a concrete declaration at one domain, so "every source refuses row 727" is overstated.

## What changes

- **P-149** records the refusal and the curator's rule behind it: other languages are consulted only to reconcile a conflict between the designers' earlier and later choices.
- **Climb batch 16's rung K** stays as drafted. Before the splice, its record takes the probe's corrections: walk's refusal at load, the compiler's library's abstract api declarations, and the wording on row 727.
- **The ledger** has the probe's four rows, 732 to 735.
- **For the `coordinator` skill** (held for the skill writer):
  - An ask states first what the designers' text and their later word say, and which way they point. A peer language's behaviour enters only where the designers' earlier and later choices conflict.
  - The coordinator runs the probe that a planner names for a question before putting the question to the curator.
  - The ask's plain words are already a rule. Here it was not followed.
- **This session's cost of a cold turn.** With its context near 580K, a turn after an hour's gap or a restart rewrites about 0.55M into the cache. A compaction before a long gap cuts that.
