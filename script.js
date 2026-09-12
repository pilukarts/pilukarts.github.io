const USER = 'pilukarts';
const grid = document.querySelector('#repo-grid');
const message = document.querySelector('#message');
const search = document.querySelector('#search');
const filters = document.querySelector('#filters');
let repositories = [];
let activeLanguage = 'Todos';
const projectCovers = { OrdenOFlordsThePuzzleGame: 'assets/orden-of-lords.webp' };
const translations = {
  es:{navWorlds:'Mundos',navRepos:'Repositorios',navStats:'Estadísticas',eyebrow:'Código · Diseño · Ideas',hero:'Construyendo cosas<br><em>que funcionan.</em>',explore:'Explorar proyectos',profile:'Ver perfil ↗',worldsLabel:'01 / UNIVERSO PILUKARTS',worldsTitle:'Cinco juegos.<br><em>Cinco mundos.</em>',lordsCopy:'Cuatro Lords, gemas elementales y una torre que despierta con cada match.',forgeCopy:'Comandantes, alianzas y energía estelar en una guerra por la forja.',pilukaCopy:'Una heroína, poderes inesperados y un universo lleno de personalidad.',horusCopy:'Dioses, secretos y tesoros protegidos por un templo antiguo.',gloryCopy:'Héroes rivales entran en la arena para conquistar su propia leyenda.',enterWorld:'Entrar al mundo ↗',discoverWorld:'Descubrir ↗',reposLabel:'02 / REPOSITORIOS',projects:'Proyectos públicos',statsLabel:'03 / ESTADÍSTICAS',numbers:'El código, en números',play:'Jugar ahora',code:'Ver código'},
  en:{navWorlds:'Worlds',navRepos:'Repositories',navStats:'Statistics',eyebrow:'Code · Design · Ideas',hero:'Building things<br><em>that work.</em>',explore:'Explore projects',profile:'View profile ↗',worldsLabel:'01 / PILUKARTS UNIVERSE',worldsTitle:'Five games.<br><em>Five worlds.</em>',lordsCopy:'Four Lords, elemental gems and a tower that awakens with every match.',forgeCopy:'Commanders, alliances and stellar energy collide in a war for the forge.',pilukaCopy:'One heroine, unexpected powers and a universe bursting with personality.',horusCopy:'Gods, secrets and treasures protected by an ancient temple.',gloryCopy:'Rival heroes enter the arena to conquer their own legend.',enterWorld:'Enter the world ↗',discoverWorld:'Discover ↗',reposLabel:'02 / REPOSITORIES',projects:'Public projects',statsLabel:'03 / STATISTICS',numbers:'Code, by the numbers',play:'Play now',code:'View code'}
};
let language = localStorage.getItem('pilukarts-language') || (navigator.language.startsWith('es') ? 'es' : 'en');
function applyLanguage(){document.documentElement.lang=language;document.querySelectorAll('[data-i18n]').forEach(el=>el.innerHTML=translations[language][el.dataset.i18n]);document.querySelector('#lang-toggle').innerHTML=language==='es'?'<b>ES</b> | EN':'ES | <b>EN</b>';if(repositories.length)renderRepositories();}

const escapeHTML = (value = '') => value.replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const compact = number => new Intl.NumberFormat('es', { notation: 'compact' }).format(number || 0);
const date = value => new Intl.DateTimeFormat('es', { month: 'short', year: 'numeric' }).format(new Date(value));

function renderRepositories() {
  const term = search.value.trim().toLowerCase();
  const visible = repositories.filter(repo =>
    (activeLanguage === 'Todos' || repo.language === activeLanguage) &&
    (`${repo.name} ${repo.description || ''}`).toLowerCase().includes(term)
  );
  grid.innerHTML = visible.map((repo, index) => `
    <article class="repo-card ${projectCovers[repo.name] ? 'repo-card-featured' : ''}">
      ${projectCovers[repo.name] ? `<a href="https://pilukarts.github.io/${repo.name}/" target="_blank" rel="noreferrer"><img class="repo-cover" src="${projectCovers[repo.name]}" alt="Portada de Orden of Lords" /></a>` : ''}
      <span class="repo-index">${String(index + 1).padStart(2, '0')}</span>
      <h3><a class="repo-link" href="${repo.html_url}" target="_blank" rel="noreferrer">${escapeHTML(repo.name)}</a></h3>
      <p>${escapeHTML(repo.description || 'Proyecto público en GitHub.')}</p>
      <div class="repo-meta">
        <span><i class="lang-dot"></i>${escapeHTML(repo.language || 'Código')}</span>
        <span>★ ${repo.stargazers_count}</span><span>⑂ ${repo.forks_count}</span>
      </div>
      ${projectCovers[repo.name] ? `<div class="repo-actions"><a class="play-link" href="https://pilukarts.github.io/${repo.name}/" target="_blank" rel="noreferrer">${translations[language].play}</a><a href="${repo.html_url}" target="_blank" rel="noreferrer">${translations[language].code}</a></div>` : ''}
    </article>`).join('');
  message.hidden = visible.length > 0;
  message.textContent = 'No hay proyectos que coincidan con la búsqueda.';
}

