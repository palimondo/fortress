#!/usr/bin/env python3
"""Build pairs.html: sixteen C2/C3 row pairs side by side.

Reads the two tours and their rendered SVGs, inlines every SVG with a unique
id prefix (dvisvgm shares glyph ids like g0-0 across files), and writes a
self-contained page.  Run from anywhere; paths are absolute-ish off EXPL.
"""
import html
import os
import re

EXPL = "/home/user/fortress/explorations"
OUT = os.path.join(EXPL, "reviews/run-c2-vs-run-c3-pairs")
C2SVG = os.path.join(EXPL, "run-c/tour")
C3SVG = os.path.join(EXPL, "run-c3/probes/tour")
# re-rendered replacements (cell-id -> svg path), filled by the caller
OVERRIDE = {}
ovr = os.path.join(OUT, "fixed")
if os.path.isdir(ovr):
    for fn in sorted(os.listdir(ovr)):
        if fn.endswith(".svg"):
            OVERRIDE[fn[:-4]] = os.path.join(ovr, fn)

# ---------------------------------------------------------------- tour parsing


def split_cells(line):
    out, cur, i = [], "", 0
    while i < len(line):
        if line[i] == "\\" and i + 1 < len(line):
            cur += line[i:i + 2]
            i += 2
            continue
        if line[i] == "|":
            out.append(cur)
            cur = ""
            i += 1
            continue
        cur += line[i]
        i += 1
    out.append(cur)
    return [c.strip() for c in out[1:-1]]


def unescape_md(s):
    return s.replace("\\|", "|").replace("\\_", "_")


c2 = {}
for ln in open(os.path.join(EXPL, "run-c/tour.md")):
    ln = ln.rstrip("\n")
    if re.match(r"^\|\s*\d+\s*\|", ln):
        c = split_cells(ln)
        n = int(c[0])
        fort = [unescape_md(x.strip("`").strip()) for x in c[4].split("<br>")]
        c2[n] = {"dy": unescape_md(c[3].strip().strip("`")), "fort": fort}

c3 = {}
body = open(os.path.join(EXPL, "run-c3/tour.md")).read()
for sec in re.split(r"\n## ", body)[1:]:
    n = int(sec.split(".")[0])
    dy = re.search(r"Dyalog: `(.*)`", sec).group(1)
    fort = re.search(r"Fortress:\n```\n(.*?)\n```", sec, re.S).group(1).split("\n")
    c3[n] = {"dy": dy, "fort": fort}

# ---------------------------------------------------------------- the pairs

PAIRS = [
    ("hyperparameters", 1, 1, ""),
    ("rmsn", 2, 2, ""),
    ("sm", 3, 3, ""),
    ("rmsn_b", 5, 5, ""),
    ("the keys of a batch", 11, 11, ""),
    ("the nine views", 12, 12, ""),
    ("the heads split", 14, 16,
     "C2 row 14 is one row for Q K V <em>and</em> the split; C3 gives them two "
     "sections (15, 16)."),
    ("attention weights", 15, 17,
     "C2 row 15 is one row for A <em>and</em> Hc; C3 gives them two sections "
     "(17, 18). The same C2 cell appears in the next pair."),
    ("heads applied to values", 15, 18,
     "Same C2 row 15 as the pair above (A and Hc share a row there)."),
    ("probabilities and loss", 17, 20, ""),
    ("backward: loss and output head", 18, 21, ""),
    ("backward: values and scores", 21, 24, ""),
    ("backward: queries, keys, un-heading", 22, 25, ""),
    ("backward: the embeddings", 25, 28, ""),
    ("the step's result", 26, 29, ""),
    ("Adam", 27, 30, ""),
]

NOTE_LINES = {
    1: "C3's block is an excerpt: the tour shows four of the fourteen "
       "declarations, and its note says so.",
}

# ---------------------------------------------------------------- SVG inlining

ID = re.compile(r"\bid='([^']+)'")
HREF = re.compile(r"\b(xlink:href|href)='#([^']+)'")
URL = re.compile(r"url\(#([^)]+)\)")
SVGTAG = re.compile(r"<svg\b[^>]*>")
VIEWBOX = re.compile(r"viewBox='([-0-9.eE]+) ([-0-9.eE]+) ([-0-9.eE]+) ([-0-9.eE]+)'")


