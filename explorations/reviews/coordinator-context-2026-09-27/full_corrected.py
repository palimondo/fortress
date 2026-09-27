#!/usr/bin/env python3
"""Full corrected analysis of the 08:40:07 -> 12:11:24 segment: dedup the
whole transcript by uuid (the file contains byte-identical replays of
earlier chunks re-inserted at later positions), keep only records whose
timestamp falls in [START, END], then report usage sequence, category
attribution (chars/4) and the ten largest items -- in one pass."""
import json
from collections import defaultdict

PATH = "/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl"
START = "2026-09-27T08:40:07.483Z"
END = "2026-09-27T12:11:24.920Z"

def block_text_len(block):
    if not isinstance(block, dict):
        return 0
    t = block.get("type")
    if t == "text":
        return len(block.get("text", ""))
    if t == "tool_result":
        c = block.get("content")
        if isinstance(c, str):
            return len(c)
        if isinstance(c, list):
            return sum(len(x.get("text", "")) for x in c if isinstance(x, dict) and x.get("type") == "text")
    if t == "thinking":
        return len(block.get("thinking", ""))
    return 0

def content_len(c):
    if isinstance(c, str):
        return len(c)
    if isinstance(c, dict):
        return sum((len(v) if isinstance(v, str) else len(json.dumps(v))) for v in c.values())
    if isinstance(c, list):
        return sum(content_len(x) for x in c)
    return 0

def list_all_compactions():
    """Every compact_boundary in the whole session, deduplicated by uuid,
    in true chronological order -- shows the cumulativeDroppedTokens
    bookkeeping break between the 08:40:07 and 12:11:24 compactions."""
    seen = set()
    rows = []
    with open(PATH, encoding="utf-8", errors="replace") as f:
        for line in f:
            rec = json.loads(line)
            if rec.get("type") == "system" and rec.get("subtype") == "compact_boundary":
                uid = rec.get("uuid")
                if uid in seen:
                    continue
                seen.add(uid)
                cm = rec.get("compactMetadata", {})
                rows.append((rec.get("timestamp"), cm.get("trigger"), cm.get("preTokens"),
                             cm.get("postTokens"), cm.get("cumulativeDroppedTokens")))
    rows.sort()
    print("=== Every compaction, deduplicated by uuid, true chronological order ===")
    prev_cum = 0
    for ts, trig, pre, post, cum in rows:
        expected = prev_cum + (pre - post) if pre is not None and post is not None else None
        flag = "  <-- MISMATCH" if expected is not None and cum != expected else ""
        print(f"  {ts}  {trig:6s} pre={pre:>7} post={post:>6} cum={cum:>8} (expected {expected}){flag}")
        prev_cum = cum
    print()


