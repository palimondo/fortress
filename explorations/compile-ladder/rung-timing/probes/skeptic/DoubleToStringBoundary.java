public class dt {
  public static void main(String[] a) {
    double[] v = {1.0e7, 9999999.0, 1.0e7-1, 0.001, 0.0009999, 0.0, 1338.0/1000000.0, 999.0/1000000.0, 1.0174680816587E7};
    for (double d : v) System.out.println(d + "   <- " + String.format("%.10g", d));
  }
}
