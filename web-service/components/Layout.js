import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Modal from './Modal'
import Switch from './Switch'
import Loader from './Loader'


const UserModal = ({ theme, changeTheme, userProfile }) => (
  <React.Fragment>
    <Modal
      modalHandler={({ isOpen, toggleModal }) => (
        <img
          src="/static/user.png"
          alt="User Profile"
          onClick={toggleModal}
        />
      )}
      render={(
        <React.Fragment>
          <article>
            <img src="/static/user@2x.png" alt="Jonh Kite" />
            <div>
              <h2>{userProfile.name}</h2>
              <small>{userProfile.points}</small>
            </div>
          </article>
          <div>
            <Link href="/history"><a className="btn btn-big">View History</a></Link>
          </div>
          <section>
            <h3>Settings</h3>
            <div style={{ justifyContent: 'space-between' }}>
              <h4>Dark Theme</h4>
              <Switch
                isActive={theme === 'dark'}
                onClick={changeTheme}
              />
            </div>
          </section>
        </React.Fragment>
      )}
      posButton="center"
    />

    <style jsx>{`
      * { font-size: 24px; font-weight: 400; }

      article {
        align-items: center;
        color: #616161;
        display: flex;
        justify-content: space-around;
        padding: 24px 48px;
        text-align: center;
        width: 100%;
        max-width: 350px;
        margin: 0 auto;

        img { width: 100px; height: 100px; }
      }

      div {
        align-items: center;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        h2 { width: 100%; }
      }

      h2 { color: var(--darkGray); }
      h3 { color: var(--otherGray); margin-bottom: 0; }
      h4 { color: var(--darkGray); font-size: 22px; }
      small {
        background-color: #ededed;
        border-radius: 12px;
        font-size: 18px;
        padding: 5px 10px;
        &:after {
          background-image: url('/static/coin.png');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          content: '';
          padding: 0 10px;
          position: relative;
          right: 0;
          width: 15px;
          margin-left: 5px;
          height: 15px;
        }
      }

      img {
        cursor: pointer;
        height: 31px;
        margin-right: 14px;
        width: 31px;
      }
    `}</style>
  </React.Fragment>
)


export default class Layout extends React.Component {
  static defaultProps = {
    title: 'The simple store',
    description: 'A simple store, for simple people.',
  };

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    userProfile: PropTypes.object.isRequired,
  };

  state = { theme: 'light' }

  listenThemeChanges = () => {
    window.addEventListener('storage', change => {
      if (change.key === 'theme') {
        this.changeTheme(change.newValue)
      }
    })
  }

  changeTheme = newTheme => {
    const actualTheme = localStorage.getItem('theme') || 'light'

    if (newTheme === false) newTheme = actualTheme
    if (newTheme === true)
      newTheme = actualTheme === 'light' ? 'dark' :'light'

    document.body.className = newTheme
    localStorage.setItem('theme', newTheme)
    this.setState({ theme: newTheme })
  }

  componentDidMount() {
    this.changeTheme(false)
    this.listenThemeChanges()
  }

  render() {
    const {
      title,
      description,
      userProfile,
      children
    } = this.props
    const { theme } = this.state

    return (
      <React.Fragment>
        <Head>
          <meta name="apple-mobile-web-app-title" content="Aerostore" />
          <meta name="description" content={description} />
          <meta name="theme-color" content="#ff6600" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="manifest" href="/static/manifest.webmanifest" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Dosis|Source+Sans+Pro:300,400"
          />
          <link rel="shortcut icon" href="/static/icon.png" />
          <link rel="apple-touch-icon" href="/static/icon.png" />
          <title>{title} - Aerostore</title>
        </Head>

        <nav>
          <Loader />

          <Link href="/">
            <a>
              <img src="/static/icon.png" alt="Aerostore icon" />
              <h2>Aerostore</h2>
            </a>
          </Link>
          <UserModal
            theme={theme}
            userProfile={userProfile}
            changeTheme={() => this.changeTheme(true)}
          />
        </nav>

        {children}

        <style jsx global>{`
          * {
            box-sizing: border-box;
            transition: all .3s, color .1s;
          }

          body {
            --padding: 14px;
            --orange: #ff6600;
            --blue: #18CAF6;

            background-color: var(--bgColor);
            color: var(--color);
            font-family: Source Sans Pro;
            font-weight: 400;
            padding: 61px var(--padding) 0;
            transition: background-color .6s, all .3s;

            @media screen and (min-width: 1024px) {
              --padding: 24px;
            }

            &, &.light {
              --bgColor: #f9f9f9;
              --bgSecondColor: #FFFFFF;
              --boxShadow: rgba(224,224,224,.5);
              --color: #212531;
              --darkGray: #616161;
              --lightGray: #e0e0e0;
              --otherGray: #A3A3A3;
            }

            &.dark {
              --bgColor: #212531;
              --bgSecondColor: #3B3F4A;
              --color: #efefef;
              --boxShadow: rgba(31,31,31,.5);
              --darkGray: #c7c7c7;
              --lightGray: #dadada;
              --otherGray: #ececec;
            }
          }

          a {
            text-decoration: none;
            &:hover {
              text-decoration: none;
            }
          }

          .btn {
            border-radius: 4px;
            border: none;
            box-shadow: none;
            color: #FFF;
            cursor: pointer;
            font-family: Dosis;
            font-weight: bold;
            font-size: 24px;
            margin: 15px;
            text-align: center;
            min-width: 100px;
            outline: none;
            padding: 12px 24px;

            &:hover {
              box-shadow: 0 4px 20px 6px var(--boxShadow);
              padding-top: 13px;
              padding-bottom: 11px;
              transition-delay: .1s;
            }

            @media screen and (min-width: 1024px) {
              font-size: 18px;
            }

            &-big {
              min-height: 48px;
              min-width: 150px;
              margin: 30px;
              @media screen and (min-width: 1024px) {
                min-height: 40px;
                min-width: 130px;
              }
            }
            &-small {
              border-radius: 15px;
              margin: 30px;
              font-size: 16px;
            }

            &-bold { font-weight: bold; }

            &, &-orange {
              background-color: var(--orange);
            }
            &-blue {
              background-color: var(--blue);
            }

            &-strange {
              background-color: var(--bgSecondColor);
              border-radius: 20px;
              color: var(--darkGray);
              font-size: 18px;
              min-width: 150px;
              padding: 10px 20px !important;
            }
          }
        `}</style>
        <style jsx>{`
          nav {
            align-items: center;
            background-color: var(--bgSecondColor);
            box-shadow: -2px 4px 12px var(--boxShadow);
            color: var(--orange);
            display: flex;
            height: 61px;
            justify-content: space-between;
            left: 0;
            padding: 14px var(--padding);
            position: fixed;
            right: 0;
            top: 0;
            z-index: 2;
          }

          a { display: flex; }

          h2 {
            color: var(--orange);
            display: none;
            font-family: Dosis;
            height: 31px;
            margin: 0;
            @media screen and (min-width: 1024px) {
              display: block;
            }
          }

          nav img {
            cursor: pointer;
            height: 31px;
            margin-right: 14px;
            width: 31px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

