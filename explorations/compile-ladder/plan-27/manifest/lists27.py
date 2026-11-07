# The briefing and checks lists of climb batch 27's rungs (CLIMB-BATCH-27.md, section 1, "The manifest, rung by
# rung"), made from plan-26/manifest/lists26.py for the batch workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's
# section cites, the decisions, the ledger rows, the notes and the code it rests on, and no process position or
# harness fact, which the brief's role text and the fortress-repo skill carry. POSITIONS and FACTS entries are keyed
# by their numbers. Each briefing entry is a pair: its facts-extract.sh key and one line on why it is there. A checks
# list is a sub-list of its briefing's keys, read by the skeptic, a repair round and a judge. No key holds a
# backslash, a backtick or a double quote, which the script refuses; facts-extract matches a heading without its
# backticks.
# Changed from lists26.py: the keys are the record's section 1, each rung's briefing bullets in their order, each key
# as the record writes it, its backticks dropped and REC spelled out, each with the record's reason, its first letter
# capitalized but where it opens with a code name (random's, flatConcat's, getProperty, asFloat, asDebugString,
# match), and the checks those the record marks (check). The record gives every key its reason, so OWN_REASONS is
# empty; check27.js compares every key, reason and check, and the record's counts, with this file. The rungs, in the
# manifest's order: N, I, F, C, W, S, as section 1 stands after the rewrite of rungs N and F (N's 22 keys and F's 22),
# then A, E, G and T, added after them (A 26 keys and 14 checks, E 28 and 17, G 11 and 7, T 10 and 5). No rung has a
# planner's text or sample, so no key names plan-27/probes/. Every rung keeps the one forks key, the forks section
# whole: section 3's bold paragraphs cannot be cut per rung by the @WORDS filter with one place a key (check27.js).
# `python3 -B lists27.py` checks every key with facts-extract.sh --check (each must match exactly one place) and every
# reason's form, in $FORTRESS_HOME (this checkout by default); it is run again on the tree the batch is cut from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
REC = "doc:explorations/coordinator/CLIMB-BATCH-27.md#"
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
PROBES = REC + "The planner's probes"
FORKS = (REC + "Forks the batch takes, none consequential", "The defaults your rung builds, each with the ways not taken.")

N_BRIEFING = [
  ('P-160', 'The decision whose second step you build.'),
  ('P-165', "asFloat and the = built on it off Number, each type's own asFloat, the norm's bound and the rule for a mixed =."),
  ('P-44', "AnyIntegral's clause, which stays."),
  ('F-318', 'The first step as landed, and the programs it loaded without the clause.'),
  ('F-131', "The flat tower and Number's = by asFloat, which your change rewrites, and its test."),
  ('F-151', "The vectors' bound by Number, whose two reasons, the clause and the norm's asFloat, your change removes."),
  ('F-311', "Each type's own asFloat binding, which stays and which your api lines declare."),
  ('ledger:551', 'The row whose test you retarget.'),
  ('ledger:596', 'The row whose Number half closes.'),
  ('ledger:434', "Number's = between a float and an exact number, which closes with your strike."),
  ('doc:explorations/reviews/number-closure-2026-11-05.md#6. The options', 'Option (b), its step 2 and its files.'),
  ('doc:explorations/reviews/number-closure-2026-11-05.md#2. What the clause does', 'What leans on the clause, measured.'),
  ('code:Library/ReflectiveQuickCheck.fss#object genType(top:Type)', 'The generator you give a way to make a Number.'),
  ('code:Library/FortressLibrary.fss#exactValue(x: Number): QQ', "The function you delete with Number's =."),
  ('code:Library/FortressLibrary.fss#opr =(a:Any, b:Any)', 'The fallback that answers a mixed = which no pair carries.'),
  ('code:Library/FortressLibrary.fss#SQRT asFloat(squaredNorm(me))', 'The norm you declare at each number type.'),
  ('code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss#trait Number excludes', "The prelude's Number, which declares nothing."),
  ('code:Specification/basic-lib/numbers.tex#Some conversions between them are coercions..revival-rr32', 'The passage you revise, with its callout.'),
  ('doc:ProjectFortress/tests/XXXComprisesLibraryTraitUnlistedExtender.fss', 'The test you retarget.'),
  (PROBES, "The walk runs without the clause on this base, and Number's = in the team's library."),
  (REC + "The planner's probes for rungs N and F", "The strike's walk runs, the checker's sites, the prototype of the pairs and the demos on this base."),
  FORKS,
]
N_CHECKS = ['P-160', 'P-165', 'F-318', 'F-131', 'ledger:551', 'ledger:434',
  'doc:explorations/reviews/number-closure-2026-11-05.md#6. The options',
  'doc:explorations/reviews/number-closure-2026-11-05.md#2. What the clause does',
  'code:Library/ReflectiveQuickCheck.fss#object genType(top:Type)',
  'code:Library/FortressLibrary.fss#opr =(a:Any, b:Any)',
  'code:Library/FortressLibrary.fss#SQRT asFloat(squaredNorm(me))',
  'code:Specification/basic-lib/numbers.tex#Some conversions between them are coercions..revival-rr32', PROBES,
  REC + "The planner's probes for rungs N and F"]

