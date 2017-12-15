'use strict'


function CategoriesHandler({ get, post }) {
  // Categories Methods are all inside API_CALLS for
  // data interchange and `this` things. You know #JS.
  const API_CALLS = {
    async getList(params, { categories, sortBy, page, perPage = 16 } = {}) {
      /*
        "params" are not been used because there is just
        one category: "Electronics". In case there would be 
        more categories, params.category would call them.
        `const response = await get('category_name/products')`
      */

      const response = await get('products')
      let data = response

      /* Now data will change with all parameters you want */
      if (categories) {
        categories = categories.split(',')
        data = data.filter(p =>
          categories.includes(p.category.replace(/&/g, 'and'))
        )
        // Replace the '&' symbol! HTTP parameters are
        // delimited by them, dont replacing them will
        // make break some categories.
      }

      if (sortBy) {
        sortBy === 'lowest' && data.sort(LowestCostSorting)
        sortBy === 'hightest' && data.sort(HightestCostSorting)
      }

      // Pagination must be at the end of data variations.
      // Or not? 🤔🤔
      if (page) {
        [page, perPage] = [Number(page), Number(perPage)]
        data = data.slice(perPage * page, perPage * page + perPage)
        // ^ Example: `?perPage=6&page=2` (for 32 products)
        // Index: 6*2   = 12
        // Limit: 6*2+6 = 18
        // 🎉🎉🎉
      }

      return data
    },

    async getSingle({ category, productId }) {
      // This is what I mean with "data interchange"
      const data = await this.getList(category)
      return data.find(product => product._id == productId)
    },

    redeemProduct({ productId }) {
      return post('redeem', { productId })
    },

    async getSubcategories({ category, productId }) {
      const data = await this.getList(category)
      let categories = []
      data.map(({ category }) =>
        !categories.includes(category) && categories.push(category)
      )
      return categories
    },
  }

  return API_CALLS
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


module.exports = CategoriesHandler
