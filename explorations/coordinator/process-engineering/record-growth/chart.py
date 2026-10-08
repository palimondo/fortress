#!/usr/bin/env python3
"""Draw record-growth.png from series.csv and landings.csv (run measure.py first).

    python3 explorations/coordinator/process-engineering/record-growth/chart.py

Three panels share one time axis (UTC, 2026): the gap ledger in characters, the gap
ledger in rows, and FACTS, POSITIONS and INDEX in characters.  A thin vertical line at
each batch's landing runs through all three, labelled at the top.  One axis per panel:
no dual axes.  Colours are slots 1 to 3 of the dataviz skill's reference palette
(validated all-pairs, light mode); the ledger takes neutral ink.
"""
import csv, datetime as dt, os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.dates as md
from matplotlib.lines import Line2D

HERE = os.path.dirname(os.path.abspath(__file__))
SURFACE, INK, INK2, GRID = '#fcfcfb', '#0b0b0b', '#52514e', '#e3e2dc'
BLUE, ORANGE, AQUA, NEUTRAL = '#2a78d6', '#eb6834', '#1baf7a', '#3d3c39'

S = list(csv.DictReader(open(os.path.join(HERE, 'series.csv'))))
L = list(csv.DictReader(open(os.path.join(HERE, 'landings.csv'))))
T = lambda s: dt.datetime.strptime(s[:19].replace('T', ' '), '%Y-%m-%d %H:%M:%S')
t = [T(r['utc']) for r in S]
col = lambda k, f=1.0: [float(r[k]) * f for r in S]
by_commit = {r['commit']: r for r in S}
land = []
for r in L:
    s = next(x for x in S if x['commit'] == r['landing_commit'][:9] or r['landing_commit'].startswith(x['commit']))
    land.append((r['batch'], T(s['utc'])))
SHORT = {'ladder climb': 'ladder', 'repair batch': 'repair'}
label = lambda b: SHORT.get(b, b.replace('batch ', ''))

X0, X1 = dt.datetime(2026, 9, 8, 12), t[-1] + dt.timedelta(hours=6)
plt.rcParams.update({'font.size': 10, 'axes.edgecolor': GRID, 'axes.labelcolor': INK2, 'xtick.color': INK2, 'ytick.color': INK2,
                     'text.color': INK, 'figure.facecolor': SURFACE, 'axes.facecolor': SURFACE, 'savefig.facecolor': SURFACE})
fig, allax = plt.subplots(4, 1, sharex=True, figsize=(7.2, 10.8), gridspec_kw={'height_ratios': [0.30, 1, 0.8, 1.15], 'hspace': 0.12})
axL, ax1, ax2, ax3 = allax
axes = allax[1:]


def step(ax, y, color, lw=2.0, wash=False, z=3):
    x = t + [X1]; yy = y + [y[-1]]
    ax.step(x, yy, where='post', color=color, lw=lw, solid_joinstyle='round', zorder=z)
    if wash:
        ax.fill_between(x, yy, step='post', color=color, alpha=0.10, lw=0, zorder=1)


def panel_title(ax, text):
    ax.text(0.012, 0.97, text, transform=ax.transAxes, ha='left', va='top', fontsize=10.5, fontweight='bold', color=INK, zorder=8,
            bbox=dict(fc=SURFACE, ec='none', pad=2.0))


def end_dot(ax, y, color):
    ax.plot([t[-1]], [y], 'o', ms=6, color=color, mec=SURFACE, mew=2, zorder=6, clip_on=False)


# panel 1: ledger characters
y = col('ledger_chars', 1e-6)
step(ax1, y, NEUTRAL, wash=True)
end_dot(ax1, y[-1], NEUTRAL)
ax1.set_ylim(0, 1.45); ax1.set_yticks([0, 0.5, 1.0]); ax1.set_yticklabels(['0', '0.5M', '1.0M'])
panel_title(ax1, 'Gap ledger, characters')
ax1.annotate('1.25M', (t[-1], y[-1]), textcoords='offset points', xytext=(-8, 8), ha='right', fontsize=10, color=INK, fontweight='bold')

# panel 2: ledger rows
y = col('ledger_rows')
step(ax2, y, NEUTRAL)
end_dot(ax2, y[-1], NEUTRAL)
ax2.set_ylim(0, 800); ax2.set_yticks([0, 200, 400, 600])
panel_title(ax2, 'Gap ledger, rows')
ax2.annotate('638', (t[-1], y[-1]), textcoords='offset points', xytext=(-8, 8), ha='right', fontsize=10, color=INK, fontweight='bold')

# panel 3: FACTS, POSITIONS, INDEX in K characters
series = [('FACTS', 'facts_chars', BLUE), ('INDEX', 'index_chars', AQUA), ('POSITIONS', 'positions_chars', ORANGE)]
for name, k, c in series:
    y = col(k, 1e-3)
    step(ax3, y, c)
    end_dot(ax3, y[-1], c)
