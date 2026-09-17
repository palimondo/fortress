#!/usr/bin/env python3
"""Turn the raw compile/run outputs of run-ladder.sh into the ladder table.

Reads  explorations/compile-ladder/results.tsv  and  raw/<corpus>/<file>.{compile,run}
Writes explorations/compile-ladder/ladder.tsv    (one row per file, diffable)
       explorations/compile-ladder/summary.txt   (the counts and the rankings)

Phase vocabulary, and where each decision comes from:
  parse        a parse-stage refusal (Rats! "Syntax Error", the precedence
               resolver's "Resolution of operator ... failed")
  disambiguate an unresolved or ambiguous name (TypeDisambiguator.java:363,380
               "X is undefined."; "Type name may refer to";
               GraphRepository.java:417 "Could not find an implementation for API")
  typecheck    the Scala checker (TypeWellFormedChecker.scala:95,119
               "Unbound type:"; "Could not check call to"; "Ill-formed type")
  codegen      CodeGen.sayWhat (CodeGen.java:1550-1562 "Can't compile") or any
               CompilerError raised from the codegen packages
  link         `fortress run` fails to load or link the compiled component
  run          `fortress run` throws or exits non-zero
  pass         exit 0, no `fail`/`FAIL` in the output, no exception
               (the interpreter suite's own criterion, FileTests.java:367-371)
"""

import os, re, sys, collections

ROOT = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(ROOT, "raw")

LOC = re.compile(r"^.*\.fs[si]:\d+:[\d:\-]*:?\s*$")

def first_error(text):
    """The first error message line, verbatim (without its location header)."""
    lines = text.splitlines()
    for i, ln in enumerate(lines):
        if LOC.match(ln.strip()) and i + 1 < len(lines):
            return lines[i + 1].strip()
    for ln in lines:
        s = ln.strip()
        if s.startswith("Exception in thread"):
            return s
    for ln in lines:
        s = ln.strip()
        if ("Error" in s or "Exception" in s or s.startswith("error")) and not s.startswith("at "):
            return s
    for ln in lines:
        s = ln.strip()
        if s:
            return s
    return ""

# A compile-time crash names its phase in the stack: compiler/phases/*Phase.execute.
PHASE_FRAME = re.compile(r"com\.sun\.fortress\.compiler\.phases\.(\w+)Phase\.execute")
PHASE_OF_FRAME = {
    "Grammar": "parse", "PreDisambiguationDesugar": "disambiguate",
    "Disambiguate": "disambiguate", "IntegerLiteralFolding": "disambiguate",
    "PreTypeCheckDesugar": "typecheck", "TypeCheck": "typecheck",
    "Desugar": "typecheck", "OverloadRewriting": "codegen",
    "CodeGeneration": "codegen", "EnvGeneration": "codegen", "Empty": "parse",
}

def phase_from_stack(text):
    ms = PHASE_FRAME.findall(text)
    return PHASE_OF_FRAME.get(ms[0]) if ms else None

CODEGEN_FRAMES = ("compiler.codegen.", "compiler.OverloadSet", "compiler.NamingCzar",
                  "runtimeSystem.", "compiler.Codegen")

def classify_compile(rc, text):
    err = first_error(text)
    if rc in (124, 137, 125):
        return "timeout", err
    if "Can't compile" in text:
        return "codegen", err
    if "Exception in thread" in text or "\tat com.sun.fortress" in text:
        st = phase_from_stack(text)
        if st:
            return st, err
        if any(f in text for f in CODEGEN_FRAMES):
            return "codegen", err
    if re.match(r"^Syntax Error", err) or err.startswith("Resolution of operator"):
        return "parse", err
    if (err.endswith(" is undefined.") or "may refer to" in err
            or re.match(r"^(Variable|Function|Operator|Type|Label|Field|Method) .+ is not defined\.$", err)
            or err.startswith("Could not find an implementation for API")
            or err.startswith("Unrecognized ")):
        return "disambiguate", err
    if (err.startswith("Unbound type:") or err.startswith("Unknown type:")
            or err.startswith("Ill-formed type") or err.startswith("Could not check")
            or "is not a subtype" in err or err.startswith("Type ")
            or err.startswith("Overloading ") or err.startswith("Invalid ")
            or err.startswith("Coercion ") or err.startswith("Missing ")
            or err.startswith("There are no") or "must be" in err
            or "does not have" in err or err.startswith("Cannot ")
            or err.startswith("Call to ") or err.startswith("No declaration")):
        return "typecheck", err
    # Any other located error after the parse and disambiguate patterns is the
    # Scala checker: those are the phases that report located errors past
    # disambiguation (PhaseOrder.java; StaticChecker.java:275).
    if rc != 0 and any(LOC.match(l.strip()) for l in text.splitlines()):
        return "typecheck", err
    if rc != 0:
        return "compile-other", err
    return None, ""

LINK_MARKERS = ("NoSuchMethodError", "NoClassDefFoundError", "ClassNotFoundException",
                "Unable to read serialized data", "VerifyError", "LinkageError",
                "IncompatibleClassChangeError", "ClassFormatError", "NoSuchFieldError",
                "Could not find or load main class")

def classify_run(rc, text):
    err = first_error(text)
    if rc in (124, 137, 125):
        return "timeout", "run timed out"
    if any(m in text for m in LINK_MARKERS):
        return "link", err
    if rc != 0:
        return "run", err
    if "fail" in text or "FAIL" in text:
        return "run", err or "output contained fail/FAIL"
    return "pass", ""

