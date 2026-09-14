#!/usr/bin/env python3
"""Build a self-contained HTML page from explorations/reviews/run-b-vs-run-b2.md.

Figure blocks in the Markdown look like this:

    <!--figs
    title: Attention
    formula: caption :: path/to/formula.svg
    col: Run B :: path/to/figure.svg
    col: Run B2 :: path/to/figure.svg
    note: free text
    -->

Every referenced file is inlined: `.svg` as an SVG element with all of its ids
namespaced so that many dvisvgm outputs can share one document, `.png` and
`.jpg` as a base64 data URI.  Nothing is fetched at view time; the page loads no
external script, stylesheet or font.

Usage: python3 build_comparison.py [in.md] [out.html]
"""
from __future__ import annotations

import base64
import html
import os
import re
import sys

import markdown

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))

# --------------------------------------------------------------------------- svg

_ID_ATTR = re.compile(r"""\bid\s*=\s*["']([^"']+)["']""")
_REF = re.compile(r"""\b(?:xlink:href|href)\s*=\s*["']#([^"']+)["']""")
_URL = re.compile(r"url\(#([^)]+)\)")
_XMLDECL = re.compile(r"<\?xml.*?\?>\s*", re.S)
_DOCTYPE = re.compile(r"<!DOCTYPE.*?>\s*", re.S)
_COMMENT = re.compile(r"<!--.*?-->\s*", re.S)

SCALE = 1.35  # dvisvgm point sizes are small on screen


def inline_svg(path: str, prefix: str) -> str:
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    text = _XMLDECL.sub("", text)
    text = _DOCTYPE.sub("", text)
    text = _COMMENT.sub("", text)
    ids = set(_ID_ATTR.findall(text)) | set(_REF.findall(text)) | set(_URL.findall(text))
    for ident in sorted(ids, key=len, reverse=True):
        new = f"{prefix}-{ident}"
        for q in ('"', "'"):
            text = text.replace(f"id={q}{ident}{q}", f"id={q}{new}{q}")
            text = text.replace(f"href={q}#{ident}{q}", f"href={q}#{new}{q}")
        text = text.replace(f"url(#{ident})", f"url(#{new})")
    # dvisvgm sizes its output in points; render at 1.35x in px so the type is
    # readable, and let the .art container scroll rather than shrink the figure
    open_tag = re.search(r"<svg\b[^>]*>", text)
    if open_tag:
        tag = open_tag.group(0)

        def to_px(m):
            attr, value = m.group(1), m.group(2)
            num = re.match(r"([0-9.]+)\s*([a-z%]*)", value)
            if not num:
                return m.group(0)
            size = float(num.group(1))
            unit = num.group(2)
            factor = {"pt": 4.0 / 3.0, "px": 1.0, "": 1.0, "in": 96.0, "mm": 96.0 / 25.4}.get(unit)
            if factor is None:
                return m.group(0)
            return f'{attr}="{size * factor * SCALE:.2f}px"'

        new_tag = re.sub(r'''\s(width|height)=["']([^"']*)["']''', lambda m: " " + to_px(m), tag)
        text = text[: open_tag.start()] + new_tag + text[open_tag.end():]
    return text


def inline_raster(path: str) -> str:
    ext = os.path.splitext(path)[1].lower().lstrip(".")
    mime = "image/jpeg" if ext in ("jpg", "jpeg") else f"image/{ext}"
    with open(path, "rb") as fh:
        data = base64.b64encode(fh.read()).decode("ascii")
    return f'<img alt="" src="data:{mime};base64,{data}">'


def inline(path: str, prefix: str) -> str:
    full = path if os.path.isabs(path) else os.path.join(ROOT, path)
    if not os.path.exists(full):
        return f'<p class="missing">missing figure: {html.escape(path)}</p>'
    if full.lower().endswith(".svg"):
        return inline_svg(full, prefix)
    return inline_raster(full)


# ------------------------------------------------------------------------- blocks

FIGS = re.compile(r"<!--figs\n(.*?)\n-->", re.S)
_CODE = re.compile(r"`([^`]+)`")