I_BRIEFING = [
  ('P-162', "The decision whose integers' rung you build."),
  ('P-69', "A shift's count and width, on both paths."),
  ('P-153', "An integer power's type, and its negative exponents."),
  ('P-58', "The binding's form, and the check from the step that moves a binding."),
  ('F-308', 'The NN32 and NN64 transfers that the compiled rewrite adds.'),
  ('ledger:441', "The prelude's ZZ32 power, whose contract your helpers keep."),
  ('ledger:442', "The prelude's missing shifts on NN32 and NN64."),
  ('doc:explorations/reviews/hard-set-natives-2026-11-06.md#2.1 Group 1', 'The 16 bindings, their glue and their values under walk.'),
  ('doc:explorations/reviews/hard-set-natives-2026-11-06.md#(a) A public converting declaration', 'The pair pattern, its two spellings and its files.'),
  ('doc:explorations/reviews/hard-set-natives-2026-11-06.md#(e) The mix by group', 'The option the decision took.'),
  ('code:' + SRC + 'interpreter/glue/prim/Int.java#public static long shiftCount(FValue y)', "The glue's count, which your conversion keeps."),
  ('code:' + SRC + 'interpreter/glue/prim/Int.java#public static long powCount(FValue y)', "The glue's exponent, which your conversion keeps."),
  ('code:' + SRC + 'interpreter/glue/prim/Int.java#public static long negativePow(long base, long exp)', "The glue's answers at a negative exponent."),
  ('map:compile-path-walkthrough.md#7. Native bindings in both worlds', "The territory map's two binding mechanisms."),
  (PROBES, "The base's sites, and the conversions one line below them."),
  FORKS,
]
I_CHECKS = ['P-162', 'P-69', 'P-153', 'P-58', 'doc:explorations/reviews/hard-set-natives-2026-11-06.md#2.1 Group 1',
  'doc:explorations/reviews/hard-set-natives-2026-11-06.md#(a) A public converting declaration',
  'code:' + SRC + 'interpreter/glue/prim/Int.java#public static long shiftCount(FValue y)',
  'code:' + SRC + 'interpreter/glue/prim/Int.java#public static long powCount(FValue y)', PROBES]

