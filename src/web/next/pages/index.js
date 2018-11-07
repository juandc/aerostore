import React, { Fragment } from 'react';

export default props => (
  <Fragment>
    <h1>Hello World <small>Jhon</small></h1>
    <style jsx>{`
      @custom-selector :--heading h1, h2, h3;
      
      :--heading {
        background-color: brown;
        color: azure;
        margin: 0;

        & small:matches(:first-child, .special) {
          background-color: blue;
          color: red;
        }

        & small:first-child {
          font-size: 14px;
        }
      }
    `}</style>
  </Fragment>
);
