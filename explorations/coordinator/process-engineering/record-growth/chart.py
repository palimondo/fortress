#!/usr/bin/env python3
"""Draw record-growth.png from series.csv and landings.csv (run measure.py first).

    python3 explorations/coordinator/process-engineering/record-growth/chart.py

Three panels share one time axis (UTC, 2026): the gap ledger in characters, the gap
ledger in rows, and the facts, the decisions and the index in characters (FACTS.md,
POSITIONS.md and INDEX.md, named as the revival page names them).  A thin vertical line
at each batch's landing runs through all three.  Everything that depends on the data is
computed from it: each panel's y-axis runs from 0 to a little above its largest value,
so no line leaves its panel; its ticks, its end labels and their spacing; and the one
annotation of the first and the third panel, which names that panel's largest fall
within two days, a rewrite, with its day and the values before and after.  One axis per
panel: no dual axes.  The colours are slots 1 to 3 of the dataviz skill's reference
palette (validated all-pairs in light mode on the page's white surface, the aqua below
3:1 and so direct-labelled); the ledger takes neutral ink.  The type is sized for the
page's phone column: the figure is 6 inches wide and its smallest text 14 pt, about
1.8 times the earlier chart's 9 pt at 7.2 inches.
"""
import csv, datetime as dt, os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.dates as md
import matplotlib.ticker as mt
from matplotlib.lines import Line2D

HERE = os.path.dirname(os.path.abspath(__file__))
SURFACE, INK, INK2, GRID, LANDING = '#ffffff', '#0b0b0b', '#52514e', '#e3e2dc', '#bdbcb4'
BLUE, ORANGE, AQUA, NEUTRAL = '#2a78d6', '#eb6834', '#1baf7a', '#3d3c39'
FS = 14                      # the smallest text, in points
HEAD = 1.26                  # each y-axis runs to this times its largest value: room for the annotation above the data
FALL = dt.timedelta(days=2)  # a fall is measured within this window

S = list(csv.DictReader(open(os.path.join(HERE, 'series.csv'))))
L = list(csv.DictReader(open(os.path.join(HERE, 'landings.csv'))))
T = lambda s: dt.datetime.strptime(s[:19].replace('T', ' '), '%Y-%m-%d %H:%M:%S')
t = [T(r['utc']) for r in S]
col = lambda k: [float(r[k]) for r in S]
land = []
for r in L:
    s = next(x for x in S if x['commit'] == r['landing_commit'][:9] or r['landing_commit'].startswith(x['commit']))
    land.append(T(s['utc']))

# the time axis: from noon before the first day on which any of the four files exists, to six hours past the last commit
first = next(i for i, r in enumerate(S) if any(float(r[k]) > 0 for k in ('ledger_chars', 'facts_chars', 'positions_chars', 'index_chars')))
X0 = dt.datetime.combine(t[first].date(), dt.time()) - dt.timedelta(hours=12)
X1 = t[-1] + dt.timedelta(hours=6)


def chars(v):
    """A count of characters as the page writes it: 541K, 1.25M."""
    return '%.2fM' % (v / 1e6) if v >= 1e6 else '%dK' % round(v / 1e3)


def tick_chars(v, _pos=None):
    return '0' if v == 0 else ('%gM' % (v / 1e6) if v >= 1e6 else '%gK' % (v / 1e3))


plt.rcParams.update({'font.family': ['Inter', 'DejaVu Sans', 'sans-serif'], 'font.size': FS,
                     'axes.edgecolor': GRID, 'axes.labelcolor': INK2, 'xtick.color': INK2, 'ytick.color': INK2,
                     'xtick.labelsize': FS, 'ytick.labelsize': FS, 'text.color': INK,
                     'figure.facecolor': SURFACE, 'axes.facecolor': SURFACE, 'savefig.facecolor': SURFACE})
fig, axes = plt.subplots(3, 1, sharex=True, figsize=(6.0, 8.8), gridspec_kw={'height_ratios': [1, 0.85, 1.15], 'hspace': 0.42})
ax1, ax2, ax3 = axes
fig.subplots_adjust(left=0.135, right=0.735, top=0.825, bottom=0.14)


def step(ax, y, color, wash=False):
    x = t + [X1]; yy = y + [y[-1]]
    ax.step(x, yy, where='post', color=color, lw=2.0, solid_joinstyle='round', zorder=3)
    if wash:
        ax.fill_between(x, yy, step='post', color=color, alpha=0.08, lw=0, zorder=1)
    # the end dot under its line, so that a rise in the last hours still shows as the line's end
    ax.plot([t[-1]], [y[-1]], 'o', ms=7, color=color, mec=SURFACE, mew=1.5, zorder=2.9, clip_on=False)


def frame(ax, title, top, fmt):
    """The panel's title above it, its y-axis from 0 to HEAD times its largest value, and its ticks up to that value only,
    so that the band above the data, where the annotation goes, has no gridline."""
    ax.set_title(title, loc='left', fontsize=FS + 1, fontweight='bold', color=INK, pad=8)
    ax.set_ylim(0, top * HEAD)
    ticks = [v for v in mt.MaxNLocator(nbins=4, steps=[1, 2, 2.5, 5, 10]).tick_values(0, top) if 0 <= v <= top]
    ax.yaxis.set_major_locator(mt.FixedLocator(ticks))
    ax.yaxis.set_major_formatter(mt.FuncFormatter(fmt))