def inline(path, prefix, scale, cls):
    src = open(path, encoding="utf-8").read()
    src = re.sub(r"<\?xml[^>]*\?>\s*", "", src)
    src = re.sub(r"<!--.*?-->\s*", "", src, flags=re.S)
    tag = SVGTAG.search(src).group(0)
    m = VIEWBOX.search(tag)
    vw, vh = float(m.group(3)), float(m.group(4))
    src = ID.sub(lambda m: "id='%s-%s'" % (prefix, m.group(1)), src)
    src = HREF.sub(lambda m: "%s='#%s-%s'" % (m.group(1), prefix, m.group(2)), src)
    src = URL.sub(lambda m: "url(#%s-%s)" % (prefix, m.group(1)), src)
    # rebuild the opening tag: drop width/height, keep viewBox, add sizing
    newtag = ("<svg class='%s' xmlns='http://www.w3.org/2000/svg' "
              "xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='%s %s %s %s' "
              "style='width:%.1fpx' role='img'>"
              % (cls, m.group(1), m.group(2), m.group(3), m.group(4), vw * scale))
    src = SVGTAG.sub(newtag, src, count=1)
    return src, vw, vh


def cell(prefix, fsvg, rsvg, label, nlines, extra):
    f, _, _ = inline(fsvg, prefix + "f", 1.05, "fml")
    r, _, _ = inline(OVERRIDE.get(prefix + "r", rsvg), prefix + "r", 1.55, "fts")
    plural = "line" if nlines == 1 else "lines"
    cap = "%d Fortress code %s" % (nlines, plural)
    if extra:
        cap += " &middot; " + extra
    return ("<div class='panel'><div class='plabel'>%s</div>"
            "<div class='art'><div class='f'>%s</div><div class='r'>%s</div></div>"
            "<div class='cap'>%s</div></div>" % (label, f, r, cap))


# ---------------------------------------------------------------- page

rows_html = []
table_rows = []
md_rows = []

for idx, (title, n2, n3, note) in enumerate(PAIRS, 1):
    p = "p%02d" % idx
    dy3 = c3[n3]["dy"]
    dy2 = c2[n2]["dy"]
    k2, k3 = len(c2[n2]["fort"]), len(c3[n3]["fort"])
    extra3 = NOTE_LINES.get(n3, "") if n3 == 1 else ""
    hdr = ("<div class='dy'>%s</div>" % html.escape(dy3))
    if dy2.replace("STEP←{", "") != dy3 and dy2 != dy3:
        hdr += ("<div class='dy2'><span>C2 row %d covers:</span> %s</div>"
                % (n2, html.escape(dy2)))
    notehtml = ("<div class='note'>%s</div>" % note) if note else ""
    rows_html.append(
        "<section id='%s'><h2><span class='num'>%d</span> %s</h2>%s%s"
        "<div class='pair'>%s%s</div></section>"
        % (p, idx, html.escape(title), hdr, notehtml,
           cell(p + "a", os.path.join(C2SVG, "row%02d_f.svg" % n2),
                os.path.join(C2SVG, "row%02d.svg" % n2),
                "C2 &middot; run-c row %d" % n2, k2, ""),
           cell(p + "b", os.path.join(C3SVG, "f%02d.svg" % n3),
                os.path.join(C3SVG, "r%02d.svg" % n3),
                "C3 &middot; run-c3 &sect;%d" % n3, k3, extra3)))
    table_rows.append("<tr><td><a href='#%s'>%d</a></td><td>%s</td>"
                      "<td>row %d</td><td>&sect;%d</td><td>%d</td><td>%d</td></tr>"
                      % (p, idx, html.escape(title), n2, n3, k2, k3))
    md_rows.append("| %d | %s | `%s` | row %d | %d | %d | %d |"
                   % (idx, title, dy3, n2, n3, k2, k3))

