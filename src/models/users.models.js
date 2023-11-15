import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collectionName = 'users';

const validGenders = ['male','female','other'];

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		index: true,
		unique: true,
		required: true
	},
	firstName: String,
	lastName: String,
	email: {
		type: String,
		unique: true,
		required: true
	},
	gender: {
		type: String,
		enum: validGenders
	}
});

userSchema.plugin(mongoosePaginate);

const User = mongoose.model(collectionName,userSchema);

export default User;