'use strict'

const { send, json } = require('micro')
const { router, get } = require('microrouter')
const { productApi, userApi } = require('./api')


const user = {
	profile: async (req, res) => {
		const profile = await userApi.getProfile()
	  send(res, 200, profile)
	},
	history: async (req, res) => {
		const history = await userApi.getHistory()
	  send(res, 200, history)
	},
	points: async (req, res) => {
		const newPoints = await userApi.addPoints(req.query.amount)
	  send(res, 200, newPoints)
	},
}

const product = {
	list: async (req, res) => {
		const products = await productApi.getList(req.query.category)
	  send(res, 200, products)
	},
	single: async (req, res) => {
		const product = await productApi.getSingle(req.params.productId)
	  send(res, 200, product)
	},
	redeem: async (req, res) => {
		const redeem = await productApi.redeemPoints(req.params.productId)
	  send(res, 200, redeem)
	},
}


module.exports = router(
  get('/user/profile', user.profile),
  get('/user/history', user.history),
  get('/user/points', user.points),
  get('/products', product.list),
  get('/products/:productId', product.single),
  get('/products/:productId/redeem', product.redeem),
  get('*', (req, res) => send(res, 404, 'Not found route')),
)
