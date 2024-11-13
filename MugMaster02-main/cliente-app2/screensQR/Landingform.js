import { router, socket } from '../routes.js';

export default function Landingform() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>Congratulations!</h1>
        <p>You have helped Mug! To claim your coupon, both participants need to fill out the following form:</p>

        <form id="claimForm">
            <div>
                <label for="name1">Name (Player 1):</label>
                <input type="text" id="name1" name="name1" required>
            </div>
            <div>
                <label for="email1">Email (Player 1):</label>
                <input type="email" id="email1" name="email1" required>
            </div>
            <br>
            <div>
                <label for="name2">Name (Player 2):</label>
                <input type="text" id="name2" name="name2" required>
            </div>
            <div>
                <label for="email2">Email (Player 2):</label>
                <input type="email" id="email2" name="email2" required>
            </div>
            <br>
            <button type="submit" id="submitForm">Submit</button>
        </form>
    `;

	document.getElementById('claimForm').addEventListener('submit', (event) => {
		event.preventDefault();

		const name1 = document.getElementById('name1').value;
		const email1 = document.getElementById('email1').value;
		const name2 = document.getElementById('name2').value;
		const email2 = document.getElementById('email2').value;

		socket.emit('submitNames', { name1, email1, name2, email2 });

		alert(`Information submitted: ${name1} (${email1}), ${name2} (${email2})`);

		socket.emit('changeScreen');
		router.navigateTo('/Consume');
	});
}
