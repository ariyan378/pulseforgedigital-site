# PulseForgeDigital Website

A static, dependency-free HTML/CSS/JS website. No build step required.

## File structure

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
├── services/            (20 individual service pages)
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   ├── images/           (empty — add real photos/screenshots here)
│   ├── icons/            (empty — add favicon/app icons here)
│   └── fonts/            (empty — fonts currently load from Google Fonts CDN)
├── robots.txt
├── sitemap.xml
└── .nojekyll
```

## 1. Preview locally

No build tools needed. Either:

- Double-click `index.html` to open it directly in a browser, **or**
- Serve it locally (recommended, avoids relative-path quirks):
  ```
  cd path/to/site
  python3 -m http.server 8000
  ```
  then visit `http://localhost:8000`.

## 2. Update content

- **Text**: edit the relevant `.html` file directly — all copy is plain HTML, no templating at runtime.
- **Services**: to add/edit a service by hand, duplicate a file in `/services/`, update its content, then add a card for it in `services.html` and a footer link if desired.
- **Images**: place files in `assets/images/` and reference them with relative paths, e.g. `<img src="assets/images/your-file.jpg" alt="...">` (use `../assets/images/...` from inside `/services/`).
- **Contact info**: WhatsApp number, phone, and email appear in the header, footer, hero, and contact page — update the phone number in every `wa.me/...` link and the `tel:`/`mailto:` links if it changes.

## 3. Placeholders to update before publishing

Search the codebase for the word **"Placeholder"** and the string **PLACEHOLDER-DOMAIN.com** — every instance needs your input:

- `PLACEHOLDER-DOMAIN.com` — appears in every page's Open Graph tag, in `robots.txt`, and in `sitemap.xml`. Replace with your real domain.
- Business hours, response time (contact.html) — address is already filled in (Bashundhara R/A, Dhaka, Bangladesh)
- Project timelines, revision-round policy, payment terms (faq.html, process.html) — pricing and ongoing support are intentionally left as "discussed directly with each client," not missing info
- Vision statement (about.html) — not present in the supplied brand materials
- Social media links (footer, currently marked "not yet supplied")
- Team bios (about.html) — not present in the supplied materials
- Privacy policy specifics (privacy-policy.html) — this is a labeled draft, not legal advice; have it reviewed before publishing
- Contact form backend (see step 6 below) if you want real email delivery instead of the WhatsApp handoff

## 4. Deploy on GitHub Pages

1. Create a new GitHub repository and push this entire folder to it (the `.nojekyll` file is already included so GitHub Pages serves it as-is).
2. In the repository, go to **Settings → Pages**.
3. Under **Source**, choose the branch (usually `main`) and the root folder (`/`).
4. Save. GitHub will publish at `https://<username>.github.io/<repo-name>/`.
5. If deploying to a **project site** (not a custom domain), all links in this site use relative paths, so it will work correctly under a subdirectory like `/repo-name/`.
6. Update `PLACEHOLDER-DOMAIN.com` in `robots.txt`, `sitemap.xml`, and the Open Graph tags to your actual GitHub Pages URL (or custom domain, if connected — see step 6).

## 5. Deploy on Namecheap shared hosting

1. Log in to Namecheap **cPanel**.
2. Open **File Manager** and navigate to `public_html` (or the subfolder for your domain/subdomain).
3. Upload the entire contents of this folder (not the folder itself — the files and subfolders like `assets/`, `services/` should sit directly inside `public_html`).
4. Confirm `index.html` is at the root of `public_html` so it loads at your domain automatically.
5. Visit your domain to confirm the site loads. All asset/service links use relative paths, so this works whether the site sits at the domain root or a subfolder.

## 6. Connect a custom domain

- **GitHub Pages**: In repository **Settings → Pages**, add your custom domain under "Custom domain." Add a `CNAME` file (GitHub creates this for you) and update your DNS provider with the records GitHub displays (usually an `A` record to GitHub's IPs or a `CNAME` record for a subdomain).
- **Namecheap**: If the domain is already registered with Namecheap and you're hosting there too, no extra DNS changes are usually needed — just point the domain to the hosting account in Namecheap's dashboard.
- After connecting a domain, update `PLACEHOLDER-DOMAIN.com` in `robots.txt`, `sitemap.xml`, and every page's Open Graph `og:url` tag to match.

## 7. Configuring the contact form

The contact form on `contact.html` does **not** email anywhere by default — it's a static site with no backend. As built, submitting the form opens WhatsApp in a new tab with a message pre-filled from the visitor's name, selected service, and message. This is intentional so the form never pretends to "send" somewhere it can't.

If you'd prefer real email delivery instead:

1. Choose a static-form backend, e.g. [Formspree](https://formspree.io) or [Getform](https://getform.io) (both have free tiers and work without a server).
2. Create an account and a new form endpoint with that provider.
3. In `contact.html`, change the `<form id="contactForm" ...>` tag's `action` attribute to the endpoint URL they give you, and set `method="POST"`.
4. Remove or keep the WhatsApp-handoff JavaScript in `assets/js/main.js` depending on whether you want both options.
5. Test a real submission after switching this on.

## 8. Before going live — final checklist

- [ ] Replace `PLACEHOLDER-DOMAIN.com` everywhere it appears
- [ ] Fill in every section marked "Placeholder" (see step 3)
- [x] Favicon added (`assets/icons/favicon.svg` + PNG fallbacks, wired into all 25 pages) — replace with your own brand mark anytime by swapping these files
- [ ] Review `privacy-policy.html` with legal input appropriate for your business/location
- [ ] Decide on the contact form approach (WhatsApp handoff vs. real backend) and configure accordingly
- [ ] Test every WhatsApp link, internal link, and the mobile menu on a real phone
