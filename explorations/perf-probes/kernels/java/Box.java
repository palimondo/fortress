// The runtime's box, in the shape the generated code uses it: modelled on
// com.sun.fortress.compiler.runtimeValues.FRR64 -- final class, final double
// field, private constructor, static make(), no cache -- and on the generated
// native wrapper for simpleDoubleArith, which does
//     getValue(); getValue(); <primitive op>; FRR64.make(...)
// Shared by every boxed form in this directory.
public final class Box {
    final double val;
    private Box(double x) { val = x; }
    public double getValue() { return val; }
    public static Box make(double x) { return new Box(x); }
    public static Box mul(Box a, Box b) { return make(a.getValue() * b.getValue()); }
    public static Box add(Box a, Box b) { return make(a.getValue() + b.getValue()); }
    public static Box sub(Box a, Box b) { return make(a.getValue() - b.getValue()); }
    public static Box div(Box a, Box b) { return make(a.getValue() / b.getValue()); }
    public static Box sqrt(Box a) { return make(Math.sqrt(a.getValue())); }
}
