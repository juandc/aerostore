import { useShallowEqual } from 'shouldcomponentupdate-children'


class Switch extends React.Component {
  render() {
    const { isActive, ...props } = this.props

    return (
      <React.Fragment>
        <a className={isActive && 'active'} {...props} />
        <style jsx>{`
          a {
            background-color: #ededed;
            border-radius: 30px;
            border: none;
            cursor: pointer;
            height: 30px;
            position: relative;
            outline: none;
            width: 60px;

            &::after {
              background-color: #EB5757;
              border-radius: inherit;
              content: '';
              height: inherit;
              left: 0;
              position: absolute;
              top: 0;
              transition: left .6s, width .6s;
              width: 30px;
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
  }
}


export default useShallowEqual(Switch)
