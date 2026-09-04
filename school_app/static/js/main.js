/* ============================================================
   JUNIOR CAMBRIDGE SECONDARY SCHOOL — Site Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      icon.className = navLinks.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });
  }

  /* ---------- Search panel ---------- */
  const searchToggle = document.getElementById('searchToggle');
  const searchPanel = document.getElementById('searchPanel');
  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', () => searchPanel.classList.toggle('open'));
  }

  /* ---------- Dark / light mode ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('jc-theme') || 'light';
  root.setAttribute('data-theme', savedTheme);
  updateThemeIcon();
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('jc-theme', next);
      updateThemeIcon();
    });
  }
  function updateThemeIcon() {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    icon.className = root.getAttribute('data-theme') === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }

  /* ---------- Language toggle (EN / NP labels demo) ---------- */
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const isNP = langToggle.dataset.lang === 'np';
      langToggle.dataset.lang = isNP ? 'en' : 'np';
      langToggle.textContent = isNP ? 'EN' : 'नेपाली';
      document.querySelectorAll('[data-en][data-np]').forEach(el => {
        el.textContent = isNP ? el.dataset.en : el.dataset.np;
      });
    });
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    revealObserver.observe(el);
  });

  /* ---------- Testimonial slider ---------- */
  const slides = document.querySelectorAll('.testi-slide');
  const dotsWrap = document.getElementById('testiDots');
  let testiIndex = 0;
  if (slides.length && dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showSlide(i));
      dotsWrap.appendChild(dot);
    });
    function showSlide(i) {
      slides[testiIndex].classList.remove('active');
      dotsWrap.children[testiIndex].classList.remove('active');
      testiIndex = i;
      slides[testiIndex].classList.add('active');
      dotsWrap.children[testiIndex].classList.add('active');
    }
    setInterval(() => showSlide((testiIndex + 1) % slides.length), 5000);
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---------- Tabs ---------- */
  document.querySelectorAll('.tab-buttons').forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const panels = document.querySelectorAll(`[data-tab-panel-group="${group.dataset.tabGroup}"]`);
        panels.forEach(p => p.classList.toggle('active', p.dataset.tabPanel === btn.dataset.tab));
      });
    });
  });

  /* ---------- WhatsApp + Chat widget ---------- */
  const chatFab = document.getElementById('chatFab');
  const chatWindow = document.getElementById('chatWindow');
  const chatClose = document.getElementById('chatClose');
  if (chatFab && chatWindow) {
    chatFab.addEventListener('click', () => chatWindow.classList.toggle('open'));
  }
  if (chatClose) chatClose.addEventListener('click', () => chatWindow.classList.remove('open'));
  const chatForm = document.getElementById('chatForm');
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = chatForm.querySelector('input');
      if (!input.value.trim()) return;
      const body = document.getElementById('chatBody');
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble';
      bubble.style.background = 'var(--navy)';
      bubble.style.color = '#fff';
      bubble.style.marginLeft = '30%';
      bubble.textContent = input.value;
      body.appendChild(bubble);
      input.value = '';
      body.scrollTop = body.scrollHeight;
      setTimeout(() => {
        const reply = document.createElement('div');
        reply.className = 'chat-bubble';
        reply.textContent = "Thanks for reaching out! Our front office will reply shortly. For urgent matters, call +977-81-000000.";
        body.appendChild(reply);
        body.scrollTop = body.scrollHeight;
      }, 700);
    });
  }

  /* ---------- Newsletter form ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('newsletterMsg');
      msg.textContent = "Thank you! Please check your inbox to confirm your subscription.";
      msg.style.display = 'block';
      newsletterForm.reset();
    });
  }

  /* ---------- Contact / admission form demo submit ---------- */
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = form.querySelector('.form-success');
      if (msg) {
        msg.style.display = 'block';
        msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  });

  /* ---------- Login role switch ---------- */
  document.querySelectorAll('.role-switch').forEach(switcher => {
    switcher.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        switcher.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const label = document.getElementById('loginRoleLabel');
        if (label) label.textContent = btn.textContent;
      });
    });
  });

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    document.querySelectorAll('[data-lightbox-src]').forEach(item => {
      item.addEventListener('click', () => {
        lightbox.querySelector('img').src = item.dataset.lightboxSrc;
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
  }

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10 ? '0 6px 20px rgba(0,0,0,0.2)' : 'none';
    });
  }

});



