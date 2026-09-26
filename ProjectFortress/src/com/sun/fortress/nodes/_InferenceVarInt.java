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
 * Class _InferenceVarInt, a component of the ASTGen-generated composite hierarchy.
 * Note: null is not allowed as a value for any field.
 * @version  Generated automatically by ASTGen from Fortress.ast
 */
@SuppressWarnings("unused")
public class _InferenceVarInt extends IntExpr implements OutAfterTypeChecking {
    private final Object _id;

    /**
     * Constructs a _InferenceVarInt.
     * @throws java.lang.IllegalArgumentException  If any parameter to the constructor is null.
     */
    public _InferenceVarInt(ASTNodeInfo in_info, boolean in_parenthesized, Object in_id) {
        super(in_info, in_parenthesized);
        if (in_id == null) {
            throw new java.lang.IllegalArgumentException("Parameter 'id' to the _InferenceVarInt constructor was null");
        }
        _id = in_id;
    }

    final public Object getId() { return _id; }

    public <RetType> RetType accept(AbstractNodeVisitor<RetType> visitor) {
        return visitor.for_InferenceVarInt(this);
    }

    public <RetType> RetType accept(NodeVisitor<RetType> visitor) {
        return visitor.for_InferenceVarInt(this);
    }

    public void accept(AbstractNodeVisitor_void visitor) {
        visitor.for_InferenceVarInt(this);
    }

    public void accept(NodeVisitor_void visitor) {
        visitor.for_InferenceVarInt(this);
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
            _InferenceVarInt casted = (_InferenceVarInt) obj;
            ASTNodeInfo temp_info = getInfo();
            ASTNodeInfo casted_info = casted.getInfo();
            if (!(temp_info == casted_info || temp_info.equals(casted_info))) return false;
            Object temp_id = getId();
            Object casted_id = casted.getId();
            if (!(temp_id == casted_id || temp_id.equals(casted_id))) return false;
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
        Object temp_id = getId();
        code ^= temp_id.hashCode();
        return code;
    }

    /**
     * Empty constructor, for reflective access.  Clients are 
     * responsible for manually instantiating each field.
     */
    protected _InferenceVarInt() {
        _id = null;
    }

    /**
     * Single Span constructor, for template gap access.  Clients are 
     * responsible for never accessing other fields than the gapId and 
     * templateParams.
     */
    protected _InferenceVarInt(ASTNodeInfo info) {
        super(info);
        _id = null;
    }

    public void walk(TreeWalker w) {
        if (w.visitNode(this, "_InferenceVarInt", 3)) {
            ASTNodeInfo temp_info = getInfo();
            if (w.visitNodeField("info", temp_info)) {
                temp_info.walk(w);
                w.endNodeField("info", temp_info);
            }
            boolean temp_parenthesized = isParenthesized();
            if (w.visitNodeField("parenthesized", temp_parenthesized)) {
                w.visitBoolean(temp_parenthesized);
                w.endNodeField("parenthesized", temp_parenthesized);
            }
            Object temp_id = getId();
            if (w.visitNodeField("id", temp_id)) {
                w.visitUnknownObject(temp_id);
                w.endNodeField("id", temp_id);
            }
            w.endNode(this, "_InferenceVarInt", 3);
        }
    }

}
