import express from 'express';
import { ProductManager } from '../managers/product.manager.js';

export const router = express.Router();
const productManager = new ProductManager('../data/products.json');

router.get('/',(req,res) => {
	const products = productManager.getProducts();
	
	res.render('index',{
		products: products,
		style:'index.css'
	});
});

router.get('/realTimeProducts',(req,res) => {
	const products = productManager.getProducts();

	res.render('realTimeProducts',{
		products: products,
		style: 'index.css'
	});
});

export default router;