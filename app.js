(() => {
  'use strict';

  const STORAGE_KEY = 'chunwan-studio-demo-v1';
  const OFFICIAL_LIVE_URL = 'https://tv.cctv.com/live/cctv1/';
  const FIRST_PUBLISHED_AT = '2026-10-14T23:05:00Z';
  const DISPLAY_TIME_ZONE = 'Asia/Shanghai';
  const publicationFormatter = new Intl.DateTimeFormat('zh-CN', {
    timeZone: DISPLAY_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  });
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const paths = {
    thumb: '<path d="M7 10H3v11h4M7 21h10.5a2 2 0 0 0 2-1.6l1.4-7A2 2 0 0 0 19 10h-6l1-5a2.5 2.5 0 0 0-2.5-3L7 10v11Z"/>',
    comment: '<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
    repost: '<path d="m16 3 4 4-4 4M20 7H7a3 3 0 0 0-3 3v2M8 21l-4-4 4-4M4 17h13a3 3 0 0 0 3-3v-2"/>',
    more: '<path d="m7 10 5 5 5-5"/>',
    bookmark: '<path d="M6 3h12v18l-6-4-6 4V3Z"/>',
    play: '<path d="m9 5 11 7-11 7V5Z"/>',
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
      time: '新朋友登场', likes: 2027, shares: 127, commentCount: 87,
      text: '#2027春晚原创吉祥物# #春小咩来报到# 叮咚！你的年味小伙伴「春小咩」来报到啦。\n米白羊毛如蓬松云朵，成对卷曲的羊角饰以鎏金回纹，额间一朵红色迎春花印记，带着温柔明亮的笑意。胭脂红国风披肩上，金色“三阳开泰”纹样寄托迎春纳福、万物和顺的祝愿。\n这份原创设计以历年春晚生肖形象的文化表达为灵感，创作属于春小咩自己的模样。愿新的一年，喜气洋洋，岁岁安康。',
      images: [{ src: 'assets/mascot-2027-v4.png', alt: '春小咩，2027 丁未羊年自主设计吉祥物；米白云朵羊毛，对称鎏金回纹羊角，额间红色迎春花印记，身披绣有三阳开泰图案的胭脂红金边披肩，微笑挥手' }]
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
    storyOpen: new Map(), topSection: 'recommended', photo: null,
    dark: stored.dark === true, largeType: stored.largeType === true
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ following: state.following, liked: [...state.liked], saved: [...state.saved], comments: state.comments, dark: state.dark, largeType: state.largeType }));
    } catch (_) {
      if (!storageNoticeShown) { notify('浏览器暂时无法保存，互动仅在本次访问中保留'); storageNoticeShown = true; }
    }
  }
  function formatCount(count) {
    return count >= 10000 ? `${(count / 10000).toFixed(1).replace(/\.0$/, '')}万` : count.toLocaleString('zh-CN');
  }
  function publicationMarkup(post) {
    if (!post.mascot) return `<span>${escapeHTML(post.time)}</span>`;
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
      return `<div class="post-media mascot-media"><button type="button" class="photo-button" data-action="show-photo" data-id="${post.id}" data-index="0" aria-label="查看原创吉祥物春小咩大图"><img src="${post.images[0].src}" width="1122" height="1402" alt="${escapeHTML(post.images[0].alt)}" loading="eager"><span class="mascot-caption"><strong>春小咩</strong><span>2027 丁未羊年</span></span></button></div>`;
    }
    const isSingle = post.images.length === 1;
    return `<div class="${isSingle ? 'post-media' : 'photo-grid'}${post.images.length === 2 ? ' photo-grid-two' : ''}">${post.images.map((photo, index) => `<button type="button" class="photo-button" data-action="show-photo" data-id="${post.id}" data-index="${index}" aria-label="查看大图：${escapeHTML(photo.alt)}"><img src="${photo.src}" alt="${escapeHTML(photo.alt)}" loading="${post.pinned ? 'eager' : 'lazy'}">${!isSingle && index === post.images.length - 1 ? `<span class="media-count">${post.images.length} 张</span>` : ''}</button>`).join('')}</div>`;
  }
  function mascotStoryMarkup(postId) {
    const isOpen = state.storyOpen.has(postId) ? state.storyOpen.get(postId) : state.view === 'article';
    return `<details class="mascot-details" data-story-id="${postId}"${isOpen ? ' open' : ''}><summary>认识春小咩 <span>名字寓意 · 形象设计 · 性格故事</span><b>＋</b></summary><div class="mascot-story">
      <section><h4>名字里的春天</h4><p>「春」是新岁与生长，「小」是亲近与陪伴，「咩」是小羊软乎乎的问候。合在一起，是一个把春天和祝福带到你身边的小伙伴。</p></section>
      <section><h4>一眼认出这只羊</h4><p>双角对称卷起，外翻的小耳朵、圆鼻与分瓣小蹄保留清楚的羊的特征。奶白色的身体采用柔和圆润的立体造型，卷毛适当简化，让缩小后的表情和轮廓也容易辨认。</p></section>
      <section><h4>把好彩头穿在身上</h4><p>卷曲羊角以鎏金回纹点缀，连绵的线条寄托绵延不息的祝福；米白羊毛如蓬松云朵，呼应团圆与温暖。额间的红色迎春花印记点亮春意，胭脂红国风披肩以金边收束，三只小羊组成“三阳开泰”纹样，寓意万物和顺、家国安康。米白、胭脂红与鎏金构成完整的三色搭配。这些寓意与组合是本次原创设定。</p></section>
      <section><h4>从历年设计中寻找方法</h4><p>2015 年「阳阳」以小尾寒羊为原型，提醒我们先把生肖特征做清楚；2023 年「兔圆圆」将动物特征与传统美术结合；2024 年「龙辰辰」使用传统龙形与中国传统色；2025 年「巳升升」把如意等文化元素转化为造型语言；2026 年「骐骐、骥骥、驰驰、骋骋」从文物与真实马种汲取灵感。春小咩借鉴的是让生肖、文化与寓意相互支持的创作思路，角色的回纹金角、云朵羊毛、迎春花印记与国风披肩组合为独立创作。</p><p class="design-sources">设计参考：<a href="https://m.news.cntv.cn/2015/01/28/ARTI1422416678662896.shtml" target="_blank" rel="noopener noreferrer">2015 阳阳</a> · <a href="https://1118.cctv.com/2022/12/22/ARTIXupnKSon84vQWBZhCrGq221222.shtml" target="_blank" rel="noopener noreferrer">2023 兔圆圆</a> · <a href="https://www.cctv.com/2023/12/06/ARTI7h0A9Zl79WNwok9VLSnk231206.shtml" target="_blank" rel="noopener noreferrer">2024 龙辰辰</a> · <a href="https://yangbo.cctv.com/2024/12/03/ARTI5Ewm7EYxU8PvKVuM6ej1241203.shtml" target="_blank" rel="noopener noreferrer">2025 巳升升</a> · <a href="https://1118.cctv.com/2025/12/19/ARTILDHbtUE7XA7zrHseNLe7251219.shtml" target="_blank" rel="noopener noreferrer">2026 骐骐、骥骥、驰驰、骋骋</a>。以上链接为央视公开介绍，春小咩是独立设计的 2027 羊年形象。</p></section>
      <section><h4>性格故事</h4><p>爱笑、好奇、热心，喜欢一路挥着小蹄和大家打招呼。它把每一句祝福当成一朵暖云，收藏进自己的新年故事里；遇到久别归来的人，就笑眯眯地说：「咩一声，好事发生！」</p></section>
      <section><h4>小羊档案</h4><dl><div><dt>名字</dt><dd>春小咩</dd></div><div><dt>生肖</dt><dd>羊 · 2027 丁未羊年</dd></div><div><dt>形象记忆</dt><dd>回纹金角 / 云朵羊毛 / 迎春花印记 / 国风披肩</dd></div><div><dt>代表色</dt><dd>米白 / 胭脂红 / 鎏金</dd></div><div><dt>拿手本领</dt><dd>收集祝福、发现年味</dd></div><div><dt>口头禅</dt><dd>「咩一声，好事发生！」</dd></div></dl></section>
      <section><h4>2027 的新年愿望</h4><p>愿你每一次出发都有勇气，每一次回家都有拥抱，每一个平凡日子都有小小欢喜。</p></section>
    </div></details>`;
  }
  function postMarkup(post) {
    const liked = state.liked.has(post.id);
    const saved = state.saved.has(post.id);
    return `<article class="post" id="post-${post.id}" data-post-id="${post.id}">
      ${post.pinned ? '<div class="post-badge">置顶 <span>2027 羊年吉祥物 · 春小咩</span></div>' : ''}
      <div class="post-head">
        <div class="avatar-small"><img src="assets/avatar.jpg" alt="春晚头像"></div>
        <div class="post-author"><strong>春晚${post.mascot ? '' : ' <span class="post-original">创作回顾</span>'}</strong><span class="post-time">${publicationMarkup(post)}</span></div>
        <button type="button" class="post-more${saved ? ' is-saved' : ''}" data-action="post-menu" data-id="${post.id}" aria-label="更多动态操作${saved ? '，已收藏' : ''}" aria-haspopup="dialog" title="更多操作">${icon('more')}</button>
      </div>
      <div class="post-copy">${copyMarkup(post.text)}</div>
      ${mediaMarkup(post)}
      ${post.mascot ? mascotStoryMarkup(post.id) : ''}
      <div class="post-actions">
        <button type="button" class="post-action" data-action="share-post" data-id="${post.id}" aria-label="分享动态">${icon('repost')}<span>${formatCount(post.shares)}</span></button>
        <button type="button" class="post-action" data-action="toggle-comment" data-id="${post.id}" aria-label="${state.openComments.has(post.id) ? '收起评论' : '展开评论'}" aria-expanded="${state.openComments.has(post.id)}">${icon('comment')}<span>${formatCount(post.commentCount + localComments(post.id).length)}</span></button>
        <button type="button" class="post-action${liked ? ' is-liked' : ''}" data-action="toggle-like" data-id="${post.id}" aria-pressed="${liked}" aria-label="${liked ? '取消点赞' : '点赞'}">${icon('thumb', liked ? ' style="fill:currentColor"' : '')}<span>${formatCount(post.likes + (liked ? 1 : 0))}</span></button>
      </div>
      ${commentMarkup(post)}
    </article>`;
  }
  function renderFeed(expandArticle = false) {
    const feed = $('#feed');
    if (!feed) return;
    $$('.mascot-details[data-story-id]', feed).forEach((details) => state.storyOpen.set(details.dataset.storyId, details.open));
    if (expandArticle) posts.filter((post) => post.mascot).forEach((post) => state.storyOpen.set(post.id, true));
    const query = state.query.toLocaleLowerCase().replace(/^#|#$/g, '').trim();
    const visible = posts.filter((post) => {
      if (state.view === 'video' && post.type !== 'video') return false;
      if (state.view === 'photo' && post.type !== 'photo') return false;
      if (state.view === 'article' && !post.mascot) return false;
      if (state.filter === 'original' && !post.original) return false;
      if (state.filter === 'hot' && !post.hot) return false;
      return !query || `${post.text} ${post.videoTitle || ''} 春晚`.toLocaleLowerCase().includes(query);
    });
    feed.innerHTML = visible.map(postMarkup).join('');
    const empty = $('#emptyState');
    if (empty) empty.hidden = visible.length !== 0;
    $$('[data-view]').forEach((button) => {
      if (button.closest('.topnav')) return;
      const active = button.dataset.view === state.view;
      button.classList.toggle('active', active);
      if (button.getAttribute('role') === 'tab') button.setAttribute('aria-selected', String(active));
      else button.setAttribute('aria-current', active ? 'page' : 'false');
    });
    $$('[data-filter]').forEach((button) => {
      if (button.closest('.topnav')) return;
      const active = button.dataset.filter === state.filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    renderTopNavigation();
  }
  function topSectionFor(button) {
    if (button.dataset.filter === 'hot') return 'recommended';
    if (button.dataset.view === 'video') return 'video';
    if (button.dataset.view === 'all') return 'home';
    if (button.dataset.action === 'message') return 'messages';
    if (button.dataset.action === 'about') return 'profile';
    return '';
  }
  function restorePostFocus(id, actionName) {
    const article = document.getElementById(`post-${id}`);
    const button = article && $$('[data-action]', article).find((item) => item.dataset.action === actionName);
    button?.focus({ preventScroll: true });
  }
  function renderTopNavigation() {
    $$('.topnav button').forEach((button) => {
      const selected = topSectionFor(button) === state.topSection;
      button.classList.toggle('selected', selected);
      button.classList.remove('active');
      if (selected) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
  }
  function renderPreferences() {
    document.body.classList.toggle('dark', state.dark);
    document.body.classList.toggle('large-type', state.largeType);
    $$('[data-action="toggle-theme"]').forEach((button) => {
      button.setAttribute('aria-pressed', String(state.dark));
      button.setAttribute('aria-label', state.dark ? '关闭夜间模式' : '开启夜间模式');
    });
    $$('[data-action="accessibility"]').forEach((button) => {
      button.setAttribute('aria-pressed', String(state.largeType));
      button.setAttribute('aria-label', state.largeType ? '关闭大字模式' : '开启大字模式');
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
    if (count) count.textContent = '1407.1万';
  }
  function setQuery(value, expandArticle = false) {
    state.query = value;
    ['#feedSearch', '#globalSearch'].forEach((selector) => {
      const input = $(selector);
      if (input && input.value !== value) input.value = value;
    });
    renderFeed(expandArticle);
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
    openModal(post.mascot ? '春小咩 · 形象大图' : `舞台相册 · ${index + 1} / ${post.images.length}`, `<img class="modal-media lightbox-image" src="${photo.src}" alt="${escapeHTML(photo.alt)}"><div class="lightbox-nav"><button type="button" data-action="previous-photo"${post.images.length === 1 ? ' disabled' : ''}>${icon('chevronLeft')}上一张</button><p>${escapeHTML(photo.alt)}</p><button type="button" data-action="next-photo"${post.images.length === 1 ? ' disabled' : ''}>下一张${icon('chevronRight')}</button></div><p class="modal-note">${post.mascot ? '2027 羊年自主设计吉祥物 · 春小咩' : '2026 年春晚舞台配图，来源：央视网。'}</p>`);
    if (wasOpen) lastFocus = previousFocus;
  }
  function showVideo(postId) {
    const post = posts.find((item) => item.id === postId) || posts.find((item) => item.type === 'video');
    if (!post) return;
    openModal(post.videoTitle || '舞台精彩回顾', `<img class="modal-media" src="${post.images[0].src}" alt="${escapeHTML(post.images[0].alt)}"><p class="modal-description">这是一张视频回顾的演示封面，本站没有接入直播或视频源。您可以前往央视官方网站观看当前频道节目。</p><a class="modal-primary" href="${OFFICIAL_LIVE_URL}" target="_blank" rel="noopener noreferrer">前往央视官方直播 ${icon('arrow')}</a><p class="modal-note">将打开 tv.cctv.com，播放内容与可用性以央视页面为准。</p>`);
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
  document.addEventListener('click', async (event) => {
    const topButton = event.target.closest('.topnav button');
    if (topButton) { state.topSection = topSectionFor(topButton); renderTopNavigation(); }
    const follow = event.target.closest('#followButton');
    if (follow) {
      event.preventDefault();
      state.following = !state.following;
      persist(); renderFollow();
      notify(state.following ? '已在本地关注此演示主页' : '已取消本地关注');
      return;
    }
    if (event.target.closest('#modalClose')) { event.preventDefault(); closeModal(); return; }
    const view = event.target.closest('[data-view]');
    if (view) {
      event.preventDefault();
      state.view = ['all', 'video', 'photo', 'article'].includes(view.dataset.view) ? view.dataset.view : 'all';
      state.filter = 'all';
      setQuery('', state.view === 'article');
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
      if ($('#modal')?.open) closeModal();
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
        restorePostFocus(id, 'toggle-like');
        break;
      case 'toggle-bookmark':
        event.preventDefault();
        state.saved.has(id) ? state.saved.delete(id) : state.saved.add(id);
        if ($('#modal')?.open) closeModal();
        persist(); renderFeed();
        restorePostFocus(id, 'post-menu');
        notify(state.saved.has(id) ? '已收藏到当前浏览器' : '已取消收藏');
        break;
      case 'toggle-comment':
        event.preventDefault();
        state.openComments.has(id) ? state.openComments.delete(id) : state.openComments.add(id);
        renderFeed();
        if (state.openComments.has(id)) $(`#comment-${id}`)?.focus({ preventScroll: true });
        else restorePostFocus(id, 'toggle-comment');
        break;
      case 'share-post': event.preventDefault(); if ($('#modal')?.open) closeModal(); await share(id); break;
      case 'share-profile': event.preventDefault(); await share(); break;
      case 'show-photo': event.preventDefault(); showPhoto(id, action.dataset.index); break;
      case 'previous-photo':
      case 'next-photo':
        event.preventDefault();
        if (state.photo) showPhoto(state.photo.postId, state.photo.index + (action.dataset.action === 'next-photo' ? 1 : -1));
        break;
      case 'play-video': event.preventDefault(); showVideo(id); break;
      case 'post-menu': {
        event.preventDefault();
        if (!posts.some((post) => post.id === id)) break;
        const isSaved = state.saved.has(id);
        openModal('微博操作', `<div class="post-menu"><button type="button" data-action="toggle-bookmark" data-id="${id}" aria-pressed="${isSaved}">${icon('bookmark')} ${isSaved ? '取消收藏' : '收藏微博'}</button><button type="button" data-action="share-post" data-id="${id}">${icon('repost')} 分享链接</button></div><p class="modal-note">收藏保存在当前浏览器；分享链接指向本页原创内容。</p>`);
        break;
      }
      case 'topics':
        event.preventDefault();
        openModal('相关话题', '<p class="modal-description">选择话题，查看本页相关原创与回顾内容。</p><div class="topic-buttons"><button type="button" data-topic="春小咩">#春小咩来报到#</button><button type="button" data-topic="舞台">#春晚舞台美学#</button><button type="button" data-topic="团圆">#一起才是年#</button><button type="button" data-topic="设计">#原创设计#</button><button type="button" data-topic="新年愿望">#我的新年愿望#</button></div>');
        break;
      case 'compose':
        event.preventDefault();
        if ($('#modal')?.open) closeModal();
        state.view = 'all'; state.filter = 'all';
        state.openComments.add('chunxiaomie-2027');
        setQuery('');
        $('#comment-chunxiaomie-2027')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        $('#comment-chunxiaomie-2027')?.focus({ preventScroll: true });
        break;
      case 'toggle-theme':
        event.preventDefault();
        state.dark = !state.dark;
        renderPreferences(); persist();
        break;
      case 'accessibility':
        event.preventDefault();
        state.largeType = !state.largeType;
        renderPreferences(); persist();
        notify(state.largeType ? '已开启大字模式' : '已恢复标准字号');
        break;
      case 'about':
        event.preventDefault();
        openModal('关于这个页面', '<p class="modal-description">这是参考春晚微博公开主页布局制作的独立创作展示页面，展示原创 2027 丁未羊年吉祥物「春小咩」与春晚舞台回顾创作。</p><p>封面、头像与资料统计是参考账号公开页面的快照；本站的微博内容与互动计数用于创作展示，没有接入微博实时接口。春小咩的回纹金角、云朵羊毛、迎春花印记与国风披肩为本次原创设定，舞台配图来自央视网。</p><p>仅春小咩介绍文章标注北京时间 2026 年 10 月 15 日 07:05，其他动态不显示日期。关注、点赞、收藏、评论，以及夜间和大字模式偏好只保存在当前浏览器。</p><p><a href="https://weibo.com/u/3506728370" target="_blank" rel="noopener noreferrer">查看春晚微博参考主页 ↗</a></p>');
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
  document.addEventListener('toggle', (event) => {
    const details = event.target;
    if (details.matches?.('.mascot-details[data-story-id]') && document.contains(details)) state.storyOpen.set(details.dataset.storyId, details.open);
  }, true);
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
  modal?.addEventListener('close', () => {
    if (!modal.open) { document.body.classList.remove('modal-open'); state.photo = null; }
  });
  modal?.addEventListener('cancel', () => { document.body.classList.remove('modal-open'); state.photo = null; });

  renderPreferences();
  renderFollow();
  renderFeed();
  const updated = $('#lastUpdated');
  if (updated) updated.textContent = '原创内容 · 互动仅保存在本机';
  if (location.hash.startsWith('#post-')) {
    setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'center' }), 50);
  }
})();
