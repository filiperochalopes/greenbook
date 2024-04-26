import StyledFooter from "./styles.js"
import PropTypes from 'prop-types'

const Footer = ({withLogo}) => {
    return (
        <StyledFooter>
            {withLogo && <img src="/icon.png" alt="GreenBook Icon" />}
            <p><strong className="greenbook-logo">gr<span className="green">ee</span>nbook</strong> by Filipe Lopes</p>
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