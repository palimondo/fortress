#!/usr/bin/env python3
"""make-programs.py: writes the one-call walk programs of Question B into this directory.

Ledger row 484: under walk, `b MAX 1` for a ZZ64 `b` stops with "Ambiguous coercion"
(explorations/compile-ladder/rung-spec-ranges/probes/examples/WideMaxNumeral-base-walk.txt). This
asks whether the same refusal meets MIN and MINMAX, and ZZ32, NN32, NN64, ZZ and RR64 beside a
numeral; and, beyond the numeral, a numeral on the left and a ZZ32 variable beside a ZZ64 one.
Walk's refusals cannot be caught, so each program makes one call. Each prints the value and the
run-time type of the result (of its first element for MINMAX), so that a call that answers through
QQ's declaration shows it. File name equals component name, as walk requires.
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))

# how each receiver is made, from the one library's own conversions
MAKE = {
    'ZZ64': 'b: ZZ64 = widen(3)',            # FortressLibrary.fss, ZZ32's widen
    'ZZ32': 'b: ZZ32 = 3',
    'NN32': 'b: NN32 = unsigned(3)',         # ZZ32's unsigned(self): NN32, :758
    'NN64': 'b: NN64 = unsigned(widen(3))',  # ZZ64's unsigned(self): NN64, :842
    'ZZ':   'b: ZZ = big(3)',                # ZZ32's big(self): ZZ, :761
    'RR64': 'b: RR64 = 3.5',
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
# the numeral on the left
cases.append(('MaxNumLeftZZ64', [MAKE['ZZ64']], '1 MAX b', False))
# no numeral: answer 8's mixed widths through the same operator, both orders
cases.append(('MaxVarZZ64ZZ32', ['w: ZZ64 = widen(4)', 'z: ZZ32 = 3'], 'w MAX z', False))
cases.append(('MaxVarZZ32ZZ64', ['w: ZZ64 = widen(4)', 'z: ZZ32 = 3'], 'z MAX w', False))
# controls: an operator the receiver's type declares itself (FortressLibrary.fss:863 for NN64's +,
# :943 for ZZ's +), beside the same numeral
cases.append(('PlusNumNN64', [MAKE['NN64']], 'b + 1', False))
cases.append(('PlusNumZZ', [MAKE['ZZ']], 'b + 1', False))

with open(os.path.join(HERE, 'list.txt'), 'w') as lst:
    for name, setup, call, mm in cases:
        with open(os.path.join(HERE, name + '.fss'), 'w') as f:
            f.write(program(name, setup, call, mm))
        lst.write(f'{name}\t{call}\t{" ; ".join(setup)}\n')
print(f'{len(cases)} programs')
