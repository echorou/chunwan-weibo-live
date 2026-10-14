(() => {
  'use strict';

  const STORAGE_KEY = 'chunwan-studio-demo-v1';
  const OFFICIAL_LIVE_URL = 'https://tv.cctv.com/live/cctv1/';
  const FIRST_PUBLISHED_AT = '2026-10-15T12:05:00Z';
  const DISPLAY_TIME_ZONE = 'Asia/Shanghai';
  const publicationFormatter = new Intl.DateTimeFormat('zh-CN', {
    timeZone: DISPLAY_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  });
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const paths = {
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    comment: '<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
    share: '<path d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 10.5l6.8-4M8.6 13.5l6.8 4"/>',
    bookmark: '<path d="M6 3h12v18l-6-4-6 4V3Z"/>',
    play: '<path d="m9 5 11 7-11 7V5Z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
    chevronLeft: '<path d="m15 5-7 7 7 7"/>',
    chevronRight: '<path d="m9 5 7 7-7 7"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14-5L3 9m0-6v6h6M4 13a8 8 0 0 0 14 5l3-3m0 6v-6h-6"/>'
  };
  const icon = (name, extra = '') => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${paths[name] || paths.arrow}</svg>`;
  const posts = [
    {
      id: 'chunxiaomie-2027', pinned: true, original: true, hot: true, type: 'photo', mascot: true,
      time: '2027 原创概念 · 新朋友登场', likes: 2027, shares: 127, commentCount: 87,
      text: '#2027春晚原创吉祥物# #春小咩来报到# 叮咚！你的小小年味搭子「春小咩」来报到啦。\n祥云作角，团圆作伴，一盏小灯笼，照亮回家的路。\n愿新的一年，喜气洋洋，岁岁安康。',
      images: [{ src: 'assets/mascot.png', alt: '春小咩，2027 羊年春晚原创概念吉祥物；奶白绒毛、祥云羊角，手提红色小灯笼' }]
    },
    {
      id: 'gala-opening', pinned: false, original: true, hot: true, type: 'photo',
      time: '新春特别企划 · 演示内容', likes: 26800, shares: 1523, commentCount: 3621,
      text: '#春晚# 灯火照万家，今宵共团圆。\n重温 2026 年春晚《马上有奇迹》的舞台，把热爱与期待，都写进这片璀璨星河。\n你最期待的春晚瞬间是什么？一起聊聊吧。',
      images: [{ src: 'assets/stage-main.jpg', alt: '2026 年春晚《马上有奇迹》舞台，图片来源：央视网' }]
    },
    {
      id: 'gala-dance', original: true, hot: true, type: 'photo',
      time: '舞台灵感 · 演示内容', likes: 12600, shares: 826, commentCount: 1208,
      text: '#春晚舞台美学# 一抹流光，一舞惊鸿。\n《丝路古韵》《贺花神》《来晒秋》，当东方意境遇见舞台光影，每一个定格，都是写给新春的诗。哪一张最打动你？',
      images: [
        { src: 'assets/dance.jpg', alt: '2026 年春晚《丝路古韵》舞台，图片来源：央视网' },
        { src: 'assets/gala-wide.jpg', alt: '2026 年春晚《贺花神》舞台，图片来源：央视网' },
        { src: 'assets/harvest.jpg', alt: '2026 年春晚《来晒秋》舞台，图片来源：央视网' }
      ]
    },
    {
      id: 'gala-video', original: true, hot: true, type: 'video',
      time: '精彩回顾 · 演示内容', likes: 19800, shares: 1382, commentCount: 2046,
      text: '#把年味带回家# 镜头里的相聚，记忆里的年味。\n以《贺花神》的舞台画面为封面，重温心里那份热热闹闹的期待。',
      images: [{ src: 'assets/gala-wide.jpg', alt: '2026 年春晚《贺花神》回顾封面，图片来源：央视网' }], videoTitle: '贺花神 · 2026 舞台回顾', duration: '精彩回顾'
    },
    {
      id: 'gala-album', original: true, hot: false, type: 'photo',
      time: '幕后花絮 · 演示内容', likes: 8406, shares: 418, commentCount: 672,
      text: '#春晚幕后# 幕布之外，也有闪闪发光的故事。\n从《贺花神》到《来晒秋》，一束光、一次转身，把所有认真，都藏进这一刻。',
      images: [
        { src: 'assets/gala-wide.jpg', alt: '2026 年春晚《贺花神》舞台全景，图片来源：央视网' },
        { src: 'assets/harvest.jpg', alt: '2026 年春晚《来晒秋》舞台，图片来源：央视网' }
      ]
    },
    {
      id: 'gala-wishes', original: false, hot: false, type: 'text',
      time: '互动话题 · 演示内容', likes: 5820, shares: 263, commentCount: 421,
      text: '#我的新年愿望# 新的一年，想把哪句话送给自己？\n愿每一份心意都有回响，愿每一个平凡日子，都有值得期待的光。评论区留下一句祝福吧。',
      images: []
    }
  ];
  const updateTemplates = [
    { text: '#春晚# 团圆的故事，正在继续。\n新的一条演示动态已送达。此区域模拟社交动态更新，内容不来自微博实时接口。', type: 'photo', image: 'assets/stage-main.jpg' },
    { text: '#春晚舞台美学# 让镜头再停留一会儿。\n一起收藏这份舞台色彩与光影的灵感。', type: 'photo', image: 'assets/dance.jpg' },
    { text: '#把年味带回家# 无论相隔多远，心里总有一盏为你亮着的灯。\n说说你记忆中最有年味的瞬间吧。', type: 'text' },
    { text: '#春晚幕后# 每一份相聚的期待，都值得被认真准备。\n点击回顾封面，可以前往央视官方直播页面。', type: 'video', image: 'assets/gala-wide.jpg' }
  ];
  const stored = (() => {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return value && typeof value === 'object' ? value : {};
    } catch (_) { return {}; }
  })();
  const validArray = (value) => Array.isArray(value) ? value.filter((entry) => typeof entry === 'string') : [];
  const state = {
    following: stored.following === true,
    liked: new Set(validArray(stored.liked)), saved: new Set(validArray(stored.saved)),
    comments: stored.comments && typeof stored.comments === 'object' && !Array.isArray(stored.comments) ? stored.comments : {},
    view: 'all', filter: 'all', query: '', openComments: new Set(), drafts: new Map(),
    pending: [], updateIndex: 0, paused: false, photo: null
  };
  let toastTimeout;
  let lastFocus;
  let storageNoticeShown = false;

  function notify(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible', 'show');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('visible', 'show'), 3200);
  }
  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ following: state.following, liked: [...state.liked], saved: [...state.saved], comments: state.comments }));
    } catch (_) {
      if (!storageNoticeShown) { notify('浏览器暂时无法保存，互动仅在本次访问中保留'); storageNoticeShown = true; }
    }
  }
  function formatCount(count) {
    return count >= 10000 ? `${(count / 10000).toFixed(1).replace(/\.0$/, '')}万` : count.toLocaleString('zh-CN');
  }
  function publicationMarkup(post) {
    const publishedAt = post.publishedAt || FIRST_PUBLISHED_AT;
    const parts = Object.fromEntries(publicationFormatter.formatToParts(new Date(publishedAt)).map(({ type, value }) => [type, value]));
    const label = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}`;
    return `<time datetime="${escapeHTML(publishedAt)}" title="发布时间 · 北京时间（UTC+8）">${label}</time><span> · ${escapeHTML(post.time)}</span>`;
  }
  function localComments(postId) {
    const list = state.comments[postId];
    return Array.isArray(list) ? list.filter((item) => item && typeof item.text === 'string').slice(-50) : [];
  }
  function copyMarkup(text) {
    return escapeHTML(text).replace(/#([^#\n]+)#/g, (_, topic) => `<button type="button" class="inline-topic" data-topic="${topic}">#${topic}#</button>`).replace(/\n/g, '<br>');
  }
  function commentMarkup(post) {
    if (!state.openComments.has(post.id)) return '';
    const comments = localComments(post.id);
    return `<section class="comments" aria-label="${escapeHTML(post.id)}的评论">
      <p class="comment-hint">在这里说说你的感受 <span>评论仅保存在当前浏览器</span></p>
      <form class="comment-form" data-comment-form="${post.id}">
        <label class="sr-only" for="comment-${post.id}">评论内容</label>
        <textarea id="comment-${post.id}" name="comment" maxlength="280" placeholder="写下你的新春祝福…" rows="2" required>${escapeHTML(state.drafts.get(post.id) || '')}</textarea>
        <div class="comment-form-bottom"><span>最多 280 字 · 本地演示</span><button type="submit">发布评论</button></div>
      </form>
      <div class="comment-list">${comments.length ? comments.slice().reverse().map((item) => `<div class="comment-row"><span class="comment-avatar" aria-hidden="true">我</span><div><strong>我 <span class="local-label">本地评论</span></strong><p>${escapeHTML(item.text)}</p></div></div>`).join('') : '<p class="comment-empty">留下第一条本地评论，分享此刻的心情。</p>'}</div>
    </section>`;
  }
  function mediaMarkup(post) {
    if (!post.images.length) return '';
    if (post.type === 'video') {
      return `<button type="button" class="post-media video-cover" data-action="play-video" data-id="${post.id}" aria-label="打开${escapeHTML(post.videoTitle || '舞台回顾')}"><img src="${post.images[0].src}" alt="${escapeHTML(post.images[0].alt)}" loading="lazy"><span class="video-play">${icon('play')}</span><span class="video-caption">${escapeHTML(post.videoTitle || '舞台回顾')}<span>${escapeHTML(post.duration || '观看回顾')}</span></span></button>`;
    }
    if (post.mascot) {
      return `<div class="post-media mascot-media"><button type="button" class="photo-button" data-action="show-photo" data-id="${post.id}" data-index="0" aria-label="查看原创吉祥物春小咩大图"><img src="${post.images[0].src}" alt="${escapeHTML(post.images[0].alt)}" loading="eager"><span class="mascot-overlay"><span class="mascot-year">2027</span><span class="mascot-intro">你好，我叫</span><strong>春小咩</strong><span class="mascot-slogan">喜气洋洋 · 岁岁安康</span><span class="mascot-disclaimer">原创概念设计</span></span></button></div>`;
    }
    const isSingle = post.images.length === 1;
    return `<div class="${isSingle ? 'post-media' : 'photo-grid'}${post.images.length === 2 ? ' photo-grid-two' : ''}">${post.images.map((photo, index) => `<button type="button" class="photo-button" data-action="show-photo" data-id="${post.id}" data-index="${index}" aria-label="查看大图：${escapeHTML(photo.alt)}"><img src="${photo.src}" alt="${escapeHTML(photo.alt)}" loading="${post.pinned ? 'eager' : 'lazy'}">${!isSingle && index === post.images.length - 1 ? `<span class="media-count">${post.images.length} 张</span>` : ''}</button>`).join('')}</div>`;
  }
  function mascotStoryMarkup() {
    return `<details class="mascot-details"><summary>认识春小咩 <span>名字寓意 · 形象设计 · 性格故事</span><b>＋</b></summary><div class="mascot-story">
      <section><h4>名字里的春天</h4><p>「春」是新岁与生长，「小」是亲近与陪伴，「咩」是小羊软乎乎的问候。合在一起，是一个把春天和祝福带到你身边的小伙伴。</p></section>
      <section><h4>把好彩头穿在身上</h4><p>祥云金角寓意吉祥顺遂；奶白卷毛像团圆时的暖云；额间梅花象征迎寒绽放的生机；红披肩与中国结装着喜庆团圆；手里的灯笼照见归家的路。</p></section>
      <section><h4>性格故事</h4><p>爱笑、好奇、热心，最喜欢听一家人围坐聊天。遇到想家的人，会举高小灯笼轻轻说：「别着急，家的灯一直为你亮着。」</p></section>
      <section><h4>小羊档案</h4><dl><div><dt>名字</dt><dd>春小咩</dd></div><div><dt>生肖</dt><dd>羊</dd></div><div><dt>代表色</dt><dd>新春红 / 暖绒白 / 如意金</dd></div><div><dt>拿手本领</dt><dd>收集祝福、发现年味</dd></div><div><dt>口头禅</dt><dd>「咩一声，好事发生！」</dd></div></dl></section>
      <section><h4>2027 的新年愿望</h4><p>愿你每一次出发都有勇气，每一次回家都有拥抱，每一个平凡日子都有小小欢喜。</p></section>
    </div></details>`;
  }
  function postMarkup(post) {
    const liked = state.liked.has(post.id);
    const saved = state.saved.has(post.id);
    return `<article class="post" id="post-${post.id}" data-post-id="${post.id}">
      ${post.pinned ? '<div class="post-badge">置顶 <span>2027 原创吉祥物 · 春小咩</span></div>' : ''}
      <div class="post-head">
        <div class="avatar-small"><img src="assets/avatar.jpg" alt="春晚头像"></div>
        <div class="post-author"><strong>春晚 <span class="verified" title="视觉演示标记，不代表账号认证">V</span></strong><span class="post-time">${publicationMarkup(post)}</span></div>
        <button type="button" class="post-more${saved ? ' is-saved' : ''}" data-action="toggle-bookmark" data-id="${post.id}" aria-label="${saved ? '取消收藏' : '收藏动态'}" aria-pressed="${saved}" title="${saved ? '已收藏 · 点击取消' : '收藏动态'}">${icon('bookmark')}</button>
      </div>
      <div class="post-copy">${copyMarkup(post.text)}</div>
      ${mediaMarkup(post)}
      ${post.mascot ? mascotStoryMarkup() : ''}
      <div class="post-actions">
        <button type="button" class="post-action" data-action="share-post" data-id="${post.id}" aria-label="分享动态">${icon('share')}<span>${formatCount(post.shares)}</span></button>
        <button type="button" class="post-action" data-action="toggle-comment" data-id="${post.id}" aria-expanded="${state.openComments.has(post.id)}">${icon('comment')}<span>${formatCount(post.commentCount + localComments(post.id).length)}</span></button>
        <button type="button" class="post-action${liked ? ' is-liked' : ''}" data-action="toggle-like" data-id="${post.id}" aria-pressed="${liked}" aria-label="${liked ? '取消点赞' : '点赞'}">${icon('heart', liked ? ' style="fill:currentColor"' : '')}<span>${formatCount(post.likes + (liked ? 1 : 0))}</span></button>
      </div>
      ${commentMarkup(post)}
    </article>`;
  }
  function renderFeed() {
    const feed = $('#feed');
    if (!feed) return;
    const query = state.query.toLocaleLowerCase().replace(/^#|#$/g, '').trim();
    const visible = posts.filter((post) => {
      if (state.view === 'video' && post.type !== 'video') return false;
      if (state.view === 'photo' && post.type !== 'photo') return false;
      if (state.filter === 'original' && !post.original) return false;
      if (state.filter === 'hot' && !post.hot) return false;
      return !query || `${post.text} ${post.videoTitle || ''} 春晚`.toLocaleLowerCase().includes(query);
    });
    feed.innerHTML = visible.map(postMarkup).join('');
    const empty = $('#emptyState');
    if (empty) empty.hidden = visible.length !== 0;
    $$('[data-view]').forEach((button) => {
      const active = button.dataset.view === state.view;
      button.classList.toggle('active', active);
      if (button.closest('.topnav')) button.classList.toggle('selected', active);
      if (button.getAttribute('role') === 'tab') button.setAttribute('aria-selected', String(active));
      else button.setAttribute('aria-current', active ? 'page' : 'false');
    });
    $$('[data-filter]').forEach((button) => {
      const active = button.dataset.filter === state.filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
  function renderFollow() {
    const button = $('#followButton');
    if (button) {
      button.innerHTML = `${icon(state.following ? 'check' : 'plus')}<span>${state.following ? '已关注' : '关注'}</span>`;
      button.classList.toggle('following', state.following);
      button.setAttribute('aria-pressed', String(state.following));
    }
    const count = $('#followCount');
    if (count) count.textContent = state.following ? '1406.7万+' : '1406.7万';
  }
  function setQuery(value) {
    state.query = value;
    ['#feedSearch', '#globalSearch'].forEach((selector) => {
      const input = $(selector);
      if (input && input.value !== value) input.value = value;
    });
    renderFeed();
  }
  function openModal(title, content) {
    const modal = $('#modal');
    if (!modal) return;
    lastFocus = document.activeElement;
    $('#modalTitle').textContent = title;
    $('#modalBody').innerHTML = content;
    if (!modal.open) {
      if (typeof modal.showModal === 'function') modal.showModal();
      else { modal.setAttribute('open', ''); modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); }
    }
    document.body.classList.add('modal-open');
  }
  function closeModal() {
    const modal = $('#modal');
    if (!modal) return;
    if (typeof modal.close === 'function') modal.close();
    else modal.removeAttribute('open');
    document.body.classList.remove('modal-open');
    state.photo = null;
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }
  function showPhoto(postId, index) {
    const post = posts.find((item) => item.id === postId);
    if (!post || !post.images.length) return;
    index = ((Number(index) || 0) + post.images.length) % post.images.length;
    const photo = post.images[index];
    state.photo = { postId, index };
    const previousFocus = lastFocus;
    const wasOpen = $('#modal')?.open;
    openModal(post.mascot ? '春小咩 · 原创概念形象' : `舞台相册 · ${index + 1} / ${post.images.length}`, `<img class="modal-media lightbox-image" src="${photo.src}" alt="${escapeHTML(photo.alt)}"><div class="lightbox-nav"><button type="button" data-action="previous-photo"${post.images.length === 1 ? ' disabled' : ''}>${icon('chevronLeft')}上一张</button><p>${escapeHTML(photo.alt)}</p><button type="button" data-action="next-photo"${post.images.length === 1 ? ' disabled' : ''}>下一张${icon('chevronRight')}</button></div><p class="modal-note">${post.mascot ? '2027 羊年春晚原创概念吉祥物 · 春小咩' : '2026 年春晚舞台配图，来源：央视网。'}</p>`);
    if (wasOpen) lastFocus = previousFocus;
  }
  function showVideo(postId) {
    const post = posts.find((item) => item.id === postId) || posts.find((item) => item.type === 'video');
    if (!post) return;
    openModal(post.videoTitle || '舞台精彩回顾', `<img class="modal-media" src="${post.images[0].src}" alt="${escapeHTML(post.images[0].alt)}"><p class="modal-description">这是一张视频回顾的演示封面，本站没有接入直播或视频源。您可以前往央视官方网站观看当前频道节目。</p><a class="modal-primary" href="${OFFICIAL_LIVE_URL}" target="_blank" rel="noopener noreferrer">前往央视官方直播 ${icon('arrow')}</a><p class="modal-note">将打开 tv.cctv.com，播放内容与可用性以央视页面为准。</p>`);
  }
  function showSchedule() {
    const rows = [
      ['20:00', '开场歌舞', '灯火迎春', '用热烈的歌舞，开启新春的团圆之约。'],
      ['20:35', '舞蹈', '春山如画', '东方意境与舞台光影的创意演绎。'],
      ['21:10', '语言节目', '家里的那盏灯', '从平凡生活里，发现温暖与欢笑。'],
      ['23:55', '零点时刻', '共赴新岁', '一起写下祝福，迎接新的一年。']
    ];
    openModal('新春节目单 · 示例', `<p class="modal-description">以下为展示界面效果而编写的示例节目单。</p><div class="schedule-list">${rows.map(([time, type, title, description]) => `<div class="schedule-item"><time>${time}</time><div><span class="schedule-type">${type}</span><h3>${title}</h3><p>${description}</p></div></div>`).join('')}</div><a class="modal-primary" href="${OFFICIAL_LIVE_URL}" target="_blank" rel="noopener noreferrer">查看央视官方节目 ${icon('arrow')}</a>`);
  }
  async function share(postId) {
    const url = new URL(location.href);
    url.hash = postId ? `post-${postId}` : '';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url.toString());
      notify('演示页面链接已复制');
    } catch (_) {
      openModal('分享演示页面', `<p class="modal-description">复制下方链接，即可分享这份新春原创设计。</p><label class="sr-only" for="shareLink">页面链接</label><input class="share-link" id="shareLink" readonly value="${escapeHTML(url.toString())}"><p class="modal-note">链接指向当前创作主页。</p>`);
      const input = $('#shareLink');
      input?.focus();
      input?.select();
    }
  }
  function queueUpdate() {
    if (state.paused || document.hidden) return;
    const template = updateTemplates[state.updateIndex % updateTemplates.length];
    const timestamp = Date.now();
    state.pending.unshift({
      id: `demo-${timestamp}-${state.updateIndex}`, original: true, hot: state.updateIndex % 2 === 0,
      type: template.type, text: template.text, time: '自动生成的演示动态', publishedAt: new Date(timestamp).toISOString(),
      likes: 0, shares: 0, commentCount: 0,
      images: template.image ? [{ src: template.image, alt: `2026 年春晚${({ 'assets/stage-main.jpg': '《马上有奇迹》', 'assets/dance.jpg': '《丝路古韵》', 'assets/gala-wide.jpg': '《贺花神》' })[template.image] || ''}舞台，图片来源：央视网` }] : [],
      videoTitle: template.type === 'video' ? '幕后与舞台 · 演示回顾' : undefined
    });
    state.updateIndex += 1;
    state.pending = state.pending.slice(0, 4);
    const button = $('#newPosts');
    if (button) { button.hidden = false; button.innerHTML = `${icon('refresh')}<span>${state.pending.length} 条新演示动态，点击查看</span>`; }
    const updated = $('#lastUpdated');
    if (updated) updated.textContent = '发现新的演示动态';
  }
  function loadUpdates() {
    if (!state.pending.length) return;
    const pinnedCount = posts[0]?.pinned ? 1 : 0;
    posts.splice(pinnedCount, 0, ...state.pending);
    if (posts.length > 25) posts.splice(20, posts.length - 25);
    const count = state.pending.length;
    state.pending = [];
    const button = $('#newPosts');
    if (button) button.hidden = true;
    const updated = $('#lastUpdated');
    if (updated) updated.textContent = '刚刚更新 · 模拟动态';
    renderFeed();
    notify(`已载入 ${count} 条演示动态`);
  }
  function pauseUpdates() {
    state.paused = !state.paused;
    const button = $('#pauseLive');
    if (button) {
      button.innerHTML = `${icon(state.paused ? 'play' : 'pause')}<span>${state.paused ? '继续更新' : '暂停更新'}</span>`;
      button.setAttribute('aria-pressed', String(state.paused));
      button.setAttribute('aria-label', state.paused ? '继续演示动态更新' : '暂停演示动态更新');
    }
    const updated = $('#lastUpdated');
    if (updated) updated.textContent = state.paused ? '演示更新已暂停' : '每 30 秒生成演示动态';
    notify(state.paused ? '已暂停演示动态更新' : '已继续演示动态更新');
  }
  function updateClock() {
    const clock = $('#liveClock');
    if (clock) {
      clock.textContent = new Date().toLocaleTimeString('zh-CN', { timeZone: DISPLAY_TIME_ZONE, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      clock.title = '北京时间（UTC+8），与文章发布时间使用同一时区';
    }
  }

  document.addEventListener('click', async (event) => {
    const follow = event.target.closest('#followButton');
    if (follow) {
      event.preventDefault();
      state.following = !state.following;
      persist(); renderFollow();
      notify(state.following ? '已在本地关注此演示主页' : '已取消本地关注');
      return;
    }
    if (event.target.closest('#newPosts')) { event.preventDefault(); loadUpdates(); return; }
    if (event.target.closest('#pauseLive')) { event.preventDefault(); pauseUpdates(); return; }
    if (event.target.closest('#modalClose')) { event.preventDefault(); closeModal(); return; }
    const view = event.target.closest('[data-view]');
    if (view) {
      event.preventDefault();
      state.view = ['all', 'video', 'photo'].includes(view.dataset.view) ? view.dataset.view : 'all';
      state.filter = 'all';
      setQuery('');
      if (!view.closest('.profile-tabs')) $('#timeline')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const filter = event.target.closest('[data-filter]');
    if (filter) {
      event.preventDefault();
      state.filter = ['all', 'original', 'hot'].includes(filter.dataset.filter) ? filter.dataset.filter : 'all';
      if (filter.closest('#emptyState')) { state.view = 'all'; setQuery(''); $('#timeline')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      else if (!filter.closest('.feed-filters')) { state.view = 'all'; setQuery(''); $('#timeline')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      else renderFeed();
      return;
    }
    const topic = event.target.closest('[data-topic]');
    if (topic) {
      event.preventDefault();
      state.view = 'all'; state.filter = 'all';
      setQuery(topic.dataset.topic.replace(/^#|#$/g, ''));
      $('#feedSearch')?.focus({ preventScroll: true });
      $('#timeline')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const action = event.target.closest('[data-action]');
    if (!action) return;
    const { id } = action.dataset;
    switch (action.dataset.action) {
      case 'toggle-like':
        event.preventDefault();
        state.liked.has(id) ? state.liked.delete(id) : state.liked.add(id);
        persist(); renderFeed();
        break;
      case 'toggle-bookmark':
        event.preventDefault();
        state.saved.has(id) ? state.saved.delete(id) : state.saved.add(id);
        persist(); renderFeed();
        notify(state.saved.has(id) ? '已收藏到当前浏览器' : '已取消收藏');
        break;
      case 'toggle-comment':
        event.preventDefault();
        state.openComments.has(id) ? state.openComments.delete(id) : state.openComments.add(id);
        renderFeed();
        if (state.openComments.has(id)) $(`#comment-${id}`)?.focus({ preventScroll: true });
        break;
      case 'share-post': event.preventDefault(); await share(id); break;
      case 'share-profile': event.preventDefault(); await share(); break;
      case 'show-photo': event.preventDefault(); showPhoto(id, action.dataset.index); break;
      case 'previous-photo':
      case 'next-photo':
        event.preventDefault();
        if (state.photo) showPhoto(state.photo.postId, state.photo.index + (action.dataset.action === 'next-photo' ? 1 : -1));
        break;
      case 'play-video': event.preventDefault(); showVideo(id); break;
      case 'schedule': event.preventDefault(); showSchedule(); break;
      case 'about':
        event.preventDefault();
        openModal('关于这个页面', '<p class="modal-description">这是以春晚为灵感的独立原创设计作品，包含原创 2027 羊年概念吉祥物春小咩与社交主页互动。</p><p>动态、节目单、计数与标记均为演示；页面没有连接微博接口。舞台配图来自央视网，春小咩为原创概念设计。</p><p>关注、点赞、收藏和评论只保存在当前浏览器。每 30 秒出现的新动态属于本地模拟，可随时暂停。</p>');
        break;
      case 'notifications':
        event.preventDefault();
        openModal('通知', `<p class="modal-description">${state.pending.length ? `有 ${state.pending.length} 条新的演示动态等待载入。关闭此窗口后，点击动态区上方的更新提示即可查看。` : '暂时没有新的演示通知。'}</p><p class="modal-note">此演示没有接入微博通知或私信服务。</p>`);
        break;
      case 'message':
        event.preventDefault();
        openModal('联系与私信', '<p class="modal-description">当前页面没有接入私信服务。您可以在动态下发布保存在自己浏览器里的演示评论。</p><p class="modal-note">请通过微博或央视官方渠道联系真实账号。</p>');
        break;
      case 'refresh-trends': {
        event.preventDefault();
        const list = $('.trends-list');
        if (list && list.firstElementChild) {
          list.append(list.firstElementChild);
          [...list.children].forEach((row, index) => {
            const rank = row.querySelector('b');
            if (rank) rank.textContent = String(index + 1);
          });
        }
        notify('已刷新演示话题顺序');
        break;
      }
      case 'clear-search': event.preventDefault(); state.view = 'all'; state.filter = 'all'; setQuery(''); break;
      case 'close-modal': event.preventDefault(); closeModal(); break;
      default: break;
    }
  });
  document.addEventListener('input', (event) => {
    if (event.target.matches('#feedSearch, #globalSearch')) setQuery(event.target.value);
    const form = event.target.closest('[data-comment-form]');
    if (form && event.target.matches('textarea')) state.drafts.set(form.dataset.commentForm, event.target.value);
  });
  document.addEventListener('submit', (event) => {
    const form = event.target.closest('[data-comment-form]');
    if (form) {
      event.preventDefault();
      const text = form.querySelector('textarea').value.trim().slice(0, 280);
      if (!text) { notify('先写下一句想说的话吧'); return; }
      const postId = form.dataset.commentForm;
      state.comments[postId] = [...localComments(postId), { text, createdAt: new Date().toISOString() }].slice(-50);
      state.drafts.delete(postId);
      persist(); renderFeed(); notify('评论已发布，仅保存在当前浏览器');
      return;
    }
    if (event.target.querySelector('#globalSearch, #feedSearch')) { event.preventDefault(); renderFeed(); }
  });
  document.addEventListener('keydown', (event) => {
    if (!$('#modal')?.open || !state.photo) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(state.photo.postId, state.photo.index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  const modal = $('#modal');
  modal?.setAttribute('aria-labelledby', 'modalTitle');
  modal?.addEventListener('click', (event) => {
    if (event.target !== modal) return;
    const rect = modal.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeModal();
  });
  modal?.addEventListener('close', () => { document.body.classList.remove('modal-open'); state.photo = null; });
  modal?.addEventListener('cancel', () => { document.body.classList.remove('modal-open'); state.photo = null; });

  renderFollow();
  renderFeed();
  updateClock();
  setInterval(updateClock, 1000);
  setInterval(queueUpdate, 30000);
  const updated = $('#lastUpdated');
  if (updated) updated.textContent = '每 30 秒生成演示动态';
  const pause = $('#pauseLive');
  if (pause) { pause.setAttribute('aria-pressed', 'false'); pause.setAttribute('aria-label', '暂停演示动态更新'); }
  if (location.hash.startsWith('#post-')) {
    setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'center' }), 50);
  }
})();
