import Article from "./styles.js"
import { useContext, useEffect, useState } from "react"
import AppContext from "src/services/context.js"
import { useLazyQuery } from "@apollo/client";
import { GET_ITEM } from "src/services/api.js";

const SearchResult = () => {
  const { searchResults, setLoading, setSearchResults, setIndividualResult } = useContext(AppContext),
    [getIndividualResult, { error, data, loading }] = useLazyQuery(GET_ITEM)

  const handleItemClick = (q) => {
    getIndividualResult({ variables: { q } });
  }

  useEffect(() => {
    setLoading(loading)
  }, [loading])

  useEffect(() => {
    if (data) {
      setIndividualResult(data.getItem)
      setSearchResults([])
    }
  }, [data])

  return (
    <Article>
      {Object.entries(searchResults.reduce((acc, obj) => {
        const { group } = obj;
        if (!acc[group]) {
          acc[group] = [];
        }
        acc[group].push(obj);
        return acc;
      }, {})).map(group => (
        <section>
          <header><h1>{group[0]}</h1></header>
          <div>
            {group[1].map(item => (
              <button className="result-box" onClick={() => handleItemClick(item.q)}>{item.name}</button>
            ))}
          </div>
        </section>
      ))}
    </Article>
  )
}

export default SearchResult