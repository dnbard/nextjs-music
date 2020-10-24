import { FunctionComponent, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faThLarge, faDrum, faPodcast, faGuitar, faRecordVinyl, faSlidersH } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

import { Spacing } from '../atoms'

const BaseToolbar: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  return <div {...props}>
    <Link href="/">
      <FontAwesomeIcon icon={faMusic} color="white" size="lg" title="Lorem Ipsum" />
    </Link>
    <Spacing size={64} />
    <FontAwesomeIcon icon={faThLarge} title="Lorem Ipsum" />
    <FontAwesomeIcon icon={faDrum} title="Lorem Ipsum" />
    <FontAwesomeIcon icon={faPodcast} title="Lorem Ipsum" />
    <FontAwesomeIcon icon={faGuitar} title="Lorem Ipsum" />
    <FontAwesomeIcon icon={faRecordVinyl} title="Lorem Ipsum" />
    <FontAwesomeIcon icon={faSlidersH} title="Lorem Ipsum" />
  </div>
}

export default styled(BaseToolbar)`
  position: fixed;
  background: black;
  width: 64px;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 32px 0;
  box-sizing: border-box;
  flex-direction: column;

  > * {
    margin: 16px 0;
    cursor: pointer;
    color: grey;
    transition: 0.15s color ease-in;

    &:hover {
      color: white;
    }
  }
`
