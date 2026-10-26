# The text of climb batch 22c, the batch that closes phase 3, written by its planner as named edits applied by
# exact text; it stops before writing anything if an edit does not match once (coordinator/CLIMB-BATCH-22c.md, sections 3 and 4).
# Run from anywhere:
#     python3 -I edits22c.py <tree> [edit ...]        (no edit named: every edit but the measured variants)
# The edits, by rung, in the order of the planner's brief (the gather applies the rungs O, B, L, A, section 3);
# applied in this order they give text22c.patch, and each rung's alone gives its rung-<X>.patch:
#     A, row 816 (P-158):  count816 absMaybe absArray absReduction absRange absString
#     O, row 782 and 827:  opr782 hdrRange hdrBig hdrList
#     L, List's imports:   covcoll varparam stage14
#     B, the bound Any:    bound412 stageCompile
# Measured variants that the batch does not take (section 4): count816strict, the team's count with the header
# compared modifiers and all, in place of count816; oneshotApi, OneShot's api parameter written var, which the
# api's grammar refuses, in place of varparam. Never apply a variant beside the edit it replaces.
import sys, os
T = sys.argv[1]; WANT = sys.argv[2:]
FLI = 'Library/FortressLibrary.fsi'; FL = 'Library/FortressLibrary.fss'
EC = 'ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala'
E = {}
VARIANTS = ('count816strict', 'oneshotApi')
def ed(name, path, old, new):
    E.setdefault(name, []).append((path, old, new))

# ---------------------------------------------------------------- rung A: row 816's repair (P-158)
# The export check counts every member of an api trait or object again, as the team's equalListMembers did
# (5a68404fd); an api member written abstract is matched by a component member of the same name and header,
# with a body or without one (P-158), through the team's ignoreAbstract.
ed('count816', EC, '''  /* Returns true if members in traits and objects in an API have
   * corresponding members in the component.
   * From the spec (apis.tex, "Component and API Identity"):
   * "A matching definition of a declaration d is a definition d' with
   *  the same name as d that includes definitions for all declarations
   *  other than the methods or fields declared abstract in d."
   * So a member declared abstract in the API needs no corresponding member.
   */
  private def equalListMembers(inAPI: List[Decl], inComp: List[Decl],
                               original: String): (Boolean, String) =
    if ( inAPI.count(l => ! isAbstractMember(l)) > inComp.length )
      (false, "missing members of the trait/object in the component")
    else {
      var cause = original
      def handleOne(l: Decl) = {
        val eq = isAbstractMember(l) || inComp.exists(r => equalMember(l, r))
''', '''  /* Returns true if members in traits and objects in an API have
   * corresponding members in the component.
   * From the spec (apis.tex, "Component and API Identity"):
   * "A matching definition of a declaration d is a definition d' with
   *  the same name as d that includes definitions for all declarations
   *  other than the methods or fields declared abstract in d."
   * So every member of the API's trait or object is declared in the
   * component's; one declared abstract in the API needs no body there, and
   * is matched by a member of the same header with a body or without one.
   */
  private def equalListMembers(inAPI: List[Decl], inComp: List[Decl],
                               original: String): (Boolean, String) =
    if ( inAPI.length > inComp.length )
      (false, "missing members of the trait/object in the component")
    else {
      var cause = original
      def handleOne(l: Decl) = {
        val eq = inComp.exists(r => equalMember(l, r) ||
                                    (isAbstractMember(l) && equalAbstractMember(l, r)))
''')
ed('count816', EC, '''  /* Returns true if two members in traits and objects are same. */
  private def equalMember(inAPI: Decl, inComp: Decl): Boolean =''', '''  /* Returns true if a member declared abstract in the API has the header of a
   * member of the component, the abstract modifier aside. */
  private def equalAbstractMember(inAPI: Decl, inComp: Decl): Boolean =
    (inAPI, inComp) match {
      case (SFnDecl(_,headerL,_,_,_), SFnDecl(_,headerR,_,_,_)) =>
        equalFnHeaders(headerL, headerR, true)
      case _ => false
    }

  /* Returns true if two members in traits and objects are same. */
  private def equalMember(inAPI: Decl, inComp: Decl): Boolean =''')
