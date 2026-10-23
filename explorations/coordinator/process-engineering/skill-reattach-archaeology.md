<!-- Whether Claude Code's re-attachment of the skills that a session loaded, after each compaction, is new or old behaviour: a Sonnet archaeology scout's report of 2026-10-23, word for word, at the curator's question of about 00:2x UTC; every compaction of the two coordinating sessions, 2026-08-19 to 2026-10-22, with the skills re-attached and their size, the Claude Code version and the context at the first call after it; how each skill entered the list; where the record noticed it. -->

# Skills re-attached after compaction: the archaeology

## Short answer

The re-attachment is old. The first `invoked_skills` attachment in the record is at 2026-08-19T07:08:39Z, in Claude Code 2.1.235, and 103 of the 139 compactions in the coordinating sessions carry one. What changed on 10-22 is the content. The coordinating session reloaded `fortress-repo` and `coordinator` itself at 23:11, nine minutes before the compaction, and `coordinator` had grown from 4,751 to 20,000 characters (the cap).

## Sources and method

- Transcript sources, deduplicated by uuid and ordered by timestamp:
  - First coordinating session `bdff267d`: `git show origin/transcripts:projects/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6.jsonl.parts/00{0,1}.jsonl`. It runs 2026-08-18 to 09-17.
  - `fe616d40` backup, older copy: `/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.until-2026-10-08T15-41.jsonl.parts/00{0..3}.jsonl`.
  - `fe616d40` backup, current: `/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl.parts/00{0,1,2}.jsonl`.
  - Live transcript: `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`.
  - Line numbers below are 0-based and refer to these files. In the live transcript the same entries sit at later positions because of replays.
- The coordinating work in `fe616d40` starts 2026-09-18T09:50Z. The file also holds a 09-08 chunk of 1,012 entries (a Fable worker-brief experiment) with no compaction.
- Scripts and caches (not in the repository): `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/` (`collect.py`, `an3.py`, `final1.py`, `ded.pkl`).
- The same per-compaction list as below is saved as `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/list.txt`.
- My "first call" numbers match the project's earlier `explorations/coordinator/postmortem-2026-09-19/compactions.md`, which gives 75233, 87553, 74346, 74072, 69243 and 75598 for its six compactions.

## 1. Per-compaction list (139 compactions: 78 manual, 61 auto)

Line format: `n | boundary time UTC | session | trigger | preTokens | postTokens | first-call context | version | attached skills (in attachment order) | size`

- Sessions: `b` = bdff267d, `f` = fe616d40.
- First call is input + cache creation + cache read of the first non-synthetic, non-sidechain assistant entry after the boundary.
- Skill names: upd = update-config, art = artifact-design, wf = workflow-authoring, coord = coordinator, repo = fortress-repo, cloud = cloud-container.
- A dash means no `invoked_skills` attachment.
- Size is `c` + the sum of the skills' `content` characters, or `r` + the characters of the rendered system reminder. The transcript stores the rendered text only from 2.1.265 (compaction 55) on. For the same attachment r is about c + 1K.
- The version on the 30 entries before the boundary, on the boundary and on the 30 entries after it is identical for all 139.

