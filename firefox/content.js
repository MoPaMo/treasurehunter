document.addEventListener("DOMContentLoaded", getItems);

function getItems() {
  console.log("getItems");
  const items = document.querySelectorAll(".grid .flex.items-center");
  if (items.length === 0) {
    setTimeout(getItems, 1000);
    return;
  }
  items.forEach((item) => {
    const favouriteButton = document.createElement("button");
    favouriteButton.innerText = "❤️";
    favouriteButton.className =
      "favourite-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition duration-150 active:scale-90 bg-[#9AD9EE] text-black h-10 px-4 py-2 bg-blend-color-burn";
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
console.log("content.js");
setTimeout(getItems, 1000);
