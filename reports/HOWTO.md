# Generating "Probe and the Pin"-style reports from these transcripts

`probe-and-pin.html` narrates one debugging episode (the JDK 11 rung's
458-failure ASM crash, root-caused to a missing `target=` in ant's `<javac>`)
directly from the transcript's raw tool calls. It was produced *after* the
episode had been compacted out of the live context — everything in it was
reconstructed from this JSONL, which is the point: the transcript is a
complete, replayable record. The recipe:

## 1. Locate the episode

Grep the main JSONL for strings unique to the episode — a commit hash, an
error message, a filename you know was created:

```bash
grep -n 'fdd4a57c2\|Probe.java\|ArrayIndexOutOfBounds' <session>.jsonl | head
```

Line numbers bracket the episode. Widen until you find the user request (or
task decision) that started it and the commit that ended it.

## 2. Extract the tool-call skeleton

Parse the line range and dump, for each record: `timestamp`, `type`, every
`tool_use` block's `name` + full `input`, every `tool_result`'s first ~40
lines, and all assistant `text`/`thinking` blocks. About 15 lines of Python:

```python
import json
for i, line in enumerate(open(SRC)):
    if not (START <= i <= END): continue
    rec = json.loads(line)
    for b in (rec.get('message') or {}).get('content') or []:
        if isinstance(b, dict):
            if b['type'] == 'tool_use':
                print(f"== [{i}] {b['name']} {json.dumps(b['input'])[:400]}")
            elif b['type'] == 'tool_result':
                c = b.get('content'); c = c if isinstance(c, str) else json.dumps(c)
                print('  ->', c[:1500].replace(chr(10), chr(10)+'     '))
            elif b['type'] in ('text', 'thinking'):
                print(f"-- [{i}] {b['type']}:", (b.get('text') or b.get('thinking',''))[:800])
```

This skeleton is the evidence base: exact grep patterns, exact probe source
code, exact error output, in the order they really happened.

## 3. Narrate the reasoning, anchored to the evidence

For each tool call, write the *why*: what hypothesis it tested, what the two
possible outcomes would each have implied, and what the actual result
eliminated. The assistant `thinking` blocks often state this explicitly —
quote or paraphrase them. Structure that worked: chronological acts
(triage → reproduce → isolate → root-cause → survey blast radius → fix →
verify), each act showing the verbatim command/code followed by the
reasoning. Resist summarizing away the dead ends; the misses are the
instructive part.

## 4. Verify against the record

Every quoted command, output, and number in the report must appear in the
extract — no reconstruction from memory. If the report claims "8 call sites",
the transcript must show the `grep -c` returning 8.

## 5. Style and publish

The HTML is self-contained (inline CSS, light+dark themes, Google Fonts
only). Publish as a Claude artifact or open the file directly; commit the
HTML here under `reports/`.

## Episode index (grow this as reports are written)

| Report | Episode | Transcript anchor |
|---|---|---|
| `probe-and-pin.html` | JDK 11 rung: ant `<javac>` missing `target=` → v55 bytecode → ASM 3.1 AIOOBE across 458 tests | grep `fdd4a57c2`, `Probe.java`; lines ≈1690–1900 of session `bdff267d…` |

Other episodes worth the same treatment (all in session `bdff267d…`):
the jsr166y→j.u.c. STM corruption hunt (`join()` helping vs blocking,
`nestedTransactions` ~30% flake — grep `bf23583ad`, `joinOrRun`), the
System-api shadowing fix (grep `e700b442d`), the ASM 9 ManglingClassWriter
redesign (grep `2f1fdbf2e`), and the Scala 2.13 migration survey
(grep `668e689f7`).
