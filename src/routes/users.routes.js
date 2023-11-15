import { Router } from 'express';
import User from '../models/users.models.js';

const router = Router();

router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.send({ status: 'success', payload: users });
	} catch (error) {
		console.error('Cannot get users with mongoose: ' + error);
		res.status(500).send({ status: 'error', error: 'Internal server error.' });
	}
});

router.post('/', async (req, res) => {
	console.log(req.body);

	const { username, firstName, lastName, email, gender } = req.body;

	if (!username || !email) return res.status(400).send({ status: 'error', error: 'Incomplete values' });

	try {
		const result = await User.create({
			username,
			firstName,
			lastName,
			email,
			gender
		});

		res.send({ status: 'success', payload: result });
	} catch (error) {
		console.error('Error creating user: ' + error);
		res.status(500).send({ status: 'error', error: 'Internal server error.' });
	}
});

router.put('/:uid', async (req, res) => {
	const { uid } = req.params;

	const userToReplace = req.body;

	if (!userToReplace.username || !userToReplace.email)
		return res.status(400).send({ status: 'error', error: 'Incomplete values' });

	try {
		const result = await User.updateOne({ _id: uid }, userToReplace);

		if (result.nModified === 0) {
			return res.status(404).send({ status: 'error', error: 'User not found.' });
		}

		res.send({ status: 'success', payload: result });
	} catch (error) {
		console.error('Error updating user: ' + error);
		res.status(500).send({ status: 'error', error: 'Internal server error.' });
	}
});

router.delete('/:uid', async (req, res) => {
	const { uid } = req.params;

	try {
		const result = await User.deleteOne({ _id: uid });

		if (result.deletedCount === 0) {
			return res.status(404).send({ status: 'error', error: 'User not found.' });
		}

		res.send({ status: 'success', payload: result });
	} catch (error) {
		console.error('Error deleting user: ' + error);
		res.status(500).send({ status: 'error', error: 'Internal server error.' });
	}
});

export default router;
