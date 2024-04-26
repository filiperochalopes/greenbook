import StyledHeader from "./styles.js"
import PropTypes from 'prop-types'
import SearchInput from "src/components/SearchInput"
import AppContext from "src/services/context.js"
import { useContext } from "react"
const Header = ({ withLogo }) => {
    const { searchResults, individualResult } = useContext(AppContext)

    return (
        <StyledHeader showingResults={Boolean(searchResults.length || individualResult.title)}>
            {withLogo && <img src="/icon.png" alt="GreenBook Icon" />}
            <SearchInput />
        </StyledHeader>
    )
}

Header.propTypes = {
    withLogo: PropTypes.bool
}

Header.defaultProps = {
    withLogo: true
}


export default Header