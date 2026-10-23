/*******************************************************************************
    Copyright 2009,2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.scala_src.types

import _root_.java.util.{List => JavaList}
import _root_.edu.rice.cs.plt.tuple.{Option => JavaOption}
// import com.sun.fortress.compiler.index._
import com.sun.fortress.compiler.index.ApiIndex
import com.sun.fortress.compiler.index.ComponentIndex
import com.sun.fortress.compiler.index.Function
import com.sun.fortress.compiler.index.Functional
import com.sun.fortress.compiler.index.FunctionalMethod
import com.sun.fortress.compiler.index.HasSelfType
import com.sun.fortress.compiler.index.Method
import com.sun.fortress.compiler.index.TraitIndex
import com.sun.fortress.compiler.index.TypeConsIndex
import com.sun.fortress.compiler.index.ObjectTraitIndex
import com.sun.fortress.compiler.index.ProperTraitIndex
import com.sun.fortress.compiler.index.TypeAliasIndex

import com.sun.fortress.compiler.WellKnownNames
import com.sun.fortress.compiler.Types.ANY
import com.sun.fortress.compiler.Types.BOTTOM
import com.sun.fortress.compiler.Types.OBJECT
import com.sun.fortress.exceptions.CompilerBug.bug
import com.sun.fortress.nodes._
import com.sun.fortress.nodes_util.ErrorMsgMaker
import com.sun.fortress.nodes_util.NodeFactory.typeSpan
import com.sun.fortress.nodes_util.{NodeFactory => NF}
import com.sun.fortress.nodes_util.{NodeUtil => NU}
import com.sun.fortress.repository.ProjectProperties

import com.sun.fortress.scala_src.nodes._
import com.sun.fortress.scala_src.typechecker._
import com.sun.fortress.scala_src.typechecker.Formula._
import com.sun.fortress.scala_src.typechecker.staticenv.KindEnv
import com.sun.fortress.scala_src.typechecker.TraitTable
import com.sun.fortress.scala_src.types.TypeAnalyzerUtil._
import com.sun.fortress.scala_src.useful.ErrorLog
import com.sun.fortress.scala_src.useful.Lists._
import com.sun.fortress.scala_src.useful.Maps._
import com.sun.fortress.scala_src.useful.Options._
import com.sun.fortress.scala_src.useful.Pairs
import com.sun.fortress.scala_src.useful.Sets._
import com.sun.fortress.scala_src.useful.STypesUtil._
import com.sun.fortress.useful.NI

import com.sun.fortress.scala_src.useful.ASTGenHelper._

import scala.math.max

class TypeAnalyzer(val traits: TraitTable, val env: KindEnv) extends BoundedLattice[Type]{
  
  private final val debugSubtype = ProjectProperties.getBoolean("fortress.debug.analyzer.subtype", false)
  private final val cacheSubtypes = ProjectProperties.getBoolean("fortress.analyzer.subtype.cache", true)
  private final val cacheExcludes = ProjectProperties.getBoolean("fortress.analyzer.excludes.cache", true)
  private final val cacheNormalizeTrait = ProjectProperties.getBoolean("fortress.analyzer.normalize.trait.cache", true)
  private final val cacheNormalizeVar = ProjectProperties.getBoolean("fortress.analyzer.normalize.var.cache", true)
  private final val cacheNormalizeTuple = ProjectProperties.getBoolean("fortress.analyzer.normalize.tuple.cache", true)
  private final val cacheNormalizeArrow = ProjectProperties.getBoolean("fortress.analyzer.normalize.arrow.cache", true)
  private final val cacheNormalizeOther = ProjectProperties.getBoolean("fortress.analyzer.normalize.Other.cache", true)
  
  type hType = (Boolean, Boolean, Type, Type)
  implicit val ta: TypeAnalyzer = this
  
  def top = ANY
  def bottom = BOTTOM

  def lteq(x: Type, y: Type): Boolean =  isTrue(subtype(x, y))
  def meet(x: Type, y: Type): Type = meet(List(x, y))
  def meet(x: Iterable[Type]): Type = normalize(makeIntersectionType(x))
  def join(x: Type, y: Type): Type = join(List(x, y))
  def join(x: Iterable[Type]): Type = normalize(makeUnionType(x))

  protected def pMeet(x: Type, y: Type)(implicit history: Set[hType]): Type = pNorm(makeIntersectionType(List(x, y)))

  def subtype(x: Type, y: Type): CFormula =
    sub(normalize(x), normalize(y))(Set())
  
  protected def sub(x: Type, y: Type)(implicit history: Set[hType]): CFormula = 
    pSub(x, y)(false, history)
    
  def notSubtype(x: Type, y: Type): CFormula = 
    nsub(normalize(x), normalize(y))(Set())
  
  protected def nsub(x: Type, y: Type)(implicit history: Set[hType]): CFormula = 
    pSub(x, y)(true, history)

  private val pSubMemo = new scala.collection.mutable.HashMap[(Type, Type, Boolean, Set[hType]), CFormula]()

  private var pSubDepthForPrinting: Int = 0
  private final val indentationPadding = "   |   |   |   |   |   |   |   |   |   |"

  protected def pSub(x: Type, y: Type)(implicit negate: Boolean, history: Set[hType]): CFormula = {
     val savedDepthForPrinting = pSubDepthForPrinting
     val indentation = indentationPadding.take(savedDepthForPrinting % indentationPadding.size)
     if (debugSubtype) {
//         System.err.println(indentation + "psub > (" + x.getClass + "!" + x + ", " + y.getClass + "!" + y + ", " + negate + "), history=" + history)
//         System.err.println(indentation + "psub > (" + x.getClass + "!" + x + ", " + y.getClass + "!" + y + ", " + negate + "), env=" + env)
         System.err.println(indentation + "psub > (" + x + ", " + y + ", " + negate + "), env=" + env)
         pSubDepthForPrinting += 1
	 if (pSubDepthForPrinting > 50) bug(x, "pSub stack getting too big!")
     }
     val rval = if (x == y)
           pTrue()
         else if (cacheSubtypes && !opensSizes(x))
           traits.groundAnswer(true, x, y, negate) match {
            case null => pSubMemo.get((x, y, negate, history)) match {
              case Some(v) => traits.readContext(); v
              case _ =>
                val before = traits.contextReads
                val result = pSubInner(x,y)
                pSubMemo += ((x, y, negate, history) -> result)
                traits.ground(true, x, y, negate, before, result)
                result
            }
            case v => v
           }
         else pSubInner(x,y)
     if (debugSubtype) {
         System.err.println(indentation + "psub < (" + x + ", " + y + ", " + negate + ") RETURNS " + rval)
         pSubDepthForPrinting = savedDepthForPrinting
     }
     rval
  }

  protected def pSubInner(x: Type, y: Type)(implicit negate: Boolean, history: Set[hType]): CFormula = (x, y) match {
    // case (s,t) if (s==t) => pTrue() // moved up before cache for speed
    case (s: BottomType, _) => pTrue()
    case (s, t: AnyType) => pTrue()
    // Intersection types
    case (s, SIntersectionType(_,ts)) =>
      pAnd(ts.map(pSub(s, _)))  
    // An intersection bounds an inference variable from below as a whole
    case (s: IntersectionType, t: _InferenceVarType) => pLowerBound(t, s)
    case (SIntersectionType(_,ss), t) => {
//       val specialTerm =
//         if (ss.size > 0 && ss.exists(!_.isInstanceOf[ArrowType])) pTrue()
//         else pSub(NF.makeArrowType(NU.getSpan(x),
// 				   NF.makeIntersectionType(toJavaSet(ss.map(_.asInstanceOf[ArrowType].getDomain))),
// 				   NF.makeUnionType(toJavaSet(ss.map(_.asInstanceOf[ArrowType].getRange)))),
//                   t)
//       pOr(pOr(pOr(ss.map(pSub(_, t))), specialTerm),
//           pOr(Pairs.distinctPairsFrom(ss).map(tt => pExc(tt._1, tt._2)))) // The second constraint is the only time exclusion is called during subtype checking
      pOr(pOr(ss.map(pSub(_, t))),
          pOr(Pairs.distinctPairsFrom(ss).map(tt => pExc(tt._1, tt._2)))) // The second constraint is the only time exclusion is called during subtype checking
    }
    // Union types
    case (SUnionType(_,ss), t) =>
      pAnd(ss.map(pSub(_, t)))
    case (s: TraitType, t@SUnionType(_, ts)) =>
      val unionResult = pOr(ts.map(pSub(s, _)))
      comprisedTypes(s) match {
        case Some(cs) => pOr(unionResult, pAnd(cs.map(pSub(_, t)))) 
        case None => unionResult
      }
    // An inference variable below a union is bounded by the union as a whole: split,
    // a solution that holds only of the whole union, as a type variable bounded by
    // it, is lost, and the solver meets a disjunction it cannot unify.
    case (s: _InferenceVarType, t: UnionType) if !negate => pUpperBound(s, t)
    // A type variable is below a union where its bound is, as well as where it is
    // below one of the union's members.
    case (s@SVarType(_, id, _), t@SUnionType(_, ts)) if !negate =>
      val split = pOr(ts.map(pSub(s, _)))
      val hEntry = (negate, true, s, t)
      traits.readContext()
      if (history.contains(hEntry)) split
      else {
        val nHistory = history + hEntry
        val supers = pNorm(makeIntersectionType(toListFromImmutable(staticParam(id).getExtendsClause)))(nHistory)
        pOr(split, pSub(supers, t)(negate, nHistory))
      }
    case (s, SUnionType(_, ts)) =>
      pOr(ts.map(pSub(s, _)))
    // We must eliminate trait self types before making constraints  
    case (s: TraitSelfType, t) => pSub(removeSelf(s), t)
    case (s, STraitSelfType(_, named, _)) => pSub(s,named)
    // Inference variables
    case (s: _InferenceVarType, t: _InferenceVarType) =>
      pAnd(pUpperBound(s, t), pLowerBound(t,s))
    case (s: _InferenceVarType, t) => pUpperBound(s,t)
    case (s, t: _InferenceVarType) => pLowerBound(t,s)
    /* Type variables are special for several reasons
     *  1) Getting the bound out of a type variable is the only place where a type can increase in size during type checking.
     *     We use the history to ensure termination.
     *  2) They are the only place where you cannot negate using de Morgan's. There is a good explanation of why in the OOPSLA paper.
     */
    case (s@SVarType(_, sid, _), t@SVarType(_, tid, _)) if (sid == tid 
        // || sid.asInstanceOf[Id].getText == tid.asInstanceOf[Id].getText
        ) => True
            
    case (s@SVarType(_, id, _), t) =>
      val hEntry = (negate, true, s, t)
      traits.readContext()
      if (history.contains(hEntry)) {
        False
      } else {
        val nHistory = history + hEntry
        val sParam = staticParam(id)

        def stdResult () =  {
          if (negate) {        
//	               println("pSubInner 0: FALSE")
		       pFalse()(!negate)
		     } else {
		       // Using pNorm causes the current history to be passed down
		       val supers = pNorm(makeIntersectionType(toListFromImmutable(sParam.getExtendsClause)))(nHistory)
//	               println("pSubInner 1: supers = " + supers)
		       pSub(supers, t)(negate, nHistory)
                     }
        }
        
        val result = 
          if (t.isInstanceOf[VarType]) {
        	  val v = t.asInstanceOf[VarType].getName()
              val lowerParam = staticParam(v)
              if (!lowerParam.getDominatesClause().isEmpty()) { 
                val lowers = pNorm(makeUnionType(toListFromImmutable(lowerParam.getDominatesClause)))(nHistory)
                pSub(s,lowers)
              } else {stdResult()}
        } else {stdResult()} 
        
        
//	ErrorMsgMaker.printHashCodes = true
//	println("...and the result of the recursive pSub is " + result)
//	ErrorMsgMaker.printHashCodes = false
        result
      }
    case (s, t@SVarType(_, id, _)) =>
      val hEntry = (negate, true, s, t)
      traits.readContext()
      if (history.contains(hEntry))
        False
      else {
        val nHistory = history + hEntry
        val sParam = staticParam(id)
        val result = if (negate) {
		       // Using pNorm causes the current history to be passed down
		       val supers = pNorm(makeIntersectionType(toListFromImmutable(sParam.getExtendsClause)))(nHistory)
//	               println("pSubInner 2: supers = " + supers)
		       pSub(s, supers)(negate, nHistory)
		     } else {
//	               println("pSubInner 3: BOTTOM")
		       pSub(s, BOTTOM)
                     }
//            ErrorMsgMaker.printHashCodes = true
//            println("...and the result of the recursive pSub is " + result)
//            ErrorMsgMaker.printHashCodes = false
        result
      }
    // Trait types
    // Every trait type is an Object but the library's Index, which extends Any as Object does.
    case (s: TraitType, t: TraitType) if (t==OBJECT) && !isLibraryIndex(s) => pTrue()
    
    case (STraitType(_,traitId_1,staticArgs_1,_),STraitType(_,traitId_2,staticArgs_2,_)) 
    	if (typeCons(traitId_1)==typeCons(traitId_2)) =>

     // First, let's find the static parameters for trait traitId_1
	  
     val idx = traits.declaredTypeCons(traitId_1.getText())
     val staticParams = scalaify(idx.unwrap().staticParameters()).asInstanceOf[List[StaticParam]]

     val args = staticParams.zip(staticArgs_1.zip(staticArgs_2))
     def cmp (param: StaticParam, args: (StaticArg,StaticArg)): CFormula = {
       if (param.getVariance() == 1)
         pSub(args._1.asInstanceOf[TypeArg].getTypeArg(),args._2.asInstanceOf[TypeArg].getTypeArg())
       else if (param.getVariance == -1)
         pSub(args._2.asInstanceOf[TypeArg].getTypeArg(),args._1.asInstanceOf[TypeArg].getTypeArg())
       else
         pEqv(args._1,args._2)
     }
     val formulas : List[CFormula] = args.map(e => cmp(e._1,e._2))
     pAnd(formulas)
    
    //case (STraitType(_, n1, a1,_), STraitType(_, n2, a2, _)) if (typeCons(n1)==typeCons(n2)) =>
      // println("checking " + a1 + " vs " + a2)
      //pAnd((a1, a2).zipped.map((a, b) => pEqv(a, b)))
    // A trait whose comprises clause lists a type at where-clause sizes, as
    // comprises { N[\n\] } where [\nat n\], is below t also when each listed
    // type is, its sizes opened: a value passed where N[\m\] is expected binds m
    // to its own size for that call.  A listed type extends the trait, so
    // the trait is opened once on each path.
    case (s: TraitType, t: TraitType) if opensSizes(s) =>
      val parentResult = withConditionalParents(s, pOr(parents(s).map(pSub(_, t))), pSub(_, t))
      val hEntry = (negate, true, s, t)
      traits.readContext()
      if (history.contains(hEntry)) parentResult
      else comprisedTypes(s) match {
        case Some(cs) => pOr(parentResult, pAnd(cs.map(pSub(_, t)(negate, history + hEntry))))
        case None => parentResult
      }
    case (s:TraitType , t: TraitType) =>
      // println("checking " + s + " <: " + t)
      val par = parents(s)
      // println(s + " has parents " + par)
      // A parent whose comprises clause lists types at a type where-clause variable
      // is not opened on the way up: s is one value, not every listed type.  A parent
      // that opens only sizes is opened as before.
      def throughParent(p: BaseType): CFormula = p match {
        case p: TraitType if opensTypes(p) && !(t.getName.getText == p.getName.getText) =>
          pOr(parents(p).map(pSub(_, t)))
        case p => pSub(p, t) }
      val parentResult = pOr(par.map(throughParent))