1|2026-08-19 01:58:32|b|manu|pre 470309|post 10351|first call 66502|v2.1.235|-
2|2026-08-19 02:57:33|b|auto|pre 144305|post 9956|first call 65748|v2.1.235|-
3|2026-08-19 03:41:06|b|auto|pre 144878|post 6798|first call 60596|v2.1.235|-
4|2026-08-19 04:54:29|b|auto|pre 145820|post 11439|first call 68175|v2.1.235|-
5|2026-08-19 05:05:35|b|auto|pre 145425|post 12001|first call 69788|v2.1.235|-
6|2026-08-19 05:12:22|b|auto|pre 143804|post 17925|first call 78844|v2.1.235|-
7|2026-08-19 05:27:13|b|auto|pre 146539|post 10512|first call 67138|v2.1.235|-
8|2026-08-19 05:55:58|b|auto|pre 144547|post 6741|first call 60710|v2.1.235|-
9|2026-08-19 06:34:54|b|auto|pre 146261|post 8405|first call 63229|v2.1.235|-
10|2026-08-19 07:08:39|b|auto|pre 170839|post 15477|first call 73691|v2.1.235|upd|c20000
11|2026-08-21 15:04:27|b|auto|pre 143902|post 15630|first call 75878|v2.1.238|upd|c20000
12|2026-08-21 15:32:19|b|auto|pre 144717|post 13354|first call 71760|v2.1.238|upd|c20000
13|2026-08-21 15:58:34|b|auto|pre 144038|post 21012|first call 82774|v2.1.238|upd|c20000
14|2026-08-21 16:51:43|b|auto|pre 146742|post 12981|first call 71554|v2.1.238|upd|c20000
15|2026-08-21 17:21:32|b|auto|pre 146576|post 21852|first call 83969|v2.1.238|art,upd|c31687
16|2026-08-21 17:32:05|b|auto|pre 154517|post 18772|first call 79665|v2.1.238|art,upd|c31687
17|2026-08-21 18:09:56|b|auto|pre 144144|post 17227|first call 77183|v2.1.238|art,upd|c31687
18|2026-08-21 19:20:43|b|auto|pre 144474|post 19135|first call 80035|v2.1.238|art,upd|c31687
19|2026-08-21 19:32:47|b|auto|pre 144775|post 27570|first call 93376|v2.1.238|art,upd|c31687
20|2026-08-21 19:39:13|b|auto|pre 143790|post 27021|first call 92710|v2.1.238|art,upd|c31687
21|2026-08-21 19:54:04|b|auto|pre 143579|post 20011|first call 82631|v2.1.238|art,upd|c31687
22|2026-08-21 21:11:42|b|auto|pre 147912|post 22560|first call 87792|v2.1.239|upd,art|c31687
23|2026-08-21 21:20:21|b|auto|pre 143618|post 22937|first call 88404|v2.1.239|upd,art|c31687
24|2026-08-21 23:14:44|b|auto|pre 143836|post 15696|first call 76108|v2.1.239|upd,art|c31687
25|2026-08-22 00:09:48|b|auto|pre 145489|post 19831|first call 82316|v2.1.239|upd,art|c31687
26|2026-08-22 00:21:05|b|auto|pre 147203|post 21710|first call 85651|v2.1.239|upd,art|c31687
27|2026-08-22 00:50:55|b|auto|pre 142985|post 16371|first call 76549|v2.1.239|upd,art|c31687
28|2026-08-22 01:19:39|b|auto|pre 142887|post 19549|first call 81849|v2.1.239|upd,art|c31687
29|2026-08-22 08:42:11|b|auto|pre 143908|post 21743|first call 84888|v2.1.239|upd,art|c31687
30|2026-08-22 09:21:23|b|auto|pre 144052|post 23937|first call 88065|v2.1.239|upd,art|c31687
31|2026-08-22 11:42:59|b|auto|pre 144271|post 16398|first call 76707|v2.1.239|upd,art|c31687
32|2026-08-22 11:52:59|b|auto|pre 146264|post 15320|first call 74654|v2.1.239|upd,art|c31687
33|2026-08-22 16:26:26|b|auto|pre 144906|post 15835|first call 75858|v2.1.240|upd,art|c31687
34|2026-08-22 17:27:55|b|auto|pre 144420|post 18353|first call 81013|v2.1.240|upd,art|c31687
35|2026-08-22 18:23:02|b|auto|pre 144406|post 15960|first call 76365|v2.1.240|upd,art|c31687
36|2026-08-22 19:39:54|b|auto|pre 146341|post 18502|first call 79886|v2.1.240|upd,art|c31687
37|2026-08-22 20:05:44|b|auto|pre 154279|post 17926|first call 79614|v2.1.240|upd,art|c31687
38|2026-08-22 21:03:24|b|auto|pre 144192|post 13794|first call 73051|v2.1.240|upd,art|c31687
39|2026-08-23 04:48:59|b|auto|pre 145862|post 16590|first call 77585|v2.1.241|upd,art|c31687
40|2026-08-23 05:37:48|b|auto|pre 144480|post 20287|first call 83578|v2.1.241|upd,art|c31687
41|2026-08-23 06:08:54|b|manu|pre 119765|post 14207|first call 77845|v2.1.241|upd,art|c31687
42|2026-08-23 07:06:14|b|auto|pre 144852|post 14275|first call 73710|v2.1.241|upd,art|c31687
43|2026-08-23 07:31:32|b|auto|pre 143855|post 15948|first call 76466|v2.1.241|upd,art|c31687
44|2026-08-23 08:47:20|b|auto|pre 146446|post 16686|first call 77359|v2.1.241|upd,art|c31687
45|2026-08-23 09:25:54|b|auto|pre 144900|post 15405|first call 75903|v2.1.241|upd,art|c31687
46|2026-08-23 10:31:22|b|auto|pre 143914|post 15721|first call 76461|v2.1.241|upd,art|c31687
47|2026-08-23 11:46:58|b|auto|pre 145257|post 15216|first call 75150|v2.1.241|upd,art|c31687
48|2026-08-23 11:54:48|b|auto|pre 143433|post 15064|first call 74906|v2.1.241|upd,art|c31687
49|2026-08-23 12:09:44|b|auto|pre 145548|post 13677|first call 72667|v2.1.241|art,upd|c31648
50|2026-08-23 12:59:31|b|auto|pre 166086|post 14202|first call 73293|v2.1.241|art,upd|c31648
51|2026-08-23 14:28:40|b|auto|pre 143987|post 15547|first call 75310|v2.1.241|art,upd|c31648
52|2026-08-24 20:10:55|b|manu|pre 767627|post 20184|first call 88138|v2.1.241|art,upd|c31648
53|2026-08-27 16:42:32|b|auto|pre 787217|post 19781|first call 82161|v2.1.247|art,upd|c31648
54|2026-09-08 16:59:39|b|manu|pre 446353|post 21703|first call 84723|v2.1.263|art,upd|c31648
55|2026-09-08 23:07:19|b|manu|pre 497437|post 20445|first call 83532|v2.1.265|art,upd|r32498
56|2026-09-09 01:06:00|b|manu|pre 211213|post 17176|first call 77939|v2.1.266|art,upd|r32498
57|2026-09-13 20:44:35|b|auto|pre 783764|post 15447|first call 77622|v2.1.270|art,upd|r32498
58|2026-09-14 07:37:47|b|manu|pre 458937|post 14531|first call 81286|v2.1.270|art,upd|r32498
59|2026-09-14 19:14:02|b|manu|pre 505159|post 19574|first call 89638|v2.1.270|art,upd|r32498
60|2026-09-14 20:49:30|b|manu|pre 423571|post 16146|first call 81039|v2.1.270|art,upd|r32498
61|2026-09-16 17:43:32|b|auto|pre 784299|post 17201|first call 74778|v2.1.273|art,upd|r32498
62|2026-09-16 22:12:31|b|manu|pre 131129|post 15414|first call 77584|v2.1.273|art,upd|r32498
63|2026-09-17 10:47:33|b|manu|pre 442504|post 22323|first call 84241|v2.1.274|wf,art,upd|r49535
64|2026-09-17 14:25:25|b|manu|pre 177831|post 22308|first call 87611|v2.1.274|wf,art,upd|r49535
65|2026-09-17 19:17:46|b|manu|pre 378591|post 21694|first call 82077|v2.1.274|wf,art,upd|r49535
66|2026-09-18 18:38:28|f|manu|pre 656249|post 11248|first call 75233|v2.1.277|-
67|2026-09-18 22:54:25|f|manu|pre 312505|post 14463|first call 87553|v2.1.277|-
68|2026-09-19 06:38:20|f|manu|pre 273551|post 7708|first call 74346|v2.1.278|-
69|2026-09-19 09:47:25|f|manu|pre 436175|post 13364|first call 74072|v2.1.278|-
70|2026-09-19 17:06:26|f|manu|pre 416266|post 9814|first call 69243|v2.1.278|-
71|2026-09-20 05:32:47|f|manu|pre 350420|post 14777|first call 75598|v2.1.278|-
72|2026-09-20 23:22:07|f|manu|pre 453546|post 10262|first call 69015|v2.1.278|-
73|2026-09-23 05:24:52|f|manu|pre 760625|post 11729|first call 72734|v2.1.280|-
74|2026-09-24 00:09:43|f|manu|pre 370635|post 8216|first call 72180|v2.1.281|-
75|2026-09-24 05:45:38|f|manu|pre 312268|post 8635|first call 67720|v2.1.281|-
76|2026-09-24 08:48:17|f|manu|pre 353611|post 12193|first call 77835|v2.1.281|-
77|2026-09-24 13:48:18|f|manu|pre 307148|post 7839|first call 71914|v2.1.281|-
78|2026-09-24 16:23:32|f|manu|pre 302359|post 8563|first call 67779|v2.1.281|-
79|2026-09-24 18:43:00|f|manu|pre 229146|post 8475|first call 72525|v2.1.281|-
80|2026-09-25 22:47:39|f|manu|pre 251378|post 9365|first call 71091|v2.1.282|-
81|2026-09-25 23:02:51|f|manu|pre 176622|post 6222|first call 61295|v2.1.282|-
82|2026-09-26 07:52:22|f|manu|pre 535095|post 8088|first call 66592|v2.1.283|-
83|2026-09-26 12:26:32|f|manu|pre 644025|post 7856|first call 64284|v2.1.283|-
84|2026-09-26 18:58:58|f|manu|pre 362071|post 7105|first call 62970|v2.1.283|-
85|2026-09-26 23:35:14|f|manu|pre 271080|post 7318|first call 63342|v2.1.283|-
86|2026-09-27 03:28:58|f|manu|pre 422999|post 9653|first call 66413|v2.1.283|-
87|2026-09-27 08:40:07|f|manu|pre 752246|post 10709|first call 67904|v2.1.283|-
88|2026-09-27 12:11:24|f|auto|pre 804656|post 15561|first call 75353|v2.1.283|-
89|2026-09-27 15:37:06|f|manu|pre 509107|post 10313|first call 73381|v2.1.283|-
90|2026-09-28 04:51:51|f|manu|pre 738469|post 7315|first call 64363|v2.1.283|-
91|2026-09-28 09:35:56|f|manu|pre 412036|post 10183|first call 67192|v2.1.283|-
92|2026-09-28 19:22:31|f|manu|pre 604594|post 7337|first call 63468|v2.1.283|-
93|2026-09-29 09:11:39|f|manu|pre 646274|post 11887|first call 69808|v2.1.283|wf|r17761
94|2026-09-29 16:35:07|f|auto|pre 784908|post 14147|first call 73368|v2.1.284|wf|r17761
95|2026-09-29 21:17:47|f|manu|pre 691131|post 15622|first call 76153|v2.1.284|wf|r17761
96|2026-09-30 11:25:48|f|manu|pre 770152|post 15169|first call 75271|v2.1.285|wf|r17761
97|2026-09-30 12:37:56|f|manu|pre 413824|post 16611|first call n/c (only `<synthetic>` zero-usage replies until 10-02T10:00:45, whose 132788 is not comparable)|v2.1.285|wf|r17761
98|2026-10-02 13:21:17|f|manu|pre 495338|post 13708|first call 74191|v2.1.287|wf|r17761
99|2026-10-03 04:43:09|f|auto|pre 786155|post 13740|first call 73926|v2.1.288|wf|r17761
100|2026-10-03 08:47:02|f|manu|pre 692077|post 22689|first call 91760|v2.1.288|wf|r17761
101|2026-10-04 11:41:22|f|manu|pre 768697|post 14901|first call 77768|v2.1.289|wf|r17761
102|2026-10-05 05:13:53|f|manu|pre 696376|post 12563|first call 77732|v2.1.289|wf|r17761
103|2026-10-06 16:57:38|f|manu|pre 553379|post 13963|first call 72203|v2.1.291|wf|r17761
104|2026-10-06 19:59:49|f|manu|pre 696085|post 14307|first call 80568|v2.1.292|wf|r17761
105|2026-10-07 04:58:31|f|manu|pre 496141|post 14130|first call 79662|v2.1.292|wf|r17761
106|2026-10-08 09:13:31|f|manu|pre 688002|post 16322|first call 75303|v2.1.294|wf|r17761
107|2026-10-08 12:56:36|f|manu|pre 733334|post 24155|first call 85305|v2.1.294|art,wf|r37826
108|2026-10-08 18:16:39|f|manu|pre 772626|post 23699|first call 91002|v2.1.294|art,wf|r37826
109|2026-10-08 21:45:16|f|manu|pre 652277|post 20897|first call 81539|v2.1.295|art,wf|r37826
110|2026-10-09 05:00:51|f|auto|pre 847332|post 20535|first call 82033|v2.1.295|art,wf|r37826
111|2026-10-09 22:42:26|f|manu|pre 756757|post 18607|first call 82291|v2.1.296|art,wf|r37826
112|2026-10-10 06:53:35|f|manu|pre 767695|post 19674|first call 82787|v2.1.296|art,wf|r37826
113|2026-10-11 04:23:27|f|manu|pre 644867|post 21705|first call 92681|v2.1.296|art,wf|r37826
114|2026-10-11 06:49:21|f|manu|pre 520232|post 21206|first call 85292|v2.1.296|art,wf|r37826
115|2026-10-12 16:38:26|f|manu|pre 775537|post 25197|first call 91251|v2.1.296|art,wf|r37826
116|2026-10-12 21:17:52|f|manu|pre 457714|post 19583|first call 82801|v2.1.296|art,wf|r37826
117|2026-10-13 00:54:35|f|auto|pre 784169|post 20951|first call 82403|v2.1.296|art,wf|r37826
118|2026-10-13 01:44:21|f|manu|pre 402648|post 19828|first call 81077|v2.1.296|art,wf|r37826
119|2026-10-13 07:52:37|f|manu|pre 579220|post 23099|first call 94147|v2.1.296|art,wf|r37826
120|2026-10-13 14:44:51|f|manu|pre 709664|post 23016|first call 85993|v2.1.296|art,wf|r37826
121|2026-10-13 19:47:59|f|auto|pre 785072|post 24286|first call 87353|v2.1.296|coord,art,wf|r42642
122|2026-10-13 22:54:39|f|manu|pre 495069|post 24413|first call 95167|v2.1.296|coord,art,wf|r42642
123|2026-10-14 11:20:45|f|manu|pre 729812|post 25544|first call 89622|v2.1.299|coord,art,wf|r42642
124|2026-10-14 18:38:48|f|manu|pre 503486|post 23833|first call 95903|v2.1.300|coord,art,wf|r42642
125|2026-10-15 06:54:02|f|manu|pre 664330|post 26427|first call 85043|v2.1.300|coord,art,wf|r42642
126|2026-10-16 09:19:54|f|manu|pre 491136|post 26462|first call 98174|v2.1.301|coord,art,wf|r42642
127|2026-10-16 19:27:43|f|auto|pre 785490|post 25287|first call 89782|v2.1.301|coord,art,wf|r42642
128|2026-10-17 19:01:21|f|auto|pre 784311|post 22050|first call 86387|v2.1.302|art,wf,coord|r42642
129|2026-10-19 16:43:00|f|manu|pre 700292|post 21422|first call 86182|v2.1.303|art,wf,coord|r42642
130|2026-10-19 21:13:40|f|manu|pre 483148|post 20219|first call 83017|v2.1.303|art,wf,coord|r42642
131|2026-10-20 00:06:12|f|auto|pre 785590|post 22191|first call 86177|v2.1.303|art,wf,coord|r42642
132|2026-10-20 01:00:21|f|manu|pre 560334|post 30401|first call 97829|v2.1.304|cloud,art,wf,coord|r45803
133|2026-10-20 06:11:15|f|manu|pre 709265|post 28932|first call 95339|v2.1.304|cloud,art,wf,coord|r45803
134|2026-10-20 13:58:51|f|manu|pre 554019|post 31186|first call 100791|v2.1.304|cloud,art,wf,coord|r45803
135|2026-10-20 17:22:22|f|manu|pre 453879|post 30116|first call 97757|v2.1.304|cloud,art,wf,coord|r45803
136|2026-10-21 23:58:59|f|manu|pre 650285|post 36032|first call 106204|v2.1.307|cloud,art,wf,coord|r45803
137|2026-10-22 10:26:44|f|manu|pre 713153|post 32974|first call 105680|v2.1.308|cloud,art,wf,coord|r45803
138|2026-10-22 16:38:28|f|manu|pre 621780|post 27140|first call 93268|v2.1.308|cloud,art,wf,coord|r45803
139|2026-10-22 23:20:14|f|manu|pre 437631|post 38341|first call 109718|v2.1.309|coord,repo,cloud,art,wf|r81121

