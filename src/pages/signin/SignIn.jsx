// Functions
import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";

// Context
import {AuthContext} from "../../context/AuthContext.jsx";

// Components
import InputHookForm from "../../components/inputhookform/InputHookForm.jsx";

// Styles
import "./SignIn.css"


function SignIn() {
    const {login} = useContext(AuthContext);
    const {handleSubmit, register, formState: {errors, isValid}} = useForm({mode: "onChange"});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleLogin(data){
        setLoading(true);
        setErrorMessage("");
        try {
            const response = await axios.post(`http://localhost:8088/users/authenticate`, {
                username: data.username,
                password: data.password,
            });
            login(response.data.jwt);

            if (response.data.jwt) {
                setError(false);
            }
        } catch (error) {
            setError(true);
            console.error(error);
            setErrorMessage(error.response.data);
        }
        setLoading(false);
    }

    return (
        <>
            <div className="login-outer-container">
                <div className="login-inner-container">
                    <h1>Inloggen</h1>
                    <form id="login-form" onSubmit={handleSubmit(handleLogin)}>
                        <InputHookForm
                            type="text"
                            name="username"
                            id="username-field"
                            label="Gebruikersnaam"
                            placeholder="Gebruikersnaam"
                            register={register}
                            errors={errors.username && errors.username.message}
                            validationRules={{
                                required: 'Dit veld is verplicht',
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: 'Gebruikersnaam mag alleen letters, cijfers en underscores bevatten'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Gebruikersnaam moet minimaal 6 tekens bevatten'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Gebruikersnaam mag maximaal 20 tekens bevatten'
                                },
                            }}
                        />
                        <InputHookForm
                            type="password"
                            name="password"
                            id="reg-password-field"
                            label="Wachtwoord"
                            placeholder="Wachtwoord"
                            register={register}
                            errors={errors.password && errors.password.message}
                            validationRules={{
                                required: 'Dit veld is verplicht',
                                minLength: {
                                    value: 6,
                                    message: 'Wachtwoord moet minimaal 6 tekens bevatten'
                                }
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                        >
                            Inloggen
                        </button>
                        {(!error && loading) ? <p>Aan het laden...</p> : <p className="backend-error-message">{errorMessage}</p>}
                    </form>
                    <h3>Nog geen account? <Link to="/registreren">Registreer je nu!</Link></h3>
                </div>
            </div>
        </>
    )

}

export default SignIn;