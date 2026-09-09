# AD worker continuation

Working source: AutodiffGraphProbe.fss. All changes restricted to this worker.

API: V.primal; constant(RR64); variable(ZZ32,RR64); gradient(V,ZZ32) -> Array[RR64,ZZ32]. Operators + - juxtaposition / ^ SQRT; scalar RR64 mixed arithmetic; exp/log/relu. Ordinary SUM clauses supported via `import FortressLibrary.{...} except { opr BIG + }` and custom zero-argument SUM comprehension. List is not required.

Construction allocates immutable parent edges and fresh nodes without global IDs. Mutable per-node seen/adjoint fields are used only during sequential reverse. DFS marks nodes and prepends to a linked reverse topological order. Backward visits each node once; cleanup clears seen and adjoint so sequential repeated calls work. Calls to gradient on overlapping graphs MUST NOT run concurrently; construction remains unrestricted and parallel-safe.

Walk must be parameterized and instantiated as Walk(0): a parameterless object is a singleton and would retain prior chain state. Arrays fill with .fill(0.0), not .fill(0,0.0). Numeric conversion uses 1.0 i, not i.asFloat(). Bind function results before indexing.

Recorded successful interpreter tests:
- experiment/evidence/20260907T203517.817562Z-ad-graph-probe/output.log: analytic derivatives of shared multiplication, exp, log, ReLU, power; repeated gradient; parallel SUM; SQRT.
- experiment/evidence/20260907T203545.128691Z-ad-graph-shared-stress/output.log: 30-level diamond with 2^30 paths completes in linear graph work.
- experiment/evidence/20260907T203620.542037Z-ad-graph-8191-stress/output.log: all above plus 8191-node balanced addition tree, giving reverse Chain length 8192. PASS in 3.582 seconds with -Xss32m. Also confirms no List dependency and ordinary SUM clauses.

Use interpreter only, after source experiment/env.sh:
JAVA_FLAGS='-Xmx512m -Xss32m -Dfortress.cache=/tmp/fortress-microgpt-ad-cache' python experiment/record.py ad-graph-8191-stress 120 bin/fortress walk experiment/worker/autodiff/AutodiffGraphProbe.fss

Initial compile/run attempts were wrong execution mode and failed; no builds or setup were run. Original AutodiffProbe.fss retained for archaeology but has exponential recursive backprop and old syntax issues. Canonical main design remains parent-owned.
