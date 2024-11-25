import landingPage from './screens/Landingpage.js';
import tutorialPage from './screens/Tutorial.js';
import loadPage from './screens/Loadpage.js';
import gamePage from './screens/Gamepage.js';
import winPage from './screens/Winpage.js';
import losePage from './screens/Losepage.js';
import qrPage from './screens/Qrpage.js';

import socket from './socket.js';

export let Screen;

const router = new Router({
	// check this for more features with Router: https://github.com/Graidenix/vanilla-router
	mode: 'hash',
	page404: (path) => {
		const app = document.getElementById('app');
		app.innerHTML = `<h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p>`;
	},
});

function loadCss(cssFile) {
	let existingLink = document.getElementById('dynamic-css');
	if (existingLink){
		existingLink.remove();
	}

	let link = document.createElement('link');
	link.id = 'dynamic-css';
	link.rel = 'stylesheet';
	link.href = `css/${cssFile}`;
	document.head.appendChild(link);
}

function clearScripts() {
	document.getElementById('app').innerHTML = '';
}

router.add('/', () => {
	Screen = 'landingPage';
	console.log(Screen);
	clearScripts();
	loadCss('../styles/landing.css')
	landingPage();
});

router.add('/tutorialPage', () => {
	Screen = 'tutorialPage';
	console.log(Screen);
	clearScripts();
	loadCss('../styles/tutorial.css')
	tutorialPage();
});

router.add('/loadPage', () => {
	Screen = 'loadPage';
	console.log(Screen);
	clearScripts();
	loadPage();
});

router.add('/gamePage', () => {
	clearScripts();
	gamePage();
});

router.add('/winPage', () => {
	clearScripts();
	winPage();
});

router.add('/losePage', () => {
	clearScripts();
	losePage();
});

router.add('/qrPage', () => {
	clearScripts();
	qrPage();
});

router.addUriListener();

// Listen for popstate event to handle browser navigation
/* window.addEventListener("popstate", () => {
  router.check();
});
*/
document.addEventListener('DOMContentLoaded', () => {
	router.check();
});

//router.check();

export { router };
