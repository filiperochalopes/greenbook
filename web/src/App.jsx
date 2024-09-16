import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchResult from './components/SearchResult'
import Content from './components/Content'
import AppContext from './services/context'
import { GlobalStyle, theme } from './styles'
import { ThemeProvider } from 'styled-components'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Edit from './views/Edit'
import Add from './views/Add'

const client = new ApolloClient({
  // uri: 'https://greenbook.filipelopes.med.br/graphql',
  uri: 'http://192.168.0.100:8086/graphql',
  // uri: '/graphql',
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
          <Router>
            <Routes>
              <Route exact path="/" element={<>
                {loading && <div className="loading-bar"></div>}
                <Header withLogo={Boolean(!searchResults.length && !individualResult.title && !loading)} />
                {/* Mostra o resultado da busca */}
                {Boolean(searchResults.length && !individualResult.title) && <SearchResult />}
                {/* Retorna vazio caso não encontre nada */}
                {Boolean(!searchResults.length && !loading && searchTerm && !individualResult.title) && <center style={{ opacity: 0.5, margin: '2rem 0' }}>Não foram encontrados resultados para sua busca</center>}
                <Footer withLogo={Boolean(searchResults.length || individualResult.title)} />
              </>} />
              <Route exact path="/edit" element={<Edit />} />
              <Route exact path="/add" element={<Add />} />
              {/* Rota dinâmica para espécies e efeitos terapêuticos */}
              <Route exact path="/:type/:id" element={<Content />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    </AppContext.Provider>
  )
}

export default App
