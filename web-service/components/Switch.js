export default ({ isActive, ...props }) => (
  <a className={`switch ${isActive && 'active'}`}>
    <style jsx>{`
      a {
        background-color: #EDEDED;
        border-radius: 30px;
        border: none;
        height: 30px;
        outline: none;
        position: relative;
        width: 60px;

        &::after {
          background-color: var(--red);
          border-radius: inherit;
          content: '';
          cursor: pointer;
          height: inherit;
          left: 0;
          position: absolute;
          top: 0;
          transition: left .6s, width .6s;
          width: 30px;
        }

        &:active:after { width: 37.5px; }
        &.active:active:after { left: calc(100% - 37.5px); }
        &.active:after { background-color: var(--green); left: calc(100% - 30px); }
      }
    `}</style>
  </a>
)
