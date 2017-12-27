'use strict'

const fetch = require('node-fetch')
const {
  TOKEN,
  BASE_URL = 'https://private-anon-e16b67fe63-aerolabchallenge.apiary-proxy.com'
} = process.env


// Fetch Methods
async function Get(url) {
  const response = await fetch(`${BASE_URL}/${url}?token=${TOKEN}`)
  const data = await response.json()
  return data
}

async function Post(url, ...query) {
  const response = await fetch(
    `${BASE_URL}/${url}?token=${TOKEN}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(Object.assign({ TOKEN }, ...query)),
    }
  )

  const data = await response.json()
  return data
}


// Utils
function FixData(data) {
  const newObj = obj => {
    const newData = { ...obj }
    if (obj.img) {
      newData.imgHD = obj.img.hdUrl
      newData.img = obj.img.url
    }
    newData.id = obj._id
    return newData
  }
  if (Array.isArray(data)) {
    data = data.map(obj => newObj(obj))
  }
  if (data && typeof data === "object" && !Array.isArray(data)) {
    newObj(data)
  }

  return data
}

function LowestCostSorting(a, b) {
  if (a.cost > b.cost) return 1
  if (a.cost < b.cost) return -1
  return 0
}
function HightestCostSorting(a, b) {
  if (a.cost < b.cost) return 1
  if (a.cost > b.cost) return -1
  return 0
}


// Resolvers Data (like a DB)
exports.User = {
  async history(order) {
    const data = await Get('user/history')
    console.log(data)
    return FixData(order === 'newest' ? data.reverse() : data)
  },
  async profile() {
    const data = await Get('user/me')
    return FixData(data)
  },
}


exports.Products = {
  async list({ categories, sortBy, page = 0, perPage = 16 } = {}) {
    /*
      There is just one category in the
      base api: Electronics, so the
      category is not a variable.
    */
    const products = await Get('products')
    let data = products

    
    if (categories) {
      categories = categories.split(',')
      data = data.filter(p =>
        categories.includes(p.category.replace(/&/g, 'and'))
      )
      // Why to change the symbol?
    }

    if (sortBy) {
      sortBy === 'lowest' && data.sort(LowestCostSorting)
      sortBy === 'hightest' && data.sort(HightestCostSorting)
    }

    // Pagination must be at the end of data variations.
    // Or not? 🤔🤔
    page = Number(page)
    perPage = Number(perPage)
    data = data.slice(perPage * page, perPage * page + perPage)
    

    return FixData(data)
  },
  async single(id) {
    const data = await Get('products')
    return FixData(data).find(product => id == product.id)
  },
  async subcategories() {
    const data = await Get('products')
    const subcategories = []
    FixData(data).map(({ category }) => 
      !subcategories.includes(category)
        && subcategories.push(category)
    )
    return subcategories
  }
}

