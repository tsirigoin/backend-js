import { Decimal128 } from 'mongodb';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collectionName = 'products';

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		index: true,
		required: true
	},
	description: String,
	price: {
		type: Decimal128,
		required: true,
		validate: {
			validator: (value) => value >= 0,
			message: 'Price must not be negative.'
		}
	},
	thumbnails: {
		type: [
			{
				image: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'images'
				}
			}
		],
		default: []
	},
	code: {
		type: String,
		index: true,
		unique: true,
		required: true
	},
	stock: {
		type: Number,
		required: true,
		validate: {
			validator: (value) => value >= 0,
			message: 'Stock must not be negative.'
		}
	},
	status: {
		type: 
			{
				status: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'status'
				}
			},
		required: true
	},
	categories: {
		type: [
			{
				category: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'categories'
				}
			}
		],
		default: []
	}
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model(collectionName,productSchema);

export default Product;