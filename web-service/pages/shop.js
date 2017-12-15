import 'isomorphic-fetch'
import Layout from '../components/Layout'
import Product from '../components/Product'
import Modal from '../components/Modal'
import Link from 'next/link'
import PropTypes from 'prop-types'


const Category = ({ name, isActive, ...props }) => (
	<div className={isActive && 'active'} {...props}>
		{name}
		<style jsx>{`
			div {
				align-items: center;
				background-color: var(--lightGray);
				border-radius: 12px;
				color: #636363;
				cursor: pointer;
				display: flex;
				font-size: 14px;
				min-height: 31px;
				justify-content: center;
				margin: 0 12px 18px 0;
				padding: 7px 18px;
				text-align: center;
				min-width: 100px;

				&:hover, &.active {
					background-color: var(--orange);
					color: #FFF;
				}
			}
		`}</style>
	</div>
)

class FiltersModal extends React.Component {
	render() {
		const { pathname, data, query, sortBy } = this.props
		const newUrl = pathname
		console.log(newUrl)

		return (
			<React.Fragment>
				<Modal
					modalHandler={({ toggleModal }) =>
						<div
							className="filter-btn"
							onClick={toggleModal}
						>
							<img src="/static/filter.png" alt="-" />
							Filters
						</div>
					}
					render={(
						<React.Fragment>
						<h3>Sort by</h3>
						<article className="categories center">
							{sortBy.sorts.map(sort =>
								<div className={`
									badge ${sort === sortBy.active && 'active'}
								`}>{sort}</div>
							)}
						</article>
						<h3>Categories</h3>
						<article className="categories">
							{data.map((name, index) =>
								<Category
									key={index}
									name={name}
									isActive={query.includes(name)}
								/>
							)}
						</article>
						</React.Fragment>
					)}
				/>
				<style jsx>{`
					h3 {
						color: var(--otherGray);
						font-weight: 400;
					}

					img {
						margin-right: 15px;
						width: 30px;
					}

					.filter-btn {
						background-color: var(--blue);
						border-radius: 4px;
						box-shadow: 2px 4px 8px rgba(0,0,0,.25);
						color: #FFF;
						cursor: pointer;
						font-family: Dosis;
						font-weight: bold;
						font-size: 26px;
						align-items: center;
						display: flex;
						margin: 25px auto;
						width: 100%;
						padding: 12px 24px;
						height: 79px;

						&:hover, &:active , &:focus {
							box-shadow: 2px 4px 8px rgba(0,0,0,.35);
						}
					}

					.categories {
						align-items: center;
						display: flex;
						justify-content: flex-start;
						flex-wrap: wrap;
						margin-bottom: 50px;

						&.center { justify-content: center; }
					}

					.badge {
						align-items: center;
						background-color: var(--lightGray);
						border-radius: 12px;
						color: #636363;
						cursor: pointer;
						display: flex;
						font-size: 14px;
						min-height: 31px;
						justify-content: center;
						margin: 0 12px 18px 0;
						padding: 7px 12px;
						text-align: center;
						min-width: 110px;

						&:hover, &.active {
							background-color: var(--blue);
							color: #FFF;
						}
					}
				`}</style>
			</React.Fragment>
		)
	}
}


export default class Shop extends React.Component {
	static defaultProps = {
		query: {
			category: 'Electronics',
			subcategories: [],
		}
	}

	static async getInitialProps({ pathname, query }) {
		const baseUrl = 'http://localhost:8080'
    const page = parseInt(query.page || 0)
    let data = {}

    const userProfile = await fetch(`${baseUrl}/user/profile`)
    data.userProfile = await userProfile.json()

    const subcategories = await fetch(`${baseUrl}/categories/Electronics/subcategories`)
    data.subcategories = await subcategories.json()

    const products =
    	await fetch(`${baseUrl}/categories/Electronics?page=0&perPage=16`)
    data.products = await products.json()

    return { pathname, data, page, query }
  }

	render() {
		const { pathname, data, query } = this.props
		console.log(pathname)
		query.subcategories = query.subcategories || []
		query.sortBy = query.sortBy || 'Most Recent'

		return (
			<Layout
				title={`${query.category} in Shop`}
				userProfile={data.userProfile}
			>
				<header>
					<h1>{query.category}</h1>
				</header>
				
				<section>
					<FiltersModal
						path={pathname}
						data={data.subcategories}
						query={query.subcategories}
						sortBy={{
							sorts: [
								'Most Recent',
								'Lowest Price',
								'Hightest Price'
							],
							active: query.sortBy || 'Most Recent',
						}}
					/>
				</section>
				

				<style jsx>{`
					:global(body) {
						padding-top: 261px;
					}

					header {
						background-image: url('/static/header.png');
						background-size: cover;
						background-repeat: no-repeat;
						background-position: right;
						width: 100%;
						height: 200px;
						position: absolute;
						top: 61px;
						left: 0;
						right: 0;
						color: #FFF;

						h1 {
							text-shadow: 1px 2px 1px rgba(0,0,0,.75);
							margin-top: 125px;
							margin-left: var(--padding);
						}

						@media screen and (min-width: 1024px) {
							height: 300px;

							h1 {
								margin-top: 225px;
								margin-left: 95px;
							}
						}
					}

					section {
						color: var(--darkGray);
						display: flex;
						flex-wrap: wrap;
						font-size: 20px;
						margin-top: 200px;
						margin: 0 auto;
						max-width: 900px;
						position: relative;

						@media screen and (min-width: 1024px) {
							margin-top: 300px;
						}
					}

					.categories {
						align-items: center;
						display: flex;
						justify-content: flex-start;
						flex-wrap: wrap;
					}

					@media screen and (min-width: 1024px) {
						:global(body) {
							padding-top: 361px;
						}
					}
				`}</style>
			</Layout>
		)
	}
}

