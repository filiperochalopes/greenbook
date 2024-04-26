import StyledHeader from "./styles.js"
import PropTypes from 'prop-types'
import SearchInput from "src/components/SearchInput"

const Header = ({ withLogo }) => {
    return (
        <StyledHeader>
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