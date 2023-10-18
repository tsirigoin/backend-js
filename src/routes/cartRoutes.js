import express from 'express';
import { ProductManager } from '../managers/productManager.js';
import { CartManager } from '../managers/cartManager.js';

const router = express.Router();
const cartManager = new CartManager('../../data/carts.json');

router.post('/',(req,res) => {
	cartManager.addNewCart();

	res.send({status:'success',manage:'Cart added.'});
});

router.get('/:cid',(req,res) => {
	const cartId = Number(req.params.cid);
	
	let cartProducts = cartManager.getById(cartId);

	if (!cartProducts) {
		return res.send({error:'CART NOT FOUND'});
	}
	res.send(cartProducts);
});

router.post('/:cid/product/:pid',(req,res) => {

	const productManager = new ProductManager('../../data/products.json');

	const cartId = Number(req.params.cid);
	const productId = Number(req.params.pid);

	let quantity = Number(req.query.q);

	if (!quantity) {
		quantity = 1;
	}

	let exists = productManager.getProductsById(productId);

	if (!exists) {
		return res.status(404).send({status:"error",error:"Product not found."});
	}

	cartManager.addProductToCart(productId,cartId,quantity);

	res.send({status:"success",message:"Product added to cart successfully."})
});

export default router;