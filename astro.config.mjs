import { defineConfig } from 'astro/config';
import remarkBasePaths from './src/lib/remarkBasePaths.mjs';

// GitHub Actions uses the current repository name to generate correct CSS, image and link paths.
// Rebuild after a repository rename so the published assets point to the new location.
const [owner, repo] = (process.env.GITHUB_REPOSITORY || '/').split('/');
const isUserSite = repo?.toLowerCase() === `${owner?.toLowerCase()}.github.io`;

export default defineConfig({
  site: process.env.SITE_URL || (owner ? `https://${owner}.github.io` : 'http://localhost:4321'),
  base: process.env.BASE_PATH || (repo && !isUserSite ? `/${repo}` : '/'),
  markdown: { remarkPlugins: [remarkBasePaths] },
});
