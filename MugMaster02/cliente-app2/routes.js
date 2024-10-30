import landingForm from "./screensQR/Landingform.js"
import consume from './screensQR/consume.js';
import loading from "./screensQR/Loading.js"
import email from "./screensQR/Email.js"
import error from "./screensQR/Error.js"

import socket from "./socket.js";

export let Screen;

const router = new Router({ // check this for more features with Router: https://github.com/Graidenix/vanilla-router
  mode: "hash",
  page404: (path) => {
    const app = document.getElementById("app");
    app.innerHTML = `<h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p>`;
  },
});

function clearScripts() {
  document.getElementById("app").innerHTML = "";
}

router.add("/", async () => {
  Screen = 'landingform';
  console.log(Screen);
  clearScripts();
  landingForm();
});

router.add("/consume", async () => {
  Screen = 'consume';
  console.log(Screen);
  clearScripts();
  consume();
});

router.add("/loading", async () => {
  Screen = 'loading';
  console.log(Screen);
  clearScripts();
  loading();
});

router.add("/email", async () => {
  Screen = 'email';
  console.log(Screen);
  clearScripts();
  email();
});

router.add("/error", async () => {
  Screen = 'error';
  console.log(Screen);
  clearScripts();
  error();
});

router.check().addUriListener();

// Listen for popstate event to handle browser navigation
window.addEventListener("popstate", () => {
  router.check();
});

document.addEventListener("DOMContentLoaded", () => {
  router.check();
});

router.check();

export { router, socket };

