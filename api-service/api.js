'use strict'

const fetch = require('node-fetch')
const token = process.env.TOKEN


const api = {
	get: async url => {
		const response = await fetch(`https://aerolab-challenge.now.sh/${url}?token=${token}`)
		const data = await response.json()
		return data
	},
	post: async (url, ...query) => {
		const response = await fetch(`https://aerolab-challenge.now.sh/${url}`, {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(Object.assign({ token }, ...query)),
		})
		const data = await response.json()
		return data
	}
}

const userApi = {
	getProfile: () => api.get('user/me'),
	getHistory: () => api.get('user/history'),
	addPoints: amount =>
		api.post('user/points', { amount: Number(amount) }),
}

const productApi = {
	getList: async category => {
		const data = await api.get('products')
		if (!category) return data
		return data.filter(
			product => product.category.toLowerCase()
	  		== category.split('and').join('&').toLowerCase()
	  )
	},
	getSingle: async productId => {
		const data = await api.get('products')
		return data.filter(product => product._id == productId)
	},
	redeemPoints: productId =>
		api.post('redeem', { productId }),
}


module.exports = {
	userApi,
	productApi,
}
