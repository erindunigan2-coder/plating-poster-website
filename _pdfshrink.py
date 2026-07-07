import sys, os, fitz

src = sys.argv[1]
dst = sys.argv[2] if len(sys.argv) > 2 else src
before = os.path.getsize(src)
doc = fitz.open(src)

# Subset embedded fonts (big win when many weights embedded)
try:
    doc.subset_fonts(verbose=False)
except Exception as e:
    print("subset_fonts skipped:", e)

# Downsample any large embedded raster images to ~150 dpi-ish by re-encoding.
# (Chrome rasterizes some gradient/SVG backgrounds; recompress them as JPEG.)
for page in doc:
    for img in page.get_images(full=True):
        xref = img[0]
        try:
            pix = fitz.Pixmap(doc, xref)
            # skip tiny images and masks
            if pix.width * pix.height < 200 * 200:
                continue
            if pix.n >= 5:  # CMYK+alpha etc — convert to RGB
                pix = fitz.Pixmap(fitz.csRGB, pix)
            # cap longest side ~1400px
            scale = min(1.0, 1400.0 / max(pix.width, pix.height))
            if scale < 1.0:
                pix = fitz.Pixmap(pix, int(pix.width*scale), int(pix.height*scale), None) if False else pix
            new_jpg = pix.tobytes("jpeg", jpg_quality=72)
            doc.update_stream(xref, new_jpg)  # may not apply filter; fallback below
        except Exception:
            pass

doc.save(dst + ".tmp", garbage=4, deflate=True, deflate_images=True,
         deflate_fonts=True, clean=True)
doc.close()
os.replace(dst + ".tmp", dst)
after = os.path.getsize(dst)
print(f"{os.path.basename(src)}: {before//1024}KB -> {after//1024}KB ({100*after//before}%)")
