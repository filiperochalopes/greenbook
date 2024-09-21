import Article from "./styles.js"
import { useContext } from "react"
import AppContext from "src/services/context.js"
import { Link } from 'react-router-dom';

const SearchResult = () => {
  const { searchResults, setSearchTerm } = useContext(AppContext),
  handleItemClick = (q) => {
    const [type, id] = q.split(":");
    return `/${type}/${id}`;
  }

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
        <section key={group[0]}>
          <header><h1>{group[0]}</h1></header>
          <div>
            {group[1].map(item => (
              <Link to={handleItemClick(item.q)} key={item.q}>
              <button className="result-box" onClick={() => setSearchTerm("")}>{item.name}</button>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </Article>
  )
}

export default SearchResult