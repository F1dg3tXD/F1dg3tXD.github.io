/*
- Tries to detect images placed next to the HTML file by:
  1) Fetching the directory index at "./" and extracting links to common image extensions (works when server emits an index listing).
  2) If that fails, it looks for an optional "images.json" file (a simple array of filenames).
  3) If both fail it will show a small hint in the gallery area so you can add images manually (by creating images.json or enabling directory listing).
- Clicking a card copies the direct URL to the clipboard and shows a toast.
*/

const gallery = document.getElementById('gallery');
const toast = document.getElementById('toast');

const IMAGE_EXTS = ['png','jpg','jpeg','gif','webp','avif','svg'];
const MAX_FILES = 200;

function makeCard(src){
  const card = document.createElement('button');
  card.className = 'card';
  card.type = 'button';
  card.title = 'Click to copy image URL';
  const img = document.createElement('img');
  img.src = src;
  img.alt = src.split('/').pop();
  img.loading = 'lazy';

  const cap = document.createElement('div');
  cap.className = 'caption';
  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = img.alt;
  const hint = document.createElement('div');
  hint.className = 'copy-hint';
  hint.textContent = 'Copy';

  cap.appendChild(name);
  cap.appendChild(hint);
  card.appendChild(img);
  card.appendChild(cap);

  card.addEventListener('click', async () => {
    const url = makeAbsoluteUrl(src);
    try {
      await navigator.clipboard.writeText(url);
      showToast(`Copied: ${url}`);
    } catch (e) {
      // fallback: select and prompt
      fallbackCopy(url);
    }
  });

  return card;
}

function makeAbsoluteUrl(path){
  // If path already absolute (starts with http(s) or //), return as-is.
  if (/^(https?:)?\/\//i.test(path)) return path;
  // Resolve relative to current page
  const base = location.href.split('?')[0].split('#')[0];
  const baseDir = base.substring(0, base.lastIndexOf('/') + 1);
  return new URL(path, baseDir).href;
}

function showToast(text, ms = 2400){
  toast.textContent = text;
  toast.classList.add('show');
  toast.setAttribute('aria-hidden','false');
  clearTimeout(toast._t);
  toast._t = setTimeout(()=> {
    toast.classList.remove('show');
    toast.setAttribute('aria-hidden','true');
  }, ms);
}

async function fallbackCopy(text){
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copied (fallback)');
  } catch (e){
    showToast('Copy failed');
  }
}

function insertHint(){
  const hintCard = document.createElement('div');
  hintCard.style.gridColumn = '1/-1';
  hintCard.style.padding = '12px';
  hintCard.style.borderRadius = '10px';
  hintCard.style.background = 'linear-gradient(90deg,#fff,#fbfbfb)';
  hintCard.style.boxShadow = '0 6px 18px rgba(12,18,25,0.04)';
  hintCard.innerHTML = `
    <div style="font-size:14px;color:#333;margin-bottom:6px">No images found automatically.</div>
    <div style="font-size:13px;color:#666">To show images placed next to this file, either:
    <ul style="margin:8px 0 0 18px;color:#666;padding:0">
      <li>Enable directory listing on the server, or</li>
      <li>Put a file named <code>images.json</code> next to this HTML listing an array of filenames (e.g. ["img1.jpg","photo.png"])</li>
    </ul>
    </div>
  `;
  gallery.appendChild(hintCard);
}

async function tryLoadFromJson(){
  try {
    const res = await fetch('./images.json', {cache:'no-cache'});
    if (!res.ok) throw new Error('no json');
    const arr = await res.json();
    if (!Array.isArray(arr)) throw new Error('bad json');
    const files = arr.filter(f => typeof f === 'string' && IMAGE_EXTS.includes(f.split('.').pop().toLowerCase()));
    return files.slice(0, MAX_FILES);
  } catch (e){
    return null;
  }
}

async function tryLoadFromIndex(){
  try {
    const res = await fetch('./', {cache:'no-cache'});
    if (!res.ok) throw new Error('no listing');
    const text = await res.text();
    // crude HTML anchor extractor
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const anchors = Array.from(doc.querySelectorAll('a')).map(a => a.getAttribute('href')).filter(Boolean);
    const files = anchors
      .map(h => decodeURIComponent(h.split('?')[0].split('#')[0]))
      .filter(h => {
        const ext = (h.split('.').pop() || '').toLowerCase();
        return IMAGE_EXTS.includes(ext);
      })
      .filter((v,i,a)=> a.indexOf(v)===i);
    return files.slice(0, MAX_FILES);
  } catch (e){
    return null;
  }
}

async function init(){
  // 1) look for any <img> tags embedded in the HTML (developer may have placed imgs manually)
  const embedded = Array.from(document.querySelectorAll('img'))
    .map(i => i.getAttribute('src'))
    .filter(Boolean)
    .filter(s => IMAGE_EXTS.includes(s.split('.').pop().toLowerCase()));

  // If there are embedded images (besides our dynamically injected ones) we want to show them.
  if (embedded.length){
    embedded.forEach(src => gallery.appendChild(makeCard(src)));
    return;
  }

  // 2) try images.json
  let files = await tryLoadFromJson();
  if (files && files.length){
    files.forEach(f => gallery.appendChild(makeCard(f)));
    return;
  }

  // 3) try directory index listing (works on many static servers)
  files = await tryLoadFromIndex();
  if (files && files.length){
    files.forEach(f => gallery.appendChild(makeCard(f)));
    return;
  }

  // nothing found
  insertHint();
}

init();