Notes on the list:
- 36 compactions have no attachment: 1 to 9 and 66 to 92.
- The curator's "46K" set (cloud, art, wf, coord; 45,803 r-chars) appears at 7 compactions, 132 to 138, not 4. The last four of them are 135 to 138.
- Compaction 139 holds 81,121 r-chars (80,054 c-chars). The rise of 35,318 over compaction 138 is fortress-repo at 20,000 plus coordinator growing from 4,751 to 20,000 (+15,249) plus about 70 for headers.
- Each skill copy is cut at 20,000 characters, which is 19,900 characters of the body plus the marker "[... skill content truncated for compaction; use Read on the skill path if you need the full text]". I checked this for artifact-design: the body of 32,087 characters (10-08T11:19:59) against the copy at compaction 107.

## 2. First attachment, what came before, version

- First `invoked_skills` attachment: compaction 10.
  - Boundary 2026-08-19T07:08:39.250Z, trigger auto, 170,839 to 15,477 tokens, v2.1.235.
  - Attachment 07:08:39.234Z, `S1:000.jsonl` line 4003; boundary at line 3997.
  - Content: one skill, `update-config` (`bundled:update-config`), cut to 20,000 characters from a 232,249-character body.
  - Cause: `Skill` tool call `update-config` at 07:06:54.280Z (line 3988), 105 seconds earlier.
