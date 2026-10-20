from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root=Path('out')
with ZipFile('release.zip','w',ZIP_DEFLATED) as z:
    for p in root.rglob('*'):
        if p.is_file(): z.write(p,p.relative_to(root).as_posix())
print('Packaged static site for Netlify.')
