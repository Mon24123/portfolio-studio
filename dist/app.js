const imageDialog = document.getElementById('image-dialog');
const expandedImage = document.getElementById('expanded-image');
document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-image]');
  if (!trigger) return;
  expandedImage.src = trigger.dataset.image;
  expandedImage.alt = trigger.dataset.caption || trigger.querySelector('img')?.alt || '项目图片';
  document.getElementById('image-caption').textContent = expandedImage.alt;
  imageDialog.showModal();
});
document.getElementById('close-image').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', (event) => { if (event.target === imageDialog) { const box = imageDialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) imageDialog.close(); } });
document.querySelectorAll('a[href$="-detail"]').forEach(link => link.addEventListener('click', () => { const detail = document.getElementById(link.hash.slice(1)); if (detail?.tagName === 'DETAILS') detail.open = true; }));
const themeButton = document.getElementById('theme-toggle');
function setTheme(isDark) { document.body.classList.toggle('dark', isDark); themeButton.setAttribute('aria-pressed', String(isDark)); themeButton.textContent = isDark ? '切换浅色' : '切换深色'; }
try { setTheme(localStorage.getItem('portfolio-studio-theme') === 'dark'); } catch { setTheme(false); }
themeButton.addEventListener('click', () => { const isDark = !document.body.classList.contains('dark'); setTheme(isDark); try { localStorage.setItem('portfolio-studio-theme', isDark ? 'dark' : 'light'); } catch {} });
document.getElementById('print-page').addEventListener('click', () => window.print());
let printOpenState = [];
window.addEventListener('beforeprint', () => { printOpenState = [...document.querySelectorAll('details')].map(el => [el, el.open]); printOpenState.forEach(([el]) => { el.open = true; }); });
window.addEventListener('afterprint', () => { printOpenState.forEach(([el, open]) => { el.open = open; }); });
