
    document.getElementById('reset').addEventListener('click', () => {
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
          browser.tabs.executeScript(tabs[0].id, {
            code: 'localStorage.setItem("favourites", "[]"); console.log("Local Storage Modified");'
          });
        });
      });
/*
const inputA = document.getElementById('like');
inputA.value = localStorage.getItem("favExt.iconA")|| "❤️"
inputA.addEventListener('keyup', () => {
    if (inputA.value) {
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            browser.tabs.executeScript(tabs[0].id, {
                code: `localStorage.setItem("favExt.iconA", "${inputA.value}"); console.log("Local Storage Modified");`
            });
        });
    }
})


document.getElementById('dislike').value = localStorage.getItem("favExt.iconB") || "💔"
document.getElementById('dislike').addEventListener('keyup', () => {
    if (document.getElementById('dislike').value) {
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            browser.tabs.executeScript(tabs[0].id, {
                code: `localStorage.setItem("favExt.iconB", "${document.getElementById('dislike').value}"); console.log("Local Storage Modified");`
            });
        });
    }
})*/
