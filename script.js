const USER = 'pilukarts';
const grid = document.querySelector('#category-grid');
const categoryResults = document.querySelector('#category-results');
const message = document.querySelector('#message');
let repositories = [];
let selectedCategory = null;
const translations = {
  es:{cinematicTitle:'Historias que<br><em>se convierten en mundos.</em>',planetTitle:'Elige un mundo.<br><em>Empieza a jugar.</em>',newsTitle:'Noticias del<br><em>universo.</em>',dropsTitle:'Airdrops y<br><em>eventos.</em>',nftTitle:'NFTs y<br><em>coleccionables.</em>',repoTitle:'El código detrás<br><em>del universo.</em>',portalLive:'● PORTAL ACTIVO',signalDetected:'◌ SEÑAL DETECTADA',classified:'◇ ARCHIVO CLASIFICADO',followersLabel:'seguidores',repositoriesLabel:'proyectos públicos',starsLabel:'estrellas',followGithub:'SEGUIR A PILUKARTS ↗',navWorlds:'Mundos',navRepos:'Repositorios',navStats:'Estadísticas',eyebrow:'Código · Diseño · Ideas',hero:'Construyendo cosas<br><em>que funcionan.</em>',explore:'Explorar proyectos',profile:'Ver perfil ↗',worldsLabel:'01 / UNIVERSO PILUKARTS',worldsTitle:'Seis juegos.<br><em>Seis mundos.</em>',lordsCopy:'Cuatro Lords, gemas elementales y una torre que despierta con cada match.',forgeCopy:'Comandantes, alianzas y energía estelar en una guerra por la forja.',pilukaCopy:'Una heroína, poderes inesperados y un universo lleno de personalidad.',horusCopy:'Dioses, secretos y tesoros protegidos por un templo antiguo.',gloryCopy:'Héroes rivales entran en la arena para conquistar su propia leyenda.',enterWorld:'Entrar al mundo ↗',discoverWorld:'Descubrir ↗',reposLabel:'02 / REPOSITORIOS',projects:'Proyectos públicos',statsLabel:'03 / ESTADÍSTICAS',numbers:'El código, en números',play:'Jugar ahora',code:'Ver código'},
  en:{cinematicTitle:'Stories that<br><em>become worlds.</em>',planetTitle:'Choose a world.<br><em>Start playing.</em>',newsTitle:'News from the<br><em>universe.</em>',dropsTitle:'Airdrops and<br><em>events.</em>',nftTitle:'NFTs and<br><em>collectibles.</em>',repoTitle:'The code behind<br><em>the universe.</em>',portalLive:'● PORTAL LIVE',signalDetected:'◌ SIGNAL DETECTED',classified:'◇ CLASSIFIED FILE',followersLabel:'followers',repositoriesLabel:'public projects',starsLabel:'stars',followGithub:'FOLLOW PILUKARTS ↗',navWorlds:'Worlds',navRepos:'Repositories',navStats:'Statistics',eyebrow:'Code · Design · Ideas',hero:'Building things<br><em>that work.</em>',explore:'Explore projects',profile:'View profile ↗',worldsLabel:'01 / PILUKARTS UNIVERSE',worldsTitle:'Six games.<br><em>Six worlds.</em>',lordsCopy:'Four Lords, elemental gems and a tower that awakens with every match.',forgeCopy:'Commanders, alliances and stellar energy collide in a war for the forge.',pilukaCopy:'One heroine, unexpected powers and a universe bursting with personality.',horusCopy:'Gods, secrets and treasures protected by an ancient temple.',gloryCopy:'Rival heroes enter the arena to conquer their own legend.',enterWorld:'Enter the world ↗',discoverWorld:'Discover ↗',reposLabel:'02 / REPOSITORIES',projects:'Public projects',statsLabel:'03 / STATISTICS',numbers:'Code, by the numbers',play:'Play now',code:'View code'}
};
const staticCopy = new Map([
  ['Noticias','News'],['Código','Code'],['Estadísticas','Statistics'],['Web3','Web3'],['Contacto','Contact'],['Apoyar en Ko-fi ↗','Support on Ko-fi ↗'],
  ['PILUKARTS ORIGINAL UNIVERSE','PILUKARTS ORIGINAL UNIVERSE'],['Personajes, juegos y arte nacidos de un mismo universo creativo. Elige un portal y entra.','Characters, games and art born from one creative universe. Choose a portal and enter.'],
  ['Explorar el universo','Explore the universe'],['Apoyar mi trabajo ↗','Support my work ↗'],['Explorar la misión ↗','Explore the mission ↗'],['DESCUBRIR','DISCOVER'],
  ['Soy ilustradora y full stack developer. Diseño personajes, interfaces y sistemas que convierten ideas en experiencias completas.','I am an illustrator and full-stack developer. I design characters, interfaces and systems that turn ideas into complete experiences.'],
  ['Repositorios','Repositories'],['Seguidores','Followers'],['Estrellas','Stars'],['Cada planeta guarda una historia, un personaje y una forma distinta de jugar.','Every planet holds a story, a character and a different way to play.'],
  ['Cuatro elementos. Una torre. El destino de los Lords en tus manos.','Four elements. One tower. The fate of the Lords in your hands.'],['JUGAR ↗','PLAY ↗'],['PRÓXIMAMENTE','COMING SOON'],
  ['Comandantes y alianzas luchan por controlar la forja estelar.','Commanders and alliances fight to control the stellar forge.'],['Una heroína, poderes inesperados y un universo lleno de personalidad.','A heroine, unexpected powers and a universe full of personality.'],['Dioses, secretos y tesoros protegidos por un templo antiguo.','Gods, secrets and treasures protected by an ancient temple.'],['Entra en la arena, domina el combate y conquista tu leyenda.','Enter the arena, master combat and claim your legend.'],['Treinta misiones a través de tres galaxias junto a Astro.','Thirty missions across three galaxies with Astro.'],
  ['Nuevos mundos, personajes, colecciones y experimentos de Pilukarts.','New worlds, characters, collections and experiments by Pilukarts.'],['Astro inicia su viaje por tres galaxias','Astro begins his journey across three galaxies'],['Cosmic Blocks ya cuenta con 30 misiones, controles táctiles y acceso desde Telegram.','Cosmic Blocks now features 30 missions, touch controls and Telegram access.'],['Jugar ahora ↗','Play now ↗'],['Una nueva casa para todos los mundos','A new home for every world'],['El portafolio evoluciona para unir juegos, arte, personajes y colecciones digitales.','The portfolio evolves to unite games, art, characters and digital collections.'],['Arte Pilukarts en objetos reales','Pilukarts art on physical objects'],['Diseños originales disponibles en la tienda oficial de Redbubble.','Original designs available in the official Redbubble shop.'],['Visitar tienda ↗','Visit shop ↗'],
  ['Astro nació en un juego de Telegram y evolucionará hacia una colección NFT y nuevas experiencias Web3. Esta área documenta el proceso con transparencia.','Astro began in a Telegram game and will evolve into an NFT collection and new Web3 experiences. This area documents the process transparently.'],['FASE DE DESARROLLO','DEVELOPMENT PHASE'],['No hay venta, airdrop ni contrato activo.','There is no active sale, airdrop or contract.'],['Juego de Telegram','Telegram game'],['Experiencia jugable publicada','Playable experience released'],['Diseño de colección','Collection design'],['Arte, atributos y utilidad','Art, attributes and utility'],['NFT + contrato','NFT + contract'],['Solo se enlazará tras su verificación','It will only be linked after verification'],['Airdrop','Airdrop'],['Sin campaña oficial activa','No official campaign is active'],
  ['OBJETIVO DE FINANCIACIÓN / ASTRO','FUNDING GOAL / ASTRO'],['Impulsar la próxima fase','Power the next phase'],['El progreso y la meta económica se publicarán cuando estén definidos. Todos los apoyos se gestionan exclusivamente desde Ko-fi.','Progress and the funding target will be published once defined. All support is handled exclusively through Ko-fi.'],['ESTADO DEL OBJETIVO','GOAL STATUS'],['PREPARANDO LANZAMIENTO','PREPARING LAUNCH'],['APOYAR EN KO-FI ↗','SUPPORT ON KO-FI ↗'],
  ['Perfil profesional de Pilukarts en GitHub. Los juegos y experiencias públicas se descubren desde sus planetas.','Pilukarts professional GitHub profile. Public games and experiences can be discovered through their planets.'],['proyectos catalogados','catalogued projects'],['repositorios originales','original repositories'],['experiencias web','web experiences'],['última actualización','last update'],['CAPACIDADES / POR CATEGORÍA','CAPABILITIES / BY CATEGORY'],['Una vista de alto nivel.','A high-level view.'],['Los proyectos individuales permanecen en GitHub. Aquí se muestra únicamente la arquitectura general de mi trabajo.','Individual projects remain on GitHub. Only the overall architecture of my work is shown here.'],
  ['06 / CANALES ABIERTOS','06 / OPEN CHANNELS'],['Conecta con','Connect with'],['Arte, desarrollo, procesos creativos y nuevas señales del universo Pilukarts.','Art, development, creative processes and new signals from the Pilukarts universe.'],['Perfil profesional','Professional profile'],
  ['HECHO CON CÓDIGO Y CURIOSIDAD','MADE WITH CODE AND CURIOSITY'],['KO-FI · APOYAR MI TRABAJO ↗','KO-FI · SUPPORT MY WORK ↗']
]);
const originalText = new WeakMap();
let language = localStorage.getItem('pilukarts-language') || (navigator.language.startsWith('es') ? 'es' : 'en');
function translateStaticText(){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;
  while((node=walker.nextNode())){
    if(!originalText.has(node)) originalText.set(node,node.nodeValue);
    const base=originalText.get(node),trimmed=base.trim(),translated=staticCopy.get(trimmed);
    if(!translated) continue;
    node.nodeValue=language==='en'?base.replace(trimmed,translated):base;
  }
}
function applyLanguage(){document.documentElement.lang=language;document.querySelectorAll('[data-i18n]').forEach(el=>el.innerHTML=translations[language][el.dataset.i18n]);translateStaticText();document.querySelector('#lang-toggle').innerHTML=language==='es'?'<b>ES</b> | EN':'ES | <b>EN</b>';if(repositories.length)renderCategories();}

