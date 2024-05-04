import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchResult from './components/SearchResult'
import Content from './components/Content'
import AppContext from './services/context'
import { GlobalStyle, theme } from './styles'
import { ThemeProvider } from 'styled-components'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://greenbook.filipelopes.med.br/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [searchResults, setSearchResults] = useState([])
  const [individualResult, setIndividualResult] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(searchResults)
  },[searchResults])

  return (
    <AppContext.Provider value={{ searchResults, setSearchResults, individualResult, setIndividualResult, loading, setLoading }}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}}>
        <GlobalStyle />
        <Header withLogo={Boolean(!searchResults.length && !individualResult.title)}/>
        {loading && <p>Carregando...</p>}
        {Boolean(searchResults.length && !individualResult.title) && <SearchResult />}
        {Boolean(!searchResults.length && individualResult.title) && <Content />}
        <Footer withLogo={Boolean(searchResults.length || individualResult.title)}/>
        </ThemeProvider>
      </ApolloProvider>
    </AppContext.Provider>
  )
}

export default App
