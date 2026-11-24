<!-- The map of FACTS by subject, built from the twelve claims files of this folder: one list of subjects, the groups of overlap, each entry's disposition, the chunks for the batch mode of the consolidation and the pilot; written 2026-11-24 by a worker that rewrote no entry. Its data is in `map.json` beside it. -->

# The sorting map of FACTS

FACTS holds 339 entries. Each entry was written by one task of a batch, so it holds what that task found, whatever the subject. Six workers listed the claims of each entry (the twelve files `claims-<chunk>.md` in this folder, by `brief-claims.md`). This map joins their lists into one sorting of the record by subject.

Terms used here:

- A **claim** is one thing that an entry says, which can be true or false on its own. The claims files number the claims of each entry from 1, and this map uses those numbers.
- A claim's **kind** is one of: property (an established property of the tree), defect (something broken or missing), history (how the fact came about), plan (what is still to build), choice (a choice that a worker made), detail (a number, a site or a command needed only while working), tests (test names), pointer (a sentence that only points elsewhere).
- A **subject** is what a claim is about. The six workers chose their labels apart, so one subject had several labels. This map joins the 566 labels into 153 subjects, each with one label.
- An entry's **home** is the subject of most of its property, defect and choice claims, or of its title where the two differ. The **owner** of a subject is the entry that states it best today. Other entries with the same home stay beside the owner when they hold a claim of their own.
- A **part** is the set of property and choice claims (with their defects) that an entry makes on a subject other than its home. A split sends each part to the owner of its subject.
- A **group of overlap** is a set of entries that say the same thing or overlap, as the claims files list them.
- A **chunk** is the set of entries that one writer rewrites in the batch mode of the consolidation. A **writer** is that worker.

## 1. The numbers

- Entries by shape, as the claims files give it: one subject 173; several subjects 118; mostly history or plan 21; mostly a defect 19; not about the tree 8. Where a file gave two shapes, the first of these that applies counts: not about the tree, mostly a defect, mostly history or plan, several subjects, one subject.
- Claims by kind, summed over the twelve files (2,652 claims): property 1,213; pointer 422; defect 387; tests 220; detail 208; history 140; choice 33; plan 29.
- 300 of the 339 entries take part in at least one of the 95 groups of overlap (section 4).
- Of the 387 claims of the kind defect, 338 name a ledger row and 49 name none. 205 entries hold at least one defect claim.
- 70 entries hold a finding of today's checks (`evidence/stale-claims.md`: false today, beyond its support, cites a thing that is gone, a row's status disagrees, or unsettled).

## 2. What the sorting means for the consolidation

- 182 entries stay as one entry: 21 as they are, and 161 rewritten in place. A rewrite in place keeps one subject and moves out claims of the kinds history, plan or detail, a defect's description, or a copied value.
- 30 entries are merged into another entry of the same subject: each repeats it, or states one case, one exception or the history of its claim.
- 119 entries are split, into 2.3 parts on average, the part that stays included: 89 into two, 24 into three, 6 into four.
- 8 entries are not about the tree. In 205 entries a defect's description goes to its ledger row, or to a new row where none is named.
- 5 subjects have no owner today and need a new entry: "the checker: imports"; "walk: two instantiations of one trait"; "the library: AnyList and List"; "the library: native bindings of strings"; "the model program: its lines on both paths".
- The ten largest subjects, by the number of entries that speak to them today: "the gate: the values of the checker count and the distance" 32 (owner F-53); "the checker: the overloading rules" 15 (owner F-75); "walk: static-argument inference" 14 (owner F-141); "walk: the load check of a generic beside a plain declaration" 14 (owner F-252); "walk: the load check of a family's cover" 13 (owner F-27);
  "the checker: comprises clauses and closed traits" 12 (owner F-72); "the code generator: what it refuses against the one library" 12 (owner F-34); "the library: reductions, their identities and static arguments" 12 (owner F-59); "the checker: the export check and types taken from the api" 11 (owner F-282); "the code generator: the classes of traits and objects" 11 (owner F-372). 3 more subjects have 11 entries each. Of the 32 entries on the first, all but F-53 repeat its counts, point to them or tell their history.
- The chunks: 12 chunks of 25 to 31 entries. No subject and no merge is cut between chunks. 53 parts (64 claims) move from one chunk to another (section 6).

## 3. The subjects

How the subjects were made. Each label of the claims files was joined to one subject of this list, by its meaning. One label, "the compiled runtime: prelude", which the files used for four unrelated claims, was joined claim by claim. A claim with no label (most pointers and tests) takes its entry's home. The owner was chosen among the home entries: the one whose title states the subject best, most often the one with the most property, defect and choice claims on it. "A new entry" means that no entry has the subject as its home.

Each line gives the subject, its owner, its chunk (section 6), then its home entries, each with the numbers of its claims on the subject, and after "also" the entries that speak to it from another home.

### The checker

- **the checker: instantiation exclusion**. Owner: F-44. Chunk: comprises. F-44 (1-3, 5-7), F-48 (1-6). Also: F-67 (4), F-129 (11), F-167 (8, 9).
- **the checker: sizes**. Owner: F-67. Chunk: sizes. F-67 (1-3, 5, 6), F-68 (1-3), F-69 (1-5), F-140 (1, 2, 5, 7, 12), F-146 (1-5, 8, 9). Also: F-35 (4), F-38 (2), F-41 (3), F-50 (5), F-342 (6).
- **the checker: the overloading rules**. Owner: F-75. Chunk: overloading. F-50 (1-3), F-75 (1-4, 6, 7, 9), F-76 (1-4, 8, 9), F-77 (1-3, 5), F-80 (1, 3-5, 7), F-245 (2, 7), F-277 (1-5, 7, 10, 11), F-281 (1, 3, 11, 12). Also: F-81 (2), F-227 (5), F-258 (4-6), F-274 (5), F-275 (6), F-174 (5, 7, 9), F-223 (2, 3, 6, 7).
- **the checker: choice among a call's declarations**. Owner: F-408. Chunk: export. F-334 (1-5, 7, 8), F-408 (1-12). Also: F-73 (3), F-376 (4), F-396 (14).
- **the checker: speed, memos and memory**. Owner: F-65. Chunk: export. F-43 (1-3), F-65 (1-6), F-231 (1, 2, 4-7), F-235 (1-3, 5-7). Also: F-80 (6), F-94 (3), F-365 (7), F-121 (5).
- **the checker: static-argument inference**. Owner: F-73. Chunk: inference. F-51 (1, 3, 4), F-55 (1-3, 5), F-73 (1, 2, 6-8), F-78 (1-5, 7). Also: F-84 (3), F-87 (6), F-173 (7).
- **the checker: the expected type**. Owner: F-87. Chunk: inference. F-56 (1-3), F-87 (1, 3-5, 7), F-221 (1-4, 6, 7), F-364 (1-4, 6-12), F-365 (1-6, 8-12). Also: F-59 (2, 3, 7), F-285 (8), F-367 (5).
- **the checker: numeral defaults and types**. Owner: F-342. Chunk: numerals. F-57 (1, 3, 5, 6), F-342 (1-5, 7-12), F-380 (1-7). Also: F-73 (4, 5), F-79 (4), F-118 (1), F-123 (6), F-131 (3), F-262 (1, 3, 8), F-340 (3).
- **the checker: comprises clauses and closed traits**. Owner: F-72. Chunk: comprises. F-62 (1, 2), F-64 (1-3, 5), F-72 (1-6), F-94 (1, 2, 4, 5), F-227 (1-4, 7, 8), F-121 (1-4, 6-8), F-270 (1-3, 5-10). Also: F-63 (8), F-76 (7), F-281 (9), F-171 (8-10), F-175 (5-7).
- **the checker: where clauses and conditional extension**. Owner: F-250. Chunk: comprises. F-244 (1-8), F-250 (1-7), F-251 (1, 3-5, 8, 9), F-255 (1-5, 7, 10, 11), F-256 (1-6, 8, 10, 11). Also: F-52 (2), F-281 (8), F-181 (3).
- **the checker: self types and intersections**. Owner: F-225. Chunk: comprises. F-225 (1-8, 13-16). Also: F-392 (3), F-394 (3), F-318 (8), F-377 (7), F-386 (2, 7), F-406 (7).
- **the checker: the export check and types taken from the api**. Owner: F-282. Chunk: export. F-254 (1-3, 6-8), F-266 (1, 3-7), F-282 (1-4, 9-11), F-287 (1, 3, 5-8), F-297 (1, 3-5, 7-9), F-370 (1-10). Also: F-35 (6), F-281 (4), F-288 (5), F-294 (4-7), F-371 (5).
- **the checker: imports**. Owner: a new entry. Chunk: export. Also: F-281 (5-7), F-293 (2).
- **the checker: the types of native helpers**. Owner: F-321. Chunk: natives. F-321 (1, 2, 7-9), F-322 (1, 3-6). Also: F-298 (4), F-307 (3), F-308 (4), F-314 (4), F-330 (3), F-333 (5), F-180 (3).
- **the checker: inheritance, override and getters**. Owner: F-88. Chunk: classes. F-88 (1-3, 5), F-226 (1-5), F-267 (1, 3-5), F-394 (1, 2, 4, 6-9). Also: F-80 (2), F-145 (6, 7), F-372 (6), F-400 (4, 6, 7).
- **the checker: the default bound Any**. Owner: F-296. Chunk: overloading. F-291 (1-7, 9, 10), F-265 (1-8), F-292 (2, 4-7), F-296 (1-9). Also: F-49 (2).
- **the checker: written static arguments against their bounds**. Owner: F-70. Chunk: comprises. F-70 (1-3). Also: F-291 (8).
- **the checker: well-formedness errors**. Owner: F-237. Chunk: harness. F-237 (1-5, 7-9).
- **the checker: declarations that neither path builds**. Owner: F-182. Chunk: harness. F-182 (1-5).
- **the checker: errors outside the distance**. Owner: F-290. Chunk: export. F-290 (1-5, 7, 8). Also: F-321 (6).

### The code generator

- **the code generator: forking and the range grain**. Owner: F-350. Chunk: runtime. F-19 (1-13), F-350 (1-8), F-356 (1-7). Also: F-135 (4).
- **the code generator: template dispatchers and generic arms**. Owner: F-136. Chunk: sizes. F-376 (1-3, 5-7), F-135 (1-3, 5, 6), F-136 (1-10). Also: F-50 (4), F-129 (6, 10), F-174 (10), F-273 (7, 8).
- **the code generator: varargs**. Owner: F-390. Chunk: runtime. F-86 (1-5), F-390 (1-7, 11-13).
- **the code generator: the classes of traits and objects**. Owner: F-372. Chunk: classes. F-338 (1-5), F-391 (1-3, 6-8), F-409 (1-8), F-372 (1-5, 7-10), F-399 (1-9), F-400 (1-3, 5, 9-11), F-406 (1-5, 8, 9). Also: F-88 (4), F-352 (8), F-394 (5), F-377 (10).
- **the code generator: casts of self and intersection receivers**. Owner: F-377. Chunk: comprises. F-377 (1-6, 8, 9, 11-14), F-386 (1, 3-5, 8, 9). Also: F-76 (5, 6), F-78 (6), F-225 (9, 11, 12), F-384 (4).
- **the code generator: numeral constants**. Owner: F-340. Chunk: numerals. F-118 (2-6, 8, 9), F-304 (1, 2, 5, 6), F-340 (1, 2, 4-8), F-347 (1-5, 8, 9).
- **the code generator: label and exit**. Owner: F-373. Chunk: runtime. F-373 (1-5, 7-16). Also: F-351 (6).
- **the code generator: builtinPrimitive bodies and native wrappers**. Owner: F-298. Chunk: natives. F-301 (1, 2, 4, 5, 8), F-298 (1-3, 5-11), F-308 (1, 3, 8-10), F-309 (1-7), F-337 (1-6), F-106 (1-6). Also: F-313 (4, 5), F-183 (5).
- **the code generator: what it refuses against the one library**. Owner: F-34. Chunk: runtime. F-34 (1, 2, 5-7), F-109 (1-4). Also: F-315 (8), F-320 (5), F-352 (6, 7), F-104 (2), F-384 (6), F-386 (6), F-389 (4), F-406 (6), F-368 (5), F-181 (8).
- **the code generator: try, forbid and modifiers**. Owner: F-315. Chunk: sizes. F-315 (2-5, 7, 9-11).
- **the code generator: closure class names**. Owner: F-389. Chunk: classes. F-389 (1-3, 5, 6).
- **the code generator: bytecode verification and local scope**. Owner: F-393. Chunk: classes. F-393 (1-8).
- **the code generator: generic methods on a type-variable receiver**. Owner: F-392. Chunk: classes. F-392 (1, 2, 4, 5).
- **the code generator: local functions**. Owner: F-320. Chunk: classes. F-233 (1-4), F-320 (1-4, 6, 7). Also: F-367 (9), F-181 (9).
- **the code generator: where clauses and contracts in a header**. Owner: F-181. Chunk: classes. F-181 (1, 2, 4-7, 10-15).

### The compiled runtime

- **the compiled runtime: boxing and the cost of loops**. Owner: F-11. Chunk: runtime. F-11 (1-6), F-12 (1-5, 7, 8), F-302 (1-9), F-358 (1-6). Also: F-18 (5-7), F-301 (3, 6, 7), F-40 (4, 5), F-359 (5).
- **the compiled runtime: the class loader's instances**. Owner: F-18. Chunk: sizes. F-18 (1, 2, 4), F-25 (1-4), F-36 (1, 2), F-268 (1-5), F-384 (1, 3, 8, 9), F-385 (1-6). Also: F-315 (1, 6), F-129 (9), F-378 (4).
- **the compiled runtime: sizes at run time**. Owner: F-129. Chunk: sizes. F-37 (1, 2, 4), F-38 (1, 3, 4), F-40 (1-3, 6-8), F-41 (1, 2, 4-6), F-129 (1-5, 7, 8, 13). Also: F-18 (3), F-20 (2), F-36 (3), F-140 (6, 9), F-146 (7), F-222 (4).
- **the compiled runtime: transactions and atomic expressions**. Owner: F-351. Chunk: runtime. F-351 (1-5, 7-9), F-335 (3-7, 9), F-401 (1-9). Also: F-333 (4), F-373 (6), F-374 (4, 7, 8).
- **the compiled runtime: the cells of mutable variables and var fields**. Owner: F-374. Chunk: runtime. F-117 (1-4), F-374 (1-3, 5, 6, 9-13). Also: F-12 (6).
- **the compiled runtime: component initialization and top-level variables**. Owner: F-348. Chunk: numerals. F-348 (1-9), F-120 (1-4). Also: F-347 (6).
- **the compiled runtime: the one library on the compiled path**. Owner: F-396. Chunk: runtime. F-9 (1-5), F-352 (1-5, 9-12), F-353 (1-6, 8-12), F-381 (1-7), F-396 (1-4, 7-9, 11-13, 15, 16). Also: F-34 (3), F-292 (1), F-390 (8-10).
- **the compiled runtime: the prelude's vectors**. Owner: F-183. Chunk: natives. F-183 (1-4, 6).

### Walk

- **walk: no static checking**. Owner: F-7. Chunk: harness. F-7 (1-5). Also: F-9 (6, 7).
- **walk: the load check of a generic beside a plain declaration**. Owner: F-252. Chunk: overloading. F-252 (1-10, 12-16, 18, 19), F-257 (1-9), F-258 (1-3, 7-10), F-274 (1-4, 6, 7), F-275 (1-5, 7, 8), F-318 (1-7, 9, 10), F-375 (1-13), F-405 (1-15), F-155 (1-6). Also: F-159 (7), F-361 (3, 4), F-379 (6-8), F-174 (11, 12), F-223 (4, 5).
- **walk: the load check of a family's cover**. Owner: F-27. Chunk: overloading. F-27 (1-8), F-269 (1-7), F-142 (1-8), F-145 (1-5, 8-10), F-147 (1-9). Also: F-77 (4), F-227 (6), F-245 (5, 6), F-276 (5), F-277 (8, 9), F-119 (4), F-400 (8), F-152 (5).
- **walk: two instantiations of one trait**. Owner: a new entry. Chunk: overloading. Also: F-44 (4), F-91 (2), F-129 (12), F-252 (11).
- **walk: dispatch on declared domains**. Owner: F-26. Chunk: overloading. F-26 (1-10), F-49 (1), F-253 (1-11). Also: F-248 (3, 4), F-252 (17), F-403 (7, 9, 10).
- **walk: choice among declarations by coercion**. Owner: F-349. Chunk: numerals. F-349 (1, 3, 4, 6-8). Also: F-366 (13), F-272 (6).
- **walk: coercion at its type checks**. Owner: F-128. Chunk: integers. F-128 (1-10). Also: F-139 (3).
- **walk: static-argument inference**. Owner: F-141. Chunk: inference. F-28 (1-4), F-344 (1, 3-5, 7, 8), F-137 (1-9), F-141 (1-5, 8-16), F-143 (1, 4-8). Also: F-18 (8), F-55 (4), F-92 (3), F-114 (4), F-123 (5), F-341 (6), F-229 (6), F-173 (8), F-273 (6).
- **walk: reduction instantiation**. Owner: F-228. Chunk: inference. F-144 (2, 3, 5-9), F-228 (1-5, 7-12). Also: F-59 (4), F-221 (5), F-285 (9, 10), F-131 (9, 10), F-141 (6, 7), F-143 (2, 3).
- **walk: a generic function as a value**. Owner: F-367. Chunk: inference. F-367 (1-4, 6-8, 10-12).
- **walk: where clauses and conditional extension**. Owner: F-148. Chunk: comprises. F-148 (1-4). Also: F-52 (3), F-225 (10), F-251 (6), F-255 (6), F-256 (7).
- **walk: a numeral's type at its place**. Owner: F-341. Chunk: numerals. F-74 (1-3, 5), F-341 (1-5, 7-10). Also: F-57 (4), F-79 (5), F-122 (3), F-131 (4), F-304 (3), F-326 (5), F-347 (7).
- **walk: if conditions**. Owner: F-239. Chunk: harness. F-239 (1-8).
- **walk: comprises clauses**. Owner: F-29. Chunk: comprises. F-29 (1, 2, 4-8). Also: F-62 (3, 4), F-270 (4), F-171 (7).
- **walk: import java**. Owner: F-180. Chunk: natives. F-180 (1, 2, 4, 5, 8-11).
- **walk: loading native helpers and its own operations**. Owner: F-299. Chunk: natives. F-395 (1-6), F-299 (1, 3-8, 11, 12), F-328 (2, 5-7). Also: F-303 (1), F-306 (7), F-310 (2), F-322 (2), F-330 (2), F-332 (2), F-333 (6), F-335 (2, 8).
- **walk: sizes**. Owner: F-20. Chunk: sizes. F-20 (3-7), F-222 (1-3, 5, 6). Also: F-74 (4), F-140 (3, 4, 8, 11), F-146 (6), F-176 (9).
- **walk: array literals**. Owner: F-368. Chunk: classes. F-368 (1-4, 6-11).

