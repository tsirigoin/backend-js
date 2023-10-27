var socket = io();

socket.on('prods', data => {
	products = data;
});