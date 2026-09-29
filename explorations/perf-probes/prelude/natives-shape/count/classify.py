#!/usr/bin/env python3
"""Classify every native binding of the one library (matched.tsv) by what the compiled
path needs for it, from its glue class (the operation's identity) and the compiler's
helpers (../helpers-javap.txt):
  A  bound      the compiler prelude binds the same operation, at the same owner and
                signature, to a nativeHelpers method: the binding text changes, no Java
  B  helper     a nativeHelpers static method computes it; nothing binds it there yet
                (another name, another owner, or no declaration)
  C  new        a static helper over Java values must be written (the glue class's body
                is the source)
  D1 object     a method of a native I/O object (Writer, BufferedWriter, File*, Reader):
                needs a Java-backed type in the one library, as the compiler prelude's
                JavaBufferedReader/Writer, then helpers (fileOps has 17 over them)
  D2 other      no compiled analogue: reflection, Thread, the native arrays, the task trace
Writes classified.tsv; prints counts by file and by class.  Run from this directory."""
import csv, re
from collections import Counter, defaultdict

H = defaultdict(set)
for ln in open('../helpers-javap.txt'):
    cls, sig = ln.rstrip('\n').split('\t', 1)
    m = re.search(r'\s(\w+)\(', sig)
    if m and sig.startswith('public'): H[cls].add(m.group(1))

def have(cls, name):
    return name if name in H[cls] else None

INT = {'Int': ('simpleIntArith', 'int'), 'Long': ('simpleLongArith', 'long'),
       'NN32': ('simpleUnsignedIntArith', 'unsignedInt'),
       'UnsignedLong': ('simpleUnsignedLongArith', 'unsignedLong')}
INTOP = {'Add': 'OverflowingAdd', 'Sub': 'OverflowingSub', 'Mul': 'OverflowingMul',
         'Div': 'OverflowingDiv', 'Negate': 'OverflowingNeg', 'Eq': 'EQ', 'Less': 'LT',
         'BitAnd': 'BitAnd', 'BitOr': 'BitOr', 'BitXor': 'BitXor', 'BitNot': 'BitNot',
         'Choose': 'OverflowingChoose', 'WrappingAdd': 'WrappingAdd',
         'WrappingSub': 'WrappingSub', 'WrappingMul': 'WrappingMul',
         'WrappingNegate': 'WrappingNeg', 'ToString': 'ToString', 'AsFloat': 'ToDouble',
         'LShift': 'BitLeftShift', 'RShift': 'BitRightShift'}
BIG = {'Add': 'add', 'Sub': 'sub', 'Mul': 'mul', 'Div': 'div', 'Negate': 'neg', 'Eq': 'eq',
       'BitAnd': 'and', 'BitOr': 'oor', 'BitXor': 'xor', 'BitNot': 'not', 'ToString': 'toString',
       'LShift': 'shiftLeft'}
DBL = {'Add': 'doubleAdd', 'Sub': 'doubleSub', 'Mul': 'doubleMul', 'Div': 'doubleDiv',
       'Negate': 'doubleNeg', 'Eq': 'doubleEQ', 'Less': 'doubleLT', 'LessEq': 'doubleLE',
       'Greater': 'doubleGT', 'GreaterEq': 'doubleGE', 'Abs': 'doubleAbs', 'Sqrt': 'doubleSQRT',
       'Sin': 'doubleSin', 'Cos': 'doubleCos', 'Tan': 'doubleTan', 'ASin': 'doubleASin',
       'ACos': 'doubleACos', 'ATan': 'doubleATan', 'ATan2': 'doubleATan2', 'Log': 'doubleLog',
       'Exp': 'doubleExp', 'Pow': 'doublePow', 'ToString': 'doubleToString',
       'Floor': 'doubleFloor', 'Ceiling': 'doubleCeiling'}
CHR = {'Eq': 'charEQ', 'LessThan': 'charLT', 'ToString': 'charToString',
       'ToExprString': 'charToExprString', 'Chr': 'charMakeCharacterWithSpecialCompilerHackForCharacterResultType',
       'CodePoint': 'charCodePointWithSpecialCompilerHackForCharacterArgumentType'}