### Both paths

- **both paths: the fold of numerals**. Owner: F-339. Chunk: numerals. F-262 (4-7, 9), F-339 (1-8), F-397 (1-9), F-402 (1, 3, 5-8).
- **both paths: a numeral at a call**. Owner: F-366. Chunk: numerals. F-366 (1-6, 8-10, 12, 14-18). Also: F-349 (5).
- **both paths: the four numbers of a numeral coercion**. Owner: F-407. Chunk: numerals. F-407 (1-10).
- **both paths: the sum and product signs and operator headers**. Owner: F-362. Chunk: classes. F-362 (1-6, 9-11).
- **both paths: math items after a primary**. Owner: F-363. Chunk: classes. F-363 (1-7, 9-13), F-387 (1-5). Also: F-398 (1, 2).
- **both paths: typecase and its bound names**. Owner: F-382. Chunk: sizes. F-71 (1-5), F-134 (1-7), F-382 (1-8). Also: F-37 (3), F-384 (2, 5, 7), F-361 (5).
- **both paths: the bare Nothing**. Owner: F-21. Chunk: comprises. F-21 (1-3, 5). Also: F-167 (6).
- **both paths: an api and a component of another name**. Owner: F-22. Chunk: classes. F-22 (1-9).
- **both paths: source spans of comments**. Owner: F-23. Chunk: classes. F-23 (1-3).
- **both paths: extends Any as Object**. Owner: F-259. Chunk: numerals. F-259 (1-3, 8, 9).
- **both paths: string literals and their identity**. Owner: F-343. Chunk: numerals. F-343 (1-9).
- **both paths: character literals and Char's asExprString**. Owner: F-329. Chunk: numerals. F-329 (1-6).
- **both paths: generic references without static arguments**. Owner: F-184. Chunk: comprises. F-184 (1-6).
- **both paths: deterministic order**. Owner: F-232. Chunk: export. F-232 (1-8), F-108 (1-3), F-354 (1-6). Also: F-254 (4).
- **both paths: operator static parameters**. Owner: F-39. Chunk: classes. F-39 (1-6). Also: F-267 (2).
- **both paths: a value's printed form and type name**. Owner: F-123. Chunk: numerals. F-123 (1-4, 7, 8). Also: F-328 (3, 4), F-344 (2, 6), F-118 (7), F-259 (4-7).
- **both paths: type assumptions**. Owner: F-325. Chunk: classes. F-325 (1-12). Also: F-34 (4), F-391 (4, 5).
- **both paths: tuple bindings and tuple parameters**. Owner: F-369. Chunk: classes. F-369 (1-6, 9-13), F-378 (1-3, 5-11), F-398 (3-12).
- **both paths: exceptions that native helpers raise**. Owner: F-336. Chunk: natives. F-24 (1-3, 5, 6), F-336 (1-8). Also: F-312 (5), F-353 (7), F-396 (6, 10), F-180 (6, 7).

### The library

- **the library: the array element bound and algebra**. Owner: F-151. Chunk: arrays. F-90 (1-5, 10), F-151 (1-7, 9-13), F-152 (1-4, 6, 7). Also: F-51 (2), F-229 (4).
- **the library: array factories and the witness typecase**. Owner: F-229. Chunk: arrays. F-159 (1-6, 8, 10, 11), F-229 (1-3, 5, 7, 8, 10). Also: F-151 (8).
- **the library: fill and tabulate**. Owner: F-158. Chunk: arrays. F-158 (1-8). Also: F-49 (3), F-264 (6).
- **the library: array casts**. Owner: F-264. Chunk: arrays. F-264 (1-5, 8-12).
- **the library: array stores**. Owner: F-333. Chunk: natives. F-333 (1-3, 7-12). Also: F-159 (9).
- **the library: array views and slices**. Owner: F-157. Chunk: arrays. F-157 (1-6), F-279 (1-6).
- **the library: array products and shapes**. Owner: F-154. Chunk: arrays. F-154 (1-5).
- **the library: the array vocabulary**. Owner: F-156. Chunk: arrays. F-156 (1-5).
- **the library: the scalar extension**. Owner: F-119. Chunk: arrays. F-119 (1-3, 5, 6). Also: F-317 (2).
- **the library: generators and their sizes**. Owner: F-93. Chunk: arrays. F-93 (1-6), F-284 (1-6).
- **the library: reductions, their identities and static arguments**. Owner: F-59. Chunk: inference. F-59 (1, 5, 6), F-60 (1-5), F-85 (1, 2, 4-6), F-220 (1, 3, 4), F-242 (1-8), F-243 (2, 4, 6, 7), F-285 (1-6, 11, 12), F-248 (1, 2, 5, 6). Also: F-81 (7), F-364 (5), F-144 (1, 4), F-228 (6).
- **the library: AnyList and List**. Owner: a new entry. Chunk: arrays. Also: F-243 (3, 5), F-251 (2), F-255 (8), F-288 (3, 4, 6).
- **the library: the api's members against its components**. Owner: F-286. Chunk: export. F-63 (1-7), F-286 (1-3, 5-7). Also: F-282 (5-7), F-287 (2, 4), F-297 (2, 6).
- **the library: strings and their concatenation**. Owner: F-83. Chunk: arrays. F-83 (1-8), F-276 (1, 2, 6, 7), F-249 (1-8). Also: F-81 (3, 4), F-90 (7).
- **the library: declarations on the meet, and the Index bound**. Owner: F-81. Chunk: arrays. F-81 (1, 5, 6, 8), F-278 (1, 2, 4-10). Also: F-82 (1, 3), F-276 (4).
- **the library: ranges**. Owner: F-133. Chunk: arrays. F-82 (2, 4, 5), F-89 (1-4), F-91 (1, 3-5), F-133 (1-9), F-170 (1-4, 6). Also: F-90 (6), F-316 (6).
- **the library: the flat number types**. Owner: F-131. Chunk: integers. F-131 (1, 2, 5-8, 11, 12), F-139 (1, 2, 4-7), F-324 (1-3, 6-8). Also: F-90 (8), F-168 (3), F-359 (3).
- **the library: the number types as value objects**. Owner: F-379. Chunk: integers. F-388 (1-11), F-361 (1, 2, 6-8), F-379 (1-5, 9-12), F-359 (1, 2, 6-8). Also: F-396 (5).
- **the library: equality and equivalence**. Owner: F-280. Chunk: integers. F-280 (1-6), F-326 (1-4, 6-9), F-403 (1-6, 11-13). Also: F-324 (4, 5), F-366 (7).
- **the library: integer shifts**. Owner: F-124. Chunk: integers. F-124 (1, 3, 7, 9), F-125 (1-7), F-126 (1-5).
- **the library: fixed-width overflow**. Owner: F-132. Chunk: integers. F-132 (1-5, 7, 8). Also: F-124 (4-6, 8), F-316 (4).
- **the library: integer powers**. Owner: F-263. Chunk: integers. F-263 (1-11). Also: F-132 (6), F-261 (2, 3), F-172 (8).
- **the library: integer conversions**. Owner: F-331. Chunk: integers. F-313 (1, 3, 6-8), F-261 (1, 4), F-331 (1-10). Also: F-124 (2).
- **the library: integer MIN and MAX**. Owner: F-138. Chunk: integers. F-138 (1-7).
- **the library: wrapping operators**. Owner: F-130. Chunk: integers. F-130 (1-8). Also: F-306 (5).
- **the library: GCD, LCM and CHOOSE**. Owner: F-316. Chunk: integers. F-305 (1-8), F-316 (1-3, 5, 7, 8).
- **the library: integer division and division by zero**. Owner: F-312. Chunk: natives. F-312 (2-4, 6-8). Also: F-24 (4), F-306 (3, 6), F-308 (6), F-314 (5).
- **the library: native bindings and their counts**. Owner: F-32. Chunk: natives. F-32 (1-7). Also: F-299 (2, 9, 10), F-308 (2), F-327 (1-6, 8), F-328 (1), F-335 (1).
- **the library: native bindings of the number types**. Owner: F-323. Chunk: natives. F-303 (2-8), F-306 (1, 2, 4, 8, 9), F-307 (1, 2, 4, 5, 7, 8), F-310 (1, 4, 5, 7-9), F-311 (1-7), F-314 (1-3, 6, 7), F-323 (1-6, 8-11), F-327 (7, 9). Also: F-308 (5, 7), F-312 (1), F-313 (2).
- **the library: native bindings of strings**. Owner: a new entry. Chunk: natives. Also: F-307 (6), F-321 (3, 4), F-323 (7).
- **the library: I/O streams**. Owner: F-332. Chunk: natives. F-330 (1, 4-10), F-332 (1, 3-10).
- **the library: IntMap's union**. Owner: F-230. Chunk: arrays. F-230 (1-7).
- **the library: rounding of floats**. Owner: F-122. Chunk: numerals. F-122 (1, 2, 4-6).
- **the library: order on tuples**. Owner: F-92. Chunk: arrays. F-92 (1, 2, 4-6).
- **the library: the numeral types**. Owner: F-79. Chunk: numerals. F-79 (1-3, 6). Also: F-57 (2).
- **the library: result-only type parameters**. Owner: F-84. Chunk: arrays. F-84 (1, 2, 4-9).
- **the library: dead sizes in FortressLibrary's api**. Owner: F-35. Chunk: sizes. F-35 (1-3, 5).
- **the library: comparisons at NaN**. Owner: F-319. Chunk: harness. F-319 (1-6, 9, 10).

### The specification

- **the specification: the generated api listings**. Owner: F-162. Chunk: harness. F-162 (1-5).
- **the specification: its two copies and Appendix I**. Owner: F-163. Chunk: harness. F-163 (1-6, 8, 9). Also: F-345 (7, 8).
- **the specification: the restart's standing and what the draft left unwritten**. Owner: F-166. Chunk: harness. F-166 (1-5, 7), F-169 (1-5, 7). Also: F-163 (7), F-319 (7, 8), F-371 (3, 4).
- **the specification: instantiation exclusion and the examples it refuses**. Owner: F-167. Chunk: comprises. F-45 (1-6), F-46 (1-6), F-47 (1-8), F-52 (1, 4), F-167 (1-5, 7, 10). Also: F-21 (4).
- **the specification: the number chapters and integer rules**. Owner: F-168. Chunk: integers. F-168 (1, 2, 4-9), F-172 (1-7, 9).
- **the specification: static numerals**. Owner: F-345. Chunk: numerals. F-345 (1-6, 9). Also: F-262 (2), F-304 (4), F-402 (2, 4), F-169 (6).
- **the specification: comprises clauses**. Owner: F-171. Chunk: comprises. F-171 (1-6, 11, 12), F-175 (1-4, 8). Also: F-29 (3), F-64 (4).
- **the specification: type inference**. Owner: F-173. Chunk: inference. F-173 (1-6, 9, 10), F-273 (1-5, 9). Also: F-87 (2), F-266 (2).
- **the specification: overloading with static parameters**. Owner: F-174. Chunk: overloading. F-174 (1-4, 6, 8, 13), F-223 (1). Also: F-75 (5).
- **the specification: sizes**. Owner: F-176. Chunk: sizes. F-176 (1-8, 10). Also: F-20 (1), F-140 (10).
- **the specification: coercion resolution**. Owner: F-272. Chunk: numerals. F-272 (1-5, 7). Also: F-349 (2).
- **the specification: omitted types**. Owner: F-371. Chunk: harness. F-371 (1, 2, 6-8).
- **the specification: the export rule**. Owner: F-294. Chunk: export. F-294 (1-3, 8).

### The harness and the gate

- **the gate: the values of the checker count and the distance**. Owner: F-53. Chunk: export. F-53 (1-7), F-54 (1-3), F-66 (1-5). Also: F-42 (2, 3), F-43 (4), F-44 (8), F-61 (5), F-75 (8), F-85 (3), F-90 (9), F-220 (2), F-237 (6), F-243 (1), F-245 (1, 4), F-251 (7), F-254 (5), F-255 (9), F-256 (9), F-276 (3), F-277 (6), F-278 (3), F-281 (2, 10), F-282 (8), F-285 (7), F-286 (4), F-288 (1, 2), F-289 (3), F-290 (6), F-310 (3), F-334 (6), F-229 (9), F-264 (7).
- **the gate: how the count and distance stages run**. Owner: F-111. Chunk: export. F-42 (1), F-240 (1-8), F-288 (7, 8), F-289 (1, 2, 4, 5), F-111 (1-6), F-295 (1-5). Also: F-231 (3), F-235 (4), F-245 (3), F-203 (5).
- **the harness: XXX tests and refusals at load**. Owner: F-102. Chunk: harness. F-102 (1-5), F-103 (1-5), F-104 (3-5), F-383 (1-3). Also: F-108 (4).
- **the harness: check keys**. Owner: F-98. Chunk: harness. F-98 (1-5). Also: F-70 (4), F-104 (1).
- **the gate: threads, heaps and JVMs**. Owner: F-99. Chunk: harness. F-99 (1-4), F-107 (1-7), F-203 (1-4, 6), F-234 (1-5). Also: F-25 (5).
- **the gate: step 7, the interpreter's suite compiled**. Owner: F-97. Chunk: runtime. F-97 (1-4, 6). Also: F-109 (5).
- **the gate: testSystem's shards**. Owner: F-105. Chunk: harness. F-105 (1-3).
- **the harness: another build's caches**. Owner: F-113. Chunk: harness. F-113 (1-4).
- **the harness: the specification's examples**. Owner: F-114. Chunk: inference. F-114 (1-3, 5). Also: F-170 (5).
- **the harness: the two test corpora**. Owner: F-185. Chunk: harness. F-112 (1-6), F-185 (1-6).
- **the gate: the method-size guard**. Owner: F-236. Chunk: export. F-236 (1-5).
- **the harness: the team's demos outside the gate**. Owner: F-283. Chunk: harness. F-283 (1-6).

### The tools

- **the tools: the build and the caches**. Owner: F-100. Chunk: harness. F-17 (1-4), F-100 (1-7), F-101 (1-3), F-404 (1-4).

### The repository

- **the repository: lineage and the Java 9 port**. Owner: F-165. Chunk: harness. F-165 (1-7).
- **the repository: authorship of comments**. Owner: F-317. Chunk: arrays. F-317 (1, 3-6).
- **the repository: two runtimes**. Owner: F-179. Chunk: runtime. F-179 (1-3).
- **the repository: CompilerSystem and the compiler's prelude**. Owner: F-293. Chunk: natives. F-293 (1, 3-5). Also: F-292 (3), F-310 (6), F-321 (5).
- **the repository: the steps to the switch-over**. Owner: F-61. Chunk: runtime. F-61 (1-4, 6).
- **the repository: the type group's papers**. Owner: F-271. Chunk: inference. F-271 (1-6), F-300 (1-6). Also: F-166 (6), F-359 (4).

### The model program

- **the model program: under the compiled checker**. Owner: F-58. Chunk: runtime. F-58 (1-9). Also: F-97 (5), F-369 (8).
- **the model program: its lines on both paths**. Owner: a new entry. Chunk: classes. Also: F-362 (7, 8), F-363 (8), F-366 (11), F-369 (7), F-403 (8).
- **the model program: the Java baseline and the weight reader**. Owner: F-355. Chunk: runtime. F-355 (1-9), F-357 (1-5).

## 4. The groups of overlap

Each group is given once, joined from the overlap lists at the end of the claims files. Its source names the file and the place of the item in that list: `exec.4` is the fourth item of the list in `claims-exec.md`. A group names every entry that its items name, so it is wider than the claim that its entries share. After the entries: what they share, then the chunks that hold them, with the count in each.

