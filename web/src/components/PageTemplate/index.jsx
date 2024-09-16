import Header from '../Header'
import Footer from '../Footer'
import { useContext } from 'react'
import AppContext from '../../services/context'
import PropTypes from 'prop-types'

const PageTemplate = ({ children }) => {

  const { loading, searchResults, individualResult } = useContext(AppContext)

  return (
    <>
      {loading && <div className="loading-bar"></div>}
      <Header withLogo={Boolean(!searchResults.length && !individualResult.title && !loading)} />
      {children}
      <Footer withLogo={Boolean(searchResults.length || individualResult.title)} />
    </>
  );
};

PageTemplate.propTypes = {
  children: PropTypes.node,
};

export default PageTemplate;
