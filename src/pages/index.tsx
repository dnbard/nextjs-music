import React, { FunctionComponent, HTMLAttributes } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

import { Page, MainArea, Spacing } from '../components/atoms'
import { Featured } from '../components/molecules'
import { Toolbar, Releases } from '../components/organisms'
import Store from '../store'

interface MainPage extends HTMLAttributes<HTMLDivElement> {
  data: any
}

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  }
`

const Home: FunctionComponent<MainPage> = (props) => {
  const firstEntry = props.data.feed.entry[0]

  return (
    <Store value={{ data: props.data }}>
      <GlobalStyles /> 
      <Page>
        <Toolbar />
        <MainArea>
          <h1>
            <FontAwesomeIcon icon={faMusic} color="white" size="lg" title="Lorem Ipsum" />
            MUSIC
          </h1>
          <Featured artist={firstEntry['im:artist'].label} title={firstEntry['im:name'].label} />
          <Spacing size={128} />
          <Releases />
        </MainArea>
      </Page>
    </Store>
  )
}

export async function getStaticProps() {
  const data = await (
    await fetch(`https://itunes.apple.com/us/rss/topalbums/limit=100/json`)
  ).json()

  return {
    props: { data },
  }
}

export default Home