const escapeHTML = (value = '') => value.replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const compact = number => new Intl.NumberFormat('es', { notation: 'compact' }).format(number || 0);
const date = value => new Intl.DateTimeFormat('es', { month: 'short', year: 'numeric' }).format(new Date(value));

function renderCategories() {
  const cloudPattern = /cloud|cloudflare|aws|azure|gcp|docker|kubernetes|serverless|worker/i;
  const categories = [
    { name: 'TypeScript', code: 'TS', es: 'Aplicaciones tipadas, interfaces y sistemas web.', en: 'Typed applications, interfaces and web systems.' },
    { name: 'JavaScript', code: 'JS', es: 'Experiencias interactivas, juegos y prototipos.', en: 'Interactive experiences, games and prototypes.' },
    { name: 'Java', code: 'JV', es: 'Arquitectura, lógica y desarrollo multiplataforma.', en: 'Architecture, logic and cross-platform development.' },
    { name: 'Python', code: 'PY', es: 'Automatización, datos y herramientas creativas.', en: 'Automation, data and creative tools.' },
    { name: 'Cloud', code: 'CL', es: 'Despliegue, infraestructura y servicios conectados.', en: 'Deployment, infrastructure and connected services.', cloud: true }
  ];
  grid.innerHTML = categories.map((category, index) => {
    const count = repositories.filter(repo => category.cloud
      ? cloudPattern.test(`${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')}`)
      : repo.language === category.name).length;
    return `<button class="category-card ${selectedCategory===category.name?'active':''}" data-category="${category.name}" aria-expanded="${selectedCategory===category.name}" style="--category-index:${index}">
      <div class="category-code">${category.code}</div>
      <span class="category-number">0${index + 1}</span>
      <h4>${category.name}</h4>
      <p>${category[language]}</p>
      <div class="category-count"><strong>${count}</strong><span>${language==='es'?'proyectos catalogados':'catalogued projects'}</span><i>${language==='es'?'Ver proyectos':'View projects'} ↓</i></div>
    </button>`;
  }).join('');
  if(selectedCategory) renderCategoryResults(categories.find(category=>category.name===selectedCategory),cloudPattern);
  message.hidden = true;
}

