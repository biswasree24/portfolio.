/* ═══════════════════════════════════════════
   BISWASREE DAS — PORTFOLIO JS
   Interactions · Animations · Mini Apps
═══════════════════════════════════════════ */

/* ══════════════════════════════
   LOADER
══════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initAll();
  }, 1800);
});

function initAll() {
  initCursor();
  initParticles();
  initNav();
  initScrollAnimations();
  initSkillBars();
  initWeatherApp();
  initAnimeApp();
  initMusicApp();
  initWallpaperApp();
  initContactForm();
}

/* ══════════════════════════════
   CUSTOM CURSOR
══════════════════════════════ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursor-trail');
  let tx = 0, ty = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
  });

  function animTrail() {
    tx += (cx - tx) * 0.14;
    ty += (cy - ty) * 0.14;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();

  document.querySelectorAll('a, button, .tag, .anime-check, .anime-del, .wp-item, .tech-icon, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
      cursor.style.opacity = '.7';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.opacity = '1';
    });
  });
}

/* ══════════════════════════════
   PARTICLES
══════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const COLORS = ['rgba(255,179,198,0.5)', 'rgba(201,184,255,0.5)', 'rgba(179,212,255,0.5)', 'rgba(179,240,214,0.5)', 'rgba(255,214,179,0.5)'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 55; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - .5) * .4,
      dy: (Math.random() - .5) * .4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: Math.random() * .6 + .2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      p.x += p.dx; p.y += p.dy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ══════════════════════════════
   NAVBAR
══════════════════════════════ */
function initNav() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

/* ══════════════════════════════
   SCROLL ANIMATIONS
══════════════════════════════ */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}
/* ══════════════════════════════
   SKILL BARS
══════════════════════════════ */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const pct = e.target.dataset.pct;
        e.target.style.width = pct + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  fills.forEach(f => obs.observe(f));
}

/* ══════════════════════════════
   WEATHER APP
══════════════════════════════ */
function initWeatherApp() {
  const btn   = document.getElementById('weatherBtn');
  const input = document.getElementById('weatherInput');

  // Simulated weather data
  const fakeWeather = {
    'london':    { city:'London, UK', temp:18, desc:'cloudy', icon:'⛅', humidity:75, wind:22, vis:8 },
    'tokyo':     { city:'Tokyo, JP', temp:27, desc:'sunny', icon:'☀️', humidity:60, wind:15, vis:14 },
    'paris':     { city:'Paris, FR', temp:21, desc:'partly cloudy', icon:'⛅', humidity:65, wind:18, vis:10 },
    'new york':  { city:'New York, US', temp:23, desc:'clear sky', icon:'🌤️', humidity:55, wind:20, vis:16 },
    'mumbai':    { city:'Mumbai, IN', temp:32, desc:'humid', icon:'🌫️', humidity:88, wind:12, vis:5 },
    'kolkata':   { city:'Kolkata, IN', temp:34, desc:'hot & hazy', icon:'🌡️', humidity:82, wind:10, vis:6 },
    'delhi':     { city:'Delhi, IN', temp:38, desc:'very hot', icon:'☀️', humidity:30, wind:8, vis:7 },
    'sydney':    { city:'Sydney, AU', temp:20, desc:'windy', icon:'💨', humidity:70, wind:28, vis:12 },
    'dubai':     { city:'Dubai, UAE', temp:42, desc:'scorching sun', icon:'🔆', humidity:20, wind:6, vis:15 },
    'berlin':    { city:'Berlin, DE', temp:16, desc:'overcast', icon:'🌥️', humidity:72, wind:20, vis:9 },
    'default':   { city:'—', temp:'??', desc:'city not found', icon:'😕', humidity:'—', wind:'—', vis:'—' }
  };

  function search() {
    const q = input.value.trim().toLowerCase();
    const result = document.getElementById('weatherResult');
    const error  = document.getElementById('weatherError');

    if (!q) return;
    const data = fakeWeather[q] || null;

    if (data) {
      document.getElementById('weatherIcon').textContent = data.icon;
      document.getElementById('weatherCity').textContent = data.city;
      document.getElementById('weatherTemp').textContent = data.temp + '°C';
      document.getElementById('weatherDesc').textContent = data.desc;
      document.getElementById('wHumidity').textContent   = data.humidity + '%';
      document.getElementById('wWind').textContent       = data.wind + ' km/h';
      document.getElementById('wVis').textContent        = data.vis + ' km';
      result.classList.remove('hidden');
      error.classList.add('hidden');
    } else {
      result.classList.add('hidden');
      error.classList.remove('hidden');
    }
  }

  btn.addEventListener('click', search);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') search(); });
}

