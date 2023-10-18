import express from 'express';
import { uploader } from '../utils.js';
import { ProductManager } from '../managers/productManager.js';

const router = express.Router();
const productManager = new ProductManager('../data/products.json');

router.get('/',(req,res) => {
	const products = productManager.getProducts();

	let limit = req.query.limit;

	if (!limit) {
		return res.send({products});
	} else {
		let filteredProducts = products.slice(0,limit);
		res.send({filteredProducts});
	}
});

router.get('/:pid',(req,res) => {
	let productId = Number(req.params.pid);

	let product = productManager.getProductsById(productId);

	if (!product) {
		return res.send({error:'PRODUCT NOT FOUND'});
	}

	res.send(product);
});

router.post('/',(req,res) => {
	let product = req.body;

	const {title, description, price, code, stock, status, category} = product;

	if (req.files !== undefined) {
		uploader.array();
		product.thumbnails = req.files;
	}


	if (!title || !description || !price || !code || !stock || !status || !category) {
		return res.status(400).send({status:"error",error:"Incomplete values."});
	}

	productManager.addProduct(product);
	res.send({status:"success",message:"Product added successfully."});
});

router.put('/:pid',(req,res) => {
	const productId = Number(req.params.pid)

	const product = productManager.getProductsById(productId);

	if (product === null) {
		return res.status(404).send({status:"error",error:"Product not found."});
	}

	let changedFields = req.body;

	if (req.files !== undefined) {
		uploader.array();
		changedFields.thumbnails = req.files;
	}

	productManager.updateProduct(productId,changedFields);
	res.send({status:"success",message:"Product updated successfully."});
});

router.delete('/:pid',(req,res) => {
	const productId = Number(req.params.pid);
	const currentLength = productManager.getProducts().length;

	productManager.deleteProduct(productId);

	if (productManager.getProducts().length === currentLength) {
		return res.status(404).send({status:"error",error:"Product not found."});
	}
	res.send({status:'success',message:'Product deleted.'});
});

export default router;