function renderCategoryResults(category,cloudPattern){
  const visible=repositories.filter(repo=>category.cloud
    ? cloudPattern.test(`${repo.name} ${repo.description||''} ${(repo.topics||[]).join(' ')}`)
    : repo.language===category.name);
  categoryResults.hidden=false;
  categoryResults.innerHTML=`<div class="results-head"><div><small>${language==='es'?'CATEGORÍA ACTIVA':'ACTIVE CATEGORY'}</small><h4>${category.name}</h4></div><button type="button" data-close-category>${language==='es'?'Cerrar':'Close'} ×</button></div><div class="results-list">${visible.map(repo=>`<a href="${repo.html_url}" target="_blank" rel="noreferrer"><span>${escapeHTML(repo.name)}</span><small>${escapeHTML(repo.description||(language==='es'?'Repositorio público en GitHub.':'Public repository on GitHub.'))}</small><b>GitHub ↗</b></a>`).join('')||`<p>${language==='es'?'No hay repositorios públicos en esta categoría.':'There are no public repositories in this category.'}</p>`}</div>`;
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
    const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    document.querySelector('#star-count').textContent = compact(totalStars);
    const gatewayFollowers = document.querySelector('#gateway-followers');
    const gatewayRepositories = document.querySelector('#gateway-repositories');
    const gatewayStars = document.querySelector('#gateway-stars');
    if (gatewayFollowers) gatewayFollowers.textContent = compact(profile.followers);
    if (gatewayRepositories) gatewayRepositories.textContent = compact(profile.public_repos);
    if (gatewayStars) gatewayStars.textContent = compact(totalStars);
    document.querySelector('#total-projects').textContent = repositories.length;
    document.querySelector('#original-count').textContent = repositories.filter(repo => !repo.fork).length;
    document.querySelector('#website-count').textContent = repositories.filter(repo => repo.homepage).length;
    document.querySelector('#last-update').textContent = repositories.length ? date(repositories[0].updated_at) : '—';
    renderCategories(); renderChart();
  } catch (error) {
    grid.innerHTML = '';
    message.hidden = false;
    message.innerHTML = 'No se pudieron cargar los repositorios ahora. <a class="repo-link" href="https://github.com/pilukarts">Verlos directamente en GitHub</a>.';
  }
}

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lang-toggle').addEventListener('click',()=>{language=language==='es'?'en':'es';localStorage.setItem('pilukarts-language',language);applyLanguage();});
grid.addEventListener('click',event=>{
  const card=event.target.closest('[data-category]');
  if(!card)return;
  selectedCategory=selectedCategory===card.dataset.category?null:card.dataset.category;
  if(!selectedCategory)categoryResults.hidden=true;
  renderCategories();
  if(selectedCategory)categoryResults.scrollIntoView({behavior:'smooth',block:'nearest'});
});
categoryResults.addEventListener('click',event=>{
  if(!event.target.closest('[data-close-category]'))return;
  selectedCategory=null;categoryResults.hidden=true;renderCategories();
});
applyLanguage();
loadGitHub();

const worlds = [...document.querySelectorAll('.reveal-world')];
const worldObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      worldObserver.unobserve(entry.target);
    }
  });
}, { threshold: .18 });
worlds.forEach((world, index) => {
  world.style.setProperty('--reveal-delay', `${index * 70}ms`);
  worldObserver.observe(world);
});
