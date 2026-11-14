// Make root-relative links/images written in Pages CMS work on GitHub project pages.
export default function remarkBasePaths() {
  const [owner, repo] = (process.env.GITHUB_REPOSITORY || '/').split('/');
  const userSite = repo?.toLowerCase() === `${owner?.toLowerCase()}.github.io`;
  const base = (process.env.BASE_PATH || (repo && !userSite ? `/${repo}` : '/')).replace(/\/$/, '');
  return (tree) => {
    if (!base) return;
    const visit = (node) => {
      if ((node.type === 'link' || node.type === 'image' || node.type === 'definition')
          && typeof node.url === 'string' && node.url.startsWith('/') && !node.url.startsWith('//')
          && !(node.url === base || node.url.startsWith(`${base}/`))) {
        node.url = `${base}${node.url}`;
      }
      if (Array.isArray(node.children)) node.children.forEach(visit);
    };
    visit(tree);
  };
}
