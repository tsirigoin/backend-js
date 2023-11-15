import mongoose from 'mongoose';

const collectionName = 'images';

const imagesSchema = new mongoose.Schema({
	name: {
		type: String,
		index: true,
		required: true
	},
	dir: {
		type: String,
		required: true
	}
})

const Image = mongoose.model(collectionName,imagesSchema);

export default Image;