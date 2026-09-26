#!/usr/bin/env python3
"""Classify the fill-related errors in one run-checker.sh output.

    summarise.py <run.txt>

For every "Invalid overloading of fill in trait X" (printed by the checker, or
printed by the probe as @@HIDDEN because the stock checker returns before the
overloading check, StaticChecker.java:268-275) it looks at the two parameter types
and sorts the pair into:
  value/function  one parameter is an arrow type, the other is not;
  same-kind       both arrows or both non-arrows: the same fill inherited from two
                  sides of the array traits' diamond (StandardImmutableArrayType and
                  ReadableArray/ImmutableArray/Array), with no declaration below both.
It also counts the Return Type Rule errors about fill and the array factories.
"""
import re
import sys
from collections import Counter

text = open(sys.argv[1], encoding="utf-8", errors="replace").read()
# Rejoin: printed errors span several lines; hidden ones are one line each.
blocks = re.split(r"\n(?=/|@@)", text)

head_re = re.compile(r"Invalid overloading of fill in trait (\w+):\s+")


def balanced(s, i):
    """The balanced parenthesised group starting at s[i] == '('."""
    depth = 0
    for j in range(i, len(s)):
        if s[j] == "(":
            depth += 1
        elif s[j] == ")":
            depth -= 1
            if depth == 0:
                return s[i:j + 1], j + 1
    return s[i:], len(s)


def pair_of(b):
    m = head_re.search(b)
    if not m:
        return None
    s1, k = balanced(b, m.end())
    k = b.index(" and ", k) + len(" and ")
    s2, _ = balanced(b, k)
    return m.group(1), s1, s2


def param_of(sig):
    # sig is "(Receiver[\...\], Param)"; take the text after the receiver's top-level comma
    inner = sig[1:-1]
    depth = 0
    for i, ch in enumerate(inner):
        if ch in "([":
            depth += 1
        elif ch in ")]":
            depth -= 1
        elif ch == "," and depth == 0:
            return inner[i + 1:].strip()
    return inner


def is_arrow(p):
    depth = 0
    for i, ch in enumerate(p):
        if ch in "([":
            depth += 1
        elif ch in ")]":
            depth -= 1
        elif p.startswith("->", i) and depth == 0:
            return True
    return False


stats = {"printed": Counter(), "hidden": Counter()}
traits = {"printed": Counter(), "hidden": Counter()}
rtr = Counter()
for b in blocks:
    where = "hidden" if b.startswith("@@HIDDEN") else "printed"
    m = pair_of(b)
    if m:
        trait, s1, s2 = m
        kind = "value/function" if is_arrow(param_of(s1)) != is_arrow(param_of(s2)) else "same-kind"
        stats[where][kind] += 1
        traits[where][(trait, kind)] += 1
    m2 = re.search(r"For (fill|array1|array2|array3|vector|matrix|immutableArray1),\s+the return type", b)
    if m2:
        rtr[(where, m2.group(1))] += 1

for where in ("printed", "hidden"):
    tot = sum(stats[where].values())
    print(f"{where}: fill pairs {tot} = value/function {stats[where]['value/function']} + same-kind {stats[where]['same-kind']}")
    for (t, k), n in sorted(traits[where].items()):
        print(f"    {t:28s} {k:15s} {n}")
for (where, name), n in sorted(rtr.items()):
    print(f"{where}: Return Type Rule errors 'For {name},' {n}")
