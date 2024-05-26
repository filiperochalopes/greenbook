import Article from "./styles.js"
import { useContext, useEffect } from "react"
import AppContext from "src/services/context.js"
import { useLazyQuery } from "@apollo/client";
import { GET_ITEM } from "src/services/api.js";

const Content = () => {
  const { individualResult: r, setIndividualResult } = useContext(AppContext),
    [getIndividualResult, { data }] = useLazyQuery(GET_ITEM)

  useEffect(() => {
    if (r) {
      console.log(r)
    }
  }, [r])

  const handleItemClick = (q) => {
    getIndividualResult({ variables: { q } });
  }

  const handleCopyToClipboard = (e) => {
    navigator.clipboard.writeText(e.target.textContent)
  }

  useEffect(() => {
    if (data) {
      setIndividualResult(data.getItem)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Article>
      <section>
        <header>
          <h1>{r.title}</h1>
          {r.description && <p>{r.description}</p>}
        </header>
      </section>
      {Boolean(r.species.length) && <section>
        <header>
          <h2>Especies</h2>
        </header>
        {r.species.map((elem) => <button onClick={() => handleItemClick(elem.q)} key={elem.name}>{elem.name}</button>)}</section>}
      {Boolean(r.popularNames.length) && <section>
        <header>
          <h2>Nomes Populares</h2>
        </header>
        {r.popularNames.map((elem) => <button onClick={() => handleItemClick(elem.q)} key={elem.name}>{elem.name}</button>)}
      </section>}
      {Boolean(r.metabolites.length) && <section>
        <header>
          <h2>Metabólitos</h2>
        </header>
        {r.metabolites.map((elem) => <button onClick={() => handleItemClick(elem.q)} key={elem.name}>{elem.name}</button>)}
        </section>}
      {Boolean(r.therapeuticEffects?.length) && <section>
        <header>
          <h2>Efeitos terapêuticos</h2>
        </header>
        {r.therapeuticEffects.map((elem) => <button onClick={() => handleItemClick(elem.q)} key={elem.term}>{elem.term}</button>)}
        </section>}
      {Boolean(r.prescriptionSuggestions.length) && <section>
        <header>
          <h2>Sugestões de Prescricão</h2>
        </header>
        <i>Clique em uma das prescrições abaixo para copiar:</i>
        <ul>
        {r.prescriptionSuggestions.map((elem, index) => 
        <li key={index}><button onClick={handleCopyToClipboard}>{elem.specie.name} ({elem.part.name}) {elem.dosage}</button>{(elem.description || elem.quantity) && <p>{elem.quantity && <span>{elem.quantity}</span>}{elem.description && elem.quantity && <span> - </span>}{elem.description && <span>{elem.description}</span>}</p>}</li>)}
        </ul>
        </section>}
    </Article>
  )
}

export default Content