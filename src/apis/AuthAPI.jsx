import axios from "axios";
import TokenManager from "./TokenManager";

const AuthAPI = {
    login: (username, password) => axios.post('http://localhost:8080/tokens', { username, password })
        .then(response => response.data.accessToken)
        .then(accessToken => {
            TokenManager.setAccessToken(accessToken);
            localStorage.setItem('accessToken', accessToken); // Save token in localStorage
        }),

    createPlayer: (license, name, password, countryId) => axios.post('http://localhost:8080/players', { license, name, password, countryId })
        .then(response => response.data)
}

export default AuthAPI;
