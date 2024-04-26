import { useEffect, useState, useContext, useCallback } from "react"
import Container, { InfoTooltip, WarningTooltip } from "./styles.js"
import debounce from 'lodash.debounce';
import AppContext from "src/services/context.js";
import { useLazyQuery } from "@apollo/client";
import { SEARCH } from "src/services/api.js";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState(''),
    [filter, setFilter] = useState([]),
    [showLabel, setShowLabel] = useState(false),
    [therapeuticEffectsAndSymptomsHint, setTherapeuticEffectsAndSymptomsHint] = useState([]),
    [showDisclaimer, setShowDisclaimer] = useState(false),
    [showHintInfo, setShowHintInfo] = useState(false),
    { searchResults, setSearchResults, individualResult, setIndividualResult, setLoading } = useContext(AppContext),
    [getSearch, { error, data, loading }] = useLazyQuery(SEARCH)

  // Debounced version of handleSearch function with a delay of 500ms
  const debouncedHandleSearch = useCallback(debounce((value) => {
    if(value){
      getSearch({ variables: { q: value, filter } });
    }else{
      setSearchResults([])
      setIndividualResult({})
      setFilter([])
      setTherapeuticEffectsAndSymptomsHint([])
    }
  }, 500), [getSearch, filter]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    // Call the debounced function with the input value
    debouncedHandleSearch(value);
  };

  const handleShowDisclaimerTooltip = (value) => {
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
  }, []);

  useEffect(() => {
    setLoading(loading)
  }, [loading])

  useEffect(() => {
    if (data) {
      console.log(data)
      setTherapeuticEffectsAndSymptomsHint(data.search.filter(item => item.group === "Efeitos terapêuticos" && !filter.includes(item.name)).map(item => item.name))
      setSearchResults(data.search)
    }
  }, [data])

  return (
    <Container showingResults={Boolean(searchResults.length || individualResult.title)}>
      <div>
        {showLabel && <label htmlFor="search">Pesquisar no <strong className="greenbook-logo">gr<span className="green">ee</span>enbook</strong></label>}
        <a
          id="disclaimer-tooltip"
        >
          <input type="search" id="search" placeholder="digite para pesquisar um nome de planta, sintomas, metabólitos secundários..." value={searchTerm} onChange={handleSearch} onFocus={handleFocus} onBlur={handleBlur} />
        </a>

      </div>
      {showDisclaimer && <WarningTooltip><strong>Disclaimer:</strong> Esse sistema foi realizado com o intuito de estruturar o conhecimento aprendido durante o curso de Pós Graduação em Fitoterapia do Dr. Filipe Lopes, constituindo-se em uma ferramenta de busca. Não é um projeto completo e as informações contidas não constituem indicação de uso. O uso irracional de agentes fitoterápicos sem a devida precaução ou conhecimento técnico podem provocar sequelas graves e morte. Como autor, não me responsabilizo pelo uso indevido do conteúdo. <button onClick={handleShowDisclaimerTooltip}>Ciente</button></WarningTooltip>}
      <div onMouseOver={() => setShowHintInfo(true)} onMouseLeave={() => setShowHintInfo(false)}>

        <div>
          {filter.map(filterName => {
            return <button className="hint-box" onClick={() => {
              setFilter(filter.filter(f => f !== filterName))
              setTherapeuticEffectsAndSymptomsHint(therapeuticEffectsAndSymptomsHint.filter(hint => hint !== filterName))
            }}>{filterName}</button>
          })}
        </div>
        <div>
          {therapeuticEffectsAndSymptomsHint.map(hint => <button className="hint-box" onClick={() => {
            setFilter([...filter, hint])
            setTherapeuticEffectsAndSymptomsHint(therapeuticEffectsAndSymptomsHint.filter(hintName => hintName !== hint))
          }}>{hint}</button>)}
        </div>
        {showHintInfo && <InfoTooltip><strong>Função fitocomplexo</strong>: selecione vários efeitos terapêuticos ou sintomas para uma melhor escolha da planta</InfoTooltip>}
      </div>

    </Container>
  )
}

export default SearchInput