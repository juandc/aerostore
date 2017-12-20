import 'isomorphic-fetch'
import Link from 'next/link'
import Router from 'next/router'
import Modal from '../components/Modal'
import Layout from '../components/Layout'
import Product from '../components/Product'
import { useShallowEqual } from 'shouldcomponentupdate-children'


class Page extends React.Component {
  static async getInitialProps({
    asPath,
    pathname,
    query: {
      subcategories: activeSubcategories = '',
      sortBy: activeSort = 'recent',
      category = 'Electronics',
      perPage = 12,
      page = 0,
      ...query
    },
  }) {
    // Filters logic
    const sorts = [
      { name: 'Most Recent', dispatch: 'recent' },
      { name: 'Hightest Price', dispatch: 'hightest' },
      { name: 'Lowest Price', dispatch: 'lowest' },
    ]

    // Fetching logic
    const baseUrl = 'https://aerostore-api.now.sh'

    let userProfile = await fetch(`${baseUrl}/user/profile`)
    userProfile = await userProfile.json()
    
    let subcategories = await fetch(`${baseUrl}/categories/Electronics/subcategories`)
    subcategories = await subcategories.json()

    let products = await fetch(`${baseUrl}/categories/Electronics?page=${page}&perPage=${perPage}&categories=${activeSubcategories.replace(/&/g, 'and')}&sortBy=${activeSort}`)
    products = await products.json()

    let nextProducts = await fetch(`${baseUrl}/categories/Electronics?page=${Number(page) + 1}&perPage=${perPage}&categories=${activeSubcategories.replace(/&/g, 'and')}&sortBy=${activeSort}`)
    nextProducts = await nextProducts.json()


    // Props all the things!
    return {
      activeSubcategories,
      subcategories,
      nextProducts,
      userProfile,
      activeSort,
      pathname,
      products,
      category,
      perPage,
      asPath,
      sorts,
      page,
      query,
    }
  }

