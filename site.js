(function () {
  var toggle = document.querySelector("[data-menu]");
  var nav = document.querySelector("[data-nav]");
  var drop = document.querySelector("[data-drop]");
  var dropBtn = document.querySelector("[data-drop-btn]");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  if (drop && dropBtn) {
    var closeTimer = 0;
    var hoverQuery = window.matchMedia("(hover: hover) and (min-width: 801px)");

    function openDrop() {
      window.clearTimeout(closeTimer);
      drop.classList.add("is-open");
      dropBtn.setAttribute("aria-expanded", "true");
    }

    function closeDrop() {
      window.clearTimeout(closeTimer);
      drop.classList.remove("is-open");
      dropBtn.setAttribute("aria-expanded", "false");
    }

    dropBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      if (drop.classList.contains("is-open")) closeDrop();
      else openDrop();
    });

    drop.addEventListener("mouseenter", function () {
      if (hoverQuery.matches) openDrop();
    });
    drop.addEventListener("mouseleave", function () {
      if (!hoverQuery.matches) return;
      closeTimer = window.setTimeout(closeDrop, 160);
    });

    document.addEventListener("click", function (event) {
      if (!drop.contains(event.target)) closeDrop();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      closeDrop();
      if (nav) nav.classList.remove("is-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  }

  var header = document.querySelector(".site-header");
  if (header && document.body.classList.contains("home")) {
    function paintHeader() {
      header.classList.toggle("is-solid", window.scrollY > 24);
    }
    paintHeader();
    window.addEventListener("scroll", paintHeader, { passive: true });
  }

  var turn = document.querySelector("[data-turn]");
  if (turn && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var words = ["sensitive", "confidential", "restricted", "regulated", "protected", "personal"];
    var word = 0;
    var holder = turn.parentNode;

    function fitWord() {
      holder.style.width = turn.offsetWidth + "px";
    }

    fitWord();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitWord);

    window.setInterval(function () {
      turn.classList.add("is-out");
      window.setTimeout(function () {
        word = (word + 1) % words.length;
        turn.textContent = words[word];
        fitWord();
        turn.classList.remove("is-out");
      }, 280);
    }, 2600);
  }
})();
