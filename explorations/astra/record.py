"""Record an explicit, non-secret command and its output, not a session transcript.

Usage from repository root: python experiment/record.py LABEL TIMEOUT COMMAND ...
Do not pass credentials in command arguments or run commands that print secrets.
"""
import datetime
import hashlib
import json
import os
import pathlib
import signal
import shutil
import subprocess
import sys
import tempfile
import time

label, limit, *command = sys.argv[1:]
if not command or not label.replace('-', '').replace('_', '').isalnum():
    raise SystemExit('Expected safe label, timeout in seconds, and command')
stamp = datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S.%fZ')
folder = pathlib.Path('experiment/evidence') / (stamp + '-' + label)
folder.mkdir(parents=True, exist_ok=False)
metadata = {'command': command, 'cwd': str(pathlib.Path.cwd()), 'started_utc': stamp,
            'base_commit': subprocess.check_output(['git', 'rev-parse', 'HEAD'], text=True).strip()}
metadata.update(status='started', exit_code=None, source_snapshots=[])
worker_root = pathlib.Path('experiment/worker').resolve()
for argument in command:
    candidate = pathlib.Path(argument)
    if candidate.suffix not in {'.fss', '.tic'} or not candidate.is_file():
        continue
    resolved = candidate.resolve()
    if not resolved.is_relative_to(worker_root):
        continue
    relative = resolved.relative_to(worker_root)
    snapshot = folder / 'source' / relative
    snapshot.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(resolved, snapshot)
    metadata['source_snapshots'].append({
        'original': str(candidate), 'saved': str(snapshot.relative_to(folder)),
        'sha256': hashlib.sha256(snapshot.read_bytes()).hexdigest()})
# Persist intent before execution. If interrupted, 'started' means completion
# is unknown; it is not proof that a process is still live in a later session.
(folder / 'command.json').write_text(json.dumps(metadata, indent=2) + '\n')
start = time.monotonic()
with tempfile.TemporaryDirectory(prefix='fortress-evidence-', dir='/tmp') as temporary:
    output = pathlib.Path(temporary) / 'output.log'
    with output.open('w') as stream:
        process = subprocess.Popen(command, stdout=stream, stderr=subprocess.STDOUT,
                                   start_new_session=True)
        try:
            code = process.wait(timeout=float(limit))
        except subprocess.TimeoutExpired:
            os.killpg(process.pid, signal.SIGKILL)
            process.wait()
            code = 124
            stream.write('\nRecording wrapper: command timed out.\n')
    # Publish once complete; a live workspace log was observed to lose later
    # output during overlapping tool calls in this environment.
    shutil.copyfile(output, folder / 'output.log')
metadata.update(status='completed', exit_code=code, elapsed_seconds=round(time.monotonic() - start, 3))
(folder / 'command.json').write_text(json.dumps(metadata, indent=2) + '\n')
print(json.dumps(metadata, indent=2))
print('Output:', folder / 'output.log')
raise SystemExit(code)