CSS = """
:root{
  --bg:#fbfaf8; --fg:#1b1a18; --muted:#6a6560; --rule:#dcd7d0;
  --card:#ffffff; --code:#f3f0ec; --accent:#7a5c2e;
}
@media (prefers-color-scheme: dark){
  :root{ --bg:#16161a; --fg:#e8e6e3; --muted:#9a948d; --rule:#33322f;
         --card:#1e1e22; --code:#232329; --accent:#d8b06a; }
}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--fg);margin:0;
  font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;}
.wrap{max-width:1360px;margin:0 auto;padding:28px 20px 80px}
h1{font-size:26px;margin:0 0 6px;letter-spacing:-.01em}
.sub{color:var(--muted);margin:0 0 26px;max-width:70ch}
h2{font-size:17px;margin:0 0 10px;font-weight:600;letter-spacing:-.005em}
h2 .num{display:inline-block;min-width:1.6em;color:var(--accent);font-variant-numeric:tabular-nums}
section{border-top:1px solid var(--rule);padding:24px 0 6px}
.scroller{overflow-x:auto;margin:0 0 30px}
table.map{border-collapse:collapse;width:100%;min-width:640px;font-size:13.5px}
table.map th,table.map td{border-bottom:1px solid var(--rule);padding:6px 10px;text-align:left}
table.map th{color:var(--muted);font-weight:600;white-space:nowrap}
table.map td:nth-child(1),table.map td:nth-child(3),table.map td:nth-child(4),
table.map td:nth-child(5),table.map td:nth-child(6){white-space:nowrap}
table.map a{color:var(--accent);text-decoration:none}
.dy{font-family:"DejaVu Sans Mono","APL385 Unicode",Menlo,Consolas,monospace;
  font-size:13px;background:var(--code);border:1px solid var(--rule);border-radius:5px;
  padding:8px 10px;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;margin-bottom:8px}
.dy2{font-family:"DejaVu Sans Mono","APL385 Unicode",Menlo,Consolas,monospace;
  font-size:12px;color:var(--muted);white-space:pre-wrap;word-break:break-word;
  overflow-wrap:anywhere;margin:-2px 0 8px}
.dy2 span{font-family:inherit;font-style:italic}
.note{color:var(--muted);font-size:13px;margin:0 0 12px;max-width:80ch}
.pair{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;align-items:start}
.panel{min-width:0;border:1px solid var(--rule);border-radius:7px;overflow:hidden;background:var(--card)}
.plabel{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);
  padding:7px 12px;border-bottom:1px solid var(--rule)}
.art{background:#ffffff;color:#000;padding:14px 14px 16px;overflow-x:auto}
.art .f{padding-bottom:10px;margin-bottom:10px;border-bottom:1px dashed #d8d3cc}
.art svg{display:block;max-width:100%;height:auto}
.art svg .fml{opacity:.92}
.cap{font-size:12px;color:var(--muted);padding:7px 12px;border-top:1px solid var(--rule)}
@media (max-width:820px){ .pair{grid-template-columns:minmax(0,1fr)} .wrap{padding:20px 14px 60px} }
"""

doc = """<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>C2 vs C3: paired rows</title>
<style>%s</style></head><body><div class="wrap">
<h1>Run C2 vs run C3 &mdash; sixteen paired rows</h1>
<p class="sub">The same sixteen Dyalog lines as each round rendered them: the formula (small)
above the Fortress line or lines set by Fortify (large). Left is round two
(<code>explorations/run-c</code>), right round three (<code>explorations/run-c3</code>).
Rows are matched by their Dyalog line, not by row number &mdash; the two tours cut the
program differently.</p>
<div class="scroller"><table class="map"><thead><tr><th>#</th><th>Dyalog line</th><th>C2</th><th>C3</th>
<th>C2 lines</th><th>C3 lines</th></tr></thead><tbody>%s</tbody></table></div>
%s
</div></body></html>
""" % (CSS, "\n".join(table_rows), "\n".join(rows_html))

open(os.path.join(OUT, "pairs.html"), "w", encoding="utf-8").write(doc)
open(os.path.join(OUT, "pairs.md"), "w", encoding="utf-8").write(
    "# C2 vs C3: the sixteen paired rows\n\n"
    "Matching is by Dyalog line; `pairs.html` shows the rendered cells.\n"
    "Fortress line counts are counted from each tour's Fortress code block\n"
    "(C2: the `<br>`-separated Fortress column of `run-c/tour.md`; C3: the\n"
    "fenced block of each section of `run-c3/tour.md`).\n\n"
    "| # | pair | Dyalog (C3's wording) | C2 row | C3 section | C2 lines | C3 lines |\n"
    "|---|---|---|---|---|---|---|\n" + "\n".join(md_rows) + "\n\n"
    "Notes\n\n"
    "- C2 row 14 is one row for `Q K Vv←…` and the `h←…` split; C3 splits them\n"
    "  into sections 15 and 16, so pair 7 sets C3 §16 against the whole C2 row.\n"
    "- C2 row 15 is one row for `A←…` and `Hc←…`; C3 splits them into sections\n"
    "  17 and 18, so pairs 8 and 9 both use C2 row 15.\n"
    "- C3 §1's code block is an excerpt: four of the fourteen declarations, as\n"
    "  its own note says. The count of 4 is the count in the block.\n")
print("wrote", os.path.join(OUT, "pairs.html"))