- What came before:
  - Compactions 1 to 9 (08-19 01:58 to 06:34, same version 2.1.235) carry no skill attachment in any form. The only attachment types written around those boundaries are `file`, `compact_file_reference`, `deferred_tools_delta`, `agent_listing_delta` and `mcp_instructions_delta`.
  - The summaries of 1 to 8 never contain the word "skill". Summary 9 (line 3834) says "artifact-design skill loaded", and summary 10 mentions update-config. Both are the model's own words.
  - No `Skill` call exists before 06:14:37Z on 08-19. Compaction 9 (06:34:54) came 20 minutes after that call and did not re-attach artifact-design. See section 3 for how irregular this is.
  - A search of all sources for the reminder wording and for `invoked_skills` outside the attachments found 8 hits, all from 2026-10-20 or later. None is a pre-10-20 form of the reminder.
  - `rendered` text appears in the transcript only from compaction 55 (2.1.265, 2026-09-08T23:07:20, line 2966 of `S1:001`). Its wording ("The following skills were invoked EARLIER in this session ...") is identical from there to compaction 139.
- Version at each first appearance:
  - Compaction 10 is v2.1.235. This is the record's first version (first line 08-18T21:03:16) and it lasts until 08-21T14:38:52 (2.1.238). Nine compactions on the same version had none, so there was no version change.
  - First attachment in `fe616d40`: compaction 93, 09-29T09:11:39, v2.1.283. That version began 09-26T00:32:18, and 11 compactions on it had none. No change.
  - `coordinator` first re-attached: compaction 121, 10-13T19:47:59, v2.1.296 (since 10-09T20:46:36). No change.
  - `cloud-container` first re-attached: compaction 132, 10-20T01:00:21. This is the first compaction on v2.1.304, first seen 10-20T00:42:11 at a container restart (the restart notice has the same timestamp). The cause was the Skill-tool load at 00:42:42, not the version.
  - `fortress-repo` first re-attached: compaction 139. This is the first compaction on v2.1.309 (first line 10-22T22:37:10). The cause was the loads at 23:11:43 (below).
