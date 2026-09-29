#!/usr/bin/env python3
"""make-programs.py: writes the compiled counterparts of the matrix (../matrix/): MAX over every ordered pair
of the five integer types as variables, and each type's MAX with a numeral, in the form of
explorations/reviews/before-n-questions/max-compiled/ (a variable bound from a numeral, which the compiler
library's IntLiteral converts into each integer type; its typecase adds IntLiteral). They run on the compile
path, which checks and links against the compiler library (CompilerBuiltin, CompilerLibrary), not the one
library rung M edits, so they record what the compiled path answers today beside walk's answers."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
TYPES = ['ZZ32', 'ZZ64', 'NN32', 'NN64', 'ZZ']
TYPEOF = '''typeOf(x: Any): String = typecase x of
    ZZ32 => "ZZ32"
    ZZ64 => "ZZ64"
    NN32 => "NN32"
    NN64 => "NN64"
    ZZ => "ZZ"
    IntLiteral => "IntLiteral"
    else => "other"
  end'''
def program(name, setup, call):
    s = '\n'.join('    ' + l for l in setup)
    return f'''component {name}
export Executable

{TYPEOF}

run(): () = do
{s}
    r = {call}
    println("{call} = " r " : " typeOf(r))
  end

end
'''
cases = []
for l in TYPES:
    for r in TYPES:
        cases.append((f'CPair{l}{r}', [f'x: {l} = 4', f'y: {r} = 3'], 'x MAX y'))
for t in TYPES:
    cases.append((f'CMaxNum{t}', [f'b: {t} = 3'], 'b MAX 1'))
cases.append(('CMaxNumLeftZZ64', ['b: ZZ64 = 3'], '1 MAX b'))
with open(os.path.join(HERE, 'list.txt'), 'w') as lst:
    for n, s, c in cases:
        open(os.path.join(HERE, n + '.fss'), 'w').write(program(n, s, c))
        lst.write(f'{n}\t{c}\t{" ; ".join(s)}\n')
print(len(cases), 'programs')
