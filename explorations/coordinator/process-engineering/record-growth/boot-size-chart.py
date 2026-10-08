import csv, datetime as dt
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.dates as md
from matplotlib.lines import Line2D
R=list(csv.DictReader(open('boot-size.csv')))
def T(s): return dt.datetime.strptime(s,'%Y-%m-%dT%H:%M:%SZ')
t=[T(r['compaction_utc']) for r in R]   # x = compaction that started the boot; the /context ran minutes later
be=[float(r['boot_end_k']) for r in R]; ctx=[float(r['context_total_k']) for r in R]
F=[float(r['facts_kb']) for r in R]; S=[float(r['positions_kb']) for r in R]; I=[float(r['index_kb']) for r in R]
rf=[int(r['read_facts']) for r in R]; rs=[int(r['read_positions']) for r in R]; ri=[int(r['read_index']) for r in R]
plt.rcParams.update({'font.size':12})
fig,(a1,a2)=plt.subplots(1,2,sharey=True,figsize=(7.2,9.4),gridspec_kw={'width_ratios':[2.1,4.6],'wspace':0.05})
col={'boot':'#111111','F':'#c0392b','S':'#2471a3','I':'#1e8449'}
groups=[(a1,range(0,3)),(a2,range(3,9))]
for ax,idx in groups:
    idx=list(idx); x=[t[i] for i in idx]
    ax.plot(x,[be[i] for i in idx],'-',color=col['boot'],lw=3,zorder=5)
    ax.plot(x,[be[i] for i in idx],'o',color=col['boot'],ms=8,zorder=6)
    ax.plot(x,[ctx[i] for i in idx],'D',mfc='white',mec=col['boot'],mew=2,ms=9,zorder=7)
    for y,k,rd in ((F,'F',rf),(S,'S',rs),(I,'I',ri)):
        ax.plot(x,[y[i] for i in idx],'-',color=col[k],lw=1.8)
        for i in idx:
            ax.plot([t[i]],[y[i]],'o',color=col[k] if rd[i] else 'white',mec=col[k],mew=1.6,ms=6,zorder=4)
    ax.grid(True,alpha=.3)
a1.set_xlim(dt.datetime(2026,9,19,4),dt.datetime(2026,9,21,0))
a2.set_xlim(dt.datetime(2026,9,27,0),dt.datetime(2026,10,1,0))
a1.set_ylim(0,350)
for ax,days in ((a1,(19,20)),(a2,(27,28,29,30))):
    ax.set_xticks([dt.datetime(2026,9,d,12) for d in days])
    ax.set_xticklabels(['09-%02d'%d for d in days])
    ax.xaxis.set_minor_locator(md.DayLocator())
    ax.grid(True,which='minor',axis='x',alpha=.5)
    ax.grid(False,which='major',axis='x')
    ax.tick_params(axis='x',labelsize=11,length=0)
a2.tick_params(axis='y',left=False)
a1.spines['right'].set_visible(False); a2.spines['left'].set_visible(False)
a1.set_ylabel('K tokens (boot end)   /   KB (files on main)')
off={0:(-16,-20),1:(14,-19),2:(-4,-20),3:(0,-22),4:(2,-22),5:(-24,-3),6:(20,-16),7:(-26,-6),8:(18,-17)}
for i,(x,v) in enumerate(zip(t,be)):
    ax=a1 if i<3 else a2
    ax.annotate('%.0f'%v,(x,v),textcoords='offset points',xytext=off[i],ha='center',fontsize=11,fontweight='bold')
a2.annotate('after the FACTS/POSITIONS\nrewrite: 310 -> 284',(t[8],be[8]),textcoords='offset points',xytext=(-52,-78),ha='center',fontsize=10,arrowprops=dict(arrowstyle='->',color='#555'))
fig.suptitle('Size of the coordinator boot, 2026-09-19 to 09-30',fontsize=14,fontweight='bold',y=0.985)
h=[Line2D([],[],color=col['boot'],lw=3,marker='o',ms=8,label='boot end, K tokens (prompt after the boot reads)'),
   Line2D([],[],ls='',marker='D',mfc='white',mec=col['boot'],mew=2,ms=9,label='/context total, K (run after the boot)'),
   Line2D([],[],color=col['F'],lw=1.8,marker='o',ms=6,label='FACTS.md, KB on main'),
   Line2D([],[],color=col['S'],lw=1.8,marker='o',ms=6,label='POSITIONS.md, KB on main'),
   Line2D([],[],color=col['I'],lw=1.8,marker='o',ms=6,label='INDEX.md, KB on main'),
   Line2D([],[],ls='',marker='o',mfc='white',mec='#555',mew=1.6,ms=6,label='hollow: that boot did not read the file')]
fig.subplots_adjust(left=0.12,right=0.985,top=0.94,bottom=0.30)
fig.text(0.5,0.235,'x: UTC time of the compaction that started each boot; axis broken between 09-21 and 09-27',ha='center',fontsize=9.5,color='#444')
fig.legend(handles=h,loc='lower center',ncol=1,fontsize=10.5,frameon=False,bbox_to_anchor=(0.5,0.005))
fig.savefig('boot-size.png',dpi=150)
print('ok')
