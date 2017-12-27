import ContentLoader from "react-content-loader"


const ProductLoader = () => (
  <ContentLoader
    width={190}
    height={190}
    speed={2}
    primaryColor={"#f3f3f3"}
    secondaryColor={"#ecebeb"}
    className="ProductLoader"
  >
    <rect x="0" y="0" rx="8" ry="8" width="190" height="190" />
    <style jsx global>{`
      .ProductLoader { height: 190px; }
    `}</style>
  </ContentLoader>
)

const UserIconLoader = () => (
  <ContentLoader
    height={62}
    width={62}
    speed={2}
    primaryColor={"#f3f3f3"}
    secondaryColor={"#ecebeb"}
  >
    <circle cx="31" cy="31" r="31" />
  </ContentLoader>
)


export {
  ProductLoader,
  UserIconLoader,
}
