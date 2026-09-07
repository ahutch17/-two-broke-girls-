2 BROKE GIRLS — VERSION 1

A shared, local-first money tracker for Amanda and Katie.

INCLUDED
- Six physical accounts: Amanda Cash, Cash App, PayPal; Katie Cash, Cash App, PayPal
- Five envelopes: Amanda Cash, Katie Cash, Business, Household, Unsorted
- View-only 50/15/15/20 split calculator
- Add money, record spending, move money, and correct balances
- Separate account-only, envelope-only, and combined transfers
- Filterable activity record
- JSON backup and restore
- Installable PWA with offline support

IMPORTANT
- Version 1 saves data in the browser on the current device.
- Clearing browser/site data will erase the app unless a backup was downloaded.
- Use Settings > Download backup regularly.
- This version does not connect to banks or move real money.
- The icon files are temporary crops of the supplied background and can be replaced later with Amanda's chosen icon artwork. Keep the filenames icon-192.png and icon-512.png.

DEPLOYMENT
1. Create a new GitHub repository.
2. Upload index.html, styles.css, app.js, service-worker.js, manifest.webmanifest, background.webp, icon-192.png, and icon-512.png to the repository root.
3. Import the repository into Vercel and deploy it as a static site.
4. Open the live URL on a phone and choose Add to Home Screen / Install app.

TESTED
- Split calculation for $100
- Adding $100 to Amanda Cash and Unsorted
- Moving $50 from Unsorted to Business without changing the physical account total
- Activity record creation
- Mobile layout at 390px width
