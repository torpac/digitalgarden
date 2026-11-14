import { defineConfig } from 'astro/config';
import remarkBasePaths from './src/lib/remarkBasePaths.mjs';

// These settings also handle project repositories hosted under /repository-name/.
const [owner, repo] = (process.env.GITHUB_REPOSITORY || '/').split('/');
const isUserSite = repo?.toLowerCase() === `${owner?.toLowerCase()}.github.io`;

export default defineConfig({
  site: process.env.SITE_URL || (owner ? `https://${owner}.github.io` : 'http://localhost:4321'),
  base: process.env.BASE_PATH || (repo && !isUserSite ? `/${repo}` : '/'),
  markdown: { remarkPlugins: [remarkBasePaths] },
});
