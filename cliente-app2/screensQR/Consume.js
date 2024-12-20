
import { router, socket } from '../routes.js';

export default function consume() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>What do you usually consume at Starbucks?</h1>
        <div class="options">
            <button class="option" id="cold-drinks">
                <img src="https://www.groundstobrew.com/wp-content/uploads/2022/04/starbucks-iced-coffee-drinks-1-683x1024.jpg">
                <p>Cold drinks</p>
            </button>
            <button class="option" id="Coffee">
                <img src="https://www.javapresse.com/cdn/shop/articles/JavaPresse_166.webp?v=1715088531&width=780" alt="Coffee">
                <p>Coffee</p>
            </button>
            <button class="option" id="Breakfast">
                <img src="https://globalassets.starbucks.com/digitalassets/products/food/SBX20210915_BaconCheddarEggSandwich.jpg?impolicy=1by1_tight_288" alt="Breakfast">
                <p>Breakfast</p>
            </button>
            <button class="option" id="Cakepops">
                <img src="https://globalassets.starbucks.com/digitalassets/products/food/SBX20181129_BirthdayCakePop.jpg?impolicy=1by1_medium_630" alt="CakePops">
                <p>CakePops</p>
            </button>
            <button class="option" id="Snacks">
                <img src="https://globalassets.starbucks.com/digitalassets/products/food/SBX20190628_ShortbreadCookies.jpg?impolicy=1by1_tight_288" alt="Snacks">
                <p>Snacks</p>
            </button>
            <button class="option" id="Hot-tea">
                <img src="https://d2t88cihvgacbj.cloudfront.net/manage/wp-content/uploads/2020/12/Starbucks-Medicine-Ball-Tea-7.jpg?x29814" alt="Hot tea">
                <p>Hot tea</p>
            </button>
        </div>
        <button id="submit">Submit</button>
    `;

	let selectedOption = null;

	const options = document.querySelectorAll('.option');
	options.forEach((option) => {
		option.addEventListener('click', () => {
			options.forEach((opt) => opt.classList.remove('selected'));
			option.classList.add('selected');
			selectedOption = option.id;
		});
	});

	document.getElementById('submit').addEventListener('click', () => {
		if (selectedOption) {
			socket.emit('submitForm', selectedOption);
            alert(selectedOption)
			// alert(`You selected: ${selectedOption.replace(/-/g, ' ')}`);
			socket.emit('changeScreen');
			router.navigateTo('/loading');
			setTimeout(() => {
				router.navigateTo('/Email');
			}, 5000);
		} else {
			alert('Please select an option before submitting.');
		}
	});

	socket.on('navigateTo', (screensQR) => {
		router.navigateTo(screensQR);
	});
}
