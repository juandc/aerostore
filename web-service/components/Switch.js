export default ({ isActive, ...props }) => (
	<React.Fragment>
		<button
			className={isActive && 'active'}
			{...props}
		/>
		<style jsx>{`
			button {
			  background-color: #ededed;
			  border-radius: 30px;
			  border: none;
			  cursor: pointer;
			  height: 30px;
			  position: relative;
			  outline: none;
			  width: 60px;

			  &:after {
			    content: '';
			    background-color: #EB5757;
			    border-radius: inherit;
			    position: absolute;
			    height: inherit;
			    width: 30px;
			    top: 0;
			    left: 0;
			    transition: left .6s, width .6s;
			  }

			  &:active:after { width: 37.5px; }
			  &.active:active:after { left: calc(100% - 37.5px); }

			  &.active:after {
			    background-color: lightgreen;
			    left: calc(100% - 30px);
			  }
			}
		`}</style>
	</React.Fragment>
)
