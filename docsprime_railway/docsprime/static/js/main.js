/* ============================================================
   main.js — Docsprime
   Funcionalidades:
   1. Navbar scroll (fundo ao rolar)
   2. Menu hambúrguer mobile
   3. Scroll Reveal (animações de entrada)
   4. Contadores animados (seção Números)
   5. Envio do formulário via AJAX
============================================================ */

"use strict";

/* ============================================================
   1. NAVBAR — adiciona classe "scrolled" ao rolar a página
============================================================ */
(function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // executa uma vez no carregamento
})();


/* ============================================================
   2. MENU HAMBÚRGUER mobile
============================================================ */
(function initHamburger() {
  const hamburger  = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (!hamburger || !mobileMenu) return;

  // Abre / fecha o menu
  hamburger.addEventListener("click", function () {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Fecha ao clicar em um link
  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
    });
  });
})();


/* ============================================================
   3. SCROLL REVEAL — anima elementos com classe "reveal"
      quando eles entram na viewport
============================================================ */
(function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Para de observar depois de animar (performance)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12, // visível quando 12% do elemento aparece
      rootMargin: "0px 0px -40px 0px",
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ============================================================
   4. CONTADORES ANIMADOS — seção "Números"
      Lê o atributo data-target e anima de 0 até o valor
============================================================ */
(function initCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]");
  if (!counters.length) return;

  /**
   * Anima um contador de 0 até "target" em ~1.8 segundos.
   * @param {HTMLElement} el  - elemento do DOM
   * @param {number} target   - valor final
   * @param {string} suffix   - sufixo (ex.: "+", "%", "M+")
   */
  function animateCounter(el, target, suffix) {
    const duration = 1800;       // ms
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: ease-out cúbico
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);

      el.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Dispara o contador quando o elemento fica visível
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || "";
          animateCounter(el, target, suffix);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ============================================================
   5. FORMULÁRIO DE CONTATO — envio via fetch (AJAX)
============================================================ */
(function initContactForm() {
  const form       = document.getElementById("contatoForm");
  const feedback   = document.getElementById("formFeedback");
  const submitBtn  = document.getElementById("submitBtn");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // impede recarregamento da página

    // Coleta os dados do formulário
    const payload = {
      nome:      document.getElementById("nome").value.trim(),
      email:     document.getElementById("email").value.trim(),
      empresa:   document.getElementById("empresa").value.trim(),
      mensagem:  document.getElementById("mensagem").value.trim(),
    };

    // Feedback visual: desabilita botão durante o envio
    submitBtn.disabled    = true;
    submitBtn.textContent = "Enviando…";

    // Limpa feedback anterior
    feedback.className    = "form-feedback";
    feedback.textContent  = "";

    try {
      const res  = await fetch("/contato", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.ok) {
        // Sucesso
        feedback.textContent = "✅ " + data.mensagem;
        feedback.classList.add("success");
        form.reset();
      } else {
        // Erro retornado pelo servidor
        feedback.textContent = "⚠️ " + (data.erro || "Erro ao enviar. Tente novamente.");
        feedback.classList.add("error");
      }

    } catch (err) {
      // Erro de rede / inesperado
      feedback.textContent = "❌ Falha na conexão. Verifique sua internet e tente novamente.";
      feedback.classList.add("error");
      console.error("Erro ao enviar formulário:", err);
    }

    // Reabilita o botão
    submitBtn.disabled    = false;
    submitBtn.textContent = "Enviar mensagem";
  });
})();
