import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		index: true,
		unique: true
	},
	firstName: String,
	lastName: String,
	email: {
		type: String,
		unique: true
	},
	gender: String
});
userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model(userCollection,userSchema);

export default userModel;