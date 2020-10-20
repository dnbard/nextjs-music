import styled from 'styled-components'

export default styled.div`
  width: calc(100vw - 64px);
  color: white;
  margin-left: 64px;
  padding: 64px 128px;
  font-family: sans-serif;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;

  @media only screen and (max-width: 768px) {
    padding: 64px 16px;
  }
`