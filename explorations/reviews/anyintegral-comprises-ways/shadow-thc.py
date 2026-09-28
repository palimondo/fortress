#!/usr/bin/env python3
"""shadow-thc.py <shadow-src-root>: a copy of the tracked TypeHierarchyChecker.scala under
<shadow-src-root>/com/sun/fortress/scala_src/typechecker/, with three switches added, each off by
default, so that the copy answers as the tracked file does unless a switch is given:

  -Dprobe.aicw.eligibleRelax=true    the parked accommodation, broad form (5 lines): isEligibleToExtend
                                     accepts any generic immediate subtrait of a trait with a comprises
                                     clause (perf-probes/nat/shadow.patch, its eligibleRelax, re-applied here)
  -Dprobe.aicw.eligibleNarrow=true   the narrow form (14 lines, everyKnownSubtypeListed, verbatim from the
                                     same patch): accepted only when every trait the table knows that
                                     immediately extends the generic subtrait is below a listed type
  -Dprobe.aicw.comprisesInstance=true  the 2008 clause's way: a type listed in a generic trait's comprises
                                     clause is accepted when it extends some instantiation of that trait,
                                     not only the one at the trait's own parameters (7d1ec0ac3's rule)

Run from $FORTRESS_HOME. Every text edit must match exactly once. The tracked file is only read."""
import io
import os
import sys

SRC = 'ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala'
out = os.path.join(sys.argv[1], 'com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala')
s = io.open(SRC, encoding='utf-8').read()

EDITS = [
("""			   isApi: Boolean) {
  def checkHierarchy(): JavaList[StaticError] = {""",
"""			   isApi: Boolean) {
  // SHADOW (reviews/anyintegral-comprises-ways): three switches, each off by default.
  private final val aicwRelax: Boolean =
    com.sun.fortress.repository.ProjectProperties.getBoolean("probe.aicw.eligibleRelax", false)
  private final val aicwNarrow: Boolean =
    com.sun.fortress.repository.ProjectProperties.getBoolean("probe.aicw.eligibleNarrow", false)
  private final val aicwInstance: Boolean =
    com.sun.fortress.repository.ProjectProperties.getBoolean("probe.aicw.comprisesInstance", false)
  def checkHierarchy(): JavaList[StaticError] = {"""),
("""                      if ( ! extendsContains(tt, subst_extends,
					     new_analyzer, errors) )""",
"""                      if ( ! extendsContains(tt, subst_extends,
					     new_analyzer, errors) &&
                           ! (aicwInstance && ! tt.getArgs.isEmpty &&
                              extendsSomeInstance(tt.getName.getText, subst_extends, errors, 0)) )"""),
("""    comprisesContains(comprises, tt, analyzer) ||
    (getTypes(tt.getName, errors) match {""",
"""    comprisesContains(comprises, tt, analyzer) ||
    (aicwRelax && !tt.getArgs.isEmpty) ||
    (aicwNarrow && !tt.getArgs.isEmpty &&
       everyKnownSubtypeListed(tt, comprises, analyzer)) ||
    (getTypes(tt.getName, errors) match {"""),
("""  private def comprisesContains(comprises: Set[NamedType],""",
"""  /** SHADOW: the narrow form, perf-probes/nat/shadow.patch's everyKnownSubtypeListed verbatim. */
  private def everyKnownSubtypeListed(tt: TraitType, comprises: Set[NamedType],
				      analyzer: TypeAnalyzer): Boolean = {
    val subs = analyzer.traits.iterator.toList.collect{ case ti: TraitIndex => ti }.filter(ti =>
      toListFromImmutable(ti.extendsTypes).exists(tw => tw.getBaseType match {
        case st: TraitType => st.getName.getText.equals(tt.getName.getText)
        case _ => false }))
    subs.nonEmpty && subs.forall(ti => toOption(ti.typeOfSelf) match {
      case Some(self) => SNodeUtil.getTraitType(self) match {
        case Some(sub) => comprisesContains(comprises, sub,
			    analyzer.extend(toListFromImmutable(ti.staticParameters), None))
        case _ => false }
      case _ => false })
  }

  /** SHADOW: whether some type in 'extendsC', or above it, is an instantiation of the trait named 'target'. */
  private def extendsSomeInstance(target: String, extendsC: List[Type],
                                  errors: JavaList[StaticError], depth: Int): Boolean =
    depth < 32 && extendsC.exists(ty => ty match {
      case STraitType(_, name, args, _) =>
        name.getText.equals(target) || (getTypes(name, errors) match {
          case ti:TraitIndex =>
            extendsSomeInstance(target, toListFromImmutable(ti.extendsTypes).map(tw => substitute(
                                  args, toListFromImmutable(ti.staticParameters), tw.getBaseType)),
                                errors, depth + 1)
          case _ => false })
      case _ => false })

  private def comprisesContains(comprises: Set[NamedType],"""),
]
for a, b in EDITS:
    n = s.count(a)
    if n != 1:
        sys.exit('%d matches for %r' % (n, a[:80]))
    s = s.replace(a, b)
os.makedirs(os.path.dirname(out), exist_ok=True)
io.open(out, 'w', encoding='utf-8').write(s)
print('wrote', out)
