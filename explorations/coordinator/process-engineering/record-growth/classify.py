"""Who made a commit that changed a record file, by its subject, its paths and its time.

Used by measure.py for the commits that labels-2026-10-02.csv does not hold.  That file
carries the labels of 2026-10-02 (regexes plus hand corrections); a commit after it
gets the regexes alone and no hand check, so its label can be wrong.

A label is a class and, inside a batch's run window, the batch.  The window of a batch is
its run's start (landings.csv) to its landing commit.
"""
import datetime as dt
import re

_windows = []


def set_windows(w):
    """w: [(batch, 'YYYY-MM-DDTHH:MM' start, 'YYYY-MM-DDTHH:MM' landing)] in UTC."""
    global _windows
    _windows = sorted(w, key=lambda x: x[1])


def batch_at(utc):
    t = dt.datetime.fromisoformat(utc).astimezone(dt.timezone.utc).strftime('%Y-%m-%dT%H:%M')
    for n, a, b in _windows:
        if a <= t <= b:
            return n
    return None


CONS = re.compile(r"consolidated|gardened|Split FACTS\.md|move what no longer governs|POSITIONS consolidated|POSITIONS split into|pure gos removed|Merge the record rewrite|Merge the cleaning|consolidation review's fixes|the 48 notes the check found missing|INDEX's 14 missing|rung entries shortened", re.I)
LAND = re.compile(r"Record the landed commits|Close the record of the repair batch|Climb batch \d\S* landed|Climb batch 1: the record closed|Batch 6\.5's first run landed|Record the landed", re.I)
FOLD = re.compile(r"Fold the review's corrections|review's repair|judge's ruling|judge's repair|Repair after|the review's fixes|Soften two overstated|merged-diff review", re.I)
RREC = re.compile(r"Climb batch \d\S*: rung \S+'s record|expected-failure tests for rows|homes for the four failures|Climb batch 3: Pavol's decision on the checker count|Climb batch 6\.5: the judge", re.I)
GATHER = re.compile(r"Close the rows climb batch", re.I)
FOLLOW = re.compile(r"landed as a follow-up|Rung D's notes folded|calculi callout", re.I)
PREP = re.compile(r"After batch .* landing|Prepare batch|decision record and (the )?manifest|manifest .* spliced|record (reviewed|brought|drafted)|review in place|Climb batch \S+ prepared|combined post-batch review|batch \S+'s (manifest|record|review)|review of climb batch|batches \d+ and \d+'s records|Batch 6\.5's review folded|Climb batch \d\S*'s record|The review of Pavol's decisions|Batch 7|Batch script|Complete the repair-batch workflow|The batch workflow generalised|the batch-2 process change|Climb batch 3's cost|Climb batch 3: what the stop cost|Revise the batched climb|Design the batched climb|Attack the batched climb|Record the repair batch|CLIMB-BATCH-\S+\.md|Climb batch \d\S*'s manifest|Climb batch \d\S*: (the )?(draft|first run's briefings)", re.I)
PROBE = re.compile(r"gap ledger|ledger merge|In-progress|Merge the three|probe|judgement|judgment|shadow|measured|explainer|survey|review|audit|map|brief|note\b|Territory|census|prototype|benchmark|history of|Why an operator|patents|Julia|wall of text|archaeology|post-?mortem|report|Process engineering|study|labor|design", re.I)
COORD = re.compile(r"^(POSITIONS|PLAN|FACTS|INDEX|Protocol|Boot note|Row \d+|Rows \d+|Handover|Where the work stands|Recover|Resume|Check-ins|Lineage|The repository's lineage|Record (how|that)|Ledger|Workflow:|Move experiment|After the reset|Before the compaction|The credits|Tag sealed|A silent specification|Revise|Fold the (repair|current)|Shift history|Two audits|Gate:|Index|Review queue|The queue)|Q\d answered|Watching the spend|The skill writer|The pre-training quiz|fortress-repo|decided|approved|Boot order", re.I)


def codeish(paths):
    return any(p.startswith(('ProjectFortress/', 'Library/', 'Specification/', 'bin/', 'build.xml', 'Documentation/')) for p in paths)


def ladderish(paths):
    return any(p.startswith(('explorations/compile-ladder/rung-', 'explorations/compile-ladder/climb-batch', 'explorations/compile-ladder/repair')) for p in paths)


def classify(subject, paths, utc):
    """(class_fine, batch)"""
    s, b = subject, batch_at(utc)
    if CONS.search(s):
        return ('consolidation/rewrite', '')
    if b:
        if LAND.search(s):
            return ('batch landing', b)
        if FOLD.search(s):
            return ('batch merged-diff review/judge repair', b)
        if RREC.search(s):
            return ('batch rung record', b)
        if codeish(paths) or GATHER.search(s) or (ladderish(paths) and not COORD.search(s)):
            return ('batch rung/gather worker', b)
        if PREP.search(s):
            return ('batch prep/post-batch routing (coordinator)', '')
        if COORD.search(s):
            return ('coordinator record keeping (during a batch)', '')
        return ('probe/judgement worker (during a batch)', '')
    if FOLLOW.search(s):
        return ('batch landing (follow-up)', '')
    if codeish(paths):
        return ('worker outside a batch', '')
    if PREP.search(s):
        return ('batch prep/post-batch routing (coordinator)', '')
    if COORD.search(s):
        return ('coordinator record keeping', '')
    if PROBE.search(s):
        return ('probe/judgement worker outside a batch', '')
    return ('other', '')


def coarse(c):
    if c.startswith('consolidation'):
        return 'consolidation'
    if c.startswith(('batch rung', 'batch merged', 'batch landing')):
        return 'batch'
    if c.startswith(('worker outside', 'probe', 'post-batch review')):
        return 'worker (probe/judgement/review)'
    return 'coordinator edit'
