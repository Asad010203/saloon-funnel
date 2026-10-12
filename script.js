// =============================================================
// CROGE — Interactions
// =============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- FAQ accordion ----------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
  // Open first FAQ by default
  if (faqItems[0]) faqItems[0].classList.add('open');

  // ---------- Mobile sticky CTA (show after hero) ----------
  const mobileCta = document.querySelector('.mobile-cta');
  const hero = document.querySelector('.hero, .work-hero');
  if (mobileCta && hero) {
    document.body.classList.add('has-mobile-cta');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          mobileCta.classList.add('visible');
        } else {
          mobileCta.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });
    observer.observe(hero);
  }

  // ---------- Pricing reveal toggle ----------
  const pricingReveal = document.querySelector('#pricing-reveal');
  const pricingTriggers = document.querySelectorAll('[data-toggle-pricing]');
  const pricingBtn = document.querySelector('.pricing-trigger');

  if (pricingReveal) {
    pricingTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = pricingReveal.classList.toggle('open');
        if (pricingBtn) pricingBtn.classList.toggle('open', isOpen);
        if (isOpen) {
          setTimeout(() => {
            pricingReveal.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        }
      });
    });
  }

  // ---------- Dark-variant FAQ accordion (inside pricing reveal) ----------
  const darkFaqs = document.querySelectorAll('.faq-item-dark');
  darkFaqs.forEach(item => {
    const q = item.querySelector('.faq-q-dark');
    if (!q) return;
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      darkFaqs.forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- ROI Calculator ----------
  const calc = document.querySelector('#roi-calc');
  if (calc) {
    const calls = calc.querySelector('#calls');
    const callsOut = calc.querySelector('#calls-out');
    const ticket = calc.querySelector('#ticket');
    const answer = calc.querySelector('#answer');
    const answerOut = calc.querySelector('#answer-out');
    const dormant = calc.querySelector('#dormant');
    const lossOut = calc.querySelector('#loss-out');
    const bookingsOut = calc.querySelector('#bookings-out');

    const update = () => {
      const c = parseFloat(calls.value) || 0;
      const t = parseFloat(ticket.value) || 0;
      const a = parseFloat(answer.value) || 0;
      const d = parseFloat(dormant.value) || 0;

      const unansweredWeekly = c * (1 - a / 100);
      const bookingRate = 0.6; // 60% of answered calls would book
      const monthlyLoss = unansweredWeekly * 4 * bookingRate * t;
      const reactivationLift = d * 0.08 * t; // 8% rebook rate on dormant
      const totalLoss = Math.round(monthlyLoss + reactivationLift);

      callsOut.textContent = c;
      answerOut.textContent = a + '%';
      lossOut.textContent = '$' + totalLoss.toLocaleString();
      const payback = totalLoss > 0 ? Math.ceil(1097 / t) : 0;
      bookingsOut.textContent = payback;
    };

    [calls, ticket, answer, dormant].forEach(input => {
      if (input) input.addEventListener('input', update);
    });
    update();
  }

  // ---------- Reveal on scroll (subtle) ----------
  const reveal = document.querySelectorAll('.reveal');
  if (reveal.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveal.forEach(el => io.observe(el));
  }
});
