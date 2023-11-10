import mongoose from 'mongoose';

const categoryCollection = 'categories';

const categorySchema = mongoose.Schema({
	name: String
});

const categoryModel = mongoose.model(categoryCollection,categorySchema);

export default categoryModel;