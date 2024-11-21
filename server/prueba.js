const flecha1 = { idFlecha: 1, flecha: 1, columna: 2, posx: 0, posy: 0 };
const flecha2 = { idFlecha: 2, flecha: 2, columna: 3, posx: 0, posy: 0 };
const flecha3 = { idFlecha: 3, flecha: 3, columna: 1, posx: 0, posy: 0 };
const flecha4 = { idFlecha: 4, flecha: 3, columna: 2, posx: 0, posy: 0 };
const flecha5 = { idFlecha: 5, flecha: 2, columna: 3, posx: 0, posy: 0 };
const flecha6 = { idFlecha: 6, flecha: 1, columna: 3, posx: 0, posy: 0 };
const flecha7 = { idFlecha: 7, flecha: 1, columna: 1, posx: 0, posy: 0 };

let array = [
	[flecha1, flecha2],
	[flecha2, flecha3, flecha4],
	[flecha4, flecha5, flecha6, flecha7],
];

function eliminarFlecha(flechaId) {
	const filtrado = array.map((e) => e.filter((m) => m.idFlecha !== flechaId));
	array = [...filtrado];
}
console.log('Array: ', array);
eliminarFlecha(2);

console.log('Nuevo array: ', array);
