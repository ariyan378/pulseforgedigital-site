// PulseForgeDigital — main.js
// Progressive enhancement only. The site is fully usable without this file:
// - WhatsApp links are static, pre-encoded hrefs in the HTML.
// - FAQ uses native <details>/<summary>, no JS required.
// - Navigation links are plain anchors.
// This script only powers the mobile menu toggle and the contact-form
// WhatsApp handoff (see contact.html).

document.addEventListener('DOMContentLoaded', function () {
  var menuToggle = document.getElementById('menuToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 940) {
        primaryNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- Contact form -> WhatsApp handoff ----
  // The static form has no backend. On submit, we build a prefilled
  // WhatsApp message from the visitor's inputs and open WhatsApp with it,
  // rather than pretending the form was emailed anywhere.
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('cf-name') || {}).value || '';
      var service = (document.getElementById('cf-service') || {}).value || '';
      var message = (document.getElementById('cf-message') || {}).value || '';

      var text = "Hello, my name is " + name + ".";
      if (service) { text += " I'm interested in " + service + "."; }
      if (message) { text += " " + message; }

      var url = "https://wa.me/8801618189994?text=" + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener');
    });
  }
});
