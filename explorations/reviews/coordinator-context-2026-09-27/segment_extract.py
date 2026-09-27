#!/usr/bin/env python3
"""Extract the analysis segment (line LO..HI inclusive) from the transcript
into a compact JSON-lines side file with only what we need for token
accounting: record type, timestamp, a category tag, a size-in-chars figure
for the content that contributes to model input, and a short safe label.

We never copy full tool-result bodies into the output; only their length
and a short label (tool name / file path / command description already
sanitized by the harness's own 'description' field).
"""
import json
import sys

PATH = "/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl"
LO = 32220
HI = 34387

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
            tot = 0
            for x in c:
                if isinstance(x, dict) and x.get("type") == "text":
                    tot += len(x.get("text", ""))
                elif isinstance(x, dict) and x.get("type") == "image":
                    tot += 2000  # rough placeholder; images aren't char-counted meaningfully
            return tot
    if t == "thinking":
        return len(block.get("thinking", ""))
    if t == "tool_use":
        try:
            return len(json.dumps(block.get("input", {})))
        except Exception:
            return 0
    return 0

def main():
    out_path = sys.argv[1] if len(sys.argv) > 1 else "segment.jsonl"
    tool_use_index = {}  # tool_use id -> (name, input dict, assistant lineno)
    out = []
    with open(PATH, "r", encoding="utf-8", errors="replace") as f:
        for lineno, line in enumerate(f, 1):
            if lineno < LO:
                continue
            if lineno > HI:
                break
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
            except json.JSONDecodeError:
                continue
            rtype = rec.get("type")
            ts = rec.get("timestamp")
            row = {"line": lineno, "ts": ts, "type": rtype}

            if rtype == "assistant":
                msg = rec.get("message", {})
                usage = msg.get("usage", {})
                row["usage"] = {
                    "input": usage.get("input_tokens", 0),
                    "cache_read": usage.get("cache_read_input_tokens", 0),
                    "cache_creation": usage.get("cache_creation_input_tokens", 0),
                    "output": usage.get("output_tokens", 0),
                    "thinking_tokens": (usage.get("output_tokens_details") or {}).get("thinking_tokens", 0),
                }
                content = msg.get("content", [])
                blocks = []
                for b in content if isinstance(content, list) else []:
                    if not isinstance(b, dict):
                        continue
                    bt = b.get("type")
                    blen = block_text_len(b)
                    binfo = {"btype": bt, "len": blen}
                    if bt == "tool_use":
                        tool_use_index[b.get("id")] = {"name": b.get("name"), "input": b.get("input", {}), "line": lineno}
                        binfo["name"] = b.get("name")
                        # capture a short label from input (description or command or file_path)
                        inp = b.get("input", {}) if isinstance(b.get("input"), dict) else {}
                        label = inp.get("description") or inp.get("file_path") or inp.get("path") or inp.get("pattern") or inp.get("prompt")
                        if isinstance(label, str):
                            binfo["label"] = label[:150]
                    blocks.append(binfo)
                row["blocks"] = blocks

            elif rtype == "user":
                msg = rec.get("message", {})
                content = msg.get("content")
                is_meta = rec.get("isMeta", False)
                is_compact_summary = rec.get("isCompactSummary", False)
                prompt_source = rec.get("promptSource")
                turn_origin = rec.get("turnOrigin")
                row["isMeta"] = is_meta
                row["isCompactSummary"] = is_compact_summary
                row["promptSource"] = prompt_source
                row["turnOrigin"] = turn_origin
                blocks = []
                if isinstance(content, str):
                    blocks.append({"btype": "text", "len": len(content), "snippet": content[:80]})
                elif isinstance(content, list):
                    for b in content:
                        if not isinstance(b, dict):
                            continue
                        bt = b.get("type")
                        blen = block_text_len(b)
                        binfo = {"btype": bt, "len": blen}
                        if bt == "tool_result":
                            tuid = b.get("tool_use_id")
                            tinfo = tool_use_index.get(tuid)
                            if tinfo:
                                binfo["tool_name"] = tinfo["name"]
                                inp = tinfo["input"] if isinstance(tinfo["input"], dict) else {}
                                label = inp.get("description") or inp.get("file_path") or inp.get("path") or inp.get("pattern") or inp.get("prompt") or inp.get("command")
                                if isinstance(label, str):
                                    binfo["label"] = label[:150]
                        if bt == "text":
                            binfo["snippet"] = b.get("text", "")[:80]
                        blocks.append(binfo)
                row["blocks"] = blocks
                # toolUseResult meta (has structured info sometimes)
                tur = rec.get("toolUseResult")
                if isinstance(tur, dict):
                    row["toolUseResultKeys"] = list(tur.keys())

            elif rtype == "system":
                subtype = rec.get("subtype")
                c = rec.get("content")
                row["subtype"] = subtype
                if isinstance(c, str):
                    row["len"] = len(c)
                    row["snippet"] = c[:100]
                if subtype == "compact_boundary":
                    row["compactMetadata"] = rec.get("compactMetadata")

            elif rtype == "attachment":
                att = rec.get("attachment")
                try:
                    s = json.dumps(att)
                    row["len"] = len(s)
                except Exception:
                    row["len"] = 0
                if isinstance(att, dict):
                    row["att_type"] = att.get("type")

            else:
                # meta-ish records (last-prompt, custom-title, agent-name, mode, atis-latch, frame-link,
                # queue-operation, cost-state) -- these usually aren't sent to the model, record minimal info.
                pass

            out.append(row)

    with open(out_path, "w") as f:
        for row in out:
            f.write(json.dumps(row) + "\n")
    print(f"Wrote {len(out)} rows to {out_path}")

if __name__ == "__main__":
    main()
