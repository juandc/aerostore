import 'isomorphic-fetch'
import Layout from '../components/Layout'
import Product from '../components/Product'
import Link from 'next/link'


export default class Home extends React.Component {
	static async getInitialProps({ query }) {
		const baseUrl = 'http://localhost:8080'
    const page = parseInt(query.page || 0)
    let data = {}

    const userProfile = await fetch(`${baseUrl}/user/profile`)
    data.userProfile = await userProfile.json()

    const products =
    	await fetch(`${baseUrl}/categories/Electronics?page=0&perPage=5`)
    data.products = await products.json()

    const products2 =
    	await fetch(`${baseUrl}/categories/Electronics?page=0&perPage=5&sortBy=lowest`)
    data.products2 = await products2.json()

    return { data, page }
  }


	render() {
		const { data } = this.props

		return (
			<Layout
				title="Home"
				userProfile={data.userProfile}
			>
				<header>
					<div>
						<h1>Aerostore</h1>
						<p>A simple store, for the simple people.</p>
					</div>

					<div className="mobile-preview">
						<img src="/static/mobile-preview.png" alt="hay mama" />
					</div>
				</header>
				
				<section>
					<h2>Electronics</h2>
					<Link href={`/shop?category=Electronics`}>
						<a className="btn btn-small btn-blue">SEE MORE</a>
					</Link>
					<article>
						{data.products.map(({ id, ...product }) =>
							<Product key={id} {...product} userPoints={1000} />
							// <Product key={id} {...product} userPoints={data.userProfile.points} />
						)}
					</article>
				</section>
				
				<section>
					<h2>Other Electronics</h2>
					<Link href={`/shop?category=Other+Electronics&sortBy=lowest`}>
						<a className="btn btn-small btn-blue">SEE MORE</a>
					</Link>
					<article>
						{data.products2.map(({ id, ...product }) =>
							<Product key={id} {...product} userPoints={1000} />
							// <Product key={id} {...product} userPoints={data.userProfile.points} />
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
							font-weight: semibold;
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
								display: block;
								margin-left: 100px;

								img { width: 300px; }
							}
						}
					}

					section {
						margin: 0 auto 75px;
						position: relative;
						max-width: 900px;
						color: var(--darkGray);

						@media screen and (min-width: 1024px) {
							margin: 125px auto 100px;
						}

						h2 { font-size: 26px; font-weight: 400; }
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

