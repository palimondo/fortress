# Who wrote Fortress — an authorship map

Compiled 2026-08-21 from the git history (5,397 historical commits,
2007-01-04 → 2012-08-31) plus the 1.0 specification's acknowledgments,
the project's published papers, and public-web checks. Purpose: know who
wrote which subsystem, and whom one could plausibly contact with
questions about history or unrealized plans.

**Caveats.** The git record starts January 2007; the project began in 2003,
so four years of design history (and any pre-2007 code) predate every count
below — Eric Allen, for instance, was co-principal-investigator from the
start but shows only ~233 commits because the record starts late, and spec
co-authors **Sam Tobin-Hochstadt** and **Joe Hallett** have *zero* commits
here (their era's record is lost). Counts are `git log --full-history`
per path. Plain `git log -- <dir>` — and `git blame` — are broken in this
repository, but not by the 2026 graft (a single-parent commit that modified
only 13 pre-existing files): the hg→git conversion behind the GitHub mirror
severed 146 parent links, turning ordinary 2011–2012 java.net-era commits
into parentless full-tree snapshots, so any history walk from HEAD dead-ends
at the nearest phantom root instead of reaching 2007 (blame will credit an
entire untouched file to, e.g., a July 2012 seam commit). Those snapshot
roots also add up to ~146 spurious per-path "touched" credits inside the
`--full-history` counts — noise spread across 2011–12 committers, small at
the scale of the numbers above. In the other direction, the counts
*undercount* the 2008 research-branch authors: those branches were
svn-squash-merged into trunk, so the fine-grained per-commit record for
Culpepper, Rafkind, Lee, and Spiegel on that work survives only on the
relic branch heads, not in any walk from HEAD — see "The relic branches"
below. The
2007–2011 SVN/Mercurial history uses bare usernames (`sukyoungryu@localhost`
etc.); identities are resolved below with the evidence stated.

## The identity key

Three naming eras: Sun employee IDs (Jan–Jun 2007), SVN usernames
(June 2007 on), and real names (after the March 2011 move to Mercurial on
java.net). The ID→username handoffs are datable to days — each ID stops
committing within a week of its username starting, on the same files.

| Identity (commits, combined) | Usernames | Active | Who / evidence |
|---|---|---|---|
| **Sukyoung Ryu** (1,586) | sr155864, sukyoungryu, sukyoung | 2007-01 → 2011-09 | Certain — spec co-author; most prolific committer by far |
| **David Chase** (991) | dc12360, dr2chase, David Chase | 2007-01 → 2012-07 | Certain — spec co-author; `dr2chase` is his GitHub handle; owned the 2011 java.net migration |
| **Jan-Willem Maessen** (592) | jm143038, jmaessen | 2007-01 → 2010-03 | Certain — spec co-author |
| **Christine H. Flood** (261) | chf, chmf | 2007-01 → 2012-05 | **Verified**: her own bio — PLRG work on "the bytecode optimizer, software transactional memory, and compilation to a fork/join framework" — matches her commits exactly |
| **Justin Hilburn** (261) | jrhil47 | 2008-05 → 2011-09 | High — OOPSLA 2011 co-author; commits are overloading/OverloadingOracle, the paper's subject |
| **Jon Rafkind** (237) | jon | 2008-05 → 2009-08 | High — all `[syntax]` commits; *Growing a Syntax* (FOOL 2009) co-author |
| **Eric Allen** (233) | ea144895, EricAllen | 2007-06 → 2011-07 | Certain — spec co-author, co-PI with Steele |
| **Guy L. Steele Jr.** (177) | gls, Guy Steele | 2008-07 → 2012-06 | Certain |
| **Janus Dam Nielsen** (144) | jdn | 2007-10 → 2009-01 | High — syntax-abstraction commits; *Growing a Syntax* co-author |
| **Scott Kilpatrick** (119) | skilpat | 2008-02 → 2011-08 | **Verified**: spec acknowledgments ("skilpat, who signed SCA"); GitHub github.com/skilpat; OOPSLA 2011 co-author |
| **Tristan King** (112) | tristan.king@gmail.com | 2012-01 → 2012-06 | Real name in history; mailing-list admin "tristan"; compiler tests (BigOpTests, BirdCount). Background unresolved |
| **Michael Spiegel** (110) | mspiegel | 2007-11 → 2008-08 | **Verified**: spec acknowledgments ("mspiegel, who signed SCA"); interpreter/memory-footprint work |
| **Nels Beckman** (95) | nbeckman | 2008-05 → 2009-07 | High — typechecker commits; CMU PhD student era |
| **Victor Luchangco** (76) | victorl, Victor Luchangco | 2008-07 → 2012-05 | Certain — spec co-author |
| **Dan Smith** (64) | ds210953, dlsmith | 2007-05 → 2008-07 | High — ID→username handoff (June 5→8, 2007, both on early type checker); maintained ASTGen and plt.jar, both from Rice's JavaPLT, where Smith was |
| **I-Ting Angelina Lee** (62) | angelee | 2008-05 → 2008-11 | Medium-high — desugarer/closure-conversion for object expressions; MIT intern era |
| **Andrew P. Black?** (56) | black | 2008-08 → 2008-12 | Medium — printing-in-the-presence-of-concurrency library work over one semester, consistent with a Fall 2008 sabbatical visit; unconfirmed |
| **Karl Naden** (48) | karl.naden | 2011-06 → 2012-08 | **Verified**: his CMU page — Oracle Labs intern, summer 2011, "techniques for instantiating generic types at runtime"; his 2012-08-31 instantiation writeup is nearly the last commit of the whole history |
| **Steve Heller** (35) | steve.heller | 2008-08 → 2008-12 | Certain by name; listed in spec acknowledgments; benchmark programs (paraffins, gauntlet) |
| **Jean-Baptiste Tristan** (27) | Jean-Baptiste Tristan | 2011-11 → 2012-01 | Certain — Oracle Labs researcher; experimental component-system prototype and ZZ/NN64 numeric test suites |
| **Ryan Culpepper** (23) | ryanc | 2008-05 → 2008-08 | High — grammar composition / macro keywords; *Growing a Syntax* co-author |
| **Kento Emoto** (6) | emoken | 2008-12 → 2009-07 | High — spec acknowledgments list Emoto (U. Tokyo); commits are "GoGs (generators of generators) for 2D arrays", his research topic |
| **Changhee Park** (8) | changhee.park | 2010-04 → 2012-06 | High — pattern-matching desugarer/typechecker; KAIST, Ryu's group |
| **Claire Alvis** (7) | Claire Alvis | 2012-05 → 2012-07 | Certain by name — deterministic random numbers, contention management; Flood's commits mention "pair programming with calvis" |
| senokay (19) | senokay | 2010-06 → 2010-08 | Unresolved — summer 2010, ReflectiveQuickCheck library (intern-shaped tenure) |
| Crink (26) | Crink | 2008-10 → 2010-04 | Unresolved — editor support (GtkSourceView), library fixes "tested at work"; likely external SCA contributor |
| joeuser (9) | joeuser | 2007-06 → 2007-07 | Unresolved — real ASTGen work under a placeholder account |
| envia (2) | envia | 2010-06-15 | Unresolved — one-day DPLL-in-Fortress contribution |

(Revival-era commits — 2026 — are excluded from the historical record
above.)

## Who wrote what, by subsystem

Top committers per path, `--full-history`, largest first:

| Subsystem | Principal authors |
|---|---|
| **Parser** (`parser/`, `parser_util/`, the four Rats! grammars) | Ryu, overwhelmingly (436 + 200); Chase and Nielsen minor |
| **Syntax abstractions** (extensible syntax/macros) | Ryu, Nielsen, Rafkind, Culpepper — the *Growing a Syntax* team |
| **AST definition** (`Fortress.ast`) | Ryu (248), Chase, Hilburn, Smith |
| **ASTGen tool** | Smith (early), then Chase, Steele |
| **Interpreter** (reference evaluator) | Ryu (424), Chase (221+), Maessen (164), Flood (86) |
| **Native glue** (`glue/`) | Maessen (82), Ryu (76) |
| **Type checker** (Scala, `scala_src/`) | Ryu (176), Hilburn (165), Chase (129), Steele (57), Kilpatrick (39) |
| **Compiler / JVM backend** (`codegen/`) | Chase, dominant (210+123 as two identities); Maessen, Steele |
| **Bytecode optimizer** | Flood, Chase, Steele |
| **Runtime** (work-stealing, transactions, generic instantiation) | Flood, Chase, Steele, Naden |
| **Standard library** (`Library/`, `LibraryBuiltin/`) | Maessen (147), Ryu, Chase, Steele, black, Crink |
| **Specification LaTeX** (in-repo edits) | Chase, Ryu, Steele, Luchangco — the published 1.0 spec credits Allen, Chase, Hallett, Luchangco, Maessen, Ryu, Steele, Tobin-Hochstadt |
| **Fortify** (LaTeX renderer) | Chase, Steele, Allen |
| **`useful/` collections** (BATree persistent trees) | Chase (90+72 as two identities) |
| **Benchmarks / demo programs** | Heller, Emoto, King, JB Tristan, envia |

Reading the map: **Ryu owned the front half** (parser → AST → type
checker) and is the single most prolific contributor to almost every
front-end path. **Chase owned the back half** (backend, runtime,
collections, build) and is the only person with major commits in
*every* subsystem. **Maessen owned the library and parallelism story**
until leaving in early 2010. **Flood owned the runtime's hard parts**
(transactions, fork/join, bytecode optimizer). **Steele committed
steadily but modestly** — his 177 commits concentrate in the library,
Fortify, and the late type-system work; the design lived in the spec
more than the code. The final year (2011–2012) is essentially Chase +
Steele + Flood + Luchangco + the type-system students (Hilburn, Naden)
— exactly the run-time-instantiation problem the retrospective says
stopped the project.

## The relic branches — where squashed authorship survives

The twelve non-`main` branches on the GitHub mirror are relics of the
Sun/Oracle-era repository, carried over by the conversion. Every
"finished" branch ends in an empty hg close-branch commit from David
Chase's 2012-01-20 sweep ("closing X, tired of it"). The 2008 research
branches were re-landed on trunk via svn-merge commits that **squash the
branch history** — so the branch heads are the *only* record of the
fine-grained, per-author development steps, even where the final content
is fully in trunk.

| Branch | Tip (date) | Authors | Commits not in main | Theme |
|---|---|---|---|---|
| `syntax` | e2c818a34, 2012-01-20 | jon, ryanc | 39 (38 real) | syntax abstraction, round 1 |
| `syntax2` | 63135681e, 2012-01-20 | jon, ryanc | 29 (28 real) | round 2: template parser, 2-stage expansion |
| `syntax3` | 7159d9f7f, 2012-01-20 | jon, ryanc | 21 (20 real) | round 3: `=>` transformers, case macros |
| `syntax4` | 9571c665d, 2012-01-20 | jon | 10 (9 real) | round 4: ellipses (`...`) in templates |
| `ange_michael` | 259a02d3a, 2012-01-20 | angelee, mspiegel | 35 (34 real) | bytecode top-level env generation, Jun 2008 |
| `perftesting` | dbcdf92aa, 2012-01-20 | mspiegel | 13 (12 real) | perf monitor + JFreeChart, Aug 2008 — orphan root, no merge-base |
| `hygiene` | f506b7d8b, 2012-01-20 | jon | 6 (5 real) | macro hygiene / alpha-renaming, Sep 2008 |
| `node-interface` | 6908e4fe2, 2012-01-20 | jon | 4 (3 real) | astgen syntax-abstraction AST nodes, 2009 — **never landed** |
| `works` | 0f5f3f3d2, 2012-01-25 | Chase | 3 (2 merges + 1 empty) | Jan 2012 compiler-merge staging |
| `john` | abc8f4807, 2012-01-27 | Tristan King | 1 (empty branch-open marker) | hg marker only |
| `John` | c111201cb, 2011-12-07 | — | 0 | stale pointer into trunk |
| `bird_count` | 074f85872, 2012-05-25 | — | 0 | stale pointer (Birds demo merged) |

The squashing merges on trunk, for the record:

- **syntax1–4** → `4295ddf2f` (r1752:1883, 2008-06-12), `99ae14ddc`
  (2008-07-31), `cbae53bb6` (2008-08-06), `f2dce1624` (2008-08-08). Each
  branch was svn-merged into trunk immediately after its last commit;
  the ~95 fine-grained commits — including all of Ryan Culpepper's
  individual authorship on this work — exist only on these branches.
- **ange_michael** → `c15629abf` (mspiegel, 2008-06-18, "Merging
  [compiler] branch r2001 into the main trunk") — squash-landed
  `TopLevelEnvGenerator.java` (ASM bytecode environments per component);
  the code lives on as `compiler/environments/TopLevelEnvGen.java`.
- **hygiene** → `fd30f0b14` (jon, 2008-09-22, "svn merge -r2850:HEAD
  …/branches/hygiene"); `SyntaxEnvironment.java` is in main today, the
  five development commits only on the branch.
- **perftesting** never fully landed: its root `ad808cfa6` (2008-08-05)
  is a disconnected orphan — "includes only the source files until the
  libraries can be OKed by the lawyers" (the JFreeChart jars). Trunk got
  only the initial two files (`42affb1fd`, 2008-07-31); `ChartWriter.java`
  and the rest never reached trunk. (This orphan is separate from, and
  not among, the 146 conversion-severed roots.)
- **node-interface** is genuinely unmerged work:
  `astgen/SyntaxAbstractionCreator.java` (154 lines) and
  `astgen/README-interface` exist nowhere in main's history.

Consequences: nothing on these branches should be merged into `main`,
and none of them should be deleted — the branch *names* record which hg
named branches existed at Sun/Oracle, and the heads carry per-commit
authorship (Culpepper, Rafkind, Lee, Spiegel) that trunk's squash merges
erased. At most, `John` and `bird_count` (zero unique commits) could be
tagged `archive/*` and dropped, but the safe default is to leave all
twelve untouched.

## Where they went (affiliations, 2026, from public sources)

- **David Chase** — Google (Go compiler/runtime team); GitHub `dr2chase`.
- **Sukyoung Ryu** — professor, KAIST (School of Computing); her group
  continued the Fortress dispatch line academically after 2012 (e.g.
  POPL 2019 *Polymorphic symmetric multiple dispatch with variance*,
  co-authored with Steele).
- **Christine Flood** — Red Hat; creator of the Shenandoah GC.
- **Sam Tobin-Hochstadt** — professor, Indiana University; hosts the 1.0
  spec PDF himself (byte-identical to ours).
- **Jean-Baptiste Tristan** — Amazon (Automated Reasoning), via Oracle
  Labs and Boston College.
- **Victor Luchangco** — was at Algorand (formal verification).
- **Jan-Willem Maessen** — industry (Sun → Google → Meta → Nectry).
- **Scott Kilpatrick** — software engineer, NYC (MPI-SWS PhD; Backpack).
- **Karl Naden** — CMU PhD era; industry.
- **Eric Allen** — industry (engineering leadership).
- **Guy L. Steele Jr.** — retired from Oracle Labs; no public internet
  presence.
- Also traceable: **Jon Rafkind** (Utah PhD), **Janus Dam Nielsen**
  (Denmark; was Alexandra Institute), **Ryan Culpepper** (Racket core
  team), **Nels Beckman** (CMU PhD → industry), **Angelina Lee**
  (professor, WashU), **Michael Spiegel** (UVA PhD → industry),
  **Dan Smith** (Oracle, Java Language Specification — if the
  identification holds), **Kento Emoto** (professor, Kyushu Institute
  of Technology), **Changhee Park** (KAIST PhD), **Claire Alvis**
  (Racket community).

On the complex-numbers joke: nobody ever committed a ℂ — but the numerics
trail (Chase's 2011 note that RTTI for covariant generics was "necessary
for the 'right' implementation of the numeric hierarchy", and JB Tristan's
ZZ/NN64 test suites) says the blocker was the same run-time-instantiation
problem as everything else. The people who carried that problem to the
end: Chase, Steele, Naden, Luchangco.

## Open questions

- Who is **senokay** (QuickCheck, summer 2010)? Who is **Crink**? **envia**?
- Is **black** really Andrew P. Black (sabbatical)? A one-line email to
  Black would settle it.
- Who made the GitHub mirror of the java.net Mercurial repo, and who is
  **pluckyporcupine** (the 2018 migration author — no commits under that
  name survive in our history; their work came in as a tree overlay)?
  One clue: in the converted git history, Flood's 2011–12 commits carry a
  `chmfy@users.noreply.github.com` address — that email form dates from
  2013+, so the hg→git conversion mapped her to a GitHub account `chmfy`,
  meaning the mirror's maker knew her mapping.
- The pre-2007 record (2003–2006 design era) — see the open hunts in
  `research/README.md`.
