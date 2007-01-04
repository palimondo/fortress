/*******************************************************************************
    Copyright 2007 Sun Microsystems, Inc.,
    4150 Network Circle, Santa Clara, California 95054, U.S.A.
    All rights reserved.

    U.S. Government Rights - Commercial software.
    Government users are subject to the Sun Microsystems, Inc. standard
    license agreement and applicable provisions of the FAR and its supplements.

    Use is subject to license terms.

    This distribution may include materials developed by third parties.

    Sun, Sun Microsystems, the Sun logo and Java are trademarks or registered
    trademarks of Sun Microsystems, Inc. in the U.S. and other countries.
 ******************************************************************************/

package com.sun.fortress.interpreter.evaluator.types;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.TreeSet;
import java.util.List;
import java.util.Set;

import com.sun.fortress.interpreter.env.BetterEnv;
import com.sun.fortress.interpreter.evaluator.InterpreterError;
import com.sun.fortress.interpreter.nodes.RestType;
import com.sun.fortress.interpreter.nodes.StaticParam;
import com.sun.fortress.interpreter.nodes.TupleType;
import com.sun.fortress.interpreter.nodes.TypeRef;
import com.sun.fortress.interpreter.useful.ABoundingMap;
import com.sun.fortress.interpreter.useful.Factory1;
import com.sun.fortress.interpreter.useful.ListComparer;
import com.sun.fortress.interpreter.useful.Memo1C;
import com.sun.fortress.interpreter.useful.Useful;


// TODO need to memoize this to preserver type EQuality
public class FTypeTuple extends FType {

    static ListComparer<FType> listComparer = new ListComparer<FType>();

    private static class Factory implements Factory1<List<FType>, FType> {

        public FType make(List<FType> part1) {
            return part1.size() == 0 ? FTypeVoid.T : new FTypeTuple(part1);
        }

    }

    static Memo1C<List<FType>, FType> memo = null;

    public static void reset() {
        memo = new Memo1C<List<FType>, FType>( new Factory(), listComparer);
    }
    static public FType make(List<FType> l) {
        return l.size() == 0 ? FTypeVoid.T : memo.make(l);
    }

    List<FType> l;

    protected FTypeTuple(List<FType> l) {
        super("Tuple"); // TODO need a better name -- ought to do it lazily
        this.l = l;
    }

    public String toString() {
        return com.sun.fortress.interpreter.useful.Useful.listInParens(l);
    }

        /**
         * Returns this subtypeof other.
         */
    public boolean subtypeOf(FType other) {
        if (commonSubtypeOf(other))
            return true;
        // TODO This is going to get hairy in a world of overloaded function
        // types and rest types.
        if (other instanceof FTypeTuple) {
            FTypeTuple that = (FTypeTuple) other;

            // For rest types, iterate to min-1, verify that
            // either tails are length 1 and equal, or else
            // that 'that' ends in rest T and the tail of this
            // is all subtypeof T.

            List<FType> thisl = this.l;
            List<FType> thatl = that.l;

            int min = thatl.size();
            if (min == 0) {
                // if other is empty, and this != other (above), then false.
                return false;
            }

            FType thatt = thatl.get(min - 1);

            // TODO lacking default parameters, a short list cannot
            // possibly match a long list. I.e., if "min" isn't
            // the minimum, the answer is false.

            if (thatt instanceof FTypeRest) {
                return subtypeOf(thisl, thatl, 0, min - 1)
                        && subtypeOf(thisl, ((FTypeRest) thatt).getType(),
                                min - 1, thisl.size());
            } else if (min != thisl.size()) {
                return false;
            } else {
                return subtypeOf(thisl, thatl, 0, min);
            }

        }
        return false;
    }

    /**
     * Tests subtype-of for a pair of tuple sections. Returns true iff
     * thisl[start, end) subtypeof thatl[start, end).
     *
     * @param thisl
     * @param thatl
     * @param start
     * @param end
     * @return
     */
    public static boolean subtypeOf(List<FType> thisl, List<FType> thatl,
            int start, int end) {
        if (thisl.size() < end || thatl.size() < end)
            return false;
        for (int i = start; i < end; i++) {
            if (!thisl.get(i).subtypeOf(thatl.get(i)))
                return false;
        }
        return true;
    }

    /**
     * Tests subtype-of for a tuple section against a type. Returns true iff
     * thisl[start, end) subtypeof thatt.
     *
     * @param thisl
     * @param thatt
     * @param start
     * @param end
     * @return
     */
    public static boolean subtypeOf(List<FType> thisl, FType thatt, int start,
            int end) {
        if (thisl.size() < end)
            return false;
        for (int i = start; i < end; i++) {
            if (!thisl.get(i).subtypeOf(thatt))
                return false;
        }
        return true;
    }

    public Set<FType> meet(FType other) {
        TreeSet<FType> result = new TreeSet<FType>();
        if (other instanceof FTypeDynamic) {
            result.add(this);
        } else if (other instanceof FTypeTuple) {
            FTypeTuple ftt_other = (FTypeTuple) other;
            Set<List<FType>> slf = meet(l, ftt_other.l);
            if (slf.size() == 0)
                return Collections.<FType> emptySet();
            for (List<FType> lt : slf)
                result.add(FTypeTuple.make(lt));
        }
        return result;
    }

