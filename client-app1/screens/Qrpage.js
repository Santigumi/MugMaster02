
export default function qrPage() {
	const app = document.getElementById('app');
	app.innerHTML = `
	<section>
	<img id="titule" src="/Resources/img/qr.png">
	<p>“Congratulations, you have won. Fill out the form to get your cupon.”</p>
	    <div id="backPage">
		<img id="arrows" src="/Resources/img/Arrows.png">
		<p id="next">Finish</p>
		</div>  
	</section>
    `;
}
