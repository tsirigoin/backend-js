import { Decimal128 } from 'mongodb';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		index: true,
	},
	description: String,
	price: Decimal128,
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
		unique: true
	},
	stock: Int32Array,
	status: {
		type: [
			{
				status: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'status'
				}
			}
		],
		default: []
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

const productModel = mongoose.model(productCollection,productSchema);

export default productModel;