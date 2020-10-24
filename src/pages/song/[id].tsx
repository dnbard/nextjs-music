import React, { FunctionComponent, HTMLAttributes } from 'react'
import { useRouter } from 'next/router'
import styled, { createGlobalStyle } from 'styled-components'
import Store from '../../store'

import { Page, MainArea, Spacing, WatchButton } from '../../components/atoms'
import { Toolbar, Release } from '../../components/organisms'

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  }
`

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  data: any
}

const SongPage: FunctionComponent<PageProps> = (props) => {
  const router = useRouter()
  const { id } = router.query
  const entry = props.data.feed.entry.filter(e => e.id.attributes['im:id'] === id)[0]
  const title = entry['im:name'].label
  const artist = entry['im:artist'].label
  const image = entry['im:image'][entry['im:image'].length -1].label
  const url = entry.link.attributes.href

return (
    <Store value={{ data: props.data }}>
    <div>
      <GlobalStyles />
      <Page image={image}>
        <Toolbar />
        <MainArea>
          <h2>
            {artist} - {title}
          </h2>
          <Release image={image} artist={artist} title={title} id={id} />
          <Spacing size={64} />
          <a href={url} target="blank">
            <WatchButton>Watch NOW!</WatchButton>
          </a>
        </MainArea>
      </Page>
    </div>
    </Store>
  )
}

export async function getServerSideProps() {
  const data = await (
    await fetch(`https://itunes.apple.com/us/rss/topalbums/limit=100/json`)
  ).json()

  return {
    props: { data },
  }
}

export default SongPage
