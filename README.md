# Cool Climate AC Services - website

A single-page, mobile-first website in plain HTML, CSS and JavaScript. No build
tools, no backend, no email. Every call to action opens WhatsApp. Upload the
folder to any shared host and it works.

## 1. WhatsApp number and messages

Everything reads from the `<body>` tag in `index.html`:

```html
<body
  data-whatsapp="917304304787"                 digits only, with country code
  data-whatsapp-display="+91 73043 04787"      how the number is shown
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

The site is set up for **https://coolclimateac.in** (https, no `www`). That
address is used in `index.html` (canonical link, social previews, structured
data), `robots.txt` and `sitemap.xml`. If the domain ever changes, search and
replace it in those three files.

Before launch:

1. Point the domain's DNS at your hosting account.
2. Turn on the free SSL certificate in the hosting panel (often called AutoSSL
   or Let's Encrypt) and check that https://coolclimateac.in loads.
3. Then, and only then, uncomment the three redirect lines in `.htaccess`.
   They send `http://` and `www.` visitors to the one canonical address.

## 3. Facebook and Instagram links

Instagram is live: https://www.instagram.com/coolclimate.a.c is linked in the
contact panel and the footer, and listed in `"sameAs"` in the structured data.

Facebook still points to `#` in the same two places. Clicking it does nothing
until a real URL goes in. When the page exists:

1. In `index.html`, search for `data-social="facebook"` and replace `href="#"`
   with the Facebook page URL in both places.
2. Add the same URL to the `"sameAs"` list in the structured data block in
   `<head>`:

```json
"sameAs": [
  "https://wa.me/917304304787",
  "https://www.instagram.com/coolclimate.a.c",
  "https://www.facebook.com/yourpage"
],
```

## 4. Upload to shared hosting

1. Log in to your hosting control panel (cPanel, Plesk, Hostinger hPanel, etc.).
2. Open the File Manager and go to `public_html` (sometimes `htdocs` or `www`).
3. Upload everything inside this folder, keeping the folder structure. The
   `.htaccess` file is hidden on some systems; make sure it comes along.
4. Visit your domain. Done.

FTP works too (FileZilla, Cyberduck). Same folder, same rule.

The branded 404 page and the `/index.html` redirect assume the site sits at the
domain root (`public_html` itself, not a subfolder).

## 5. Folder structure

```
index.html            the whole website
404.html              branded "page not found" page
css/styles.css        all styling and animations
js/main.js            WhatsApp links, mobile menu, scroll effects, services photo swap
.htaccess             redirects, caching, compression and security headers (Apache hosts)
robots.txt            lets search engines crawl everything, points to the sitemap
sitemap.xml           the page and its main images, for Google Search Console
site.webmanifest      app name and icons for "add to home screen"
favicon.ico, favicon-32.png, apple-touch-icon.png
assets/
  img/                photos (JPEG + WebP), logo files, og-image.jpg, whatsapp-qr.svg
  brands/             AC brand logos
  icons/              Phosphor icon files (already inlined into index.html; kept for reference)
  fonts/              Plus Jakarta Sans, self-hosted
```

## 6. Brand logos

`assets/brands/` holds official artwork for Daikin, LG, Samsung, Panasonic,
Voltas, Blue Star, Hitachi, Godrej and Whirlpool (from Wikimedia Commons and
Simple Icons). Carrier, O General and Lloyd are set in type until you add their
artwork: save the file in `assets/brands/` and swap the
`<span class="brand-wordmark">` for an `<img>` like the others. The logo strip
is duplicated twice in the HTML so it can scroll continuously; edit both copies.

## 7. Photos and credits

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

## 8. SEO: what is built in and what to do after launch

Already in the page:

- **Title and description** written for the searches that matter locally: AC
  service, repair and installation in Mumbai, Thane and Navi Mumbai.
- **Headings** carry the keywords (one H1, a keyword H2 per section, service
  names as "AC Repair", "AC Deep Cleaning" and so on).
- **FAQ section** with nine questions people search before booking: cost,
  service frequency, brands, areas, AMC, commercial systems.
- **Structured data** (JSON-LD): the business as an HVAC business with services,
  service area, hours and contact point, plus the website and the FAQ. Test it
  at https://search.google.com/test/rich-results once the site is live.
  Google currently shows FAQ rich results only for government and health sites,
  so the FAQ markup will not add dropdowns under the search listing, but it
  still helps Google, Bing and AI assistants understand the page.
- **Image SEO**: descriptive alt text on every photo, WebP with JPEG fallback,
  and an image sitemap.
- **Social previews**: Open Graph and Twitter tags with a 1200 x 630 image, so
  links shared on WhatsApp and Facebook show a proper card.
- **Technical**: canonical URL, `robots` meta allowing large image previews,
  `robots.txt`, `sitemap.xml`, a branded 404 page, `/index.html` redirected to
  `/`, compression and caching in `.htaccess`, self-hosted font, lazy-loaded
  images, and a fast first load on phones.

After launch:

1. **Google Search Console** (https://search.google.com/search-console): add
   the domain, verify it (the DNS method is easiest), submit `sitemap.xml`,
   and use URL Inspection to request indexing of the homepage.
2. **Bing Webmaster Tools** (https://www.bing.com/webmasters): import the site
   from Search Console in one click. Bing also feeds ChatGPT search results.
3. **Google Business Profile**: this drives the map results for "AC repair near
   me". Link it to the website and add its URL to `"sameAs"`.
4. **PageSpeed Insights** (https://pagespeed.web.dev): run it on the live URL
   to confirm the host is not slowing things down.
5. Update `<lastmod>` in `sitemap.xml` whenever you change the page.

## 9. Optional extras

- **Analytics**: paste the tracking snippet (Google Analytics 4, or a lighter
  option such as Plausible) just before `</head>`. If it sets cookies, add a
  privacy policy page and link it in the footer.
- **After editing CSS or JavaScript**: the host caches those files for a month.
  Change the `?v=20260929` at the end of the `styles.css` and `main.js` links in
  `index.html` (and the `styles.css` link in `404.html`) to today's date so
  returning visitors get the new version.
- **Working hours**: they appear in the hero, contact panel, footer and the
  structured data. Search for `9:00` and `9 am` and keep all of them in step.

## 10. Checklist before going live

- [ ] https://coolclimateac.in loads with a valid SSL certificate
- [ ] Facebook URL in place (two links) and added to `"sameAs"`
- [ ] Working hours, service areas and services on the page are accurate
- [ ] Tap every WhatsApp button on your phone once
- [ ] Redirect lines enabled in `.htaccess`, and `http://` and `www.` both land on https://coolclimateac.in
- [ ] Rich Results Test passes on the live URL
- [ ] Site verified in Google Search Console and `sitemap.xml` submitted
- [ ] Google Business Profile created and linked to the site