OTHER = {  # glue -> (class, helper) for the rest of the prelude's families
    'ObjectPrims$ToString': ('stringOps', 'defaultAsString'),
    'ObjectPrims$ClassName': ('stringOps', 'typeName'),
    'AnyPrim$SEquiv': ('equality', 'sEquiv'),
    'FlatString$Size': ('simpleConcatenate', 'nativeStrlen'),
    'FlatString$Eq': ('stringOps', 'compareTo'), 'FlatString$Cmp': ('stringOps', 'compareTo'),
    'FlatString$Index': ('stringOps', 'charAt'), 'FlatString$Substr': ('stringOps', 'substring'),
    'FlatString$IndexOf': ('stringOps', 'indexOf'),
    'FlatString$Concat': ('simpleConcatenate', 'nativeConcatenate'),
    'StringPrim$GetProperty': ('systemOps', 'getProperty'),
    'StringPrim$PrintlnWithThread': ('simplePrintln', 'nativePrintlnWithThreadInfo'),
    'Int$ToLong': ('simpleLongArith', 'intToLong'),
    'NN32$ToUnsignedLong': ('simpleUnsignedIntArith', 'toLong'),
    'Long$FromLong': ('simpleIntArith', 'longWrappingToInt'),
    'UnsignedLong$FromLong': ('simpleUnsignedIntArith', 'longWrappingToUnsignedInt'),
    'Long$ToBigNum': ('simpleArbitraryPrecisionArith', 'makeZZfromZZ64'),
    'ZZ32$ToNN32': ('simpleUnsignedIntArith', 'makeNN32FromZZ32WithSpecialCompilerHackForNN32ResultType'),
    'Long$ToUnsignedLong': ('simpleUnsignedLongArith', 'makeNN64FromZZ64WithSpecialCompilerHackForNN64ResultType'),
    'NN32$ToInt': ('simpleUnsignedIntArith', 'makeZZ32FromNN32WithSpecialCompilerHackForNN32ArgumentType'),
    'UnsignedLong$ToLong': ('simpleUnsignedLongArith', 'makeZZ64FromNN64WithSpecialCompilerHackForNN64ArgumentType'),
    'RR32$AsFloat': ('simpleDoubleArith', 'floatToDouble'),
    'Float$Truncate': ('simpleDoubleArith', 'doubleTruncate'),
    'Float$Round': ('simpleDoubleArith', 'doubleRound'),
    'Float$Random': ('LocalRandom', 'localRandomDouble'),
}
D_FAMILIES = {'Thread', 'Reflect', 'ReflectArrow', 'ReflectCollection', 'ReflectGeneric',
              'ReflectGenericArrow', 'ReflectMethod', 'ReflectRest', 'ReflectTuple',
              'PrimitiveArray', 'PrimImmutableArray', 'PrimImmutableRR64Array',
              'FileReadStream', 'FileWriteStream', 'Reader', 'Writer', 'BufferedWriter'}
D_GLUE = {'StringPrim$GetProgramArgs': 'returns an ImmutableArray: the array representation (phase 5)',
          'StringPrim$PrintTaskTrace': "the interpreter's task structures",
          'Writer$LineSeparator': None}  # None: a plain helper after all (C)

def helper_for(glue):
    fam, op = glue.split('$', 1)
    if glue in OTHER:
        c, n = OTHER[glue]; return (c, have(c, n))
    if fam in INT and op in INTOP:
        c, p = INT[fam]; return (c, have(c, p + INTOP[op]))
    if fam == 'BigNum' and op in BIG:
        return ('simpleArbitraryPrecisionArith', have('simpleArbitraryPrecisionArith', BIG[op]))
    if fam == 'Float' and op in DBL:
        return ('simpleDoubleArith', have('simpleDoubleArith', DBL[op]))
    if fam == 'Char':
        n = CHR.get(op, 'char' + op[0].upper() + op[1:])
        return ('simpleChar', have('simpleChar', n))
    return (None, None)

