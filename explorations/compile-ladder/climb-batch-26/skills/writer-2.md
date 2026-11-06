I acted on all 11 of the cold read's flags in one commit, `c242e4915`. I fixed nine in full and two in part. The lint found nothing on the four changed files, and nothing was pushed.

## What a worker would have done wrong, and what the text says now

**`compiler.md`, local functions.** A worker could not tell the code generator's refusals of local functions from other failures, so it could not name them in an `XXX` test. It also could not tell whether two local functions that call each other compile. The text now gives the code generator's message for each of the three refused forms. It also says that a local function compiles when it calls itself or another local function of its block.

**`compiler.md`, the `systemOps` helpers.** The text named one class without the reason, so a worker would bind a helper of another class with the same problem. It now says that a binding stops its component when any method of the helper's class has a type that only the compiler's prelude declares. It explains why `systemOps` is such a class, and that the distance stage then counts the component as a stopped target. It ends with what to do: "Bind a helper of another class."

**`interpreter.md`, the pairs that keep the team's check.** "That has no static parameters of its own" could attach to the trait instead of the method. Read that way, it contradicts "generic". The item now reads "a generic trait's or object's functional method that has no static parameters of its own".

**`interpreter.md`, a type that is not an `A` (row 893).** A worker would learn that walk runs one of two declarations but not what to do, and might assert walk's choice in a test. The text now says walk gives no ambiguity error, and adds: "Make each type that extends `T[\A\]` an `A`."

**`interpreter.md`, the checker's extra rule (row 894).**
- The bullet said "no decision says which path is right". That is a decision's status, and it goes stale, so I cut it.
- "A generic function inside the declared domain" could mean a function declared inside the method. It now reads "a generic top-level function whose declared domain lies inside that of" the method of the same name.
- A worker could not recognise the checker's refusal. The text now names the checker's check and quotes its message.

**`interpreter.md`, a program's own type named `FlatString` (row 877).** "Carried by its name" read two ways, and the text did not say that the result is wrong text with no refusal at load. It now says so, and adds: "Give a program's own type another name."

**`interpreter.md`, `CatString` in a method of `String`.** My first task removed the advice for this case. The text now adds: "In a method of `String`, call that overload with `self`."

**`revival-changes.md`, three wordings.**
- The row 416 example now names two overloads and says why walk refuses them.
- "The method" in walk's second refusal now reads "`T`'s method".
- "It is to run the checker" could be read as an order to the worker. It now reads "Walk will run the checker only after the switch-over".

## Each flag

| Part and passage | Confidence | What I did | Ground |
|---|---|---|---|
| `compiler.md`, local functions | low | Fixed | row 304, `CodeGen.java:3588-3592`, F-320 |
| `compiler.md`, `systemOps` | medium | Fixed. I wrote the workaround as a positive instruction, not the flag's "Do not bind". | F-321, row 895 |
| `interpreter.md`, the pairs item | medium | Fixed by fewer words than the flag's list | `OverloadedFunction.traitMethod` |
| `interpreter.md`, row 893 | medium | Fixed | row 893 |
| `interpreter.md`, row 894, the decision's status | high | Cut the clause, but did not add the proposed action "Assert neither path's answer" | see the decisions below |
| `interpreter.md`, row 894, the wording | medium | Fixed | row 894, `OverloadingChecker.scala:413-424` |
| `interpreter.md`, row 877 | medium | Fixed | row 877, `StaticNativeApp.java` |
| `interpreter.md`, `CatString` and `self` | medium | Fixed | `Library/FortressLibrary.fss:4641-4644` |
| `revival-changes.md:28`, row 416 | low | Fixed | the same example as in `interpreter.md` |
| `revival-changes.md:43-46`, walk's two refusals | medium | Fixed "the method". Left the missing ledger row and the copy in `interpreter.md`. | no row exists for these two refusals |
| `revival-changes.md:102`, the plan | low | Fixed | P-12 |

## Decisions not taken

- **Row 894: "Assert neither path's answer in a test".** The gated walk test `tests/GenericInsideTraitMethodWalk.fss` already asserts walk's load. The rule would contradict the tree, so I did not add it. The alternatives:
  - add the rule and change or remove that test;
  - add the rule for the checker's answer only.
- **A row for walk's two remaining refusals of the self-typed pair.** The ledger has no row for them. The record does not settle whether the checker accepts what walk refuses here. The alternatives:
  - file a row, then cite it in `revival-changes.md` and list both refusals among the departures in `interpreter.md`;
  - leave them as walk's load check only, as now.

## For the coordinator

- The missing row above is the ledger question that the orientation judge also raised. It belongs with gather.1's rows 893 and 894.
- `revival-changes.md` is now 20,195 characters, 44 more than the installed text. It was already over the budget of 8,000 to 12,000.
---
session cb343930-4438-456d-81cf-19ea05538b45 turns 17 cache writes 18263 reads 1328268 output 8336 labels {'ephemeral_1h_input_tokens': 18241, 'ephemeral_5m_input_tokens': 0}