- O1 **Boxing and the cost of compiled loops** (exec.1): F-11, F-12, F-18, F-40, F-301, F-302, F-358, F-388. They share the boxing of every number, its 6-7x cost, and what C2 inlines. Chunks: runtime 4, sizes 2, natives 1, integers 1.
- O2 **The transaction check on a mutable local** (exec.2): F-12, F-40, F-358, F-374. They share the check at each use of a mutable local in a loop (row 641). Chunks: runtime 3, sizes 1.
- O3 **Forking and the range grain** (exec.3): F-19, F-350, F-356. They share the fork and join points and the grain of 16. Chunks: runtime 3.
- O4 **Walk's load check of a generic beside a plain declaration** (exec.4, landed-2.1, landed-3.11, arrays.5): F-26, F-27, F-155, F-159, F-174, F-223, F-252, F-253, F-257, F-258, F-269, F-274, F-275, F-277, F-296, F-318, F-361, F-375, F-379, F-405. They share the reading on declared domains by the No Duplicates, Return Type and Meet Rules; the h pair; rows 539, 779, 780, 1134, 550. Chunks: overloading 17, integers 2, arrays 1.
- O5 **Overloading with static parameters** (spec.2, checker-2.11, checker-2.13, checker-1.16): F-27, F-44, F-49, F-50, F-75, F-80, F-142, F-174, F-223, F-252, F-257, F-274, F-296, F-361, F-376, F-405. They share the specification's 2011 rules and the checker's Return Type, positional, Meet and No Duplicates readings (rows 537, 1048). Chunks: overloading 13, comprises 1, integers 1, sizes 1.
- O6 **The value-level reading of comprises** (exec.5, checker-1.15, checker-2.3, spec.1, landed-1.12): F-29, F-46, F-62, F-72, F-76, F-121, F-145, F-171, F-175. They share rows 487, 489, 490, 546, 547 and 407: generic subtraits, the tower closure and coverage. Chunks: comprises 7, overloading 2.
- O7 **The ellipsis comprises** (checker-2.2): F-63, F-64, F-72. They share the refusal of a type that extends a trait whose comprises has ... (row 354). Chunks: comprises 2, export 1.
- O8 **Shape mismatch at dispatch** (exec.6, arrays.6): F-20, F-154. They share a product of the wrong shapes stops at dispatch (row 254). Chunks: sizes 1, arrays 1.
- O9 **The cold-cache check of library operators** (exec.7, landed-1.10): F-119, F-151, F-155, F-269, F-318. They share a program's declarations of a library operator checked only with a cold cache (row 341). Chunks: overloading 3, arrays 2.
- O10 **Instantiation exclusion: the rule and its kinds** (checker-1.5, checker-2.7, spec.4): F-21, F-44, F-47, F-48, F-67, F-129, F-131, F-167, F-184. They share what the rule compares, the Flag example (row 406) and row 414. Chunks: comprises 6, sizes 2, integers 1.
- O11 **Walk's row 416** (checker-1.6, landed-1.18): F-44, F-48, F-91, F-129, F-155, F-167, F-252. They share walk refuses two instantiations of one trait (row 416). Chunks: comprises 3, overloading 2, arrays 1, sizes 1.
- O12 **The bare Nothing** (exec.8): F-21, F-167, F-184. They share the draft's bare Nothing and the forms that exclusion refuses. Chunks: comprises 3.
- O13 **Refused examples and the alternatives to the rule** (checker-1.7, checker-1.8): F-45, F-46, F-47, F-52, F-136, F-167, F-168. They share the specification's examples that the rule refuses, the forest rule and route C. Chunks: comprises 5, sizes 1, integers 1.
- O14 **Native exceptions and helper raises** (exec.9, checker-4.11, checker-5.3, arrays.7): F-24, F-180, F-299, F-306, F-308, F-312, F-332, F-336, F-353, F-388, F-396. They share a native's raise that a catch sees, LibraryNames, division by zero. Chunks: natives 8, runtime 2, integers 1.
- O15 **The default bound Any** (exec.10, checker-4.3): F-289, F-291, F-292, F-296. They share the compile command's bound Any (Shell.java:378) and its runs. Chunks: overloading 3, export 1.
- O16 **The class loader and generic instances** (exec.11, landed-1.15): F-18, F-25, F-129, F-135. They share the first load of an instance, the lock, size descriptors, generic tasks. Chunks: sizes 4.
- O17 **The compiled numeral place** (exec.12, landed-2.5): F-118, F-340, F-347, F-348. They share one value per numeral place in a static field (row 957), component initialization. Chunks: numerals 4.
- O18 **Native wrappers** (exec.13, harness.7): F-106, F-298, F-301, F-309. They share the generated wrapper over the box classes and ForeignJava. Chunks: natives 4.
- O19 **Exits and transactions** (exec.14, landed-3.6): F-351, F-373, F-374, F-401. They share an exit out of an atomic block (rows 1041, 322). Chunks: runtime 4.
- O20 **The Java baseline** (exec.15): F-355, F-356, F-357, F-358. They share the pure-Java microGPT, its widths and its weight reader. Chunks: runtime 4.
- O21 **Library selection and the one library compiled** (exec.16, checker-5.1, checker-5.2, checker-1.2): F-9, F-34, F-288, F-293, F-296, F-336, F-352, F-353, F-381, F-388, F-390, F-396, F-404. They share FORTRESS_LIBRARY=one, the fourteen compiled to jars, the departures by row (1098, 1101, 1103, 1137). Chunks: runtime 7, natives 2, export 1, overloading 1, integers 1, harness 1.
- O22 **Native bindings and their counts** (checker-1.1, checker-4.9, checker-5.5, checker-4.10): F-32, F-298, F-299, F-303, F-306, F-307, F-308, F-310, F-311, F-312, F-313, F-314, F-323, F-327, F-328, F-330, F-332, F-333, F-335. They share the 401 live bindings, the 373 that name a helper, each family's count, and that each keeps the glue's values. Chunks: natives 17, integers 1, runtime 1.
- O23 **Walk's native loader and own operations** (checker-4.8, checker-5.4): F-299, F-303, F-310, F-322, F-328, F-330, F-332, F-333, F-335. They share the carriers, OWN_OPERATIONS and the private native objects. Chunks: natives 8, runtime 1.
- O24 **Sizes at run time on the compiled path** (checker-1.3, checker-1.4): F-20, F-36, F-37, F-38, F-40, F-41, F-129. They share the descriptor of a size, dispatch on a size, and 'no optimization uses a size'. Chunks: sizes 7.
- O25 **Sizes in the checker** (checker-2.6, spec.7): F-20, F-38, F-50, F-67, F-68, F-69, F-146, F-176. They share nat and int parameters checked, 'Could not infer static argument', row 400. Chunks: sizes 7, overloading 1.
- O26 **Sizes as values and out of range** (landed-1.5, landed-1.6): F-74, F-129, F-140, F-146, F-176, F-222, F-342. They share a size's range and its arithmetic (rows 962, 675, 767). Chunks: sizes 5, numerals 2.
- O27 **Sizes at a where clause** (landed-1.11, landed-2.10): F-121, F-129, F-140, F-146, F-176, F-181, F-222, F-251, F-270, F-377. They share the opening of where-clause variables and sizes in comprises (row 307). Chunks: sizes 5, comprises 4, classes 1.
- O28 **The checker count and the distance** (checker-1.9, checker-2.5, harness.5, checker-4.4): F-42, F-43, F-53, F-54, F-61, F-66, F-111, F-245, F-281, F-285, F-287, F-288, F-289, F-290, F-295, F-296. They share the values at the last gate, the fourteen against the twelve, how the stages run. Chunks: export 11, overloading 3, runtime 1, inference 1.
- O29 **The overloading memo** (checker-1.10, checker-2.14): F-43, F-80. They share whether the memo keeps every input or hides errors across traits. Chunks: export 1, overloading 1.
- O30 **Inference with coercion and the instance at the bounds** (checker-1.11, checker-2.9, landed-1.7, spec.3, checker-2.21, checker-2.12): F-51, F-55, F-73, F-76, F-78, F-84, F-92, F-136, F-137, F-138, F-141, F-143, F-173, F-271, F-273. They share P-48's instance, the intersection of the bounds, rows 388, 507, 510, 511, 559, 587. Chunks: inference 10, arrays 2, overloading 1, sizes 1, integers 1.
- O31 **The expected type** (checker-1.12, checker-2.18): F-56, F-87, F-221, F-364. They share the contexts that give a call its expected type. Chunks: inference 4.
- O32 **A numeral's default** (checker-1.13, checker-2.10, checker-5.12, landed-1.3, landed-2.4): F-57, F-73, F-74, F-79, F-118, F-123, F-131, F-140, F-262, F-263, F-304, F-326, F-339, F-340, F-341, F-342, F-345, F-347, F-366, F-402, F-407. They share the default where nothing fixes a type, by value under walk, through its coercion compiled. Chunks: numerals 16, integers 3, inference 1, sizes 1.
- O33 **A numeral at a call** (landed-3.1): F-57, F-58, F-139, F-341, F-342, F-349, F-366. They share the declaration that a numeral's coercion reaches (row 528). Chunks: numerals 5, runtime 1, integers 1.
- O34 **A numeral coercion's numbers and its place** (landed-3.2): F-340, F-341, F-342, F-347, F-380, F-407. They share conversion where the numeral stands. Chunks: numerals 6.
- O35 **The fold of numerals** (landed-3.13, spec.8): F-57, F-79, F-169, F-339, F-341, F-342, F-343, F-345, F-397, F-402. They share folding before the checker, digits as written, joined naturals. Chunks: numerals 9, harness 1.
- O36 **Reductions' static arguments and identities** (checker-1.14, checker-3.10, checker-5.13, checker-4.6, checker-2.16): F-57, F-58, F-59, F-60, F-81, F-85, F-144, F-159, F-220, F-221, F-228, F-229, F-264, F-285, F-364. They share SUM's identity from its static argument, the written arguments, the casts at the fallbacks. Chunks: inference 9, arrays 4, numerals 1, runtime 1.
- O37 **Reduction instantiation under walk** (landed-1.8, landed-2.3, harness.6): F-55, F-114, F-131, F-137, F-141, F-143, F-144, F-170, F-221, F-228, F-344. They share the declared type, the join, the bound and the open F-bound (rows 510, 705, 716, 717). Chunks: inference 9, integers 1, arrays 1.
- O38 **Intersection types and coverage** (checker-2.4, landed-3.9): F-76, F-175, F-227, F-384, F-386, F-408. They share the Meet Rule by coverage, the intersection, rows 546, 547. Chunks: comprises 3, overloading 1, sizes 1, export 1.
- O39 **Row 470** (checker-2.8): F-70, F-244, F-250, F-256, F-291. They share a static argument checked against its bound, where clauses. Chunks: comprises 4, overloading 1.
- O40 **Library meets and the full check of operators** (checker-2.15, checker-3.6, checker-4.2, checker-3.12): F-81, F-82, F-245, F-259, F-276, F-277, F-278, F-281. They share every operator checked, the 191 errors split, Index. Chunks: arrays 4, overloading 3, numerals 1.
- O41 **Varargs** (checker-2.17, checker-5.10): F-86, F-315, F-320, F-352, F-390. They share ImmutableArray[\T, ZZ32\] on both sides (row 624). Chunks: runtime 3, sizes 1, classes 1.
- O42 **Override and inheritance** (checker-2.19, landed-1.17, landed-3.12): F-88, F-142, F-145, F-147, F-315, F-394, F-400. They share override, provision by inheritance, getters. Chunks: classes 3, overloading 3, sizes 1.
- O43 **The Meet Rule and cover at load** (landed-1.16): F-7, F-27, F-80, F-88, F-142, F-145, F-245. They share the cover search on both paths. Chunks: overloading 5, harness 1, classes 1.
- O44 **Ranges** (checker-2.20): F-44, F-82, F-89, F-90, F-91, F-129, F-155, F-252. They share the range kinds over ZZ32, narrowToRange, strided ranges. Chunks: arrays 4, overloading 2, comprises 1, sizes 1.
- O45 **Repairs in forms the library uses** (checker-2.22): F-83, F-84, F-85. They share one rung's repairs. Chunks: arrays 2, inference 1.
- O46 **Where clauses** (checker-3.1, arrays.9, checker-3.14): F-70, F-181, F-244, F-250, F-251, F-255, F-256, F-281, F-320. They share the three forms the checker builds (rows 470, 748, 752, 773, 774). Chunks: comprises 6, classes 2, overloading 1.
- O47 **Closed traits and the element bound** (checker-3.2, arrays.1): F-90, F-94, F-151, F-227, F-229. They share the normal form's expansion and Number's case (rows 686 to 690). Chunks: arrays 3, comprises 2.
- O48 **Self types** (checker-3.3, checker-5.15, landed-3.8): F-225, F-227, F-258, F-277, F-318, F-377, F-385, F-394, F-406, F-408. They share C[\X\] & X, casts of self, getters (rows 713, 786). Chunks: comprises 3, overloading 3, classes 2, sizes 1, export 1.
- O49 **Fusion and the generic distribute** (checker-3.4, landed-2.11): F-85, F-242, F-243, F-248, F-250, F-253. They share the fusion pairs, the method condition, the casts at the fallbacks. Chunks: inference 4, comprises 1, overloading 1.
- O50 **AnyList and List** (checker-3.5): F-243, F-251, F-255. They share the comprises ... where clause and conditional LexicographicOrder. Chunks: comprises 2, inference 1.
- O51 **Omitted types** (checker-3.7, checker-5.14): F-232, F-254, F-266, F-297, F-370, F-371. They share a type left out taken from the api (rows 405, 1032). Chunks: export 5, harness 1.
- O52 **The code generator at Any** (checker-3.8, checker-4.14): F-268, F-315. They share same tests, row 889. Chunks: sizes 2.
- O53 **Memos and speed** (checker-3.9): F-43, F-65, F-94, F-231, F-235, F-236, F-240. They share the memos, the 8,000-byte limit, the stage times. Chunks: export 6, comprises 1.
- O54 **String concatenation** (checker-3.11, landed-2.7): F-249, F-259, F-269, F-276, F-343. They share the || routes and depth 0. Chunks: arrays 2, numerals 2, overloading 1.
- O55 **Operator static arguments** (checker-3.13): F-39, F-267. They share an opr static parameter. Chunks: classes 2.
- O56 **The export check and abstract members** (checker-4.1, checker-2.1): F-63, F-83, F-281, F-282, F-286, F-287, F-288, F-294, F-297. They share the rule, rows 834, 839, 842, the abstract members counted. Chunks: export 7, arrays 1, overloading 1.
- O57 **CompilerSystem** (checker-4.5): F-292, F-293, F-321. They share the fourth file of the compiler's library. Chunks: natives 2, overloading 1.
- O58 **The native helpers' typing** (checker-4.7): F-298, F-308, F-322. They share Java types read as the one library's. Chunks: natives 3.
- O59 **CHOOSE and divisors** (checker-4.12): F-305, F-314, F-316. They share row 887. Chunks: integers 2, natives 1.
- O60 **asFloat and asRR64** (checker-4.13): F-311, F-323, F-324. They share the conversions to RR64. Chunks: natives 2, integers 1.
- O61 **Unsigned transfer and printing** (checker-4.15, landed-1.4): F-118, F-308, F-313. They share row 886, unsigned printing. Chunks: numerals 1, natives 1, integers 1.
- O62 **I/O streams** (checker-5.6): F-330, F-332. They share FileWriteStream, FileNotFoundException. Chunks: natives 2.
- O63 **Candidate order and hashes** (checker-5.7, harness.8): F-76, F-108, F-232, F-334, F-354, F-377, F-396, F-408. They share the linear extension, identity hashes, order of emitted code. Chunks: export 5, overloading 1, comprises 1, runtime 1.
- O64 **The trait table and api traits** (checker-5.8): F-338, F-352, F-372, F-391. They share entries naming each trait. Chunks: classes 3, runtime 1.
- O65 **Type assumptions** (checker-5.9): F-34, F-325, F-379, F-391. They share asif at a receiver and an argument. Chunks: classes 2, runtime 1, integers 1.
- O66 **Bytecode verification** (checker-5.11): F-34, F-352, F-378, F-390, F-393, F-396, F-409. They share verify errors under the one library. Chunks: runtime 4, classes 3.
- O67 **A generic function as a value** (checker-5.16, landed-3.5): F-365, F-367. They share the arrow type that receives it, on each path. Chunks: inference 2.
- O68 **Walk's type text** (checker-5.17): F-123, F-328, F-344. They share a value's type name and ilk. Chunks: numerals 1, natives 1, inference 1.
- O69 **XXX tests and refusals** (harness.1): F-102, F-103, F-104, F-383. They share the load_ key and the XXX rule. Chunks: harness 4.
- O70 **Threads and heaps** (harness.2): F-99, F-107, F-203. They share the pin of 4 threads and testFast's 4 GB. Chunks: harness 3.
- O71 **Build and caches** (harness.3): F-17, F-100, F-381, F-404. They share the stamp rule, caches-one, the five jars. Chunks: harness 3, runtime 1.
- O72 **Step 7** (harness.4): F-97, F-109, F-203. They share the interpreter's suite on the compiled path. Chunks: runtime 2, harness 1.
- O73 **Integer rules** (landed-1.1, landed-1.2, landed-2.6, spec.6): F-24, F-124, F-125, F-126, F-132, F-172, F-261, F-263, F-299, F-305, F-313, F-314, F-316, F-327, F-331. They share shifts, overflow, powers, conversions and the specification's integer chapter (row 887). Chunks: integers 11, natives 4.
- O74 **The flat tower and Number** (landed-1.9, landed-2.9): F-79, F-131, F-139, F-151, F-168, F-227, F-323, F-324, F-366. They share RR32 a sibling, Number declares nothing (row 528). Chunks: integers 4, numerals 2, arrays 1, comprises 1, natives 1.
- O75 **Template dispatchers** (landed-1.13): F-45, F-136, F-273. They share an arm called at the dispatcher (row 496). Chunks: comprises 1, sizes 1, inference 1.
- O76 **Clause-bound names** (landed-1.14): F-71, F-134. They share a typecase or catch clause's bound name. Chunks: sizes 2.
- O77 **Wrapping operators in the prelude** (landed-1.19): F-32, F-130, F-306. They share row 348. Chunks: natives 2, integers 1.
- O78 **Walk's dispatch and inference for generic methods** (landed-2.2): F-26, F-137, F-141, F-248, F-253, F-405. They share rows 1134, 21, 744. Chunks: overloading 3, inference 3.
- O79 **Equality** (landed-2.8): F-131, F-280, F-324, F-326, F-328, F-341, F-343, F-366, F-374. They share =/=, SEQV, Number's equality. Chunks: integers 4, numerals 3, natives 1, runtime 1.
- O80 **Char's asExprString** (landed-2.12): F-308, F-329. They share one text on both paths. Chunks: natives 1, numerals 1.
- O81 **If on a non-Boolean** (landed-2.13): F-7, F-239. They share the run-time error that walk gives. Chunks: harness 2.
- O82 **Math items after a primary** (landed-3.3): F-363, F-387, F-398. They share superscript and subscript on both paths. Chunks: classes 3.
- O83 **Tuples** (landed-3.4, landed-3.15): F-58, F-89, F-91, F-291, F-369, F-378, F-393, F-398. They share tuple bindings, tuple parameters, arrays of rank 2 and 3 (rows 1054, 1056). Chunks: classes 4, arrays 2, runtime 1, overloading 1.
- O84 **Methods in a compiled class** (landed-3.7): F-88, F-325, F-354, F-372, F-399, F-400, F-409. They share inherited methods, dispatch methods, bridges. Chunks: classes 6, export 1.
- O85 **The number types as value objects** (landed-3.10, arrays.4, spec.9): F-75, F-131, F-136, F-301, F-302, F-353, F-359, F-361, F-375, F-379, F-382, F-388, F-395, F-396. They share the payload classes, the merger of the five types. Chunks: integers 5, runtime 3, overloading 2, sizes 2, natives 2.
- O86 **The sum sign at the model's lines** (landed-3.14): F-58, F-59, F-362. They share microGPT's sum lines. Chunks: runtime 1, inference 1, classes 1.
- O87 **Fill and tabulate** (arrays.3): F-49, F-158, F-264. They share at Vector and Matrix. Chunks: arrays 2, overloading 1.
- O88 **Prelude vectors** (arrays.8): F-129, F-183, F-321, F-353. They share ZZ32Vector and StringVector (row 408). Chunks: natives 2, sizes 1, runtime 1.
- O89 **Array literals** (arrays.10): F-181, F-368. They share constructs the code generator has no case for. Chunks: classes 2.
- O90 **Per-type storage** (arrays.11): F-18, F-159, F-270, F-317, F-333. They share unboxed per-type storage and decision A. Chunks: arrays 2, sizes 1, comprises 1, natives 1.
- O91 **What the draft and the restart left unwritten** (spec.5): F-166, F-169, F-319, F-371. They share the restart's standing. Chunks: harness 4.
- O92 **The POPL 2019 paper** (spec.10): F-166, F-271, F-273, F-300. They share P-48's instance rule. Chunks: inference 3, harness 1.
- O93 **Coercion resolution** (spec.11): F-272, F-349. They share choice by specificity among coerced declarations. Chunks: numerals 2.
- O95 **Witness typecase and the factories** (arrays.2): F-57, F-59, F-159, F-229. They share a factory's typecase on a witness and the Number case. Chunks: arrays 2, numerals 1, inference 1.
- O94 **Rows 340 and 890** (rows of `claims-landed-3.md`, item 16): F-37, F-315, F-373. They share label and exit (row 340 with F-37, row 890 with F-315). Chunks: sizes 2, runtime 1.