F_BRIEFING = [
  ('P-162', "The decision whose floats' rung you build."),
  ('P-165', 'asFloat off Number, and the four over Number at RR64.'),
  ('P-58', "The binding's form, and the check from the step that moves a binding."),
  ('F-299', "The loader's carriers, FlatString's self and a Char in an int among them."),
  ('F-308', 'The Char transfer on the compiled path.'),
  ('F-301', 'Why a helper beats a Fortress composition on the compiled path.'),
  ('ledger:872', 'A Char past U+FFFF read as its low 16 bits, which flatConcat at a Char keeps.'),
  ('doc:explorations/reviews/hard-set-natives-2026-11-06.md#2.2 Group 2', 'The three over Number, and their defects at a rational.'),
  ('doc:explorations/reviews/hard-set-natives-2026-11-06.md#2.3 Group 3', 'The six, their glue and their values under walk.'),
  ('doc:explorations/reviews/hard-set-natives-2026-11-06.md#(b) New helpers', 'The one-line helpers for group 3.'),
  ('doc:explorations/reviews/hard-set-natives-2026-11-06.md#(e) The mix by group', 'The option the decision took.'),
  ('code:' + SRC + 'interpreter/glue/prim/Float.java#public static final class IFloor extends R2L', "A bracket's glue."),
  ('code:' + SRC + 'interpreter/glue/prim/Float.java#public static final class Random extends Util.R2R', "random's glue, which your helper computes as."),
  ('code:' + SRC + 'interpreter/glue/prim/Float.java#public static final class Pow extends RR2R', "The power's glue, which reads an integer exponent as a double, as your conversion does."),
  ('code:Library/FortressLibrary.fss#atan2(self,x:Number):RR64 = atan2(asFloat(self), asFloat(x))', "The RR64 trait's atan2, which you narrow to RR64."),
  ('code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#opr ^(self, b:Number):RR64 = self^(asFloat(b))', "Float's power at Number, which you delete."),
  ('code:Library/FortressLibrary.fss#opr ^(self, b:Number):RR64 = (asFloat(self))^b', "The RR64 trait's power, which you narrow to RR64."),
  ('code:' + SRC + 'interpreter/glue/prim/FlatString.java#public static final class Concat extends ss2S', "flatConcat's glue at a Char."),
  ('map:compile-path-walkthrough.md#7. Native bindings in both worlds', "The territory map's two binding mechanisms."),
  (PROBES, "The base's sites."),
  (REC + "The planner's probes for rungs N and F", "The checker's refusals once Number has no asFloat."),
  FORKS,
]
F_CHECKS = ['P-162', 'P-165', 'P-58', 'F-299', 'doc:explorations/reviews/hard-set-natives-2026-11-06.md#2.2 Group 2',
  'doc:explorations/reviews/hard-set-natives-2026-11-06.md#2.3 Group 3',
  'doc:explorations/reviews/hard-set-natives-2026-11-06.md#(b) New helpers',
  'doc:explorations/reviews/hard-set-natives-2026-11-06.md#(e) The mix by group',
  'code:' + SRC + 'interpreter/glue/prim/Float.java#public static final class Random extends Util.R2R',
  'code:Library/FortressLibrary.fss#atan2(self,x:Number):RR64 = atan2(asFloat(self), asFloat(x))',
  'code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#opr ^(self, b:Number):RR64 = self^(asFloat(b))', PROBES,
  REC + "The planner's probes for rungs N and F"]

