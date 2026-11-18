// VerifyJars <caches-folder> <classpath>: every method of every class in <caches-folder>/bytecode_cache/*.jar run through
// ASM's data-flow verifier (SimpleVerifier), with the class hierarchy read through a class loader over <classpath>;
// a template class of a generic (a name with a non-ASCII character) is skipped and counted, since the class loader
// fills its static arguments at the run. Prints one line per method that the verifier refuses, then a count by jar.
// Lenient where a class cannot be loaded: an unknown type is taken as assignable, so each line is a definite refusal.
import java.io.*; import java.net.*; import java.util.*; import java.util.jar.*;
import org.objectweb.asm.*; import org.objectweb.asm.tree.*; import org.objectweb.asm.tree.analysis.*;

public class VerifyJars {
    static class Lenient extends SimpleVerifier {
        Lenient(ClassLoader l) { super(Opcodes.ASM9, null, null, null, false); setClassLoader(l); }
        @Override protected boolean isAssignableFrom(Type t, Type u) { try { return super.isAssignableFrom(t, u); } catch (Throwable e) { return true; } }
        @Override protected boolean isInterface(Type t) { try { return super.isInterface(t); } catch (Throwable e) { return false; } }
        @Override protected Type getSuperClass(Type t) { try { return super.getSuperClass(t); } catch (Throwable e) { return Type.getObjectType("java/lang/Object"); } }
        @Override protected boolean isSubTypeOf(BasicValue v, BasicValue e) { try { return super.isSubTypeOf(v, e); } catch (Throwable x) { return true; } }
    }
    public static void main(String[] a) throws Exception {
        File bc = new File(a[0], "bytecode_cache");
        List<URL> urls = new ArrayList<>();
        File[] jars = bc.listFiles((d, n) -> n.endsWith(".jar")); Arrays.sort(jars);
        for (File j : jars) urls.add(j.toURI().toURL());
        urls.add(new File(a[0], "nativewrapper_cache").toURI().toURL());
        for (String p : a[1].split(":")) if (!p.isEmpty()) urls.add(new File(p).toURI().toURL());
        ClassLoader l = new URLClassLoader(urls.toArray(new URL[0]), null);
        int total = 0, bad = 0, skipped = 0, classes = 0;
        for (File j : jars) {
            int jb = 0, jm = 0;
            try (JarFile jf = new JarFile(j)) {
                for (Enumeration<JarEntry> en = jf.entries(); en.hasMoreElements();) {
                    JarEntry e = en.nextElement(); String n = e.getName();
                    if (!n.endsWith(".class")) continue;
                    if (!n.chars().allMatch(c -> c < 128)) { skipped++; continue; }
                    classes++;
                    ClassNode cn = new ClassNode();
                    try (InputStream in = jf.getInputStream(e)) { new ClassReader(in).accept(cn, ClassReader.SKIP_FRAMES); }
                    for (MethodNode m : cn.methods) {
                        if ((m.access & (Opcodes.ACC_ABSTRACT | Opcodes.ACC_NATIVE)) != 0) continue;
                        total++; jm++;
                        try { new Analyzer<>(new Lenient(l)).analyze(cn.name, m); }
                        catch (AnalyzerException x) { bad++; jb++;
                            String msg = String.valueOf(x.getMessage()).replace('\n', ' ');
                            System.out.println("REFUSED " + j.getName() + " " + cn.name + "." + m.name + m.desc + " : " + (msg.length() > 300 ? msg.substring(0, 300) : msg)); }
                        catch (Throwable x) { System.out.println("ERROR " + j.getName() + " " + cn.name + "." + m.name + " : " + x); }
                    }
                }
            }
            System.out.println("JAR " + j.getName() + " methods " + jm + " refused " + jb);
        }
        System.out.println("TOTAL classes " + classes + " methods " + total + " refused " + bad + " templates skipped " + skipped);
    }
}
