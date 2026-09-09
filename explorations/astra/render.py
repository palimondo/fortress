"""Render real Fortress source (.fss) or a Fortify sheet (.tic) to SVG and PNG.

From the repo root, source experiment/env.sh and experiment/render-env.sh, then:
python experiment/render.py SOURCE.fss OUTPUT_DIRECTORY
python experiment/render.py SHEET.tic OUTPUT_DIRECTORY
Use record.py around this command to retain its console output too.
"""
import pathlib
import shutil
import subprocess
import sys
import tempfile

import cairosvg

source = pathlib.Path(sys.argv[1]).resolve()
destination = pathlib.Path(sys.argv[2]).resolve()
repository = pathlib.Path(__file__).resolve().parent.parent
destination.mkdir(parents=True, exist_ok=True)
with tempfile.TemporaryDirectory(prefix='fortress-figure-', dir='/tmp') as temporary:
    stage = pathlib.Path(temporary)
    sheet = stage / (source.stem + '.tic')
    if source.suffix == '.fss':
        sheet.write_text(
            '\\documentclass{article}\n\\usepackage{fortify}\n'
            '\\usepackage[active,tightpage]{preview}\n'
            '\\setlength\\PreviewBorder{6pt}\n'
            '\\begin{document}\n\\begin{preview}\n`' + source.read_text()
            + '`\n\\end{preview}\n\\end{document}\n')
    elif source.suffix == '.tic':
        shutil.copyfile(source, sheet)
    else:
        raise SystemExit('Expected .fss source or .tic Fortify sheet')
    try:
        subprocess.run([str(repository / 'bin/fortick'), str(sheet)], check=True)
        subprocess.run(['latex', '-interaction=nonstopmode', '-halt-on-error',
                        sheet.with_suffix('.tex').name], cwd=stage, check=True)
        svg = sheet.with_suffix('.svg')
        subprocess.run(['dvisvgm', '--no-fonts', '--exact-bbox', '-o', str(svg),
                        str(sheet.with_suffix('.dvi'))], cwd=stage, check=True)
        cairosvg.svg2png(url=str(svg), write_to=str(sheet.with_suffix('.png')),
                        scale=2, background_color='white')
    finally:
        # Copy only completed command-stage artifacts out of transient storage.
        # On failure retain TeX logs/intermediates for diagnosis as well.
        for artifact in stage.iterdir():
            if artifact.is_file():
                shutil.copyfile(artifact, destination / artifact.name)
print('Inspect:', destination / (source.stem + '.png'))
