/*******************************************************************************
    Copyright 2009,2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.scala_src.overloading

import _root_.java.util.{List => JavaList}
import com.sun.fortress.compiler.GlobalEnvironment
import com.sun.fortress.compiler.index._
import com.sun.fortress.compiler.typechecker.StaticTypeReplacer
import com.sun.fortress.compiler.Types.ANY
import com.sun.fortress.compiler.Types.BOTTOM
import com.sun.fortress.compiler.Types.OBJECT
import com.sun.fortress.exceptions.InterpreterBug.bug
import com.sun.fortress.nodes._
import com.sun.fortress.nodes_util.NodeFactory._
import com.sun.fortress.nodes_util.{NodeUtil => NU}
import com.sun.fortress.scala_src.nodes._
import com.sun.fortress.scala_src.typechecker.staticenv.KindEnv
import com.sun.fortress.scala_src.typechecker.Formula._
import com.sun.fortress.scala_src.typechecker.TraitTable
import com.sun.fortress.scala_src.typechecker.CFormula
import com.sun.fortress.scala_src.types.TypeAnalyzer
import com.sun.fortress.scala_src.types.TypeSchemaAnalyzer
import com.sun.fortress.scala_src.useful.ErrorLog
import com.sun.fortress.scala_src.useful.Lists._
import com.sun.fortress.scala_src.useful.Maps._
import com.sun.fortress.scala_src.useful.Options._
import com.sun.fortress.scala_src.useful.Sets._
import com.sun.fortress.scala_src.useful.SNodeUtil._
import com.sun.fortress.scala_src.useful.STypesUtil._
import com.sun.fortress.useful.NI

class OverloadingOracle(implicit ta: TypeAnalyzer) extends PartialOrdering[Functional] {
  
  val sa = new TypeSchemaAnalyzer()
  
  def extend(params: List[StaticParam], where: Option[WhereClause]) = new OverloadingOracle()(ta.extend(params, where))
  
  override def tryCompare(x: Functional, y: Functional): Option[Int] = {
    val xLEy = lteq(x,y)
    val yLEx = lteq(y,x)
    if (xLEy) Some(if (yLEx) 0 else -1)
    else if (yLEx) Some(1) else None
  }
  
  // Checks when f is more specific than g
  def lteq(f: Functional, g: Functional): Boolean = {
    (f, g) match {
      case (fm: FunctionalMethod, gm: FunctionalMethod) =>
        val fa = makeSpecialArrowFromFunctionalMethod(fm).get
        val ga = makeSpecialArrowFromFunctionalMethod(gm).get
        lteq(fa, ga)
      case (_,_) =>
        val fa = makeArrowFromFunctional(f, true).get
        val ga = makeArrowFromFunctional(g, true).get
        lteq(fa, ga)
    }
  }

  def lteq(fa: ArrowType, ga: ArrowType): Boolean = {
    val fd = sa.makeDomainWithSelfFromArrow(fa)
    val gd = sa.makeDomainWithSelfFromArrow(ga)
    sa.subtypeED(fd, gd)
  }

  def equiv(fa: ArrowType, ga: ArrowType): Boolean = lteq(fa, ga) && lteq(ga, fa)

  // Checks the return type rule
  def satisfiesReturnTypeRule(f: Functional, g: Functional): Boolean = {
    val fa = makeArrowFromFunctional(f, true).get
    val ga = makeArrowFromFunctional(g, true).get
    satisfiesReturnTypeRule(fa, ga)
  }

  def satisfiesReturnTypeRule(x: ArrowType, y: ArrowType): Boolean =
    (alphaRenameTypeSchema(x, ta.extend(toList(x.getInfo.getStaticParams), None).env),
     alphaRenameTypeSchema(y, ta.extend(toList(y.getInfo.getStaticParams), None).env)) match {
      case (fa@SArrowType(STypeInfo(s1, p1, sp1, w1), d1, r1, e1, i1, m1), 
	    ga@SArrowType(STypeInfo(s2, p2, sp2, w2), d2, r2, e2, i2, m2)) =>
	val fd = sa.makeDomainWithSelfFromArrow(fa)
	val gd = sa.makeDomainWithSelfFromArrow(ga)
	sa.subEDsolution(fd, gd) match {
	  case Some((newgd, newargs)) =>
	    // A static parameter of g is replaced by its solution only where the
	    // domains force it to equal that solution; every other one, a size the
	    // domains leave unsolved among them, stays g's own static parameter,
	    // its bound read with the forced parameters' solutions, bound in the
	    // special arrow beside f's, so that the rule is checked for every
	    // instance of g and not for one solution.
	    val escaped = sp2.zip(newargs).collect {
	      case (p, SIntArg(_, _, v: _InferenceVarInt))
	        if p.getKind.isInstanceOf[KindNat] || p.getKind.isInstanceOf[KindInt] => (v, p)
	    }
	    val bindEscaped: Type => Type =
	      if (escaped.isEmpty) (t: Type) => t
	      else insertNats(nSubstitution(Map(escaped.map { case (v, p) =>
	             (v, staticParamToArg(p).asInstanceOf[IntArg].getIntVal) }: _*)))
	    val forced = sp2.zip(newargs).zip(forcedArgs(fd, gd, newargs))
	    val str = new StaticTypeReplacer(forced.collect { case ((p, _), true) => p },
	                                      forced.collect { case ((_, a), true) => a })
	    val kept = forced.collect { case ((p, _), false) => str.replaceStaticParam(p) }
	    val nsp1 = sp1 ++ kept
	    // Build the special arrow that we use when checking the return type rule
	    val nta = ta.extend(nsp1, None)
	    val ntsa = new TypeSchemaAnalyzer()(nta)
	    val newr2 = bindEscaped(str.replaceIn(r2))
	    val ra = ntsa.normalizeUA(SArrowType(STypeInfo(s1, p1, nsp1, None), nta.meet(d1,bindEscaped(str.replaceIn(d2))), newr2, nta.mergeEffect(e1,e2), i1 && i2, None))
	    // Now test against that special arrow
	    val result = sa.subtypeUA(fa, ra)
	    if (!result) {
// 	      println("fa = " + typeToString(fa))
// 	      println("ga = " + typeToString(ga))
// 	      println("ra = " + typeToString(ra))
// 	      println("result = " + result + "\n")
	    }
	    result
	  case None => true
	}
    }

  // Which static parameters of the domain gd the relation fd <: gd forces equal to
  // their solutions in newargs: the constraint of that relation, with the bounds,
  // implies each such parameter's inference variable equal to its solution.  A size
  // left unsolved is not forced.
  private def forcedArgs(fd: Type, gd: Type, newargs: List[StaticArg]): List[Boolean] = {
    val ta1 = if (getStaticParams(fd).isEmpty) ta else ta.extend(getStaticParams(fd), getWhere(fd))
    val fd1 = if (getStaticParams(fd).isEmpty) fd else clearStaticParams(fd)
    val nta = ta1.extend(getStaticParams(gd), getWhere(gd))
    val sparams = getStaticParams(gd)
    val sargs = sparams.map(makeInferenceArg)
    val infTyp = staticInstantiation(sargs, gd, true, true)(ta1).getOrElse(return sparams.map(_ => true))
    val c0 = nta.subtype(fd1, infTyp)
    val ubs: List[CFormula] = sparams.zip(sargs).flatMap { case (p, a) => (a, staticParamBoundType(p)) match {
      case (STypeArg(_, _, iv: _InferenceVarType), Some(b)) =>
        staticInstantiation(sargs, insertStaticParams(b, sparams), true, true)(ta1).map(bb => upperBound(iv, bb))
      case _ => None } }
    val c = and(c0, and(ubs)(ta1))(ta1)
    sargs.zip(newargs).map {
      case (STypeArg(_, _, iv: _InferenceVarType), STypeArg(_, _, sol)) =>
        implies(c, and(upperBound(iv, sol), lowerBound(iv, sol))(ta1))(ta1)
      case (_, SIntArg(_, _, v: _InferenceVarInt)) => false
      case _ => true
    }
  }

  // The positional rule: when x is more specific than y and the two declare as many
  // static parameters of their own, those are of the same kinds, position by position,
  // and x's return type is a subtype of y's when y's own static parameters are read as
  // x's, position by position, as a call that writes its static arguments hands them to
  // whichever declaration of that many parameters dispatch reaches.  Declarations with
  // different numbers of static parameters are not handed each other's.  The caller
  // checks that x is more specific than y.
  def satisfiesPositionalRule(x: ArrowType, y: ArrowType): Boolean = {
    def own(a: ArrowType) = toList(a.getInfo.getStaticParams).filter(!_.isLifted)
    val (xo, yo) = (own(x), own(y))
    if (xo.isEmpty || xo.size != yo.size) return true
    if (xo.zip(yo).exists { case (p, q) => p.getKind.getClass != q.getKind.getClass }) return false
    (alphaRenameTypeSchema(x, ta.extend(toList(x.getInfo.getStaticParams), None).env),
     alphaRenameTypeSchema(y, ta.extend(toList(y.getInfo.getStaticParams), None).env)) match {
      case (SArrowType(STypeInfo(_, _, sp1, _), _, r1, _, _, _),
            SArrowType(STypeInfo(_, _, sp2, _), _, r2, _, _, _)) =>
        val nta = ta.extend(sp1 ++ sp2.filter(_.isLifted), None)
        val str = new StaticTypeReplacer(sp2.filter(!_.isLifted),
                                          sp1.filter(!_.isLifted).map(p => staticParamToArg(p)))
        isTrue(nta.subtype(r1, str.replaceIn(r2)))(nta)
    }
  }

  // The Meet Rule's closed-trait case, for fa and ga without static parameters, whose
  // domains overlap and neither of which is below the other: the declarations hs, each
  // below both, together hold every value of the overlap.  The overlap is cut by the
  // comprises clauses of the closed traits in it, a trait read as the union of its
  // listed types; a part two of whose types exclude is empty; every other part must be
  // below the domain of one of hs.  What it cannot show is not covered: a part with no
  // closed trait left to cut, a cut that repeats a part on its own path, and a search
  // longer than coverageCuts cuts.  A local judgement of overload checking: its result
  // is never a subtyping fact.
  private val coverageCuts = 1000

  def coversOverlap(fa: ArrowType, ga: ArrowType, hs: List[ArrowType]): Boolean = {
    def ground(a: ArrowType) = getStaticParams(a).isEmpty
    if (hs.isEmpty || !ground(fa) || !ground(ga) || !hs.forall(ground)) return false
    def positions(d: Type): Option[List[Type]] = d match {
      case STupleType(_, es, None, Nil) => Some(es)
      case _: TupleType => None
      case t => Some(List(t))
    }
    type Part = List[List[Type]]
    def canon(cs: List[Type]): List[Type] = cs.distinct.sortBy(_.toString)
    def conj(cs: List[Type]): Type = makeMaybeIntersectionType(toJavaList(cs))
    def asType(p: Part): Type = p match {
      case List(cs) => conj(cs)
      case _ => makeTupleType(toJavaList(p.map(conj)))
    }
    def empty(p: Part) = p.exists(cs => cs.exists(a => cs.exists(b => !(a eq b) && ta.definitelyExcludes(a, b))))
    val hds = hs.map(sa.makeDomainWithSelfFromArrow)
    def covered(p: Part) = { val t = asType(p); hds.exists(h => ta.lteq(t, h)) }
    // A closed trait's listed types, its static arguments substituted; a functional
    // method's self type is read as its trait.
    def listed(t: Type): Option[List[Type]] = t match {
      case tt: TraitType => ta.typeCons(tt.getName) match {
        case ti: ProperTraitIndex if !ti.comprisesTypes.isEmpty && !NU.isComprisesEllipses(ti.ast) =>
          val cs = ta.comprisesClause(tt)
          if (cs.size != ti.comprisesTypes.size) None else Some(canon(cs.toList))
        case _ => None
      }
      case ts: TraitSelfType => listed(ts.getNamed)
      case _ => None
    }
    (positions(sa.makeDomainWithSelfFromArrow(fa)), positions(sa.makeDomainWithSelfFromArrow(ga))) match {
      case (Some(fs), Some(gs)) if fs.size == gs.size =>
        var cuts = 0
        var work: List[(Part, Set[Part])] = List((fs.zip(gs).map { case (a, b) => canon(List(a, b)) }, Set[Part]()))
        while (!work.isEmpty) {
          val (p, path) = work.head
          work = work.tail
          if (!empty(p) && !covered(p)) {
            val cut = p.indices.view.flatMap(i => p(i).view.flatMap(c => listed(c).map(ls => (i, c, ls)))).headOption
            cut match {
              case None => return false
              case Some((i, c, ls)) =>
                cuts += 1
                if (cuts > coverageCuts || path.contains(p)) return false
                work = ls.map(l => (p.updated(i, canon(p(i).filter(_ != c) :+ l)), path + p)) ++ work
            }
          }
        }
        true
      case _ => false
    }
  }

//   def satisfiesReturnTypeRule(x: ArrowType, y: ArrowType): Boolean =
//     (alphaRenameTypeSchema(x, ta.extend(toList(x.getInfo.getStaticParams), None).env),
//      alphaRenameTypeSchema(y, ta.extend(toList(y.getInfo.getStaticParams), None).env)) match {
//       case (fa@SArrowType(STypeInfo(s1, p1, sp1, w1), d1, r1, e1, i1, m1), 
// 	    ga@SArrowType(STypeInfo(s2, p2, sp2, w2), d2, r2, e2, i2, m2)) =>
// 	val fd = sa.makeDomainWithSelfFromArrow(fa)
// 	val gd = sa.makeDomainWithSelfFromArrow(ga)
// 	val solution = sa.subEDsolution(fd, gd)
// 	if (solution.isEmpty)
// 	  true
// 	else {
//           // Build the special arrow that we use when checking the return type rule
// 	  val spCombined = sp1 ++ sp2
// 	  val nta = ta.extend(spCombined, None)
// 	  val ntsa = new TypeSchemaAnalyzer()(nta)
// 	  val ra = ntsa.normalizeUA(SArrowType(STypeInfo(s1, p1, spCombined, None), nta.meet(d1,d2), r2, nta.mergeEffect(e1,e2), i1 && i2, None))
// 	  val result = sa.subtypeUA(fa, ra)
// 	  if (!result) {
// 	    println("fa = " + typeToString(fa))
// 	    println("ga = " + typeToString(ga))
// 	    println("ra = " + typeToString(ra))
// 	    println("result = " + result + "\n")
// 	  }
// 	  result
// 	}
//     }


// //   // The special arrow that we use when checking the return type rule
//   def returnUA(x: ArrowType, y: ArrowType) =
//     (alphaRenameTypeSchema(x, ta.extend(toList(x.getInfo.getStaticParams), None).env),
//      alphaRenameTypeSchema(y, ta.extend(toList(y.getInfo.getStaticParams), None).env)) match {
//       case (xa@SArrowType(STypeInfo(s1, p1, sp1, w1), d1, r1, e1, i1, m1), 
//             ya@SArrowType(STypeInfo(s2, p2, sp2, w2), d2, r2, e2, i2, m2)) =>
// //         println("returnUA: " + xa + "[" + sp1 + "] and " + ya + "[" + sp2 + "]")
// 	 val spCombined = sp1 ++ sp2
// 	 val nta = ta.extend(spCombined, None)
// 	 val ntsa = new TypeSchemaAnalyzer()(nta)
//          ntsa.normalizeUA(SArrowType(STypeInfo(s1, p1, spCombined, None), nta.meet(d1,d2), r2, nta.mergeEffect(e1,e2), i1 && i2, None))
//     }
  
//   def satisfiesReturnTypeRule(fa: ArrowType, ga: ArrowType): Boolean = {
//     if(!lteq(fa, ga))
//       true
//     else {
//       val ra = returnUA(fa, ga)
//       val result = sa.subtypeUA(fa, ra)
//       if (!result) {
// 	println("fa = " + typeToString(fa))
// 	println("ga = " + typeToString(ga))
// 	println("ra = " + typeToString(ra))
// 	println("result = " + result + "\n")
//       }
//       result
//     }
//   }


//   def satisfiesReturnTypeRule(fa: ArrowType, ga: ArrowType): Boolean = {
//     if(!lteq(fa, ga))
//       true
//     else {
//       val ra = sa.returnUA(fa, ga)
//       val result = sa.subtypeUA(fa, ra)
//       if (!result) {
// 	println("fa = " + typeToString(fa))
// 	println("ga = " + typeToString(ga))
// 	println("ra = " + typeToString(ra))
// 	println("result = " + result + "\n")
//       }
//       result
//     }
//   }
  
  // Checks when domain of f excludes domain of g
  def excludes(f: Functional, g: Functional): Boolean = {
    val fa = makeArrowFromFunctional(f, true).get
    val ga = makeArrowFromFunctional(g, true).get
    excludes(fa, ga)
  }

  def excludes(fa: ArrowType, ga: ArrowType): Boolean = {
    val fd = sa.makeDomainWithSelfFromArrow(fa)
    val gd = sa.makeDomainWithSelfFromArrow(ga)
    val md = sa.meetED(fd, gd)
    sa.subtypeED(md, BOTTOM)
  }
  
//   //Checks whether f is the meet of g and h
//   def isMeet(f: Functional, g: Functional, h: Functional): Boolean = {
//     val fa = makeArrowFromFunctional(f, true).get
//     val ga = makeArrowFromFunctional(g, true).get
//     val ha = makeArrowFromFunctional(h, true).get
//     isMeet(fa, ga, ha)
//   }
  
  //Checks whether f is the meet of g and h
  def isMeet(fa: ArrowType, ga: ArrowType, ha: ArrowType, isMethod: Boolean, debug:Boolean = false): Boolean = {
    val fd = sa.makeDomainFromArrow(fa, isMethod)
    val gd = sa.makeDomainFromArrow(ga, isMethod)
    val hd = sa.makeDomainFromArrow(ha, isMethod)
    val md = sa.meetED(gd, hd, debug)
//     println("isMeet: fd = " + typeToString(fd))
//     println("        gd = " + typeToString(gd))
//     println("        hd = " + typeToString(hd))
//     println("        md = " + typeToString(md))
    val result = sa.equivalentED(fd, md)
    if (debug) {
       println("isMeet: fd = " + typeToString(fd))
       println("        gd = " + typeToString(gd))
       println("        hd = " + typeToString(hd))
       println("        md = " + typeToString(md))
       println(result)
    }
//     println("    result = " + result)
    result
  }
  
  sealed trait COMPARISON_RESULT {}
  case object NO_RELATION extends COMPARISON_RESULT {}
  case object OVERLOADS extends COMPARISON_RESULT {}
  case object NARROWS extends COMPARISON_RESULT {}
  case object JUST_SHADOWS extends COMPARISON_RESULT {}
  
  def compare(f: Functional, g: Functional): COMPARISON_RESULT = (f, g) match {
    case (f: HasSelfType, g: HasSelfType) =>
      val (fPTSS, tFST, fSI) = paramTypeWithoutSelf(f)
      val fST = removeSelf(tFST)
      val (uGPTSS, uGST, gSI) = paramTypeWithoutSelf(g)
      if(fSI != gSI)
        return NO_RELATION
      val (fSPJ, gSPJ) = (f.staticParameters, g.staticParameters)
      val (fSPS, gSPS) = (toList(fSPJ), toList(gSPJ))
      val (fSA, gSA) = (staticParamsToArgs(fSPJ), staticParamsToArgs(gSPJ))
      val (fTA, gTA) = (ta.extend(gSPS, None), ta.extend(fSPS, None))
      if(!staticArgsMatchStaticParams(toList(fSA), gSPS)(fTA) || 
         !staticArgsMatchStaticParams(toList(gSA), fSPS)(gTA))
        return NO_RELATION
      val fSA_for_gSP = new StaticTypeReplacer(fSPJ, gSA)
      val (gPTSS, gST) = (fSA_for_gSP.replaceIn(uGPTSS), fSA_for_gSP.replaceIn(removeSelf(uGST)))
      val (fRT, gRT) = (f.getReturnType.unwrap, fSA_for_gSP.replaceIn(g.getReturnType.unwrap))
      val fST_strictlySub_gST = isTrue(fTA.subtype(fST, gST)) && !isTrue(fTA.subtype(gST,fST))
      val gDTSS_sub_fDTSS = isTrue(fTA.subtype(gPTSS, fPTSS))
      val fDTSS_sub_gDTSS = isTrue(fTA.subtype(fPTSS, gPTSS))
      val fRT_eq_gRT = isTrue(fTA.equivalent(fRT, gRT))
      (fST_strictlySub_gST, gDTSS_sub_fDTSS, fDTSS_sub_gDTSS, fRT_eq_gRT) match {
        case (false, _, _, _) => NO_RELATION
        case (true, true, false, _) => JUST_SHADOWS
        case (true, true, true, false) => NARROWS
        case (true, true, true, true) => OVERLOADS
      }
    case _ =>
      bug("Should only be used on methods and functional methods.")
  }
  
  def narrows(f: Functional, g: Functional) = compare(f, g) match {
    case NARROWS => true
    case _ => false
  }
  
  def shadows(f: Functional, g: Functional) = compare(f, g) match {
    case NO_RELATION => false
    case _ => true
  }
  
  def overloads(f: Functional, g: Functional) = compare(f, g) match {
    case OVERLOADS => true
    case _ => false
  }
  
  private def removeSelf(x: SelfType) = x match {
    case STraitSelfType(_, tt, _) => tt
    case _ => x
  }
  
  /* TODO: REMOVE THE FOLLOWING FUNCTIONS
   * They are currently being used by the code generator in a very undisciplined way
   */
  
  
  // drc, trying to figure out Scala
  def getParamType(f: Functional, i:Int): Type = {
    val fa = makeArrowFromFunctional(f, true).get
    val fd = sa.makeDomainFromArrow(fa)
    val fp = sa.makeParamFromDomain(fd, i)
    // Watch out, do we need to strip self type?
    fp
  }
  
  // Checks when f is more specific than g in a particular parameter.
  // drc, trying to figure out Scala
  def getDomainType(f: Functional): Type = {
    val fa = makeArrowFromFunctional(f, true).get
    val fd = sa.makeDomainFromArrow(fa)
    // Watch out, do we need to strip self type?
    fd
  }
  
  def getNoSelfDomainType(f: Functional): Type = {
    // might be better calling makeArrowWithoutSelfFromFunctional
    val fa = makeArrowFromFunctional(f, true, true, None).get
    val fd = sa.makeDomainFromArrow(fa)
    fd
  }
  
  def getRangeType(f: Functional): Type = {
    val fa = makeArrowFromFunctional(f, true).get
    val fd = sa.makeRangeFromArrow(fa)
    // Watch out, do we need to strip self type?
    fd
  }
  
  // Convenience function when domains have been extracted from arrows
  // already.
  def lteq(fd: Type, gd: Type) = {
      sa.subtypeED(fd, gd)
  }
  
}