def caption(text: str) -> str:
    return _CODE.sub(lambda m: "<code>" + html.escape(m.group(1)) + "</code>", html.escape(text)).replace(
        "&lt;code&gt;", "<code>"
    ).replace("&lt;/code&gt;", "</code>")


def render_block(body: str, n: int) -> str:
    title, note, formulas, cols = "", "", [], []
    for line in body.splitlines():
        line = line.strip()
        if not line:
            continue
        key, _, rest = line.partition(":")
        rest = rest.strip()
        if key == "title":
            title = rest
        elif key == "note":
            note = rest
        elif key in ("formula", "col"):
            label, _, path = rest.partition("::")
            (formulas if key == "formula" else cols).append((label.strip(), path.strip()))
    out = ['<figure class="figs">']
    if title:
        out.append(f"<figcaption class=\"figs-title\">{caption(title)}</figcaption>")
    if formulas:
        out.append('<div class="strip">')
        for i, (label, path) in enumerate(formulas):
            out.append('<div class="cell formula">')
            out.append(f'<div class="lab">{caption(label)}</div>')
            out.append(f'<div class="art">{inline(path, f"f{n}-{i}")}</div>')
            out.append("</div>")
        out.append("</div>")
    if cols:
        out.append(f'<div class="cols cols-{min(len(cols), 2)}">')
        for i, (label, path) in enumerate(cols):
            out.append('<div class="cell">')
            out.append(f'<div class="lab">{caption(label)}</div>')
            out.append(f'<div class="art">{inline(path, f"c{n}-{i}")}</div>')
            out.append("</div>")
        out.append("</div>")
    if note:
        out.append(f'<div class="note">{caption(note)}</div>')
    out.append("</figure>")
    return "\n".join(out)


# --------------------------------------------------------------------------- page

CSS = """
:root {
  --bg: #fbfaf7;
  --panel: #ffffff;
  --ink: #1b1a17;
  --dim: #5d594f;
  --rule: #ddd8cc;
  --accent: #7a4b16;
  --accent-soft: #f0e6d6;
  --code-bg: #f2efe7;
  --fig-invert: 0;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #14140f;
    --panel: #1d1c17;
    --ink: #ece7dc;
    --dim: #a49d8d;
    --rule: #38352c;
    --accent: #d9a566;
    --accent-soft: #2b2519;
    --code-bg: #23221b;
    --fig-invert: 1;
  }
}
:root[data-theme="dark"] {
  --bg: #14140f;
  --panel: #1d1c17;
  --ink: #ece7dc;
  --dim: #a49d8d;
  --rule: #38352c;
  --accent: #d9a566;
  --accent-soft: #2b2519;
  --code-bg: #23221b;
  --fig-invert: 1;
}

* { box-sizing: border-box; }
body {
  background: var(--bg);
  color: var(--ink);
  margin: 0;
  font: 16px/1.62 Charter, "Iowan Old Style", Georgia, "Times New Roman", serif;
  -webkit-text-size-adjust: 100%;
}
main { max-width: 62rem; margin: 0 auto; padding: 3rem 1.25rem 6rem; }

h1 { font-size: 2.05rem; line-height: 1.16; margin: 0 0 .4rem; letter-spacing: -.01em; }
h2 {
  font-size: 1.32rem; margin: 3.2rem 0 .9rem; padding-bottom: .35rem;
  border-bottom: 2px solid var(--rule); letter-spacing: -.005em;
}
h3 { font-size: 1.06rem; margin: 2.2rem 0 .6rem; color: var(--accent); }
p { margin: 0 0 1rem; }
a { color: var(--accent); }
strong { font-weight: 700; }

code, pre {
  font-family: ui-monospace, "SF Mono", "DejaVu Sans Mono", Menlo, Consolas, monospace;
}
code { font-size: .88em; background: var(--code-bg); padding: .09em .32em; border-radius: 3px; }
pre {
  background: var(--code-bg); border: 1px solid var(--rule); border-radius: 6px;
  padding: .8rem 1rem; overflow-x: auto; font-size: .84rem; line-height: 1.5;
}
pre code { background: none; padding: 0; font-size: 1em; }

.tablewrap { overflow-x: auto; margin: 1.2rem 0 1.6rem; border: 1px solid var(--rule); border-radius: 8px; }
table { border-collapse: collapse; width: 100%; min-width: 34rem; font-size: .92rem; background: var(--panel); }
th, td { text-align: left; vertical-align: top; padding: .5rem .7rem; border-bottom: 1px solid var(--rule); }
th { font-weight: 700; background: var(--accent-soft); white-space: nowrap; }
tr:last-child td { border-bottom: none; }
td code { font-size: .84em; }

figure.figs {
  margin: 1.6rem 0 2rem; padding: .9rem 1rem 1rem;
  background: var(--panel); border: 1px solid var(--rule); border-radius: 10px;
}
.figs-title {
  font: 600 .8rem/1.3 ui-monospace, "SF Mono", Menlo, monospace;
  letter-spacing: .07em; text-transform: uppercase; color: var(--dim);
  margin: 0 0 .8rem;
}
.strip { display: grid; gap: .8rem; margin-bottom: .9rem; }
.cols { display: grid; gap: .9rem; }
@media (min-width: 700px) {
  .strip { grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); }
  .cols-2 { grid-template-columns: 1fr 1fr; }
}
.cell {
  border: 1px solid var(--rule); border-radius: 7px; padding: .55rem .65rem;
  background: var(--bg); min-width: 0;
}
.cell.formula { background: var(--accent-soft); }
.lab {
  font: 600 .72rem/1.35 ui-monospace, "SF Mono", Menlo, monospace;
  color: var(--dim); margin-bottom: .45rem;
}
.lab code { background: none; padding: 0; font-size: 1em; color: var(--ink); }
.art { overflow-x: auto; }
.art svg, .art img { display: block; max-width: none; height: auto; }
.art svg { max-width: none; height: auto; filter: invert(var(--fig-invert)); }
.art img { filter: invert(var(--fig-invert)); }
.note { font-size: .87rem; color: var(--dim); margin-top: .75rem; }
.missing { color: #b4462a; font-size: .85rem; }

.lede { font-size: 1.06rem; color: var(--dim); }
hr { border: none; border-top: 1px solid var(--rule); margin: 2.5rem 0; }
blockquote { margin: 1rem 0; padding-left: 1rem; border-left: 3px solid var(--rule); color: var(--dim); }
ol, ul { padding-left: 1.4rem; }
li { margin-bottom: .45rem; }
"""


