import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
function read(name) {return JSON.parse(fs.readFileSync(path.join(root,'src','data',name+'.json'),'utf8'));}
let failures = 0;
function check(value,message) { if(!value){failures++;console.error('✗',message);} }
const site=read('site'); const copy=read('copy'); const appearance=read('appearance');
const travel=read('travel');
const pageImages=read('pageImages');
// Pages CMS omits empty optional image fields when saving, so missing keys mean no image.
for (const section of ['home','posts','films','games','series','books','music','about','gallery','travel']) {
  const image = pageImages[section];
  check(image == null || typeof image === 'string', `Page corner photo for ${section} must be a text image path`);
  if (typeof image === 'string' && image.trim()) {
    const local = image.startsWith('/uploads/');
    const external = /^https?:\/\//.test(image);
    check(local || external, `Page corner photo for ${section} must be an upload path or HTTP(S) URL`);
    if (local) check(fs.existsSync(path.join(root, 'public', image.slice(1))), `Uploaded photo missing from public folder: ${image}`);
  }
}
const route = (url) => typeof url==='string' && url.startsWith('/') && !url.startsWith('//') && /^\/[\w\-/]*$/.test(url);
for (const f of ['name','headline','intro','about','siteTagline','footerLine']) check(typeof site[f]==='string', `Identity.${f} must be text`);
for (const [field, arr, href] of [['navigation',site.navigation,'href'],['folders',site.folders,'href'],['favoritesShelves',site.favoritesShelves,'href']]) {
  check(Array.isArray(arr),`Identity.${field} must be a list`);
  if (Array.isArray(arr)) for (const item of arr) check(route(item[href]),`Invalid internal URL in ${field}: ${item[href]}`);
}
const validHomeIds = new Set(['hero','folders_recent','favorites','pinboard','goodbye']);
check(Array.isArray(site.homeSections), 'Identity.homeSections must be a list');
if(Array.isArray(site.homeSections)){
  const seen=new Set();
  for (const item of site.homeSections) {
    check(validHomeIds.has(item.section),`Unknown homepage section: ${item.section}`);
    check(!seen.has(item.section),`Homepage section listed twice: ${item.section}`);
    seen.add(item.section);
  }
}
for (const social of site.socialLinks||[]) {
  if(social.url) {let u;try{u=new URL(social.url)}catch{}check(u&&['https:','http:'].includes(u.protocol),`Invalid social URL for ${social.label}`);}
}
const validColors = Object.entries(appearance.colors).filter(([key,value])=>!/^#[\da-fA-F]{3}(?:[\da-fA-F]{3})?$/.test(value));
for(const [key,value] of validColors) check(false,`Appearance color ${key} must be a hex value (#aabbcc), got ${value}`);
for(const item of ['posts','films','games','series','books','music','about']) {
  for (const field of ['title','label','description','glyph']) check(typeof copy.pages?.[item]?.[field]==='string', `Page Text.${item}.${field} must be text`);
}
for(const [key,val] of Object.entries(appearance.visibility))check(typeof val==='boolean',`Appearance.visibility.${key} must be true or false`);
for(const [key,val] of Object.entries(appearance.effects))check(typeof val==='boolean',`Appearance.effects.${key} must be true or false`);
for(const key of ['visitedColor','landColor','seaColor','outlineColor']) check(/^#[a-fA-F0-9]{3}([a-fA-F0-9]{3})?$/.test(travel[key]),'Invalid travel map color: '+key);
check(typeof travel.visitedCountries === 'string','Travel country list must be text');
if(failures){console.error(`\n${failures} problem(s) with CMS data. Fix before publishing.`);process.exitCode=1;}
else console.log('✓ All editable settings passed validation.');
