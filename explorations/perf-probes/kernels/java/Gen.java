// The generic array object, in the shape Fortress uses it: element storage is
// Object[] (Array1[\T,0,s\] / PrimitiveArray is generic in T, so the elements
// are references), reached through an interface so the call site cannot be
// devirtualised away, with the checkcast the generated code performs on every
// element read.  One dimension and two, since the kernels use both.
public final class Gen {
    public interface Arr1 { Object get(int i); void put(int i, Object v); int size(); }
    public interface Arr2 { Object get(int i, int j); void put(int i, int j, Object v); }

    public static final class Prim1 implements Arr1 {
        private final Object[] a;
        public Prim1(int n) { a = new Object[n]; }
        public Object get(int i) { return a[i]; }
        public void put(int i, Object v) { a[i] = v; }
        public int size() { return a.length; }
    }
    public static final class Prim2 implements Arr2 {
        private final Object[] a; private final int nc;
        public Prim2(int nr, int nc) { this.a = new Object[nr * nc]; this.nc = nc; }
        public Object get(int i, int j) { return a[i * nc + j]; }
        public void put(int i, int j, Object v) { a[i * nc + j] = v; }
    }
    // a row view of a matrix, as FlatArrays.RowView is
    public static final class RowView implements Arr1 {
        private final Arr2 base; private final int i; private final int nc;
        public RowView(Arr2 base, int i, int nc) { this.base = base; this.i = i; this.nc = nc; }
        public Object get(int j) { return base.get(i, j); }
        public void put(int j, Object v) { base.put(i, j, v); }
        public int size() { return nc; }
    }
}
