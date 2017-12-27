import { ProductList } from '../Product'

export default ({ data: { user, electronics, cheapest } }) => (
  <React.Fragment>
    <section>
      <h2>Electronics</h2>

      <Link href={`/shop?category=Electronics`} prefetch>
        <a className="btn btn-small btn-blue">SEE MORE</a>
      </Link>

      <article> <ProductList {...user} products={electronics} /> </article>
    </section>

    <section>
      <h2>Cheapest</h2>

      <Link href={`/shop?category=Cheapest`} prefetch>
        <a className="btn btn-small btn-blue">SEE MORE</a>
      </Link>

      <article> <ProductList {...user} products={cheapest} /> </article>
    </section>

    <style jsx>{`
      section {
        margin: 0 auto 75px;
        position: relative;
        max-width: 900px;
        color: var(--darkGray);

        @media screen and (min-width: 1366px) { max-width: 1048px; }
        @media screen and (min-width: 1024px) { margin: 125px auto 100px; }

        h2 { font-size: 28px; font-weight: 400; }
        .btn { margin: 0; position: absolute; right: 0; top: 0; }
      }

      article {
        align-items: center;
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        overflow-x: scroll;
        overflow-y: hidden;
        padding: 10px 0 var(--padding);
        width: auto;

        &::-webkit-scrollbar {
          width: 1px;

          &-track { background-color: #F5F5F5; border-radius: 12px; width: 1px; }
          &-thumb { background-color: #090b11; border-radius: 10px; width: 1px; }
        }
      }
    `}</style>
  </React.Fragment>
)