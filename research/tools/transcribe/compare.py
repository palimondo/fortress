"""Compare two machine transcripts of a talk, and score each against a reference.

usage: compare.py diff WHISPER.json QWEN.json
       compare.py score REFERENCE.md WHISPER.json QWEN.json

WHISPER.json is whisper_transcribe.py's output; QWEN.json is qwen_transcribe.py's
(or a plain list of windows). Both are normalized the same way: case and
punctuation dropped, CamelCase split (SortedList -> sorted list), hyphens split,
digits 0-10 spelled out, um/uh dropped, and a few spellings merged (run time /
runtime, type sound / type-sound / typesound, trade off / tradeoff, ...).

diff lists every place where the two models' normalized words differ (difflib),
with Whisper's time and word probabilities.

score aligns each model with the reference by edit distance and prints its word
error rate, (S + D + I) / N, and every error. The reference is a Markdown
transcript: its speech is every line that is not a heading, a blockquote ("> ",
the slides' text) or an HTML comment; a leading **Speaker:** label and a time
"(m:ss)" are dropped. A doubtful word written [word?] may be present or absent,
and [one/other?] accepts either reading, at no cost.
"""
import difflib, json, re, sys

NUM = {"0": "zero", "1": "one", "2": "two", "3": "three", "4": "four", "5": "five",
       "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten"}
FILLERS = {"um", "uh", "er", "erm", "hmm", "mm", "ah"}
SAME = {"ok": "okay", "π": "pi", "α": "alpha"}
MERGE = {("run", "time"): "runtime", ("type", "sound"): "typesound", ("trade", "off"): "tradeoff",
         ("non", "ambiguity"): "nonambiguity", ("type", "soundness"): "typesoundness",
         ("well", "typed"): "welltyped"}


def merge(toks, key=lambda x: x, setkey=lambda x, m: m):
    res, i = [], 0
    while i < len(toks):
        m = MERGE.get((key(toks[i]), key(toks[i + 1]))) if i + 1 < len(toks) else None
        if m:
            res.append(setkey(toks[i], m)); i += 2
        else:
            res.append(toks[i]); i += 1
    return res


def norm_tokens(text):
    text = re.sub(r"(?<=[a-z])(?=[A-Z])", " ", text)
    for ch in "—–-":
        text = text.replace(ch, " ")
    out = []
    for raw in text.replace("’", "'").split():
        t = re.sub(r"[^a-z0-9'απ]", "", raw.lower()).strip("'")
        if not t:
            continue
        t = SAME.get(NUM.get(t, t), NUM.get(t, t))
        if t not in FILLERS:
            out.append(t)
    return merge(out)


def whisper_words(path):
    words = []
    for s in json.load(open(path, encoding="utf-8"))["segments"]:
        for w in s["words"]:
            for t in norm_tokens(w["w"]):
                words.append({"t": t, "s": w["s"], "p": w["p"]})
    return merge(words, key=lambda x: x["t"], setkey=lambda x, m: dict(x, t=m))


def qwen_words(path):
    d = json.load(open(path, encoding="utf-8"))
    words = []
    for i, x in enumerate(d["windows"] if isinstance(d, dict) else d):
        text = re.sub(r"^language \w+<asr_text>", "", x["text"].strip())
        for t in norm_tokens(text):
            words.append({"t": t, "win": i, "s": x["start"]})
    return words


def ref_slots(md):
    """The reference's speech as slots: (acceptable tokens, optional, surface)."""
    text = re.sub(r"<!--.*?-->", "", open(md, encoding="utf-8").read(), flags=re.S)
    slots = []
    for ln in text.split("\n"):
        if not ln.strip() or ln.startswith("#") or ln.startswith(">"):
            continue
        ln = re.sub(r"^\*\*[^*]*\*\*\s*", "", ln)
        ln = re.sub(r"^\(\d+:\d\d\)\s*", "", ln).replace("[…]", " ")
        pos = 0
        for m in list(re.finditer(r"\[([^\]]*?)\?\]", ln)) + [None]:
            end = m.start() if m else len(ln)
            slots += [({t}, False, t) for t in norm_tokens(ln[pos:end])]
            if m is None:
                break
            body = m.group(1)
            if "/" in body:
                alts = [norm_tokens(x) for x in body.split("/")]
                assert all(len(x) == 1 for x in alts), body
                slots.append(({x[0] for x in alts}, False, body))
            else:
                slots += [({t}, True, t) for t in norm_tokens(body)]
            pos = m.end()
    return slots