## 5. Each entry's disposition

One line for each entry, in the order of FACTS. The line gives the disposition, the entry's home subject and whether it owns it, the parts that leave it and the entry that takes each, the claims that move out to the history or the report ("out"), the defects and their rows, and the finding of today's checks. The claims of the kind tests stay with the entry that keeps their subject. A copied gate value is a claim that repeats F-53's counts; it is cut, not moved.

### Execution model

- F-7 · stays as it is: "walk: no static checking" (owner).
- F-9 · rewritten in place: "the compiled runtime: the one library on the compiled path" (owner F-396) · out: detail 3 · defects: row 69 (4); no row named (6); row 833 (7).
- F-11 · rewritten in place: "the compiled runtime: boxing and the cost of loops" (owner) · out: detail 4 · defects: row 305 (5).
- F-12 · split: keeps "the compiled runtime: boxing and the cost of loops" (owner F-11) · parts: "the compiled runtime: the cells of mutable variables and var fields" (6) to F-374 · out: detail 1, 2, 7.
- F-17 · rewritten in place: "the tools: the build and the caches" (owner F-100) · out: history 2 · defects: no row named (1).
- F-18 · split: keeps "the compiled runtime: the class loader's instances" (owner) · parts: "the compiled runtime: sizes at run time" (3) to F-129; "the compiled runtime: boxing and the cost of loops" (5, 6) to F-11; "walk: static-argument inference" (8) to F-141 · out: plan 7; detail 4.
- F-19 · rewritten in place: "the code generator: forking and the range grain" (owner F-350) · out: detail 13 · defects: rows 982, 987 (6) · check: unsettled.
- F-20 · split: keeps "walk: sizes" (owner) · parts: "the specification: sizes" (1) to F-176; "the compiled runtime: sizes at run time" (2) to F-129 · out: detail 7 · defects: row 23 (5); row 254 (6) · check: unsettled.
- F-21 · split: keeps "both paths: the bare Nothing" (owner) · parts: "the specification: instantiation exclusion and the examples it refuses" (4) to F-167 · out: plan 5.
- F-22 · rewritten in place: "both paths: an api and a component of another name" (owner) · out: plan 7; detail 4 · defects: row 320 (1, 5).
- F-23 · rewritten in place: "both paths: source spans of comments" (owner) · out: detail 2 · defects: row 359 (1).
- F-24 · split: keeps "both paths: exceptions that native helpers raise" (owner F-336) · parts: "the library: integer division and division by zero" (4) to F-312 · out: history 2.
- F-25 · split: keeps "the compiled runtime: the class loader's instances" (owner F-18) · parts: "the gate: threads, heaps and JVMs" (5) to F-99 · out: history 2, 4.
- F-26 · rewritten in place: "walk: dispatch on declared domains" (owner) · defects: no row named (5); row 1134 (6); row 478 (9).
- F-27 · rewritten in place: "walk: the load check of a family's cover" (owner) · defects: row 539 (7) · check: cites a thing that is gone.
- F-28 · rewritten in place: "walk: static-argument inference" (owner F-141) · out: history 2 · defects: no row named (3).
- F-29 · split: keeps "walk: comprises clauses" (owner) · parts: "the specification: comprises clauses" (3) to F-171 · out: plan 7 · defects: rows 551, 597 (4); row 598 (5); rows 595, 596 (6).
- F-269 · rewritten in place: "walk: the load check of a family's cover" (owner F-27) · out: history 3; detail 4 · defects: row 342 (1, 5); row 341 (2).
- F-291 · rewritten in place: "the checker: the default bound Any" (owner F-296) · out: history 6; plan 7; detail 4, 10 · defects: row 339 (2); row 1056 (3); row 470 (8).
- F-301 · split: keeps "the code generator: builtinPrimitive bodies and native wrappers" (owner F-298) · parts: "the compiled runtime: boxing and the cost of loops" (3, 6, 7) to F-11 · out: history 4; detail 8 · check: cites a thing that is gone.
- F-302 · rewritten in place: "the compiled runtime: boxing and the cost of loops" (owner F-11) · out: history 4; plan 9; detail 1, 3, 5 · check: cites a thing that is gone.
- F-348 · rewritten in place: "the compiled runtime: component initialization and top-level variables" (owner) · out: history 8; detail 7 · check: unsettled.
- F-350 · rewritten in place: "the code generator: forking and the range grain" (owner) · defects: row 982 (4).
- F-351 · split: keeps "the compiled runtime: transactions and atomic expressions" (owner) · parts: "the code generator: label and exit" (6) to F-373 · out: detail 8 · defects: row 984 (7) · check: cites a thing that is gone.
- F-355 · rewritten in place: "the model program: the Java baseline and the weight reader" (owner) · out: detail 2, 4, 6, 9.
- F-356 · rewritten in place: "the code generator: forking and the range grain" (owner F-350) · out: detail 2, 5, 7.
- F-357 · rewritten in place: "the model program: the Java baseline and the weight reader" (owner F-355) · out: detail 2, 5 · defects: no row named (1).
- F-358 · rewritten in place: "the compiled runtime: boxing and the cost of loops" (owner F-11) · out: detail 3 · defects: row 641 (5).
- F-395 · rewritten in place: "walk: loading native helpers and its own operations" (owner F-299) · out: detail 2.
### The checker and the one library

