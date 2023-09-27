import express from 'express';
import { ProductManager } from './productManager.js';

const app = express();
const productManager = new ProductManager('../data/data.json');

app.use(express.urlencoded({extended:true}));

app.get('/products',(req,res) => {
	const products = productManager.getProducts();

	let limit = req.query.limit;

	if (!limit) {
		return res.send({products});
	} else {
		let filteredProducts = products.slice(0,limit);
		res.send({filteredProducts});
	}
});

app.get('/products/:pid',(req,res) => {
	let productId = Number(req.params.pid);

	let product = productManager.getProductsById(productId);

	if (!product) {
		return res.send({error:'PRODUCT NOT FOUND'});
	}

	res.send(product);
})

app.listen(8080,() => {
	console.log('LISTENING ON 8080 PORT');
});