"""Coordinator-only recovery of transient rendering tools; no Fortress rebuild.

Run from the repository root only if /tmp rendering dependencies were cleared.
"""
import concurrent.futures
import hashlib
import json
import pathlib
import subprocess
import sys

manifest = json.loads(pathlib.Path('experiment/render-toolchains.json').read_text())
cache = pathlib.Path.cwd().parent / 'toolchains/render-cache'
cache.mkdir(parents=True, exist_ok=True)
target = pathlib.Path('/tmp/fortress-render-tools')
target.mkdir(exist_ok=True)

def fetch(item):
    name, package = item
    archive = cache / (name + '.deb')
    if not archive.exists():
        subprocess.run(['curl', '--fail', '--silent', '--show-error', '--location',
                        '--max-time', '120', 'https://archive.ubuntu.com/ubuntu/'
                        + package['Filename'], '-o', str(archive)], check=True)
    with archive.open('rb') as stream:
        digest = hashlib.file_digest(stream, 'sha256').hexdigest()
    if digest != package['SHA256']:
        raise RuntimeError(f'{name}: checksum mismatch; remove archive and retry')
    return archive

with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
    archives = list(pool.map(fetch, manifest.items()))
for archive in archives:
    subprocess.run(['dpkg-deb', '-x', str(archive), str(target)], check=True)
subprocess.run([sys.executable, '-m', 'pip', 'install', '--target',
                '/tmp/fortress-render-python', '-r', 'experiment/render-requirements.txt'],
               check=True)
print('Rendering tools restored. Source experiment/render-env.sh.')
