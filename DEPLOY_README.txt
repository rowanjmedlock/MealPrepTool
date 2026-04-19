# PrepWeek PWA — Deployment Guide

## Files in this package
- `prepweek_pwa.html` — the app (fully offline-capable after first load)
- `sw.js` — service worker (enables offline mode + home screen install)
- `manifest.json` — PWA metadata (name, colors, icons)
- `icon-192.png` — app icon (YOU MUST CREATE THIS)
- `icon-512.png` — app icon (YOU MUST CREATE THIS)

---

## Step 1 — Create your icons

Make two square PNG icons:
- **192×192px** → save as `icon-192.png`
- **512×512px** → save as `icon-512.png`

Free tool: https://favicon.io/favicon-generator/
Pick a background color of `#D4603A` (the app's orange) with "PW" as initials.

---

## Step 2 — Deploy to GitHub Pages (free)

1. Create a free account at https://github.com
2. Create a new repository (e.g. `prepweek`)
3. Upload all 5 files to the repo
4. Go to **Settings → Pages → Source** → select `main` branch → Save
5. Your URL will be: `https://yourusername.github.io/prepweek/prepweek_pwa.html`

That's it. Free, permanent, HTTPS.

### Optional: Custom domain (~$10/yr)
Buy a domain (e.g. `prepweek.app`) at Namecheap or Cloudflare Registrar.
In GitHub Pages settings, add it as a custom domain. GitHub handles HTTPS automatically.

---

## Step 3 — Install on iPhone (your users do this once)

1. Open the URL in **Safari** (must be Safari, not Chrome)
2. Tap the **Share button** (box with arrow icon)
3. Tap **"Add to Home Screen"**
4. Tap **Add**

The app icon appears on the home screen. From that point on it works **completely offline** — no internet needed.

---

## Selling it

Simplest flow:
1. Set up a Gumroad or Stripe payment link
2. After purchase, send the buyer the URL + these install instructions
3. That's it

The app stores all data in the user's browser localStorage — private to their device, no server needed.

---

## Updating the app

When you release a new version:
1. Replace `prepweek_pwa.html` in your GitHub repo with the new file
2. In `sw.js`, change `prepweek-v1` to `prepweek-v2` (forces users to get fresh cache)
3. Commit and push

Users will get the update automatically next time they open the app with internet.
