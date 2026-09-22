/* NAT SHADOW tool (explorations/perf-probes/nat/java.md  2).
 *
 * Stamps the RTTI class of one literal size: a class file named "<n>$RTTIc"
 * whose public static final ONLY field holds an RTTIsize.  That is exactly what
 * MethodInstantiater.rttiReference:137-143 emits a GETSTATIC for when a size
 * reaches it (Naming.stemClassToRTTIclass, Naming.java:1043-1051), and what the
 * loader then looks for on the classpath (InstantiatingClassloader.readResource
 * :141-161, reached from the isRTTIc branch :281-291).
 *
 * It is a tool, not a shadow: it modifies nothing.  A class whose name begins
 * with a digit cannot be written in Java source, hence ASM.
 *
 *   javac -cp "$CP" -d <dir> StampSizeRTTI.java
 *   java  -cp "<dir>:$CP" StampSizeRTTI <out-dir> 3 2 ...
 */
import java.io.File;
import java.io.FileOutputStream;
import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.MethodVisitor;
import org.objectweb.asm.Opcodes;

public class StampSizeRTTI implements Opcodes {
    static final String RTTI  = "com/sun/fortress/compiler/runtimeValues/RTTI";
    static final String SIZE  = "com/sun/fortress/compiler/runtimeValues/RTTIsize";
    static final String DESC  = "L" + RTTI + ";";

    public static void main(String[] args) throws Exception {
        File out = new File(args[0]);
        out.mkdirs();
        for (int i = 1; i < args.length; i++) {
            String n = args[i];
            String name = n + "$RTTIc";
            ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_MAXS | ClassWriter.COMPUTE_FRAMES);
            cw.visit(V1_8, ACC_PUBLIC + ACC_FINAL + ACC_SUPER, name, null, "java/lang/Object", null);
            cw.visitField(ACC_PUBLIC + ACC_STATIC + ACC_FINAL, "ONLY", DESC, null, null).visitEnd();
            MethodVisitor mv = cw.visitMethod(ACC_STATIC, "<clinit>", "()V", null, null);
            mv.visitCode();
            mv.visitTypeInsn(NEW, SIZE);
            mv.visitInsn(DUP);
            mv.visitLdcInsn(n);
            mv.visitMethodInsn(INVOKESPECIAL, SIZE, "<init>", "(Ljava/lang/String;)V", false);
            mv.visitFieldInsn(PUTSTATIC, name, "ONLY", DESC);
            mv.visitInsn(RETURN);
            mv.visitMaxs(3, 0);
            mv.visitEnd();
            cw.visitEnd();
            FileOutputStream f = new FileOutputStream(new File(out, name + ".class"));
            f.write(cw.toByteArray());
            f.close();
            System.out.println("stamped " + new File(out, name + ".class"));
        }
    }
}
