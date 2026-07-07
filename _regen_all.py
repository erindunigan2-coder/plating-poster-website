import os, subprocess, fitz, shutil, time

CHROME = r"C:/Program Files/Google/Chrome/Application/chrome.exe"
SRC = r"C:/Users/EDUNIGAN/Desktop/ABrite Life/PLATING POSTERS - Training Manuals"
SITE = r"C:/Users/EDUNIGAN/Desktop/plating-posters-site"
PRIV = SITE + "/private/manuals"

M = {
 "bright-nickel-manual":"Bright Nickel","acid-zinc-manual":"Acid Zinc","alkaline-zinc-manual":"Alkaline Zinc",
 "zinc-nickel-manual":"Zinc-Nickel","hard-chrome-manual":"Hard Chrome","decorative-chrome-manual":"Decorative Chrome",
 "en-low-phos-manual":"Electroless Nickel Low Phos","en-mid-phos-manual":"Electroless Nickel Mid Phos",
 "en-high-phos-manual":"Electroless Nickel High Phos","anodize-type-ii-manual":"Anodize Type II",
 "anodize-type-iii-manual":"Anodize Type III","anodize-type-i-manual":"Anodize Type I","anodize-bsaa-manual":"Anodize BSAA",
 "anodize-paa-manual":"Anodize PAA","anodize-bright-manual":"Anodize Bright","anodize-integral-manual":"Anodize Integral Color",
 "anodize-2step-color-manual":"Anodize Two-Step Color","iron-phosphate-manual":"Iron Phosphate",
 "zinc-phosphate-manual":"Zinc Phosphate","manganese-phosphate-manual":"Manganese Phosphate",
 "hex-chromate-manual":"Hex Chromate","tri-chromate-manual":"Tri Chromate","chem-film-manual":"Chem Film",
 "black-oxide-manual":"Black Oxide","passivation-manual":"Passivation",
}

def shrink(pdf):
    d=fitz.open(pdf)
    try: d.subset_fonts(verbose=False)
    except: pass
    for pg in d:
        for img in pg.get_images(full=True):
            x=img[0]
            try:
                pix=fitz.Pixmap(d,x)
                if pix.width*pix.height < 200*200: continue
                if pix.n>=5: pix=fitz.Pixmap(fitz.csRGB,pix)
                d.update_stream(x, pix.tobytes("jpeg", jpg_quality=72))
            except: pass
    d.save(pdf+".t", garbage=4, deflate=True, deflate_images=True, deflate_fonts=True, clean=True)
    d.close(); os.replace(pdf+".t", pdf)

def render(html, pdf):
    for _ in range(5):
        if os.path.exists(pdf):
            try: os.remove(pdf)
            except: pass
        subprocess.run([CHROME,"--headless=new","--disable-gpu","--no-pdf-header-footer",
                        "--print-to-pdf="+pdf,"file:///"+html.replace("\\","/")],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=180)
        if os.path.exists(pdf) and os.path.getsize(pdf) > 5000:
            try:
                if fitz.open(pdf).page_count >= 2:
                    time.sleep(0.5)
                    return
            except: pass
        time.sleep(2)
    raise RuntimeError("render failed after retries: "+pdf)

for slug, base in M.items():
    enh=f"{SRC}/{base} - Training Manual - EN.html"; esh=f"{SRC}/{base} - Training Manual - ES.html"
    enp=f"{SRC}/{base} - Training Manual - EN.pdf"; esp=f"{SRC}/{base} - Training Manual - ES.pdf"
    render(enh,enp); shrink(enp); shutil.copyfile(enp, f"{PRIV}/{slug}-en.pdf")
    render(esh,esp); shrink(esp); shutil.copyfile(esp, f"{PRIV}/{slug}-es.pdf")
    subprocess.run(["python", SITE+"/_genassets.py", slug, f"{base} - Training Manual - EN.html", f"{base} - Training Manual - ES.html"],
                   cwd=SITE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=300)
    pp = fitz.open(f"{PRIV}/{slug}-en.pdf").page_count
    print(f"OK {slug}  EN {os.path.getsize(PRIV+'/'+slug+'-en.pdf')//1024}KB/{pp}pp  ES {os.path.getsize(PRIV+'/'+slug+'-es.pdf')//1024}KB", flush=True)

print("REGEN ALL DONE")
