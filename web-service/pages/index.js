import Preview from '../components/content/Preview'
import Layout from '../components/Layout'
import withData from '../utils/apollo'

/* Data props for preview will arrive from Layout 😮 */
export default withData(props => (
  <Layout 
    title="Home"
    query={`
      products {
        electronics: products(input: { perPage: 5 }) {
          category
          cost
          id
          img
          name
        }
        cheapest: products(input: { sortBy: "lowest", perPage: 5 }) {
          category
          cost
          id
          img
          name
        }
      }
    `}
    header
    register
  ><Preview /></Layout>
))
