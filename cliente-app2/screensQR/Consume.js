// import { router, socket } from '../routes.js'; // Importing router and socket

// export default function consume() {
// 	const app = document.getElementById('app');
// 	app.innerHTML = `
//         <h1>What do you usually consume at Starbucks?</h1>
//         <div class="options">
//             <div class="option" id="cold-drinks">
//                 <img src="path/to/cold-drinks.jpg" alt="Cold drinks">
//                 <p>Cold drinks</p>
//             </div>
//             <div class="option" id="coffee">
//                 <img src="path/to/coffee.jpg" alt="Coffee">
//                 <p>Coffee</p>
//             </div>
//             <div class="option" id="breakfast">
//                 <img src="path/to/breakfast.jpg" alt="Breakfast">
//                 <p>Breakfast</p>
//             </div>
//             <div class="option" id="cakepops">
//                 <img src="path/to/cakepops.jpg" alt="CakePops">
//                 <p>CakePops</p>
//             </div>
//             <div class="option" id="snacks">
//                 <img src="path/to/snacks.jpg" alt="Snacks">
//                 <p>Snacks</p>
//             </div>
//             <div class="option" id="hot-tea">
//                 <img src="path/to/hot-tea.jpg" alt="Hot tea">
//                 <p>Hot tea</p>
//             </div>
//         </div>
//         <button id="submit">Submit</button>
//         <button id="nextPage">Go to Screen 4</button>
//     `;

// 	let selectedOption = null;

// 	// Add event listeners for the options
// 	const options = document.querySelectorAll('.option');
// 	options.forEach((option) => {
// 		option.addEventListener('click', () => {
// 			// Remove selected class from all options
// 			options.forEach((opt) => opt.classList.remove('selected'));
// 			// Add selected class to the clicked option
// 			option.classList.add('selected');
// 			selectedOption = option.id; // Get the id of the selected option
// 		});
// 	});

// 	document.getElementById('submit').addEventListener('click', () => {
// 		if (selectedOption) {
// 			// Emit the selected option to the server
// 			socket.emit('submitSurvey', selectedOption);
// 			alert(`You selected: ${selectedOption.replace(/-/g, ' ')}`);

// 			// Emit 'changeScreen' event to navigate to another screen if needed
// 			socket.emit('changeScreen');
// 		} else {
// 			alert('Please select an option before submitting.');
// 		}
// 	});

// 	// Add event listener for the next page button
// 	document.getElementById('nextPage').addEventListener('click', () => {
// 		router.navigateTo('/loading');

// 		setTimeout(() => {
// 			router.navigateTo('/Email'); // Replace '/nextPage' with the actual route you want to navigate to after loading
// 		}, 5000); // 5000 milliseconds = 5 seconds
// 	});

// 	// Listen for 'navigateTo' event and navigate to the received page
// 	socket.on('navigateTo', (screensQR) => {
// 		router.navigateTo(screensQR); // Navigate to the page sent by the server
// 	});
// }


import { router, socket } from '../routes.js';

export default function consume() {
  const app = document.getElementById('app');
  app.innerHTML = `
        <h1>What do you usually consume at Starbucks?</h1>
        <div class="options">
            <button class="option" id="cold-drinks">
                <img src="path/to/cold-drinks.jpg" alt="Cold drinks">
                <p>Cold drinks</p>
            </button>
            <button class="option" id="coffee">
                <img src="path/to/coffee.jpg" alt="Coffee">
                <p>Coffee</p>
            </button>
            <button class="option" id="breakfast">
                <img src="path/to/breakfast.jpg" alt="Breakfast">
                <p>Breakfast</p>
            </button>
            <button class="option" id="cakepops">
                <img src="path/to/cakepops.jpg" alt="CakePops">
                <p>CakePops</p>
            </button>
            <button class="option" id="snacks">
                <img src="path/to/snacks.jpg" alt="Snacks">
                <p>Snacks</p>
            </button>
            <button class="option" id="hot-tea">
                <img src="path/to/hot-tea.jpg" alt="Hot tea">
                <p>Hot tea</p>
            </button>
        </div>
        <button id="submit">Submit</button>
        <button id="nextPage">Go to Screen 4</button>
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
      socket.emit('submitSurvey', selectedOption);
      alert(`You selected: ${selectedOption.replace(/-/g, ' ')}`);
      socket.emit('changeScreen');
    } else {
      alert('Please select an option before submitting.');
    }
  });

  document.getElementById('nextPage').addEventListener('click', () => {
    router.navigateTo('/loading');
    setTimeout(() => {
      router.navigateTo('/Email');
    }, 5000);
  });

  socket.on('navigateTo', (screensQR) => {
    router.navigateTo(screensQR);
  });
}
