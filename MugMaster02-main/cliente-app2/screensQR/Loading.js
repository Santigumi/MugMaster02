import { router, socket } from '../routes.js'; // Importing router and socket

export default function Loading() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <div class="loading-screen">
            <div class="loading-icon">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png" alt="Loading coffee">
            </div>
            <h2>Loading coupon...</h2>
        </div>
    `;

	// Emit an event to the server to request the coupon
	socket.emit('requestCoupon');

	// Listen for the coupon data from the server
	socket.on('couponLoaded', (couponData) => {
		// Navigate to the coupon display screen with the received data
		router.navigateTo('/couponDisplay', { coupon: couponData });
	});

	// Handle error if coupon loading fails
	socket.on('couponError', (errorMessage) => {
		app.innerHTML = `
            <h1>Error loading coupon</h1>
            <p>${errorMessage}</p>
            <button id="retry">Retry</button>
        `;

		document.getElementById('retry').addEventListener('click', () => {
			// Retry fetching the coupon
			app.innerHTML = `
                <div class="loading-screen">
                    <div class="loading-icon">
                        <img src="path/to/your/coffee-icon.png" alt="Loading coffee">
                    </div>
                    <h2>Loading coupon...</h2>
                </div>
            `;
			socket.emit('requestCoupon');
		});
	});
}
