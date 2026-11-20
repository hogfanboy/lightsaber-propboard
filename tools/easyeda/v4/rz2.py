import sys,json
exec(open('rz.py').read().split("ax.axhline")[0].replace("fig.savefig","#"))
cr=json.load(open('z_cr.json'))['data']['result']
from matplotlib.patches import Polygon
for ly,fills in cr:
    col='#f88' if ly==1 else '#88f'
    for poly in fills:
        if not poly: continue
        rings=poly if isinstance(poly[0],list) else [poly]
        for ring in rings:
            pts=[];i=0
            while i<len(ring):
                v=ring[i]
                if v=='L': i+=1; continue
                if v=='ARC': i+=2; continue
                if isinstance(v,(int,float)) and i+1<len(ring): pts.append((ring[i]*10,ring[i+1]*10)); i+=2
                else: i+=1
            if len(pts)>2: ax.add_patch(Polygon(pts,closed=True,fill=False,ec=col,lw=.8,zorder=6))
ax.axhline(354,color='k');ax.axhline(-354,color='k')
ax.set_xlim(x0,x1);ax.set_ylim(y0,y1);ax.set_aspect('equal');ax.grid(alpha=.3)
fig.savefig(sys.argv[2],dpi=110,bbox_inches='tight')
