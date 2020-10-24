import { FunctionComponent, HTMLAttributes } from 'react'
import styled from 'styled-components'

import { WatchButton } from '../atoms'

interface FeaturedProps extends HTMLAttributes<HTMLDivElement> {
  artist: string
  title: string
}

const Featured: FunctionComponent<FeaturedProps> = ({ artist, title, ...props }) => {
  return (
    <div {...props}>
      <div>{artist} - {title}</div>
      <WatchButton>Watch NOW!</WatchButton>
    </div>
  )
}

export default styled(Featured)`
  font-size: 36px;
  text-transform: uppercase;
`
