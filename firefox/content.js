document.addEventListener("DOMContentLoaded", getItems);
const iconA = "❤️";
const iconB = "💔";
function getItems() {
  console.log("getItems");
  const items = document.querySelectorAll(".grid div.flex.items-center");
  if (items.length === 0) {
    setTimeout(getItems, 1000);
    return;
  }
  items.forEach((item) => {
    const favouriteButton = document.createElement("button");
    favouriteButton.innerText = iconA;
    favouriteButton.className =
      "favourite-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition duration-150 active:scale-90 bg-[#9AD9EE] text-black h-10 px-4 py-2 bg-blend-color-burn";
    favouriteButton.style.marginLeft = "10px";
    favouriteButton.addEventListener("click", () => {
      const itemId = item.closest('div[id^="item_"]').id;
      toggleFavourite(itemId);
    });
    item.appendChild(favouriteButton);
  });

  loadFavourites();
}
//getDoublons
/*<div class="flex items-center gap-1" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r5:" data-state="closed"><img src="doubloon.svg" alt="doubloons" class="w-4 sm:w-5 h-4 sm:h-5"><span class="mr-2">...<span class="sm:inline hidden"> Doubloons</span></span></div>*/
function getDoublons() {
  document
    .querySelectorAll("div.right-px > div.flex.items-center.gap-1 > span.mr-2")
    .forEach((item) => {
      console.log(item);
    });
}
function toggleFavourite(itemId) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  if (favourites.includes(itemId)) {
    favourites = favourites.filter((id) => id !== itemId);
    document
      .getElementById(itemId)
      .querySelector(".favourite-button").innerText = iconA;
  } else {
    document
      .getElementById(itemId)
      .querySelector(".favourite-button").innerText = iconB;
    favourites.push(itemId);
  }
  localStorage.setItem("favourites", JSON.stringify(favourites));
}

function loadFavourites() {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favourites.forEach((itemId) => {
    const item = document.getElementById(itemId);
    if (item) {
      const button = item.querySelector(".favourite-button");
      if (button) {
        button.innerText = iconB;
      }
    }
  });
}

console.log("content.js");
setTimeout(getItems, 1000);
setTimeout(getDoublons, 1000);
