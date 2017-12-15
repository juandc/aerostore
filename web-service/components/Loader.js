import Router from 'next/router'

export default class Loader extends React.PureComponent {
	state = {
		className: 'loaded'
	}

	componentDidMount() {
		Router.onRouteChangeStart = () =>{
			this.setState({ className: 'start' })
		}

		Router.onRouteChangeComplete = () => {
			this.setState({ className: 'complete' })
			setTimeout(() => {
				this.setState({ className: 'loaded' })
			}, 1000)
		}

		Router.onRouteChangeError = () => {
			this.setState({ className: 'error' })
			setTimeout(() => {
				this.setState({ className: 'loaded' })
			}, 1000)
		}
	}

	render() {
		const { className } = this.state

		return (
			<div className={className}>
				<style jsx>{`
					div {
						position: fixed;
						top: 61px;
						left: 0;
						height: 2px;
						z-index: 3;
						transition: all 1s, background-color .1s;

						&.loaded {
							background-color: 'transparent';
							right: 100vh;
						}
						&.start {
							background-color: var(--orange);
							right: 40vh;
						}
						&.complete {
							background-color: var(--orange);
							right: 0;
						}
						&.error {
							background-color: #EB5757;
							right: 0;
						}
					}
				`}</style>
			</div>
		)
	}
}