# The measured variant: the team's count with its strict comparison of modifiers (no ignoreAbstract).
ed('count816strict', EC, '''    if ( inAPI.count(l => ! isAbstractMember(l)) > inComp.length )
      (false, "missing members of the trait/object in the component")
    else {
      var cause = original
      def handleOne(l: Decl) = {
        val eq = isAbstractMember(l) || inComp.exists(r => equalMember(l, r))
''', '''    if ( inAPI.length > inComp.length )
      (false, "missing members of the trait/object in the component")
    else {
      var cause = original
      def handleOne(l: Decl) = {
        val eq = inComp.exists(r => equalMember(l, r))
''')
# The 12 members that the api writes abstract and the component's traits did not declare, each without a body,
# at the api's header, in the form of the neighbouring bodyless members and of the compiler prelude
# (Library/CompilerLibrary.fss, GeneratorZZ32).
ed('absMaybe', FL, '''value trait AnyMaybe extends { AnyUniqueItem } excludes Number
        (** \\vspace{-4ex} NOT YET: %comprises Maybe[\\T\\] where [\\T\\]% *)
    opr =(self, other:AnyMaybe): Boolean = self SEQV other
''', '''value trait AnyMaybe extends { AnyUniqueItem } excludes Number
        (** \\vspace{-4ex} NOT YET: %comprises Maybe[\\T\\] where [\\T\\]% *)
    getter holds() : Boolean
    opr =(self, other:AnyMaybe): Boolean = self SEQV other
''')
ed('absArray', FL, '''    (** Indexed functionality with more specific type information **)
    opr[r:Range[\\I\\]] : ReadableArray[\\E,I\\]
    ivmap[\\R\\](f:(I,E)->R): ReadableArray[\\R, I\\]
''', '''    (** Indexed functionality with more specific type information **)
    opr[r:Range[\\I\\]] : ReadableArray[\\E,I\\]
    opr[_:TrivialOpenRange] : ReadableArray[\\E,I\\]
    ivmap[\\R\\](f:(I,E)->R): ReadableArray[\\R, I\\]
''')
ed('absReduction', FL, '''trait ActualReduction[\\R,L\\] extends Reduction[\\L\\]
    lift(r: R): L
''', '''trait ActualReduction[\\R,L\\] extends Reduction[\\L\\]
    empty(): L
    join(a: L, b: L): L
    lift(r: R): L
''')
ed('absRange', FL, '''    getter extent(): Maybe[\\I\\]
    getter isLeftBounded(): Boolean = self.left.holds
''', '''    getter extent(): Maybe[\\I\\]
    getter isEmpty(): Boolean
    getter isLeftBounded(): Boolean = self.left.holds
''')
ed('absString', FL, '''        self.indices.map[\\Char\\](fn (i:ZZ32):Char => self[i])
    getter asFlatString(): String

    opr |self| : ZZ32 = self.size
''', '''        self.indices.map[\\Char\\](fn (i:ZZ32):Char => self[i])
    getter depth() : ZZ32
    getter asFlatString(): String
    getter isBalanced(): Boolean

    opr |self| : ZZ32 = self.size

    verify() : ()
''')
ed('absString', FL, '''    uncheckedSubstring(r0: Range[\\ZZ32\\]) : String
    allButLast(): String = self[0#(|self| - 1)]
    allButFirst(): String = self[1:]
''', '''    uncheckedSubstring(r0: Range[\\ZZ32\\]) : String
    allButLast(): String = self[0#(|self| - 1)]
    allButFirst(): String = self[1:]

    rangeContains(r: Range[\\ZZ32\\], c: Char) : Boolean
    splitWithOffsets(): ZeroIndexed[\\(ZZ32, String)\\]
    split(): Generator[\\String\\]
    balanced(): String
''')

# ---------------------------------------------------------------- rung O: rows 782 and 827
# The export check reads every top-level operator by the rules it applies to any function (P-155 read to cover
# the export check), and reads each function under its name only, not under the unambiguous name made from its
# span, under which IndexBuilder.buildFunction also files it (the double key of row 782).
ed('opr782', EC, '''      for ( f <- toSet(fnsInAPI.firstSet) ;
            if overloadingChecker.isDeclaredName(f) ) {''', '''      for ( f <- toSet(fnsInAPI.firstSet) ;
            if overloadingChecker.isCheckedName(f) && isDeclarationName(fnsInAPI, f) ) {''')
