import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
	products: {
		type: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'products'
				}
			}
		],
		default: []
	},
	user: {
		type: {
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'users'
			}
		},
		unique: true
	}
});

cartsSchema.plugin(mongoosePaginate);

const cartsModel = mongoose.model(cartsCollection,cartsSchema);

export default cartsModel;