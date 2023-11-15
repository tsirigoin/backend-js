import mongoose from 'mongoose';

const collectionName = 'categories';

const categorySchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	}
});

const Category = mongoose.model(collectionName,categorySchema);

export default Category;