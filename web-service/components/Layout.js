import { useShallowEqual } from 'shouldcomponentupdate-children'
import Head from 'next/head'
import Link from 'next/link'
import Modal from './Modal'
import Switch from './Switch'
import Loader from './Loader'


class Layout extends React.Component {
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
    if (newTheme === true) {
      newTheme = actualTheme === 'light' ? 'dark' :'light'
    }

    document.body.className = newTheme
    localStorage.setItem('theme', newTheme)
    this.setState({ theme: newTheme })
  }


  componentDidMount() {
    this.changeTheme(false)
    this.listenThemeChanges()
  }


  render() {
    const { theme } = this.state
    const {
      title = 'The simple store',
      description = 'A simple store, for simple people.',
      userProfile,
      children,
    } = this.props

    return (
      <React.Fragment>
        <Head>
          <meta name="description" content={description} />
          <title>{title} - Aerostore</title>
        </Head>

        <nav>
          <Loader />

          <Link href="/">
            <a>
              <img src="/static/images/icon.webp" alt="Aerostore icon" />
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

          @font-face {
            font-family: 'Dosis';
            font-style: normal;
            font-weight: 400;
            src: local('Dosis Regular'), local('Dosis-Regular'),
                url('/static/fonts/dosis-v7-latin-regular.woff2') format('woff2'),
                url('/static/fonts/dosis-v7-latin-regular.woff') format('woff');
          }

          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 300;
            src: local('Source Sans Pro Light'), local('SourceSansPro-Light'),
              url('/static/fonts/source-sans-pro-v11-latin-300.woff2') format('woff2'),
              url('/static/fonts/source-sans-pro-v11-latin-300.woff') format('woff');
          }

          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 400;
            src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'),
              url('/static/fonts/source-sans-pro-v11-latin-regular.woff2') format('woff2'),
              url('/static/fonts/source-sans-pro-v11-latin-regular.woff') format('woff');
          }

          body {
            --padding: 14px;
            --orange: #ff6600;
            --blue: #18CAF6;

            background-color: var(--bgColor);
            color: var(--color);
            font-display: optional;
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
              --boxShadow: rgba(224,224,224,.6);
              --color: #212531;
              --darkGray: #616161;
              --lightGray: #e0e0e0;
              --otherGray: #A3A3A3;
            }

            &.dark {
              --bgColor: #212531;
              --bgSecondColor: #3B3F4A;
              --color: #efefef;
              --boxShadow: rgba(31,31,31,.6);
              --darkGray: #c7c7c7;
              --lightGray: #dadada;
              --otherGray: #ececec;
            }
          }

          a {
            text-decoration: none;
            &:hover { text-decoration: none; }
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
            transform: translate(0, 0);
            min-width: 100px;
            outline: none;
            padding: 12px 24px;

            &:hover {
              box-shadow: 0 4px 12px 6px var(--boxShadow);
              padding-top: 13px;
              padding-bottom: 11px;
              transform: translate(-2px, -1px);
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
              font-size: 18px;
            }

            &, &-orange { background-color: var(--orange); }
            &-blue { background-color: var(--blue); }

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

            img {
              cursor: pointer;
              height: 31px;
              margin-right: 14px;
              width: 31px;
            }
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
        `}</style>
      </React.Fragment>
    )
  }
}


class UserModal extends React.Component {
  render() {
    const { theme, changeTheme, userProfile } = this.props

    return (
      <Modal
        modalHandler={({ isOpen, toggleModal }) => (
          <React.Fragment>
            <img
              src="/static/images/user.webp"
              alt="User Profile"
              onClick={toggleModal}
            />
            <style jsx>{`
              img {
                cursor: pointer;
                height: 31px;
                margin-right: 14px;
                width: 31px;
              }
            `}</style>
          </React.Fragment>
        )}
        render={(
          <React.Fragment>
            <article>
              <img src="/static/images/user@2x.webp" alt="Jonh Kite" />
              <div>
                <h2>{userProfile.name}</h2>
                <small>{userProfile.points}</small>
              </div>
            </article>

            <div>
              <Link href="/history">
                <a className="btn btn-big">View History</a>
              </Link>
            </div>

            <section>
              <h3>Settings</h3>
              <div>
                <h4>Dark Theme</h4>
                <Switch
                  isActive={theme === 'dark'}
                  onClick={changeTheme}
                />
              </div>
            </section>

            <style jsx>{`
              * { font-size: 24px; font-weight: 400; }

              article {
                align-items: center;
                color: #616161;
                display: flex;
                justify-content: space-around;
                margin: 0 auto;
                max-width: 350px;
                padding: 24px 48px;
                text-align: center;
                width: 100%;

                img { height: 100px; margin-right: 0; width: 100px; }
                div { width: 155px; }
              }

              div {
                align-items: center;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                h2 { width: 100%; }
              }

              section div { justify-content: space-between; }

              h2 { color: var(--darkGray); }
              h3 { color: var(--otherGray); margin-bottom: 0; }
              h4 { color: var(--darkGray); font-size: 22px; }

              small {
                background-color: #ededed;
                border-radius: 12px;
                font-size: 18px;
                padding: 5px 10px;

                &::after {
                  background-image: url(/static/images/coin.webp);
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: contain;
                  content: '';
                  height: 15px;
                  margin-left: 5px;
                  padding: 0 10px;
                  position: relative;
                  right: 0;
                  width: 15px;
                }
              }
            `}</style>
          </React.Fragment>
        )}
      />
    )
  }
}
UserModal = useShallowEqual(UserModal)


export default useShallowEqual(Layout)