/* ══════════════════════════════
   ANIME WATCHLIST APP
══════════════════════════════ */
function initAnimeApp() {
  let animeList = [
    { id: 1, name: 'Attack on Titan', watched: true },
    { id: 2, name: 'Demon Slayer', watched: false },
    { id: 3, name: 'Spy x Family', watched: false },
  ];
  let filter = 'all';
  let nextId = 4;

  const listEl  = document.getElementById('animeList');
  const input   = document.getElementById('animeInput');
  const addBtn  = document.getElementById('animeAdd');

  function render() {
    const filtered = filter === 'all' ? animeList
      : filter === 'watched' ? animeList.filter(a => a.watched)
      : animeList.filter(a => !a.watched);

    listEl.innerHTML = '';
    if (filtered.length === 0) {
      listEl.innerHTML = '<li style="color:var(--text-soft);justify-content:center;">Nothing here yet~ 🌸</li>';
      return;
    }
    filtered.forEach(a => {
      const li = document.createElement('li');
      li.className = a.watched ? 'watched' : '';
      li.innerHTML = 
        <div class="anime-check" data-id="${a.id}">${a.watched ? '✓' : ''}</div>
        <span class="anime-name">${a.name}</span>
        <span class="anime-del" data-del="${a.id}">✕</span>
      ;
      listEl.appendChild(li);
    });

    listEl.querySelectorAll('.anime-check').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        animeList = animeList.map(a => a.id === id ? { ...a, watched: !a.watched } : a);
        render();
      });
    });
    listEl.querySelectorAll('.anime-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.del);
        animeList = animeList.filter(a => a.id !== id);
        render();
      });
    });
  }

  addBtn.addEventListener('click', () => {
    const name = input.value.trim();
    if (!name) return;
    animeList.push({ id: nextId++, name, watched: false });
    input.value = '';
    render();
  });
  input.addEventListener('keydown', e => { if (e.key === 'Enter') addBtn.click(); });

  document.querySelectorAll('.anime-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.anime-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filter = btn.dataset.filter;
      render();
    });
  });

  render();
}

/* ══════════════════════════════
   MUSIC PLAYER APP
══════════════════════════════ */
function initMusicApp() {
  const songs = [
    { title: 'Aesthetic Vibes',    artist: 'Lo-Fi Dreams',    dur: '3:24', totalSec: 204 },
    { title: 'Sakura Nights',      artist: 'Ambient Studio',  dur: '4:12', totalSec: 252 },
    { title: 'Pastel Horizon',     artist: 'Chill Beats',     dur: '3:48', totalSec: 228 },
    { title: 'Lavender Fields',    artist: 'Dream State',     dur: '5:01', totalSec: 301 },
    { title: 'Cotton Candy Sky',   artist: 'Indie Vibes',     dur: '3:33', totalSec: 213 },
  ];

  let current = 0;
  let playing  = false;
  let curSec   = 0;
  let interval = null;

  const playBtn    = document.getElementById('playBtn');
  const prevBtn    = document.getElementById('prevBtn');
  const nextBtn    = document.getElementById('nextBtn');
  const titleEl    = document.getElementById('musicTitle');
  const artistEl   = document.getElementById('musicArtist');
  const totTimeEl  = document.getElementById('totTime');
  const curTimeEl  = document.getElementById('curTime');
  const fillEl     = document.getElementById('progressFill');
  const discEl     = document.getElementById('musicDisc');
  const playlistEl = document.getElementById('playlist');

  function formatTime(s) {
    return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  }

  function load(idx) {
    current = idx; curSec = 0;
    const s = songs[idx];
    titleEl.textContent  = s.title;
    artistEl.textContent = s.artist;
    totTimeEl.textContent = s.dur;
    curTimeEl.textContent = '0:00';
    fillEl.style.width = '0%';
    renderPlaylist();
  }

  function renderPlaylist() {
    playlistEl.innerHTML = '';
    songs.forEach((s, i) => {
      const li = document.createElement('li');
      li.className = i === current ? 'active' : '';
      li.innerHTML = <span class="pl-num">${i+1}</span><span class="pl-name">${s.title}</span><span class="pl-dur">${s.dur}</span>;
      li.addEventListener('click', () => { load(i); play(); });
      playlistEl.appendChild(li);
    });
  }

  function play() {
    playing = true;
    playBtn.textContent = '⏸';
    discEl.classList.add('spinning');
    clearInterval(interval);
    interval = setInterval(() => {
      curSec++;
      const total = songs[current].totalSec;
      if (curSec > total) { next(); return; }
      curTimeEl.textContent  = formatTime(curSec);
      fillEl.style.width = (curSec / total * 100) + '%';
    }, 1000);
  }
function pause() {
    playing = false;
    playBtn.textContent = '▶';
    discEl.classList.remove('spinning');
    clearInterval(interval);
  }

  function next() { load((current + 1) % songs.length); play(); }
  function prev() { load((current - 1 + songs.length) % songs.length); play(); }

  playBtn.addEventListener('click', () => playing ? pause() : play());
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  load(0);
}

