import { Router } from 'express';
import userModel from '../models/users.models.js';

const router = Router();

router.get('/', async (req,res) => {
	try {
		let users = await userModel.find();
		res.send({result:"success",payload:users});
	}
	catch(error) {
		console.log('Cannot get users with mongoose: '+error);
	}
});

router.post('/', async (req,res) => {
	console.log(req.body);

	let {firstName, lastName, email} = req.body;

	if (!firstName || !lastName || !email) return res.send({status:"error",error:"Incomplete values"});

	let result = await userModel.create({
		firstName,
		lastName,
		email
	});

	res.send({status:"success",payload:result});
});

router.put('/:uid', async (req,res) => {
	const {uid} = req.params;

	let userToReplace = req.body;

	if (!userToReplace.firstName || !userToReplace.lastName || !userToReplace.email)
		return res.send({status:"error",error:"Incomplete values"});

	let result = await userModel.updateOne({_id: uid},userToReplace);
	res.send({status:"success",payload:result});
});

router.delete('/:uid', async (req,res) => {
	const {uid} = req.params;

	let result = await userModel.deleteOne({_id: uid});
	res.send({status:"success",payload:result});
});

export default router;