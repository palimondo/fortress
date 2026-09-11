#!/usr/bin/env python3
"""Run the small notation probe; optionally render its exact excerpts."""
import argparse
import datetime
import hashlib
import json
import os
from pathlib import Path
import subprocess
import time

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[1]


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--fortress-root', type=Path, default=REPO)
    parser.add_argument('--render', action='store_true')
    args = parser.parse_args()
    build = args.fortress_root.resolve()
    evidence = HERE / 'evidence'
    evidence.mkdir(exist_ok=True)
    env = dict(os.environ, FORTRESS_HOME=str(build), FORTRESS_THREADS='1')
    env.pop('JAVA_TOOL_OPTIONS', None)
    cmd = [str(build / 'bin/fortress'), str(HERE / 'NotationViews.fss')]
    started = datetime.datetime.now(datetime.timezone.utc).isoformat()
    clock = time.monotonic()
    try:
        result = subprocess.run(cmd, cwd=build, env=env, stdout=subprocess.PIPE,
                                stderr=subprocess.STDOUT, timeout=35)
        output, code = result.stdout, result.returncode
    except subprocess.TimeoutExpired as exc:
        output, code = (exc.stdout or b'') + b'\nTIMEOUT after 35 seconds\n', 124
    out = evidence / 'run.out.txt'
    out.write_bytes(output)
    record = dict(started_utc=started, command=cmd, cwd=str(build), exit_code=code,
                  elapsed_seconds=round(time.monotonic() - clock, 3), threads=1,
                  source_sha256=digest(HERE / 'NotationViews.fss'),
                  output_sha256=digest(out), java_home=env.get('JAVA_HOME'),
                  build='Pre-existing build; this helper does not rebuild Fortress')
    (evidence / 'run.json').write_text(json.dumps(record, indent=2) + '\n')
    print(output.decode(errors='replace'), end='')
    if code:
        raise SystemExit(code)
    if not args.render:
        return

    source = (HERE / 'NotationViews.fss').read_text().splitlines()
    snippets = {'same-data': source[4:8],
                'subscript-meaning': [source[n] for n in (13, 14, 17, 18)]}
    env['TEXINPUTS'] = '.:' + str(REPO / 'Fortify') + ':' + env.get('TEXINPUTS', '')
    figures = HERE / 'figures'
    figures.mkdir(exist_ok=True)
    for name, lines in snippets.items():
        tic = figures / (name + '.tic')
        tic.write_text('\\documentclass{article}\n\\usepackage{fortify}\n'
                       '\\usepackage[active,tightpage]{preview}\n'
                       '\\setlength\\PreviewBorder{6pt}\n\\begin{document}\n'
                       '\\begin{preview}\n`\n' + '\n'.join(lines)
                       + '\n`\n\\end{preview}\n\\end{document}\n')
        commands = [
            [str(REPO / 'bin/fortick'), '-q', str(tic)],
            ['latex', '-interaction=nonstopmode', '-halt-on-error', name + '.tex'],
            ['dvisvgm', '--no-fonts', '--exact-bbox', '--output=' + name + '.svg', name + '.dvi'],
            ['pdflatex', '-interaction=nonstopmode', '-halt-on-error', name + '.tex'],
            ['pdftoppm', '-png', '-singlefile', '-r', '170', name + '.pdf', name],
        ]
        for command in commands:
            log = evidence / (name + '-' + Path(command[0]).name + '.log')
            with log.open('wb') as stream:
                subprocess.run(command, cwd=figures, env=env, stdout=stream,
                               stderr=subprocess.STDOUT, timeout=30, check=True)
        print('Rendered', name)


if __name__ == '__main__':
    main()
