// Functions
import PropTypes from "prop-types";

InputElement.propTypes = {
    name:  PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
}

function InputElement({type, name, label, id, placeholder, onChange}) {
    return (
        <>
            <label htmlFor={id}>
                {label}
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    name={name}
                    onChange={onChange}
                />
            </label>
        </>
    );
}

export default InputElement;