#!/bin/bash
# natives-binding-probe.sh rewrite|setup|distance <scratch-dir>
#
# PLAN item 35's two unmeasured halves (natives-binding-probe.md, beside this script), rebuilt
# from the tracked sources at every run. Nothing tracked changes: the sources, shadows, programs,
# caches and captures all go under <scratch-dir> (give one under the tree's tmp/). Run it in a
# built tree whose default_repository/caches hold the library order's jars; it builds nothing.
#
#   rewrite   way 1's compiled half: the class BuiltinPrimitiveRewriter (below) and two hooks in
#             a copy of compiler/Parser.java, compiled into <scratch>/shadow-rewrite; three probe
#             programs compiled in the compiler's world with that shadow first on the class path
#             and -Dfortress.builtinPrimitive.rewrite=true, then run, each with fresh private
#             caches. About two minutes. Writes <scratch>/rewrite.out.
#   setup     way 2's checker half, the copy only: <scratch>/home, a FORTRESS_HOME whose
#             Library/FortressLibrary.fss has ZZ32's twenty natives as import-java calls in
#             CompilerBuiltin.fss's form (every line number kept: the two import blocks go on the
#             blank lines 23 and 24) and whose ProjectFortress/build holds NamingCzar with
#             natives-shape's stand-in foreign-type table (gap 1's patch, read from 4a46fb83a);
#             LibraryBuiltin/ is copied, src/, third_party/, test_library/, astgen/ and bin/ are
#             links to this tree.
#   distance  setup, then the gate's distance stage (coordinator/tools/distance/run.sh, setting
#             any, its scratch and caches under <scratch>) on that home, its per-site list against
#             the landed explorations/compile-ladder/gate/distance-sites.tsv, and a control: one
#             fitting and one misfitting import-java binding checked in walk's world through the
#             same table. 25 to 30 minutes: start it detached and poll <scratch>/distance.out.
set -u
MODE=${1:-}; S=${2:-}
case "$MODE" in rewrite|setup|distance) ;; *) echo "usage: $0 rewrite|setup|distance <scratch-dir>" >&2; exit 1 ;; esac
[ -n "$S" ] || { echo "usage: $0 rewrite|setup|distance <scratch-dir>" >&2; exit 1; }
mkdir -p "$S" && S=$(cd "$S" && pwd) || exit 1
cd "$(dirname "$0")/../../.." || exit 1
T=$PWD
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=1 TMPDIR=$S/tmp
mkdir -p "$S/tmp" "$S/prog"
P=com/sun/fortress/compiler

