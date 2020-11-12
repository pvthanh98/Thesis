const jwt = require("jsonwebtoken");
const Bill = require("../db/bill");
const paypal = require("paypal-rest-sdk");
const User = require('../db/customer');
var mongoose = require('mongoose');

module.exports = {
	postBill: async (req, res) => {
		let data = { ...req.body };
		const {customer_id} = data;
		data.store_id = req.user.id;

		const customer = await User.findById(customer_id,"latitude longtitude");
		if(customer){
			data.coordinate = {
				lat: customer.latitude,
				lng: customer.longtitude
			}

			Bill.create(data)
			.then(() => {
				res.sendStatus(200);
			})
			.catch((err) => {
				res.sendStatus(500);
				throw err;
			});
		} else res.status(403).send("User id not found")
	},
	getBill: (req, res) => {
		Bill.find({ store_id: req.user.id })
			.populate("services.service_id", "name")
			.populate("customer_id", "name")
			.then((bills) => {
				res.send(bills);
			})
			.catch((err) => res.send(err));
	},

	deleteBill: async (req, res) => {
		const { bill_ids } = req.body;
		try {
			for (let i = 0; i < bill_ids.length; i++) {
				await Bill.findByIdAndDelete(bill_ids[i]);
			}
			res.send("ok");
		} catch (e) {
			res.sendStatus(400);
			throw e;
		}
	},
	confirmPayment: async (req, res) => {
		const { bill_ids } = req.body;
		try {
			for (let i = 0; i < bill_ids.length; i++) {
				await Bill.findByIdAndUpdate(bill_ids[i], { paid: true });
			}
			res.send("ok");
		} catch (e) {
			res.sendStatus(400);
			throw e;
		}
	},
	getBillByID: (req, res) => {
		const { id } = req.params;
		Bill.findById(id)
			.populate("customer_id", "name image address phone")
			.populate("services.service_id", "name price total")
			.then((bill) => {
				res.json(bill);
			})
			.catch((err) => {
				if (err) {
					res.sendStatus(400);
					throw err;
				}
			});
	},
	getUserBillByID: (req, res) => {
		const { id } = req.params;
		Bill.findById(id)
			.populate("services.service_id", "name price total")
			.populate("store_id", "name")
			.then((bill) => {
				res.json(bill);
			})
			.catch((err) => {
				if (err) {
					res.sendStatus(400);
					throw err;
				}
			});
	},
	
	modifyBillTemp: (req, res) => {
		const { id } = req.params;
		Bill.findByIdAndUpdate(id, req.body)
			.then(() => res.sendStatus(200))
			.catch((err) => {
				res.sendStatus(400);
				throw err;
			});
	},
	confirmBillFromUser: (req, res) => {
		const { id } = req.params;
		Bill.findByIdAndUpdate(id, {confirm:true})
			.then(() => res.sendStatus(200))
			.catch((err) => {
				res.sendStatus(400);
				throw err;
			});
	},
	getCustomerBill: (req, res) => {
		const customer_id = req.user.id;
		Bill.find({ customer_id })
			.populate("services.service_id", "name price")
			.populate("store_id", "name")
			.then((bills) => {
				res.json(bills);
			})
			.catch((err) => {
				res.sendStatus(400);
				throw err;
			});
	},
	payment: (req, res) => {
        paypal.configure({
            mode: "sandbox", //sandbox or live
            client_id: process.env.PAYPAL_CLIENT_ID,
            client_secret: process.env.PAYPAL_CLIENT_SECRET,
        });
		const { cost, bill_id } = req.params;
		var create_payment_json = {
			intent: "sale",
			payer: {
				payment_method: "paypal",
			},
			redirect_urls: {
				return_url: "http://34.72.53.26:8080/api/pay/success",
				cancel_url: "http://34.72.53.26:8080/api/pay/cancel",
			},
			transactions: [
				{
					item_list: {
						items: [
							{
								name: "Hóa đơn sửa chữa và thay phụ tùng",
								sku: "item",
								price: cost,
								currency: "USD",
								quantity: 1,
							},
						],
					},
					amount: {
						currency: "USD",
						total: cost,
					},
                    description: bill_id,
				},
			],
		};

		paypal.payment.create(create_payment_json, function (error, payment) {
			if (error) {
				throw error;
			} else {
				console.log("Create Payment Response");
				res.redirect(payment.links[1].href);
			}
		});
	},

	handlePay: (req, res) => {
        paypal.configure({
            mode: "sandbox", //sandbox or live
            client_id: process.env.PAYPAL_CLIENT_ID,
            client_secret: process.env.PAYPAL_CLIENT_SECRET,
        });
		const { paymentId, PayerID } = req.query;
		var execute_payment_json = {
			payer_id: PayerID,
		};

		paypal.payment.execute(paymentId, execute_payment_json, function (
			error,
			payment
		) {
			if (error) {
				console.log(error.response);
				throw error; 
			} else {
				console.log("Get Payment Response");
                const bill_id = payment.transactions[0].description;
                Bill.findByIdAndUpdate(bill_id,{paid:true, confirm:true})
                .then(()=>{
                    res.write(
                        `<html><head><title>success</title></head><body>success</body></html>`
                    );
                    res.end();
                })
                .catch(err=> {
                    throw err;
                })
			
			}
		});
	},
	countBillToday : (req, res) => {
		const date = new Date();
		const store_id = req.user.id;
		console.log(store_id)
		Bill.aggregate([
			{
				$project: {
					"year": {
					  "$year": "$timestamp"
					},
					"month": {
					  "$month": "$timestamp"
					},
					"day": {
					  "$dayOfMonth": "$timestamp"
					},
					"store_id": 1
				}
			},
			{
				$match: {
					year: date.getFullYear(),
					month: date.getMonth()+1,
					day: date.getDate(),
					store_id
				}
			}
		]).then(resl => {
			res.send({count:resl.length})
		})
		.catch(err=> {
			res.sendStatus(400);
			throw err
		})	
	},
	countBillWeek: (req, res) => {
		let date = new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)));
		const store_id = req.user.id;
		Bill.aggregate([
			{
				$project: {
					timestamp:1,
					store_id:1
				}
			},
			{
				$match : {
					timestamp : {
						$gte: date
					},
					store_id:store_id
				}
			}
		])
		.then(bill=>{
			res.send({count:bill.length})
		})
		.catch(err=>console.log(err))
	},
	countBillCostWeek : (req, res) => {
		const store_id = req.user.id;
		Bill.aggregate([
			{
				$project: {
					timestamp:{
						$dateToString: {
							date: "$timestamp",
							format: "%Y-%m-%d",
						}
					},
					total_cost:1,
					store_id: 1
				}
			},
			{
				$match:{
					store_id:store_id
				}
			},
			{
				$group:{
					_id: "$timestamp",
					total_cost:{$sum:"$total_cost"}
				}
			}
		])
		.sort({_id:-1})
		.limit(7)
		.then(resl => {
			res.send(resl.reverse());
		})
		.catch(err=> {
			res.sendStatus(400);
			throw err
		})	
	},
	billCostToday: (req, res) => {
		const date = new Date();
		const store_id = req.user.id;
		Bill.aggregate([
			{
				$project: {
					"year": {
					  "$year": "$timestamp"
					},
					"month": {
					  "$month": "$timestamp"
					},
					"day": {
					  "$dayOfMonth": "$timestamp"
					},
					"store_id": 1,
					"total_cost":1
				}
			},
			{
				$match: {
					year: date.getFullYear(),
					month: date.getMonth()+1,
					day: date.getDate(),
					store_id
				}
			},
			{
				$group: {
					_id: {year:"$year",month:"$month",day:"$day"},
					cost: {$sum:"$total_cost"}
				}
			}
		]).then(resl => {
			if(resl.length>0) res.send({cost:resl[0].cost})
			else res.send({cost:0})
		})
		.catch(err=> {
			res.sendStatus(400);
			throw err
		})	
	},
	billCostWeek: (req, res) => {
		let date = new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)));
		const store_id = req.user.id;
		Bill.aggregate([
			{
				$project: {
					timestamp:1,
					store_id:1,
					total_cost:1
				}
			},
			{
				$match : {
					timestamp : {
						$gte: date
					},
					store_id
				}
			}
		])
		.then(bills=>{
			let sum=0;
			bills.forEach(bill=>{
				sum+=bill.total_cost
			})
			res.json({cost:sum})
		})
		.catch(err=>console.log(err))
	},
	billChartCountWeek: (req, res) => {
		let date = new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)));
		const store_id = req.user.id;
		Bill.aggregate([
			{
				$project: {
					timestamp:1,
					store_id:1,
					total_cost:1
				}
			},
			{
				$match : {
					timestamp : {
						$gte: date
					},
					store_id
				}
			},
			{
				$project: {
					timestamp: {
						$dateToString: {
							date: "$timestamp",
							format: "%Y-%m-%d",
						}
					}
				}
			},
			{
				$group: {
					_id: "$timestamp",
					count: {$sum:1}
				}
			}
		])
		.sort({_id:1})
		.then(bills=>{
			res.json(bills)
		})
		.catch(err=>console.log(err))
	},
	billChartCostWeek: (req, res) => {
		let date = new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)));
		const store_id = req.user.id;
		Bill.aggregate([
			{
				$project: {
					timestamp:1,
					store_id:1,
					total_cost:1
				}
			},
			{
				$match : {
					timestamp : {
						$gte: date
					},
					store_id
				}
			},
			{
				$project: {
					timestamp: {
						$dateToString: {
							date: "$timestamp",
							format: "%Y-%m-%d",
						}
					},
					total_cost:1
				}
			},
			{
				$group: {
					_id: "$timestamp",
					cost: {$sum:"$total_cost"}
				}
			}
		])
		.sort({_id:1})
		.then(bills=>{
			res.json(bills)
		})
		.catch(err=>console.log(err))
	}

};
