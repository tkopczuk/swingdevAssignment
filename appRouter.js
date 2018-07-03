
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Warehouse = require('./Warehouse');

router.use(bodyParser.json());

router.post('/getQuote', (req,res) => {
	
	let quote = {
		"price": 0,
		"trucks": []
	};
	
	let order = [];
	
	for(let i = 0; i < (req.body.length > 0 ? req.body.length : -1); i++){
		let row =req.body[i];
		if(row.id !== undefined && row.weight !== undefined){
			order.push(row);
		}
	}
	
	console.log(order);
	
	//generate quote
	
	let WH = new Warehouse(order, 1000);
	
	WH.assignTrucks();
	
	quote.price = WH.totalPrice();
	quote.trucks = WH.getTrucksArray();
	
	
	//send quote
	res.status(200).send(quote);
});

router.post('/', (req, res) => {
	let quote = {
		"price": 0,
		"trucks": []
	};
	
	let order = [];
	
	for(let i = 0; i < (req.body.length > 0 ? req.body.length : -1); i++){
		let row =req.body[i];
		if(row.id !== undefined && row.weight !== undefined){
			order.push(row);
		}
	}
	
	console.log(order);
	
	//generate quote
	
	let WH = new Warehouse(order, 1000);
	
	WH.assignTrucks();
	
	quote.price = WH.totalPrice();
	quote.trucks = WH.getTrucksArray();
	
	//add order to database
	
	req.db.collection('orders').insertOne(quote);
	
	//send quote
	res.status(200).send(quote);
});

router.get('/history', (req, res) => {
	
	req.db.collection('orders').find().toArray((err, result) => {
		if(err){
			res.status(500).send(err);
		}else{
			res.status(200).send(result);
		}
	});
});

module.exports = router;