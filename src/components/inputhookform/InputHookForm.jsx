// Functions
import PropTypes from "prop-types";

InputHookForm.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    register: PropTypes.func.isRequired,
    validationRules: PropTypes.object
}

function InputHookForm({type, name, label, id, placeholder, errors, register, validationRules}) {
    return (
        <>
            <label htmlFor={id}>
                {label}
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    {...register(name, validationRules)}
                />
            </label>
            <p className="input-error-message">{errors}</p>
        </>
    );
}

export default InputHookForm;