    public Set<FType> join(FType other) {
        TreeSet<FType> result = new TreeSet<FType>();
        if (other instanceof FTypeDynamic) {
            result.add(other);
        } else if (other instanceof FTypeTuple) {
            FTypeTuple ftt_other = (FTypeTuple) other;
            Set<List<FType>> slf = join(l, ftt_other.l);
            if (slf.size() == 0)
                return Collections.<FType> emptySet();
            for (List<FType> lt : slf)
                result.add(FTypeTuple.make(lt));
        }
        return result;
    }

    public static Set<List<FType>> meet(List<FType> pl1, List<FType> pl2) {

        // TODO For efficiency, we can filter out combinations that are
        // guaranteed to fail.

        TreeSet<List<FType>> s = new TreeSet<List<FType>>();
        s.add(Collections.<FType> emptyList());

        return meet(s, pl1, pl2);
    }

    public static Set<List<FType>> join(List<FType> pl1, List<FType> pl2) {
        // Join is a lot more martian than meet.

        // If the two lists are clearly disjoint, then the join is just
        // the pair of lists.

        // If there is a rest-parameter, then it is messier.

        // The goal is to attempt to generate a singleton answer, because
        // in many cases within the Fortress type system that is the only
        // acceptable result.

        TreeSet<List<FType>> s = new TreeSet<List<FType>>();

        int s1 = pl1.size();
        int s2 = pl2.size();

        // TODO these cases make my brain hurt.

        if (s1 != s2)
            com.sun.fortress.interpreter.useful.NI.nyi("JOIN of lists of types of unequal length");

        if (s1 > 0 && pl1.get(s1 - 1) instanceof FTypeRest)
            com.sun.fortress.interpreter.useful.NI.nyi("JOIN of lists, first has REST parameter");

        if (s2 > 0 && pl2.get(s2 - 1) instanceof FTypeRest)
            com.sun.fortress.interpreter.useful.NI.nyi("JOIN of lists, second has REST parameter");

        // TODO today, if we can arrive at a single answer, we declare victory,
        // otherwise punt.

        ArrayList<FType> a = new ArrayList<FType>();

        for (int i = 0; i < s1; i++) {
            FType t1 = pl1.get(i);
            FType t2 = pl2.get(i);
            Set<FType> m = t1.join(t2);
            if (m.size() != 1)
                return Collections.<List<FType>> emptySet();
            // m.iterator().next() gets the singleton out.
            a.add(m.iterator().next());
        }

        s.add(a);

        return s;
    }

    private static Set<List<FType>> meet(Set<List<FType>> s, List<FType> pl1,
            List<FType> pl2) {
        int s1 = pl1.size();
        int s2 = pl2.size();
        if (s1 == 0 && s2 == 0)
            return s;
        else if (s1 == 0) {
            if (s2 == 1 && pl2.get(0) instanceof FTypeRest)
                return s;
            else
                return Collections.<List<FType>> emptySet();
        } else if (s2 == 0) {
            if (s1 == 1 && pl1.get(0) instanceof FTypeRest)
                return s;
            else
                return Collections.<List<FType>> emptySet();
        } else {
            FType t1 = pl1.get(0);
            FType t2 = pl2.get(0);
            boolean r1 = t1 instanceof FTypeRest;
            boolean r2 = t2 instanceof FTypeRest;
            List<FType> sl1 = pl1;
            List<FType> sl2 = pl2;

            if (r1 && !r2) {
                if (s1 != 1)
                    throw new InterpreterError("Rest parameter not last parameter");
                sl2 = sl2.subList(1, s2);
            } else if (r2 && !r1) {
                if (s2 != 1)
                    throw new InterpreterError("Rest parameter not last parameter");
                sl1 = sl1.subList(1, s1);
            } else {
                // If tails have equal rest-ness, shorten them both.
                sl1 = sl1.subList(1, s1);
                sl2 = sl2.subList(1, s2);
            }

            return meet(Useful.setProduct(s, t1.meet(t2)), sl1, sl2);
        }
    }

    @Override
    public void unify(BetterEnv env, Set<StaticParam> tp_set,
                      ABoundingMap<String, FType, TypeLatticeOps> abm,
                      TypeRef val) {
        if (!(val instanceof TupleType)) {
            super.unify(env,tp_set,abm,val);
            return;
        }
        TupleType tup = (TupleType) val;
        if (!(tup.getKeywords().isEmpty())) return;
        Iterator<FType> ftIterator = l.iterator();
        Iterator<TypeRef> trIterator = tup.getElements().iterator();
        FType ft = null;
        TypeRef tr = null;
        while (ftIterator.hasNext() && trIterator.hasNext()) {
            ft = ftIterator.next();
            tr = trIterator.next();
            ft.unify(env,tp_set,abm,tr);
        }
        while (tr instanceof RestType && ftIterator.hasNext()) {
            ft = ftIterator.next();
            ft.unify(env,tp_set,abm,tr);
        }
        while (ft instanceof FTypeRest && trIterator.hasNext()) {
            tr = trIterator.next();
            ft.unify(env,tp_set,abm,tr);
        }
    }

}