//       comprisedTypes(s) match {   // Gets a stack overflow error; maybe we don't need this in practice.  GLS 6/6/12
//         case Some(cs) => pOr(parentResult, pAnd(cs.map(c => parents(c.asInstanceOf[TraitType]).filter(!lteq(_,s)).map(pSub(_, t))).flatten))
//         case None => parentResult
//       }
      withConditionalParents(s, parentResult, throughParent)
    case (s: ObjectExprType, t) => pSub(removeSelf(s), t)
    // Arrow types
    case (SArrowType(_, d1, r1, e1, i1, _), SArrowType(_, d2, r2, e2, i2, _)) =>
      pAnd(pAnd(pSub(d2, d1), pSub(r1, r2)), pSub(e1, e2))
    // Tuple types
    // TODO: Handle keywords
    case (s@STupleType(_, e1, None, _), t@STupleType(_, e2, Some(mv2), _)) =>
      pSub(s, disjunctFromTuple(t, e1.size))
    case (s@STupleType(_, e1, Some(v1), _), t@STupleType(_, e2, _, _)) =>
      pAnd(pSub(disjunctFromTuple(s, e1.size), disjunctFromTuple(t, e1.size)),
           pSub(disjunctFromTuple(s, e2.size + 1), disjunctFromTuple(t, e2.size + 1)))
    case (s@STupleType(_, e1, None, _), t@STupleType(_, e2, None, _)) if e1.size == e2.size =>
      pOr(pOr(e1.map(pEqv(_, BOTTOM))), pAnd((e1,e2).zipped.map((a, b) => pSub(a, b))))
    // A tuple type whose element types are all subtypes of the library's Index is a subtype of Index.
    case (s@STupleType(_, e1, None, _), t: TraitType) if e1.nonEmpty && isLibraryIndex(t) =>
      pOr(pOr(e1.map(pEqv(_, BOTTOM))), pAnd(e1.map(pSub(_, t))))
    case (s@STupleType(_, e1, _, _), t) =>
      pOr(e1.map(pEqv(_, BOTTOM)))
    case (s, t:TupleType) => 
      pSub(s, disjunctFromTuple(t,1))
    case _ => pFalse()
  }
  
  /* This is not yet hooked into pSub
  protected def sub(x: List[KeywordType], y: List[KeywordType]): CFormula = {
    def toPair(k: KeywordType) = (k.getName, k.getKeywordType)
    val xmap = Map(x.map(toPair):_*)
    val ymap = Map(y.map(toPair):_*)
    def compare(id: Id) = (xmap.get(id), ymap.get(id)) match {
      case (None, _) => True
      case (Some(s), Some(t)) => sub(s, t)
      case _ => False
    }
    and(xmap.keys.map(compare))
  }
 */

  protected def pSub(x: Effect, y: Effect)(implicit negate: Boolean, history: Set[hType]): CFormula = {
    val (SEffect(_, tc1, io1), SEffect(_, tc2, io2)) = (x,y)
    pAnd(pFromBoolean(!io1 || io2),
         pSub(makeUnionType(tc1.getOrElse(Nil)), makeUnionType(tc2.getOrElse(Nil))))
  }
  
  def equivalent(x: Type, y: Type): CFormula = eqv(normalize(x), normalize(y))(Set())
  
  protected def eqv(x: Type, y: Type)(implicit history: Set[hType]): CFormula = 
    pEqv(x, y)(false, history)
  
  protected def pEqv(x: Type, y: Type)(implicit negate: Boolean, history: Set[hType]) = 
    pAnd(pSub(x,y), pSub(y,x))
  
  def notEquivalent(x: Type, y: Type): CFormula = nEqv(normalize(x), normalize(y))(Set())
  
  protected def nEqv(x: Type, y: Type)(implicit history: Set[hType]): CFormula = 
    pEqv(x, y)(true, history)
  
  protected def pEqv(x: StaticArg, y: StaticArg)(implicit negate: Boolean, history: Set[hType]): CFormula = (x,y) match {
    case (a,b) if (a==b) => pTrue()
    case (STypeArg(_, _, s), STypeArg(_, _, t)) => pEqv(s, t)
    case (SOpArg(_, _, o), SOpArg(_, _, p)) => pEqv(o, p)
    case (SIntArg(_, _, m), SIntArg(_, _, n)) => pEqv(m, n)
    // Not handling all static args properly yet
    case (_: BoolArg, _: BoolArg) => pTrue()
    case (_: DimArg, _: DimArg) => pTrue()
    case (_: UnitArg, _: UnitArg) => pTrue()
    case _ => pFalse()
  }
  
  def equivalent(x: Op, y: Op): CFormula = pEqv(normalize(x), normalize(y))(false)
  def notEquivalent(x: Op, y: Op): CFormula = pEqv(normalize(x), normalize(y))(true)
  
  protected def pEqv(x: Op, y: Op)(implicit negate: Boolean): CFormula = (x, y) match {
    case (a, b) if (a==b) => pTrue()
    case (a: _InferenceVarOp, b: _InferenceVarOp) => and(pEquivalent(a, b), pEquivalent(b, a))
    case (a: _InferenceVarOp, b) => pEquivalent(a, b)
    case (a, b: _InferenceVarOp) => pEquivalent(b, a)
    case _ => pFalse()
  }

  def equivalent(x: IntExpr, y: IntExpr): CFormula = pEqv(x, y)(false)
  def notEquivalent(x: IntExpr, y: IntExpr): CFormula = pEqv(x, y)(true)

  // Sizes are equal when their written forms are, once numerals are folded;
  // they differ when nDiffer says so; otherwise neither is known
  protected def pEqv(x: IntExpr, y: IntExpr)(implicit negate: Boolean): CFormula = (foldSize(x), foldSize(y)) match {
    case (a, b) if nEq(a, b) => pTrue()
    case (a: _InferenceVarInt, b: _InferenceVarInt) => and(pEquivalent(a, b), pEquivalent(b, a))
    case (a: _InferenceVarInt, b) => pEquivalent(a, b)
    case (a, b: _InferenceVarInt) => pEquivalent(b, a)
    case (a, b) if nDiffer(a, b) => pFalse()
    case _ => False
  }
  
  def excludes(x: Type, y: Type): CFormula =
    exc(normalize(removeSelf(x)), normalize(removeSelf(y)))(Set())
    
  protected def exc(x: Type, y: Type)(implicit history: Set[hType]): CFormula = 
    pExc(x,y)(false, history)
    
  def definitelyExcludes(x: Type, y: Type): Boolean =
    isTrue(excludes(x,y))

  // dExc's answers in this analyzer, by the question with its inference variables renamed apart:
  // an answer is the same under every renaming of them, so a question asked again with fresh
  // variables, as each inference makes them, is computed once. An answer is kept only from an empty
  // cycle history, marked if its computation read the context, so that a hit on it is a read of the
  // context too, and shared through the trait table if it read none; a computation that opened a
  // size is not kept.
  private final val cacheExclusions = ProjectProperties.getBoolean("fortress.analyzer.exclusion.cache", true)
  private val exclusionMemo = new scala.collection.mutable.HashMap[(Type, Type), (Boolean, Boolean)]()

  def dExc(x: Type, y: Type)(implicit history: Set[hType]): Boolean =
    if (!cacheExclusions || !history.isEmpty) isTrue(exc(x,y))
    else TypeAnalyzer.renamedApart(x, y) match {
      case None => isTrue(exc(x,y))
      case Some(question) => exclusionMemo.get(question) match {
        case Some((v, contextual)) => if (contextual) traits.readContext(); v
        case None => traits.sharedExclusion(question) match {
          case null =>
            val before = traits.contextReads
            val opened = openedSizeCount
            val result = isTrue(exc(x,y))
            if (openedSizeCount == opened) {
              val contextual = traits.contextReads != before
              exclusionMemo += (question -> (result, contextual))
              if (!contextual) traits.shareExclusion(question, result)
            }
            result
          case shared =>
            exclusionMemo += (question -> (shared.booleanValue, false))
            shared.booleanValue
        }
      }
    }

  /*
   * Given two types x and y this method computes the constraints
   * under which x and y do not exclude one another. For example if
   * we have x=List[\$i\] and y=List[\$k\] then x and y exclude one another
   * unless $i=$j. Note that this method only generates equality constraints.
   */
  def notExcludes(x: Type , y: Type): CFormula = nExc(normalize(x), normalize(y))(Set())
    
  protected def nExc(x: Type, y: Type)(implicit history: Set[hType]): CFormula = 
    pExc(x,y)(true, history)
  
  /** Determine if a collection of types all exclude each other. */
  def allExclude(ts: Iterable[Type]): CFormula =
    and(Pairs.distinctPairsFrom(ts).map(tt => excludes(tt._1, tt._2)))
  
  def anyExclude(ts: Iterable[Type]):CFormula =
    or(Pairs.distinctPairsFrom(ts).map(tt => excludes(tt._1, tt._2)))


  private val pExcMemo = new scala.collection.mutable.HashMap[(Type, Type, Boolean, Set[hType]), CFormula]()
    
  protected def pExc(x: Type, y: Type)(implicit negate: Boolean, history: Set[hType]): CFormula = {
    if (x == y) pFalse()
    else if (cacheExcludes)
      traits.groundAnswer(false, x, y, negate) match {
        case null => pExcMemo.get((x, y, negate, history)) match {
          case Some(v) => traits.readContext(); v
          case _ =>
            val before = traits.contextReads
            val result = pExcInner(x,y)
            pExcMemo += ((x, y, negate, history) -> result)
            traits.ground(false, x, y, negate, before, result)
            result
        }
        case v => v
      }
    else pExcInner(x,y)
  }

  protected def pExcInner(x: Type, y: Type)(implicit negate: Boolean, history: Set[hType]): CFormula = (removeSelf(x), removeSelf(y)) match {
    case (s: BottomType, _) => pTrue()
    case (_, t: BottomType) => pTrue()
    case (s: AnyType, t) => pSub(t, BOTTOM)
    case (s, t: AnyType) => pSub(s, BOTTOM)
    case (s@SIntersectionType(_, elts), t) =>
      pOr(pSub(s, BOTTOM), pOr(elts.map(pExc(_, t))))
    case (s, t: IntersectionType) => exc(t, s)
    case (s@SUnionType(_, elts), t) =>
      pAnd(elts.map(pExc(_, t)))
    case (s, t: UnionType) => exc(t, s)
    case (i: _InferenceVarType, j: _InferenceVarType) if i==j => pFalse()
    case (i: _InferenceVarType, j: _InferenceVarType) => pAnd(pExclusion(i,j), pExclusion(j,i))
    case (i: _InferenceVarType, t) => pExclusion(i, t)
    case (s, j: _InferenceVarType) => pExc(j, s)
    case (s@SVarType(_, sid, _), t@SVarType(_, tid, _)) if (s==t || sid == tid) =>
      pOr(pSub(s, BOTTOM), pSub(t, BOTTOM))
    case (s@SVarType(_, id, _), t) =>
      val hEntry = (negate, false, s, t)
      traits.readContext()
      if (history.contains(hEntry))
        False
      else {
        val nHistory = history + hEntry
        val sParam = staticParam(id)
        val supers = pNorm(makeIntersectionType(toListFromImmutable(sParam.getExtendsClause)))
        if (negate) pFalse()(!negate) else pExc(supers, t)(negate, nHistory)
      }
    case (s, t:VarType) => exc(t, s)
    // TODO: Check what happens when stem s = stem t
    case (s: TraitType, t: TraitType) =>
      def checkEC(s: TraitType, t: TraitType): CFormula = {
        def cEC(s: TraitType, t: TraitType) = pOr(excludesClause(s).map(e => withClauseParams(e).pSub(t, e)))
        pOr(cEC(s, t), cEC(t, s))
      }
      def checkCC(s: TraitType, t: TraitType): CFormula = {
        def cCC(s: TraitType, t: TraitType): CFormula = {
          val scc = comprisesClause(s)
          pAnd(pFromBoolean(!scc.isEmpty), pAnd(scc.map(pExc(t,_))))
        }
        pOr(cCC(s, t), cCC(t, s))
      }
      def checkO(s: TraitType, t: TraitType): CFormula = {
        def cO(s: TraitType, t: TraitType): CFormula = typeCons(s.getName) match {
          case _:ObjectTraitIndex => pSub(s, t)(!negate, history)
          case _ => pFalse()
        }
        pOr(cO(s,t), cO(t,s))
      }
      def checkP(s: TraitType, t: TraitType): CFormula = {
        val sas = ancestors(s) ++ Set(s)
        val tas = ancestors(t) ++ Set(t)
        def cP(s: BaseType, t: BaseType): CFormula = (s, t) match {
          case (s@STraitType(_, n1, a1, _), t@STraitType(_, n2, a2, _)) if (n1 == n2) =>
            //Todo: Handle bool args
            pOr((a1, a2).zipped.map{
              case (STypeArg(_, _, t1), STypeArg(_, _, t2)) => pEqv(t1, t2)(!negate, history)
              case (SIntArg(_, _, i1: IntBase), SIntArg(_, _, i2: IntBase)) => pEqv(i1, i2)(!negate)
              case _ => pFalse()
            })
          case _ => pFalse()
        }
        pOr(for(sa <- sas; ta <- tas) yield cP(sa, ta))
      }
      pOr(List(checkEC(s,t), checkCC(s,t), checkO(s,t), checkP(s,t)))
    // ToDo: Handle keywords. Note that this will mean you can have a tuple of length 1 without varargs.
    case (s@STupleType(_, e1, Some(v1), _), t@STupleType(_, e2, mv2, _)) =>
        pExc(disjunctFromTuple(s, max(e1.size, e2.size)), t)
    case (s@STupleType(_, e1, None, _), t@STupleType(_, e2, Some(v2), _)) => pExc(t, s)
    case (STupleType(_, e1, None, _), STupleType(_, e2, None, _)) if (e1.size == e2.size) =>
      pOr((e1, e2).zipped.map((a, b) => pExc(a, b)))
    case (STupleType(_, e1, None, _), STupleType(_, e2, None, _)) =>
      pTrue()
    // A tuple type excludes the library's Index only where one of its element types excludes Index.
    case (STupleType(_, e1, None, _), t: TraitType) if e1.nonEmpty && isLibraryIndex(t) =>
      pOr(e1.map(pExc(_, t)))
    case (s: TupleType, t) => pExc(disjunctFromTuple(s, 1), t)
    case (s, t: TupleType) => pExc(t, s)
    case (s: ArrowType, t: ArrowType) => pFalse()
    case (s: ArrowType, t) => pTrue()
    case (s, t: ArrowType) => pExc(t, s)
  }
  
  protected def removeSelf(x: Type) = {
    object remover extends Walker {
      override def walk(y: Any): Any = y match {
        case t:TraitSelfType =>
          if (selfComprised(t).isEmpty)
            t.getNamed
          else
            NF.makeIntersectionType(t.getNamed, NF.makeMaybeUnionType(t.getComprised))
        case t:ObjectExprType => NF.makeMaybeIntersectionType(t.getExtended)
        case _ => super.walk(y)
      }
    }
    remover(x).asInstanceOf[Type]
  }
  /*
   * For is-subtype queries, it makes no sense to stir in the comprised types;
   * if this is a subtype, then so are they
   * (unless they are declared to exclude -- but does that matter?) 
   */
  protected def removeSelfAsSubtype(x: Type) = {
    object remover extends Walker {
      override def walk(y: Any): Any = y match {
        case t:TraitSelfType => t.getNamed
        case t:ObjectExprType => NF.makeMaybeIntersectionType(t.getExtended)
        case _ => super.walk(y)
      }
    }
    remover(x).asInstanceOf[Type]
  }

  /* The types that self's type t lists beside its trait, as this analyzer reads them: none
   * where the trait's comprises clause lists them at a where-clause variable that the kind
   * environment does not bind, as outside the trait's declaration, where a functional
   * method's signature is read. The trait comprises its listed types at every value of the
   * variable, so the trait type alone holds the values that its self type holds. */
  def selfComprised(t: TraitSelfType): List[NamedType] = {
    val comprised = toListFromImmutable(t.getComprised)
    if (comprised.isEmpty) Nil
    else t.getNamed match {
      case tt: TraitType => toOption(traits.typeCons(tt.getName)) match {
        case Some(ti: ProperTraitIndex) if whereSizes(ti).exists(w => {
            traits.readContext(); env.staticParam(w.getName).isEmpty }) => Nil
        case _ => comprised
      }
      case _ => comprised
    }
  }
  

  // Formula.reduce's answers in this analyzer, each marked if its computation read the context.
  // A reduction asks only this analyzer's public questions, each from an empty cycle history, so
  // its answer depends on the formula and this analyzer alone, and a hit on a marked answer is a
  // read of the context too. A reduction that opened a size is not kept: computed again, it
  // would open a fresh one.
  private final val cacheReduce = ProjectProperties.getBoolean("fortress.analyzer.reduce.cache", true)
  private val reduceMemo = new scala.collection.mutable.HashMap[CFormula, (CFormula, Boolean)]()

  def reduced(c: CFormula)(compute: => CFormula): CFormula =
    if (!cacheReduce) compute
    else reduceMemo.get(c) match {
      case Some((v, contextual)) => if (contextual) traits.readContext(); v
      case None =>
        val before = traits.contextReads
        val opened = openedSizeCount
        val result = compute
        if (openedSizeCount == opened) reduceMemo += (c -> (result, traits.contextReads != before))
        result
    }

  private val normalizeVarTypeMemo = new scala.collection.mutable.HashMap[Id, Any]()
  private val normalizeTraitTypeMemo = new scala.collection.mutable.HashMap[(Id, List[StaticArg]), Any]()
  private val normalizeTupleTypeMemo = new scala.collection.mutable.HashMap[(List[Type], Option[Type]), Any]()
  private val normalizeArrowTypeMemo = new scala.collection.mutable.HashMap[(Type, Type, Effect, Boolean), Any]()
  private val normalizeOtherTypeMemo = new scala.collection.mutable.HashMap[Any, Any]()
  // The normalize memos' keys whose value was computed by reading the context: a hit on one
  // is a read of the context too.
  private val contextualNorms = new scala.collection.mutable.HashSet[Any]()
  private def noteNorm(k: Any): Unit = if (contextualNorms.contains(k)) traits.readContext()
  private def markNorm(before: Long, ks: Any*): Unit = if (traits.contextReads != before) contextualNorms ++= ks

  def normalize(x: Type): Type = pNorm(x)(Set[hType]())

  protected def pNorm(x: Type)(implicit history: Set[hType]): Type = {
    object normalizer extends Walker {
      override def walk(y: Any): Any = y match {
        case t: VarType => walkVarType(t)
        case t: TraitType => walkTraitType(t)
        case t: TupleType => walkTupleType(t)
        case t: ArrowType => walkArrowType(t)
        case _ => walkOtherType(y)
      }
      def walkVarType(t: VarType) = {
        t match { case SVarType(_, n, _) =>
            if (cacheNormalizeVar)
              normalizeVarTypeMemo.get(n) match {
                case Some(v) => noteNorm(n); v
                case _ =>
                  val before = traits.contextReads
                  val result = walkVarTypeInner(t, n)
                  normalizeVarTypeMemo += (n -> result)
                  markNorm(before, n)
                  result
              }
            else walkVarTypeInner(t, n)
        }
      }
      def walkVarTypeInner(t: VarType, n: Id) = super.walk(t)
      def walkTraitType(t: TraitType) = {
        t match { case STraitType(_, n, a, _) =>
            if (cacheNormalizeTrait) {
              normalizeTraitTypeMemo.get((n, a)) match {
                case Some(v) => noteNorm((n, a)); v
                case _ =>
                  val before = traits.contextReads
                  walkTraitTypeInner(t, n, a) match {
                    case result@STraitType(_, _, aa, _) =>
                       normalizeTraitTypeMemo += ((n, a) -> result)
                       normalizeTraitTypeMemo += ((n, aa) -> result)
                       markNorm(before, (n, a), (n, aa))
                       result
                  }
              }
            }
            else walkTraitTypeInner(t, n, a)
        }
      }
      def walkTraitTypeInner(t: TraitType, n: Id, a: List[StaticArg]) = {
        typeCons(n) match {
          case ti: TypeAliasIndex =>
            val params = toListFromImmutable(ti.staticParameters)
            walk(substitute(a, params, ti.ast.getTypeDef))
          case _ => super.walk(t)
        }
      }
      def walkTupleType(t: TupleType) = {
        if (cacheNormalizeTuple)
          t match { case STupleType(_, e, vt, _) =>
              normalizeTupleTypeMemo.get((e, vt)) match {
                case Some(v) => noteNorm((e, vt)); v
                case _ =>
                  val before = traits.contextReads
                  walkTupleTypeInner(t) match {
                    case result@STupleType(_, ee, vtx, _) =>
                      normalizeTupleTypeMemo += ((e, vt) -> result)
                      normalizeTupleTypeMemo += ((ee, vtx) -> result)
                      markNorm(before, (e, vt), (ee, vtx))
                      result
                    case result =>
                      normalizeTupleTypeMemo += ((e, vt) -> result)
                      markNorm(before, (e, vt))
                      result
                  }
              }
          }
        else walkTupleTypeInner(t)
      }
      def walkTupleTypeInner(t: TupleType) = {
        //ToDo: Handle keywords
        super.walk(t) match {
          case STupleType(i, e, Some(v: BottomType), k) => STupleType(i, e, None, k)
          case STupleType(i, e, vt, k) if e.contains(bottom) => bottom
          case STupleType(i, e, None, Nil) if (e.size == 1) => e.head
          case _ => t
        }
      }
      def walkArrowType(t: ArrowType) = {
        if (cacheNormalizeArrow)
          t match { case SArrowType(_, d, r, e, i, _) =>
              normalizeArrowTypeMemo.get((d, r, e, i)) match {
                case Some(v) => noteNorm((d, r, e, i)); v
                case _ =>
                  val before = traits.contextReads
                  walkArrowTypeInner(t) match {
                    case result@SArrowType(_, dd, rr, ee, ii, _) =>
                      normalizeArrowTypeMemo += ((d, r, e, i) -> result)
                      normalizeArrowTypeMemo += ((dd, rr, ee, ii) -> result)
                      markNorm(before, (d, r, e, i), (dd, rr, ee, ii))
                      result
                  }
              }
          }
        else walkArrowTypeInner(t)
      }
      def walkArrowTypeInner(t: ArrowType) = super.walk(t)
      def walkOtherType(t: Any) = {
        if (cacheNormalizeOther)
          normalizeOtherTypeMemo.get(t) match {
            case Some(v) => noteNorm(t); v
            case _ =>
              val before = traits.contextReads
              val result = walkOtherTypeInner(t)
              normalizeOtherTypeMemo += (t -> result)
              markNorm(before, t)
              result
          }
        else walkOtherTypeInner(t)
      }
      def walkOtherTypeInner(t: Any) = t match {
        case u@SUnionType(_, e) =>
          val ps = e.flatMap(t => disjuncts(walk(t).asInstanceOf[Type]))
          makeUnionType(normDisjunct(ps))
        case i@SIntersectionType(_, e) =>
          val sop = cross(e.map(t => disjuncts(walk(t).asInstanceOf[Type])))
          val ps = sop.map(t => makeIntersectionType(normConjunct(t.flatMap(disjuncts))))
          makeUnionType(normDisjunct(ps))
        case o:Op => normalize(o)
        case _ => super.walk(t)
      }
    }
    // Here's the body: walk the type, and make sure it's a type when finished
    normalizer(x).asInstanceOf[Type]
  }
  
  protected def normConjunct(x: Iterable[Type])(implicit history: Set[hType]): List[Type] = {
    // A closed trait is replaced by the types its comprises clause lists that no other
    // conjunct excludes, only where that conjunct names no type or inference variable:
    // over a variable the union would be split by the union rule before the variable's
    // bound is read, and a solution that holds only of the union as a whole is lost.
    def excludedListed(c: Type) =
      x.exists(z => getVarTypes(z).isEmpty && !hasInferenceVars(z) && dExc(z, c))
    val cc = x.map(y => (y, y.isInstanceOf[TraitType] &&
                            comprisesClause(y.asInstanceOf[TraitType]).exists(excludedListed))).toList
    if (cc.exists(_._2))
      cc.map(z => { val (y, p) = z;
                    if (p) makeUnionType(comprisesClause(y.asInstanceOf[TraitType]).toList.flatMap(c => if (excludedListed(c)) None else Some(c)))
                    else y })
    else if (x.exists(y => x.exists(z => dExc(y, z))))
      List(BOTTOM)
    else {
      val ds = x.foldLeft(List[Type]())((l, a) => {
        val l2 = l.filter(x => !isTrue(sub(a, x)))
        l2 ++ (if (l2.exists(x => isTrue(sub(x, a)))) Nil else List(a))
      })
      val es = ds.map(_ match {
        case t:TupleType => Left(t)
        case s => Right(s)
      })
      val (ts, ss) = (for (Left(x) <- es) yield x, for (Right(x) <- es) yield x)
      ss ++ normTuples(ts)
    }
  }

  protected def normTuples(ts: List[TupleType])(implicit history: Set[hType]): List[TupleType] = ts match {
    case Nil => Nil
    case _ => List(ts.reduceLeft((a,b) => normTuples(a,b)))
  }

  //ToDo: Keywords
  protected def normTuples(x: TupleType, y: TupleType)(implicit history: Set[hType]): TupleType = (x,y) match {
    case (STupleType(_, e1, None, _), STupleType(_, e2, None, _)) =>
      STupleType(makeInfo(e1), (e1, e2).zipped.map((a,b) => pMeet(a,b)), None, Nil)
    case (STupleType(_, e1, None, _), STupleType(_, e2, Some(_), _)) =>
      normTuples(x, disjunctFromTuple(y, e1.size).asInstanceOf[TupleType])
    case (STupleType(_, e1, Some(_), _), STupleType(_, e2, None, _)) =>
      normTuples(disjunctFromTuple(x, e2.size).asInstanceOf[TupleType], y)
    case (STupleType(_, e1, Some(v1), _), STupleType(_, e2, Some(v2), _)) => {
      val ee1 = e1 ++ List.fill(e2.size - e1.size){v1}
      val ee2 = e2 ++ List.fill(e1.size - e2.size){v2}
      STupleType(makeInfo(e1), (ee1, ee2).zipped.map((a,b) => pMeet(a,b)), Some(pMeet(v1, v2)), Nil)
    }
  }

  protected def normDisjunct(xx: Iterable[Type])(implicit history: Set[hType]): List[Type] = {
      val x = xx.toList
      val result = x.foldLeft(List[Type]())((l, a) => {
        val l2 = l.filter(x => !isTrue(sub(x,a)))
        l2 ++ (if (l2.exists(x => isTrue(sub(a,x)))) Nil else List(a))
      })
      // println("normDisjunct:\n  " + x + "\n  " + result)
      result
  }
  
  // Operators that appear in OpArgs should just be unqualified names
  def normalize(x: Op): Op = x match {
    case SNamedOp(a, b, c, d, e) => SNamedOp(a, None, c, NF.unknownFix, e)
    case _ => x
  }

  protected def cross[T](x: Iterable[Iterable[T]]): Iterable[Iterable[T]] = {
    x.foldLeft(List(List[T]()))((l, a) => l.flatMap(b => a.map(b ++ List(_))))
  }
  
  def mergeEffect(x: Effect, y: Effect) = {
    val SEffect(i1, t1, io1) = x
    val SEffect(i2, t2, io2) = y
    val tc = meet(join(t1.getOrElse(Nil)), join(t2.getOrElse(Nil))) match {
      case t:BottomType => None
      case SUnionType(_, elts) => Some(elts)
      case t => Some(List(t))
    }
    //merge ASTNodeInfo?
    SEffect(i1, tc, io1 && io2)
  }
  
  /* Whether t is the library's trait Index, by its qualified name: the trait Index of
   * the api WellKnownNames.fortressLibrary.  A program's own trait Index is not it. */
  def isLibraryIndex(t: Type): Boolean = t match {
    case STraitType(_, n, args, _) =>
      args.isEmpty && n.getText == WellKnownNames.indexTypeName &&
        (toOption(n.getApiName) match {
          case Some(api) => api.getText == WellKnownNames.fortressLibrary
          case None => false
        })
    case _ => false
  }

  // Accessor methods for trait table
  def typeCons(x: Id): TypeConsIndex =
