import { Link } from "react-router-dom"
import { useContext } from "react"
import AppContext from "../../services/context.js"
import StyledFooter from "./styles.js"
import PropTypes from 'prop-types'

const Footer = ({ withLogo }) => {
  const { setIndividualResult, setSearchResults } = useContext(AppContext)
  return (
    <StyledFooter>
      <Link to="/"><button onClick={() => {
        setIndividualResult({})
        setSearchResults([])
      }}>{withLogo && <img src="/icon.png" alt="GreenBook Icon" />}</button></Link>
      <p>
        <strong className="greenbook-logo">gr<span className="green">ee</span>nbook</strong> by <a href="https://filipelopes.med.br/links" target="_blank" rel="noreferrer">Filipe Lopes</a> -{" "}
        <a href="https://github.com/filiperochalopes/greenbook" target="_blank" rel="noreferrer">GitHub</a>
      </p>
      <small>All Rights Reserved &copy; 2024</small>
    </StyledFooter>
  )
}

Footer.propTypes = {
  withLogo: PropTypes.bool
}

Footer.defaultProps = {
  withLogo: true
}

export default Footer