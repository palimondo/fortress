"""Fetch pinned, checksum-verified toolchains; run from repository root."""
import hashlib
import json
import pathlib
import subprocess

manifest = json.loads(pathlib.Path('experiment/toolchains.json').read_text())
downloads = pathlib.Path.cwd().parent / 'toolchains'
downloads.mkdir(exist_ok=True)
jdk_root = pathlib.Path('/tmp/fortress-toolchains')
jdk_root.mkdir(exist_ok=True)
for name, algorithm, destination in [('jdk', 'sha256', jdk_root), ('ant', 'sha512', downloads)]:
    asset = manifest[name]
    archive = downloads / (name + '.tar.gz')
    if not archive.exists():
        subprocess.run(['curl', '--fail', '--location', '--max-time', '240',
                        '--silent', '--show-error', asset['url'], '-o', str(archive)], check=True)
    with archive.open('rb') as source:
        actual = hashlib.file_digest(source, algorithm).hexdigest()
    if actual != asset[algorithm]:
        raise SystemExit(f'{name}: archive checksum mismatch; remove it and retry')
    # Use tar and keep the JDK outside the workspace: its large module file
    # was observed to truncate between workspace tool calls in this environment.
    subprocess.run(['tar', '-xzf', str(archive), '-C', str(destination)], check=True)
    print(f'{name}: checksum verified and extracted to {destination}')
