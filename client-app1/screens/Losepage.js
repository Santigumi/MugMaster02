
export default function losePage() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <section>
        <img id="titule" src="/Resources/img/Mug.png">
        <div id="center">
        <img id="text" src="/Resources/img/lost.png">
        <div id="buttons">
        <div id="nextPage">
		<img id="arrows1" src="/Resources/img/Arrows.png">
		<p id="next">Quit</p>
		</div>
        <div id="backPage">
		<img id="arrows" src="/Resources/img/Arrows.png">
		<p id="next">Retry</p>
		</div>  
        </div>
        </div>  
        </section>
    `;
}