def align(slots, hyp):
    """Edit-distance alignment; ops M (match), S, D, O (optional slot left out), I."""
    n, m = len(slots), len(hyp)
    D = [[0] * (m + 1) for _ in range(n + 1)]
    B = [[None] * (m + 1) for _ in range(n + 1)]
    for i in range(n + 1):
        for j in range(m + 1):
            if i == 0 and j == 0:
                continue
            cands = []
            if i and j:
                ok = hyp[j - 1] in slots[i - 1][0]
                cands.append((D[i - 1][j - 1] + (0 if ok else 1), 0, "M" if ok else "S"))
            if i:
                cands.append((D[i - 1][j] + (0 if slots[i - 1][1] else 1), 1, "O" if slots[i - 1][1] else "D"))
            if j:
                cands.append((D[i][j - 1] + 1, 2, "I"))
            D[i][j], _, B[i][j] = min(cands)
    ops, i, j = [], n, m
    while i or j:
        b = B[i][j]
        ops.append((b, i - 1 if b != "I" else None, j - 1 if b in "MSI" else None))
        i, j = (i - 1 if b != "I" else i), (j - 1 if b in "MSI" else j)
    return ops[::-1]


def mmss(t):
    return f"{int(t // 60):02d}:{t % 60:05.2f}"


def diff(wpath, qpath):
    W, Q = whisper_words(wpath), qwen_words(qpath)
    wt, qt = [w["t"] for w in W], [q["t"] for q in Q]
    n = 0
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, wt, qt, autojunk=False).get_opcodes():
        if tag == "equal":
            continue
        n += 1
        t = W[min(i1, len(W) - 1)]["s"]
        ps = ",".join(f"{W[k]['p']:.2f}" for k in range(i1, i2))
        print(f"D{n:03d} {mmss(t)} {tag:7s} ...{' '.join(wt[max(0, i1 - 5):i1])} | "
              f"W: [{' '.join(wt[i1:i2])}] ({ps}) | Q: [{' '.join(qt[j1:j2])}] | {' '.join(wt[i2:i2 + 4])}...")
    print(f"{n} places differ; Whisper {len(wt)} words, Qwen {len(qt)}")


def score(md, wpath, qpath):
    slots = ref_slots(md)
    N = sum(1 for s in slots if not s[1])
    for name, H in (("Whisper", whisper_words(wpath)), ("Qwen", qwen_words(qpath))):
        hyp = [h["t"] for h in H]
        ops = align(slots, hyp)
        c = {k: sum(1 for o in ops if o[0] == k) for k in "SDI"}
        print(f"{name}: N={N} S={c['S']} D={c['D']} I={c['I']} WER={(c['S'] + c['D'] + c['I']) / N * 100:.2f}%")
        for k, (op, i, j) in enumerate(ops):
            if op in "MO":
                continue
            ri = i if i is not None else next((o[1] for o in ops[k:] if o[1] is not None), len(slots))
            ctx = " ".join(s[2] for s in slots[max(0, ri - 4):ri])
            ref = slots[i][2] if i is not None else ""
            got = hyp[j] if j is not None else ""
            when = mmss(H[j]["s"]) if j is not None else "     "
            print(f"  {op} {when} {ref!r:>16} -> {got!r:<16} after: {ctx}")


if __name__ == "__main__":
    if len(sys.argv) == 4 and sys.argv[1] == "diff":
        diff(sys.argv[2], sys.argv[3])
    elif len(sys.argv) == 5 and sys.argv[1] == "score":
        score(sys.argv[2], sys.argv[3], sys.argv[4])
    else:
        sys.exit(__doc__)
