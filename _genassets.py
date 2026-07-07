import io, os, subprocess, sys

CHROME = r"C:/Program Files/Google/Chrome/Application/chrome.exe"
SRC_DIR = r"C:/Users/EDUNIGAN/Desktop/ABrite Life/PLATING POSTERS - Training Manuals"
PUB = r"C:/Users/EDUNIGAN/Desktop/plating-posters-site/public/manuals"
SAMP = PUB + "/samples"
TMP = r"C:/Users/EDUNIGAN/Desktop/plating-posters-site/_tmp_assets"
os.makedirs(TMP, exist_ok=True)

# args: <slug> <EN html name> <ES html name>
slug, en_name, es_name = sys.argv[1], sys.argv[2], sys.argv[3]

def sections(html_path):
    s = io.open(html_path, encoding="utf-8").read()
    head, rest = s.split('<section class="page', 1)
    parts = ("<section class=\"page" + rest)
    # split into section chunks
    chunks = parts.split('<section class="page')
    chunks = [('<section class="page' + c) for c in chunks if c.strip()]
    return head, chunks

def shot(html_text, out_jpg):
    tmp_html = TMP + "/_one.html"
    io.open(tmp_html, "w", encoding="utf-8").write(html_text)
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                    "--force-device-scale-factor=2", "--window-size=816,1056",
                    "--screenshot=" + out_jpg, "file:///" + tmp_html],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

# EN: cover (page1) + samples p1..p6
head_en, chunks_en = sections(SRC_DIR + "/" + en_name)
# close tag for a one-section doc
def doc(head, chunk):
    return head + chunk + "\n</body></html>"

shot(doc(head_en, chunks_en[0]), PUB + "/" + slug + "-cover.jpg")
for i in range(6):
    shot(doc(head_en, chunks_en[i]), SAMP + "/" + slug + "-p" + str(i+1) + ".jpg")

# ES: cover only
head_es, chunks_es = sections(SRC_DIR + "/" + es_name)
shot(doc(head_es, chunks_es[0]), PUB + "/" + slug + "-cover-es.jpg")

print("assets generated for", slug)
for f in [PUB + "/" + slug + "-cover.jpg", PUB + "/" + slug + "-cover-es.jpg"] + \
         [SAMP + "/" + slug + "-p" + str(i+1) + ".jpg" for i in range(6)]:
    print(("OK " if os.path.exists(f) and os.path.getsize(f) > 2000 else "MISSING "), os.path.basename(f),
          os.path.getsize(f) if os.path.exists(f) else 0)
