package com.sun.fortress.nodes;

import java.lang.String;
import java.math.BigInteger;
import java.io.Writer;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.LinkedList;
import com.sun.fortress.nodes_util.*;
import com.sun.fortress.parser_util.*;
import com.sun.fortress.parser_util.precedence_opexpr.*;
import com.sun.fortress.useful.*;
import edu.rice.cs.plt.tuple.Option;

/**
 * Class NestedPattern, a component of the ASTGen-generated composite hierarchy.
 * Note: null is not allowed as a value for any field.
 * @version  Generated automatically by ASTGen at Tue Aug 18 21:13:05 UTC 2026
 */
@SuppressWarnings("unused")
public class NestedPattern extends PatternBinding {
    private final Pattern _pat;

    /**
     * Constructs a NestedPattern.
     * @throws java.lang.IllegalArgumentException  If any parameter to the constructor is null.
     */
    public NestedPattern(ASTNodeInfo in_info, Option<Id> in_field, Option<Id> in_binderName, Pattern in_pat) {
        super(in_info, in_field, in_binderName);
        if (in_pat == null) {
            throw new java.lang.IllegalArgumentException("Parameter 'pat' to the NestedPattern constructor was null");
        }
        _pat = in_pat;
    }

    /**
     * A constructor with some fields provided by default values.
     */
    public NestedPattern(ASTNodeInfo in_info, Option<Id> in_field, Pattern in_pat) {
        this(in_info, in_field, Option.<Id>none(), in_pat);
    }

    final public Pattern getPat() { return _pat; }

    public <RetType> RetType accept(AbstractNodeVisitor<RetType> visitor) {
        return visitor.forNestedPattern(this);
    }

    public <RetType> RetType accept(NodeVisitor<RetType> visitor) {
        return visitor.forNestedPattern(this);
    }

    public void accept(AbstractNodeVisitor_void visitor) {
        visitor.forNestedPattern(this);
    }

    public void accept(NodeVisitor_void visitor) {
        visitor.forNestedPattern(this);
    }

    /**
     * Implementation of equals that is based on the values of the fields of the
     * object. Thus, two objects created with identical parameters will be equal.
     */
    public boolean equals(Object obj) {
        if (obj == null) return false;
        if ((obj.getClass() != this.getClass()) || (obj.hashCode() != this.hashCode())) {
            return false;
        }
        else {
            NestedPattern casted = (NestedPattern) obj;
            ASTNodeInfo temp_info = getInfo();
            ASTNodeInfo casted_info = casted.getInfo();
            if (!(temp_info == casted_info || temp_info.equals(casted_info))) return false;
            Option<Id> temp_field = getField();
            Option<Id> casted_field = casted.getField();
            if (!(temp_field == casted_field || temp_field.equals(casted_field))) return false;
            Option<Id> temp_binderName = getBinderName();
            Option<Id> casted_binderName = casted.getBinderName();
            if (!(temp_binderName == casted_binderName || temp_binderName.equals(casted_binderName))) return false;
            Pattern temp_pat = getPat();
            Pattern casted_pat = casted.getPat();
            if (!(temp_pat == casted_pat || temp_pat.equals(casted_pat))) return false;
            return true;
        }
    }


    /**
     * Implementation of hashCode that is consistent with equals.  The value of
     * the hashCode is formed by XORing the hashcode of the class object with
     * the hashcodes of all the fields of the object.
     */
    public int generateHashCode() {
        int code = getClass().hashCode();
        ASTNodeInfo temp_info = getInfo();
        code ^= temp_info.hashCode();
        Option<Id> temp_field = getField();
        code ^= temp_field.hashCode();
        Option<Id> temp_binderName = getBinderName();
        code ^= temp_binderName.hashCode();
        Pattern temp_pat = getPat();
        code ^= temp_pat.hashCode();
        return code;
    }

    /**
     * Empty constructor, for reflective access.  Clients are 
     * responsible for manually instantiating each field.
     */
    protected NestedPattern() {
        _pat = null;
    }

    /**
     * Single Span constructor, for template gap access.  Clients are 
     * responsible for never accessing other fields than the gapId and 
     * templateParams.
     */
    protected NestedPattern(ASTNodeInfo info) {
        super(info);
        _pat = null;
    }

    public void walk(TreeWalker w) {
        if (w.visitNode(this, "NestedPattern", 4)) {
            ASTNodeInfo temp_info = getInfo();
            if (w.visitNodeField("info", temp_info)) {
                temp_info.walk(w);
                w.endNodeField("info", temp_info);
            }
            Option<Id> temp_field = getField();
            if (w.visitNodeField("field", temp_field)) {
                if (temp_field.isNone()) {
                    w.visitEmptyOption(temp_field);
                }
                else if (w.visitNonEmptyOption(temp_field)) {
                    Id elt_temp_field = temp_field.unwrap();
                    if (elt_temp_field == null) w.visitNull();
                    else {
                        elt_temp_field.walk(w);
                    }
                    w.endNonEmptyOption(temp_field);
                }
                w.endNodeField("field", temp_field);
            }
            Option<Id> temp_binderName = getBinderName();
            if (w.visitNodeField("binderName", temp_binderName)) {
                if (temp_binderName.isNone()) {
                    w.visitEmptyOption(temp_binderName);
                }
                else if (w.visitNonEmptyOption(temp_binderName)) {
                    Id elt_temp_binderName = temp_binderName.unwrap();
                    if (elt_temp_binderName == null) w.visitNull();
                    else {
                        elt_temp_binderName.walk(w);
                    }
                    w.endNonEmptyOption(temp_binderName);
                }
                w.endNodeField("binderName", temp_binderName);
            }
            Pattern temp_pat = getPat();
            if (w.visitNodeField("pat", temp_pat)) {
                temp_pat.walk(w);
                w.endNodeField("pat", temp_pat);
            }
            w.endNode(this, "NestedPattern", 4);
        }
    }

}