C_BRIEFING = [
  ('P-163', 'The decision you build.'),
  ('P-96', 'The revision form.'),
  ('P-95', 'Why every change keeps its original.'),
  ('F-308', "Char's helpers, and the one binding left on glue."),
  ('ledger:861', 'The row you close.'),
  ('doc:explorations/reviews/char-asexprstring-2026-11-06.md#(d) The helper', 'The option the decision took.'),
  ('doc:explorations/reviews/char-asexprstring-2026-11-06.md#2.4 Whether each form reads back', "The parser's two gaps and the sweep."),
  ('doc:explorations/reviews/char-asexprstring-2026-11-06.md#2.3 The two forms', "Walk's and the helper's texts on the same characters."),
  ('doc:Specification/basic/lexical-structure.tex#Character Literals', 'The list you revise.'),
  ('doc:Specification/appendices/changes.tex#A comparison at a NaN', "An Appendix I entry's form."),
  ('code:' + SRC + 'nativeHelpers/simpleChar.java#public static String charToExprString(int x)', 'The helper you complete.'),
  ('code:' + SRC + 'parser/Literal.rats#private String UnicodeHexChar =', "The parser's rule you reorder."),
  ('doc:ProjectFortress/tests/NativeHelperFamilyCharWalk.fss', 'The walk guard you extend.'),
  ('doc:ProjectFortress/compiler_tests/NativeHelperFamilyCharCompiled.fss', 'The compiled guard you extend.'),
  ('map:spec-to-implementation.md#Chapter 4, Lexical Structure', "The territory map's row for character literals."),
  FORKS,
]
C_CHECKS = ['P-163', 'P-96', 'F-308', 'ledger:861',
  'doc:explorations/reviews/char-asexprstring-2026-11-06.md#(d) The helper',
  'doc:explorations/reviews/char-asexprstring-2026-11-06.md#2.4 Whether each form reads back',
  'doc:Specification/basic/lexical-structure.tex#Character Literals',
  'code:' + SRC + 'nativeHelpers/simpleChar.java#public static String charToExprString(int x)',
  'code:' + SRC + 'parser/Literal.rats#private String UnicodeHexChar =']

W_BRIEFING = [
  ('P-164', 'The decision whose writer rung you build.'),
  ('P-58', "The binding's form."),
  ('F-321', 'The checker reads the whole helper class, so both traits and both table entries come in this rung.'),
  ('F-299', "Walk's loader and its carriers, which your change extends."),
  ('ledger:841', "FileWriteStream's flush, declared in its api and absent from its component."),
  ('doc:explorations/reviews/io-objects-carrier-2026-11-06.md#(b) A Java-backed type', 'The option the decision took, its files and its tests.'),
  ('doc:explorations/reviews/io-objects-carrier-2026-11-06.md#2.2 The bindings at work under walk', "Today's values, which your tests keep."),
  ('doc:explorations/reviews/io-objects-carrier-2026-11-06.md#2.3 What the compiled prelude does', "The prelude's helpers for the same operations."),
  ('code:' + SRC + 'interpreter/glue/StaticNativeApp.java#static Class<?> javaFor(String t)', "The loader's carrier by name, which you extend."),
  ('code:' + SRC + 'interpreter/glue/StaticNativeApp.java#static FValue box(Class<?> c, String declared, Object r)', "How the loader boxes a helper's result."),
  ('code:' + SRC + 'compiler/NamingCzar.java#private static com.sun.fortress.nodes.Type oneLibraryTypeForForeignJavaType(String s, String method_name, boolean isResultType)', "The checker's walk-world reading of a helper's Java types."),
  ('doc:Library/Writer.fss', 'The component you rewrite.'),
  ('doc:' + SRC + 'nativeHelpers/fileOps.java', 'The helpers you bind.'),
  ('code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait JavaBufferedWriter excludes', "The prelude's trait, whose names and methods yours take."),
  ('code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object Int extends ZZ32', "Walk's native object below a library trait, the precedent."),
  ('map:compile-path-walkthrough.md#7. Native bindings in both worlds', "The territory map's two binding mechanisms."),
  FORKS,
]
W_CHECKS = ['P-164', 'P-58', 'F-321', 'F-299',
  'doc:explorations/reviews/io-objects-carrier-2026-11-06.md#(b) A Java-backed type',
  'doc:explorations/reviews/io-objects-carrier-2026-11-06.md#2.2 The bindings at work under walk',
  'code:' + SRC + 'interpreter/glue/StaticNativeApp.java#static Class<?> javaFor(String t)',
  'code:' + SRC + 'compiler/NamingCzar.java#private static com.sun.fortress.nodes.Type oneLibraryTypeForForeignJavaType(String s, String method_name, boolean isResultType)',
  'doc:Library/Writer.fss']

