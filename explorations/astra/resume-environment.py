"""Restore missing transient tools from pinned caches; never rebuild Fortress.

Coordinator runs this from the repository root before resuming a worker.
"""
import hashlib
import json
import pathlib
import subprocess
import sys

root = pathlib.Path.cwd()
if not (root / 'ProjectFortress/build/com/sun/fortress/Shell.class').is_file():
    raise SystemExit('Compiled Fortress is missing: stop for coordinator diagnosis, no automatic rebuild.')
manifest = json.loads((root / 'experiment/toolchains.json').read_text())
toolchains = root.parent / 'toolchains'
for name, executable, archive, destination, algorithm in [
    ('jdk', pathlib.Path('/tmp/fortress-toolchains/jdk-25.0.4.1+1/bin/java'),
     toolchains / 'jdk.tar.gz', pathlib.Path('/tmp/fortress-toolchains'), 'sha256'),
    ('ant', toolchains / 'apache-ant-1.10.18/bin/ant',
     toolchains / 'ant.tar.gz', toolchains, 'sha512')]:
    if executable.is_file():
        print(name + ': existing installation retained', flush=True)
        continue
    with archive.open('rb') as stream:
        actual = hashlib.file_digest(stream, algorithm).hexdigest()
    if actual != manifest[name][algorithm]:
        raise SystemExit(name + ': cached archive checksum mismatch')
    destination.mkdir(parents=True, exist_ok=True)
    subprocess.run(['tar', '-xzf', str(archive), '-C', str(destination)], check=True)
    print(name + ': restored from verified cache', flush=True)
if not (pathlib.Path('/tmp/fortress-render-tools/usr/bin/emacs-nox').is_file()
        and pathlib.Path('/tmp/fortress-render-python/cairosvg/__init__.py').is_file()):
    subprocess.run([sys.executable, 'experiment/prepare-render.py'], check=True)
subprocess.run(['bash', '-c', 'source experiment/env.sh && source experiment/render-env.sh && '
                'java -version && emacs --batch --eval "(princ emacs-version)" && dvisvgm --version'],
               check=True)
print('Existing Fortress build and rendering tools ready. No build or baseline tests repeated.')
