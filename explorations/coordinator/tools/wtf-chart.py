#!/usr/bin/env python3
# wtf-chart.py: counts the curator's swear words in the coordinating session's transcripts, by day and by the model version that served the session, and writes a page and its data; run it with no argument from the repository's root: python3 explorations/coordinator/tools/wtf-chart.py
"""Standard library only. Reads the live transcript and the transcript backup
line by line, prints a short table, and writes page.html and data.json into
OUT_DIR. A later run refreshes both from the transcripts as they then stand."""

import datetime as dt
import glob
import html
import json
import math
import os
import random
import re
import sys
from collections import Counter, defaultdict

# ---------------------------------------------------------------- word lists
# Main series: the f-word family, in the spellings that dictation gives.
# Matches are case-insensitive; overlapping matches count once
# ("what the fuck" is one word of the family, not two).
F_WORDS = [
    ("fuck and its forms (fucking, fucked, fucker, fuckin, fucks)", r"\bf+u+c+k+\w*"),
    ("fck, f*ck, f*cking", r"\bf[*]?ck\w*"),
    ("f*** and other masked forms that dictation writes", r"\bf\*{2,}\w*"),
    ("motherfucker, mother f***er", r"\bmother[\s-]?f(?:u|\*)\w*"),
    ("WTF, OMFG", r"\b(?:wtf|omfg)\b"),
    ("what the f (cut off, or followed by dots)", r"\bwhat the f(?![a-z])"),
    ("fark and its forms (farking)", r"\bfark\w*"),
]
# Wider series: the f-word family plus these.
OTHER_WORDS = [
    ("shit and its forms (bullshit, shitty)", r"\w*shit\w*"),
    ("s*** and other masked forms", r"\bs\*{2,}\w*"),
    ("crap, crappy", r"\bcrap\w*"),
    ("damn, dammit, goddamn", r"\b(?:god)?dam(?:n|mit)\w*"),
    ("hell, as a word", r"\bhell\b"),
    ("bloody", r"\bbloody\b"),
    ("bollocks", r"\bbollocks\b"),
    ("bastard", r"\bbastards?\b"),
    ("ass, asshole, arse, dumbass", r"\b(?:ass|\w*ass(?:hole|hat)s?|arse\w*|dumbass\w*)\b"),
    ("piss and its forms (pissed)", r"\bpiss\w*"),
    ("jesus, as an exclamation", r"\bjesus\b"),
    ("effing, frigging, freaking", r"\b(?:effing|eff(?:ing)?\b|friggin\w*|freakin\w*)"),
]

# ---------------------------------------------------------------- sources
PROJECT = "-home-user-fortress"
SESSION = "fe616d40-a9c6-56d7-9da1-7168a172765d"
LIVE = f"/root/.claude/projects/{PROJECT}/{SESSION}.jsonl"
BACKUP = "/home/user/fortress-transcripts-blinded/projects"
OUT_DIR = f"/tmp/claude-0/{PROJECT}/{SESSION}/scratchpad/wtf"
COMMAND = "python3 explorations/coordinator/tools/wtf-chart.py"

SYSTEM_PREFIXES = (
    "<system-reminder", "[SYSTEM NOTIFICATION", "<task-notification",
    "Another Claude session", "This session is being continued", "<local-command",
    "<command-name", "<command-message", "<bash-input", "<bash-stdout", "<bash-stderr",
    "[Request interrupted", "Caveat: The messages below",
)
REMINDER = re.compile(r"<system-reminder>.*?</system-reminder>", re.S)
F_RE = [re.compile(p, re.I) for _, p in F_WORDS]
O_RE = [re.compile(p, re.I) for _, p in OTHER_WORDS]
ANY_RE = re.compile("|".join(p for _, p in F_WORDS + OTHER_WORDS), re.I)
COMMENT_HDR = re.compile(
    r"\[the user \((?:owner|editor|commenter|viewer)\)[^\]\n]*?(\d{4}-\d\d-\d\dT\d\d:\d\d)\]\n"
    r"((?:[ \t]+[0-9a-f]{6,16}\|[^\n]*(?:\n|$))+)")
COMMENT_LINE = re.compile(r"^[ \t]+[0-9a-f]{6,16}\| ?(.*)$")
ART_COMMENT = re.compile(r"=== BEGIN ARTIFACT COMMENT \w+ ===\n(.*?)\n=== END ARTIFACT COMMENT", re.S)
ART_SENT = re.compile(r"Sent to Claude at: (\d{4}-\d\d-\d\dT\d\d:\d\d)")


def spans(text, regs):
    out = []
    for r in regs:
        out += [(m.start(), m.end()) for m in r.finditer(text)]
    out.sort()
    merged = []
    for s, e in out:
        if merged and s < merged[-1][1]:
            merged[-1] = (merged[-1][0], max(e, merged[-1][1]))
        else:
            merged.append((s, e))
    return merged


def count_words(text):
    """(f-word count, wider count) of a text."""
    return len(spans(text, F_RE)), len(spans(text, F_RE + O_RE))


def model_label(mid):
    """Family and version from a model identifier: the first alphabetic token
    after the vendor prefix is the family; the short numeric tokens after it
    are the version; a long numeric token (a date) ends it."""
    if not mid or not mid.lower().startswith("claude"):
        return None
    toks = mid.split("[")[0].split("-")[1:]
    fam, ver = None, []
    for t in toks:
        if fam is None:
            if t.isalpha():
                fam = t.capitalize()
            continue
        if t.isdigit() and len(t) <= 2:
            ver.append(t)
        else:
            break
    if fam is None:
        return None
    return fam + (" " + ".".join(ver) if ver else "")


def text_of(content):
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        return "\n".join(x.get("text", "") for x in content
                         if isinstance(x, dict) and x.get("type") == "text")
    return ""


def tool_result_texts(content):
    if not isinstance(content, list):
        return []
    out = []
    for x in content:
        if isinstance(x, dict) and x.get("type") == "tool_result":
            c = x.get("content")
            out.append(c if isinstance(c, str) else text_of(c))
    return out


def source_files():
    files = []
    for d in sorted(os.listdir(BACKUP)):
        p = os.path.join(BACKUP, d)
        if not os.path.isdir(p):
            continue
        for f in sorted(os.listdir(p)):
            fp = os.path.join(p, f)
            if f.endswith(".jsonl"):
                files.append(fp)
            elif f.endswith(".jsonl.parts"):
                files += sorted(glob.glob(fp + "/*.jsonl"))
    if os.path.exists(LIVE):
        files.append(LIVE)
    return files


def is_human(e):
    return (e.get("type") == "user" and not e.get("isMeta") and not e.get("isSidechain")
            and not e.get("isCompactSummary") and (e.get("origin") or {}).get("kind") == "human")


