# PulseForgeDigital Website — Handoff Document

**Purpose of this file:** This is a handoff brief for **Claude Code**. Place this file in the root of the project folder (alongside `index.html`) before opening the folder in Claude Code, so it has full context on what's been built, what's outstanding, and what to do next.

---

## 1. What this project is

A complete, static (no build step) multi-page HTML/CSS/JS website for **PulseForgeDigital**, a digital agency offering marketing, data & automation, and academic support services. It's built to be deployed as-is on **GitHub Pages** or **Namecheap shared hosting**, with WhatsApp as the primary contact method throughout.

There is **no framework, no package.json, no build command**. Every page is a plain `.html` file that can be opened directly in a browser.

---

## 2. Current status: ready to deploy, with a few placeholders

The site is functionally complete and has passed the checks below. It is **not yet ready to go fully live** because a handful of business details were intentionally left as clearly labeled placeholders rather than invented. See Section 5 for the full list — this is the main thing Claude Code should help finish.

### Already confirmed and built in:
- Brand colors, typography (Anton + IBM Plex Sans/Mono), and logo treatment applied consistently
- All 17 real services, each with its own detail page
- WhatsApp integration throughout (header, hero, every service, contact, footer, floating button) using static pre-encoded `wa.me` links — **works with JavaScript disabled**
- Address confirmed: **Bashundhara R/A, Dhaka, Bangladesh**
- Pricing and ongoing-support policy confirmed as "discussed directly with each client" (not a gap — this is the actual policy)
- Accessible FAQ accordion using native `<details>` (no JS dependency)
- Mobile-responsive nav, visible focus states, `prefers-reduced-motion` respected
- `robots.txt`, `sitemap.xml` (placeholder domain), `.nojekyll`, `404.html`, `privacy-policy.html` (draft, needs legal review)