- F-32 · rewritten in place: "the library: native bindings and their counts" (owner) · out: history 3, 4; detail 7 · check: cites a thing that is gone.
- F-34 · split: keeps "the code generator: what it refuses against the one library" (owner) · parts: "both paths: type assumptions" (4) to F-325 · out: detail 2, 5, 7.
- F-35 · split: keeps "the library: dead sizes in FortressLibrary's api" (owner) · parts: "the checker: sizes" (4) to F-67 · out: history 5; detail 2 · defects: no row named (6).
- F-36 · split: keeps "the compiled runtime: the class loader's instances" (owner F-18) · parts: "the compiled runtime: sizes at run time" (3) to F-129 · defects: no row named (2).
- F-37 · rewritten in place: "the compiled runtime: sizes at run time" (owner F-129) · defects: row 340 (3).
- F-38 · split: keeps "the compiled runtime: sizes at run time" (owner F-129) · parts: "the checker: sizes" (2) to F-67.
- F-39 · rewritten in place: "both paths: operator static parameters" (owner) · out: plan 6; detail 4 · defects: row 366 (5) · check: cites a thing that is gone, unsettled.
- F-40 · merged into F-129: its present claims 2 and 8 are F-129's; the rest is a measurement of designs not built · out: history 1; detail 3, 4, 6, 7.
- F-41 · split: keeps "the compiled runtime: sizes at run time" (owner F-129) · parts: "the checker: sizes" (3) to F-67 · out: plan 5; detail 2.
- F-42 · rewritten in place: "the gate: how the count and distance stages run" (owner F-111) · cut: copied gate value (2, 3) · check: cites a thing that is gone.
- F-43 · rewritten in place: "the checker: speed, memos and memory" (owner F-65) · cut: copied gate value (4) · defects: no row named (1, 3).
- F-44 · rewritten in place: "the checker: instantiation exclusion" (owner) · out: history 6 · defects: row 416 (4); row 458 (7) · check: cites a thing that is gone.
- F-45 · stays as it is: "the specification: instantiation exclusion and the examples it refuses" (owner F-167).
- F-46 · rewritten in place: "the specification: instantiation exclusion and the examples it refuses" (owner F-167) · out: history 3; plan 2, 4, 6 · defects: no row named (5).
- F-47 · rewritten in place: "the specification: instantiation exclusion and the examples it refuses" (owner F-167) · defects: row 331 (4); row 404 (6).
- F-48 · rewritten in place: "the checker: instantiation exclusion" (owner F-44) · out: detail 6 · defects: row 406 (2); row 414 (3).
- F-49 · split: keeps "walk: dispatch on declared domains" (owner F-26) · parts: "the checker: the default bound Any" (2) to F-296 · check: cites a thing that is gone.
- F-50 · stays as it is: "the checker: the overloading rules" (owner F-75).
- F-51 · merged into F-73: one case of F-73's inference with coercion · parts: "the library: the array element bound and algebra" (2) to F-151.
- F-52 · split: keeps "the specification: instantiation exclusion and the examples it refuses" (owner F-167) · parts: "the checker: where clauses and conditional extension" (2) to F-250; "walk: where clauses and conditional extension" (3) to F-148 · out: history 4.
- F-53 · rewritten in place: "the gate: the values of the checker count and the distance" (owner) · out: detail 1, 7 · check: beyond its support.
- F-54 · merged into F-53: it repeats F-53.
- F-55 · merged into F-73: it repeats F-73 and F-137 · defects: row 510 (4).
- F-56 · merged into F-87: one context of F-87's list · out: detail 2.
- F-57 · merged into F-342: its claims repeat F-341, F-342 and F-79 · parts: "the library: the numeral types" (2) to F-79 · defects: no row named (5) · check: unsettled.
- F-58 · rewritten in place: "the model program: under the compiled checker" (owner) · out: history 3, 7, 8; detail 1, 2, 4, 5, 9 · check: unsettled.
- F-59 · rewritten in place: "the library: reductions, their identities and static arguments" (owner) · check: cites a thing that is gone.
- F-60 · stays as it is: "the library: reductions, their identities and static arguments" (owner F-59).
- F-61 · rewritten in place: "the repository: the steps to the switch-over" (owner) · out: history 1, 4; plan 2.
- F-62 · rewritten in place: "the checker: comprises clauses and closed traits" (owner F-72) · defects: rows 595, 596 (3); row 407 (4).
- F-63 · split: keeps "the library: the api's members against its components" (owner F-286) · parts: "the checker: comprises clauses and closed traits" (8) to F-64 · out: history 5, 7 · check: false today, cites a thing that is gone, unsettled.
- F-64 · split: keeps "the checker: comprises clauses and closed traits" (owner F-72) · parts: "the specification: comprises clauses" (4) to F-171 · defects: row 354 (1).
- F-65 · rewritten in place: "the checker: speed, memos and memory" (owner) · out: history 4; detail 2, 5 · check: cites a thing that is gone.
- F-66 · not about the tree: the gate's procedure · out: detail 3 · check: false today, cites a thing that is gone.
- F-67 · rewritten in place: "the checker: sizes" (owner) · defects: row 406 (4) · check: false today.
- F-68 · rewritten in place: "the checker: sizes" (owner F-67) · out: detail 2.
- F-69 · rewritten in place: "the checker: sizes" (owner F-67) · defects: row 400 (2); row 446 (3).
- F-70 · split: keeps "the checker: written static arguments against their bounds" (owner) · parts: "the harness: check keys" (4) to F-98 · defects: row 470 (2).
- F-71 · rewritten in place: "both paths: typecase and its bound names" (owner F-382) · defects: row 460 (1, 2).
- F-72 · rewritten in place: "the checker: comprises clauses and closed traits" (owner) · defects: row 487 (3); row 489 (4); row 490 (5).
- F-73 · split: keeps "the checker: static-argument inference" (owner) · parts: "the checker: choice among a call's declarations" (3) to F-408; "the checker: numeral defaults and types" (5) to F-342 · out: detail 2 · defects: row 507 (6); row 506 (7).
- F-74 · merged into F-341: claims 1 and 2 repeat F-341 · out: history 5 · defects: row 962 (4).
- F-75 · split: keeps "the checker: the overloading rules" (owner) · parts: "the specification: overloading with static parameters" (5) to F-174 · defects: row 1048 (7) · check: false today.
- F-76 · rewritten in place: "the checker: the overloading rules" (owner F-75) · defects: row 546 (3); row 559 (6); row 487 (7); row 547 (8) · check: a row's status disagrees.
- F-77 · rewritten in place: "the checker: the overloading rules" (owner F-75) · out: detail 3 · defects: rows 555, 589 (4) · check: a row's status disagrees.
- F-78 · rewritten in place: "the checker: static-argument inference" (owner F-73) · defects: row 559 (6) · check: cites a thing that is gone.
- F-79 · split: keeps "the library: the numeral types" (owner) · parts: "the checker: numeral defaults and types" (4) to F-342.
- F-80 · split: keeps "the checker: the overloading rules" (owner F-75) · parts: "the checker: speed, memos and memory" (6) to F-65 · defects: row 570 (4).
- F-81 · split: keeps "the library: declarations on the meet, and the Index bound" (owner) · parts: "the library: strings and their concatenation" (3) to F-83 · out: history 5, 6.
- F-82 · split: keeps "the library: ranges" (owner F-133) · parts: "the library: declarations on the meet, and the Index bound" (1) to F-81 · defects: row 603 (4).
- F-83 · rewritten in place: "the library: strings and their concatenation" (owner) · defects: row 607 (6); row 609 (7).
- F-84 · split: keeps "the library: result-only type parameters" (owner) · parts: "the checker: static-argument inference" (3) to F-73 · out: history 2, 7.
- F-85 · rewritten in place: "the library: reductions, their identities and static arguments" (owner F-59) · out: history 5.
- F-86 · rewritten in place: "the code generator: varargs" (owner F-390) · defects: row 604 (3).
- F-87 · rewritten in place: "the checker: the expected type" (owner) · check: cites a thing that is gone.
- F-88 · stays as it is: "the checker: inheritance, override and getters" (owner).
- F-89 · stays as it is: "the library: ranges" (owner F-133).
- F-90 · rewritten in place: "the library: the array element bound and algebra" (owner F-151) · out: history 7; plan 8 · defects: row 661 (6) · check: false today, cites a thing that is gone.
- F-91 · rewritten in place: "the library: ranges" (owner F-133) · defects: row 416 (2); no row named (4).
- F-92 · rewritten in place: "the library: order on tuples" (owner) · defects: row 511 (3).
- F-93 · rewritten in place: "the library: generators and their sizes" (owner) · check: beyond its support.
- F-94 · merged into F-227: the followups merged it into F-227 · parts: "the checker: speed, memos and memory" (3) to F-65 · out: history 2 · check: false today.
- F-220 · merged into F-285: one line of the library that F-285 and F-228 cover · cut: copied gate value (2).
- F-221 · rewritten in place: "the checker: the expected type" (owner F-87) · defects: row 705 (5).
- F-225 · split: keeps "the checker: self types and intersections" (owner) · parts: "the code generator: casts of self and intersection receivers" (9, 11, 12) to F-377; "walk: where clauses and conditional extension" (10) to F-148 · defects: row 1094 (5); row 355 (13).
- F-226 · stays as it is: "the checker: inheritance, override and getters" (owner F-88).
- F-227 · rewritten in place: "the checker: comprises clauses and closed traits" (owner F-72) · out: history 5 · defects: row 712 (4); row 713 (6) · check: false today.
- F-231 · rewritten in place: "the checker: speed, memos and memory" (owner F-65) · out: history 2, 4; detail 3.
- F-232 · rewritten in place: "both paths: deterministic order" (owner) · defects: row 430 (5).
- F-233 · stays as it is: "the code generator: local functions" (owner F-320).
- F-235 · rewritten in place: "the checker: speed, memos and memory" (owner F-65) · out: detail 3, 4 · check: beyond its support.
- F-236 · rewritten in place: "the gate: the method-size guard" (owner) · out: detail 3.
- F-237 · rewritten in place: "the checker: well-formedness errors" (owner) · out: detail 7 · cut: copied gate value (6) · defects: row 776 (3) · check: beyond its support.
- F-240 · rewritten in place: "the gate: how the count and distance stages run" (owner F-111) · out: history 2, 3, 5; detail 1, 4.
- F-242 · rewritten in place: "the library: reductions, their identities and static arguments" (owner F-59) · out: history 5, 7.
- F-243 · merged into F-242: the history of the fusion pairs that F-242 holds · out: history 1, 4, 6.
- F-244 · merged into F-250: a summary of F-250, F-251, F-255 and F-256 · out: plan 5 · defects: row 773 (2); rows 751, 752, 775 (6).
- F-245 · merged into F-281: its lasting claim, every operator checked, is F-281's; the rest is the breakdown of one run · out: history 1, 3, 6; detail 4 · defects: row 611 (5) · check: beyond its support.
- F-250 · rewritten in place: "the checker: where clauses and conditional extension" (owner) · out: history 5 · defects: row 470 (3).
- F-251 · split: keeps "the checker: where clauses and conditional extension" (owner F-250) · parts: "the library: AnyList and List" (2) to a new entry; "walk: where clauses and conditional extension" (6) to F-148 · out: history 7 · defects: row 752 (5) · check: false today.
- F-254 · merged into F-370: F-370 owns the wider rule · parts: "both paths: deterministic order" (4) to F-232 · out: history 5; detail 6 · check: unsettled.
- F-255 · split: keeps "the checker: where clauses and conditional extension" (owner F-250) · parts: "the library: AnyList and List" (8) to a new entry · out: history 9 · defects: row 781 (3); row 773 (5); row 774 (6); no row named (7) · check: unsettled.
- F-256 · rewritten in place: "the checker: where clauses and conditional extension" (owner F-250) · out: history 9 · defects: no row named (3); row 470 (6); row 777 (7); row 778 (8).
- F-265 · rewritten in place: "the checker: the default bound Any" (owner F-296) · out: detail 5, 7 · defects: row 471 (2) · check: beyond its support, unsettled.
- F-266 · split: keeps "the checker: the export check and types taken from the api" (owner F-282) · parts: "the specification: type inference" (2) to F-173 · out: history 3; detail 7 · defects: row 405 (4); row 1032 (5) · check: a row's status disagrees.
- F-267 · split: keeps "the checker: inheritance, override and getters" (owner F-88) · parts: "both paths: operator static parameters" (2) to F-39 · out: history 4; detail 3 · defects: no row named (1) · check: cites a thing that is gone, unsettled.
- F-268 · rewritten in place: "the compiled runtime: the class loader's instances" (owner F-18) · out: detail 2 · defects: row 889 (3) · check: false today, cites a thing that is gone.
- F-276 · rewritten in place: "the library: strings and their concatenation" (owner F-83) · out: history 3; detail 4 · defects: row 342 (5) · check: a row's status disagrees.
- F-277 · rewritten in place: "the checker: the overloading rules" (owner F-75) · out: history 6; detail 5 · defects: row 786 (7); row 713 (8) · check: cites a thing that is gone.
- F-278 · rewritten in place: "the library: declarations on the meet, and the Index bound" (owner F-81) · out: history 3 · defects: row 805 (7); row 806 (8).
- F-281 · split: keeps "the checker: the overloading rules" (owner F-75) · parts: "the checker: the export check and types taken from the api" (4) to F-282; "the checker: imports" (5-7) to a new entry; "the checker: where clauses and conditional extension" (8) to F-250 · out: detail 3 · cut: copied gate value (2, 10) · defects: row 813 (6); row 814 (7).
- F-282 · split: keeps "the checker: the export check and types taken from the api" (owner) · parts: "the library: the api's members against its components" (5-7) to F-286 · cut: copied gate value (8) · defects: row 839 (2).
- F-285 · split: keeps "the library: reductions, their identities and static arguments" (owner F-59) · parts: "walk: reduction instantiation" (9, 10) to F-228 · out: detail 4 · cut: copied gate value (7) · defects: row 824 (10) · check: false today.
- F-286 · rewritten in place: "the library: the api's members against its components" (owner) · cut: copied gate value (4) · defects: row 607 (5) · check: cites a thing that is gone.
- F-287 · split: keeps "the checker: the export check and types taken from the api" (owner F-282) · parts: "the library: the api's members against its components" (2) to F-286 · out: history 4; detail 3 · defects: row 834 (5); rows 835, 836 (6).
- F-288 · split: keeps "the gate: how the count and distance stages run" (owner F-111) · parts: "the library: AnyList and List" (4, 6) to a new entry · out: detail 3 · cut: copied gate value (1, 2) · defects: row 839 (5).
- F-289 · merged into F-111: the setting of the stages that F-111 describes · out: history 3; detail 2.
- F-290 · rewritten in place: "the checker: errors outside the distance" (owner) · out: history 6; detail 1, 2, 4, 5, 7 · defects: row 830 (3).
- F-292 · merged into F-296: one run under F-296's bound · out: history 1-3 · check: false today, cites a thing that is gone.
- F-293 · split: keeps "the repository: CompilerSystem and the compiler's prelude" (owner) · parts: "the checker: imports" (2) to a new entry · out: detail 3.
- F-294 · rewritten in place: "the specification: the export rule" (owner) · out: history 2; detail 8 · defects: row 844 (4); row 839 (5); row 842 (6); row 834 (7).
- F-296 · rewritten in place: "the checker: the default bound Any" (owner) · out: detail 2 · defects: rows 339, 832 (7) · check: false today.
- F-297 · split: keeps "the checker: the export check and types taken from the api" (owner F-282) · parts: "the library: the api's members against its components" (2) to F-286 · out: detail 3, 6 · defects: row 842 (5); row 841 (7).
- F-298 · split: keeps "the code generator: builtinPrimitive bodies and native wrappers" (owner) · parts: "the checker: the types of native helpers" (4) to F-321 · defects: rows 849, 865, 884 (6); rows 882, 883 (7) · check: a row's status disagrees.
- F-299 · split: keeps "walk: loading native helpers and its own operations" (owner) · parts: "the library: native bindings and their counts" (2) to F-32 · out: detail 9 · check: false today.
- F-303 · split: keeps "the library: native bindings of the number types" (owner F-323) · parts: "walk: loading native helpers and its own operations" (1) to F-299 · out: detail 5.
- F-306 · split: keeps "the library: native bindings of the number types" (owner F-323) · parts: "the library: integer division and division by zero" (3) to F-312; "walk: loading native helpers and its own operations" (7) to F-299 · out: detail 4, 6 · defects: row 348 (5).
- F-307 · split: keeps "the library: native bindings of the number types" (owner F-323) · parts: "the checker: the types of native helpers" (3) to F-321; "the library: native bindings of strings" (6) to a new entry · out: detail 2 · defects: row 857 (5) · check: cites a thing that is gone.
- F-308 · split: keeps "the code generator: builtinPrimitive bodies and native wrappers" (owner F-298) · parts: "the checker: the types of native helpers" (4) to F-321; "the library: native bindings of the number types" (5, 7) to F-323; "the library: integer division and division by zero" (6) to F-312 · out: detail 2 · defects: rows 885, 886 (3).
- F-309 · rewritten in place: "the code generator: builtinPrimitive bodies and native wrappers" (owner F-298) · out: history 5; detail 6.
- F-310 · split: keeps "the library: native bindings of the number types" (owner F-323) · parts: "walk: loading native helpers and its own operations" (2) to F-299; "the repository: CompilerSystem and the compiler's prelude" (6) to F-293 · out: detail 4 · cut: copied gate value (3).
- F-311 · rewritten in place: "the library: native bindings of the number types" (owner F-323) · out: history 4; detail 5.
- F-312 · split: keeps "the library: integer division and division by zero" (owner) · parts: "the library: native bindings of the number types" (1) to F-323; "both paths: exceptions that native helpers raise" (5) to F-336 · out: detail 3, 6.
- F-313 · split: keeps "the library: integer conversions" (owner F-331) · parts: "the library: native bindings of the number types" (2) to F-323 · out: detail 3, 4 · defects: row 886 (5).
- F-314 · rewritten in place: "the library: native bindings of the number types" (owner F-323) · out: detail 3 · defects: row 75 (4); row 887 (5).
- F-315 · split: keeps "the code generator: try, forbid and modifiers" (owner) · parts: "the compiled runtime: the class loader's instances" (1, 6) to F-18 · out: detail 4 · defects: row 890 (3); row 889 (6) · check: cites a thing that is gone.
- F-320 · rewritten in place: "the code generator: local functions" (owner) · out: history 5 · defects: row 304 (3).
- F-321 · split: keeps "the checker: the types of native helpers" (owner) · parts: "the library: native bindings of strings" (3, 4) to a new entry; "the repository: CompilerSystem and the compiler's prelude" (5) to F-293 · out: history 8; detail 6, 7 · defects: no row named (2).
- F-322 · split: keeps "the checker: the types of native helpers" (owner F-321) · parts: "walk: loading native helpers and its own operations" (2) to F-299 · out: plan 4; detail 5 · defects: no row named (3).
- F-323 · rewritten in place: "the library: native bindings of the number types" (owner) · defects: no row named (4); row 872 (7).
- F-325 · rewritten in place: "both paths: type assumptions" (owner) · out: detail 4, 10 · defects: row 818 (6, 7); rows 919, 920, 922 (8).
- F-327 · split: keeps "the library: native bindings of the number types" (owner F-323) · parts: "the library: native bindings and their counts" (1, 2, 6) to F-32 · out: history 4; detail 3, 5.
- F-328 · split: keeps "walk: loading native helpers and its own operations" (owner F-299) · parts: "the library: native bindings and their counts" (1) to F-32; "both paths: a value's printed form and type name" (3, 4) to F-123.
- F-330 · merged into F-332: the writer's twin of F-332's reader · parts: "walk: loading native helpers and its own operations" (2) to F-299; "the checker: the types of native helpers" (3) to F-321 · out: detail 8.
- F-332 · split: keeps "the library: I/O streams" (owner) · parts: "walk: loading native helpers and its own operations" (2) to F-299.
- F-333 · split: keeps "the library: array stores" (owner) · parts: "the compiled runtime: transactions and atomic expressions" (4) to F-351; "the checker: the types of native helpers" (5) to F-321; "walk: loading native helpers and its own operations" (6) to F-299 · out: plan 2 · defects: row 466 (7).
- F-334 · rewritten in place: "the checker: choice among a call's declarations" (owner F-408) · out: history 5; detail 2 · cut: copied gate value (6).
- F-335 · split: keeps "the compiled runtime: transactions and atomic expressions" (owner F-351) · parts: "the library: native bindings and their counts" (1) to F-32; "walk: loading native helpers and its own operations" (2) to F-299 · defects: row 82 (6).
- F-336 · rewritten in place: "both paths: exceptions that native helpers raise" (owner) · out: detail 6 · defects: row 1103 (3).
- F-337 · rewritten in place: "the code generator: builtinPrimitive bodies and native wrappers" (owner F-298) · out: detail 4.
- F-338 · rewritten in place: "the code generator: the classes of traits and objects" (owner F-372) · out: history 3; detail 2.
- F-342 · split: keeps "the checker: numeral defaults and types" (owner) · parts: "the checker: sizes" (6) to F-67 · out: detail 10 · defects: row 963 (9).
- F-344 · split: keeps "walk: static-argument inference" (owner F-141) · parts: "both paths: a value's printed form and type name" (2, 6) to F-123 · out: detail 3.
- F-352 · merged into F-396: a probe whose present half F-396 owns · parts: "the code generator: the classes of traits and objects" (8) to F-372 · out: history 1, 4-6, 10, 11; detail 3 · defects: rows 866, 874, 942, 993, 994, 995 (7).
- F-353 · merged into F-381: a probe whose present half F-381 owns · parts: "both paths: exceptions that native helpers raise" (7) to F-336 · out: history 1, 3-5, 11; detail 6 · defects: row 1101 (10).
- F-364 · split: keeps "the checker: the expected type" (owner F-87) · parts: "the library: reductions, their identities and static arguments" (5) to F-59 · out: history 9; detail 10 · defects: row 1008 (6); row 1007 (7); row 1015 (8).
- F-365 · split: keeps "the checker: the expected type" (owner F-87) · parts: "the checker: speed, memos and memory" (7) to F-65 · out: plan 8 · defects: rows 1009, 1010 (9); rows 1012, 1013 (10).
- F-370 · rewritten in place: "the checker: the export check and types taken from the api" (owner F-282) · out: detail 8 · defects: row 841 (4); row 405 (6); row 1032 (7) · check: a row's status disagrees.
- F-376 · split: keeps "the code generator: template dispatchers and generic arms" (owner F-136) · parts: "the checker: choice among a call's declarations" (4) to F-408 · out: detail 5 · defects: row 699 (3).
- F-381 · stays as it is: "the compiled runtime: the one library on the compiled path" (owner F-396).
- F-390 · split: keeps "the code generator: varargs" (owner) · parts: "the compiled runtime: the one library on the compiled path" (8-10) to F-396 · out: detail 11 · defects: no row named (2); row 1086 (5); row 1085 (6); row 1098 (10) · check: a row's status disagrees.
- F-391 · split: keeps "the code generator: the classes of traits and objects" (owner F-372) · parts: "both paths: type assumptions" (4, 5) to F-325 · defects: row 1088 (5).
- F-392 · rewritten in place: "the code generator: generic methods on a type-variable receiver" (owner) · defects: row 1093 (3).
- F-393 · rewritten in place: "the code generator: bytecode verification and local scope" (owner) · out: history 2, 3; detail 4, 6 · defects: row 1054 (5) · check: a row's status disagrees.
- F-394 · rewritten in place: "the checker: inheritance, override and getters" (owner F-88) · defects: row 1094 (3); row 1097 (4); rows 375, 1097 (5); row 1095 (7).
- F-396 · split: keeps "the compiled runtime: the one library on the compiled path" (owner) · parts: "the library: the number types as value objects" (5) to F-379; "both paths: exceptions that native helpers raise" (6, 10) to F-336; "the checker: choice among a call's declarations" (14) to F-408 · defects: row 1098 (7); row 1101 (8); row 1102 (9); row 1103 (10); row 1137 (11); rows 643, 1138 (12); row 1140 (13) · check: false today, beyond its support, a row's status disagrees.
- F-408 · rewritten in place: "the checker: choice among a call's declarations" (owner) · defects: rows 1136, 1143, 1145 (3); row 1136 (7).
- F-409 · rewritten in place: "the code generator: the classes of traits and objects" (owner F-372) · out: history 5; detail 3 · defects: no row named (6).
### The harness and the gate

- F-97 · rewritten in place: "the gate: step 7, the interpreter's suite compiled" (owner) · out: history 4, 5.
- F-98 · rewritten in place: "the harness: check keys" (owner) · out: detail 5 · defects: no row named (3).
- F-99 · rewritten in place: "the gate: threads, heaps and JVMs" (owner) · defects: row 640 (4).
- F-100 · rewritten in place: "the tools: the build and the caches" (owner) · out: detail 2 · check: false today.
- F-101 · stays as it is: "the tools: the build and the caches" (owner F-100).
- F-102 · rewritten in place: "the harness: XXX tests and refusals at load" (owner) · out: detail 5 · check: beyond its support.
- F-103 · stays as it is: "the harness: XXX tests and refusals at load" (owner F-102).
- F-104 · split: keeps "the harness: XXX tests and refusals at load" (owner F-102) · parts: "the harness: check keys" (1) to F-98; "the code generator: what it refuses against the one library" (2) to F-34.
- F-105 · stays as it is: "the gate: testSystem's shards" (owner).
- F-106 · rewritten in place: "the code generator: builtinPrimitive bodies and native wrappers" (owner F-298) · out: history 6; detail 5 · defects: row 368 (3).
- F-107 · rewritten in place: "the gate: threads, heaps and JVMs" (owner F-99) · out: history 7 · defects: row 67 (2).
- F-108 · split: keeps "both paths: deterministic order" (owner F-232) · parts: "the harness: XXX tests and refusals at load" (4) to F-102 · defects: row 430 (1).
- F-109 · split: keeps "the code generator: what it refuses against the one library" (owner F-34) · parts: "the gate: step 7, the interpreter's suite compiled" (5) to F-97 · out: detail 4 · check: false today.
- F-111 · rewritten in place: "the gate: how the count and distance stages run" (owner) · out: detail 3, 6 · check: false today, cites a thing that is gone.
- F-112 · not about the tree: the skill's `tests-writing.md` gives the rule · out: history 5; detail 4.
- F-113 · stays as it is: "the harness: another build's caches" (owner).
- F-114 · split: keeps "the harness: the specification's examples" (owner) · parts: "walk: static-argument inference" (4) to F-141 · check: false today, unsettled.
- F-203 · split: keeps "the gate: threads, heaps and JVMs" (owner F-99) · parts: "the gate: how the count and distance stages run" (5) to F-111 · out: detail 4.
- F-234 · not about the tree: how workers run commands, one measurement · out: plan 5; detail 3.
- F-283 · rewritten in place: "the harness: the team's demos outside the gate" (owner) · out: detail 2, 6 · defects: row 986 (4); row 817 (5).
- F-295 · rewritten in place: "the gate: how the count and distance stages run" (owner F-111) · out: detail 2 · defects: no row named (4).
- F-354 · rewritten in place: "both paths: deterministic order" (owner F-232) · out: detail 4, 6 · defects: row 996 (2) · check: beyond its support.
- F-383 · stays as it is: "the harness: XXX tests and refusals at load" (owner F-102).
- F-404 · rewritten in place: "the tools: the build and the caches" (owner F-100) · out: history 3; detail 4.
### Landed semantics

