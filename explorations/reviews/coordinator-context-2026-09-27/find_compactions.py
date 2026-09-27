#!/usr/bin/env python3
"""Scan the transcript for compaction boundary records.

Looks for:
  - system records with a 'compact' subtype (isCompactSummary, subtype containing 'compact', etc.)
  - user records whose content holds the string
    "This session is being continued from a previous conversation"

Prints line number, timestamp, type/subtype, and a short snippet for each hit.
Never prints full record content.
"""
import json
import sys

PATH = "/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl"

def get_text(content):
    """Extract concatenated text from a message content field (str or list of blocks)."""
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts = []
        for block in content:
            if isinstance(block, dict):
                if block.get("type") == "text":
                    parts.append(block.get("text", ""))
                elif "text" in block:
                    parts.append(str(block.get("text", "")))
        return "\n".join(parts)
    return ""

def main():
    hits = []
    with open(PATH, "r", encoding="utf-8", errors="replace") as f:
        for lineno, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
            except json.JSONDecodeError:
                continue
            rtype = rec.get("type")
            ts = rec.get("timestamp")
            is_hit = False
            reason = ""
            subtype = rec.get("subtype")
            if rtype == "system":
                # check subtype for compact
                st = str(rec.get("subtype", "")).lower()
                content_str = ""
                if "compact" in st:
                    is_hit = True
                    reason = f"system subtype={rec.get('subtype')}"
                else:
                    # sometimes content field describes it
                    c = rec.get("content")
                    if isinstance(c, str) and "compact" in c.lower():
                        is_hit = True
                        reason = f"system content mentions compact"
            if rtype == "user":
                msg = rec.get("message", {})
                content = msg.get("content") if isinstance(msg, dict) else None
                text = get_text(content)
                if "This session is being continued from a previous conversation" in text:
                    is_hit = True
                    reason = "user summary marker"
            # also check top-level 'isCompactSummary' or similar flags
            if rec.get("isCompactSummary") or rec.get("isMeta") and "compact" in json.dumps(rec.get("meta", {})).lower():
                is_hit = True
                reason = (reason + "; isCompactSummary/meta").strip("; ")

            if is_hit:
                hits.append((lineno, ts, rtype, subtype, reason))

    print(f"Total hits: {len(hits)}")
    for h in hits:
        print(h)

if __name__ == "__main__":
    main()