- Evidence that the feature predates the record. These are lines in the public `CHANGELOG.md` at `raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md`, fetched today:
  - 2.1.45: "Fixed skills invoked by subagents incorrectly appearing in main session context after compaction".
  - 2.1.119: "Fixed skills invoked before auto-compaction being re-executed against the next user message".
  - 2.1.239: "Improved the reminder shown after compaction so a skill's original arguments are not re-run as a new request".
  - 2.1.304: "Changed compaction to send Claude the skill list again afterwards". This is the `skill_listing` attachment, a different thing from invoked skills.
  - No changelog line introduces the re-attachment.
- Documentation quote, in a claude-code-guide hand-back at 2026-10-22T22:54:35 (`P:002.jsonl` line 12961): "After compaction, each skill's latest invocation is re-attached (first 5,000 tokens each, 25,000 combined)."
- Installed binary 2.1.309 (`/opt/node22/bin/claude`), minified code, so it is evidence for 2.1.309 only:
  - A skill is recorded in an in-memory store when the Skill tool runs or the workflow-keyword autoload fires.
  - The compaction builds the attachment from that store, most recently invoked first, each skill cut at 5,000 tokens, 25,000 combined.
  - On resume the store is rebuilt only from `invoked_skills` attachments found in the transcript. `/clear` empties it.
  - I could not read older versions' code.

