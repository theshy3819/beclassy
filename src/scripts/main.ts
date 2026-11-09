import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const reduce = root.classList.contains('rm');
const mm = gsap.matchMedia();
(window as unknown as { __bcReady: boolean }).__bcReady = true;

const $ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => scope.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => [...scope.querySelectorAll<T>(sel)];
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

/* ------------------------------------------------------------------ */
/* Smooth scroll (native scroll underneath — keyboard & a11y intact)   */
/* ------------------------------------------------------------------ */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ duration: 1.25, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

const samePage = (url: URL) => url.pathname.replace(/\/$/, '') === location.pathname.replace(/\/$/, '');

function scrollToHash(hash: string, immediate = false) {
  const target = hash === '#top' ? 0 : $(hash);
  if (target === null) return false;
  // `force` lets the jump run even while the menu has Lenis stopped.
  if (lenis) lenis.scrollTo(target as HTMLElement | number, { duration: immediate ? 0 : 1.6, immediate, force: true });
  else if (target === 0) window.scrollTo({ top: 0 });
  else (target as HTMLElement).scrollIntoView();
  return true;
}

document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
  if (!a || a.target === '_blank') return;
  const url = new URL(a.href, location.href);
  if (!url.hash || !samePage(url)) return;
  if (url.hash === '#') { e.preventDefault(); return; }
  e.preventDefault();
  const go = () => { if (scrollToHash(url.hash)) history.pushState(null, '', url.hash); };
  // Lenis keeps the page clipped while the menu is open, so scroll only once it has closed.
  if (menu && !menu.hidden) closeMenu(false, go);
  else go();
});

/* ------------------------------------------------------------------ */
/* Header: tone follows the section beneath it, hides on scroll down   */
/* ------------------------------------------------------------------ */
const header = $('[data-header]');
let lastY = window.scrollY;
let ticking = false;

function updateHeader() {
  ticking = false;
  if (!header) return;
  const y = window.scrollY;
  if (!root.classList.contains('menu-open')) {
    const probeY = header.offsetHeight / 2;
    const hit = document
      .elementsFromPoint(window.innerWidth / 2, probeY)
      .find((el) => !header.contains(el) && !el.closest('[data-loader]'));
    const theme = hit?.closest<HTMLElement>('[data-theme]')?.dataset.theme ?? 'light';
    header.dataset.tone = theme === 'dark' ? 'light' : 'dark';
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (goingDown && y > window.innerHeight * 0.9) header.classList.add('is-hidden');
    else if (goingUp || y < 80) header.classList.remove('is-hidden');
  }
  lastY = y;
}
window.addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(updateHeader); }
}, { passive: true });

/* ------------------------------------------------------------------ */
/* Full-screen menu                                                    */
/* ------------------------------------------------------------------ */
const menu = $('[data-menu]');
const menuBtn = $<HTMLButtonElement>('[data-menu-toggle]');
const menuLabel = $('[data-menu-label]');
let menuTl: gsap.core.Timeline | null = null;

function openMenu() {
  if (!menu || !menuBtn) return;
  menu.hidden = false;
  root.classList.add('menu-open');
  header?.classList.remove('is-hidden');
  if (header) header.dataset.tone = 'light';
  menuBtn.setAttribute('aria-expanded', 'true');
  if (menuLabel) menuLabel.textContent = menuBtn.dataset.labelClose ?? '';
  lenis?.stop();
  menuTl?.kill();
  menuTl = gsap.timeline();
  if (!reduce) {
    menuTl
      .fromTo($('.site-menu__bg', menu), { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: 'expo.inOut' })
      .fromTo($$('.site-menu__nav a', menu), { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05 }, 0.35)
      .fromTo($('.site-menu__info', menu), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.6);
  }
  $<HTMLAnchorElement>('[data-menu-link]', menu)?.focus({ preventScroll: true });
}

