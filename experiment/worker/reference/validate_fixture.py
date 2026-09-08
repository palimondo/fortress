#!/usr/bin/env python3
"""Regenerate and recursively compare the checked-in golden fixture."""
import argparse, json, math
from pathlib import Path
from generate_fixture import generate

MATRIX_SHAPES = {
    "wte": (3, 4), "wpe": (3, 4), "lm_head": (3, 4),
    "layer0.attn_wq": (4, 4), "layer0.attn_wk": (4, 4),
    "layer0.attn_wv": (4, 4), "layer0.attn_wo": (4, 4),
    "layer0.mlp_fc1": (16, 4), "layer0.mlp_fc2": (4, 16),
}

def flatten(named):
    return [x for name in MATRIX_SHAPES for row in named[name] for x in row]

def validate_invariants(result, atol=1e-12):
    assert result["metadata"] == {
        "d": 4, "nhead": 2, "nlayer": 1, "vocab": 3, "context": 3,
        "tokens": [2, 0, 1, 2],
        "parameter_formula": "((global_index % 29) - 14) / 100",
        "source_revision": "14fb038816c7aae0bb9342c2dbf1a51dd134a5ff",
    }
    for field in ("initial", "gradients", "updated"):
        assert set(result[field]) == set(MATRIX_SHAPES)
        for name, (rows, cols) in MATRIX_SHAPES.items():
            mat = result[field][name]
            assert len(mat) == rows and all(len(row) == cols for row in mat), (field, name)
    initial, grads, updated = map(flatten, (result["initial"], result["gradients"], result["updated"]))
    assert len(initial) == len(grads) == len(updated) == 228
    for i, x in enumerate(initial):
        assert math.isclose(x, ((i % 29) - 14) / 100, abs_tol=atol), i
    # At Adam step 1, bias correction reduces the update to
    # lr*g/(abs(g)+eps); this checks every parameter, including zero gradients.
    for i, (x, g, y) in enumerate(zip(initial, grads, updated)):
        want = x - 0.01 * g / (abs(g) + 1e-8)
        assert math.isclose(y, want, abs_tol=atol, rel_tol=1e-10), (i, y, want)
    assert len(result["training_logits"]) == len(result["training_probabilities"]) == 3
    for probs in result["training_probabilities"] + result["generation_probabilities"]:
        assert len(probs) == 3
        assert math.isclose(sum(probs), 1.0, abs_tol=atol)
        assert all(0.0 < p < 1.0 for p in probs)
    assert [len(head) for step in result["attention_weights"] for head in step] == [1, 1, 2, 2, 3, 3]
    for step in result["attention_weights"]:
        assert len(step) == 2
        for head in step:
            assert math.isclose(sum(head), 1.0, abs_tol=atol)
    assert len(result["generation_logits"]) == len(result["generation_probabilities"]) == len(result["generated_tokens"])
    for u, probs, chosen in zip(result["generation_uniforms"], result["generation_probabilities"], result["generated_tokens"]):
        cumulative = 0.0
        expected = len(probs) - 1
        for j, p in enumerate(probs):
            cumulative += p
            if u < cumulative:
                expected = j
                break
        assert chosen == expected, (u, probs, chosen, expected)

def compare(a, b, path="root", atol=1e-12, rtol=1e-10):
    if isinstance(a, dict):
        assert a.keys() == b.keys(), f"{path}: keys differ"
        for k in a: compare(a[k], b[k], f"{path}.{k}", atol, rtol)
    elif isinstance(a, list):
        assert len(a) == len(b), f"{path}: lengths differ"
        for i, (x, y) in enumerate(zip(a, b)): compare(x, y, f"{path}[{i}]", atol, rtol)
    elif isinstance(a, (int, float)) and isinstance(b, (int, float)):
        assert math.isclose(a, b, abs_tol=atol, rel_tol=rtol), f"{path}: {a} != {b}"
    else: assert a == b, f"{path}: {a!r} != {b!r}"

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("actual", nargs="?", help="JSON to compare; default regenerates Python reference")
    ap.add_argument("--atol", type=float, default=1e-12)
    ap.add_argument("--rtol", type=float, default=1e-10)
    args = ap.parse_args()
    expected = json.loads(Path(__file__).with_name("fixture.json").read_text())
    actual = json.loads(Path(args.actual).read_text()) if args.actual else generate()
    validate_invariants(expected, args.atol)
    validate_invariants(actual, args.atol)
    compare(expected, actual, atol=args.atol, rtol=args.rtol)
    print("fixture validation: PASS")
