document.addEventListener("DOMContentLoaded", getItems);
const iconA = "❤️";
const iconB = "💔";
let Doubloons = 0;

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
  addStyles();
  addProgressBar();
  addPOI("20%", "path/to/image1.png");
  addPOI("50%", "path/to/image2.png");
  addPOI("80%", "path/to/image3.png");
  setProgress(30);
  loadFavourites();
  getDoublons();
}

//getDoublons
/*<div class="flex items-center gap-1" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r5:" data-state="closed"><img src="doubloon.svg" alt="doubloons" class="w-4 sm:w-5 h-4 sm:h-5"><span class="mr-2">...<span class="sm:inline hidden"> Doubloons</span></span></div>*/
function getDoublons() {
  document
    .querySelectorAll("div.right-px > div.flex.items-center.gap-1 > span.mr-2")
    .forEach((item) => {
      console.log(item.innerHTML);
      // strip <span class="sm:inline hidden"> Doubloons</span>
      let val = item.innerHTML.replace(
        /<span class="sm:inline hidden"> Doubloons<\/span>/,
        ""
      );
      val = Number(val.replace(/[^\d.-]/g, "")) || 0;
      console.log(val);
      Doubloons = val;
      return val;
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

const progressBarHtml = `
<div id="progress-container">
  <div id="progress-bar"></div>
  <div class="poi" style="left: 20%; background-image: url('path/to/image1.png');"></div>
  <div class="poi" style="left: 50%; background-image: url('path/to/image2.png');"></div>
  <div class="poi" style="left: 80%; background-image: url('path/to/image3.png');"></div>
</div>

`;
const progressBarStyle = `
#progress-container {
  position: relative;
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: visible;
}

#progress-bar {
  width: 0;
  height: 100%;
  background-color: #3b82f6;
  border-radius: 5px; /* Ensures the bar stays rounded */
  transition: width 0.3s;
}

.poi {
  position: absolute;
  top: -8px;
  width: 24px;
  height: 24px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  transform: translateX(-50%);
}

/* Specific adjustment for POIs at the 100% position */
.poi:last-child {
  transform: translateX(-80%); /* Adjust as needed for the desired placement */
}
`;
function addStyles() {
  const style = document.createElement("style");
  style.textContent = progressBarStyle;

  document.head
    ? document.head.appendChild(style)
    : document.body.appendChild(style);
}
function addProgressBar() {
  const progressContainer = document.createElement("div");
  progressContainer.id = "progress-container";

  const progressBar = document.createElement("div");
  progressBar.id = "progress-bar";

  progressContainer.appendChild(progressBar);
  //add br
  const br = document.createElement("br");
  const appendTo = document.querySelector(
    "div.container.mx-auto.px-4.py-8.text-white > div.text-center.text-white"
  );
  appendTo.appendChild(br);
  appendTo.appendChild(progressContainer);
}
function addPOI(position, imageUrl) {
  const poi = document.createElement("div");
  poi.className = "poi";
  poi.style.left = position;
  poi.style.backgroundImage = `url('${imageUrl}')`;

  const progressContainer = document.getElementById("progress-container");
  if (progressContainer) {
    progressContainer.appendChild(poi);
  }
}
function removePOI(position) {
  const progressContainer = document.getElementById("progress-container");
  if (progressContainer) {
    const pois = progressContainer.getElementsByClassName("poi");
    for (const poi of pois) {
      if (poi.style.left === position) {
        poi.remove();
        break; // Exit after removing the targeted POI
      }
    }
  }
}
function setProgress(percent) {
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    progressBar.style.width = percent + "%";
  }
}
