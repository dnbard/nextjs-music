import { FunctionComponent, HTMLAttributes, useContext, useState, useMemo, useCallback, ChangeEvent } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

import { Store } from '../../store'
import { Rating } from '../molecules'

interface ReleasesProps extends HTMLAttributes<HTMLDivElement> {
  image: string
  artist: string
  title: string
  id: string
}

const Label = styled.div`
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ReleaseContainer = styled.div`
  width: 170px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BaseRelease: FunctionComponent<ReleasesProps> = ({ image, artist, title, id, ...props }) => {
  const { dispatch, playing } = useContext(Store)

  const onClick = useCallback(() => dispatch({ type: 'playing-set', payload: { id } }), [dispatch, id])

  return (
    <div {...props}>
      <Link href={`/song/${id}`}>
        <img src={image} />
      </Link>
      <ReleaseContainer>
        <div>
          <Label>{artist}</Label>
          <Label>{title}</Label>
        </div>
        <FontAwesomeIcon
          icon={playing === id ? faPauseCircle : faPlayCircle}
          size="2x"
          onClick={onClick}
        />
      </ReleaseContainer>
      <Rating value={0} id={id} />
    </div>
  )
}

export const Release = styled(BaseRelease)`
  margin: 16px 16px 16px 0;
  cursor: pointer;
  color: grey;
  position: relative;

  img {
    border-radius: 10px;
    opacity: 0.65;
    transition: 0.15s all ease-in;
  }

  &:hover {
    color: white;
    img {
      opacity: 1;
    }
  }
`

const Releases: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  const { data } = useContext(Store)
  const [filter, setFilter] = useState('')

  const dataToRender = useMemo(() => {
    if (!filter) {
      return data.feed.entry
    }

    return data.feed.entry.filter(e => {
      const title = (e['im:artist'].label as string).toLowerCase()
      const artist = (e['im:name'].label as string).toLowerCase()
      return title.indexOf(filter) !== -1 || artist.indexOf(filter) !== -1
    })
  }, [data, filter])

  const onFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>)  => {
    setFilter(e.target.value.toLowerCase())
  }, [setFilter])

  return (
    <div {...props}>
      <div>
        <h3>Featured Releases</h3>
        <input value={filter} onChange={onFilterChange} />
      </div>
      <div>
        { dataToRender.map(e =>(
          <Release
            key={e.id.attributes['im:id']}
            image={e['im:image'][e['im:image'].length -1].label}
            artist={e['im:artist'].label}
            title={e['im:name'].label}
            id={e.id.attributes['im:id']}
          />
        )) }
      </div>
    </div>
  )
}

export default styled(Releases)`
  > div {
    display: flex;
    justify-content: flex-start;
    width: calc(100vw - 210px);
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  @media only screen and (max-width: 768px) {
    > div {
      width: calc(100vw - 100px);
    }
  }

  h3 {
    margin-right: 16px;
  }

  input {
    font-size: 14px;
    height: 34px;
    padding: 4px 16px;
    background: rgb(0 0 0 / 75%);
    border: 1px solid grey;
    border-radius: 12px;
    outline: none;
    color: grey;
    transition: 0.15s all ease-in;

    &:focus {
      color: white;
    }
  }
`