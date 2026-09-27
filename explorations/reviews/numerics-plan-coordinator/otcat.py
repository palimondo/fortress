import sys, collections, re
CATS = [
 ("row 421 cascade (MAX/MIN answering a pair), cleared by R421 (measured)", ["List.fss:72","List.fss:75","List.fss:332","RangeInternals.fss:449"]),
 ("number conversion functions declared on leaves only (big, signed/widen on NN32/NN64)", ["FortressLibrary.fss:913","FortressLibrary.fss:915","FortressLibrary.fss:764"]),
 ("QQ bodies: an infinity case answering QQ where ZZ is declared; -other on AnyIntegral; typecase on CMP", ["FortressLibrary.fss:620","FortressLibrary.fss:615","FortressLibrary.fss:608","FortressLibrary.fss:609","FortressLibrary.fss:503","?"]),
 ("number leaves' own getters/natives declared at another width (IntLiteral zero = big(0); UnsignedLong zero = widen(unsigned(0)); RR32 MINNUM/MAXNUM; RR32 avFlat)", ["FortressBuiltin.fss:471","FortressBuiltin.fss:472","FortressBuiltin.fss:460","FortressBuiltin.fss:461","FortressBuiltin.fss:347","FortressBuiltin.fss:357","String.fss:508"]),
 ("a leaf-only integer function called at a type parameter (partitionL(x), x: I)", ["FortressLibrary.fss:2107"]),
 ("typecase narrowing a type parameter to ZZ32 gives AND(ZZ32, I)", ["FortressLibrary.fss:3877","FortressLibrary.fss:3878","FortressLibrary.fss:3879"]),
 ("a range over numerals inferred at IntLiteral ((0#1).narrowToRange)", ["FortressLibrary.fss:1317","FortressLibrary.fss:1320"]),
 ("range operators applied at Any (truncL(x:Any) = (x#), every, atMost ...)", ["FortressLibrary.fss:3759","FortressLibrary.fss:3760","FortressLibrary.fss:3763","FortressLibrary.fss:3764","FortressLibrary.fss:3765"]),
 ("PCMP/SCMP on tuples in FortressLibrary's unbounded range traits", ["FortressLibrary.fss:3867","FortressLibrary.fss:3868","FortressLibrary.fss:3840","FortressLibrary.fss:3815","FortressLibrary.fss:3782","FortressLibrary.fss:3729"]),
 ("range bodies: declared type narrower / wrong arity / tuple slips / range built with +", ["FortressLibrary.fss:3857","FortressLibrary.fss:3746","FortressLibrary.fss:3699","FortressLibrary.fss:3836","RangeInternals.fss:1290","RangeInternals.fss:1168","RangeInternals.fss:999","RangeInternals.fss:964","RangeInternals.fss:917","RangeInternals.fss:952","RangeInternals.fss:906","RangeInternals.fss:946","RangeInternals.fss:1008","RangeInternals.fss:1010","FortressLibrary.fss:4066"]),
 ("seq(...) of a Range (no seq overload for Range)", ["FortressLibrary.fss:4564","String.fss:486"]),
 ("map with a tuple-pattern lambda in range code (not applicable to any type of the form _->_)", ["RangeInternals.fss:1378","RangeInternals.fss:1341","RangeInternals.fss:1133","RangeInternals.fss:1100"]),
]
where = {}
for name, sites in CATS:
    for s in sites: where[s] = name
cnt = collections.Counter(); ex = collections.defaultdict(list)
for l in open(sys.argv[1], encoding="utf-8"):
    q = l.rstrip("\n").split("\t")
    if len(q) < 4 or q[0] != "OT": continue
    loc = q[2].split(",")[0]
    if loc == "?" and "FortressLibrary.fss:50" not in q[3]: c = "other (not numbers)"
    else: c = where.get(loc, "other (not numbers)")
    cnt[c] += 1; ex[c].append(loc)
for c, n in cnt.most_common(): print(n, c, " ".join(sorted(set(ex[c])))[:300] if not c.startswith("other") else "")
print(sum(cnt.values()))