rewrite () {
    export FORTRESS_HOME=$T
    rm -rf "${S:?}/rewrite-src" "${S:?}/shadow-rewrite"; mkdir -p "$S/rewrite-src/$P" "$S/shadow-rewrite"
    cat > "$S/rewrite-src/$P/BuiltinPrimitiveRewriter.java" <<'JAVA'
/*******************************************************************************
 Probe (item 35, way 1's compiled half): a body that is exactly
 builtinPrimitive("pkg.Class.method"), the string naming a public static Java
 method, becomes a call of that method through the import java machinery: the
 component gains `import java pkg.{Class.method => alias}` and the body becomes
 alias(args), self first for a method (then the other parameters in order, as
 walk's NativeMeth passes them).  A string that names no static method (walk's
 glue classes, "pkg.Class$Op") is left alone.  Applied to the parse of a
 component (Parser.parseFileConvertExn) and to the import collector's view of
 it (Parser.importCollector), so the foreign api is known when the repository
 builds its graph, before every phase.
 ******************************************************************************/

package com.sun.fortress.compiler;

import com.sun.fortress.nodes.*;
import com.sun.fortress.nodes_util.ExprFactory;
import com.sun.fortress.nodes_util.NodeFactory;
import com.sun.fortress.nodes_util.NodeUtil;
import com.sun.fortress.nodes_util.Span;
import edu.rice.cs.plt.tuple.Option;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.*;

public final class BuiltinPrimitiveRewriter {
    private BuiltinPrimitiveRewriter() {}

    public static boolean enabled() { return Boolean.getBoolean("fortress.builtinPrimitive.rewrite"); }

    /** pkg -> (Class.method -> alias), in order of first use */
    private static final class Aliases extends LinkedHashMap<String, LinkedHashMap<String, String>> {}

    public static CompilationUnit rewrite(CompilationUnit cu) {
        if (!enabled() || !(cu instanceof Component)) return cu;
        Component c = (Component) cu;
        Aliases aliases = new Aliases();
        List<Decl> decls = new ArrayList<Decl>();
        for (Decl d : c.getDecls()) decls.add(decl(d, false, aliases));
        if (aliases.isEmpty()) return cu;
        List<Import> imports = new ArrayList<Import>(c.getImports());
        Span span = NodeUtil.getSpan(c);
        for (Map.Entry<String, LinkedHashMap<String, String>> e : aliases.entrySet()) {
            List<AliasedSimpleName> names = new ArrayList<AliasedSimpleName>();
            for (Map.Entry<String, String> n : e.getValue().entrySet())
                names.add(NodeFactory.makeAliasedSimpleName(span, NodeFactory.makeId(span, n.getKey()),
                          Option.<IdOrOpOrAnonymousName>some(NodeFactory.makeId(span, n.getValue()))));
            imports.add(NodeFactory.makeImportNames(span, Option.some("java"),
                                                    NodeFactory.makeAPIName(span, e.getKey()), names));
        }
        return new Component(c.getInfo(), c.getName(), imports, decls, c.getComprises(), c.is_native(), c.getExports());
    }

    private static Decl decl(Decl d, boolean inType, Aliases aliases) {
        if (d instanceof FnDecl) return fn((FnDecl) d, inType, aliases);
        if (d instanceof TraitDecl) {
            TraitDecl t = (TraitDecl) d;
            return new TraitDecl(t.getInfo(), header(t.getHeader(), aliases), t.getSelfType(),
                                 t.getExcludesClause(), t.getComprisesClause(), t.isComprisesEllipses());
        }
        if (d instanceof ObjectDecl) {
            ObjectDecl o = (ObjectDecl) d;
            return new ObjectDecl(o.getInfo(), header(o.getHeader(), aliases), o.getSelfType());
        }
        return d;
    }

    private static TraitTypeHeader header(TraitTypeHeader h, Aliases aliases) {
        List<Decl> ds = new ArrayList<Decl>();
        for (Decl d : h.getDecls()) ds.add(decl(d, true, aliases));
        return new TraitTypeHeader(h.getStaticParams(), h.getMods(), h.getName(), h.getWhereClause(),
                                   h.getThrowsClause(), h.getContract(), h.getExtendsClause(), h.getParams(), ds);
    }

    private static FnDecl fn(FnDecl f, boolean inType, Aliases aliases) {
        if (f.getBody().isNone() || !(f.getBody().unwrap() instanceof Juxt)) return f;
        Juxt body = (Juxt) f.getBody().unwrap();
        List<Expr> es = body.getExprs();
        if (!body.isTight() || es.size() != 2 || !(es.get(0) instanceof VarRef) || !(es.get(1) instanceof StringLiteralExpr))
            return f;
        if (!((VarRef) es.get(0)).getVarId().getText().equals("builtinPrimitive")) return f;
        String s = ((StringLiteralExpr) es.get(1)).getText();
        int m = s.lastIndexOf('.'), k = m < 0 ? -1 : s.lastIndexOf('.', m - 1);
        if (k < 0 || !namesStaticMethod(s.substring(0, m), s.substring(m + 1))) return f;
        String pkg = s.substring(0, k), item = s.substring(k + 1);   // item = Class.method
        LinkedHashMap<String, String> inPkg = aliases.get(pkg);
        if (inPkg == null) aliases.put(pkg, inPkg = new LinkedHashMap<String, String>());
        String alias = inPkg.get(item);
        if (alias == null) inPkg.put(item, alias = "builtinPrimitive_" + item.replace('.', '_'));

        Span span = NodeUtil.getSpan(body);
        List<Expr> args = new ArrayList<Expr>();
        boolean hasSelf = false;
        for (Param p : NodeUtil.getParams(f)) {
            if (p.getVarargsType().isSome()) return f;
            if (p.getName().getText().equals("self")) hasSelf = true;
            else args.add(ExprFactory.makeVarRef(span, p.getName().getText()));
        }
        if (inType || hasSelf) args.add(0, ExprFactory.makeVarRef(span, "self"));
        Expr arg = args.isEmpty() ? ExprFactory.makeVoidLiteralExpr(span)
                 : args.size() == 1 ? ExprFactory.makeInParentheses(args.get(0))
                 : ExprFactory.makeTupleExpr(span, args);
        Expr call = ExprFactory.makeTightJuxt(body, Arrays.asList(ExprFactory.makeVarRef(span, alias), arg));
        return new FnDecl(f.getInfo(), f.getHeader(), f.getUnambiguousName(), Option.some(call),
                          f.getImplementsUnambiguousName());
    }

    private static boolean namesStaticMethod(String cls, String method) {
        try {
            for (Method x : Class.forName(cls, false, BuiltinPrimitiveRewriter.class.getClassLoader()).getMethods())
                if (x.getName().equals(method) && Modifier.isStatic(x.getModifiers())) return true;
        } catch (ClassNotFoundException e) { } catch (LinkageError e) { }
        return false;
    }
}
JAVA
    cp "$T/ProjectFortress/src/$P/Parser.java" "$S/rewrite-src/$P/Parser.java"
    python3 - "$S/rewrite-src/$P/Parser.java" <<'PY' || return 1
import sys
p = sys.argv[1]; s = open(p).read()
edits = [("""    public static CompilationUnit importCollector(File file) {
        try {""", """    public static CompilationUnit importCollector(File file) {
        if (BuiltinPrimitiveRewriter.enabled() && file.getName().endsWith(ProjectProperties.COMP_SOURCE_SUFFIX))
            return parseFileConvertExn(file);   // the whole component, its builtinPrimitive bodies rewritten
        try {"""),
         ("""            return parseCU(Useful.utf8BufferedFileReader(file), filename,
                           preParser(Useful.utf8BufferedFileReader(file), filename));""",
          """            return BuiltinPrimitiveRewriter.rewrite(parseCU(Useful.utf8BufferedFileReader(file), filename,
                           preParser(Useful.utf8BufferedFileReader(file), filename)));""")]
for a, b in edits:
    assert s.count(a) == 1, "Parser.java no longer matches the hook: " + a.splitlines()[0]
    s = s.replace(a, b)
open(p, "w").write(s)
PY
    local CP; CP=$(FORTRESS_CACHES=$T/default_repository/caches bin/fortress_classpath | tail -1)
    javac -nowarn -encoding UTF-8 -cp "$CP" -d "$S/shadow-rewrite" "$S/rewrite-src/$P/BuiltinPrimitiveRewriter.java" \
          "$S/rewrite-src/$P/Parser.java" 2>&1 | grep -v '^Note:'
    [ -f "$S/shadow-rewrite/$P/BuiltinPrimitiveRewriter.class" ] || { echo "rewrite: the shadow did not compile" >&2; return 1; }
    cat > "$S/prog/NativesBindingBP.fss" <<'FSS'
(* Item 35, way 1's compiled half: bodies that are exactly builtinPrimitive("pkg.Class.method"),
   each string naming an existing static helper of nativeHelpers/, in the compiler's own world.
   One declaration per shape: a top-level function, a trait's functional method, an object's
   dotted method, a helper that raises IntegerOverflow, and a helper with two overloads of one
   name.  Compiled with the rewrite shadow first on the class path. *)

component NativesBindingBP
export Executable

(* 1. a top-level function: simpleIntArith.intLT(int,int):boolean *)
less(a:ZZ32, b:ZZ32):Boolean = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intLT")

(* 2. a trait's functional method: equality.sEquiv(Any,Any):boolean *)
trait Shape
  same(self, other:Shape):Boolean = builtinPrimitive("com.sun.fortress.nativeHelpers.equality.sEquiv")
end

(* 3. an object's dotted method, self first: stringOps.typeName(Any):String *)
object Box(v:ZZ32) extends Shape
  kind():JavaString = builtinPrimitive("com.sun.fortress.nativeHelpers.stringOps.typeName")
end

(* 4. a helper that raises IntegerOverflow: simpleIntArith.intOverflowingAdd(int,int):int *)
add(a:ZZ32, b:ZZ32):ZZ32 = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingAdd")

(* 5. two overloads of one helper name: simplePrintln.nativePrintln(String) and (int) *)
show(s:JavaString):() = builtinPrimitive("com.sun.fortress.nativeHelpers.simplePrintln.nativePrintln")
show(n:ZZ32):() = builtinPrimitive("com.sun.fortress.nativeHelpers.simplePrintln.nativePrintln")

run():() = do
  println(less(1, 2))
  println(less(3, 2))
  b = Box(3)
  c = Box(4)
  println(same(b, b))
  println(same(b, c))
  println(b.kind())
  println(add(2, 3))
  try
    println(add(2147483647, 1))
  catch e
    IntegerOverflow => println("IntegerOverflow caught")
  end
  show("seven".asJavaString)
  show(7)
end

end
FSS
    cat > "$S/prog/NativesBindingBPMisfit.fss" <<'FSS'
(* Item 35, way 1's compiled half: two builtinPrimitive strings whose helper does not fit the
   declaration.  Under the rewrite the checker reads the call each becomes. *)

component NativesBindingBPMisfit
export Executable

(* the helper returns int (ZZ32); the declaration says Boolean *)
wrongType(a:ZZ32, b:ZZ32):Boolean = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingAdd")

(* the helper takes two ints; the declaration has one parameter *)
wrongArity(a:ZZ32):ZZ32 = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingAdd")

run():() = println(wrongArity(1))

end
FSS
    cat > "$S/prog/NativesBindingBPTypo.fss" <<'FSS'
(* Item 35, way 1's compiled half: a misspelled helper name.  The rewrite leaves a string that
   names no static method alone, as it leaves walk's glue strings; the compiler's world does not
   declare builtinPrimitive. *)

component NativesBindingBPTypo
export Executable

typo(a:ZZ32, b:ZZ32):ZZ32 = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingAddd")

run():() = println(typo(1, 2))

end
FSS
    : > "$S/rewrite.out"
    local p
    for p in NativesBindingBP NativesBindingBPMisfit NativesBindingBPTypo ; do
        rm -rf "${S:?}/caches-$p"; cp -a "$T/default_repository/caches" "$S/caches-$p"
        CP=$(FORTRESS_CACHES=$S/caches-$p bin/fortress_classpath | tail -1)
        {
            echo "\$ fortress compile $p.fss   (rewrite shadow first, -Dfortress.builtinPrimitive.rewrite=true)"
            ( cd "$S/prog" && java -Xmx2g -Xss64m -Djava.io.tmpdir="$S/tmp" -Dfile.encoding=UTF-8 \
                  -Dfortress.caches="$S/caches-$p" -Dfortress.builtinPrimitive.rewrite=true \
                  -cp "$S/shadow-rewrite:$CP" com.sun.fortress.Shell compile $p.fss )
            echo "### compile rc=$?"
            if [ -s "$S/caches-$p/bytecode_cache/$p.jar" ] ; then
                echo "\$ fortress run $p"
                ( cd "$S/prog" && FORTRESS_CACHES="$S/caches-$p" "$T/bin/fortress" run $p )
                echo "### run rc=$?"
            fi
        } >> "$S/rewrite.out" 2>&1
        rm -rf "${S:?}/caches-$p"
    done
    cat "$S/rewrite.out"
}

setup () {
    export FORTRESS_HOME=$T
    rm -rf "${S:?}/table-src" "${S:?}/shadow-table" "${S:?}/home"
    mkdir -p "$S/table-src/ProjectFortress/src/$P" "$S/shadow-table"
    git show 4a46fb83a:explorations/perf-probes/prelude/natives-shape/patches/gap1-namingczar-table.patch \
        > "$S/gap1-namingczar-table.patch" || return 1
    cp "ProjectFortress/src/$P/NamingCzar.java" "$S/table-src/ProjectFortress/src/$P/"
    ( cd "$S/table-src" && patch -s -p1 < "$S/gap1-namingczar-table.patch" ) || { echo "setup: gap 1's patch no longer applies" >&2; return 1; }
    local CP; CP=$(FORTRESS_CACHES=$T/default_repository/caches bin/fortress_classpath | tail -1)
    javac -nowarn -encoding UTF-8 -cp "$CP" -d "$S/shadow-table" "$S/table-src/ProjectFortress/src/$P/NamingCzar.java" 2>&1 | grep -v '^Note:'
    [ -f "$S/shadow-table/$P/NamingCzar.class" ] || { echo "setup: the stand-in table did not compile" >&2; return 1; }
    local H=$S/home
    mkdir -p "$H/ProjectFortress" "$H/default_repository" "$H/explorations/coordinator/tools"
    cp -a Library "$H/Library"
    python3 - Library/FortressLibrary.fss "$H/Library/FortressLibrary.fss" > "$S/converted.tsv" <<'PY' || return 1
# ZZ32's natives as import-java calls, every line number kept: the imports go on lines 23 and 24
import re, sys
src, dst = sys.argv[1], sys.argv[2]
L = open(src, encoding="utf-8").read().split("\n")
# glue class -> (helper class, helper method, alias)
M = {
 "Int$Eq": ("simpleIntArith", "intEQ", "jIntEQ"),
 "Int$Less": ("simpleIntArith", "intLT", "jIntLT"),
 "Int$Negate": ("simpleIntArith", "intOverflowingNeg", "jIntOverflowingNeg"),
 "Int$WrappingNegate": ("simpleIntArith", "intWrappingNeg", "jIntWrappingNeg"),
 "Int$Add": ("simpleIntArith", "intOverflowingAdd", "jIntOverflowingAdd"),
 "Int$WrappingAdd": ("simpleIntArith", "intWrappingAdd", "jIntWrappingAdd"),
 "Int$Sub": ("simpleIntArith", "intOverflowingSub", "jIntOverflowingSub"),
 "Int$WrappingSub": ("simpleIntArith", "intWrappingSub", "jIntWrappingSub"),
 "Int$Mul": ("simpleIntArith", "intOverflowingMul", "jIntOverflowingMul"),
 "Int$WrappingMul": ("simpleIntArith", "intWrappingMul", "jIntWrappingMul"),
 "Int$Div": ("simpleIntArith", "intOverflowingDiv", "jIntOverflowingDiv"),
 "Int$Choose": ("simpleIntArith", "intOverflowingChoose", "jIntOverflowingChoose"),
 "Int$BitAnd": ("simpleIntArith", "intBitAnd", "jIntBitAnd"),
 "Int$BitOr": ("simpleIntArith", "intBitOr", "jIntBitOr"),
 "Int$BitXor": ("simpleIntArith", "intBitXor", "jIntBitXor"),
 "Int$BitNot": ("simpleIntArith", "intBitNot", "jIntBitNot"),
 "Int$ToLong": ("simpleLongArith", "intToLong", "jIntToLong"),
 "ZZ32$ToNN32": ("simpleUnsignedIntArith", "makeNN32FromZZ32WithSpecialCompilerHackForNN32ResultType", "jMakeNN32FromZZ32"),
}
start = next(i for i, l in enumerate(L) if l.startswith("trait ZZ32 extends"))
end = next(i for i in range(start, len(L)) if L[i] == "end")
used, log = {}, []
for i in range(start, end):
    m = re.match(r'^(\s*)builtinPrimitive\("com\.sun\.fortress\.interpreter\.glue\.prim\.([A-Za-z0-9]+\$[A-Za-z0-9]+)"\)\s*$', L[i])
    if not m or m.group(2) not in M: continue
    head = L[i - 1]
    params = re.search(r'\(([^)]*)\)\s*:', head).group(1)
    names = [p.split(":")[0].strip() for p in params.split(",") if p.strip()]
    if any(":" in p and not re.search(r':\s*ZZ32\s*$', p) for p in params.split(",")): continue
    cls, meth, alias = M[m.group(2)]
    used[alias] = (cls, meth)
    L[i] = "%s%s(%s)" % (m.group(1), alias, ", ".join(names))
    log.append("%d\t%s\t%s\t%s.%s" % (i + 1, head.strip(), L[i].strip(), cls, meth))
assert L[22] == "" and L[23] == "" and L[24].startswith("export FortressLibrary"), (L[22:25])
by = {}
for a, (c, me) in used.items(): by.setdefault(c == "simpleIntArith", []).append("%s.%s => %s" % (c, me, a))
L[22] = "import java com.sun.fortress.nativeHelpers.{" + ", ".join(by[True]) + "}"
L[23] = "import java com.sun.fortress.nativeHelpers.{" + ", ".join(by[False]) + "}"
open(dst, "w", encoding="utf-8").write("\n".join(L))
print("\n".join(log)); print("# %d bindings converted, %d aliases" % (len(log), len(used)))
PY
    cat "$S/converted.tsv"
    cp -a ProjectFortress/LibraryBuiltin "$H/ProjectFortress/LibraryBuiltin"
    cp -a ProjectFortress/build "$H/ProjectFortress/build"
    cp "$S/shadow-table/$P/"NamingCzar*.class "$H/ProjectFortress/build/$P/"
    local d
    for d in src third_party test_library astgen ; do ln -s "$T/ProjectFortress/$d" "$H/ProjectFortress/$d" ; done
    ln -s "$T/bin" "$H/bin"
    cp default_repository/configuration "$H/default_repository/"
    ln -s "$T/explorations/coordinator/tools/distance" "$H/explorations/coordinator/tools/distance"
}

distance () {
    setup || return 1
    local H=$S/home
    export FORTRESS_HOME=$H FORTRESS_AUTOHOME=$H
    ( cd "$H" && "$H/explorations/coordinator/tools/distance/run.sh" "$S/distance-table.txt" "$S/distance-scratch" any ) > "$S/distance.out" 2>&1
    {
        echo "# the per-site list against the landed one ($T/explorations/compile-ladder/gate/distance-sites.tsv)"
        python3 - "$T/explorations/compile-ladder/gate/distance-sites.tsv" "$S/distance-scratch/errors.tsv" <<'PY'
import collections, sys
def ops(s):          # the top-level operands of a union's argument list, brackets nested
    out, d, cur = [], 0, ""
    for ch in s:
        if ch in "([": d += 1
        if ch in ")]": d -= 1
        if ch == "," and d == 0: out.append(cur); cur = ""
        else: cur += ch
    return out + [cur]
def norm(m):         # OR(A,B) and OR(B,A) are one join; the checker prints its operands in either order
    i = m.find("OR(")
    if i < 0: return m
    j, d = i + 3, 1
    while d: d += {"(": 1, ")": -1}.get(m[j], 0); j += 1
    return m[:i] + "OR(" + ",".join(sorted(norm(o) for o in ops(m[i + 3:j - 1]))) + ")" + norm(m[j:])
def load(p):
    rows = [l.rstrip("\n").split("\t") for l in open(p, encoding="utf-8") if l.strip() and not l.startswith("#")]
    return rows, collections.Counter((r[0], r[5], r[6]) for r in rows), collections.Counter((r[0], r[5], norm(r[6])) for r in rows)
(la, ea, na), (lb, eb, nb) = load(sys.argv[1]), load(sys.argv[2])
print("landed %d sites, converted %d; the same kind, location and message: %d; the same with a join's operands in either order: %d"
      % (len(la), len(lb), sum((ea & eb).values()), sum((na & nb).values())))
for r in sorted(na - nb): print("only landed\t" + "\t".join(r))
for r in sorted(nb - na): print("only converted\t" + "\t".join(r))
for r in sorted(ea - eb):
    if (r[0], r[1], norm(r[2])) in nb: print("operands' order only\t" + "\t".join(r))
PY
        echo "# the control: walk's world, the stand-in table, one fitting and one misfitting binding"
        cat > "$S/prog/NativesBindingWorld.fss" <<'FSS'
(* Way 2's checker half, the control: in walk's world (the one library), through the stand-in
   foreign-type table, the checker reads an import-java call as it reads any call.  One binding
   fits its helper; one does not (intOverflowingAdd returns int, the declaration says Boolean). *)

component NativesBindingWorld
import java com.sun.fortress.nativeHelpers.{simpleIntArith.intLT => jIntLT, simpleIntArith.intOverflowingAdd => jAdd}
export Executable

fits(a:ZZ32, b:ZZ32):Boolean = jIntLT(a, b)
misfits(a:ZZ32, b:ZZ32):Boolean = jAdd(a, b)

run():() = println(fits(1, 2))

end
FSS
        local CP; CP=$("$H/bin/fortress_classpath" | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
        rm -rf "${S:?}/caches-world"; mkdir -p "$S/caches-world"
        ( cd "$H" && timeout 900 java -Xmx4g -Xss64m -Djava.io.tmpdir="$S/tmp" -Dfortress.caches="$S/caches-world" \
              -Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false \
              -cp "$S/distance-scratch/shadow-classes:$S/distance-scratch/classes:$CP" \
              DistanceMulti -order check -setting any "$S/prog/NativesBindingWorld.fss" ) 2>&1 | grep 'NativesBindingWorld' | grep -v '^@@SC STAGE.*errors=0'
        rm -rf "${S:?}/caches-world"
    } >> "$S/distance.out"
    cat "$S/distance.out"
}

case "$MODE" in
  rewrite) rewrite ;;
  setup) setup ;;
  distance) distance ;;
esac
