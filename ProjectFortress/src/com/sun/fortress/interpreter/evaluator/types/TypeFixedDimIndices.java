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

import java.util.Iterator;
import java.util.List;

import com.sun.fortress.interpreter.evaluator.values.FValue;
import com.sun.fortress.interpreter.useful.MagicNumbers;
import com.sun.fortress.interpreter.useful.NI;
import com.sun.fortress.interpreter.useful.Useful;


public class TypeFixedDimIndices extends TypeIndices {
    public TypeFixedDimIndices(List<TypeRange> indices) {
        this.ranges = indices;
    }

    public List<TypeRange> getRanges() {
        return ranges;
    }

    List<TypeRange> ranges;

    /**
     * Tests for equality of sizes only.
     *
     * @return
     */
    public boolean compatible(TypeIndices other) {
        if (other instanceof TypeFixedDimIndices) {
            TypeFixedDimIndices tfdi = (TypeFixedDimIndices) other;
            if (ranges.size() != tfdi.ranges.size()) {
                return false; // TODO or throw an error?  different dimensionality should not come here
            }
            Iterator<TypeRange> other_iter = tfdi.ranges.iterator();
            for (TypeRange i : ranges) {
                TypeRange j = other_iter.next();
                if (!i.compatible(j))
                    return false;
            }
            return true;
        } else if (other instanceof TypePolyDim) {
            NI.nyi("Indices compatibility, other is PolyDim"); // TODO poly dim compatibility?
            return false;

        }

         NI.nyi("Indices compatibility, other is not fixed sized"); // TODO
        return false;
    }

    /*
     * (non-Javadoc)
     *
     * @see java.lang.Object#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object other) {
        if (other instanceof TypeFixedDimIndices) {
            TypeFixedDimIndices tfdi = (TypeFixedDimIndices) other;
            if (ranges.size() != tfdi.ranges.size()) {
                return false; // TODO or throw an error?  different dimensionality should not come here
            }
            Iterator<TypeRange> other_iter = tfdi.ranges.iterator();
            for (TypeRange i : ranges) {
                TypeRange j = other_iter.next();
                if (!i.equals(j))
                    return false;
            }
            return true;
        } else if (other instanceof TypePolyDim) {
            NI.nyi("Equality of fixed vs poly dim indices.");
            return false; /* never reached */
        }

        return false;
    }

    /*
     * (non-Javadoc)
     *
     * @see java.lang.Object#hashCode()
     */
    @Override
    public int hashCode() {
        int hc = MagicNumbers.D;
        for (TypeRange i : ranges) {
            hc = (hc + i.hashCode()) * MagicNumbers.E;
        }
        return hc;
    }

    /*
     * (non-Javadoc)
     *
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        // Rely on dimensioned thingie to supply appropriate brackets.
        return Useful.listInDelimiters("", ranges, "");
    }

    public static TypeIndices make(FValue[] val) {
        return new TypeFixedDimIndices(TypeRange.makeList(val));
    }
}
