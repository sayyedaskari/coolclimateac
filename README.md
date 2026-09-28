# Cool Climate AC Services - website

A single-page, mobile-first website in plain HTML, CSS and JavaScript. No build
tools, no backend, no email. Every call to action opens WhatsApp. Upload the
folder to any shared host and it works.

## 1. WhatsApp number and messages

Everything reads from the `<body>` tag in `index.html`:

```html
<body
  data-whatsapp="918097570048"                 digits only, with country code
  data-whatsapp-display="+91 80975 70048"      how the number is shown
  data-wa-chat="Hello Cool Climate, I would like to enquire about AC sales/service. Please share more details."
  data-wa-book="Hello Cool Climate, I would like to book an AC service.">
```

Two kinds of button:

- **Chat on WhatsApp** opens a chat with the `data-wa-chat` text.
- **Book Your Service** opens a chat with a fill-in template: the `data-wa-book`
  line followed by Service, AC type, Brand, Issue, Area and Preferred time. When
  a visitor taps a specific service or AC type on the page, that line is
  pre-filled for them.

If you change the number, also regenerate the QR code in the contact panel
(`assets/img/whatsapp-qr.svg`). Any free QR generator works; encode
`https://wa.me/<number>` and save it as SVG or PNG under the same name.

The links in the HTML are already written out for the current number, so they
work even before JavaScript runs.

## 2. Website address

Replace `[WEBSITE URL]` (no trailing slash, e.g. `https://www.coolclimate.in`)
in `index.html`, `robots.txt` and `sitemap.xml` once you have a domain. Until
then the site works fine; only link previews and the sitemap need it.

## 3. Upload to shared hosting

1. Log in to your hosting control panel (cPanel, Plesk, Hostinger hPanel, etc.).
2. Open the File Manager and go to `public_html` (sometimes `htdocs` or `www`).
3. Upload everything inside this folder, keeping the folder structure. The
   `.htaccess` file is hidden on some systems; make sure it comes along.
4. Visit your domain. Done.

FTP works too (FileZilla, Cyberduck). Same folder, same rule.

## 4. Folder structure

```
index.html            the whole website
css/styles.css        all styling and animations
js/main.js            WhatsApp links, mobile menu, scroll effects, services photo swap
.htaccess             caching and compression for Apache hosts
robots.txt, sitemap.xml, site.webmanifest
favicon.ico, favicon-32.png, apple-touch-icon.png
assets/
  img/                photos (JPEG + WebP), logo files, og-image.jpg, whatsapp-qr.svg
  brands/             AC brand logos
  icons/              Phosphor icon files (already inlined into index.html; kept for reference)
  fonts/              Plus Jakarta Sans, self-hosted
```

## 5. Brand logos

`assets/brands/` holds official artwork for Daikin, LG, Samsung, Panasonic,
Voltas, Blue Star, Hitachi, Godrej and Whirlpool (from Wikimedia Commons and
Simple Icons). Carrier, O General and Lloyd are set in type until you add their
artwork: save the file in `assets/brands/` and swap the
`<span class="brand-wordmark">` for an `<img>` like the others. The logo strip
is duplicated twice in the HTML so it can scroll continuously; edit both copies.

## 6. Photos and credits

Most photos are free stock from Unsplash, used under the Unsplash License
(free for commercial use, no attribution required, but credit is good manners).
Two images (the cassette AC tile and the deep-cleaning photo) are AI-generated
placeholders because no suitable stock photo existed; replace them with your own
photos when you can.

| File | Used in | Photographer (Unsplash) |
|---|---|---|
| `hero-room-*` | hero, tall tile | [@___atmos](https://unsplash.com/@___atmos) |
| `hero-bedroom-*` | hero, small tile | [@mitchel3uo](https://unsplash.com/@mitchel3uo) |
| `hero-units-*` | hero, small tile | [@kienday](https://unsplash.com/@kienday) |
| `svc-sales-800` | services photo: AC Sales | [@mikeberyl](https://unsplash.com/@mikeberyl) |
| `svc-install-800` | services photo: Installation | [@zachmmalin](https://unsplash.com/@zachmmalin) |
| `svc-repair-800` | services photo: Repair | [@jonathecreator](https://unsplash.com/@jonathecreator) |
| `svc-amc-800` | services photo: Maintenance and AMC | [@87gi](https://unsplash.com/@87gi) |
| `svc-hvac-800` | services photo: Commercial HVAC | [@center999](https://unsplash.com/@center999) |
| `type-split-*` | AC types: Split | [@flaken](https://unsplash.com/@flaken) |
| `type-window-*` | AC types: Window | [@charamelon](https://unsplash.com/@charamelon) |
| `type-ductable-*` | AC types: Ductable | [@mitchel3uo](https://unsplash.com/@mitchel3uo) |
| `type-vrf-*` | AC types: VRV / VRF | [@kettenreaktion](https://unsplash.com/@kettenreaktion) |
| `type-hvac-*` | AC types: Commercial HVAC | [@sigmund](https://unsplash.com/@sigmund) |
| `type-cassette-*` | AC types: Cassette | AI-generated placeholder |
| `deep-cleaning-900` | services photo: Deep Cleaning | AI-generated placeholder |
| `og-image.jpg` | link previews (1200 x 630) | composed from the hero photos |

To swap a photo, keep the file name and shape (the hero tall tile is 4:5, the
services photos are 4:5, the AC type tiles are square except the two wide ones,
which are about 2:1) and overwrite both the `.jpg` and `.webp`.

## 7. Optional extras

- **Google Business Profile, Instagram, Facebook**: add the URLs to the
  `"sameAs"` list in the structured data block in `<head>`. Helps local SEO.
- **Analytics**: paste the tracking snippet just before `</head>`.
- **Force HTTPS**: once your SSL certificate is active, uncomment the three
  lines at the bottom of `.htaccess`.

## 8. Checklist before going live

- [ ] Tap every WhatsApp button on your phone once
- [ ] `[WEBSITE URL]` replaced in three files
- [ ] SSL active, HTTPS redirect enabled
- [ ] Submit `sitemap.xml` in Google Search Console
