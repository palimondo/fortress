#!/usr/bin/env python3
"""skills-lint.py [FILE...]: find the coordinator's agenda in the project skills.

The patterns and their scopes are the "Lint pattern list" of
explorations/reviews/skills-agenda-audit.md:

  fortress-repo and cloud-container, SKILL.md and parts: every set but sources;
  coordinator, SKILL.md and parts: handles (coordinator form), status, stale;
  every references/sources.md: the sources set only.

A file's skill is the folder after "skills/" in its path, so a copy made with
`git show REV:.claude/skills/...` into a folder of the same layout is linted
as the file it copies. A skill not named above takes every set.

With no FILE, every file under the repository's .claude/skills/. Prints
`path:line: set: text` for each hit, the text clipped around the match, and
exits 1 if there is any. Patterns are case-insensitive unless they say (?-i:...).
ALLOW lists hits read and passed, by file, set and a substring of the line.
"""
import os, re, sys

HANDLES = [
    r"\bQ\d+(\.\d+)?\b",
    r"\bitems? (1\d|[2-9]\d|\d{3})[a-z]?\b",
    r"\b(climb )?batch(es)? \d+('s)?\b",
    r"\brung (?!-)[A-Z]\b|\brung's\b",
    r"\b(review|gather|coldread|delta-unfolded|review-routed|judge-review)\.\d+\b",
]
HANDLES_COORDINATOR = HANDLES[:3] + [r"\brung (?!-)[A-Z]\b"]
STATUS = [
    r"\b(pending|unanswered|not (yet )?answered|has not answered|awaiting|still open|leaves the question|to be applied)\b",
    r"\bdoes not yet say\b|\b(is|are) not yet (decided|known|answered)\b",
    r"\bthe default of (Q\d|item \d|way)|\bat (its|the) default\b|\bway \d+[a-z]?\b",
]
PROVENANCE = [
    r"\bcurator('s)? (decided|kept|chose|ruled|answered)\b",
    r"\bthe curator (gives|weighs|keeps)\b",
    r"\bcurator's (answer|decision|ruling|choice)\b",
    r"\bis a decision of the curator\b",
    r"\b(his|her) (answer|decision|word|go|review|choice)\b",
    r"\b(taken|decided|landed) on the recommendation\b",
    r"\baccepted (limit|default)\b",
    r"\b(listed|filed) for (his|the curator's) review\b",
    r"\bPavol\b",
]
AUTHORITY = [
    r"CLIMB-BATCH-\d+|(?-i:\bPLAN(\.md)?\b)|review-queue|held[- ]list|boot note|For Pavol",
    r'POSITIONS(\.md)?,? "',
    r"explorations/reviews/batch-\d+-review",
]
STALE = [
    r"\b(next|this|last|previous) batch\b",
    r"\b\d+ of the \d+\b",
    r"\bopen (ledger )?rows?\b",
    r"\bhas added (none|no|\d+)\b",
    r"\b\d+(\.\d+)?[KM] tokens\b",
    r"\bdistance (to the switch-over )?(is|fell|rose|of) \d",
]
STRUCTURE = [
    r"\bthe (gather|skeptic|judge|cold reader|commit stage)\b|\bmerged-diff review\b|\brung worker\b",
    r"climb-batch-workflow\.(js|md)",
    r"\bthe revival's batches\b",
    r"\bwhen the results land\b",
]
SOURCES = [
    r"\b(unanswered|not (yet )?answered|has not answered|awaiting|still open|leaves the question|to be applied|next batch)\b|\bpending\b(?![- ](script-)?edit)",
]

def compiled(sets):
    return [(name, [re.compile(p, re.I) for p in pats]) for name, pats in sets]

EVERY = compiled([("handles", HANDLES), ("status", STATUS), ("provenance", PROVENANCE),
                  ("authority", AUTHORITY), ("stale", STALE), ("structure", STRUCTURE)])
COORDINATOR = compiled([("handles", HANDLES_COORDINATOR), ("status", STATUS), ("stale", STALE)])
SOURCES_ONLY = compiled([("sources", SOURCES)])

# Hits the audit read and passed: (path ending, set, substring of the line).
ALLOW = [
    ("fortress-repo/SKILL.md", "authority", "session upkeep (compaction, boot notes"),
    ("fortress-repo/references/records.md", "provenance", "needs the curator's decision"),
    ("coordinator/references/agents.md", "stale", "45K tokens"),
    ("coordinator/references/boot.md", "stale", "25K tokens"),
    ("coordinator/references/decisions.md", "stale", "the next batch"),
]

def skill_of(path):
    parts = os.path.normpath(path).split(os.sep)
    if "skills" in parts:
        i = len(parts) - 1 - parts[::-1].index("skills")
        if i + 1 < len(parts):
            return parts[i + 1]
    return None

def sets_for(path):
    parts = os.path.normpath(path).split(os.sep)
    if parts[-1] == "sources.md" and len(parts) > 1 and parts[-2] == "references":
        return SOURCES_ONLY
    if skill_of(path) == "coordinator":
        return COORDINATOR
    return EVERY

def allowed(path, name, line):
    p = os.path.normpath(path).replace(os.sep, "/")
    return any(p.endswith(f) and name == s and sub in line for f, s, sub in ALLOW)

def clip(line, m, width=70):
    a, b = max(0, m.start() - width), min(len(line), m.end() + width)
    return ("..." if a else "") + line[a:b] + ("..." if b < len(line) else "")

def lint(path):
    hits = []
    with open(path, encoding="utf-8") as f:
        for n, line in enumerate(f, 1):
            line = line.strip()
            for name, pats in sets_for(path):
                if allowed(path, name, line):
                    continue
                for pat in pats:
                    for m in pat.finditer(line):
                        hits.append(f"{path}:{n}: {name}: {clip(line, m)}")
    return hits

def main(argv):
    if any(a in ("-h", "--help") for a in argv):
        print(__doc__)
        return 0
    files = argv
    if not files:
        root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..")
        base = os.path.relpath(os.path.join(root, ".claude", "skills"))
        files = sorted(os.path.join(d, f) for d, _, fs in os.walk(base) for f in fs)
    hits = []
    for f in files:
        hits += lint(f)
    for h in hits:
        print(h)
    return 1 if hits else 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