MISSING = [
    re.compile(r"^(.+?) is undefined\.$"),
    re.compile(r"^Unbound type:\s*(.+)$"),
    re.compile(r"^Unknown type:\s*(.+)$"),
    re.compile(r"^Could not find an implementation for API\s+(\S+)"),
    re.compile(r"^(?:Variable|Function|Operator|Type) (.+?) is not defined\.$"),
]

def missing_name(err):
    for p in MISSING:
        m = p.match(err)
        if m:
            n = m.group(1).strip()
            # strip the api qualifier the disambiguator added, keep the simple name
            return n.split(".")[-1] if n.count(".") and not n.startswith("(") else n
    return ""

SPAN = re.compile(r"/\S*?\.fss:\d+:[\d:\-]+")
EXPFX = re.compile(r'^Exception in thread "\w+" [\w.$]+(?:Error|Exception|CompilerError):\s*')

def norm(s):
    s = EXPFX.sub("", s)
    s = SPAN.sub("", s)
    s = re.sub(r"\s*node = .*$", "", s)
    return re.sub(r"\s+", " ", s).strip()

NODE_KEY = [
    (re.compile(r"^VarDecl .* mutable bindings not yet handled\.?$"), "VarDecl mutable bindings not yet handled"),
    (re.compile(r"^emitDesc of type .* failed$"), "emitDesc of type <T> failed"),
    (re.compile(r"^Can't compile (\w+).*$"), None),
]

def node_key(s):
    for pat, rep in NODE_KEY:
        m = pat.match(s)
        if m:
            return rep if rep else "Can't compile " + m.group(1)
    return s

CALL = re.compile(r"^Could not check call to (?:operator|function)\s+(.+?)$")
CANT = re.compile(r"^Can't compile (\w+)")

def main():
    rows = []
    with open(os.path.join(ROOT, "results.tsv")) as fh:
        for line in fh:
            f = line.rstrip("\n").split("\t")
            if len(f) < 7:
                continue
            corpus, base, comp, crc, rrc, ct, rt = f[:7]
            crc = int(crc)
            cpath = os.path.join(RAW, corpus, base + ".compile")
            ctext = open(cpath, errors="replace").read() if os.path.exists(cpath) else ""
            phase, err = classify_compile(crc, ctext)
            if phase is None:
                if base.endswith(".fsi"):
                    phase, err = "pass", ""   # an api has nothing to run
                else:
                    rpath = os.path.join(RAW, corpus, base + ".run")
                    rtext = open(rpath, errors="replace").read() if os.path.exists(rpath) else ""
                    phase, err = classify_run(int(rrc or 1), rtext)
            name = missing_name(err)
            node = ""
            m = CANT.match(err)
            if m:
                node = "Can't compile " + m.group(1)
            elif phase == "codegen":
                node = err
            call = ""
            m3 = CALL.match(err)
            if m3:
                call = m3.group(1)
            rows.append(dict(corpus=corpus, file=base, xxx=("yes" if base.startswith("XXX") else ""),
                             phase=phase, secs=ct, missing=name, node=norm(node), call=call,
                             first_error=norm(err)))

    rows.sort(key=lambda r: (r["corpus"], r["file"]))
    with open(os.path.join(ROOT, "ladder.tsv"), "w") as fh:
        fh.write("corpus\tfile\tXXX\tphase\tsecs\tmissing_name\tcodegen_node\tunapplicable_call\tfirst_error\n")
        for r in rows:
            fh.write("\t".join([r["corpus"], r["file"], r["xxx"], r["phase"], r["secs"],
                                r["missing"], r["node"], r["call"],
                                r["first_error"].replace("\t", " ")]) + "\n")

    out = []
    order = ["parse", "disambiguate", "typecheck", "codegen", "compile-other",
             "timeout", "link", "run", "pass"]
    for corpus in sorted({r["corpus"] for r in rows}):
        c = collections.Counter(r["phase"] for r in rows if r["corpus"] == corpus)
        out.append("phase counts: %s (%d files)" % (corpus, sum(c.values())))
        for p in order:
            if c[p]:
                out.append("  %-14s %4d" % (p, c[p]))
        out.append("")
    for corpus in sorted({r["corpus"] for r in rows}):
        sub = [r for r in rows if r["corpus"] == corpus]
        out.append("missing names: %s" % corpus)
        for n, k in collections.Counter(r["missing"] for r in sub if r["missing"]).most_common():
            out.append("  %4d  %s" % (k, n))
        out.append("")
        out.append("unapplicable calls: %s" % corpus)
        for n, k in collections.Counter(r["call"] for r in sub if r["call"]).most_common(40):
            out.append("  %4d  %s" % (k, n))
        out.append("")
        out.append("codegen refusals: %s" % corpus)
        for n, k in collections.Counter(node_key(r["node"]) for r in sub if r["node"]).most_common():
            out.append("  %4d  %s" % (k, n))
        out.append("")
        out.append("pass: %s" % corpus)
        for r in sub:
            if r["phase"] == "pass":
                out.append("  %s%s" % (r["file"], "  (XXX)" if r["xxx"] else ""))
        out.append("")
    out.append("unclassified first-error lines")
    for r in rows:
        if r["phase"] == "compile-other":
            out.append("  %s: %s" % (r["file"], r["first_error"][:100]))
    open(os.path.join(ROOT, "summary.txt"), "w").write("\n".join(out) + "\n")
    print("\n".join(out))

main()
