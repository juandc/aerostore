'use strict'

const cors = require('micro-cors')
const { send } = require('micro')
const { router, get } = require('microrouter')
const { userAPI, categoryAPI } = require('./api')


const user = {
  profile: async (req, res) => {
    const profile = await userAPI.getProfile()
    send(res, 200, profile)
  },
  history: async (req, res) => {
    const history = await userAPI.getHistory()
    send(res, 200, history)
  },
  reclaim: async (req, res) => {
    const newPoints = await userAPI.reclaimPoints(req.query)
    send(res, 200, newPoints)
  },
}

const category = {
  list: async (req, res) => {
    const products = await categoryAPI.getList(req.params, req.query)
    send(res, 200, products)
  },
  single: async (req, res) => {
    const product = await categoryAPI.getSingle(req.params)
    send(res, 200, product)
  },
  redeem: async (req, res) => {
    const redeem = await categoryAPI.redeemProduct(req.params)
    send(res, 200, redeem)
  },
  subcategories: async (req, res) => {
    const subcategories = await categoryAPI.getSubcategories(req.params)
    send(res, 200, subcategories)
  },
}


const handler = router(
  get('/user/profile', user.profile),
  get('/user/history', user.history),
  get('/user/reclaim', user.reclaim),
  get('/categories/:category', category.list),
  get('/categories/:category/subcategories', category.subcategories),
  get('/categories/:category/:productId', category.single),
  get('/categories/:category/:productId/redeem', category.redeem),

  // No coded routes
  get('/categories', (req, res) => send(res, 200, ['Electronics'])),
  get('/*', (req, res) => (
    send(res, 404, {
      "success": false,
      "message": 'Failed to get this route'
    })
  )),
)

module.exports = cors({
  allowMethods: ['GET']
})(handler)
