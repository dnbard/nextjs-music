import { FunctionComponent, HTMLAttributes } from 'react'
import styled from 'styled-components'

interface SpacingProps extends HTMLAttributes<HTMLDivElement> {
  size: number
}

export default styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`