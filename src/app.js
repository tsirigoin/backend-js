import express from 'express';
import { ProductManager } from './productManager.js';

const app = express();
const productManager = new ProductManager('../data/data.json');

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.get('/api/products/',(req,res) => {
	const products = productManager.getProducts();

	let limit = req.query.limit;

	if (!limit) {
		return res.send({products});
	} else {
		let filteredProducts = products.slice(0,limit);
		res.send({filteredProducts});
	}
});

app.get('/api/products/:pid',(req,res) => {
	let productId = Number(req.params.pid);

	let product = productManager.getProductsById(productId);

	if (!product) {
		return res.send({error:'PRODUCT NOT FOUND'});
	}

	res.send(product);
});

app.post('/api/products/',(req,res) => {
	const product = req.body;

	const {title, description, price, code, stock} = product;

	if (!title || !description || !price || !code || !stock) {
		return res.status(400).send({status:"error",error:"Incomplete values."});
	}

	productManager.addProduct(product);
	res.send({status:"success",message:"Product added successfully."});
});

app.put('/api/products/:pid',(req,res) => {
	const productId = Number(req.params.pid)

	const product = productManager.getProductsById(productId);

	if (product === null) {
		return res.status(404).send({status:"error",error:"Product not found."});
	}

	const changedFields = req.body;

	productManager.updateProduct(productId,changedFields);
	res.send({status:"success",message:"Product updated successfully."});
});

app.delete('/api/products/:pid',(req,res) => {
	const productId = Number(req.params.pid);
	const currentLength = productManager.getProducts().length;

	productManager.deleteProduct(productId);

	if (productManager.getProducts().length === currentLength) {
		return res.status(404).send({status:"error",error:"Product not found."});
	}
	res.send({status:'success',message:'Product deleted.'});
});

app.listen(8080,() => {
	console.log('LISTENING ON 8080 PORT');
});