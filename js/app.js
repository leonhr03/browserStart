(() => {
  'use strict';

  const SEARCH_URLS = {
    google: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
    duckduckgo: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
    bing: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
    github: (q) => `https://github.com/search?q=${encodeURIComponent(q)}&type=repositories`,
    youtube: (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
    npm: (q) => `https://www.npmjs.com/search?q=${encodeURIComponent(q)}`,
  };

  const PLACEHOLDERS = {
    google: 'Google durchsuchen…',
    duckduckgo: 'DuckDuckGo durchsuchen…',
    bing: 'Bing durchsuchen…',
    github: 'Repositories suchen…',
    youtube: 'Videos suchen…',
    npm: 'npm-Pakete suchen…',
  };

  const ICONS = {
    github: '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
    mail: '<path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13zM4.5 4.2a1.3 1.3 0 0 0-1.3 1.3v.35l8.8 6.5 8.8-6.5V5.5a1.3 1.3 0 0 0-1.3-1.3h-15zm16.2 4.1-8.4 6.2a1 1 0 0 1-1.16 0L3.3 8.3v10.2a1.3 1.3 0 0 0 1.3 1.3h15a1.3 1.3 0 0 0 1.3-1.3V8.3z"/>',
    youtube: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
    firebase: '<path d="M3.89 1.54l6.277 7.187-2.297 2.443L3.89 1.54zM6.8 14.102l6.855 7.64L7.48 11.24s-.626.48-.68 2.862zM12.53 9.494l6.13 6.994-6.21 5.254-6.19-8.512-.136-2.73 5.31-5.66s1.84 2.66 1.096 4.654zM12.704 2.647l2.547 6.845-2.852-2.542-2.89 2.543.295-7.16 2.9-1.686zM9.03 3.806L1.99 6.612l3.854-4.556 3.186 1.75z"/>',
  };

  const DEV_LINKS = [
    { name: 'GitHub', url: 'https://github.com', color: '#24292e', icon: ICONS.github },
    { name: 'E-Mail', url: 'https://mail.google.com', color: '#d93025', icon: ICONS.mail },
    { name: 'YouTube', url: 'https://www.youtube.com', color: '#ff0000', icon: ICONS.youtube },
    { name: 'Firebase', url: 'https://firebase.google.com', color: '#ffca28', icon: ICONS.firebase, iconColor: '#1c1c1c' },
  ];

  const $ = (id) => document.getElementById(id);

  const clockEl = $('clock');
  const dateEl = $('date');
  const greetingEl = $('greeting');
  const searchForm = $('searchForm');
  const engineEl = $('engine');
  const searchInput = $('searchInput');
  const devTilesEl = $('devTiles');
  const quickSectionEl = $('quickSection');
  const quickTilesEl = $('quickTiles');
  const todoForm = $('todoForm');
  const todoInput = $('todoInput');
  const todoListEl = $('todoList');
  const notesEl = $('notes');
  const btnTheme = $('btnTheme');
  const btnAddLink = $('btnAddLink');
  const addLinkDialog = $('addLinkDialog');
  const addLinkForm = $('addLinkForm');
  const linkNameEl = $('linkName');
  const linkUrlEl = $('linkUrl');
  const linkErrorEl = $('linkError');
  const btnCancelLink = $('btnCancelLink');

  const storage = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem(key);
        return v === null ? fallback : JSON.parse(v);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {}
    },
  };

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  const root = document.documentElement;

  const toggleTheme = () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    storage.set('bs.theme', root.dataset.theme);
  };

  const focusSearch = () => {
    searchInput.focus();
    searchInput.select();
  };

  const timeFormat = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' });
  const dateFormat = new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const greetingFor = (h) => {
    if (h >= 5 && h < 11) return 'Guten Morgen';
    if (h >= 11 && h < 14) return 'Guten Tag';
    if (h >= 14 && h < 18) return 'Hallo';
    if (h >= 18 && h < 23) return 'Guten Abend';
    return 'Gute Nacht';
  };

  const renderClock = () => {
    const now = new Date();
    clockEl.textContent = timeFormat.format(now);
    dateEl.textContent = dateFormat.format(now);
    greetingEl.textContent = greetingFor(now.getHours());
  };

  const renderDevTiles = () => {
    devTilesEl.innerHTML = DEV_LINKS.map((link) => {
      const iconColor = link.iconColor || '#ffffff';
      const inner =
        `<span class="tile-icon" style="background:${link.color};color:${iconColor}">` +
        `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${link.icon}</svg></span>` +
        `<span class="tile-name">${link.name}</span>`;
      if (!link.url) {
        return `<span class="tile tile--inactive" title="Bisher ohne Link">${inner}</span>`;
      }
      return `<a class="tile" href="${link.url}" rel="noopener noreferrer">${inner}</a>`;
    }).join('');
  };

  const quickColor = (name) => {
    let h = 0;
    for (let i = 0; i < name.length; i++) {
      h = (h * 31 + name.charCodeAt(i)) >>> 0;
    }
    return `hsl(${h % 360} 65% 46%)`;
  };

  let quickLinks = storage.get('bs.quicklinks', []);

  const renderQuickLinks = () => {
    if (!quickLinks.length) {
      quickSectionEl.classList.add('hidden');
      quickTilesEl.innerHTML = '';
      return;
    }
    quickSectionEl.classList.remove('hidden');
    quickTilesEl.innerHTML = quickLinks
      .map((link) => {
        const initial = escapeHtml((link.name.charAt(0) || '?').toUpperCase());
        return (
          `<div class="tile tile--quick">` +
          `<a class="tile tile--quick-anchor" href="${escapeHtml(link.url)}" title="${escapeHtml(link.url)}">` +
          `<span class="tile-avatar" style="background:${quickColor(link.name)}">${initial}</span>` +
          `<span class="tile-name">${escapeHtml(link.name)}</span>` +
          `</a>` +
          `<button class="tile-remove" type="button" data-action="remove-link" data-id="${escapeHtml(link.id)}" aria-label="${escapeHtml(link.name)} entfernen">` +
          `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>` +
          `</button>` +
          `</div>`
        );
      })
      .join('');
  };

  quickTilesEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="remove-link"]');
    if (!btn) return;
    quickLinks = quickLinks.filter((l) => l.id !== btn.dataset.id);
    storage.set('bs.quicklinks', quickLinks);
    renderQuickLinks();
  });

  const showLinkError = (msg) => {
    linkErrorEl.textContent = msg;
    linkErrorEl.classList.remove('hidden');
  };

  btnAddLink.addEventListener('click', () => {
    addLinkForm.reset();
    linkErrorEl.classList.add('hidden');
    addLinkDialog.showModal();
    linkNameEl.focus();
  });

  btnCancelLink.addEventListener('click', () => addLinkDialog.close());

  addLinkDialog.addEventListener('click', (e) => {
    if (e.target === addLinkDialog) addLinkDialog.close();
  });

  addLinkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = linkNameEl.value.trim();
    const raw = linkUrlEl.value.trim();
    if (!name || !raw) {
      showLinkError('Name und URL sind Pflichtfelder.');
      return;
    }
    let url = raw;
    if (!/^[a-z]+:\/\//i.test(url)) url = 'https://' + url;
    try {
      const parsed = new URL(url);
      if (!/^https?:$/.test(parsed.protocol)) throw new Error();
      url = parsed.href;
    } catch {
      showLinkError('Bitte eine gültige URL eingeben.');
      return;
    }
    quickLinks.push({ id: uid(), name, url });
    storage.set('bs.quicklinks', quickLinks);
    renderQuickLinks();
    addLinkDialog.close();
  });

  let todos = storage.get('bs.todo', []);

  const saveTodos = () => storage.set('bs.todo', todos);

  const renderTodos = () => {
    if (!todos.length) {
      todoListEl.innerHTML = '<li class="empty">Keine Aufgaben – entspannt.</li>';
      return;
    }
    todoListEl.innerHTML = todos
      .map(
        (t) =>
          `<li class="todo-item${t.done ? ' done' : ''}" data-id="${escapeHtml(t.id)}">` +
          `<button class="todo-check" type="button" data-action="toggle-todo" aria-label="Aufgabe erledigen">` +
          `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>` +
          `</button>` +
          `<span class="todo-text">${escapeHtml(t.text)}</span>` +
          `<button class="todo-del" type="button" data-action="remove-todo" aria-label="Aufgabe löschen">` +
          `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>` +
          `</button>` +
          `</li>`
      )
      .join('');
  };

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;
    todos.push({ id: uid(), text, done: false });
    saveTodos();
    renderTodos();
    todoInput.value = '';
    todoInput.focus();
  });

  todoListEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const item = btn.closest('.todo-item');
    const todo = todos.find((t) => t.id === item.dataset.id);
    if (!todo) return;
    if (btn.dataset.action === 'toggle-todo') {
      todo.done = !todo.done;
    } else if (btn.dataset.action === 'remove-todo') {
      todos = todos.filter((t) => t.id !== todo.id);
    }
    saveTodos();
    renderTodos();
  });

  notesEl.value = storage.get('bs.notes', '');
  notesEl.addEventListener('input', () => storage.set('bs.notes', notesEl.value));

  const updatePlaceholder = () => {
    searchInput.placeholder = PLACEHOLDERS[engineEl.value] || PLACEHOLDERS.google;
  };

  engineEl.value = storage.get('bs.engine', 'google');
  engineEl.addEventListener('change', () => {
    storage.set('bs.engine', engineEl.value);
    updatePlaceholder();
  });
  updatePlaceholder();

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = searchInput.value.trim();
    if (!q) return;
    const build = SEARCH_URLS[engineEl.value];
    window.location.assign(build ? build(q) : SEARCH_URLS.google(q));
  });

  btnTheme.addEventListener('click', toggleTheme);

  document.addEventListener('keydown', (e) => {
    const target = e.target;
    const typing = target && (target.matches('input, textarea, select') || target.isContentEditable);
    const mod = e.metaKey || e.ctrlKey || e.altKey;
    const key = e.key.toLowerCase();

    if (mod && key === 'k') {
      e.preventDefault();
      focusSearch();
      return;
    }
    if (typing || mod) return;

    if (e.key === '/') {
      e.preventDefault();
      focusSearch();
    } else if (key === 't') {
      e.preventDefault();
      todoInput.focus();
    } else if (key === 'd') {
      e.preventDefault();
      toggleTheme();
    }
  });

  renderClock();
  setInterval(renderClock, 1000);
  renderDevTiles();
  renderQuickLinks();
  renderTodos();
})();
