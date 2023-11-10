import mongoose from 'mongoose';

const statusCollection = 'status';

const statusSchema = mongoose.Schema({
	name: String
});

const statusModel = mongoose.model(statusCollection,statusSchema);

export default statusModel;