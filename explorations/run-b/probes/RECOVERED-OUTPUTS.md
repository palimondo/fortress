# The `.out` files here were recovered from Run B's transcript

Run B ran every probe in this directory as `probes/run.sh NAME`, which tees the
interpreter's output — command line, output, `exit: N` — into `NAME.out` beside
the probe. Those files are what `../gaps.md`, `../article.md` and
`worker/REPORT.md` cite as evidence. None of them reached the branch: the
repository's root `.gitignore` ignores `*.out` (line 46, a LaTeX byproduct rule
that predates this directory by years), so every `git add explorations/run-b`
silently skipped them.

They were reconstructed afterwards from the session transcripts, by pairing each
`Bash` tool call that ran `probes/run.sh` with its recorded tool result:

- `run-b.jsonl` — the main session (the `c*` and `s*` probes)
- `run-b-subagents/agent-a3425313e0fb75a35.jsonl` — the independent worker
  (`worker/w*`)

**115 outputs recovered, covering all 76 probe sources; nothing cited is
missing.** Every `.fss` in this directory and in `worker/` has at least one run
in the transcripts, and every `.out` filename cited in `../gaps.md`,
`../article.md` and `worker/REPORT.md` now exists.

Each file carries a one-line `[recovered from the transcript, ...]` footer
naming the transcript and line it came from and how faithful it is. **41 files
are the complete output** `run.sh` wrote (the worker displayed its runs whole).
**74 are partial**, because the session displayed the run through a filter — the
tee had already written the full file to disk, but only the filtered view
survives in the transcript.

No tool result was cut by the harness itself: no "output truncated" marker
appears anywhere in either transcript. Every loss below is the session's own
`| tail -N`, `| head -N` or `| grep -v` on the display side.

## Probes run more than once

`run.sh` overwrites `NAME.out`, so a re-run destroyed the previous file. Where
Run B itself preserved the earlier output under a name (`cp NAME.out
NAME.first.out`, `cp w03_dotpostfix.out w03_dotpostfix.attempt1.out`, ...) that
name is reproduced, because the write-ups cite it. Earlier runs Run B did not
name are written as `NAME.run1.out`, `NAME.run2.out` in order; these are runs
that never existed as files in Run B's own tree.

| probe | runs | transcript line -> file |
|---|---|---|
| `c03_closures` | 3 | 235 -> `c03_closures.run1.out` · 261 -> `c03_closures.run2.out` · 281 -> `c03_closures.out` |
| `c04_gradmap` | 2 | 237 -> `c04_gradmap.run1.out` · 263 -> `c04_gradmap.out` |
| `c05_rowwise` | 2 | 239 -> `c05_rowwise.run1.out` · 264 -> `c05_rowwise.out` |
| `c06_value_object` | 2 | 241 -> `c06_value_object.run1.out` · 282 -> `c06_value_object.out` |
| `c07_contracts_tests` | 2 | 243 -> `c07_contracts_tests.property.out` · 266 -> `c07_contracts_tests.out` |
| `c13_sum_protocol` | 2 | 408 -> `c13_sum_protocol.first.out` · 432 -> `c13_sum_protocol.out` |
| `c14_lazy_grad_generators` | 3 | 410 -> `.run1.out` · 422 -> `.run2.out` · 430 -> `c14_lazy_grad_generators.out` |
| `c16_model_spellings` | 3 | 463 -> `.run1.out` · 476 -> `c16_model_spellings.prefixmax.out` · 514 -> `c16_model_spellings.out` |
| `c17_bar_continuation` | 2 | 586 -> `c17_bar_continuation.leading.out` · 611 -> `c17_bar_continuation.out` |
| `c20_pi_and_syntax` | 2 | 640 -> `c20_pi_and_syntax.pi.out` · 684 -> `c20_pi_and_syntax.out` |
| `s01_tape` | 6 | 317, 328, 358, 370, 378 -> `.run1`–`.run5.out` · 391 -> `s01_tape.out` |
| `s02_functional` | 6 | 319, 329, 356, 369, 390 -> `.run1`–`.run5.out` · 420 -> `s02_functional.out` |
| `worker/w00_hello` | 2 | 32 -> `.run1.out` · 36 -> `w00_hello.out` |
| `worker/w01_transpose` | 2 | 98 -> `.attempt1.out` · 136 -> `w01_transpose.out` |
| `worker/w02_paste_static` | 2 | 195 -> `.attempt1.out` · 199 -> `w02_paste_static.out` |
| `worker/w02_paste_vec` | 3 | 162 -> `.run1.out` · 169 -> `.attempt1.out` · 203 -> `w02_paste_vec.out` |
| `worker/w03_dotpostfix` | 4 | 226, 230, 234 -> `.attempt1`–`.attempt3.out` · 238 -> `w03_dotpostfix.out` |
| `worker/w04_bigmax` | 2 | 265 -> `.attempt1.out` · 285 -> `w04_bigmax.out` |
| `worker/w05_mapcompr` | 2 | 293 -> `.attempt1.out` · 300 -> `w05_mapcompr.out` |
| `worker/w05_mapcompr_same` | 4 | 304, 308, 316 -> `.attempt1`–`.attempt3.out` · 320 -> `w05_mapcompr_same.out` |
| `worker/w07_subscripts` | 2 | 343 -> `.attempt1.out` · 347 -> `w07_subscripts.out` |
| `worker/w10_contract` | 2 | 408 -> `.attempt1.out` · 412 -> `w10_contract.out` |
| `worker/w14_varargs` | 2 | 435 -> `.attempt1.out` · 439 -> `w14_varargs.out` |