ed('opr782', EC, '''  /* Returns true if two names of declarations are same. */''', '''  /* Returns true if f is the name of a function declared in fns, and not the
   * unambiguous name made from a declaration's span, under which the index
   * also files each function (IndexBuilder.buildFunction).
   */
  private def isDeclarationName(fns: Relation[IdOrOpOrAnonymousName, JavaFunction],
                                f: IdOrOpOrAnonymousName): Boolean =
    toSet(fns.matchFirst(f)).exists {
      case SDeclaredFunction(fd) => NodeUtil.getName(fd).equals(f)
      case _ => false
    }

  /* Returns true if two names of declarations are same. */''')
# The 9 headers (row 827), by the library's rule (the fortress-repo skill's library.md, "Designing a change"):
# the component's # and : take the api's types, which the api cannot name otherwise (RangeInternals' types);
# the api's BIG || and BIG ||| take the component's generic header; List's api takes its component's
# comprehension type, importing AnyCovColl as IntMap's and PrefixSet's apis do.
ed('hdrRange', FL, '''opr #(lo:ZZ32, ex:ZZ32): CompactFullParScalarRange = sized1Range(lo,ex)
opr #(lo:(ZZ32,ZZ32), ex:(ZZ32,ZZ32)): CompactFullRange2D =
''', '''opr #(lo:ZZ32, ex:ZZ32): CompactFullRange[\\ZZ32\\] = sized1Range(lo,ex)
opr #(lo:(ZZ32,ZZ32), ex:(ZZ32,ZZ32)): CompactFullRange[\\(ZZ32,ZZ32)\\] =
''')
ed('hdrRange', FL, '''opr #(lo:(ZZ32,ZZ32,ZZ32), ex:(ZZ32,ZZ32,ZZ32)): CompactFullRange3D =
''', '''opr #(lo:(ZZ32,ZZ32,ZZ32), ex:(ZZ32,ZZ32,ZZ32)): CompactFullRange[\\(ZZ32,ZZ32,ZZ32)\\] =
''')
ed('hdrRange', FL, '''opr :(lo:ZZ32, hi:ZZ32): CompactFullParScalarRange =
        bounded1Range(lo,hi)
opr :(lo:(ZZ32,ZZ32), hi:(ZZ32,ZZ32)): CompactFullRange2D =
''', '''opr :(lo:ZZ32, hi:ZZ32): CompactFullRange[\\ZZ32\\] =
        bounded1Range(lo,hi)
opr :(lo:(ZZ32,ZZ32), hi:(ZZ32,ZZ32)): CompactFullRange[\\(ZZ32,ZZ32)\\] =
''')
ed('hdrRange', FL, '''opr :(lo:(ZZ32,ZZ32,ZZ32), hi:(ZZ32,ZZ32,ZZ32)): CompactFullRange3D = do
''', '''opr :(lo:(ZZ32,ZZ32,ZZ32), hi:(ZZ32,ZZ32,ZZ32)): CompactFullRange[\\(ZZ32,ZZ32,ZZ32)\\] = do
''')
ed('hdrBig', FLI, '''opr BIG ||(g: Generator[\\Any\\]): String
''', '''opr BIG ||[\\T\\](g: Generator[\\T\\]): String
''')
ed('hdrBig', FLI, '''opr BIG |||(g: Generator[\\Any\\]): String
''', '''opr BIG |||[\\T\\](g: Generator[\\T\\]): String
''')
ed('hdrList', 'Library/List.fsi', '''api List

''', '''api List

import CovariantCollection.{AnyCovColl}

''')
ed('hdrList', 'Library/List.fsi', '''opr BIG <|[\\T\\]|>:Comprehension[\\T,List[\\T\\],List[\\T\\],List[\\T\\]\\]
''', '''opr BIG <|[\\T\\]|>:Comprehension[\\T,List[\\T\\],AnyCovColl,AnyCovColl\\]
''')

