import { ProductLoader } from '../components/Loaders'
import Link from 'next/link'


const ProductList = ({ error, loading, products = [] }) => {
  if (error || loading) return <ProductLoader />

  return products.map(product =>
    <Product key={product.id} {...data.user} {...product} />
  )
}

const Product = ({ points, name, cost, img, category }) => (
  <div className="Product">
    <img className="Product-cover" src={img} alt={name} />

    <small>{category}</small>
    <span>{name}</span>

    {points >= cost ? (
      <React.Fragment>
        <span className="bag" />

        <div className="hover">
          <span className="bag-white" />
          <span className="price">{cost}</span>

          <Link href={`/redeem`}>
            <a className="btn btn-strange">Redeem now</a>
          </Link>
        </div>
      </React.Fragment>
      ) : <span className="nobag">You need {cost - points}</span>
    }

    <style jsx>{`
      .Product {
        background-color: #fff;
        background-color: var(--bgSecondColor);
        border-radius: 4px;
        box-shadow: -2px 4px 15px var(--boxShadow);
        cursor: pointer;
        display: inline-block;
        flex: none;
        height: 200px;
        margin: 0 24px 12px 0;
        padding: 12px 16px;
        position: relative;
        transform: scale(.95);
        width: 200px;

        &:hover { .hover { opacity: 1; z-index: 1; } }

        &-cover {
          border-bottom: 1.25px solid #d9d9d9;
          border-radius: 6px;
          margin-bottom: 10px;
          width: 100%;
          min-height: 120px;

          :global(body.dark) & { filter: brightness(.7); }
        }
      }

      .bag, .bag-white {
        background-size: contain;
        background-repeat: no-repeat;
        position: absolute;
        top: 10px;
        right: 10px;
        width: 36px;
        height: 36px;
      }
      .bag { background-image: url(/static/images/bag.webp); }
      .bag-white { background-image: url(/static/images/bag-white.webp); }

      span, small { display: block; }

      small { color: var(--otherGray); }
      span {
        color: var(--darkGray);
        overflow: hidden;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;

        &.nobag {
          border-radius: 15px;
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: var(--darkGray);
          opacity: .75;
          color: var(--bgSecondColor);
          padding: 6px 35px 6px 18px;
          font-size: 15px;

          &::after {
            background-image: url(/static/images/coin.webp);
            background-repeat: no-repeat;
            background-size: cover;
            content: '';
            height: 18px;
            position: absolute;
            margin-left: 5px;
            width: 18px;
          }
        }
      }

      .hover {
        background-color: rgba(53, 211, 249, .75);
        border-radius: inherit;
        bottom: 0;
        height: 100%;
        left: 0;
        opacity: 0;
        position: absolute;
        transition: .6s;
        right: 0;
        top: 0;
        width: 100%;
        z-index: -1;
      }

      .price {
        color: #FFF;
        font-size: 24px;
        font-weight: bold;
        position: absolute;
        top: calc(50% - 36px);
        text-align: center;
        left: -5px;
        width: 100%;

        &::after {
          background-image: url(/static/images/coin.webp);
          background-repeat: no-repeat;
          background-size: contain;
          content: '';
          height: 25px;
          margin-left: 5px;
          position: absolute;
          width: 25px;
        }
      }

      .btn {
        background-color: #fff;
        color: #3B3F4A;
        position: absolute;
        top: calc(50% - 12px);
        left: 0;
        right: 0;
      }
    `}</style>
  </div>
)


export {
  Product,
  ProductList,
  ProductLoader,
}
