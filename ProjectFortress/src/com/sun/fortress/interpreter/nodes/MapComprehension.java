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

package com.sun.fortress.interpreter.nodes;

import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import com.sun.fortress.interpreter.nodes_util.*;
import com.sun.fortress.interpreter.useful.*;

public class MapComprehension extends GeneratedComprehension {
  private final Expr _key;
  private final Expr _value;

  /**
   * Constructs a MapComprehension.
   * @throw java.lang.IllegalArgumentException if any parameter to the constructor is null.
   */
  public MapComprehension(Span in_span, List<Generator> in_gens, Expr in_key, Expr in_value) {
    super(in_span, in_gens);

    if (in_key == null) {
      throw new java.lang.IllegalArgumentException("Parameter 'key' to the MapComprehension constructor was null. This class may not have null field values.");
    }
    _key = in_key;

    if (in_value == null) {
      throw new java.lang.IllegalArgumentException("Parameter 'value' to the MapComprehension constructor was null. This class may not have null field values.");
    }
    _value = in_value;
  }

    @Override
    public <T> T accept(NodeVisitor<T> v) {
        return v.forMapComprehension(this);
    }

    MapComprehension(Span span) {
        super(span);
        _key = null;
        _value = null;
    }

  final public Expr getKey() { return _key; }
  final public Expr getValue() { return _value; }

  public <RetType> RetType visit(NodeVisitor<RetType> visitor) { return visitor.forMapComprehension(this); }
  public void visit(NodeVisitor_void visitor) { visitor.forMapComprehension(this); }

  /**
   * Implementation of toString that uses
   * {@see #output} to generated nicely tabbed tree.
   */
  public java.lang.String toString() {
    java.io.StringWriter w = new java.io.StringWriter();
    output(w);
    return w.toString();
  }

  /**
   * Prints this object out as a nicely tabbed tree.
   */
  public void output(java.io.Writer writer) {
    outputHelp(new TabPrintWriter(writer, 2), false);
  }

  protected void outputHelp(TabPrintWriter writer, boolean lossless) {
    writer.print("MapComprehension:");
    writer.indent();

    Span temp_span = getSpan();
    writer.startLine();
    writer.print("span = ");
    if (lossless) {
      writer.printSerialized(temp_span);
      writer.print(" ");
      writer.printEscaped(temp_span);
    } else { writer.print(temp_span); }

    List<Generator> temp_gens = getGens();
    writer.startLine();
    writer.print("gens = ");
    writer.print("{");
    writer.indent();
    boolean isempty_temp_gens = true;
    for (Generator elt_temp_gens : temp_gens) {
      isempty_temp_gens = false;
      writer.startLine("* ");
      if (elt_temp_gens == null) {
        writer.print("null");
      } else {
        elt_temp_gens.outputHelp(writer, lossless);
      }
    }
    writer.unindent();
    if (isempty_temp_gens) writer.print(" }");
    else writer.startLine("}");

    Expr temp_key = getKey();
    writer.startLine();
    writer.print("key = ");
    temp_key.outputHelp(writer, lossless);

    Expr temp_value = getValue();
    writer.startLine();
    writer.print("value = ");
    temp_value.outputHelp(writer, lossless);
    writer.unindent();
  }

  /**
   * Implementation of equals that is based on the values
   * of the fields of the object. Thus, two objects
   * created with identical parameters will be equal.
   */
  public boolean equals(java.lang.Object obj) {
    if (obj == null) return false;
    if ((obj.getClass() != this.getClass()) || (obj.hashCode() != this.hashCode())) {
      return false;
    } else {
      MapComprehension casted = (MapComprehension) obj;
      if (! (getGens().equals(casted.getGens()))) return false;
      if (! (getKey().equals(casted.getKey()))) return false;
      if (! (getValue().equals(casted.getValue()))) return false;
      return true;
    }
  }

  /**
   * Implementation of hashCode that is consistent with
   * equals. The value of the hashCode is formed by
   * XORing the hashcode of the class object with
   * the hashcodes of all the fields of the object.
   */
  protected int generateHashCode() {
    int code = getClass().hashCode();
    code ^= 0;
    code ^= getGens().hashCode();
    code ^= getKey().hashCode();
    code ^= getValue().hashCode();
    return code;
  }
}