# ---------------------------------------------------------------- rung L: List's two imports
CCI = 'Library/CovariantCollection.fsi'; CC = 'Library/CovariantCollection.fss'
# The api states the component's members and headers: AnyCovColl's dirtyIAF, the two marker traits Empty and
# Singleton extend, and the size every collection answers, now declared on the trait.
ed('covcoll', CCI, '''trait AnyCovColl
end

trait CovariantCollection[\\T\\] extends AnyCovColl
        comprises { Empty[\\T\\], NonEmpty[\\T\\] }
    toImmutableArray(): ImmutableArray[\\T, ZZ32\\]
''', '''trait AnyCovColl
    abstract dirtyIAF[\\R\\](a:ImmutableArray[\\R,ZZ32\\], i:ZZ32): ()
end

trait CovariantCollection[\\T\\] extends AnyCovColl
        comprises { Empty[\\T\\], NonEmpty[\\T\\] }
    abstract opr | self |: ZZ32
    toImmutableArray(): ImmutableArray[\\T, ZZ32\\]
''')
ed('covcoll', CCI, '''object Empty[\\T\\] extends CovariantCollection[\\T\\]
''', '''trait AnyEmpty extends AnyCovColl end

object Empty[\\T\\] extends { AnyEmpty, CovariantCollection[\\T\\] }
''')
ed('covcoll', CCI, '''object Singleton[\\T\\](x: T) extends NonEmpty[\\T\\]
''', '''trait AnySingleton extends AnyCovColl
    abstract getter x(): Any
end

object Singleton[\\T\\](x: T) extends { AnySingleton, NonEmpty[\\T\\] }
''')
# upward: the first argument carries the target type, so that R is fixed by the call (the every-instance
# Return Type Rule); the NonEmpty arm answers NonEmpty, the type its two narrower arms share; one more arm takes
# any collection, as the team's NonEmpty arm takes any NonEmpty, and casts it, the library's device (F-264), so
# that a collection no arm takes, as one at walk's open type, ends in CastError as before.
ed('covcoll', CC, '''private upward[\\R, I extends R, T extends R\\]
      (_: Empty[\\I\\], s: Empty[\\T\\]): Empty[\\R\\] = Empty[\\R\\]
private upward[\\R, I extends R, T extends R\\]
      (_: Empty[\\I\\], s: NonEmpty[\\T\\]): Singleton[\\R\\] =
    fail("upward: NonEmpty but not Singleton/Append")
private upward[\\R, I extends R, T extends R\\]
      (_: Empty[\\I\\], s: Singleton[\\T\\]): Singleton[\\R\\] =
    Singleton[\\R\\](s.x)
private upward[\\R, I extends R, T extends R, A extends T, B extends T\\]
      (_: Empty[\\I\\], c: Append[\\T,A,B\\]): Append[\\R,A,B\\] =
    Append[\\R,A,B\\](c.a, c.b)
''', '''private upward[\\R\\]
      (_: Empty[\\R\\], s: AnyCovColl): CovariantCollection[\\R\\] =
    cast[\\CovariantCollection[\\R\\]\\](s)
private upward[\\R, T extends R\\]
      (_: Empty[\\R\\], s: Empty[\\T\\]): Empty[\\R\\] = Empty[\\R\\]
private upward[\\R, T extends R\\]
      (_: Empty[\\R\\], s: NonEmpty[\\T\\]): NonEmpty[\\R\\] =
    fail[\\NonEmpty[\\R\\]\\]("upward: NonEmpty but not Singleton/Append")
private upward[\\R, T extends R\\]
      (_: Empty[\\R\\], s: Singleton[\\T\\]): Singleton[\\R\\] =
    Singleton[\\R\\](s.x)
private upward[\\R, T extends R, A extends T, B extends T\\]
      (_: Empty[\\R\\], c: Append[\\T,A,B\\]): Append[\\R,A,B\\] =
    Append[\\R,A,B\\](c.a, c.b)
''')
# iaf and aaf: one more arm each for a collection that is neither empty nor a singleton nor an Append, as upward's
ed('covcoll', CC, '''private iaf[\\R, T extends R, A extends T, B extends T\\]
           (a: ReadableArray[\\R,ZZ32\\], i:ZZ32, c: Append[\\T,A,B\\]): () = do
''', '''private iaf[\\R, T extends R\\]
           (a: ReadableArray[\\R,ZZ32\\], i:ZZ32, c: CovariantCollection[\\T\\]): () =
    fail[\\()\\]("initArrayFrom: NonEmpty but not Singleton/Append")
private iaf[\\R, T extends R, A extends T, B extends T\\]
           (a: ReadableArray[\\R,ZZ32\\], i:ZZ32, c: Append[\\T,A,B\\]): () = do
''')
ed('covcoll', CC, '''private aaf[\\R, T extends R, A extends T, B extends T\\]
           (a: Array[\\R,ZZ32\\], i:ZZ32, c: Append[\\T,A,B\\]): () = do
''', '''private aaf[\\R, T extends R\\]
           (a: Array[\\R,ZZ32\\], i:ZZ32, c: CovariantCollection[\\T\\]): () =
    fail[\\()\\]("assignArrayFrom: NonEmpty but not Singleton/Append")
private aaf[\\R, T extends R, A extends T, B extends T\\]
           (a: Array[\\R,ZZ32\\], i:ZZ32, c: Append[\\T,A,B\\]): () = do
''')
# the size on the trait, which its three objects define
ed('covcoll', CC, '''        comprises { Empty[\\T\\], NonEmpty[\\T\\] }
    toImmutableArray(): ImmutableArray[\\T,ZZ32\\] = do
''', '''        comprises { Empty[\\T\\], NonEmpty[\\T\\] }
    opr |self|: ZZ32
    toImmutableArray(): ImmutableArray[\\T,ZZ32\\] = do
''')
# Singleton's dirty initialisation: its element is an R by the caller's word, which the cast states
ed('covcoll', CC, '''    dirtyIAF[\\R\\](a:ImmutableArray[\\R,ZZ32\\], i:ZZ32): () = a.init(i,x)
''', '''    dirtyIAF[\\R\\](a:ImmutableArray[\\R,ZZ32\\], i:ZZ32): () = a.init(i,cast[\\R\\](x))
''')
# Append's size field with its type written, which the checker asks of a field (Thunker)
ed('covcoll', CC, '''    sz = |a| + |b|
''', '''    sz: ZZ32 = |a| + |b|
''')
# OneShot's constructor parameter: the export check compares an object's value parameter, a field, by its
# modifiers other than var, as it compares a field (F-282): an api cannot write var there (the api grammar's
# ApiFldMod, Specification/basic/components/apis.tex; SyntaxChecker.forObjectDecl), and "the var modifier
# without settable only affects implementations" (traits.tex, "Abstract Field Declarations").
ed('varparam', EC, '''  /* Returns true if two parameters are same. */
  private def equalParams(left: Param, right: Param): Boolean =
    (left, right) match {
      case (SParam(_, nameL, modsL, typeL, initL, varargsL),
            SParam(_, nameR, modsR, typeR, initR, varargsR)) =>
        modsL.equals(modsR) &&''', '''  /* Returns true if two parameters are same.
   * The var modifier is not compared: an object's value parameter is one of
   * its fields, and an API cannot write var on it (apis.tex, ApiFldMod), as
   * equalLValue does not compare it on a field.
   */
  private def equalParams(left: Param, right: Param): Boolean =
    (left, right) match {
      case (SParam(_, nameL, modsL, typeL, initL, varargsL),
            SParam(_, nameR, modsR, typeR, initR, varargsR)) =>
        modsL.remove(Modifiers.Var).equals(modsR.remove(Modifiers.Var)) &&''')