## 3. When each skill was loaded, and how

By the Skill tool in the coordinating sessions:
- `artifact-design`:
  - `bdff267d`: 2026-08-19T06:14:37.077Z (`S1:000` line 3758), also 08-21T17:12:16, 08-23T12:04:43, 08-23T22:20:31 and 09-09T01:48:38.
  - `fe616d40`: first 2026-10-08T11:19:59.502Z.
  - The Skill tool is its only entry route in the record. Copies re-attached in `fe616d40` start with "## Page contract — read before your first publish" (32,087 characters, cut to 20,000).
- `workflow-authoring`:
  - In `bdff267d` there is no Skill-tool call. It entered through the harness's workflow-keyword autoload: a `workflow_keyword_request` attachment, then a meta user message `<command-name>workflow-authoring</command-name>` plus the 16,966-character body, at 2026-09-17T02:03:21.984Z (`S1:001` line 12510). The 09-29 archaeology note `explorations/coordinator/postmortem-2026-09-29/archaeology-testing.md` line 12 says the user's word "ultracode" triggered it.
  - The same autoload fired in `fe616d40` at 09-18T18:54:41, 09-18T22:54:26, 09-20T06:06:54 and 09-20T23:47:59.
  - First Skill-tool calls in `fe616d40`: 09-26T00:44:36.740Z (with args) and 09-28T20:37:09.705Z.
  - In 2.1.309 the autoload also records the skill in the store (`bundled:workflow-authoring`).
