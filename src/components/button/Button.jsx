// Functions
import PropTypes from "prop-types";

// Styles
import "./Button.css";

Button.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    clickHandler: PropTypes.func,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    id: PropTypes.string
}

function Button({name, type, clickHandler, children, disabled, id}) {
    return (
        <button
            className={name}
            type={type}
            onClick={clickHandler}
            disabled={disabled}
            id={id}
        >
            {children}
        </button>
    );
}

export default Button;