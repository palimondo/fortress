package com.sun.fortress.nodes_util;

import java.util.List;

import edu.rice.cs.plt.tuple.Null;
import edu.rice.cs.plt.tuple.Option;
import edu.rice.cs.plt.tuple.Wrapper;

/**
 * The hash of a syntax tree node's field whose type holds an Option.
 *
 * The Option classes hash by an identity hash: an empty Option is one object that hashes by its
 * own identity hash, and a full one XORs its value's hash with its class's identity hash.  So a
 * node with such a field, and every node that holds that node, would hash by the JVM's
 * identity-hash sequence.  This hash takes the class's name in place of each identity hash, as
 * the nodes' own hashes do, and is consistent with the Option classes' equals.
 */
public final class NodeHash {
    private static final int NONE = Null.class.getName().hashCode();
    private static final int SOME = Wrapper.class.getName().hashCode();

    private NodeHash() {}

    /** An Option's hash, a list's hash by the hashes of its elements, and any other value's own. */
    public static int of(Object field) {
        if (field instanceof Option) {
            Option<?> o = (Option<?>) field;
            return o.isSome() ? of(o.unwrap()) ^ SOME : NONE;
        }
        if (field instanceof List) {
            int code = 1;
            for (Object e : (List<?>) field) code = 31 * code + (e == null ? 0 : of(e));
            return code;
        }
        return field.hashCode();
    }
}