# ---------------------------------------------------------------- reading
def read_sources():
    files = source_files()
    # Pass 1: a main session is one with at least one entry whose origin is a human.
    main = set()
    for fp in files:
        with open(fp, "rb") as fh:
            for line in fh:
                if b'"kind":"human"' in line:
                    try:
                        e = json.loads(line)
                    except ValueError:
                        continue
                    if is_human(e):
                        main.add(e.get("sessionId"))
    seen_uuid, seen_key = set(), set()
    msgs, replies, echoes, comments = [], defaultdict(list), defaultdict(list), {}
    stats = Counter()
    files_used = set()
    for fp in files:
        with open(fp, "rb") as fh:
            for line in fh:
                if b'"sessionId"' not in line:
                    continue
                try:
                    e = json.loads(line)
                except ValueError:
                    stats["bad lines"] += 1
                    continue
                sid = e.get("sessionId")
                if sid not in main or e.get("isSidechain"):
                    continue
                t = e.get("type")
                if t not in ("user", "assistant"):
                    continue
                u = e.get("uuid")
                if u in seen_uuid:
                    continue
                seen_uuid.add(u)
                files_used.add(fp)
                ts = e.get("timestamp") or ""
                m = e.get("message") or {}
                if t == "assistant":
                    lab = model_label(m.get("model"))
                    if lab:
                        replies[sid].append((ts, lab))
                    txt = text_of(m.get("content"))
                    if txt and ANY_RE.search(txt):
                        echoes[sid].append((ts, " ".join(txt.lower().split())))
                    continue
                content = m.get("content")
                for tr in tool_result_texts(content):
                    if "[the user (" in tr:
                        for hm in COMMENT_HDR.finditer(tr):
                            body = "\n".join(COMMENT_LINE.match(l).group(1)
                                             for l in hm.group(2).rstrip("\n").split("\n"))
                            add_comment(comments, hm.group(1), body, sid)
                if e.get("isMeta") or e.get("isCompactSummary"):
                    continue
                txt = REMINDER.sub("", text_of(content)).strip()
                if not txt:
                    continue
                if txt.startswith("[Artifact comment"):
                    sent = ART_SENT.search(txt)
                    for bm in ART_COMMENT.finditer(txt):
                        body = "\n".join(re.sub(r"^> ?", "", l) for l in bm.group(1).split("\n"))
                        add_comment(comments, sent.group(1) if sent else ts[:16], body, sid)
                    continue
                if txt.startswith(SYSTEM_PREFIXES):
                    continue
                kind = (e.get("origin") or {}).get("kind")
                if kind not in (None, "human"):
                    continue
                key = (ts, txt)
                if key in seen_key:
                    stats["duplicates by time and text"] += 1
                    continue
                seen_key.add(key)
                msgs.append({"sid": sid, "ts": ts, "text": txt})
    for v in replies.values():
        v.sort()
    return msgs, replies, echoes, comments, stats, main, files_used


def add_comment(comments, minute, body, sid):
    body = body.strip()
    if not body:
        return
    key = (minute, " ".join(body.split())[:300])
    if key not in comments:
        comments[key] = {"ts": minute + ":00Z", "text": body, "sid": sid}


def model_before(replies, sid, ts):
    lst = replies.get(sid, [])
    lo, hi = 0, len(lst)
    while lo < hi:
        mid = (lo + hi) // 2
        if lst[mid][0] < ts:
            lo = mid + 1
        else:
            hi = mid
    return lst[lo - 1][1] if lo else "no reply yet"


def own_words(msg, echoes):
    """His text without quoted lines: a line that starts with '>' is a quote,
    and so is a line with a swear word that an earlier reply of the coordinator
    holds word for word."""
    kept, dropped = [], []
    for line in msg["text"].split("\n"):
        s = line.strip()
        if s.startswith(">"):
            dropped.append(s)
            continue
        if ANY_RE.search(s):
            norm = " ".join(s.lower().split())
            if len(norm) >= 25 and any(t < msg["ts"] and norm in body
                                       for t, body in echoes.get(msg["sid"], [])):
                dropped.append(s)
                continue
        kept.append(line)
    return "\n".join(kept), "\n".join(dropped)


# ---------------------------------------------------------------- statistics
def _gammp(a, x):
    """Regularized lower incomplete gamma P(a, x)."""
    if x <= 0:
        return 0.0
    gln = math.lgamma(a)
    if x < a + 1:
        ap, s, d = a, 1.0 / a, 1.0 / a
        for _ in range(1000):
            ap += 1
            d *= x / ap
            s += d
            if abs(d) < abs(s) * 1e-14:
                break
        return s * math.exp(-x + a * math.log(x) - gln)
    b, c, d = x + 1 - a, 1e300, 1.0 / (x + 1 - a)
    h = d
    for i in range(1, 1000):
        an = -i * (i - a)
        b += 2
        d = an * d + b
        d = 1e-300 if abs(d) < 1e-300 else d
        c = b + an / c
        c = 1e-300 if abs(c) < 1e-300 else c
        d = 1.0 / d
        h *= d * c
        if abs(d * c - 1) < 1e-14:
            break
    return 1.0 - math.exp(-x + a * math.log(x) - gln) * h


def _gamma_quantile(a, p):
    lo, hi = 0.0, max(10.0, a * 10 + 50)
    for _ in range(200):
        mid = (lo + hi) / 2
        if _gammp(a, mid) < p:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


def poisson_ci(k, alpha=0.05):
    """Exact (Garwood) interval for a Poisson mean, from the chi-square quantiles."""
    lo = 0.0 if k == 0 else _gamma_quantile(k, alpha / 2)
    hi = _gamma_quantile(k + 1, 1 - alpha / 2)
    return lo, hi


def wilson(x, n, z=1.959964):
    if n == 0:
        return 0.0, 1.0
    p = x / n
    den = 1 + z * z / n
    c = (p + z * z / (2 * n)) / den
    h = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / den
    return max(0.0, c - h), min(1.0, c + h)


def cluster_boot(cells, reps=4000, seed=7):
    """cells: list of (count, messages, hours) for each day of one version.
    Returns the resampled rates per 100 messages and per active hour."""
    rng = random.Random(seed)
    n = len(cells)
    per_msg, per_hr = [], []
    for _ in range(reps):
        k = m = h = 0
        for _ in range(n):
            c = cells[rng.randrange(n)]
            k += c[0]; m += c[1]; h += c[2]
        per_msg.append(100.0 * k / m if m else 0.0)
        per_hr.append(k / h if h else 0.0)
    return per_msg, per_hr


