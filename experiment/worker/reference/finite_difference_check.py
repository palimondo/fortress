#!/usr/bin/env python3
"""Central-difference check of every reference autograd parameter gradient."""
from generate_fixture import TOKENS, gpt, make_state, softmax

def loss_data(state):
    keys, values, losses = [[]], [[]], []
    for pos, (token, target) in enumerate(zip(TOKENS, TOKENS[1:])):
        probs = softmax(gpt(state, token, pos, keys, values))
        losses.append(-probs[target].log())
    return (sum(losses) / len(losses)).data

state, params = make_state()
keys, values, losses = [[]], [[]], []
for pos, (token, target) in enumerate(zip(TOKENS, TOKENS[1:])):
    probs = softmax(gpt(state, token, pos, keys, values))
    losses.append(-probs[target].log())
loss = sum(losses) / len(losses)
loss.backward()

h = 1e-6
worst = (0.0, None, None, None)
for i in range(len(params)):
    plus_state, plus_params = make_state(); plus_params[i].data += h
    minus_state, minus_params = make_state(); minus_params[i].data -= h
    numeric = (loss_data(plus_state) - loss_data(minus_state)) / (2*h)
    analytic = params[i].grad
    err = abs(numeric - analytic)
    assert err < 2e-8, (i, analytic, numeric, err)
    if err > worst[0]:
        worst = (err, i, analytic, numeric)
err, i, analytic, numeric = worst
print(f"checked {len(params)} / {len(params)} parameter gradients")
print(f"worst parameter[{i}] analytic={analytic:+.12e} numeric={numeric:+.12e} abs_err={err:.3e}")
print("complete finite-difference validation: PASS")
