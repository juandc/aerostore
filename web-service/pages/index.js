import styled, { injectGlobal } from 'styled-components'
import { Component } from 'react'


injectGlobal`
  body {
    background-color: #F9F9F9;
  }
`


const Title = ({ msg, ...props }) =>
  <div {...props}>
    <h1>The Message is: {msg}</h1>
    <p>PPPP</p>
  </div>

const StyledTitle = styled(Title)`
  color: red;
  font-size: 30px;
  & h1 {
    color: green;
    font-size: 50px;
  }
`

class Home extends Component {
  render() {
    const props = this.props

    return (
      <section>
        <StyledTitle msg="Random!">Hello!</StyledTitle>
        {
          new Date("2017-11-21T03:55:03.771Z")
            .toLocaleString("en-us", {
              day: 'numeric',
              month: 'long',
              weekday: 'long'
            })
        }
      </section>
    )
  }
}


export default Home
