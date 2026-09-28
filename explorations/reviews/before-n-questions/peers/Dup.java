public class Dup {
  static <T extends Number> String op(T a, T b) { return "generic"; }
  static String op(Number a, Number b) { return "plain"; }
  public static void main(String[] s) { Integer z = 3; Long w = 4L; System.out.println(op(z, w)); }
}