ax3.set_ylim(0, 400); ax3.set_yticks([0, 100, 200, 300])
ax3.set_yticklabels(['0', '100K', '200K', '300K'])
panel_title(ax3, 'FACTS, INDEX and POSITIONS, characters')
# direct labels at the right edge (leader-free: the three end values are far enough apart)
ends = {'FACTS': float(S[-1]['facts_chars']) / 1e3, 'INDEX': float(S[-1]['index_chars']) / 1e3, 'POSITIONS': float(S[-1]['positions_chars']) / 1e3}
for name, k, c in series:
    v = ends[name]
    ax3.annotate('%s %dK' % (name, round(v)), (t[-1], v), textcoords='offset points', xytext=(-8, 8), ha='right', fontsize=9.5, color=INK, fontweight='bold')
# the three biggest events of FACTS, in words
def point(commit, k):
    r = by_commit[commit]; return T(r['utc']), float(r[k]) / 1e3
pk = max(S, key=lambda r: float(r['facts_chars']))
ax3.annotate('FACTS peak %dK\nat batch 7b (09-30)' % round(float(pk['facts_chars']) / 1e3), (T(pk['utc']), float(pk['facts_chars']) / 1e3),
             xytext=(dt.datetime(2026, 9, 25, 18), 318), textcoords='data', ha='center', fontsize=9, color=INK2, zorder=8,
             bbox=dict(fc=SURFACE, ec='none', pad=1.5), arrowprops=dict(arrowstyle='-', color=INK2, lw=0.8, shrinkA=0, shrinkB=2))
d = by_commit['d4ddb06c4']
ax3.annotate('-92K: rung entries\ncut to the fact (10-02)', (T(d['utc']), float(d['facts_chars']) / 1e3),
             xytext=(dt.datetime(2026, 10, 4, 18), 352), textcoords='data', ha='center', fontsize=9, color=INK2, zorder=8,
             bbox=dict(fc=SURFACE, ec='none', pad=1.5), arrowprops=dict(arrowstyle='-', color=INK2, lw=0.8, shrinkA=0, shrinkB=2))
d = by_commit['93eda3889']
ax3.annotate('-55K rewrite\n(09-20)', (T(d['utc']), float(d['facts_chars']) / 1e3), textcoords='offset points',
             xytext=(-8, 52), ha='right', fontsize=9, color=INK2, zorder=8, bbox=dict(fc=SURFACE, ec='none', pad=1.5),
             arrowprops=dict(arrowstyle='-', color=INK2, lw=0.8, shrinkA=0, shrinkB=2))

# batch landings: a hairline through all panels, a label above the first
for ax in axes:
    ax.set_xlim(X0, X1)
    ax.grid(True, axis='y', color=GRID, lw=1.0)
    ax.set_axisbelow(True)
    for s in ('top', 'right'):
        ax.spines[s].set_visible(False)
    ax.tick_params(length=0)
    for b, tm in land:
        ax.axvline(tm, color='#9b9a92', lw=0.8, zorder=2)
# labels: evenly spaced slots in the band above the first panel, a slanted leader to each true landing time
axL.set_ylim(0, 1)
axL.axis('off')
slot0, slot1 = dt.datetime(2026, 9, 14, 12), dt.datetime(2026, 10, 6, 12)
n = len(land)
for i, (b, tm) in enumerate(land):
    slot = slot0 + (slot1 - slot0) * i / (n - 1)
    axL.text(slot, 0.50, label(b), rotation=90, ha='center', va='bottom', fontsize=8.5, color=INK, clip_on=False)
    axL.plot([slot, tm], [0.46, 0.0], color='#9b9a92', lw=0.8, clip_on=False, zorder=2)

ax3.xaxis.set_major_locator(md.DayLocator(interval=4))
ax3.xaxis.set_major_formatter(md.DateFormatter('%m-%d'))
plt.setp(ax3.get_xticklabels(), fontsize=9)
ax3.set_xlabel('UTC date, 2026 (first-parent commits of main; nothing of the four existed before 09-08)', fontsize=9, color=INK2, labelpad=6)

fig.suptitle('Growth of the record, commit by commit, 09-08 to 10-08', fontsize=13, fontweight='bold', x=0.02, ha='left', y=0.985)
fig.text(0.02, 0.953, 'A vertical line is a climb batch\'s landing, named at the top ("ladder" is the eight-rung\nclimb, "repair" the repair batch). Each step is one commit on main.',
         fontsize=9, color=INK2, ha='left', va='top', linespacing=1.4)
fig.subplots_adjust(left=0.12, right=0.92, top=0.90, bottom=0.085)
handles = [Line2D([], [], color=NEUTRAL, lw=2, label='gap ledger'), Line2D([], [], color=BLUE, lw=2, label='FACTS'),
           Line2D([], [], color=ORANGE, lw=2, label='POSITIONS'), Line2D([], [], color=AQUA, lw=2, label='INDEX'),
           Line2D([], [], color='#9b9a92', lw=1, label='a batch landing')]
fig.legend(handles=handles, loc='lower center', ncol=5, frameon=False, fontsize=9, bbox_to_anchor=(0.5, 0.0), handlelength=1.6, columnspacing=1.2)
out = os.path.join(HERE, 'record-growth.png')
fig.savefig(out, dpi=150)
print('wrote', out)
