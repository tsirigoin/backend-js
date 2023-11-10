import mongoose from 'mongoose';

const imagesCollection = 'images';

const imagesSchema = new mongoose.Schema({
	name: {
		type: String,
		index: true
	},
	dir: String
})

const imagesModel = mongoose.model(imagesCollection,imagesSchema);

export default imagesModel;