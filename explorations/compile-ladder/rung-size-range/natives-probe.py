#!/usr/bin/env python3
"""natives-probe.py <out-dir>: writes one walk program per case of the nine natives and NN32's LCM,
each printing its label and the value or the name of the exception a catch sees; a case whose error
no catch sees ends its own program only. The cases are the rung's natives test's, before it existed."""
import os, sys
out = sys.argv[1]
os.makedirs(out, exist_ok=True)
decl = {
 'ZZ32': 'two: ZZ32 = 2; three: ZZ32 = 3; mtwo: ZZ32 = -2; zero: ZZ32 = 0; one: ZZ32 = 1; mone: ZZ32 = -1; n34: ZZ32 = 34; n33: ZZ32 = 33; five: ZZ32 = 5; mfive: ZZ32 = -5; maxI: ZZ32 = 2147483647',
 'ZZ64': 'two: ZZ64 = 2; three: ZZ64 = 3; mtwo: ZZ64 = -2; n66: ZZ64 = 66; n67: ZZ64 = 67; n68: ZZ64 = 68; n62: ZZ64 = 62; five: ZZ64 = 5',
 'NN32': 'twoTo31: NN32 = unsigned(1073741824) + unsigned(1073741824); seven: NN32 = unsigned(7); two: NN32 = unsigned(2); six: NN32 = unsigned(6); four: NN32 = unsigned(4); b16: NN32 = unsigned(65536); b16p: NN32 = unsigned(65537); maxU: NN32 = BITNOT unsigned(0); one: NN32 = unsigned(1); n92682: NN32 = unsigned(92682); n92683: NN32 = unsigned(92683); three: NN32 = unsigned(3); five: NN32 = unsigned(5); m65535: NN32 = unsigned(65535)',
 'NN64': 'maxL: ZZ64 = 9223372036854775807; twoTo63: NN64 = unsigned(maxL) + unsigned(widen(1)); two: NN64 = unsigned(widen(2)); three: NN64 = unsigned(widen(3)); twoTo32: NN64 = unsigned(widen(65536)) DOT unsigned(widen(65536)); one: NN64 = unsigned(widen(1)); n67: NN64 = unsigned(widen(67)); n68: NN64 = unsigned(widen(68)); five: NN64 = unsigned(widen(5))',
}
cases = [
 ('ZZ32', 'two^31'), ('ZZ32', 'two^30'), ('ZZ32', 'mtwo^31'), ('ZZ32', 'two^64'), ('ZZ32', 'three^40'),
 ('ZZ32', 'zero^0'), ('ZZ32', 'mone^2147483647'), ('ZZ32', 'two^(-1)'), ('ZZ32', 'two^(-70)'),
 ('ZZ32', 'n34 CHOOSE 17'), ('ZZ32', 'n33 CHOOSE 16'), ('ZZ32', 'three CHOOSE 5'), ('ZZ32', 'five CHOOSE (-1)'),
 ('ZZ32', 'mfive CHOOSE 2'), ('ZZ32', 'maxI CHOOSE 1'), ('ZZ32', 'maxI CHOOSE 2147483646'), ('ZZ32', 'maxI CHOOSE 2'),
 ('ZZ64', 'two^63'), ('ZZ64', 'two^62'), ('ZZ64', 'mtwo^63'), ('ZZ64', 'three^40'), ('ZZ64', 'two^64'), ('ZZ64', 'two^(-70)'),
 ('ZZ64', 'n66 CHOOSE 33'), ('ZZ64', 'n67 CHOOSE 33'), ('ZZ64', 'n68 CHOOSE 34'), ('ZZ64', 'three CHOOSE 5'), ('ZZ64', 'n62 CHOOSE 31'),
 ('NN32', 'twoTo31 LCM seven'), ('NN32', 'twoTo31 LCM two'), ('NN32', 'b16 LCM b16p'), ('NN32', 'maxU LCM one'), ('NN32', 'six LCM four'),
 ('NN32', 'twoTo31 CHOOSE one'), ('NN32', 'b16 CHOOSE two'), ('NN32', 'n92682 CHOOSE two'), ('NN32', 'n92683 CHOOSE two'), ('NN32', 'three CHOOSE five'),
 ('NN32', 'two^32'), ('NN32', 'two^31'), ('NN32', 'm65535^2'), ('NN32', 'b16^2'), ('NN32', 'twoTo31^1'), ('NN32', 'two^(-1)'),
 ('NN64', 'twoTo63 LCM three'), ('NN64', 'twoTo63 LCM two'), ('NN64', 'twoTo32 LCM (twoTo32 - one)'),
 ('NN64', 'n68 CHOOSE unsigned(widen(34))'), ('NN64', 'n67 CHOOSE unsigned(widen(33))'), ('NN64', 'three CHOOSE five'),
 ('NN64', 'two^64'), ('NN64', 'two^63'), ('NN64', 'three^40'), ('NN64', 'three^41'), ('NN64', 'two^(-1)'),
]
names = []
for i, (ty, e) in enumerate(cases):
    n = 'NatP%02d' % i
    names.append(n)
    with open(os.path.join(out, n + '.fss'), 'w') as f:
        f.write('component %s\nexport Executable\nrun() = do\n  %s\n  caseName = "%s %s = "\n' % (n, decl[ty].replace('; ', '\n  '), ty, e.replace('"', '')))
        f.write('  r: String = try\n      v = %s\n      v.asString\n    catch e\n      IntegerOverflow => "IntegerOverflow"\n    end\n  println(caseName || r)\nend\nend\n' % e)
with open(os.path.join(out, 'list.txt'), 'w') as f:
    f.write('\n'.join(names) + '\n')
