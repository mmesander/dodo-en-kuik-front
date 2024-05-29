// Functions
import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import PropTypes from "prop-types";

// Helpers
import checkTokenValidity from "../helpers/checkTokenValidity.jsx";

export const AuthContext = createContext(null);

AuthContextProvider.propTypes = {
    children: PropTypes.node,
}

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken && checkTokenValidity(storedToken)) {
            const decodedToken = jwtDecode(storedToken);
            void fetchUserData(decodedToken.sub, storedToken);
        } else {
            setAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(jwt_token) {
        localStorage.setItem("token", jwt_token);
        const decodedToken = jwtDecode(jwt_token);
        void fetchUserData(decodedToken.sub, jwt_token, "/");
    }

    function logout() {
        localStorage.clear();
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: 'done',
        });
    }

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout,
    }

    async function fetchUserData(id, token, redirectUrl) {
        try {
            const response = await axios.get(`http://localhost:8088/users/auth/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data);
            console.log(response.data);

            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    id: response.data.id,
                    email: response.data.email,
                    username: response.data.username,
                },
                status: 'done',
            });

            if (redirectUrl) {
                navigate(redirectUrl);
            }
        } catch (error) {
            console.error(error);
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;