def pct(xs, q):
    xs = sorted(xs)
    i = min(len(xs) - 1, max(0, int(round(q * (len(xs) - 1)))))
    return xs[i]


# ---------------------------------------------------------------- analysis
def analyse():
    msgs, replies, echoes, comments, stats, main, files_used = read_sources()
    msgs.sort(key=lambda m: m["ts"])
    for m in msgs:
        m["model"] = model_before(replies, m["sid"], m["ts"])
        own, quoted = own_words(m, echoes)
        m["f"], m["w"] = count_words(own)
        m["qf"], m["qw"] = count_words(quoted)
        m["day"], m["hour"] = m["ts"][:10], m["ts"][:13]
    clist = sorted(comments.values(), key=lambda c: c["ts"])
    for c in clist:
        c["model"] = model_before(replies, c["sid"], c["ts"])
        c["f"], c["w"] = count_words(c["text"])

    versions = sorted({m["model"] for m in msgs},
                      key=lambda v: min(x["ts"] for x in msgs if x["model"] == v))
    # By day.
    days = {}
    d0 = dt.date.fromisoformat(msgs[0]["day"])
    d1 = dt.date.fromisoformat(msgs[-1]["day"])
    d = d0
    while d <= d1:
        days[d.isoformat()] = {"day": d.isoformat(), "messages": 0, "f": 0, "w": 0,
                               "hours": set(), "models": Counter(), "comments": 0, "cf": 0}
        d += dt.timedelta(days=1)
    for m in msgs:
        r = days[m["day"]]
        r["messages"] += 1; r["f"] += m["f"]; r["w"] += m["w"]
        r["hours"].add(m["hour"]); r["models"][m["model"]] += 1
    for c in clist:
        if c["ts"][:10] in days:
            days[c["ts"][:10]]["comments"] += 1
            days[c["ts"][:10]]["cf"] += c["f"]
    day_rows = []
    for r in days.values():
        r["active_hours"] = len(r.pop("hours"))
        r["models"] = dict(r["models"])
        r["rate"] = 100.0 * r["f"] / r["messages"] if r["messages"] else None
        day_rows.append(r)

    # By model version.
    by_v = []
    for v in versions:
        vm = [m for m in msgs if m["model"] == v]
        cells = defaultdict(lambda: [0, 0, set()])
        for m in vm:
            c = cells[m["day"]]
            c[0] += m["f"]; c[1] += 1; c[2].add(m["hour"])
        cl = [(c[0], c[1], len(c[2])) for c in cells.values()]
        n = len(vm); k = sum(m["f"] for m in vm); w = sum(m["w"] for m in vm)
        hrs = len({m["hour"] for m in vm}); x = sum(1 for m in vm if m["f"])
        bm, bh = cluster_boot(cl)
        plo, phi = poisson_ci(k)
        wlo, whi = poisson_ci(w)
        by_v.append({
            "version": v, "messages": n, "active_hours": hrs, "days": len(cl),
            "first": vm[0]["day"], "last": vm[-1]["day"], "f": k, "wide": w,
            "msgs_with_f": x, "quoted_f_dropped": sum(m["qf"] for m in vm),
            "rate100": 100.0 * k / n, "rate100_poisson": [100 * plo / n, 100 * phi / n],
            "rate100_boot": [pct(bm, .025), pct(bm, .975)],
            "rate_hr": k / hrs, "rate_hr_poisson": [plo / hrs, phi / hrs],
            "rate_hr_boot": [pct(bh, .025), pct(bh, .975)],
            "share_f": x / n, "share_f_wilson": list(wilson(x, n)),
            "wide100": 100.0 * w / n, "wide100_poisson": [100 * wlo / n, 100 * whi / n],
            "_boot": bm, "_booth": bh,
        })
    for r in by_v:
        r["rate100_plot"] = [min(r["rate100_boot"][0], r["rate100_poisson"][0]), max(r["rate100_boot"][1], r["rate100_poisson"][1])]
        r["rate_hr_plot"] = [min(r["rate_hr_boot"][0], r["rate_hr_poisson"][0]), max(r["rate_hr_boot"][1], r["rate_hr_poisson"][1])]
    ref = max(by_v, key=lambda r: r["messages"])
    for r in by_v:
        if r is ref or r["days"] < 5 or r["version"] == "no reply yet":
            r["ratio_to_ref"] = None
            continue
        ra = [a / b for a, b in zip(r["_boot"], ref["_boot"]) if b > 0]
        r["ratio_to_ref"] = {"ref": ref["version"],
                             "ratio": r["rate100"] / ref["rate100"] if ref["rate100"] else None,
                             "ci": [pct(ra, .025), pct(ra, .975)] if ra else None}
    for r in by_v:
        r.pop("_boot"); r.pop("_booth")

    # Comments by version.
    c_by_v = []
    for v in sorted({c["model"] for c in clist}):
        cv = [c for c in clist if c["model"] == v]
        k = sum(c["f"] for c in cv)
        lo, hi = poisson_ci(k)
        c_by_v.append({"version": v, "comments": len(cv), "f": k,
                       "rate100": 100.0 * k / len(cv), "rate100_poisson": [100 * lo / len(cv), 100 * hi / len(cv)]})

    # Hours of the day (UTC).
    hod = []
    for h in range(24):
        hm = [m for m in msgs if int(m["ts"][11:13]) == h]
        hod.append({"hour": h, "messages": len(hm), "f": sum(m["f"] for m in hm)})

    # Sessions.
    sess = []
    for sid in sorted(main, key=lambda s: min((m["ts"] for m in msgs if m["sid"] == s), default="z")):
        sm = [m for m in msgs if m["sid"] == sid]
        if not sm:
            continue
        sess.append({"session": sid[:8], "messages": len(sm), "f": sum(m["f"] for m in sm),
                     "first": sm[0]["ts"][:16] + "Z", "last": sm[-1]["ts"][:16] + "Z",
                     "versions": sorted({m["model"] for m in sm})})

    worst = sorted((r for r in day_rows if r["f"]), key=lambda r: (-r["f"], -(r["rate"] or 0)))[:5]
    word_hits = Counter()
    for m in msgs:
        own, _ = own_words(m, echoes)
        for s, e in spans(own, F_RE + O_RE):
            word_hits[own[s:e].lower()] += 1
    total = {
        "messages": len(msgs), "f": sum(m["f"] for m in msgs), "wide": sum(m["w"] for m in msgs),
        "active_hours": len({m["hour"] for m in msgs}),
        "days_with_messages": sum(1 for r in day_rows if r["messages"]),
        "days_in_span": len(day_rows), "first": msgs[0]["ts"][:16] + "Z", "last": msgs[-1]["ts"][:16] + "Z",
        "quoted_f_dropped": sum(m["qf"] for m in msgs),
        "messages_with_quotes": sum(1 for m in msgs if m["qf"] or m["qw"]),
        "comments": len(clist), "comments_f": sum(c["f"] for c in clist),
        "comments_first": clist[0]["ts"][:10] if clist else None,
        "comments_last": clist[-1]["ts"][:10] if clist else None,
        "duplicates_dropped": stats["duplicates by time and text"],
        "files_read": len(files_used),
    }
    return {
        "refreshed": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
        "command": COMMAND, "total": total, "versions": by_v, "reference_version": ref["version"],
        "days": day_rows, "worst_days": worst, "hours_of_day": hod, "sessions": sess,
        "comments_by_version": c_by_v, "word_hits": dict(word_hits.most_common()),
        "f_words": [{"what": a, "regex": b} for a, b in F_WORDS],
        "other_words": [{"what": a, "regex": b} for a, b in OTHER_WORDS],
    }