function closeMenu(returnFocus = true, after?: () => void) {
  if (!menu || !menuBtn || menu.hidden) return;
  menuBtn.setAttribute('aria-expanded', 'false');
  if (menuLabel) menuLabel.textContent = menuBtn.dataset.labelOpen ?? '';
  const done = () => {
    menu.hidden = true;
    root.classList.remove('menu-open');
    lenis?.start();
    updateHeader();
    if (returnFocus) menuBtn.focus({ preventScroll: true });
    after?.();
  };
  menuTl?.kill();
  if (reduce) return done();
  menuTl = gsap.timeline({ onComplete: done })
    .to($('.site-menu__info', menu), { opacity: 0, duration: 0.2 })
    .to($('.site-menu__bg', menu), { scaleY: 0, transformOrigin: 'bottom', duration: 0.6, ease: 'expo.inOut' }, 0)
    .to($$('.site-menu__nav a', menu), { yPercent: -110, duration: 0.4, ease: 'expo.in' }, 0)
    .set($('.site-menu__bg', menu), { transformOrigin: 'top' });
}

menuBtn?.addEventListener('click', () => (menu?.hidden ? openMenu() : closeMenu()));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 1100) closeMenu(false); });

/* ------------------------------------------------------------------ */
/* Videos: play only while visible; respect reduced motion             */
/* ------------------------------------------------------------------ */
const videos = $$<HTMLVideoElement>('video[data-autoplay]');
videos.forEach((v) => { v.muted = true; });
if (reduce) {
  videos.forEach((v) => { v.pause(); v.dataset.userPaused = '1'; });
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      const v = target as HTMLVideoElement;
      if (isIntersecting) {
        if (v.preload === 'none') v.preload = 'auto';
        if (!v.dataset.userPaused) v.play().catch(() => {});
      } else v.pause();
    });
  }, { rootMargin: '200px 0px' });
  videos.forEach((v) => io.observe(v));
}

const toggle = $<HTMLButtonElement>('[data-video-toggle]');
const heroVideo = $<HTMLVideoElement>('.hero__video');
function syncToggle() {
  if (!toggle || !heroVideo) return;
  const paused = !!heroVideo.dataset.userPaused;
  toggle.setAttribute('aria-pressed', String(paused));
  const label = $('.sr-only', toggle);
  if (label) label.textContent = (paused ? toggle.dataset.labelPlay : toggle.dataset.labelPause) ?? '';
}
toggle?.addEventListener('click', () => {
  if (!heroVideo) return;
  if (heroVideo.dataset.userPaused) { delete heroVideo.dataset.userPaused; heroVideo.play().catch(() => {}); }
  else { heroVideo.dataset.userPaused = '1'; heroVideo.pause(); }
  syncToggle();
});
syncToggle();