# The measured variant that the api's grammar refuses: the api writes var, as the component does
ed('oneshotApi', 'Library/OneShotFlag.fsi', '''object OneShot( canTryIt : Boolean )
''', '''object OneShot( var canTryIt : Boolean )
''')

# The distance stage's list of components: List's two imports join the twelve (rung L)
DR = 'explorations/coordinator/tools/distance/run.sh'
ed('stage14', DR, '''COMPONENTS="Library/FortressLibrary.fss Library/RangeInternals.fss ProjectFortress/LibraryBuiltin/FortressBuiltin.fss
 ProjectFortress/LibraryBuiltin/NativeArray.fss Library/List.fss Library/String.fss Library/FlatString.fss Library/Stream.fss
 ProjectFortress/LibraryBuiltin/NatReflect.fss Library/TypeProxy.fss Library/Writer.fss ProjectFortress/LibraryBuiltin/AnyType.fss"
''', '''COMPONENTS="Library/FortressLibrary.fss Library/RangeInternals.fss ProjectFortress/LibraryBuiltin/FortressBuiltin.fss
 ProjectFortress/LibraryBuiltin/NativeArray.fss Library/List.fss Library/String.fss Library/FlatString.fss Library/Stream.fss
 ProjectFortress/LibraryBuiltin/NatReflect.fss Library/TypeProxy.fss Library/Writer.fss ProjectFortress/LibraryBuiltin/AnyType.fss
 Library/CovariantCollection.fss Library/OneShotFlag.fss"
''')

