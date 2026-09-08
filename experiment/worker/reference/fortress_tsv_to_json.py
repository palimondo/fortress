#!/usr/bin/env python3
"""Convert strict line-oriented Fortress result events to fixture JSON."""
import argparse
import json
import math
from pathlib import Path

D, NHEAD, VOCAB, CONTEXT = 4, 2, 3, 3
SHAPES = {
    "wte": (3, 4), "wpe": (3, 4), "lm_head": (3, 4),
    "layer0.attn_wq": (4, 4), "layer0.attn_wk": (4, 4),
    "layer0.attn_wv": (4, 4), "layer0.attn_wo": (4, 4),
    "layer0.mlp_fc1": (16, 4), "layer0.mlp_fc2": (4, 16),
}
MATRIX_EVENTS = {"initial": "initial", "gradient": "gradients", "updated": "updated"}
VECTOR_EVENTS = {
    "logits": "training_logits", "probability": "training_probabilities",
    "genlogits": "generation_logits", "genprobability": "generation_probabilities",
}

def integer(text, line):
    try: value = int(text)
    except ValueError: raise ValueError(f"line {line}: expected integer, got {text!r}") from None
    return value

def number(text, line):
    try: value = float(text)
    except ValueError: raise ValueError(f"line {line}: expected number, got {text!r}") from None
    if not math.isfinite(value): raise ValueError(f"line {line}: non-finite number {text!r}")
    return value

def put(values, key, value, line):
    if key in values: raise ValueError(f"line {line}: duplicate event for {key}")
    values[key] = value

def require_keys(values, expected, label):
    actual = set(values)
    missing, extra = expected - actual, actual - expected
    if missing or extra:
        raise ValueError(f"{label} coverage mismatch: missing={sorted(missing)!r}, extra={sorted(extra)!r}")

def convert(lines):
    matrices = {field: {} for field in MATRIX_EVENTS.values()}
    vectors = {field: {} for field in VECTOR_EVENTS.values()}
    attention, loss, uniforms, tokens = {}, {}, {}, {}
    for line_no, raw in enumerate(lines, 1):
        raw = raw.rstrip("\r\n")
        if not raw or raw.startswith("#"): continue
        fields = raw.split("\t")
        event = fields[0]
        if event in MATRIX_EVENTS:
            if len(fields) != 5: raise ValueError(f"line {line_no}: {event} needs 5 fields")
            name, row, col, value = fields[1], integer(fields[2], line_no), integer(fields[3], line_no), number(fields[4], line_no)
            if name not in SHAPES: raise ValueError(f"line {line_no}: unknown matrix {name!r}")
            rows, cols = SHAPES[name]
            if not (0 <= row < rows and 0 <= col < cols): raise ValueError(f"line {line_no}: matrix index out of range")
            put(matrices[MATRIX_EVENTS[event]], (name, row, col), value, line_no)
        elif event in VECTOR_EVENTS:
            if len(fields) != 4: raise ValueError(f"line {line_no}: {event} needs 4 fields")
            pos, index, value = integer(fields[1], line_no), integer(fields[2], line_no), number(fields[3], line_no)
            if not (0 <= pos < CONTEXT and 0 <= index < VOCAB): raise ValueError(f"line {line_no}: vector index out of range")
            put(vectors[VECTOR_EVENTS[event]], (pos, index), value, line_no)
        elif event == "attention":
            if len(fields) != 5: raise ValueError(f"line {line_no}: attention needs 5 fields")
            pos, head, time, value = integer(fields[1], line_no), integer(fields[2], line_no), integer(fields[3], line_no), number(fields[4], line_no)
            if not (0 <= pos < CONTEXT and 0 <= head < NHEAD and 0 <= time <= pos): raise ValueError(f"line {line_no}: attention index out of range")
            put(attention, (pos, head, time), value, line_no)
        elif event == "loss":
            if len(fields) != 2: raise ValueError(f"line {line_no}: loss needs 2 fields")
            put(loss, (), number(fields[1], line_no), line_no)
        elif event == "uniform":
            if len(fields) != 3: raise ValueError(f"line {line_no}: uniform needs 3 fields")
            pos, value = integer(fields[1], line_no), number(fields[2], line_no)
            if not (0 <= pos < CONTEXT) or not (0.0 <= value < 1.0): raise ValueError(f"line {line_no}: invalid uniform")
            put(uniforms, pos, value, line_no)
        elif event == "gentoken":
            if len(fields) != 3: raise ValueError(f"line {line_no}: gentoken needs 3 fields")
            pos, value = integer(fields[1], line_no), integer(fields[2], line_no)
            if not (0 <= pos < CONTEXT and 0 <= value < VOCAB): raise ValueError(f"line {line_no}: invalid generated token")
            put(tokens, pos, value, line_no)
        else:
            raise ValueError(f"line {line_no}: unknown event {event!r}")

    matrix_keys = {(name, r, c) for name, (rows, cols) in SHAPES.items() for r in range(rows) for c in range(cols)}
    train_keys = {(p, i) for p in range(CONTEXT) for i in range(VOCAB)}
    attention_keys = {(p, h, t) for p in range(CONTEXT) for h in range(NHEAD) for t in range(p + 1)}
    pos_keys = set(range(CONTEXT))
    for field, values in matrices.items(): require_keys(values, matrix_keys, field)
    for field in ("training_logits", "training_probabilities"): require_keys(vectors[field], train_keys, field)
    require_keys(attention, attention_keys, "attention_weights")
    require_keys(loss, {()}, "loss")
    require_keys(uniforms, pos_keys, "generation_uniforms")
    require_keys(tokens, pos_keys, "generated_tokens")
    for field in ("generation_logits", "generation_probabilities"): require_keys(vectors[field], train_keys, field)
    if any(tokens[p] == 2 for p in range(CONTEXT - 1)):
        raise ValueError("generated BOS must stop the sequence; events after BOS are invalid")

    named = lambda vals: {name: [[vals[name, r, c] for c in range(cols)] for r in range(rows)] for name, (rows, cols) in SHAPES.items()}
    vecs = lambda vals: [[vals[p, i] for i in range(VOCAB)] for p in range(CONTEXT)]
    return {
        "metadata": {"d": 4, "nhead": 2, "nlayer": 1, "vocab": 3, "context": 3,
                     "tokens": [2, 0, 1, 2], "parameter_formula": "((global_index % 29) - 14) / 100",
                     "source_revision": "14fb038816c7aae0bb9342c2dbf1a51dd134a5ff"},
        "initial": named(matrices["initial"]),
        "training_logits": vecs(vectors["training_logits"]),
        "training_probabilities": vecs(vectors["training_probabilities"]),
        "attention_weights": [[[attention[p, h, t] for t in range(p + 1)] for h in range(NHEAD)] for p in range(CONTEXT)],
        "loss": loss[()], "gradients": named(matrices["gradients"]), "updated": named(matrices["updated"]),
        "generation_uniforms": [uniforms[p] for p in range(CONTEXT)],
        "generation_logits": vecs(vectors["generation_logits"]),
        "generation_probabilities": vecs(vectors["generation_probabilities"]),
        "generated_tokens": [tokens[p] for p in range(CONTEXT)],
    }

if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("input", type=Path)
    ap.add_argument("output", type=Path)
    args = ap.parse_args()
    args.output.write_text(json.dumps(convert(args.input.read_text().splitlines()), indent=2, sort_keys=True) + "\n")
    print(f"wrote {args.output}")
