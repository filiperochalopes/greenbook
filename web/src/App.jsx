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
  const [searchResults, setSearchResults] = useState([]),
    [searchTerm, setSearchTerm] = useState(''),
    [individualResult, setIndividualResult] = useState({}),
    [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(searchResults)
  }, [searchResults])

  return (
    <AppContext.Provider value={{ searchResults, setSearchResults, individualResult, setIndividualResult, loading, setLoading, searchTerm, setSearchTerm }}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {loading && <div className="loading-bar"></div>}
          <Header withLogo={Boolean(!searchResults.length && !individualResult.title && !loading)} />
          {/* Mostra o resultado da busca */}
          {Boolean(searchResults.length && !individualResult.title) && <SearchResult />}
          {/* Mostra o conteúdo individual da seleção */}
          {Boolean(!searchResults.length && !loading && searchTerm && !individualResult.title) && <center style={{opacity: 0.5, margin: '2rem 0'}}>Não foram encontrados resultados para sua busca</center>}
          {Boolean(!searchResults.length && individualResult.title) && <Content />}
          <Footer withLogo={Boolean(searchResults.length || individualResult.title)} />
        </ThemeProvider>
      </ApolloProvider>
    </AppContext.Provider>
  )
}

export default App
