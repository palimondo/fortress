#!/usr/bin/env python3
"""Categorize content in segment.jsonl by source, summing character counts
(token estimate = chars/4). Cross-check against usage-field totals."""
import json
from collections import defaultdict

def norm_bash_label(cmd_desc, command):
    if cmd_desc:
        return cmd_desc
    if command:
        return command[:60]
    return "(bash, no description)"

def main():
    cat_chars = defaultdict(int)
    cat_count = defaultdict(int)
    read_by_path = defaultdict(int)
    read_count_by_path = defaultdict(int)
    bash_by_label = defaultdict(int)
    tool_result_by_tool = defaultdict(int)
    tool_result_count_by_tool = defaultdict(int)
    items = []  # (chars, description, ts, line)

    sum_cache_creation = 0
    sum_cache_read = 0
    sum_input = 0
    n_assistant = 0

    kb_boot_files = [
        "CLAUDE.md", "explorations/protocol.md",
        "explorations/coordinator/FACTS.md", "explorations/coordinator/POSITIONS.md",
        "explorations/coordinator/INDEX.md", "microgpt-run-c-handover.md",
        "PLAN.md",
    ]
    kb_reads = defaultdict(int)

    with open("segment.jsonl") as f:
        for line in f:
            r = json.loads(line)
            rtype = r["type"]
            ts = r.get("ts")
            ln = r.get("line")

            if rtype == "assistant":
                u = r.get("usage", {})
                sum_cache_creation += u.get("cache_creation", 0)
                sum_cache_read += u.get("cache_read", 0)
                sum_input += u.get("input", 0)
                n_assistant += 1
                for b in r.get("blocks", []):
                    bt = b.get("btype")
                    blen = b.get("len", 0)
                    if bt == "text":
                        cat_chars["coordinator_text"] += blen
                        cat_count["coordinator_text"] += 1
                        if blen > 400:
                            items.append((blen, "coordinator text", ts, ln))
                    elif bt == "thinking":
                        cat_chars["coordinator_thinking"] += blen
                        cat_count["coordinator_thinking"] += 1
                        if blen > 800:
                            items.append((blen, "coordinator thinking", ts, ln))
                    elif bt == "tool_use":
                        # the tool_use input itself (small, e.g. bash command text) -- counted with its result
                        cat_chars["tool_use_input"] += blen
                        cat_count["tool_use_input"] += 1

            elif rtype == "user":
                is_meta = r.get("isMeta")
                is_compact_summary = r.get("isCompactSummary")
                for b in r.get("blocks", []):
                    bt = b.get("btype")
                    blen = b.get("len", 0)
                    if is_compact_summary and bt == "text":
                        cat_chars["compaction_summary_boundary"] += blen
                        cat_count["compaction_summary_boundary"] += 1
                        items.append((blen, "compaction summary (boundary artifact, not Pavol/tool growth)", ts, ln))
                        continue
                    if bt == "tool_result":
                        tool_name = b.get("tool_name") or "(unknown tool)"
                        label = b.get("label")
                        tool_result_by_tool[tool_name] += blen
                        tool_result_count_by_tool[tool_name] += 1
                        if tool_name == "Read" and label:
                            read_by_path[label] += blen
                            read_count_by_path[label] += 1
                            for kb in kb_boot_files:
                                if kb in label:
                                    kb_reads[kb] += 1
                        if tool_name == "Bash":
                            lbl = label or "(no description)"
                            bash_by_label[lbl] += blen
                        desc = f"{tool_name}" + (f" [{label}]" if label else "")
                        if blen > 1500:
                            items.append((blen, f"tool_result: {desc}", ts, ln))
                    elif bt == "text":
                        blen2 = blen
                        if is_meta:
                            cat_chars["system_reminder_or_hook"] += blen2
                            cat_count["system_reminder_or_hook"] += 1
                            if blen2 > 800:
                                items.append((blen2, "system-reminder/hook (isMeta user text)", ts, ln))
                        else:
                            cat_chars["pavol_messages"] += blen2
                            cat_count["pavol_messages"] += 1
                            if blen2 > 400:
                                items.append((blen2, "Pavol message", ts, ln))

            elif rtype == "system":
                subtype = r.get("subtype")
                blen = r.get("len", 0)
                key = f"system:{subtype}"
                cat_chars[key] += blen
                cat_count[key] += 1
                if blen > 800:
                    items.append((blen, f"system record ({subtype})", ts, ln))

            elif rtype == "attachment":
                blen = r.get("len", 0)
                cat_chars["attachment_ui"] += blen
                cat_count["attachment_ui"] += 1

    print("=== Category totals (chars, ~tokens@4cpt, count) ===")
    total_chars = 0
    for k in sorted(cat_chars, key=lambda k: -cat_chars[k]):
        c = cat_chars[k]
        total_chars += c
        print(f"  {k:35s} chars={c:>10d}  ~tok={c//4:>9d}  n={cat_count[k]}")

    print("\n=== tool_result by tool (chars, ~tok, count) ===")
    tr_total = 0
    for k in sorted(tool_result_by_tool, key=lambda k: -tool_result_by_tool[k]):
        c = tool_result_by_tool[k]
        tr_total += c
        print(f"  {k:35s} chars={c:>10d}  ~tok={c//4:>9d}  n={tool_result_count_by_tool[k]}")
    print(f"  TOTAL tool_result chars={tr_total} ~tok={tr_total//4}")

    print("\n=== Read by file path (top 25) ===")
    for k in sorted(read_by_path, key=lambda k: -read_by_path[k])[:25]:
        print(f"  {read_by_path[k]:>9d} chars  ~tok={read_by_path[k]//4:>7d}  n={read_count_by_path[k]:>3d}  {k}")

    print("\n=== Bash by label (top 25) ===")
    for k in sorted(bash_by_label, key=lambda k: -bash_by_label[k])[:25]:
        print(f"  {bash_by_label[k]:>9d} chars  ~tok={bash_by_label[k]//4:>7d}  {k}")

    print("\n=== KB boot file read counts (matched substrings) ===")
    for k, v in kb_reads.items():
        print(f"  {k}: {v} reads")

    print("\n=== Top 25 single items overall ===")
    items.sort(key=lambda x: -x[0])
    for blen, desc, ts, ln in items[:25]:
        print(f"  chars={blen:>8d} ~tok={blen//4:>7d}  ts={ts}  line={ln}  {desc}")

    print("\n=== Usage cross-check ===")
    print(f"  n_assistant_calls={n_assistant}")
    print(f"  sum(cache_creation)={sum_cache_creation}  ~that's total NEW tokens ever cache-written")
    print(f"  sum(cache_read)={sum_cache_read} (not additive/meaningful across calls, shown for reference)")
    print(f"  sum(input)={sum_input}")
    print(f"  total_chars_categorized={total_chars}  ~tok={total_chars//4}")

if __name__ == "__main__":
    main()