S_BRIEFING = [
  ('doc:explorations/coordinator/review-queue.md#(a) Settled or stale@355', 'The answer whose option 1 you build.'),
  ('F-321', 'The checker reads the whole helper class, and systemOps fails it.'),
  ('ledger:895', 'The row that closes with your rung.'),
  ('ledger:896', 'getProperty at an empty name, which stays as it is.'),
  ('P-58', "The binding's form."),
  ('P-37', "The compiler's prelude, which keeps its import of systemOps.getProperty."),
  ('doc:' + SRC + 'nativeHelpers/systemOps.java', 'The helpers you move.'),
  ('doc:Library/System.fss', 'The two bindings you retarget.'),
  ('doc:ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss', 'The compiled guard you retarget.'),
  ('map:README.md#7. Touch this, and that moves@nativeHelpers', "The territory map's row on helper classes and their wrappers."),
  (PROBES, 'The checker over System on this base, and its control.'),
  FORKS,
]
S_CHECKS = ['doc:explorations/coordinator/review-queue.md#(a) Settled or stale@355', 'F-321', 'ledger:895',
  'doc:' + SRC + 'nativeHelpers/systemOps.java', 'doc:Library/System.fss',
  'doc:ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss', PROBES]

A_BRIEFING = [
  ('P-167', 'The decision you build, the carrier and the ilk.'),
  ('P-91', 'What an object with no asString prints, which asString over ilkName keeps.'),
  ('P-58', "The binding's form, and the walk half that P-167 bends for your two names."),
  ('P-162', "The three natives over Any, which leave glue by P-167's way."),
  ('F-32', 'The count of bindings on glue, which falls by three with your rung.'),
  ('F-299', "Walk's loader of helpers, before which your table answers."),
  ('F-298', "The compiled rewrite, which checks your two strings against the helpers' Java signatures."),
  ('F-74', "Walk's numerals as the native objects, and a Box of Int apart from a Box of ZZ32."),
  ('F-123', 'A compiled object with no asString prints its bare type name.'),
  ('ledger:321', 'The compiled overflow that asString over ilkName keeps out of the one library.'),
  ('ledger:364', "Walk's inferred static argument, whose printed text your ilk changes."),
  ('ledger:363', 'asDebugString on the two paths, which stays.'),
  ("doc:explorations/reviews/any-carrier-2026-11-06.md#(c) The operations answered by each path's run time, under one binding", "The option P-167 took, and prototype C's loader lines."),
  ('doc:explorations/reviews/any-carrier-2026-11-06.md#(e) Fewer natives, in the library', "Way (e1), asString over ilkName, and row 321's probe."),
  ("doc:explorations/reviews/any-carrier-2026-11-06.md#2.2 Walk's answers", "Walk's ilk and asString texts today."),
  ("doc:explorations/reviews/any-carrier-2026-11-06.md#2.3 The compiled path's answers", 'The compiled texts today.'),
  ('code:' + SRC + 'interpreter/glue/NativeApp.java#public static Applicable checkAndLoadNative(Applicable defn, boolean isFunctionalMethod,', 'Where the loader reads the string, and where your table goes.'),
  ('code:' + SRC + 'interpreter/glue/prim/ObjectPrims.java#public class ObjectPrims', "Walk's ilk operation, whose rendering you change."),
  ('code:' + SRC + 'nativeHelpers/stringOps.java#public static String typeName(fortress.AnyType.Any a)', "The compiled helper whose answer is the ilk's definition."),
  ('code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#trait Object extends Any', 'The declarations you change.'),
  ('code:' + SRC + 'interpreter/evaluator/types/FTraitOrObject.java#public String toString()', "Walk's rendering of a type's name and static arguments today."),
  ('doc:ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss', "The compiled form of a program's own binding of the two helpers, to copy."),
  ('code:Library/FortressLibrary.fss#printThreadInfo(a:String):() = typecase a.asFlatString of', "The library's overload over String around a native over FlatString, the form of match's."),
  ('ledger:916', 'match refuses a string that is not flat, which you close.'),
  (REC + "The planner's probes for rungs A, E, G and T", 'The ilk and SEQV on both paths on this base, and the prototype of your rung with its suite and stages.'),
  FORKS,
]
A_CHECKS = ['P-167',
  'P-91',
  'P-58',
  'F-299',
  'F-74',
  'ledger:321',
  'ledger:364',
  "doc:explorations/reviews/any-carrier-2026-11-06.md#(c) The operations answered by each path's run time, under one binding",
  'doc:explorations/reviews/any-carrier-2026-11-06.md#(e) Fewer natives, in the library',
  'code:' + SRC + 'interpreter/glue/NativeApp.java#public static Applicable checkAndLoadNative(Applicable defn, boolean isFunctionalMethod,',
  'code:' + SRC + 'interpreter/glue/prim/ObjectPrims.java#public class ObjectPrims',
  'code:' + SRC + 'nativeHelpers/stringOps.java#public static String typeName(fortress.AnyType.Any a)',
  'code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#trait Object extends Any',
  REC + "The planner's probes for rungs A, E, G and T"]

