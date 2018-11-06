module.exports = `
  input ProductFilters {
    categories: String
    name: String
    page: Int
    perPage: Int
    search: String
    sortBy: String
  }

  type Product {
    category: String!
    cost: Int!
    id: ID!
    img: String!
    imgHD: String!
    name: String!
  }

  type Products {
    name: String!
    products(input: ProductFilters): [Product!]
    subcategories: [String!]
  }

  type User {
    id: ID!
    name: String!
    points: Int!
  }

  type Query {
    history(order: String): [Product!]
    product(id: String): Product!
    products: Products!
    user: User!
  }
`;
