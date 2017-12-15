import 'isomorphic-fetch'
import Router from 'next/router'
import Layout from '../components/Layout'
import Product from '../components/Product'

const Page = (props) => {
	console.log(props.page)
	console.log(props.perPage)
	console.log(props.subcategories)
	console.log(props.userProfile)

	return (
		<Layout title="Shop" userProfile={props.userProfile}>
			{props.products.map(product =>
				<Product
					key={product.id}
					userPoints={props.userProfile.points}
					{...product}
				/>
			)}
			{props.sorts.map(sort => console.log(sort))}
			{props.sorts.map(sort =>
				<Category
					blue
					key={sort.name}
					name={sort.name}
					isActive={props.sortBy === sort.dispatch}
					onClick={() => Router.push({
						pathname: props.pathname,
						query: {
							category: props.category,
							subcategories: props.activeSubcategories,
							sortBy: sort.dispatch,
						}
					})}
				/>
			)}
			{props.subcategories.map(category =>
				<Category
					key={category}
					name={category}
					isActive={props.activeSubcategories.includes(category)}
					onClick={() => Router.push({
						pathname: props.pathname,
						query: {
							category: props.category,
							sortBy: props.sortBy,
							subcategories: FilterCategories(props, category),
						}
					})}
				/>
			)}
		</Layout>
	)
}

Page.getInitialProps = async ({
	asPath,
	pathname,
	query: {
		subcategories: activeSubcategories = [],
		category = 'Electronics',
		sortBy = 'recent',
		perPage = 16,
		page = 0,
		...query
	},
}) => {
	// Stuff...
	const sorts = [
		{ name: 'Most Recent', dispatch: 'recent' },
		{ name: 'Hightest Price', dispatch: 'hightest' },
		{ name: 'Lowest Price', dispatch: 'lowest' },
	]

	// Fetchs
	const baseUrl = 'http://localhost:8080'

	let userProfile = await fetch(`${baseUrl}/user/profile`)
	userProfile = await userProfile.json()
	
	let subcategories = await fetch(`${baseUrl}/categories/Electronics/subcategories`)
	subcategories = await subcategories.json()

	let products = await fetch(`${baseUrl}/categories/Electronics?page=${page}&perPage=${perPage}&categories=${activeSubcategories.replace(/&/g, 'and')}&sortBy=${sortBy}`)
	products = await products.json()


	return {
		activeSubcategories,
		subcategories,
		userProfile,
		pathname,
		products,
		category,
		perPage,
		sortBy,
		asPath,
		sorts,
		page,
		query,
	}
}

const Category = ({ name, blue, isActive, ...props }) => (
	<div
		className={`${isActive && 'active'} ${blue && 'blue'}`}
		{...props}
	>
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
					&.blue {
						background-color: var(--blue);
					}
				}
			}
		`}</style>
	</div>
)

const FilterCategories = (props, category) => {
	console.log(category)
	// category = category.replace(/&/g, 'and')
	let active = props.activeSubcategories || ''
	active = active.split(',')

	if (active.includes(category)) {
		active.splice(active.indexOf(category), 1)
	} else {
		active.push(category)
	}

	return active.join(',')
}


export default Page
