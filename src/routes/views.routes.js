import express from 'express';
import productRouter from './product.routes.js';
import usersRouter from './users.routes.js';
import cartRouter from './cart.routes.js';

const router = express.Router();
const productManager = new ProductManager('../data/products.json');

router.get('/', (req,res) => {
	const products = productManager.getProducts();
	
	res.render('index',{
		products: products,
		style:'index.css'
	});
});

router.get('/:pid', ())

router.get('/realTimeProducts',(req,res) => {
	const products = productManager.getProducts();

	res.render('realTimeProducts',{
		products: products,
		style: 'index.css'
	});
});

export default router;