def end_labels(ax, items):
    """Direct labels in the right margin at each line's end, (text, value), moved apart where two would touch."""
    fig.canvas.draw()
    to_px = ax.transData.transform
    gap = (FS + 3) * fig.dpi / 72
    ys = sorted(((to_px((md.date2num(t[-1]), v))[1], text) for text, v in items))
    placed = []
    for y, text in ys:   # from the lowest up: each at least one line above the one below it
        placed.append([y if not placed else max(y, placed[-1][0] + gap), text, y])
    over = placed[-1][0] - to_px((0, ax.get_ylim()[1]))[1]
    if over > 0:         # the top label is above the panel: move the stack down, keeping the gaps
        for p in placed:
            p[0] -= over
        for i in range(len(placed) - 2, -1, -1):
            placed[i][0] = min(placed[i][0], placed[i + 1][0] - gap)
    for y, text, y0 in placed:
        ax.annotate(text, (md.date2num(t[-1]), ax.transData.inverted().transform((0, y0))[1]), textcoords='offset points',
                    xytext=(14, (y - y0) * 72 / fig.dpi), ha='left', va='center', fontsize=FS, fontweight='bold', color=INK,
                    annotation_clip=False)


def largest_fall(y):
    """The largest fall within FALL: (day of its largest step, the value before, the value after, the time and value at its top)."""
    best = None
    a = 0
    for j in range(len(y)):
        while t[a] < t[j] - FALL:
            a += 1
        i = max(range(a, j + 1), key=lambda i: y[i])
        if best is None or y[i] - y[j] > best[0]:
            best = (y[i] - y[j], i, j)
    d, i, j = best
    if d <= 0:
        return None
    k = max(range(i + 1, j + 1), key=lambda k: y[k - 1] - y[k])
    return t[k], y[i], y[j], t[k], y[k - 1]


def fall_note(ax, y, fmt):
    """The panel's largest fall, in words, in the band above the data, with a leader to the top of the fall."""
    f = largest_fall(y)
    if not f:
        return
    day, before, after, x, top = f
    ytext = max(y) * (1 + (HEAD - 1) * 0.55)
    a = ax.annotate('rewrite of %s: %s to %s' % (day.strftime('%m-%d'), fmt(before), fmt(after)), (x, top), xytext=(x, ytext),
                    textcoords='data', ha='center', va='center', fontsize=FS, color=INK2, zorder=8,
                    bbox=dict(fc=SURFACE, ec='none', pad=1.0),
                    arrowprops=dict(arrowstyle='-', color=INK2, lw=0.9, shrinkA=0, shrinkB=3))
    # keep the text inside the panel's width
    fig.canvas.draw()
    bb, axb = a.get_window_extent(), ax.get_window_extent()
    shift = max(0, axb.x0 - bb.x0) - max(0, bb.x1 - axb.x1)
    if shift:
        nx = ax.transData.inverted().transform((ax.transData.transform((md.date2num(x), ytext))[0] + shift, 0))[0]
        a.set_position((md.num2date(nx).replace(tzinfo=None), ytext))


# panel 1: the ledger's characters
y = col('ledger_chars')
step(ax1, y, NEUTRAL, wash=True)
frame(ax1, 'Gap ledger, characters', max(y), tick_chars)
end_labels(ax1, [(chars(y[-1]), y[-1])])
fall_note(ax1, y, chars)

# panel 2: the ledger's rows
y = col('ledger_rows')
step(ax2, y, NEUTRAL)
frame(ax2, 'Gap ledger, rows', max(y), lambda v, _p=None: '{:,.0f}'.format(v))
end_labels(ax2, [('{:,.0f}'.format(y[-1]), y[-1])])

# panel 3: the facts, the decisions and the index, in characters
series = [('facts', 'facts_chars', BLUE), ('decisions', 'positions_chars', ORANGE), ('index', 'index_chars', AQUA)]
ys = {k: col(k) for _, k, _ in series}
for name, k, c in series:
    step(ax3, ys[k], c)
frame(ax3, 'Facts, decisions and index, characters', max(max(v) for v in ys.values()), tick_chars)
end_labels(ax3, [('%s %s' % (name, chars(ys[k][-1])), ys[k][-1]) for name, k, _ in series])
falls = {k: largest_fall(ys[k]) for _, k, _ in series}
big = max((k for k in falls if falls[k]), key=lambda k: falls[k][1] - falls[k][2], default=None)
if big:
    fall_note(ax3, ys[big], chars)

# the landings, the grid and the time axis
for ax in axes:
    ax.set_xlim(X0, X1)
    ax.grid(True, axis='y', color=GRID, lw=1.0)
    ax.set_axisbelow(True)
    for s in ('top', 'right'):
        ax.spines[s].set_visible(False)
    ax.tick_params(length=0, pad=5)
    for tm in land:
        ax.axvline(tm, color=LANDING, lw=0.8, zorder=2)
ax3.xaxis.set_major_locator(md.WeekdayLocator(byweekday=md.MO, interval=2))
ax3.xaxis.set_major_formatter(md.DateFormatter('%m-%d'))
ax3.set_xlabel('Date in 2026, UTC', fontsize=FS, color=INK2, labelpad=8)

fig.text(0.035, 0.985, 'Growth of the record, %s to %s' % (X0.strftime('%m-%d'), t[-1].strftime('%m-%d')),
         fontsize=FS + 4, fontweight='bold', ha='left', va='top')
fig.text(0.035, 0.946, 'Each step is one commit, and each vertical line\na batch\'s landing.',
         fontsize=FS, color=INK2, ha='left', va='top', linespacing=1.35)
handles = [Line2D([], [], color=c, lw=2.5, label=name) for name, _, c in series] + \
          [Line2D([], [], color=LANDING, lw=1.2, label='a landing')]
fig.legend(handles=handles, loc='lower left', ncol=4, frameon=False, fontsize=FS, bbox_to_anchor=(0.02, 0.003),
           handlelength=1.2, handletextpad=0.5, columnspacing=1.0)
out = os.path.join(HERE, 'record-growth.png')
fig.savefig(out, dpi=300)
print('wrote', out)
