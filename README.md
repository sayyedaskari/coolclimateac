# Cool Climate AC Services - website

A single-page, mobile-first website in plain HTML, CSS and JavaScript. No build
tools, no Node.js. Upload the folder to any shared host and it works.

## 1. Before you upload: fill in the business details

Open `index.html` in any text editor and use Find and Replace on these tokens.
They appear in a handful of places, all marked with comments.

| Token | Replace with | Example |
|---|---|---|
| `[PHONE NUMBER]` | The number as you want it displayed | `+91 98765 43210` |
| `[WHATSAPP NUMBER]` | Digits only, with country code, no plus or spaces | `919876543210` |
| `[EMAIL]` | Enquiry email address | `hello@coolclimate.in` |
| `[ADDRESS]` | Shop or office address | `Shop 4, S.V. Road, Andheri West, Mumbai 400058` |
| `[WEBSITE URL]` | Your domain, no trailing slash | `https://www.coolclimate.in` |

Also replace `[EMAIL]` in `send-enquiry.php` and `[WEBSITE URL]` in `robots.txt`
and `sitemap.xml`.

The important ones live on the `<body>` tag in `index.html`:

```html
<body
  data-business="Cool Climate AC Services"
  data-phone="[PHONE NUMBER]"
  data-whatsapp="[WHATSAPP NUMBER]"
  data-email="[EMAIL]"
  data-address="[ADDRESS]"
  data-wa-message="Hello, I would like to enquire about AC sales/service. Please share more details.">
```

`js/main.js` reads these and fills every phone link, WhatsApp button and footer
line. Until the WhatsApp number is set, WhatsApp buttons show a reminder instead
of opening a broken link.

Working hours are plain text in two places in `index.html` (search for
"9:00 am") and in the structured data block in the `<head>`.

## 2. Upload to shared hosting

1. Log in to your hosting control panel (cPanel, Plesk, Hostinger hPanel, etc.).
2. Open the File Manager and go to `public_html` (sometimes `htdocs` or `www`).
3. Upload everything inside this folder, keeping the folder structure. The
   `.htaccess` file is hidden on some systems; make sure it comes along.
4. Visit your domain. Done.

FTP works too (FileZilla, Cyberduck). Same folder, same rule.

## 3. Folder structure

```
index.html            the whole website
css/styles.css        all styling
js/main.js            WhatsApp links, mobile menu, form, scroll effects
send-enquiry.php      optional: emails the form to you (needs PHP on the host)
.htaccess             caching and compression for Apache hosts
robots.txt, sitemap.xml, site.webmanifest
favicon.ico, favicon-32.png, apple-touch-icon.png
assets/
  img/                photos (JPEG + WebP in several sizes), logo, icons, og-image.jpg
  brands/             AC brand logos
  icons/              Phosphor icon files (already inlined into index.html; kept for reference)
  fonts/              Plus Jakarta Sans, self-hosted
```

## 4. The enquiry form

Two buttons:

- **Send Enquiry on WhatsApp**: builds a WhatsApp message with the customer's
  name, phone, service, AC type and details, and opens it in WhatsApp. Works
  everywhere, no server needed.
- **Send by Email**: posts to `send-enquiry.php`, which uses PHP `mail()`.
  Set `$to` at the top of that file. If your host blocks `mail()`, ask them to
  enable it or to give you SMTP details, then use PHPMailer. If email fails, the
  visitor is told to use WhatsApp instead, so nothing is lost.

## 5. Brand logos

`assets/brands/` holds official artwork for Daikin, LG, Samsung, Panasonic,
Voltas, Blue Star, Hitachi, Godrej and Whirlpool (sourced from Wikimedia
Commons and Simple Icons). Carrier, O General and Lloyd are set in type until
you add their artwork: save the file in `assets/brands/` and swap the
`<span class="brand-wordmark">` in the Brands section for an `<img>` like the
others.

Logos are shown under nominative use to indicate the equipment you service. The
disclaimer under the grid says you are an independent provider; keep it unless
you hold an authorised-dealer agreement with a brand.

## 6. Photos

The photos in `assets/img/` are AI-generated placeholders that fit the layout.
Replace them with real photos of your team and jobs whenever you can. Keep the
same file names and roughly the same shapes:

| Files | Shape | Used in |
|---|---|---|
| `hero-*.jpg/webp` | portrait 4:5 | hero |
| `type-*-*.jpg/webp` | square | AC types cards |
| `deep-cleaning-*.jpg/webp` | 16:9 | featured service card |
| `team-*.jpg/webp` | 16:9 | Why Us |
| `og-image.jpg` | 1200 x 630 | link previews on WhatsApp, Facebook, etc. |

Each photo ships in two or three widths (for example `hero-640`, `hero-960`,
`hero-1280`) so phones download smaller files. If you only have one size, use
the same file for all widths; it still works.

## 7. Optional extras

- **Google Maps**: paste an embed `<iframe>` from Google Maps into the Service
  Area section, or link the address to your Google Business Profile.
- **Google Business Profile / Instagram / Facebook**: add the URLs to the
  `"sameAs"` list in the structured data block in `<head>`. This helps local SEO.
- **Analytics**: paste the tracking snippet just before `</head>`.

## 8. Checklist before going live

- [ ] All five tokens replaced (search the folder for `[` to be sure)
- [ ] WhatsApp button opens a chat with the right number
- [ ] Test the form on your phone: WhatsApp and Email
- [ ] SSL certificate active, then enable the HTTPS redirect in `.htaccess`
- [ ] Submit `sitemap.xml` in Google Search Console