  render() {
    const props = this.props

    return (
      <Layout title="Shop" userProfile={props.userProfile}>
        <header><h1>{props.category}</h1></header>

        <div className="mobile">
          <FiltersModal {...props} />
        </div>
        <div className="grid-container">
          <section className="categories">
            <h3>Categories</h3>
            
            <article className="subcategories">
              {props.subcategories.map(category =>
                <Badge
                  key={category}
                  name={category}
                  isActive={props.activeSubcategories.includes(category)}
                  onClick={() => {
                    const subcategories = () => {
                      let active = props.activeSubcategories || ''
                      active = active.split(',')

                      if (active.includes(category)) {
                        active.splice(active.indexOf(category), 1)
                      } else {
                        active.push(category)
                      }

                      return active.join(',')
                    }

                    Router.push({
                      pathname: props.pathname,
                      query: {
                        category: props.category,
                        sortBy: props.activeSort,
                        subcategories: subcategories(),
                      }
                    })}
                  }
                />
              )}
            </article>
          </section>

          <section className="filters">
            <article className="sorts">
              <h3>Sort By</h3>
              {props.sorts.map(sort =>
                <Badge
                  key={sort.dispatch}
                  name={sort.name}
                  isActive={props.activeSort === sort.dispatch}
                  isBlue
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
            </article>
            <article className="other-filters">
              <div className="pagination">
                {props.page >= 1 && (
                  <img
                    onClick={() => {                
                      Router.push({
                        pathname: props.pathname,
                        query: {
                          category: props.category,
                          sortBy: props.activeSort,
                          subcategories: props.activeSubcategories,
                          page: Number(props.page) - 1,
                        }
                      })
                    }}
                    src="/static/images/prevpage.webp"
                    alt="<"
                  />
                )}
                {(props.products.length >= props.perPage
                  && props.nextProducts.length > 0) && (
                  <img
                    onClick={() => {                
                      Router.push({
                        pathname: props.pathname,
                        query: {
                          category: props.category,
                          sortBy: props.activeSort,
                          subcategories: props.activeSubcategories,
                          page: Number(props.page) + 1,
                        }
                      })
                    }}
                    src="/static/images/nextpage.webp"
                    alt=">"
                  />
                )}
              </div>
            </article>
          </section>

          <article className="products">
            {props.products.map(product =>
              <Product
                key={product.id}
                userPoints={props.userProfile.points}
                {...product}
              />
            )}
          </article>
        </div>


        <style jsx global>{`
          body {
            padding-top: 261px !important;

            @media screen and (min-width: 1024px) {
              padding-top: 361px !important;
            }
          }
        `}</style>
        <style jsx>{`
          header {
            background-image: url('/static/images/header.webp');
            background-position: right;
            background-repeat: no-repeat;
            background-size: cover;
            color: #FFF;
            height: 200px;
            left: 0;
            position: absolute;
            right: 0;
            top: 61px;
            width: 100%;

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

          .grid-container {
            display: grid;
            margin-left: auto;
            margin-right: auto;
            max-width: 1024px;
            grid-template-columns: 25% 25% 25% 25%;
            grid-template-rows: 250px 250px;

            section {
              h3 {
                font-weight: 400;
                font-size: 24px;
                color: var(--otherGray);
              }
            }
          }

          .categories {
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 1;
            grid-row-end: 4;

            .subcategories {
              margin-top: 50px;
              display: flex;
              flex-wrap: wrap;

              & :global(.Badge) {
                margin-right: 36px;
                margin-bottom: 23px;
              }
            }
          }

          .filters {
            display: flex;
            grid-column-start: 2;
            grid-column-end: 5;
            flex-wrap: wrap;
            
            .sorts {
              align-items: center;
              align-self: flex-start;
              border-bottom: 1px solid var(--lightGray);
              display: flex;
              justify-content: flex-end;
              flex-wrap: wrap;
              width: 100%;

              h3 { margin-right: auto; }
              :global(.Badge) {
                margin-bottom: 0;
              }
            }

            .other-filters {
              display: flex;
              width: 100%;

              .pagination {
                margin-left: auto;
                
                img {
                  cursor: pointer;
                  height: 61px;
                  width: 61px;
                  margin-left: 10px;
                }
              }
            }
          }

          .products {
            align-items: flex-start;
            display: flex;
            flex-wrap: wrap;
            grid-column-end: 5;
            grid-column-start: 2;
            grid-row-end: 4;
            grid-row-start: 2;
            justify-content: space-evenly;

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
          

          @media screen and (max-width: 1023px) {
            .grid-container {
              display: block;
              .filters .pagination { margin: 10px 0 20px auto; }
              .filters .sorts, .categories {
                display: none;
              }
            }
          }

          @media screen and (min-width: 1024px) {
            .mobile { display: none; }
            .products {
              justify-content:
                ${props.products.length <= 2 ? 'flex-start' : 'space-evenly'}
              ;
            }
          }
        `}</style>
      </Layout>
    )
  }
}


// Mobile filters logistic
class FiltersModal extends React.Component {
  state = {
    sortVariation: null,
    subcategoriesVariation: this.props.activeSubcategories || '',
  }

  render() {
    const {
      subcategoriesVariation,
      sortVariation,
    } = this.state
    const {
      sorts,
      activeSort,
      subcategories,
      activeSubcategories,
      ...props,
    } = this.props

    return (
      <Modal
        modalHandler={({ toggleModal }) => (
          <div className="FilterButton" onClick={toggleModal}>
            <img src="/static/images/filter.webp" alt="☰" />
            Filters
            <style jsx>{`
              .FilterButton {
                align-items: center;
                background-color: var(--blue);
                border-radius: 4px;
                box-shadow: 2px 4px 8px rgba(0,0,0,.25);
                color: #FFF;
                cursor: pointer;
                display: flex;
                font-family: Dosis;
                font-size: 26px;
                font-weight: bold;
                height: 79px;
                margin: 25px auto;
                padding: 12px 24px;
                width: 100%;

                &:hover, &:active , &:focus {
                  box-shadow: 2px 4px 8px rgba(0,0,0,.35);
                }
              }

              img { margin-right: 15px; width: 30px; }
            `}</style>
          </div>
        )}
        render={(
          <React.Fragment>
            <h3>Sort by</h3>
            <article className="container center">
              {sorts.map(({ name, dispatch }) =>
                <Badge
                  key={dispatch}
                  name={name}
                  isActive={
                    sortVariation
                      ? sortVariation.includes(dispatch)
                      : activeSort.includes(dispatch)
                  }
                  onClick={() => {
                    this.setState(({ sortVariation }) => ({
                      sortVariation: dispatch
                    }))
                  }}
                  isBlue
                />
              )}
            </article>

            <h3>Categories</h3>
            <article className="container">
              {subcategories.map(name =>
                <Badge
                  key={name}
                  name={name}
                  isActive={subcategoriesVariation.includes(name)}
                  onClick={() => {
                    this.setState(({ subcategoriesVariation }) => {
                      let variation = subcategoriesVariation
                      
                      variation = variation.split(',')

                      if (variation.includes(name)) {
                        variation.splice(variation.indexOf(name), 1)
                      } else {
                        variation.push(name)
                      }

                      variation = variation.join(',')

                      return { subcategoriesVariation: variation }
                    })
                  }}
                />
              )}
            </article>

            <style jsx>{`
              h3 { color: var(--otherGray); font-weight: 400; }

              .container {
                align-items: center;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                margin-bottom: 50px;

                &.center { justify-content: center; }
              }
            `}</style>
          </React.Fragment>
        )}
        buttons={{
          action() {
            if (sortVariation || subcategoriesVariation !== activeSubcategories) {
              Router.push({
                pathname: props.pathname,
                query: {
                  category: props.category,
                  page: 0,
                  subcategories: subcategoriesVariation,
                  sortBy:
                    !!sortVariation
                      ? sortVariation 
                      : activeSort,
                }
              })
            }
          }
        }}
      />
    )
  }
}
FiltersModal = useShallowEqual(FiltersModal)


// Sort by & Subcategories component
class Badge extends React.Component {
  render() {
    const { name, isBlue, isActive, onClick } = this.props

    return (
      <div
        className={`
          Badge
          Badge-${name}
          ${isBlue && 'blue'}
          ${isActive && 'active'}
        `}
        onClick={() => {
          onClick && onClick()
        }}
      >
        {name}

        <style jsx>{`
          div {
            align-items: center;
            background-color: var(--lightGray);
            border-radius: 12px;
            color: #A3A3A3;
            cursor: pointer;
            display: flex;
            font-size: 14px;
            justify-content: center;
            margin: 0 12px 18px 0;
            min-height: 31px;
            min-width: 100px;
            padding: 7px 18px;
            text-align: center;

            &:hover {
              box-shadow: 2px 4px 12px 2px var(--boxShadow);
            }

            &.active {
              background-color: var(--orange);
              color: #FFF;
            }

            &.blue {
              min-width: 110px;
              padding: 7px 12px;

              &.active {
                background-color: var(--blue);
              }
            }
          }
        `}</style>
      </div>
    )
  }
}
Badge = useShallowEqual(Badge)


export default useShallowEqual(Page)