- `coordinator`: 2026-10-04T11:42:18.530Z. Project skills were created in commit `70736a81d`, 10-04 10:34. Before that there was nothing to load.
- `fortress-repo`: 2026-10-04T20:21:48.066Z.
- `cloud-container`: 2026-10-13T01:45:29.230Z (2,543 characters then, 3,088 later). The skill file was created 10-05 06:23 by splitting `remote-container` (commit `a78e9ac37`). No earlier skill with another name was loaded.
- Other Skill-tool loads that never appeared in an attachment: dataviz 08-23T23:18:49, claude-api 09-18T19:18:51, update-config 09-27T13:15:25 and skill-creator 10-04T19:54:36.
- Lines to ignore: the `Skill` calls at 10-22T22:56:52, 23:07:23, 23:07:28, 23:10:36 and 23:10:41 are headless test boots. They wrote into this transcript (commit `e067a7403`: "headless test runs without a session id land in this session's transcript"). Their prompts begin "This is a test of the coordinating session's boot". The real loads are 23:11:43 (`fortress-repo`) and 23:11:48 (`coordinator`), each with an args text that says it refreshes the copy re-attached after the coming compaction (`P:002.jsonl` line 13434).

How regular is it? It is not.
- I found 41 skill loads (Skill tool or keyword autoload) followed by a later compaction.
- Only 10 were in the next compaction's attachment. 31 were not.
- Of those 31, 13 had a recorded container-restart notice or version change before the next compaction. 18 had none.
- The 18, by date of the load: 08-19T06:14, 08-23T23:18, 09-18T18:54, 09-18T19:18, 09-20T06:06, 09-26T00:44, 09-27T13:15, 10-04T11:42, 10-04T19:54, 10-04T20:21, 10-06T20:09, 10-08T09:25, 10-08T23:38, 10-10T05:27, 10-12T16:39, 10-13T01:33, 10-13T08:01, 10-16T08:08.
- Once a skill was in an attachment, it was never dropped within the same session.
- `fe616d40` started empty. Compactions 66 to 92 carry nothing although workflow-authoring was loaded six times in that window.
- `fortress-repo` was loaded 8 times between 10-04 and 10-20 and first re-attached on 10-22.
- This fits a theory I could not prove: a load that is not yet in an attachment is lost when the process restarts, because the resume path restores only from attachments. It does not explain the 18.

## 4. Did the record notice?

