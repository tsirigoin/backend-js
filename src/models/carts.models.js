import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collectionName = 'carts';

const cartsSchema = new mongoose.Schema({
	products: {
		type: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'products',
					required: true
				},
				quantity: {
					type: Number,
					default: 1
				}
			}
		],
		default: []
	},
	user: {
		type: {
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'users',
				required: true
			}
		},
		unique: true
	}
});

cartsSchema.plugin(mongoosePaginate);

const Cart = mongoose.model(collectionName,cartsSchema);

export default Cart;