/*******************************************************************************
    Copyright 2008 Sun Microsystems, Inc.,
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

package com.sun.fortress.tests.performance;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;

import org.jfree.chart.ChartRenderingInfo;
import org.jfree.chart.ChartUtilities;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.NumberAxis;
import org.jfree.chart.entity.StandardEntityCollection;
import org.jfree.chart.plot.XYPlot;
import org.jfree.chart.renderer.xy.XYItemRenderer;
import org.jfree.chart.renderer.xy.XYLineAndShapeRenderer;
import org.jfree.data.function.LineFunction2D;
import org.jfree.data.xy.XYSeries;
import org.jfree.data.xy.XYSeriesCollection;

public class TestSuiteData implements Serializable {

    /**
     * Add a serial version UID to make Eclipse happy.
     */
    private static final long serialVersionUID = -2469807233782317273L;

    private final Map<String, SortedMap<Integer, Double>> testData;

    /** The number of columns in our html table */
    private final static int NUMCOLUMNS = 2;

    /** The names of test cases to monitor */
    private final static String[] SPECIAL_TESTCASES = { "buffons",
            "WordCountSmall", "nestedTransactions1", "ArrayListQuick",
            "FuncOfFuncTest", "overloadTest6", "OverloadConstructor3",
            "whileTest", "caseTest", "genericTest4", "traitTest1" };

    TestSuiteData() {
        testData = new HashMap<String, SortedMap<Integer, Double>>();
    }
 
    public void makeHtml(String chartDirectory, boolean imagemap) {
        StringBuilder html = new StringBuilder();
        html.append("<html><head><title>Performance Measures</title></head>\n");
        html.append("<body>");
        html.append("<h2>Performance Measures</h2>");
        if (!imagemap) {
            html.append("<a href=\"imagemap.html\">Follow the link</a> ");
            html.append("to see the image-mapped data version.<p>\n");
        }
        html.append("<table>\n");
        File directory = new File(chartDirectory);
        File[] images;
        if (imagemap) {
            images = directory
                .listFiles(new ExtensionFilenameFilter(".fragment"));
        } else {
            images = directory
            .listFiles(new ExtensionFilenameFilter(".png"));            
        }
        makeHtmlEachFile(html, images, imagemap);
        writeHtmlFile(chartDirectory, html, imagemap);
    }

    /**
     * Helper function to {@link #makeHtml(String) makeHtml}.
     */    
    private int makeHtmlEachFile(StringBuilder html, File[] images, boolean imagemap) {
        int counter = 0;        
        for (File image : images) {
            if ((counter % NUMCOLUMNS) == 0) {
                html.append("<tr>");
            }
            html.append("<td>");

            if (imagemap) {
                BufferedReader reader = null;
                try {
                    reader = new BufferedReader(new InputStreamReader(
                            new FileInputStream(image)));
                    String nextLine = reader.readLine();
                    while (nextLine != null) {
                        html.append(nextLine + '\n');
                        nextLine = reader.readLine();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    PerformanceLogMonitor.closeStream(reader);
                }
            } else {
                html.append("<image src=\"");
                html.append(image.getName());
                html.append("\">");
            }
            html.append("</td>\n");
            counter++;
        }
        return counter;
    }

    /**
     * Helper function to {@link #makeHtml(String) makeHtml}.
     */
    private void writeHtmlFile(String chartDirectory, StringBuilder html, boolean imagemap) {
        String indexHtml = null;
        if (imagemap) {
            indexHtml = chartDirectory + File.separator + "imagemap.html";
        } else {
            indexHtml = chartDirectory + File.separator + "index.html";            
        }
        html.append("</table></body></html>");
        FileOutputStream output = null;
        PrintStream printer = null;
        try {
            output = new FileOutputStream(indexHtml);
            printer = new PrintStream(output);
            printer.print(html.toString());
        } catch (FileNotFoundException e) {
            System.err.println(e.getMessage());
        } finally {
            PerformanceLogMonitor.closeStream(printer);
            PerformanceLogMonitor.closeStream(output);
        }
    }
    
    
    public double getSlope(double x1, double y1, double x2, double y2) {
        if (x1 == x2)
            return 0;
        else
            return (y2 - y1) / (x2 - x1);
    }

    public double getIntercept(double x1, double y1, double slope) {
        return (y1 - slope * x1);
    }

    public LineFunction2D makeLineFunction(
            SortedMap<Integer, Double> performance) {
        double x1 = performance.firstKey().doubleValue();
        double y1 = performance.get(performance.firstKey());
        double x2 = performance.lastKey().doubleValue();
        double y2 = performance.get(performance.lastKey());
        double slope = getSlope(x1, y1, x2, y2);
        double intercept = getIntercept(x1, y1, slope);
        LineFunction2D lineFunction = new LineFunction2D(intercept, slope);
        return lineFunction;
    }

    public void makeCharts(String chartDirectory) {
        for (String testcaseName : testData.keySet()) {
            XYSeries series = new XYSeries(testcaseName);
            XYSeries line = new XYSeries(testcaseName + " slope");
            SortedMap<Integer, Double> performance = testData.get(testcaseName);
            LineFunction2D lineFunction = makeLineFunction(performance);

            for (Map.Entry<Integer, Double> entry : performance.entrySet()) {
                Integer revision = entry.getKey();
                series.add(revision, entry.getValue());
                line.add(revision.doubleValue(), lineFunction.getValue(revision
                        .doubleValue()));
            }
            if (series.getItemCount() > 1) {
                XYSeriesCollection dataset = new XYSeriesCollection();
                dataset.addSeries(series);
                dataset.addSeries(line);
                NumberAxis xaxis = new NumberAxis("Revision");
                NumberAxis yaxis = new NumberAxis("Time (sec)");
                yaxis.setLowerBound(0);
                yaxis
                        .setUpperBound(performance.get(performance.lastKey()) * 1.2);
                XYItemRenderer renderer = new XYLineAndShapeRenderer(true,
                        false);
                renderer.setSeriesToolTipGenerator(0,
                        new FeatureXYToolTipGenerator());
                renderer.setSeriesToolTipGenerator(1, null);
                XYPlot plot = new XYPlot(dataset, xaxis, yaxis, renderer);
                JFreeChart chart = new JFreeChart(testcaseName, plot);
                chart.removeLegend();
                xaxis.setAutoRange(true);
                xaxis.setAutoRangeIncludesZero(false);
                ChartRenderingInfo info = new ChartRenderingInfo(
                        new StandardEntityCollection());
                OutputStream htmlOut = null;
                PrintWriter htmlWriter = null;
                try {
                    String htmlPath = chartDirectory + File.separator
                            + testcaseName + ".fragment";
                    htmlOut = new BufferedOutputStream(new FileOutputStream(
                            new File(htmlPath)));
                    htmlWriter = new PrintWriter(htmlOut);
                    String filePath = chartDirectory + File.separator
                            + testcaseName + ".png";
                    ChartUtilities.saveChartAsPNG(new File(filePath), chart,
                            500, 300, info);
                    htmlWriter.println("<IMG SRC=\"" + testcaseName + ".png"
                            + "\" " + "BORDER=0 USEMAP=\"#" + testcaseName
                            + "\">");
                    ChartUtilities.writeImageMap(htmlWriter, testcaseName,
                            info, false);
                } catch (IOException e) {
                    System.err.println(e.getMessage());
                } finally {
                    PerformanceLogMonitor.closeStream(htmlWriter);
                    PerformanceLogMonitor.closeStream(htmlOut);
                }
            }
        }
    }

    public SortedMap<Integer, Double> getTimingData(String testcase) {
        return testData.get(testcase);
    }

    public void addTimingInformation(String testName, Integer revision,
            Double testTime) {
        if (specialTestCase(testName)) {
            if (testData.get(testName) == null) {
                SortedMap<Integer, Double> timing = new TreeMap<Integer, Double>();
                timing.put(revision, testTime);
                testData.put(testName, timing);
            } else {
                SortedMap<Integer, Double> timing = testData.get(testName);
                timing.put(revision, testTime);
            }
        }
    }

    private boolean specialTestCase(String testCase) {
        for (String special : SPECIAL_TESTCASES) {
            if (special.equals(testCase))
                return true;
        }
        return false;
    }

}