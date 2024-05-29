// Functions
import {jwtDecode} from "jwt-decode";


function checkTokenValidity(token) {
    const decodedToken = jwtDecode(token);
    const expirationTime = (decodedToken.exp * 1000);
    const isExpired = (Date.now() > expirationTime) && (expirationTime - expirationTime) / 1000;
    return!isExpired;
}

export default checkTokenValidity;