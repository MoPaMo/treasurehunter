document.addEventListener("DOMContentLoaded", getItems);

function getItems() {
  const items = document.querySelectorAll(".grid .flex.items-center");
  if (items.length === 0) {
    setTimeout(getItems, 1000);
    return;
  }
  items.forEach((item) => {
    const favouriteButton = document.createElement("button");
    favouriteButton.innerText = "Favourite";
    favouriteButton.className = "favourite-button";
    favouriteButton.style.marginLeft = "10px";
    favouriteButton.addEventListener("click", () => {
      const itemId = item.closest('div[id^="item_"]').id;
      toggleFavourite(itemId);
    });
    console.log(item);
    item.appendChild(favouriteButton);
  });
}

function toggleFavourite(itemId) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  if (favourites.includes(itemId)) {
    favourites = favourites.filter((id) => id !== itemId);
  } else {
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
        button.innerText = "Unfavourite";
      }
    }
  });
}

loadFavourites();
