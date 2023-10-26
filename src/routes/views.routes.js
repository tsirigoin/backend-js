import express from 'express';

export const router = express.Router();

router.get('/',(req,res) => {
	res.render('index',{
		products: req.body,
		style:'index.css'
	});
})

export default router;