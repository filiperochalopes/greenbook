import { useContext } from "react";
import AppContext from "../../services/context.js";
import PageTemplate from "../../components/PageTemplate";
import SearchResult from "../../components/SearchResult";
const SearchPage = () => {

  const { loading, searchResults, individualResult, searchTerm } = useContext(AppContext)

  return <PageTemplate>
    {/* Mostra o resultado da busca */}
    {Boolean(searchResults.length && !individualResult.title) && <SearchResult />}
    {/* Retorna vazio caso não encontre nada */}
    {Boolean(!searchResults.length && !loading && searchTerm && !individualResult.title) && <center style={{ opacity: 0.5, margin: '2rem 0' }}>Não foram encontrados resultados para sua busca</center>}
  </PageTemplate>;
};

export default SearchPage;
