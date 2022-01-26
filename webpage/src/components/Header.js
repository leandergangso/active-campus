// rafce - code snippet
import PropTypes from 'prop-types'

const Header = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}

// set defualt values for props
Header.defaultProps = {
    title: 'Default prop name',
}

// specify required type for props, and if prop requires a value
Header.PropTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
