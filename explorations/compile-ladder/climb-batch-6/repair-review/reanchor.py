#!/usr/bin/env python3
# reanchor.py [--write]: re-anchors, in the revival's older tests, the citations of the eight chapters rung T edited
# (JUDGE-review.md, finding 1 and step 9). Run from the repository root. Without --write it only reports.
# The map: for each chapter, the equal blocks of difflib.SequenceMatcher(None, base, tree, autojunk=False) between
# git show e5414f5bf:<chapter> and the working tree's file take base line i to tree line j.
# A reference is <chapter>.tex:N or :N-M, or a bare :N[-M] preceded by a space, comma or parenthesis whose nearest
# preceding name.ext: on the same line is one of the chapters. A reference whose path names Specification-1.0-frozen
# is not the live chapter's and is never rewritten.
import difflib, os, re, subprocess, sys

BASE = "e5414f5bf"
CHAPTERS = {
    "numbers": "Specification/basic-lib/numbers.tex",
    "basic-integers": "Specification/basic-lib/basic-integers.tex",
    "numbers-advanced": "Specification/advanced-lib/numbers-advanced.tex",
    "reductions": "Specification/basic/expressions/reductions.tex",
    "conversions-coercions": "Specification/basic/conversions-coercions.tex",
    "literals": "Specification/basic/expressions/literals.tex",
    "changes": "Specification/appendices/changes.tex",
    "internal-document": "Specification/appendices/internal-document.tex",
}
CORPORA = ["ProjectFortress/tests", "ProjectFortress/compiler_tests", "ProjectFortress/library_tests"]
SKIP = {  # the gather re-anchored rung F's four; the repair's own new test cites the tree; rung S's seven are left (JUDGE-review.md:45)
    "FlatTowerRungF.fss", "XXXEmptyGroupSumRungF.fss", "XXXRR32MixedRungF.fss", "XXXUnwrittenSumRungF.fss",
    "XXXQQPowerExponent.fss",
    "XXXFortToStringRungS.fss", "XXXTupleVarFieldCompiledRungC.fss", "XXXUnionMethodRungS.fss", "MaybeRungM.fss",
    "XXXFlatStringSplitRungL.fss", "XXXTupleSeparatorRungS.fss", "XXXTupleSevenRungS.fss",
}
EXPECTED = {  # JUDGE-review.md:32-34
    "ProjectFortress/tests/" + n + ".fss" for n in (
        "CoercionBindRungC CoercionCallRungC CoercionMostSpecificRungC CoercionOverloadRungC CoercionRedispatchRungC "
        "CoercionSpecTableRungC IntSemanticsRungI RoundHalfEvenRungR WrapOperatorsRungD XXXCoercionGenericFnRungC "
        "XXXCoercionGenericTraitRungC XXXCoercionReturnRungC XXXCoercionStaticNarrowRungC XXXCoercionStaticRungC "
        "XXXCoercionTupleOverloadRungC XXXFixedWidthOverflowRungB XXXRadixTenPointNumeral XXXRoundNearTieNumeral").split()
} | {
    "ProjectFortress/compiler_tests/" + n + ".fss" for n in (
        "IntSemanticsRungB XXXCoercionAnyOverloadRungC XXXCoercionGenericFnCompiledRungC XXXNatLitArgChecker "
        "XXXShiftDeclRungI").split()
} | {"ProjectFortress/library_tests/IntConversionsRungW.fss", "ProjectFortress/library_tests/IntegralOpsRungN.fss"}

def lines_of(text):
    return text.split("\n")

maps, base_text, tree_text = {}, {}, {}
for key, path in CHAPTERS.items():
    b = lines_of(subprocess.run(["git", "show", BASE + ":" + path], capture_output=True, text=True, check=True).stdout)
    t = lines_of(open(path, encoding="utf-8").read())
    m = {}
    for blk in difflib.SequenceMatcher(None, b, t, autojunk=False).get_matching_blocks():
        for k in range(blk.size):
            m[blk.a + k + 1] = blk.b + k + 1  # 1-based
    maps[key], base_text[key], tree_text[key] = m, b, t

CH = "|".join(sorted(map(re.escape, CHAPTERS), key=len, reverse=True))
EXPLICIT = re.compile(r"(?<![A-Za-z0-9_.-])(" + CH + r")\.tex:(\d+)(?:-(\d+))?")
ANYNAME = re.compile(r"([A-Za-z0-9_][A-Za-z0-9_.-]*)\.([A-Za-z0-9]+):")
BARE = re.compile(r"(?<=[ ,(]):(\d+)(?:-(\d+))?")