- F-117 · stays as it is: "the compiled runtime: the cells of mutable variables and var fields" (owner F-374).
- F-118 · split: keeps "the code generator: numeral constants" (owner F-340) · parts: "the checker: numeral defaults and types" (1) to F-342; "both paths: a value's printed form and type name" (7) to F-123 · defects: no row named (3).
- F-119 · split: keeps "the library: the scalar extension" (owner) · parts: "walk: the load check of a family's cover" (4) to F-27.
- F-120 · stays as it is: "the compiled runtime: component initialization and top-level variables" (owner F-348).
- F-121 · merged into F-62: one clause, AnyIntegral's comprises, whose present reading F-62 holds · out: history 6; plan 7 · defects: row 831 (4); no row named (5).
- F-122 · split: keeps "the library: rounding of floats" (owner) · parts: "walk: a numeral's type at its place" (3) to F-341 · out: detail 5.
- F-123 · split: keeps "both paths: a value's printed form and type name" (owner) · parts: "walk: static-argument inference" (5) to F-141; "the checker: numeral defaults and types" (6) to F-342 · defects: row 321 (3); row 363 (4).
- F-124 · split: keeps "the library: integer shifts" (owner) · parts: "the library: integer conversions" (2) to F-331; "the library: fixed-width overflow" (4, 5) to F-132 · out: detail 6.
- F-125 · merged into F-124: walk's twin of F-124, in the same words.
- F-126 · rewritten in place: "the library: integer shifts" (owner F-124) · out: history 4.
- F-128 · rewritten in place: "walk: coercion at its type checks" (owner) · defects: row 387 (3); row 513 (4); row 395 (5); row 1083 (6); row 1084 (7); no row named (8).
- F-129 · split: keeps "the compiled runtime: sizes at run time" (owner) · parts: "the code generator: template dispatchers and generic arms" (6, 10) to F-136 · defects: row 962 (5); row 307 (7); row 408 (9); row 413 (10); row 414 (11); row 416 (12) · check: a row's status disagrees.
- F-130 · rewritten in place: "the library: wrapping operators" (owner) · defects: row 348 (3); row 700 (4).
- F-131 · split: keeps "the library: the flat number types" (owner) · parts: "the checker: numeral defaults and types" (3) to F-342; "walk: a numeral's type at its place" (4) to F-341; "walk: reduction instantiation" (9, 10) to F-228 · out: plan 7 · defects: row 436 (10).
- F-132 · rewritten in place: "the library: fixed-width overflow" (owner) · defects: row 453 (5); rows 523, 524, 525 (6).
- F-133 · rewritten in place: "the library: ranges" (owner) · defects: rows 479, 481, 514 (4); row 480 (5); row 522 (8).
- F-134 · rewritten in place: "both paths: typecase and its bound names" (owner F-382) · defects: rows 340, 498 (3); no row named (5).
- F-135 · split: keeps "the code generator: template dispatchers and generic arms" (owner F-136) · parts: "the code generator: forking and the range grain" (4) to F-350.
- F-136 · rewritten in place: "the code generator: template dispatchers and generic arms" (owner) · out: history 8 · defects: no row named (3, 4); row 499 (5); row 495 (6); row 496 (7).
- F-137 · rewritten in place: "walk: static-argument inference" (owner F-141) · out: detail 3 · defects: row 509 (5); rows 510, 511 (6); no row named (7).
- F-138 · rewritten in place: "the library: integer MIN and MAX" (owner) · defects: row 442 (5) · check: a row's status disagrees.
- F-139 · rewritten in place: "the library: the flat number types" (owner F-131) · defects: row 387 (3); row 528 (4); row 529 (5).
- F-140 · split: keeps "the checker: sizes" (owner F-67) · parts: "walk: sizes" (3, 4, 8, 11) to F-20 · out: plan 10 · defects: row 675 (6); row 527 (8); row 962 (9); no row named (11).
- F-141 · split: keeps "walk: static-argument inference" (owner) · parts: "walk: reduction instantiation" (6, 7) to F-228 · out: plan 14 · defects: rows 591, 616 (10); row 612 (11); row 587 (12); row 589 (13).
- F-142 · rewritten in place: "walk: the load check of a family's cover" (owner F-27) · out: detail 5 · defects: row 611 (4).
- F-143 · merged into F-141: the exception, an F-bounded parameter left open, of F-141's rule; its reduction claims go to F-228 · parts: "walk: reduction instantiation" (2, 3) to F-228 · out: detail 5 · defects: row 716 (3); row 663 (4); row 825 (6).
- F-144 · split: keeps "walk: reduction instantiation" (owner F-228) · parts: "the library: reductions, their identities and static arguments" (1, 4) to F-59 · out: detail 7 · defects: row 665 (3) · check: a row's status disagrees.
- F-145 · split: keeps "walk: the load check of a family's cover" (owner F-27) · parts: "the checker: inheritance, override and getters" (6, 7) to F-88 · defects: row 665 (4); row 728 (5); row 725 (7).
- F-146 · rewritten in place: "the checker: sizes" (owner F-67) · defects: row 683 (5); row 767 (6); row 675 (7).
- F-147 · rewritten in place: "walk: the load check of a family's cover" (owner F-27) · defects: row 693 (6).
- F-148 · rewritten in place: "walk: where clauses and conditional extension" (owner) · out: detail 2.
- F-222 · rewritten in place: "walk: sizes" (owner F-20) · defects: row 675 (4).
- F-228 · split: keeps "walk: reduction instantiation" (owner) · parts: "the library: reductions, their identities and static arguments" (6) to F-59 · out: history 7 · defects: row 716 (8); row 717 (9); rows 510, 705 (10).
- F-230 · rewritten in place: "the library: IntMap's union" (owner) · out: detail 3.
- F-239 · rewritten in place: "walk: if conditions" (owner) · defects: row 746 (5).
- F-248 · merged into F-242: a probe of the generic distribute beside F-242's fusion pairs · out: history 4 · defects: row 21 (3); row 744 (5).
- F-249 · rewritten in place: "the library: strings and their concatenation" (owner F-83) · out: history 6.
- F-252 · split: keeps "walk: the load check of a generic beside a plain declaration" (owner) · parts: "walk: dispatch on declared domains" (17) to F-26 · defects: no row named (5); row 416 (11); row 539 (13) · check: beyond its support.
- F-253 · rewritten in place: "walk: dispatch on declared domains" (owner F-26) · defects: row 1134 (3); no row named (8).
- F-257 · rewritten in place: "walk: the load check of a generic beside a plain declaration" (owner F-252) · defects: rows 539, 779 (5).
- F-258 · split: keeps "walk: the load check of a generic beside a plain declaration" (owner F-252) · parts: "the checker: the overloading rules" (4, 6) to F-75 · out: detail 3, 5 · defects: row 786 (6); row 787 (7); row 788 (8).
- F-259 · split: keeps "both paths: extends Any as Object" (owner) · parts: "both paths: a value's printed form and type name" (4-6) to F-123 · out: history 7.
- F-261 · merged into F-331: a consequence of F-331 and F-263 · parts: "the library: integer powers" (2, 3) to F-263 · defects: no row named (3).
- F-262 · split: keeps "both paths: the fold of numerals" (owner F-339) · parts: "the checker: numeral defaults and types" (1, 3) to F-342; "the specification: static numerals" (2) to F-345 · out: detail 8.
- F-263 · rewritten in place: "the library: integer powers" (owner) · out: detail 7 · defects: row 441 (8); row 523 (9).
- F-270 · split: keeps "the checker: comprises clauses and closed traits" (owner F-72) · parts: "walk: comprises clauses" (4) to F-29 · out: plan 5; detail 2 · defects: row 307 (6); row 682 (7) · check: cites a thing that is gone.
- F-274 · split: keeps "walk: the load check of a generic beside a plain declaration" (owner F-252) · parts: "the checker: the overloading rules" (5) to F-75 · defects: no row named (2).
- F-275 · split: keeps "walk: the load check of a generic beside a plain declaration" (owner F-252) · parts: "the checker: the overloading rules" (6) to F-75.
- F-280 · rewritten in place: "the library: equality and equivalence" (owner) · defects: row 807 (2).
- F-304 · merged into F-340: it says nothing that F-79 and F-340 do not · parts: "the specification: static numerals" (4) to F-345 · out: detail 2, 3.
- F-305 · rewritten in place: "the library: GCD, LCM and CHOOSE" (owner F-316) · out: history 5; detail 6.
- F-316 · split: keeps "the library: GCD, LCM and CHOOSE" (owner) · parts: "the library: fixed-width overflow" (4) to F-132; "the library: ranges" (6) to F-133 · defects: row 887 (3).
- F-318 · rewritten in place: "walk: the load check of a generic beside a plain declaration" (owner F-252) · out: history 5 · defects: row 999 (6); row 893 (7); row 894 (8).
- F-324 · split: keeps "the library: the flat number types" (owner F-131) · parts: "the library: equality and equivalence" (4, 5) to F-280 · defects: no row named (3).
- F-326 · split: keeps "the library: equality and equivalence" (owner F-280) · parts: "walk: a numeral's type at its place" (5) to F-341 · out: detail 2 · defects: row 908 (4); row 923 (7).
- F-329 · rewritten in place: "both paths: character literals and Char's asExprString" (owner) · out: detail 2 · defects: row 924 (4).
- F-331 · rewritten in place: "the library: integer conversions" (owner) · out: detail 2 · defects: row 349 (7).
- F-339 · rewritten in place: "both paths: the fold of numerals" (owner) · out: detail 2.
- F-340 · rewritten in place: "the code generator: numeral constants" (owner) · out: detail 3, 4 · defects: row 957 (6).
- F-341 · split: keeps "walk: a numeral's type at its place" (owner) · parts: "walk: static-argument inference" (6) to F-141 · out: detail 7.
- F-343 · rewritten in place: "both paths: string literals and their identity" (owner) · defects: no row named (4).
- F-347 · split: keeps "the code generator: numeral constants" (owner F-340) · parts: "the compiled runtime: component initialization and top-level variables" (6) to F-348; "walk: a numeral's type at its place" (7) to F-341 · out: detail 2 · defects: row 957 (5).
- F-349 · split: keeps "walk: choice among declarations by coercion" (owner) · parts: "the specification: coercion resolution" (2) to F-272 · out: detail 6.
- F-362 · split: keeps "both paths: the sum and product signs and operator headers" (owner) · parts: "the model program: its lines on both paths" (7) to a new entry · out: detail 8, 9 · defects: row 42 (4).
- F-363 · split: keeps "both paths: math items after a primary" (owner) · parts: "the model program: its lines on both paths" (8) to a new entry · out: history 6 · defects: no row named (9).
- F-366 · split: keeps "both paths: a numeral at a call" (owner) · parts: "the library: equality and equivalence" (7) to F-280; "the model program: its lines on both paths" (11) to a new entry · out: detail 16 · defects: rows 528, 1059 (5); row 1016 (14); row 1017 (15).
- F-367 · rewritten in place: "walk: a generic function as a value" (owner) · out: detail 10 · defects: row 1021 (5); row 1019 (7); row 1018 (8); row 1020 (9).
- F-369 · split: keeps "both paths: tuple bindings and tuple parameters" (owner) · parts: "the model program: its lines on both paths" (7) to a new entry · out: history 10, 11; detail 8 · defects: row 1011 (6).
- F-372 · rewritten in place: "the code generator: the classes of traits and objects" (owner) · out: history 3, 7 · defects: row 1037 (6).
- F-373 · rewritten in place: "the code generator: label and exit" (owner) · out: history 7; detail 2 · defects: row 1042 (9); row 1040 (10); row 1041 (11); row 890 (12); row 322 (13); row 340 (14).
- F-374 · split: keeps "the compiled runtime: the cells of mutable variables and var fields" (owner) · parts: "the compiled runtime: transactions and atomic expressions" (7, 8) to F-351 · out: history 4; detail 11 · defects: row 641 (5); row 1043 (8); row 112 (10).
- F-375 · rewritten in place: "walk: the load check of a generic beside a plain declaration" (owner F-252) · out: history 10 · defects: row 1044 (4); row 550 (5); row 697 (6).
- F-377 · split: keeps "the code generator: casts of self and intersection receivers" (owner) · parts: "the checker: self types and intersections" (7) to F-225 · out: history 3; detail 2 · defects: row 1070 (8); row 307 (9).
- F-378 · split: keeps "both paths: tuple bindings and tuple parameters" (owner F-369) · parts: "the compiled runtime: the class loader's instances" (4) to F-18 · defects: row 1054 (7); row 1055 (8); row 1056 (9).
- F-380 · rewritten in place: "the checker: numeral defaults and types" (owner F-342) · defects: row 1074 (4); row 1075 (5).
- F-382 · rewritten in place: "both paths: typecase and its bound names" (owner) · defects: row 1064 (6).
- F-384 · split: keeps "the compiled runtime: the class loader's instances" (owner F-18) · parts: "both paths: typecase and its bound names" (2, 7) to F-382 · out: history 3; detail 5 · defects: row 1067 (7).
- F-385 · rewritten in place: "the compiled runtime: the class loader's instances" (owner F-18) · out: history 2 · defects: row 1052 (4).
- F-386 · split: keeps "the code generator: casts of self and intersection receivers" (owner F-377) · parts: "the checker: self types and intersections" (2, 7) to F-225 · out: detail 6 · defects: row 1072 (7).
- F-387 · merged into F-363: one subject over both paths with F-363.
- F-388 · rewritten in place: "the library: the number types as value objects" (owner F-379) · defects: row 1081 (8); row 1082 (9).
- F-389 · rewritten in place: "the code generator: closure class names" (owner) · out: history 4; detail 2.
- F-397 · rewritten in place: "both paths: the fold of numerals" (owner F-339) · out: detail 3.
- F-398 · merged into F-369: walk's twin of F-369; its math-item claims go to F-363 · parts: "both paths: math items after a primary" (1) to F-363 · out: detail 2, 4 · defects: row 1105 (9).
- F-399 · rewritten in place: "the code generator: the classes of traits and objects" (owner F-372) · out: detail 3 · defects: row 724 (5); row 594 (6).
- F-400 · split: keeps "the code generator: the classes of traits and objects" (owner F-372) · parts: "the checker: inheritance, override and getters" (4, 6, 7) to F-88 · out: detail 3 · defects: row 1106 (5); row 1107 (6); row 1108 (7); row 1109 (8).
- F-401 · rewritten in place: "the compiled runtime: transactions and atomic expressions" (owner F-351) · out: detail 2 · defects: row 1041 (5); rows 1110, 1111 (6).
- F-402 · split: keeps "both paths: the fold of numerals" (owner F-339) · parts: "the specification: static numerals" (2, 4) to F-345 · out: history 6; detail 3.
- F-403 · split: keeps "the library: equality and equivalence" (owner F-280) · parts: "walk: dispatch on declared domains" (7, 10) to F-26 · out: detail 3, 6, 8 · defects: row 1118 (10); row 1121 (11).
- F-405 · rewritten in place: "walk: the load check of a generic beside a plain declaration" (owner F-252) · defects: row 1134 (4); row 1133 (6); row 780 (7); row 1139 (8); row 1126 (11); row 744 (12); row 1123 (13).
- F-406 · split: keeps "the code generator: the classes of traits and objects" (owner F-372) · parts: "the checker: self types and intersections" (7) to F-225 · out: detail 6.
- F-407 · rewritten in place: "both paths: the four numbers of a numeral coercion" (owner) · defects: row 1131 (7); row 1132 (8).
### The library's arrays and algebra

- F-151 · split: keeps "the library: the array element bound and algebra" (owner) · parts: "the library: array factories and the witness typecase" (8) to F-229 · out: history 12; plan 5.
- F-152 · rewritten in place: "the library: the array element bound and algebra" (owner F-151) · defects: row 292 (3); row 371 (5); row 24 (6).
- F-154 · rewritten in place: "the library: array products and shapes" (owner) · out: history 4.
- F-155 · rewritten in place: "walk: the load check of a generic beside a plain declaration" (owner F-252) · out: history 4 · defects: row 416 (1); no row named (5) · check: beyond its support, a row's status disagrees.
- F-156 · rewritten in place: "the library: the array vocabulary" (owner) · out: plan 3; detail 4 · defects: no row named (1) · check: cites a thing that is gone.
- F-157 · rewritten in place: "the library: array views and slices" (owner) · out: history 3 · defects: row 298 (4); row 299 (5).
- F-158 · rewritten in place: "the library: fill and tabulate" (owner) · out: detail 6.
- F-159 · merged into F-229: probes whose present state F-229 holds · out: history 1, 4-6, 10; plan 7, 9; detail 3.
- F-229 · split: keeps "the library: array factories and the witness typecase" (owner) · parts: "the library: the array element bound and algebra" (4) to F-151; "walk: static-argument inference" (6) to F-141 · out: history 7 · cut: copied gate value (9) · defects: row 729 (5).
- F-264 · split: keeps "the library: array casts" (owner) · parts: "the library: fill and tabulate" (6) to F-158 · out: history 10; detail 3 · cut: copied gate value (7).
- F-279 · rewritten in place: "the library: array views and slices" (owner F-157) · out: detail 2 · defects: row 808 (3, 4).
- F-284 · rewritten in place: "the library: generators and their sizes" (owner F-93) · out: detail 3.
- F-317 · not about the tree: a provenance of a comment, for `reviews/array-design-ways.md` · parts: "the library: the scalar extension" (2) to F-119 · out: plan 4; detail 5.
- F-361 · merged into F-379: the probe of which F-379 is the landed state · out: history 1, 3-5, 7; detail 2 · check: cites a thing that is gone.
- F-368 · rewritten in place: "walk: array literals" (owner) · out: detail 3 · defects: no row named (5); row 1022 (6); row 49 (8); rows 1024, 1025 (9).
- F-379 · split: keeps "the library: the number types as value objects" (owner) · parts: "walk: the load check of a generic beside a plain declaration" (6-8) to F-252 · out: detail 3 · defects: rows 697, 1044 (8).
### The specification and the repository's lineage