# ---------------------------------------------------------------- page
def k_fmt(n):
    if n >= 1_000_000:
        return f"{n / 1e6:.1f}M"
    if n >= 1000:
        return f"{n / 1000:.1f}K".replace(".0K", "K")
    return str(n)


def f2(x):
    if x is None:
        return "n/a"
    return f"{x:.2f}" if x < 10 else f"{x:.1f}"


def e(s):
    return html.escape(str(s), quote=True)


SERIES = ["--m1", "--m2", "--m3", "--m4", "--m5", "--m6", "--m7", "--m8"]


MAJOR = 100  # a version with fewer messages is drawn in the neutral colour


def colour_map(data):
    """Versions with at least MAJOR messages take the first three palette slots,
    in the order they first served; the rest share the neutral colour."""
    cmap, i = {}, 0
    for r in data["versions"]:
        if r["version"] != "no reply yet" and r["messages"] >= MAJOR and i < 3:
            cmap[r["version"]] = SERIES[i]
            i += 1
        else:
            cmap[r["version"]] = "--none"
    return cmap


def svg_timeline(data, cmap):
    days = data["days"]
    W, L, R, T = 720, 40, 8, 14
    H_rate, H_band, gap, H_n = 150, 10, 26, 70
    n = len(days)
    bw = (W - L - R) / n
    rated = [r["rate"] for r in days if r["messages"] >= 10]
    cap = max(rated) if rated else 1
    step = 5 if cap <= 30 else 10 if cap <= 60 else 20
    cap = math.ceil(cap * 1.05 / step) * step
    nmax = max(r["messages"] for r in days)
    nstep = 50 if nmax <= 300 else 100
    ncap = math.ceil(nmax / nstep) * nstep
    y0 = T + H_rate
    yb = y0 + 4
    yn0 = yb + H_band + gap + H_n
    Ht = yn0 + 22
    o = [f'<svg viewBox="0 0 {W} {Ht}" role="img" aria-label="F-words per 100 messages, by day, with the model version band and the messages per day" class="chart">']
    for v in range(0, int(cap) + 1, step):
        y = y0 - H_rate * v / cap
        o.append(f'<line x1="{L}" x2="{W - R}" y1="{y:.1f}" y2="{y:.1f}" class="grid"/>'
                 f'<text x="{L - 6}" y="{y + 4:.1f}" class="tick" text-anchor="end">{v}</text>')
    for v in range(0, ncap + 1, nstep):
        y = yn0 - H_n * v / ncap
        o.append(f'<line x1="{L}" x2="{W - R}" y1="{y:.1f}" y2="{y:.1f}" class="grid"/>'
                 f'<text x="{L - 6}" y="{y + 4:.1f}" class="tick" text-anchor="end">{v}</text>')
    o.append(f'<text x="{L}" y="{T - 4}" class="lab">F-words per 100 messages</text>')
    o.append(f'<text x="{L}" y="{yb + H_band + gap - 8}" class="lab">Messages per day</text>')
    for i, r in enumerate(days):
        x = L + i * bw
        inner = max(1.0, bw - 2)
        tip = f'{r["day"]}: {r["messages"]} messages, {r["f"]} f-words'
        if r["messages"]:
            tip += f', {f2(r["rate"])} per 100 messages; ' + ", ".join(f"{k} {v}" for k, v in sorted(r["models"].items()))
            yy = yb
            tot = sum(r["models"].values())
            for v, c in sorted(r["models"].items(), key=lambda kv: -kv[1]):
                hh = H_band * c / tot
                o.append(f'<rect x="{x + 1:.1f}" y="{yy:.1f}" width="{inner:.1f}" height="{hh:.1f}" style="fill:var({cmap.get(v, "--none")})"/>')
                yy += hh
            hn = H_n * r["messages"] / ncap
            o.append(f'<rect x="{x + 1:.1f}" y="{yn0 - hn:.1f}" width="{inner:.1f}" height="{hn:.1f}" class="nbar" rx="1"/>')
        if r["rate"]:
            hr = H_rate * min(r["rate"], cap) / cap
            cls = "rbar" if r["messages"] >= 10 else "rbar thin"
            o.append(f'<rect x="{x + 1:.1f}" y="{y0 - hr:.1f}" width="{inner:.1f}" height="{hr:.1f}" class="{cls}" rx="1"/>')
            if r["rate"] > cap:
                o.append(f'<text x="{x + bw / 2:.1f}" y="{y0 - H_rate - 2:.1f}" class="tick" text-anchor="middle">{r["rate"]:.0f}</text>')
        o.append(f'<rect x="{x:.1f}" y="{T}" width="{bw:.1f}" height="{yn0 - T:.1f}" class="hit"><title>{e(tip)}</title></rect>')
    for i, r in enumerate(days):
        if r["day"][8:] in ("01", "15"):
            x = L + i * bw + bw / 2
            o.append(f'<line x1="{x:.1f}" x2="{x:.1f}" y1="{yn0}" y2="{yn0 + 4}" class="axis"/>'
                     f'<text x="{x:.1f}" y="{yn0 + 16}" class="tick" text-anchor="middle">{r["day"][5:]}</text>')
    o.append(f'<line x1="{L}" x2="{W - R}" y1="{y0}" y2="{y0}" class="axis"/><line x1="{L}" x2="{W - R}" y1="{yn0}" y2="{yn0}" class="axis"/>')
    o.append("</svg>")
    return "".join(o), cap


