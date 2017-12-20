import Router from 'next/router'


class Error extends React.PureComponent {
  state = { ishover: false }

  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    const { ishover } = this.state
    const { statusCode = 404 } = this.props

    return (
      <React.Fragment>
        <div className={`error ${ishover && 'active'}`}>
          <div>
            <h1>{statusCode} <small>err</small></h1>
            <p>I'm so sorry, really sorry...</p>
            <p>
              Please go 
              <a
                onMouseEnter={() => this.setState({ ishover: true })}
                onMouseLeave={() => this.setState({ ishover: false })}
                onClick={() => {
                  setTimeout(() => {
                    Router.push('/')
                  }, 500)
                }}
              >Home</a>
            </p>
          </div>
        </div>

        <style jsx>{`
          :global(*) { box-sizing: border-box; transition: .3s; }

          :global(body) {
            margin: 0;
            padding: 0;
          }

          .error {
            align-items: center;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            font-family: Dosis;
            height: 100vh;
            justify-content: center;
            padding: 100px 50px;
            width: 100vw;
            transition-delay: 1s;

            &.active {
              background-color: #ff6600;
              transition-delay: 0s;

              h1 {
                color: #FFF;
                transition-delay: 0s;
              }
              small {
                border-bottom: 2px solid #FFF;
                transition-delay: 0s;
              }
            }
          }

          h1, p {
            animation-name: moveIt;
            animation-duration: 7s;
            animation-iteration-count: infinite;
          }

          h1 {
            animation-direction: alternate;
            color: #ff6600;
            display: block;
            font-size: 120px;
            margin: 0 0 25px;
            position: relative;
            transition-delay: 1s;
            width: 175px;

            small {
              font-size: .4em;
              font-weight: 300;
              left: 105%;
              position: absolute;
              text-transform: uppercase;
              top: 10%;
              transition-delay: 0s;
            }
          }

          p {
            animation-delay: 2s;
            animation-direction: alternate-reverse;
            color: #16130d;
            font-size: 2rem;
            letter-spacing: -.5%;
            line-height: 160%;
            margin: 0;
            text-align: center;
            width: 100%;
          }

          a {
            border-bottom: 4px dotted #ff6600;
            color: #000;
            cursor: pointer;
            font-size: .9em;
            font-weight: bold;
            margin: 0 5px;
            padding: 0 2px 1px;
            text-decoration: none;

            &:hover {
              border-bottom-width: 2px;
              border-bottom-color: #FFF;
              color: #FFF;
              margin: 0 7px;
              padding: 0;
            }
          }

          /* dosis-regular - latin */
          @font-face {
            font-family: 'Dosis';
            font-style: normal;
            font-weight: 400;
            src: url('/static/fonts/dosis-v7-latin-regular.eot'); /* IE9 Compat Modes */
            src: local('Dosis Regular'), local('Dosis-Regular'),
                 url('/static/fonts/dosis-v7-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
                 url('/static/fonts/dosis-v7-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
                 url('/static/fonts/dosis-v7-latin-regular.woff') format('woff'), /* Modern Browsers */
                 url('/static/fonts/dosis-v7-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
                 url('/static/fonts/dosis-v7-latin-regular.svg#Dosis') format('svg'); /* Legacy iOS */
          }

          /* animation */
          @keyframes moveIt {
            0% { transform: translate(0, 0); }
            25% { transform: translate(-1px, -2px); }
            35% { transform: translate(-2px, -1px); }
            50% { transform: translate(0, 0); }
            75% { transform: translate(2px, 1px); }
            85% { transform: translate(1px, 2px); }
            100% { transform: translate(0, 0); }
          }
        `}</style>
      </React.Fragment>
    )
  }
}


export default Error