//    toOption(traits.typeCons(x)).getOrElse(bug(x, x + " is not in the trait table"))
    toOption(traits.typeCons(x)).getOrElse(throw new RuntimeException("Not in the trait table: " + x.toStringReadable + " @ " + x.at))

  def comprisesClause(t: TraitType): Set[TraitType] = typeCons(t.getName) match {
    case ti: ProperTraitIndex =>
      val args = toListFromImmutable(t.getArgs)
      val params = toListFromImmutable(ti.staticParameters)
      toSet(ti.comprisesTypes).map(nt => if (!nt.isInstanceOf[TraitType]) return Set()
                                         else openWhereSizes(ti, substitute(args, params, nt), args, params).asInstanceOf[TraitType])
    case _ => Set()
  }

  /* The nat, int and type where-clause variables of a trait declaration with a
   * comprises clause, as static parameters: comprises { N[\n\] } where
   * [\nat n\] lists N at every n, and comprises { List[\E\] } where [\E\]
   * lists List at every E. A type variable is bounded by its binding and by
   * each trait constraint of the clause on it: where [\E\] { E extends Foo }
   * lists List at every E that extends Foo. */
  def whereSizes(ti: ProperTraitIndex): List[StaticParam] =
    if (ti.comprisesTypes.isEmpty) Nil
    else ti.ast match {
      case d: TraitObjectDecl => toOption(NU.getWhereClause(d)) match {
        case Some(w) => toListFromImmutable(w.getBindings).filter(b =>
            b.getKind.isInstanceOf[KindNat] || b.getKind.isInstanceOf[KindInt] ||
            b.getKind.isInstanceOf[KindType]).map(b =>
            if (b.getKind.isInstanceOf[KindType]) {
              val constraints = toListFromImmutable(w.getConstraints).collect {
                case SWhereExtends(_, n, supers) if n.getText == b.getName.getText => supers }.flatten
              NF.makeTypeParam(NU.getSpan(b), b.getName,
                               toJavaList(toListFromImmutable(b.getSupers) ++ constraints), none[Type], false)
            } else
            NF.makeStaticParam(NU.getSpan(b), null, b.getName,
                               _root_.java.util.Collections.emptyList[BaseType],
                               _root_.java.util.Collections.emptyList[BaseType],
                               none[Type], false, b.getKind))
        case None => Nil
      }
      case _ => Nil
    }

  /* Whether t is a trait whose comprises clause lists types at where-clause variables. */
  def opensSizes(t: Type): Boolean = t match {
    case tt: TraitType => toOption(traits.typeCons(tt.getName)) match {
      case Some(ti: ProperTraitIndex) => !whereSizes(ti).isEmpty
      case _ => false
    }
    case _ => false
  }

  /* Whether t is a trait whose comprises clause lists types at a type where-clause variable. */
  def opensTypes(t: Type): Boolean = t match {
    case tt: TraitType => toOption(traits.typeCons(tt.getName)) match {
      case Some(ti: ProperTraitIndex) => whereSizes(ti).exists(_.getKind.isInstanceOf[KindType])
      case _ => false
    }
    case _ => false
  }

  /* A type ti's comprises clause lists, each where-clause variable opened: a
   * fresh name, equal only to itself (Formula.openedSizeName); a type is
   * bounded as its where-clause binding is, at the trait's static arguments
   * args for its static parameters params, a bound that names a where-clause
   * variable, the variable itself among them, naming it opened. */
  def openWhereSizes(ti: ProperTraitIndex, listed: Type, args: List[StaticArg], params: List[StaticParam]): Type =
    whereSizes(ti) match {
    case Nil => listed
    case ws =>
      val ids = ws.map(p => NF.makeId(NU.getSpan(p), openedSizeName(p.getName.getText)))
      val opened: List[StaticArg] = ws.zip(ids).map { case (p, id) =>
        if (p.getKind.isInstanceOf[KindType])
          NF.makeTypeArg(NU.getSpan(p), NF.makeVarType(NU.getSpan(p), id)): StaticArg
        else
          NF.makeIntArg(NU.getSpan(p), NF.makeIntRef(NU.getSpan(p), id)): StaticArg }
      for ((p, id) <- ws.zip(ids) if p.getKind.isInstanceOf[KindType]) {
        val bounds = toListFromImmutable(p.getExtendsClause).map(b =>
          substitute(opened, ws, if (args.isEmpty) b else substitute(args, params, b)).asInstanceOf[BaseType])
        KindEnv.registerOpened(id, NF.makeTypeParam(NU.getSpan(p), id, toJavaList(bounds), none[Type], false))
      }
      substitute(opened, ws, listed)
  }
  
  // For the purposes of this method Any is not the Parent of Object as it is not a TraitType
  // A conditional parent (isConditional) is not one of these: conditionalParents gives it.
  def parents(t: TraitType): Set[BaseType] = traits.memoParents(t) {
    val STraitType(_, n, a, _) = t
    val index = typeCons(n).asInstanceOf[TraitIndex]
    toListFromImmutable(index.extendsTypes).filterNot(isConditional).
      map(tw => substitute(a, toListFromImmutable(index.staticParameters), tw.getBaseType).asInstanceOf[BaseType]).toSet
  }

  /* Whether the extends entry tw names a conditional parent: its where clause binds
   * no variable and holds trait constraints only (KindEnv.extendsConditions), and the
   * declaration extends the entry's type exactly where they hold.  An entry under
   * any other where clause is read as a parent, as before. */
  def isConditional(tw: TraitTypeWhere): Boolean = !KindEnv.extendsConditions(tw).isEmpty

  /* t's conditional parents at t's static arguments, each with its conditions there:
   * a pair (X, B) for each constraint X extends B of the entry's where clause. */
  def conditionalParents(t: TraitType): List[(BaseType, List[(Type, BaseType)])] =
    typeCons(t.getName) match {
      // Most types have no entry under a where clause: they are answered before t is read.
      case index: TraitIndex if index.extendsTypes.stream.anyMatch((tw: TraitTypeWhere) => tw.getWhereClause.isSome) =>
        val a = toListFromImmutable(t.getArgs)
        val ps = toListFromImmutable(index.staticParameters)
        toListFromImmutable(index.extendsTypes).flatMap(tw => KindEnv.extendsConditions(tw) match {
          case Nil => Nil
          case cs => List((substitute(a, ps, tw.getBaseType).asInstanceOf[BaseType],
                           cs.flatMap { case SWhereExtends(_, x, bs) =>
                             val xt = substitute(a, ps, NF.makeVarType(NU.getSpan(x), x))
                             bs.map(b => (xt, substitute(a, ps, b).asInstanceOf[BaseType])) }))
        })
      case _ => Nil
    }

  /* r, the answer of s below t through s's parents, or s below t through a conditional
   * parent of s, read as through(p) reads a parent, where the parent's conditions hold:
   * the conditions are a formula, so an inference variable that one names is bounded
   * by it. */
  private def withConditionalParents(s: TraitType, r: CFormula, through: BaseType => CFormula)
                                    (implicit negate: Boolean, history: Set[hType]): CFormula =
    conditionalParents(s) match {
      case Nil => r
      case cps => pOr(r, pOr(cps.map { case (p, conds) =>
        pAnd(pAnd(conds.map { case (x, b) => condition(x, b) }), through(p)) }))
    }

  /* The condition x extends b of a conditional parent.  A type variable that this
   * analyzer's kind environment does not bind, as an analyzer outside the declaration
   * (the code generator's) does not bind the declaration's static parameters, leaves
   * the condition unread: the parent is read at every instance, as the code generator
   * builds the declaration's class. */
  private def condition(x: Type, b: BaseType)(implicit negate: Boolean, history: Set[hType]): CFormula =
    x match {
      case SVarType(_, id, _) =>
        traits.readContext()
        if (env.staticParam(id).isEmpty) pTrue() else pSub(x, b)
      case _ => pSub(x, b)
    }

  def ancestors(t: TraitType): Set[BaseType] =
    parents(t).flatMap{
      case s:TraitType => Set(s) ++ ancestors(s)
      case x => Set(x)
    }

  def comprisedTypes(t: TraitType): Option[Set[BaseType]] = {
    val STraitType(_, n, a, _) = t
    typeCons(n) match {
      case index: ProperTraitIndex =>
	val cs = index.comprisesTypes
	if (cs.isEmpty) None
        else
	    Some(toSet(cs).map(typ => openWhereSizes(index, substitute(a, toListFromImmutable(index.staticParameters), typ),
	                                             a, toListFromImmutable(index.staticParameters)).asInstanceOf[BaseType]).toSet)
      case _ => None
    }
  }
  
  /* The analyzer in which a type an excludes clause names is read: a trait that excludes
   * another is added to the other's clause at its own static parameters
   * (IndexBuilder.checkTraitClauses), which are not in scope where that clause is read,
   * so the ones not in scope are added. */
  private def withClauseParams(e: TraitType): TypeAnalyzer = {
    val free = toListFromImmutable(e.getArgs).collect {
      case STypeArg(_, _, SVarType(_, n, _)) if { traits.readContext(); !env.contains(n) } => n.getText }
    if (free.isEmpty) this
    else typeCons(e.getName) match {
      case ti: TraitIndex =>
        val params = toListFromImmutable(ti.staticParameters).filter(p => free.contains(p.getName.getText))
        if (params.isEmpty) this else extend(params, None)
      case _ => this
    }
  }

  def excludesClause(t: TraitType): Set[TraitType] = traits.memoExcludesClause(t) {
    val ti = typeCons(t.getName).asInstanceOf[TraitIndex]
    val args = toListFromImmutable(t.getArgs)
    val params = toListFromImmutable(ti.staticParameters)
    val excludes = ti match{
      case ti : ProperTraitIndex =>
        toSet(ti.excludesTypes).map(substitute(args, params, _).asInstanceOf[TraitType])
      case _ => Set[TraitType]()
    }
    val supers = toListFromImmutable(ti.extendsTypes).map(tw => substitute(args, params, tw.getBaseType))
    val transitively = supers.flatMap{
      case s: TraitType => excludesClause(s)
      case _ => Set[TraitType]()
    }
    excludes ++ transitively
  }

  // Accessor method for kind env
  def staticParam(x: Id): StaticParam = {
    traits.readContext()
    env.staticParam(x).getOrElse(bug(x, x + " is not in the kind env " + env)) }

  def extend(params: List[StaticParam], where: Option[WhereClause]) =
    new TypeAnalyzer(traits, env.extend(params, where))
  
  def extendJ(params: JavaList[StaticParam], where: JavaOption[WhereClause]) =
      new TypeAnalyzer(traits, env.extend(toList(params), toOption(where)))
  
  def pTrue()(implicit negate: Boolean) = 
    if (negate) False else True
  def pFalse()(implicit negate: Boolean) = 
    if (negate) True else False
  def pAnd(c1: CFormula, c2: CFormula)(implicit ta: TypeAnalyzer, negate: Boolean) = 
    if (negate) or(c1, c2) else and(c1, c2)
  def pAnd(cs: Iterable[CFormula])(implicit ta: TypeAnalyzer, negate: Boolean): CFormula = 
    if (negate) or(cs) else and(cs)
  def pOr(c1: CFormula, c2: CFormula)(implicit ta: TypeAnalyzer, negate: Boolean) = 
    if (negate) and(c1, c2) else or(c1, c2)
  def pOr(cs: Iterable[CFormula])(implicit ta: TypeAnalyzer, negate: Boolean) = 
    if (negate) and(cs) else or(cs)
  def pUpperBound(i: _InferenceVarType, t: Type)(implicit negate: Boolean) = 
    if (negate) notUpperBound(i, t) else upperBound(i, t)
  def pLowerBound(i: _InferenceVarType, t: Type)(implicit negate: Boolean) = 
    if (negate) notLowerBound(i, t) else lowerBound(i, t)
  def pExclusion(i: _InferenceVarType, t: Type)(implicit negate: Boolean) = 
    if (negate) notExclusion(i, t) else exclusion(i, t)
  def pFromBoolean(b: Boolean)(implicit negate: Boolean) = fromBoolean(negate != b)
  def pEquivalent(i: _InferenceVarOp, o: Op)(implicit negate: Boolean) =
    if (negate) oNotEquivalent(i, o) else oEquivalent(i, o)
  def pEquivalent(i: _InferenceVarInt, e: IntExpr)(implicit negate: Boolean) =
    if (negate) nNotEquivalent(i, e) else nEquivalent(i, e)
}

