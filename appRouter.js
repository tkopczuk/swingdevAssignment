
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/getQuote', (req,res) => {
	
	let quote = {
		"price": 0,
		"trucks": []
	};
	
	for(let i = 0; i < (req.body.length > 0 ? req.body.length : -1); i++){
		let row =req.body[i];
		if(row.id !== undefined && row.weight !== undefined){
			//add row to quote calc
		}
	}
	
	//generate quote
	
	//send quote
	res.status(200).send(quote);
});

router.post('/', (req, res) => {
	let quote = {
		"price": 0,
		"trucks": []
	};
	
	for(let i = 0; i < (req.body.length > 0 ? req.body.length : -1); i++){
		let row =req.body[i];
		if(row.id !== undefined && row.weight !== undefined){
			//add row to quote calc
		}
	}
	
	//generate quote
	
	//add order to database
	
	//send quote
	res.status(200).send(quote);
});

router.get('/history', (req, res) => {
	let orderHistory = [];
	
	//get order history from database
	
	//send orderHistory
	res.status(200).send(orderHistory);
});

module.exports = router;