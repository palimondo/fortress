#!/usr/bin/env python3
# Rung C's mechanical check that an edit adds comments and nothing else; see REPORT.md.
# usage: comment-only-check.py <base-commit> <file>...
# For each file: (1) the diff against <base-commit> deletes no line; (2) the file's
# token stream with comments removed is identical before and after; (3) every added
# line lies wholly inside comments.  The comment lexer follows
# ProjectFortress/src/com/sun/fortress/parser/Spacing.rats: "(*" ... "*)" nests,
# "(*)" opens a comment to the end of the line, and "(*)" inside a comment is one unit.
import subprocess, sys

def comment_mask(text):
    """Return a list of booleans, True where the character is inside a comment."""
    n = len(text); mask = [False] * n; i = 0
    def block(i):            # text[i:i+2] == "(*", not "(*)": returns index after the closing "*)"
        start = i; i += 2; depth = 1
        while i < n and depth:
            if text.startswith("(*)", i): i += 3
            elif text.startswith("(*", i): depth += 1; i += 2
            elif text.startswith("*)", i): depth -= 1; i += 2
            else: i += 1
        if depth: raise SystemExit("unbalanced comment opened at offset %d" % start)
        return i
    def line(i):             # text[i:i+3] == "(*)": to the end of the line, nested block comments allowed
        i += 3
        while i < n and text[i] not in "\r\n":
            if text.startswith("(*)", i): i += 3
            elif text.startswith("(*", i): i = block(i)
            elif text.startswith("*)", i): raise SystemExit("stray *) in a line comment at offset %d" % i)
            else: i += 1
        return i
    while i < n:
        c = text[i]
        if c == '"':         # string literal
            i += 1
            while i < n and text[i] != '"':
                i += 2 if text[i] == '\\' else 1
            i += 1
        elif text.startswith("(*)", i):
            j = line(i); mask[i:j] = [True] * (j - i); i = j
        elif text.startswith("(*", i):
            j = block(i); mask[i:j] = [True] * (j - i); i = j
        else:
            i += 1
    return mask

def tokens(text):
    m = comment_mask(text)
    return "".join(" " if m[k] else ch for k, ch in enumerate(text)).split()

def main():
    base, files = sys.argv[1], sys.argv[2:]
    bad = 0
    for f in files:
        old = subprocess.run(["git", "show", "%s:%s" % (base, f)], capture_output=True, text=True, check=True).stdout
        new = open(f, encoding="utf-8").read()
        diff = subprocess.run(["git", "diff", "-U0", base, "--", f], capture_output=True, text=True, check=True).stdout
        deleted = [l for l in diff.splitlines() if l.startswith("-") and not l.startswith("---")]
        mask = comment_mask(new)
        starts = [0]
        for k, ch in enumerate(new):
            if ch == "\n": starts.append(k + 1)
        added, notcomment, newline = [], [], None
        for l in diff.splitlines():
            if l.startswith("@@"):
                plus = l.split()[2]
                newline = int(plus[1:].split(",")[0])
            elif l.startswith("+") and not l.startswith("+++"):
                s = starts[newline - 1]; e = s + len(l) - 1
                if any(not mask[k] for k in range(s, e) if not new[k].isspace()):
                    notcomment.append(newline)
                added.append(newline); newline += 1
        same = tokens(old) == tokens(new)
        print("%s: %d lines added, %d deleted, %d added lines not wholly comment, token stream without comments %s"
              % (f, len(added), len(deleted), len(notcomment), "IDENTICAL" if same else "DIFFERS"))
        print("  added at new lines: %s" % (",".join(map(str, added)) or "none"))
        if deleted or notcomment or not same:
            bad = 1
            for l in deleted: print("  deleted: " + l)
            for k in notcomment: print("  not comment: %d: %s" % (k, new.splitlines()[k - 1]))
    print("RESULT: " + ("FAIL" if bad else "comment-only"))
    return bad

sys.exit(main())
