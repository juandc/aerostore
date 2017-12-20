import { useShallowEqual } from 'shouldcomponentupdate-children'

class Modal extends React.Component {
  state = { isOpen: false }

  toggleModal = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }))
  }

  renderModal = ({ isOpen, render, buttons = {} }) => (
    <article className={`Modal ${isOpen && 'active'}`}>
      {render}
      <footer>
        <a
          className="btn btn-blue"
          onClick={() => {
            buttons.action && buttons.action()
            this.toggleModal()
          }}
        >Ok</a>
      </footer>
      <style jsx global>{`
        *:not(.Modal) {
          overflow-y: ${this.state.isOpen ? 'hidden' : 'unset'} !important;
        }
      `}</style>
      <style jsx>{`
        article {
          background-color: var(--bgSecondColor);
          bottom: 0;
          box-shadow: -2px 4px 12px var(--boxShadow);
          height: 0;
          left: 0;
          overflow: hidden;
          position: fixed;
          right: 0;
          top: 61px;
          transition: all .3s, padding .1s, height .6s;
          width: 100vw;
          z-index: 1;

          @media screen and (min-width: 1024px) {
            bottom: unset;
            left: unset;
            width: 400px;
          }

          & > :global(*) {
            opacity: 0;
            transition: opacity .1s;
            transition-delay: 0s;
          }
          
          &.active {
            height: calc(100vh - 61px);
            padding: 24px var(--padding) 0;

            @media screen and (min-width: 1024px) { height: 482px; }

            & > :global(*) {
              opacity: 1;
              transition: opacity .3s;
              transition-delay: .2s;
            }
          }
        }

        footer {
          align-items: center;
          background-color: var(--bgColor);
          bottom: 0;
          box-shadow: 0px -2px 24px var(--boxShadow);
          display: flex;
          height: 61px;
          justify-content: center;
          left: 0;
          position: absolute;
          right: 0;

          @media screen and (min-width: 1024px) {
            display: none;
          }
        }

        @media screen and (max-width: 1024px) {
          article { overflow-y: scroll; }
        }

        @media screen and (max-width: 1024px) and (orientation: landscape) {
          footer {
            position: relative;
            margin: 0;
            left: -14px;
            right: -14px;
            width: 100vw;
            bottom: -14px;
          }
        }
      `}</style>
    </article>
  )

  render() {
    const { isOpen } = this.state
    const {
      modalHandler,
      render,
      buttons,
    } = this.props

    return (
      <React.Fragment>
        {modalHandler({
          isOpen,
          toggleModal: () => this.toggleModal()
        })}

        {this.renderModal({ isOpen, render, buttons })}
      </React.Fragment>
    )
  }
}


export default useShallowEqual(Modal)

