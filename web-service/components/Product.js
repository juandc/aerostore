import Link from 'next/link'


export default ({ name, category, cost, img, userPoints }) => (
	<div>
		<img src={img.url} alt={name} />
		{userPoints >= cost
			? <span className="bag" />
			: <span className="nobag">You need {cost - userPoints}</span>
		}
		<small>{category}</small>
		<span>{name}</span>
		{userPoints >= cost && (
			<div className="hover">
				<span className="bag-white" />
				<span className="price">{cost}</span>
				<Link href={`/shop?category=Electronics`}>
					<a className="btn btn-strange">Redeem now</a>
				</Link>
			</div>
		)}

		<style jsx>{`
			div {
				background-color: #fff;
				background-color: var(--bgSecondColor);
				border-radius: 4px;
				box-shadow: -2px 4px 15px var(--boxShadow);
				cursor: pointer;
				display: inline-block;
				flex: none;
				height: 200px;
				margin-right: 24px;
				padding: 12px 16px;
				position: relative;
				width: 200px;
				margin-bottom: 12px;

				&:hover {
					.hover { opacity: 1; z-index: 1; }
				}


				@media screen and (max-width: 1024px) {
					transform: scale(.95);
					margin: 0 12px 12px 0;
				}
			}

			img:not(.bag) {
				border-bottom: 1.25px solid #d9d9d9;
				margin-bottom: 10px;
				width: 100%;
			}

			.bag, .bag-white {
				background-image: url('/static/bag.png');
				background-size: contain;
				background-repeat: no-repeat;
				position: absolute;
				top: 10px;
				right: 10px;
				width: 36px;
				height: 36px;
			}
			.bag-white { background-image: url('/static/bag-white.png'); }

			span, small { display: block; }
			small { color: var(--otherGray); }
			span {
				color: var(--darkGray);
				overflow: hidden;
			  max-width: 100%;
			  text-overflow: ellipsis;
			  white-space: nowrap;
			}
			span.nobag {
				border-radius: 15px;
				position: absolute;
				top: 10px;
				right: 10px;
				background-color: var(--darkGray);
				opacity: .75;
				color: var(--bgSecondColor);
				padding: 6px 35px 6px 18px;
				font-size: 15px;

				&:after {
					background-image: url('/static/coin.png');
					background-repeat: no-repeat;
					background-size: cover;
					content: '';
					height: 18px;
					position: absolute;
					margin-left: 5px;
					width: 18px;
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
				color: var(--bgSecondColor);
				font-size: 22px;
				font-weight: bold;
				position: absolute;
				top: calc(50% - 36px);
				text-align: center;
				left: -5px;
				width: 100%;

				&:after {
					background-image: url('/static/coin.png');
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
				position: absolute;
				top: calc(50% - 12px);
				left: 0;
				right: 0;
			}
		`}</style>
	</div>
)
