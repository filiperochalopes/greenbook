import { useEffect, useState } from 'react'
import Search from './views/Search'
import Content from './components/Content'
import AppContext from './services/context'
import { GlobalStyle, theme } from './styles'
import { ThemeProvider } from 'styled-components'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Edit from './views/Edit'
import Add from './views/Add'
import { SnackbarProvider } from 'notistack';

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
        <SnackbarProvider dense={true} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000}>
          <GlobalStyle />
          <Router>
            <Routes>
              <Route exact path="/" element={<Search/>} />
              <Route exact path="/edit" element={<Edit />} />
              <Route exact path="/add" element={<Add />} />
              {/* Rota dinâmica para espécies e efeitos terapêuticos */}
              <Route exact path="/:type/:id" element={<Content />} />
            </Routes>
          </Router>
          </SnackbarProvider>
        </ThemeProvider>
      </ApolloProvider>
    </AppContext.Provider>
  )
}

export default App
