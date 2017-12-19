'use strict'

const fetch = require('node-fetch')

const TOKEN = process.env.TOKEN
const BASE_URL = process.env.NODE_ENV === 'production'
  ? process.env.BASE_URL
  : 'https://private-anon-e16b67fe63-aerolabchallenge.apiary-proxy.com'
  // || 'https://private-anon-e16b67fe63-aerolabchallenge.apiary-mock.com'


/* 
  Fetching methods ready for use, includes
  the base api token and query methods.
*/
module.exports = {
  get: async url => {
    const response = await fetch(`${BASE_URL}/${url}?token=${TOKEN}`)
    const data = await response.json()
    return data
  },

  post: async (url, ...query) => {
    const response = await fetch(`${BASE_URL}/${url}?token=${TOKEN}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(Object.assign({ TOKEN }, ...query)),
    })
    const data = await response.json()
    return data
  },
}