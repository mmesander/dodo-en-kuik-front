// Functions
import {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from "axios";

// Components
import InputHookForm from "../../components/inputelements/InputHookForm.jsx";

// Styles
import "./SignUp.css"

function SignUp() {
    const navigate = useNavigate();
    const {handleSubmit, register, watch, formState: {errors, isValid}} = useForm({mode: "onChange"});

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (registrationSuccess) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [registrationSuccess, navigate]);

    async function handleRegister(data) {
        setLoading(true);
        setErrorMessage("");
        try {
            const response = await axios.post('http://localhost:8088/users/register', {
                username: data.username,
                email: data.email,
                password: data.password
            });

            if (response.data) {
                setError(false);
            }

            if (response.status === 201) {
                setRegistrationSuccess(true);
            }
        } catch (e) {
            console.error(e);
            setError(true);
            setErrorMessage(e.response.data);
        }
        setLoading(false);
    }


    return (
        <>
            <div className="register-outer-container">
                <div className="register-inner-container">
                    <h1>Registreren</h1>
                    <form id="register-form" onSubmit={handleSubmit(handleRegister)}>
                        <InputHookForm
                            type="text"
                            name="username"
                            id="register-username"
                            label="Gebruikersnaam"
                            placeholder="Gebruikersnaam"
                            register={register}
                            errors={errors.username && errors.username.message}
                            validationRules={{
                                required: 'Dit veld is verplicht',
                                pattern: {
                                    value: /^[a-zA-Z]+$/,
                                    message: 'Gebruikersnaam mag alleen letters bevatten'
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
                            type="email"
                            name="email"
                            id="register-email"
                            label="Email"
                            placeholder="jouw@email.com"
                            register={register}
                            errors={errors.email && errors.email.message}
                            validationRules={{
                                required: 'Dit veld is verplicht',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Ongeldig email adres'
                                }
                            }}
                        />
                        <InputHookForm
                            type="password"
                            name="password"
                            id="register-password"
                            label="Wachtwoord"
                            placeholder="Wachtwoord"
                            register={register}
                            errors={errors.password && errors.password.message}
                            validationRules={{
                                required: 'Dit veld is verplicht',
                                minLength: {
                                    value: 8,
                                    message: 'Wachtwoord moet minimaal 8 tekens bevatten'
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/,
                                    message: 'Wachtwoord moet minimaal een hoofdletter, een kleine letter, een getal en een speciaal teken bevatten'
                                }
                            }}
                        />
                        <InputHookForm
                            type="password"
                            name="passwordConfirmation"
                            id="register-passwordConfirmation"
                            label="Wachtwoord controle"
                            register={register}
                            errors={errors.passwordConfirmation && errors.passwordConfirmation.message}
                            validationRules={{validate: (value) => value === watch('password') || 'Wachtwoorden komen niet overeen',}}
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                        >
                            Registreren
                        </button>
                        {loading ? <p>Aan het laden...</p> : <p className="backend-error-message">{errorMessage}</p>}
                        {registrationSuccess && !error &&
                        <h4 className="succes-message">
                            Registratie is gelukt, je wordt in 3 seconden teruggeleid naar de login pagina
                        </h4>}
                    </form>
                    <h3>Terug naar de <Link to="/login">login pagina</Link></h3>
                </div>
            </div>
        </>
    )
}

export default SignUp;