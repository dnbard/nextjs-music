import { FunctionComponent, HTMLAttributes } from 'react'
import styled from 'styled-components'

interface FeaturedProps extends HTMLAttributes<HTMLDivElement> {
  artist: string
  title: string
}

const Featured: FunctionComponent<FeaturedProps> = ({ artist, title, ...props }) => {
  return (
    <div {...props}>
      <div>{artist} - {title}</div>
      <button>Watch NOW!</button>
    </div>
  )
}

export default styled(Featured)`
  font-size: 36px;
  text-transform: uppercase;

  button {
    margin-top: 16px;
    border: 0;
    background: #691c1c;
    color: white;
    padding: 16px 32px;
    font-size: 16px;
    border-radius: 12px;
    font-variant: unicase;
    cursor: pointer;
    transition: 0.15s background ease-in;

    &:hover {
      background: red;
    }
  }
`