- F-162 · not about the tree: its rule is in the skill's `references/specification.md`.
- F-163 · not about the tree: the skill's `references/specification.md` says how to cite each copy · out: detail 4.
- F-165 · rewritten in place: "the repository: lineage and the Java 9 port" (owner) · out: history 1, 2, 6; plan 5.
- F-166 · not about the tree: which text governs is the curator's decision · out: history 2.
- F-167 · rewritten in place: "the specification: instantiation exclusion and the examples it refuses" (owner) · defects: row 331 (6); row 406 (8); row 414 (9).
- F-168 · stays as it is: "the specification: the number chapters and integer rules" (owner).
- F-169 · stays as it is: "the specification: the restart's standing and what the draft left unwritten" (owner F-166).
- F-170 · rewritten in place: "the library: ranges" (owner F-133) · out: detail 5.
- F-171 · rewritten in place: "the specification: comprises clauses" (owner) · defects: no row named (6); row 407 (7); row 487 (8); row 489 (9); row 490 (10).
- F-172 · stays as it is: "the specification: the number chapters and integer rules" (owner F-168).
- F-173 · rewritten in place: "the specification: type inference" (owner) · defects: row 442 (7); row 587 (8).
- F-174 · split: keeps "the specification: overloading with static parameters" (owner) · parts: "the checker: the overloading rules" (5, 7, 9) to F-75 · defects: row 1048 (9); row 537 (10); row 539 (11); rows 779, 780 (12).
- F-175 · merged into F-171: the same value-level reading as F-171 · defects: row 487 (5); row 546 (6); row 547 (7) · check: a row's status disagrees.
- F-176 · rewritten in place: "the specification: sizes" (owner) · out: detail 10 · defects: row 767 (9).
- F-223 · split: keeps "the specification: overloading with static parameters" (owner F-174) · parts: "the checker: the overloading rules" (2, 3) to F-75; "walk: the load check of a generic beside a plain declaration" (4, 5) to F-252.
- F-271 · stays as it is: "the repository: the type group's papers" (owner).
- F-272 · rewritten in place: "the specification: coercion resolution" (owner) · out: history 6; detail 4.
- F-273 · split: keeps "the specification: type inference" (owner F-173) · parts: "walk: static-argument inference" (6) to F-141 · defects: row 538 (7); row 496 (8).
- F-300 · not about the tree: `Papers/Variance/README.md` holds the detail.
- F-319 · split: keeps "the library: comparisons at NaN" (owner) · parts: "the specification: the restart's standing and what the draft left unwritten" (7) to F-166 · out: history 8 · defects: row 440 (6).
- F-345 · split: keeps "the specification: static numerals" (owner) · parts: "the specification: its two copies and Appendix I" (7) to F-163.
- F-359 · merged into F-388: the history of the prelude's number types that F-388 states now · parts: "the library: the flat number types" (3) to F-131; "the repository: the type group's papers" (4) to F-271; "the compiled runtime: boxing and the cost of loops" (5) to F-11 · out: history 1, 2; detail 7.
- F-371 · split: keeps "the specification: omitted types" (owner) · parts: "the specification: the restart's standing and what the draft left unwritten" (3, 4) to F-166 · out: detail 7 · defects: row 405 (5).
### The territory map

- F-179 · stays as it is: "the repository: two runtimes" (owner).
- F-180 · split: keeps "walk: import java" (owner) · parts: "the checker: the types of native helpers" (3) to F-321; "both paths: exceptions that native helpers raise" (6, 7) to F-336 · out: history 2; detail 9 · defects: no row named (1); row 845 (4) · check: cites a thing that is gone.
- F-181 · split: keeps "the code generator: where clauses and contracts in a header" (owner) · parts: "the checker: where clauses and conditional extension" (3) to F-250; "the code generator: local functions" (9) to F-320 · defects: row 701 (2); row 781 (4); no row named (8); row 307 (11); row 867 (13).
- F-182 · rewritten in place: "the checker: declarations that neither path builds" (owner) · out: history 4 · defects: no row named (1, 3); rows 18, 121, 122 (2).
- F-183 · rewritten in place: "the compiled runtime: the prelude's vectors" (owner) · defects: row 408 (4); no row named (5).
- F-184 · rewritten in place: "both paths: generic references without static arguments" (owner) · out: detail 2 · defects: no row named (1, 3).
- F-185 · rewritten in place: "the harness: the two test corpora" (owner) · out: detail 2, 5 · defects: no row named (4) · check: cites a thing that is gone.

## 6. The chunks for the batch mode

Twelve chunks of 25 to 31 entries, cut so that every subject's home entries, and every merge, fall in one chunk. A subject's chunk is listed in section 3. The entries are in the order of FACTS.

### harness: The harness, the tools, the specification's texts and the repository (29 entries)

Subjects: "the harness: XXX tests and refusals at load"; "the harness: check keys"; "the gate: threads, heaps and JVMs"; "the gate: testSystem's shards"; "the harness: another build's caches"; "the harness: the two test corpora"; "the harness: the team's demos outside the gate"; "the tools: the build and the caches"; "walk: no static checking"; "walk: if conditions"; "the specification: the generated api listings"; "the specification: its two copies and Appendix I"; "the specification: the restart's standing and what the draft left unwritten"; "the specification: omitted types"; "the library: comparisons at NaN"; "the repository: lineage and the Java 9 port"; "the checker: declarations that neither path builds"; "the checker: well-formedness errors".

Entries: F-7, F-17, F-237, F-98, F-99, F-100, F-101, F-102, F-103, F-104, F-105, F-107, F-112, F-113, F-203, F-234, F-283, F-383, F-404, F-239, F-162, F-163, F-165, F-166, F-169, F-319, F-371, F-182, F-185.

### export: The export check, the gate's checker stages and the checker's speed (29 entries)

Subjects: "the checker: the export check and types taken from the api"; "the specification: the export rule"; "the library: the api's members against its components"; "the checker: imports"; "the gate: the values of the checker count and the distance"; "the gate: how the count and distance stages run"; "the checker: speed, memos and memory"; "the checker: errors outside the distance"; "both paths: deterministic order"; "the gate: the method-size guard"; "the checker: choice among a call's declarations".

Entries: F-42, F-43, F-53, F-54, F-63, F-65, F-66, F-231, F-232, F-235, F-236, F-240, F-254, F-266, F-282, F-286, F-287, F-288, F-289, F-290, F-294, F-297, F-334, F-370, F-408, F-108, F-111, F-295, F-354.

### comprises: Comprises, where clauses, self types and exclusion (29 entries)

Subjects: "the checker: comprises clauses and closed traits"; "the specification: comprises clauses"; "walk: comprises clauses"; "the checker: where clauses and conditional extension"; "walk: where clauses and conditional extension"; "the checker: instantiation exclusion"; "the specification: instantiation exclusion and the examples it refuses"; "both paths: the bare Nothing"; "both paths: generic references without static arguments"; "the checker: self types and intersections"; "the code generator: casts of self and intersection receivers"; "the checker: written static arguments against their bounds".

Entries: F-21, F-29, F-44, F-45, F-46, F-47, F-48, F-52, F-62, F-64, F-70, F-72, F-94, F-225, F-227, F-244, F-250, F-251, F-255, F-256, F-121, F-148, F-270, F-377, F-386, F-167, F-171, F-175, F-184.

### classes: The code generator's classes and the shared syntax (28 entries)

Subjects: "the code generator: the classes of traits and objects"; "the checker: inheritance, override and getters"; "the code generator: generic methods on a type-variable receiver"; "the code generator: bytecode verification and local scope"; "the code generator: closure class names"; "the code generator: local functions"; "the code generator: where clauses and contracts in a header"; "both paths: type assumptions"; "both paths: tuple bindings and tuple parameters"; "both paths: math items after a primary"; "walk: array literals"; "both paths: the sum and product signs and operator headers"; "the model program: its lines on both paths"; "both paths: an api and a component of another name"; "both paths: source spans of comments"; "both paths: operator static parameters".

Entries: F-22, F-23, F-39, F-88, F-226, F-233, F-267, F-320, F-325, F-338, F-391, F-392, F-393, F-394, F-409, F-362, F-363, F-369, F-372, F-378, F-387, F-389, F-398, F-399, F-400, F-406, F-368, F-181.

### numerals: Numerals: their defaults, folds, constants and places (26 entries)

Subjects: "both paths: the fold of numerals"; "both paths: a numeral at a call"; "both paths: the four numbers of a numeral coercion"; "both paths: string literals and their identity"; "both paths: character literals and Char's asExprString"; "the checker: numeral defaults and types"; "the code generator: numeral constants"; "the library: the numeral types"; "the library: rounding of floats"; "the compiled runtime: component initialization and top-level variables"; "the specification: static numerals"; "walk: a numeral's type at its place"; "walk: choice among declarations by coercion"; "the specification: coercion resolution"; "both paths: a value's printed form and type name"; "both paths: extends Any as Object".

Entries: F-348, F-57, F-74, F-79, F-342, F-118, F-120, F-122, F-123, F-259, F-262, F-304, F-329, F-339, F-340, F-341, F-343, F-347, F-349, F-366, F-380, F-397, F-402, F-407, F-272, F-345.

### inference: Inference, the expected type and reductions (30 entries)

Subjects: "the checker: static-argument inference"; "the checker: the expected type"; "walk: static-argument inference"; "walk: reduction instantiation"; "the library: reductions, their identities and static arguments"; "walk: a generic function as a value"; "the specification: type inference"; "the repository: the type group's papers"; "the harness: the specification's examples".

Entries: F-28, F-51, F-55, F-56, F-59, F-60, F-73, F-78, F-85, F-87, F-220, F-221, F-242, F-243, F-285, F-344, F-364, F-365, F-114, F-137, F-141, F-143, F-144, F-228, F-248, F-367, F-173, F-271, F-273, F-300.

### overloading: The overloading rules and walk's load check (31 entries)

Subjects: "the checker: the overloading rules"; "the specification: overloading with static parameters"; "walk: dispatch on declared domains"; "walk: the load check of a generic beside a plain declaration"; "walk: two instantiations of one trait"; "walk: the load check of a family's cover"; "the checker: the default bound Any".

Entries: F-26, F-27, F-269, F-291, F-49, F-50, F-75, F-76, F-77, F-80, F-245, F-265, F-277, F-281, F-292, F-296, F-142, F-145, F-147, F-252, F-253, F-257, F-258, F-274, F-275, F-318, F-375, F-405, F-155, F-174, F-223.

### arrays: Arrays, generators, ranges and strings (28 entries)

Subjects: "the library: the array element bound and algebra"; "the library: array factories and the witness typecase"; "the library: fill and tabulate"; "the library: array casts"; "the library: array views and slices"; "the library: array products and shapes"; "the library: the array vocabulary"; "the library: the scalar extension"; "the library: generators and their sizes"; "the library: ranges"; "the library: declarations on the meet, and the Index bound"; "the library: strings and their concatenation"; "the library: order on tuples"; "the library: IntMap's union"; "the library: AnyList and List"; "the library: result-only type parameters"; "the repository: authorship of comments".

Entries: F-81, F-82, F-83, F-84, F-89, F-90, F-91, F-92, F-93, F-276, F-278, F-119, F-133, F-230, F-249, F-151, F-152, F-154, F-156, F-157, F-158, F-159, F-229, F-264, F-279, F-284, F-317, F-170.

### natives: Native bindings and their helpers on both paths (29 entries)

Subjects: "the code generator: builtinPrimitive bodies and native wrappers"; "the checker: the types of native helpers"; "walk: loading native helpers and its own operations"; "the library: native bindings and their counts"; "the library: native bindings of the number types"; "the library: native bindings of strings"; "the library: I/O streams"; "both paths: exceptions that native helpers raise"; "walk: import java"; "the compiled runtime: the prelude's vectors"; "the library: array stores"; "the repository: CompilerSystem and the compiler's prelude"; "the library: integer division and division by zero".

Entries: F-24, F-301, F-395, F-32, F-293, F-298, F-299, F-303, F-306, F-307, F-308, F-309, F-310, F-311, F-312, F-314, F-321, F-322, F-323, F-327, F-328, F-330, F-332, F-333, F-336, F-337, F-106, F-180, F-183.

### runtime: The one library compiled, boxing, forks and transactions (28 entries)

Subjects: "the compiled runtime: the one library on the compiled path"; "the compiled runtime: boxing and the cost of loops"; "the compiled runtime: transactions and atomic expressions"; "the compiled runtime: the cells of mutable variables and var fields"; "the code generator: label and exit"; "the code generator: varargs"; "the code generator: forking and the range grain"; "the model program: the Java baseline and the weight reader"; "the model program: under the compiled checker"; "the repository: two runtimes"; "the repository: the steps to the switch-over"; "the gate: step 7, the interpreter's suite compiled"; "the code generator: what it refuses against the one library".

Entries: F-9, F-11, F-12, F-19, F-302, F-350, F-351, F-355, F-356, F-357, F-358, F-34, F-58, F-61, F-86, F-335, F-352, F-353, F-381, F-390, F-396, F-97, F-109, F-117, F-373, F-374, F-401, F-179.

### integers: Integer rules, the flat number types and equality (25 entries)

Subjects: "the library: integer shifts"; "the library: fixed-width overflow"; "the library: integer powers"; "the library: integer conversions"; "the library: integer MIN and MAX"; "the library: wrapping operators"; "the library: GCD, LCM and CHOOSE"; "the specification: the number chapters and integer rules"; "the library: the number types as value objects"; "the library: the flat number types"; "the library: equality and equivalence"; "walk: coercion at its type checks".

Entries: F-313, F-124, F-125, F-126, F-128, F-130, F-131, F-132, F-138, F-139, F-261, F-263, F-280, F-305, F-316, F-324, F-326, F-331, F-388, F-403, F-361, F-379, F-168, F-172, F-359.

### sizes: Sizes, the class loader and template dispatchers (27 entries)

Subjects: "both paths: typecase and its bound names"; "the checker: sizes"; "the code generator: template dispatchers and generic arms"; "the code generator: try, forbid and modifiers"; "the library: dead sizes in FortressLibrary's api"; "the compiled runtime: the class loader's instances"; "the compiled runtime: sizes at run time"; "the specification: sizes"; "walk: sizes".

Entries: F-18, F-20, F-25, F-35, F-36, F-37, F-38, F-40, F-41, F-67, F-68, F-69, F-71, F-268, F-315, F-376, F-129, F-134, F-135, F-136, F-140, F-146, F-222, F-382, F-384, F-385, F-176.

### Order and the parts that cross chunks

No group of overlap is larger than a chunk; the largest, O4, has 21 entries. But a group names every entry that mentions its topic, so 72 of the 95 groups touch more than one chunk (section 4). The chunk that holds most of a group's entries leads it; the others only point to its owner.

53 parts, 64 claims, leave an entry of one chunk for an owner in another. For each, the writer of the giving chunk cuts the claim and writes a pointer, and the writer of the taking chunk adds the claim to the owner from the old text. Apply the taking chunk first, so that no claim is missing between two applies. The order below does that for all but 15 of the 64 claims; for those, the claim stays in the history and in `map.json` until its taking chunk is applied, and the record is not read in between.

Order: 1. harness, 2. export, 3. comprises, 4. classes, 5. numerals, 6. inference, 7. overloading, 8. arrays, 9. natives, 10. runtime, 11. integers, 12. sizes.

