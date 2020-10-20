import styled from 'styled-components'

const Page = styled.div`
  display: flex;
  background: black;
  background-image: url(/guitar.jpg);
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.85);
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;

  h1 {
    font-size: 82px;
    font-variant: small-caps;
    margin: 0 0 32px 0;
    > * {
      margin-right: 32px;
    }
  }
`

export default Page
