# Saleem Abbas — Portfolio

A React + Tailwind rebuild of the portfolio, with all content (projects,
dashboards, skills, certifications, experience) pulled from small JSON files
in `src/data/`. Instead of editing code to add a new project, you log in to
a private `/admin` page and edit content through a form — it commits the
change straight to this repo, and the site rebuilds and redeploys itself.

## How it fits together

- **Frontend**: React + Vite + Tailwind, deployed to GitHub Pages via
  the included GitHub Actions workflow (`.github/workflows/deploy.yml`).
  Every push to `main` triggers a rebuild.
- **Content**: plain JSON files in `src/data/` (`profile.json`,
  `projects.json`, `dashboards.json`, `skills.json`, `certifications.json`,
  `experience.json`). The site imports these at build time.
- **Admin/CMS**: [Sveltia CMS](https://github.com/sveltia/sveltia-cms) —
  a free, open-source, git-backed admin UI, mounted at `/admin`. It's
  configured in `public/admin/config.yml` and edits the JSON files above
  directly via the GitHub API, as commits to `main`.
- **Login**: Sveltia CMS logs you in with your GitHub account. Since GitHub
  Pages can't run server code, the OAuth token exchange happens on a tiny,
  free Cloudflare Worker (code included in `../portfolio-oauth-worker/`,
  outside this repo — deploy it separately, once).

No database, no paid hosting. Total ongoing cost: $0.

## One-time setup

### 1. Push this to GitHub

Create a new repo (or reuse your existing portfolio repo) and push this
folder's contents to the `main` branch.

- If the repo is named `<your-username>.github.io` (a "user site"), your
  site will be served from the repo root — keep `base: "/"` in
  `vite.config.js` (already set).
- If it's any other repo name (a "project site", served at
  `https://<user>.github.io/<repo>/`), change `base: "/"` to
  `base: "/<repo-name>/"` in `vite.config.js`.

### 2. Turn on GitHub Pages via Actions

In the repo: **Settings → Pages → Build and deployment → Source →
GitHub Actions**. That's it — the included workflow handles the rest on
every push.

### 3. Create a GitHub OAuth App (for admin login)

Go to **https://github.com/settings/developers → New OAuth App** and fill in:

- **Application name**: anything, e.g. "Portfolio CMS"
- **Homepage URL**: your site's URL (e.g. `https://saleem-abbas111.github.io`)
- **Authorization callback URL**: `https://<your-worker-subdomain>.workers.dev/callback`
  (you'll get this exact URL in step 4 — come back and fill it in after)

After creating it, copy the **Client ID**, and generate + copy a
**Client secret**. You'll need both in the next step.

### 4. Deploy the OAuth worker (Cloudflare, free tier)

The worker code lives in `portfolio-oauth-worker/` (next to this repo, not
inside it — it's a separate, tiny deployment).

```bash
cd portfolio-oauth-worker
npm install -g wrangler   # Cloudflare's CLI, if you don't have it
wrangler login
wrangler secret put GITHUB_CLIENT_ID       # paste the Client ID from step 3
wrangler secret put GITHUB_CLIENT_SECRET   # paste the Client secret from step 3
wrangler deploy
```

This prints your worker's URL, something like
`https://portfolio-cms-auth.<your-subdomain>.workers.dev`. Now:

- Go back to your GitHub OAuth App settings and set the **Authorization
  callback URL** to `<that-worker-url>/callback`.
- Open `public/admin/config.yml` in this repo and set:
  ```yaml
  backend:
    name: github
    repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME
    branch: main
    base_url: <that-worker-url>   # no trailing slash, no /callback
    auth_endpoint: auth
  ```
- Commit and push that change.

### 5. Log in and edit

Visit `https://<your-site>/admin/`, click **Login with GitHub**, authorize
the app once, and you'll see editable forms for every section: Profile,
Featured Projects, Dashboard Gallery, Skills, Certifications, Experience.
Adding a project is now "click **Add**, fill the form, click **Publish**" —
no code, no rebuild step to remember (it deploys itself).

Images you upload through the CMS are saved to
`public/assets/uploads/` and committed automatically.

## Local development

```bash
npm install
npm run dev
```

## Notes

- Only you can publish changes — Sveltia CMS uses your GitHub login and
  the GitHub API directly, so write access follows your repo's normal
  collaborator permissions.
- If you ever want a second editor, add them as a collaborator on the
  GitHub repo; no separate CMS account system to manage.
