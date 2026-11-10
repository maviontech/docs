"""Remove directory entries from a pptx zip (pptxgenjs writes them; cloud editors dislike them)."""
import sys, zipfile, shutil, os
for path in sys.argv[1:]:
    tmp = path + ".tmp"
    with zipfile.ZipFile(path) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if item.filename.endswith("/"):
                continue
            zout.writestr(item, zin.read(item.filename))
    shutil.move(tmp, path)
    print("cleaned", os.path.basename(path))