Yes, partly. It never named all the re-attached skills, and nobody noted that the set had changed or grown before 10-22.
- 2026-10-13T08:13:26 (`P:001.jsonl` line 833), coordinator to curator: the start context after the 07:52 compaction was bigger because "the compaction summary and the files the harness re-attached were bigger". Files only.
- 2026-10-13T22:57:24, commit `ece8b3abb`, `explorations/coordinator/BOOT.md` (`P:001.jsonl` line 5841):
  - "95K tokens of context before the first read (the harness's prompt and tools, the summary of 24K, the files and skills it re-attaches)".
  - The matching first-call figure is compaction 122: 95,167 tokens, with the three-skill attachment of 42,642 characters.
  - The skills are not named or sized there.
  - At 22:57:34 (line 5847) the coordinator told the curator "files it re-attaches by itself. We don't control most of it."
  - The sentence was kept in commit `732d05e5f` (10-14T11:22:13).
- 2026-10-14T18:46:30 (`P:001.jsonl` line 9813), curator: pasted the read error "File does not exist" for `.claude/skills/coordinator/references/boot.md` and wrote "This is the second boot up when you attempt this."
  - At 18:48:29 (line 9892) the coordinator said: "After a compaction, the harness shows me a copy of the coordinator skill from earlier in the session. That copy was an older version, which still named a boot.md part that no longer exists. The compaction hook now tells me to read the skill's file itself and not that copy (d2d12a1ec)."
  - Commit `d2d12a1ec`, 10-14 18:47:47, changed `.claude/settings.json`. This named the re-attached copy of one skill. The fix did not work, since a Read does not update the stored copy.
- 2026-10-20T06:03:58 (`P:002.jsonl` line 2759), the coordinator's own measurement of its context since the 01:00 compaction. Lines 2761 and 2762, the coordinator's text at 06:04:26, are the reply to "How come your context is getting so full so quickly?"
  - One line reads `46.2K 1x ('attachment', 'invoked_skills')`. The 06:11:15 compaction summary (line 2779) repeats "invoked_skills 46K".
  - So a context count did include them, as one measured item. The 06:04:26 reply names three causes (the repeated task-list reminder, the boot reads, its own work) and does not mention the skills.
- 2026-10-22T23:08:45 (`P:002.jsonl` line 13301), curator: "several boots had read errors trying to load `boot.md` instead of `BOOT.md`. Trace the root cause and fix!"
  - At 23:11:42 the coordinator loaded both skills "so that the compaction you're about to run re-attaches their current versions and not the copy from 10-13" (lines 13433 and 13434).
  - At 23:12:21 (line 13468) it gave the root cause: "After a compaction, Claude Code puts back a copy of each skill as it was the last time the Skill tool loaded it", and "A Read doesn't update the stored copy". It also said six boots from 10-13 22:54 to 10-19 21:15 tried to read the deleted file.
  - This is the first statement that covers every skill.
  - `explorations/coordinator/postmortem-2026-10-20-record/REPORT.md` line 131 records it, with the guard "the hook loads both skills with the Skill tool".
  - The hook change is commit `4f2257485`.
- Not found: the four files you named do not mention re-attached skills.
  - `boots.md` has no match for "skill" or "hook".
  - `compactions.md` covers only compactions 66 to 71 (09-18 to 09-20).
  - `reviews/coordinator-context-2026-09-27.md` covers a 09-27 segment (inside the no-attachment window 66 to 92) and counts attachments, but not `invoked_skills`.
  - `index-use-archaeology.md` is not about this.
  - They fall inside the window with no skill attachments (compactions 66 to 92), so they could not have seen one.
  - A grep of `explorations/`, `.claude/` and `CLAUDE.md` for the usual spellings finds only `REPORT.md` line 131, `BOOT.md` (the current scout line), `.claude/settings.json` and unrelated hits.

## What I could not find or establish

- Why 18 of the 31 lost loads were lost. I found no marker in the transcript that separates a silent process restart from a normal turn. The `skill_listing` attachment is not a reliable restart marker, since it appears on ordinary turns.
- Anything about how versions before 2.1.309 implemented the store, apart from the changelog lines above.
- An explanation for compaction 9: artifact-design loaded 20 minutes earlier was not re-attached. There was an idle gap of 739 s (06:20:53 to 06:33:12).
- A comparable first-call context for compaction 97.
- The backup's blind spots (a long single turn is not backed up, per `.claude/skills/cloud-container/references/hooks.md`) could hide a compaction. I saw no gap in the boundary sequence, and `bdff267d` ends at 09-17T20:31Z, after its last compaction.
