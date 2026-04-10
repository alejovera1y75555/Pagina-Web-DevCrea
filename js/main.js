/* ================================
   DevCrea — JavaScript principal
   main.js
   ================================ */

// ================================
// Animación de entrada del logo
// (JS + SVG transform nativo — cross-browser fiable)
// ================================
(function initLogoAnimation() {
  var easeOut = function(t) { return 1 - Math.pow(1 - t, 3); };

  function fadeSlide(selector, fromX, delay) {
    var el = document.querySelector(selector);
    if (!el) return;
    el.style.opacity = '0';
    el.setAttribute('transform', 'translate(' + fromX + ',0)');
    setTimeout(function() {
      var start = performance.now();
      function frame(now) {
        var raw = Math.min((now - start) / 650, 1);
        var t   = easeOut(raw);
        el.style.opacity = t;
        el.setAttribute('transform', 'translate(' + (fromX * (1 - t)) + ',0)');
        if (raw < 1) { requestAnimationFrame(frame); }
        else { el.style.opacity = '1'; el.setAttribute('transform', 'translate(0,0)'); }
      }
      requestAnimationFrame(frame);
    }, delay);
  }

  function fadeIn(selector, delay, finalOpacity) {
    var op = finalOpacity !== undefined ? finalOpacity : 1;
    var el = document.querySelector(selector);
    if (!el) return;
    el.style.opacity = '0';
    setTimeout(function() {
      var start = performance.now();
      function frame(now) {
        var raw = Math.min((now - start) / 600, 1);
        var t   = easeOut(raw);
        el.style.opacity = t * op;
        if (raw < 1) { requestAnimationFrame(frame); }
        else { el.style.opacity = op; }
      }
      requestAnimationFrame(frame);
    }, delay);
  }

  function run() {
    // Nav logo
    fadeSlide('.nav-logo-dev',   -22,   0);
    fadeSlide('.nav-logo-crea',   22,  120);
    fadeIn('.nav-logo-line',          200, 0.6);
    fadeIn('.nav-logo-dot',           320, 0.7);
    // Hero logo
    fadeSlide('.hero-logo-dev',  -22,  150);
    fadeSlide('.hero-logo-crea',  22,  270);
    fadeIn('.hero-logo-line',         370, 0.65);
    fadeIn('.hero-logo-dot',          480, 0.7);
  }

  run();
  // Volver a animar si el navegador restaura la página desde caché
  window.addEventListener('pageshow', function(e) { if (e.persisted) run(); });
})();

// Animaciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.service-card, .portfolio-card, .code-block, .contact-wrap').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.55s ${i * 0.07}s ease, transform 0.55s ${i * 0.07}s ease`;
  observer.observe(el);
});

// Menú hamburguesa
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Cerrar menú al tocar un enlace
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Formulario de contacto
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '✅ ¡Mensaje enviado!';
  btn.style.background = '#22d3a5';
  btn.style.color = '#060910';
  setTimeout(() => {
    btn.textContent = 'Enviar mensaje →';
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 3000);
}