E_BRIEFING = [
  ('P-168', 'The decision you build.'),
  ('P-166', "ZZ's and QQ's values value objects, Ratio, and the specification's list."),
  ('P-167', 'The carrier, whose SEQV binding names the helper whose body you change.'),
  ('P-96', 'The revision form.'),
  ('P-38', "The prelude's text, its === family among it, stays until the switch-over."),
  ('F-74', "Walk's numerals as its native objects, which your tests bind at declared types."),
  ('F-57', "A numeral's type on each path, IntLiteral to the checker and ZZ32 under walk."),
  ('ledger:113', "Walk's value objects without body fields, which you close."),
  ('ledger:909', "Walk's equivalence across types, which you close."),
  ('ledger:906', 'The compiled value modifier without effect, which you close.'),
  ('ledger:907', 'Compiled tuples by reference, which you close.'),
  ('ledger:908', 'Compiled floats by =, which you narrow to the prelude.'),
  ('ledger:910', 'The literals as plain objects, which you close.'),
  ('ledger:911', 'Ratio and BigNum declared apart, which P-166 settles and you close.'),
  ('ledger:807', 'The fallback = and the three-argument assert, which reach SEQV.'),
  ('doc:explorations/reviews/any-carrier-2026-11-06.md#2.4 What SEQV means: the specification, walk and the compiled path', 'The rule, the 14 cases and both paths today.'),
  ('doc:explorations/reviews/string-equivalence-2026-11-06.md#3. What each runtime does today', "The strings on each path, and the team's two tests."),
  ('doc:explorations/reviews/string-equivalence-2026-11-06.md#(b) Strings are reference objects, the literal reading', 'The way P-168 took.'),
  ('doc:Specification/basic/objects.tex#Object Equivalence', 'The rule.'),
  ('code:Specification/basic/objects.tex#An object is a..aggregates such as arrays', 'The lists you revise.'),
  ('doc:Specification/appendices/changes.tex#A comparison at a NaN', "An Appendix I entry's form."),
  ('code:' + SRC + 'interpreter/evaluator/values/FInt.java#public boolean seqv(FValue v)', "One value class's cross-type branches, as its siblings have them."),
  ('code:' + SRC + 'interpreter/evaluator/values/FOrdinaryObject.java#public boolean seqv(FValue v)', "Walk's value objects by their fields."),
  ('code:' + SRC + 'interpreter/evaluator/types/FTypeObject.java#public FTypeObject(String name,', 'The field list of row 113.'),
  ('doc:' + SRC + 'nativeHelpers/equality.java', 'The helper you complete.'),
  ('code:Library/CompilerLibrary.fss#This is incomplete..opr NEQV(a:Any, b:Any)', "The prelude's family, which stays and which the compiled tests meet first."),
  (REC + "The planner's probes for rungs A, E, G and T", 'The 14 cases on both paths on this base, and the prototype of your walk half with its suite and stages.'),
  FORKS,
]
E_CHECKS = ['P-168',
  'P-166',
  'P-96',
  'ledger:113',
  'ledger:909',
  'ledger:906',
  'ledger:907',
  'ledger:908',
  'doc:explorations/reviews/any-carrier-2026-11-06.md#2.4 What SEQV means: the specification, walk and the compiled path',
  'doc:explorations/reviews/string-equivalence-2026-11-06.md#(b) Strings are reference objects, the literal reading',
  'doc:Specification/basic/objects.tex#Object Equivalence',
  'code:Specification/basic/objects.tex#An object is a..aggregates such as arrays',
  'code:' + SRC + 'interpreter/evaluator/values/FInt.java#public boolean seqv(FValue v)',
  'code:' + SRC + 'interpreter/evaluator/values/FOrdinaryObject.java#public boolean seqv(FValue v)',
  'code:' + SRC + 'interpreter/evaluator/types/FTypeObject.java#public FTypeObject(String name,',
  'doc:' + SRC + 'nativeHelpers/equality.java',
  REC + "The planner's probes for rungs A, E, G and T"]

