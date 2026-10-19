/* =============================================
   VIAAN EYE CENTRE — Complete JavaScript
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     NAVBAR scroll + hamburger
  ───────────────────────────────────────── */
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    })
  );

  /* ─────────────────────────────────────────
     ANIMATED COUNTER (hero stats)
  ───────────────────────────────────────── */
  function animCounter(el, target) {
    let cur = 0;
    const step = target / 55;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { el.textContent = target.toLocaleString(); clearInterval(t); }
      else el.textContent = Math.floor(cur).toLocaleString();
    }, 22);
  }

  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) {
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        statsEl.querySelectorAll('.stat-num[data-target]').forEach(el =>
          animCounter(el, +el.dataset.target));
      }
    }, { threshold: .5 }).observe(statsEl);
  }

  /* ─────────────────────────────────────────
     SCROLL-IN ANIMATIONS
  ───────────────────────────────────────── */
  const cards = document.querySelectorAll(
    '.service-card, .feature-card, .test-card, .why-item, ' +
    '.doc-card, .eq-card, .ai, .f-col'
  );
  cards.forEach((el, i) => {
    el.style.cssText += `opacity:0;transform:translateY(26px);
      transition:opacity .5s ease ${(i % 4) * .08}s,
                 transform .5s ease ${(i % 4) * .08}s`;
  });

  const io = new IntersectionObserver(entries =>
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    }), { threshold: .1, rootMargin: '0px 0px -40px 0px' }
  );
  cards.forEach(el => io.observe(el));

  /* section headers */
  document.querySelectorAll('.sec-head').forEach(h => {
    h.style.cssText += 'opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease';
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { h.style.opacity='1'; h.style.transform='translateY(0)'; }
    }, { threshold:.2 }).observe(h);
  });

  /* ─────────────────────────────────────────
     FLOAT BUTTONS (WhatsApp + Call Now) + Back-to-top
  ───────────────────────────────────────── */
  const floatBtns = document.getElementById('float-btns');
  const backTop   = document.getElementById('back-top');

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 350;
    floatBtns?.classList.toggle('show', show);
    backTop?.classList.toggle('show', show);
  });

  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


  /* ─────────────────────────────────────────
     PARALLAX on hero
  ───────────────────────────────────────── */
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    if (heroBg && window.scrollY < window.innerHeight)
      heroBg.style.transform = `translateY(${window.scrollY * .28}px)`;
  });

  /* ─────────────────────────────────────────
     SERVICE CARD glow cursor
  ───────────────────────────────────────── */
  document.querySelectorAll('.service-card:not(.service-cta-card)').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.background = `radial-gradient(circle at ${e.clientX - r.left}px ${e.clientY - r.top}px,rgba(15,153,169,.07),#fff 70%)`;
    });
    card.addEventListener('mouseleave', () => { card.style.background = ''; });
  });

  /* ─────────────────────────────────────────
     FORMS – Appointment & Enquire
  ───────────────────────────────────────── */
  function handleForm(formId, okId, fields) {
    const form = document.getElementById(formId);
    const ok   = document.getElementById(okId);
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      fields.forEach(f => {
        const el = document.getElementById(f);
        if (el && !el.value.trim()) { shakeEl(el); valid = false; }
      });
      if (!valid) return;

      const btn = form.querySelector('button[type=submit]');
      const orig = btn.textContent;
      btn.textContent = 'Sending…'; btn.disabled = true; btn.style.opacity = '.7';

      setTimeout(() => {
        btn.textContent = orig; btn.disabled = false; btn.style.opacity = '1';
        ok.classList.add('show');
        form.reset();
        setTimeout(() => ok.classList.remove('show'), 7000);
      }, 1600);
    });
  }

  handleForm('appt-form',    'ap-ok',  ['ap-name','ap-phone']);
  handleForm('enquire-form', 'eq-ok',  ['eq-name','eq-phone']);

  function shakeEl(el) {
    el.style.borderColor = '#ef4444';
    el.animate([
      {transform:'translateX(0)'},{transform:'translateX(-7px)'},
      {transform:'translateX(7px)'},{transform:'translateX(-5px)'},
      {transform:'translateX(5px)'},{transform:'translateX(0)'}
    ], { duration: 380, easing: 'ease' });
    el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
  }

  /* ─────────────────────────────────────────
     CHATBOT
  ───────────────────────────────────────── */
  const chatbot   = document.getElementById('chatbot');
  const cbToggle  = document.getElementById('cb-toggle');
  const cbClose   = document.getElementById('cb-close');
  const cbBody    = document.getElementById('cb-body');
  const cbInput   = document.getElementById('cb-input');
  const cbSend    = document.getElementById('cb-send');
  const cbBadge   = document.getElementById('cb-badge');
  const cbQuick   = document.getElementById('cb-quick');

  // Chatbot responses knowledge base
  const responses = {
    hi:       "👋 Hi there! Welcome to Viaan Eye & Retina Centre. How can I assist you today?",
    hello:    "👋 Hello! Great to see you. What can I help you with regarding your eye health?",
    hey:      "👋 Hey! I'm here to help with any eye care queries. What would you like to know?",
    book:     "📅 To book an appointment, please scroll up to the <b>Book Appointment</b> section, or call us directly at <b>+91 9958065151</b>.\n\nWe're open:\n• Mon–Sat: 10AM–6:30PM\n• Sunday: 10AM–2PM",
    appointment: "📅 You can book a free consultation by scrolling to the <b>Book Appointment</b> section above, or call us at <b>+91 9958065151</b>. Our team will confirm your slot!",
    services: "🔬 We offer these specialties:\n\n• 👁️ LASIK / Spec Removal\n• 💎 Cataract Surgery\n• 🔬 Retina Treatment\n• 🛡️ Glaucoma\n• ✨ Cornea\n• ⚕️ Oculoplasty\n• 🏅 Ocular Prosthetic Clinic\n\nWhich service would you like to know more about?",
    lasik:    "👁️ <b>LASIK Surgery at Viaan Eye Centre</b>\n\nWe use advanced bladeless LASIK technology for safe, precise vision correction.\n\n✅ Quick 15-minute procedure\n✅ Painless with numbing drops\n✅ Results in 24–48 hours\n✅ Permanent correction\n\n<b>Cost range: ₹25,000–₹65,000 per eye</b> (depends on technology chosen).\n\nWant to book a free LASIK evaluation? 😊",
    cataract: "💎 <b>Cataract Surgery</b>\n\nWe perform modern phacoemulsification (no-stitch, no-injection) with premium IOLs.\n\n✅ Day-care procedure (no overnight stay)\n✅ Clear vision restored within days\n✅ Monofocal, bifocal & trifocal lens options\n\nCall +91 9958065151 to schedule an evaluation.",
    retina:   "🔬 <b>Retina Treatment</b>\n\nOur retina specialist Dr. Priya Sharma manages:\n• Diabetic Retinopathy\n• Macular Degeneration\n• Retinal Detachment\n• Vitreous Hemorrhage\n\nEarly treatment saves sight. Book now at +91 9958065151.",
    glaucoma: "🛡️ <b>Glaucoma Care</b>\n\nGlaucoma is the 'silent thief of sight.' We offer:\n• Advanced pressure monitoring\n• Laser treatments\n• Surgical options if needed\n\nRegular checkups are key. Book a glaucoma screening today!",
    doctors:  "👨‍⚕️ <b>Our Expert Doctors</b>\n\n• Dr. Rajesh Kumar – Chief Ophthalmologist & LASIK Specialist (18+ years)\n• Dr. Priya Sharma – Retina & Vitreous Expert (12+ years)\n• Dr. Anil Verma – Cornea & Cataract Surgeon (15+ years)\n\nScroll to <b>Know Your Doctor</b> section to learn more and book with your preferred doctor!",
    timings:  "⏰ <b>Clinic Timings</b>\n\n📅 Monday to Saturday: 10:00 AM – 6:30 PM\n📅 Sunday: 10:00 AM – 2:00 PM\n\nWalk-ins welcome! Appointments are preferred to minimise wait time.",
    location: "📍 <b>Our Location</b>\n\nPlot No 2227, Near Wazirabad Crossing,\nSector 57, Gurgaon, Haryana – 122001\n\n🚇 Easily reachable by Metro (Sector 55-56 station) and major roads.\n\nNeed directions? Google 'Viaan Eye Retina Centre Gurgaon' 🗺️",
    whatsapp: "💬 You can reach us directly on WhatsApp!\n\nClick the green WhatsApp button on the page, or message us at:\n📱 <b>+91 9958065151</b>\n\nWe reply within minutes during clinic hours! 😊",
    cost:     "💰 <b>Our Pricing</b>\n\n• LASIK: ₹25,000–₹65,000 per eye\n• Cataract: ₹15,000–₹60,000 per eye\n• Retina consultation: ₹500–₹800\n• General eye exam: ₹300–₹500\n\n*Prices vary based on technology & implant chosen. We offer EMI options!\n\nCall +91 9958065151 for exact pricing.",
    contact:  "📞 <b>Contact Us</b>\n\n📞 +91 9958065151\n📞 +91 9560697627\n✉️ viaaneyeretina@gmail.com\n📍 Plot 2227, Sector 57, Gurgaon\n\nWe're here Mon–Sat 10AM–6:30PM & Sun 10AM–2PM.",
    default:  "I'm not sure about that, but I'd love to help! 😊\n\nYou can:\n• 📞 Call us: <b>+91 9958065151</b>\n• 💬 WhatsApp us for quick replies\n• 📅 Book a free consultation\n\nOr ask me about our services, doctors, timings or costs!"
  };

  function getBotReply(msg) {
    const m = msg.toLowerCase().trim();
    if (/\bhi\b|^hi$/.test(m)) return responses.hi;
    if (/\bhello\b/.test(m)) return responses.hello;
    if (/\bhey\b/.test(m)) return responses.hey;
    if (/book|appoint/.test(m)) return responses.book;
    if (/service|treat|offer/.test(m)) return responses.services;
    if (/lasik|spec|glass|specta/.test(m)) return responses.lasik;
    if (/cataract/.test(m)) return responses.cataract;
    if (/retina|diabetes|macula/.test(m)) return responses.retina;
    if (/glauco/.test(m)) return responses.glaucoma;
    if (/doctor|dr\.|specialist|surgeon/.test(m)) return responses.doctors;
    if (/time|timing|hour|open|close|when/.test(m)) return responses.timings;
    if (/location|address|where|sector|gurgaon|map|direct/.test(m)) return responses.location;
    if (/whatsapp|watsapp|chat/.test(m)) return responses.whatsapp;
    if (/cost|price|fee|charge|rate|rupee|₹/.test(m)) return responses.cost;
    if (/contact|call|email|phone/.test(m)) return responses.contact;
    if (/cornea/.test(m)) return responses.cornea || "✨ Our cornea specialist Dr. Anil Verma handles all corneal conditions. Book at +91 9958065151.";
    if (/oculoplast|eyelid|orbit/.test(m)) return "⚕️ Oculoplasty handles eyelid, orbit & tear duct issues. Book a consultation at +91 9958065151.";
    if (/prosthetic|artificial eye/.test(m)) return "🏅 Our Ocular Prosthetic Clinic crafts custom prosthetic eyes. Call +91 9958065151 for details.";
    return responses.default;
  }

  function addMsg(text, who) {
    const wrap = document.createElement('div');
    wrap.className = `cb-msg ${who}`;
    const bubble = document.createElement('div');
    bubble.className = 'cb-bubble';
    bubble.innerHTML = text.replace(/\n/g, '<br>');
    wrap.appendChild(bubble);
    cbBody.appendChild(wrap);
    cbBody.scrollTop = cbBody.scrollHeight;
  }

  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'cb-msg bot'; wrap.id = 'typing';
    wrap.innerHTML = '<div class="cb-bubble cb-typing"><span></span><span></span><span></span></div>';
    cbBody.appendChild(wrap);
    cbBody.scrollTop = cbBody.scrollHeight;
  }

  function removeTyping() {
    document.getElementById('typing')?.remove();
  }

  function botReply(userMsg) {
    showTyping();
    const delay = 900 + Math.random() * 500;
    setTimeout(() => {
      removeTyping();
      addMsg(getBotReply(userMsg), 'bot');
    }, delay);
  }

  function sendMsg() {
    const msg = cbInput.value.trim();
    if (!msg) return;
    cbInput.value = '';
    cbQuick && (cbQuick.style.display = 'none');
    addMsg(msg, 'user');
    botReply(msg);
  }

  cbSend.addEventListener('click', sendMsg);
  cbInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });

  // Quick reply buttons
  cbQuick?.querySelectorAll('.qbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.q;
      const labels = {
        book: 'Book Appointment', services: 'What services do you offer?',
        doctors: 'Tell me about your doctors', timings: 'What are your timings?',
        location: 'Where are you located?', lasik: 'LASIK cost & details',
        whatsapp: 'WhatsApp contact'
      };
      cbQuick.style.display = 'none';
      addMsg(labels[q] || q, 'user');
      botReply(labels[q] || q);
    });
  });

  // Toggle chatbot
  cbToggle.addEventListener('click', () => {
    chatbot.classList.toggle('open');
    cbBadge.classList.add('hide');
  });
  cbClose.addEventListener('click', () => chatbot.classList.remove('open'));

  // Auto-open chatbot after 5s with welcome message
  setTimeout(() => {
    cbBadge.classList.remove('hide');
    cbBadge.textContent = '1';
  }, 5000);

  /* ─────────────────────────────────────────
     WHATSAPP AUTO-REPLY SIMULATION
     (simulates what happens when someone says "Hi" on WA)
  ───────────────────────────────────────── */
  // The WA link already sends "Hi" as the prefilled message
  // This section shows a tooltip/popup explaining the auto-reply
  const waBtn = document.getElementById('wa-float');
  if (waBtn) {
    // Show info tooltip on first hover
    let shown = false;
    waBtn.addEventListener('mouseenter', () => {
      if (shown) return; shown = true;
      const tip = document.createElement('div');
      tip.className = 'wa-tip';
      tip.innerHTML = '💬 Say <b>Hi</b> and we auto-reply instantly!';
      tip.style.cssText = `position:fixed;bottom:9rem;right:1.75rem;
        background:#fff;border:1px solid #e5e7eb;border-radius:12px;
        padding:.65rem 1.1rem;font-size:.82rem;color:#1a1a1a;
        box-shadow:0 8px 24px rgba(0,0,0,.12);z-index:70;
        animation:fadeUp .3s ease;white-space:nowrap;
        font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif;`;
      document.body.appendChild(tip);
      setTimeout(() => { tip.style.opacity='0'; tip.style.transition='opacity .4s'; setTimeout(()=>tip.remove(),400); }, 3500);
    });
  }

  /* ─────────────────────────────────────────
     SECTION HIGHLIGHT cursor glow
  ───────────────────────────────────────── */
  // Already handled by CSS :hover, but add subtle cursor glow on highlighted sections
  document.querySelectorAll('.section-highlight').forEach(sec => {
    sec.addEventListener('mousemove', e => {
      const r = sec.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
      const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
      sec.style.setProperty('--mx', x + '%');
      sec.style.setProperty('--my', y + '%');
    });
  });

  /* ─────────────────────────────────────────
     ACTIVE NAV LINK on scroll
  ───────────────────────────────────────── */
  const secs = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 90;
    secs.forEach(s => {
      const top = s.offsetTop, h = s.offsetHeight, id = s.id;
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) link.style.color = (y >= top && y < top + h) ? 'var(--primary)' : '';
    });
  });

});
