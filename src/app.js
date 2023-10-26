import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import cartRoutes from './routes/cart.routes.js';
import productRoutes from './routes/product.routes.js';
import viewRoutes from './routes/views.routes.js';
import { Server } from 'socket.io';

const app = express();
const port = 8080;

const httpServer = app.listen(port,() => {
	console.log(`LISTENING ON http://localhost:${port}`);
});

const io = new Server(httpServer);

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname + '/views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use('/api/carts/',cartRoutes);
app.use('/api/products/',productRoutes);
app.use('/',viewRoutes);

io.on('connection', socket => {
	console.log("Se conectó un usuario.");

	socket.on('message', data => {
		console.log(data);
	})

	socket.emit('individual','Mensaje para uno');

	socket.broadcast.emit('not-emitter','Mensaje para todos menos yo');

	io.emit('for-all','Mensaje para absolutamente todos');
})