/* ══════════════════════════════
   WALLPAPER APP
══════════════════════════════ */
function initWallpaperApp() {
  const wallpapers = [
    { emoji:'🌸', bg:'linear-gradient(135deg,#ffb3c6,#ffd6f0)', label:'Cherry Blossom', cat:'pastel' },
    { emoji:'🦋', bg:'linear-gradient(135deg,#d6b3ff,#b3d4ff)', label:'Butterfly Dream', cat:'pastel' },
    { emoji:'🌊', bg:'linear-gradient(135deg,#b3d4ff,#b3f0d6)', label:'Ocean Calm', cat:'nature' },
    { emoji:'🌙', bg:'linear-gradient(135deg,#c9b8ff,#8b9de8)', label:'Moon Night', cat:'anime' },
    { emoji:'🍃', bg:'linear-gradient(135deg,#b3f0d6,#ffd6b3)', label:'Spring Leaf', cat:'nature' },
    { emoji:'⭐', bg:'linear-gradient(135deg,#fff3b3,#ffd6b3)', label:'Starry Peach', cat:'pastel' },
    { emoji:'🌺', bg:'linear-gradient(135deg,#ffb3ba,#ffcdb3)', label:'Tropical Bloom', cat:'nature' },
    { emoji:'🗻', bg:'linear-gradient(135deg,#b3d4ff,#d6b3ff)', label:'Mt. Fuji', cat:'anime' },
    { emoji:'🍭', bg:'linear-gradient(135deg,#ffd6f0,#d6b3ff)', label:'Candy Pop', cat:'pastel' },
    { emoji:'🌿', bg:'linear-gradient(135deg,#b3f0d6,#b3d4ff)', label:'Forest Mist', cat:'nature' },
    { emoji:'🎋', bg:'linear-gradient(135deg,#b3f0d6,#ffe0b3)', label:'Bamboo', cat:'anime' },
    { emoji:'🌈', bg:'linear-gradient(135deg,#ffb3c6,#b3d4ff,#b3f0d6)', label:'Rainbow', cat:'pastel' },
  ];

  let cat = 'all';
  const grid = document.getElementById('wallpaperGrid');

  function render() {
    const filtered = cat === 'all' ? wallpapers : wallpapers.filter(w => w.cat === cat);
    grid.innerHTML = '';
    filtered.forEach(w => {
      const item = document.createElement('div');
      item.className = 'wp-item';
      item.innerHTML = 
        <div style="background:${w.bg}">${w.emoji}</div>
        <div class="wp-overlay">${w.label}</div>
      ;
      item.addEventListener('click', () => {
        item.style.transform = 'scale(0.95)';
        setTimeout(() => item.style.transform = '', 200);
      });
      grid.appendChild(item);
    });
  }

  document.querySelectorAll('.wp-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wp-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      cat = btn.dataset.cat;
      render();
    });
  });

  render();
}

/* ══════════════════════════════
   CONTACT FORM
══════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    success.classList.remove('hidden');
    form.reset();
    setTimeout(() => success.classList.add('hidden'), 4000);
  });
}