/* ------------------------------------------------------------------ */
/* Text & image reveals                                                */
/* ------------------------------------------------------------------ */
function initReveals() {
  $$('[data-split]').forEach((el) => {
    if (reduce) { el.style.visibility = 'visible'; return; }
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { visibility: 'visible' });
        return gsap.from(self.lines, {
          yPercent: 105, duration: 1.25, ease: 'expo.out', stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      },
    });
  });

  $$('[data-words]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words' });
    if (reduce) return;
    gsap.fromTo(split.words, { opacity: 0.12 }, {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 42%', scrub: true },
    });
  });

  if (reduce) return;

  // fromTo renders the hidden state inline first; the `is-in` class then lifts the CSS
  // pre-state so clearing the inline styles at the end leaves the element visible.
  const markIn = (els: Element[]) => els.forEach((el) => el.classList.add('is-in'));

  ScrollTrigger.batch('[data-reveal]:not([data-reveal="img"])', {
    start: 'top 90%',
    once: true,
    onEnter: (els) => {
      gsap.fromTo(els, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, clearProps: 'opacity,transform' });
      markIn(els);
    },
  });

  ScrollTrigger.batch('[data-reveal="img"]', {
    start: 'top 92%',
    once: true,
    onEnter: (els) => {
      gsap.fromTo(els, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', stagger: 0.12, clearProps: 'clipPath' });
      markIn(els);
      els.forEach((el) => {
        const media = $('img, video', el);
        if (media) gsap.fromTo(media, { scale: 1.22 }, { scale: 1, duration: 1.9, ease: 'expo.out', clearProps: 'transform' });
      });
    },
  });

  $$('[data-parallax]').forEach((el) => {
    gsap.to(el, {
      yPercent: parseFloat(el.dataset.parallax ?? '0'), ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  const showcase = $('[data-showcase]');
  if (showcase) {
    gsap.fromTo($('[data-parallax-img]', showcase), { yPercent: -7 }, {
      yPercent: 7, ease: 'none',
      scrollTrigger: { trigger: showcase, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  const mark = $('[data-footer-mark] .logo');
  if (mark) {
    gsap.from(mark, {
      yPercent: 55, ease: 'none',
      scrollTrigger: { trigger: '[data-footer-mark]', start: 'top bottom', end: 'bottom bottom', scrub: true },
    });
  }
}

/* ------------------------------------------------------------------ */
/* Hero: full-bleed arrival film collapses into an editorial window    */
/* ------------------------------------------------------------------ */
function heroIntro() {
  if (reduce || !$('[data-hero]')) return;
  gsap.fromTo('[data-hero-in]', { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.4, ease: 'expo.out', stagger: 0.09 });
  gsap.fromTo('[data-hero-meta]', { opacity: 0 }, { opacity: 1, duration: 1.2, delay: 0.6 });
  gsap.fromTo('[data-hero-media]', { scale: 1.08 }, { scale: 1, duration: 2.4, ease: 'expo.out' });
}

function initHero() {
  const hero = $('[data-hero]');
  if (!hero || reduce) return;
  const media = $('[data-hero-media]', hero);
  const video = $('.hero__video', hero);
  mm.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)' }, (ctx) => {
    const { desktop } = ctx.conditions as { desktop: boolean };
    gsap.timeline({
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
    })
      .to('[data-hero-intro]', { yPercent: -14, autoAlpha: 0, duration: 0.3, ease: 'none' }, 0)
      .to('[data-hero-meta]', { autoAlpha: 0, duration: 0.18, ease: 'none' }, 0)
      .to(media, { clipPath: desktop ? 'inset(14% 56% 12% 6%)' : 'inset(12% 6% 46% 6%)', duration: 0.7, ease: 'power2.inOut' }, 0.08)
      .to(video, { scale: 1.12, duration: 0.7, ease: 'none' }, 0.08)
      .to('[data-hero-shade]', { opacity: 0, duration: 0.4, ease: 'none' }, 0.1)
      .fromTo('[data-hero-editorial]', { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.55)
      .to({}, { duration: 0.18 });
  });
}

/* ------------------------------------------------------------------ */
/* Architecture: the monolith opens from a window to full bleed        */
/* ------------------------------------------------------------------ */
function initArchitecture() {
  const wrap = $('[data-arch-reveal]');
  if (!wrap || reduce) return;
  const frame = $('[data-arch-frame]', wrap);
  const img = $('img', wrap);
  gsap.timeline({ scrollTrigger: { trigger: wrap, start: 'top 65%', end: 'bottom bottom', scrub: 0.6 } })
    .to(frame, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' }, 0)
    .to(img, { scale: 1, ease: 'power1.out' }, 0);
}

/* ------------------------------------------------------------------ */
/* Floors: a drum that turns one floor per scroll step                 */
/* ------------------------------------------------------------------ */
function initFloors() {
  const sec = $('[data-floors]');
  if (!sec || reduce) return;
  const rows = $$('[data-floor-row]', sec);
  const imgs = $$('[data-floor-img]', sec);
  const descs = $$('[data-floor-desc]', sec);
  const counter = $('[data-floor-current]', sec);
  const n = rows.length;
  const angle = 24 * (Math.PI / 180);
  let radius = 0;

  const measure = () => {
    // Neighbouring floors sit just outside the photo window so the active one reads cleanly.
    const rowH = window.innerWidth < 768 ? window.innerHeight * 0.2 : Math.min(window.innerHeight * 0.25, 240);
    radius = rowH / Math.sin(angle);
  };

  const render = (p: number) => {
    rows.forEach((row, i) => {
      const o = i - p;
      const a = Math.abs(o);
      const th = o * angle;
      const visible = a < 2.6;
      gsap.set(row, {
        y: radius * Math.sin(th),
        z: radius * (Math.cos(th) - 1),
        rotationX: -o * 24,
        yPercent: -50,
        opacity: visible ? clamp(1 - a * 0.64, 0.08, 1) : 0,
        visibility: visible ? 'visible' : 'hidden',
      });
    });
    imgs.forEach((img, i) => {
      const a = Math.abs(i - p);
      gsap.set(img, { opacity: clamp(1 - a * 1.6, 0, 1), scale: 1 + Math.min(a, 1) * 0.08 });
    });
    descs.forEach((d, i) => {
      const o = i - p;
      gsap.set(d, { opacity: clamp(1 - Math.abs(o) * 2.4, 0, 1), y: o * 26 });
    });
    if (counter) counter.textContent = String(Math.min(n, Math.round(p) + 1)).padStart(2, '0');
  };

  // Hold on each floor, turn in the middle of each step — no scroll snapping needed.
  const stepped = (r: number) => {
    const base = Math.floor(r);
    const f = r - base;
    return Math.min(n - 1, base + smooth(clamp((f - 0.3) / 0.4, 0, 1)));
  };

  const state = { p: 0 };
  measure();
  render(0);
  ScrollTrigger.create({
    trigger: sec,
    start: 'top top',
    end: 'bottom bottom',
    onRefresh: () => { measure(); render(state.p); },
    onUpdate: (self) => {
      gsap.to(state, {
        p: stepped(self.progress * (n - 1)), duration: 0.6, ease: 'power3.out', overwrite: true,
        onUpdate: () => render(state.p),
      });
    },
  });
}

/* ------------------------------------------------------------------ */
/* Media art: the image shows through the letters, then fills          */
/* ------------------------------------------------------------------ */
function initMedia() {
  const sec = $('[data-media]');
  if (!sec || reduce) return;
  const pin = $('.media__pin', sec);
  const svg = $<SVGSVGElement>('[data-media-mask]', sec);
  const word = $<SVGGElement>('[data-media-word]', sec);
  const text = $<SVGTextElement>('text', sec);
  const l1 = $<SVGTSpanElement>('[data-media-l1]', sec);
  const l2 = $<SVGTSpanElement>('[data-media-l2]', sec);
  const cover = $('[data-media-cover]', sec);
  const caption = $('[data-media-caption]', sec);
  const img = $('[data-media-image] img', sec);
  if (!pin || !svg || !word || !text || !l1 || !l2) return;

  const layout = () => {
    const w = svg.clientWidth;
    const h = svg.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    const portrait = w / h < 0.9;
    l1.textContent = portrait ? 'MEDIA' : 'MEDIA ART';
    l2.textContent = portrait ? 'ART' : '';
    let fs = portrait ? w * 0.4 : Math.min(w * 0.2, h * 0.5);
    text.setAttribute('font-size', String(fs));
    l1.setAttribute('x', String(w / 2));
    l2.setAttribute('x', String(w / 2));
    // Fit the widest line to ~84% of the width, then centre vertically on cap height.
    const widest = Math.max(l1.getComputedTextLength(), l2.getComputedTextLength() || 0);
    if (widest > 0) fs *= (w * 0.84) / widest;
    if (portrait) fs = Math.min(fs, h * 0.3);
    text.setAttribute('font-size', String(fs));
    const cap = fs * 0.43; // half of Antonio's cap height
    const lead = fs * 0.92;
    const first = portrait ? h / 2 - lead / 2 + cap : h / 2 + cap;
    l1.setAttribute('y', String(first));
    l2.setAttribute('y', String(first + lead));
    // Scale from the middle of the "I" stem — a solid bar that grows to cover the screen.
    // (Set as a plain transform attribute: GSAP's svgOrigin is unreliable inside <mask>.)
    origin = { x: w / 2, y: h / 2 };
    try {
      const ext = text.getExtentOfChar(3);
      origin = { x: ext.x + ext.width / 2, y: first - cap };
    } catch { /* keep centre */ }
    applyScale();
  };

  let origin = { x: 0, y: 0 };
  const zoom = { s: 1 };
  const applyScale = () => {
    const { x, y } = origin;
    word.setAttribute('transform', `translate(${x} ${y}) scale(${zoom.s}) translate(${-x} ${-y})`);
  };

  layout();
  gsap.timeline({
    scrollTrigger: {
      trigger: pin, start: 'top top', end: '+=170%', pin: true, scrub: 0.8,
      invalidateOnRefresh: true, onRefreshInit: layout,
    },
  })
    .fromTo(zoom, { s: 1 }, { s: 40, ease: 'power3.in', duration: 1, onUpdate: applyScale }, 0)
    .fromTo(img, { scale: 1.3 }, { scale: 1, ease: 'power1.out', duration: 1 }, 0)
    .to(cover, { opacity: 0, ease: 'none', duration: 0.2 }, 0.78)
    .fromTo(caption, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.9)
    .to({}, { duration: 0.25 });
}

/* ------------------------------------------------------------------ */
/* Bakery rail: horizontal on desktop, native swipe on mobile          */
/* ------------------------------------------------------------------ */
function initRail() {
  const rail = $('[data-rail]');
  const track = $('[data-rail-track]');
  if (!rail || !track || reduce) return;
  mm.add('(min-width: 768px)', () => {
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
    gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: rail, start: 'center center', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
    });
  });
}

/* ------------------------------------------------------------------ */
/* Coffee: choosing a blend tints the section                          */
/* ------------------------------------------------------------------ */
function initCoffee() {
  const sec = $('[data-coffee]');
  if (!sec) return;
  const buttons = $$<HTMLButtonElement>('[data-blend]', sec);
  buttons.forEach((btn) => {
    const activate = () => {
      sec.style.setProperty('--blend', btn.dataset.blend ?? '#0d0d0e');
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    };
    btn.addEventListener('click', activate);
    btn.addEventListener('mouseenter', activate);
    btn.addEventListener('focus', activate);
  });
}

/* ------------------------------------------------------------------ */
/* Intro loader (once per session)                                     */
/* ------------------------------------------------------------------ */
function runLoader(onLift: () => void) {
  const loader = $('[data-loader]');
  if (!loader || reduce || root.classList.contains('seen')) {
    loader?.remove();
    onLift();
    return;
  }
  try { sessionStorage.setItem('bc-intro', '1'); } catch { /* private mode */ }
  lenis?.stop();
  window.scrollTo(0, 0);
  gsap.timeline({ onComplete: () => { loader.remove(); lenis?.start(); updateHeader(); } })
    .fromTo('[data-loader-tag]', { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: 'expo.out' })
    .fromTo('[data-loader-word]', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'expo.inOut' }, 0.1)
    .fromTo('[data-loader-line]', { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'expo.inOut' }, 0.2)
    .to(loader, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '+=0.2')
    .add(onLift, '-=0.55');
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */
initReveals();
initHero();
initArchitecture();
initFloors();
initMedia();
initRail();
initCoffee();
runLoader(heroIntro);
updateHeader();

document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
  if (location.hash) requestAnimationFrame(() => scrollToHash(location.hash, true));
});