// Register js

      // Live password strength meter
      const pwd = document.getElementById("regPassword");
      const fill = document.getElementById("strengthFill");
      const label = document.getElementById("strengthLabel");
      const reqLen = document.getElementById("reqLen");
      const reqUpper = document.getElementById("reqUpper");
      const reqNum = document.getElementById("reqNum");

      pwd?.addEventListener("input", () => {
        const v = pwd.value;
        const hasLen = v.length >= 8;
        const hasUpper = /[A-Z]/.test(v);
        const hasNum = /[0-9]/.test(v);
        reqLen.classList.toggle("met", hasLen);
        reqUpper.classList.toggle("met", hasUpper);
        reqNum.classList.toggle("met", hasNum);

        const score = [hasLen, hasUpper, hasNum].filter(Boolean).length;
        const pct = [0, 33, 66, 100][score];
        const colors = ["#e2e2e2", "#C8102E", "#C9A24B", "#1a7a3c"];
        const labels = ["Password strength", "Weak", "Fair", "Strong"];
        fill.style.width = pct + "%";
        fill.style.background = colors[score];
        label.textContent = labels[score];
      });

      // Live confirm-password match check
      const confirm = document.getElementById("regConfirm");
      const matchMsg = document.getElementById("matchMsg");
      confirm?.addEventListener("input", () => {
        if (!confirm.value) {
          matchMsg.style.display = "none";
          return;
        }
        matchMsg.style.display = "block";
        if (confirm.value === pwd.value) {
          matchMsg.textContent = "✓ Passwords match";
          matchMsg.style.color = "#1a7a3c";
        } else {
          matchMsg.textContent = "✗ Passwords do not match";
          matchMsg.style.color = "var(--crimson)";
        }
      });
  


      // news 
      document.querySelectorAll("#filterRow .filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll("#filterRow .filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      document.querySelectorAll("#newsList .news-list-item").forEach((item) => {
        item.classList.toggle("hidden", f !== "all" && item.dataset.cat !== f);
      });
    });
  });
  document
    .getElementById("loadMoreBtn")
    ?.addEventListener("click", function () {
      this.textContent = "All notices loaded";
      this.disabled = true;
      this.style.opacity = "0.6";
    });

    // Gallery filter
      document.querySelectorAll("#filterRow .filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document
            .querySelectorAll("#filterRow .filter-btn")
            .forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const f = btn.dataset.filter;
          document.querySelectorAll("#masonryGrid .m-item").forEach((item) => {
            item.classList.toggle(
              "hidden",
              f !== "all" && item.dataset.cat !== f,
            );
          });
        });
      });
      document
        .getElementById("loadMoreBtn")
        ?.addEventListener("click", function () {
          this.textContent = "All photos loaded";
          this.disabled = true;
          this.style.opacity = "0.6";
        });


        // news
         document.querySelectorAll("#filterRow .filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document
            .querySelectorAll("#filterRow .filter-btn")
            .forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const f = btn.dataset.filter;
          document
            .querySelectorAll("#newsList .news-list-item")
            .forEach((item) => {
              item.classList.toggle(
                "hidden",
                f !== "all" && item.dataset.cat !== f,
              );
            });
        });
      });
      document
        .getElementById("loadMoreBtn")
        ?.addEventListener("click", function () {
          this.textContent = "All notices loaded";
          this.disabled = true;
          this.style.opacity = "0.6";
        });