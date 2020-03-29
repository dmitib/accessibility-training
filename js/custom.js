(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });

  let timer = document.getElementById("timer");
  let second = 0;

  function tick() {
    second++;
    const result = `You are here for ${second} second`;

    second !== 1
      ? (timer.innerHTML = result + "s")
      : (timer.innerHTML = result);
  }

  setInterval(() => tick(), 1000);

  let skipNavLink = document.getElementById("skip-nav-link");
  let currentSkipNavLinkItem = 0;

  function goDown() {
    event.preventDefault();
    if (currentSkipNavLinkItem === 2) {
      return skipNavLink.children[2].setAttribute("tabindex", "0");
    }

    ++currentSkipNavLinkItem;
    skipNavLink.children[currentSkipNavLinkItem].setAttribute("tabindex", "0");
    skipNavLink.children[currentSkipNavLinkItem].focus();
    skipNavLink.children[currentSkipNavLinkItem - 1].setAttribute(
      "tabindex",
      "-1"
    );
  }

  function goUp() {
    event.preventDefault();
    if (currentSkipNavLinkItem === 0) {
      return skipNavLink.children[0].setAttribute("tabindex", "0");
    }

    --currentSkipNavLinkItem;
    skipNavLink.children[currentSkipNavLinkItem].setAttribute("tabindex", "0");
    skipNavLink.children[currentSkipNavLinkItem].focus();
    skipNavLink.children[currentSkipNavLinkItem + 1].setAttribute(
      "tabindex",
      "-1"
    );
  }

  function jumpTo() {
    skipNavLink.children[currentSkipNavLinkItem].children[0].click();
  }

  function keyboardNavigation(e) {
    switch (e.code) {
      case "ArrowUp":
        goUp();
        break;
      case "ArrowDown":
        goDown();
        break;
      case "Enter":
      case "Space":
        jumpTo();
        break;
    }
  }

  skipNavLink.onkeydown = keyboardNavigation;
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}
