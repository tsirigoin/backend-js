import express from 'express';
import cartRoutes from './routes/cartRoutes.js';
import __dirname from './utils.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
const port = 8080;

const server = app.listen(port,() => {
	console.log(`LISTENING ON http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use('/api/carts/',cartRoutes);
app.use('/api/products/',productRoutes);