def main():
    list_all_compactions()
    seen = set()
    kept = []
    tool_use_index = {}
    with open(PATH, encoding="utf-8", errors="replace") as f:
        for lineno, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue
            rec = json.loads(line)
            uid = rec.get("uuid")
            # global tool_use index needs first-seen dedup across WHOLE file
            if uid:
                first_seen_here = uid not in seen
                seen.add(uid)
            else:
                first_seen_here = True
            if first_seen_here and rec.get("type") == "assistant":
                msg = rec.get("message", {})
                for b in msg.get("content", []) if isinstance(msg.get("content"), list) else []:
                    if isinstance(b, dict) and b.get("type") == "tool_use":
                        tool_use_index[b.get("id")] = {"name": b.get("name"), "input": b.get("input", {}) or {}}
            ts = rec.get("timestamp")
            if not ts or ts < START or ts > END:
                continue
            if uid and not first_seen_here:
                continue  # duplicate replay: skip
            kept.append((ts, lineno, rec))

    kept.sort(key=lambda x: (x[0], x[1]))
    print(f"Kept {len(kept)} deduplicated in-range records\n")

    usage_rows = []
    cat_chars = defaultdict(int)
    cat_count = defaultdict(int)
    read_by_path = defaultdict(int)
    read_count = defaultdict(int)
    bash_by_label = defaultdict(int)
    tool_result_by_tool = defaultdict(int)
    tool_result_count = defaultdict(int)
    att_type_chars = defaultdict(int)
    att_type_count = defaultdict(int)
    items = []

    for ts, lineno, rec in kept:
        rtype = rec.get("type")
        if rtype == "assistant":
            msg = rec.get("message", {})
            u = msg.get("usage", {})
            total = u.get("input_tokens", 0) + u.get("cache_read_input_tokens", 0) + u.get("cache_creation_input_tokens", 0)
            usage_rows.append((lineno, ts, total, u))
            for b in msg.get("content", []) if isinstance(msg.get("content"), list) else []:
                if not isinstance(b, dict):
                    continue
                bt = b.get("type")
                blen = block_text_len(b)
                if bt == "text":
                    cat_chars["coordinator_text"] += blen; cat_count["coordinator_text"] += 1
                    if blen > 400: items.append((blen, "coordinator text", ts, lineno))
                elif bt == "thinking":
                    cat_chars["coordinator_thinking"] += blen; cat_count["coordinator_thinking"] += 1
                elif bt == "tool_use":
                    try:
                        l2 = len(json.dumps(b.get("input", {})))
                    except Exception:
                        l2 = 0
                    cat_chars["tool_use_input"] += l2; cat_count["tool_use_input"] += 1

        elif rtype == "user":
            is_meta = rec.get("isMeta")
            is_compact_summary = rec.get("isCompactSummary")
            msg = rec.get("message", {})
            content = msg.get("content")
            blocks = content if isinstance(content, list) else ([{"type": "text", "text": content}] if isinstance(content, str) else [])
            for b in blocks:
                if not isinstance(b, dict):
                    continue
                bt = b.get("type")
                blen = block_text_len(b)
                if is_compact_summary and bt == "text":
                    cat_chars["compaction_summary_boundary"] += blen; cat_count["compaction_summary_boundary"] += 1
                    items.append((blen, "compaction summary (boundary artifact)", ts, lineno))
                    continue
                if bt == "tool_result":
                    tuid = b.get("tool_use_id")
                    tinfo = tool_use_index.get(tuid, {})
                    tool_name = tinfo.get("name", "(unknown tool)")
                    inp = tinfo.get("input", {}) if isinstance(tinfo.get("input"), dict) else {}
                    label = inp.get("description") or inp.get("file_path") or inp.get("path") or inp.get("pattern") or inp.get("prompt") or inp.get("command")
                    tool_result_by_tool[tool_name] += blen
                    tool_result_count[tool_name] += 1
                    if tool_name == "Read" and label:
                        read_by_path[label] += blen; read_count[label] += 1
                    if tool_name == "Bash":
                        bash_by_label[label or "(no description)"] += blen
                    if blen > 1500:
                        items.append((blen, f"tool_result: {tool_name}" + (f" [{label}]" if label else ""), ts, lineno))
                elif bt == "text":
                    if is_meta:
                        cat_chars["system_reminder_or_hook"] += blen; cat_count["system_reminder_or_hook"] += 1
                        if blen > 800: items.append((blen, "system-reminder/hook (isMeta)", ts, lineno))
                    else:
                        cat_chars["pavol_messages"] += blen; cat_count["pavol_messages"] += 1
                        if blen > 400: items.append((blen, "Pavol message", ts, lineno))

        elif rtype == "system":
            subtype = rec.get("subtype")
            c = rec.get("content")
            blen = len(c) if isinstance(c, str) else 0
            cat_chars[f"system:{subtype}"] += blen; cat_count[f"system:{subtype}"] += 1
            if blen > 800: items.append((blen, f"system record ({subtype})", ts, lineno))

        elif rtype == "attachment":
            att = rec.get("attachment")
            if not isinstance(att, dict):
                continue
            atype = att.get("type", "(none)")
            slen = len(json.dumps(att))
            att_type_chars[atype] += slen; att_type_count[atype] += 1
            if atype == "prompt_snapshot":
                items.append((slen, "attachment: prompt_snapshot", ts, lineno))
            elif atype == "task_reminder":
                items.append((content_len(att.get("content") or att), "attachment: task_reminder (scheduled check-in)", ts, lineno))
            elif atype == "file":
                items.append((content_len(att.get("content")), f"attachment: file [{att.get('filename')}]", ts, lineno))

    usage_rows.sort(key=lambda x: x[1])
    print("=== Usage sequence ===")
    print("First:", usage_rows[0])
    peak = max(usage_rows, key=lambda x: x[2])
    print("Peak:", peak)
    print("Last:", usage_rows[-1])

    print("\n=== Category totals ===")
    for k in sorted(cat_chars, key=lambda k: -cat_chars[k]):
        print(f"  {k:32s} chars={cat_chars[k]:>9d} ~tok={cat_chars[k]//4:>8d} n={cat_count[k]}")

    print("\n=== tool_result by tool ===")
    for k in sorted(tool_result_by_tool, key=lambda k: -tool_result_by_tool[k]):
        print(f"  {k:20s} chars={tool_result_by_tool[k]:>9d} ~tok={tool_result_by_tool[k]//4:>8d} n={tool_result_count[k]}")

    print("\n=== Read by path ===")
    for k in sorted(read_by_path, key=lambda k: -read_by_path[k]):
        print(f"  {read_by_path[k]:>7d} ~tok={read_by_path[k]//4:>6d} n={read_count[k]:>2d} {k}")

    print("\n=== Bash by label (top 15) ===")
    for k in sorted(bash_by_label, key=lambda k: -bash_by_label[k])[:15]:
        print(f"  {bash_by_label[k]:>7d} ~tok={bash_by_label[k]//4:>6d} {k}")

    print("\n=== attachment types ===")
    for k in sorted(att_type_chars, key=lambda k: -att_type_chars[k]):
        print(f"  {k:28s} chars={att_type_chars[k]:>8d} ~tok={att_type_chars[k]//4:>7d} n={att_type_count[k]}")

    print("\n=== Top 12 items ===")
    items.sort(key=lambda x: -x[0])
    for blen, desc, ts, ln in items[:12]:
        print(f"  ~tok={blen//4:>7d} ts={ts} {desc}")

if __name__ == "__main__":
    main()
