import express from 'express';
import { uploader } from '../utils.js';
import { ProductManager } from '../managers/product.manager.js';
import Product from '../models/products.models.js';
import { ObjectId } from 'mongodb';

const router = express.Router();
const productManager = new ProductManager('../data/products.json');

router.get('/', async (req, res) => {
	try {
		const limit = Number(req.query.limit);

		let products;

		if (!limit) {
			products = await Product.find();
		} else {
			products = await Product.find().limit(limit);
		}

		return res.send({ status: 'success', payload: products });
	} catch (error) {
		console.error(error);
		res.status(500).send({ status: 'error', error: 'Internal server error.' });
	}
});

router.get('/:pid', async (req, res) => {
	try {
		const product = await Product.findById(ObjectId(req.params.pid));

		if (!product) {
			return res.status(404).send({ status: 'error', error: 'Product not found.'});
		}

		res.send({ status: 'success', payload: product });
	} catch (error) {
		console.error(error);
		res.status(500).send({ status: 'error', error: 'Internal server error.' });
	}
});

router.post('/', async (req, res) => {
	try {
		let product = req.body;
		const { title, description, price, code, stock, statusId, categories } = product;

		if (req.files !== undefined) {
			uploader.array();
			product.thumbnails = req.files;
		}

		if (!title || !price || !code || !stock || !statusId) {
			return res.status(400).send({ status: 'error', error: 'Incomplete values.'});
		}

		const result = await Product.create({
			title: title,
			description: description,
			price: price,
			thumbnails: thumbnails,
			code: code,
			stock: stock,
			status: statusId,
			categories: categories
		});

		res.send({ status: 'success', payload: result });
	} catch (error) {
		console.error(error);
		res.status(500).send({ status: 'error', error: 'Internal server error.' });
	}
});

router.put('/:pid', async (req, res) => {
	try {
		const productId = ObjectId(req.params.pid);

		let changedFields = req.body;

		const productExists = await Product.exists(productId);

		if (!productExists) {
			return res.status(404).send({status:"error",error:"Product not found."});
		}

		const result = await Product.updateOne(
			{ "_id": productId },
			{
				$set: changedFields
			}, (err, result) => {
				if (err) {
					console.error('Error updating product: ', err);
				} else {
					console.log('Update result: ', result);
				}
			}
		);

		res.send({ status: 'success', payload: result});
	}  catch (error) {
		console.error(error);
		res.status(500).send({ status: 'error', error: 'Internal server error.' });
	}
});

router.delete('/:pid', async (req, res) => {
	const productId = ObjectId(req.params.pid);
	
	try {
		const result = await Product.deleteOne(
			{ "_id": productId }
		);

		if (result.deletedCount === 0) {
			return res.status(404).send({ status: 'error', error: 'Product not found.' });
		}

		res.send({ status: 'success', payload: result });
	} catch (error) {
		console.error('Error deleting user: ' + error);
		res.status(500).send({ status: 'error', error: 'Internal server error.' });
	}
});

export default router;