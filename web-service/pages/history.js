import 'isomorphic-fetch'
import Layout from '../components/Layout'
import Product from '../components/Product'


export default class History extends React.Component {
  static async getInitialProps({ req, res, query }) {
    const baseUrl = 'http://localhost:8080'
    const page = parseInt(query.page || 0)
    let data = {}

    const userProfile = await fetch(`${baseUrl}/user/profile`)
    data.userProfile = await userProfile.json()

    const history =
      await fetch(`${baseUrl}/user/history`)
    data.history = await history.json()

    return { data, page }
  }


  render() {
    const { data } = this.props

    return (
      <Layout
        title="History"
        userProfile={data.userProfile}
      >
        <section>
          <h2>Redeem History</h2>
          <article>
            {data.history.map(({ id, ...product }) =>
              <Product key={id} {...product} userPoints={1000} />
              // <Product key={id} {...product} userPoints={data.userProfile.points} />
            )}
          </article>
        </section>

        <style jsx>{`
          section {
            margin: 0 auto;
            position: relative;
            max-width: 900px;
            color: var(--darkGray);
          }

          article {
            align-items: center;
            display: flex;
            justify-content: flex-start;
            overflow-y: hidden;
            overflow-x: scroll;
            flex-wrap: wrap;
            width: auto;
          }
        `}</style>
      </Layout>
    )
  }
}

