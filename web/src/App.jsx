import { createContext, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchResult from './components/SearchResult'
import Content from './components/Content'
import AppContext from './services/context'
import { GlobalStyle } from './styles'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://greenbook.filipelopes.med.br/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  return (
    <AppContext.Provider value={{searchResults, setSearchResults, loading, setLoading}}>
      <ApolloProvider client={client}>
      <GlobalStyle />
      <Header/>
      <SearchResult />
      <Content />
      <Footer />
      </ApolloProvider>
    </AppContext.Provider>
  )
}

export default App