### Validated (see Section 6 for full test log):
- All 25 HTML files have balanced tags (validated with Python's `html.parser`)
- Every internal relative link (root pages ↔ `/services/*.html`) resolves to a real file
- WhatsApp links are correctly percent-encoded
- `aria-current="page"` correctly marks the active nav item on every page

---

## 3. File structure

```
/
├── index.html
├── services.html
├── process.html
├── about.html
├── faq.html
├── contact.html
├── privacy-policy.html
├── 404.html
├── services/
│   ├── facebook-meta-ads.html
│   ├── cold-email-marketing.html
│   ├── email-marketing-existing-customers.html
│   ├── whatsapp-sms-marketing.html
│   ├── social-media-handling.html
│   ├── data-analysis-python.html
│   ├── ml-research-papers.html
│   ├── prediction-ml-models.html
│   ├── power-bi-dashboards.html
│   ├── database-setup-management.html
│   ├── excel-learning.html
│   ├── n8n-automation-workflows.html
│   ├── web-development.html
│   ├── design.html
│   ├── finance.html
│   ├── university-data-collection.html
│   └── assignments-presentations.html
├── assets/
│   ├── css/styles.css       (single shared stylesheet, CSS custom properties for the design system)
│   ├── js/main.js           (mobile nav toggle + contact-form-to-WhatsApp handoff only)
│   ├── images/              (empty — add real photos/screenshots here)
│   ├── icons/                (empty — add a real favicon here)
│   └── fonts/                (empty — fonts currently load from Google Fonts CDN)
├── robots.txt
├── sitemap.xml
├── .nojekyll
└── README.md                 (deployment instructions — GitHub Pages + Namecheap, already written)
```

**Do not restructure these folders** — every internal link and asset reference across all 25 HTML files uses relative paths built around this exact layout (root pages use `assets/...`, service pages use `../assets/...`).

---

## 4. Design system reference (for consistency if extending)

| Token | Value | Use |
|---|---|---|
| `--coral` | `#ff5757` | Primary brand color, CTAs |
| `--ink` | `#0a0a0a` | Dark backgrounds, headings |
| `--amber` | `#ffda6a` | Secondary accent |
| `--sky` | `#c2f6ff` | Secondary accent |
| `--periwinkle` | `#94b9ff` | Secondary accent |
| `--gray` | `#c5c5c5` | Secondary/neutral |

Display font: **Anton** (headings only, uppercase). Body font: **IBM Plex Sans**. Labels/eyebrows/mono accents: **IBM Plex Mono**. All loaded via Google Fonts CDN link tags in each page's `<head>` — no local font files currently.

WhatsApp number used everywhere: `01618-189994` / international `+880 1618-189994` / link base `https://wa.me/8801618189994`.

---

## 5. Outstanding placeholders — please resolve before going fully live

Search the project for the literal string **"Placeholder"** and **"PLACEHOLDER-DOMAIN.com"** to find every instance. As of this handoff:

| Item | Location(s) | Status |
|---|---|---|
| Real domain name | Every page's Open Graph `og:url`, `robots.txt`, `sitemap.xml` | **Not set** — currently `PLACEHOLDER-DOMAIN.com` |
| Business hours | `contact.html` | Not yet confirmed |
| Response time estimate | `contact.html` | Not yet confirmed |
| Project timelines | `faq.html` | Left general ("varies by scope") — fine as-is unless a fixed range should be stated |
| Revision-round policy | `process.html` | Left general — fine as-is unless a fixed number should be stated |
| Payment terms | `faq.html` | Not yet supplied |
| Vision statement | `about.html` | Not present in original brand materials — currently omitted with a note, not invented |
| Team bios/photos | `about.html` | Not present in original materials |
| Social media links | Footer (all pages) | Marked "not yet supplied" |
| Favicon | All pages reference `<link rel="icon" href="data:,">` (blank) | Add a real icon file to `assets/icons/` and update the tag in all 25 files |
| Privacy policy specifics | `privacy-policy.html` | Labeled draft — needs business/legal review, not legal advice as written |
| Contact form backend | `contact.html` / `assets/js/main.js` | Currently hands off to WhatsApp with pre-filled text (no backend). README explains how to swap in Formspree/Getform if real email delivery is wanted instead |
| Case studies / portfolio | `index.html` (portfolio section) | Intentionally left as a labeled "coming soon" placeholder — no fabricated projects. Replace with real case studies once available |

**Already resolved (do not treat as open):**
- Address: Bashundhara R/A, Dhaka, Bangladesh
- Pricing: intentionally "discussed directly with each client," not a gap
- Ongoing support terms: intentionally "discussed directly with each client," not a gap

---

## 6. Testing already performed

Run these same checks again after any further edits:

```bash
# 1. HTML tag balance check across all pages
python3 - <<'EOF'
import glob, html.parser
class Balance(html.parser.HTMLParser):
    def __init__(self):
        super().__init__(); self.stack=[]; self.errors=[]
        self.voids={'meta','link','img','br','input','hr','area','base','col','embed','source','track','wbr'}
    def handle_starttag(self,tag,attrs):
        if tag not in self.voids: self.stack.append(tag)
    def handle_endtag(self,tag):
        if self.stack and self.stack[-1]==tag: self.stack.pop()
        elif tag in self.stack:
            while self.stack and self.stack[-1]!=tag: self.stack.pop()
            if self.stack: self.stack.pop()
        else: self.errors.append(tag)
for f in glob.glob("**/*.html", recursive=True):
    p=Balance(); p.feed(open(f,encoding='utf-8').read())
    if p.stack or p.errors: print("ISSUE:", f, p.stack, p.errors)
print("Done.")
EOF

# 2. Broken internal link check
python3 - <<'EOF'
import re, glob, os
for f in glob.glob("**/*.html", recursive=True):
    base = os.path.dirname(f)
    for l in re.findall(r'(?:href|src)="([^"]+)"', open(f, encoding='utf-8').read()):
        if l.startswith(('http://','https://','mailto:','tel:','#','data:')): continue
        p = l.split('#')[0]
        if p and not os.path.exists(os.path.normpath(os.path.join(base, p))):
            print("BROKEN:", f, "->", l)
print("Done.")
EOF

# 3. Local preview
python3 -m http.server 8000
# then open http://localhost:8000
```

**Last known result:** all 25 HTML files balanced, zero broken internal links, WhatsApp links correctly percent-encoded, active nav state (`aria-current="page"`) correct on every page.

---

## 7. What Claude Code should do next

Suggested task order:

1. **Confirm the real domain name** with the client, then find/replace `PLACEHOLDER-DOMAIN.com` across `robots.txt`, `sitemap.xml`, and the `og:url` meta tag in all 25 HTML files.
2. **Add a real favicon**: drop an icon file into `assets/icons/`, then update `<link rel="icon" href="data:,">` in every page to point to it.
3. **Fill in remaining placeholders** listed in Section 5 as the client supplies them (business hours, response time, social links, etc.) — search for `placeholder-tag` class in the HTML to find each spot in context.
4. **Re-run the two validation scripts in Section 6** after any content edits.
5. **Deploy** following the step-by-step instructions already written in `README.md` (GitHub Pages and Namecheap `public_html`, both covered).
6. **Optional**: if the client wants real email delivery on the contact form instead of the WhatsApp handoff, follow the Formspree/Getform setup notes in `README.md` §7.

Do not introduce a build step, framework, or bundler — the brief for this project explicitly requires it stay plain HTML/CSS/JS, deployable with zero build process.