function renderFilters() {
  const langs = ['Todos', ...new Set(repositories.map(repo => repo.language).filter(Boolean))];
  filters.innerHTML = langs.map(lang => `<button class="filter ${lang === activeLanguage ? 'active' : ''}" data-lang="${escapeHTML(lang)}">${escapeHTML(lang)}</button>`).join('');
}

function renderChart() {
  const counts = repositories.reduce((acc, repo) => { const lang = repo.language || 'Otros'; acc[lang] = (acc[lang] || 0) + 1; return acc; }, {});
  const rows = Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0,6);
  const max = Math.max(...rows.map(([,count]) => count), 1);
  document.querySelector('#language-chart').innerHTML = rows.map(([lang,count]) => `
    <div class="lang-row"><span>${escapeHTML(lang)}</span><div class="bar"><i style="width:${count/max*100}%"></i></div><b>${count}</b></div>`).join('') || '<p>Aún no hay datos de lenguajes.</p>';
}

async function loadGitHub() {
  try {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${USER}`),
      fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`)
    ]);
    if (!profileResponse.ok || !reposResponse.ok) throw new Error('GitHub API unavailable');
    const profile = await profileResponse.json();
    repositories = (await reposResponse.json()).filter(repo => !repo.archived);
    document.querySelector('#avatar').src = profile.avatar_url;
    document.querySelector('#profile-name').textContent = profile.name || profile.login;
    document.querySelector('#bio').textContent = profile.bio || 'Proyectos, experimentos y código abierto de Pilukarts.';
    document.querySelector('#repo-count').textContent = compact(profile.public_repos);
    document.querySelector('#follower-count').textContent = compact(profile.followers);
    document.querySelector('#star-count').textContent = compact(repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0));
    document.querySelector('#total-projects').textContent = repositories.length;
    document.querySelector('#original-count').textContent = repositories.filter(repo => !repo.fork).length;
    document.querySelector('#website-count').textContent = repositories.filter(repo => repo.homepage).length;
    document.querySelector('#last-update').textContent = repositories.length ? date(repositories[0].updated_at) : '—';
    renderFilters(); renderRepositories(); renderChart();
  } catch (error) {
    grid.innerHTML = '';
    message.hidden = false;
    message.innerHTML = 'No se pudieron cargar los repositorios ahora. <a class="repo-link" href="https://github.com/pilukarts">Verlos directamente en GitHub</a>.';
  }
}

search.addEventListener('input', renderRepositories);
filters.addEventListener('click', event => { if (!event.target.matches('[data-lang]')) return; activeLanguage = event.target.dataset.lang; renderFilters(); renderRepositories(); });
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lang-toggle').addEventListener('click',()=>{language=language==='es'?'en':'es';localStorage.setItem('pilukarts-language',language);applyLanguage();});
applyLanguage();
loadGitHub();

const slider = document.querySelector('#world-slider');
const slides = [...document.querySelectorAll('.world-slide')];
const dots = document.querySelector('#slide-dots');
let activeSlide = 0;

dots.innerHTML = slides.map((_, index) => `<button type="button" class="${index === 0 ? 'active' : ''}" aria-label="Slide ${index + 1}" data-slide="${index}"></button>`).join('');

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides[activeSlide].scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest', inline: 'start' });
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === activeSlide));
  dots.querySelectorAll('button').forEach((dot, i) => dot.classList.toggle('active', i === activeSlide));
  document.querySelector('#slide-count').textContent = `${String(activeSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
}

document.querySelector('#slide-prev').addEventListener('click', () => showSlide(activeSlide - 1));
document.querySelector('#slide-next').addEventListener('click', () => showSlide(activeSlide + 1));
dots.addEventListener('click', event => { const button = event.target.closest('[data-slide]'); if (button) showSlide(Number(button.dataset.slide)); });
slider.addEventListener('keydown', event => { if (event.key === 'ArrowLeft') showSlide(activeSlide - 1); if (event.key === 'ArrowRight') showSlide(activeSlide + 1); });

const slideObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) showSlide(slides.indexOf(visible.target));
}, { root: slider, threshold: .65 });
slides.forEach(slide => slideObserver.observe(slide));
