#!/usr/bin/env python3
# Counts, for each C2-compiled method in a HotSpot "print" listing without
# hsdis (the machine code as hex), the double-precision arithmetic
# instructions by kind: packed (several elements per instruction, with the
# widest register used) or scalar.  The hex is disassembled by objdump.
#   java -XX:+UnlockDiagnosticVMOptions -XX:CompileCommand=print,Class::method ... | asm-count.py
import re, subprocess, sys, tempfile, collections

methods = collections.OrderedDict()      # name -> bytes of its last C2 compilation
name, code = None, None
for line in sys.stdin:
    m = re.match(r'Compiled method \(c2\)\s+\d+\s+\d+\s+(%?)\s*(?:\d+\s+)?(\S+)', line)
    if m:
        name = m.group(2) + (' (OSR)' if m.group(1) else '')
        code = methods[name] = bytearray()
        continue
    if line.startswith('[/MachCode]'):
        name = None
        continue
    if name and re.match(r'\s+0x[0-9a-f]+: [0-9a-f]', line):
        hexs = line.split(':', 1)[1].replace('|', ' ').split()
        code.extend(bytes.fromhex(''.join(hexs)))

PACKED = re.compile(r'\bv?(mul|add|sub|div|sqrt)pd\b')
SCALAR = re.compile(r'\bv?(mul|add|sub|div|sqrt)sd\b')
FMA = re.compile(r'\bvfn?m(add|sub)\d+[ps]d\b')
for name, code in methods.items():
    with tempfile.NamedTemporaryFile(suffix='.bin') as f:
        f.write(code); f.flush()
        dis = subprocess.run(['objdump', '-D', '-b', 'binary', '-mi386:x86-64', f.name], capture_output=True, text=True).stdout
    packed = collections.Counter(); scalar = 0; fma = 0
    for l in dis.splitlines():
        if PACKED.search(l):
            packed['zmm' if 'zmm' in l else 'ymm' if 'ymm' in l else 'xmm'] += 1
        elif SCALAR.search(l): scalar += 1
        if FMA.search(l): fma += 1
    p = ', '.join('%d on %s' % (packed[r], r) for r in ('zmm', 'ymm', 'xmm') if packed[r]) or 'none'
    print('%-40s %6d bytes | packed double arithmetic: %-28s | scalar: %3d | fused multiply-add: %d' % (name, len(code), p, scalar, fma))
