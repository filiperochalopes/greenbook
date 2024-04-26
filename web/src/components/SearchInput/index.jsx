import { useEffect, useState, useContext } from "react"
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
    { searchResults, setSearchResults, individualResult, setLoading } = useContext(AppContext),
    [getSearch, {error, data, loading}] = useLazyQuery(SEARCH)

  const debouncedSearch = debounce((value) => {
    console.log(`Searching for: ${value}`);
    getSearch({ variables: { q: value, filter } });
  }, 500); 

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    // Call the debounced function with the input value
    debouncedSearch(value);
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
      debouncedSearch.cancel();
    };
  }, []);

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
          {filter.map(filterName => <button className="hint-box">{filterName}</button>)}
        </div>
        <div>
         {therapeuticEffectsAndSymptomsHint.map(hint => <button className="hint-box">{hint}</button>)}
        </div>
        {showHintInfo &&<InfoTooltip><strong>Função fitocomplexo</strong>: selecione vários efeitos terapêuticos ou sintomas para uma melhor escolha da planta</InfoTooltip>}
      </div>

    </Container>
  )
}

export default SearchInput