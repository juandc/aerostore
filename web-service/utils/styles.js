import css from 'styled-jsx/css'


export const fonts = css`
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
`

export const themes = css`
  body {
    --blue: #18CAF6;
    --green: #90EE90;
    --orange: #FF6600;
    --padding: 14px;
    --red: #EB5757;

    &, &.light {
      --bgColor: #F9F9F9;
      --bgSecondColor: #FFFFFF;
      --boxShadow: rgba(224,224,224,.6);
      --color: #212531;
      --darkGray: #616161;
      --lightGray: #E0E0E0;
      --otherGray: #A3A3A3;
    }

    &.dark {
      --bgColor: #212531;
      --bgSecondColor: #3B3F4A;
      --boxShadow: rgba(31,31,31,.6);
      --color: #EFEFEF;
      --darkGray: #C7C7C7;
      --lightGray: #DADADA;
      --otherGray: #ECECEC;
    }
  }
`

export const globals = css`
  * {
    box-sizing: border-box;
    transition: all .3s, color .1s;
  }

  body {
    background-color: var(--bgColor);
    color: var(--color);
    font-display: optional;
    font-family: Source Sans Pro;
    font-weight: 400;
    padding: 61px var(--padding) 0;
    transition: background-color .6s, all .3s;
  }

  a { text-decoration: none; &:hover { text-decoration: none; } }
`

