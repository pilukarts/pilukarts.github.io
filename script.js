const USER = 'pilukarts';
const grid = document.querySelector('#repo-grid');
const message = document.querySelector('#message');
const search = document.querySelector('#search');
const filters = document.querySelector('#filters');
let repositories = [];
let activeLanguage = 'Todos';
const projectCovers = { OrdenOFlordsThePuzzleGame: 'assets/orden-of-lords.webp' };

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
      ${projectCovers[repo.name] ? `<div class="repo-actions"><a class="play-link" href="https://pilukarts.github.io/${repo.name}/" target="_blank" rel="noreferrer">Jugar ahora</a><a href="${repo.html_url}" target="_blank" rel="noreferrer">Ver código</a></div>` : ''}
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
loadGitHub();
