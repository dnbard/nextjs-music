import { FunctionComponent, HTMLAttributes, useState, useContext, useCallback, MouseEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

import { Store } from '../../store'

interface RatingProps extends HTMLAttributes<HTMLDivElement> {
  value?: number
  hover?: number
  id?: string
  selected?: boolean

  onHover?: (index: number) => void
}

const RatingStar: FunctionComponent<RatingProps> = (({ hover, id, value, selected, onHover }) => {
  const { dispatch } = useContext(Store)
  const isHovered = hover >= value
  const color = selected ? 'goldenrod' : isHovered ? 'white' : 'grey'

  const onClick = useCallback((e: MouseEvent<SVGElement>) => {
    dispatch({ type: 'rating-set', payload: { id, value } })
  }, [id, value, dispatch])

  return (
    <FontAwesomeIcon
      icon={faStar}
      color={color}
      onMouseEnter={() => onHover(value)}
      onMouseLeave={() => onHover(0)}
      onClick={onClick}
    />
  )
})

const Rating: FunctionComponent<RatingProps> = ({ value, id, ...props }) => {
  const [ hover, setHover ] = useState<number>(0)
  const { dispatch, rating } = useContext(Store)

  const currentRating = rating[id] || 0

  return (
    <div {...props}>
      <RatingStar hover={hover} value={1} id={id} onHover={setHover} selected={currentRating >= 1} />
      <RatingStar hover={hover} value={2} id={id} onHover={setHover} selected={currentRating >= 2} />
      <RatingStar hover={hover} value={3} id={id} onHover={setHover} selected={currentRating >= 3} />
      <RatingStar hover={hover} value={4} id={id} onHover={setHover} selected={currentRating >= 4} />
      <RatingStar hover={hover} value={5} id={id} onHover={setHover} selected={currentRating >= 5} />
    </div>
  )
}

export default styled(Rating)`
  width: 170px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`
