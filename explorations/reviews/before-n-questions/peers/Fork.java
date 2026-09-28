public class Fork {
  static <T extends Number> String op(T a, T b) { return "generic T=" + a.getClass().getSimpleName() + "," + b.getClass().getSimpleName(); }
  static String op(Object a, Object b) { return "plain(Object,Object)"; }
  static <T extends Number> String pr(T a, T b) { return "generic (boxing)"; }
  static String pr(long a, long b) { return "plain(long,long) (widening)"; }
  public static void main(String[] s) {
    Integer z = 3; Long w = 4L; int zi = 3; long wl = 4L;
    System.out.println("op(Integer, Long): " + op(z, w));
    System.out.println("pr(int, long): " + pr(zi, wl));
  }
}
