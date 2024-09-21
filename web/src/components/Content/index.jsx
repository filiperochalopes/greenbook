import Article from "./styles.js"
import { useContext, useEffect } from "react"
import AppContext from "src/services/context.js"
import { useLazyQuery } from "@apollo/client";
import { GET_ITEM } from "src/services/api.js";
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import PageTemplate from "../PageTemplate";
import SearchResult from "src/components/SearchResult";
import { enqueueSnackbar } from 'notistack';

const Content = () => {
  const { individualResult: r, setIndividualResult, searchResults, searchTerm, loading } = useContext(AppContext),
    [getIndividualResult, { data }] = useLazyQuery(GET_ITEM),
    { type: urlParamType, id: urlParamId } = useParams(),
    navigate = useNavigate();

  const handleItemClick = (q) => {
    const [type, id] = q.split(":");
    return `/${type}/${id}`;
  };

  const handleCopyToClipboard = (e) => {
    navigator.clipboard.writeText(e.target.textContent)
  }

  useEffect(() => {
    if (data) {
      setIndividualResult(data.getItem)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    getIndividualResult({ variables: { q: `${urlParamType}:${urlParamId}` } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (urlParamId) {
      getIndividualResult({ variables: { q: `${urlParamType}:${urlParamId}` } }); // Refetch data when URL params change
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParamId, urlParamType]);

  useEffect(() => {
    console.log(searchTerm !== "")
  }, [searchTerm])

  return <PageTemplate>
    {searchResults.length > 0 && searchTerm !== "" && !loading ? <SearchResult /> : <Article>
      <section style={{ textAlign: "center", marginTop: "1rem" }}>
        <button onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          enqueueSnackbar("Link copiado", { variant: "success" })
        }}>
          Compartilhar
        </button>
      </section>

      <section>
        <header>
          <h1>{r.title}</h1>
          {r.description && <p>{r.description}</p>}
        </header>
      </section>
      {Boolean(r.species?.length) && <section>
        <header>
          <h2>Especies</h2>
        </header>
        {r.species.map((elem) => <Link to={handleItemClick(elem.q)} key={elem.name}><button>{elem.name}</button></Link>)}</section>}
      {Boolean(r.popularNames?.length) && <section>
        <header>
          <h2>Nomes Populares</h2>
        </header>
        {r.popularNames.map((elem) => <Link to={handleItemClick(elem.q)} key={elem.name}><button>{elem.name}</button></Link>)}
      </section>}
      {Boolean(r.metabolites?.length) && (
  <section>
    <header>
      <h2>Metabólitos</h2>
    </header>
    {r.metabolites.map((elem) => (
      <Link to={handleItemClick(elem.q)} key={elem.name}>
        <button style={elem.relevance ? { borderColor: `#${elem.relevance.hexColor}` } : {}}>
          {elem.name}
        </button>
      </Link>
    ))}
  </section>
)}

{Boolean(r.therapeuticEffects?.length) && (
  <section>
    <header>
      <h2>Efeitos Terapêuticos</h2>
    </header>
    {r.therapeuticEffects.map((elem) => (
      <Link to={handleItemClick(elem.q)} key={elem.term}>
        <button style={elem.relevance ? { borderColor: `#${elem.relevance.hexColor}` } : {}}>
          {elem.term}
        </button>
      </Link>
    ))}
  </section>
)}
      {Boolean(r.prescriptionSuggestions?.length) && <section>
        <header>
          <h2>Sugestões de Prescricão</h2>
        </header>
        <i>Clique em uma das prescrições abaixo para copiar:</i>
        <ul>
          {r.prescriptionSuggestions.map((elem, index) =>
            <li key={index}><button onClick={(e) => {
              handleCopyToClipboard(e)
              enqueueSnackbar("Prescrição copiada", { variant: "success" })
            }}>{elem.specie.name} ({elem.part.name}) {elem.dosage}</button>{(elem.description || elem.quantity) && <p>{elem.quantity && <span>{elem.quantity}</span>}{elem.description && elem.quantity && <span> - </span>}{elem.description && <span>{elem.description}</span>}</p>}</li>)}
        </ul>
      </section>}
      <section style={{ textAlign: "center", marginTop: "1rem" }}>
        <button onClick={() => {
          navigate(-1)
        }}>Voltar</button>
      </section>
    </Article>}
  </PageTemplate>
}

export default Content