def reason(glue):
    fam = glue.split('$')[0]
    if glue in D_GLUE: return D_GLUE[glue]
    if fam in D_FAMILIES:
        return {'Thread': 'the Thread object of spawn: a task representation',
                'PrimitiveArray': 'the array representation (phase 5)',
                'PrimImmutableArray': 'the array representation (phase 5)',
                'PrimImmutableRR64Array': 'the array representation (phase 5)'}.get(
            fam, 'reflection over run-time Fortress types' if fam.startswith('Reflect')
            else 'a native I/O object: a representation for the object, then helpers (fileOps has 17 over FortressBufferedReader/Writer)')
    return D_GLUE.get(glue)

rows = list(csv.DictReader(open('matched.tsv'), delimiter='\t'))
out, cnt = [], Counter()
ABSTRACT = {'AnyIntegral', 'Number', 'Any', 'T', 'Type', 'Type...', 'Object'}
for r in rows:
    g = r['glue']
    cls, h = helper_for(g)
    why = reason(g)
    semantic = ''
    if why:
        k = 'D1' if why.startswith('a native I/O object') else 'D2'
    elif r['match'] == 'same-signature' and h and h in r['compiled'].split(' -> ')[-1].replace('.', ' ').split():
        k = 'A'
    elif r['match'] == 'same-signature' and not h:
        k = 'A'; h = r['compiled'].split(' -> ')[-1]
    elif h:
        k = 'B'
        if r['match'] == 'same-signature': semantic = 'the compiler prelude binds this name to another helper: ' + r['compiled'].split(' -> ')[-1]
        elif r['match'] != 'none': semantic = 'the compiler prelude declares this name at another signature: ' + r['compiled']
    else:
        k = 'C'
    from match import ptypes
    abstract = [t for t in ptypes(r['header']) if t in ABSTRACT or '->' in t]
    out.append([r['file'], r['line'], r['owner'], r['name'], r['header'], g, k,
                (cls + '.' + h) if (cls and h and '.' not in h) else (h or ''),
                why or semantic, ','.join(abstract)])
    cnt[(r['file'], k)] += 1
with open('classified.tsv', 'w') as fh:
    fh.write('file\tline\towner\tname\theader\tglue\tclass\thelper\tnote\tabstract_params\n')
    for o in out: fh.write('\t'.join(o) + '\n')
files = sorted({r['file'] for r in rows}, key=lambda f: -sum(v for (ff, k), v in cnt.items() if ff == f))
K = ['A', 'B', 'C', 'D1', 'D2']
tot = Counter()
for f in files:
    row = {k: cnt[(f, k)] for k in K}
    for k in K: tot[k] += row[k]
    print(f'{f:22s} ' + ' '.join(f'{k}={row[k]:3d}' for k in K) + f'  total={sum(row.values())}')
print('all' + ' ' * 19 + ' '.join(f'{k}={tot[k]:3d}' for k in K) + f'  total={sum(tot.values())}')
PRE = {'FortressBuiltin.fss', 'FortressLibrary.fss', 'FlatString.fss', 'Writer.fss', 'NativeArray.fss'}
for name, sel in (('prelude closure', lambda f: f in PRE), ('outside it', lambda f: f not in PRE)):
    row = {k: sum(v for (ff, kk), v in cnt.items() if kk == k and sel(ff)) for k in K}
    print(f'{name:22s} ' + ' '.join(f'{k}={row[k]:3d}' for k in K) + f'  total={sum(row.values())}')
for k in K:
    print(k, 'distinct glue classes:', len({o[5] for o in out if o[6] == k}))
print('bindings with a parameter that is not a Java value (AnyIntegral, Number, Any, T, Type, a function):',
      sum(1 for o in out if o[9]), Counter(o[6] for o in out if o[9]))
print('B whose name the compiler prelude binds to another helper:', sum(1 for o in out if o[8].startswith('the compiler prelude')))
