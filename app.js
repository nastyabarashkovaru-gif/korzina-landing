// Ссылка на оплату (Tribute). Если пусто, кнопки ведут к блоку с ценой.
var PAY_URL = "https://web.tribute.tg/p/GVt";

if (PAY_URL) {
  document.querySelectorAll("[data-cta]").forEach(function (a) {
    a.setAttribute("href", PAY_URL);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });
}

document.querySelectorAll("[data-carousel]").forEach(function (root) {
  var track = root.querySelector(".track");
  var slides = [].slice.call(track.children);
  var count = root.querySelector("[data-count]");
  function step() { return slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : 1; }
  function idx() { return Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / step()))); }
  function go(i) {
    i = (i + slides.length) % slides.length;
    track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft, behavior: "smooth" });
  }
  track.addEventListener("scroll", function () { count.textContent = (idx() + 1) + " / " + slides.length; }, { passive: true });
  root.querySelector("[data-prev]").addEventListener("click", function () { go(idx() - 1); });
  root.querySelector("[data-next]").addEventListener("click", function () { go(idx() + 1); });
});
