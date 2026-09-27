#!/usr/bin/env python3
"""summarize.py [--only REGEX] <program.fss> <capture>... : one entry per line of the program on which any capture
has a traced call or an error, and under it one line per capture: each call traced at that line
(expected type -> static arguments inferred, the phase that succeeded, the arguments' node kinds and
types) and the program's own errors at that line, cut. A capture is check.sh's (the one library,
@@PROBE-R trace lines, `NN:Name.fss:L:C:` error lines) or tcheck.sh's (the compiler's library).
The capture's tag is its file name less the program's name. A call that infers no static argument
(a non-generic call, "[]") is left out of the line; --only keeps the program lines matching REGEX."""
import os, re, sys

argv = sys.argv[1:]
only = None
if argv[0] == "--only": only = re.compile(argv[1]); argv = argv[2:]
prog = argv[0]
name = os.path.basename(prog)[:-4]
src = open(prog, encoding="utf-8").read().split("\n")
res = []
for p in argv[1:]:
    tag = os.path.basename(p)[len(name) + 1:-4]
    calls, errs = {}, {}
    lines = open(p, encoding="utf-8", errors="replace").read().split("\n")
    for i, l in enumerate(lines):
        m = re.match(r"@@PROBE-R (FN|MI|OP)(-OK|-FAIL)? (?:\S*/)?%s\.fss:(\d+):(\S+)(.*)" % name, l)
        if m:
            ln, sp, rest = int(m.group(3)), m.group(4), m.group(5)
            d = calls.setdefault((ln, sp), {})
            if m.group(2) is None:
                e = re.search(r"expected=(.*)$", rest); d["exp"] = e.group(1) if e else "?"
            elif m.group(2) == "-OK":
                s = re.search(r"sargs=(.*?) range=", rest).group(1).replace(" ", "")
                ph = re.search(r"phase=(\S+)", rest)
                a = re.search(r"args=(\(.*\))", rest)
                args = re.sub(r"(\w+):", lambda k: {"TraitCoercionInvocation": "coerce:", "UnionCoercionInvocation": "coerce:",
                                                  "TupleCoercionInvocation": "coerce:"}.get(k.group(1), ""), a.group(1)) if a else ""
                d["res"] = s + (" " + ph.group(1) if ph else "") + (" " + args if "coerce:" in args else "")
            else:
                d["res"] = "FAIL"
        m = re.match(r"^(?:\d+[:-])?(?:\S*/)?%s\.fss:(\d+):" % name, l)
        if m and not l.startswith("@@"):
            nxt = []
            for x in lines[i + 1:i + 4]:
                x2 = re.sub(r"^\d+-", "", x)
                if re.match(r"^(?:\d+[:-])?(?:\S*/)?\S+\.fs[si]:\d+", x) or x2.startswith("File ") or x2.startswith("###") or x2.startswith("#"):
                    break
                nxt.append(x2.strip())
            errs.setdefault(int(m.group(1)), []).append(" ".join(nxt)[:220])
    res.append((tag, calls, errs))
for ln, text in enumerate(src, 1):
    if only and not only.search(text): continue
    if not any(k[0] == ln and not v.get("res", "").startswith("[]") for _, c, _ in res for k, v in c.items()) \
       and not any(ln in e for _, _, e in res):
        continue
    print(f"{name}.fss:{ln}  {text.strip()[:150]}")
    for tag, calls, errs in res:
        cs = sorted(((k, v) for k, v in calls.items() if k[0] == ln and not v.get("res", "").startswith("[]")), key=lambda kv: kv[0])
        parts = [f"{sp} expected={v.get('exp', '?')} -> {v.get('res', '?')}" for (l, sp), v in cs]
        e = "; ".join(dict.fromkeys(errs.get(ln, []))) or "no error"
        print(f"    {tag:24s} {' | '.join(parts) or '(no call traced)'}  ::  {e}")
