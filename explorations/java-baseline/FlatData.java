// FlatData -- the loaders and the corpus of the pure-Java microGPT: the Java
// reading of explorations/run-c4/src/FlatData.fss, declaration for declaration.
// Each method names the FlatData.fss lines that it stands for.

import java.io.BufferedReader;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.function.IntFunction;

final class FlatData {
    private FlatData() {}

    // FlatData.fss:14-42, parseFloat.  The same arithmetic, not
    // Double.parseDouble: the mantissa is accumulated digit by digit in a
    // double and scaled by one power of ten, so a 17-digit mantissa can land
    // one unit in the last place from the correctly rounded value.  The model
    // starts from these values, so the baseline must start from them too.
    // 10.0^e is Math.pow under walk (simpleDoubleArith.doublePowInt).
    static double parseFloat(String s) {
        boolean neg = s.charAt(0) == '-' || s.charAt(0) == '¯';
        double m = 0.0;
        int scale = 0;
        int ex = 0;
        int i = neg ? 1 : 0;
        boolean seenPoint = false;
        int n = s.length();
        while (i < n && s.charAt(i) != 'e' && s.charAt(i) != 'E') {
            char c = s.charAt(i);
            if (c == '.') seenPoint = true;
            else {
                m = 10.0 * m + (c - '0');
                if (seenPoint) scale += 1;
            }
            i += 1;
        }
        if (i < n) {
            boolean eneg = s.charAt(i + 1) == '-' || s.charAt(i + 1) == '¯';
            int j = (eneg || s.charAt(i + 1) == '+') ? i + 2 : i + 1;
            ex = Integer.parseInt(s.substring(j));
            if (eneg) ex = -ex;
        }
        int e10 = ex - scale;
        double r = e10 >= 0 ? m * Math.pow(10.0, e10)
                 : e10 >= -22 ? m / Math.pow(10.0, -e10)
                 : (m / 1e22) / Math.pow(10.0, -e10 - 22);
        return neg ? -r : r;
    }

    // FlatData.fss:45-60, parseRow: the space-separated numbers of a line,
    // into out[off..]; returns how many.
    static int parseRow(String line, double[] out, int off) {
        int n = line.length();
        int i = 0;
        int k = 0;
        while (i < n) {
            if (line.charAt(i) == ' ') i += 1;
            else {
                int j = i;
                while (j < n && line.charAt(j) != ' ') j += 1;
                out[off + k] = parseFloat(line.substring(i, j));
                k += 1;
                i = j;
            }
        }
        return k;
    }

    // FlatData.fss:62-67, numbersOf: the numbers of a line as a vector.
    static double[] numbersOf(String line) {
        double[] all = new double[line.length()];
        int cnt = parseRow(line, all, 0);
        return java.util.Arrays.copyOf(all, cnt);
    }

    // FlatData.fss:69-80, readLines: the lines of a file, up to the first
    // empty one (one pass here, two in the Fortress).
    static String[] readLines(String path) {
        ArrayList<String> out = new ArrayList<>();
        try (BufferedReader f = Files.newBufferedReader(Paths.get(path), StandardCharsets.UTF_8)) {
            String line = f.readLine();
            while (line != null && line.length() > 0) { out.add(line); line = f.readLine(); }
        } catch (IOException e) { throw new UncheckedIOException(e); }
        return out.toArray(new String[0]);
    }

    // FlatData.fss:82-88, readVector: one number per line.
    static double[] readVector(String path, int n) {
        double[] v = new double[n];
        try (BufferedReader f = Files.newBufferedReader(Paths.get(path), StandardCharsets.UTF_8)) {
            for (int i = 0; i < n; i++) v[i] = parseFloat(f.readLine());
        } catch (IOException e) { throw new UncheckedIOException(e); }
        return v;
    }

    // FlatData.fss:93-101, loadParams: files name(0) .. name(count-1) under
    // dir, every line's numbers appended in order into one vector.
    static double[] loadParams(String dir, IntFunction<String> name, int count, int total) {
        double[] p = new double[total];
        int off = 0;
        for (int i = 0; i < count; i++)
            for (String line : readLines(dir + "/" + name.apply(i) + ".txt")) off += parseRow(line, p, off);
        if (off != total) throw new IllegalStateException("loaded " + off + " numbers, the layout has " + total);
        return p;
    }

    // FlatData.fss:106-118, object Corpus: the token matrix, documents x
    // (block + 1), row-major in one int[], and a length per document.
    static final class Corpus {
        final int[] tokm; final int[] len; final int blk; final int width;
        Corpus(int[] tokm, int[] len, int blk) { this.tokm = tokm; this.len = len; this.blk = blk; this.width = blk + 1; }
        int size() { return len.length; }                               // FlatData.fss:107
        int length(int d) { return len[d]; }                            // FlatData.fss:108
        int token(int d, int j) { return tokm[d * width + j]; }         // FlatData.fss:109
        // FlatData.fss:112-113, tokens: one key per (document, position)
        void tokens(int[] b, int off, int[] out) {
            for (int r = 0; r < b.length * blk; r++) out[r] = tokm[b[r / blk] * width + (r % blk) + off];
        }
        // FlatData.fss:114-115, positions
        void positions(int[] b, int[] out) {
            for (int r = 0; r < b.length * blk; r++) out[r] = r % blk;
        }
        // FlatData.fss:116-117, valid: the 0/1 validity mask
        void valid(int[] b, double[] out) {
            for (int r = 0; r < b.length * blk; r++) out[r] = (r % blk) < len[b[r / blk]] ? 1.0 : 0.0;
        }
    }

    // FlatData.fss:119-124, loadCorpus: one document per line, interned a..z,
    // BOS before and after each document and in every unused slot.
    static Corpus loadCorpus(String path, int blk, int bos) {
        String[] names = readLines(path);
        int width = blk + 1;
        int[] tokm = new int[names.length * width];
        java.util.Arrays.fill(tokm, bos);
        int[] len = new int[names.length];
        for (int d = 0; d < names.length; d++) {
            for (int j = 0; j < names[d].length(); j++) tokm[d * width + 1 + j] = names[d].charAt(j) - 'a';
            len[d] = 1 + names[d].length();
        }
        return new Corpus(tokm, len, blk);
    }
}
