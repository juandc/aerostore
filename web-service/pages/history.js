import 'isomorphic-fetch'
import Layout from '../components/Layout'
import Product from '../components/Product'
import { useShallowEqual } from 'shouldcomponentupdate-children'


class History extends React.Component {
  static async getInitialProps({ req, res, query }) {
    const baseUrl = 'https://aerostore-api.now.sh'
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

            & > :global(.Product) {
              height: 48%;
              max-height: 200px;
              max-width: 200px;
              width: 178px;
              width: 48%;
            }

            @media screen and (max-width: 600px) {
              & > :global(.Product:nth-child(odd)) {
                margin-left: 0;
              }
              & > :global(.Product:nth-child(even)) {
                margin-right: 0;
              }
            }
          }
        `}</style>
      </Layout>
    )
  }
}


export default useShallowEqual(History)