def refs(line):
    """Yield (kind, chapter, start, end, n, m, frozen) for every reference on the line; start/end span the digits."""
    for mo in EXPLICIT.finditer(line):
        s = mo.start()
        prefix = line[max(0, s - 80):s]
        frozen = bool(re.search(r"Specification-1\.0-frozen/[A-Za-z0-9_./-]*$", prefix)) or prefix.rstrip().endswith("frozen")
        yield ("explicit", mo.group(1), mo.start(2), mo.end(3) if mo.group(3) else mo.end(2),
               int(mo.group(2)), int(mo.group(3)) if mo.group(3) else None, frozen)
    for mo in BARE.finditer(line):
        before = line[:mo.start()]
        names = list(ANYNAME.finditer(before))
        if not names:
            continue
        last = names[-1]
        if last.group(2) != "tex" or last.group(1) not in CHAPTERS:
            continue
        s = last.start()
        prefix = line[max(0, s - 80):s]
        frozen = bool(re.search(r"Specification-1\.0-frozen/[A-Za-z0-9_./-]*$", prefix)) or prefix.rstrip().endswith("frozen")
        yield ("continuation", last.group(1), mo.start(1), mo.end(2) if mo.group(2) else mo.end(1),
               int(mo.group(1)), int(mo.group(2)) if mo.group(2) else None, frozen)

def in_message_or_comment(line, pos, in_comment):
    if in_comment or line.lstrip().startswith("(*"):
        return True
    q = [i for i, c in enumerate(line[:pos]) if c == '"']
    return len(q) % 2 == 1

write = "--write" in sys.argv
files = []
for c in CORPORA:
    for n in sorted(os.listdir(c)):
        if n.endswith(".fss") and n not in SKIP:
            p = os.path.join(c, n)
            if EXPLICIT.search(open(p, encoding="utf-8").read()):
                files.append(p)

out = []
tot = {"explicit": 0, "continuation": 0}
changed_files, unmapped, frozen_seen, unmoved = [], [], [], []
diff_ok = True
for p in files:
    src = open(p, encoding="utf-8").read().split("\n")
    new = list(src)
    depth = 0
    nfile = 0
    for i, line in enumerate(src):
        comment_at_start = depth > 0
        edits = []
        for kind, ch, s, e, n, m, frozen in refs(line):
            old = f"{n}-{m}" if m is not None else f"{n}"
            if frozen:
                frozen_seen.append(f"{p}:{i+1} {ch}.tex:{old}")
                continue
            mp = maps[ch]
            if n not in mp or (m is not None and m not in mp):
                unmapped.append(f"{p}:{i+1} {kind} {ch}.tex:{old}")
                continue
            n2 = mp[n]; m2 = mp[m] if m is not None else None
            newref = f"{n2}-{m2}" if m2 is not None else f"{n2}"
            if newref == old:
                unmoved.append(f"{p}:{i+1} {kind} {ch}.tex:{old}")
                continue
            bt = base_text[ch][n - 1:(m or n)]
            tt = tree_text[ch][n2 - 1:(m2 or n2)]
            ok = bt == tt
            where = "message/comment" if in_message_or_comment(line, s, comment_at_start) else "CODE"
            edits.append((s, e, newref))
            tot[kind] += 1
            nfile += 1
            out.append(f"{p}:{i+1}  {kind:12s} {ch}.tex  :{old} -> :{newref}  text {'equal' if ok else 'DIFFERS'}  ({where})")
            if not ok or where == "CODE":
                diff_ok = False
        for s, e, newref in sorted(edits, reverse=True):
            new[i] = new[i][:s] + newref + new[i][e:]
        depth += line.count("(*") - line.count("*)")
    if nfile:
        changed_files.append((p, nfile))
        if write:
            open(p, "w", encoding="utf-8").write("\n".join(new))

print("# reanchor.py" + (" --write" if write else "") + ", run at the repository root; the map is base " + BASE + " -> the working tree")
print("# per rewritten reference: file:line, kind, chapter, old -> new, whether the old lines' text at the base equals the new lines' text in the tree, and where on the line it sits")
print("\n".join(out))
print(f"# rewritten: {tot['explicit'] + tot['continuation']} references ({tot['explicit']} explicit, {tot['continuation']} continuations) in {len(changed_files)} files")
for p, k in changed_files:
    print(f"#   {p}: {k}")
got = {p for p, _ in changed_files}
print("# the 25 files of JUDGE-review.md:32-34: " + ("exactly these" if got == EXPECTED else f"DIFFER: missing {sorted(EXPECTED - got)}, extra {sorted(got - EXPECTED)}"))
print(f"# references that do not map (left): {len(unmapped)}")
for u in unmapped: print("#   " + u)
print(f"# references to Specification-1.0-frozen (never rewritten): {len(frozen_seen)}")
for u in frozen_seen: print("#   " + u)
print(f"# references whose lines did not move (nothing to rewrite): {len(unmoved)}")
for u in unmoved: print("#   " + u)
print("# every rewritten reference: text equal and inside a message or a comment: " + ("yes" if diff_ok else "NO"))
