import 'isomorphic-fetch'
import { useShallowEqual } from 'shouldcomponentupdate-children'
import Product from '../components/Product'
import Layout from '../components/Layout'
import Link from 'next/link'


class Home extends React.Component {
  state = {
    products: null,
    products2: null,
    userProfile: {
      name: 'Name',
      points: 0,
    },
  }


  requestData = async () => {
    const baseUrl = 'https://aerostore-api.now.sh'

    let products = await fetch(`${baseUrl}/categories/Electronics?page=0&perPage=5`)
    products = await products.json()

    let products2 = await fetch(`${baseUrl}/categories/Electronics?page=0&perPage=5&sortBy=lowest`)
    products2 = await products2.json()

    let userProfile = await fetch(`${baseUrl}/user/profile`)
    userProfile = await userProfile.json()

    this.setState({ products, products2, userProfile })
  }

  registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('service worker registration successful')
        })
        .catch(err => {
          console.warn('service worker registration failed', err.message)
        })
    }
  }

  async componentDidMount() {
    await this.requestData()
    this.registerServiceWorker()
  }


  render() {
    const {
      products,
      products2,
      userProfile,
    } = this.state

    return (
      <Layout
        title="Home"
        userProfile={userProfile}
      >
        <header>
          <div>
            <h1>Aerostore</h1>
            <p>A simple store, for the simple people.</p>
          </div>

          <div className="mobile-preview" />
        </header>
        
        <section>
          <h2>Electronics</h2>
          <Link href={`/shop?category=Electronics`} prefetch>
            <a className="btn btn-small btn-blue">SEE MORE</a>
          </Link>
          <article>
            {products && products.map(({ id, ...product }) =>
              <Product
                key={id}
                userPoints={userProfile.points}
                {...product}
              />
            )}
          </article>
        </section>
        
        <section>
          <h2>Other</h2>
          <Link href={`/shop?category=Other&sortBy=lowest`}>
            <a className="btn btn-small btn-blue">SEE MORE</a>
          </Link>
          <article>
            {products2 && products2.map(({ id, ...product }) =>
              <Product
                key={id}
                {...product}
                userPoints={1000}
              />
            )}
          </article>
        </section>

        <style jsx>{`
          header {
            font-size: 24px;
            text-align: center;
            margin: 90px auto 110px;
            width: 90%;
            max-width: 900px;

            h1 {
              color: var(--orange);
              font-family: Dosis;
              font-size: 2.6em;
              margin: 0;
              height: 74px;
              line-height: 74px;
              font-weight: bold;
            }

            p {
              margin: 36px 0 24px;
              color: var(--darkGray);
              font-size: 1.75rem;
              line-height: 160%;
              font-weight: 400;
            }

            .mobile-preview { display: none; }

            @media screen and (min-width: 1024px) {
              align-items: center;
              display: flex;
              justify-content: space-between;
              margin: 100px auto 150px;

              div:not(.mobile-preview) {
                max-width: 350px;
              }

              .mobile-preview {
                background-image: url(/static/images/mobile-preview.webp);
                display: block;
                height: 462px;
                margin-left: 100px;
                width: 300px;
              }
            }
          }

          section {
            margin: 0 auto 75px;
            position: relative;
            max-width: 900px;
            color: var(--darkGray);

            @media screen and (min-width: 1366px) {
              max-width: 1048px;
            }
            
            @media screen and (min-width: 1024px) {
              margin: 125px auto 100px;
            }

            h2 { font-size: 28px; font-weight: 400; }

            .btn {
              position: absolute;
              right: 0;
              top: 0;
              margin: 0;
            }
          }

          article {
            align-items: center;
            display: flex;
            justify-content: flex-start;
            overflow-y: hidden;
            overflow-x: scroll;
            flex-wrap: nowrap;
            padding: 10px 0 var(--padding);
            width: auto;

            @media screen and (min-width: 1024px) {
              &::-webkit-scrollbar {
                width: 1px;

                &-track {
                  background-color: #F5F5F5;
                  border-radius: 12px;
                  width: 1px;
                }

                &-thumb {
                  border-radius: 10px;
                  background-color: #090b11;
                  width: 1px;
                }
              }
            }
          }
        `}</style>
      </Layout>
    )
  }
}


export default useShallowEqual(Home)

