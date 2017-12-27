import { fonts, themes, globals } from '../utils/styles'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Head from 'next/head'
import Link from 'next/link'

// nav
import { UserIconLoader } from "./Loaders"
import Loader from './Loader'
import Switch from './Switch'
import Modal from './Modal'


class Layout extends React.Component {
  state = { theme: 'light' }

  listenThemeChanges = () => {
    window.addEventListener('storage', (change) => {
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

  registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('service worker registration successful')
        })
        .catch(err => {
          console.warn('service worker registration failed', err.message)
        })
    }
  }

  componentDidMount() {
    this.changeTheme(false)
    this.listenThemeChanges()
    !!this.props.register && this.registerServiceWorker()
  }

  render() {
    const {
      title = 'The simple Store',
      header,
      children,
      data,
    } = this.props

    return (
      <React.Fragment>
        <Head>
          <title>{title} - Aerostore</title>
        </Head>

        <Nav
          changeTheme={this.changeTheme(true)}
          loading={data.loading}
          theme={this.state.theme}
          {...data.user}
        />

        {header && <Header />}

        {React.Children.map(children, child =>
          React.cloneElement(child, { data })
        )}

        <style jsx global>{themes}</style>
        <style jsx global>{globals}</style>
        <style jsx global>{fonts}</style>
      </React.Fragment>
    )
  }
}


const Nav = (props) => (
  <nav>
    <Link href="/">
      <a>
        <img src="/static/images/icon.webp" alt="Aerostore icon" />
        <h2>Aerostore</h2>
      </a>
    </Link>

    <Loader />

    <UserModal {...props} />

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

        a { display: flex; }
        img { margin-right: 14px; }

        & > :global(img),
        & > :global(svg) { cursor: pointer; height: 31px; width: 31px; }

        h2 {
          color: var(--orange);
          display: none;
          font-family: Dosis;
          height: 31px;
          margin: 0;

          @media screen and (min-width: 1024px) { display: block; }
        }
      }
    `}</style>
  </nav>
)

const Header = () => (
  <header>
    <div>
      <h1>Aerostore</h1>
      <p>A simple store, for the simple people.</p>
    </div>

    <div className="mobile-preview" />

    <style jsx>{`
      header {
        font-size: 24px;
        margin: 90px auto 110px;
        max-width: 900px;
        text-align: center;
        width: 90%;

        h1 {
          color: var(--orange);
          font-family: Dosis;
          font-size: 2.6em;
          font-weight: bold;
          height: 74px;
          line-height: 74px;
          margin: 0;
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

          div:not(.mobile-preview) { max-width: 350px; }

          .mobile-preview {
            background-image: url(/static/images/mobile-preview.webp);
            display: block;
            height: 462px;
            margin-left: 100px;
            width: 300px;
          }
        }
      }
    `}</style>
  </header>
)

const UserModal = ({ name, points, theme, changeTheme, loading }) => (
  <Modal
    modalHandler={({ toggleModal }) => (
      <img src="/static/images/user.webp" alt={name} onClick={toggleModal} />
    )}
    render={(
      <React.Fragment>
        <article>
          <img src="/static/images/user@2x.webp" alt={name} />

          <div>
            <h2>{name}</h2>
            <small>{points}</small>
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
            <Switch isActive={theme === 'dark'} onClick={changeTheme} />
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

export default ({ query, ...props }) => graphql(gql`
  query ${props.title} {
    ${query}
    user {
      id
      name
      points
    }
  }
`, {
  props: ({ data }) => ({ data, ...props }),
})(Layout)
