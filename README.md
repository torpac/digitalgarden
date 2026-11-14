# Toprak's Digital Garden — V4 (Editable Edition)

Dark, old-internet, starry personal website. Built with Astro + GitHub Pages + Pages CMS. **No AI-generated images.** You can replace the CSS moon/sky with your own image, or use the existing handmade CSS illustration.

## What you can edit after publication

Open **https://app.pagescms.org**, sign in with GitHub and select your repo's `main` branch. These editor categories are already configured in `.pages.yml`:

| In Pages CMS | What it changes |
|---|---|
| **01 — Identity, socials, navigation, text** | Site name, tagline, all header and footer messages, bio, currently list, Instagram / LinkedIn / other links, window title, logos, favicon, sky images, folder names and ordering, header navigation, home section order |
| **02 — Every page heading and interface label** | Homepage panel headings, buttons, About headings, Posts / Books / Films / Games / Series / Music introductions, the small messages on collection and review pages, sort button labels, empty states |
| **03 — Colors, fonts, layout and effects** | Palette, heading/body/monospace font, max site width, sidebar width, rounded or square corners, compact/airy spacing, stars, snowfall, moon, scroll transitions, cursor blink, sections on/off |
| **Garden / Posts** | New articles, cover images, tags, garden maturity labels, drafts |
| **Books / Films / Games / Series** | New items, cover art, ranks, ratings, descriptions, full formatted reviews, drafts |
| **Spotify playlists** | Public playlist embeds and explanatory text |
| **Homepage pinboard** | Create/edit/delete image tiles, links, titles and captions |
| **Advanced — Custom CSS** | Optional full-power CSS tweaks for any leftover styling need (requires CSS knowledge) |

You can also change the *order* of the five main homepage blocks (Hero, Folders/Recent, Favorites, Pinboard, Goodbye) in **01 — Identity → Homepage section order**. Each can be hidden. Individual homepage panels can be disabled under **03 — Appearance → Which panels appear**.

All fields in the two big lists, **Navigation** and **Homepage folders**, can be reordered through the editor. To avoid breaking links, keep an internal URL such as `/films/`, `/posts/`, `/music/`, or `/about/`. You can change its **label** to anything. Adding *entirely new page types, interactive functionality or arbitrary page layouts* still requires source code; no static CMS can anticipate every possible future feature. For those changes, ask for a new version of the website.

### The text in your screenshot

Go to **01 — Identity → Top right header sentence**. Change:

`a little corner of the internet ✳ est. 2026`

to any text you like. The new text appears after the next GitHub Pages deployment.

### How to add a review with a cover

1. Open **Films**, **Books**, **Series** or **Games** and click **New**.
2. Add title, upload/choose cover (JPG/PNG/WebP), optionally set rank and rating, type your thoughts in **Body**.
3. Disable **Hide from public website** when you want to publish; save.
4. Pages CMS commits the entry and cover image to GitHub. GitHub Pages rebuilds. Your cover appears on the ranking list and review page.

### How to make a new post

Open **Garden / Posts** → **New**. Enter title/date, optional cover image and tags, then write in the formatted Body editor. You can keep it as a draft.

**Privacy note:** On GitHub Free, GitHub Pages uses a public source repository. A draft's file can still be seen by someone browsing that repository. Do not store private drafts, passwords, or personal information there.

## Run on Windows

1. Extract ZIP to a permanent folder (not Temp).
2. **File → Open Folder** in VS Code, select `toprak-digital-garden-v4`.
3. **Terminal → New Terminal** and run:

```powershell
npm.cmd install
npm.cmd run validate
npm.cmd run dev
```

Open **http://localhost:4321/** in Chrome. Stop the server with `Ctrl+C`. For a production test, use `npm.cmd run build`.

**If this is replacing an earlier version, keep your V3 folder as a backup.** Merging individual files from V3 with V4 is not recommended because the editor settings have changed. Copy just your personal content `.md` entries and uploaded cover images into the matching V4 folders if you had already added your own entries.

## Publish through GitHub Pages

1. Create a **public** repository at https://github.com/new, for example `digital-garden`.
2. Commit/push the contents of this V4 folder to the repository root, **including the hidden** `.github` directory and `.pages.yml` file. VS Code Source Control can initialize and publish a repo.
3. In **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. The included `.github/workflows/deploy.yml` builds and deploys on pushes to `main`.
4. The public address will normally be `https://YOURUSERNAME.github.io/REPOSITORY/`.
5. Visit https://app.pagescms.org, sign in via GitHub, authorize the app for that repo, and open the `main` branch. Your 11 editable CMS categories should appear automatically.
6. Make a tiny change to the header tagline and save. Wait for GitHub Actions to finish, then refresh your live website to verify the full editing cycle.

If the repo is named `YOURUSERNAME.github.io` it publishes at the root address. `astro.config.mjs` automatically sets the right base URL for project repositories on GitHub Actions.

## Content and technical details

The design code lives in Astro components under `src/`, while nearly all authored words and standard appearance controls are in three separate JSON files:

- `src/data/site.json` — identity, header, footer, sidebar, social links, navigation and homepage order
- `src/data/copy.json` — page headings and labels
- `src/data/appearance.json` — palette, font, width, effects and section visibility
- `src/styles/custom.css` — advanced CSS override editor
- `src/content/{films,books,games,series,posts,playlists,pins}/` — content you publish
- `public/uploads/` — uploaded cover art, custom sky images, favicons and pictures

Ordinary changes require no code. Editing a true structural feature (for example a new media category, drag-and-drop arbitrary HTML components, or a live database) does require code changes or a different kind of site builder. You can still edit `custom.css` from Pages CMS if you want deeper visual control.

Uploaded images should be images you have the right to publish. No copyrighted cover artwork is bundled with the starter.

The `npm.cmd run validate` command checks the JSON settings and URLs even without installing Astro. This project was statically checked; a full build could not be run in the authoring environment because npm installation timed out.
