import sys
sys.path.insert(0,'.')
import classify as C
def span(w,a,b):
    d=C.load(w); return sum(e['rbytes'] for e in d['events'] if e['k']=='call' and a<=e['n']<=b)
print('W 16-34',span('W',16,34)/1000,'W 7-13',span('W',7,13)/1000)
print('N 11-15',span('N',11,15)/1000,'N 11-20',span('N',11,20)/1000)
print('G 7-15',span('G',7,15)/1000,'G 7-13',span('G',7,13)/1000, 'G 3-6',span('G',3,6)/1000)
print('C 4-10',span('C',4,10)/1000)
