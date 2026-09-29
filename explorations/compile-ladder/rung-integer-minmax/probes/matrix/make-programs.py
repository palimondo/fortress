#!/usr/bin/env python3
"""make-programs.py: writes the one-call walk programs of rung M's matrix into this directory.

Row 484: under walk, `b MAX 1` for a ZZ64 `b` stops with "Ambiguous coercion". The question
programs of explorations/reviews/before-n-questions/walk-max/ (B.1) are taken over whole, by name
(the numeral beside each receiver type, the numeral on the left, a ZZ64 and a ZZ32 variable both
ways, the two + controls), and to them this adds MAX over every ordered pair of the five integer
types as variables, no numeral, so that every one of the fifteen declarations is reached by a call
and each answer can be set against answer 8's type (POSITIONS 2026-09-26). Walk's refusals cannot
be caught, so each program makes one call and prints the value and the run-time type of the result
(of both elements for MINMAX). File name equals component name, as walk requires.
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))

# how each receiver is made, from the one library's own conversions (as B.1 made them)
MAKE = {
    'ZZ64': 'b: ZZ64 = widen(3)',
    'ZZ32': 'b: ZZ32 = 3',
    'NN32': 'b: NN32 = unsigned(3)',
    'NN64': 'b: NN64 = unsigned(widen(3))',
    'ZZ':   'b: ZZ = big(3)',
    'RR64': 'b: RR64 = 3.5',
}
# the variables of the matrix: x on the left holds 4, y on the right holds 3, so MAX answers x's value
LEFT = {
    'ZZ32': 'x: ZZ32 = 4',
    'ZZ64': 'x: ZZ64 = widen(4)',
    'NN32': 'x: NN32 = unsigned(4)',
    'NN64': 'x: NN64 = unsigned(widen(4))',
    'ZZ':   'x: ZZ = big(4)',
}
RIGHT = {
    'ZZ32': 'y: ZZ32 = 3',
    'ZZ64': 'y: ZZ64 = widen(3)',
    'NN32': 'y: NN32 = unsigned(3)',
    'NN64': 'y: NN64 = unsigned(widen(3))',
    'ZZ':   'y: ZZ = big(3)',
}

TYPEOF = '''typeOf(x: Any): String = typecase x of
    ZZ32 => "ZZ32"
    ZZ64 => "ZZ64"
    NN32 => "NN32"
    NN64 => "NN64"
    ZZ => "ZZ"
    QQ => "QQ"
    RR64 => "RR64"
    else => "other"
  end
'''

def program(name, setup, call, minmax):
    if minmax:
        body = f'''    (p, q) = {call}
    println("{call} = (" p ", " q ") : (" typeOf(p) ", " typeOf(q) ")")'''
    else:
        body = f'''    r = {call}
    println("{call} = " r " : " typeOf(r))'''
    setup_lines = '\n'.join('    ' + s for s in setup)
    return f'''component {name}
export Executable

{TYPEOF}
run() = do
{setup_lines}
{body}
end

end
'''

cases = []
for t in ['ZZ64', 'ZZ32', 'NN32', 'NN64', 'ZZ', 'RR64']:
    for op, tag in [('MAX', 'Max'), ('MIN', 'Min'), ('MINMAX', 'Minmax')]:
        cases.append((f'{tag}Num{t}', [MAKE[t]], f'b {op} 1', op == 'MINMAX'))
cases.append(('MaxNumLeftZZ64', [MAKE['ZZ64']], '1 MAX b', False))
cases.append(('MaxVarZZ64ZZ32', ['w: ZZ64 = widen(4)', 'z: ZZ32 = 3'], 'w MAX z', False))
cases.append(('MaxVarZZ32ZZ64', ['w: ZZ64 = widen(4)', 'z: ZZ32 = 3'], 'z MAX w', False))
cases.append(('PlusNumNN64', [MAKE['NN64']], 'b + 1', False))
cases.append(('PlusNumZZ', [MAKE['ZZ']], 'b + 1', False))
# the matrix: MAX over every ordered pair of the five integer types, variables only
for l in ['ZZ32', 'ZZ64', 'NN32', 'NN64', 'ZZ']:
    for r in ['ZZ32', 'ZZ64', 'NN32', 'NN64', 'ZZ']:
        cases.append((f'Pair{l}{r}', [LEFT[l], RIGHT[r]], 'x MAX y', False))
# MIN and MINMAX over the mixed pairs whose answer is each of the three wider types
for l, r in [('NN32', 'ZZ32'), ('NN64', 'NN32'), ('NN64', 'ZZ64')]:
    cases.append((f'PairMin{l}{r}', [LEFT[l], RIGHT[r]], 'x MIN y', False))
    cases.append((f'PairMinmax{l}{r}', [LEFT[l], RIGHT[r]], 'x MINMAX y', True))

with open(os.path.join(HERE, 'list.txt'), 'w') as lst:
    for name, setup, call, mm in cases:
        with open(os.path.join(HERE, name + '.fss'), 'w') as f:
            f.write(program(name, setup, call, mm))
        lst.write(f'{name}\t{call}\t{" ; ".join(setup)}\n')
print(f'{len(cases)} programs')
