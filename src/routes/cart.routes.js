import express from 'express';
import Cart from '../models/carts.models.js';
import User from '../models/users.models.js';
import Product from '../models/products.models.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const user = await User.findById(ObjectId(req.body.uid));
		if (!user) {
			return res.status(404).send({ status: 'error', error: 'User not found.' });
		}

		const cartExists = await Cart.exists({ user: user._id });

		if (cartExists) {
			return res.status(409).send({ status: 'conflict', message: 'Cart already exists.' });
		}

		const result = await Cart.create({
			user: user._id
		});

		res.send({ status: 'success', payload: result });
	} catch (error) {
		console.error(error);
		res.status(500).send({ status: 'error', error: 'Internal server error.' });
	}
});

router.get('/:cid', async (req, res) => {
	try {
		const cart = await Cart.findById(ObjectId(req.params.cid));

		if (!cart) {
			return res.status(404).send({ status: 'error', error: 'Cart not found.' });
		}

		res.send({ status: 'success', payload: cart });
	} catch (error) {
		console.error(error);
		res.status(500).send({ status: 'error', error: 'Internal server error.' });
	}
});

router.post('/:cid/product/:pid', async (req,res) => {
	try {
		const productId = ObjectId(req.params.pid);
		const cartId = ObjectId(req.params.cid);

		let quantity = Number(req.query.q) || 1;
		if (isNaN(quantity) || quantity <= 0) {
			return res.status(400).send({status: 'error', error: 'Invalid quantity.'});
		}

		const productExists = await Product.exists(productId);
		const cartExists = await Cart.exists(cartId);

		if (!productExists) {
			return res.status(404).send({status:"error",error:"Product not found."});
		}	
		if (!cartExists) {
			return res.status(404).send({status:'error',error:'Cart not found.'});
		}

		const result = await updateCart(cartId,productId,quantity);

		if (result.nModified === 0) {
			await Cart.updateOne(
				{ "_id": cartId},
				{
					$push: {
						"products": {
							"product": productId,
							"quantity": quantity
						}
					}
				}
			);
		}

		res.send({status:"success", message:"Product added to cart successfully."});
	} catch (error) {
		console.error(error);
		res.status(500).send({status:"error", error: "Internal server error."});
	}

	async function updateCart(cartId,productId,quantity) {
		const result = await Cart.updateOne(
			{ "_id": cartId },
			{
				$addToSet: {
					"products": {
						$each: [
							{
								"product": productId,
								"quantity": quantity
							}
						]
					}
				}
			}
		);

		console.log(`Updated ${result.nModified} document.`);

		return result;
	}
});

export default router;