'use strict'

const fetch = require('node-fetch')
const token = process.env.TOKEN


// TODO: Authentication
/* 
  Fetching methods ready for use, includes
  the base api token and query methods.
*/
const api = {
  // GET requests needs just the token parameter,
  // doesn’t needs query parameters.
  get: async url => {
    const response = await fetch(`https://aerolab-challenge.now.sh/${url}?token=${token}`)
    const data = await response.json()
    return data
  },
  // With POST requests all parameters after the url,
  // will be used as body parameters.
  post: async (url, ...query) => {
    const response = await fetch(`https://aerolab-challenge.now.sh/${url}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      // String literals doesn't work :(
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
    // Amount must be reconverted into a number for
    // don’t be taken as a string but as a number.
    api.post('user/points', { amount: Number(amount) }),
}

const productApi = {
  getList: async category => {
    const data = await api.get('products')
    if (!category) return data

    /*
      HTTP requests use the ampersand symbol (&) as
      parameter delimiter: `par1=stuff&par2=morestuff`,
      that’s why application needs to change it for any
      other symbol, in this case the 'and' word.
    */
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
