import site from '../data/site.json';
import appearance from '../data/appearance.json';
import copy from '../data/copy.json';

export { site, appearance, copy };

/** Accept URLs for pages within this site only. */
export function internalPage(url?: string): string | undefined {
  if (!url || !url.startsWith('/') || url.startsWith('//')) return undefined;
  if (/[?#\\<>"']/u.test(url) || !/^\/[\w\-/]*$/u.test(url)) return undefined;
  return url;
}

/** Allow only hex colors from the editor to enter the style attribute. */
export function editorColor(raw: string): string {
  return /^#[\da-fA-F]{3}(?:[\da-fA-F]{3})?$/.test(raw) ? raw : '#223149';
}

const fontChoices: Record<string, string> = {
  verdana: 'Verdana, Geneva, sans-serif',
  inter: 'Inter, ui-sans-serif, system-ui, sans-serif',
  system: 'system-ui, -apple-system, sans-serif',
  georgia: 'Georgia, Times New Roman, serif',
  times: 'Times New Roman, Georgia, serif',
  consolas: 'Consolas, Lucida Console, Courier New, monospace',
  courier: 'Courier New, monospace',
};

export function themeStyle(): string {
  const colors = Object.entries(appearance.colors).map(([key, val]) => {
    const cssName = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
    return `--${cssName}:${editorColor(val)}`;
  });
  const fonts = [
    `--sans:${fontChoices[appearance.fonts.body] || fontChoices.verdana}`,
    `--serif:${fontChoices[appearance.fonts.heading] || fontChoices.georgia}`,
    `--mono:${fontChoices[appearance.fonts.interface] || fontChoices.consolas}`,
  ];
  const width = Math.max(740, Math.min(1800, Number(appearance.layout.maxWidth) || 1120));
  const sidebar = Math.max(160, Math.min(380, Number(appearance.layout.sidebarWidth) || 216));
  const corners = { square: '0px', soft: '7px', rounded: '15px' };
  const gaps = { compact: '.8', comfortable: '1', airy: '1.3' };
  return [...colors, ...fonts, `--window-max-width:${width}px`, `--sidebar-width:${sidebar}px`,
    `--corner-radius:${corners[appearance.layout.cornerStyle] || '0px'}`,
    `--density:${gaps[appearance.layout.density] || '1'}`].join(';');
}

export const publicSocials = site.socialLinks.filter((s) => s.enabled && !!s.label.trim());
export const publicNavigation = site.navigation.filter((n) => n.enabled && internalPage(n.href));
export const publicFolders = site.folders.filter((f) => f.enabled && internalPage(f.href));
export const publicShelves = site.favoritesShelves.filter((s) => s.enabled && ['films','games','series','books'].includes(s.name) && internalPage(s.href));