G_BRIEFING = [
  ('ledger:818', 'The row you close or narrow.'),
  ('F-34', "The code generator's refusals in the library, by kind."),
  ('P-33', 'Code-generator work beside the natives.'),
  ('doc:Specification/basic/expressions/type-annotation.tex#Type Assumption', 'What a type assumption means.'),
  ('doc:explorations/perf-probes/codegen-distance/REPORT.md#3. The kinds of refusal', "The library's sites of each kind and the probe of asif."),
  ('code:' + SRC + 'interpreter/evaluator/Evaluator.java#public FValue forAsIfExpr(AsIfExpr x)', "Walk's assumption, a wrapped value that its dispatch reads."),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#public void forMethodInvocation(MethodInvocation x)', "The method call that a receiver's assumption changes."),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#public void forOpExpr(OpExpr x)', "An operator call, as String's CMP over two assumptions is."),
  ('code:Library/FortressLibrary.fss#trait SequentialGenerator', "The library's form, a getter over self asif a supertrait."),
  (REC + "The planner's probes for rungs A, E, G and T", "The wall on this base, and a trait's bodies as static methods of its DefaultTraitMethods class."),
  FORKS,
]
G_CHECKS = ['ledger:818',
  'F-34',
  'doc:Specification/basic/expressions/type-annotation.tex#Type Assumption',
  'doc:explorations/perf-probes/codegen-distance/REPORT.md#3. The kinds of refusal',
  'code:' + SRC + 'compiler/codegen/CodeGen.java#public void forMethodInvocation(MethodInvocation x)',
  'code:Library/FortressLibrary.fss#trait SequentialGenerator',
  REC + "The planner's probes for rungs A, E, G and T"]

T_BRIEFING = [
  ('ledger:733', 'The row you close.'),
  ('ledger:732', 'Its sibling in the same method, which is not yours.'),
  ('F-34', "The code generator's refusals in the library, by kind."),
  ('P-33', 'Code-generator work beside the natives.'),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private void dumpMethodChaining(String [] superInterfaces, boolean includeCurrent)', 'The method that stops.'),
  ('code:' + SRC + 'scala_src/types/TypeAnalyzer.scala#def typeCons(x: Id): TypeConsIndex', "The table's look-up that throws."),
  ('code:' + SRC + 'compiler/phases/CodeGenerationPhase.java#private TypeAnalyzer newTypeAnalyzer(', "How the code generator's table is made, over the component and the api environment."),
  ('doc:ProjectFortress/compiler_tests/RecursiveApiTest3.test', 'A compiled test with its own apis, the form of yours.'),
  (REC + "The planner's probes for rungs A, E, G and T", 'The wall on this base, with its stack.'),
  FORKS,
]
T_CHECKS = ['ledger:733',
  'F-34',
  'code:' + SRC + 'compiler/codegen/CodeGen.java#private void dumpMethodChaining(String [] superInterfaces, boolean includeCurrent)',
  'code:' + SRC + 'scala_src/types/TypeAnalyzer.scala#def typeCons(x: Id): TypeConsIndex',
  REC + "The planner's probes for rungs A, E, G and T"]