object TypeAnalyzer {
  def make(traits: TraitTable) = new TypeAnalyzer(traits, KindEnv.makeFresh)

  // The k-th inference variable that a walk of a question meets, renamed apart. Its hash is its
  // number, so a renaming asks the JVM for no identity hash.
  private final class Renamed(val k: Int) {
    override def toString = "renamed" + k
    override def hashCode = k
  }
  private val renamed = new java.util.ArrayList[_InferenceVarType]()
  private def renamedVar(k: Int): _InferenceVarType = renamed.synchronized {
    while (renamed.size <= k) renamed.add(NF.make_InferenceVarType(typeSpan, false, new Renamed(renamed.size)))
    renamed.get(k)
  }

  /** The two types with their type inference variables renamed apart, each in the order that a
   *  walk of x and then y meets it; None if they hold an inference variable of another kind. */
  def renamedApart(x: Type, y: Type): Option[(Type, Type)] = {
    val names = new java.util.HashMap[_InferenceVarType, _InferenceVarType]()
    var other = false
    object renamer extends Walker {
      override def walk(n: Any): Any = n match {
        case v: _InferenceVarType =>
          val r = names.get(v)
          if (r != null) r else { val fresh = renamedVar(names.size); names.put(v, fresh); fresh }
        case _: _InferenceVarInt => other = true; n
        case _: _InferenceVarOp => other = true; n
        case _ => super.walk(n)
      }
    }
    val rx = renamer(x).asInstanceOf[Type]
    val ry = renamer(y).asInstanceOf[Type]
    if (other) None else Some((rx, ry))
  }
}