def svg_forest(rows, key, ci_key, unit, cmap):
    W, L, R, rowh = 720, 120, 16, 34
    hi = max(r[ci_key][1] for r in rows) or 1
    step = [s for s in (0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 5, 10, 20, 50) if hi / s <= 6][0]
    top = math.ceil(hi / step) * step
    H = 20 + rowh * len(rows) + 24
    sx = lambda v: L + (W - L - R) * v / top
    o = [f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="{e(unit)} by model version, with 95% intervals" class="chart">']
    v = 0.0
    while v <= top + 1e-9:
        x = sx(v)
        o.append(f'<line x1="{x:.1f}" x2="{x:.1f}" y1="12" y2="{H - 22}" class="grid"/>'
                 f'<text x="{x:.1f}" y="{H - 6}" class="tick" text-anchor="middle">{v:g}</text>')
        v += step
    for i, r in enumerate(rows):
        y = 20 + rowh * i + rowh / 2
        lo, hi_ = r[ci_key]
        col = cmap.get(r["version"], "--none")
        o.append(f'<text x="{L - 10}" y="{y + 5:.1f}" class="vlab" text-anchor="end">{e(r["version"])}</text>')
        o.append(f'<line x1="{sx(lo):.1f}" x2="{sx(hi_):.1f}" y1="{y:.1f}" y2="{y:.1f}" class="ci" style="stroke:var({col})"/>')
        o.append(f'<circle cx="{sx(r[key]):.1f}" cy="{y:.1f}" r="6" class="dot" style="fill:var({col})"><title>{e(r["version"])}: {f2(r[key])} {e(unit)}, 95% interval {f2(lo)} to {f2(hi_)}</title></circle>')
    o.append("</svg>")
    return "".join(o)


def svg_hours(hod):
    W, L, R, T, H = 720, 40, 8, 14, 120
    bw = (W - L - R) / 24
    rates = [100 * h["f"] / h["messages"] for h in hod if h["messages"] >= 20]
    cap = max(rates) if rates else 1
    step = 2 if cap <= 12 else 5 if cap <= 30 else 10
    cap = math.ceil(cap * 1.05 / step) * step
    y0 = T + H
    o = [f'<svg viewBox="0 0 {W} {y0 + 22}" role="img" aria-label="F-words per 100 messages by hour of the day, UTC" class="chart">']
    for v in range(0, int(cap) + 1, step):
        y = y0 - H * v / cap
        o.append(f'<line x1="{L}" x2="{W - R}" y1="{y:.1f}" y2="{y:.1f}" class="grid"/><text x="{L - 6}" y="{y + 4:.1f}" class="tick" text-anchor="end">{v}</text>')
    for h in hod:
        x = L + h["hour"] * bw
        if h["messages"]:
            r = 100 * h["f"] / h["messages"]
            hh = H * min(r, cap) / cap
            cls = "rbar" if h["messages"] >= 20 else "rbar thin"
            o.append(f'<rect x="{x + 2:.1f}" y="{y0 - hh:.1f}" width="{bw - 4:.1f}" height="{hh:.1f}" class="{cls}" rx="2"/>')
        o.append(f'<rect x="{x:.1f}" y="{T}" width="{bw:.1f}" height="{H}" class="hit"><title>{h["hour"]:02d}:00 UTC: {h["messages"]} messages, {h["f"]} f-words</title></rect>')
        if h["hour"] % 3 == 0:
            o.append(f'<text x="{x + bw / 2:.1f}" y="{y0 + 16}" class="tick" text-anchor="middle">{h["hour"]:02d}</text>')
    o.append(f'<line x1="{L}" x2="{W - R}" y1="{y0}" y2="{y0}" class="axis"/></svg>')
    return "".join(o)


CSS = """
:root {
  --bg: #f6f7f6; --surface: #ffffff; --fg: #1d2421; --muted: #5b6661; --rule: #d8dedb;
  --accent: #1f6f5c; --code-bg: #eef1ef; --note-bg: #fbf4e4; --note-rule: #d9b45c;
  --bar: #5b6661; --nbar: #b9c3be; --none: #9aa6a0;
  --m1: #2a78d6; --m2: #eb6834; --m3: #1baf7a; --m4: #eda100; --m5: #e87ba4; --m6: #008300; --m7: #6250d6; --m8: #e34948;
  --body: "Atkinson Hyperlegible", "Segoe UI", system-ui, sans-serif;
  --mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --bg: #141917; --surface: #1b211f; --fg: #e3e8e5; --muted: #9aa6a0; --rule: #2d3632;
  --accent: #6cc4a8; --code-bg: #222a27; --note-bg: #2a2518; --note-rule: #8a7333;
  --bar: #c3ccc7; --nbar: #46524d; --none: #66726c;
  --m1: #3987e5; --m2: #d95926; --m3: #199e70; --m4: #c98500; --m5: #d55181; --m6: #0ca30c; --m7: #9085e9; --m8: #e66767;
  color-scheme: dark } }
:root[data-theme="dark"] {
  --bg: #141917; --surface: #1b211f; --fg: #e3e8e5; --muted: #9aa6a0; --rule: #2d3632;
  --accent: #6cc4a8; --code-bg: #222a27; --note-bg: #2a2518; --note-rule: #8a7333;
  --bar: #c3ccc7; --nbar: #46524d; --none: #66726c;
  --m1: #3987e5; --m2: #d95926; --m3: #199e70; --m4: #c98500; --m5: #d55181; --m6: #0ca30c; --m7: #9085e9; --m8: #e66767;
  color-scheme: dark }
body { background: var(--bg); color: var(--fg); font-family: var(--body); font-size: 16px; line-height: 1.55;
  padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); padding-block: 24px 64px; }
.page { max-width: 46rem; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
h1 { font-size: 1.9rem; line-height: 1.2; margin: 0; text-wrap: balance; }
h2 { font-size: 1.35rem; margin: 0 0 .6rem; text-wrap: balance; }
p { margin: 0 0 .8rem; }
p, li { max-width: 65ch; }
ol, ul { margin: 0 0 .9rem; padding-left: 1.3rem; }
li { margin-bottom: .45rem; }
li > ul { margin: .3rem 0 .2rem; padding-left: 1.1rem; }
a { color: var(--accent); }
code { font-family: var(--mono); font-size: .86em; background: var(--code-bg); padding: .08em .3em; border-radius: 3px; overflow-wrap: anywhere; }
strong { font-weight: 700; }
header.masthead { display: flex; flex-direction: column; gap: .4rem; }
.eyebrow { font-family: var(--mono); font-size: .78rem; color: var(--muted); letter-spacing: .02em; margin: 0; }
.standfirst { color: var(--muted); margin: 0; }
.intro { background: var(--note-bg); border: 1px solid var(--note-rule); border-radius: 8px; padding: 14px 18px; }
.intro > p { margin: 0 0 .4rem; font-weight: 700; }
dl.gloss { margin: 0; }
dl.gloss dt { font-weight: 700; margin-top: .5em; }
dl.gloss dd { margin: .1em 0 0 1.5em; max-width: 65ch; }
section.part { border-top: 1px solid var(--rule); padding-top: 18px; min-width: 0; }
section.part h2 .num { display: block; font-family: var(--mono); font-size: .78rem; font-weight: 400; color: var(--muted); letter-spacing: .02em; }
section.part h2 .num::before { content: "Section "; }
.refs { font-size: .85rem; color: var(--muted); border-top: 1px dashed var(--rule); padding-top: .6rem; margin-top: 1rem; }
.refs-title { font-weight: 700; margin: 0 0 .3rem; }
footer.colophon { border-top: 1px solid var(--rule); padding-top: 12px; font-size: .88rem; color: var(--muted); }
button.sel { font-family: var(--mono); font-size: .72rem; font-weight: 600; color: var(--accent); background: var(--surface); border: 1px solid var(--rule); border-radius: 4px; padding: .2em .6em; margin-left: .6rem; vertical-align: .15em; cursor: pointer; -webkit-user-select: none; user-select: none; }
button.sel::before { content: "Select"; }
button.sel:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.figure { background: var(--surface); border: 1px solid var(--rule); border-radius: 8px; padding: 10px 8px 6px; margin: .4rem 0 1rem; min-width: 0; }
svg.chart { display: block; width: 100%; height: auto; font-family: var(--mono); }
svg .grid { stroke: var(--rule); stroke-width: 1; }
svg .axis { stroke: var(--muted); stroke-width: 1; }
svg .tick { fill: var(--muted); font-size: 11px; font-variant-numeric: tabular-nums; }
svg .lab { fill: var(--fg); font-size: 12px; font-weight: 600; }
svg .vlab { fill: var(--fg); font-size: 13px; }
svg .rbar { fill: var(--bar); }
svg .rbar.thin { fill: none; stroke: var(--bar); stroke-width: 1; }
svg .nbar { fill: var(--nbar); }
svg .hit { fill: transparent; }
svg .hit:hover { fill: var(--rule); fill-opacity: .35; }
svg .ci { stroke-width: 3; stroke-linecap: round; }
svg .dot { stroke: var(--surface); stroke-width: 2; }
.legend { display: flex; flex-wrap: wrap; gap: .3rem 1rem; font-size: .9rem; margin: 0 0 .6rem; padding: 0; list-style: none; }
.legend li { display: flex; align-items: center; gap: .4rem; margin: 0; }
.sw { width: .9rem; height: .9rem; border-radius: 2px; display: inline-block; }
.sw.out { border: 1.5px solid var(--bar); }
.sw.fill { background: var(--bar); }
.sw.n { background: var(--nbar); }
.fine { font-size: .9rem; color: var(--muted); }
details summary { cursor: pointer; color: var(--accent); }
"""

SELECT_JS = """
document.querySelectorAll('section.part').forEach(function (sec) {
  var h = sec.querySelector('h2');
  if (!h) return;
  var b = document.createElement('button');
  b.type = 'button';
  b.className = 'sel';
  b.setAttribute('aria-label', 'Select this section to have it read aloud');
  h.appendChild(b);
  b.addEventListener('click', function (e) {
    e.preventDefault();
    var r = document.createRange();
    r.setStart(h, 0);
    var refs = sec.querySelector('.refs');
    if (refs) r.setEndBefore(refs); else r.setEnd(sec, sec.childNodes.length);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(r);
  });
});
"""


def ivl(a):
    return f"{f2(a[0])} to {f2(a[1])}"


def page(data):
    t = data["total"]
    cmap = colour_map(data)
    tl, cap = svg_timeline(data, cmap)
    vers = [r for r in data["versions"] if r["version"] != "no reply yet"]
    minor = [r["version"] for r in vers if cmap[r["version"]] == "--none"]
    nry = [r for r in data["versions"] if r["version"] == "no reply yet"]
    secs = []

    def sec(n, title, body):
        secs.append(f'<section id="s{n}" class="part"><h2><span class="num">{n}</span>{e(title)}</h2>{body}</section>')

    overall = 100.0 * t["f"] / t["messages"]
    sec(1, "The numbers in short", "<ul>" + "".join([
        f"<li>The data covers {t['days_in_span']} days, from {t['first'][:10]} to {t['last'][:10]} (UTC). The curator wrote on {t['days_with_messages']} of them.</li>",
        f"<li>It counts {k_fmt(t['messages'])} messages of the curator's, in {len(data['sessions'])} main sessions, over {k_fmt(t['active_hours'])} active hours.</li>",
        f"<li>They hold {t['f']} f-words: {f2(overall)} per 100 messages, and {f2(t['f'] / t['active_hours'])} per active hour.</li>",
        f"<li>With the wider list, they hold {t['wide']} swear words: {f2(100.0 * t['wide'] / t['messages'])} per 100 messages.</li>",
        f"<li>{len(vers)} model versions served the coordinator in this time. Each served it in one stretch of the calendar, so a difference between versions is also a difference between phases of the project (section 7).</li>",
    ]) + "</ul>")

    legend = '<ul class="legend">' + "".join(
        f'<li><span class="sw" style="background:var({cmap[r["version"]]})"></span>{e(r["version"])}</li>'
        for r in vers if cmap[r["version"]] != "--none") + (
        f'<li><span class="sw" style="background:var(--none)"></span>other versions, under {MAJOR} messages each: {e(", ".join(minor))}</li>' if minor else "") + "</ul>"
    sec(2, "The timeline, by day", (
        "<p>The top chart gives the f-words per 100 messages for each day. A hollow bar marks a day with fewer than 10 messages, whose rate is uncertain. "
        f"A bar that would pass {cap:g} stops at the top, with its value written above it.</p>"
        "<p>The coloured band under it shows which model version served the coordinator that day. A day that two versions shared has the band split in proportion to the curator's messages.</p>"
        "<p>The bottom chart gives the number of the curator's messages each day, the base of each rate.</p>"
        + legend + f'<div class="figure">{tl}</div>'
        + '<ul class="legend"><li><span class="sw fill"></span>rate, 10 or more messages</li><li><span class="sw out"></span>rate, fewer than 10 messages</li><li><span class="sw n"></span>messages per day</li></ul>'
        "<p class=\"fine\">Dates on the axis are month and day, 2026, UTC. On a computer, a pointer over a day shows its numbers. Section 9 lists every day.</p>"))

    items = []
    for r in vers:
        rr = r.get("ratio_to_ref")
        ratio = ""
        if rr and rr["ratio"] is not None and rr["ci"]:
            ratio = (f"<li>Its rate per message is {f2(rr['ratio'])} times the rate under {e(rr['ref'])}, the version with the most messages "
                     f"(95% interval {ivl(rr['ci'])}, by the same bootstrap).</li>")
        items.append(
            f"<li><strong>{e(r['version'])}</strong>: served from {r['first']} to {r['last']}, on {r['days']} days."
            "<ul>"
            f"<li>Base: {k_fmt(r['messages'])} messages, {k_fmt(r['active_hours'])} active hours.</li>"
            f"<li>Count: {r['f']} f-words, in {r['msgs_with_f']} messages. With the wider list, {r['wide']} swear words.</li>"
            f"<li>Per 100 messages: {f2(r['rate100'])}. The 95% interval is {ivl(r['rate100_boot'])} by the day bootstrap, and {ivl(r['rate100_poisson'])} by the exact Poisson method.</li>"
            f"<li>Per active hour: {f2(r['rate_hr'])}. The 95% interval is {ivl(r['rate_hr_boot'])} by the day bootstrap, and {ivl(r['rate_hr_poisson'])} by the exact Poisson method.</li>"
            f"<li>Share of messages with at least one f-word: {100 * r['share_f']:.1f}%, 95% interval {100 * r['share_f_wilson'][0]:.1f}% to {100 * r['share_f_wilson'][1]:.1f}% by the Wilson method.</li>"
            + (ratio or ("<li>Under 5 days: too few for a ratio to the other versions.</li>" if r["days"] < 5 else "")) + "</ul></li>")
    sec(3, "By model version", (
        "<p>Each of the curator's messages goes to the model of the coordinator's last reply before it, in the same session: the reply that the message answers.</p>"
        "<p>Two methods give each interval. The exact Poisson interval treats every f-word as independent. Swearing comes in bursts, so that interval is too narrow. "
        "The day bootstrap resamples whole days of each version, 4K times, and takes the 2.5th and 97.5th percentiles. It keeps the bursts together, so it is the one to read. "
        "With few days, it is itself rough.</p>"
        "<p>The dots below are the rates. Each bar spans both intervals, from the lower of the two lows to the higher of the two highs. "
        "For a version with no f-word or with few days, the bootstrap shrinks to a point, and the Poisson interval then sets the bar.</p>"
        "<p><strong>F-words per 100 messages</strong></p>"
        f'<div class="figure">{svg_forest(vers, "rate100", "rate100_plot", "f-words per 100 messages", cmap)}</div>'
        "<p><strong>F-words per active hour</strong></p>"
        f'<div class="figure">{svg_forest(vers, "rate_hr", "rate_hr_plot", "f-words per active hour", cmap)}</div>'
        "<ul>" + "".join(items) + "</ul>"
        + (f"<p>{sum(r['messages'] for r in nry)} messages came before the first reply of their session. They hold {sum(r['f'] for r in nry)} f-words and have no model.</p>" if nry else "")))

    sec(4, "The worst days", "<p>The days with the most f-words, in order.</p><ol>" + "".join(
        f"<li>{r['day']}: {r['f']} f-words in {r['messages']} messages ({f2(r['rate'])} per 100). Model: "
        + ", ".join(f"{e(k)} ({v} messages)" for k, v in sorted(r["models"].items(), key=lambda kv: -kv[1])) + ".</li>"
        for r in data["worst_days"]) + "</ol>")

    hod = data["hours_of_day"]
    busiest = sorted(hod, key=lambda h: -h["messages"])[:3]
    sec(5, "The hours of the day", (
        "<p>F-words per 100 messages, by the hour of the day in UTC, over the whole project. A hollow bar marks an hour with fewer than 20 messages.</p>"
        f'<div class="figure">{svg_hours(hod)}</div>'
        "<p>The busiest hours were " + ", ".join(f"{h['hour']:02d}:00 ({k_fmt(h['messages'])} messages, {h['f']} f-words)" for h in busiest)
        + ". If the hours that a version served differ, the hour can account for part of a difference between versions.</p>"))

    cb = data["comments_by_version"]
    sec(6, "The curator's comments on pages", (
        f"<p>This is a second series. It counts {t['comments']} comments of the curator's on the coordinator's pages, which reached the coordinator's transcript. "
        f"They run from {t['comments_first']} to {t['comments_last']}, and hold {t['comments_f']} f-words. Each comment counts once, by its minute and its text. "
        "The comments are few per version and bunched on the days of page reviews, so the Poisson interval here is too narrow.</p><ul>" + "".join(
            f"<li>{e(r['version'])}: {r['comments']} comments, {r['f']} f-words, {f2(r['rate100'])} per 100 comments (95% interval {ivl(r['rate100_poisson'])}, exact Poisson).</li>"
            for r in cb) + "</ul>"
        "<p>A comment that the coordinator never read is not in its transcript, so it is not here. Comments go to the model of the last reply before the comment's minute.</p>"))

    sec(7, "What can confound the comparison", "<ul>" + "".join([
        "<li><strong>Phase of the project.</strong> Each version served in one stretch of the calendar. The work, the curator's patience and the state of the skills all changed with time. The data cannot separate the version from the phase.</li>",
        "<li><strong>Kind of work.</strong> Some days were reviews of pages, some were batches of agents, some were recovery after a lost container. The script does not classify the work.</li>",
        "<li><strong>Hours of the day.</strong> Swearing can depend on the hour and on fatigue (section 5).</li>",
        "<li><strong>Few messages.</strong> A version with few messages or few days has a wide interval. Its rate can sit far from the others by chance.</li>",
        "<li><strong>Bursts.</strong> One bad hour can hold many f-words. The day bootstrap keeps them together, but a version with few days still rests on few bursts.</li>",
        "<li><strong>Feedback.</strong> A reply that angers the curator raises the next rate, and the next reply then answers that anger. The messages are not independent trials.</li>",
        "<li><strong>Attribution.</strong> A message goes to the model of the reply just before it. Anger that built over several replies, or across a change of model, goes to the last one.</li>",
        "<li><strong>Selection.</strong> The curator chose when to change the model. A change after a bad stretch would tie the bad stretch to the old version.</li>",
        "<li><strong>Target.</strong> Some f-words aim at the platform, the app or the company, not at the coordinator. The script cannot tell the target, and counts them all.</li>",
        "<li><strong>Dictation.</strong> The curator mostly dictates. Dictation can spell a word in a form that the lists miss, or mask it.</li>",
        "<li>No conclusion about a version follows from this data alone. The intervals say how far chance alone could move each rate.</li>",
    ]) + "</ul>")

    def wl(lst):
        return "<ul>" + "".join(f"<li>{e(x['what'])}: <code>{e(x['regex'])}</code></li>" for x in lst) + "</ul>"
    hits = ", ".join(f"{e(k)} ({v})" for k, v in list(data["word_hits"].items())[:20])
    sec(8, "The word lists", (
        "<p>The main series counts the f-word family. The patterns are regular expressions, matched without regard to case. Overlapping matches count once: “what the fuck” is one f-word.</p>"
        + wl(data["f_words"]) +
        "<p>The wider series counts the f-word family and these words.</p>" + wl(data["other_words"]) +
        f"<p>The forms found most often in the curator's own words: {hits}.</p>"))

    srows = "".join(
        f"<li>Session {s['session']}: {k_fmt(s['messages'])} messages, {s['f']} f-words, from {s['first']} to {s['last']}. Versions: {e(', '.join(s['versions']))}.</li>"
        for s in data["sessions"])
    sec(9, "What was counted and what was not", (
        "<p><strong>Sources.</strong> The live transcript of the coordinator, and the transcript backup of this run, read line by line: "
        f"{t['files_read']} files that hold main sessions. A main session is one in which the curator typed or dictated, marked by entries whose origin is a human.</p>"
        f"<ul>{srows}</ul>"
        "<p><strong>Counted.</strong></p><ul>"
        "<li>Entries of type user whose text the curator wrote, with every system-reminder block cut out first.</li>"
        "<li>Each message once, by its identifier, and again by its time and text, since the backup and the live transcript overlap"
        f" ({t['duplicates_dropped']} copies dropped by time and text).</li>"
        "<li>His comments on pages, as the second series of section 6.</li></ul>"
        "<p><strong>Not counted.</strong></p><ul>"
        "<li>Tool results, entries marked meta or sidechain, and system notices: reminders, task notifications, notices from other sessions, slash commands and their output, and interruption markers.</li>"
        "<li>Compaction summaries, which repeat old messages.</li>"
        "<li>The workers' transcripts: subagents, Workflow agents and headless sessions.</li>"
        f"<li>Quoted lines: a line that starts with “&gt;”, and a line with a swear word that an earlier reply of the coordinator holds word for word. "
        f"{t['messages_with_quotes']} messages had such a line with a swear word in it. Those lines held {t['quoted_f_dropped']} f-words, left out. "
        "A quotation without either mark, such as a pasted reply of another session, cannot be told apart, and its words count as his.</li>"
        "<li>The earlier coordinating sessions on the other backup branch, which this run keeps apart. The data starts with this run's first session.</li></ul>"
        "<details><summary>Every day, as a list</summary><ul>" + "".join(
            f"<li>{r['day']}: {r['messages']} messages, {r['active_hours']} active hours, {r['f']} f-words"
            + (f", {f2(r['rate'])} per 100. " + ", ".join(f"{e(k)} {v}" for k, v in sorted(r['models'].items())) if r['messages'] else "")
            + ".</li>" for r in data["days"]) + "</ul></details>"))

    sec(10, "Refreshing the page", (
        f"<p>Last refresh: {e(data['refreshed'])}.</p>"
        f"<p>Command, run from the repository's root: <code>{e(data['command'])}</code></p>"
        "<p>It reads the transcripts as they then stand, prints a short table, and rewrites <code>page.html</code> and <code>data.json</code> in the coordinator's scratchpad folder <code>wtf/</code>. "
        "The coordinator then publishes <code>page.html</code> again to this page's address.</p>"))

    gloss = "".join(f"<div><dt>{a}</dt><dd>{b}</dd></div>" for a, b in [
        ("coordinator", "Claude session that talks to the curator, briefs the workers and keeps the record."),
        ("message", "Text that the curator typed or dictated to a main session, with quoted lines left out."),
        ("f-word", "Word of the f-word family, by the main list of section 8."),
        ("wider list", "F-word family and the other swear words of section 8."),
        ("active hour", "Clock hour, in UTC, in which the curator sent at least one message."),
        ("model version", "Family and version of the model that wrote the coordinator's last reply before a message, such as Opus 5.5."),
        ("95% interval", "Range that would hold the true rate in 95 of 100 repeats of the measurement, if the method's model holds."),
        ("day bootstrap", "Interval from resampling whole days of a version with replacement, so that a burst stays inside one day."),
    ])
    return f"""<title>Dear Anthropic, WTF ?</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="How often the curator swears at the coordinator, by day and by model version, with intervals and confounds.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;600&display=swap">
<style>{CSS}</style>
<div class="page">
<header class="masthead">
<p class="eyebrow">Fortress revival &middot; refreshed {e(data['refreshed'])}</p>
<h1>Dear Anthropic, WTF ?</h1>
<p class="standfirst">This page counts how often the curator swears at the coordinator, over the whole project, and sets the rate beside the model version that served the coordinator. Each rate comes with its base and a 95% interval. Times are UTC.</p>
</header>
<div class="intro"><p>Words used here:</p><dl class="gloss">{gloss}</dl></div>
{''.join(secs)}
<footer class="colophon">Made by <code>explorations/coordinator/tools/wtf-chart.py</code> from the transcripts. The data is in <code>data.json</code> beside the page's source.</footer>
</div>
<script>{SELECT_JS}</script>
"""


def main():
    data = analyse()
    os.makedirs(OUT_DIR, exist_ok=True)
    with open(os.path.join(OUT_DIR, "data.json"), "w") as fh:
        json.dump(data, fh, indent=1)
    with open(os.path.join(OUT_DIR, "page.html"), "w") as fh:
        fh.write(page(data))
    t = data["total"]
    print(f"{t['first']} .. {t['last']}  {len(data['sessions'])} sessions  {t['messages']} messages  "
          f"{t['active_hours']} active hours  {t['f']} f-words  {t['wide']} wider  {t['comments']} comments ({t['comments_f']} f)")
    print(f"{'version':<14}{'msgs':>6}{'hours':>6}{'days':>5}{'f':>5}{'/100msg':>9}  {'95% day bootstrap':<18}{'/hour':>7}  {'95% day bootstrap':<18}")
    for r in data["versions"]:
        print(f"{r['version']:<14}{r['messages']:>6}{r['active_hours']:>6}{r['days']:>5}{r['f']:>5}{r['rate100']:>9.2f}  "
              f"{r['rate100_boot'][0]:>6.2f} .. {r['rate100_boot'][1]:<8.2f}{r['rate_hr']:>7.3f}  {r['rate_hr_boot'][0]:>6.3f} .. {r['rate_hr_boot'][1]:<8.3f}")
    print("worst days: " + "; ".join(f"{r['day']} {r['f']} f in {r['messages']} msgs ({', '.join(r['models'])})" for r in data["worst_days"][:3]))
    print(f"wrote {OUT_DIR}/page.html and data.json")


if __name__ == "__main__":
    sys.exit(main())
