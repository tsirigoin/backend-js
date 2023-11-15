import mongoose from 'mongoose';

const collectionName = 'status';

const statusSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	}
});

const Status = mongoose.model(collectionName,statusSchema);

export default Status;