def build(src: str, dst: str) -> None:
    with open(src, encoding="utf-8") as fh:
        text = fh.read()

    blocks: list[str] = []

    def stash(m: re.Match) -> str:
        blocks.append(render_block(m.group(1), len(blocks)))
        return f"\n\nFIGSPLACEHOLDER{len(blocks) - 1}\n\n"

    text = FIGS.sub(stash, text)

    body = markdown.markdown(text, extensions=["tables", "fenced_code", "attr_list", "sane_lists", "toc"])

    for i, block in enumerate(blocks):
        body = body.replace(f"<p>FIGSPLACEHOLDER{i}</p>", block)

    # python-markdown's table extension splits on the escaped pipe but leaves the
    # backslash inside the cell; drop it where it sits in a code span
    body = re.sub(r"<code>[^<]*</code>", lambda m: m.group(0).replace("\\|", "|"), body)

    body = re.sub(r"<table>", '<div class="tablewrap"><table>', body)
    body = re.sub(r"</table>", "</table></div>", body)

    page = (
        "<!doctype html>\n<html lang=\"en\">\n<head>\n"
        '<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        "<title>Phase 2 — Run B vs Run B2</title>\n"
        f"<style>{CSS}</style>\n</head>\n<body>\n<main>\n{body}\n</main>\n</body>\n</html>\n"
    )
    with open(dst, "w", encoding="utf-8") as fh:
        fh.write(page)
    print(f"{dst}: {len(page) / 1e6:.2f} MB, {len(blocks)} figure blocks")


if __name__ == "__main__":
    here = os.path.dirname(os.path.abspath(__file__))
    src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(here, "..", "run-b-vs-run-b2.md")
    dst = sys.argv[2] if len(sys.argv) > 2 else os.path.join(here, "..", "run-b-vs-run-b2.html")
    build(os.path.abspath(src), os.path.abspath(dst))
