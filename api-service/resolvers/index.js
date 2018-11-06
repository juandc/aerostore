const { User, Products } = require('./methods');

module.exports = {
  Query: {
    async history(_, args) {
      const list = await User.history(args.order);
      return list;
    },

    async product(_, args) {
      let product = await Products.single(args.id);
      return product;
    },
    async products() {
      let subcategories = await Products.subcategories();
      return { name: 'Electronics', subcategories };
      // `products > products` is defined bellow --👇
    },

    async user() {
      const profile = await User.profile();
      return profile;
    },
  },
  Products: {
    // yes, here is defined :D
    async products(_, args) {
      const products = await Products.list(args.input);
      return products;
    },
  },
};
