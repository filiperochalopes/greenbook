import { useEffect, useState, useContext, useCallback } from "react"
import Container, { WarningTooltip } from "./styles.js"
import debounce from 'lodash.debounce';
import AppContext from "src/services/context.js";
import { useLazyQuery } from "@apollo/client";
import { SEARCH } from "src/services/api.js";

const HelpIcon = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M0 10C0 4.48001 4.47998 0 10 0C15.52 0 20 4.48001 20 10C20 15.52 15.52 20 10 20C4.47998 20 0 15.52 0 10ZM11 14V16H9V14H11ZM10 18C5.58997 18 2 14.41 2 10C2 5.59 5.58997 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM6 8C6 5.79001 7.79004 4 10 4C12.21 4 14 5.79001 14 8C14 9.28293 13.21 9.97333 12.4408 10.6455C11.7111 11.2833 11 11.9046 11 13H9C9 11.1787 9.94214 10.4566 10.7704 9.82169C11.4203 9.32361 12 8.87921 12 8C12 6.89999 11.1 6 10 6C8.90002 6 8 6.89999 8 8H6Z" fill="black"/>
</svg>
)

const SearchInput = () => {
  const 
    [filter, setFilter] = useState([]),
    [showLabel, setShowLabel] = useState(false),
    [therapeuticEffectsAndSymptomsHint, setTherapeuticEffectsAndSymptomsHint] = useState([]),
    [showDisclaimer, setShowDisclaimer] = useState(false),
    [showHintInfo, setShowHintInfo] = useState(false),
    [showSearchHintInfo, setShowSearchHintInfo] = useState(false),
    { searchResults, setSearchResults, individualResult, setIndividualResult, setLoading, searchTerm, setSearchTerm } = useContext(AppContext),
    [getSearch, {data, loading }] = useLazyQuery(SEARCH)

  // Debounced version of handleSearch function with a delay of 500ms
  const debouncedHandleSearch = useCallback(debounce((value) => {
    setSearchResults([])
    setIndividualResult({})
    getSearch({ variables: { q: value, filter } });
  }, 500), [getSearch, filter]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    debouncedHandleSearch(value);
  };

  const handleShowDisclaimerTooltip = () => {
    localStorage.setItem('disclaimer-verified', 'true')
    setShowDisclaimer(false)
  }

  const handleFocus = () => {
    setShowLabel(false)
    if (localStorage.getItem('disclaimer-verified') !== 'true') setShowDisclaimer(true)
  }

  const handleBlur = () => {
    if (!searchTerm && Boolean(searchResults.length || individualResult.title)) { setShowLabel(true) }
  }

  useEffect(() => {
    // verifica se o disclaimer já foi verificado no localstorage
    if (localStorage.getItem('disclaimer-verified') === 'true') {
      setShowDisclaimer(false)
    }
    return () => {
      debouncedHandleSearch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(loading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  useEffect(() => {
    if (data) {
      console.log(data)
      setTherapeuticEffectsAndSymptomsHint(data.search.filter(item => item.group === "Efeitos terapêuticos" && !filter.includes(item.name)).map(item => item.name))
      setSearchResults(data.search)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if(filter.length){
      handleSearch(searchTerm)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  return (
    <Container showingResults={Boolean(searchResults.length || individualResult.title)} showSearchHintInfo={showSearchHintInfo}>
      <div>
      <button onClick={() => setShowSearchHintInfo(!showSearchHintInfo)}><HelpIcon/></button>
        {showLabel && <label htmlFor="search">Pesquisar no <strong className="greenbook-logo">gr<span className="green">ee</span>enbook</strong></label>}
        <a
          id="disclaimer-tooltip"
        >
          <input type="search" id="search" placeholder="digite para pesquisar um nome de planta, sintomas, metabólitos secundários..." value={searchTerm} onChange={e => handleSearch(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
        </a>
        {showSearchHintInfo && <small>Você pode buscar pelo termo que desejar: nome de espécie, doença, efeitos terapêuticos desejados, metabólitos secundários.Só digtar e aguardar os resultados. A qualquer momento você pode voltar aqui para buscar novos resultadops. :)</small>}
      </div>
      {showDisclaimer && <WarningTooltip><strong>Disclaimer:</strong> Esse sistema foi realizado com o intuito de estruturar o conhecimento aprendido durante o curso de Pós Graduação em Fitoterapia do Dr. Filipe Lopes, constituindo-se em uma ferramenta de busca. Não é um projeto completo e as informações contidas não constituem indicação de uso. O uso irracional de agentes fitoterápicos sem a devida precaução ou conhecimento técnico podem provocar sequelas graves e morte. Como autor, não me responsabilizo pelo uso indevido do conteúdo. <button onClick={handleShowDisclaimerTooltip}>Ciente</button></WarningTooltip>}
     {Boolean(filter.length || therapeuticEffectsAndSymptomsHint.length) && <div id="filter">
        <h3>Efeito Fitocomplexo <button onClick={() => setShowHintInfo(!showHintInfo)}><HelpIcon/></button></h3>
        {showHintInfo && <small>Clique nos efeitos terapêuticos abaixo desejados em sua planta para obter resultados de efeitos mais amplos pela combinação de mecanismos terapêuticos dos fitocomplexos. Clique novamente nos de cor verde para desselecioná-los</small>}
        <div>
        <div>
          {filter.map(filterName => {
            return <button key={filterName} className="hint-box" onClick={() => {
              setFilter(filter.filter(f => f !== filterName))
              setTherapeuticEffectsAndSymptomsHint(therapeuticEffectsAndSymptomsHint.filter(hint => hint !== filterName))
            }}>{filterName}</button>
          })}
        </div>
        <div>
          {therapeuticEffectsAndSymptomsHint.map(hint => <button 
          key={hint} className="hint-box" onClick={() => {
            setFilter([...filter, hint])
            setTherapeuticEffectsAndSymptomsHint(therapeuticEffectsAndSymptomsHint.filter(hintName => hintName !== hint))
          }}>{hint}</button>)}
        </div>
        </div>
      </div>}

    </Container>
  )
}

export default SearchInput