- To harness from sizes: F-25 (5), "the gate: threads, heaps and JVMs", to F-99.
- To harness from comprises: F-70 (4), "the harness: check keys", to F-98.
- To harness from export: F-108 (4), "the harness: XXX tests and refusals at load", to F-102.
- To harness from numerals: F-345 (7), "the specification: its two copies and Appendix I", to F-163.
- To export from inference: F-73 (3), "the checker: choice among a call's declarations", to F-408.
- To export from overloading: F-80 (6), "the checker: speed, memos and memory", to F-65.
- To export from comprises: F-94 (3), "the checker: speed, memos and memory", to F-65.
- To export from harness: F-203 (5), "the gate: how the count and distance stages run", to F-111. Against the order.
- To export from overloading: F-281 (4), "the checker: the export check and types taken from the api", to F-282.
- To export from inference: F-365 (7), "the checker: speed, memos and memory", to F-65.
- To export from sizes: F-376 (4), "the checker: choice among a call's declarations", to F-408.
- To export from runtime: F-396 (14), "the checker: choice among a call's declarations", to F-408.
- To comprises from export: F-63 (8), "the checker: comprises clauses and closed traits", to F-64. Against the order.
- To comprises from classes: F-181 (3), "the checker: where clauses and conditional extension", to F-250.
- To comprises from overloading: F-281 (8), "the checker: where clauses and conditional extension", to F-250.
- To comprises from classes: F-406 (7), "the checker: self types and intersections", to F-225.
- To classes from runtime: F-34 (4), "both paths: type assumptions", to F-325.
- To classes from overloading: F-145 (6, 7), "the checker: inheritance, override and getters", to F-88.
- To classes from runtime: F-352 (8), "the code generator: the classes of traits and objects", to F-372.
- To numerals from inference: F-73 (5), "the checker: numeral defaults and types", to F-342.
- To numerals from integers: F-131 (3), "the checker: numeral defaults and types", to F-342.
- To numerals from integers: F-131 (4), "walk: a numeral's type at its place", to F-341.
- To numerals from integers: F-326 (5), "walk: a numeral's type at its place", to F-341.
- To numerals from natives: F-328 (3, 4), "both paths: a value's printed form and type name", to F-123.
- To numerals from inference: F-344 (2, 6), "both paths: a value's printed form and type name", to F-123.
- To inference from sizes: F-18 (8), "walk: static-argument inference", to F-141.
- To inference from arrays: F-84 (3), "the checker: static-argument inference", to F-73.
- To inference from numerals: F-123 (5), "walk: static-argument inference", to F-141. Against the order.
- To inference from integers: F-131 (9, 10), "walk: reduction instantiation", to F-228.
- To inference from arrays: F-229 (6), "walk: static-argument inference", to F-141.
- To inference from export: F-266 (2), "the specification: type inference", to F-173. Against the order.
- To inference from numerals: F-341 (6), "walk: static-argument inference", to F-141. Against the order.
- To inference from integers: F-359 (4), "the repository: the type group's papers", to F-271.
- To overloading from arrays: F-119 (4), "walk: the load check of a family's cover", to F-27.
- To overloading from integers: F-379 (6-8), "walk: the load check of a generic beside a plain declaration", to F-252.
- To overloading from integers: F-403 (7, 10), "walk: dispatch on declared domains", to F-26.
- To arrays from inference: F-51 (2), "the library: the array element bound and algebra", to F-151. Against the order.
- To arrays from integers: F-316 (6), "the library: ranges", to F-133.
- To natives from integers: F-313 (2), "the library: native bindings of the number types", to F-323.
- To natives from runtime: F-335 (1), "the library: native bindings and their counts", to F-32.
- To natives from runtime: F-335 (2), "walk: loading native helpers and its own operations", to F-299.
- To natives from runtime: F-353 (7), "both paths: exceptions that native helpers raise", to F-336.
- To natives from runtime: F-396 (6, 10), "both paths: exceptions that native helpers raise", to F-336.
- To runtime from sizes: F-18 (5, 6), "the compiled runtime: boxing and the cost of loops", to F-11.
- To runtime from harness: F-104 (2), "the code generator: what it refuses against the one library", to F-34. Against the order.
- To runtime from sizes: F-135 (4), "the code generator: forking and the range grain", to F-350.
- To runtime from natives: F-301 (3, 6, 7), "the compiled runtime: boxing and the cost of loops", to F-11. Against the order.
- To runtime from natives: F-333 (4), "the compiled runtime: transactions and atomic expressions", to F-351. Against the order.
- To runtime from integers: F-359 (5), "the compiled runtime: boxing and the cost of loops", to F-11.
- To integers from numerals: F-366 (7), "the library: equality and equivalence", to F-280. Against the order.
- To integers from runtime: F-396 (5), "the library: the number types as value objects", to F-379. Against the order.
- To sizes from numerals: F-342 (6), "the checker: sizes", to F-67. Against the order.
- To sizes from classes: F-378 (4), "the compiled runtime: the class loader's instances", to F-18. Against the order.

## 7. The pilot

The curator reads the pilot before any chunk runs. Its first round is a mix: one case of each kind, so that he sees what the method does to each. Each case names the entries that its writer needs. Where it could, a case uses entries that the new scenarios of the test of decisions rest on (`explorations/coordinator/process-engineering/record-test/2026-11-24/README.md`), so that the test can check the pilot. That list holds no entry that today's checks found false, so case 4 uses F-63, which the curator asked about.

### The first round

1. **An entry with several subjects, split: F-374** (scenario 3). It keeps its subject, "the cells of mutable variables and var fields", which it owns. Its part on the atomic expression, claims 7 and 8, goes to F-351, the owner of "transactions and atomic expressions". Claim 4 (row 319, fixed) goes to the history, and claim 11 (the one `value` object with a `var` field, `Lazy`) to the report. The descriptions of claims 5, 8 and 10 go to rows 641, 1043 and 112. Entries: F-374, F-351.
2. **Two entries that say the same, merged: F-143 into F-141** (scenarios 5 and 6). F-141 says that under walk a type parameter that nothing at a call fixes takes its declared bound; F-143 is that rule's exception, an F-bounded parameter that stays open. One entry holds the rule with its exception. The claims of both on reductions (F-141's 6 and 7, F-143's 2 and 3) go to F-228, the owner of "walk: reduction instantiation", which already states them. The descriptions of the defects go to rows 587, 589, 591, 612, 616, 663, 716 and 825. Entries: F-141, F-143, F-228.
3. **A defect beside its property: F-279** (scenario 9). Its property, claim 1, stays: under walk a slice of an `Array2` or `Array3` based above zero reads like a 0-based one. Its defect claims 3 and 4, a shifted `Array2`'s slice, go to row 808, and the entry names the row in a few words. Its source lines, claim 2, go to the report. It stays beside F-157, the owner of "array views and slices". Entries: F-279, F-157; row 808.
4. **An entry that today's checks found false or stale: F-63.** The checks find two claims false today (the reason given for the abstract `split` pair, and "no test gates that edit"), two citations gone (the report's `QQ` clause, the moved `Condition` line), and the ground of the `Condition.map` error unsettled (`evidence/stale-claims.md`, F-63). In the map it stays beside F-286, the owner of "the api's members against its components". Its claim 1 repeats F-286 and F-297, so it goes there, without the false reason. Its claims 2 to 4, three other forms of the api, stay, with rows 355 and 357 named. Its claim 8 goes to F-64, the ellipsis `comprises` (row 354). Claims 5 and 7 go to the history. The unsettled ground is settled before any new wording. Entries: F-63, F-286, F-297, F-64.
5. **An entry that is mostly history: F-240** (scenario 4). It is a time log of the gate: the times at climb batch 36 (claim 1), at earlier batches (2, 3, 5), and the cost of checking every operator (4). It is rewritten in place as a measurement bounded to its day, with its two lasting properties: the count table records no seconds (6), and load can lengthen a stage more than twofold, so times compare only under like load (7). The earlier times go to the history. Its subject's owner is F-111, how the count and distance stages run. Entries: F-240, F-111, and F-43 for the scenario.
6. **A sound entry with one subject: F-179** (scenario 3). It owns "the repository: two runtimes", today's checks find nothing, and it stays as it is. Entries: F-179.
7. **One whole subject, as it would stand: "the harness: XXX tests and refusals at load"** (scenario 12). Four entries have it as their home, and F-108's claim 4 speaks to it. After the sorting it stands as four entries. F-102, the owner, holds the interpreter corpus's `XXX` rule, with F-383's `load_` key in place of its pointer to F-29, which the checks find beyond its support. F-103 holds the compiled corpora's `XXX` rule, and takes F-383's claim 3, which the harness pilot found to be F-103's subject. F-108's claim 4 joins F-102. F-383 holds that walk's harness counts a phase's static error as a refusal at load. F-104 holds a thrown `CompilerError`'s path through the harness; its claim 1, the three streams, goes to F-98 (check keys), and its claim 2 to F-34. Entries: F-102, F-103, F-104, F-383, F-108, F-98, F-34.

### The second round

The second round is one whole chunk: **inference**, "Inference, the expected type and reductions" (30 entries). It holds eight kinds of case, as many as any chunk: ten splits, seven merges (F-51 and F-55 into F-73, F-56 into F-87, F-143 into F-141, F-220 into F-285, F-243 and F-248 into F-242), sixteen entries with a defect beside a property, six entries with a finding of today's checks, two entries that are mostly history, two sound entries that stay, one entry not about the tree (F-300), and whole subjects of four or more entries ("the library: reductions" with eight, "walk: static-argument inference" and "the checker: the expected type" with five). Only "arrays" ties it on kinds, with one merge. It also holds the entries of scenarios 5 and 6 (F-141, F-143, F-228, F-221), so the test of decisions checks it.

## 8. What could not be settled

Joined from the last list of each claims file, each point once. The file is named after each point; where two files raised it, both are named. A writer settles the point of an entry before he rewords it, and does not delete the claim meanwhile.

### Claims that no check read against the tree

- Every behavioural claim of the chunks `landed-3` and `spec`: no source read it against the tree, so "sound as checked" means only that the cited items exist (landed-3, spec). The harness pilot ran no claim that needs a build or a test either (harness).

### Claims that today's checks left open

- F-19, "walk makes each block a task", and F-348's clauses on top-level initializers and unnamed imports: not checked again, and no other entry holds them (exec).
- F-20 and F-40, "no optimization uses a size": rests on a code reading of 2026-09-24 (exec, checker-1).
- F-11, "no such kernel compiles yet": not checked against F-352, F-358 and F-396, which run a compiled `Array1` loop against the one library (exec).
- F-27's `GenericBesidePlain*.fss` tests: found only under `compiler_tests/`; which walk tests the entry means is not known (exec).
- F-114's five examples that pass by walk's open parameter may now pass by F-228's join; P-124 against the five `library/` examples that run in no suite (harness).
- F-39: whether nine test files declare an `opr` parameter (15 by a loose grep, 2 by a strict one) (checker-1).
- F-43 against F-80: whether the overloading memo keeps every input (F-80) or keeps a verdict per pair across traits and hides errors (F-43) (checker-1, checker-2).
- F-54: whether its pointer to F-233 is unsupported, as the one in F-53 is (checker-1).
- F-57: whether `x + 1` under `T extends Integral[\T\]` still fails the checker on today's library (checker-1).
- F-58: whether the 42 sites still hold (checker-1).
- F-63: the ground of the `Condition.map` error, what its history sentences refer to, and its overlap with F-286, F-297 and rows 355 and 357 (checker-2).
- F-74: whether its content now belongs to F-341 (this map merges it); its row 962 is CONTESTED, which it does not say (checker-2).
- F-77: whether its words about row 555 were wrong; the scout and the writer disagree (checker-2).
- F-66, F-67, F-75, F-90: status words were cut and a `#stopped` rule was made true, but which entry held which word is not given (checker-2).
- F-84: its citation `research/extracts/ParkPOPL2019.txt:437-438` was not checked (checker-2).
- F-93 and F-237: whether their designs are a worker's choice or the coordinator's; the list of stale claims says so, the entries do not (checker-3).
- F-94 and F-227: with `Number` no longer closed, whether any library call still meets the closed-trait case (checker-3).
- F-254: what `FortressLibrary.fss:131` should hold for the claim (checker-3).
- F-265: whether walk still stops with an `InterpreterBug` at an `Object`-bounded type variable given a tuple; its probe is gone (checker-3).
- F-267: whether the checker still refuses the subtrait; there is no row, no test, and the probes are gone (checker-3).
- F-225, claim 14: the Papers line, `CompilerAlgebra.fsi` and commit `655e65d53` were not checked; F-377 and F-385, which claims 11 and 12 rest on, were not read (checker-3).
- F-240: the times 65 s and 117 s are not in a file that the scout read (checker-3).
- F-290 and F-292: their counts (624, 92, 25; 86, 263, 1,318) are of one tree each and were not measured again (checker-4).
- F-308: the counts 30, 30, 40, 93 and 100, and its 30 against F-299's 31 for `NN64`, were not counted again (checker-4).
- F-299: its count, 373 of 401, is false today (372 and 402); which bindings moved was not traced (checker-4).
- F-298: `NamingCzarJUTest.testForeignOneLibrary` was not searched (checker-4).
- F-309: no test; its design rule rests on one probe with a prototype (checker-4).
- F-315, claim 5, and F-320, claim 5: a `test` method compiled once in a probe, and F-34's measure on `dbf4825e0`, were not run again (checker-4).
- F-314, claim 4: the subject of row 75 could not be told apart, since "row 75" also matches rows 750 to 759 (checker-4).
- F-352 and F-353: their history and their present halves could not be told apart where the entry gives no date (checker-5).
- F-390 cites "the six `OneLibraryVarargs*.test`"; the scout found 7 files (checker-5).
- F-336, claim 3, against the pilot's finding on F-396 (row 1103 "against either library"): the finding names F-396 only, so whether F-336's scope is wrong is open (checker-5).
- F-337's `mustUseSystemLoader`, F-365's `instantiatedReference`, F-391's `hasBodyInItsTrait` and F-393's rehearsal patch were not checked by the scout (checker-5).
- F-117, claim 2: an arrow-typed mutable variable runs, but no test runs one (landed-1).
- F-129, claim 5, against F-140, claim 9: row 962 is plain fact in one and contested in the other (landed-1).
- F-138, claim 5: row 442's text does not hold the claim; F-173 cites the same row (landed-1).
- F-144, claim 3: row 665 holds another claim, and no other row was found for a reduction that stops at its first join (landed-1).
- F-148: no other entry gives walk's rule for an `extends` list, so whether the checker reads it the same is open (landed-1).
- F-230, claims 4 and 5: a key repeated with the same value throws, where the specification names only a different value; whether this is a departure is open (landed-2).
- F-248, claim 3: whether row 21 still stops a `SUM` of `SUM`s, given F-253's inference (landed-2).
- F-252, claims 12 and 14: beyond their support by the pilot, though the scout found the tests (landed-2).
- F-259, claims 1 and 2: no other entry and no skill sentence holds them, and the cited section of `revival-changes.md` is missing (landed-2).
- F-262, claim 1, and F-263, claim 6: known by reading or by the distance stage only (landed-2).
- F-366, claim 3: whether the curator's words of 2026-11-16 ("Good. Makes sense.") make the subtyping order a decision (landed-3).
- F-165, claim 4: that the `FTypeArrayList` fix is the only piece of the port that still runs was not checked in the tree (spec).
- F-359, claims 1 and 2: the dated claims and the `git log -S` command were not run again (spec).
- F-345, claim 8: the specification's build and its warning count were not run (spec).
- F-176, claim 9: the cited range `IntNat.java:126-147` against the method's lines, `:127` to about `:146` (spec).
- F-272, claim 6, and F-319, claim 9: no `.test` file was found beside the named walk tests; whether the harness needs one is open (spec).

### Entries and the skill that may disagree

- F-180, claim 6, says that a helper raises by naming a prelude class; F-336 says that the raise names its exception by simple name through `LibraryNames` (arrays).
- F-183, claim 1, says that the compiled path's only array-like types are the prelude's two; under the one library's selection (F-381, F-396) the one library's arrays compile (arrays).
- F-324, claim 3, against the skill: `revival-changes.md:112` gives `x.asRR64` as each type's getter, while F-324 and F-323 say that no type declares it (landed-2).
- F-373, claim 10, says that walk's `catch` of `Exception` takes an exit (row 1040); the skill (`compiler.md:151`) says that a `catch` of the library's `LabelException` takes it (landed-3).
- F-385, claim 4: the skill (`revival-changes.md:41`) says no test covers the generic object of row 1052, while row 1052 is FIXED (landed-3).
- F-382 (row 1064), F-388 (row 1081), F-373 (rows 1041, 1042), F-401 (row 1041) and F-76 (row 547) name CONTESTED rows without saying so, as F-175 does; whether each should say "contested" is open (landed-3, spec).

### Claims that may be choices, or rules of work

- F-112, claim 3, the rule that a rung updates a citation that it moves: no source says whether the curator decided it, so its kind, choice, is open (harness).
- F-97's microGPT sentence: whether it belongs here, beside F-58, or in an entry on the model program (harness). Its claims file counts it as history, so the map moves it out of F-97.

### Defects and gaps that only the entry holds

- These name no ledger row: F-17 (an empty cache), F-28, claim 3 (11 of 18 type classes without a case), F-35, claim 6 (the export checker and dead sizes), F-43 (the memo's hidden errors), F-98, claim 3 (a misspelt key), F-118, claim 3 (which numerals reach the fallback), F-121, claims 4 and 5, F-155, claim 5 (one family across two imported apis), F-255, claim 7, F-256, claim 3, F-295, claim 4, F-321, claim 2, F-322, claim 3, F-343, claims 4 and 5 (`'a' || 'b'`), F-409, claim 6 (exec, checker-1, checker-3, checker-4, checker-5, landed-1, landed-2, harness, arrays). The map sends each to a new row (section 5, "no row named").
- These name rows that no other entry names: F-152, claims 3 to 6; F-157, claims 4 and 5; F-181, claims 2, 6, 8 and 13; F-182; F-184, claims 1 to 3; F-279, claims 3 and 4; F-325, claims 6 to 8; F-335, claim 6; F-364, claims 6 to 8; F-365, claims 9 and 10; F-368, claims 6 to 9; F-376, claim 3; F-390, claims 5 and 6; F-392, claim 3; F-394, claims 5 and 7; F-396, claims 9, 12 and 13 (arrays, checker-5). The files left to this map whether the ledger alone should hold them; the map sends each description to its row and leaves the row's number in the entry.
- F-151, claim 5: a plan, "no run measures what keeps a scalar `T` apart from `String`", that no other entry holds (arrays).
- F-159, claim 7: walk's present load check has not been run on the pair, and no later entry settles it (arrays). F-185, claim 5 (121 files) was not counted again (arrays).