ORDER = ('N', 'I', 'F', 'C', 'W', 'S', 'A', 'E', 'G', 'T')
_B = {'N': (N_BRIEFING, N_CHECKS), 'I': (I_BRIEFING, I_CHECKS), 'F': (F_BRIEFING, F_CHECKS),
      'C': (C_BRIEFING, C_CHECKS), 'W': (W_BRIEFING, W_CHECKS), 'S': (S_BRIEFING, S_CHECKS),
      'A': (A_BRIEFING, A_CHECKS), 'E': (E_BRIEFING, E_CHECKS), 'G': (G_BRIEFING, G_CHECKS), 'T': (T_BRIEFING, T_CHECKS)}
IDS = tuple(r for r in ORDER if _B[r][0])
LISTS = {r: ([k for k, _ in _B[r][0]], _B[r][1]) for r in IDS}
REASONS = {r: _B[r][0] for r in IDS}
# The keys whose reason the record does not give: none, since section 1 gives every key its reason.
OWN_REASONS = {}
assert all(k in LISTS[r][0] for r in OWN_REASONS for k in OWN_REASONS[r]), 'OWN_REASONS names a key not in its briefing'
def reason_problems(rid):
    out = []
    for k, r in REASONS[rid]:
        if not r or not r.strip():
            out.append((k, 'no reason'))
        elif '\n' in r or '`' in r or any(ord(c) > 127 for c in r):
            out.append((k, 'a reason is one ASCII line with no backtick'))
        elif not r.endswith('.') or len(r) > 240:
            out.append((k, 'a reason ends with a full stop and is at most 240 characters'))
    return out


if __name__ == '__main__':
    import subprocess, re, sys
    root = _ROOT
    bad = 0
    print('tree', root)
    print('rungs', ', '.join(IDS))
    for rid in IDS:
        b, c = LISTS[rid]
        rp = reason_problems(rid)
        print(rid, 'reasons', len(REASONS[rid]), 'for', len(b), 'briefing keys |', 'problems', len(rp))
        for k, why in rp: print('   PROBLEM', why, ':', k[:200])
        if rp: bad += 1
        for name, keys in (('briefing', b), ('checks', c)):
            if len(set(keys)) != len(keys):
                print('   PROBLEM duplicate key in', rid, name); bad += 1
            badk = [k for k in keys if not k.strip() or k.startswith('-') or re.search(r'["`$\\\n]', k) or any(ord(ch) > 127 for ch in k)]
            if badk:
                print('   PROBLEM keys the script refuses', rid, name, badk); bad += 1
            if name == 'checks':
                stray = [k for k in keys if k not in b]
                if stray:
                    print('   PROBLEM checks keys not in the briefing', rid, stray); bad += 1
            r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check'] + keys, capture_output=True, text=True, cwd=root)
            lines = r.stdout.strip().splitlines()
            probs = [l for l in lines if 'not one' in l or 'NOT FOUND' in l or 'no match' in l.lower() or 'no line of' in l or 'no such file' in l]
            total = [l for l in lines if l.startswith('Total')]
            print(rid, name, 'keys', len(keys), 'exit', r.returncode, '|', total[0] if total else r.stderr.strip()[:200])
            for l in probs: print('   PROBLEM', l[:300])
            if r.returncode or probs:
                bad += 1
                if os.environ.get('VERBOSE'): print(r.stdout)
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