Two files the worker itself deleted (`worker/w02_paste.attempt1.out` and
`worker/w11_arraylit.attempt1.out`, both at the point where it tidied up) are
not recreated; each was a byte-for-byte copy of a `.out` that survives.

## Partial outputs

**Start missing** — the session showed only `| tail -N`, and no later command
displayed the head of the file, so the `$ FORTRESS_THREADS=...` command line and
the first output lines are gone: `c01_library_matrix.out`,
`c02c_pasting_runtime.out`, `c02d_pasting_typed.out`, `c04_gradmap.out`,
`c04_gradmap.run1.out`, `c16_model_spellings.out`, `s01_tape.out`,
`s01_tape.run4.out`, `s02_functional.out`.

**End missing** — the session showed only `| head -N`, so the stack tail and the
`exit:` line are gone: `c19_bigunion_collision.out`.

**Head and tail both known, middle missing** — the run was displayed as a tail,
and a later command displayed the head of the same file; the two views are
spliced and the hole between them is marked in the file with an explicit
`[... the middle of this run was never displayed in the transcript ...]` line:
`c02e_pasting_variants.out`, `c02f_silent_unbound.out`,
`c10_anyvector_dispatch.out`, `c13_sum_protocol.first.out`,
`c16_model_spellings.prefixmax.out`, `c17_bar_continuation.leading.out`,
`c18_map_of_shapes.out`, `c20b_field_transpose.out`,
`c20c_prefix_juxtaposition.out`, `s02_functional.run4.out`,
`s02_functional.run5.out`. (Five more files spliced with a clean overlap and
have no hole.)

**Filtered** — the worker displayed these through
`grep -v "^\tat \|^java.lang.Throwable\|Turn on"`, so the Java stack lines the
tee had written are absent; the error text and `exit:` line are intact:
`worker/w08_cat1.out`–`w08_cat6.out`, `worker/w16_shadow_field.out`,
`worker/w16_shadow_param.out`, `worker/w17_bigunion_sel.out`,
`worker/w17_bigunion_except.out`, `worker/w18_a.out`–`w18_g.out`.

The remaining 53 partial files were shown through a `tail -N` or `head -N` wide
enough to cover the whole run: they carry both the `$ FORTRESS_THREADS=...`
command line and the `exit:` line, so their content is whole — only the
provenance is second-hand, which is what their footer records.

## Nothing unrecoverable

No probe cited by `../gaps.md`, `../article.md` or `worker/REPORT.md` is without
a recovered output. Three commands in the main transcript that look like probe
runs did nothing at all — they ran in the wrong working directory and every
step failed with "No such file or directory" (`run-b.jsonl` lines 502, 597,
654); each was retried successfully a few turns later, and it is the retry that
is recorded here.

## Committing them

`explorations/run-b/.gitignore` now ends with `!probes/**/*.out`, which
un-ignores exactly these files against the root rule.
