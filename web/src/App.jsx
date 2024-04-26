import { createContext, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchResult from './components/SearchResult'
import Content from './components/Content'
import AppContext from './services/context'
import { GlobalStyle } from './styles'
import { ThemeProvider } from 'styled-components'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://greenbook.filipelopes.med.br/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [searchResults, setSearchResults] = useState([])
  const [individualResult, setIndividualResult] = useState({})
  const [loading, setLoading] = useState(false)

  return (
    <AppContext.Provider value={{ searchResults, setSearchResults, individualResult, setIndividualResult, loading, setLoading }}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={{
          colors:{
            primary: "green"
          }
        }}>
        <GlobalStyle />
        <Header withLogo={Boolean(!searchResults.length)}/>
        {loading && <p>Carregando...</p>}
        {Boolean(searchResults.length && !individualResult.title) && <SearchResult />}
        {Boolean(!searchResults.length && individualResult.title) && <Content />}
        <Footer withLogo={Boolean(searchResults.length)}/>
        </ThemeProvider>
      </ApolloProvider>
    </AppContext.Provider>
  )
}

export default App