# ---------------------------------------------------------------- rung B: the bound Any for fortress compile
ed('bound412', 'ProjectFortress/src/com/sun/fortress/Shell.java', '''    public static void useCompilerLibraries() {
\tsetExtendsObjectPreDesugaring(true);
''', '''    public static void useCompilerLibraries() {
\tsetExtendsObjectPreDesugaring(false);
''')
# The stage's compile setting takes the compile command's extends-Object switch from the tracked Shell.java at each
# run, so that it follows that line rather than a copy of it; the gate's default becomes that setting. (A first
# form called Shell.useCompilerLibraries() and then useInterpreterLibraries(): the run crashed on 214 declarations,
# 'Undefined API: CompilerBuiltin', since Types' constants were made under the compiler's names.)
DM = 'explorations/coordinator/tools/distance/DistanceMulti.java'
ed('stageCompile', DM, '''        Shell.useInterpreterLibraries();
        Shell.setExtendsObjectPreDesugaring(setting.equals("compile"));
        Shell.setCompiledExprDesugaring(!setting.equals("walk"));
''', '''        Shell.useInterpreterLibraries();
        Shell.setExtendsObjectPreDesugaring(setting.equals("compile") && compileCommandExtendsObject());
        Shell.setCompiledExprDesugaring(!setting.equals("walk"));
''')
ed('stageCompile', DM, '''        System.exit(worst);
    }
''', '''        System.exit(worst);
    }

    // -setting compile: the extends-Object switch of the compile command, as Shell.useCompilerLibraries()
    // sets it in the tracked source, read at each run so that the stage follows that line. Calling the
    // method here would not do: Types' constants would then name the compiler's prelude.
    static boolean compileCommandExtendsObject() throws java.io.IOException {
        String src = new String(java.nio.file.Files.readAllBytes(
                java.nio.file.Paths.get("ProjectFortress/src/com/sun/fortress/Shell.java")), "UTF-8");
        java.util.regex.Matcher m = java.util.regex.Pattern.compile(
                "public static void useCompilerLibraries\\\\(\\\\) \\\\{\\\\s*setExtendsObjectPreDesugaring\\\\((true|false)\\\\);")
                .matcher(src);
        if (!m.find())
            throw new RuntimeException("Shell.useCompilerLibraries() does not open with setExtendsObjectPreDesugaring");
        return Boolean.parseBoolean(m.group(1));
    }
''')
ed('stageCompile', DR, '''SETTING=${3:-any}
''', '''SETTING=${3:-compile}
''')

names = WANT or [n for n in E if n not in VARIANTS]
texts = {}
for n in names:
    assert n in E, ('no such edit', n)
    for path, old, new in E[n]:
        if path not in texts: texts[path] = open(os.path.join(T, path), encoding='utf-8').read()
        c = texts[path].count(old)
        assert c == 1, (n, path, c, old[:80])
        texts[path] = texts[path].replace(old, new)
for path, s in texts.items():
    open(os.path.join(T, path), 'w', encoding='utf-8').write(s)
print('applied', ' '.join(names))
