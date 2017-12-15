export default class Modal extends React.Component {
	state = { isOpen: false }

	toggleModal = () => {
		this.setState(({ isOpen }) => ({
			isOpen: !isOpen,
		}))
	}

	renderModal = ({ isOpen, render, posButton }) => (
		<article className={isOpen && 'active'}>
			{render}
			<footer>
				<button
					className="btn btn-blue"
					onClick={() => this.toggleModal()}
				>Ok</button>
			</footer>
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
					width: 100vw;
					transition: all .3s, padding .1s, height .6s;

					@media screen and (min-width: 1024px) {
						left: unset;
						bottom: unset;
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

						@media screen and (min-width: 1024px) {
							height: 482px;
						}

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
					box-shadow: 0px -2px 24px var(--boxShadow);
					display: flex;
					justify-content: ${posButton};
					height: 61px;
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;

					@media screen and (min-width: 1024px) {
						display: none;
					}
				}

				@media screen and (max-width: 1024px) and (orientation: landscape) {
					article {
						overflow-y: scroll;
					}
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
		const { modalHandler, render, posButton = 'center' } = this.props

		return (
			<React.Fragment>
				{modalHandler({
					isOpen,
					toggleModal: () => this.toggleModal()
				})}

				{this.renderModal({ isOpen, render, posButton })}
			</React.Fragment>
		)
	}
}
